import { runSql } from "./sqlRunner.js";
import { cleanCode } from "./textUtils.js";

// SQL keywords are case-insensitive, so string fallbacks fold case.
function fold(value) {
  return cleanCode(value).toLowerCase();
}

function stringMatch(question, answer) {
  const normalized = fold(answer);
  const accepted = question.accepted ?? [question.expected];
  const exact = accepted.some((candidate) => fold(candidate) === normalized);
  const required = question.required?.every((snippet) => normalized.includes(fold(snippet)));
  return exact || Boolean(required);
}

// Order-insensitive unless the answer asks for an order (ORDER BY / ranking),
// in which case row order is part of correctness.
function serializeRows(run, ordered) {
  const lines = run.rows.map((row) => row.map((cell) => String(cell)).join(""));
  if (!ordered) {
    lines.sort();
  }
  return lines.join("");
}

function isSelect(sql) {
  return /^\s*(select|with)\b/i.test(sql);
}

// Grades a SQL answer by EXECUTING it. When the reference is a SELECT, the
// learner's result set is compared to the reference's (true execution grading).
// For DML/DDL (INSERT/UPDATE/CREATE/transactions) we require a clean run and
// fall back to the accepted/required string match, since there is no result set.
export async function gradeSql(question, answer) {
  const expected = question.expected ?? "";

  if (!answer.trim()) {
    return { correct: false, method: "empty" };
  }

  const learnerRun = await runSql(answer);

  if (learnerRun.error) {
    return { correct: false, method: "execution", detail: learnerRun.error };
  }

  // Result-set comparison only makes sense for queries that return rows.
  if (isSelect(expected) && isSelect(answer)) {
    const referenceRun = await runSql(expected);

    if (!referenceRun.error) {
      const ordered = /\border\s+by\b/i.test(expected) || /\bover\s*\(/i.test(expected);
      const correct = serializeRows(learnerRun, ordered) === serializeRows(referenceRun, ordered);

      return {
        correct,
        method: "execution",
        learner: learnerRun,
        expectedRun: referenceRun
      };
    }
  }

  // DML/DDL or an unrunnable reference: ran cleanly, confirm intent by string match.
  return {
    correct: stringMatch(question, answer),
    method: "execution-clean",
    learner: learnerRun
  };
}
