import { useState } from "react";
import { pythonProjects } from "../data/pythonProjects.js";
import { reactProjects } from "../data/reactProjects.js";
import { sqlProjects } from "../data/sqlProjects.js";
import { isPythonReady, runPython } from "../lib/pyodideRunner.js";
import { isJsReady, runJs } from "../lib/jsRunner.js";
import { isSqlReady, runSql } from "../lib/sqlRunner.js";

const allProjects = [
  ...pythonProjects.map((project) => ({ track: "python", runtime: "python", ...project })),
  ...reactProjects,
  ...sqlProjects
];

const TRACK_LABELS = { python: "Python", react: "React", sql: "SQL" };

// SQL step checks return rows shaped (check_name, ok); pass = every ok is 1.
function evaluateSqlChecks(result) {
  if (result.error) {
    return { output: "", error: result.error };
  }

  const nameIndex = result.columns.indexOf("check_name");
  const okIndex = result.columns.indexOf("ok");
  const failed = result.rows.filter((row) => Number(row[okIndex]) !== 1);
  const passed = result.rows.filter((row) => Number(row[okIndex]) === 1);
  const output = passed.map((row) => `\u2713 ${row[nameIndex]}`).join("\n");

  if (failed.length) {
    return {
      output,
      error: failed.map((row) => `\u2717 ${row[nameIndex]}`).join("\n")
    };
  }

  return { output, error: null };
}

const PROJECTS_KEY = "concept-academy-projects";

function loadProjectState() {
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY)) ?? {};
  } catch {
    return {};
  }
}

