import { useEffect, useMemo, useRef, useState } from "react";
import AiTutor from "./components/AiTutor.jsx";
import ExamMode from "./components/ExamMode.jsx";
import ProjectsView from "./components/ProjectsView.jsx";
import PythonPlayground from "./components/PythonPlayground.jsx";
import PythonRunPanel from "./components/PythonRunPanel.jsx";
import SqlRunPanel from "./components/SqlRunPanel.jsx";
import JsRunPanel from "./components/JsRunPanel.jsx";
import SqlPlayground from "./components/SqlPlayground.jsx";
import JsPlayground from "./components/JsPlayground.jsx";
import ReferenceView from "./components/ReferenceView.jsx";
import PlacementQuiz from "./components/PlacementQuiz.jsx";
import { AnswerBlock, QuestionBody } from "./components/QuestionBody.jsx";
import { modules as set1Modules, questions as set1Questions } from "./data/questions.js";
import { set2Modules, set2Questions } from "./data/set2Questions.js";
import { set3Modules, set3Questions } from "./data/set3Questions.js";
import { set4Modules, set4Questions } from "./data/set4Questions.js";
import { set5Modules, set5Questions } from "./data/set5Questions.js";
import { set6Modules, set6Questions, set6Lessons } from "./data/set6Questions.js";
import { pythonSet1Modules, pythonSet1Questions } from "./data/pythonSet1Questions.js";
import { pythonSet2Modules, pythonSet2Questions } from "./data/pythonSet2Questions.js";
import { pythonSet3Modules, pythonSet3Questions } from "./data/pythonSet3Questions.js";
import { pythonSet4Modules, pythonSet4Questions } from "./data/pythonSet4Questions.js";
import { pythonSet5Modules, pythonSet5Questions, pythonSet5Lessons } from "./data/pythonSet5Questions.js";
import { pythonLessons } from "./data/pythonLessons.js";
import { reactLessons } from "./data/reactLessons.js";
import { pythonExtraLessons } from "./data/pythonLessonsExtra.js";
import { sqlSet1Modules, sqlSet1Questions, sqlSet1Lessons } from "./data/sqlSet1Questions.js";
import { sqlSet2Modules, sqlSet2Questions, sqlSet2Lessons } from "./data/sqlSet2Questions.js";
import { tsSet1Modules, tsSet1Questions, tsSet1Lessons } from "./data/tsSet1Questions.js";
import { bashSet1Modules, bashSet1Questions, bashSet1Lessons } from "./data/bashSet1Questions.js";
import { linuxSet1Modules, linuxSet1Questions, linuxSet1Lessons } from "./data/linuxSet1Questions.js";
import { jquerySet1Modules, jquerySet1Questions, jquerySet1Lessons } from "./data/jquerySet1Questions.js";
import { numpySet1Modules, numpySet1Questions, numpySet1Lessons } from "./data/numpySet1Questions.js";
import { pandasSet1Modules, pandasSet1Questions, pandasSet1Lessons } from "./data/pandasSet1Questions.js";
import { matplotlibSet1Modules, matplotlibSet1Questions, matplotlibSet1Lessons } from "./data/matplotlibSet1Questions.js";
import { cyberSet1Modules, cyberSet1Questions, cyberSet1Lessons } from "./data/cyberSet1Questions.js";
import { cyberSet2Modules, cyberSet2Questions, cyberSet2Lessons } from "./data/cyberSet2Questions.js";
import { cyberSet3Modules, cyberSet3Questions, cyberSet3Lessons } from "./data/cyberSet3Questions.js";
import { gradePythonCode, gradeCodeByString } from "./lib/pythonGrader.js";
import { gradeSql } from "./lib/sqlGrader.js";
import { gradeJs } from "./lib/jsGrader.js";
import { isJsRuntime, looksRunnableJs } from "./lib/jsRunner.js";
import { cleanCode, cleanText } from "./lib/textUtils.js";

const STORAGE_KEY = "react-zero-to-hero-progress";
const RESUME_KEY = "concept-academy-resume";
const THEME_KEY = "concept-academy-theme";
const DAY_MS = 86400000;
const reactCurriculumSets = [
  { id: "set1", title: "Set 1", label: "Foundations" },
  { id: "set2", title: "Set 2", label: "Interactive React" },
  { id: "set3", title: "Set 3", label: "JavaScript Maturity" },
  { id: "set4", title: "Set 4", label: "React Architecture" },
  { id: "set5", title: "Set 5", label: "Routing + Server Data" },
  { id: "set6", title: "Set 6", label: "Modern React 19" },
  { id: "all", title: "All Sets", label: "Everything" }
];
const reactModules = [
  ...set1Modules.map((module) => ({ ...module, setId: "set1" })),
  ...set2Modules,
  ...set3Modules,
  ...set4Modules,
  ...set5Modules,
  ...set6Modules
];
const reactQuestions = [
  ...set1Questions.map((question) => ({ ...question, setId: "set1" })),
  ...set2Questions,
  ...set3Questions,
  ...set4Questions,
  ...set5Questions,
  ...set6Questions
].map((question, order) => ({ ...question, order }));
const pythonCurriculumSets = [
  { id: "python-set1", title: "Set 1", label: "Python Foundations" },
  { id: "python-set2", title: "Set 2", label: "Control Flow + Collections" },
  { id: "python-set3", title: "Set 3", label: "Functions, Errors, Files" },
  { id: "python-set4", title: "Set 4", label: "OOP + Professional Python" },
  { id: "python-set5", title: "Set 5", label: "Advanced Python" },
  { id: "python-all", title: "All Sets", label: "Everything" }
];
const pythonModules = [
  ...pythonSet1Modules,
  ...pythonSet2Modules,
  ...pythonSet3Modules,
  ...pythonSet4Modules,
  ...pythonSet5Modules
];
const pythonQuestions = [
  ...pythonSet1Questions,
  ...pythonSet2Questions,
  ...pythonSet3Questions,
  ...pythonSet4Questions,
  ...pythonSet5Questions
].map((question, order) => ({ ...question, order }));
// Single-set tracks share one constructor shape.
function makeTrack({ id, title, setId, setLabel, modules, questions, runtime = null }) {
  return {
    id,
    title: `${title} Zero to Hero`,
    setTitle: title,
    defaultSet: setId,
    runtime,
    sets: [{ id: setId, title: "Set 1", label: setLabel }],
    modules,
    questions: questions.map((question, order) => ({ ...question, order }))
  };
}

