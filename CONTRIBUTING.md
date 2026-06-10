# Contributing to Concept Academy

The most valuable contributions are **content**: questions, lessons, guided projects, and new curriculum tracks. This guide documents the data formats and the rules that keep the teaching quality high.

## Workflow

1. Fork and branch.
2. Add or edit data files under `src/data/`.
3. Run `npm run audit` — it must pass with no failures.
4. Run `npm run build` and smoke-test with `npm run dev`.
5. Open a PR. CI runs the audit and build automatically.

## Question schema

Questions live in per-set files (e.g. `src/data/pythonSet2Questions.js`) that export `<set>Modules` and `<set>Questions`. Use the helper pattern from the existing files (`mcq`, `tf`, `fill`, `typed`, `attach`).

Common fields (added by `attach`): `id`, `setId`, `moduleId`, plus per-question `type`, `level`, `prompt`, `explanation`.

| Type | Fields | Graded by |
| --- | --- | --- |
| `mcq` | `choices[]`, `answer`, optional `snippet` | answer equality. **Options are shuffled at render time — never rely on position.** |
| `tf` | boolean `answer`, optional `snippet` | equality |
| `fill` | `snippet` containing blank labels, `blanks[{label, answers[]}]` | normalized string match per blank |
| `code` | `starter`, `expected`, `required[]`, optional `accepted[]`, optional `tests` | **Python: executed.** Output is compared to the reference solution's output, or `tests` (asserts) run after the learner's code. Non-runnable answers (commands, filenames) fall back to string matching. |

### Code question notes

- `starter` is shown to the learner AND prepended when code is executed — put required context (variables, imports, class scaffolding) there.
- `expected` must be a real, runnable model answer. The audit verifies it satisfies its own `required` snippets.
- Prefer adding `tests` (plain `assert` lines) for function-writing questions — they grade any correct implementation.
- Avoid `input()` and `random` in `expected` unless necessary; those questions can only be string-matched.

## Authoring rules

- **Teach before you test.** Question 1 of a module should be answerable from the module's lesson or from recognition; difficulty ramps to typed code by question 10.
- At least two questions per important concept; more for foundational or commonly misunderstood ones.
- Rephrase and add twists — never copy reference material verbatim.
- Write explanations that teach the *why*, not just restate the answer.
- **Balance True/False answers** roughly 50/50 within a module (the audit warns on catalog-level imbalance).
- Include "trap" questions for classic real-world mistakes (aliasing, mutation, off-by-one, type confusion) — with explanations that defuse them.
- Every module needs exactly the question count you register, globally unique IDs (the `attach` helper handles this), and a valid `moduleId`.

## Lessons

`src/data/pythonLessons.js` maps `moduleId` → `{ summary, points[], example }`. The example must be runnable Python (it gets a Run button). Keep summaries to 2–4 sentences focused on the *one idea* the module teaches.

## Guided projects

`src/data/pythonProjects.js`. Each step needs `title`, `instructions`, `starter`, `tests` (asserts with helpful messages), and `hint`. Steps are verified by executing learner code + tests in a fresh namespace; design tests so any correct implementation passes. Make each step's starter self-contained (include prior-step solutions the step depends on).

## Adding a whole new track

1. Discuss the concept list in an issue first.
2. Create the set data files and register them in `src/App.jsx` (`tracks`, curriculum sets, modules, questions).
3. Add the topic card in `topicCatalog`.
4. Extend `scripts/audit-data.mjs` with the new set imports.
5. Execution-graded tracks need a runtime (Python uses Pyodide; SQL could use sql.js).

## Code contributions

Match the existing style (plain React + CSS, no extra dependencies without discussion). The quiz engine lives in `src/App.jsx`; grading in `src/lib/pythonGrader.js`. Keep the app backend-free.
