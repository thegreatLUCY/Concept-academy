import { useRef, useState } from "react";
import { isJsReady, runJs } from "../lib/jsRunner.js";
import AiTutor from "./AiTutor.jsx";

const STARTERS = {
  react: [
    "// Real JSX, compiled and rendered in your browser.",
    "// Define components — the last one (or App) renders below.",
    "",
    "function Greeting({ name }) {",
    "  return <h2>Hello, {name}!</h2>;",
    "}",
    "",
    "function App() {",
    "  const [count, setCount] = useState(0);",
    "  return (",
    "    <div>",
    "      <Greeting name=\"Lucy\" />",
    "      <button onClick={() => setCount(count + 1)}>",
    "        Clicked {count} times",
    "      </button>",
    "    </div>",
    "  );",
    "}"
  ].join("\n"),
  typescript: [
    "// TypeScript: types are stripped, then it runs as JavaScript.",
    "",
    "interface User {",
    "  name: string;",
    "  age: number;",
    "}",
    "",
    "const users: User[] = [",
    "  { name: \"Aya\", age: 25 },",
    "  { name: \"Omar\", age: 31 }",
    "];",
    "",
    "const adults = users.filter((u: User) => u.age >= 18);",
    "console.log(adults.map((u) => u.name).join(\", \"));"
  ].join("\n"),
  jquery: [
    "// jQuery against the live playground page shown on the right.",
    "",
    "$(\"#title\").text(\"Hello from jQuery\");",
    "$(\".item\").addClass(\"highlight\");",
    "$(\"#list\").append($(\"<li>\").text(\"Added by code\"));",
    "console.log(\"items:\", $(\".item\").length);"
  ].join("\n")
};

const TITLES = {
  react: ["React Playground", "Write JSX with hooks — it compiles and renders live."],
  typescript: ["TypeScript Playground", "Write TypeScript — types are checked away, the logic runs for real."],
  jquery: ["jQuery Playground", "Manipulate a live mini-page and watch it change."]
};

function JsPlayground({ flavor, trackTitle, onBack }) {
  const hostRef = useRef(null);
  const [code, setCode] = useState(STARTERS[flavor] ?? STARTERS.typescript);
  const [run, setRun] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, subtitle] = TITLES[flavor] ?? TITLES.typescript;

  async function execute() {
    if (!code.trim() || busy) {
      return;
    }

    setBusy(true);
    setLoading(!isJsReady(flavor));

    try {
      setRun(await runJs(code, flavor, hostRef.current));
    } catch (error) {
      setRun({ output: "", html: "", error: String(error.message ?? error) });
    } finally {
      setBusy(false);
      setLoading(false);
    }
  }

  const showPreview = run && !run.error && (flavor === "jquery" || Boolean(run.html));
  const consoleText = !run ? "" : run.error || run.output || "(no console output)";

  return (
    <main className="playground-shell">
      <header className="playground-topline">
        <div>
          <p className="eyebrow">{trackTitle} Track</p>
          <h1>{title}</h1>
          <p className="playground-subtitle">{subtitle}</p>
        </div>
        <button className="topic-back-button" onClick={onBack}>
          Back to questions
        </button>
      </header>

      <div className="playground-grid">
        <section className="playground-editor" aria-label="Code editor">
          <div className="playground-editor-toolbar">
            <button className="primary-button" onClick={execute} disabled={busy}>
              {loading ? "Starting JS..." : busy ? "Running..." : "Run"}
            </button>
            <button
              className="secondary-button"
              onClick={() => setCode(STARTERS[flavor] ?? STARTERS.typescript)}
              disabled={busy}
            >
              Reset Example
            </button>
          </div>
          <textarea
            className="playground-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck="false"
            aria-label="Code"
          />
        </section>

        <section className="playground-console-wrap" aria-label="Preview and console">
          <div
            className={showPreview ? "js-preview playground-preview" : "js-preview js-preview-hidden"}
            ref={hostRef}
            aria-label="Rendered output"
          />
          <div className="playground-console" role="log">
            {!run && <pre className="py-info">Press Run to compile and execute your code.</pre>}
            {run?.output && <pre className="py-out">{run.output}</pre>}
            {run?.error && <pre className="py-error">{run.error}</pre>}
            {run && !run.output && !run.error && !run.html && (
              <pre className="py-info">(ran with no console output)</pre>
            )}
          </div>
        </section>
      </div>

      <AiTutor context={{ mode: "playground", code, consoleText }} />
    </main>
  );
}

export default JsPlayground;
