// Compact dump of one set's questions for content review.
// Usage: node scripts/dump-questions.mjs <module-path> <questionsExport>
const [, , path, exportName] = process.argv;
const mod = await import(`../${path}`);
const questions = mod[exportName];

for (const q of questions) {
  const lines = [`#${q.id} [${q.type}] ${q.prompt}`];
  if (q.snippet) lines.push(`  SNIP: ${q.snippet.replace(/\n/g, " ⏎ ")}`);
  if (q.type === "mcq") {
    for (const c of q.choices) lines.push(`  ${c === q.answer ? "✔" : "·"} ${c}`);
  } else if (q.type === "tf") {
    lines.push(`  ✔ ${q.answer}`);
  } else if (q.type === "fill") {
    lines.push(`  BLANKS: ${q.blanks.map((b) => `${b.label}=${b.answers.join("|")}`).join("  ")}`);
  } else if (q.type === "code") {
    lines.push(`  EXPECTED: ${(q.expected ?? "").replace(/\n/g, " ⏎ ")}`);
    if (q.required) lines.push(`  REQUIRED: ${q.required.join(" && ")}`);
    if (q.accepted) lines.push(`  ACCEPTED: ${q.accepted.length} alt(s)`);
  }
  console.log(lines.join("\n"));
}
