import { runJs } from "./jsRunner.js";
import { cleanCode } from "./textUtils.js";

const referenceRunCache = new Map();

function normalizeText(text) {
  return String(text ?? "")
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
    .trim();
}

function normalizeHtml(html) {
  return String(html ?? "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

// Everything a run produced that a learner can see: console lines plus the
// rendered markup. Comparing this is what "your code does the same thing"
// means for UI code.
function observable(run) {
  const rendered = normalizeHtml(run.html);
  return [normalizeText(run.output), rendered && `[rendered] ${rendered}`]
    .filter(Boolean)
    .join("\n");
}

function stringMatch(question, answer) {
  const fold = (value) =>
    question.caseInsensitive ? cleanCode(value).toLowerCase() : cleanCode(value);
  const normalized = fold(answer);
  const accepted = question.accepted ?? [question.expected];
  const exactMatch = accepted.some((candidate) => fold(candidate) === normalized);
  const requiredMatch = question.required?.every((snippet) =>
    normalized.includes(fold(snippet))
  );

  return exactMatch || Boolean(requiredMatch);
}

async function referenceRun(question, flavor) {
  if (!referenceRunCache.has(question.id)) {
    // expected solutions for JSX questions are self-contained, so the starter
    // skeleton is deliberately NOT prepended (it would redeclare the component)
    referenceRunCache.set(question.id, await runJs(question.expected, flavor));
  }

  return referenceRunCache.get(question.id);
}

// Grades a JS/JSX/TS typed-code answer by what it DOES where possible:
//   1. Exact match against expected/accepted (no runtime needed).
//   2. Reference solution that doesn't compile/run or produces nothing
//      observable (fragments like `return <Welcome />;`): string matching.
//   3. Learner code that errors: incorrect, with the compiler/runtime error.
//   4. Otherwise: compare console output + rendered markup of both runs.
export async function gradeJs(question, answer, flavor) {
  if (!question.expected) {
    return { correct: stringMatch(question, answer), method: "string" };
  }

  const normalized = cleanCode(answer);
  const accepted = question.accepted ?? [question.expected];

  if (accepted.some((candidate) => cleanCode(candidate) === normalized)) {
    return { correct: true, method: "exact" };
  }

  const reference = await referenceRun(question, flavor);
  const expectedOutput = observable(reference);

  if (reference.error || !expectedOutput) {
    return { correct: stringMatch(question, answer), method: "string" };
  }

  const learnerRun = await runJs(answer, flavor);

  if (learnerRun.error) {
    return {
      correct: false,
      method: "execution",
      detail: learnerRun.error,
      learnerOutput: observable(learnerRun),
      expectedOutput
    };
  }

  const learnerOutput = observable(learnerRun);

  return {
    correct: learnerOutput === expectedOutput,
    method: "execution",
    learnerOutput,
    expectedOutput
  };
}