function ProjectsView({ track = "python", onBack }) {
  const [projectState, setProjectState] = useState(loadProjectState);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [code, setCode] = useState("");
  const [run, setRun] = useState(null);
  const [status, setStatus] = useState("idle");
  const [showHint, setShowHint] = useState(false);

  const trackProjects = allProjects.filter((project) => project.track === track);
  const activeProject = trackProjects.find((project) => project.id === activeProjectId);
  const savedSteps = activeProject ? projectState[activeProject.id]?.steps ?? {} : {};
  const step = activeProject?.steps[stepIndex];
  const doneCount = activeProject
    ? activeProject.steps.filter((_, index) => savedSteps[index]?.done).length
    : 0;

  function persist(next) {
    setProjectState(next);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(next));
  }

  function saveStep(patch) {
    const next = {
      ...projectState,
      [activeProject.id]: {
        steps: {
          ...savedSteps,
          [stepIndex]: { ...savedSteps[stepIndex], ...patch }
        }
      }
    };
    persist(next);
  }

  function openProject(project) {
    const saved = projectState[project.id]?.steps ?? {};
    const firstOpen = project.steps.findIndex((_, index) => !saved[index]?.done);
    const startIndex = firstOpen === -1 ? project.steps.length - 1 : firstOpen;
    setActiveProjectId(project.id);
    openStep(project, startIndex, saved);
  }

  function openStep(project, index, saved = savedSteps) {
    setStepIndex(index);
    setCode(saved[index]?.code ?? project.steps[index].starter);
    setRun(null);
    setShowHint(false);
    setStatus("idle");
  }

  async function checkStep() {
    if (!code.trim() || status !== "idle") {
      return;
    }

    const runtime = activeProject.runtime;
    const ready =
      runtime === "python" ? isPythonReady() : runtime === "sql" ? isSqlReady() : isJsReady(runtime);
    setStatus(ready ? "running" : "loading");

    try {
      let result;

      if (runtime === "python") {
        result = await runPython(`${code}\n\n${step.tests}`);
      } else if (runtime === "sql") {
        result = evaluateSqlChecks(await runSql(`${code}\n\n${step.tests}`));
      } else {
        result = await runJs(`${code}\n;\n${step.tests}`, runtime);
      }

      setRun(result);

      if (!result.error) {
        saveStep({ code, done: true });
      } else {
        saveStep({ code });
      }
    } catch (error) {
      setRun({ output: "", result: null, error: String(error.message ?? error) });
    } finally {
      setStatus("idle");
    }
  }

  function resetProject(project) {
    const next = { ...projectState };
    delete next[project.id];
    persist(next);

    if (activeProjectId === project.id) {
      setCode(project.steps[0].starter);
      setStepIndex(0);
      setRun(null);
    }
  }

  if (!activeProject) {
    return (
      <main className="projects-shell">
        <header className="playground-topline">
          <div>
            <p className="eyebrow">{TRACK_LABELS[track] ?? track} Track</p>
            <h1>Guided Projects</h1>
            <p className="playground-subtitle">
              Build something real, step by step. Every step is verified by actually running your
              code against hidden checks, right in the browser.
            </p>
          </div>
          <button className="topic-back-button" onClick={onBack}>
            Back to questions
          </button>
        </header>

        <section className="project-grid" aria-label="Available projects">
          {trackProjects.map((project) => {
            const saved = projectState[project.id]?.steps ?? {};
            const done = project.steps.filter((_, index) => saved[index]?.done).length;

            return (
              <button className="project-card" key={project.id} onClick={() => openProject(project)}>
                <span className="project-level">{project.level}</span>
                <strong>{project.title}</strong>
                <p>{project.description}</p>
                <span className="project-progress">
                  {done}/{project.steps.length} steps complete
                </span>
              </button>
            );
          })}
        </section>
      </main>
    );
  }

  const stepDone = Boolean(savedSteps[stepIndex]?.done);

  return (
    <main className="projects-shell">
      <header className="playground-topline">
        <div>
          <p className="eyebrow">Guided Project · {doneCount}/{activeProject.steps.length} steps</p>
          <h1>{activeProject.title}</h1>
        </div>
        <div className="project-header-actions">
          <button className="topic-back-button" onClick={() => setActiveProjectId(null)}>
            All projects
          </button>
          <button className="topic-back-button" onClick={() => resetProject(activeProject)}>
            Reset project
          </button>
        </div>
      </header>

      <div className="project-layout">
        <nav className="project-steps" aria-label="Project steps">
          {activeProject.steps.map((projectStep, index) => {
            const done = Boolean(savedSteps[index]?.done);

            return (
              <button
                className={
                  index === stepIndex
                    ? "project-step active"
                    : done
                      ? "project-step done"
                      : "project-step"
                }
                key={projectStep.title}
                onClick={() => openStep(activeProject, index)}
              >
                <span>{done ? "✓" : index + 1}</span>
                <span>{projectStep.title}</span>
              </button>
            );
          })}
        </nav>

        <section className="project-work">
          <h2>
            Step {stepIndex + 1}: {step.title}
            {stepDone && <span className="step-done-badge">Complete</span>}
          </h2>
          <p className="project-instructions">{step.instructions}</p>

          <textarea
            className="project-editor"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck="false"
            aria-label="Step code"
          />

          <div className="py-run-row">
            <button
              className="primary-button"
              onClick={checkStep}
              disabled={status !== "idle" || !code.trim()}
            >
              {status === "loading"
                ? "Starting runtime..."
                : status === "running"
                  ? "Checking..."
                  : "Check Step"}
            </button>
            <button className="ghost-button" onClick={() => setShowHint((value) => !value)}>
              {showHint ? "Hide hint" : "Hint"}
            </button>
            {stepDone && stepIndex < activeProject.steps.length - 1 && (
              <button
                className="secondary-button"
                onClick={() => openStep(activeProject, stepIndex + 1)}
              >
                Next step
              </button>
            )}
          </div>

          {showHint && <p className="project-hint">{step.hint}</p>}

          {run && (
            <div className="py-console" role="log" aria-label="Step check output">
              {run.error ? (
                <>
                  {run.output && <pre className="py-out">{run.output}</pre>}
                  <pre className="py-error">{run.error}</pre>
                  <pre className="py-info">Not yet — fix the code and check again.</pre>
                </>
              ) : (
                <>
                  {run.output && <pre className="py-out">{run.output}</pre>}
                  <pre className="py-value">
                    All checks passed.
                    {stepIndex < activeProject.steps.length - 1
                      ? " Move on to the next step."
                      : " Project complete — excellent work!"}
                  </pre>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProjectsView;
