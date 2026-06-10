import { useState } from "react";
import { isPythonReady, runPython } from "../lib/pyodideRunner.js";

function PythonRunPanel({ code, onResult }) {
  const [run, setRun] = useState(null);
  const [status, setStatus] = useState("idle");

  async function handleRun() {
    if (!code.trim()) {
      return;
    }

    setStatus(isPythonReady() ? "running" : "loading");

    try {
      const result = await runPython(code);
      setRun(result);
      onResult?.(result);
    } catch (error) {
      const failed = { output: "", result: null, error: String(error.message ?? error) };
      setRun(failed);
      onResult?.(failed);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="py-run-panel">
      <div className="py-run-row">
        <button
          className="primary-button"
          onClick={handleRun}
          disabled={status !== "idle" || !code.trim()}
        >
          {status === "loading"
            ? "Starting Python..."
            : status === "running"
              ? "Running..."
              : "Run Code"}
        </button>
        <span className="py-run-hint">
          {status === "loading"
            ? "Downloading the Python runtime (first run only)."
            : "Runs real Python in your browser."}
        </span>
      </div>

      {run && (
        <div className="py-console" role="log" aria-label="Python output">
          {run.output && <pre className="py-out">{run.output}</pre>}
          {run.result != null && <pre className="py-value">{run.result}</pre>}
          {run.error && <pre className="py-error">{run.error}</pre>}
          {!run.output && run.result == null && !run.error && (
            <pre className="py-out">(program finished with no output)</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default PythonRunPanel;
