import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Ensure playwright-core is installed locally
try {
  require.resolve('playwright-core');
} catch (e) {
  console.log('playwright-core not found. Installing locally...');
  execSync('npm install --no-save playwright-core', { stdio: 'inherit' });
}

const { chromium } = require('playwright-core');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Start a simple static web server
const server = http.createServer((req, res) => {
  let filePath = path.join(rootDir, req.url.split('?')[0]);
  if (filePath === rootDir || filePath.endsWith('/') || req.url === '/') {
    filePath = path.join(rootDir, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
    let contentType = 'text/html';
    if (filePath.endsWith('.js')) contentType = 'application/javascript';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.json')) contentType = 'application/json';
    if (filePath.endsWith('.webmanifest')) contentType = 'application/manifest+json';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const port = await new Promise((resolve) => {
  server.listen(0, '127.0.0.1', () => {
    resolve(server.address().port);
  });
});
const baseUrl = `http://127.0.0.1:${port}`;
console.log(`Test server running at ${baseUrl}`);

// 2. Launch browser
console.log('Launching browser...');
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
} catch (err) {
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (err2) {
    browser = await chromium.launch({ headless: true });
  }
}

try {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Track page errors
  const pageErrors = [];
  page.on('pageerror', (err) => {
    console.error('PAGE ERROR:', err.message);
    pageErrors.push(err);
  });

  // Scenario A: Cold Learner (empty localStorage)
  console.log('\n--- Scenario A: Cold Learner ---');
  await page.goto(`${baseUrl}/index.html`);
  await page.waitForTimeout(500); // Allow app to render initial state

  // Click on "Practice" tab in bottom nav
  console.log('Navigating to Practice Hub...');
  await page.click('button.nav-btn[data-nav="practice"]');
  await page.waitForTimeout(200);

  // Click on "Sentence quiz"
  console.log('Opening Sentence quiz...');
  await page.click('button[data-hub-item="sentences"]');
  await page.waitForTimeout(200);

  // Assert that Sentence Studio is locked
  const lockText = await page.textContent('#screen-speak');
  if (lockText.includes('Sentences unlock after you finish the alphabet')) {
    console.log('PASS: Sentence Studio is correctly lock-gated for cold learners.');
  } else {
    throw new Error(`FAIL: Sentence Studio was not locked. Content: ${lockText}`);
  }

  // Click "Continue the alphabet" button to verify recovery
  console.log('Clicking "Continue the alphabet" recovery link...');
  await page.click('button[data-ss-goto="today"]');
  await page.waitForTimeout(200);
  
  // Assert we are back on the Learn Hub
  const learnHubVisible = await page.isVisible('button[data-hub-item="alphabet"]');
  if (learnHubVisible) {
    console.log('PASS: Recovery button returned user to Learn Hub menu.');
  } else {
    throw new Error('FAIL: Recovery button did not return user to Learn Hub menu.');
  }

  // Scenario B: Seeded Post-Words Learner
  console.log('\n--- Scenario B: Seeded Post-Words Learner ---');
  await context.clearCookies();
  
  // Seed local storage for Everyday Level K2 with completed vocabulary and alphabet
  await page.goto(`${baseUrl}/index.html`);
  
  // Fetch ALPHABET_LESSON_IDS dynamically from the page
  const alphabetLessonIds = await page.evaluate(() => window.phaseOneLessons ? window.phaseOneLessons.map(l => l.id) : []);

  await page.evaluate((ids) => {
    localStorage.clear();
    const stateObj = {
      onboarded: true,
      level: 'K2',
      correct: 25,
      asked: 25,
      phaseOneCompleted: ids,
      vocabLessonCompleted: window.HANAPATH_WORD_LESSONS ? window.HANAPATH_WORD_LESSONS.map(l => l.id) : [],
      navTab: 'today',
      route: { hub: 'learn', item: null, stage: null },
      sentencesProgress: { band: 1, results: {}, sessionsDone: 0 }
    };
    localStorage.setItem('hanapath-v1', JSON.stringify(stateObj));
  }, alphabetLessonIds);
  
  // Reload page to apply localStorage
  await page.reload();
  await page.waitForTimeout(500);

  // Click on "Practice" tab in bottom nav
  console.log('Navigating to Practice Hub...');
  await page.click('button.nav-btn[data-nav="practice"]');
  await page.waitForTimeout(200);

  // Click on "Sentence quiz"
  console.log('Opening Sentence quiz...');
  await page.click('button[data-hub-item="sentences"]');
  await page.waitForTimeout(200);

  // Verify Sentence Studio is unlocked
  const studioVisible = await page.isVisible('button[data-ss-start="mixed"]');
  if (studioVisible) {
    console.log('PASS: Sentence Studio unlocked for post-words K2 learner.');
  } else {
    throw new Error('FAIL: Sentence Studio was locked for post-words learner.');
  }

  // Start mixed session
  console.log('Starting mixed sentences session...');
  await page.click('button[data-ss-start="mixed"]');
  await page.waitForTimeout(500);

  // Play through the 5 questions
  for (let i = 0; i < 5; i++) {
    console.log(`Answering question ${i + 1}/5...`);
    
    // Wait for the active question card to render
    await page.waitForSelector('.card[data-ss-id]', { state: 'visible', timeout: 5000 });
    
    const sentenceId = await page.getAttribute('.card[data-ss-id]', 'data-ss-id');
    console.log(`Active sentence ID: "${sentenceId}"`);

    const qMode = await page.evaluate(() => window.sentenceQuestionMode ? window.sentenceQuestionMode() : 'translate');
    console.log(`Question Mode: ${qMode}`);

    if (qMode === 'build') {
      // Find the correct tile order
      const clickIndices = await page.evaluate((id) => {
        const row = window.HANAPATH_SENTENCES.find(r => r.id === id);
        if (!row) return [];
        const stripEnd = (tok) => String(tok).replace(/[.!?…,~]+$/, "");
        const expectedWords = (row.tokens || row.korean.split(/\s+/)).map(stripEnd).filter(Boolean);
        const tiles = Array.from(document.querySelectorAll('button[data-ss-tile]'));
        const tileTexts = tiles.map(btn => stripEnd(btn.textContent.trim()));
        const indices = [];
        const used = new Set();
        for (const word of expectedWords) {
          const idx = tileTexts.findIndex((txt, idx2) => txt === word && !used.has(idx2));
          if (idx !== -1) {
            indices.push(tiles[idx].getAttribute('data-ss-tile'));
            used.add(idx);
          }
        }
        return indices;
      }, sentenceId);

      for (const idx of clickIndices) {
        await page.click(`button[data-ss-tile="${idx}"]`);
        await page.waitForTimeout(100);
      }
      // Click Check button to submit
      await page.click('button[data-ss-check]');
    } else if (qMode === 'shadow') {
      // Click the self-mark correct button
      await page.click('button[data-ss-selfmark="correct"]');
    } else {
      // For type/translate/listen/transform modes, fill the expected answer directly
      const answer = await page.evaluate((id) => {
        const row = window.HANAPATH_SENTENCES.find(r => r.id === id);
        return row ? row.korean : null;
      }, sentenceId);

      if (!answer) {
        throw new Error(`Could not find sentence with ID: "${sentenceId}"`);
      }
      await page.fill('#ssTypedInput', answer);
      // Click Check button to submit
      await page.click('button[data-ss-check]');
    }

    await page.waitForTimeout(200); // Wait for transition to feedback
    
    // Proceed to next question by clicking [data-ss-next] button
    await page.waitForSelector('button[data-ss-next]', { state: 'visible', timeout: 2000 });
    await page.click('button[data-ss-next]');
    await page.waitForTimeout(200);
  }

  // Assert summary screen is reached
  const summaryTitle = await page.textContent('#screen-speak .screen-title');
  if (summaryTitle.includes('correct')) {
    console.log(`PASS: Completed all 5 questions and reached the summary screen (${summaryTitle}).`);
  } else {
    throw new Error(`FAIL: Did not reach summary screen. Title: ${summaryTitle}`);
  }

  // Verify no page errors occurred
  if (pageErrors.length > 0) {
    throw new Error(`FAIL: ${pageErrors.length} console/page error(s) occurred during run.`);
  } else {
    console.log('PASS: 0 page errors captured during the run.');
  }

  console.log('\nAll scripted cold-learner verifications passed successfully! 🛡️');

} finally {
  console.log('Cleaning up browser and server...');
  await browser.close();
  server.close();
}
