import { useMemo } from "react";
import { seededShuffle } from "../lib/shuffle.js";
import PythonRunPanel from "./PythonRunPanel.jsx";

export function QuestionBody({
  question,
  choice,
  setChoice,
  fillAnswers,
  updateFillAnswer,
  codeAnswer,
  setCodeAnswer,
  pythonRunnable,
  onRunResult
}) {
  // Authored data overwhelmingly lists the correct answer first, so options
  // must be shuffled at render time (seeded so the order is stable per question).
  const shuffledChoices = useMemo(
    () => (question.type === "mcq" ? seededShuffle(question.choices, question.id) : []),
    [question]
  );

  if (question.type === "mcq") {
    return (
      <>
        {question.snippet && <pre>{question.snippet}</pre>}
        <div className="choice-list">
          {shuffledChoices.map((option) => (
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
            <label key={`${question.id}-${blank.label}-${index}`}>
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

  const runnableCode = question.starter ? `${question.starter}\n${codeAnswer}` : codeAnswer;

  return (
    <div className="code-task">
      {question.starter && <pre>{question.starter}</pre>}
      <textarea
        value={codeAnswer}
        onChange={(event) => setCodeAnswer(event.target.value)}
        spellCheck="false"
        rows={9}
      />
      {pythonRunnable && (
        <PythonRunPanel code={codeAnswer.trim() ? runnableCode : ""} onResult={onRunResult} />
      )}
    </div>
  );
}

export function AnswerBlock({ question }) {
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
