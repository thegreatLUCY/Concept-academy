import { useRef, useState } from "react";
import { isJsReady, runJs } from "../lib/jsRunner.js";

const HINTS = {
  react: "Compiles your JSX and renders it right here.",
  typescript: "Strips the types and runs real JavaScript in your browser.",
  jquery: "Runs against the live playground that appears below."
};

function JsRunPanel({ code, flavor, onResult }) {
  const hostRef = useRef(null);
  const [run, setRun] = useState(null);
  const [status, setStatus] = useState("idle");

  async function handleRun() {
    if (!code.trim()) {
      return;
    }

    setStatus(isJsReady(flavor) ? "running" : "loading");

    try {
      const result = await runJs(code, flavor, hostRef.current);
      setRun(result);
      onResult?.(result);
    } catch (error) {
      const failed = { output: "", html: "", error: String(error.message ?? error) };
      setRun(failed);
      onResult?.(failed);
    } finally {
      setStatus("idle");
    }
  }

  const showPreview = run && !run.error && (flavor === "jquery" || Boolean(run.html));

  return (
    <div className="py-run-panel">
      <div className="py-run-row">
        <button
          className="primary-button"
          onClick={handleRun}
          disabled={status !== "idle" || !code.trim()}
        >
          {status === "loading"
            ? "Starting JS..."
            : status === "running"
              ? "Running..."
              : "Run Code"}
        </button>
        <span className="py-run-hint">
          {status === "loading"
            ? "Downloading the JavaScript tools (first run only)."
            : HINTS[flavor] ?? HINTS.typescript}
        </span>
      </div>

      <div
        className={showPreview ? "js-preview" : "js-preview js-preview-hidden"}
        ref={hostRef}
        aria-label="Rendered output"
      />

      {run && (run.output || run.error || !run.html) && (
        <div className="py-console" role="log" aria-label="Console output">
          {run.output && <pre className="py-out">{run.output}</pre>}
          {run.error && <pre className="py-error">{run.error}</pre>}
          {!run.output && !run.error && !run.html && (
            <pre className="py-out">(ran with no console output)</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default JsRunPanel;
