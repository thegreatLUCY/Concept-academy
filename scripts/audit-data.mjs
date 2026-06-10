// Data audit for all question sets. Run with: npm run audit
// Fails (exit 1) on structural problems; prints warnings for content-balance issues.
import { modules as reactSet1Modules, questions as reactSet1Questions } from "../src/data/questions.js";
import { set2Modules, set2Questions } from "../src/data/set2Questions.js";
import { set3Modules, set3Questions } from "../src/data/set3Questions.js";
import { set4Modules, set4Questions } from "../src/data/set4Questions.js";
import { set5Modules, set5Questions } from "../src/data/set5Questions.js";
import { pythonSet1Modules, pythonSet1Questions } from "../src/data/pythonSet1Questions.js";
import { pythonSet2Modules, pythonSet2Questions } from "../src/data/pythonSet2Questions.js";
import { pythonSet3Modules, pythonSet3Questions } from "../src/data/pythonSet3Questions.js";
import { pythonSet4Modules, pythonSet4Questions } from "../src/data/pythonSet4Questions.js";
import { pythonLessons } from "../src/data/pythonLessons.js";
import { pythonProjects } from "../src/data/pythonProjects.js";

// React set 1 predates setId-in-data; the app injects it, so the audit does too.
const sets = [
  ["set1", reactSet1Modules.map((m) => ({ ...m, setId: "set1" })), reactSet1Questions.map((q) => ({ ...q, setId: "set1" }))],
  ["set2", set2Modules, set2Questions],
  ["set3", set3Modules, set3Questions],
  ["set4", set4Modules, set4Questions],
  ["set5", set5Modules, set5Questions],
  ["python-set1", pythonSet1Modules, pythonSet1Questions],
  ["python-set2", pythonSet2Modules, pythonSet2Questions],
  ["python-set3", pythonSet3Modules, pythonSet3Questions],
  ["python-set4", pythonSet4Modules, pythonSet4Questions]
];

let failures = 0;
let warnings = 0;
const fail = (message) => {
  failures++;
  console.log("FAIL:", message);
};
const warn = (message) => {
  warnings++;
  console.log("warn:", message);
};
const clean = (value) => String(value).replace(/\s+/g, "").replace(/"/g, "'");
const allIds = new Set();
let totalQuestions = 0;

for (const [setId, modules, questions] of sets) {
  totalQuestions += questions.length;
  const moduleIds = new Set(modules.map((module) => module.id));
  console.log(`${setId}: ${modules.length} modules, ${questions.length} questions`);

  for (const module of modules) {
    if (module.setId !== setId) fail(`${module.id} module has wrong setId ${module.setId}`);
    if (!questions.some((question) => question.moduleId === module.id)) {
      fail(`${setId}/${module.id} has no questions`);
    }
  }

  for (const question of questions) {
    if (allIds.has(question.id)) fail(`duplicate question id ${question.id}`);
    allIds.add(question.id);
    if (question.setId !== setId) fail(`${question.id} has wrong setId ${question.setId}`);
    if (!moduleIds.has(question.moduleId)) fail(`${question.id} references missing module ${question.moduleId}`);
    if (!question.prompt) fail(`${question.id} missing prompt`);
    if (!question.explanation) fail(`${question.id} missing explanation`);
    if (!question.level) fail(`${question.id} missing level`);

    if (question.type === "mcq") {
      if (!Array.isArray(question.choices) || question.choices.length < 2) {
        fail(`${question.id} mcq has fewer than 2 choices`);
      } else {
        if (!question.choices.includes(question.answer)) fail(`${question.id} mcq answer not in choices`);
        if (new Set(question.choices).size !== question.choices.length) {
          fail(`${question.id} mcq has duplicate choices`);
        }
      }
    } else if (question.type === "tf") {
      if (typeof question.answer !== "boolean") fail(`${question.id} tf answer is not boolean`);
    } else if (question.type === "fill") {
      if (!question.snippet) fail(`${question.id} fill missing snippet`);
      if (!Array.isArray(question.blanks) || !question.blanks.length) {
        fail(`${question.id} fill missing blanks`);
      } else {
        for (const blank of question.blanks) {
          if (!blank.label || !Array.isArray(blank.answers) || !blank.answers.length) {
            fail(`${question.id} has a malformed blank`);
          } else if (question.snippet && !question.snippet.includes(blank.label)) {
            fail(`${question.id} blank label ${blank.label} not present in snippet`);
          }
        }
      }
    } else if (question.type === "code") {
      if (!question.expected && !question.tests) {
        warn(`${question.id} code question has neither expected nor tests`);
      }

      if (question.expected && Array.isArray(question.required) && question.required.length) {
        const targets = [question.expected, ...(question.accepted ?? [])];
        const selfConsistent = targets.some((target) =>
          question.required.every((snippet) => clean(target).includes(clean(snippet)))
        );

        if (!selfConsistent) {
          fail(`${question.id} model answer does not satisfy its own required snippets`);
        }
      }
    } else {
      fail(`${question.id} has unknown type ${question.type}`);
    }
  }
}

// Content-balance reporting. MCQ option order is shuffled at render time, so
// first-position bias is informational; TF imbalance is a real authoring signal.
const allQuestions = sets.flatMap(([, , questions]) => questions);
const mcqs = allQuestions.filter((question) => question.type === "mcq");
const firstChoice = mcqs.filter((question) => question.choices?.[0] === question.answer).length;
console.log(
  `info: MCQ answer-in-first-position rate: ${Math.round((firstChoice / mcqs.length) * 100)}% (neutralized by runtime shuffle)`
);

const tfs = allQuestions.filter((question) => question.type === "tf");
const trueShare = Math.round((tfs.filter((question) => question.answer === true).length / tfs.length) * 100);
if (trueShare > 80 || trueShare < 20) {
  warn(`True/False answers are ${trueShare}% one-sided across the catalog — balance new sets`);
} else {
  console.log(`info: True/False answers are ${trueShare}% True`);
}

// Lessons must map to real modules.
const pythonModuleIds = new Set(
  [pythonSet1Modules, pythonSet2Modules, pythonSet3Modules, pythonSet4Modules].flat().map((m) => m.id)
);
for (const moduleId of Object.keys(pythonLessons)) {
  if (!pythonModuleIds.has(moduleId)) fail(`lesson references unknown module ${moduleId}`);
}
console.log(`info: ${Object.keys(pythonLessons).length} module lessons`);

// Projects must have complete steps.
for (const project of pythonProjects) {
  for (const [index, step] of project.steps.entries()) {
    for (const field of ["title", "instructions", "starter", "tests", "hint"]) {
      if (!step[field]) fail(`project ${project.id} step ${index + 1} missing ${field}`);
    }
  }
}
console.log(`info: ${pythonProjects.length} guided projects`);

console.log(`\ntotal questions: ${totalQuestions}`);
console.log(failures ? `${failures} FAILURES, ${warnings} warnings` : `ALL CHECKS PASSED (${warnings} warnings)`);
process.exit(failures ? 1 : 0);
