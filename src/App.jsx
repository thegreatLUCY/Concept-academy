import { useMemo, useState } from "react";
import { modules as set1Modules, questions as set1Questions } from "./data/questions.js";
import { set2Modules, set2Questions } from "./data/set2Questions.js";
import { set3Modules, set3Questions } from "./data/set3Questions.js";

const STORAGE_KEY = "react-zero-to-hero-progress";
const curriculumSets = [
  { id: "set1", title: "Set 1", label: "Foundations" },
  { id: "set2", title: "Set 2", label: "Interactive React" },
  { id: "set3", title: "Set 3", label: "JavaScript Maturity" },
  { id: "all", title: "All Sets", label: "Everything" }
];
const modules = [
  ...set1Modules.map((module) => ({ ...module, setId: "set1" })),
  ...set2Modules,
  ...set3Modules
];
const questions = [
  ...set1Questions.map((question) => ({ ...question, setId: "set1" })),
  ...set2Questions,
  ...set3Questions
].map((question, order) => ({ ...question, order }));
const moduleOrder = Object.fromEntries(modules.map((module, order) => [module.id, order]));

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
  const [activeSet, setActiveSet] = useState("set3");
  const [activeModule, setActiveModule] = useState("all");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [fillAnswers, setFillAnswers] = useState({});
  const [codeAnswer, setCodeAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(loadProgress);

  const moduleLookup = useMemo(
    () => Object.fromEntries(modules.map((module) => [module.id, module])),
    []
  );

  const activeSetMeta = curriculumSets.find((set) => set.id === activeSet) ?? curriculumSets[1];
  const setQuestions = useMemo(() => {
    const selectedQuestions =
      activeSet === "all"
        ? questions
        : questions.filter((question) => question.setId === activeSet);

    return [...selectedQuestions].sort(
      (a, b) => moduleOrder[a.moduleId] - moduleOrder[b.moduleId] || a.order - b.order
    );
  }, [activeSet]);
  const visibleModules = useMemo(() => {
    if (activeSet === "all") {
      return modules;
    }

    return modules.filter((module) => module.setId === activeSet);
  }, [activeSet]);
  const filteredQuestions = useMemo(() => {
    if (activeModule === "all") {
      return setQuestions;
    }

    return setQuestions.filter((question) => question.moduleId === activeModule);
  }, [activeModule, setQuestions]);

  const currentQuestion = filteredQuestions[questionIndex] ?? filteredQuestions[0];
  const answeredCount = setQuestions.filter((question) => completed[question.id]).length;
  const progressPercent = Math.round((answeredCount / setQuestions.length) * 100);
  const currentNumber = questionIndex + 1;

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

  function saveCompletion(questionId, value) {
    const nextCompleted = { ...completed, [questionId]: value };
    setCompleted(nextCompleted);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCompleted));
  }

  function resetProgress() {
    if (activeSet === "all") {
      setCompleted({});
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const currentSetIds = new Set(setQuestions.map((question) => question.id));
    const nextCompleted = Object.fromEntries(
      Object.entries(completed).filter(([questionId]) => !currentSetIds.has(questionId))
    );

    setCompleted(nextCompleted);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCompleted));
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

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Question modules">
        <div className="brand-block">
          <p className="eyebrow">{activeSetMeta.title}</p>
          <h1>React Zero to Hero</h1>
        </div>

        <div className="set-switcher" aria-label="Curriculum sets">
          {curriculumSets.map((set) => (
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
            <span>{activeSet === "all" ? "All Questions" : activeSetMeta.label}</span>
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
