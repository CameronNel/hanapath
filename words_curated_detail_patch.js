(function () {
  "use strict";

  if (window.__curatedWordDetailPatchInstalled) {
    return;
  }
  window.__curatedWordDetailPatchInstalled = true;

  const detailById = {
    w0409_gada: {
      examplePronunciation: "jigeum gayo",
      formNote: "가다 is the dictionary form. In this sentence it becomes 가요 because polite present uses the stem 가 plus -요.",
    },
    w0007_deutda: {
      examplePronunciation: "eumageul deureoyo",
      formNote: "듣다 is the dictionary form. In this sentence it becomes 들어요 because ㄷ irregular verbs change ㄷ to ㄹ before a vowel ending: 듣 + 어요 → 들어요.",
      soundNote: "음악을 links in speech: 음악을 → 으마글, so it sounds closer to eu-ma-geul deu-reo-yo.",
    },
  };

  const words = Array.isArray(window.HANAPATH_CURATED_WORDS) ? window.HANAPATH_CURATED_WORDS : [];
  words.forEach((word) => {
    if (!word || !word.id) {
      return;
    }

    const details = detailById[word.id];
    if (details) {
      Object.assign(word, details);
    }
  });
})();
