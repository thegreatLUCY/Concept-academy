import { useEffect, useRef, useState } from "react";

const KEY_STORAGE = "concept-academy-openrouter-key";
const MODEL_STORAGE = "concept-academy-openrouter-model";
const DEFAULT_MODEL = "meta-llama/llama-3.3-70b-instruct:free";
const FREE_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-chat-v3-0324:free",
  "google/gemini-2.0-flash-exp:free",
  "qwen/qwen-2.5-coder-32b-instruct:free"
];

function readStorage(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function buildSystemPrompt(context) {
  const lines = [
    "You are Py Tutor, a patient expert Python teacher inside Concept Academy, a quiz site that takes students from zero to Python mastery in the browser.",
    "",
    "Teaching rules:",
    "- Be concise, friendly, and encouraging. Assume a beginner unless the context shows otherwise.",
    "- Use short Python examples in fenced code blocks.",
    "- For quiz questions, never reveal the final answer immediately. Give a hint first, then a stronger hint, and only give the full solution when the student explicitly asks for it or has clearly tried and is stuck.",
    "- When an error or traceback is shown, explain what it means in plain words and guide the student to fix it themselves.",
    "- Always connect explanations to what the student just attempted.",
    "- If the student asks something unrelated to learning Python or programming, gently steer back to the lesson.",
    ""
  ];

  if (context?.mode === "quiz" && context.question) {
    const question = context.question;
    lines.push("Current quiz question context:");
    lines.push(`- Question type: ${question.level}`);
    lines.push(`- Prompt: ${question.prompt}`);

    if (question.snippet) {
      lines.push(`- Code snippet shown:\n${question.snippet}`);
    }

    if (question.starter) {
      lines.push(`- Starter code:\n${question.starter}`);
    }

    if (question.type === "mcq") {
      lines.push(`- Choices: ${question.choices.join(" | ")}`);
    }

    lines.push(
      `- Correct answer (SECRET, for your reference only — do not reveal unless the rules above allow it): ${describeAnswer(question)}`
    );
    lines.push(`- Official explanation: ${question.explanation}`);

    if (context.learnerAnswer) {
      lines.push(`- Student's current answer/attempt:\n${context.learnerAnswer}`);
    }

    if (context.runOutput) {
      lines.push(`- Output from running the student's code:\n${context.runOutput}`);
    }

    if (context.wrongStreak >= 2) {
      lines.push(
        `- The student has answered this question wrong ${context.wrongStreak} times in a row. Identify the likely misconception from their attempt and address it directly with a stronger hint than usual.`
      );
    } else if (context.attempts > 0) {
      lines.push(`- Total recorded attempts on this question: ${context.attempts}.`);
    }
  }

  if (context?.mode === "playground") {
    lines.push("The student is in the free Python playground (real Python via Pyodide, runs in the browser).");

    if (context.code) {
      lines.push(`Current editor code:\n${context.code}`);
    }

    if (context.consoleText) {
      lines.push(`Recent console output:\n${context.consoleText}`);
    }
  }

  return lines.join("\n");
}

function describeAnswer(question) {
  if (question.type === "mcq") {
    return question.answer;
  }

  if (question.type === "tf") {
    return question.answer ? "True" : "False";
  }

  if (question.type === "fill") {
    return question.blanks.map((blank) => `${blank.label}: ${blank.answers[0]}`).join(", ");
  }

  return question.expected;
}

function MessageBody({ text }) {
  const parts = String(text).split("```");

  return (
    <div className="tutor-message-body">
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <pre key={index}>{part.replace(/^[a-zA-Z0-9_-]*\n/, "")}</pre>
        ) : (
          part.trim() && <p key={index}>{part.trim()}</p>
        )
      )}
    </div>
  );
}

