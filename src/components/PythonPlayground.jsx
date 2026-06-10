import { useEffect, useRef, useState } from "react";
import { isPythonReady, loadPython, resetSession, runInSession } from "../lib/pyodideRunner.js";
import AiTutor from "./AiTutor.jsx";

const STARTER_CODE = [
  "# Real Python, running in your browser.",
  "# Edit this code and press Run.",
  "",
  "name = input(\"What is your name? \")",
  "print(f\"Hello, {name}!\")",
  "",
  "for number in range(1, 4):",
  "    print(\"Count:\", number)"
].join("\n");

function PythonPlayground({ onBack }) {
  const [code, setCode] = useState(STARTER_CODE);
  const [entries, setEntries] = useState([]);
  const [replDraft, setReplDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [runtimeState, setRuntimeState] = useState(isPythonReady() ? "ready" : "cold");
  const consoleRef = useRef(null);

  useEffect(() => {
    consoleRef.current?.scrollTo({ top: consoleRef.current.scrollHeight });
  }, [entries]);

  function pushEntries(newEntries) {
    setEntries((current) => [...current, ...newEntries]);
  }

  function entriesFromRun(run) {
    const next = [];

    if (run.output) {
      next.push({ kind: "out", text: run.output });
    }

    if (run.result != null) {
      next.push({ kind: "value", text: run.result });
    }

    if (run.error) {
      next.push({ kind: "error", text: run.error });
    }

    if (!next.length) {
      next.push({ kind: "info", text: "(no output)" });
    }

    return next;
  }

  async function execute(source, echoText) {
    if (!source.trim() || busy) {
      return;
    }

    setBusy(true);

    if (runtimeState === "cold") {
      setRuntimeState("loading");
      pushEntries([{ kind: "info", text: "Downloading the Python runtime (first run only)..." }]);
    }

    pushEntries([{ kind: "code", text: echoText }]);

    try {
      await loadPython();
      setRuntimeState("ready");
      const run = await runInSession(source);
      pushEntries(entriesFromRun(run));
    } catch (error) {
      setRuntimeState(isPythonReady() ? "ready" : "cold");
      pushEntries([{ kind: "error", text: String(error.message ?? error) }]);
    } finally {
      setBusy(false);
    }
  }

  function handleRepl(event) {
    event.preventDefault();
    const line = replDraft.trim();

    if (!line) {
      return;
    }

    setReplDraft("");
    execute(line, `>>> ${line}`);
  }

  function handleResetSession() {
    resetSession();
    setEntries([{ kind: "info", text: "Session reset. All variables were cleared." }]);
  }

  const consoleText = entries
    .slice(-12)
    .map((entry) => entry.text)
    .join("\n");

  return (
    <main className="playground-shell">
      <header className="playground-topline">
        <div>
          <p className="eyebrow">Python Track</p>
          <h1>Python Playground</h1>
          <p className="playground-subtitle">
            Write and run real Python in your browser. Variables persist between runs until you reset
            the session.
          </p>
        </div>
        <button className="topic-back-button" onClick={onBack}>
          Back to questions
        </button>
      </header>

      <div className="playground-grid">
        <section className="playground-editor" aria-label="Python code editor">
          <div className="playground-editor-toolbar">
            <button className="primary-button" onClick={() => execute(code, "» Run script")} disabled={busy}>
              {busy ? "Working..." : "Run"}
            </button>
            <button className="secondary-button" onClick={() => setEntries([])} disabled={!entries.length}>
              Clear Console
            </button>
            <button className="secondary-button" onClick={handleResetSession}>
              Reset Session
            </button>
          </div>
          <textarea
            className="playground-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck="false"
            aria-label="Python code"
          />
        </section>

        <section className="playground-console-wrap" aria-label="Python console">
          <div className="playground-console" ref={consoleRef} role="log">
            {!entries.length && (
              <pre className="py-info">Press Run, or type a Python statement below and press Enter.</pre>
            )}
            {entries.map((entry, index) => (
              <pre className={`py-${entry.kind}`} key={index}>
                {entry.text}
              </pre>
            ))}
          </div>
          <form className="playground-repl" onSubmit={handleRepl}>
            <span aria-hidden="true">&gt;&gt;&gt;</span>
            <input
              value={replDraft}
              onChange={(event) => setReplDraft(event.target.value)}
              placeholder="Type Python here, e.g. 2 ** 10"
              spellCheck="false"
              aria-label="Python REPL input"
              disabled={busy}
            />
          </form>
        </section>
      </div>

      <AiTutor context={{ mode: "playground", code, consoleText }} />
    </main>
  );
}

export default PythonPlayground;
