(() => {
  "use strict";

  const TRAILING_PUNCTUATION = /[.,!?;:"'`~(){}\[\]<>\\/·-]+$/g;

  function tokenize(value) {
    if (Array.isArray(value)) return value.map((token) => String(token || "").trim()).filter(Boolean);
    return String(value || "")
      .trim()
      .split(/\s+/)
      .map((token) => token.replace(TRAILING_PUNCTUATION, "").trim())
      .filter(Boolean);
  }

  function normalizeToken(value) {
    return String(value || "")
      .normalize("NFC")
      .trim()
      .replace(/[.!?…,~]/g, "")
      .replace(/\s+/g, "");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function characterDistance(leftValue, rightValue) {
    const left = Array.from(normalizeToken(leftValue));
    const right = Array.from(normalizeToken(rightValue));
    const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
    for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
      const current = [leftIndex];
      for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
        const substitution = previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1);
        current[rightIndex] = Math.min(
          previous[rightIndex] + 1,
          current[rightIndex - 1] + 1,
          substitution,
        );
      }
      previous.splice(0, previous.length, ...current);
    }
    return previous[right.length];
  }

  function pairRemainingTokens(remainingTarget, remainingAttempt) {
    const m = remainingTarget.length;
    const n = remainingAttempt.length;
    const cells = Array.from({ length: m + 1 }, () => Array(n + 1).fill(null));
    cells[0][0] = { cost: 0, action: "done" };
    for (let targetIndex = 1; targetIndex <= m; targetIndex += 1) {
      cells[targetIndex][0] = { cost: targetIndex * 2, action: "missing" };
    }
    for (let attemptIndex = 1; attemptIndex <= n; attemptIndex += 1) {
      cells[0][attemptIndex] = { cost: attemptIndex * 2, action: "extra" };
    }

    for (let targetIndex = 1; targetIndex <= m; targetIndex += 1) {
      for (let attemptIndex = 1; attemptIndex <= n; attemptIndex += 1) {
        const targetToken = remainingTarget[targetIndex - 1].token;
        const attemptToken = remainingAttempt[attemptIndex - 1].token;
        const maxLength = Math.max(Array.from(normalizeToken(targetToken)).length, Array.from(normalizeToken(attemptToken)).length, 1);
        const similarityPenalty = Math.min(3, Math.max(1, Math.ceil((characterDistance(targetToken, attemptToken) / maxLength) * 3)));
        const candidates = [
          { cost: cells[targetIndex - 1][attemptIndex - 1].cost + similarityPenalty, action: "substituted" },
          { cost: cells[targetIndex - 1][attemptIndex].cost + 2, action: "missing" },
          { cost: cells[targetIndex][attemptIndex - 1].cost + 2, action: "extra" },
        ];
        candidates.sort((a, b) => a.cost - b.cost || ({ substituted: 0, missing: 1, extra: 2 }[a.action] - { substituted: 0, missing: 1, extra: 2 }[b.action]));
        cells[targetIndex][attemptIndex] = candidates[0];
      }
    }

    const pairs = [];
    let targetIndex = m;
    let attemptIndex = n;
    while (targetIndex > 0 || attemptIndex > 0) {
      const action = cells[targetIndex][attemptIndex].action;
      if (action === "substituted") {
        pairs.push({ action, target: remainingTarget[targetIndex - 1], attempt: remainingAttempt[attemptIndex - 1] });
        targetIndex -= 1;
        attemptIndex -= 1;
      } else if (action === "missing") {
        pairs.push({ action, target: remainingTarget[targetIndex - 1], attempt: null });
        targetIndex -= 1;
      } else {
        pairs.push({ action: "extra", target: null, attempt: remainingAttempt[attemptIndex - 1] });
        attemptIndex -= 1;
      }
    }
    return pairs.reverse();
  }

  function alignTokens(targetValue, typedValue) {
    const targetTokens = tokenize(targetValue);
    const attemptTokens = tokenize(typedValue);
    const targetKeys = targetTokens.map(normalizeToken);
    const attemptKeys = attemptTokens.map(normalizeToken);
    const m = targetTokens.length;
    const n = attemptTokens.length;

    const cells = Array.from({ length: m + 1 }, () =>
      Array.from({ length: n + 1 }, () => ({ matches: 0, displacement: 0, action: "done" })),
    );
    const priority = { match: 0, skipTarget: 1, skipAttempt: 2, done: 3 };
    const choose = (current, candidate) => {
      if (!current) return candidate;
      if (candidate.matches !== current.matches) return candidate.matches > current.matches ? candidate : current;
      if (candidate.displacement !== current.displacement) return candidate.displacement < current.displacement ? candidate : current;
      return priority[candidate.action] < priority[current.action] ? candidate : current;
    };

    for (let targetIndex = m; targetIndex >= 0; targetIndex--) {
      for (let attemptIndex = n; attemptIndex >= 0; attemptIndex--) {
        if (targetIndex === m && attemptIndex === n) continue;
        let best = null;
        if (
          targetIndex < m
          && attemptIndex < n
          && targetKeys[targetIndex]
          && targetKeys[targetIndex] === attemptKeys[attemptIndex]
        ) {
          const next = cells[targetIndex + 1][attemptIndex + 1];
          best = choose(best, {
            matches: next.matches + 1,
            displacement: next.displacement + Math.abs(targetIndex - attemptIndex),
            action: "match",
          });
        }
        if (targetIndex < m) {
          const next = cells[targetIndex + 1][attemptIndex];
          best = choose(best, { matches: next.matches, displacement: next.displacement, action: "skipTarget" });
        }
        if (attemptIndex < n) {
          const next = cells[targetIndex][attemptIndex + 1];
          best = choose(best, { matches: next.matches, displacement: next.displacement, action: "skipAttempt" });
        }
        cells[targetIndex][attemptIndex] = best || cells[targetIndex][attemptIndex];
      }
    }

    const target = targetTokens.map((token, index) => ({ token, index, status: "pending", attemptIndex: null }));
    const attempt = attemptTokens.map((token, index) => ({ token, index, status: "pending", targetIndex: null }));

    let targetIndex = 0;
    let attemptIndex = 0;
    while (targetIndex < m || attemptIndex < n) {
      const action = cells[targetIndex]?.[attemptIndex]?.action || "done";
      if (action === "match") {
        target[targetIndex].status = "correct";
        target[targetIndex].attemptIndex = attemptIndex;
        attempt[attemptIndex].status = "correct";
        attempt[attemptIndex].targetIndex = targetIndex;
        targetIndex += 1;
        attemptIndex += 1;
      } else if (action === "skipTarget") {
        targetIndex += 1;
      } else if (action === "skipAttempt") {
        attemptIndex += 1;
      } else {
        break;
      }
    }

    const movedCandidates = [];
    for (const targetItem of target) {
      if (targetItem.status !== "pending" || !targetKeys[targetItem.index]) continue;
      for (const attemptItem of attempt) {
        if (attemptItem.status !== "pending") continue;
        if (targetKeys[targetItem.index] !== attemptKeys[attemptItem.index]) continue;
        movedCandidates.push({
          targetIndex: targetItem.index,
          attemptIndex: attemptItem.index,
          distance: Math.abs(targetItem.index - attemptItem.index),
        });
      }
    }
    movedCandidates.sort((a, b) =>
      a.distance - b.distance || a.targetIndex - b.targetIndex || a.attemptIndex - b.attemptIndex,
    );
    for (const candidate of movedCandidates) {
      const targetItem = target[candidate.targetIndex];
      const attemptItem = attempt[candidate.attemptIndex];
      if (targetItem.status !== "pending" || attemptItem.status !== "pending") continue;
      targetItem.status = "moved";
      targetItem.attemptIndex = candidate.attemptIndex;
      attemptItem.status = "moved";
      attemptItem.targetIndex = candidate.targetIndex;
    }

    const remainingTarget = target.filter((item) => item.status === "pending");
    const remainingAttempt = attempt.filter((item) => item.status === "pending");
    for (const pair of pairRemainingTokens(remainingTarget, remainingAttempt)) {
      if (pair.action === "substituted") {
        pair.target.status = "substituted";
        pair.target.attemptIndex = pair.attempt.index;
        pair.attempt.status = "substituted";
        pair.attempt.targetIndex = pair.target.index;
      } else if (pair.action === "missing") {
        pair.target.status = "missing";
      } else {
        pair.attempt.status = "extra";
      }
    }

    const counts = { correct: 0, moved: 0, substituted: 0, missing: 0, extra: 0 };
    for (const item of target) {
      if (Object.prototype.hasOwnProperty.call(counts, item.status) && item.status !== "extra") counts[item.status] += 1;
    }
    counts.extra = attempt.filter((item) => item.status === "extra").length;

    return { target, attempt, counts };
  }

  function summary(alignment) {
    const parts = [];
    const add = (count, singular, plural = `${singular}s`) => {
      if (count) parts.push(`${count} ${count === 1 ? singular : plural}`);
    };
    add(alignment.counts.moved, "moved token");
    add(alignment.counts.substituted, "substitution");
    add(alignment.counts.missing, "missing token");
    add(alignment.counts.extra, "extra token");

    const details = [];
    for (const item of alignment.target) {
      if (item.status === "moved") {
        details.push(`${item.token} belongs in target position ${item.index + 1}, not answer position ${item.attemptIndex + 1}`);
      } else if (item.status === "substituted") {
        const received = alignment.attempt[item.attemptIndex]?.token || "nothing";
        details.push(`target position ${item.index + 1} expects ${item.token}, not ${received}`);
      } else if (item.status === "missing") {
        details.push(`target position ${item.index + 1} is missing ${item.token}`);
      }
    }
    for (const item of alignment.attempt) {
      if (item.status === "extra") details.push(`${item.token} is extra at answer position ${item.index + 1}`);
    }

    const headline = parts.length ? `Token feedback: ${parts.join(", ")}.` : "Token feedback: no token differences.";
    return details.length ? `${headline} ${details.join(". ")}.` : headline;
  }

  function tokenHtml(item, side) {
    const statusLabel = {
      correct: "correct",
      moved: "moved",
      substituted: side === "target" ? "expected instead" : "substitution",
      missing: "missing",
      extra: "extra",
    }[item.status] || item.status;
    return `<span class="ss-tok ss-tok-${item.status}" lang="ko" data-sentence-token-status="${item.status}" title="${escapeHtml(statusLabel)}">${escapeHtml(item.token)}</span>`;
  }

  function render(targetValue, typedValue) {
    const alignment = alignTokens(targetValue, typedValue);
    const attemptHtml = alignment.attempt.length
      ? alignment.attempt.map((item) => tokenHtml(item, "attempt")).join(" ")
      : `<span class="ss-empty-answer">No answer entered</span>`;
    const targetHtml = alignment.target.map((item) => tokenHtml(item, "target")).join(" ");

    return `
      <div class="ss-diff" role="status" aria-live="polite" aria-atomic="true" data-sentence-token-diff>
        <p class="sr-only" data-sentence-diff-summary>${escapeHtml(summary(alignment))}</p>
        <div class="ss-diff-row" aria-hidden="true">
          <span class="ss-diff-label">Your answer</span>
          <div class="ss-diff-tokens">${attemptHtml}</div>
        </div>
        <div class="ss-diff-row" aria-hidden="true">
          <span class="ss-diff-label">Target</span>
          <div class="ss-diff-tokens">${targetHtml}</div>
        </div>
        <div class="ss-diff-legend" aria-hidden="true">
          <span><i class="ss-legend-swatch ss-tok-correct"></i>Correct</span>
          <span><i class="ss-legend-swatch ss-tok-moved"></i>Moved</span>
          <span><i class="ss-legend-swatch ss-tok-substituted"></i>Different</span>
          <span><i class="ss-legend-swatch ss-tok-missing"></i>Missing</span>
          <span><i class="ss-legend-swatch ss-tok-extra"></i>Extra</span>
        </div>
      </div>`;
  }

  const api = Object.freeze({ alignTokens, summary, render });
  Object.defineProperty(window, "HANAPATH_SENTENCE_FEEDBACK", {
    value: api,
    configurable: false,
    enumerable: true,
    writable: false,
  });
})();