function AiTutor({ context }) {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => readStorage(KEY_STORAGE, ""));
  const [model, setModel] = useState(() => readStorage(MODEL_STORAGE, DEFAULT_MODEL));
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const logRef = useRef(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  function saveSettings(nextKey, nextModel) {
    try {
      localStorage.setItem(KEY_STORAGE, nextKey);
      localStorage.setItem(MODEL_STORAGE, nextModel || DEFAULT_MODEL);
    } catch {
      // localStorage unavailable; settings stay in memory for this session
    }
  }

  async function sendMessage(presetText) {
    const text = (presetText ?? draft).trim();

    if (!text || busy) {
      return;
    }

    if (!apiKey) {
      setShowSettings(true);
      setError("Add your free OpenRouter API key first.");
      return;
    }

    const history = [...messages, { role: "user", content: text }];
    setMessages(history);
    setDraft("");
    setBusy(true);
    setError("");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Concept Academy"
        },
        body: JSON.stringify({
          model: model || DEFAULT_MODEL,
          messages: [
            { role: "system", content: buildSystemPrompt(context) },
            ...history.slice(-12)
          ]
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("OpenRouter rejected the API key. Check it in settings.");
        }

        if (response.status === 429) {
          throw new Error("Rate limited by the free model. Wait a moment or pick another free model in settings.");
        }

        throw new Error(`OpenRouter request failed (status ${response.status}).`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        throw new Error("The model returned an empty reply. Try again or switch models.");
      }

      setMessages([...history, { role: "assistant", content: reply }]);
    } catch (requestError) {
      setError(String(requestError.message ?? requestError));
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button className="tutor-toggle" onClick={() => setOpen(true)}>
        Ask the AI Tutor
      </button>
    );
  }

  return (
    <section className="tutor-panel" aria-label="AI Python tutor">
      <header className="tutor-header">
        <div>
          <p className="eyebrow">AI Tutor</p>
          <strong>Py Tutor</strong>
        </div>
        <div className="tutor-header-actions">
          <button className="ghost-button" onClick={() => setShowSettings((value) => !value)}>
            {showSettings ? "Close Settings" : "Settings"}
          </button>
          <button className="ghost-button" onClick={() => setMessages([])} disabled={!messages.length}>
            Clear
          </button>
          <button className="ghost-button" onClick={() => setOpen(false)}>
            Hide
          </button>
        </div>
      </header>

      {showSettings && (
        <div className="tutor-settings">
          <label>
            <span>OpenRouter API key (free at openrouter.ai/keys, stored only in this browser)</span>
            <input
              type="password"
              value={apiKey}
              onChange={(event) => {
                setApiKey(event.target.value.trim());
                saveSettings(event.target.value.trim(), model);
              }}
              placeholder="sk-or-v1-..."
              autoComplete="off"
            />
          </label>
          <label>
            <span>Model (free models listed)</span>
            <input
              list="tutor-free-models"
              value={model}
              onChange={(event) => {
                setModel(event.target.value);
                saveSettings(apiKey, event.target.value);
              }}
            />
            <datalist id="tutor-free-models">
              {FREE_MODELS.map((freeModel) => (
                <option key={freeModel} value={freeModel} />
              ))}
            </datalist>
          </label>
        </div>
      )}

      <div className="tutor-log" ref={logRef}>
        {!messages.length && (
          <div className="tutor-empty">
            <p>
              {context?.mode === "playground"
                ? "I can see your playground code and output. Ask me anything — what to build next, why something failed, or how a concept works."
                : "I can see the question you are working on. Ask me anything — a hint, an explanation, or why your code did not work."}
            </p>
            <div className="tutor-starters">
              {context?.mode === "playground" ? (
                <>
                  <button onClick={() => sendMessage("Review my code and suggest one improvement.")}>
                    Review my code
                  </button>
                  <button onClick={() => sendMessage("Give me a small exercise that matches my current level.")}>
                    Give me an exercise
                  </button>
                  <button onClick={() => sendMessage("Explain my last error in simple words.")}>
                    Explain my error
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => sendMessage("Give me a small hint, not the answer.")}>Give me a hint</button>
                  <button onClick={() => sendMessage("Explain the concept this question is testing, simply.")}>
                    Explain the concept
                  </button>
                  <button onClick={() => sendMessage("Why is my current attempt wrong?")}>Check my attempt</button>
                </>
              )}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            className={message.role === "user" ? "tutor-message user" : "tutor-message assistant"}
            key={index}
          >
            <MessageBody text={message.content} />
          </div>
        ))}

        {busy && <div className="tutor-message assistant thinking">Thinking...</div>}
      </div>

      {error && <p className="tutor-error">{error}</p>}

      <form
        className="tutor-input-row"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask the tutor..."
          aria-label="Message to the AI tutor"
        />
        <button className="primary-button" type="submit" disabled={busy || !draft.trim()}>
          Send
        </button>
      </form>
    </section>
  );
}

export default AiTutor;
