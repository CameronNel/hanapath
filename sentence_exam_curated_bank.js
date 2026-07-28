(function () {
  "use strict";

  window.HANAPATH_SENTENCE_EXAM_CURATED_BANK = {
  "schemaVersion": 1,
  "revision": "curated-sentence-exam-v2-cb6b",
  "enabled": false,
  "reviewState": "independently-approved",
  "baseRevision": "curated-sentence-exam-v1-cb4",
  "capacityRevision": "curated-sentence-exam-v2-cb6b-authoring",
  "selectionPolicy": {
    "typedTargetSize": 359,
    "recognitionTargetSize": 343,
    "minTypedPerSection": 32,
    "minRecognitionPerSection": 24,
    "maxTypedPerLesson": 1,
    "maxRecognitionPerLesson": 2,
    "maxFiniteTypedShare": 0.15,
    "examSizes": {
      "stage": {
        "total": 24,
        "typed": 20,
        "selected": 4
      },
      "final": {
        "total": 50,
        "typed": 40,
        "selected": 10
      },
      "retention": {
        "total": 25,
        "typed": 20,
        "selected": 5
      }
    }
  },
  "entries": [
    {
      "id": "s0026",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, ask this complete lesson question: “Who is that person?” Use the expression meaning “person”.",
      "canonicalAnswer": "저 사람은 누구예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l3",
        "sn1-firstwords-u1-l8"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "topic-neun"
      ],
      "shortlistRank": 1,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '저 사람은 누구예요?' matches live source row s0026 (section 1, topic-statement). Prompt forces topic, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0030",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “What is your name?” Use the expression meaning “name”.",
      "canonicalAnswer": "이름이 뭐예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l4"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 2,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '이름이 뭐예요?' matches live source row s0030 (section 1, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0037",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, ask this complete lesson question: “How much is that one over there?” Use the expression meaning “that one over there”.",
      "canonicalAnswer": "저거는 얼마예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l1",
        "sn1-firstwords-u3-l3"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "topic-neun"
      ],
      "shortlistRank": 3,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '저거는 얼마예요?' matches live source row s0037 (section 1, topic-statement). Prompt forces topic, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0137",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, ask this complete lesson question: “What time is it?” Use the expression meaning “how many”.",
      "canonicalAnswer": "몇 시예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l4"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "time-expression"
      ],
      "shortlistRank": 4,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '몇 시예요?' matches live source row s0137 (section 1, time-anchored-statement). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0138",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, ask this complete lesson question: “What food do you like?” Use the expression meaning “what kind of”.",
      "canonicalAnswer": "무슨 음식을 좋아해요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l2"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "question-polite"
      ],
      "shortlistRank": 5,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '무슨 음식을 좋아해요?' matches live source row s0138 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0343",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Try doing it once.” Use the expression meaning “times counter”.",
      "canonicalAnswer": "한 번 해 보세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l4"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "counter-phrase",
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 6,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '한 번 해 보세요.' matches live source row s0343 (section 1, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0346",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, ask this complete lesson question: “What time is it now?” Use the expression meaning “hour counter (clock)”.",
      "canonicalAnswer": "지금 몇 시예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l4",
        "sn1-firstwords-u3-l2"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "time-expression"
      ],
      "shortlistRank": 7,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '지금 몇 시예요?' matches live source row s0346 (section 1, time-anchored-statement). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0351",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Give me one bottle of drink, please.” Use the expression meaning “bottles counter”.",
      "canonicalAnswer": "음료수 한 병 주세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l1",
        "sn1-firstwords-u3-l5"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "counter-phrase",
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 8,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '음료수 한 병 주세요.' matches live source row s0351 (section 1, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0001",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for Hangul, say that it is fun to a classmate.",
      "canonicalAnswer": "한글은 재미있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l1"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 9,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '한글은 재미있어요.' matches live source row s0001 (section 1, topic-statement). Prompt forces topic, communicative act; prompt already exact and natural; accepted without change. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0007",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Say that I listen to music. Use the expression taught in this lesson.",
      "canonicalAnswer": "음악을 들어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l7"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 10,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '음악을 들어요.' matches live source row s0007 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0327",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Give me one apple, please.” Use the expression meaning “one (native)”.",
      "canonicalAnswer": "사과 하나 주세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l1",
        "sn1-firstwords-u3-l5"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 11,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '사과 하나 주세요.' matches live source row s0327 (section 1, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0012",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Say thank you very much in polite formal style.",
      "canonicalAnswer": "정말 감사합니다.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l2"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "formal-nida"
      ],
      "shortlistRank": 12,
      "shortlistScore": 171,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '정말 감사합니다.' matches live source row s0012 (section 1, register-forced-utterance). Prompt forces register, communicative act; prompt already exact and natural; accepted without change. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2034",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Reassuring a classmate in ordinary polite Korean, say that it is okay. Use the word 괜찮다.",
      "canonicalAnswer": "괜찮아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "present-polite"
      ],
      "shortlistRank": 13,
      "shortlistScore": 163,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '괜찮아요.' matches live source row s2034 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2047",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Pointing out a place at some distance, tell a classmate in ordinary polite Korean that it is over there. Use the word 저쪽.",
      "canonicalAnswer": "저쪽이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l3",
        "sn3-travel-u2-l1"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo"
      ],
      "shortlistRank": 14,
      "shortlistScore": 163,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '저쪽이에요.' matches live source row s2047 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3573",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Reading the signs” situation, using everyday polite speech, say one complete statement that means exactly: “We ask each other about our hobbies.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "서로의 취미를 물어봐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l9"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 22,
      "shortlistScore": 97,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '서로의 취미를 물어봐요.' matches live source row s3573 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0335",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “There is an exam at nine o'clock.” Use the expression meaning “nine (native)”.",
      "canonicalAnswer": "아홉 시에 시험이 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l6"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "counter-phrase",
        "existence-itda",
        "present-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 16,
      "shortlistScore": 121,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아홉 시에 시험이 있어요.' matches live source row s0335 (section 1, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0322",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “There is a library on the 9th floor.” Use the expression meaning “nine (Sino-Korean)”.",
      "canonicalAnswer": "구 층에 도서관이 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l5"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 17,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '구 층에 도서관이 있어요.' matches live source row s0322 (section 1, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0355",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “One car is parked.” Use the expression meaning “vehicles / machines counter”.",
      "canonicalAnswer": "차 한 대가 서 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l7"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "counter-phrase",
        "existence-itda",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 18,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '차 한 대가 서 있어요.' matches live source row s0355 (section 1, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2050",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking in formal style, apologise with the expression meaning “I am sorry”. Use the word 죄송하다.",
      "canonicalAnswer": "죄송합니다",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l12",
        "sn1-firstwords-u1-l6"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "formal-nida"
      ],
      "shortlistRank": 19,
      "shortlistScore": 109,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '죄송합니다' matches live source row s2050 (section 1, register-forced-utterance). Prompt forces register, communicative act; rewrote the awkward machine prefix into a natural formal-apology instruction with an explicit lexical anchor. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2272",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Reading the signs” situation, using everyday polite speech, ask a polite question that means exactly: “Do you have a table for three?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "세 사람 자리 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l8"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "counter-phrase",
        "existence-itda",
        "question-polite"
      ],
      "shortlistRank": 23,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '세 사람 자리 있어요?' matches live source row s2272 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2455",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Questions on the street” situation, using everyday polite speech, ask a polite question that means exactly: “By what time should I get there?” Keep the intended time meaning and information focus: keep the stated time anchor; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "몇 시까지 갈까요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l8"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "question-polite",
        "time-expression",
        "until-kkaji"
      ],
      "shortlistRank": 24,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '몇 시까지 갈까요?' matches live source row s2455 (section 1, time-anchored-statement). Prompt forces communicative act; tightened the lexical-anchor instruction. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2590",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Useful first exchanges” situation, using everyday polite speech, say one complete statement that means exactly: “I have to work overtime today.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "오늘은 야근을 해야 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l9"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "must-ya-dwaeda",
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 25,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘은 야근을 해야 해요.' matches live source row s2590 (section 1, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3581",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Reading the signs” situation, using everyday polite speech, say one complete statement that means exactly: “I choose clothes before a date.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "데이트 전에 옷을 골라요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l10"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 26,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '데이트 전에 옷을 골라요.' matches live source row s3581 (section 1, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3589",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Reading the signs” situation, using everyday polite speech, say one complete statement that means exactly: “I have to respect the other person's opinion.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "상대방의 의견을 존중해야 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l15"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "must-ya-dwaeda",
        "object-eul-reul",
        "possessive-ui"
      ],
      "shortlistRank": 27,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '상대방의 의견을 존중해야 해요.' matches live source row s3589 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3599",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Reading the signs” situation, using everyday polite speech, say one complete statement that means exactly: “I do not interrupt the other person.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "상대방의 말을 끊지 않아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l11",
        "sn1-firstwords-u1-l15"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "neg-ji-anta",
        "object-eul-reul",
        "possessive-ui"
      ],
      "shortlistRank": 28,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '상대방의 말을 끊지 않아요.' matches live source row s3599 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2326",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Useful first exchanges” situation, using everyday polite speech, ask a polite question that means exactly: “How long does it take to the airport?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "공항까지 얼마나 걸려요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l8"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "question-polite",
        "until-kkaji"
      ],
      "shortlistRank": 29,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '공항까지 얼마나 걸려요?' matches live source row s2326 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2373",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Useful first exchanges” situation, using everyday polite speech, say one complete statement that means exactly: “I'll just take this one.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "그냥 이걸로 할게요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l6"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "present-polite"
      ],
      "shortlistRank": 30,
      "shortlistScore": 41,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '그냥 이걸로 할게요.' matches live source row s2373 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2998",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Reading the signs” situation, using everyday polite speech, say one complete statement that means exactly: “That's exactly my point.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "제 말이 바로 그 말이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l14"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo"
      ],
      "shortlistRank": 31,
      "shortlistScore": 41,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '제 말이 바로 그 말이에요.' matches live source row s2998 (section 1, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0323",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I waited for ten minutes.” Use the expression meaning “ten (Sino-Korean)”. The event happened yesterday.",
      "canonicalAnswer": "십 분 동안 기다렸어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l7"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "counter-phrase",
        "past-polite",
        "time-expression"
      ],
      "shortlistRank": 20,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '십 분 동안 기다렸어요.' matches live source row s0323 (section 1, time-anchored-statement). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2271",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Useful first exchanges” situation, using everyday polite speech, say one complete statement that means exactly: “I'll start a new job from next month.” Keep the intended time meaning and information focus: keep the future plan or prediction; keep the affected object explicit. Use the expression taught in the target line. You are describing a future plan you will begin later.",
      "canonicalAnswer": "다음 달부터 새 일을 시작할 거예요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l10"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "from-buteo",
        "future-geoyeyo",
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 32,
      "shortlistScore": 33,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '다음 달부터 새 일을 시작할 거예요.' matches live source row s2271 (section 1, time-anchored-statement). Prompt forces tense/time, communicative act; replaced a misleading injected 'tomorrow' cue that contradicted the 'from next month' future target with a non-contradictory future-plan cue. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2700",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answer what or who is at issue. In the “Reading the signs” situation, using everyday polite speech, say one complete statement that means exactly: “There's a friend's birthday party next week.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the subject or focus framing. Use the expression taught in the target line.",
      "canonicalAnswer": "다음 주에 친구 생일 파티가 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l13"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "existence-itda",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 33,
      "shortlistScore": 32,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '다음 주에 친구 생일 파티가 있어요.' matches live source row s2700 (section 1, focus-answer). Prompt forces focus, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2702",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "In the “Reading the signs” situation, using everyday polite speech, ask a polite question that means exactly: “Could you give me your contact info?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line. Speak politely to a teacher.",
      "canonicalAnswer": "연락처 좀 알려 주실 수 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l16"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "can-su-itda",
        "honorific-si",
        "question-polite"
      ],
      "shortlistRank": 34,
      "shortlistScore": 32,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "register-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '연락처 좀 알려 주실 수 있어요?' matches live source row s2702 (section 1, register-forced-utterance). Prompt forces register, communicative act; tightened the lexical-anchor instruction. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0620",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, ask this complete lesson question: “Whose car is that over there?” Use the expression meaning “that thing over there”.",
      "canonicalAnswer": "저것은 누구 차예요?",
      "manualAlternatives": [
        "저건 누구 차예요?"
      ],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l3"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "topic-neun"
      ],
      "shortlistRank": 15,
      "shortlistScore": 148,
      "sourceCandidateClass": "finite",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '저것은 누구 차예요?' matches live source row s0620 (section 1, topic-statement). Prompt forces topic, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. one manual alternative (저건 누구 차예요?) verified as the accepted 저것은→저건 contraction from the reviewed eligibility record; canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0101",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, ask this complete lesson question: “Do you have time now?” Use the expression meaning “now”.",
      "canonicalAnswer": "지금 시간 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-daily-u1-l1"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "question-polite",
        "time-expression"
      ],
      "shortlistRank": 1,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '지금 시간 있어요?' matches live source row s0101 (section 2, time-anchored-statement). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0092",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “A cup of tea, please.” Use the expression meaning “tea”.",
      "canonicalAnswer": "차 한 잔 주세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-food-u1-l4"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "counter-phrase",
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 2,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '차 한 잔 주세요.' matches live source row s0092 (section 2, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0215",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “What is the price?” Use the expression meaning “price”.",
      "canonicalAnswer": "가격이 얼마예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-shopping-u1-l1"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 3,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '가격이 얼마예요?' matches live source row s0215 (section 2, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0674",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Ask a question to the teacher.” Use the expression meaning “question”.",
      "canonicalAnswer": "선생님께 질문을 하세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-study-u1-l1"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul"
      ],
      "shortlistRank": 4,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '선생님께 질문을 하세요.' matches live source row s0674 (section 2, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0685",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Be careful with your behavior.” Use the expression meaning “behavior / action”.",
      "canonicalAnswer": "행동을 조심히 하세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-actions-u1-l1"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul"
      ],
      "shortlistRank": 5,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '행동을 조심히 하세요.' matches live source row s0685 (section 2, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0757",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, ask this complete lesson question: “What is his final decision?” Use the expression meaning “decision”.",
      "canonicalAnswer": "그의 최종 결정은 무엇인가요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-actions-u1-l2"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "possessive-ui",
        "question-polite",
        "topic-neun"
      ],
      "shortlistRank": 6,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '그의 최종 결정은 무엇인가요?' matches live source row s0757 (section 2, topic-statement). Prompt forces topic, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0042",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Please sit here.” Use the expression meaning “here”.",
      "canonicalAnswer": "여기 앉으세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-travel-u1-l1"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 7,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '여기 앉으세요.' matches live source row s0042 (section 2, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3627",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Family introductions” situation, using everyday polite speech, say one complete statement that means exactly: “I tell the child to brush their teeth every day.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the destination, time, or static location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "아이에게 매일 양치하라고 말해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-people-u1-l7",
        "sn3-nature-u2-l7"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 42,
      "shortlistScore": 97,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아이에게 매일 양치하라고 말해요.' matches live source row s3627 (section 2, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3021",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Getting things done” situation, using everyday polite speech, ask a polite question that means exactly: “Can I ask you a favor?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "부탁 하나만 해도 돼요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-actions-u1-l8",
        "sn2-actions-u1-l9"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "only-man",
        "question-polite"
      ],
      "shortlistRank": 43,
      "shortlistScore": 96,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '부탁 하나만 해도 돼요?' matches live source row s3021 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3605",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Getting things done” situation, using everyday polite speech, say one complete statement that means exactly: “It is difficult to say right away that I like someone.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "좋아한다고 바로 말하기는 어려워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-actions-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "copula-ieyo",
        "object-eul-reul"
      ],
      "shortlistRank": 44,
      "shortlistScore": 96,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '좋아한다고 바로 말하기는 어려워요.' matches live source row s3605 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3965",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Finding your way” situation, using everyday polite speech, say one complete statement that means exactly: “They say they will tell me the hiring result next week.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "채용 결과를 다음 주에 알려 준대요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-travel-u1-l17",
        "sn3-nature-u2-l15"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 45,
      "shortlistScore": 96,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '채용 결과를 다음 주에 알려 준대요.' matches live source row s3965 (section 2, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3045",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Getting things done” situation, using everyday polite speech, ask a polite question that means exactly: “May I ask you (a favor)?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "부탁드려도 될까요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-actions-u1-l9"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "question-polite"
      ],
      "shortlistRank": 46,
      "shortlistScore": 95,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '부탁드려도 될까요?' matches live source row s3045 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0088",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, ask this complete lesson question: “Did you eat?” Use the expression meaning “meal”. The event happened yesterday.",
      "canonicalAnswer": "밥 먹었어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-food-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "past-polite",
        "present-polite",
        "question-polite"
      ],
      "shortlistRank": 8,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '밥 먹었어요?' matches live source row s0088 (section 2, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0104",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I drink coffee in the morning.” Use the expression meaning “morning”.",
      "canonicalAnswer": "아침에 커피를 마셔요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-daily-u1-l4",
        "sn4-food-u2-l3"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 9,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아침에 커피를 마셔요.' matches live source row s0104 (section 2, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0155",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “I have a computer.” Use the expression meaning “computer”.",
      "canonicalAnswer": "컴퓨터가 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-tech-u1-l1"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 10,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '컴퓨터가 있어요.' matches live source row s0155 (section 2, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0358",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “Our family has four members.” Use the expression meaning “family”.",
      "canonicalAnswer": "우리 가족은 네 명이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-people-u1-l2"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "copula-ieyo",
        "counter-phrase",
        "topic-neun"
      ],
      "shortlistRank": 11,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '우리 가족은 네 명이에요.' matches live source row s0358 (section 2, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0359",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I meet my parents on the weekend.” Use the expression meaning “parents”.",
      "canonicalAnswer": "주말에 부모님을 만나요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-people-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 12,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '주말에 부모님을 만나요.' matches live source row s0359 (section 2, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0366",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “My younger sibling studies well.” Use the expression meaning “younger sibling”.",
      "canonicalAnswer": "제 동생은 공부를 잘해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-people-u1-l3"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 13,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '제 동생은 공부를 잘해요.' matches live source row s0366 (section 2, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0413",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “There are many animals in the zoo.” Use the expression meaning “animal”.",
      "canonicalAnswer": "동물원에 동물이 많아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-nature-u1-l1"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 14,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '동물원에 동물이 많아요.' matches live source row s0413 (section 2, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0414",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “A dog runs in the yard.” Use the expression meaning “dog; general items counter”.",
      "canonicalAnswer": "개가 마당에서 뛰어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-nature-u1-l2"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-eseo",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 15,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '개가 마당에서 뛰어요.' matches live source row s0414 (section 2, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0436",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I cook eggs in the morning.” Use the expression meaning “egg”.",
      "canonicalAnswer": "아침에 계란을 요리해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-food-u1-l9"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 16,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아침에 계란을 요리해요.' matches live source row s0436 (section 2, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0446",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I boil ramen in a pot.” Use the expression meaning “ramen / instant noodles”.",
      "canonicalAnswer": "냄비에 라면을 끓여요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-food-u1-l2"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 17,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '냄비에 라면을 끓여요.' matches live source row s0446 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0486",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I go up the mountain on the weekend.” Use the expression meaning “mountain”.",
      "canonicalAnswer": "주말에 산에 올라가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-nature-u1-l6"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 18,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '주말에 산에 올라가요.' matches live source row s0486 (section 2, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0632",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I travel to Japan.” Use the expression meaning “Japan”.",
      "canonicalAnswer": "일본으로 여행을 가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-travel-u1-l2"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 19,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '일본으로 여행을 가요.' matches live source row s0632 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0635",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “We respect the culture of other nations.” Use the expression meaning “nation / state”.",
      "canonicalAnswer": "다른 국가의 문화를 존중해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-travel-u1-l3"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 20,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '다른 국가의 문화를 존중해요.' matches live source row s0635 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0734",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I lie on the grass and watch the sky.” Use the expression meaning “green grass”.",
      "canonicalAnswer": "풀밭에 누워서 하늘을 봐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-nature-u1-l3"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 21,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '풀밭에 누워서 하늘을 봐요.' matches live source row s0734 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0747",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “We conduct science research in the lab.” Use the expression meaning “research”.",
      "canonicalAnswer": "연구소에서 과학 연구를 진행해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-study-u1-l2"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 22,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '연구소에서 과학 연구를 진행해요.' matches live source row s0747 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0752",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “The movie start time is 7 o'clock.” Use the expression meaning “start / beginning”.",
      "canonicalAnswer": "영화 시작 시각은 일곱 시예요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-actions-u1-l5"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "copula-ieyo",
        "counter-phrase",
        "topic-neun"
      ],
      "shortlistRank": 23,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '영화 시작 시각은 일곱 시예요.' matches live source row s0752 (section 2, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0768",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “We learn the importance of keeping appointment times.” Use the expression meaning “importance / gravity”.",
      "canonicalAnswer": "약속 시간 준수의 중요성을 배워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-feelings-u1-l4"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 24,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '약속 시간 준수의 중요성을 배워요.' matches live source row s0768 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0792",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The book's content is very useful.” Use the expression meaning “content / substance”.",
      "canonicalAnswer": "책의 내용이 아주 유익해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-nature-u1-l4"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "possessive-ui",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 25,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '책의 내용이 아주 유익해요.' matches live source row s0792 (section 2, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0798",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I look up travel information on the internet.” Use the expression meaning “information”.",
      "canonicalAnswer": "여행 정보를 인터넷으로 찾아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-travel-u1-l2",
        "sn2-travel-u1-l4"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 26,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '여행 정보를 인터넷으로 찾아요.' matches live source row s0798 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0871",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “Now I must start studying anew.” Use the expression meaning “now / from now on”.",
      "canonicalAnswer": "이제 공부를 새로 시작해야 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-daily-u1-l5"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "must-ya-dwaeda",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 27,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '이제 공부를 새로 시작해야 해요.' matches live source row s0871 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0883",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “I was really happy with the gift I received today.” Use the expression meaning “really / truly”.",
      "canonicalAnswer": "오늘 받은 선물은 정말 기뻤어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-feelings-u1-l5"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "past-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 28,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘 받은 선물은 정말 기뻤어요.' matches live source row s0883 (section 2, topic-statement). Prompt forces topic, tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0906",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “A bag is placed on the chair.” Use the expression meaning “above / top / on”.",
      "canonicalAnswer": "의자 위에 가방이 놓여 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-travel-u1-l14"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 29,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '의자 위에 가방이 놓여 있어요.' matches live source row s0906 (section 2, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0990",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “I am proud of the player who set a new world record.” Use the expression meaning “record / document”.",
      "canonicalAnswer": "세계 신기록을 세운 선수가 자랑스러워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-study-u1-l4"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 30,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '세계 신기록을 세운 선수가 자랑스러워요.' matches live source row s0990 (section 2, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0045",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I'm going home.” Use the expression meaning “home”.",
      "canonicalAnswer": "집에 가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn2-grammar-u1-l2"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "present-polite"
      ],
      "shortlistRank": 31,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '집에 가요.' matches live source row s0045 (section 2, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0485",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “What is the temperature today?” Use the expression meaning “temperature”.",
      "canonicalAnswer": "오늘 온도가 몇 도예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-daily-u2-l3",
        "sn3-nature-u2-l4"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 1,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘 온도가 몇 도예요?' matches live source row s0485 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2080",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Describing a regular schedule to a classmate in ordinary polite Korean, say that you practise from morning until evening. Use 아침부터 and 저녁까지.",
      "canonicalAnswer": "아침부터 저녁까지 연습해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-daily-u2-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "from-buteo",
        "present-polite",
        "time-expression",
        "until-kkaji"
      ],
      "shortlistRank": 2,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아침부터 저녁까지 연습해요.' matches live source row s2080 (section 3, time-anchored-statement). Prompt forces communicative act; prompt already exact and natural; accepted without change. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0391",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Open your mouth wide.” Use the expression meaning “mouth”.",
      "canonicalAnswer": "입을 크게 벌리세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-health-u1-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul"
      ],
      "shortlistRank": 3,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '입을 크게 벌리세요.' matches live source row s0391 (section 3, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2647",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Animals nearby” situation, using everyday polite speech, say one complete statement that means exactly: “They say the weather warms up from next week.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "다음 주부터 날씨가 풀린대요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-nature-u2-l15"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "from-buteo",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 27,
      "shortlistScore": 97,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '다음 주부터 날씨가 풀린대요.' matches live source row s2647 (section 3, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3963",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Meeting the team” situation, using everyday polite speech, say one complete statement that means exactly: “I answer the interviewer's questions slowly.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the destination, time, or static location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "면접관의 질문에 천천히 대답해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-work-u2-l4"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-e",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 28,
      "shortlistScore": 97,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '면접관의 질문에 천천히 대답해요.' matches live source row s3963 (section 3, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0043",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “It's there.” Use the expression meaning “there”.",
      "canonicalAnswer": "거기에 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-travel-u2-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite"
      ],
      "shortlistRank": 4,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '거기에 있어요.' matches live source row s0043 (section 3, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0103",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “It takes an hour.” Use the expression meaning “hour”.",
      "canonicalAnswer": "한 시간이 걸려요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-daily-u2-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "counter-phrase",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 5,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '한 시간이 걸려요.' matches live source row s0103 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0235",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “I don't feel well.” Use the expression meaning “body”.",
      "canonicalAnswer": "몸이 안 좋아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-health-u1-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "neg-an",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 6,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '몸이 안 좋아요.' matches live source row s0235 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0280",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “I'm not going.” Use the expression meaning “not”.",
      "canonicalAnswer": "저는 안 가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-grammar-u2-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "neg-an",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 7,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '저는 안 가요.' matches live source row s0280 (section 3, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0284",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I met a friend yesterday.” Use the expression meaning “past (polite)”.",
      "canonicalAnswer": "어제 친구를 만났어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-grammar-u2-l3"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "shortlistRank": 8,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '어제 친구를 만났어요.' matches live source row s0284 (section 3, time-anchored-statement). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0415",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “A cat is sleeping on the bed.” Use the expression meaning “cat”.",
      "canonicalAnswer": "고양이가 침대에서 자요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-nature-u2-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-eseo",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 9,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '고양이가 침대에서 자요.' matches live source row s0415 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0490",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The baby is turning one today.” Use the expression meaning “first birthday”.",
      "canonicalAnswer": "아기가 오늘 돌이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-daily-u2-l3"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "copula-ieyo",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 10,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아기가 오늘 돌이에요.' matches live source row s0490 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0526",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I draw a picture on white drawing paper.” Use the expression meaning “drawing / painting”.",
      "canonicalAnswer": "하얀 도화지에 그림을 그려요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 11,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '하얀 도화지에 그림을 그려요.' matches live source row s0526 (section 3, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0530",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “We play soccer on the playground.” Use the expression meaning “soccer”.",
      "canonicalAnswer": "운동장에서 축구를 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l1",
        "sn3-hobbies-u1-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 12,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '운동장에서 축구를 해요.' matches live source row s0530 (section 3, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0538",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “There are various occupations.” Use the expression meaning “occupation / job”.",
      "canonicalAnswer": "여러 가지 직업이 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-work-u2-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 13,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '여러 가지 직업이 있어요.' matches live source row s0538 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0546",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “That singer sings very well.” Use the expression meaning “singer”.",
      "canonicalAnswer": "그 가수는 노래를 아주 잘해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-work-u1-l3"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 14,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '그 가수는 노래를 아주 잘해요.' matches live source row s0546 (section 3, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0550",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The journalist reports the news.” Use the expression meaning “reporter / journalist”.",
      "canonicalAnswer": "기자가 뉴스를 보도해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-work-u1-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 15,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '기자가 뉴스를 보도해요.' matches live source row s0550 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0628",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I graduate next spring.” Use the expression meaning “graduation”.",
      "canonicalAnswer": "내년 봄에 졸업을 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-study-u2-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 16,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '내년 봄에 졸업을 해요.' matches live source row s0628 (section 3, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0682",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I exercise every day for health.” Use the expression meaning “exercise / sports”.",
      "canonicalAnswer": "건강을 위해 매일 운동해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-health-u1-l7",
        "sn3-hobbies-u1-l3"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 17,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '건강을 위해 매일 운동해요.' matches live source row s0682 (section 3, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0799",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I check the news every morning.” Use the expression meaning “news”.",
      "canonicalAnswer": "매일 아침 뉴스를 확인해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-travel-u2-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 18,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '매일 아침 뉴스를 확인해요.' matches live source row s0799 (section 3, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0821",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I practice English conversation every day.” Use the expression meaning “dialogue / conversation”.",
      "canonicalAnswer": "영어 대화 연습을 매일 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-study-u2-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 19,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '영어 대화 연습을 매일 해요.' matches live source row s0821 (section 3, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0901",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate about a definite later plan, say this complete lesson sentence: “I will remember this moment for a lifetime.” Use the expression meaning “lifetime / whole life”.",
      "canonicalAnswer": "평생 동안 이 순간을 기억할게요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-nature-u2-l10"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 20,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '평생 동안 이 순간을 기억할게요.' matches live source row s0901 (section 3, time-anchored-statement). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0931",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, in a formal situation, addressing an adult audience, say this complete lesson sentence: “An international conference is held at Seoul City Hall.” Use the expression meaning “international relation”.",
      "canonicalAnswer": "국제 회의가 서울 시청에서 열립니다.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-travel-u2-l3",
        "sn3-work-u1-l4"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "formal-nida",
        "location-eseo",
        "subject-i-ga"
      ],
      "shortlistRank": 21,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '국제 회의가 서울 시청에서 열립니다.' matches live source row s0931 (section 3, focus-answer). Prompt forces focus, register, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0262",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The sky is pretty.” Use the expression meaning “sky”.",
      "canonicalAnswer": "하늘이 예뻐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-nature-u2-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 22,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '하늘이 예뻐요.' matches live source row s0262 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0394",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “My heart is fluttering.” Use the expression meaning “heart”.",
      "canonicalAnswer": "가슴이 두근거려요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-health-u1-l3"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 23,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '가슴이 두근거려요.' matches live source row s0394 (section 3, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2131",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Connecting clauses” situation, using everyday polite speech, say one complete statement that means exactly: “I can't sleep well these days.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "요즘 잠을 잘 못 자요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-grammar-u2-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "neg-mot",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 32,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '요즘 잠을 잘 못 자요.' matches live source row s2131 (section 3, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2224",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Morning action verbs” situation, using everyday polite speech, say one complete statement that means exactly: “I have to submit the application by tomorrow.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "내일까지 신청서를 내야 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-study-u1-l5",
        "sn3-actions-u2-l1"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "must-ya-dwaeda",
        "object-eul-reul",
        "time-expression",
        "until-kkaji"
      ],
      "shortlistRank": 33,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '내일까지 신청서를 내야 해요.' matches live source row s2224 (section 3, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2488",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Getting around town” situation, using everyday polite speech, say one complete statement that means exactly: “I go from the airport to downtown by bus.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the action location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "공항에서 시내까지 버스로 가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-travel-u2-l4"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "direction-euro",
        "location-eseo",
        "present-polite",
        "until-kkaji"
      ],
      "shortlistRank": 34,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '공항에서 시내까지 버스로 가요.' matches live source row s2488 (section 3, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3117",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Time on the calendar” situation, using everyday polite speech, say one complete statement that means exactly: “I don't regret that decision.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "그때 그 결정을 후회하지 않아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-actions-u1-l2",
        "sn3-daily-u2-l6"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "neg-ji-anta",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 35,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '그때 그 결정을 후회하지 않아요.' matches live source row s3117 (section 3, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2200",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Free-time plans” situation, using everyday polite speech, say one complete statement that means exactly: “From today I'll exercise every morning.” Keep the intended time meaning and information focus: keep the future plan or prediction; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "오늘부터 매일 아침에 운동할 거예요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l11"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "from-buteo",
        "future-geoyeyo",
        "time-expression"
      ],
      "shortlistRank": 36,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘부터 매일 아침에 운동할 거예요.' matches live source row s2200 (section 3, time-anchored-statement). Prompt forces tense/time, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2223",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Body and movement” situation, using everyday polite speech, say one complete statement that means exactly: “You have to take the medicine after meals.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "약을 식사 후에 먹어야 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-health-u1-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "must-ya-dwaeda",
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 37,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '약을 식사 후에 먹어야 해요.' matches live source row s2223 (section 3, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2401",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Body and movement” situation, using everyday polite speech, say one complete statement that means exactly: “Even though I took medicine, I'm not getting better.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "약을 먹었는데도 낫지 않아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-health-u1-l6"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "neg-ji-anta",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 38,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '약을 먹었는데도 낫지 않아요.' matches live source row s2401 (section 3, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2416",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Body and movement” situation, using everyday polite speech, say one complete statement that means exactly: “I exercise every day for my health.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "건강을 위해서 매일 운동해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-health-u1-l7",
        "sn3-hobbies-u1-l3"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 39,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '건강을 위해서 매일 운동해요.' matches live source row s2416 (section 3, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2466",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Time on the calendar” situation, using everyday polite speech, ask a polite question that means exactly: “Can we talk briefly this afternoon?” Keep the intended time meaning and information focus: keep the stated time anchor; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "오늘 오후에 잠깐 통화할 수 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-daily-u2-l4"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "can-su-itda",
        "question-polite",
        "time-expression"
      ],
      "shortlistRank": 40,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘 오후에 잠깐 통화할 수 있어요?' matches live source row s2466 (section 3, time-anchored-statement). Prompt forces communicative act; tightened the lexical-anchor instruction. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2483",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Getting around town” situation, using everyday polite speech, say one complete statement that means exactly: “You have to arrive at the airport three hours early.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the destination, time, or static location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "공항에 세 시간 전에 도착해야 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-travel-u2-l6"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-e",
        "must-ya-dwaeda",
        "time-expression"
      ],
      "shortlistRank": 41,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '공항에 세 시간 전에 도착해야 해요.' matches live source row s2483 (section 3, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2689",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Free-time plans” situation, using everyday polite speech, say one complete statement that means exactly: “I like exercise more than games.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "게임보다 운동을 더 좋아해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l12"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "comparison-boda",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 42,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '게임보다 운동을 더 좋아해요.' matches live source row s2689 (section 3, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0060",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Please don't let go.” Use the expression meaning “to let go”.",
      "canonicalAnswer": "손을 놓지 마세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-actions-u3-l2"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "neg-ji-anta",
        "object-eul-reul"
      ],
      "shortlistRank": 1,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '손을 놓지 마세요.' matches live source row s0060 (section 4, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0113",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “Do you have time?” Use the expression meaning “to have”.",
      "canonicalAnswer": "시간이 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-actions-u3-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 2,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '시간이 있어요?' matches live source row s0113 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0217",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “Do you have cash?” Use the expression meaning “cash”.",
      "canonicalAnswer": "현금이 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u2-l1",
        "sn4-shopping-u2-l5"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 3,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '현금이 있어요?' matches live source row s0217 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0808",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Please close the bag's zipper tightly.” Use the expression meaning “zipper”.",
      "canonicalAnswer": "가방의 지퍼를 굳게 닫으세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u3-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul",
        "possessive-ui"
      ],
      "shortlistRank": 4,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '가방의 지퍼를 굳게 닫으세요.' matches live source row s0808 (section 4, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0100",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, ask this complete lesson question: “What did you do yesterday?” Use the expression meaning “yesterday”.",
      "canonicalAnswer": "어제 뭐 했어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-daily-u3-l5"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "past-polite",
        "question-polite",
        "time-expression"
      ],
      "shortlistRank": 5,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '어제 뭐 했어요?' matches live source row s0100 (section 4, time-anchored-statement). Prompt forces tense/time, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0434",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Eat vegetables evenly.” Use the expression meaning “vegetable”.",
      "canonicalAnswer": "야채를 골고루 먹으세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-food-u2-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul"
      ],
      "shortlistRank": 6,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '야채를 골고루 먹으세요.' matches live source row s0434 (section 4, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0219",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Receipt, please.” Use the expression meaning “receipt”.",
      "canonicalAnswer": "영수증 주세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u3-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 7,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '영수증 주세요.' matches live source row s0219 (section 4, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0666",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “Answer the question quickly.” Use the expression meaning “answer / reply”.",
      "canonicalAnswer": "질문에 빠르게 대답해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn3-work-u2-l4",
        "sn4-study-u3-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "present-polite"
      ],
      "shortlistRank": 8,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '질문에 빠르게 대답해요.' matches live source row s0666 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2011",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Telling a classmate how you travel, say in ordinary polite Korean that you take the bus. Use the word 타다.",
      "canonicalAnswer": "버스를 타요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-travel-u3-l2"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 9,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '버스를 타요.' matches live source row s2011 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3425",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Jobs and duties” situation, using everyday polite speech, say one complete statement that means exactly: “I ask the veterinarian about the cat's condition.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "수의사에게 고양이의 상태를 물어봐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-work-u3-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 31,
      "shortlistScore": 98,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '수의사에게 고양이의 상태를 물어봐요.' matches live source row s3425 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2097",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the stated topic, contrasting today with other days, tell a classmate in ordinary polite Korean that you cannot practise today. Use 못 for the inability.",
      "canonicalAnswer": "오늘은 연습을 못 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-actions-u3-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "neg-mot",
        "object-eul-reul",
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 10,
      "shortlistScore": 121,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "topic-or-focus-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘은 연습을 못 해요.' matches live source row s2097 (section 4, topic-statement). Prompt forces topic, communicative act; streamlined the prompt while preserving all required cues. no manual alternatives (single strict canonical); fixed a mid-sentence capitalization defect (Contrasting->contrasting); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2098",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the stated topic, contrasting mornings with later times, tell a classmate in ordinary polite Korean that you cannot drink coffee in the morning. Use 못 for the inability.",
      "canonicalAnswer": "아침에는 커피를 못 마셔요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-daily-u1-l4",
        "sn4-food-u2-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "neg-mot",
        "object-eul-reul",
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 11,
      "shortlistScore": 121,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "topic-or-focus-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아침에는 커피를 못 마셔요.' matches live source row s2098 (section 4, topic-statement). Prompt forces topic, communicative act; streamlined the prompt while preserving all required cues. no manual alternatives (single strict canonical); fixed a mid-sentence capitalization defect (Contrasting->contrasting); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0210",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “There is water in the bottle.” Use the expression meaning “bottle”.",
      "canonicalAnswer": "병에 물이 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-travel-u3-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 12,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '병에 물이 있어요.' matches live source row s0210 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0407",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “I wear a warm coat in winter.” Use the expression meaning “coat”.",
      "canonicalAnswer": "겨울에는 따뜻한 코트를 입어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u2-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 13,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '겨울에는 따뜻한 코트를 입어요.' matches live source row s0407 (section 4, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0923",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “We must respond to the diversification of consumer demands.” Use the expression meaning “diversification”.",
      "canonicalAnswer": "소비자 요구의 다양화에 부응해야 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u3-l6"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "must-ya-dwaeda",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 14,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '소비자 요구의 다양화에 부응해야 해요.' matches live source row s0923 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0071",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I measure the length with a tape measure.” Use the expression meaning “to measure”.",
      "canonicalAnswer": "줄자로 길이를 재요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-actions-u3-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 15,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '줄자로 길이를 재요.' matches live source row s0071 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0256",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “His wish is to travel the world.” Use the expression meaning “wish / hope”.",
      "canonicalAnswer": "그의 바람은 세계 여행이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-feelings-u3-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "copula-ieyo",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 16,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '그의 바람은 세계 여행이에요.' matches live source row s0256 (section 4, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0264",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “I like this season.” Use the expression meaning “season”.",
      "canonicalAnswer": "이 계절을 좋아해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-nature-u3-l2"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 17,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '이 계절을 좋아해요.' matches live source row s0264 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0401",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I wear a hat on my head.” Use the expression meaning “hat / cap”.",
      "canonicalAnswer": "모자를 머리에 써요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u3-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 18,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '모자를 머리에 써요.' matches live source row s0401 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0406",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I wear dress shoes with a suit.” Use the expression meaning “dress shoes”.",
      "canonicalAnswer": "정장에 구두를 신어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u2-l2"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 19,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '정장에 구두를 신어요.' matches live source row s0406 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0411",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I wrap a scarf around my neck.” Use the expression meaning “scarf / muffler”.",
      "canonicalAnswer": "목도리를 목에 둘러요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u3-l2"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 20,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '목도리를 목에 둘러요.' matches live source row s0411 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0418",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “Fish live in the river.” Use the expression meaning “fish (in water)”.",
      "canonicalAnswer": "물고기가 강에 살아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-nature-u3-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 21,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '물고기가 강에 살아요.' matches live source row s0418 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0421",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “A chicken crows in the morning.” Use the expression meaning “chicken”.",
      "canonicalAnswer": "아침에 닭이 울어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-nature-u3-l5"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "present-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 22,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아침에 닭이 울어요.' matches live source row s0421 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0433",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “There are many side dishes on the table.” Use the expression meaning “side dishes”.",
      "canonicalAnswer": "식탁에 반찬이 아주 많아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-food-u2-l2"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 23,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '식탁에 반찬이 아주 많아요.' matches live source row s0433 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0515",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “This semester's grades are good.” Use the expression meaning “academic grades / results”.",
      "canonicalAnswer": "이번 학기 성적이 좋아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-study-u3-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "present-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 24,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '이번 학기 성적이 좋아요.' matches live source row s0515 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0542",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The pharmacist dispenses medicine.” Use the expression meaning “pharmacist”.",
      "canonicalAnswer": "약사가 약을 처방해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-work-u3-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 25,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '약사가 약을 처방해요.' matches live source row s0542 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0549",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The restaurant chef cooks food.” Use the expression meaning “chef / cook”.",
      "canonicalAnswer": "식당 요리사가 음식을 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-work-u3-l2"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 26,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '식당 요리사가 음식을 해요.' matches live source row s0549 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0639",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “Today is my birthday.” Use the expression meaning “birthday”.",
      "canonicalAnswer": "오늘이 제 생일이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-daily-u3-l1"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "copula-ieyo",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 27,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘이 제 생일이에요.' matches live source row s0639 (section 4, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0668",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I learn Korean literature at university.” Use the expression meaning “literature”.",
      "canonicalAnswer": "대학에서 한국 문학을 배워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-study-u3-l2"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 28,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '대학에서 한국 문학을 배워요.' matches live source row s0668 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0257",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “It's hot today.” Use the expression meaning “to be hot”.",
      "canonicalAnswer": "오늘 더워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-nature-u3-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 29,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘 더워요.' matches live source row s0257 (section 4, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2437",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Meals at home” situation, using everyday polite speech, ask a polite question that means exactly: “Can we push the appointment to next week?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "약속을 다음 주로 미룰 수 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-daily-u3-l10"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "can-su-itda",
        "direction-euro",
        "object-eul-reul",
        "question-polite"
      ],
      "shortlistRank": 32,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '약속을 다음 주로 미룰 수 있어요?' matches live source row s2437 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3512",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Choosing clothes” situation, using everyday polite speech, say one complete statement that means exactly: “I take both cash and a card.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "현금과 카드를 둘 다 가져가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-shopping-u2-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "also-do",
        "object-eul-reul",
        "present-polite",
        "with-hago-wa"
      ],
      "shortlistRank": 33,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '현금과 카드를 둘 다 가져가요.' matches live source row s3512 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3555",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Meals at home” situation, using everyday polite speech, say one complete statement that means exactly: “I send flowers to Mom every birthday.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "생일마다 엄마에게 꽃을 보내요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-daily-u3-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 34,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '생일마다 엄마에게 꽃을 보내요.' matches live source row s3555 (section 4, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3904",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “At the station” situation, using everyday polite speech, say one complete statement that means exactly: “I put only bottles in the recycling box.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "재활용 상자에 병만 넣어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-travel-u3-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "only-man",
        "present-polite"
      ],
      "shortlistRank": 35,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '재활용 상자에 병만 넣어요.' matches live source row s3904 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3999",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Reading together” situation, using everyday polite speech, say one complete statement that means exactly: “I listen carefully to the teacher's words in class.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "수업에서 선생님의 말을 잘 들어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-study-u3-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 36,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '수업에서 선생님의 말을 잘 들어요.' matches live source row s3999 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2319",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “At the station” situation, using everyday polite speech, say one complete statement that means exactly: “It's next to the pharmacy.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the destination, time, or static location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "약국 옆에 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn4-travel-u3-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite"
      ],
      "shortlistRank": 37,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '약국 옆에 있어요.' matches live source row s2319 (section 4, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0300",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking respectfully in a senior social context, ask this complete lesson question: “May I ask your name?” Use the expression meaning “name (honorific)”.",
      "canonicalAnswer": "성함이 어떻게 되세요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-grammar-u3-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "honorific-si",
        "present-polite",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 1,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '성함이 어떻게 되세요?' matches live source row s0300 (section 5, focus-answer). Prompt forces focus, register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0514",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking respectfully in a senior social context, make this complete lesson request: “The teacher writes on the blackboard.” Use the expression meaning “blackboard / whiteboard”.",
      "canonicalAnswer": "선생님이 칠판에 쓰세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-study-u4-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "location-e",
        "subject-i-ga"
      ],
      "shortlistRank": 2,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '선생님이 칠판에 쓰세요.' matches live source row s0514 (section 5, focus-answer). Prompt forces focus, register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0252",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “Where is the pharmacy?” Use the expression meaning “pharmacy”.",
      "canonicalAnswer": "약국이 어디예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-health-u2-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 3,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '약국이 어디예요?' matches live source row s0252 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0553",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Please come into the room.” Use the expression meaning “to come in”.",
      "canonicalAnswer": "방으로 들어오세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-actions-u4-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "direction-euro",
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 4,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '방으로 들어오세요.' matches live source row s0553 (section 5, register-forced-utterance). Prompt forces register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0565",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I ask the teacher the way.” Use the expression meaning “to ask”.",
      "canonicalAnswer": "선생님께 길을 물어봐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-actions-u4-l2"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 5,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '선생님께 길을 물어봐요.' matches live source row s0565 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2005",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Describing what you do next, tell a classmate in ordinary polite Korean that you close your eyes. Use the word 감다.",
      "canonicalAnswer": "눈을 감아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-health-u2-l2"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 6,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '눈을 감아요.' matches live source row s2005 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0275",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking casually to a close friend, ask this complete lesson question: “Where are you going?” Use the expression meaning “casual ending”.",
      "canonicalAnswer": "지금 어디 가?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-grammar-u3-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "time-expression"
      ],
      "shortlistRank": 7,
      "shortlistScore": 171,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '지금 어디 가?' matches live source row s0275 (section 5, time-anchored-statement). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0279",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, ask this complete lesson question: “Shall we go together?” Use the expression meaning “shall we? / I wonder”.",
      "canonicalAnswer": "같이 갈까요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-grammar-u3-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "question-polite"
      ],
      "shortlistRank": 8,
      "shortlistScore": 171,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '같이 갈까요?' matches live source row s0279 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0181",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “There is water in the refrigerator.” Use the expression meaning “refrigerator”.",
      "canonicalAnswer": "냉장고에 물이 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-daily-u4-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 9,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '냉장고에 물이 있어요.' matches live source row s0181 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0399",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I brush my teeth three times a day.” Use the expression meaning “tooth”.",
      "canonicalAnswer": "하루에 세 번 이빨을 닦아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-health-u2-l5",
        "sn5-health-u2-l7"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "counter-phrase",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 10,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '하루에 세 번 이빨을 닦아요.' matches live source row s0399 (section 5, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0054",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “It takes thirty minutes to get to school.” Use the expression meaning “to take time”.",
      "canonicalAnswer": "학교까지 삼십 분이 걸려요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-daily-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "present-polite",
        "subject-i-ga",
        "until-kkaji"
      ],
      "shortlistRank": 11,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '학교까지 삼십 분이 걸려요.' matches live source row s0054 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0211",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “It's nearby.” Use the expression meaning “nearby”.",
      "canonicalAnswer": "근처에 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-travel-u4-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite"
      ],
      "shortlistRank": 12,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '근처에 있어요.' matches live source row s0211 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0498",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I wake up early at dawn.” Use the expression meaning “dawn / early morning”.",
      "canonicalAnswer": "새벽에 일찍 잠에서 깨요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-daily-u4-l7"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-eseo",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 13,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '새벽에 일찍 잠에서 깨요.' matches live source row s0498 (section 5, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0516",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “Students are gathered in the classroom.” Use the expression meaning “classroom”.",
      "canonicalAnswer": "교실에 학생들이 모여 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-study-u4-l2",
        "sn5-study-u4-l5"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 14,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '교실에 학생들이 모여 있어요.' matches live source row s0516 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0559",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I make dinner today.” Use the expression meaning “to make / create”.",
      "canonicalAnswer": "오늘 저녁을 만들어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-actions-u4-l5"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 15,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘 저녁을 만들어요.' matches live source row s0559 (section 5, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0563",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The teacher teaches the student.” Use the expression meaning “to teach”.",
      "canonicalAnswer": "선생님이 학생을 가르쳐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-actions-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 16,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '선생님이 학생을 가르쳐요.' matches live source row s0563 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0575",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I go to work at the company at 8 o'clock.” Use the expression meaning “to go to work / start shift”.",
      "canonicalAnswer": "여덟 시에 회사로 출근해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-actions-u4-l6"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "direction-euro",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 17,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '여덟 시에 회사로 출근해요.' matches live source row s0575 (section 5, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0654",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “I like Japanese sushi.” Use the expression meaning “Japanese food”.",
      "canonicalAnswer": "저는 일식 초밥을 좋아해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-food-u3-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 18,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '저는 일식 초밥을 좋아해요.' matches live source row s0654 (section 5, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0723",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “Rain falls from the sky.” Use the expression meaning “to fall / descend (rain/snow)”.",
      "canonicalAnswer": "하늘에서 비가 내려요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-nature-u4-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-eseo",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 19,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '하늘에서 비가 내려요.' matches live source row s0723 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0731",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I stick the box with tape.” Use the expression meaning “sticky tape”.",
      "canonicalAnswer": "테이프로 상자를 붙여요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-daily-u4-l2"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 20,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '테이프로 상자를 붙여요.' matches live source row s0731 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s1674",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the stated topic, continuing a conversation about him, tell a classmate in ordinary polite Korean that he works as an engineer in the construction field of a large company. Use 엔지니어로 일하다.",
      "canonicalAnswer": "그는 대기업 건설업 분야의 엔지니어로 일해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-work-u4-l2"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "possessive-ui",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 21,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "topic-or-focus-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '그는 대기업 건설업 분야의 엔지니어로 일해요.' matches live source row s1674 (section 5, topic-statement). Prompt forces topic, communicative act; streamlined the prompt while preserving all required cues. no manual alternatives (single strict canonical); fixed a mid-sentence capitalization defect; canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0240",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “I have a stomachache.” Use the expression meaning “stomach”.",
      "canonicalAnswer": "배가 아파요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-health-u2-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 22,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '배가 아파요.' matches live source row s0240 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0570",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I willingly help my friend.” Use the expression meaning “to help (out)”.",
      "canonicalAnswer": "친구를 기꺼이 도와줘요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-actions-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 23,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '친구를 기꺼이 도와줘요.' matches live source row s0570 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0711",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The park in front of city hall is very wide.” Use the expression meaning “city hall”.",
      "canonicalAnswer": "시청 앞 공원이 아주 넓어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-travel-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 24,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '시청 앞 공원이 아주 넓어요.' matches live source row s0711 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0737",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “Winter vacation finally starts.” Use the expression meaning “school vacation break”.",
      "canonicalAnswer": "겨울 방학이 드디어 시작해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-daily-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 25,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '겨울 방학이 드디어 시작해요.' matches live source row s0737 (section 5, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2499",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “City landmarks” situation, using everyday polite speech, ask a polite question that means exactly: “Can I leave my luggage here?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "짐을 여기에 맡길 수 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-travel-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "can-su-itda",
        "location-e",
        "object-eul-reul",
        "question-polite"
      ],
      "shortlistRank": 33,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '짐을 여기에 맡길 수 있어요?' matches live source row s2499 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2568",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “City landmarks” situation, using everyday polite speech, ask a polite question that means exactly: “Can I pay utility bills here?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the action location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "여기에서 공과금을 낼 수 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-travel-u4-l6"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "can-su-itda",
        "location-eseo",
        "question-polite"
      ],
      "shortlistRank": 34,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '여기에서 공과금을 낼 수 있어요?' matches live source row s2568 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3526",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “City landmarks” situation, using everyday polite speech, say one complete statement that means exactly: “I can check the balance with a bank app.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "은행 앱으로 잔액을 확인할 수 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-travel-u4-l5",
        "sn5-travel-u4-l6"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "can-su-itda",
        "direction-euro",
        "object-eul-reul"
      ],
      "shortlistRank": 35,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '은행 앱으로 잔액을 확인할 수 있어요.' matches live source row s3526 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3542",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “After-work plans” situation, using everyday polite speech, say one complete statement that means exactly: “I clean the house before the holiday.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "명절 전에 집을 깨끗하게 청소해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-daily-u4-l5"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 36,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '명절 전에 집을 깨끗하게 청소해요.' matches live source row s3542 (section 5, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3655",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “At the clinic” situation, using everyday polite speech, say one complete statement that means exactly: “I cut my bangs above my eyebrows.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "앞머리를 눈썹 위로 잘라요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-health-u2-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 37,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '앞머리를 눈썹 위로 잘라요.' matches live source row s3655 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3671",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “At the clinic” situation, using everyday polite speech, say one complete statement that means exactly: “I can dry my hair nicely at home too.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the action location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "집에서도 머리를 예쁘게 말릴 수 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-health-u2-l8",
        "sn5-health-u2-l9"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "also-do",
        "can-su-itda",
        "location-eseo"
      ],
      "shortlistRank": 38,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '집에서도 머리를 예쁘게 말릴 수 있어요.' matches live source row s3671 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3954",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A busy workday” situation, using everyday polite speech, say one complete statement that means exactly: “I check job postings on a job-hunting site.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "구직 사이트에서 공고를 확인해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-work-u4-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 39,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '구직 사이트에서 공고를 확인해요.' matches live source row s3954 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s4032",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “At the clinic” situation, using everyday polite speech, say one complete statement that means exactly: “I brush my teeth carefully twice a day.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "하루에 두 번 이빨을 꼼꼼히 닦아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-health-u2-l5",
        "sn5-health-u2-l7"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "counter-phrase",
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 40,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '하루에 두 번 이빨을 꼼꼼히 닦아요.' matches live source row s4032 (section 5, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s4151",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “After-work plans” situation, using everyday polite speech, say one complete statement that means exactly: “Each room has one window.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the destination, time, or static location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "각 방에 창문이 하나씩 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-daily-u4-l6"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "counter-phrase",
        "existence-itda",
        "location-e"
      ],
      "shortlistRank": 41,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '각 방에 창문이 하나씩 있어요.' matches live source row s4151 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2753",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “A busy afternoon” situation, using everyday polite speech, say one complete statement that means exactly: “I run for thirty minutes each day.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "매일 삼십 분씩 뛰어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-actions-u4-l7",
        "sn5-daily-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 42,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '매일 삼십 분씩 뛰어요.' matches live source row s2753 (section 5, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s4017",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “School supplies” situation, using everyday polite speech, say one complete statement that means exactly: “I review so that I do not forget what I learned.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "배운 내용을 잊지 않으려고 복습해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn5-study-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "neg-ji-anta",
        "present-polite"
      ],
      "shortlistRank": 43,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '배운 내용을 잊지 않으려고 복습해요.' matches live source row s4017 (section 5, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0153",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “Do you have an umbrella?” Use the expression meaning “umbrella”.",
      "canonicalAnswer": "우산이 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-tech-u2-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 1,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '우산이 있어요?' matches live source row s0153 (section 6, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0048",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “Where is the bathroom?” Use the expression meaning “bathroom”.",
      "canonicalAnswer": "화장실이 어디예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-travel-u5-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 2,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '화장실이 어디예요?' matches live source row s0048 (section 6, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2010",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Telling a classmate what you eat, say in ordinary polite Korean that you eat an apple. Use the word 먹다.",
      "canonicalAnswer": "사과를 먹어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-feelings-u5-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 3,
      "shortlistScore": 172,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '사과를 먹어요.' matches live source row s2010 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0079",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “A sticker is stuck on the wall.” Use the expression meaning “to stick”.",
      "canonicalAnswer": "벽에 스티커가 붙어 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-daily-u5-l5"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 4,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '벽에 스티커가 붙어 있어요.' matches live source row s0079 (section 6, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0474",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking respectfully in a senior social context, say this complete lesson sentence: “Dad is driving.” Use the expression meaning “driving”.",
      "canonicalAnswer": "아빠가 운전을 하세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-travel-u5-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "honorific-si",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 5,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아빠가 운전을 하세요.' matches live source row s0474 (section 6, focus-answer). Prompt forces focus, register, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0568",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I spend the weekend with my family.” Use the expression meaning “to spend time”.",
      "canonicalAnswer": "주말을 가족과 보내요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-actions-u5-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression",
        "with-hago-wa"
      ],
      "shortlistRank": 6,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '주말을 가족과 보내요.' matches live source row s0568 (section 6, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0161",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “I have a pen.” Use the expression meaning “pen”.",
      "canonicalAnswer": "펜이 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-tech-u2-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 7,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '펜이 있어요.' matches live source row s0161 (section 6, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0456",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I put laundry in the washing machine.” Use the expression meaning “washing machine”.",
      "canonicalAnswer": "세탁기에 빨래를 넣어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-daily-u5-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 8,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '세탁기에 빨래를 넣어요.' matches live source row s0456 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0462",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I wipe my hands with a tissue.” Use the expression meaning “toilet paper / tissue”.",
      "canonicalAnswer": "휴지로 손을 닦아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-daily-u5-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 9,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '휴지로 손을 닦아요.' matches live source row s0462 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0519",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I erase incorrect letters with an eraser.” Use the expression meaning “eraser”.",
      "canonicalAnswer": "틀린 글씨를 지우개로 지워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-study-u5-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 10,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '틀린 글씨를 지우개로 지워요.' matches live source row s0519 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0522",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I learn cooking in the kitchen.” Use the expression meaning “cooking / cuisine”.",
      "canonicalAnswer": "부엌에서 요리를 배워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 11,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '부엌에서 요리를 배워요.' matches live source row s0522 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0581",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I take a train at the subway station.” Use the expression meaning “to ride / take (transport)”.",
      "canonicalAnswer": "지하철 역에서 열차를 타요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-actions-u5-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 12,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '지하철 역에서 열차를 타요.' matches live source row s0581 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0583",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “The class starts at nine o'clock.” Use the expression meaning “to start”.",
      "canonicalAnswer": "수업은 아홉 시에 시작해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-actions-u5-l5"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 13,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '수업은 아홉 시에 시작해요.' matches live source row s0583 (section 6, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0638",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “Thailand's weather is hot all year round.” Use the expression meaning “Thailand”.",
      "canonicalAnswer": "태국 날씨는 일년 내내 더워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-travel-u5-l7"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 14,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '태국 날씨는 일년 내내 더워요.' matches live source row s0638 (section 6, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0718",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I use the computer every day.” Use the expression meaning “to use”.",
      "canonicalAnswer": "컴퓨터를 매일 써요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-actions-u5-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 15,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '컴퓨터를 매일 써요.' matches live source row s0718 (section 6, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0827",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I am currently on the phone with a friend.” Use the expression meaning “phone call”.",
      "canonicalAnswer": "지금 친구와 통화 중이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-tech-u2-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "copula-ieyo",
        "time-expression",
        "with-hago-wa"
      ],
      "shortlistRank": 16,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '지금 친구와 통화 중이에요.' matches live source row s0827 (section 6, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0843",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I shop for clothes at the downtown department store.” Use the expression meaning “downtown / city center”.",
      "canonicalAnswer": "시내 백화점에서 옷을 쇼핑해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-travel-u5-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 17,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '시내 백화점에서 옷을 쇼핑해요.' matches live source row s0843 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0885",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “Dance joyfully to the music.” Use the expression meaning “dance”.",
      "canonicalAnswer": "음악에 맞춰 신나게 춤을 춰요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 18,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '음악에 맞춰 신나게 춤을 춰요.' matches live source row s0885 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0889",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I watch Korean dramas on YouTube.” Use the expression meaning “YouTube”.",
      "canonicalAnswer": "유튜브로 한국 드라마를 봐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 19,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '유튜브로 한국 드라마를 봐요.' matches live source row s0889 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0947",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “Leave for America for language study training.” Use the expression meaning “language study / linguistics”.",
      "canonicalAnswer": "어학 연수를 위해 미국으로 떠나요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-study-u5-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 20,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '어학 연수를 위해 미국으로 떠나요.' matches live source row s0947 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0950",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I sincerely wish for your success.” Use the expression meaning “to hope / wish / desire”.",
      "canonicalAnswer": "당신의 성공을 진심으로 바라요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-actions-u5-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 21,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '당신의 성공을 진심으로 바라요.' matches live source row s0950 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0075",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I kick the ball hard.” Use the expression meaning “to kick”.",
      "canonicalAnswer": "공을 세게 차요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-hobbies-u4-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 22,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '공을 세게 차요.' matches live source row s0075 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0171",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I clean the room.” Use the expression meaning “to clean”.",
      "canonicalAnswer": "방을 청소해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-daily-u5-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 23,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '방을 청소해요.' matches live source row s0171 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2393",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Feeling better” situation, using everyday polite speech, say one complete statement that means exactly: “I've had a cough since yesterday.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "어제부터 기침을 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-health-u3-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "from-buteo",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 28,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '어제부터 기침을 해요.' matches live source row s2393 (section 6, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3030",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Helping hands” situation, using everyday polite speech, ask a polite question that means exactly: “Could I borrow a little money?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "돈을 조금만 빌릴 수 있을까요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-actions-u5-l8"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "can-su-itda",
        "object-eul-reul",
        "only-man",
        "question-polite"
      ],
      "shortlistRank": 29,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '돈을 조금만 빌릴 수 있을까요?' matches live source row s3030 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3747",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A quiet evening” situation, using everyday polite speech, say one complete statement that means exactly: “I divide the flowers and plant them in two pots.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "꽃을 화분 두 개에 나눠 심어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-daily-u5-l14",
        "sn6-travel-u5-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "counter-phrase",
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 30,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '꽃을 화분 두 개에 나눠 심어요.' matches live source row s3747 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2112",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Helping hands” situation, using everyday polite speech, say one complete statement that means exactly: “Tomorrow I will sing on stage.” Keep the intended time meaning and information focus: keep the future plan or prediction; keep the action location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "내일 무대에서 노래할 거예요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-actions-u5-l6"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "future-geoyeyo",
        "location-eseo",
        "time-expression"
      ],
      "shortlistRank": 31,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '내일 무대에서 노래할 거예요.' matches live source row s2112 (section 6, time-anchored-statement). Prompt forces tense/time, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2691",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Sports with friends” situation, using everyday polite speech, say one complete statement that means exactly: “I sometimes play basketball with friends.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "가끔 친구들하고 농구를 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l5"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 32,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '가끔 친구들하고 농구를 해요.' matches live source row s2691 (section 6, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3707",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A weekend hobby” situation, using everyday polite speech, say one complete statement that means exactly: “I check the game result on the internet.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "경기 결과를 인터넷에서 확인해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-hobbies-u4-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 33,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '경기 결과를 인터넷에서 확인해요.' matches live source row s3707 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3724",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A day trip” situation, using everyday polite speech, say one complete statement that means exactly: “I plant flowers in the garden.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "정원에 꽃을 심어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-daily-u5-l14",
        "sn6-travel-u5-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 34,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '정원에 꽃을 심어요.' matches live source row s3724 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3725",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A quiet evening” situation, using everyday polite speech, say one complete statement that means exactly: “I water the flowerpot.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "화분에 물을 줘요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-daily-u5-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 35,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '화분에 물을 줘요.' matches live source row s3725 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3739",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A day trip” situation, using everyday polite speech, say one complete statement that means exactly: “I work in the garden with my family.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the action location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "정원에서 가족과 함께 일해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-travel-u5-l5"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "present-polite",
        "with-hago-wa"
      ],
      "shortlistRank": 36,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '정원에서 가족과 함께 일해요.' matches live source row s3739 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3782",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Sports with friends” situation, using everyday polite speech, say one complete statement that means exactly: “I loosen my fingers in front of the piano.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "피아노 앞에서 손가락을 풀어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 37,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '피아노 앞에서 손가락을 풀어요.' matches live source row s3782 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3848",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A day trip” situation, using everyday polite speech, say one complete statement that means exactly: “I organize books at the neighborhood library.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "동네 도서관에서 책을 정리해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-travel-u5-l6"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 38,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '동네 도서관에서 책을 정리해요.' matches live source row s3848 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s4071",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A quiet evening” situation, using everyday polite speech, say one complete statement that means exactly: “Rest is also part of taking care of your health.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "휴식도 건강 관리의 일부예요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-daily-u5-l11"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "also-do",
        "copula-ieyo",
        "possessive-ui"
      ],
      "shortlistRank": 39,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '휴식도 건강 관리의 일부예요.' matches live source row s4071 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2484",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A day trip” situation, using everyday polite speech, say one complete statement that means exactly: “I think I'm going to miss my flight.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "비행기를 놓칠 것 같아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn6-travel-u5-l11"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 40,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '비행기를 놓칠 것 같아요.' matches live source row s2484 (section 6, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0165",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “Do you have a charger?” Use the expression meaning “charger”.",
      "canonicalAnswer": "충전기가 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-tech-u3-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 1,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '충전기가 있어요?' matches live source row s0165 (section 7, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0732",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking respectfully in a senior social context, make this complete lesson request: “Please throw trash in the trash can.” Use the expression meaning “trash can”.",
      "canonicalAnswer": "쓰레기는 쓰레기통에 버려 주세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-daily-u6-l2",
        "sn7-daily-u6-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "location-e",
        "topic-neun"
      ],
      "shortlistRank": 2,
      "shortlistScore": 174,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '쓰레기는 쓰레기통에 버려 주세요.' matches live source row s0732 (section 7, topic-statement). Prompt forces topic, register, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0709",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, ask this complete lesson question: “Where is the location of the police station?” Use the expression meaning “police station”.",
      "canonicalAnswer": "경찰서 위치가 어디예요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-travel-u6-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "copula-ieyo",
        "question-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 3,
      "shortlistScore": 173,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '경찰서 위치가 어디예요?' matches live source row s0709 (section 7, focus-answer). Prompt forces focus, lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0509",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “I usually go to the company on weekdays.” Use the expression meaning “weekday”.",
      "canonicalAnswer": "평일에는 보통 회사에 가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-daily-u6-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 4,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '평일에는 보통 회사에 가요.' matches live source row s0509 (section 7, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0716",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “I have tickets to a piano concert.” Use the expression meaning “concert / music recital”.",
      "canonicalAnswer": "피아노 음악회에 표가 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-hobbies-u3-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 5,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '피아노 음악회에 표가 있어요.' matches live source row s0716 (section 7, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0980",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “Go from Seoul to Busan by train.” Use the expression meaning “until / up to”.",
      "canonicalAnswer": "서울에서 부산까지 기차로 가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-grammar-u4-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "direction-euro",
        "location-eseo",
        "present-polite",
        "until-kkaji"
      ],
      "shortlistRank": 6,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '서울에서 부산까지 기차로 가요.' matches live source row s0980 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0157",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The singer appears on TV.” Use the expression meaning “to appear on TV”.",
      "canonicalAnswer": "가수가 텔레비전에 나와요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-tech-u3-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 7,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '가수가 텔레비전에 나와요.' matches live source row s0157 (section 7, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0293",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “It's the rice I'll eat tomorrow.” Use the expression meaning “future modifier”.",
      "canonicalAnswer": "내일 먹을 밥이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-grammar-u4-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "copula-ieyo",
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 8,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '내일 먹을 밥이에요.' matches live source row s0293 (section 7, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0481",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I watch a movie at the theater.” Use the expression meaning “theater / cinema”.",
      "canonicalAnswer": "극장에서 영화를 봐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-travel-u6-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 9,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '극장에서 영화를 봐요.' matches live source row s0481 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0521",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I often read books as a hobby.” Use the expression meaning “reading books”.",
      "canonicalAnswer": "취미로 독서를 자주 해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-hobbies-u3-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 10,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '취미로 독서를 자주 해요.' matches live source row s0521 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0675",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I meet a friend on Tuesday.” Use the expression meaning “Tuesday”.",
      "canonicalAnswer": "화요일에 친구를 만나요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-daily-u6-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 11,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '화요일에 친구를 만나요.' matches live source row s0675 (section 7, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0970",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The train station is very far from my house.” Use the expression meaning “to be far / distant”.",
      "canonicalAnswer": "기차역이 제 집에서 아주 멀어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-feelings-u10-l1",
        "sn7-feelings-u10-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-eseo",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 12,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '기차역이 제 집에서 아주 멀어요.' matches live source row s0970 (section 7, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0973",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “This math problem is easier than I thought.” Use the expression meaning “to be easy”.",
      "canonicalAnswer": "이 수학 문제는 생각보다 쉬워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-feelings-u10-l2",
        "sn7-study-u6-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "comparison-boda",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 13,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '이 수학 문제는 생각보다 쉬워요.' matches live source row s0973 (section 7, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s1709",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the stated topic, continuing a conversation about university students these days, tell a classmate in ordinary polite Korean that their greatest concern is finding employment. Use 최대 관심사 and 취업 구직.",
      "canonicalAnswer": "요즘 대학생들의 최대 관심사는 취업 구직이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "copula-ieyo",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 14,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "topic-or-focus-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '요즘 대학생들의 최대 관심사는 취업 구직이에요.' matches live source row s1709 (section 7, topic-statement). Prompt forces topic, communicative act; streamlined the prompt while preserving all required cues. no manual alternatives (single strict canonical); fixed a mid-sentence capitalization defect; canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0068",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I solve a math problem.” Use the expression meaning “to solve”.",
      "canonicalAnswer": "수학 문제를 풀어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-feelings-u10-l2",
        "sn7-study-u6-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 15,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '수학 문제를 풀어요.' matches live source row s0068 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0302",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I walk in the park.” Use the expression meaning “to walk”.",
      "canonicalAnswer": "공원을 걸어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-grammar-u4-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 16,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '공원을 걸어요.' matches live source row s0302 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3058",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "In the “Moving through town” situation, using everyday polite speech, ask a polite question that means exactly: “Could you tell me the number?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line. Speak politely to a teacher.",
      "canonicalAnswer": "번호 좀 알려 주실 수 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-actions-u6-l3",
        "sn7-actions-u6-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "can-su-itda",
        "honorific-si",
        "object-eul-reul",
        "question-polite"
      ],
      "shortlistRank": 27,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "register-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '번호 좀 알려 주실 수 있어요?' matches live source row s3058 (section 7, register-forced-utterance). Prompt forces register, communicative act; tightened the lexical-anchor instruction. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2314",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Forms and nuance” situation, using everyday polite speech, ask a polite question that means exactly: “Can I walk there?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "저기까지 걸어서 갈 수 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-grammar-u4-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "can-su-itda",
        "question-polite",
        "until-kkaji"
      ],
      "shortlistRank": 28,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '저기까지 걸어서 갈 수 있어요?' matches live source row s2314 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2714",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Messages and calls” situation, using everyday polite speech, say one complete statement that means exactly: “Fill the pot about halfway with water.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "냄비에 물을 반쯤 채워요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-tech-u3-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 29,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '냄비에 물을 반쯤 채워요.' matches live source row s2714 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2773",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Music and games” situation, using everyday polite speech, say one complete statement that means exactly: “I'm taking part in a marathon next week.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the destination, time, or static location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "다음 주에 마라톤에 참가해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-hobbies-u3-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 30,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '다음 주에 마라톤에 참가해요.' matches live source row s2773 (section 7, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3382",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Morning routines to” situation, using everyday polite speech, say one complete statement that means exactly: “We are scheduled to hold a friend's birthday party tomorrow.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "내일 친구 생일 파티를 열 예정이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-daily-u6-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "copula-ieyo",
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 31,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '내일 친구 생일 파티를 열 예정이에요.' matches live source row s3382 (section 7, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3787",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Music and games” situation, using everyday polite speech, say one complete statement that means exactly: “I compare instruments before buying a new one.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "새 악기를 사기 전에 비교해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-hobbies-u3-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 32,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '새 악기를 사기 전에 비교해요.' matches live source row s3787 (section 7, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2337",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “A bright morning” situation, using everyday polite speech, ask a polite question that means exactly: “Is it very far from here?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the action location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "여기에서 많이 멀어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-feelings-u10-l1",
        "sn7-feelings-u10-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-eseo",
        "question-polite"
      ],
      "shortlistRank": 33,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '여기에서 많이 멀어요?' matches live source row s2337 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2441",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Morning routines to” situation, using everyday polite speech, say one complete statement that means exactly: “I think I'll be a little late for our appointment.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "약속 시간에 조금 늦을 것 같아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-daily-u6-l7"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 34,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '약속 시간에 조금 늦을 것 같아요.' matches live source row s2441 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3462",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Moving through town” situation, using everyday polite speech, say one complete statement that means exactly: “I drive slowly on the road.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the action location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "도로에서 천천히 운전해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-actions-u6-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-eseo",
        "present-polite"
      ],
      "shortlistRank": 35,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '도로에서 천천히 운전해요.' matches live source row s3462 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3767",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Music and games” situation, using everyday polite speech, say one complete statement that means exactly: “I store the musical instrument carefully.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "악기를 조심해서 보관해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-hobbies-u3-l3",
        "sn7-hobbies-u3-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 36,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '악기를 조심해서 보관해요.' matches live source row s3767 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3908",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Morning routines to” situation, using everyday polite speech, say one complete statement that means exactly: “Even though there is a lot of trash, I do not give up.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "쓰레기가 많아도 포기하지 않아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-daily-u6-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "neg-ji-anta"
      ],
      "shortlistRank": 37,
      "shortlistScore": 41,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '쓰레기가 많아도 포기하지 않아요.' matches live source row s3908 (section 7, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0309",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “Fortunately, the driver survived the accident.” Use the expression meaning “to be alive / survive”. The event happened yesterday.",
      "canonicalAnswer": "사고에서 운전자는 다행히 살았어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-grammar-u4-l3",
        "sn7-grammar-u4-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-eseo",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 17,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '사고에서 운전자는 다행히 살았어요.' matches live source row s0309 (section 7, topic-statement). Prompt forces topic, tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0312",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “An accident happened on the street.” Use the expression meaning “to occur / happen”. The event happened yesterday.",
      "canonicalAnswer": "길에서 사고가 났어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-grammar-u4-l3",
        "sn7-grammar-u4-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-eseo",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 18,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '길에서 사고가 났어요.' matches live source row s0312 (section 7, focus-answer). Prompt forces focus, tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0712",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “I went to the district office and applied for a passport.” Use the expression meaning “district office”. The event happened yesterday.",
      "canonicalAnswer": "구청에 가서 여권을 신청했어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-travel-u6-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 19,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '구청에 가서 여권을 신청했어요.' matches live source row s0712 (section 7, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0873",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “I received a leather wristwatch as a birthday gift.” Use the expression meaning “wristwatch”. The event happened yesterday.",
      "canonicalAnswer": "생일 선물로 가죽 손목시계를 받았어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-tech-u3-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 20,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '생일 선물로 가죽 손목시계를 받았어요.' matches live source row s0873 (section 7, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0910",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “I saw wild animals of the African continent.” Use the expression meaning “continent”. The event happened yesterday.",
      "canonicalAnswer": "아프리카 대륙의 야생 동물을 보았어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-travel-u6-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui"
      ],
      "shortlistRank": 21,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '아프리카 대륙의 야생 동물을 보았어요.' matches live source row s0910 (section 7, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0934",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “We passed the national border between the two countries.” Use the expression meaning “national border”. The event happened yesterday.",
      "canonicalAnswer": "두 나라 사이의 국경을 통과했어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-travel-u6-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui"
      ],
      "shortlistRank": 22,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '두 나라 사이의 국경을 통과했어요.' matches live source row s0934 (section 7, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s1050",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “People's anger exploded at the unreasonable treatment.” Use the expression meaning “anger / rage”. The event happened yesterday.",
      "canonicalAnswer": "불합리한 대우에 사람들의 분노가 폭발했어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-feelings-u6-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 23,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '불합리한 대우에 사람들의 분노가 폭발했어요.' matches live source row s1050 (section 7, focus-answer). Prompt forces focus, tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0056",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I lost the game.” Use the expression meaning “to lose”. The event happened yesterday.",
      "canonicalAnswer": "경기에서 졌어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-hobbies-u3-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-eseo",
        "past-polite"
      ],
      "shortlistRank": 24,
      "shortlistScore": 107,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '경기에서 졌어요.' matches live source row s0056 (section 7, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0957",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “I got hit by the ball.” Use the expression meaning “to get hit, to be struck”. The event happened yesterday.",
      "canonicalAnswer": "공에 맞았어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn7-actions-u6-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "past-polite"
      ],
      "shortlistRank": 25,
      "shortlistScore": 107,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '공에 맞았어요.' matches live source row s0957 (section 7, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3921",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Finding your way going” situation, using everyday polite speech, say one complete statement that means exactly: “I ask the trainer about my posture.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "트레이너에게 자세를 물어봐요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-travel-u7-l6"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 24,
      "shortlistScore": 97,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '트레이너에게 자세를 물어봐요.' matches live source row s3921 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2099",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the stated topic, contrasting today with other days, tell a classmate in ordinary polite Korean that you cannot go to the performance today. Use 못 for the inability.",
      "canonicalAnswer": "오늘은 공연에 못 가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u7-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-e",
        "neg-mot",
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 1,
      "shortlistScore": 121,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "topic-or-focus-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘은 공연에 못 가요.' matches live source row s2099 (section 8, topic-statement). Prompt forces topic, communicative act; streamlined the prompt while preserving all required cues. no manual alternatives (single strict canonical); fixed a mid-sentence capitalization defect (Contrasting->contrasting); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0371",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking respectfully in a senior social context, say this complete lesson sentence: “Grandfather is reading a newspaper.” Use the expression meaning “grandfather”.",
      "canonicalAnswer": "할아버지가 신문을 보세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-people-u2-l1",
        "sn8-people-u2-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "honorific-si",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 2,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '할아버지가 신문을 보세요.' matches live source row s0371 (section 8, focus-answer). Prompt forces focus, register, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0710",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “There is a fire station in our neighborhood.” Use the expression meaning “fire station”.",
      "canonicalAnswer": "우리 동네에 소방서가 있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-travel-u7-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "existence-itda",
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 3,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '우리 동네에 소방서가 있어요.' matches live source row s0710 (section 8, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s1011",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “Pedestrians are safe only when crossing by the crosswalk.” Use the expression meaning “crosswalk / pedestrian crossing”.",
      "canonicalAnswer": "보행자는 반드시 횡단보도로 건너야 안전해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-travel-u7-l8"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "direction-euro",
        "must-ya-dwaeda",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 4,
      "shortlistScore": 120,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '보행자는 반드시 횡단보도로 건너야 안전해요.' matches live source row s1011 (section 8, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0373",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “My uncle gave me a gift.” Use the expression meaning “uncle”.",
      "canonicalAnswer": "삼촌이 선물을 줬어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-people-u3-l1"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 5,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '삼촌이 선물을 줬어요.' matches live source row s0373 (section 8, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0472",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “A motorcycle passes on the street.” Use the expression meaning “motorcycle”.",
      "canonicalAnswer": "길에 오토바이가 지나가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-travel-u7-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 6,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '길에 오토바이가 지나가요.' matches live source row s0472 (section 8, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0596",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “I am usually free on weekends.” Use the expression meaning “to be free / unbusy”.",
      "canonicalAnswer": "주말에는 보통 한가해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u9-l6"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 7,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '주말에는 보통 한가해요.' matches live source row s0596 (section 8, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0608",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “Our family is happy every day.” Use the expression meaning “to be happy (long term)”.",
      "canonicalAnswer": "우리 가족은 매일 행복해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u7-l1",
        "sn8-feelings-u9-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 8,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '우리 가족은 매일 행복해요.' matches live source row s0608 (section 8, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0609",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking respectfully in a senior social context, say this complete lesson sentence: “Grandmother is very healthy.” Use the expression meaning “to be healthy”.",
      "canonicalAnswer": "할머니가 아주 건강하세요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u9-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "honorific-si",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 9,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '할머니가 아주 건강하세요.' matches live source row s0609 (section 8, focus-answer). Prompt forces focus, register, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0727",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “The weather is bad due to fine dust.” Use the expression meaning “to be bad”.",
      "canonicalAnswer": "미세먼지로 날씨가 나빠요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u9-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "direction-euro",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 10,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '미세먼지로 날씨가 나빠요.' matches live source row s0727 (section 8, focus-answer). Prompt forces focus, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s1706",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the stated topic, continuing a conversation about Jeju Island, tell a classmate in ordinary polite Korean that it is Korea’s most famous marine tourist destination. Use 해양 관광지.",
      "canonicalAnswer": "제주도는 한국에서 가장 유명한 해양 관광지예요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u9-l1"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "copula-ieyo",
        "location-eseo",
        "topic-neun"
      ],
      "shortlistRank": 11,
      "shortlistScore": 119,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "topic-or-focus-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '제주도는 한국에서 가장 유명한 해양 관광지예요.' matches live source row s1706 (section 8, topic-statement). Prompt forces topic, communicative act; streamlined the prompt while preserving all required cues. no manual alternatives (single strict canonical); fixed a mid-sentence capitalization defect; canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0040",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “This book is fun.” Use the expression meaning “book”.",
      "canonicalAnswer": "이 책은 재미있어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u8-l1"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 12,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '이 책은 재미있어요.' matches live source row s0040 (section 8, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0050",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I'm going now.” Use the expression meaning “to go”.",
      "canonicalAnswer": "지금 가요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-travel-u7-l1",
        "sn8-travel-u7-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 13,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '지금 가요.' matches live source row s0050 (section 8, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0130",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I'm so tired today.” Use the expression meaning “to be tired”.",
      "canonicalAnswer": "오늘 너무 피곤해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u8-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 14,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '오늘 너무 피곤해요.' matches live source row s0130 (section 8, time-anchored-statement). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0385",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I like purple hats.” Use the expression meaning “purple color”.",
      "canonicalAnswer": "보라색 모자를 좋아해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u8-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 15,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '보라색 모자를 좋아해요.' matches live source row s0385 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0591",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “That mountain is very high.” Use the expression meaning “to be high / tall”.",
      "canonicalAnswer": "저 산은 아주 높아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u8-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 16,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '저 산은 아주 높아요.' matches live source row s0591 (section 8, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0593",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I study new words.” Use the expression meaning “to be new”.",
      "canonicalAnswer": "새로운 단어를 공부해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u9-l1"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 17,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '새로운 단어를 공부해요.' matches live source row s0593 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0658",
      "mode": "typed",
      "templateId": "topic-statement",
      "examPromptEn": "As for the topic already under discussion, speaking politely to a classmate, say this complete lesson sentence: “Our household family has three members.” Use the expression meaning “family member (mouths to feed)”.",
      "canonicalAnswer": "우리 집 식구는 세 명이에요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-people-u3-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "copula-ieyo",
        "topic-neun"
      ],
      "shortlistRank": 18,
      "shortlistScore": 118,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '우리 집 식구는 세 명이에요.' matches live source row s0658 (section 8, topic-statement). Prompt forces topic, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3454",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Finding your way going” situation, using everyday polite speech, say one complete statement that means exactly: “I fill up with gas early in the morning at the gas station.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "주유소에서 아침 일찍 기름을 넣어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u7-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 25,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '주유소에서 아침 일찍 기름을 넣어요.' matches live source row s3454 (section 8, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3474",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Finding your way going” situation, using everyday polite speech, say one complete statement that means exactly: “It takes ten minutes by car to the gas station.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "주유소까지 차로 십 분 걸려요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u7-l9"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "counter-phrase",
        "direction-euro",
        "time-expression",
        "until-kkaji"
      ],
      "shortlistRank": 26,
      "shortlistScore": 44,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '주유소까지 차로 십 분 걸려요.' matches live source row s3474 (section 8, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3274",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Talking about friends” situation, using everyday polite speech, say one complete statement that means exactly: “I always worry about my grandfather's health.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "할아버지의 건강을 언제나 걱정해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-people-u2-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 27,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '할아버지의 건강을 언제나 걱정해요.' matches live source row s3274 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3500",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Finding the right size” situation, using everyday polite speech, say one complete statement that means exactly: “I check my bank balance on payday.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "월급날에 통장 잔액을 확인해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-shopping-u4-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 28,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '월급날에 통장 잔액을 확인해요.' matches live source row s3500 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3524",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “Getting things done to” situation, using everyday polite speech, say one complete statement that means exactly: “I save money for a trip next month.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "다음 달 여행을 위해 돈을 모아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-actions-u7-l1"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 29,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '다음 달 여행을 위해 돈을 모아요.' matches live source row s3524 (section 8, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3623",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Talking about friends” situation, using everyday polite speech, say one complete statement that means exactly: “I read a book to the child.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "어린이에게 책을 읽어 줘요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-people-u2-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 30,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '어린이에게 책을 읽어 줘요.' matches live source row s3623 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3855",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Talking about friends” situation, using everyday polite speech, say one complete statement that means exactly: “We solve the community's problem together.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "공동체의 문제를 함께 해결해요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-people-u2-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "shortlistRank": 31,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '공동체의 문제를 함께 해결해요.' matches live source row s3855 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s4061",
      "mode": "typed",
      "templateId": "time-anchored-statement",
      "examPromptEn": "In the “How was your day rumor” situation, using everyday polite speech, say one complete statement that means exactly: “I get up at the same time every day.” Keep the intended time meaning and information focus: keep the stated time anchor; keep the destination, time, or static location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "매일 같은 시간에 일어나요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u7-l1"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-e",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 32,
      "shortlistScore": 43,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '매일 같은 시간에 일어나요.' matches live source row s4061 (section 8, time-anchored-statement). Prompt forces communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2377",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Finding the right size” situation, using everyday polite speech, ask a polite question that means exactly: “Can I get a refund for this?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "이거 환불할 수 있어요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-shopping-u4-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "can-su-itda",
        "question-polite"
      ],
      "shortlistRank": 33,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '이거 환불할 수 있어요?' matches live source row s2377 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2558",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Finding the right size” situation, using everyday polite speech, say one complete statement that means exactly: “I'd like to exchange some money.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "환전을 하고 싶은데요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-shopping-u4-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "present-polite"
      ],
      "shortlistRank": 34,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '환전을 하고 싶은데요.' matches live source row s2558 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3059",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Describing the room to” situation, using everyday polite speech, ask a polite question that means exactly: “Could you be quiet for a sec?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "잠깐만 조용히 좀 해 줄래요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u9-l8"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "only-man",
        "question-polite"
      ],
      "shortlistRank": 35,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '잠깐만 조용히 좀 해 줄래요?' matches live source row s3059 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3615",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Talking about friends” situation, using everyday polite speech, say one complete statement that means exactly: “Children run and play at the playground.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the action location explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "어린이는 놀이터에서 뛰놀아요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-people-u2-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-eseo",
        "present-polite"
      ],
      "shortlistRank": 36,
      "shortlistScore": 42,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '어린이는 놀이터에서 뛰놀아요.' matches live source row s3615 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3034",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Describing the room to” situation, using everyday polite speech, ask a polite question that means exactly: “May I sit here?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "여기 앉아도 될까요?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u9-l4",
        "sn8-feelings-u9-l8"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "question-polite"
      ],
      "shortlistRank": 37,
      "shortlistScore": 41,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '여기 앉아도 될까요?' matches live source row s3034 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s4155",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "In the “Describing the room to” situation, using everyday polite speech, say one complete statement that means exactly: “The wall color goes well with the room's atmosphere.” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the same information focus as the target line. Use the expression taught in the target line.",
      "canonicalAnswer": "벽 색깔이 방 분위기와 잘 어울려요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u9-l9"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "with-hago-wa"
      ],
      "shortlistRank": 38,
      "shortlistScore": 41,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '벽 색깔이 방 분위기와 잘 어울려요.' matches live source row s4155 (section 8, lexically-anchored-production). Prompt forces lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0070",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “I went around the park once.” Use the expression meaning “to go around”. The event happened yesterday.",
      "canonicalAnswer": "공원을 한 바퀴 돌았어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-travel-u8-l1"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "counter-phrase",
        "object-eul-reul",
        "past-polite",
        "present-polite"
      ],
      "shortlistRank": 19,
      "shortlistScore": 109,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '공원을 한 바퀴 돌았어요.' matches live source row s0070 (section 8, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0471",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I lost my bag at the bus stop.” Use the expression meaning “bus stop / station”. The event happened yesterday.",
      "canonicalAnswer": "정류장에서 가방을 잃어버렸어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-travel-u7-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 20,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '정류장에서 가방을 잃어버렸어요.' matches live source row s0471 (section 8, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0849",
      "mode": "typed",
      "templateId": "focus-answer",
      "examPromptEn": "Answering what or who is at issue, speaking politely to a classmate, say this complete lesson sentence: “People's eyes were focused on him.” Use the expression meaning “gaze / eye contact / eyes”. The event happened yesterday.",
      "canonicalAnswer": "사람들의 시선이 그에게 쏠렸어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-people-u2-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 21,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '사람들의 시선이 그에게 쏠렸어요.' matches live source row s0849 (section 8, focus-answer). Prompt forces focus, tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s1046",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate, say this complete lesson sentence: “I shed tears of joy at the news of passing.” Use the expression meaning “joy / delight”. The event happened yesterday.",
      "canonicalAnswer": "합격 소식에 기쁨의 눈물을 흘렸어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u7-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui"
      ],
      "shortlistRank": 22,
      "shortlistScore": 108,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '합격 소식에 기쁨의 눈물을 흘렸어요.' matches live source row s1046 (section 8, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s0380",
      "mode": "typed",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "Speaking politely to a classmate about an event that already happened, say this complete lesson sentence: “I wore black shoes.” Use the expression meaning “black color”. The event happened yesterday.",
      "canonicalAnswer": "검은색 구두를 신었어요.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "sourceLessonIds": [
        "sn8-feelings-u8-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 23,
      "shortlistScore": 107,
      "sourceCandidateClass": "canonical",
      "lessonContrastRevision": null,
      "promptOrigin": "reviewed-source-reuse",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced",
        "lexical-choice-not-forced",
        "time-or-tense-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '검은색 구두를 신었어요.' matches live source row s0380 (section 8, lexically-anchored-production). Prompt forces tense/time, lexical anchor, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s3191",
      "mode": "typed",
      "templateId": "register-forced-utterance",
      "examPromptEn": "In the “Talking about friends” situation, using formal polite speech, say one complete statement that means exactly: “Would you like to go on a business trip with your company colleagues?” Keep the intended time meaning and information focus: keep the lesson's present or general-time meaning; keep the affected object explicit. Use the expression taught in the target line.",
      "canonicalAnswer": "회사 동료들과 함께 출장을 떠나시겠습니까?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l8"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "formal-nida",
        "honorific-si",
        "object-eul-reul",
        "with-hago-wa"
      ],
      "shortlistRank": 39,
      "shortlistScore": 33,
      "sourceCandidateClass": "unreviewed",
      "lessonContrastRevision": null,
      "promptOrigin": "cb2-cb3-generated",
      "authoringAmbiguityFlags": [
        "communicative-act-not-forced"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "approved",
      "reviewedBy": "Claude / CB4 independent integrator",
      "reviewedAt": "2026-07-26T21:20:40Z",
      "reviewedRevision": "curated-sentence-exam-v1-cb4",
      "reviewerNote": "Verified canonical '회사 동료들과 함께 출장을 떠나시겠습니까?' matches live source row s3191 (section 8, register-forced-utterance). Prompt forces register, communicative act; clarified the communicative-act verb; tightened the lexical-anchor instruction; removed redundant machine-added boilerplate. no manual alternatives (single strict canonical); canonical normalizes collision-free and is fair for strict typed grading."
    },
    {
      "id": "s2056",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "선생님이 오세요.",
      "recognitionAnswerEn": "The teacher is coming.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l3"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "honorific-si",
        "subject-i-ga"
      ],
      "shortlistRank": 1,
      "shortlistScore": 107,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0353",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "라면 한 그릇 먹고 싶어요.",
      "recognitionAnswerEn": "I want to eat a bowl of ramen.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l7"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "and-go",
        "counter-phrase",
        "present-polite",
        "want-go-sipda"
      ],
      "shortlistRank": 2,
      "shortlistScore": 102,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2022",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저는 한국어를 배워요.",
      "recognitionAnswerEn": "I learn Korean.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l5"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 3,
      "shortlistScore": 101,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2027",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저는 친구를 도와요.",
      "recognitionAnswerEn": "I help a friend.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l5"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 4,
      "shortlistScore": 101,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2037",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이거 주세요.",
      "recognitionAnswerEn": "This one, please.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l3"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 5,
      "shortlistScore": 100,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2046",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "네, 천천히 말할게요.",
      "recognitionAnswerEn": "Yes, I will speak slowly.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l7"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "future-geoyeyo"
      ],
      "shortlistRank": 6,
      "shortlistScore": 99,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0616",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이것은 무엇입니까?",
      "recognitionAnswerEn": "What is this?",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l2"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "question-polite",
        "topic-neun"
      ],
      "shortlistRank": 7,
      "shortlistScore": 98,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0345",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 책은 오천 원이에요.",
      "recognitionAnswerEn": "This book is 5,000 Won.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l4"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 8,
      "shortlistScore": 94,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2040",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "도와주세요.",
      "recognitionAnswerEn": "Please help me.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "honorific-si",
        "imperative-seyo"
      ],
      "shortlistRank": 9,
      "shortlistScore": 94,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2048",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "네, 여기요.",
      "recognitionAnswerEn": "Yes, here you go.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "present-polite"
      ],
      "shortlistRank": 10,
      "shortlistScore": 92,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2215",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "처음에는 한국어가 어려웠지만 매일 연습해서 이제 많이 늘었어요.",
      "recognitionAnswerEn": "Korean was hard at first, but I practiced daily and improved a lot.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l16"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "because-aseo",
        "but-jiman",
        "past-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 11,
      "shortlistScore": 78,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2608",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "선생님이 숙제를 많이 내주셨어요.",
      "recognitionAnswerEn": "The teacher gave us a lot of homework.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l9"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "honorific-si",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 12,
      "shortlistScore": 77,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2015",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이것은 책이에요.",
      "recognitionAnswerEn": "This is a book.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l3"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "topic-neun"
      ],
      "shortlistRank": 13,
      "shortlistScore": 70,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2211",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "여기는 제 자리가 아니라서 옮겼어요.",
      "recognitionAnswerEn": "This wasn't my seat, so I moved.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l8"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "because-aseo",
        "copula-negative-anieyo",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 14,
      "shortlistScore": 70,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0002",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저는 한국어를 공부해요.",
      "recognitionAnswerEn": "I study Korean.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l1"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 15,
      "shortlistScore": 69,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0619",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그것을 저에게 주세요.",
      "recognitionAnswerEn": "Please give that to me.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l2"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul"
      ],
      "shortlistRank": 16,
      "shortlistScore": 69,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2851",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "친구가 화를 내서 좀 당황했어요.",
      "recognitionAnswerEn": "My friend got angry, so I was a bit flustered.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l16"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "because-aseo",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 17,
      "shortlistScore": 69,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2929",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "동생은 저를 많이 닮았어요.",
      "recognitionAnswerEn": "My sibling looks a lot like me.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l14"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 18,
      "shortlistScore": 69,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s4001",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "모르는 단어가 나오면 사전을 찾아요.",
      "recognitionAnswerEn": "When an unknown word appears, I look it up in a dictionary.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l15"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "if-myeon",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 19,
      "shortlistScore": 69,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0020",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저는 잘 몰라요.",
      "recognitionAnswerEn": "I don't really know.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l3"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 20,
      "shortlistScore": 68,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0024",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "너는 어디 가?",
      "recognitionAnswerEn": "Where are you going? (casual)",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l3"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "question-polite",
        "topic-neun"
      ],
      "shortlistRank": 21,
      "shortlistScore": 68,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0011",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "안녕하세요. 저는 학생이에요.",
      "recognitionAnswerEn": "Hello. I am a student.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l2"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "honorific-si",
        "topic-neun"
      ],
      "shortlistRank": 22,
      "shortlistScore": 64,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0038",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이것은 제 것이에요.",
      "recognitionAnswerEn": "This is mine.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l4"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "copula-ieyo",
        "topic-neun"
      ],
      "shortlistRank": 23,
      "shortlistScore": 63,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2194",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 일은 저만 할 수 있어요.",
      "recognitionAnswerEn": "Only I can do this task.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l7"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "can-su-itda",
        "only-man",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 24,
      "shortlistScore": 63,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2244",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 일을 끝낼 때까지 집에 못 가요.",
      "recognitionAnswerEn": "I can't go home until I finish this.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l10"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "neg-mot",
        "present-polite",
        "until-kkaji",
        "when-ttae"
      ],
      "shortlistRank": 25,
      "shortlistScore": 63,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2458",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "급한 일이 생겨서 못 갈 것 같아요.",
      "recognitionAnswerEn": "Something urgent came up, so I don't think I can make it.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l10"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "because-aseo",
        "neg-mot",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 26,
      "shortlistScore": 63,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2607",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "일이 너무 많아서 주말에도 일해요.",
      "recognitionAnswerEn": "I have so much work I work weekends too.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l9"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "also-do",
        "because-aseo",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 27,
      "shortlistScore": 63,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2446",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "전화를 잘못 거셨어요.",
      "recognitionAnswerEn": "You've dialed the wrong number.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l8"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "honorific-si",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 28,
      "shortlistScore": 62,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2750",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "요즘 살이 좀 빠졌어요.",
      "recognitionAnswerEn": "I've lost a little weight lately.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l8"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "past-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 29,
      "shortlistScore": 62,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2840",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "오랜만에 친구를 만나서 반가웠어요.",
      "recognitionAnswerEn": "It was nice to see a friend after a long time.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l13"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 30,
      "shortlistScore": 62,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2855",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "친한 친구가 생겨서 기뻐요.",
      "recognitionAnswerEn": "I'm glad I made a close friend.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l13",
        "sn2-grammar-u1-l3"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "because-aseo",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 31,
      "shortlistScore": 62,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2928",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그 사람은 첫인상이 좋았어요.",
      "recognitionAnswerEn": "That person made a good first impression.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l14"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "past-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 32,
      "shortlistScore": 62,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2957",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "벌써 열두 시가 넘었어요.",
      "recognitionAnswerEn": "It's already past twelve.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l8"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "past-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 33,
      "shortlistScore": 62,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s3580",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "좋아하는 사람과 카페에 갔어요.",
      "recognitionAnswerEn": "I went to a cafe with someone I like.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l10"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "location-e",
        "past-polite",
        "with-hago-wa"
      ],
      "shortlistRank": 34,
      "shortlistScore": 62,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s3600",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "마음에 드는 카페를 찾았어요.",
      "recognitionAnswerEn": "I found a cafe I like.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l11"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 35,
      "shortlistScore": 62,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2912",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저 배우는 정말 잘생겼어요.",
      "recognitionAnswerEn": "That actor is really handsome.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l9"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 36,
      "shortlistScore": 61,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s3591",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "연락이 없어서 걱정했어요.",
      "recognitionAnswerEn": "I worried because there was no contact.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l10"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "because-aseo",
        "past-polite"
      ],
      "shortlistRank": 37,
      "shortlistScore": 61,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s3598",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "데이트가 재미있었지만 너무 길었어요.",
      "recognitionAnswerEn": "The date was fun, but it was too long.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l15"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "but-jiman",
        "past-polite"
      ],
      "shortlistRank": 38,
      "shortlistScore": 61,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0336",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "열 명의 친구가 왔어요.",
      "recognitionAnswerEn": "Ten friends came.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u3-l4"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "counter-phrase",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 39,
      "shortlistScore": 60,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0317",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "사 년 동안 공부했어요.",
      "recognitionAnswerEn": "I studied for four years.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l4"
      ],
      "sourceSectionOrder": 1,
      "patternTags": [
        "counter-phrase",
        "past-polite",
        "time-expression"
      ],
      "shortlistRank": 40,
      "shortlistScore": 59,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1375",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "친절한 이웃들이 제게 도움을 많이 주셨어요.",
      "recognitionAnswerEn": "Kind neighbors gave me a lot of help.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-feelings-u1-l9"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "honorific-si",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 1,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1423",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "할아버지께서 제게 교훈이 되는 말씀을 해주셨어요.",
      "recognitionAnswerEn": "Grandfather told me words that serve as a lesson.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-study-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "honorific-si",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 2,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1480",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그녀는 차분하고 맑은 목소리로 오디오북을 녹음해요.",
      "recognitionAnswerEn": "She records audiobooks in a calm and clear voice.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-people-u1-l12"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "and-go",
        "direction-euro",
        "object-eul-reul",
        "present-polite",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 3,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1131",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "공책에 자를 대고 일직선으로 밑줄을 그었어요.",
      "recognitionAnswerEn": "I put a ruler on the notebook and drew a straight underline.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-tech-u1-l7"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "and-go",
        "direction-euro",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 4,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1457",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우주 비행사가 우주선에서 찍은 지구 사진을 봤어요.",
      "recognitionAnswerEn": "I saw the Earth photo taken by the astronaut in the spaceship.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-nature-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 5,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1564",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "여권 신청서에 집 주소를 검은 볼펜으로 적었어요.",
      "recognitionAnswerEn": "I wrote my home address in the passport application form with a black ballpoint pen.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-tech-u1-l10"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "direction-euro",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 6,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1811",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "회의 일정이 변경되면 즉시 제게 연락을 주세요.",
      "recognitionAnswerEn": "If the meeting schedule changes, please contact me immediately.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-tech-u1-l11"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "honorific-si",
        "if-myeon",
        "imperative-seyo",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 7,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0967",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 찌개는 너무 짜서 물을 넣었어요.",
      "recognitionAnswerEn": "This stew is too salty so I added water.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-feelings-u1-l9"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 8,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1105",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "김이 모락모락 나는 찐만두를 간장에 찍어 먹었어요.",
      "recognitionAnswerEn": "I dipped steaming steamed dumplings in soy sauce and ate them.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-food-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 9,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1179",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "가게 영업 시간이 끝나서 문을 굳게 닫았어요.",
      "recognitionAnswerEn": "The shop business hours ended, so they closed the door tightly.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-shopping-u1-l11"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 10,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1388",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "회의실에 모인 부서원들이 모두 찬성표를 던졌어요.",
      "recognitionAnswerEn": "The department members gathered in the meeting room all cast yes votes.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-feelings-u1-l10"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 11,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1444",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우리는 문제를 해결하는 방식을 바꾸기로 했어요.",
      "recognitionAnswerEn": "We decided to change the way we solve the problem.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-study-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 12,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1467",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 도시는 정보 통신 산업의 발전으로 부유해졌어요.",
      "recognitionAnswerEn": "This city became wealthy with the development of the IT industry.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-tech-u1-l10"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "direction-euro",
        "past-polite",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 13,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1533",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "지갑에 적어둔 전화번호가 적힌 종이를 잃어버렸어요.",
      "recognitionAnswerEn": "I lost the paper writing the phone number written in my wallet.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-tech-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 14,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1894",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 평생 모은 재산의 상당액을 장학 재단에 기부했어요.",
      "recognitionAnswerEn": "He donated a significant amount of the wealth gathered for life to the scholarship foundation.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-shopping-u1-l12"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 15,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1282",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 옷은 남성 고객들에게 인기가 아주 높습니다.",
      "recognitionAnswerEn": "This clothing is very popular with male customers.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-people-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "formal-nida",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 16,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1936",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "폭우와 강풍으로 인해 우리 동네 전기가 끊겼어요.",
      "recognitionAnswerEn": "Due to heavy rain and strong winds, our neighborhood electricity was cut off.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-tech-u1-l11"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "past-polite",
        "subject-i-ga",
        "with-hago-wa"
      ],
      "shortlistRank": 17,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1356",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "봄이 되어 비가 내리니 마른 땅이 촉촉해졌어요.",
      "recognitionAnswerEn": "As it rains in spring, the dry ground became moist.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-nature-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 18,
      "shortlistScore": 114,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0810",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "사이즈가 작아서 큰 옷으로 교환하고 싶어요.",
      "recognitionAnswerEn": "I want to exchange it for larger clothes because the size is small.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-shopping-u1-l7"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "and-go",
        "because-aseo",
        "direction-euro",
        "present-polite",
        "subject-i-ga",
        "want-go-sipda"
      ],
      "shortlistRank": 19,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0830",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 수학 문제를 푸는 방법을 알고 싶어요.",
      "recognitionAnswerEn": "I want to know the method to solve this math problem.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-study-u1-l10"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "topic-neun",
        "want-go-sipda"
      ],
      "shortlistRank": 20,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0085",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "건강을 위해서 소식하는 습관을 기르는 것이 좋습니다.",
      "recognitionAnswerEn": "It is good to develop a habit of eating small amounts for health.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-food-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "because-aseo",
        "formal-nida",
        "object-eul-reul",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 21,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0858",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "비가 올 경우에는 행사를 실내에서 진행해요.",
      "recognitionAnswerEn": "In case it rains, we proceed with the event indoors.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-feelings-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "if-myeon",
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 22,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1230",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "도서관에 들어가기 전에 먼저 학생증을 꺼내세요.",
      "recognitionAnswerEn": "Before entering the library, please take out your student ID card first.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-daily-u1-l10"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "location-e",
        "object-eul-reul",
        "time-expression"
      ],
      "shortlistRank": 23,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1279",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "제 나이는 스물두 살이고 대학에서 역사 공부해요.",
      "recognitionAnswerEn": "My age is 22 years old and I study history at university.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-people-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "and-go",
        "counter-phrase",
        "location-eseo",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 24,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1396",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "도서관 내부의 와이파이 서비스는 모두 무료입니다.",
      "recognitionAnswerEn": "The Wi-Fi service inside the library is all free.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "copula-ieyo",
        "formal-nida",
        "possessive-ui",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 25,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1896",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저희 부서는 내일부터 새로운 프로젝트 업무를 시작합니다.",
      "recognitionAnswerEn": "Our department starts new project business starting tomorrow.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-people-u1-l14"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "formal-nida",
        "from-buteo",
        "object-eul-reul",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 26,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1991",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "꽃밭에서 나비를 쫓아 뛰어노는 소녀의 모습이 예뻐요.",
      "recognitionAnswerEn": "The image of the girl running and playing chasing butterflies in the flower garden is pretty.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-people-u1-l14"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "possessive-ui",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 27,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0882",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "도움을 청할 때는 용기가 필요해요.",
      "recognitionAnswerEn": "When calling for help, courage is needed.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-feelings-u1-l5"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 28,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0896",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "매표소 앞에 사람들이 긴 줄을 섰어요.",
      "recognitionAnswerEn": "People formed a long line in front of the ticket office.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-study-u1-l7"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 29,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0929",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 문은 접근하면 자동으로 열려요.",
      "recognitionAnswerEn": "This door opens automatically when approached.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-tech-u1-l3"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "direction-euro",
        "if-myeon",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 30,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1101",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "아침에 먹는 사과는 건강에 아주 유익해요.",
      "recognitionAnswerEn": "An apple eaten in the morning is very beneficial to health.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-food-u1-l12"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 31,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1172",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "식사를 마친 후에 계산대에서 밥값을 계산했어요.",
      "recognitionAnswerEn": "After finishing the meal, I calculated the food price at the counter.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "shortlistRank": 32,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1206",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "지도에서 제 현재 위치를 빨간색 점으로 확인했어요.",
      "recognitionAnswerEn": "I checked my current position as a red dot on the map.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-travel-u1-l20"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "direction-euro",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 33,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1208",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "학교 정문 앞에서 아침 일찍 친구들을 만나기로 했어요.",
      "recognitionAnswerEn": "I decided to meet friends early in the morning in front of the school gate.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-travel-u1-l20"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "shortlistRank": 34,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1210",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "책상과 침대 사이에 좁은 틈이 있어요.",
      "recognitionAnswerEn": "There is a narrow gap between the desk and the bed.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-travel-u1-l19"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "existence-itda",
        "present-polite",
        "subject-i-ga",
        "with-hago-wa"
      ],
      "shortlistRank": 35,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1253",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "피부 관리를 위해 매일 밤 팩을 하고 자요.",
      "recognitionAnswerEn": "I put on a facial mask and sleep every night for skin care.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-actions-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "time-expression",
        "with-hago-wa"
      ],
      "shortlistRank": 36,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1330",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "어려운 수학 문제를 풀 때 친구의 도움을 받았어요.",
      "recognitionAnswerEn": "I received my friend's help when solving a difficult math problem.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-actions-u1-l13"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "when-ttae"
      ],
      "shortlistRank": 37,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1424",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "공원에 신호등과 횡단보도를 새로 설치했어요.",
      "recognitionAnswerEn": "We newly installed a traffic light and crosswalk in the park.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-actions-u1-l6"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "with-hago-wa"
      ],
      "shortlistRank": 38,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1544",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "컴퓨터 화면에서 에러 코드를 분석하여 수정했어요.",
      "recognitionAnswerEn": "I analyzed and corrected the error code on the computer screen.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-tech-u1-l8"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "if-myeon",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 39,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1870",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "회사는 올해 해외 수출을 통해 큰 이익을 남겼어요.",
      "recognitionAnswerEn": "The company made a great profit through overseas exports this year.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn2-shopping-u1-l12"
      ],
      "sourceSectionOrder": 2,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 40,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1943",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 끊임없는 시도 끝에 꿈을 실현하게 되었습니다.",
      "recognitionAnswerEn": "He realized his dream after continuous attempts.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "also-do",
        "formal-nida",
        "object-eul-reul",
        "past-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 1,
      "shortlistScore": 125,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1247",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "의사는 환자의 상태를 보고 빠른 판단을 내렸어요.",
      "recognitionAnswerEn": "The doctor made a quick judgment looking at the patient's condition.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-actions-u2-l3"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 2,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1516",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "눈이 불편해서 안경원에서 시력 검사를 했어요.",
      "recognitionAnswerEn": "I did an eyesight test at the optician because my eyes were uncomfortable.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-health-u1-l9"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "because-aseo",
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 3,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1995",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그가 회의 시간에 낸 아이디어 제안이 채택되었습니다.",
      "recognitionAnswerEn": "The idea suggestion he made during the meeting time was adopted.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "formal-nida",
        "past-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 4,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1276",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "어릴 때 화가가 되고 싶어 하던 꿈을 이뤘어요.",
      "recognitionAnswerEn": "I achieved the dream of wanting to become a painter when I was young.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-feelings-u2-l1",
        "sn3-feelings-u2-l7"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "want-go-sipda",
        "when-ttae"
      ],
      "shortlistRank": 5,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1594",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저는 한국어를 배운 지 벌써 삼 개월이 다 되었어요.",
      "recognitionAnswerEn": "It's already been three months since I started studying Korean.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-daily-u2-l9"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "copula-ieyo",
        "counter-phrase",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 6,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1976",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 회사에서 마케팅 홍보 업무를 담당하고 있어요.",
      "recognitionAnswerEn": "He is in charge of marketing publicity work in the company.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u2-l9"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 7,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1112",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "낮에는 해가 떠서 날씨가 아주 따뜻해요.",
      "recognitionAnswerEn": "Because the sun rises during the day, the weather is very warm.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-daily-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "because-aseo",
        "present-polite",
        "subject-i-ga",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 8,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1144",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "사장님이 다음 주에 해외 출장을 떠나십니다.",
      "recognitionAnswerEn": "The president goes on an overseas business trip next week.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u1-l6"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "formal-nida",
        "honorific-si",
        "object-eul-reul",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 9,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1200",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우리 팀이 힘을 합쳐 프로젝트 공모전에서 1등을 했어요.",
      "recognitionAnswerEn": "Our team combined strength and won 1st place in the project competition.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l17"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "counter-phrase",
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 10,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1386",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "군인이 장군의 준엄한 명령을 듣고 신속히 움직였어요.",
      "recognitionAnswerEn": "The soldier moved quickly hearing the general's solemn command.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-actions-u2-l4"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 11,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1439",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "회원들의 일부가 새 규칙 제정에 불만을 나타냈어요.",
      "recognitionAnswerEn": "A part of the members showed dissatisfaction with the new rule establishment.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-feelings-u2-l7"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 12,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1443",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "조용하고 한적한 시골 마을에서 휴가를 보냈어요.",
      "recognitionAnswerEn": "I spent the vacation in a quiet and peaceful country village.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-travel-u2-l6"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "with-hago-wa"
      ],
      "shortlistRank": 13,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1447",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "유튜브 방송을 통해 하루아침에 인기 스타가 되었어요.",
      "recognitionAnswerEn": "They became a popular star overnight through YouTube broadcasting.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l18"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 14,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1567",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "시장 물가 상승의 원인을 다각적으로 분석했어요.",
      "recognitionAnswerEn": "We analyzed the causes of market price rises from various angles.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-study-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 15,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1910",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "거대한 태풍이 한반도 남쪽 바다를 통해 다가오고 있어요.",
      "recognitionAnswerEn": "A giant typhoon is approaching through the south sea of the Korean peninsula.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-nature-u2-l16"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "also-do",
        "and-go",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 16,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1950",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 소설 작품으로 올해의 우수 문학상을 수상했어요.",
      "recognitionAnswerEn": "He was awarded this year's excellent literature prize for his novel work.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l19"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 17,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1024",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "제가 도착했을 때 기차는 이미 떠났어요.",
      "recognitionAnswerEn": "When I arrived, the train had already left.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-feelings-u2-l3"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "past-polite",
        "subject-i-ga",
        "topic-neun",
        "when-ttae"
      ],
      "shortlistRank": 18,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1146",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "판사가 사건의 증거를 토대로 판결을 내렸어요.",
      "recognitionAnswerEn": "The judge made a ruling based on the evidence of the case.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 19,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1241",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우리는 서로 돕고 배려하는 자세가 필요해요.",
      "recognitionAnswerEn": "We need an attitude of helping and caring for each other.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-feelings-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 20,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1292",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 나라는 전통적인 농업 국가에서 공업국으로 발전했어요.",
      "recognitionAnswerEn": "This country developed from a traditional agricultural nation into an industrial state.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u2-l2",
        "sn3-work-u2-l8"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "direction-euro",
        "location-eseo",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 21,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1339",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "두 사건이 동시에 발생해서 경찰이 수사 중이에요.",
      "recognitionAnswerEn": "The police are investigating because two incidents occurred at the same time.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-daily-u2-l7"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "because-aseo",
        "copula-ieyo",
        "location-e",
        "subject-i-ga"
      ],
      "shortlistRank": 22,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1413",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "전화를 거는 대신 직접 사무실에 방문했어요.",
      "recognitionAnswerEn": "Instead of making a phone call, I visited the office in person.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-feelings-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 23,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1417",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "국회의원이 법안 제정을 위해 회의에 참석했어요.",
      "recognitionAnswerEn": "The assembly representative attended the meeting to establish the bill.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u1-l6"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 24,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1427",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "두 국가 사이의 전쟁으로 평화가 깨졌어요.",
      "recognitionAnswerEn": "Peace was broken due to the war between the two nations.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-travel-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "direction-euro",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 25,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1436",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "비가 내리기 시작해서 집으로 빨리 걸어갔어요.",
      "recognitionAnswerEn": "I walked home quickly because rain started falling.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-travel-u2-l5"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "because-aseo",
        "direction-euro",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 26,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1560",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우리 회사는 부품을 조달하는 외부 업체와 계약했어요.",
      "recognitionAnswerEn": "Our company contracted with an external company procuring parts.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u1-l9"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 27,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1585",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그 학자는 최초로 한국 고대 소설을 한글로 번역했어요.",
      "recognitionAnswerEn": "The scholar translated ancient Korean novels into Hangul for the first time.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-daily-u2-l9"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 28,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1926",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그 시인은 자연의 신비로움을 담은 시집을 출판했어요.",
      "recognitionAnswerEn": "The poet published a poetry book containing the mysteries of nature.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u2-l9"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 29,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1940",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "하늘에 떠 있는 구름 모양이 신기하고 귀여워요.",
      "recognitionAnswerEn": "The shape of the cloud floating in the sky is marvelous and cute.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-nature-u2-l16"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "location-e",
        "subject-i-ga",
        "with-hago-wa"
      ],
      "shortlistRank": 30,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1352",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 자동차는 실내 공간 디자인이 아주 훌륭합니다.",
      "recognitionAnswerEn": "This car's interior space design is very excellent.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l17"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "formal-nida",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 31,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1445",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "도로에서 큰 교통 사고가 나서 길이 꽉 막혔어요.",
      "recognitionAnswerEn": "A big traffic accident happened on the road, so the path is jammed tight.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-travel-u2-l7"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-eseo",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 32,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1961",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "제 여동생은 올해 대학교 이 학년으로 올라갑니다.",
      "recognitionAnswerEn": "My younger sister rises to sophomore in college this year.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-study-u2-l7"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "formal-nida",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 33,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1481",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "가수가 화려한 조명이 켜진 무대 위로 등장했어요.",
      "recognitionAnswerEn": "The singer appeared on the stage with colorful lights turned on.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l18"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 34,
      "shortlistScore": 114,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1497",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "자신의 주장을 논리적으로 펴는 것이 중요해요.",
      "recognitionAnswerEn": "It is important to unfold one's claim logically.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-study-u2-l4"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "possessive-ui",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 35,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1530",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이전 아파트보다 지금 사는 곳이 훨씬 넓고 편해요.",
      "recognitionAnswerEn": "The place I live now is much wider and more comfortable than the previous apartment.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-daily-u2-l8"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "comparison-boda",
        "present-polite",
        "subject-i-ga",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 36,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1236",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "많은 대기업들이 청년 일자리 창출에 노력하고 있어요.",
      "recognitionAnswerEn": "Many large enterprises are striving to create youth jobs.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u1-l8"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "location-e",
        "present-polite",
        "subject-i-ga",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 37,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1288",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "농부들이 밭에서 정성 어린 노동으로 곡식을 길러요.",
      "recognitionAnswerEn": "Farmers grow grains with sincere labor in the field.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-work-u2-l8"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "direction-euro",
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 38,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1398",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "상대방의 의견을 무시하는 행동은 옳지 않아요.",
      "recognitionAnswerEn": "The act of ignoring the opponent's opinion is not correct.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-actions-u2-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "neg-ji-anta",
        "object-eul-reul",
        "possessive-ui",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 39,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1426",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "자신의 잘못을 솔직하게 인정하고 사과했어요.",
      "recognitionAnswerEn": "They frankly admitted their mistake and apologized.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn3-feelings-u2-l2"
      ],
      "sourceSectionOrder": 3,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "with-hago-wa"
      ],
      "shortlistRank": 40,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1290",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그의 주장은 논리가 정연해서 설득력이 있어요.",
      "recognitionAnswerEn": "His assertion is persuasive because its logic is orderly.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-study-u3-l6"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "because-aseo",
        "existence-itda",
        "possessive-ui",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 1,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1565",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "혹시 가방 안에 여분의 연필이 있으면 빌려주세요.",
      "recognitionAnswerEn": "If you have an extra pencil in your bag by any chance, lend it.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l6"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "honorific-si",
        "if-myeon",
        "imperative-seyo",
        "location-e",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 2,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1614",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "겨울철 기후는 대기가 무척 건조해서 산불을 조심해야 해요.",
      "recognitionAnswerEn": "Winter climate is dry in the atmosphere, so watch out for forest fires.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-nature-u3-l7"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "because-aseo",
        "must-ya-dwaeda",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 3,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1329",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "경찰의 불심검문을 보고 도둑이 황급히 도망갔어요.",
      "recognitionAnswerEn": "Seeing the police checkpoint, the thief fled in a hurry.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-actions-u3-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 4,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1562",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "계획 자체는 훌륭하지만 실행할 예산이 부족해요.",
      "recognitionAnswerEn": "The plan itself is excellent, but the budget to execute it lacks.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "but-jiman",
        "only-man",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 5,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1577",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "약속 시간을 지키는 것은 절대 잊어버리면 안 돼요.",
      "recognitionAnswerEn": "You must absolutely never forget to keep the appointment time.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l7"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "if-myeon",
        "neg-an",
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 6,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1582",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이곳은 제가 어릴 때 할머니와 함께 산 마을이에요.",
      "recognitionAnswerEn": "This place is the village where I lived with my grandmother when young.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-travel-u3-l11"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "copula-ieyo",
        "subject-i-ga",
        "topic-neun",
        "when-ttae",
        "with-hago-wa"
      ],
      "shortlistRank": 7,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1117",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "출장 일정이 변경되어서 기차표를 취소했어요.",
      "recognitionAnswerEn": "The business trip schedule changed, so I canceled the train ticket.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-daily-u3-l9"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 8,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1261",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "제가 말한 그대로 공책에 받아 적으세요.",
      "recognitionAnswerEn": "Write it down in the notebook exactly as I said.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "location-e",
        "subject-i-ga"
      ],
      "shortlistRank": 9,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1270",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "실수를 만회할 수 있는 좋은 기회가 주어졌어요.",
      "recognitionAnswerEn": "A good opportunity to make up for the mistake was given.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l5"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "can-su-itda",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 10,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1332",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "실패를 두려워하지 않고 끊임없이 도전을 이어가요.",
      "recognitionAnswerEn": "We continue to challenge endlessly without fearing failure.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-actions-u3-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "and-go",
        "neg-ji-anta",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 11,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1382",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "책상 위에 먼지가 소복이 쌓여서 휴지로 닦았어요.",
      "recognitionAnswerEn": "I wiped with a tissue because dust was piled softly on the desk.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-nature-u3-l7"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "direction-euro",
        "location-e",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 12,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1471",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "신부가 결혼식에서 눈부시게 하얀 웨딩 드레스를 입었어요.",
      "recognitionAnswerEn": "The bride wore a dazzlingly white wedding dress at the wedding.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-shopping-u2-l7"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 13,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1529",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "어두운 골목을 혼자 걷는 것은 위험이 따라요.",
      "recognitionAnswerEn": "Walking the dark alley alone carries risk.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l5"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 14,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1539",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "대통령 선거 날짜가 달력에 빨간색으로 표시되었어요.",
      "recognitionAnswerEn": "The president election date is marked in red on the calendar.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-travel-u3-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "direction-euro",
        "location-e",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 15,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1552",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "기차를 타고 다른 지방 도시로 이동을 완료했어요.",
      "recognitionAnswerEn": "I completed moving to another provincial city taking the train.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-travel-u3-l10"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "and-go",
        "direction-euro",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 16,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1554",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저는 한국 과일 중에서 사과를 제일 좋아합니다.",
      "recognitionAnswerEn": "I like apples the most among Korean fruits.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l6"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "formal-nida",
        "location-eseo",
        "object-eul-reul",
        "topic-neun"
      ],
      "shortlistRank": 17,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1592",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "소방관들이 화재 현장에서 밤새 인명 구조에 매진했어요.",
      "recognitionAnswerEn": "Firefighters strived in lifesaving rescue at the fire scene all night.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-travel-u3-l11"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "location-eseo",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 18,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1607",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "교사가 칠판에 빨간색 볼펜으로 중요 공식을 강조했어요.",
      "recognitionAnswerEn": "The teacher emphasized the important formula with a red pen.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-study-u3-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 19,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1623",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이번 여행은 이동 비용과 식사 경비가 많이 들었어요.",
      "recognitionAnswerEn": "This trip cost a lot in moving costs and meal expenses.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-shopping-u2-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "past-polite",
        "subject-i-ga",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 20,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1786",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 평생 노력한 끝에 마침내 꿈을 실현했어요.",
      "recognitionAnswerEn": "He finally realized his dream after efforts his whole life.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-actions-u3-l10"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 21,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1970",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저는 주말 저녁에 가끔 가족들과 외식하러 나갑니다.",
      "recognitionAnswerEn": "I sometimes go out to dine with family on Sunday evenings.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-daily-u3-l14"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "formal-nida",
        "time-expression",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 22,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1213",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이정표가 가리키는 방향을 따라 묵묵히 걸었어요.",
      "recognitionAnswerEn": "I walked silently following the direction the signpost pointed.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-travel-u3-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 23,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1468",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "정부는 주택난 해결을 위한 긴급 대책을 발표했어요.",
      "recognitionAnswerEn": "The government announced emergency measures to solve the housing shortage.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-actions-u3-l9"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 24,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1608",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "정부는 도로 교통 환경 개선 대책을 공식 발표했어요.",
      "recognitionAnswerEn": "The government officially announced road traffic environment upgrade measures.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-actions-u3-l10"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 25,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1753",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우리나라는 반도체 수출을 통해 큰 경제 성장을 이뤘어요.",
      "recognitionAnswerEn": "Our country achieved great economic growth through semiconductor export.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-shopping-u2-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 26,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1118",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "주말에 친구와 영화를 보기로 약속이 있어요.",
      "recognitionAnswerEn": "I have an appointment to watch a movie with a friend over the weekend.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-daily-u3-l9"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "existence-itda",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "time-expression",
        "with-hago-wa"
      ],
      "shortlistRank": 27,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1578",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "자신의 실수에 대해 책임을 지는 태도가 용기예요.",
      "recognitionAnswerEn": "The attitude of taking responsibility for one's mistake is courage.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l7"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "copula-ieyo",
        "location-e",
        "object-eul-reul",
        "possessive-ui",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 28,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1169",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "저금통에 동전을 차곡차곡 모으는 재미가 있어요.",
      "recognitionAnswerEn": "There is fun in gathering coins in the piggy bank one by one.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-shopping-u3-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "existence-itda",
        "location-e",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 29,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1170",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "지갑에 오만 원짜리 지폐 한 장이 들어 있네요.",
      "recognitionAnswerEn": "There is a 50,000 Won bill in my wallet.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-shopping-u3-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "counter-phrase",
        "location-e",
        "only-man",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 30,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1847",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "성공의 가장 중요한 요소는 끈기와 성실한 태도입니다.",
      "recognitionAnswerEn": "The most important factor of success is persistence and a sincere attitude.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-study-u3-l9"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "copula-ieyo",
        "formal-nida",
        "possessive-ui",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 31,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1944",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "대학 시절에 동창들과 제주도로 여행을 다녀왔어요.",
      "recognitionAnswerEn": "I went on a trip to Jeju Island with classmates during my college days.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-daily-u3-l10"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "time-expression",
        "with-hago-wa"
      ],
      "shortlistRank": 32,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1952",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "지금은 예전보다 교통망이 훨씬 촘촘하게 연결되었어요.",
      "recognitionAnswerEn": "Now the transportation network is connected much more tightly than in the past.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-daily-u3-l10"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "comparison-boda",
        "past-polite",
        "subject-i-ga",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 33,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1007",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "모르는 단어는 사전을 찾아서 뜻을 확인해요.",
      "recognitionAnswerEn": "Look up unfamiliar words in the dictionary to check meanings.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-study-u3-l6"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 34,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1044",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "가을 하늘을 보면 쓸쓸한 느낌이 듭니다.",
      "recognitionAnswerEn": "Looking at the autumn sky gives a lonely feeling.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-feelings-u3-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "formal-nida",
        "if-myeon",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 35,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1148",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "아나운서가 차분한 목소리로 뉴스를 진행해요.",
      "recognitionAnswerEn": "The announcer hosts the news in a calm voice.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-work-u3-l3"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 36,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1149",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "수의사가 아픈 강아지의 다리를 치료해 주었어요.",
      "recognitionAnswerEn": "The veterinarian treated the sick puppy's leg.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-work-u3-l4"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 37,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1154",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "여행 가이드가 유창한 영어로 유적지를 설명해요.",
      "recognitionAnswerEn": "The tour guide explains the historic site in fluent English.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-work-u3-l5"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 38,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1175",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "매달 일정한 수입이 들어오니 마음이 편안해요.",
      "recognitionAnswerEn": "Having a constant income coming in every month makes my mind comfortable.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-shopping-u2-l6"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "because-aseo",
        "present-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 39,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1392",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이번 학기에 전 과목 성적 올리기를 목표로 잡았어요.",
      "recognitionAnswerEn": "I set raising all subject grades this semester as the goal.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn4-study-u3-l8"
      ],
      "sourceSectionOrder": 4,
      "patternTags": [
        "direction-euro",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 40,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1892",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "날씨가 맑아서 공원 잔디밭 위에 그늘막을 치고 쉬었어요.",
      "recognitionAnswerEn": "Because the weather is clear, I set up a shade canopy on the park lawn and rested.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-nature-u4-l5"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "because-aseo",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 1,
      "shortlistScore": 125,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1642",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "햇빛이 강해서 공원 나무 그늘 밑에 의자를 놓았어요.",
      "recognitionAnswerEn": "Because the sunlight is strong, I placed a chair under the park tree shade.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "because-aseo",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 2,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1948",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그의 발음은 분명하고 목소리 톤이 대단히 예리해요.",
      "recognitionAnswerEn": "His pronunciation is clear, and his voice tone is extremely sharp.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l5"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "possessive-ui",
        "present-polite",
        "subject-i-ga",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 3,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1977",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "경찰관들이 골목길을 순찰해 범죄 예방에 노력하고 있어요.",
      "recognitionAnswerEn": "Police officers patrol alleys, striving to prevent crime.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-travel-u4-l8"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "location-e",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "with-hago-wa"
      ],
      "shortlistRank": 4,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1308",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "선생님이 제 질문에 친절한 답변을 해주셨어요.",
      "recognitionAnswerEn": "The teacher gave a kind answer to my question.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-study-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "honorific-si",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 5,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1611",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "거실 천장 구석에 거미가 예쁜 거미줄을 치고 있네요.",
      "recognitionAnswerEn": "A spider is spinning a pretty web in the living room ceiling corner.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "location-e",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 6,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1727",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그 장군은 용감하고 강직한 이상적인 군인상입니다.",
      "recognitionAnswerEn": "That general is a brave and upright ideal soldier's image.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-work-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "copula-ieyo",
        "formal-nida",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 7,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1963",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그 기업은 기술 기반의 우수한 경쟁력을 입증받았습니다.",
      "recognitionAnswerEn": "The enterprise was proved of its excellent technology-based competitiveness.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l5"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "formal-nida",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 8,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0833",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "수술을 받고 건강이 많이 회복되었어요.",
      "recognitionAnswerEn": "After having surgery, my health recovered a lot.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-health-u2-l7"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 9,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1273",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "사과 껍질에 영양소가 많다고 해서 그냥 먹었어요.",
      "recognitionAnswerEn": "I just ate it because they say there are many nutrients in apple skin.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-food-u3-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "because-aseo",
        "location-e",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 10,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1291",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "두 학자는 역사적 사실에 대한 논쟁을 벌였어요.",
      "recognitionAnswerEn": "The two scholars engaged in a debate over a historical fact.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-study-u4-l6"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 11,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1397",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "넘어져서 무릎에 피가 나니 소방서 구급상자를 썼어요.",
      "recognitionAnswerEn": "I used the fire station first-aid kit because my knee bled falling down.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-health-u2-l10"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 12,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1777",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "대학 교육도 중요하지만 현장 실무 경험이 더 중요해요.",
      "recognitionAnswerEn": "University education is also important, but field work experience is more important.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-work-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "also-do",
        "but-jiman",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 13,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1794",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "의사의 처방 약 덕분에 환자의 혈압이 안정을 찾았어요.",
      "recognitionAnswerEn": "Thanks to the doctor's prescription medicine, the patient's blood pressure found stability.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 14,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1819",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "건강을 유지하려면 영양 균형이 잡힌 식사가 필요해요.",
      "recognitionAnswerEn": "A nutrition-balanced meal is needed to maintain health.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-health-u2-l10"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "if-myeon",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 15,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1913",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "주말에 열차를 타고 수원 화성 성곽을 둘러보았어요.",
      "recognitionAnswerEn": "I looked around Suwon Hwaseong fortress wall taking the train over the weekend.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "shortlistRank": 16,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1935",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그녀는 시험에서 완벽한 점수를 받았어요.",
      "recognitionAnswerEn": "She got a perfect score on the exam.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 17,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1157",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "심리 상담사에게 고민을 털어놓고 상담을 받았어요.",
      "recognitionAnswerEn": "I confessed my worries to the psychological counselor and received counseling.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-work-u4-l2"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 18,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1328",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "비가 와서 도로 바닥이 무척 미끄러우니 조심하세요.",
      "recognitionAnswerEn": "Please be careful because the road floor is very slippery due to rain.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-travel-u4-l6"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "subject-i-ga"
      ],
      "shortlistRank": 19,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1371",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그녀는 마치 모든 사실을 다 알고 있는 것처럼 보였어요.",
      "recognitionAnswerEn": "She looked as if she already knew all the facts.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l2"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 20,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1387",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "추석 명절에 온 가족이 시골 할머니 댁에 모였어요.",
      "recognitionAnswerEn": "The whole family gathered at the country grandmother's house on Chuseok holiday.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-daily-u4-l11",
        "sn5-daily-u4-l5"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-e",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 21,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1722",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "해수욕장 구조원이 바다에 빠진 아기를 구했어요.",
      "recognitionAnswerEn": "The beach lifeguard saved the baby drowning in the sea.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-work-u4-l2"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 22,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1795",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "맥주를 마실 때 안주로 고소한 과자를 곁들였어요.",
      "recognitionAnswerEn": "When drinking beer, I paired it with savory chips as a side dish.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-food-u3-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "when-ttae"
      ],
      "shortlistRank": 23,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1885",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "공휴일이 겹쳐서 다음 주 월요일이 임시 공휴일이 되었어요.",
      "recognitionAnswerEn": "Because holidays overlapped, next Monday became a temporary public holiday.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-daily-u4-l11"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "past-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 24,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1890",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 시험 성적표를 보이며 부모님께 자랑을 늘어놓았어요.",
      "recognitionAnswerEn": "He boasted to his parents showing his exam report card.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 25,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1929",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 식물 껍질은 독성이 없어 식용으로 가능합니다.",
      "recognitionAnswerEn": "This plant skin has no toxicity, so it is possible for edible use.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-food-u3-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "formal-nida",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 26,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1469",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 대학교에서 독일 문학을 깊이 전공하고 있어요.",
      "recognitionAnswerEn": "He is deeply majoring in German literature at university.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-travel-u4-l6"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 27,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0905",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "대학원에 진학해서 깊이 공부하고 싶어요.",
      "recognitionAnswerEn": "I want to enter graduate school and study deeply.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-study-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "because-aseo",
        "location-e",
        "present-polite",
        "want-go-sipda"
      ],
      "shortlistRank": 28,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1104",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "여름에는 시원한 냉국수를 말아 먹으면 최고예요.",
      "recognitionAnswerEn": "In summer, eating cool cold noodles is the best.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-food-u3-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "copula-ieyo",
        "if-myeon",
        "object-eul-reul",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 29,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1603",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "경험은 돈으로 환산할 수 없는 소중한 가치가 있어요.",
      "recognitionAnswerEn": "Experience has a precious value that cannot be converted into money.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "can-su-itda",
        "existence-itda",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 30,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1882",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "실습생들이 매일 내과 병동의 실습 일지를 작성해요.",
      "recognitionAnswerEn": "Trainees write the internal medicine ward training log every day.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-study-u4-l6"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 31,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1069",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "수면 부족으로 낮에 집중하기가 어려워요.",
      "recognitionAnswerEn": "It is difficult to concentrate during the day due to a lack of sleep.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l1"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "direction-euro",
        "present-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 32,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1115",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "매년 봄이 되면 벚꽃 축제가 개최돼요.",
      "recognitionAnswerEn": "The cherry blossom festival is held every spring.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-daily-u4-l10"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "if-myeon",
        "present-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 33,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1116",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "달력에서 시험 날짜를 빨간색으로 표시했어요.",
      "recognitionAnswerEn": "I marked the exam date in red on the calendar.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-daily-u4-l8"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "direction-euro",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 34,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1220",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "미술관 내부에서는 사진 촬영을 금지하고 있어요.",
      "recognitionAnswerEn": "Photo taking is prohibited inside the art gallery.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-travel-u4-l5"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 35,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1324",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "한여름의 무더위를 식히려고 시원한 수박을 먹었어요.",
      "recognitionAnswerEn": "I ate cool watermelon to cool down midsummer's hot weather.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-nature-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "possessive-ui"
      ],
      "shortlistRank": 36,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1587",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "합격 여부가 너무 궁금해서 메일함을 자주 확인해요.",
      "recognitionAnswerEn": "I check the mailbox frequently because I am curious about passing.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-feelings-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 37,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1687",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "아파트 경비원이 입구 주차장 관리를 하십니다.",
      "recognitionAnswerEn": "The apartment security guard manages the entrance parking lot.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-work-u4-l3"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "formal-nida",
        "honorific-si",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 38,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1741",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "공장에서 일하는 기계공들이 큰 기계를 수리하고 있어요.",
      "recognitionAnswerEn": "Mechanics working in the factory are repairing a big machine.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-work-u4-l4"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 39,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1791",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "박물관 입구에 있는 안내소에서 오디오 가이드를 받았어요.",
      "recognitionAnswerEn": "I received an audio guide at the information desk at the museum entrance.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "sourceSectionOrder": 5,
      "patternTags": [
        "location-e",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 40,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1083",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "수업 시간에 질문이 있으면 손을 올리세요.",
      "recognitionAnswerEn": "Please raise your hand if you have a question during class.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-actions-u5-l8"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "honorific-si",
        "if-myeon",
        "imperative-seyo",
        "object-eul-reul",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 1,
      "shortlistScore": 125,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1639",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "두 나라는 군사 동맹을 맺고 국경 보안을 강화했어요.",
      "recognitionAnswerEn": "The two countries made a military alliance and strengthened border security.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-travel-u5-l12",
        "sn7-travel-u6-l5"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 2,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1790",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "눈이 충혈되고 아파서 안과 병원에 다녀왔어요.",
      "recognitionAnswerEn": "I went to the ophthalmology hospital because my eyes were bloodshot and hurt.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-health-u3-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "and-go",
        "location-e",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 3,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1204",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "아버지가 주말에 친구들과 골프를 치러 필드에 가십니다.",
      "recognitionAnswerEn": "Father goes to the field to play golf with friends over the weekend.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l8"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "formal-nida",
        "honorific-si",
        "location-e",
        "object-eul-reul",
        "subject-i-ga",
        "time-expression",
        "with-hago-wa"
      ],
      "shortlistRank": 4,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1224",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "환자의 혈압이 약을 복용한 후에 정상으로 돌아왔어요.",
      "recognitionAnswerEn": "The patient's blood pressure returned to normal after taking medicine.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-travel-u5-l12"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 5,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1886",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "물건 가격을 확인하고 판매자의 은행 계좌로 입금했어요.",
      "recognitionAnswerEn": "I checked the object price and deposited it into the seller's bank account.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-shopping-u5-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "and-go",
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "with-hago-wa"
      ],
      "shortlistRank": 6,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1211",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "사거리에서 오른쪽으로 돌면 버스 정류장이 나와요.",
      "recognitionAnswerEn": "If you turn right at the intersection, the bus stop comes out.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-travel-u5-l10"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "direction-euro",
        "if-myeon",
        "location-eseo",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 7,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1487",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "어머니가 주방에서 저녁 식사 준비를 하십니다.",
      "recognitionAnswerEn": "Mother is preparing dinner in the kitchen.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-tech-u2-l8"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "honorific-si",
        "location-eseo",
        "object-eul-reul",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 8,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1716",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "백화점에서 사은품 교환권을 들고 계산대로 갔어요.",
      "recognitionAnswerEn": "I went to the counter carrying the gift exchange voucher at the department store.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "and-go",
        "direction-euro",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 9,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1760",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "선수들의 피나는 노력 끝에 마침내 값진 승리를 거두었어요.",
      "recognitionAnswerEn": "After athletes' blood-sweating efforts, they finally achieved a value victory.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l9"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 10,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1198",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "외국인 학생들이 태권도 도장에서 발차기를 배웁니다.",
      "recognitionAnswerEn": "Foreign students learn kicking at the Taekwondo dojang.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u4-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "formal-nida",
        "location-eseo",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 11,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1203",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "마라톤 대회에서 우리 학교 선수가 우승을 거두었어요.",
      "recognitionAnswerEn": "Our school player achieved victory in the marathon competition.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l8"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 12,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1306",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 기계는 조작이 아주 단순해서 인기가 높아요.",
      "recognitionAnswerEn": "This machine's operation is very simple, so it is highly popular.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "because-aseo",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 13,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1393",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "하루 종일 이삿짐을 나르느라 온몸에 몸살이 났어요.",
      "recognitionAnswerEn": "I got a body ache all over due to carrying moving luggage all day.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-health-u3-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 14,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1619",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우리 야구 팀이 결승에 진출해서 전국적인 관심을 받아요.",
      "recognitionAnswerEn": "Our baseball team advanced to the finals, receiving nationwide interest.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u4-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 15,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1634",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우리 축구 팀 선수가 상대편 골대에 골을 넣었어요.",
      "recognitionAnswerEn": "Our soccer team player put a goal in the opponent's goal post.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u2-l9"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 16,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1659",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "간호사가 환자의 병상 간호에 최선을 다합니다.",
      "recognitionAnswerEn": "The nurse does her best in the patient's bedside nursing.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-health-u3-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "formal-nida",
        "object-eul-reul",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 17,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1669",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "동네 시장 골목에 새 빵집이 개업을 했어요.",
      "recognitionAnswerEn": "A new bakery opened business in the local market alley.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-shopping-u5-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 18,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1692",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "아파트 계약을 완료하고 계약금을 먼저 입금했어요.",
      "recognitionAnswerEn": "I completed the apartment contract and deposited the down payment first.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-shopping-u5-l1"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "with-hago-wa"
      ],
      "shortlistRank": 19,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1853",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 기술 분야에서 아주 우수한 실력을 입증받았어요.",
      "recognitionAnswerEn": "He was proved to have very excellent skills in the technology field.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 20,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1077",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "도망가는 도둑을 경찰관이 재빨리 잡았어요.",
      "recognitionAnswerEn": "The police officer quickly caught the fleeing thief.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-actions-u5-l6"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 21,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1325",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "가을이 깊어질수록 가을 노을이 더욱 아름답습니다.",
      "recognitionAnswerEn": "As autumn deepens, the autumn sunset is increasingly beautiful.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l7"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "formal-nida",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 22,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1351",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "어학 시험에서 듣기 평가 점수가 만점이 나왔어요.",
      "recognitionAnswerEn": "I got a perfect score in the listening evaluation of the language exam.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-study-u5-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 23,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1783",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 소설은 실제 사건을 바탕으로 작성되었어요.",
      "recognitionAnswerEn": "This novel was written based on a real incident.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l8"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 24,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1975",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "기존 아파트보다 새로 지은 현대식 건물이 훨씬 더 큽니다.",
      "recognitionAnswerEn": "The newly built modern building is much larger than the existing apartment.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l10"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "comparison-boda",
        "formal-nida",
        "subject-i-ga"
      ],
      "shortlistRank": 25,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1990",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "친구에게 약속 장소 위치를 알리는 문자를 보냈어요.",
      "recognitionAnswerEn": "I sent a text message notifying my friend of the appointment place location.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-tech-u2-l10",
        "sn8-people-u2-l6"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 26,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1402",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "최근 물가가 너무 많이 올라서 시장보기가 무서워요.",
      "recognitionAnswerEn": "Going grocery shopping is scary because prices of goods rose too much recently.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-shopping-u5-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "because-aseo",
        "subject-i-ga"
      ],
      "shortlistRank": 27,
      "shortlistScore": 114,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1715",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "매달 정기적으로 지출하는 지하철 교통비가 올랐어요.",
      "recognitionAnswerEn": "Subway transportation costs spent regularly every month rose.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 28,
      "shortlistScore": 114,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0743",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "기침이 멈추지 않아서 물을 마셨어요.",
      "recognitionAnswerEn": "I drank water because my coughing didn't stop.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-health-u3-l1",
        "sn6-health-u3-l2"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "because-aseo",
        "neg-an",
        "neg-ji-anta",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 29,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1199",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이번 탁구 시합에서 반드시 우승을 하고 싶어요.",
      "recognitionAnswerEn": "I definitely want to win the table tennis match this time.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u4-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "time-expression",
        "want-go-sipda"
      ],
      "shortlistRank": 30,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1888",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "자격증을 취득하려고 주말에도 도서관에서 공부해요.",
      "recognitionAnswerEn": "I study at the library even over the weekend to acquire a qualification license.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "also-do",
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 31,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1034",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "눈길을 걸을 때는 조심이 제일입니다.",
      "recognitionAnswerEn": "When walking on snowy roads, caution is number one.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "copula-ieyo",
        "object-eul-reul",
        "subject-i-ga",
        "topic-neun",
        "when-ttae"
      ],
      "shortlistRank": 32,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1079",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "닫힌 문을 앞으로 밀어서 열어 주세요.",
      "recognitionAnswerEn": "Please open the closed door pushing it forward.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-actions-u5-l8"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "because-aseo",
        "direction-euro",
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul"
      ],
      "shortlistRank": 33,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1405",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "선생님의 날카로운 물음에 학생이 대답을 망설였어요.",
      "recognitionAnswerEn": "The student hesitated to answer at the teacher's sharp question.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-actions-u4-l3",
        "sn6-study-u5-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 34,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1408",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "할머니가 흥겨운 가락의 전통 민요를 흥얼거리셔요.",
      "recognitionAnswerEn": "Grandmother hums a traditional folk song with a joyful tune.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-hobbies-u4-l3"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 35,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1793",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 과로로 몸살이 났는지 오늘 안색이 좋지 않아요.",
      "recognitionAnswerEn": "His complexion is not good today, as if he got a body ache from overwork.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-health-u3-l4"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "neg-ji-anta",
        "present-polite",
        "subject-i-ga",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 36,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2078",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "오늘은 공원에서 쉬어요.",
      "recognitionAnswerEn": "Let's rest at the park today.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-daily-u5-l6"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "location-eseo",
        "present-polite",
        "propositive-eyo",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 37,
      "shortlistScore": 110,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0187",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우산을 집에 두고 왔어요.",
      "recognitionAnswerEn": "I left my umbrella at home.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-daily-u5-l14"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "and-go",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 38,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1039",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "버스 노선이 없어서 이동에 불편을 겪어요.",
      "recognitionAnswerEn": "We experience inconvenience in moving because there is no bus route.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l6"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 39,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1055",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "현재 삶에 만족을 느끼는 사람이 행복해요.",
      "recognitionAnswerEn": "A person who feels satisfaction with their current life is happy.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn6-feelings-u5-l6"
      ],
      "sourceSectionOrder": 6,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 40,
      "shortlistScore": 109,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1844",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 부모님의 허락 없이 무단외박을 해서 꾸중을 들었어요.",
      "recognitionAnswerEn": "He was scolded because he slept out without parents' permission.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-daily-u6-l8"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 1,
      "shortlistScore": 125,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1057",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "수술이 잘 끝났다는 말에 안도의 한숨을 쉬었어요.",
      "recognitionAnswerEn": "Hearing that the surgery ended well, I breathed a sigh of relief.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u10-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 2,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1141",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "물 끓는 소리가 나자 주전자를 불에서 내렸어요.",
      "recognitionAnswerEn": "When the water boiling sound made, I took the kettle off the fire.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-tech-u3-l7"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 3,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1287",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "컵에 물을 너무 가득 따라 물이 넘쳤어요.",
      "recognitionAnswerEn": "The water overflowed because I poured it too full in the cup.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-actions-u6-l7"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "because-aseo",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 4,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1616",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "골목길에서 사나운 강아지를 보고 겁이 나 도망갔어요.",
      "recognitionAnswerEn": "Seeing a fierce puppy in the alley, I fled in fear.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 5,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1644",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그들은 갈등을 피하고 극단적인 선택을 삼갔어요.",
      "recognitionAnswerEn": "They avoided conflicts and refrained from extreme choices.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-hobbies-u3-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 6,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1084",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "비가 와서 친구에게 여분의 우산을 빌려주었어요.",
      "recognitionAnswerEn": "I lent an extra umbrella to my friend because it rained.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 7,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1095",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "제 말을 잘못 듣고 그가 저를 오해했어요.",
      "recognitionAnswerEn": "He misunderstood me because he misheard my words.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-actions-u6-l7"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 8,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1654",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "가을철이 되면 공원 곳곳에 단풍이 아주 예쁩니다.",
      "recognitionAnswerEn": "When the autumn season comes, foliage is very pretty everywhere in the park.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-daily-u6-l8"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "formal-nida",
        "if-myeon",
        "location-e",
        "subject-i-ga"
      ],
      "shortlistRank": 9,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1776",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "꾸준히 한글 말하기 연습을 해서 실력이 많이 늘었어요.",
      "recognitionAnswerEn": "My skill improved a lot because I steadily practiced speaking Hangul.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 10,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1838",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "사소한 말실수 때문에 친구 사이에 오해가 생겼어요.",
      "recognitionAnswerEn": "A misunderstanding arose between friends due to a minor slip of the tongue.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "past-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 11,
      "shortlistScore": 122,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1749",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "한국어 속담인 시작이 반이다라는 말을 기억하세요.",
      "recognitionAnswerEn": "Please remember the Korean proverb saying that starting is half.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-study-u6-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "copula-ieyo",
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 12,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1134",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "마트에서 물건을 비닐봉지에 담아 들고 왔어요.",
      "recognitionAnswerEn": "I put items in a plastic bag at the mart and brought them.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-tech-u3-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "and-go",
        "location-e",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 13,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1338",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "두 부서는 동등한 권리와 책임을 지고 일해요.",
      "recognitionAnswerEn": "The two departments work bearing equal rights and responsibilities.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u10-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "present-polite",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 14,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1610",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "문제를 해결할 때는 감정 대신 객관적 관점이 중요해요.",
      "recognitionAnswerEn": "When solving problems, an objective perspective is important instead of emotions.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "topic-neun",
        "when-ttae"
      ],
      "shortlistRank": 15,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1731",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "자전거를 탈 때는 균형감을 유지하는 훈련이 필요해요.",
      "recognitionAnswerEn": "Training to maintain a sense of balance is needed when riding a bicycle.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "topic-neun",
        "when-ttae"
      ],
      "shortlistRank": 16,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1833",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "교사가 칠판에 어려운 문법의 예시 문장을 적어 주었어요.",
      "recognitionAnswerEn": "The teacher wrote example sentences of difficult grammar on the blackboard.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn5-study-u4-l1",
        "sn7-study-u6-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 17,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1049",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "면접관 앞에 서니 온몸에 긴장이 돌았어요.",
      "recognitionAnswerEn": "Standing in front of the interviewers made my whole body tense.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "past-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 18,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1052",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "칭찬을 들으니 부끄러움이 앞섰어요.",
      "recognitionAnswerEn": "Hearing praise made shyness come first.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u10-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 19,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1054",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "고향에 계신 부모님에 대한 그리움이 커요.",
      "recognitionAnswerEn": "My longing for my parents in my hometown is great.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u10-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "honorific-si",
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 20,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1090",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "운전면허를 따서 주말에 직접 차를 운전했어요.",
      "recognitionAnswerEn": "I got a driver's license and drove the car myself over the weekend.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "shortlistRank": 21,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1139",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "후라이팬에 기름을 두르고 계란 프라이를 만들었어요.",
      "recognitionAnswerEn": "I greased the frying pan and made a fried egg.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-tech-u3-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "and-go",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 22,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1227",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "방 구석에 가방을 가만히 내려두고 침대에 누웠어요.",
      "recognitionAnswerEn": "I quietly put the bag down in the room corner and lay on the bed.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "and-go",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 23,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1323",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "지진 발생으로 재난 지역에 대혼란이 찾아왔어요.",
      "recognitionAnswerEn": "Great chaos came to the disaster region due to the earthquake occurrence.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u10-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "direction-euro",
        "location-e",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 24,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1367",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "가족들이 시골 집 마당 평상에 둘러앉아 밥을 먹었어요.",
      "recognitionAnswerEn": "Family members sat around on the country house yard platform and ate.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 25,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1662",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "배우들의 명연기가 관객들에게 큰 감동을 주었어요.",
      "recognitionAnswerEn": "The actors' excellent acting gave great emotion to the audience.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 26,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1679",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "학생들이 역사 박물관으로 견학을 다녀왔어요.",
      "recognitionAnswerEn": "Students went on a field trip to the history museum.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-study-u6-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 27,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1700",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 보고서는 정부 기관의 공식력이 보장합니다.",
      "recognitionAnswerEn": "The government agency's official authority guarantees this report.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-study-u6-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "formal-nida",
        "possessive-ui",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 28,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1707",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "두 연구 결과의 관련성을 밝히는 논문을 작성했어요.",
      "recognitionAnswerEn": "I wrote a thesis revealing the relevance of the two research results.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 29,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1295",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "슬픈 영화를 본 관객들이 눈물을 조금 흘렸어요.",
      "recognitionAnswerEn": "Audiences who watched the sad movie shed some tears.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 30,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1327",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "의사 선생님의 헌신 덕분에 병이 깨끗이 나았어요.",
      "recognitionAnswerEn": "Thanks to the doctor's dedication, my disease was cured cleanly.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u10-l6"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 31,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1363",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "운동 부족으로 살이 쪄서 몸이 뚱뚱해졌어요.",
      "recognitionAnswerEn": "My body got chubby because I gained weight due to a lack of exercise.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "direction-euro",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 32,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1383",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 가죽 코트를 걸쳐서 겨울 멋을 냈어요.",
      "recognitionAnswerEn": "He dressed cool for winter wearing a leather coat.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 33,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1621",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "경찰관이 횡단보도를 무단 횡단하는 보행자에게 경고했어요.",
      "recognitionAnswerEn": "The police officer warned the pedestrian crossing the crosswalk illegally.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l2",
        "sn8-travel-u7-l8"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 34,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1653",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "고향에 대한 그리움을 가슴속에 깊이 묻었어요.",
      "recognitionAnswerEn": "I buried my longing for my hometown deep in my heart.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l1"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 35,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1694",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "준비 과정 없이 사업을 시작하면 고생길이 열려요.",
      "recognitionAnswerEn": "If you start a business without a preparation process, a tough path opens.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l3"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "if-myeon",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 36,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1766",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "서로 간의 깊은 신뢰가 깨지면 관계 회복이 어려워요.",
      "recognitionAnswerEn": "If deep trust in each other is broken, relationship recovery is hard.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l4"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "if-myeon",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 37,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1859",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 계약 조건은 우리 회사에 매우 유리하게 작성되었어요.",
      "recognitionAnswerEn": "This contract condition was written very advantageously for our company.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u11-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "location-e",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 38,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1063",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "강아지가 얌전해서 말썽을 부리지 않아요.",
      "recognitionAnswerEn": "The puppy is gentle so it doesn't cause trouble.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u10-l2"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "because-aseo",
        "neg-an",
        "neg-ji-anta",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 39,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1866",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그의 주장에는 근거가 부족해 의심을 지울 수 없어요.",
      "recognitionAnswerEn": "I cannot erase suspicion because his claim lacks basis.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "sourceSectionOrder": 7,
      "patternTags": [
        "can-su-itda",
        "object-eul-reul",
        "possessive-ui",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 40,
      "shortlistScore": 111,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1370",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "회의실에서 두 사람이 테이블을 마주 보고 앉았어요.",
      "recognitionAnswerEn": "The two people sat facing the table in the meeting room.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l11",
        "sn8-people-u2-l9"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "counter-phrase",
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 1,
      "shortlistScore": 125,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1401",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "합격했다는 소식을 듣고 부모님이 무척 기뻐하셨어요.",
      "recognitionAnswerEn": "My parents were exceedingly happy hearing the news of passing.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u7-l2",
        "sn8-feelings-u7-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "honorific-si",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 2,
      "shortlistScore": 125,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1772",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "경찰관이 사고 현장 주변에서 목격자의 신원을 확인했어요.",
      "recognitionAnswerEn": "The police officer verified the witness's identity around the accident scene.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u3-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 3,
      "shortlistScore": 125,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1174",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이번 달에는 여행 때문에 지출이 아주 많았어요.",
      "recognitionAnswerEn": "This month, expenses were very high due to travel.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u8-l4",
        "sn8-shopping-u4-l6"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "past-polite",
        "subject-i-ga",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 4,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1183",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "은행 현금인출기에서 돈을 뽑을 때 수수료가 발생했어요.",
      "recognitionAnswerEn": "A fee incurred when withdrawing money from the bank ATM.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-shopping-u4-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 5,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1188",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "제품에 하자가 있어서 매장에 환불을 요청했어요.",
      "recognitionAnswerEn": "I requested a refund at the store because there was a defect in the product.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 6,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1360",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "문득 어릴 때 도서관에서 책을 읽던 기억이 떠올랐어요.",
      "recognitionAnswerEn": "Suddenly the memory of reading books in the library when young came to mind.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-actions-u7-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 7,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1490",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "시원한 강가 잔디밭에 돗자리를 펴고 누웠어요.",
      "recognitionAnswerEn": "I spread a mat and lay down on the cool riverside lawn.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u8-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 8,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1845",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "겨울 날씨가 매우 추우니 외출할 때 옷을 따뜻이 입으세요.",
      "recognitionAnswerEn": "Since the winter weather is very cold, dress warmly when going out.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u7-l10"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 9,
      "shortlistScore": 124,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1193",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "안경 렌즈에 흠집이 나서 안경원에 가서 바꿨어요.",
      "recognitionAnswerEn": "I went to the optician's shop and changed the lenses because they got scratched.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-shopping-u4-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "location-e",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 10,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1358",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "싸움이 나서 경찰이 상대를 때린 남자를 연행했어요.",
      "recognitionAnswerEn": "The police arrested the man who hit the opponent because a fight broke out.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-actions-u7-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "shortlistRank": 11,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1380",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그녀는 길고 검은 머리칼을 단정하게 묶었어요.",
      "recognitionAnswerEn": "She tied her long black hair neatly.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u3-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 12,
      "shortlistScore": 123,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1466",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "대한민국 국민은 국방과 납세의 의무가 있습니다.",
      "recognitionAnswerEn": "Republic of Korea citizens have duties of national defense and tax payment.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "existence-itda",
        "formal-nida",
        "possessive-ui",
        "subject-i-ga",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 13,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1655",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 화목하고 건강한 가정을 꾸리는 것이 꿈이에요.",
      "recognitionAnswerEn": "It is his dream to build a harmonious and healthy household.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l10"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "copula-ieyo",
        "object-eul-reul",
        "subject-i-ga",
        "topic-neun",
        "with-hago-wa"
      ],
      "shortlistRank": 14,
      "shortlistScore": 118,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1160",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "여동생이 귀여운 인형을 안고 침대에서 자고 있어요.",
      "recognitionAnswerEn": "My younger sister is sleeping on the bed holding a cute doll.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l9"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 15,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1194",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "어깨가 아파서 백팩의 가방끈 길이를 조절했어요.",
      "recognitionAnswerEn": "I adjusted the backpack bag strap length because my shoulder hurt.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-shopping-u4-l6"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite",
        "possessive-ui",
        "subject-i-ga"
      ],
      "shortlistRank": 16,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1304",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "비가 쏟아졌지만 다행히 우산을 챙겨서 다행이에요.",
      "recognitionAnswerEn": "It poured rain, but luckily I packed an umbrella so it's fortunate.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u8-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "but-jiman",
        "copula-ieyo",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 17,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1334",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 옷은 디자인이 아주 독특해서 눈길을 끌어요.",
      "recognitionAnswerEn": "This clothing's design is very unique, so it attracts eyes.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u7-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 18,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1362",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "부모님은 두 자녀를 차별 없이 똑같이 사랑하셔요.",
      "recognitionAnswerEn": "Parents love two children equally without discrimination.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u7-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 19,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1394",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "요리를 잘 못해서 보통 주말에는 외식을 해요.",
      "recognitionAnswerEn": "I usually eat out on weekends because I can't cook well.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-actions-u7-l4",
        "sn8-feelings-u9-l6"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "present-polite",
        "time-expression",
        "topic-neun"
      ],
      "shortlistRank": 20,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1407",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "주말에 머리를 새로 하려고 단골 미용실에 예약했어요.",
      "recognitionAnswerEn": "I reserved at my regular hair salon to do my hair newly over the weekend.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "shortlistRank": 21,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1476",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "우리 집은 거실 면적이 넓어서 탁 트인 느낌을 줘요.",
      "recognitionAnswerEn": "Our house gives an open feeling because the living room area is wide.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u7-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "if-myeon",
        "object-eul-reul",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 22,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1641",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "퇴근 후에 늦게 귀가하여 씻고 바로 침대에 누웠어요.",
      "recognitionAnswerEn": "I returned home late after work, washed, and lay on the bed right away.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "location-e",
        "past-polite",
        "present-polite",
        "time-expression"
      ],
      "shortlistRank": 23,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1775",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그들은 결혼식을 마치고 깨끗한 아파트에서 신혼을 시작해요.",
      "recognitionAnswerEn": "They finished the wedding and start new marriage in a clean apartment.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u3-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "shortlistRank": 24,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1821",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 소설은 나라를 구한 전쟁 영웅의 이야기입니다.",
      "recognitionAnswerEn": "This novel is a story of a war hero who saved the country.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l11"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "copula-ieyo",
        "formal-nida",
        "object-eul-reul",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 25,
      "shortlistScore": 117,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1159",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "남동생이 누나 생일 케이크를 빵집에서 사 왔네요.",
      "recognitionAnswerEn": "My younger brother bought my older sister's birthday cake from the bakery.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u3-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 26,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1161",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "어린이날에 많은 어린이들이 놀이공원에서 신나게 놀았어요.",
      "recognitionAnswerEn": "On Children's Day, many children played joyfully at the amusement park.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l4",
        "sn8-people-u2-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-eseo",
        "past-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "shortlistRank": 27,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1177",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "은행 창구에서 적금 통장을 개설하고 서명했어요.",
      "recognitionAnswerEn": "I opened an installment savings bankbook at the bank counter and signed.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 28,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1359",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "기차가 플랫폼을 떠나 서울로 향하기 시작했어요.",
      "recognitionAnswerEn": "The train left the platform and started heading to Seoul.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u8-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 29,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1409",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "한민족은 한반도에서 오랜 역사를 함께 해 왔어요.",
      "recognitionAnswerEn": "The Korean ethnic group has shared a long history in the Korean peninsula.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l10"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "shortlistRank": 30,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1671",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "호텔 객실 내부가 깨끗하고 침대가 편해요.",
      "recognitionAnswerEn": "The hotel guest room interior is clean and the bed is comfortable.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u8-l3"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "present-polite",
        "subject-i-ga",
        "with-hago-wa"
      ],
      "shortlistRank": 31,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1721",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "이 계약서는 법적 구속력을 지닌 문서입니다.",
      "recognitionAnswerEn": "This contract is a document bearing legal binding force.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-actions-u7-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "copula-ieyo",
        "formal-nida",
        "object-eul-reul",
        "topic-neun"
      ],
      "shortlistRank": 32,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1765",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 자신이 세운 도덕적 신념에 따라 행동해요.",
      "recognitionAnswerEn": "He acts according to the moral beliefs he established.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u8-l7"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 33,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1835",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "어른을 만나면 머리를 숙여 인사하는 것이 기본 예의예요.",
      "recognitionAnswerEn": "Greeting by bowing your head when meeting elders is basic courtesy.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u7-l6"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "copula-ieyo",
        "if-myeon",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "shortlistRank": 34,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1884",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "기차역 매표소 앞에 우리 일행이 모여 표를 샀어요.",
      "recognitionAnswerEn": "Our party gathered in front of the train station ticket office and bought tickets.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u7-l3",
        "sn8-travel-u9-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 35,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1930",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "그는 항상 예의 바르고 정직한 영국의 신사 같습니다.",
      "recognitionAnswerEn": "He always seems like a polite and honest English gentleman.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-people-u2-l11"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "and-go",
        "formal-nida",
        "possessive-ui",
        "topic-neun"
      ],
      "shortlistRank": 36,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2093",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "방은 작지만 창문이 커요.",
      "recognitionAnswerEn": "The room is small, but the window is big.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-feelings-u8-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "but-jiman",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "shortlistRank": 37,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s2094",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "비가 오지만 공원에 가요.",
      "recognitionAnswerEn": "It is raining, but I am going to the park.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u7-l4"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "but-jiman",
        "location-e",
        "present-polite",
        "subject-i-ga"
      ],
      "shortlistRank": 38,
      "shortlistScore": 116,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1297",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "국제 관광객이 늘어나 공항이 아주 붐빕니다.",
      "recognitionAnswerEn": "Airports are very crowded because international tourists increased.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-actions-u7-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "formal-nida",
        "subject-i-ga"
      ],
      "shortlistRank": 39,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s1725",
      "mode": "recognition",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the English meaning that matches the Korean sentence.",
      "canonicalAnswer": "두 국가는 국경 분쟁 상황을 국제법에 따라 조율했어요.",
      "recognitionAnswerEn": "The two nations coordinated the border dispute situation according to international law.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "sourceLessonIds": [
        "sn8-travel-u9-l2"
      ],
      "sourceSectionOrder": 8,
      "patternTags": [
        "because-aseo",
        "object-eul-reul",
        "past-polite"
      ],
      "shortlistRank": 40,
      "shortlistScore": 115,
      "authoredBy": "GPT-5.6 Thinking / CB4 author",
      "authoredRevision": "curated-sentence-exam-v1-cb4",
      "reviewStatus": "not-required-by-cb4"
    },
    {
      "id": "s0897",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-feelings-u1-l1"
      ],
      "canonicalAnswer": "아직 학교에 도착하지 않았어요.",
      "englishMeaning": "I have not arrived at school yet.",
      "patternTags": [
        "location-e",
        "neg-an",
        "neg-ji-anta",
        "past-polite"
      ],
      "sourceCandidateClass": "canonical",
      "existingExamPromptEn": "Speaking politely to a classmate about an event that already happened, express this complete lesson sentence: “I have not arrived at school yet.” Use the lesson expression meaning “still / not yet”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:neg-an"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s0897: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and past-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "earlier today, to a classmate, tell the complete lesson sentence meaning “I have not arrived at school yet.” using the word \"도착하지\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s1028",
      "mode": "typed",
      "sourceSectionOrder": 5,
      "sourceLessonIds": [
        "sn5-feelings-u4-l1"
      ],
      "canonicalAnswer": "어려운 상황에서도 희망을 잃지 마세요.",
      "englishMeaning": "Please do not lose hope even in difficult situations.",
      "patternTags": [
        "also-do",
        "honorific-si",
        "imperative-seyo",
        "neg-ji-anta",
        "object-eul-reul"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Speaking respectfully in a senior social context, make this complete lesson request: “Please do not lose hope even in difficult situations.” Use the lesson expression meaning “hope / aspiration”.",
      "ambiguityFlags": [],
      "plausibleVariantCount": 0,
      "capacityReasons": [
        "five-attempt-tag-capacity:also-do"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1028: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and respectful-register, polite-imperative cues, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "politely, tell the complete lesson sentence meaning “Please do not lose hope even in difficult situations.” using the word \"상황에서도\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s1938",
      "mode": "typed",
      "sourceSectionOrder": 5,
      "sourceLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "canonicalAnswer": "저는 그 소문에 대해 전혀 알지 못합니다.",
      "englishMeaning": "I do not know about that rumor at all.",
      "patternTags": [
        "formal-nida",
        "neg-mot",
        "topic-neun"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “I do not know about that rumor at all”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 4,
      "capacityReasons": [
        "five-attempt-tag-capacity:neg-mot"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1938: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and formal-register cue, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [
          "communicative-act-not-forced",
          "register-not-forced",
          "topic-or-focus-not-forced"
        ],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, in a formal situation, tell the complete lesson sentence meaning “I do not know about that rumor at all.” using the word \"못합니다\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2045",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-actions-u1-l3"
      ],
      "canonicalAnswer": "네, 다시 말씀드릴게요.",
      "englishMeaning": "Yes, I will say it again.",
      "patternTags": [
        "future-geoyeyo"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “Yes, I will say it again”.",
      "ambiguityFlags": [
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 1,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2045: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [
          "time-or-tense-not-forced"
        ],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “Yes, I will say it again.” using the word \"말씀드릴게요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2061",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-grammar-u1-l3"
      ],
      "canonicalAnswer": "이것은 책이 아니에요.",
      "englishMeaning": "This is not a book.",
      "patternTags": [
        "copula-negative-anieyo",
        "topic-neun"
      ],
      "sourceCandidateClass": "finite",
      "existingExamPromptEn": "Treating this nearby object as the topic, correct a classmate in ordinary polite Korean by saying that it is not a book.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2061: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, to a classmate, tell the complete lesson sentence meaning “This is not a book.” using the word \"아니에요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2064",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-food-u1-l3"
      ],
      "canonicalAnswer": "이것은 커피가 아니에요.",
      "englishMeaning": "This is not coffee.",
      "patternTags": [
        "copula-negative-anieyo",
        "topic-neun"
      ],
      "sourceCandidateClass": "finite",
      "existingExamPromptEn": "Treating this nearby object as the topic, correct a classmate in ordinary polite Korean by saying that it is not coffee.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2064: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, to a classmate, tell the complete lesson sentence meaning “This is not coffee.” using the word \"아니에요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2154",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-food-u1-l5"
      ],
      "canonicalAnswer": "커피를 마시고 싶어요.",
      "englishMeaning": "I want to drink coffee.",
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "want-go-sipda"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:want-go-sipda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2154: the supplied Korean fragments reconstruct the canonical through only the required want-go-sipda ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Recast the supplied Korean sentence with the required predicate construction. Source 1: 커피를 마셔요. Use -고 싶어요 as the required Korean construction. Replace the exact Korean ending \"마셔요\" with \"마시고 싶어요\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "recast-predicate",
        "requiredPatternTag": "want-go-sipda",
        "requiredConstructionCue": "-고 싶어요",
        "sourceFragments": [
          "커피를 마셔요."
        ],
        "sourceEnding": "마셔요",
        "targetEnding": "마시고 싶어요",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2188",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l19"
      ],
      "canonicalAnswer": "이 노래는 조금 어렵지만 매일 연습하면 잘할 수 있어요.",
      "englishMeaning": "This song is a little hard, but if I practice every day I can do it.",
      "patternTags": [
        "but-jiman",
        "can-su-itda",
        "if-myeon",
        "present-polite",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 4,
      "capacityReasons": [
        "five-attempt-tag-capacity:but-jiman"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2188: the supplied Korean fragments reconstruct the canonical through only the required but-jiman ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 이 노래는 조금 어려워요. Source 2: 매일 연습하면 잘할 수 있어요. Use -지만 as the required Korean construction. Replace the exact Korean ending \"려워요\" with \"렵지만\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "but-jiman",
        "requiredConstructionCue": "-지만",
        "sourceFragments": [
          "이 노래는 조금 어려워요.",
          "매일 연습하면 잘할 수 있어요."
        ],
        "sourceEnding": "려워요",
        "targetEnding": "렵지만",
        "preservedClauseEvidence": [
          {
            "patternTag": "if-myeon",
            "sourceFragmentIndex": 1,
            "visibleSurface": "연습하면"
          }
        ],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2190",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-daily-u1-l6"
      ],
      "canonicalAnswer": "저는 아침을 안 먹지만 커피는 마셔요.",
      "englishMeaning": "I don't eat breakfast, but I do drink coffee.",
      "patternTags": [
        "but-jiman",
        "neg-an",
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 5,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:but-jiman",
        "five-attempt-tag-capacity:neg-an"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2190: the supplied Korean fragments reconstruct the canonical through only the required but-jiman ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 저는 아침을 안 먹어요. Source 2: 커피는 마셔요. Use -지만 as the required Korean construction. Replace the exact Korean ending \"어요\" with \"지만\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "but-jiman",
        "requiredConstructionCue": "-지만",
        "sourceFragments": [
          "저는 아침을 안 먹어요.",
          "커피는 마셔요."
        ],
        "sourceEnding": "어요",
        "targetEnding": "지만",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2206",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-study-u2-l5"
      ],
      "canonicalAnswer": "이번 시험은 지난번보다 더 잘 볼 거예요.",
      "englishMeaning": "I'll do better on this exam than last time.",
      "patternTags": [
        "comparison-boda",
        "future-geoyeyo",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:comparison-boda",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2206: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, later, to a classmate, tell the complete lesson sentence meaning “I'll do better on this exam than last time.” using the word \"지난번보다\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2214",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-food-u1-l13"
      ],
      "canonicalAnswer": "이 식당은 조금 비싸지만 음식이 맛있어서 자주 가요.",
      "englishMeaning": "This restaurant is a bit pricey, but the food is tasty so I go often.",
      "patternTags": [
        "because-aseo",
        "but-jiman",
        "present-polite",
        "subject-i-ga",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 4,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:but-jiman"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2214: the supplied Korean fragments reconstruct the canonical through only the required but-jiman ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 이 식당은 조금 비싸요. Source 2: 음식이 맛있어서 자주 가요. Use -지만 as the required Korean construction. Replace the exact Korean ending \"싸요\" with \"싸지만\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "but-jiman",
        "requiredConstructionCue": "-지만",
        "sourceFragments": [
          "이 식당은 조금 비싸요.",
          "음식이 맛있어서 자주 가요."
        ],
        "sourceEnding": "싸요",
        "targetEnding": "싸지만",
        "preservedClauseEvidence": [
          {
            "patternTag": "because-aseo",
            "sourceFragmentIndex": 1,
            "visibleSurface": "맛있어서"
          }
        ],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2228",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-shopping-u1-l9"
      ],
      "canonicalAnswer": "예약을 안 해서 자리에 못 앉았어요.",
      "englishMeaning": "I didn't reserve, so I couldn't get a seat.",
      "patternTags": [
        "because-aseo",
        "neg-an",
        "neg-mot",
        "object-eul-reul",
        "past-polite"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:neg-an",
        "five-attempt-tag-capacity:neg-mot"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2228: the supplied Korean fragments reconstruct the canonical through only the required because-aseo ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 예약을 안 해요. Source 2: 자리에 못 앉았어요. Use -해서 as the required Korean construction. Replace the exact Korean ending \"요\" with \"서\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "because-aseo",
        "requiredConstructionCue": "-해서",
        "sourceFragments": [
          "예약을 안 해요.",
          "자리에 못 앉았어요."
        ],
        "sourceEnding": "요",
        "targetEnding": "서",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2253",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-food-u2-l4"
      ],
      "canonicalAnswer": "다음에 시간 되면 같이 밥 먹어요.",
      "englishMeaning": "Let's eat together next time you're free.",
      "patternTags": [
        "if-myeon",
        "present-polite",
        "propositive-eyo",
        "time-expression"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:propositive-eyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2253: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 다음에 시간 돼요. Source 2: 같이 밥 먹어요. Use -면 as the required Korean construction. Replace the exact Korean ending \"돼요\" with \"되면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-면",
        "sourceFragments": [
          "다음에 시간 돼요.",
          "같이 밥 먹어요."
        ],
        "sourceEnding": "돼요",
        "targetEnding": "되면",
        "preservedClauseEvidence": [
          {
            "patternTag": "propositive-eyo",
            "sourceFragmentIndex": 1,
            "visibleSurface": "먹어요"
          }
        ],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2259",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-travel-u1-l5"
      ],
      "canonicalAnswer": "감기 때문에 학교에 못 갔어요.",
      "englishMeaning": "I couldn't go to school because of a cold.",
      "patternTags": [
        "location-e",
        "neg-mot",
        "past-polite"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:neg-mot"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2259: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and past-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "earlier today, to a classmate, tell the complete lesson sentence meaning “I couldn't go to school because of a cold.” using the word \"갔어요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2264",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-study-u2-l3"
      ],
      "canonicalAnswer": "생각보다 시험이 어렵지 않았어요.",
      "englishMeaning": "The exam wasn't as hard as I thought.",
      "patternTags": [
        "comparison-boda",
        "neg-ji-anta",
        "past-polite",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:comparison-boda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2264: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and past-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, earlier today, to a classmate, tell the complete lesson sentence meaning “The exam wasn't as hard as I thought.” using the word \"생각보다\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2285",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-actions-u1-l7"
      ],
      "canonicalAnswer": "안 매운 걸로 추천해 주세요.",
      "englishMeaning": "Please recommend something not spicy.",
      "patternTags": [
        "imperative-seyo",
        "neg-an"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:neg-an"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2285: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and polite-imperative cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "politely, tell the complete lesson sentence meaning “Please recommend something not spicy.” using the word \"주세요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2327",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-travel-u1-l15"
      ],
      "canonicalAnswer": "여기에서 세워 주세요.",
      "englishMeaning": "Please stop here.",
      "patternTags": [
        "imperative-seyo",
        "location-eseo"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2327: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and polite-imperative cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "politely, tell the complete lesson sentence meaning “Please stop here.” using the word \"여기에서\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2343",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-travel-u3-l6"
      ],
      "canonicalAnswer": "곧 도착할 거예요.",
      "englishMeaning": "I'll arrive soon.",
      "patternTags": [
        "future-geoyeyo",
        "time-expression"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced"
      ],
      "plausibleVariantCount": 1,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2343: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I'll arrive soon.” using the word \"거예요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2372",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-shopping-u3-l7"
      ],
      "canonicalAnswer": "생각보다 안 비싸요.",
      "englishMeaning": "It's not as expensive as I thought.",
      "patternTags": [
        "comparison-boda",
        "neg-an",
        "present-polite"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced"
      ],
      "plausibleVariantCount": 1,
      "capacityReasons": [
        "five-attempt-tag-capacity:comparison-boda",
        "five-attempt-tag-capacity:neg-an"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2372: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "to a classmate, tell the complete lesson sentence meaning “It's not as expensive as I thought.” using the word \"생각보다\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2417",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-actions-u3-l6"
      ],
      "canonicalAnswer": "푹 자면 금방 나을 거예요.",
      "englishMeaning": "If you sleep well, you'll recover soon.",
      "patternTags": [
        "future-geoyeyo",
        "if-myeon"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2417: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 푹 자요. Source 2: 금방 나을 거예요. Use -면 as the required Korean construction. Replace the exact Korean ending \"요\" with \"면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-면",
        "sourceFragments": [
          "푹 자요.",
          "금방 나을 거예요."
        ],
        "sourceEnding": "요",
        "targetEnding": "면",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2621",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-travel-u1-l20"
      ],
      "canonicalAnswer": "월급을 받으면 부모님 선물을 살 거예요.",
      "englishMeaning": "When I get paid, I'll buy my parents a gift.",
      "patternTags": [
        "future-geoyeyo",
        "if-myeon",
        "object-eul-reul"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2621: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 월급을 받아요. Source 2: 부모님 선물을 살 거예요. Use -으면 as the required Korean construction. Replace the exact Korean ending \"아요\" with \"으면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-으면",
        "sourceFragments": [
          "월급을 받아요.",
          "부모님 선물을 살 거예요."
        ],
        "sourceEnding": "아요",
        "targetEnding": "으면",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2631",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-nature-u1-l7"
      ],
      "canonicalAnswer": "오후에는 비가 그칠 거예요.",
      "englishMeaning": "The rain will stop in the afternoon.",
      "patternTags": [
        "future-geoyeyo",
        "subject-i-ga",
        "time-expression"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2631: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, later, to a classmate, tell the complete lesson sentence meaning “The rain will stop in the afternoon.” using the word \"오후에는\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2697",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-daily-u1-l7"
      ],
      "canonicalAnswer": "시간 날 때 같이 영화 봐요.",
      "englishMeaning": "Let's watch a movie when we have time.",
      "patternTags": [
        "present-polite",
        "propositive-eyo",
        "when-ttae"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:propositive-eyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2697: the supplied Korean fragments reconstruct the canonical through only the required when-ttae ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 시간 나요. Source 2: 같이 영화 봐요. Use -ㄹ 때 as the required Korean construction. Replace the exact Korean ending \"나요\" with \"날 때\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "when-ttae",
        "requiredConstructionCue": "-ㄹ 때",
        "sourceFragments": [
          "시간 나요.",
          "같이 영화 봐요."
        ],
        "sourceEnding": "나요",
        "targetEnding": "날 때",
        "preservedClauseEvidence": [
          {
            "patternTag": "propositive-eyo",
            "sourceFragmentIndex": 1,
            "visibleSurface": "봐요"
          }
        ],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s2857",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-feelings-u2-l6"
      ],
      "canonicalAnswer": "기분 나쁘게 하려던 건 아니에요.",
      "englishMeaning": "I didn't mean to upset you.",
      "patternTags": [
        "copula-negative-anieyo"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced"
      ],
      "plausibleVariantCount": 1,
      "capacityReasons": [
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2857: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "to a classmate, tell the complete lesson sentence meaning “I didn't mean to upset you.” using the word \"아니에요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3006",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-nature-u1-l9"
      ],
      "canonicalAnswer": "그 이유가 이해가 안 돼요.",
      "englishMeaning": "I don't understand that reason.",
      "patternTags": [
        "neg-an",
        "present-polite",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:neg-an"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3006: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, to a classmate, tell the complete lesson sentence meaning “I don't understand that reason.” using the word \"이유가\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3027",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-daily-u1-l11"
      ],
      "canonicalAnswer": "잠깐 시간 좀 내주실 수 있어요?",
      "englishMeaning": "Could you spare me a moment?",
      "patternTags": [
        "can-su-itda",
        "honorific-si",
        "question-polite"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3027: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and respectful-register cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "respectfully, tell the complete lesson sentence meaning “Could you spare me a moment?” using the word \"내주실\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3082",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-health-u1-l8"
      ],
      "canonicalAnswer": "감기 걸렸을 때는 물을 많이 드세요.",
      "englishMeaning": "When you have a cold, drink lots of water.",
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul",
        "when-ttae"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family",
        "register-not-forced"
      ],
      "plausibleVariantCount": 4,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3082: the supplied Korean fragments reconstruct the canonical through only the required when-ttae ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 감기 걸렸어요. Source 2: 물을 많이 드세요. Use -을 때 as the required Korean construction. Replace the exact Korean ending \"어요\" with \"을 때는\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "when-ttae",
        "requiredConstructionCue": "-을 때",
        "sourceFragments": [
          "감기 걸렸어요.",
          "물을 많이 드세요."
        ],
        "sourceEnding": "어요",
        "targetEnding": "을 때는",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3157",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-feelings-u1-l10"
      ],
      "canonicalAnswer": "아쉽지만 어쩔 수 없죠.",
      "englishMeaning": "It's a shame, but it can't be helped.",
      "patternTags": [
        "but-jiman",
        "present-polite"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:but-jiman"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3157: the supplied Korean fragments reconstruct the canonical through only the required but-jiman ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 아쉬워요. Source 2: 어쩔 수 없죠. Use -지만 as the required Korean construction. Replace the exact Korean ending \"쉬워요\" with \"쉽지만\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "but-jiman",
        "requiredConstructionCue": "-지만",
        "sourceFragments": [
          "아쉬워요.",
          "어쩔 수 없죠."
        ],
        "sourceEnding": "쉬워요",
        "targetEnding": "쉽지만",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3184",
      "mode": "typed",
      "sourceSectionOrder": 6,
      "sourceLessonIds": [
        "sn6-tech-u2-l8"
      ],
      "canonicalAnswer": "교수님께서 이메일로 회의 자료를 보내셨습니다.",
      "englishMeaning": "The professor sent the meeting materials by email.",
      "patternTags": [
        "direction-euro",
        "formal-nida",
        "honorific-si",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3184: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and formal-register, respectful-register cues, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, in a formal situation, tell the complete lesson sentence meaning “The professor sent the meeting materials by email.” using the word \"보내셨습니다\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3188",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-feelings-u1-l11"
      ],
      "canonicalAnswer": "도움이 필요하시면 언제든지 제게 말씀해 주십시오.",
      "englishMeaning": "If you need help, please tell me anytime.",
      "patternTags": [
        "formal-nida",
        "honorific-si",
        "if-myeon",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "productive-clause-family",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3188: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 도움이 필요하세요. Source 2: 언제든지 제게 말씀해 주십시오. Use -면 as the required Korean construction. Replace the exact Korean ending \"하세요\" with \"하시면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-면",
        "sourceFragments": [
          "도움이 필요하세요.",
          "언제든지 제게 말씀해 주십시오."
        ],
        "sourceEnding": "하세요",
        "targetEnding": "하시면",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3208",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-feelings-u3-l4"
      ],
      "canonicalAnswer": "회의실 대기 시간이 생각보다 길어서 걱정했습니다.",
      "englishMeaning": "I was worried because the waiting time in the meeting room was longer than expected.",
      "patternTags": [
        "because-aseo",
        "comparison-boda",
        "formal-nida",
        "past-polite",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "register-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 5,
      "capacityReasons": [
        "five-attempt-tag-capacity:comparison-boda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3208: the supplied Korean fragments reconstruct the canonical through only the required because-aseo ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 회의실 대기 시간이 생각보다 길어요. Source 2: 걱정했습니다. Use -어서 as the required Korean construction. Replace the exact Korean ending \"요\" with \"서\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "because-aseo",
        "requiredConstructionCue": "-어서",
        "sourceFragments": [
          "회의실 대기 시간이 생각보다 길어요.",
          "걱정했습니다."
        ],
        "sourceEnding": "요",
        "targetEnding": "서",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3214",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-travel-u3-l9"
      ],
      "canonicalAnswer": "회의실 대기 시간이 길어지면 다른 장소로 이동합시다.",
      "englishMeaning": "If the waiting time in the meeting room gets long, let's move to another place.",
      "patternTags": [
        "direction-euro",
        "if-myeon",
        "propositive-eyo",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:propositive-eyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3214: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 회의실 대기 시간이 길어져요. Source 2: 다른 장소로 이동합시다. Use -면 as the required Korean construction. Replace the exact Korean ending \"져요\" with \"지면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-면",
        "sourceFragments": [
          "회의실 대기 시간이 길어져요.",
          "다른 장소로 이동합시다."
        ],
        "sourceEnding": "져요",
        "targetEnding": "지면",
        "preservedClauseEvidence": [
          {
            "patternTag": "propositive-eyo",
            "sourceFragmentIndex": 1,
            "visibleSurface": "이동합시다"
          }
        ],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3228",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-study-u3-l7"
      ],
      "canonicalAnswer": "기획서 작성이 완료되면 즉시 과장님께 연락하십시오.",
      "englishMeaning": "When the writing of the proposal is completed, contact the manager immediately.",
      "patternTags": [
        "formal-nida",
        "honorific-si",
        "if-myeon",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 4,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3228: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 기획서 작성이 완료돼요. Source 2: 즉시 과장님께 연락하십시오. Use -면 as the required Korean construction. Replace the exact Korean ending \"돼요\" with \"되면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-면",
        "sourceFragments": [
          "기획서 작성이 완료돼요.",
          "즉시 과장님께 연락하십시오."
        ],
        "sourceEnding": "돼요",
        "targetEnding": "되면",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3240",
      "mode": "typed",
      "sourceSectionOrder": 6,
      "sourceLessonIds": [
        "sn6-study-u5-l4"
      ],
      "canonicalAnswer": "사장님의 지시 사항을 수첩에 꼼꼼히 메모하십시오.",
      "englishMeaning": "Please take notes of the president's instructions carefully in your pocket notebook.",
      "patternTags": [
        "formal-nida",
        "honorific-si",
        "location-e",
        "object-eul-reul",
        "possessive-ui"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3240: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and formal-register, respectful-register cues, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "in a formal situation, tell the complete lesson sentence meaning “Please take notes of the president's instructions carefully in your pocket notebook.” using the word \"메모하십시오\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3262",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-people-u1-l4"
      ],
      "canonicalAnswer": "제 딸은 아침에 일찍 일어납니다.",
      "englishMeaning": "My daughter gets up early in the morning.",
      "patternTags": [
        "formal-nida",
        "time-expression",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3262: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and formal-register cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, in a formal situation, tell the complete lesson sentence meaning “My daughter gets up early in the morning.” using the word \"일어납니다\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3332",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-shopping-u3-l5"
      ],
      "canonicalAnswer": "옷 사이즈가 안 맞아서 교환해야 합니다.",
      "englishMeaning": "The clothes size doesn't fit, so I must exchange them.",
      "patternTags": [
        "because-aseo",
        "formal-nida",
        "must-ya-dwaeda",
        "neg-an"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "register-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:must-ya-dwaeda",
        "five-attempt-tag-capacity:neg-an"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3332: the supplied Korean fragments reconstruct the canonical through only the required because-aseo ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 옷 사이즈가 안 맞아요. Source 2: 교환해야 합니다. Use -아서 as the required Korean construction. Replace the exact Korean ending \"아요\" with \"아서\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "because-aseo",
        "requiredConstructionCue": "-아서",
        "sourceFragments": [
          "옷 사이즈가 안 맞아요.",
          "교환해야 합니다."
        ],
        "sourceEnding": "아요",
        "targetEnding": "아서",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3364",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-study-u1-l6"
      ],
      "canonicalAnswer": "인터넷 연결이 느려져서 동영상을 볼 수 없습니다.",
      "englishMeaning": "The internet connection got slow, so I cannot watch videos.",
      "patternTags": [
        "because-aseo",
        "can-su-itda",
        "formal-nida",
        "neg-mot",
        "object-eul-reul"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "register-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:neg-mot"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3364: the supplied Korean fragments reconstruct the canonical through only the required because-aseo ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 인터넷 연결이 느려져요. Source 2: 동영상을 볼 수 없습니다. Use -어서 as the required Korean construction. Replace the exact Korean ending \"요\" with \"서\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "because-aseo",
        "requiredConstructionCue": "-어서",
        "sourceFragments": [
          "인터넷 연결이 느려져요.",
          "동영상을 볼 수 없습니다."
        ],
        "sourceEnding": "요",
        "targetEnding": "서",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3372",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-daily-u3-l7"
      ],
      "canonicalAnswer": "주말에 다른 약속이 있어서 갈 수 없습니다.",
      "englishMeaning": "I have another appointment on the weekend, so I cannot go.",
      "patternTags": [
        "because-aseo",
        "can-su-itda",
        "formal-nida",
        "neg-mot",
        "subject-i-ga",
        "time-expression"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 4,
      "capacityReasons": [
        "five-attempt-tag-capacity:neg-mot"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3372: the supplied Korean fragments reconstruct the canonical through only the required because-aseo ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 주말에 다른 약속이 있어요. Source 2: 갈 수 없습니다. Use -어서 as the required Korean construction. Replace the exact Korean ending \"어요\" with \"어서\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "because-aseo",
        "requiredConstructionCue": "-어서",
        "sourceFragments": [
          "주말에 다른 약속이 있어요.",
          "갈 수 없습니다."
        ],
        "sourceEnding": "어요",
        "targetEnding": "어서",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3379",
      "mode": "typed",
      "sourceSectionOrder": 8,
      "sourceLessonIds": [
        "sn8-people-u2-l6"
      ],
      "canonicalAnswer": "이번 모임에 모든 동료들이 참석해야 합니다.",
      "englishMeaning": "All colleagues must attend this gathering.",
      "patternTags": [
        "formal-nida",
        "location-e",
        "must-ya-dwaeda",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:must-ya-dwaeda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3379: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and formal-register cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, in a formal situation, tell the complete lesson sentence meaning “All colleagues must attend this gathering.” using the word \"동료들이\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3384",
      "mode": "typed",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-daily-u6-l5"
      ],
      "canonicalAnswer": "주말 일정을 달력에 꼼꼼하게 적어 두었습니다.",
      "englishMeaning": "I wrote down the weekend schedule carefully on the calendar.",
      "patternTags": [
        "formal-nida",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3384: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and past-time, formal-register cues, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "earlier today, in a formal situation, tell the complete lesson sentence meaning “I wrote down the weekend schedule carefully on the calendar.” using the word \"두었습니다\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3396",
      "mode": "typed",
      "sourceSectionOrder": 8,
      "sourceLessonIds": [
        "sn8-people-u3-l3"
      ],
      "canonicalAnswer": "그동안 잘 지냈는지 친구들의 안부를 묻고 싶습니다.",
      "englishMeaning": "I want to ask how my friends are doing during this time.",
      "patternTags": [
        "formal-nida",
        "object-eul-reul",
        "possessive-ui",
        "want-go-sipda"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "productive-clause-family",
        "register-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:want-go-sipda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3396: the supplied Korean fragments reconstruct the canonical through only the required want-go-sipda ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Recast the supplied Korean sentence with the required predicate construction. Source 1: 그동안 잘 지냈는지 친구들의 안부를 묻습니다. Use -고 싶습니다 as the required Korean construction. Replace the exact Korean ending \"묻습니다\" with \"묻고 싶습니다\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "recast-predicate",
        "requiredPatternTag": "want-go-sipda",
        "requiredConstructionCue": "-고 싶습니다",
        "sourceFragments": [
          "그동안 잘 지냈는지 친구들의 안부를 묻습니다."
        ],
        "sourceEnding": "묻습니다",
        "targetEnding": "묻고 싶습니다",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3406",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-daily-u3-l9"
      ],
      "canonicalAnswer": "우리는 주말 약속 일정을 미리 확인하고 만났습니다.",
      "englishMeaning": "We checked the weekend appointment schedule in advance and met.",
      "patternTags": [
        "and-go",
        "formal-nida",
        "object-eul-reul",
        "past-polite",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family",
        "register-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 6,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3406: the supplied Korean fragments reconstruct the canonical through only the required and-go ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 우리는 주말 약속 일정을 미리 확인했습니다. Source 2: 만났습니다. Use -고 as the required Korean construction. Replace the exact Korean ending \"했습니다\" with \"하고\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "and-go",
        "requiredConstructionCue": "-고",
        "sourceFragments": [
          "우리는 주말 약속 일정을 미리 확인했습니다.",
          "만났습니다."
        ],
        "sourceEnding": "했습니다",
        "targetEnding": "하고",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3447",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-nature-u1-l11"
      ],
      "canonicalAnswer": "이번 주에는 개를 꼭 데리고 갈게요.",
      "englishMeaning": "This week, I will definitely take the dog with me.",
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3447: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, later, to a classmate, tell the complete lesson sentence meaning “This week, I will definitely take the dog with me.” using the word \"갈게요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3525",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-shopping-u1-l3"
      ],
      "canonicalAnswer": "가격이 내려가면 바로 살게요.",
      "englishMeaning": "If the price goes down, I will buy it right away.",
      "patternTags": [
        "future-geoyeyo",
        "if-myeon"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3525: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 가격이 내려가요. Source 2: 바로 살게요. Use -면 as the required Korean construction. Replace the exact Korean ending \"요\" with \"면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-면",
        "sourceFragments": [
          "가격이 내려가요.",
          "바로 살게요."
        ],
        "sourceEnding": "요",
        "targetEnding": "면",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3667",
      "mode": "typed",
      "sourceSectionOrder": 8,
      "sourceLessonIds": [
        "sn8-travel-u8-l2"
      ],
      "canonicalAnswer": "예약이 없으면 오늘 못 잘라요.",
      "englishMeaning": "If there is no appointment, I cannot get a cut today.",
      "patternTags": [
        "if-myeon",
        "neg-mot",
        "present-polite"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:neg-mot"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3667: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 예약이 없어요. Source 2: 오늘 못 잘라요. Use -으면 as the required Korean construction. Replace the exact Korean ending \"어요\" with \"으면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-으면",
        "sourceFragments": [
          "예약이 없어요.",
          "오늘 못 잘라요."
        ],
        "sourceEnding": "어요",
        "targetEnding": "으면",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3687",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l6"
      ],
      "canonicalAnswer": "야구를 좋아하지만 직접 하지는 않아요.",
      "englishMeaning": "I like baseball, but I do not play it myself.",
      "patternTags": [
        "but-jiman",
        "neg-ji-anta",
        "object-eul-reul"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:but-jiman"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3687: the supplied Korean fragments reconstruct the canonical through only the required but-jiman ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 야구를 좋아해요. Source 2: 직접 하지는 않아요. Use -지만 as the required Korean construction. Replace the exact Korean ending \"해요\" with \"하지만\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "but-jiman",
        "requiredConstructionCue": "-지만",
        "sourceFragments": [
          "야구를 좋아해요.",
          "직접 하지는 않아요."
        ],
        "sourceEnding": "해요",
        "targetEnding": "하지만",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s3714",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l7"
      ],
      "canonicalAnswer": "우리 팀을 끝까지 응원할게요.",
      "englishMeaning": "I will cheer for our team until the end.",
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul",
        "until-kkaji"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3714: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I will cheer for our team until the end.” using the word \"응원할게요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3951",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-hobbies-u1-l15"
      ],
      "canonicalAnswer": "운동 목표를 포기하지 않을게요.",
      "englishMeaning": "I will not give up my exercise goal.",
      "patternTags": [
        "future-geoyeyo",
        "neg-ji-anta",
        "object-eul-reul"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3951: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I will not give up my exercise goal.” using the word \"않을게요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3973",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-work-u2-l5"
      ],
      "canonicalAnswer": "면접에서 긴장했지만 끝까지 말했어요.",
      "englishMeaning": "I was nervous in the interview, but I spoke to the end.",
      "patternTags": [
        "but-jiman",
        "location-eseo",
        "past-polite",
        "until-kkaji"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:but-jiman"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3973: the supplied Korean fragments reconstruct the canonical through only the required but-jiman ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 면접에서 긴장했어요. Source 2: 끝까지 말했어요. Use -지만 as the required Korean construction. Replace the exact Korean ending \"어요\" with \"지만\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "but-jiman",
        "requiredConstructionCue": "-지만",
        "sourceFragments": [
          "면접에서 긴장했어요.",
          "끝까지 말했어요."
        ],
        "sourceEnding": "어요",
        "targetEnding": "지만",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s4078",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-travel-u1-l10"
      ],
      "canonicalAnswer": "집 주소를 문자로 보내 드릴게요.",
      "englishMeaning": "I will send you my home address by text.",
      "patternTags": [
        "direction-euro",
        "future-geoyeyo",
        "object-eul-reul"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s4078: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I will send you my home address by text.” using the word \"드릴게요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s4164",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-daily-u1-l3"
      ],
      "canonicalAnswer": "불을 켜면 어두운 방도 밝아져요.",
      "englishMeaning": "When I turn on the light, even the dark room becomes bright.",
      "patternTags": [
        "also-do",
        "if-myeon"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:also-do"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s4164: the supplied Korean fragments reconstruct the canonical through only the required if-myeon ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 불을 켜요. Source 2: 어두운 방도 밝아져요. Use -면 as the required Korean construction. Replace the exact Korean ending \"요\" with \"면\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "if-myeon",
        "requiredConstructionCue": "-면",
        "sourceFragments": [
          "불을 켜요.",
          "어두운 방도 밝아져요."
        ],
        "sourceEnding": "요",
        "targetEnding": "면",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s4171",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-travel-u1-l13"
      ],
      "canonicalAnswer": "이 방은 아늑해서 오래 있고 싶어요.",
      "englishMeaning": "This room is cozy, so I want to stay for a long time.",
      "patternTags": [
        "because-aseo",
        "want-go-sipda"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:want-go-sipda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s4171: the supplied Korean fragments reconstruct the canonical through only the required because-aseo ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 이 방은 아늑해요. Source 2: 오래 있고 싶어요. Use -해서 as the required Korean construction. Replace the exact Korean ending \"요\" with \"서\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "because-aseo",
        "requiredConstructionCue": "-해서",
        "sourceFragments": [
          "이 방은 아늑해요.",
          "오래 있고 싶어요."
        ],
        "sourceEnding": "요",
        "targetEnding": "서",
        "preservedClauseEvidence": [
          {
            "patternTag": "want-go-sipda",
            "sourceFragmentIndex": 1,
            "visibleSurface": "있고 싶어요"
          }
        ],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s0495",
      "mode": "recognition",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-daily-u1-l4"
      ],
      "canonicalAnswer": "일 초도 기다릴 수 없어요.",
      "englishMeaning": "I cannot wait even one second.",
      "patternTags": [
        "can-su-itda",
        "counter-phrase",
        "present-polite"
      ],
      "sourceCandidateClass": "canonical",
      "existingExamPromptEn": "Speaking politely to a classmate, express this complete lesson sentence: “I cannot wait even one second.” Use the lesson expression meaning “second (time)”.",
      "ambiguityFlags": [
        "communicative-act-not-forced"
      ],
      "plausibleVariantCount": 1,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s0495: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “일 초도 기다릴 수 없어요.”.",
      "recognitionAnswerEn": "I cannot wait even one second.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s0862",
      "mode": "recognition",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-grammar-u4-l4"
      ],
      "canonicalAnswer": "월요일 또는 화요일에 연락을 드릴게요.",
      "englishMeaning": "I will contact you on Monday or Tuesday.",
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul",
        "time-expression"
      ],
      "sourceCandidateClass": "canonical",
      "existingExamPromptEn": "Speaking politely to a classmate, express this complete lesson sentence: “I will contact you on Monday or Tuesday.” Use the lesson expression meaning “or”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s0862: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “월요일 또는 화요일에 연락을 드릴게요.”.",
      "recognitionAnswerEn": "I will contact you on Monday or Tuesday.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s0982",
      "mode": "recognition",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-grammar-u4-l4"
      ],
      "canonicalAnswer": "피곤하지만 오늘 공부를 해야 해요.",
      "englishMeaning": "I am tired, but I must study today.",
      "patternTags": [
        "but-jiman",
        "must-ya-dwaeda",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Speaking politely to a classmate, express this complete lesson sentence: “I am tired, but I must study today.” Use the lesson expression meaning “but / although”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:but-jiman",
        "five-attempt-tag-capacity:must-ya-dwaeda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s0982: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “피곤하지만 오늘 공부를 해야 해요.”.",
      "recognitionAnswerEn": "I am tired, but I must study today.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s0989",
      "mode": "recognition",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-study-u1-l7"
      ],
      "canonicalAnswer": "노력하면 반드시 좋은 결과가 있을 거예요.",
      "englishMeaning": "If you try hard, there will surely be a good result.",
      "patternTags": [
        "future-geoyeyo",
        "if-myeon",
        "subject-i-ga"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Answering what or who is at issue, speaking politely to a classmate about a definite later plan, express this complete lesson sentence: “If you try hard, there will surely be a good result.” Use the lesson expression meaning “result / outcome”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s0989: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “노력하면 반드시 좋은 결과가 있을 거예요.”.",
      "recognitionAnswerEn": "If you try hard, there will surely be a good result.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s2160",
      "mode": "recognition",
      "sourceSectionOrder": 1,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l12"
      ],
      "canonicalAnswer": "한국어를 더 잘하고 싶어요.",
      "englishMeaning": "I want to speak Korean better.",
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "want-go-sipda"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:want-go-sipda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2160: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “한국어를 더 잘하고 싶어요.”.",
      "recognitionAnswerEn": "I want to speak Korean better.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s2180",
      "mode": "recognition",
      "sourceSectionOrder": 6,
      "sourceLessonIds": [
        "sn6-daily-u5-l11"
      ],
      "canonicalAnswer": "오늘은 일찍 끝내고 같이 좀 쉬어요.",
      "englishMeaning": "Let's finish early today and rest together.",
      "patternTags": [
        "and-go",
        "present-polite",
        "propositive-eyo",
        "time-expression"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:propositive-eyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2180: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “오늘은 일찍 끝내고 같이 좀 쉬어요.”.",
      "recognitionAnswerEn": "Let's finish early today and rest together.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s2209",
      "mode": "recognition",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-travel-u6-l2"
      ],
      "canonicalAnswer": "여기는 출구가 아니에요.",
      "englishMeaning": "This is not the exit.",
      "patternTags": [
        "copula-negative-anieyo",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2209: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “여기는 출구가 아니에요.”.",
      "recognitionAnswerEn": "This is not the exit.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s2245",
      "mode": "recognition",
      "sourceSectionOrder": 1,
      "sourceLessonIds": [
        "sn1-firstwords-u2-l6"
      ],
      "canonicalAnswer": "그것은 제 실수가 아니에요.",
      "englishMeaning": "That's not my mistake.",
      "patternTags": [
        "copula-negative-anieyo",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2245: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “그것은 제 실수가 아니에요.”.",
      "recognitionAnswerEn": "That's not my mistake.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s2249",
      "mode": "recognition",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-shopping-u1-l1"
      ],
      "canonicalAnswer": "이 자리는 예약석이 아니에요.",
      "englishMeaning": "This isn't a reserved seat.",
      "patternTags": [
        "copula-negative-anieyo",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2249: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “이 자리는 예약석이 아니에요.”.",
      "recognitionAnswerEn": "This isn't a reserved seat.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s2427",
      "mode": "recognition",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-health-u1-l7"
      ],
      "canonicalAnswer": "몸이 다 나으면 여행을 갈 거예요.",
      "englishMeaning": "When I'm all better, I'll go on a trip.",
      "patternTags": [
        "future-geoyeyo",
        "if-myeon",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 4,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2427: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “몸이 다 나으면 여행을 갈 거예요.”.",
      "recognitionAnswerEn": "When I'm all better, I'll go on a trip.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s3334",
      "mode": "recognition",
      "sourceSectionOrder": 5,
      "sourceLessonIds": [
        "sn5-nature-u4-l3"
      ],
      "canonicalAnswer": "옆방에서 나는 소음 때문에 잠을 못 잤습니다.",
      "englishMeaning": "I could not sleep because of the noise coming from the next room.",
      "patternTags": [
        "formal-nida",
        "neg-mot",
        "object-eul-reul",
        "past-polite"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "register-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 5,
      "capacityReasons": [
        "five-attempt-tag-capacity:neg-mot"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3334: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “옆방에서 나는 소음 때문에 잠을 못 잤습니다.”.",
      "recognitionAnswerEn": "I could not sleep because of the noise coming from the next room.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s3344",
      "mode": "recognition",
      "sourceSectionOrder": 8,
      "sourceLessonIds": [
        "sn8-feelings-u9-l9"
      ],
      "canonicalAnswer": "이 화장실은 냄새가 심해서 이용할 때 불편합니다.",
      "englishMeaning": "This restroom has a strong smell, so it is inconvenient when using it.",
      "patternTags": [
        "because-aseo",
        "formal-nida",
        "present-polite",
        "subject-i-ga",
        "when-ttae"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 5,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3344: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “이 화장실은 냄새가 심해서 이용할 때 불편합니다.”.",
      "recognitionAnswerEn": "This restroom has a strong smell, so it is inconvenient when using it.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s3348",
      "mode": "recognition",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-shopping-u3-l5"
      ],
      "canonicalAnswer": "이 셔츠에 단추가 없어서 교환하고 싶습니다.",
      "englishMeaning": "There is no button on this shirt, so I want to exchange it.",
      "patternTags": [
        "because-aseo",
        "existence-itda",
        "formal-nida",
        "location-e",
        "subject-i-ga",
        "want-go-sipda"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 5,
      "capacityReasons": [
        "five-attempt-tag-capacity:want-go-sipda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3348: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “이 셔츠에 단추가 없어서 교환하고 싶습니다.”.",
      "recognitionAnswerEn": "There is no button on this shirt, so I want to exchange it.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s3461",
      "mode": "recognition",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-travel-u2-l4"
      ],
      "canonicalAnswer": "작은 사고가 있었지만 다치지 않았어요.",
      "englishMeaning": "There was a small accident, but no one was hurt.",
      "patternTags": [
        "but-jiman",
        "existence-itda",
        "neg-an",
        "past-polite",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "particle-or-order-family",
        "productive-clause-family",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 5,
      "capacityReasons": [
        "five-attempt-tag-capacity:but-jiman",
        "five-attempt-tag-capacity:neg-an"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3461: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “작은 사고가 있었지만 다치지 않았어요.”.",
      "recognitionAnswerEn": "There was a small accident, but no one was hurt.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s3545",
      "mode": "recognition",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-daily-u6-l2"
      ],
      "canonicalAnswer": "이번 휴일에는 가족과 여행할 거예요.",
      "englishMeaning": "This holiday, I will travel with my family.",
      "patternTags": [
        "future-geoyeyo",
        "topic-neun",
        "with-hago-wa"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3545: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “이번 휴일에는 가족과 여행할 거예요.”.",
      "recognitionAnswerEn": "This holiday, I will travel with my family.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s3971",
      "mode": "recognition",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-work-u2-l4"
      ],
      "canonicalAnswer": "새 직장을 구하면 이사할 거예요.",
      "englishMeaning": "If I find a new workplace, I will move.",
      "patternTags": [
        "future-geoyeyo",
        "if-myeon"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3971: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “새 직장을 구하면 이사할 거예요.”.",
      "recognitionAnswerEn": "If I find a new workplace, I will move.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s3976",
      "mode": "recognition",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-travel-u1-l17"
      ],
      "canonicalAnswer": "회사 분위기를 직접 확인하고 싶어요.",
      "englishMeaning": "I want to check the company atmosphere in person.",
      "patternTags": [
        "object-eul-reul",
        "want-go-sipda"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:want-go-sipda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3976: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “회사 분위기를 직접 확인하고 싶어요.”.",
      "recognitionAnswerEn": "I want to check the company atmosphere in person.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s3980",
      "mode": "recognition",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-travel-u1-l17"
      ],
      "canonicalAnswer": "다른 회사에도 지원해 볼게요.",
      "englishMeaning": "I will try applying to another company too.",
      "patternTags": [
        "also-do",
        "future-geoyeyo"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:also-do",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3980: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “다른 회사에도 지원해 볼게요.”.",
      "recognitionAnswerEn": "I will try applying to another company too.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s4114",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-travel-u1-l12"
      ],
      "canonicalAnswer": "제가 길을 안내할게요.",
      "englishMeaning": "I will guide you along the way.",
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s4114: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I will guide you along the way.” using the word \"안내할게요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2070",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-feelings-u2-l1"
      ],
      "canonicalAnswer": "그것은 꿈이 아니에요.",
      "englishMeaning": "That is not a dream.",
      "patternTags": [
        "copula-negative-anieyo",
        "topic-neun"
      ],
      "sourceCandidateClass": "finite",
      "existingExamPromptEn": "Treating that object as the topic, correct a classmate in ordinary polite Korean by saying that it is not a dream.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2070: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, to a classmate, tell the complete lesson sentence meaning “That is not a dream.” using the word \"아니에요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2067",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-daily-u3-l2"
      ],
      "canonicalAnswer": "오늘은 제 생일이 아니에요.",
      "englishMeaning": "Today is not my birthday.",
      "patternTags": [
        "copula-negative-anieyo",
        "time-expression",
        "topic-neun"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “Today is not my birthday”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2067: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [
          "communicative-act-not-forced",
          "topic-or-focus-not-forced"
        ],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, to a classmate, tell the complete lesson sentence meaning “Today is not my birthday.” using the word \"아니에요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2269",
      "mode": "typed",
      "sourceSectionOrder": 1,
      "sourceLessonIds": [
        "sn1-firstwords-u1-l12"
      ],
      "canonicalAnswer": "주말에 친구를 만날 거예요.",
      "englishMeaning": "I'm going to meet a friend this weekend.",
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul",
        "time-expression"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2269: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I'm going to meet a friend this weekend.” using the word \"거예요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2207",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-daily-u1-l10"
      ],
      "canonicalAnswer": "다음 달에 새집으로 이사할 거예요.",
      "englishMeaning": "I'll move to a new place next month.",
      "patternTags": [
        "direction-euro",
        "future-geoyeyo",
        "time-expression"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2207: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I'll move to a new place next month.” using the word \"새집으로\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3602",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-actions-u1-l10"
      ],
      "canonicalAnswer": "기념일에 편지를 써 줄게요.",
      "englishMeaning": "I will write you a letter for our anniversary.",
      "patternTags": [
        "future-geoyeyo",
        "location-e"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3602: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I will write you a letter for our anniversary.” using the word \"기념일에\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s1074",
      "mode": "typed",
      "sourceSectionOrder": 6,
      "sourceLessonIds": [
        "sn6-actions-u5-l7"
      ],
      "canonicalAnswer": "오늘 저녁까지 이 보고서를 반드시 끝낼게요.",
      "englishMeaning": "I will definitely finish this report by this evening.",
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul",
        "time-expression",
        "until-kkaji"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “I will definitely finish this report by this evening”.",
      "ambiguityFlags": [
        "communicative-act-not-forced"
      ],
      "plausibleVariantCount": 1,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1074: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [
          "communicative-act-not-forced"
        ],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, to a classmate, tell the complete lesson sentence meaning “I will definitely finish this report by this evening.” using the word \"끝낼게요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2287",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-food-u1-l10"
      ],
      "canonicalAnswer": "저는 커피보다 차를 더 좋아해요.",
      "englishMeaning": "I like tea more than coffee.",
      "patternTags": [
        "comparison-boda",
        "object-eul-reul",
        "present-polite",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:comparison-boda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2287: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, to a classmate, tell the complete lesson sentence meaning “I like tea more than coffee.” using the word \"좋아해요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2587",
      "mode": "typed",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-study-u1-l5"
      ],
      "canonicalAnswer": "보고서를 내일까지 내야 해요.",
      "englishMeaning": "I have to submit the report by tomorrow.",
      "patternTags": [
        "must-ya-dwaeda",
        "object-eul-reul",
        "time-expression",
        "until-kkaji"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced"
      ],
      "plausibleVariantCount": 1,
      "capacityReasons": [
        "stage-1-five-attempt-typed-capacity",
        "five-attempt-tag-capacity:must-ya-dwaeda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2587: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "to a classmate, tell the complete lesson sentence meaning “I have to submit the report by tomorrow.” using the word \"내일까지\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2520",
      "mode": "typed",
      "sourceSectionOrder": 6,
      "sourceLessonIds": [
        "sn6-travel-u5-l8"
      ],
      "canonicalAnswer": "화장실에 불이 안 켜져요.",
      "englishMeaning": "The bathroom light won't turn on.",
      "patternTags": [
        "location-e",
        "neg-an",
        "present-polite",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "five-attempt-tag-capacity:neg-an"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2520: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, to a classmate, tell the complete lesson sentence meaning “The bathroom light won't turn on.” using the word \"화장실에\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3234",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-daily-u2-l9"
      ],
      "canonicalAnswer": "사장님께서 주간 회의에 참석하실 예정이라고 들었습니다.",
      "englishMeaning": "I heard that the president is scheduled to attend the weekly meeting.",
      "patternTags": [
        "copula-ieyo",
        "formal-nida",
        "honorific-si",
        "location-e",
        "past-polite",
        "subject-i-ga"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 4,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3234: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and past-time, formal-register, respectful-register cues, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, earlier today, in a formal situation, tell the complete lesson sentence meaning “I heard that the president is scheduled to attend the weekly meeting.” using the word \"들었습니다\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3200",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-work-u2-l6"
      ],
      "canonicalAnswer": "사장님께서 오늘 면접을 직접 진행하셨어요.",
      "englishMeaning": "The president conducted the interviews directly today.",
      "patternTags": [
        "honorific-si",
        "object-eul-reul",
        "past-polite",
        "subject-i-ga",
        "time-expression"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3200: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and past-time, respectful-register cues, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, earlier today, respectfully, tell the complete lesson sentence meaning “The president conducted the interviews directly today.” using the word \"진행하셨어요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s1092",
      "mode": "typed",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "canonicalAnswer": "선생님이 가르쳐주신 공부 팁을 꼭 기억할게요.",
      "englishMeaning": "I will definitely remember the study tip the teacher taught.",
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “I will definitely remember the study tip the teacher taught”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1092: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [
          "communicative-act-not-forced",
          "time-or-tense-not-forced",
          "topic-or-focus-not-forced"
        ],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, later, to a classmate, tell the complete lesson sentence meaning “I will definitely remember the study tip the teacher taught.” using the word \"가르쳐주신\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3075",
      "mode": "typed",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-feelings-u3-l2"
      ],
      "canonicalAnswer": "너무 걱정하지 마세요, 잘될 거예요.",
      "englishMeaning": "Don't worry too much, it'll be fine.",
      "patternTags": [
        "future-geoyeyo",
        "imperative-seyo"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3075: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time, polite-imperative cues, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "later, politely, tell the complete lesson sentence meaning “Don't worry too much, it'll be fine.” using the word \"걱정하지\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s3553",
      "mode": "typed",
      "sourceSectionOrder": 5,
      "sourceLessonIds": [
        "sn5-actions-u4-l8"
      ],
      "canonicalAnswer": "이번 설날에는 떡을 직접 만들 거예요.",
      "englishMeaning": "This Lunar New Year, I will make rice cakes myself.",
      "patternTags": [
        "future-geoyeyo",
        "object-eul-reul",
        "topic-neun"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "time-or-tense-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s3553: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and future-time cue, leaving no additional accepted Korean form to record.",
      "templateId": "lexically-anchored-production",
      "examPromptEn": "As for the established lesson topic, later, to a classmate, tell the complete lesson sentence meaning “This Lunar New Year, I will make rice cakes myself.” using the word \"설날에는\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s1454",
      "mode": "typed",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-study-u2-l4"
      ],
      "canonicalAnswer": "자신의 솔직한 감정을 적극적으로 표현해 보세요.",
      "englishMeaning": "Please actively express your honest emotions.",
      "patternTags": [
        "direction-euro",
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul",
        "possessive-ui"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “Please actively express your honest emotions”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1454: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and respectful-register, polite-imperative cues, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [
          "communicative-act-not-forced",
          "register-not-forced"
        ],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "politely, tell the complete lesson sentence meaning “Please actively express your honest emotions.” using the word \"적극적으로\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s4020",
      "mode": "typed",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-actions-u6-l4"
      ],
      "canonicalAnswer": "공부할 때 모르는 것을 메모해요.",
      "englishMeaning": "When studying, I make notes of things I do not know.",
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "when-ttae"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s4020: the supplied Korean fragments reconstruct the canonical through only the required when-ttae ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.",
      "templateId": "controlled-clause-transformation",
      "examPromptEn": "Combine the supplied Korean clauses into one sentence. Source 1: 공부해요. Source 2: 모르는 것을 메모해요. Use -ㄹ 때 as the required Korean construction. Replace the exact Korean ending \"해요\" with \"할 때\". Preserve the supplied Korean wording, particles, and order except for the required grammar change. Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "controlledClause": {
        "schemaVersion": 1,
        "operation": "combine-clauses",
        "requiredPatternTag": "when-ttae",
        "requiredConstructionCue": "-ㄹ 때",
        "sourceFragments": [
          "공부해요.",
          "모르는 것을 메모해요."
        ],
        "sourceEnding": "해요",
        "targetEnding": "할 때",
        "preservedClauseEvidence": [],
        "preserveSourceOrder": true,
        "preserveLexicalMaterial": true,
        "preserveParticles": true,
        "acceptedAnswerPolicy": "reviewed-finite-only"
      },
      "promptOrigin": "cb6b-controlled-clause-authoring"
    },
    {
      "id": "s1097",
      "mode": "typed",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-actions-u6-l6"
      ],
      "canonicalAnswer": "정직한 삶을 살기 위해 거짓말하지 마세요.",
      "englishMeaning": "Please do not lie in order to live an honest life.",
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "neg-ji-anta",
        "object-eul-reul"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “Please do not lie in order to live an honest life”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "register-not-forced"
      ],
      "plausibleVariantCount": 2,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1097: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and respectful-register, polite-imperative cues, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [
          "communicative-act-not-forced",
          "register-not-forced"
        ],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "politely, tell the complete lesson sentence meaning “Please do not lie in order to live an honest life.” using the word \"거짓말하지\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s1865",
      "mode": "typed",
      "sourceSectionOrder": 7,
      "sourceLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "canonicalAnswer": "상대방의 질문 의도를 정확히 파악하여 답변하세요.",
      "englishMeaning": "Please answer grasping the other party's question intention accurately.",
      "patternTags": [
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul",
        "possessive-ui"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “Please answer grasping the other party's question intention accurately”.",
      "ambiguityFlags": [
        "register-not-forced"
      ],
      "plausibleVariantCount": 1,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1865: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor and respectful-register, polite-imperative cues, leaving no additional accepted Korean form to record.",
      "eligibilityReauthorization": {
        "schemaVersion": 1,
        "previousTypedClass": "excluded",
        "priorAmbiguityFlags": [
          "register-not-forced"
        ],
        "resolution": "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible."
      },
      "templateId": "lexically-anchored-production",
      "examPromptEn": "politely, tell the complete lesson sentence meaning “Please answer grasping the other party's question intention accurately.” using the word \"답변하세요\".",
      "manualAlternatives": [],
      "requiresLexicalAnchor": true,
      "promptOrigin": "cb6b-ordinary-typed-authoring"
    },
    {
      "id": "s2219",
      "mode": "recognition",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-study-u1-l9"
      ],
      "canonicalAnswer": "이번 발표는 실수 없이 잘 해내고 싶어요.",
      "englishMeaning": "I want to pull off this presentation without mistakes.",
      "patternTags": [
        "object-eul-reul",
        "present-polite",
        "topic-neun",
        "want-go-sipda"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:want-go-sipda"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2219: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “이번 발표는 실수 없이 잘 해내고 싶어요.”.",
      "recognitionAnswerEn": "I want to pull off this presentation without mistakes.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s2065",
      "mode": "recognition",
      "sourceSectionOrder": 6,
      "sourceLessonIds": [
        "sn6-tech-u2-l3"
      ],
      "canonicalAnswer": "그것은 제 가방이 아니에요.",
      "englishMeaning": "That is not my bag.",
      "patternTags": [
        "copula-negative-anieyo",
        "topic-neun"
      ],
      "sourceCandidateClass": "finite",
      "existingExamPromptEn": "Treating that object as the topic, correct a classmate in ordinary polite Korean by saying that it is not your bag.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "topic-or-focus-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:copula-negative-anieyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2065: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “그것은 제 가방이 아니에요.”.",
      "recognitionAnswerEn": "That is not my bag.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s1891",
      "mode": "recognition",
      "sourceSectionOrder": 2,
      "sourceLessonIds": [
        "sn2-feelings-u1-l11"
      ],
      "canonicalAnswer": "한글 말하기 실력에 자신감을 갖고 당당히 말해 보세요.",
      "englishMeaning": "Have confidence in your Hangul speaking skill and speak up confidently.",
      "patternTags": [
        "and-go",
        "honorific-si",
        "imperative-seyo",
        "object-eul-reul"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “Have confidence in your Hangul speaking skill and speak up confidently”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "register-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1891: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “한글 말하기 실력에 자신감을 갖고 당당히 말해 보세요.”.",
      "recognitionAnswerEn": "Have confidence in your Hangul speaking skill and speak up confidently.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s1557",
      "mode": "recognition",
      "sourceSectionOrder": 3,
      "sourceLessonIds": [
        "sn3-daily-u2-l8"
      ],
      "canonicalAnswer": "그때 도서관에 두고 온 우산을 드디어 찾았어요.",
      "englishMeaning": "I finally found the umbrella I left in the library at that time.",
      "patternTags": [
        "and-go",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "when-ttae"
      ],
      "sourceCandidateClass": "excluded",
      "existingExamPromptEn": "Recognize the lesson sentence that means “I finally found the umbrella I left in the library at that time”.",
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "joint-five-attempt-allocation-feasibility"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s1557: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “그때 도서관에 두고 온 우산을 드디어 찾았어요.”.",
      "recognitionAnswerEn": "I finally found the umbrella I left in the library at that time.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    },
    {
      "id": "s2693",
      "mode": "recognition",
      "sourceSectionOrder": 4,
      "sourceLessonIds": [
        "sn4-travel-u3-l9"
      ],
      "canonicalAnswer": "같이 여행 가면 정말 재미있을 거예요.",
      "englishMeaning": "It'll be really fun if we travel together.",
      "patternTags": [
        "future-geoyeyo",
        "if-myeon"
      ],
      "sourceCandidateClass": null,
      "existingExamPromptEn": null,
      "ambiguityFlags": [
        "communicative-act-not-forced",
        "productive-clause-family",
        "time-or-tense-not-forced"
      ],
      "plausibleVariantCount": 3,
      "capacityReasons": [
        "five-attempt-tag-capacity:future-geoyeyo"
      ],
      "authoredBy": "GPT-5.6 Thinking / CB6B controlled-clause author",
      "authoredRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewStatus": "approved",
      "reviewedBy": "GPT-5.6 Sol / CB6B independent integrator",
      "reviewedAt": "2026-07-28T16:27:45Z",
      "reviewedRevision": "curated-sentence-exam-v2-cb6b-authoring",
      "reviewerNote": "Verified s2693: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.",
      "templateId": "recognition-meaning",
      "examPromptEn": "Choose the exact English meaning of “같이 여행 가면 정말 재미있을 거예요.”.",
      "recognitionAnswerEn": "It'll be really fun if we travel together.",
      "manualAlternatives": [],
      "requiresLexicalAnchor": false,
      "promptOrigin": "live-source-meaning"
    }
  ]
};
})();
