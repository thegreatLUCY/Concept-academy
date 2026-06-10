import { runPython } from "./pyodideRunner.js";
import { cleanCode } from "./textUtils.js";

const referenceRunCache = new Map();

function normalizeOutput(text) {
  return String(text ?? "")
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
    .trim();
}

function withStarter(question, source) {
  return question.starter ? `${question.starter}\n${source}` : source;
}

function stringMatch(question, answer) {
  // caseInsensitive supports command/keyword answers (SQL, shell) where
  // SELECT and select are equally correct.
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

async function referenceRun(question) {
  if (!referenceRunCache.has(question.id)) {
    referenceRunCache.set(question.id, await runPython(withStarter(question, question.expected)));
  }

  return referenceRunCache.get(question.id);
}

// Grades a Python typed-code answer by what the code DOES, not how it is written.
// Resolution order:
//   1. Exact match against expected/accepted (no runtime needed).
//   2. question.tests: run answer + hidden asserts; pass when nothing raises.
//   3. input()-based questions: string matching (auto-running them would trigger prompts).
//   4. Reference solution that errors or prints nothing (file names, terminal commands,
//      file-writing tasks): string matching, the only honest signal available.
//   5. Nondeterministic references (random): learner code must run cleanly AND
//      contain the required snippets.
//   6. Everything else: run both, compare normalized stdout.
export async function gradePythonCode(question, answer) {
  if (!question.expected && !question.tests) {
    return { correct: stringMatch(question, answer), method: "string" };
  }

  const normalized = cleanCode(answer);
  const accepted = question.accepted ?? [question.expected];

  if (accepted.some((candidate) => cleanCode(candidate) === normalized)) {
    return { correct: true, method: "exact" };
  }

  if (question.tests) {
    const run = await runPython(`${withStarter(question, answer)}\n\n${question.tests}`);

    if (run.error) {
      return { correct: false, method: "tests", detail: run.error, learnerOutput: run.output };
    }

    return { correct: true, method: "tests", learnerOutput: run.output };
  }

  const expectedSource = question.expected ?? "";
  const usesInput = /\binput\s*\(/.test(answer) || /\binput\s*\(/.test(expectedSource);

  if (usesInput) {
    return { correct: stringMatch(question, answer), method: "string" };
  }

  const usesRandom = /\brandom\b|\brandint\b|\bchoice\s*\(|\bshuffle\s*\(/.test(expectedSource);

  if (usesRandom) {
    const learnerRun = await runPython(withStarter(question, answer));

    if (learnerRun.error) {
      return { correct: false, method: "execution", detail: learnerRun.error };
    }

    return {
      correct: stringMatch(question, answer),
      method: "string-clean-run",
      learnerOutput: learnerRun.output
    };
  }

  const reference = await referenceRun(question);
  const expectedOutput = normalizeOutput(reference.output);

  if (reference.error || !expectedOutput) {
    return { correct: stringMatch(question, answer), method: "string" };
  }

  const learnerRun = await runPython(withStarter(question, answer));

  if (learnerRun.error) {
    return {
      correct: false,
      method: "execution",
      detail: learnerRun.error,
      learnerOutput: normalizeOutput(learnerRun.output),
      expectedOutput
    };
  }

  const learnerOutput = normalizeOutput(learnerRun.output);

  return {
    correct: learnerOutput === expectedOutput,
    method: "execution",
    learnerOutput,
    expectedOutput
  };
}

// Synchronous fallback used by non-Python tracks and exam pre-grading.
export function gradeCodeByString(question, answer) {
  return stringMatch(question, answer);
}
