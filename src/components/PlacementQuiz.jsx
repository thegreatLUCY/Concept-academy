import { useMemo, useState } from "react";
import { seededShuffle } from "../lib/shuffle.js";
import { PromptText } from "./QuestionBody.jsx";

// Adaptive placement: walk the path's stages in curriculum order, asking two
// quick questions per stage. Clear a stage (2/2) to advance; the first stage
// you don't clear is where you should start. No progress is recorded.
const QUESTIONS_PER_STAGE = 2;

function sampleStageQuestions(track, stage, salt) {
  const pool = track.questions.filter(
    (question) =>
      (question.type === "mcq" || question.type === "tf") &&
      (!stage.setId || !question.setId || question.setId === stage.setId)
  );

  return seededShuffle(pool, `${stage.trackId}-${stage.setId}-${salt}`).slice(
    0,
    QUESTIONS_PER_STAGE
  );
}

function PlacementQuiz({ path, tracks, onClose, onStart }) {
  const [salt] = useState(() => Math.random().toString(36).slice(2, 8));
  const [stageIndex, setStageIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [stageCorrect, setStageCorrect] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const [outcome, setOutcome] = useState(null); // { stage, cleared } when done
  const [clearedStages, setClearedStages] = useState([]);

  const stages = path.placement;
  const stage = stages[stageIndex];
  const track = tracks[stage?.trackId];

  const stageQuestions = useMemo(
    () => (track && stage ? sampleStageQuestions(track, stage, salt) : []),
    [track, stage, salt]
  );

  const question = stageQuestions[questionIndex];

  const shuffledChoices = useMemo(
    () =>
      question?.type === "mcq" ? seededShuffle(question.choices, `${question.id}-${salt}`) : [],
    [question, salt]
  );

  if (!question && !outcome) {
    // a stage with no MCQ/TF pool — should not happen, but never strand the user
    return null;
  }

  function check(answer) {
    if (checked) return;
    setPicked(answer);
    setChecked(true);

    const correct = answer === question.answer;
    const nextCorrect = stageCorrect + (correct ? 1 : 0);
    setStageCorrect(nextCorrect);

    setTimeout(() => {
      if (questionIndex + 1 < stageQuestions.length) {
        setQuestionIndex(questionIndex + 1);
        setPicked(null);
        setChecked(false);
        return;
      }

      // stage finished
      if (nextCorrect === stageQuestions.length) {
        const nextCleared = [...clearedStages, stage];
        if (stageIndex + 1 < stages.length) {
          setClearedStages(nextCleared);
          setStageIndex(stageIndex + 1);
          setQuestionIndex(0);
          setStageCorrect(0);
          setPicked(null);
          setChecked(false);
        } else {
          setClearedStages(nextCleared);
          setOutcome({ stage: null, cleared: nextCleared });
        }
      } else {
        setOutcome({ stage, cleared: clearedStages });
      }
    }, 850);
  }

  const answeredSoFar = stageIndex * QUESTIONS_PER_STAGE + questionIndex + (checked ? 1 : 0);
  const maxQuestions = stages.length * QUESTIONS_PER_STAGE;

  return (
    <div className="placement-overlay" role="dialog" aria-modal="true" aria-label="Placement quiz">
      <div className="placement-card">
        <header className="placement-head">
          <div>
            <p className="eyebrow">{path.title} · Placement</p>
            <h2>{outcome ? "Your starting point" : "Where should you start?"}</h2>
          </div>
          <button className="ghost-button" onClick={onClose}>
            Close
          </button>
        </header>

        {!outcome && (
          <>
            <div className="placement-progress" aria-label="Placement progress">
              {stages.map((entry, index) => (
                <span
                  key={entry.label}
                  className={
                    index < stageIndex
                      ? "placement-dot cleared"
                      : index === stageIndex
                        ? "placement-dot current"
                        : "placement-dot"
                  }
                  title={entry.label}
                />
              ))}
              <span className="placement-counter">
                question {Math.min(answeredSoFar + 1, maxQuestions)} · stage: {stage.label}
              </span>
            </div>

            <p className="placement-prompt"><PromptText text={question.prompt} /></p>
            {question.snippet && <pre className="placement-snippet">{question.snippet}</pre>}

            <div className="choice-list">
              {(question.type === "mcq" ? shuffledChoices : [true, false]).map((option) => {
                const label =
                  question.type === "mcq" ? option : option ? "True" : "False";
                const isAnswer = option === question.answer;
                const className = !checked
                  ? "choice"
                  : isAnswer
                    ? "choice placement-right"
                    : option === picked
                      ? "choice placement-wrong"
                      : "choice";

                return (
                  <button
                    className={className}
                    key={String(option)}
                    onClick={() => check(option)}
                    disabled={checked}
                  >
                    <span className="radio-dot" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <p className="placement-hint">
              Answer honestly — two right answers per stage moves you up a level. The quiz takes
              under two minutes and records nothing.
            </p>
          </>
        )}

        {outcome && (
          <div className="placement-result">
            {outcome.stage ? (
              <>
                <p className="placement-verdict">
                  Start at <strong>{outcome.stage.label}</strong>.
                </p>
                <p className="placement-reason">{outcome.stage.reason}</p>
              </>
            ) : (
              <>
                <p className="placement-verdict">
                  You cleared every stage — jump to <strong>{stages[stages.length - 1].label}</strong>{" "}
                  and take the set exams to certify what you know.
                </p>
              </>
            )}

            {outcome.cleared.length > 0 && (
              <p className="placement-cleared">
                Cleared: {outcome.cleared.map((entry) => entry.label).join(" → ")}
              </p>
            )}

            <div className="placement-actions">
              <button
                className="hero-cta"
                onClick={() => {
                  const target = outcome.stage ?? stages[stages.length - 1];
                  onStart(target.trackId, target.setId);
                }}
              >
                Start there now →
              </button>
              <button className="hero-secondary" onClick={onClose}>
                Maybe later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlacementQuiz;
