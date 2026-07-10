import fs from "fs";
import http from "http";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);

let chromium;
try {
  ({ chromium } = require("playwright-core"));
} catch (error) {
  throw new Error("playwright-core is required for this smoke test. Install it locally or use the bundled workspace dependency runtime.");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const storageKey = "hanapath-v1";
const alphabetLessonIds = [
  "anchor-vowels",
  "base-consonants",
  "block-geometry",
  "complete-vowels",
  "strong-consonants",
  "batchim-basics",
  "reading-graduation",
  "alphabet-mastery",
];

const contentTypes = new Map([
  [".css", "text/css"],
  [".csv", "text/csv"],
  [".html", "text/html"],
  [".js", "application/javascript"],
  [".json", "application/json"],
  [".png", "image/png"],
  [".webmanifest", "application/manifest+json"],
]);

function staticFileForRequest(url) {
  const pathname = decodeURIComponent(url.split("?")[0] || "/");
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const resolved = path.resolve(rootDir, relativePath);
  if (resolved !== rootDir && !resolved.startsWith(rootDir + path.sep)) {
    return null;
  }
  return resolved;
}

const server = http.createServer((req, res) => {
  const filePath = staticFileForRequest(req.url || "/");
  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
    const contentType = contentTypes.get(path.extname(filePath)) || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

const port = await new Promise((resolve) => {
  server.listen(0, "127.0.0.1", () => resolve(server.address().port));
});
const baseUrl = `http://127.0.0.1:${port}`;
console.log(`Test server running at ${baseUrl}`);

let browser;
try {
  browser = await chromium.launch({ channel: "chrome", headless: true });
} catch {
  try {
    browser = await chromium.launch({ channel: "msedge", headless: true });
  } catch {
    browser = await chromium.launch({ headless: true });
  }
}

async function waitForApp(page) {
  await page.goto(`${baseUrl}/index.html`);
  await page.waitForSelector("button.nav-btn[data-nav='practice']", { timeout: 10000 });
}

async function openSentenceStudio(page) {
  await page.click("button.nav-btn[data-nav='practice']");
  await page.waitForSelector("button[data-hub-item='sentences']", { timeout: 5000 });
  await page.click("button[data-hub-item='sentences']");
  await page.waitForSelector("#screen-speak", { timeout: 5000 });
}

async function getStoredState(page) {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "{}"), storageKey);
}

async function setStoredState(page, state) {
  await page.evaluate(
    ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
    { key: storageKey, value: state },
  );
}

async function seedPostWordsLearner(page) {
  await waitForApp(page);
  const allWordLessonIds = await page.evaluate(() =>
    Array.isArray(window.HANAPATH_WORD_LESSONS) ? window.HANAPATH_WORD_LESSONS.map((lesson) => lesson.id) : [],
  );
  if (!allWordLessonIds.length) {
    throw new Error("Could not seed post-Words learner: word lesson plan did not load.");
  }

  await setStoredState(page, {
    onboarded: true,
    level: "K2",
    correct: 25,
    asked: 25,
    phaseOneCompleted: alphabetLessonIds,
    vocabLessonCompleted: allWordLessonIds,
    vocabPlanVersion: 2,
    vocabKnownRanks: Array.from({ length: 25 }, (_, index) => index + 1),
    navTab: "today",
    route: { hub: "learn", item: null, stage: null },
    sentencesProgress: { band: 1, results: {}, sessionsDone: 0 },
  });
  await page.reload();
  await page.waitForSelector("button.nav-btn[data-nav='practice']", { timeout: 10000 });
}

async function currentSentenceQuestion(page) {
  await page.waitForSelector(".card[data-ss-id]", { state: "visible", timeout: 5000 });
  return page.evaluate(() => {
    const card = document.querySelector(".card[data-ss-id]");
    const id = card?.getAttribute("data-ss-id") || "";
    const row = window.HANAPATH_SENTENCES.find((item) => item.id === id);
    const mode = window.sentenceQuestionMode ? window.sentenceQuestionMode() : "translate";
    let expected = row?.korean || "";
    let transformId = null;
    if (mode === "transform") {
      const transform = getSentenceTransformForSessionRow(sentenceStudioSession, row);
      expected = transform?.expected || expected;
      transformId = transform?.id || null;
    }
    return {
      id,
      mode,
      expected,
      transformId,
    };
  });
}

async function answerCurrentQuestion(page, { useHelpers = false, reveal = false } = {}) {
  const question = await currentSentenceQuestion(page);
  console.log(`Answering ${question.mode} question for ${question.id}`);

  if (question.mode === "build") {
    const clickIndices = await page.evaluate((id) => {
      const row = window.HANAPATH_SENTENCES.find((item) => item.id === id);
      if (!row) return [];
      const stripEnd = (token) => String(token).replace(/[.!?...,~]+$/, "");
      const expectedWords = (row.tokens || row.korean.split(/\s+/)).map(stripEnd).filter(Boolean);
      const tiles = Array.from(document.querySelectorAll("button[data-sentence-tile]"));
      const tileTexts = tiles.map((btn) => stripEnd(btn.textContent.trim()));
      const indices = [];
      const used = new Set();
      for (const word of expectedWords) {
        const index = tileTexts.findIndex((text, candidateIndex) => text === word && !used.has(candidateIndex));
        if (index !== -1) {
          indices.push(tiles[index].getAttribute("data-sentence-tile"));
          used.add(index);
        }
      }
      return indices;
    }, question.id);

    for (const index of clickIndices) {
      await page.click(`button[data-sentence-tile="${index}"]`);
    }
    await page.click("button[data-sentence-check]");
  } else if (question.mode === "shadow") {
    await page.click("button[data-sentence-selfmark='correct']");
  } else if (reveal) {
    await page.click("button[data-sentence-reveal]");
  } else {
    if (useHelpers) {
      await page.click("button[data-sentence-helper='tip']");
      // Close the tip overlay before clicking other helpers to prevent overlay interception
      await page.click("button[data-sentence-overlay-close]");
      await page.click("button[data-sentence-helper='wordBank']");
      await page.click("button[data-sentence-helper='nextChunk']");
    }
    await page.waitForSelector("#ssTypedInput", { state: "visible", timeout: 5000 });
    await page.evaluate((val) => {
      const input = document.querySelector("#ssTypedInput");
      if (input) {
        input.value = val;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }, question.expected);
    await page.click("button[data-sentence-check]");
  }

  // Wait for either the rating buttons or the next button to appear on the feedback screen
  const rateBtn = page.locator("button[data-sentence-rate='known']");
  const nextBtn = page.locator("button[data-sentence-next]");
  await Promise.race([
    rateBtn.waitFor({ state: "visible", timeout: 5000 }),
    nextBtn.waitFor({ state: "visible", timeout: 5000 }),
  ]);

  if (await rateBtn.isVisible()) {
    await rateBtn.click();
    await page.waitForTimeout(600); // Allow rate button click animation and slide-out to complete
  } else {
    await nextBtn.click();
  }

  return question;
}

async function latestSentenceEvent(page) {
  const state = await getStoredState(page);
  const events = state.sentencesProgress?.reviewEvents || [];
  return events[events.length - 1] || null;
}

try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (err) => {
    console.error("PAGE ERROR:", err.message);
    pageErrors.push(err);
  });

  console.log("\n--- Scenario A: cold learner is gated ---");
  await waitForApp(page);
  await openSentenceStudio(page);
  const lockText = await page.textContent("#screen-speak");
  if (!lockText.includes("Sentences unlock after you finish the alphabet")) {
    throw new Error(`Sentence Studio was not locked for a cold learner. Content: ${lockText}`);
  }
  await page.click("button[data-ss-goto='today']");
  await page.waitForSelector("button[data-hub-item='alphabet']", { timeout: 5000 });
  console.log("PASS: cold learner is locked and can recover to Learn.");

  console.log("\n--- Scenario B: post-Words learner can practice sentences ---");
  await seedPostWordsLearner(page);
  await openSentenceStudio(page);
  await page.waitForSelector("button[data-ss-start='translate']", { timeout: 5000 });
  console.log("PASS: Sentence Studio unlocked for seeded post-Words learner.");

  await page.click("button[data-ss-start='translate']");
  const helperQuestion = await answerCurrentQuestion(page, { useHelpers: true });
  let event = await latestSentenceEvent(page);
  if (!event || event.sentenceId !== helperQuestion.id || event.result !== "correct" || event.helperCount < 3) {
    throw new Error(`Expected a correct helper-backed translate event; got ${JSON.stringify(event)}`);
  }
  console.log("PASS: Translate & Type records helper-backed success.");

  const unaidedQuestion = await answerCurrentQuestion(page);
  event = await latestSentenceEvent(page);
  if (!event || event.sentenceId !== unaidedQuestion.id || event.result !== "correct" || event.helperCount !== 0) {
    throw new Error(`Expected a correct unaided translate event; got ${JSON.stringify(event)}`);
  }
  console.log("PASS: Translate & Type records unaided success.");

  await page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    console.log("BEFORE FORCING DUE DATES: ", raw);
    const state = JSON.parse(raw);
    for (const record of Object.values(state.sentencesProgress.results || {})) {
      record.due = Date.now() - 1000;
    }
    console.log("AFTER FORCING DUE DATES: ", JSON.stringify(state.sentencesProgress.results));
    localStorage.setItem(key, JSON.stringify(state));
  }, storageKey);
  await page.reload();
  await openSentenceStudio(page);
  const dueCountText = await page.textContent("#screen-speak");
  console.log("DUE COUNT TEXT IS:", JSON.stringify(dueCountText));
  if (!/[1-9]\d*\s+due/.test(dueCountText)) {
    throw new Error("Expected at least one sentence review to resurface after forcing due dates into the past.");
  }
  console.log("PASS: due sentence reviews resurface on the hub.");

  console.log("\n--- Scenario C: transform mode records transform IDs ---");
  let state = await getStoredState(page);
  state.sentencesProgress = { ...(state.sentencesProgress || {}), band: 3 };
  await setStoredState(page, state);
  await page.reload();
  await openSentenceStudio(page);
  await page.waitForSelector("button[data-ss-start='transform']:not([disabled])", { timeout: 5000 });
  await page.click("button[data-ss-start='transform']");
  const transformQuestion = await answerCurrentQuestion(page, { reveal: true });
  event = await latestSentenceEvent(page);
  if (!event || event.sentenceId !== transformQuestion.id || event.result !== "revealed" || !event.transformId) {
    throw new Error(`Expected transform reveal event with transformId; got ${JSON.stringify(event)}`);
  }
  console.log("PASS: Transform reveal records transformId.");

  if (pageErrors.length) {
    throw new Error(`${pageErrors.length} page error(s) occurred during the run.`);
  }
  console.log("\nAll scripted cold-learner verifications passed successfully.");
} finally {
  await browser?.close();
  server.close();
}
