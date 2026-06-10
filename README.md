# Concept Academy

An open-source, browser-only teaching platform for programming — a W3Schools/LabEx-style learning app with **1,600+ questions**, **real in-browser Python execution**, **guided projects**, **exams with certificates**, and an **AI tutor**. No backend, no accounts: everything runs client-side and progress lives in your browser.

## Live tracks

| Track | Content |
| --- | --- |
| **Python Zero to Hero** | 4 sets, 74 modules, 740 questions — from "what is a .py file" through OOP, generators, decorators, testing, regex, and Pythonic style. Plus module lessons, guided projects, and a playground. |
| **React Zero to Hero** | 5 sets, 84 modules, 886 questions — from JSX basics through hooks, architecture, routing, server state, and production workflows. |

SQL, TypeScript, NumPy, Pandas, Bash, Linux, and more are planned topic panels awaiting curricula.

## What makes it a teaching app, not just a quiz

- **Lessons before questions** — modules open with a short lesson, key points, and a runnable example (W3Schools-style "try it yourself", but with a real interpreter).
- **Execution-based grading** — Python code answers are *run*, not string-matched. Output is compared against the reference solution's output, or hidden tests (asserts) are executed. Any correct approach passes; broken code that merely "looks right" fails.
- **Real Python in the browser** — [Pyodide](https://pyodide.org) powers a playground with a REPL, a Run button on every Python code question, and `input()` support.
- **Honest progress** — multiple-choice options are shuffled at render time, revealed answers earn no credit, and every attempt is recorded.
- **Review queue (spaced repetition lite)** — wrong or revealed answers resurface on a 3-stage Leitner schedule until you clear them.
- **Exams and certificates** — each set has a 25-question sampled exam (no reveals, graded at the end, 70% to pass) with a printable certificate.
- **Guided projects** — LabEx-style multi-step builds (word frequency analyzer, bank account class, JSON grade book) where each step is verified by running your code against hidden tests.
- **AI tutor** — an OpenRouter-powered Socratic tutor that sees the current question, your attempt, and your run output. It hints before it answers, and escalates help when you are stuck. Bring your own free API key from [openrouter.ai/keys](https://openrouter.ai/keys); it is stored only in your browser.
- **Search** — find any module or concept from the landing page and jump straight to it.
- **Resume** — pick up exactly where you left off.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run audit    # validate all question data
```

The first Python execution downloads the Pyodide runtime (~10 MB) from a CDN; it is cached afterward.

## Project structure

```
src/
  App.jsx                  # app shell: tracks, quiz engine, progress, review, search
  components/              # QuestionBody, ExamMode, ProjectsView, PythonPlayground, AiTutor...
  lib/                     # pyodideRunner, pythonGrader (execution grading), shuffle, textUtils
  data/                    # question sets, lessons, projects
scripts/audit-data.mjs     # structural + balance audit for all content (runs in CI)
```

## Contributing

Content contributions (questions, lessons, projects, new tracks) are the most valuable thing you can add. See [CONTRIBUTING.md](CONTRIBUTING.md) for the question schema, authoring rules, and the audit workflow.

## Roadmap

- In-browser React/JS runner so the React track gets execution-based grading too
- Full spaced-repetition scheduling
- More tracks: SQL (sql.js), TypeScript, NumPy/Pandas (via Pyodide packages)
- Lesson coverage for every module

## License

[MIT](LICENSE)
