import { useState } from "react";
import { isSqlReady, runSql } from "../lib/sqlRunner.js";

function SqlRunPanel({ sql, onResult }) {
  const [run, setRun] = useState(null);
  const [status, setStatus] = useState("idle");

  async function handleRun() {
    if (!sql.trim()) {
      return;
    }

    setStatus(isSqlReady() ? "running" : "loading");

    try {
      const result = await runSql(sql);
      setRun(result);
      onResult?.(result);
    } catch (error) {
      const failed = { columns: [], rows: [], error: String(error.message ?? error) };
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
          disabled={status !== "idle" || !sql.trim()}
        >
          {status === "loading"
            ? "Starting SQL..."
            : status === "running"
              ? "Running..."
              : "Run Query"}
        </button>
        <span className="py-run-hint">
          {status === "loading"
            ? "Downloading the SQL engine (first run only)."
            : "Runs against a real in-browser SQLite database."}
        </span>
      </div>

      {run && (
        <div className="sql-result" role="log" aria-label="Query result">
          {run.error ? (
            <pre className="py-error">{run.error}</pre>
          ) : run.columns.length ? (
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
                  {run.rows.slice(0, 50).map((row, rowIndex) => (
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
                {run.rows.length > 50 ? " (showing first 50)" : ""}
              </p>
            </div>
          ) : (
            <pre className="py-info">
              Statement ran successfully{run.rowsAffected ? ` (${run.rowsAffected} row(s) affected)` : ""}.
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export default SqlRunPanel;