const tracks = {
  react: {
    id: "react",
    title: "React Zero to Hero",
    setTitle: "React",
    runtime: "react",
    // learners land at the start of the teaching path, not the hardest set
    defaultSet: "set1",
    sets: reactCurriculumSets,
    modules: reactModules,
    questions: reactQuestions
  },
  python: {
    id: "python",
    title: "Python Zero to Hero",
    setTitle: "Python",
    runtime: "python",
    defaultSet: "python-set1",
    sets: pythonCurriculumSets,
    modules: pythonModules,
    questions: pythonQuestions
  },
  sql: {
    id: "sql",
    title: "SQL Zero to Hero",
    setTitle: "SQL",
    runtime: "sql",
    defaultSet: "sql-set1",
    sets: [
      { id: "sql-set1", title: "Set 1", label: "SQL Foundations" },
      { id: "sql-set2", title: "Set 2", label: "Intermediate SQL" },
      { id: "sql-all", title: "All Sets", label: "Everything" }
    ],
    modules: [...sqlSet1Modules, ...sqlSet2Modules],
    questions: [...sqlSet1Questions, ...sqlSet2Questions].map((question, order) => ({ ...question, order }))
  },
  typescript: makeTrack({ id: "typescript", title: "TypeScript", setId: "ts-set1", setLabel: "TypeScript Foundations", modules: tsSet1Modules, questions: tsSet1Questions, runtime: "typescript" }),
  bash: makeTrack({ id: "bash", title: "Bash", setId: "bash-set1", setLabel: "Shell Foundations", modules: bashSet1Modules, questions: bashSet1Questions }),
  linux: makeTrack({ id: "linux", title: "Linux", setId: "linux-set1", setLabel: "Linux Foundations", modules: linuxSet1Modules, questions: linuxSet1Questions }),
  jquery: makeTrack({ id: "jquery", title: "jQuery", setId: "jquery-set1", setLabel: "jQuery + Migration", modules: jquerySet1Modules, questions: jquerySet1Questions, runtime: "jquery" }),
  numpy: makeTrack({ id: "numpy", title: "NumPy", setId: "numpy-set1", setLabel: "Array Foundations", modules: numpySet1Modules, questions: numpySet1Questions, runtime: "python" }),
  pandas: makeTrack({ id: "pandas", title: "Pandas", setId: "pandas-set1", setLabel: "DataFrame Foundations", modules: pandasSet1Modules, questions: pandasSet1Questions, runtime: "python" }),
  matplotlib: makeTrack({ id: "matplotlib", title: "Matplotlib", setId: "matplotlib-set1", setLabel: "Visualization Foundations", modules: matplotlibSet1Modules, questions: matplotlibSet1Questions }),
  cybersecurity: {
    id: "cybersecurity",
    title: "Cybersecurity Zero to Hero",
    setTitle: "Cybersecurity",
    defaultSet: "cyber-set1",
    sets: [
      { id: "cyber-set1", title: "Set 1", label: "Security Foundations" },
      { id: "cyber-set2", title: "Set 2", label: "Defending Systems & Networks" },
      { id: "cyber-set3", title: "Set 3", label: "Offensive-Minded Defense" },
      { id: "cyber-all", title: "All Sets", label: "Everything" }
    ],
    modules: [...cyberSet1Modules, ...cyberSet2Modules, ...cyberSet3Modules],
    questions: [...cyberSet1Questions, ...cyberSet2Questions, ...cyberSet3Questions].map((question, order) => ({ ...question, order }))
  }
};

const lessonsByModule = {
  ...set6Lessons,
  ...reactLessons,
  ...pythonLessons,
  ...pythonExtraLessons,
  ...sqlSet1Lessons,
  ...sqlSet2Lessons,
  ...pythonSet5Lessons,
  ...tsSet1Lessons,
  ...bashSet1Lessons,
  ...linuxSet1Lessons,
  ...jquerySet1Lessons,
  ...numpySet1Lessons,
  ...pandasSet1Lessons,
  ...matplotlibSet1Lessons,
  ...cyberSet1Lessons,
  ...cyberSet2Lessons,
  ...cyberSet3Lessons
};
const allLiveQuestions = Object.values(tracks).flatMap((track) => track.questions);
const allLiveModules = Object.values(tracks).flatMap((track) => track.modules);
const searchableModules = Object.values(tracks).flatMap((track) =>
  track.modules.map((module) => ({
    trackId: track.id,
    trackTitle: track.setTitle,
    module,
    setLabel: track.sets.find((set) => set.id === module.setId)?.label ?? ""
  }))
);
const searchEntryByModuleId = Object.fromEntries(
  searchableModules.map((entry) => [entry.module.id, entry])
);
const topicCatalog = [
  {
    id: "react",
    title: "React",
    label: "Frontend UI development",
    description: "Components, hooks, routing, forms, server state, architecture, and production workflows.",
    mark: "Rx",
    accent: "#0891b2",
    status: "Available"
  },
  {
    id: "sql",
    title: "SQL",
    label: "Relational data querying",
    description: "Tables, joins, aggregation, filtering, schema reasoning, and real query practice.",
    mark: "SQL",
    accent: "#4f46e5",
    status: "Available"
  },
  {
    id: "jquery",
    title: "jQuery",
    label: "Legacy DOM workflows",
    description: "Selectors, events, DOM updates, AJAX, plugins, and migration thinking.",
    mark: "jQ",
    accent: "#0369a1",
    status: "Available"
  },
  {
    id: "python",
    title: "Python",
    label: "Programming fundamentals",
    description: "Files, terminal workflow, syntax, input, variables, data types, strings, and beginner errors.",
    mark: "Py",
    accent: "#b45309",
    status: "Available"
  },
  {
    id: "typescript",
    title: "TypeScript",
    label: "Typed JavaScript",
    description: "Types, interfaces, unions, generics, narrowing, API types, and React typing.",
    mark: "TS",
    accent: "#2563eb",
    status: "Available"
  },
  {
    id: "matplotlib",
    title: "Matplotlib",
    label: "Python visualization",
    description: "Figures, axes, plots, labels, styling, subplots, and chart interpretation.",
    mark: "plt",
    accent: "#c026d3",
    status: "Available"
  },
  {
    id: "numpy",
    title: "NumPy",
    label: "Numerical arrays",
    description: "Arrays, shapes, slicing, broadcasting, vectorized operations, and statistics.",
    mark: "NP",
    accent: "#0d9488",
    status: "Available"
  },
  {
    id: "pandas",
    title: "Pandas",
    label: "Data analysis tables",
    description: "Series, DataFrames, filtering, grouping, joins, cleanup, and analysis workflows.",
    mark: "pd",
    accent: "#7c3aed",
    status: "Available"
  },
  {
    id: "bash",
    title: "Bash",
    label: "Shell scripting",
    description: "Commands, pipes, variables, loops, scripts, permissions, and automation.",
    mark: "$_",
    accent: "#16a34a",
    status: "Available"
  },
  {
    id: "linux",
    title: "Linux",
    label: "Operating system basics",
    description: "Filesystem, permissions, processes, users, packages, services, and troubleshooting.",
    mark: "LX",
    accent: "#ea580c",
    status: "Available"
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    label: "Defensive security & ethics",
    description: "CIA triad, threats and risk, crypto, web defense (XSS, SQLi, CSRF), OWASP, threat modeling, blue team, forensics, and authorized testing ethics.",
    mark: "Sec",
    accent: "#e11d48",
    status: "Available"
  }
];

