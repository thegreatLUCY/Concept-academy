import { useState } from "react";
import { SEED_SCHEMA, isSqlReady, runSql } from "../lib/sqlRunner.js";
import AiTutor from "./AiTutor.jsx";

const STARTER_SQL = [
  "-- Real SQLite, running in your browser.",
  "-- Every run starts from the same seeded database, so experiment freely.",
  "",
  "SELECT name, age, city",
  "FROM users",
  "WHERE age >= 18",
  "ORDER BY age DESC;"
].join("\n");

const SAMPLES = [
  {
    label: "Join orders to users",
    sql: "SELECT users.name, orders.total, orders.status\nFROM orders\nJOIN users ON users.id = orders.user_id;"
  },
  {
    label: "Sales per city",
    sql: "SELECT city, SUM(amount) AS total_sales\nFROM sales\nGROUP BY city\nORDER BY total_sales DESC;"
  },
  {
    label: "Rank players (window fn)",
    sql: "SELECT name, score,\n  RANK() OVER (ORDER BY score DESC) AS position\nFROM players;"
  },
  {
    label: "Try an INSERT",
    sql: "INSERT INTO products (id, name, price, category, stock)\nVALUES (6, 'Kettle', 25.0, 'home', 8);\n\nSELECT * FROM products;"
  }
];

function SqlPlayground({ onBack }) {
  const [sql, setSql] = useState(STARTER_SQL);
  const [run, setRun] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);

  async function execute(source = sql) {
    if (!source.trim() || busy) {
      return;
    }

    setBusy(true);
    setLoading(!isSqlReady());

    try {
      setRun(await runSql(source));
    } catch (error) {
      setRun({ columns: [], rows: [], error: String(error.message ?? error) });
    } finally {
      setBusy(false);
      setLoading(false);
    }
  }

  const consoleText = !run
    ? ""
    : run.error ||
      [run.columns.join(" | "), ...run.rows.slice(0, 10).map((row) => row.join(" | "))].join("\n");

  return (
    <main className="playground-shell">
      <header className="playground-topline">
        <div>
          <p className="eyebrow">SQL Track</p>
          <h1>SQL Playground</h1>
          <p className="playground-subtitle">
            Query a real SQLite database in your browser. Every run starts from the same seeded
            data, so INSERT, UPDATE, and DELETE are safe to try.
          </p>
        </div>
        <button className="topic-back-button" onClick={onBack}>
          Back to questions
        </button>
      </header>

      <div className="playground-grid">
        <section className="playground-editor" aria-label="SQL editor">
          <div className="playground-editor-toolbar">
            <button className="primary-button" onClick={() => execute()} disabled={busy}>
              {loading ? "Starting SQL..." : busy ? "Running..." : "Run Query"}
            </button>
            <div className="sample-queries" aria-label="Sample queries">
              {SAMPLES.map((sample) => (
                <button
                  className="ghost-button"
                  key={sample.label}
                  onClick={() => {
                    setSql(sample.sql);
                    execute(sample.sql);
                  }}
                  disabled={busy}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="playground-code"
            value={sql}
            onChange={(event) => setSql(event.target.value)}
            spellCheck="false"
            aria-label="SQL query"
          />
        </section>

        <section className="playground-console-wrap" aria-label="Query result and schema">
          <div className="playground-console sql-playground-result" role="log">
            {!run && <pre className="py-info">Press Run Query to see results here.</pre>}
            {run?.error && <pre className="py-error">{run.error}</pre>}
            {run && !run.error && run.columns.length > 0 && (
              <div className="sql-table-wrap">
                <table className="sql-table">
                  <thead>
                    <tr>
                      {run.columns.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {run.rows.slice(0, 100).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell === null ? "NULL" : String(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="sql-rowcount">
                  {run.rows.length} row{run.rows.length === 1 ? "" : "s"}
                  {run.rows.length > 100 ? " (showing first 100)" : ""}
                </p>
              </div>
            )}
            {run && !run.error && run.columns.length === 0 && (
              <pre className="py-info">
                Statement ran successfully{run.rowsAffected ? ` (${run.rowsAffected} row(s) affected)` : ""}.
              </pre>
            )}
          </div>

          <details className="schema-panel">
            <summary>Database schema ({SEED_SCHEMA.length} tables)</summary>
            <div className="schema-tables">
              {SEED_SCHEMA.map(({ table, columns }) => (
                <button
                  className="schema-table"
                  key={table}
                  onClick={() => {
                    const query = `SELECT * FROM ${table};`;
                    setSql(query);
                    execute(query);
                  }}
                  title={`SELECT * FROM ${table}`}
                >
                  <strong>{table}</strong>
                  <span>{columns.join(", ")}</span>
                </button>
              ))}
            </div>
          </details>
        </section>
      </div>

      <AiTutor context={{ mode: "playground", code: sql, consoleText }} />
    </main>
  );
}

export default SqlPlayground;
