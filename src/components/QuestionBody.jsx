import { useMemo } from "react";
import { seededShuffle } from "../lib/shuffle.js";
import PythonRunPanel from "./PythonRunPanel.jsx";
import SqlRunPanel from "./SqlRunPanel.jsx";
import JsRunPanel from "./JsRunPanel.jsx";
import { isJsRuntime } from "../lib/jsRunner.js";

export function QuestionBody({
  question,
  choice,
  setChoice,
  fillAnswers,
  updateFillAnswer,
  codeAnswer,
  setCodeAnswer,
  runtime,
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
    const labelToIndex = new Map(question.blanks.map((blank, index) => [blank.label, index]));
    const parts = String(question.snippet ?? "").split(/(__\d+__)/g);
    const hasInlineBlanks = parts.some((part) => labelToIndex.has(part));
    const filledCount = question.blanks.filter((_, index) =>
      (fillAnswers[index] ?? "").trim()
    ).length;

    // Type directly into the code: each __N__ token becomes a live slot.
    if (hasInlineBlanks) {
      return (
        <div className="code-task">
          <div className="fill-card">
            <div className="fill-card-head">
              <span>Fill in the blank{question.blanks.length > 1 ? "s" : ""}</span>
              <span className="fill-progress">
                {filledCount}/{question.blanks.length} filled
              </span>
            </div>
            <pre className="fill-snippet">
              {parts.map((part, partIndex) => {
                const blankIndex = labelToIndex.get(part);

                if (blankIndex === undefined) {
                  return <span key={partIndex}>{part}</span>;
                }

                const value = fillAnswers[blankIndex] ?? "";

                return (
                  <input
                    key={partIndex}
                    className={value.trim() ? "fill-blank filled" : "fill-blank"}
                    style={{ width: `${Math.max(value.length + 1, 6)}ch` }}
                    value={value}
                    onChange={(event) => updateFillAnswer(blankIndex, event.target.value)}
                    placeholder={String(blankIndex + 1)}
                    aria-label={`Blank ${blankIndex + 1}`}
                    spellCheck="false"
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                );
              })}
            </pre>
          </div>
        </div>
      );
    }

    // Rare snippets without inline tokens keep the labelled-input layout.
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
      {runtime === "python" && (
        <PythonRunPanel code={codeAnswer.trim() ? runnableCode : ""} onResult={onRunResult} />
      )}
      {runtime === "sql" && <SqlRunPanel sql={codeAnswer} onResult={onRunResult} />}
      {isJsRuntime(runtime) && (
        /* JSX answers are graded standalone, so the run matches the grade */
        <JsRunPanel code={codeAnswer} flavor={runtime} onResult={onRunResult} />
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