// W3Schools-style curriculum: the library leads with ordered learning paths,
// not a flat grid — each step says when to take it and what it builds on.
const learningPaths = [
  {
    id: "data",
    title: "Python & Data",
    tagline: "One language from your first print() to real data analysis.",
    steps: [
      { id: "python", note: "Start here — no prerequisites, the foundation for everything below" },
      { id: "sql", note: "Query data where it lives — pairs with Python, needs none of it" },
      { id: "numpy", note: "Fast numeric arrays — take after Python sets 1–3" },
      { id: "pandas", note: "DataFrames for messy real-world data — builds on NumPy" },
      { id: "matplotlib", note: "Chart what you analyzed — best after NumPy and Pandas" }
    ],
    placement: [
      { trackId: "python", setId: "python-set1", label: "Python Set 1 — Foundations", reason: "Lock in syntax, variables, strings, and types first; everything else in this path leans on them." },
      { trackId: "python", setId: "python-set2", label: "Python Set 2 — Control Flow + Collections", reason: "You know the syntax — now master loops, conditions, lists, and dictionaries." },
      { trackId: "python", setId: "python-set3", label: "Python Set 3 — Functions, Errors, Files", reason: "Comfortable with collections — time for functions, exceptions, and real file work." },
      { trackId: "python", setId: "python-set4", label: "Python Set 4 — OOP + Professional Python", reason: "You write working Python — level up to classes and professional patterns." },
      { trackId: "sql", setId: "sql-set1", label: "SQL Set 1 — Foundations", reason: "Your Python is solid; add querying so you can work with data where it lives." },
      { trackId: "numpy", setId: "numpy-set1", label: "NumPy — Array Foundations", reason: "Python and SQL are covered — start the data-analysis stack with arrays." }
    ]
  },
  {
    id: "web",
    title: "Web Development",
    tagline: "Build the interfaces people use, then harden them with types.",
    steps: [
      { id: "react", note: "Start here — components, hooks, and whole apps from scratch" },
      { id: "typescript", note: "Add a type system once you can build with React" },
      { id: "jquery", note: "Optional — read and migrate the legacy code you'll meet at work" }
    ],
    placement: [
      { trackId: "react", setId: "set1", label: "React Set 1 — Foundations", reason: "Start with JSX, components, and props — the vocabulary every later set assumes." },
      { trackId: "react", setId: "set2", label: "React Set 2 — Interactive React", reason: "You can read JSX — now make it interactive with state, events, and effects." },
      { trackId: "react", setId: "set3", label: "React Set 3 — JavaScript Maturity", reason: "Solid on hooks basics — strengthen the JavaScript that powers real apps." },
      { trackId: "react", setId: "set4", label: "React Set 4 — React Architecture", reason: "You build features — learn to structure whole applications." },
      { trackId: "react", setId: "set5", label: "React Set 5 — Routing + Server Data", reason: "Architecture is in place — connect routing and server state." },
      { trackId: "react", setId: "set6", label: "React Set 6 — Modern React 19", reason: "You know classic React — learn the React 19 way: Actions, use(), and Server Components." },
      { trackId: "typescript", setId: "ts-set1", label: "TypeScript — Foundations", reason: "Your React is strong; add the type system professional teams expect." }
    ]
  },
  {
    id: "systems",
    title: "Systems & Security",
    tagline: "Command the machine, automate it, then learn to defend it.",
    steps: [
      { id: "linux", note: "Start here — the operating system everything runs on" },
      { id: "bash", note: "Automate the system you now understand" },
      { id: "cybersecurity", note: "Defend it all — builds on Linux, networking, and the web" }
    ],
    placement: [
      { trackId: "linux", setId: "linux-set1", label: "Linux — Foundations", reason: "Learn the filesystem, permissions, and processes before automating or defending anything." },
      { trackId: "bash", setId: "bash-set1", label: "Bash — Shell Foundations", reason: "You know your way around Linux — automate it with the shell." },
      { trackId: "cybersecurity", setId: "cyber-set1", label: "Cybersecurity Set 1 — Security Foundations", reason: "With systems skills in place, start defensive security from the CIA triad up." },
      { trackId: "cybersecurity", setId: "cyber-set2", label: "Cybersecurity Set 2", reason: "Foundations are solid — move into web defense and OWASP territory." },
      { trackId: "cybersecurity", setId: "cyber-set3", label: "Cybersecurity Set 3", reason: "You think like a defender — finish with blue team, forensics, and ethics." }
    ]
  }
];

// Compact text view of a SQL result set, for the AI tutor context and feedback.
function sqlResultToText(run) {
  if (!run || !run.columns?.length) {
    return "(no rows)";
  }

  const header = run.columns.join(" | ");
  const body = run.rows
    .slice(0, 10)
    .map((row) => row.map((cell) => (cell === null ? "NULL" : String(cell))).join(" | "))
    .join("\n");

  return `${header}\n${body}`;
}

