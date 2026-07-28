(function () {
  "use strict";

  const bank = window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
  const freeze = {
    "schemaVersion": 1,
    "revision": "curated-sentence-exam-v2-cb6b",
    "bankSchemaVersion": 1,
    "entryCount": 702,
    "typedCount": 359,
    "recognitionCount": 343,
    "hashes": {
      "promptsSha256": "1e6d383386f576fa529b4fa48842ac0461751ab903246c3bc6ad99d6c7d81be5",
      "answersSha256": "f1ce5fdc37e486f79de85393f7eac20eb98052467c8f487802434771c5aa8375",
      "typedReviewsSha256": "df423215efe262685cf001617cc890d8885b4d318bfa398e69c2f08e0cc088a7",
      "entriesSha256": "3b86a439b6d15a8f9f832e1102b7dec60c77743a42293af8a4c31eb6a0ea0898"
    },
    "sourceFiles": {
      "sentence_exam_curated_bank.js": "dd390ed06c91c0f095d3efb048e330afea16634b6dbe39182e8e9cb180146ecc",
      "docs/generated/sentence_exam_inventory.json": "c847260ef3a7a3c852dfad15745287ec28634642d1987a3af8b919643f6c394b",
      "docs/generated/sentence_exam_shortlist.json": "f3ace23ebfe57d632f6621f0702eaa4c84b93a3fd9e807a5ed8e4d818bc1caff",
      "docs/generated/sentence_exam_curated_bank_cb4_authoring.json": "0dc8b2ca0a04b6b6b02cd7caf72d551d034cc9bdb0f4571f1e838234a7ed50ee",
      "docs/reviews/sentence_exam_curated_bank_cb4_reviews.json": "ee45b83b6c607a009bf4cbd37c0f8aba781a9bb501a093706f1b546ed3ecdc9d",
      "docs/authoring/sentence_exam_cb6b_controlled_items.json": "9515452a59314bcb29ea9f6b1582d6352f6699bbf50cf235bcd34f914c2f7562",
      "docs/authoring/sentence_exam_cb6b_replacements.json": "34f843578352c21038092138ea2f35bab0d55085a11aa04593289f63430fcaff",
      "docs/authoring/sentence_exam_cb6b_witness_assignment.json": "f42adc72be3f30b13ec78680e63631b56075311199302838f6e4f8b16b1e2920",
      "docs/generated/sentence_exam_cb6_capacity_authoring.json": "a3689135e00491abc94d194fb38eda5795f31566ed4d6c52e1daf9f31732d098",
      "docs/generated/sentence_exam_cb6_capacity_witness.json": "5421954abd5c34ba00b69627c2f13cb2b0f0a439d0962a79ebb04e893f2f0477",
      "docs/generated/sentence_exam_cb6b_joint_solution.json": "41fa835e3c82c9084dc1713a338af0f08b71f2de05489f8a8caf5550abf99cc9",
      "docs/reviews/sentence_exam_cb6_capacity_reviews.json": "6c5078bae88f7396aacf674bf27aa4ff7f1858a25575a8534198442a1ce6143b"
    }
  };

  if (!bank || typeof bank !== "object") {
    throw new Error("Curated Sentence exam bank must load before its CB5 freeze contract.");
  }
  if (bank.revision !== freeze.revision) {
    throw new Error("Curated Sentence exam bank revision does not match the CB5 freeze contract.");
  }

  function deepFreeze(value) {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    for (const child of Object.values(value)) deepFreeze(child);
    return Object.freeze(value);
  }

  bank.enabled = true;
  bank.freezeState = "frozen";
  bank.freeze = freeze;
  window.HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE = deepFreeze(freeze);
  deepFreeze(bank);
})();
