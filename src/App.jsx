import { useMemo, useState } from "react";
import { modules as set1Modules, questions as set1Questions } from "./data/questions.js";
import { set2Modules, set2Questions } from "./data/set2Questions.js";
import { set3Modules, set3Questions } from "./data/set3Questions.js";
import { set4Modules, set4Questions } from "./data/set4Questions.js";
import { set5Modules, set5Questions } from "./data/set5Questions.js";
import { pythonSet1Modules, pythonSet1Questions } from "./data/pythonSet1Questions.js";

const STORAGE_KEY = "react-zero-to-hero-progress";
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
  { id: "python-all", title: "All Sets", label: "Everything" }
];
const pythonModules = pythonSet1Modules;
const pythonQuestions = pythonSet1Questions.map((question, order) => ({ ...question, order }));
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

function cleanText(value) {
  return String(value)
    .trim()
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'");
}

function cleanCode(value) {
  return cleanText(value)
    .replace(/\s+/g, "")
    .replace(/;+$/g, "")
    .replace(/"/g, "'");
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function App() {
  const [view, setView] = useState("topics");
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
  const [completed, setCompleted] = useState(loadProgress);

  const activeTrack = tracks[activeTopic] ?? tracks.react;
  const isAllSet = activeSet === "all" || activeSet.endsWith("-all");
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
  const filteredQuestions = useMemo(() => {
    if (activeModule === "all") {
      return setQuestions;
    }

    return setQuestions.filter((question) => question.moduleId === activeModule);
  }, [activeModule, setQuestions]);

  const currentQuestion = filteredQuestions[questionIndex] ?? filteredQuestions[0];
  const answeredCount = setQuestions.filter((question) => completed[question.id]).length;
  const progressPercent = setQuestions.length
    ? Math.round((answeredCount / setQuestions.length) * 100)
    : 0;
  const currentNumber = questionIndex + 1;
  const totalAnsweredCount = allLiveQuestions.filter((question) => completed[question.id]).length;
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

  function resetQuestionState() {
    setChoice(null);
    setFillAnswers({});
    setCodeAnswer("");
    setChecked(false);
    setIsCorrect(false);
  }

  function selectModule(moduleId) {
    setActiveModule(moduleId);
    setQuestionIndex(0);
    resetQuestionState();
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

  function saveCompletion(questionId, value) {
    const nextCompleted = { ...completed, [questionId]: value };
    setCompleted(nextCompleted);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCompleted));
  }

  function resetProgress() {
    const resetQuestions = isAllSet ? activeTrack.questions : setQuestions;
    const currentSetIds = new Set(resetQuestions.map((question) => question.id));
    const nextCompleted = Object.fromEntries(
      Object.entries(completed).filter(([questionId]) => !currentSetIds.has(questionId))
    );

    setCompleted(nextCompleted);
    if (Object.keys(nextCompleted).length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCompleted));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function validateAnswer() {
    let correct = false;

    if (currentQuestion.type === "mcq") {
      correct = choice === currentQuestion.answer;
    }

    if (currentQuestion.type === "tf") {
      correct = choice === currentQuestion.answer;
    }

    if (currentQuestion.type === "fill") {
      correct = currentQuestion.blanks.every((blank, index) => {
        const userAnswer = cleanCode(fillAnswers[index] ?? "");
        return blank.answers.some((answer) => cleanCode(answer) === userAnswer);
      });
    }

    if (currentQuestion.type === "code") {
      const normalizedAnswer = cleanCode(codeAnswer);
      const accepted = currentQuestion.accepted ?? [currentQuestion.expected];
      const exactMatch = accepted.some((answer) => cleanCode(answer) === normalizedAnswer);
      const requiredMatch = currentQuestion.required?.every((snippet) =>
        normalizedAnswer.includes(cleanCode(snippet))
      );

      correct = exactMatch || Boolean(requiredMatch);
    }

    setIsCorrect(correct);
    setChecked(true);

    if (correct) {
      saveCompletion(currentQuestion.id, true);
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
    setChecked(true);
    setIsCorrect(false);
  }

  function updateFillAnswer(index, value) {
    setFillAnswers((answers) => ({ ...answers, [index]: value }));
  }

  const canCheck =
    currentQuestion.type === "mcq" || currentQuestion.type === "tf"
      ? choice !== null
      : currentQuestion.type === "fill"
        ? currentQuestion.blanks.every((_, index) => cleanText(fillAnswers[index] ?? ""))
        : cleanText(codeAnswer);

  if (view === "topics") {
    return (
      <main className="topic-page">
        <section className="topic-hero" aria-labelledby="topic-title">
          <div className="topic-hero-copy">
            <p className="eyebrow">Concept Academy</p>
            <h1 id="topic-title">Choose a learning track</h1>
            <p>
              A growing practice library for programming, data, systems, and frontend development.
              React and Python are live now; the other tracks are ready as planned curriculum panels.
            </p>
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
            <span>Filter topics</span>
            <input
              value={topicFilter}
              onChange={(event) => setTopicFilter(event.target.value)}
              placeholder="Search topics..."
            />
          </label>
        </section>

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

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Question modules">
        <div className="brand-block">
          <p className="eyebrow">{activeSetMeta.title}</p>
          <h1>{activeTrack.title}</h1>
          <button className="topic-back-button" onClick={() => setView("topics")}>
            Back to topics
          </button>
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

        <nav className="module-list">
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
              (question) => question.moduleId === module.id && completed[question.id]
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
        <div className="quiz-topline">
          <div>
            <p className="eyebrow">{moduleLookup[currentQuestion.moduleId].title}</p>
            <h2>{currentQuestion.prompt}</h2>
          </div>
          <div className="question-meta">
            <span>{currentQuestion.level}</span>
            <span>{currentNumber}/{filteredQuestions.length}</span>
          </div>
        </div>

        <QuestionBody
          question={currentQuestion}
          choice={choice}
          setChoice={setChoice}
          fillAnswers={fillAnswers}
          updateFillAnswer={updateFillAnswer}
          codeAnswer={codeAnswer}
          setCodeAnswer={setCodeAnswer}
        />

        {checked && (
          <div className={isCorrect ? "feedback correct" : "feedback incorrect"}>
            <strong>{isCorrect ? "Correct" : "Review"}</strong>
            <p>{currentQuestion.explanation}</p>
            {!isCorrect && <AnswerBlock question={currentQuestion} />}
          </div>
        )}

        <div className="actions">
          <button className="secondary-button" onClick={() => moveQuestion(-1)} disabled={questionIndex === 0}>
            Previous
          </button>
          <div className="action-cluster">
            <button className="ghost-button" onClick={revealAnswer}>
              Show Answer
            </button>
            <button className="primary-button" onClick={validateAnswer} disabled={!canCheck}>
              Check
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
      </section>
    </main>
  );
}

function QuestionBody({
  question,
  choice,
  setChoice,
  fillAnswers,
  updateFillAnswer,
  codeAnswer,
  setCodeAnswer
}) {
  if (question.type === "mcq") {
    return (
      <>
        {question.snippet && <pre>{question.snippet}</pre>}
        <div className="choice-list">
          {question.choices.map((option) => (
            <button
              className={choice === option ? "choice selected" : "choice"}
              key={option}
              onClick={() => setChoice(option)}
            >
              <span className="radio-dot" />
              <span>{option}</span>
            </button>
          ))}
        </div>
      </>
    );
  }

  if (question.type === "tf") {
    return (
      <>
        {question.snippet && <pre>{question.snippet}</pre>}
        <div className="choice-list two-choice">
          {[true, false].map((value) => (
            <button
              className={choice === value ? "choice selected" : "choice"}
              key={String(value)}
              onClick={() => setChoice(value)}
            >
              <span className="radio-dot" />
              <span>{value ? "True" : "False"}</span>
            </button>
          ))}
        </div>
      </>
    );
  }

  if (question.type === "fill") {
    return (
      <div className="code-task">
        <pre>{question.snippet}</pre>
        <div className="blank-grid">
          {question.blanks.map((blank, index) => (
            <label key={`${question.id}-${blank.label}`}>
              <span>{blank.label}</span>
              <input
                value={fillAnswers[index] ?? ""}
                onChange={(event) => updateFillAnswer(index, event.target.value)}
                spellCheck="false"
              />
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="code-task">
      {question.starter && <pre>{question.starter}</pre>}
      <textarea
        value={codeAnswer}
        onChange={(event) => setCodeAnswer(event.target.value)}
        spellCheck="false"
        rows={9}
      />
    </div>
  );
}

function AnswerBlock({ question }) {
  if (question.type === "mcq") {
    return <pre>{question.answer}</pre>;
  }

  if (question.type === "tf") {
    return <pre>{question.answer ? "True" : "False"}</pre>;
  }

  if (question.type === "fill") {
    return (
      <pre>
        {question.blanks
          .map((blank) => `${blank.label}: ${blank.answers[0]}`)
          .join("\n")}
      </pre>
    );
  }

  return <pre>{question.expected}</pre>;
}

export default App;