// Progress records: { status: "passed"|"failed"|"revealed", attempts, box, due, updatedAt }.
// box is a 3-stage Leitner level — questions below box 3 resurface in the review queue.
function loadProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
    const migrated = {};

    for (const [id, value] of Object.entries(raw)) {
      migrated[id] =
        value === true
          ? { status: "passed", attempts: 1, box: 3, due: null, updatedAt: Date.now() }
          : value;
    }

    return migrated;
  } catch {
    return {};
  }
}

function readResumePoint() {
  try {
    return JSON.parse(localStorage.getItem(RESUME_KEY));
  } catch {
    return null;
  }
}

function readThemePreference() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return ["system", "light", "dark"].includes(savedTheme) ? savedTheme : "system";
  } catch {
    return "system";
  }
}

function isDueForReview(record) {
  if (!record) {
    return false;
  }

  if (record.status === "failed" || record.status === "revealed") {
    return true;
  }

  return (record.box ?? 3) < 3 && (record.due ?? 0) <= Date.now();
}

function ThemeToggle({ themePreference, onThemeChange }) {
  return (
    <div className="theme-toggle" aria-label="Theme preference">
      {["system", "light", "dark"].map((theme) => (
        <button
          className={themePreference === theme ? "active" : ""}
          key={theme}
          onClick={() => onThemeChange(theme)}
          type="button"
        >
          {theme}
        </button>
      ))}
    </div>
  );
}

