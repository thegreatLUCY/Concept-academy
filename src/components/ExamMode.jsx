import { useState } from "react";
import { gradeCodeByString, gradePythonCode } from "../lib/pythonGrader.js";
import { cleanCode } from "../lib/textUtils.js";
import { AnswerBlock, PromptText, QuestionBody } from "./QuestionBody.jsx";

const EXAMS_KEY = "concept-academy-exams";
const EXAM_SIZE = 25;
const PASS_PERCENT = 70;

function sampleQuestions(questions, count) {
  const pool = [...questions];

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}

function loadExamRecords() {
  try {
    return JSON.parse(localStorage.getItem(EXAMS_KEY)) ?? {};
  } catch {
    return {};
  }
}

function saveExamRecord(setId, score, passed) {
  const records = loadExamRecords();
  const previous = records[setId] ?? {};
  records[setId] = {
    best: Math.max(previous.best ?? 0, score),
    lastScore: score,
    passedAt: passed ? Date.now() : previous.passedAt ?? null
  };
  localStorage.setItem(EXAMS_KEY, JSON.stringify(records));
}

function gradeStatic(question, answer) {
  if (question.type === "mcq" || question.type === "tf") {
    return (answer.choice ?? null) === question.answer;
  }

  if (question.type === "fill") {
    return question.blanks.every((blank, index) => {
      const userAnswer = cleanCode(answer.fill?.[index] ?? "");
      return blank.answers.some((accepted) => cleanCode(accepted) === userAnswer);
    });
  }

  return null;
}

