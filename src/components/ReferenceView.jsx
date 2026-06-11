import { useMemo, useState } from "react";

// One-page cheat sheet per track, generated from the lesson data: every
// module contributes its key points and example snippet. W3Schools-style
// "tutorial + reference" — this is the reference half.
function ReferenceView({ track, lessonsByModule, onBack }) {
  const [filter, setFilter] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const sections = useMemo(() => {
    const query = filter.trim().toLowerCase();

    return track.sets
      .filter((set) => !set.id.endsWith("-all") && set.id !== "all")
      .map((set) => {
        const modules = track.modules
          .filter((module) => !module.setId || module.setId === set.id)
          .map((module) => ({ module, lesson: lessonsByModule[module.id] }))
          .filter(({ lesson }) => lesson)
          .filter(({ module, lesson }) => {
            if (!query) return true;
            return [module.title, ...(lesson.points ?? []), lesson.example ?? ""]
              .join(" ")
              .toLowerCase()
              .includes(query);
          });

        return { set, modules };
      })
      .filter((section) => section.modules.length > 0);
  }, [track, lessonsByModule, filter]);

  // single-set tracks attach no setId to modules; avoid repeating everything per set
  const dedupedSections =
    sections.length > 1 && track.modules.every((module) => !module.setId)
      ? [sections[0]]
      : sections;

  async function copyExample(id, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1400);
    } catch {
      // clipboard unavailable (permissions) — silently ignore
    }
  }

  const totalShown = dedupedSections.reduce((sum, section) => sum + section.modules.length, 0);

  return (
    <main className="playground-shell reference-shell">
      <header className="playground-topline">
        <div>
          <p className="eyebrow">{track.setTitle} Track</p>
          <h1>{track.setTitle} Quick Reference</h1>
          <p className="playground-subtitle">
            Every concept on one page — the key rules and a copy-ready example for each of the{" "}
            {track.modules.length} modules. Use it while you practice.
          </p>
        </div>
        <button className="topic-back-button" onClick={onBack}>
          Back to questions
        </button>
      </header>

      <div className="reference-toolbar">
        <label className="topic-search reference-search">
          <span>Filter concepts</span>
          <input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Try: join, useState, loop..."
          />
        </label>
        <span className="reference-count">
          {totalShown} concept{totalShown === 1 ? "" : "s"}
        </span>
      </div>

      {dedupedSections.map(({ set, modules }) => (
        <section className="reference-section" key={set.id} aria-label={set.label}>
          {dedupedSections.length > 1 && (
            <h2 className="reference-set-title">
              {set.title} · {set.label}
            </h2>
          )}
          <div className="reference-grid">
            {modules.map(({ module, lesson }) => (
              <article className="reference-card" key={module.id} id={`ref-${module.id}`}>
                <h3>{module.title}</h3>
                {lesson.points && (
                  <ul>
                    {lesson.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
                {lesson.example && (
                  <div className="reference-example">
                    <pre>{lesson.example}</pre>
                    <button
                      className="copy-button"
                      onClick={() => copyExample(module.id, lesson.example)}
                    >
                      {copiedId === module.id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}

      {totalShown === 0 && (
        <p className="topic-notice">No concepts match "{filter}" — try a shorter keyword.</p>
      )}
    </main>
  );
}

export default ReferenceView;
