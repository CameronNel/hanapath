(function () {
  "use strict";

  const LOCAL_ONLY_KEYS = new Set([
    "route", "navTab", "mainTab", "learnInProgress", "quickRefActive",
    "phaseOneActive", "pendingPathLesson", "vocabQuery", "vocabBand",
    "vocabView", "vocabPage", "vocabActiveRank", "vocabLessonActive",
    "vocabLessonSession", "wordPathCategory", "wordPathLevel",
    "wordBankQuery", "wordBankFilter", "wordBankSort", "wordBankPage",
    "wordQuickRefActive", "wordQuickRefReturn", "sentenceLessonSession",
    "resetArmed",
  ]);
  const LOCAL_PREFERENCE_KEYS = new Set([
    "appearance", "theme", "reduceMotion", "writingLineWidth", "useMLKit",
    "activeCorrectSound", "activeIncorrectSound", "soundEffectPresetVersion",
    "alphabetBoardMode", "alphabetBoardLabels", "libTab", "studio",
    "weeklyHours", "vocabDailyNewTarget", "wordBankPageSize",
  ]);
  const PROGRESS_NUMBER_KEYS = new Set([
    "round", "asked", "correct", "streak", "bestStreak", "totalMinutes",
    "studyDays", "sessionsDone", "attempts", "score", "bestScore",
    "completedCount", "passedCount", "reviewedCount", "lastAttemptAt",
    "completedAt", "answeredAt", "createdAt", "finishedAt", "reviewedAt",
    "lastSeen", "lastReviewedAt", "due", "interval", "successes", "failures",
  ]);
  const PROGRESS_BOOLEAN_KEYS = new Set([
    "onboarded", "knowsHangul", "drillLabSeen", "hasSeenKoreanKeyboardModal",
    "speakDone", "passed", "qualified", "completed", "approved", "tainted",
  ]);
  const ID_KEYS = [
    "attemptId", "eventId", "resultAttemptId", "relationId", "id", "lessonId",
    "questionId", "generationId", "reviewId",
  ];
  const LEVELS = ["K0", "K1", "K2", "K3", "K4", "K5"];

  function clone(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  }

  function isRecord(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function stableStringify(value) {
    if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
    if (!isRecord(value)) return JSON.stringify(value);
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }

  function itemIdentity(value) {
    if (!isRecord(value)) return stableStringify(value);
    for (const key of ID_KEYS) {
      if (value[key] !== undefined && value[key] !== null && String(value[key])) {
        return `${key}:${String(value[key])}`;
      }
    }
    return stableStringify(value);
  }

  function mergeArrays(local, remote, path) {
    const result = [];
    const byId = new Map();
    for (const value of [...local, ...remote]) {
      const id = itemIdentity(value);
      if (!byId.has(id)) {
        const copied = clone(value);
        byId.set(id, copied);
        result.push(copied);
      } else if (isRecord(value)) {
        const merged = mergeValue(byId.get(id), value, `${path}[]`);
        const index = result.indexOf(byId.get(id));
        result[index] = merged;
        byId.set(id, merged);
      }
    }
    return result;
  }

  function mergeValue(local, remote, path = "") {
    if (local === undefined) return clone(remote);
    if (remote === undefined) return clone(local);
    const key = path.split(".").pop();
    if (LOCAL_PREFERENCE_KEYS.has(key)) return clone(local);
    if (Array.isArray(local) && Array.isArray(remote)) return mergeArrays(local, remote, path);
    if (isRecord(local) && isRecord(remote)) {
      const result = {};
      for (const child of new Set([...Object.keys(remote), ...Object.keys(local)])) {
        result[child] = mergeValue(local[child], remote[child], path ? `${path}.${child}` : child);
      }
      return result;
    }
    if (typeof local === "number" && typeof remote === "number" && PROGRESS_NUMBER_KEYS.has(key)) {
      return Math.max(local, remote);
    }
    if (typeof local === "number" && typeof remote === "number" && /(^|\.)(skills|tabLevels|alphabetWeakSpots)(\.|$)/.test(path)) {
      return Math.max(local, remote);
    }
    if (typeof local === "boolean" && typeof remote === "boolean" && PROGRESS_BOOLEAN_KEYS.has(key)) {
      return local || remote;
    }
    if (key === "level" && LEVELS.includes(local) && LEVELS.includes(remote)) {
      return LEVELS[Math.max(LEVELS.indexOf(local), LEVELS.indexOf(remote))];
    }
    if ((key === "todayDate" || key === "lastDate") && typeof local === "string" && typeof remote === "string") {
      return local > remote ? local : remote;
    }
    return clone(local);
  }

  function stripForCloud(profile) {
    const result = clone(profile || {});
    for (const key of LOCAL_ONLY_KEYS) delete result[key];
    return result;
  }

  function mergeStates(local, remote) {
    const localSafe = isRecord(local) ? local : {};
    const remoteSafe = isRecord(remote) ? remote : {};
    const merged = mergeValue(localSafe, remoteSafe);
    for (const key of LOCAL_ONLY_KEYS) {
      if (Object.prototype.hasOwnProperty.call(localSafe, key)) merged[key] = clone(localSafe[key]);
    }
    if (typeof localSafe.todayDate === "string" && typeof remoteSafe.todayDate === "string") {
      if (localSafe.todayDate > remoteSafe.todayDate) merged.todayDone = clone(localSafe.todayDone || []);
      if (remoteSafe.todayDate > localSafe.todayDate) merged.todayDone = clone(remoteSafe.todayDone || []);
    }
    return merged;
  }

  function adoptRemoteState(local, remote) {
    const localSafe = isRecord(local) ? local : {};
    const result = clone(isRecord(remote) ? remote : {});
    for (const key of LOCAL_ONLY_KEYS) {
      if (Object.prototype.hasOwnProperty.call(localSafe, key)) result[key] = clone(localSafe[key]);
    }
    return result;
  }

  window.HANAPATH_CLOUD_MERGE = Object.freeze({ adoptRemoteState, mergeStates, stableStringify, stripForCloud });
}());
