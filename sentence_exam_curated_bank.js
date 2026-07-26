(function () {
  "use strict";

  window.HANAPATH_SENTENCE_EXAM_CURATED_BANK = {
    schemaVersion: 1,
    revision: "curated-sentence-exam-v0",
    enabled: false,
    selectionPolicy: {
      typedTargetSize: 288,
      recognitionTargetSize: 320,
      minTypedPerSection: 32,
      minRecognitionPerSection: 24,
      maxTypedPerLesson: 1,
      maxRecognitionPerLesson: 2,
      maxFiniteTypedShare: 0.15,
      examSizes: {
        stage: { total: 24, typed: 20, selected: 4 },
        final: { total: 50, typed: 40, selected: 10 },
        retention: { total: 25, typed: 20, selected: 5 },
      },
    },
    entries: [],
  };
})();