function ExamMode({ trackTitle, setMeta, questions, isPython, onExit }) {
  const [phase, setPhase] = useState("intro");
  const [examQuestions, setExamQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [gradedCount, setGradedCount] = useState(0);
  const [holderName, setHolderName] = useState("");
  const examRecord = loadExamRecords()[setMeta.id];

  const current = examQuestions[index];
  const currentAnswer = current ? answers[current.id] ?? {} : {};

  function startExam() {
    setExamQuestions(sampleQuestions(questions, EXAM_SIZE));
    setAnswers({});
    setIndex(0);
    setResults([]);
    setGradedCount(0);
    setPhase("active");
  }

  function updateAnswer(patch) {
    setAnswers((all) => ({ ...all, [current.id]: { ...all[current.id], ...patch } }));
  }

  const answeredCount = examQuestions.filter((question) => {
    const answer = answers[question.id];

    if (!answer) {
      return false;
    }

    if (question.type === "mcq" || question.type === "tf") {
      return answer.choice != null;
    }

    if (question.type === "fill") {
      return question.blanks.every((_, blankIndex) => (answer.fill?.[blankIndex] ?? "").trim());
    }

    return Boolean((answer.code ?? "").trim());
  }).length;

  async function submitExam() {
    setPhase("grading");
    const graded = [];

    for (const question of examQuestions) {
      const answer = answers[question.id] ?? {};
      let correct = gradeStatic(question, answer);

      if (correct === null) {
        const code = answer.code ?? "";

        if (!code.trim()) {
          correct = false;
        } else if (isPython) {
          try {
            correct = (await gradePythonCode(question, code)).correct;
          } catch {
            correct = gradeCodeByString(question, code);
          }
        } else {
          correct = gradeCodeByString(question, code);
        }
      }

      graded.push({ question, answer, correct });
      setGradedCount(graded.length);
    }

    const score = Math.round(
      (graded.filter((entry) => entry.correct).length / graded.length) * 100
    );
    saveExamRecord(setMeta.id, score, score >= PASS_PERCENT);
    setResults(graded);
    setPhase("results");
  }

  if (phase === "intro") {
    return (
      <main className="exam-shell">
        <section className="exam-card">
          <p className="eyebrow">{trackTitle}</p>
          <h1>{setMeta.title} Exam — {setMeta.label}</h1>
          <p>
            {Math.min(EXAM_SIZE, questions.length)} randomly selected questions from this set.
            No answer reveals, no feedback until the end. Score {PASS_PERCENT}% or higher to pass
            and earn the set certificate.
          </p>
          {examRecord && (
            <p className="exam-record">
              Best score so far: <strong>{examRecord.best}%</strong>
              {examRecord.passedAt ? " — passed" : ""}
            </p>
          )}
          <div className="exam-actions">
            <button className="primary-button" onClick={startExam}>
              Start Exam
            </button>
            <button className="secondary-button" onClick={onExit}>
              Back to questions
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (phase === "active" && current) {
    return (
      <main className="exam-shell">
        <header className="exam-topbar">
          <div>
            <p className="eyebrow">Exam · {setMeta.label}</p>
            <h2><PromptText text={current.prompt} /></h2>
          </div>
          <div className="question-meta">
            <span>{current.level}</span>
            <span>
              {index + 1}/{examQuestions.length}
            </span>
          </div>
        </header>

        <QuestionBody
          question={current}
          choice={currentAnswer.choice ?? null}
          setChoice={(value) => updateAnswer({ choice: value })}
          fillAnswers={currentAnswer.fill ?? {}}
          updateFillAnswer={(blankIndex, value) =>
            updateAnswer({ fill: { ...currentAnswer.fill, [blankIndex]: value } })
          }
          codeAnswer={currentAnswer.code ?? ""}
          setCodeAnswer={(value) => updateAnswer({ code: value })}
          pythonRunnable={false}
        />

        <div className="actions">
          <button
            className="secondary-button"
            onClick={() => setIndex(index - 1)}
            disabled={index === 0}
          >
            Previous
          </button>
          <span className="exam-progress">{answeredCount}/{examQuestions.length} answered</span>
          {index < examQuestions.length - 1 ? (
            <button className="primary-button" onClick={() => setIndex(index + 1)}>
              Next
            </button>
          ) : (
            <button className="primary-button" onClick={submitExam}>
              Submit Exam
            </button>
          )}
        </div>

        <button className="ghost-button exam-quit" onClick={onExit}>
          Quit exam (progress is discarded)
        </button>
      </main>
    );
  }

  if (phase === "grading") {
    return (
      <main className="exam-shell">
        <section className="exam-card">
          <h1>Grading...</h1>
          <p>
            {gradedCount}/{examQuestions.length} graded
            {isPython ? " — code answers are executed and verified in Python" : ""}.
          </p>
        </section>
      </main>
    );
  }

  if (phase === "results") {
    const correctCount = results.filter((entry) => entry.correct).length;
    const score = Math.round((correctCount / results.length) * 100);
    const passed = score >= PASS_PERCENT;
    const misses = results.filter((entry) => !entry.correct);

    return (
      <main className="exam-shell">
        <section className="exam-card">
          <p className="eyebrow">Exam result</p>
          <h1 className={passed ? "exam-score passed" : "exam-score failed"}>{score}%</h1>
          <p>
            {correctCount} of {results.length} correct — {passed ? "PASSED" : `below the ${PASS_PERCENT}% pass mark`}.
          </p>
          <div className="exam-actions">
            {passed && (
              <button className="primary-button" onClick={() => setPhase("certificate")}>
                Get Certificate
              </button>
            )}
            <button className="secondary-button" onClick={startExam}>
              Retake (new questions)
            </button>
            <button className="secondary-button" onClick={onExit}>
              Back to questions
            </button>
          </div>
        </section>

        {misses.length > 0 && (
          <section className="exam-review" aria-label="Missed questions">
            <h2>Review your misses ({misses.length})</h2>
            {misses.map(({ question }) => (
              <div className="exam-miss" key={question.id}>
                <strong><PromptText text={question.prompt} /></strong>
                {question.snippet && <pre>{question.snippet}</pre>}
                <p>{question.explanation}</p>
                <AnswerBlock question={question} />
              </div>
            ))}
          </section>
        )}
      </main>
    );
  }

  if (phase === "certificate") {
    const correctCount = results.filter((entry) => entry.correct).length;
    const score = Math.round((correctCount / results.length) * 100);
    const dateText = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    return (
      <main className="exam-shell">
        <section className="exam-card no-print">
          <h2>Your certificate</h2>
          <label className="certificate-name">
            <span>Name on the certificate</span>
            <input
              value={holderName}
              onChange={(event) => setHolderName(event.target.value)}
              placeholder="Your name"
            />
          </label>
          <div className="exam-actions">
            <button
              className="primary-button"
              onClick={() => window.print()}
              disabled={!holderName.trim()}
            >
              Print / Save as PDF
            </button>
            <button className="secondary-button" onClick={() => setPhase("results")}>
              Back to results
            </button>
            <button className="secondary-button" onClick={onExit}>
              Back to questions
            </button>
          </div>
        </section>

        <section className="certificate" aria-label="Certificate of completion">
          <p className="certificate-brand">Concept Academy</p>
          <h1>Certificate of Completion</h1>
          <p className="certificate-awarded">This certifies that</p>
          <p className="certificate-holder">{holderName.trim() || "________________"}</p>
          <p className="certificate-awarded">
            passed the <strong>{trackTitle}</strong> exam
          </p>
          <p className="certificate-set">
            {setMeta.title}: {setMeta.label}
          </p>
          <p className="certificate-score">Score: {score}%</p>
          <p className="certificate-date">{dateText}</p>
        </section>
      </main>
    );
  }

  return null;
}

export default ExamMode;
