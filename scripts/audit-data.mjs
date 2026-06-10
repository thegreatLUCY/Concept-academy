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
import { pythonSet5Modules, pythonSet5Questions, pythonSet5Lessons } from "../src/data/pythonSet5Questions.js";
import { pythonLessons } from "../src/data/pythonLessons.js";
import { reactLessons } from "../src/data/reactLessons.js";
import { sqlSet1Modules, sqlSet1Questions, sqlSet1Lessons } from "../src/data/sqlSet1Questions.js";
import { sqlSet2Modules, sqlSet2Questions, sqlSet2Lessons } from "../src/data/sqlSet2Questions.js";
import { tsSet1Modules, tsSet1Questions, tsSet1Lessons } from "../src/data/tsSet1Questions.js";
import { bashSet1Modules, bashSet1Questions, bashSet1Lessons } from "../src/data/bashSet1Questions.js";
import { linuxSet1Modules, linuxSet1Questions, linuxSet1Lessons } from "../src/data/linuxSet1Questions.js";
import { jquerySet1Modules, jquerySet1Questions, jquerySet1Lessons } from "../src/data/jquerySet1Questions.js";
import { numpySet1Modules, numpySet1Questions, numpySet1Lessons } from "../src/data/numpySet1Questions.js";
import { pandasSet1Modules, pandasSet1Questions, pandasSet1Lessons } from "../src/data/pandasSet1Questions.js";
import { matplotlibSet1Modules, matplotlibSet1Questions, matplotlibSet1Lessons } from "../src/data/matplotlibSet1Questions.js";
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
  ["python-set4", pythonSet4Modules, pythonSet4Questions],
  ["python-set5", pythonSet5Modules, pythonSet5Questions],
  ["sql-set1", sqlSet1Modules, sqlSet1Questions],
  ["sql-set2", sqlSet2Modules, sqlSet2Questions],
  ["ts-set1", tsSet1Modules, tsSet1Questions],
  ["bash-set1", bashSet1Modules, bashSet1Questions],
  ["linux-set1", linuxSet1Modules, linuxSet1Questions],
  ["jquery-set1", jquerySet1Modules, jquerySet1Questions],
  ["numpy-set1", numpySet1Modules, numpySet1Questions],
  ["pandas-set1", pandasSet1Modules, pandasSet1Questions],
  ["matplotlib-set1", matplotlibSet1Modules, matplotlibSet1Questions]
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
const allModuleIds = new Set(sets.flatMap(([, modules]) => modules.map((m) => m.id)));
const allLessons = {
  ...pythonLessons,
  ...reactLessons,
  ...sqlSet1Lessons,
  ...sqlSet2Lessons,
  ...pythonSet5Lessons,
  ...tsSet1Lessons,
  ...bashSet1Lessons,
  ...linuxSet1Lessons,
  ...jquerySet1Lessons,
  ...numpySet1Lessons,
  ...pandasSet1Lessons,
  ...matplotlibSet1Lessons
};
for (const [moduleId, lesson] of Object.entries(allLessons)) {
  if (!allModuleIds.has(moduleId)) fail(`lesson references unknown module ${moduleId}`);
  if (!lesson.summary || !lesson.example) fail(`lesson ${moduleId} missing summary or example`);
}
console.log(`info: ${Object.keys(allLessons).length} module lessons`);

// Projects must have complete steps.
for (const project of pythonProjects) {
  for (const [index, step] of project.steps.entries()) {
    for (const field of ["title", "instructions", "starter", "tests", "hint"]) {
      if (!step[field]) fail(`project ${project.id} step ${index + 1} missing ${field}`);
    }
  }
}
console.log(`info: ${pythonProjects.length} guided projects`);

// Duplicate prompts: identical wording inside one set is almost always a paste error.
const promptMap = new Map();
for (const [setId, , questions] of sets) {
  for (const question of questions) {
    const key = `${setId}::${String(question.prompt).trim().toLowerCase()}::${question.snippet ?? ""}`;
    if (promptMap.has(key)) {
      warn(`duplicate prompt in ${setId}: "${String(question.prompt).slice(0, 70)}" (${promptMap.get(key)} and ${question.id})`);
    } else {
      promptMap.set(key, question.id);
    }
  }
}

// Lesson coverage: which modules still teach nothing before testing.
const lessonedModuleIds = new Set(Object.keys(allLessons));
const uncovered = sets.flatMap(([setId, modules]) =>
  modules.filter((m) => !lessonedModuleIds.has(m.id)).map((m) => `${setId}/${m.id}`)
);
console.log(`info: lesson coverage ${Math.round((lessonedModuleIds.size / allModuleIds.size) * 100)}% (${uncovered.length} modules without lessons)`);

console.log(`\ntotal questions: ${totalQuestions}`);
console.log(failures ? `${failures} FAILURES, ${warnings} warnings` : `ALL CHECKS PASSED (${warnings} warnings)`);
process.exit(failures ? 1 : 0);
