(function () {
  "use strict";

  window.HANAPATH_SENTENCE_EXAM_PROMPT_TEMPLATES = {
    schemaVersion: 1,
    revision: "sentence-exam-prompt-templates-v3-controlled-reconstruction",
    templates: [
      {
        id: "topic-statement",
        label: "Topic-framed statement",
        requiredCueKinds: ["communicativeAct", "addressee", "discourseRole"],
        example: "As for Mina, tell a classmate that she is a trainee.",
      },
      {
        id: "focus-answer",
        label: "Focus-framed answer",
        requiredCueKinds: ["communicativeAct", "addressee", "focusQuestion"],
        example: "Answer the question 'Who is the trainee?' to a classmate.",
      },
      {
        id: "time-anchored-statement",
        label: "Time-anchored statement",
        requiredCueKinds: ["communicativeAct", "addressee", "time"],
        example: "Tell a classmate that you studied Korean yesterday.",
      },
      {
        id: "register-forced-utterance",
        label: "Register-forced utterance",
        requiredCueKinds: ["communicativeAct", "addressee", "register"],
        example: "At a formal reception, thank the host respectfully.",
      },
      {
        id: "lexically-anchored-production",
        label: "Lexically anchored production",
        requiredCueKinds: ["communicativeAct", "addressee", "lexicalAnchor"],
        example: "Tell a classmate that you like bibimbap, using the word '비빔밥'.",
      },
      {
        id: "controlled-clause-transformation",
        label: "Controlled clause transformation",
        requiredCueKinds: [
          "communicativeAct",
          "sourceKorean",
          "requiredConstruction",
          "exactSourceToTargetReplacement",
          "preservationInstruction",
          "grammarInstruction",
        ],
        example: "Combine the supplied Korean clauses using -지만. Replace the exact Korean ending \"어요\" with \"지만\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      },
      {
        id: "recognition-meaning",
        label: "Meaning recognition",
        requiredCueKinds: ["communicativeAct"],
        example: "Choose the English meaning that matches the Korean sentence.",
      },
      {
        id: "recognition-context",
        label: "Context recognition",
        requiredCueKinds: ["communicativeAct", "context"],
        example: "Choose the Korean sentence that best fits the situation.",
      },
    ],
  };
})();
