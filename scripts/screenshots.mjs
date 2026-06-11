// Captures README screenshots from a running dev server.
// Usage: node scripts/screenshots.mjs [baseUrl]   (default http://localhost:5174)
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:5174";
const OUT_DIR = "docs/screenshots";

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("dialog", (dialog) => dialog.accept("Lucy"));

const shot = async (name) => {
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT_DIR}/${name}.png` });
  console.log(`captured ${name}.png`);
};

// 1. Landing page
await page.goto(BASE_URL, { waitUntil: "networkidle" });
await shot("landing");

// 2. Python quiz with its module lesson open
await page.locator(".path-step", { hasText: "Python" }).first().click();
await page.waitForSelector(".quiz-area");
await shot("python-quiz");

// 3. Playground with a real Pyodide run
await page.getByRole("button", { name: "Python Playground" }).click();
await page.waitForSelector(".playground-code");
await page.fill(
  ".playground-code",
  'for n in range(1, 4):\n    print(f"{n} squared is {n ** 2}")'
);
await page.getByRole("button", { name: "Run", exact: true }).click();
try {
  await page.waitForSelector(".playground-console .py-out", { timeout: 90000 });
} catch {
  console.log("warn: Pyodide output did not appear; capturing playground as-is");
}
await shot("playground");

// 4. Guided projects (first project opened)
await page.getByRole("button", { name: "Back to questions" }).click();
await page.getByRole("button", { name: "Guided Projects" }).click();
await page.waitForSelector(".project-card");
await page.locator(".project-card").first().click();
await page.waitForSelector(".project-work");
await shot("projects");

// 5. Exam intro
await page.getByRole("button", { name: "All projects" }).click();
await page.getByRole("button", { name: "Back to questions" }).click();
await page.getByRole("button", { name: "Take Set Exam" }).click();
await page.waitForSelector(".exam-card");
await shot("exam");

// 6. A second track (SQL) showing lessons across languages
await page.getByRole("button", { name: "Back to questions" }).click();
await page.getByRole("button", { name: "Back to topics" }).click();
await page.locator(".path-step", { hasText: "SQL" }).first().click();
await page.waitForSelector(".quiz-area");
await shot("sql-quiz");

await browser.close();
console.log("done");
