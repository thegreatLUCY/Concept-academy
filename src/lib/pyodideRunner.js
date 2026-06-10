const PYODIDE_VERSION = "0.26.4";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;
let runQueue = Promise.resolve();
let sessionNamespace = null;

function injectScript() {
  return new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `${PYODIDE_BASE}pyodide.js`;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Could not download the Python runtime. Check your internet connection and try again."));
    document.head.appendChild(script);
  });
}

export function isPythonReady() {
  return Boolean(pyodidePromise);
}

export function loadPython() {
  if (!pyodidePromise) {
    pyodidePromise = injectScript()
      .then(() => window.loadPyodide({ indexURL: PYODIDE_BASE }))
      .then((pyodide) => {
        pyodide.registerJsModule("browser_io", {
          prompt: (text) => window.prompt(text) ?? ""
        });
        pyodide.runPython(
          [
            "import builtins",
            "import browser_io",
            "",
            "def _browser_input(prompt=\"\"):",
            "    text = str(prompt)",
            "    answer = str(browser_io.prompt(text))",
            "    print(f\"{text}{answer}\")",
            "    return answer",
            "",
            "builtins.input = _browser_input"
          ].join("\n")
        );
        return pyodide;
      })
      .catch((error) => {
        pyodidePromise = null;
        throw error;
      });
  }

  return pyodidePromise;
}

function formatPythonError(error) {
  const message = String(error?.message ?? error);
  const lines = message.split("\n");
  const execIndex = lines.findIndex((line) => line.includes('File "<exec>"'));

  if (execIndex !== -1) {
    return ["Traceback (most recent call last):", ...lines.slice(execIndex)].join("\n").trim();
  }

  return lines.slice(-4).join("\n").trim() || "Python error";
}

async function executePython(code, namespace) {
  const pyodide = await loadPython();
  const outputLines = [];
  pyodide.setStdout({ batched: (line) => outputLines.push(line) });
  pyodide.setStderr({ batched: (line) => outputLines.push(line) });

  const globals = namespace ?? pyodide.globals.get("dict")();
  let resultText = null;
  let errorText = null;

  try {
    const result = await pyodide.runPythonAsync(code, { globals });

    if (result !== undefined) {
      if (result && typeof result.toString === "function" && result.toJs) {
        resultText = result.toString();
        result.destroy?.();
      } else {
        resultText = String(result);
      }
    }
  } catch (error) {
    errorText = formatPythonError(error);
  } finally {
    if (!namespace) {
      globals.destroy?.();
    }
    pyodide.setStdout();
    pyodide.setStderr();
  }

  return { output: outputLines.join("\n"), result: resultText, error: errorText };
}

export function runPython(code, namespace) {
  const task = runQueue.then(() => executePython(code, namespace));
  runQueue = task.catch(() => {});
  return task;
}

export async function runInSession(code) {
  const pyodide = await loadPython();

  if (!sessionNamespace) {
    sessionNamespace = pyodide.globals.get("dict")();
  }

  return runPython(code, sessionNamespace);
}

export function resetSession() {
  sessionNamespace?.destroy?.();
  sessionNamespace = null;
}