function App() {
  const [view, setView] = useState("topics");
  const [themePreference, setThemePreference] = useState(readThemePreference);
  const [topicFilter, setTopicFilter] = useState("");
  const [topicNotice, setTopicNotice] = useState("");
  const [activeTopic, setActiveTopic] = useState("react");
  const [activeSet, setActiveSet] = useState(tracks.react.defaultSet);
  const [activeModule, setActiveModule] = useState("all");
  const [questionIndex, setQuestionIndex] = useState(0);
  const isPopNavigation = useRef(false);
  const [placementPath, setPlacementPath] = useState(null);

  // Browser Back returns to the previous screen (track → landing page)
  // instead of leaving the site: each view change pushes a history entry.
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ view: "topics" }, "");
    }

    const onPop = (event) => {
      isPopNavigation.current = true;
      setView(event.state?.view ?? "topics");
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (isPopNavigation.current) {
      isPopNavigation.current = false;
      return;
    }

    if (view !== "topics") {
      window.history.pushState({ view }, "");
    }
  }, [view]);
  const [choice, setChoice] = useState(null);
  const [fillAnswers, setFillAnswers] = useState({});
  const [codeAnswer, setCodeAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [checking, setChecking] = useState(false);
  const [gradeDetail, setGradeDetail] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [lastRun, setLastRun] = useState(null);
  const [reviewIds, setReviewIds] = useState([]);
  const [lessonToggles, setLessonToggles] = useState({});
  const [progress, setProgress] = useState(loadProgress);

  const activeTrack = tracks[activeTopic] ?? tracks.react;
  const isAllSet = activeSet === "all" || activeSet.endsWith("-all");
  const isReviewMode = activeModule === "__review__";
  const moduleOrder = useMemo(
    () => Object.fromEntries(activeTrack.modules.map((module, order) => [module.id, order])),
    [activeTrack]
  );
  const moduleLookup = useMemo(
    () => Object.fromEntries(activeTrack.modules.map((module) => [module.id, module])),
    [activeTrack]
  );

  const activeSetMeta = activeTrack.sets.find((set) => set.id === activeSet) ?? activeTrack.sets[0];
  const setQuestions = useMemo(() => {
    const selectedQuestions =
      isAllSet
        ? activeTrack.questions
        : activeTrack.questions.filter((question) => question.setId === activeSet);

    return [...selectedQuestions].sort(
      (a, b) =>
        (moduleOrder[a.moduleId] ?? 0) - (moduleOrder[b.moduleId] ?? 0) || a.order - b.order
    );
  }, [activeSet, activeTrack, isAllSet, moduleOrder]);
  const visibleModules = useMemo(() => {
    if (isAllSet) {
      return activeTrack.modules;
    }

    return activeTrack.modules.filter((module) => module.setId === activeSet);
  }, [activeSet, activeTrack, isAllSet]);
  const reviewQueue = useMemo(
    () => activeTrack.questions.filter((question) => isDueForReview(progress[question.id])),
    [activeTrack, progress]
  );
  const filteredQuestions = useMemo(() => {
    if (isReviewMode) {
      const idSet = new Set(reviewIds);
      return activeTrack.questions.filter((question) => idSet.has(question.id));
    }

    if (activeModule === "all") {
      return setQuestions;
    }

    return setQuestions.filter((question) => question.moduleId === activeModule);
  }, [activeModule, activeTrack, isReviewMode, reviewIds, setQuestions]);

  const currentQuestion = filteredQuestions[questionIndex] ?? filteredQuestions[0];
  const isPassed = (questionId) => progress[questionId]?.status === "passed";
  const answeredCount = setQuestions.filter((question) => isPassed(question.id)).length;
  const progressPercent = setQuestions.length
    ? Math.round((answeredCount / setQuestions.length) * 100)
    : 0;
  const currentNumber = questionIndex + 1;
  const totalAnsweredCount = allLiveQuestions.filter((question) => isPassed(question.id)).length;
  const filteredTopics = useMemo(() => {
    const normalizedFilter = cleanText(topicFilter).toLowerCase();

    if (!normalizedFilter) {
      return topicCatalog;
    }

    return topicCatalog.filter((topic) =>
      [topic.title, topic.label, topic.description]
        .join(" ")
        .toLowerCase()
        .includes(normalizedFilter)
    );
  }, [topicFilter]);
  const searchResults = useMemo(() => {
    const query = cleanText(topicFilter).toLowerCase();

    if (query.length < 2) {
      return [];
    }

    const seen = new Set();
    const results = [];
    const addModule = (moduleId) => {
      const entry = searchEntryByModuleId[moduleId];

      if (entry && !seen.has(moduleId) && results.length < 8) {
        seen.add(moduleId);
        results.push(entry);
      }
    };

    for (const entry of searchableModules) {
      if (entry.module.title.toLowerCase().includes(query)) {
        addModule(entry.module.id);
      }
    }

    if (results.length < 8) {
      for (const question of allLiveQuestions) {
        if (results.length >= 8) {
          break;
        }

        if (question.prompt.toLowerCase().includes(query)) {
          addModule(question.moduleId);
        }
      }
    }

    return results;
  }, [topicFilter]);

  useEffect(() => {
    if (view === "quiz") {
      localStorage.setItem(
        RESUME_KEY,
        JSON.stringify({
          topic: activeTopic,
          set: activeSet,
          module: isReviewMode ? "all" : activeModule,
          index: isReviewMode ? 0 : questionIndex,
          updatedAt: Date.now()
        })
      );
    }
  }, [view, activeTopic, activeSet, activeModule, questionIndex, isReviewMode]);

  useEffect(() => {
    const accent = topicCatalog.find((topic) => topic.id === activeTopic)?.accent ?? "#15b77f";
    document.documentElement.style.setProperty("--track-accent", accent);
  }, [activeTopic]);

  useEffect(() => {
    const root = document.documentElement;

    if (themePreference === "system") {
      root.removeAttribute("data-theme");
      localStorage.removeItem(THEME_KEY);
      return;
    }

    root.dataset.theme = themePreference;
    localStorage.setItem(THEME_KEY, themePreference);
  }, [themePreference]);

  function resetQuestionState() {
    setChoice(null);
    setFillAnswers({});
    setCodeAnswer("");
    setChecked(false);
    setIsCorrect(false);
    setChecking(false);
    setGradeDetail(null);
    setRevealed(false);
    setWrongStreak(0);
    setLastRun(null);
  }

  function selectModule(moduleId) {
    setActiveModule(moduleId);
    setQuestionIndex(0);
    resetQuestionState();
  }

  function openReview() {
    setReviewIds(reviewQueue.map((question) => question.id));
    selectModule("__review__");
  }

  function selectSet(setId) {
    setActiveSet(setId);
    setActiveModule("all");
    setQuestionIndex(0);
    resetQuestionState();
  }

  function openTopic(topic) {
    const track = tracks[topic.id];

    if (track) {
      setActiveTopic(track.id);
      setActiveSet(track.defaultSet);
      setActiveModule("all");
      setQuestionIndex(0);
      setTopicNotice("");
      setView("quiz");
      resetQuestionState();
      return;
    }

    setTopicNotice(`${topic.title} is planned. We will attach its question sets when that curriculum is built.`);
  }

  function continueLearning(resumePoint) {
    const track = tracks[resumePoint.topic];

    if (!track) {
      return;
    }

    const setExists = track.sets.some((set) => set.id === resumePoint.set);
    setActiveTopic(track.id);
    setActiveSet(setExists ? resumePoint.set : track.defaultSet);
    setActiveModule(resumePoint.module ?? "all");
    setQuestionIndex(resumePoint.index ?? 0);
    setTopicNotice("");
    setView("quiz");
    resetQuestionState();
  }

  function openSearchResult(entry) {
    setActiveTopic(entry.trackId);
    setActiveSet(entry.module.setId);
    setActiveModule(entry.module.id);
    setQuestionIndex(0);
    setTopicNotice("");
    setView("quiz");
    resetQuestionState();
  }

  function recordOutcome(questionId, outcome) {
    setProgress((previous) => {
      const record = previous[questionId];
      const now = Date.now();
      let next;

      if (outcome === "correct") {
        const box = record ? Math.min(3, (record.box ?? 1) + 1) : 3;
        next = {
          status: "passed",
          attempts: (record?.attempts ?? 0) + 1,
          box,
          due: box >= 3 ? null : now + DAY_MS,
          updatedAt: now
        };
      } else if (outcome === "wrong") {
        next = {
          status: record?.status === "passed" ? "passed" : "failed",
          attempts: (record?.attempts ?? 0) + 1,
          box: 1,
          due: now,
          updatedAt: now
        };
      } else {
        // revealed: never downgrade an already-earned pass just for re-reading
        if (record?.status === "passed") {
          return previous;
        }

        next = {
          status: "revealed",
          attempts: record?.attempts ?? 0,
          box: 1,
          due: now,
          updatedAt: now
        };
      }

      const merged = { ...previous, [questionId]: next };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    });
  }

  function resetProgress() {
    const resetQuestions = isAllSet ? activeTrack.questions : setQuestions;
    const currentSetIds = new Set(resetQuestions.map((question) => question.id));
    const nextProgress = Object.fromEntries(
      Object.entries(progress).filter(([questionId]) => !currentSetIds.has(questionId))
    );

    setProgress(nextProgress);
    if (Object.keys(nextProgress).length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  async function validateAnswer() {
    if (checking || !currentQuestion) {
      return;
    }

    let correct = false;
    let detail = null;

    if (currentQuestion.type === "mcq" || currentQuestion.type === "tf") {
      correct = choice === currentQuestion.answer;
    }

    if (currentQuestion.type === "fill") {
      correct = currentQuestion.blanks.every((blank, index) => {
        const userAnswer = cleanCode(fillAnswers[index] ?? "");
        return blank.answers.some((answer) => cleanCode(answer) === userAnswer);
      });
    }

    if (currentQuestion.type === "code") {
      if (activeTrack.runtime === "python") {
        setChecking(true);

        try {
          detail = await gradePythonCode(currentQuestion, codeAnswer);
          correct = detail.correct;
        } catch {
          correct = gradeCodeByString(currentQuestion, codeAnswer);
          detail = null;
        } finally {
          setChecking(false);
        }
      } else if (activeTrack.runtime === "sql") {
        setChecking(true);

        try {
          detail = await gradeSql(currentQuestion, codeAnswer);
          correct = detail.correct;
        } catch {
          correct = gradeCodeByString(currentQuestion, codeAnswer);
          detail = null;
        } finally {
          setChecking(false);
        }
      } else if (isJsRuntime(activeTrack.runtime)) {
        setChecking(true);

        try {
          detail = await gradeJs(currentQuestion, codeAnswer, activeTrack.runtime);
          correct = detail.correct;
        } catch {
          correct = gradeCodeByString(currentQuestion, codeAnswer);
          detail = null;
        } finally {
          setChecking(false);
        }
      } else {
        correct = gradeCodeByString(currentQuestion, codeAnswer);
      }
    }

    setGradeDetail(detail);
    setIsCorrect(correct);
    setChecked(true);

    if (correct) {
      // an answer revealed this session earns no completion credit
      if (!revealed) {
        recordOutcome(currentQuestion.id, "correct");
      }
    } else {
      setWrongStreak((streak) => streak + 1);
      recordOutcome(currentQuestion.id, "wrong");
    }
  }

  function moveQuestion(direction) {
    const nextIndex = Math.min(
      Math.max(questionIndex + direction, 0),
      filteredQuestions.length - 1
    );

    setQuestionIndex(nextIndex);
    resetQuestionState();
  }

  function revealAnswer() {
    if (!currentQuestion) {
      return;
    }

    setChecked(true);
    setIsCorrect(false);
    setRevealed(true);
    recordOutcome(currentQuestion.id, "revealed");
  }

  function updateFillAnswer(index, value) {
    setFillAnswers((answers) => ({ ...answers, [index]: value }));
  }

  const canCheck =
    currentQuestion &&
    (currentQuestion.type === "mcq" || currentQuestion.type === "tf"
      ? choice !== null
      : currentQuestion.type === "fill"
        ? currentQuestion.blanks.every((_, index) => cleanText(fillAnswers[index] ?? ""))
        : cleanText(codeAnswer));

  if (view === "topics") {
    const resumePoint = readResumePoint();
    const resumeTrack = resumePoint ? tracks[resumePoint.topic] : null;
    const isFiltering = Boolean(cleanText(topicFilter));
    const trackProgress = Object.fromEntries(
      Object.values(tracks).map((track) => {
        const done = track.questions.filter((question) => isPassed(question.id)).length;
        const total = track.questions.length;
        return [track.id, { done, total, pct: total ? Math.round((done / total) * 100) : 0 }];
      })
    );

    return (
      <main className="topic-page">
        <div className="topic-topbar">
          <div className="brand-chip">Concept Academy</div>
          <ThemeToggle
            themePreference={themePreference}
            onThemeChange={setThemePreference}
          />
        </div>
        <section className="topic-hero" aria-labelledby="topic-title">
          <div className="topic-hero-copy">
            <p className="eyebrow">Free &amp; open source · No sign-up · Runs entirely in your browser</p>
            <h1 id="topic-title">
              Learn it. Code it. <em>Run it. Own it.</em>
            </h1>
            <p className="topic-hero-lead">
              Concept Academy is a coding school that fits in a browser tab. Short lessons teach
              each concept, {allLiveQuestions.length.toLocaleString()} hand-built questions make it
              stick, your Python answers run on a real interpreter, and an AI tutor coaches you
              through every mistake — from your first print() to professional patterns.
            </p>
            <div className="hero-actions">
              <button
                className="hero-cta"
                onClick={() => openTopic(topicCatalog.find((topic) => topic.id === "python"))}
              >
                Start with Python
              </button>
              <a className="hero-secondary" href="#topic-grid">
                Browse all {Object.keys(tracks).length} tracks
              </a>
              {resumeTrack && (
                <button className="hero-secondary" onClick={() => continueLearning(resumePoint)}>
                  Continue: {resumeTrack.setTitle}
                </button>
              )}
            </div>
            <ul className="hero-features" aria-label="What you get">
              <li>Lesson-first modules</li>
              <li>Real code execution</li>
              <li>AI tutor on every track</li>
              <li>Exams &amp; certificates</li>
              <li>Spaced review</li>
            </ul>
          </div>

          <div className="topic-stats" aria-label="Current platform stats">
            <div>
              <strong>{allLiveQuestions.length.toLocaleString()}</strong>
              <span>practice questions, written by hand</span>
            </div>
            <div>
              <strong>{Object.keys(tracks).length}</strong>
              <span>languages &amp; tools, zero to mastery</span>
            </div>
            <div>
              <strong>{allLiveModules.length}</strong>
              <span>modules, each with its own lesson</span>
            </div>
            <div>
              <strong>{totalAnsweredCount}</strong>
              <span>questions you have conquered</span>
            </div>
          </div>
        </section>

        <section className="topic-toolbar" aria-label="Topic controls">
          <div>
            <p className="eyebrow">The curriculum</p>
            <h2>Three paths, eleven tracks — in the order to learn them</h2>
          </div>
          <label className="topic-search">
            <span>Search every module and concept</span>
            <input
              value={topicFilter}
              onChange={(event) => setTopicFilter(event.target.value)}
              placeholder="Try: slicing, useEffect, decorators..."
            />
          </label>
        </section>

        {searchResults.length > 0 && (
          <section className="search-results" aria-label="Matching modules">
            {searchResults.map((entry) => (
              <button
                className="search-result"
                key={entry.module.id}
                onClick={() => openSearchResult(entry)}
              >
                <strong>{entry.module.title}</strong>
                <span>
                  {entry.trackTitle} · {entry.setLabel}
                </span>
              </button>
            ))}
          </section>
        )}

        {topicNotice && <p className="topic-notice">{topicNotice}</p>}

        {!isFiltering && (
          <section className="path-grid" id="topic-grid" aria-label="Learning paths">
            {learningPaths.map((path) => (
              <article className="learning-path" key={path.id}>
                <header className="path-header">
                  <h3>{path.title}</h3>
                  <p>{path.tagline}</p>
                  <button
                    className="placement-trigger"
                    onClick={() => setPlacementPath(path)}
                  >
                    Not sure where to start? Take the 2-minute placement →
                  </button>
                </header>
                <ol className="path-steps">
                  {path.steps.map((step, index) => {
                    const topic = topicCatalog.find((entry) => entry.id === step.id);
                    const stats = trackProgress[step.id];

                    return (
                      <li key={step.id}>
                        <button
                          className="path-step"
                          onClick={() => openTopic(topic)}
                          style={{ "--topic-accent": topic.accent }}
                        >
                          <span className="path-step-num" aria-hidden="true">
                            {index + 1}
                          </span>
                          <span className="path-step-body">
                            <span className="path-step-title">
                              {topic.title}
                              <span className="path-step-meta">
                                {stats?.done
                                  ? `${stats.pct}% · ${stats.done}/${stats.total}`
                                  : `${stats?.total ?? 0} questions`}
                              </span>
                            </span>
                            <span className="path-step-note">{step.note}</span>
                          </span>
                          <span className="path-step-go" aria-hidden="true">
                            →
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </article>
            ))}
          </section>
        )}

        {isFiltering && (
        <section className="topic-grid" aria-label="Matching tracks">
          {filteredTopics.map((topic) => (
            <button
              className={tracks[topic.id] ? "topic-card available" : "topic-card"}
              key={topic.id}
              onClick={() => openTopic(topic)}
              style={{ "--topic-accent": topic.accent }}
            >
              <span className="topic-status">{topic.status}</span>
              <span className="topic-mark" aria-hidden="true">
                {topic.mark}
              </span>
              <span className="topic-title">{topic.title}</span>
              <span className="topic-label">{topic.label}</span>
              <span className="topic-description">{topic.description}</span>
              <span className="topic-action">
                {tracks[topic.id] ? "Start learning →" : "Coming soon"}
              </span>
            </button>
          ))}
        </section>
        )}

        <footer className="topic-footer">
          <p>
            Open source under the MIT license. Every question, lesson, and track is contributable —
            help the next learner.
          </p>
        </footer>

        {placementPath && (
          <PlacementQuiz
            path={placementPath}
            tracks={tracks}
            onClose={() => setPlacementPath(null)}
            onStart={(trackId, setId) => {
              setPlacementPath(null);
              continueLearning({ topic: trackId, set: setId });
            }}
          />
        )}
      </main>
    );
  }

  if (view === "playground") {
    return <PythonPlayground onBack={() => setView("quiz")} />;
  }

  if (view === "reference") {
    return (
      <ReferenceView
        track={activeTrack}
        lessonsByModule={lessonsByModule}
        onBack={() => setView("quiz")}
      />
    );
  }

  if (view === "sql-playground") {
    return <SqlPlayground onBack={() => setView("quiz")} />;
  }

  if (view === "js-playground") {
    return (
      <JsPlayground
        flavor={activeTrack.runtime}
        trackTitle={activeTrack.setTitle}
        onBack={() => setView("quiz")}
      />
    );
  }

  if (view === "projects") {
    return <ProjectsView track={activeTrack.id} onBack={() => setView("quiz")} />;
  }

  if (view === "exam") {
    return (
      <ExamMode
        trackTitle={activeTrack.title}
        setMeta={activeSetMeta}
        questions={setQuestions}
        isPython={activeTrack.id === "python"}
        onExit={() => setView("quiz")}
      />
    );
  }

  const isPythonTrack = activeTrack.id === "python";
  const runtime = activeTrack.runtime;
  const lesson = currentQuestion ? lessonsByModule[currentQuestion.moduleId] : null;
  const lessonModuleId = currentQuestion?.moduleId;
  const modulePassedCount = currentQuestion
    ? activeTrack.questions.filter(
        (question) => question.moduleId === lessonModuleId && isPassed(question.id)
      ).length
    : 0;
  const lessonOpen = lesson ? lessonToggles[lessonModuleId] ?? modulePassedCount === 0 : false;
  const learnerAnswer = currentQuestion
    ? currentQuestion.type === "code"
      ? codeAnswer
      : currentQuestion.type === "fill"
        ? currentQuestion.blanks
            .map((blank, index) => `${blank.label}: ${fillAnswers[index] ?? ""}`)
            .join("\n")
        : choice === null
          ? ""
          : String(choice)
    : "";
  const lastRunText = !lastRun
    ? ""
    : runtime === "sql"
      ? lastRun.error || sqlResultToText(lastRun)
      : isJsRuntime(runtime)
        ? lastRun.error ||
          [lastRun.output, lastRun.html && `[rendered] ${lastRun.html}`].filter(Boolean).join("\n")
        : [lastRun.output, lastRun.result, lastRun.error].filter(Boolean).join("\n");
  const attempts = currentQuestion ? progress[currentQuestion.id]?.attempts ?? 0 : 0;

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Question modules">
        <div className="brand-block">
          <ThemeToggle
            themePreference={themePreference}
            onThemeChange={setThemePreference}
          />
          <p className="eyebrow">{activeSetMeta.title}</p>
          <h1>{activeTrack.title}</h1>
          <button className="topic-back-button" onClick={() => setView("topics")}>
            Back to topics
          </button>
          {isPythonTrack && (
            <div className="sidebar-extras">
              <button className="playground-button" onClick={() => setView("playground")}>
                Python Playground
              </button>
              <button className="playground-button" onClick={() => setView("projects")}>
                Guided Projects
              </button>
            </div>
          )}
          {runtime === "sql" && (
            <div className="sidebar-extras">
              <button className="playground-button" onClick={() => setView("sql-playground")}>
                SQL Playground
              </button>
              <button className="playground-button" onClick={() => setView("projects")}>
                Guided Projects
              </button>
            </div>
          )}
          {isJsRuntime(runtime) && (
            <div className="sidebar-extras">
              <button className="playground-button" onClick={() => setView("js-playground")}>
                {activeTrack.setTitle} Playground
              </button>
              {activeTrack.id === "react" && (
                <button className="playground-button" onClick={() => setView("projects")}>
                  Guided Projects
                </button>
              )}
            </div>
          )}
          <div className="sidebar-extras">
            <button className="playground-button" onClick={() => setView("reference")}>
              Quick Reference
            </button>
          </div>
        </div>

        <div className="set-switcher" aria-label="Curriculum sets">
          {activeTrack.sets.map((set) => (
            <button
              className={activeSet === set.id ? "set-button active" : "set-button"}
              key={set.id}
              onClick={() => selectSet(set.id)}
            >
              <span>{set.title}</span>
              <small>{set.label}</small>
            </button>
          ))}
        </div>

        <div className="overall-progress" aria-label="Overall progress">
          <div className="progress-copy">
            <span>{answeredCount}/{setQuestions.length}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="track">
            <div className="track-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <button className="reset-button" onClick={resetProgress}>
            Reset
          </button>
        </div>

        <button className="exam-button" onClick={() => setView("exam")}>
          Take Set Exam
        </button>

        <nav className="module-list">
          <button
            className={isReviewMode ? "module-button review active" : "module-button review"}
            onClick={openReview}
            disabled={!reviewQueue.length && !isReviewMode}
          >
            <span>Review mistakes</span>
            <span>{reviewQueue.length}</span>
          </button>

          <button
            className={activeModule === "all" ? "module-button active" : "module-button"}
            onClick={() => selectModule("all")}
          >
            <span>{isAllSet ? "All Questions" : activeSetMeta.label}</span>
            <span>{setQuestions.length}</span>
          </button>

          {visibleModules.map((module) => {
            const total = setQuestions.filter((question) => question.moduleId === module.id).length;
            const done = setQuestions.filter(
              (question) => question.moduleId === module.id && isPassed(question.id)
            ).length;

            return (
              <button
                className={activeModule === module.id ? "module-button active" : "module-button"}
                key={module.id}
                onClick={() => selectModule(module.id)}
              >
                <span>{module.title}</span>
                <span>{done}/{total}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="quiz-area">
        {!currentQuestion ? (
          <div className="empty-state">
            <h2>{isReviewMode ? "Nothing to review" : "No questions here yet"}</h2>
            <p>
              {isReviewMode
                ? "Great work — every missed question has been cleared. Wrong or revealed answers will appear here for another pass."
                : "Pick another module from the sidebar."}
            </p>
            <button className="primary-button" onClick={() => selectModule("all")}>
              Back to all questions
            </button>
          </div>
        ) : (
          <>
            <div className="quiz-topline">
              <div>
                <p className="eyebrow">
                  {isReviewMode ? "Review · " : ""}
                  {moduleLookup[currentQuestion.moduleId]?.title}
                </p>
                <h2>{currentQuestion.prompt}</h2>
              </div>
              <div className="question-meta">
                <span>{currentQuestion.level}</span>
                <span>{currentNumber}/{filteredQuestions.length}</span>
              </div>
            </div>

            {lesson && (
              <section className="lesson-panel" aria-label="Module lesson">
                <button
                  className="lesson-toggle"
                  onClick={() =>
                    setLessonToggles((toggles) => ({
                      ...toggles,
                      [lessonModuleId]: !lessonOpen
                    }))
                  }
                >
                  <span>Lesson: {moduleLookup[lessonModuleId]?.title}</span>
                  <span>{lessonOpen ? "Hide" : "Show"}</span>
                </button>
                {lessonOpen && (
                  <div className="lesson-body">
                    <p>{lesson.summary}</p>
                    {lesson.points && (
                      <ul>
                        {lesson.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {lesson.example && (
                      <div className="lesson-example">
                        <pre>{lesson.example}</pre>
                        {runtime === "python" && <PythonRunPanel code={lesson.example} />}
                        {runtime === "sql" && <SqlRunPanel sql={lesson.example} />}
                        {isJsRuntime(runtime) && looksRunnableJs(lesson.example) && (
                          <JsRunPanel code={lesson.example} flavor={runtime} />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            <QuestionBody
              question={currentQuestion}
              choice={choice}
              setChoice={setChoice}
              fillAnswers={fillAnswers}
              updateFillAnswer={updateFillAnswer}
              codeAnswer={codeAnswer}
              setCodeAnswer={setCodeAnswer}
              runtime={runtime}
              onRunResult={setLastRun}
            />

            {checked && (
              <div className={isCorrect ? "feedback correct" : "feedback incorrect"}>
                <strong>
                  {isCorrect
                    ? revealed
                      ? "Correct, but the answer was revealed — no credit. It will return in review."
                      : "Correct"
                    : revealed
                      ? "Answer revealed — this question joins your review queue"
                      : "Review"}
                </strong>
                {isCorrect && gradeDetail?.method === "execution" && runtime === "python" && (
                  <p className="grade-method">Verified by running your code in Python.</p>
                )}
                {isCorrect &&
                  (gradeDetail?.method === "execution" || gradeDetail?.method === "execution-clean") &&
                  runtime === "sql" && (
                    <p className="grade-method">Verified by running your query against the database.</p>
                  )}
                {isCorrect && gradeDetail?.method === "execution" && isJsRuntime(runtime) && (
                  <p className="grade-method">
                    Verified by compiling and running your code in the browser.
                  </p>
                )}
                {isCorrect && gradeDetail?.method === "tests" && (
                  <p className="grade-method">Verified: your code passed the hidden tests.</p>
                )}
                <p>{currentQuestion.explanation}</p>
                {!isCorrect && gradeDetail?.detail && (
                  <pre className="py-error">{gradeDetail.detail}</pre>
                )}
                {!isCorrect &&
                  (runtime === "python" || isJsRuntime(runtime)) &&
                  gradeDetail?.method === "execution" &&
                  gradeDetail.expectedOutput != null &&
                  !gradeDetail.detail && (
                    <div className="grade-compare">
                      <div>
                        <span>Your output</span>
                        <pre>{gradeDetail.learnerOutput || "(no output)"}</pre>
                      </div>
                      <div>
                        <span>Expected output</span>
                        <pre>{gradeDetail.expectedOutput}</pre>
                      </div>
                    </div>
                  )}
                {!isCorrect &&
                  runtime === "sql" &&
                  gradeDetail?.expectedRun &&
                  !gradeDetail.detail && (
                    <div className="grade-compare">
                      <div>
                        <span>Your result</span>
                        <pre>{sqlResultToText(gradeDetail.learner)}</pre>
                      </div>
                      <div>
                        <span>Expected result</span>
                        <pre>{sqlResultToText(gradeDetail.expectedRun)}</pre>
                      </div>
                    </div>
                  )}
                {!isCorrect && <AnswerBlock question={currentQuestion} />}
              </div>
            )}

            <div className="actions">
              <button
                className="secondary-button"
                onClick={() => moveQuestion(-1)}
                disabled={questionIndex === 0}
              >
                Previous
              </button>
              <div className="action-cluster">
                <button className="ghost-button" onClick={revealAnswer}>
                  Show Answer
                </button>
                <button
                  className="primary-button"
                  onClick={validateAnswer}
                  disabled={!canCheck || checking}
                >
                  {checking ? "Checking..." : "Check"}
                </button>
              </div>
              <button
                className="secondary-button"
                onClick={() => moveQuestion(1)}
                disabled={questionIndex === filteredQuestions.length - 1}
              >
                Next
              </button>
            </div>

            {wrongStreak >= 2 && (
              <p className="tutor-nudge">
                Stuck on this one? The AI tutor below can give you a hint without spoiling the answer.
              </p>
            )}

            <AiTutor
              context={{
                mode: "quiz",
                language: activeTrack.setTitle,
                question: currentQuestion,
                learnerAnswer,
                runOutput: lastRunText,
                attempts,
                wrongStreak
              }}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
