import { useEffect, useMemo, useState } from "react";
import AiTutor from "./components/AiTutor.jsx";
import ExamMode from "./components/ExamMode.jsx";
import ProjectsView from "./components/ProjectsView.jsx";
import PythonPlayground from "./components/PythonPlayground.jsx";
import PythonRunPanel from "./components/PythonRunPanel.jsx";
import { AnswerBlock, QuestionBody } from "./components/QuestionBody.jsx";
import { modules as set1Modules, questions as set1Questions } from "./data/questions.js";
import { set2Modules, set2Questions } from "./data/set2Questions.js";
import { set3Modules, set3Questions } from "./data/set3Questions.js";
import { set4Modules, set4Questions } from "./data/set4Questions.js";
import { set5Modules, set5Questions } from "./data/set5Questions.js";
import { pythonSet1Modules, pythonSet1Questions } from "./data/pythonSet1Questions.js";
import { pythonSet2Modules, pythonSet2Questions } from "./data/pythonSet2Questions.js";
import { pythonSet3Modules, pythonSet3Questions } from "./data/pythonSet3Questions.js";
import { pythonSet4Modules, pythonSet4Questions } from "./data/pythonSet4Questions.js";
import { pythonLessons } from "./data/pythonLessons.js";
import { gradePythonCode, gradeCodeByString } from "./lib/pythonGrader.js";
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
  { id: "all", title: "All Sets", label: "Everything" }
];
const reactModules = [
  ...set1Modules.map((module) => ({ ...module, setId: "set1" })),
  ...set2Modules,
  ...set3Modules,
  ...set4Modules,
  ...set5Modules
];
const reactQuestions = [
  ...set1Questions.map((question) => ({ ...question, setId: "set1" })),
  ...set2Questions,
  ...set3Questions,
  ...set4Questions,
  ...set5Questions
].map((question, order) => ({ ...question, order }));
const pythonCurriculumSets = [
  { id: "python-set1", title: "Set 1", label: "Python Foundations" },
  { id: "python-set2", title: "Set 2", label: "Control Flow + Collections" },
  { id: "python-set3", title: "Set 3", label: "Functions, Errors, Files" },
  { id: "python-set4", title: "Set 4", label: "OOP + Professional Python" },
  { id: "python-all", title: "All Sets", label: "Everything" }
];
const pythonModules = [
  ...pythonSet1Modules,
  ...pythonSet2Modules,
  ...pythonSet3Modules,
  ...pythonSet4Modules
];
const pythonQuestions = [
  ...pythonSet1Questions,
  ...pythonSet2Questions,
  ...pythonSet3Questions,
  ...pythonSet4Questions
].map((question, order) => ({ ...question, order }));
const tracks = {
  react: {
    id: "react",
    title: "React Zero to Hero",
    setTitle: "React",
    defaultSet: "set5",
    sets: reactCurriculumSets,
    modules: reactModules,
    questions: reactQuestions
  },
  python: {
    id: "python",
    title: "Python Zero to Hero",
    setTitle: "Python",
    defaultSet: "python-set1",
    sets: pythonCurriculumSets,
    modules: pythonModules,
    questions: pythonQuestions
  }
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
    accent: "#48c9f2",
    status: "Available"
  },
  {
    id: "sql",
    title: "SQL",
    label: "Relational data querying",
    description: "Tables, joins, aggregation, filtering, schema reasoning, and real query practice.",
    mark: "SQL",
    accent: "#4f7cff",
    status: "Planned"
  },
  {
    id: "jquery",
    title: "jQuery",
    label: "Legacy DOM workflows",
    description: "Selectors, events, DOM updates, AJAX, plugins, and migration thinking.",
    mark: "jQ",
    accent: "#1d77c3",
    status: "Planned"
  },
  {
    id: "python",
    title: "Python",
    label: "Programming fundamentals",
    description: "Files, terminal workflow, syntax, input, variables, data types, strings, and beginner errors.",
    mark: "Py",
    accent: "#f0bd35",
    status: "Available"
  },
  {
    id: "typescript",
    title: "TypeScript",
    label: "Typed JavaScript",
    description: "Types, interfaces, unions, generics, narrowing, API types, and React typing.",
    mark: "TS",
    accent: "#3178c6",
    status: "Planned"
  },
  {
    id: "matplotlib",
    title: "Matplotlib",
    label: "Python visualization",
    description: "Figures, axes, plots, labels, styling, subplots, and chart interpretation.",
    mark: "plt",
    accent: "#6c63ff",
    status: "Planned"
  },
  {
    id: "numpy",
    title: "NumPy",
    label: "Numerical arrays",
    description: "Arrays, shapes, slicing, broadcasting, vectorized operations, and statistics.",
    mark: "NP",
    accent: "#4dabcf",
    status: "Planned"
  },
  {
    id: "pandas",
    title: "Pandas",
    label: "Data analysis tables",
    description: "Series, DataFrames, filtering, grouping, joins, cleanup, and analysis workflows.",
    mark: "pd",
    accent: "#150458",
    status: "Planned"
  },
  {
    id: "bash",
    title: "Bash",
    label: "Shell scripting",
    description: "Commands, pipes, variables, loops, scripts, permissions, and automation.",
    mark: "$_",
    accent: "#20b486",
    status: "Planned"
  },
  {
    id: "linux",
    title: "Linux",
    label: "Operating system basics",
    description: "Filesystem, permissions, processes, users, packages, services, and troubleshooting.",
    mark: "LX",
    accent: "#f6b92b",
    status: "Planned"
  }
];

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
      if (activeTrack.id === "python") {
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
            <p className="eyebrow">Practice-first learning</p>
            <h1 id="topic-title">Choose a learning track</h1>
            <p>
              Build steady confidence with focused lessons, runnable exercises, review queues, and
              progress that follows you across React, Python, and the upcoming data and systems tracks.
            </p>
            {resumeTrack && (
              <button className="continue-button" onClick={() => continueLearning(resumePoint)}>
                Continue learning: {resumeTrack.title}
              </button>
            )}
          </div>

          <div className="topic-stats" aria-label="Current platform stats">
            <div>
              <strong>{allLiveQuestions.length}</strong>
              <span>Live questions</span>
            </div>
            <div>
              <strong>{allLiveModules.length}</strong>
              <span>Live modules</span>
            </div>
            <div>
              <strong>{totalAnsweredCount}</strong>
              <span>Completed</span>
            </div>
          </div>
        </section>

        <section className="topic-toolbar" aria-label="Topic controls">
          <div>
            <p className="eyebrow">Library</p>
            <h2>Select a topic</h2>
          </div>
          <label className="topic-search">
            <span>Search topics, modules, and concepts</span>
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

        <section className="topic-grid" aria-label="Available and planned topics">
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
                {tracks[topic.id] ? "Open questions" : "Coming soon"}
              </span>
            </button>
          ))}
        </section>
      </main>
    );
  }

  if (view === "playground") {
    return <PythonPlayground onBack={() => setView("quiz")} />;
  }

  if (view === "projects") {
    return <ProjectsView onBack={() => setView("quiz")} />;
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
  const lesson =
    isPythonTrack && currentQuestion ? pythonLessons[currentQuestion.moduleId] : null;
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
  const lastRunText = lastRun
    ? [lastRun.output, lastRun.result, lastRun.error].filter(Boolean).join("\n")
    : "";
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
                        <PythonRunPanel code={lesson.example} />
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
              pythonRunnable={isPythonTrack}
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
                {isCorrect && gradeDetail?.method === "execution" && (
                  <p className="grade-method">Verified by running your code in Python.</p>
                )}
                {isCorrect && gradeDetail?.method === "tests" && (
                  <p className="grade-method">Verified: your code passed the hidden tests.</p>
                )}
                <p>{currentQuestion.explanation}</p>
                {!isCorrect && gradeDetail?.detail && (
                  <pre className="py-error">{gradeDetail.detail}</pre>
                )}
                {!isCorrect &&
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

            {isPythonTrack && wrongStreak >= 2 && (
              <p className="tutor-nudge">
                Stuck on this one? The AI tutor below can give you a hint without spoiling the answer.
              </p>
            )}

            {isPythonTrack && (
              <AiTutor
                context={{
                  mode: "quiz",
                  question: currentQuestion,
                  learnerAnswer,
                  runOutput: lastRunText,
                  attempts,
                  wrongStreak
                }}
              />
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
