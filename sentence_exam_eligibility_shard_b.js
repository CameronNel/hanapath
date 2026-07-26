// HanaPath Sentence Examination Eligibility — Shard B (s1051–s2100).
// Plain static browser global — no build step.
//
// Packet E1B independently re-reviewed every row after comparing PRs #356 and #357.
// Edit only rows s1051–s2100 here; shared loader and audit logic live elsewhere.
(function () {
  "use strict";
  var registry = (window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS =
    window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS || {});
  registry.B = {
  "shardId": "B",
  "range": {
    "fromId": "s1051",
    "toId": "s2100",
    "fromNum": 1051,
    "toNum": 2100
  },
  "reviewedRows": {
    "s1051": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Living away from family deepens loneliness”.",
      "canonicalTargetKey": "가족과 떨어져 살면 외로움이 깊어져요.",
      "acceptedAnswers": [
        "가족과 떨어져 살면 외로움이 깊어져요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "with-hago-wa",
        "if-myeon",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1052": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Hearing praise made shyness come first”.",
      "canonicalTargetKey": "칭찬을 들으니 부끄러움이 앞섰어요.",
      "acceptedAnswers": [
        "칭찬을 들으니 부끄러움이 앞섰어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "when-ttae",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1053": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You must discard hatred in your heart to become comfortable”.",
      "canonicalTargetKey": "마음속의 미움을 버려야 편안해집니다.",
      "acceptedAnswers": [
        "마음속의 미움을 버려야 편안해집니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "must-ya-dwaeda",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1054": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My longing for my parents in my hometown is great”.",
      "canonicalTargetKey": "고향에 계신 부모님에 대한 그리움이 커요.",
      "acceptedAnswers": [
        "고향에 계신 부모님에 대한 그리움이 커요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "honorific-si",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s1055": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A person who feels satisfaction with their current life is happy”.",
      "canonicalTargetKey": "현재 삶에 만족을 느끼는 사람이 행복해요.",
      "acceptedAnswers": [
        "현재 삶에 만족을 느끼는 사람이 행복해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l6"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1056": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Dissatisfaction with the new working conditions poured out”.",
      "canonicalTargetKey": "새 근무 조건에 대한 불만이 쏟아져 나왔어요.",
      "acceptedAnswers": [
        "새 근무 조건에 대한 불만이 쏟아져 나왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1057": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Hearing that the surgery ended well, I breathed a sigh of relief”.",
      "canonicalTargetKey": "수술이 잘 끝났다는 말에 안도의 한숨을 쉬었어요.",
      "acceptedAnswers": [
        "수술이 잘 끝났다는 말에 안도의 한숨을 쉬었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "possessive-ui",
        "when-ttae",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1058": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I could not hide my embarrassment at the sudden question”.",
      "canonicalTargetKey": "갑작스러운 질문에 당황을 금치 못했어요.",
      "acceptedAnswers": [
        "갑작스러운 질문에 당황을 금치 못했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite",
        "neg-mot"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1059": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I felt an unknown fear in the dark alleyway”.",
      "canonicalTargetKey": "어두운 골목길에서 알 수 없는 공포를 느꼈어요.",
      "acceptedAnswers": [
        "어두운 골목길에서 알 수 없는 공포를 느꼈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1060": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I tossed and turned at night due to anxiety about the future”.",
      "canonicalTargetKey": "미래에 대한 불안으로 밤에 잠을 설쳤어요.",
      "acceptedAnswers": [
        "미래에 대한 불안으로 밤에 잠을 설쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l6"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1061": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I couldn't calm down my excitement at the soccer match winning goal scene”.",
      "canonicalTargetKey": "축구 경기 결승골 장면에서 흥분을 가라앉히지 못했어요.",
      "acceptedAnswers": [
        "축구 경기 결승골 장면에서 흥분을 가라앉히지 못했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite",
        "neg-mot"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1062": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The clerk treating customers with a gentle attitude looks good”.",
      "canonicalTargetKey": "상냥한 태도로 손님을 대하는 점원이 보기 좋아요.",
      "acceptedAnswers": [
        "상냥한 태도로 손님을 대하는 점원이 보기 좋아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1063": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The puppy is gentle so it doesn't cause trouble”.",
      "canonicalTargetKey": "강아지가 얌전해서 말썽을 부리지 않아요.",
      "acceptedAnswers": [
        "강아지가 얌전해서 말썽을 부리지 않아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "neg-an",
        "neg-ji-anta",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1064": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I frankly confessed all my inner feelings to my friend”.",
      "canonicalTargetKey": "친구에게 솔직하게 속마음을 다 털어놓았어요.",
      "acceptedAnswers": [
        "친구에게 솔직하게 속마음을 다 털어놓았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1065": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I spend time sharing friendly conversations with neighbors”.",
      "canonicalTargetKey": "이웃 사람들과 친근한 대화를 나누며 지내요.",
      "acceptedAnswers": [
        "이웃 사람들과 친근한 대화를 나누며 지내요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1066": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Conversations with someone met for the first time are slightly awkward”.",
      "canonicalTargetKey": "처음 만난 사람과는 대화가 약간 어색해요.",
      "acceptedAnswers": [
        "처음 만난 사람과는 대화가 약간 어색해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1067": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is natural to make effort in order to succeed”.",
      "canonicalTargetKey": "성공하기 위해 노력하는 것은 당연한 일이에요.",
      "acceptedAnswers": [
        "성공하기 위해 노력하는 것은 당연한 일이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l6"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1068": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There is still sufficient time left to prepare for the exam”.",
      "canonicalTargetKey": "시험 준비를 할 시간이 아직 충분히 남아 있어요.",
      "acceptedAnswers": [
        "시험 준비를 할 시간이 아직 충분히 남아 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1069": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is difficult to concentrate during the day due to a lack of sleep”.",
      "canonicalTargetKey": "수면 부족으로 낮에 집중하기가 어려워요.",
      "acceptedAnswers": [
        "수면 부족으로 낮에 집중하기가 어려워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l1"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1070": {
      "typedClass": "canonical",
      "examPromptEn": "A classmate asks what announcement was made. In ordinary polite Korean, answer that the movie-trailer release schedule was announced. Use 공개 일정 for “release schedule” and 발표되다 for “be announced”.",
      "canonicalTargetKey": "영화 예고편 공개 일정이 발표되었어요.",
      "acceptedAnswers": [
        "영화 예고편 공개 일정이 발표되었어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l6"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1071": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the government's financial support, I started a business”.",
      "canonicalTargetKey": "정부의 자금 지원 덕분에 사업을 시작했어요.",
      "acceptedAnswers": [
        "정부의 자금 지원 덕분에 사업을 시작했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1072": {
      "typedClass": "canonical",
      "examPromptEn": "Reporting a completed project to a classmate in ordinary polite Korean, say that you completed development of the new software. Use 소프트웨어 개발 and 완료하다.",
      "canonicalTargetKey": "새로운 소프트웨어 개발을 완료했어요.",
      "acceptedAnswers": [
        "새로운 소프트웨어 개발을 완료했어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l6"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1073": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am worrying for a correct career path choice”.",
      "canonicalTargetKey": "올바른 진로 선택을 위해 고민하고 있어요.",
      "acceptedAnswers": [
        "올바른 진로 선택을 위해 고민하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1074": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I will definitely finish this report by this evening”.",
      "canonicalTargetKey": "오늘 저녁까지 이 보고서를 반드시 끝낼게요.",
      "acceptedAnswers": [
        "오늘 저녁까지 이 보고서를 반드시 끝낼게요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression",
        "until-kkaji",
        "future-geoyeyo"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "future-authoring-locked"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — future-authoring-locked."
    },
    "s1075": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I changed my cell phone number to a new number”.",
      "canonicalTargetKey": "휴대폰 번호를 새 번호로 바꾸었어요.",
      "acceptedAnswers": [
        "휴대폰 번호를 새 번호로 바꾸었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1076": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I threw the toy ball far to the puppy”.",
      "canonicalTargetKey": "강아지에게 장난감 공을 멀리 던져주었어요.",
      "acceptedAnswers": [
        "강아지에게 장난감 공을 멀리 던져주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1077": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The police officer quickly caught the fleeing thief”.",
      "canonicalTargetKey": "도망가는 도둑을 경찰관이 재빨리 잡았어요.",
      "acceptedAnswers": [
        "도망가는 도둑을 경찰관이 재빨리 잡았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l6"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1078": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I made plans with a friend”.",
      "canonicalTargetKey": "친구하고 약속을 잡았어요.",
      "acceptedAnswers": [
        "친구하고 약속을 잡았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1079": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please open the closed door pushing it forward”.",
      "canonicalTargetKey": "닫힌 문을 앞으로 밀어서 열어 주세요.",
      "acceptedAnswers": [
        "닫힌 문을 앞으로 밀어서 열어 주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "imperative-seyo",
        "because-aseo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1080": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The door opens easily if you pull it, so please pull”.",
      "canonicalTargetKey": "문을 당기면 쉽게 열리니 당기세요.",
      "acceptedAnswers": [
        "문을 당기면 쉽게 열리니 당기세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "imperative-seyo",
        "if-myeon",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l6"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1081": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I quietly hid behind the tree avoiding the tagger”.",
      "canonicalTargetKey": "술래를 피해 나무 뒤에 가만히 숨었어요.",
      "acceptedAnswers": [
        "술래를 피해 나무 뒤에 가만히 숨었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1082": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I finally found the lost wallet under the sofa”.",
      "canonicalTargetKey": "잃어버린 지갑을 소파 밑에서 드디어 찾았어요.",
      "acceptedAnswers": [
        "잃어버린 지갑을 소파 밑에서 드디어 찾았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1083": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please raise your hand if you have a question during class”.",
      "canonicalTargetKey": "수업 시간에 질문이 있으면 손을 올리세요.",
      "acceptedAnswers": [
        "수업 시간에 질문이 있으면 손을 올리세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "time-expression",
        "imperative-seyo",
        "if-myeon",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants; particle-or-word-order-ambiguity."
    },
    "s1084": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I lent an extra umbrella to my friend because it rained”.",
      "canonicalTargetKey": "비가 와서 친구에게 여분의 우산을 빌려주었어요.",
      "acceptedAnswers": [
        "비가 와서 친구에게 여분의 우산을 빌려주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "because-aseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1085": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I gave my younger sibling the toy they wanted for their birthday”.",
      "canonicalTargetKey": "동생 생일에 갖고 싶어 하던 장난감을 주었어요.",
      "acceptedAnswers": [
        "동생 생일에 갖고 싶어 하던 장난감을 주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression",
        "past-polite",
        "and-go",
        "want-go-sipda"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1086": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I started volunteer work helping needy neighbors”.",
      "canonicalTargetKey": "어려운 이웃을 돕는 봉사 활동을 시작했어요.",
      "acceptedAnswers": [
        "어려운 이웃을 돕는 봉사 활동을 시작했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1087": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I danced to the music joyfully on the party stage”.",
      "canonicalTargetKey": "파티 무대 위에서 신나게 음악에 맞춰 춤췄어요.",
      "acceptedAnswers": [
        "파티 무대 위에서 신나게 음악에 맞춰 춤췄어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1088": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I study until late every night to do well on the exam”.",
      "canonicalTargetKey": "시험을 잘 보기 위해 매일 밤늦게까지 공부해요.",
      "acceptedAnswers": [
        "시험을 잘 보기 위해 매일 밤늦게까지 공부해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "until-kkaji",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1089": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I want to travel to various countries in the world when vacation comes”.",
      "canonicalTargetKey": "방학이 되면 세계 여러 나라를 여행하고 싶어요.",
      "acceptedAnswers": [
        "방학이 되면 세계 여러 나라를 여행하고 싶어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "and-go",
        "if-myeon",
        "want-go-sipda"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1090": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I got a driver's license and drove the car myself over the weekend”.",
      "canonicalTargetKey": "운전면허를 따서 주말에 직접 차를 운전했어요.",
      "acceptedAnswers": [
        "운전면허를 따서 주말에 직접 차를 운전했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1091": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I shopped for a coat to wear in winter at the department store”.",
      "canonicalTargetKey": "백화점에서 겨울에 입을 코트를 쇼핑했어요.",
      "acceptedAnswers": [
        "백화점에서 겨울에 입을 코트를 쇼핑했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1092": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I will definitely remember the study tip the teacher taught”.",
      "canonicalTargetKey": "선생님이 가르쳐주신 공부 팁을 꼭 기억할게요.",
      "acceptedAnswers": [
        "선생님이 가르쳐주신 공부 팁을 꼭 기억할게요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "future-geoyeyo"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "future-authoring-locked"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — future-authoring-locked."
    },
    "s1093": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I forgot the appointment with my friend due to busy daily life”.",
      "canonicalTargetKey": "바쁜 일상 때문에 친구와의 약속을 잊어버렸어요.",
      "acceptedAnswers": [
        "바쁜 일상 때문에 친구와의 약속을 잊어버렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "possessive-ui",
        "when-ttae",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1094": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Listening to the teacher's explanation, I understand now”.",
      "canonicalTargetKey": "선생님의 설명을 듣고 나니 이제 이해했어요.",
      "acceptedAnswers": [
        "선생님의 설명을 듣고 나니 이제 이해했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1095": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He misunderstood me because he misheard my words”.",
      "canonicalTargetKey": "제 말을 잘못 듣고 그가 저를 오해했어요.",
      "acceptedAnswers": [
        "제 말을 잘못 듣고 그가 저를 오해했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1096": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We promised to watch a movie together next weekend”.",
      "canonicalTargetKey": "다음 주말에 함께 영화를 보기로 약속했어요.",
      "acceptedAnswers": [
        "다음 주말에 함께 영화를 보기로 약속했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1097": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please do not lie in order to live an honest life”.",
      "canonicalTargetKey": "정직한 삶을 살기 위해 거짓말하지 마세요.",
      "acceptedAnswers": [
        "정직한 삶을 살기 위해 거짓말하지 마세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si",
        "neg-ji-anta"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1098": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Seeing his strange behavior, I doubted if it was a lie”.",
      "canonicalTargetKey": "그의 이상한 행동을 보고 거짓말인지 의심했어요.",
      "acceptedAnswers": [
        "그의 이상한 행동을 보고 거짓말인지 의심했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1099": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This Korean food's spicy taste is attractive”.",
      "canonicalTargetKey": "이 한국 음식은 매운 맛이 매력적이에요.",
      "acceptedAnswers": [
        "이 한국 음식은 매운 맛이 매력적이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1100": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I asked the restaurant clerk to give the menu board”.",
      "canonicalTargetKey": "식당 점원에게 메뉴판을 달라고 부탁했어요.",
      "acceptedAnswers": [
        "식당 점원에게 메뉴판을 달라고 부탁했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l9"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1101": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “An apple eaten in the morning is very beneficial to health”.",
      "canonicalTargetKey": "아침에 먹는 사과는 건강에 아주 유익해요.",
      "acceptedAnswers": [
        "아침에 먹는 사과는 건강에 아주 유익해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1102": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I apologized to my friend”.",
      "canonicalTargetKey": "친구에게 사과했어요.",
      "acceptedAnswers": [
        "친구에게 사과했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l1"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1103": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I ate a sweet banana as a snack after exercising”.",
      "canonicalTargetKey": "운동 후에 간식으로 달콤한 바나나를 먹었어요.",
      "acceptedAnswers": [
        "운동 후에 간식으로 달콤한 바나나를 먹었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1104": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “In summer, eating cool cold noodles is the best”.",
      "canonicalTargetKey": "여름에는 시원한 냉국수를 말아 먹으면 최고예요.",
      "acceptedAnswers": [
        "여름에는 시원한 냉국수를 말아 먹으면 최고예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo",
        "if-myeon",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1105": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I dipped steaming steamed dumplings in soy sauce and ate them”.",
      "canonicalTargetKey": "김이 모락모락 나는 찐만두를 간장에 찍어 먹었어요.",
      "acceptedAnswers": [
        "김이 모락모락 나는 찐만두를 간장에 찍어 먹었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1106": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After finishing the meal completely, I ate cool watermelon as dessert”.",
      "canonicalTargetKey": "식사를 모두 마친 후에 후식으로 시원한 수박을 먹었어요.",
      "acceptedAnswers": [
        "식사를 모두 마친 후에 후식으로 시원한 수박을 먹었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1107": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please do not obsess too much over past events that have passed”.",
      "canonicalTargetKey": "지나간 과거의 일에 너무 집착하지 마세요.",
      "acceptedAnswers": [
        "지나간 과거의 일에 너무 집착하지 마세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "imperative-seyo",
        "honorific-si",
        "neg-ji-anta"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1108": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's make effort for our bright future”.",
      "canonicalTargetKey": "우리의 밝은 미래를 위해 열심히 노력합시다.",
      "acceptedAnswers": [
        "우리의 밝은 미래를 위해 열심히 노력합시다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "propositive-eyo"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1109": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Exercising hard for a week makes me feel refreshed”.",
      "canonicalTargetKey": "일주일 동안 열심히 운동을 하니 개운해요.",
      "acceptedAnswers": [
        "일주일 동안 열심히 운동을 하니 개운해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression",
        "when-ttae",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1110": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I received language training in Seoul for a month”.",
      "canonicalTargetKey": "한 달 동안 서울에서 어학 연수를 받았어요.",
      "acceptedAnswers": [
        "한 달 동안 서울에서 어학 연수를 받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "time-expression",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1111": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “One year consists of twelve months”.",
      "canonicalTargetKey": "일 년은 열두 달로 이루어져 있습니다.",
      "acceptedAnswers": [
        "일 년은 열두 달로 이루어져 있습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "direction-euro",
        "formal-nida",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1112": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because the sun rises during the day, the weather is very warm”.",
      "canonicalTargetKey": "낮에는 해가 떠서 날씨가 아주 따뜻해요.",
      "acceptedAnswers": [
        "낮에는 해가 떠서 날씨가 아주 따뜻해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "because-aseo",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1113": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I go hiking with my family every Sunday”.",
      "canonicalTargetKey": "매주 일요일마다 가족들과 등산을 가요.",
      "acceptedAnswers": [
        "매주 일요일마다 가족들과 등산을 가요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1114": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The reading group is held on the first Monday of every month”.",
      "canonicalTargetKey": "매월 첫째 월요일에 독서 모임이 열립니다.",
      "acceptedAnswers": [
        "매월 첫째 월요일에 독서 모임이 열립니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "time-expression",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1115": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The cherry blossom festival is held every spring”.",
      "canonicalTargetKey": "매년 봄이 되면 벚꽃 축제가 개최돼요.",
      "acceptedAnswers": [
        "매년 봄이 되면 벚꽃 축제가 개최돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "if-myeon",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l10"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1116": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I marked the exam date in red on the calendar”.",
      "canonicalTargetKey": "달력에서 시험 날짜를 빨간색으로 표시했어요.",
      "acceptedAnswers": [
        "달력에서 시험 날짜를 빨간색으로 표시했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1117": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The business trip schedule changed, so I canceled the train ticket”.",
      "canonicalTargetKey": "출장 일정이 변경되어서 기차표를 취소했어요.",
      "acceptedAnswers": [
        "출장 일정이 변경되어서 기차표를 취소했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1118": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I have an appointment to watch a movie with a friend over the weekend”.",
      "canonicalTargetKey": "주말에 친구와 영화를 보기로 약속이 있어요.",
      "acceptedAnswers": [
        "주말에 친구와 영화를 보기로 약속이 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "with-hago-wa",
        "time-expression",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1119": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “At the end of hardship, we finally came to feel rewarded”.",
      "canonicalTargetKey": "고생 끝에 마침내 보람을 느끼게 되었어요.",
      "acceptedAnswers": [
        "고생 끝에 마침내 보람을 느끼게 되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "when-ttae",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-daily-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1120": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The result is also important, but the preparation process is also valuable”.",
      "canonicalTargetKey": "결과도 중요하지만 준비 과정도 가치 있어요.",
      "acceptedAnswers": [
        "결과도 중요하지만 준비 과정도 가치 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "but-jiman",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-daily-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1121": {
      "typedClass": "canonical",
      "examPromptEn": "A classmate asks whether a Korean-language course is available. In ordinary polite Korean, answer that there is a Korean-language course. Use 과정 for “course”.",
      "canonicalTargetKey": "한국어 과정이 있어요.",
      "acceptedAnswers": [
        "한국어 과정이 있어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l1"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1122": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I vividly remember the moment I first met him”.",
      "canonicalTargetKey": "그를 처음 만난 순간을 생생히 기억해요.",
      "acceptedAnswers": [
        "그를 처음 만난 순간을 생생히 기억해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1123": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Modern society has a very fast speed of information change”.",
      "canonicalTargetKey": "현대 사회는 정보의 변화 속도가 매우 빠릅니다.",
      "acceptedAnswers": [
        "현대 사회는 정보의 변화 속도가 매우 빠릅니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "possessive-ui",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1124": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I closely examined ancient artifacts at the museum”.",
      "canonicalTargetKey": "박물관에서 고대 유물들을 자세히 살펴보았어요.",
      "acceptedAnswers": [
        "박물관에서 고대 유물들을 자세히 살펴보았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1125": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I registered for and am listening to a futurology lecture at university”.",
      "canonicalTargetKey": "대학에서 미래학 강의를 신청해 듣고 있어요.",
      "acceptedAnswers": [
        "대학에서 미래학 강의를 신청해 듣고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1126": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We are living in the 21st-century knowledge-information society”.",
      "canonicalTargetKey": "우리는 이십일 세기 지식 정보 사회에 살고 있어요.",
      "acceptedAnswers": [
        "우리는 이십일 세기 지식 정보 사회에 살고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l12"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1127": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This report does not show the production year”.",
      "canonicalTargetKey": "이 보고서는 제작 연도가 표시되어 있지 않아요.",
      "acceptedAnswers": [
        "이 보고서는 제작 연도가 표시되어 있지 않아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "neg-an",
        "neg-ji-anta"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1128": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “During the vacation period, I practically lived at the library”.",
      "canonicalTargetKey": "방학 기간 동안 도서관에서 살다시피 했어요.",
      "acceptedAnswers": [
        "방학 기간 동안 도서관에서 살다시피 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1129": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The development speed of modern information technology is amazing”.",
      "canonicalTargetKey": "현대 정보기술의 발전 속도는 엄청납니다.",
      "acceptedAnswers": [
        "현대 정보기술의 발전 속도는 엄청납니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l3"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1130": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The pencil broke, so I sharpened it sharp with the pencil sharpener”.",
      "canonicalTargetKey": "연필이 부러져서 연필깎이로 뾰족하게 깎았어요.",
      "acceptedAnswers": [
        "연필이 부러져서 연필깎이로 뾰족하게 깎았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1131": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I put a ruler on the notebook and drew a straight underline”.",
      "canonicalTargetKey": "공책에 자를 대고 일직선으로 밑줄을 그었어요.",
      "acceptedAnswers": [
        "공책에 자를 대고 일직선으로 밑줄을 그었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "direction-euro",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l7"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1132": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed the signature on the contract with a black ballpoint pen”.",
      "canonicalTargetKey": "계약서에 검은색 볼펜으로 서명을 완료했어요.",
      "acceptedAnswers": [
        "계약서에 검은색 볼펜으로 서명을 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1133": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I carefully opened the delivery box with a knife”.",
      "canonicalTargetKey": "택배 상자를 칼로 조심스럽게 개봉했어요.",
      "acceptedAnswers": [
        "택배 상자를 칼로 조심스럽게 개봉했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1134": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I put items in a plastic bag at the mart and brought them”.",
      "canonicalTargetKey": "마트에서 물건을 비닐봉지에 담아 들고 왔어요.",
      "acceptedAnswers": [
        "마트에서 물건을 비닐봉지에 담아 들고 왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "location-eseo",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1135": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I poured water in a glass cup and served it to the guest”.",
      "canonicalTargetKey": "유리 컵에 물을 따라 손님에게 대접했어요.",
      "acceptedAnswers": [
        "유리 컵에 물을 따라 손님에게 대접했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1136": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I put the pasta dish look-good on a pretty plate”.",
      "canonicalTargetKey": "예쁜 접시 위에 파스타 요리를 보기 좋게 담았어요.",
      "acceptedAnswers": [
        "예쁜 접시 위에 파스타 요리를 보기 좋게 담았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1137": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I placed the spoon and chopsticks set on the dining table”.",
      "canonicalTargetKey": "식탁 위에 숟가락과 젓가락 수저 세트를 놓았어요.",
      "acceptedAnswers": [
        "식탁 위에 숟가락과 젓가락 수저 세트를 놓았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "with-hago-wa",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1138": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I held the hot pot handle wearing gloves”.",
      "canonicalTargetKey": "뜨거운 냄비 손잡이를 장갑을 끼고 잡았어요.",
      "acceptedAnswers": [
        "뜨거운 냄비 손잡이를 장갑을 끼고 잡았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1139": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I greased the frying pan and made a fried egg”.",
      "canonicalTargetKey": "후라이팬에 기름을 두르고 계란 프라이를 만들었어요.",
      "acceptedAnswers": [
        "후라이팬에 기름을 두르고 계란 프라이를 만들었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1140": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I chopped vegetables finely on the wooden cutting board”.",
      "canonicalTargetKey": "나무 도마 위에서 야채를 송송 썰었어요.",
      "acceptedAnswers": [
        "나무 도마 위에서 야채를 송송 썰었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1141": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “When the water boiling sound made, I took the kettle off the fire”.",
      "canonicalTargetKey": "물 끓는 소리가 나자 주전자를 불에서 내렸어요.",
      "acceptedAnswers": [
        "물 끓는 소리가 나자 주전자를 불에서 내렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "when-ttae",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1142": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is convenient to put a mirror clock on the dressing table”.",
      "canonicalTargetKey": "화장대 위에 거울시계를 올려놓아 편리해요.",
      "acceptedAnswers": [
        "화장대 위에 거울시계를 올려놓아 편리해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1143": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After washing my hair, I dried it with the hair dryer”.",
      "canonicalTargetKey": "머리를 감은 후에 드라이기로 머리를 말렸어요.",
      "acceptedAnswers": [
        "머리를 감은 후에 드라이기로 머리를 말렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1144": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The president goes on an overseas business trip next week”.",
      "canonicalTargetKey": "사장님이 다음 주에 해외 출장을 떠나십니다.",
      "acceptedAnswers": [
        "사장님이 다음 주에 해외 출장을 떠나십니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "time-expression",
        "formal-nida",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s1145": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The painter is drawing a beautiful oil painting on the canvas”.",
      "canonicalTargetKey": "화가가 캔버스 위에 아름다운 유화를 그리고 있어요.",
      "acceptedAnswers": [
        "화가가 캔버스 위에 아름다운 유화를 그리고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1146": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The judge made a ruling based on the evidence of the case”.",
      "canonicalTargetKey": "판사가 사건의 증거를 토대로 판결을 내렸어요.",
      "acceptedAnswers": [
        "판사가 사건의 증거를 토대로 판결을 내렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1147": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the kind taxi driver, I arrived comfortably”.",
      "canonicalTargetKey": "친절한 택시 운전사 덕분에 편안하게 도착했어요.",
      "acceptedAnswers": [
        "친절한 택시 운전사 덕분에 편안하게 도착했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l4"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1148": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The announcer hosts the news in a calm voice”.",
      "canonicalTargetKey": "아나운서가 차분한 목소리로 뉴스를 진행해요.",
      "acceptedAnswers": [
        "아나운서가 차분한 목소리로 뉴스를 진행해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1149": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The veterinarian treated the sick puppy's leg”.",
      "canonicalTargetKey": "수의사가 아픈 강아지의 다리를 치료해 주었어요.",
      "acceptedAnswers": [
        "수의사가 아픈 강아지의 다리를 치료해 주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l4"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1150": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A famous architect designed the art gallery building wonderfully”.",
      "canonicalTargetKey": "유명한 건축가가 미술관 건물을 멋지게 설계했어요.",
      "acceptedAnswers": [
        "유명한 건축가가 미술관 건물을 멋지게 설계했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1151": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The fighter jet pilot is flying fast in the sky”.",
      "canonicalTargetKey": "전투기 조종사가 하늘을 빠르게 비행하고 있어요.",
      "acceptedAnswers": [
        "전투기 조종사가 하늘을 빠르게 비행하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1152": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The flight attendant provides kind service to passengers”.",
      "canonicalTargetKey": "비행기 승무원이 탑승객에게 친절한 서비스를 제공해요.",
      "acceptedAnswers": [
        "비행기 승무원이 탑승객에게 친절한 서비스를 제공해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1153": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The fashion designer is designing new season clothes”.",
      "canonicalTargetKey": "패션 디자이너가 새 시즌 옷을 디자인하고 있어요.",
      "acceptedAnswers": [
        "패션 디자이너가 새 시즌 옷을 디자인하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1154": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The tour guide explains the historic site in fluent English”.",
      "canonicalTargetKey": "여행 가이드가 유창한 영어로 유적지를 설명해요.",
      "acceptedAnswers": [
        "여행 가이드가 유창한 영어로 유적지를 설명해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1155": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I work as a translator translating Korean literature books into English”.",
      "canonicalTargetKey": "한국 문학 책을 영어로 옮기는 번역가로 일해요.",
      "acceptedAnswers": [
        "한국 문학 책을 영어로 옮기는 번역가로 일해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1156": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They are an interpreter doing real-time interpreting of two languages at the international conference hall”.",
      "canonicalTargetKey": "국제 회의장에서 두 언어를 실시간 통역하는 통역사예요.",
      "acceptedAnswers": [
        "국제 회의장에서 두 언어를 실시간 통역하는 통역사예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-work-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1157": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I confessed my worries to the psychological counselor and received counseling”.",
      "canonicalTargetKey": "심리 상담사에게 고민을 털어놓고 상담을 받았어요.",
      "acceptedAnswers": [
        "심리 상담사에게 고민을 털어놓고 상담을 받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1158": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They are a programmer developing apps at a software company”.",
      "canonicalTargetKey": "소프트웨어 회사에서 앱을 개발하는 프로그래머예요.",
      "acceptedAnswers": [
        "소프트웨어 회사에서 앱을 개발하는 프로그래머예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l1"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1159": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My younger brother bought my older sister's birthday cake from the bakery”.",
      "canonicalTargetKey": "남동생이 누나 생일 케이크를 빵집에서 사 왔네요.",
      "acceptedAnswers": [
        "남동생이 누나 생일 케이크를 빵집에서 사 왔네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1160": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My younger sister is sleeping on the bed holding a cute doll”.",
      "canonicalTargetKey": "여동생이 귀여운 인형을 안고 침대에서 자고 있어요.",
      "acceptedAnswers": [
        "여동생이 귀여운 인형을 안고 침대에서 자고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l9"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1161": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “On Children's Day, many children played joyfully at the amusement park”.",
      "canonicalTargetKey": "어린이날에 많은 어린이들이 놀이공원에서 신나게 놀았어요.",
      "acceptedAnswers": [
        "어린이날에 많은 어린이들이 놀이공원에서 신나게 놀았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1162": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The baby is sleeping soundly in the room cradle”.",
      "canonicalTargetKey": "아기가 방 요람에서 곤히 쌔근쌔근 자고 있네요.",
      "acceptedAnswers": [
        "아기가 방 요람에서 곤히 쌔근쌔근 자고 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1163": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After moving, I happily distributed rice cakes to neighbors”.",
      "canonicalTargetKey": "이사 온 후에 이웃 사람들에게 반갑게 떡을 돌렸어요.",
      "acceptedAnswers": [
        "이사 온 후에 이웃 사람들에게 반갑게 떡을 돌렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l9"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1164": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I ate lunch at the cafeteria together with my company colleague”.",
      "canonicalTargetKey": "회사 동료와 함께 구내식당에서 점심을 먹었어요.",
      "acceptedAnswers": [
        "회사 동료와 함께 구내식당에서 점심을 먹었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "with-hago-wa",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1165": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I was passed down exam study secrets from a school senior”.",
      "canonicalTargetKey": "학교 선배에게 시험 대비 공부 비법을 전수받았어요.",
      "acceptedAnswers": [
        "학교 선배에게 시험 대비 공부 비법을 전수받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l9"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1166": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I showed school facilities to the new club juniors”.",
      "canonicalTargetKey": "신입 동아리 후배들에게 학교 시설을 안내해 주었어요.",
      "acceptedAnswers": [
        "신입 동아리 후배들에게 학교 시설을 안내해 주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1167": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Environmental pollution is a serious task humanity as a whole must solve”.",
      "canonicalTargetKey": "환경 오염은 인류 전체가 해결해야 할 심각한 과제예요.",
      "acceptedAnswers": [
        "환경 오염은 인류 전체가 해결해야 할 심각한 과제예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l9"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1168": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Personal information protection is very important in the information society”.",
      "canonicalTargetKey": "정보 사회에서는 개인 정보 보호가 아주 중요합니다.",
      "acceptedAnswers": [
        "정보 사회에서는 개인 정보 보호가 아주 중요합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1169": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There is fun in gathering coins in the piggy bank one by one”.",
      "canonicalTargetKey": "저금통에 동전을 차곡차곡 모으는 재미가 있어요.",
      "acceptedAnswers": [
        "저금통에 동전을 차곡차곡 모으는 재미가 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1170": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There is a 50,000 Won bill in my wallet”.",
      "canonicalTargetKey": "지갑에 오만 원짜리 지폐 한 장이 들어 있네요.",
      "acceptedAnswers": [
        "지갑에 오만 원짜리 지폐 한 장이 들어 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "only-man",
        "counter-phrase",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1171": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed the purchase of the needed book at the internet shopping mall”.",
      "canonicalTargetKey": "인터넷 쇼핑몰에서 필요한 책 구매를 완료했어요.",
      "acceptedAnswers": [
        "인터넷 쇼핑몰에서 필요한 책 구매를 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1172": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After finishing the meal, I calculated the food price at the counter”.",
      "canonicalTargetKey": "식사를 마친 후에 계산대에서 밥값을 계산했어요.",
      "acceptedAnswers": [
        "식사를 마친 후에 계산대에서 밥값을 계산했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1173": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I exchanged currency to dollars at the bank before going on a US trip”.",
      "canonicalTargetKey": "미국 여행을 가기 전에 은행에서 달러로 환전했어요.",
      "acceptedAnswers": [
        "미국 여행을 가기 전에 은행에서 달러로 환전했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "time-expression",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1174": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This month, expenses were very high due to travel”.",
      "canonicalTargetKey": "이번 달에는 여행 때문에 지출이 아주 많았어요.",
      "acceptedAnswers": [
        "이번 달에는 여행 때문에 지출이 아주 많았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "time-expression",
        "because-aseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1175": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Having a constant income coming in every month makes my mind comfortable”.",
      "canonicalTargetKey": "매달 일정한 수입이 들어오니 마음이 편안해요.",
      "acceptedAnswers": [
        "매달 일정한 수입이 들어오니 마음이 편안해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "time-expression",
        "present-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1176": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I save pocket money and make a deposit at the bank every week”.",
      "canonicalTargetKey": "용돈을 아껴서 은행에 매주 저금을 하고 있어요.",
      "acceptedAnswers": [
        "용돈을 아껴서 은행에 매주 저금을 하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "time-expression",
        "because-aseo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1177": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I opened an installment savings bankbook at the bank counter and signed”.",
      "canonicalTargetKey": "은행 창구에서 적금 통장을 개설하고 서명했어요.",
      "acceptedAnswers": [
        "은행 창구에서 적금 통장을 개설하고 서명했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1178": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This project incurs more expenses than expected”.",
      "canonicalTargetKey": "이 프로젝트는 예상보다 많은 비용이 발생해요.",
      "acceptedAnswers": [
        "이 프로젝트는 예상보다 많은 비용이 발생해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1179": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The shop business hours ended, so they closed the door tightly”.",
      "canonicalTargetKey": "가게 영업 시간이 끝나서 문을 굳게 닫았어요.",
      "acceptedAnswers": [
        "가게 영업 시간이 끝나서 문을 굳게 닫았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "because-aseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1180": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The market price of napa cabbage is showing an upward trend”.",
      "canonicalTargetKey": "배추의 시장가격이 오름세를 보이고 있네요.",
      "acceptedAnswers": [
        "배추의 시장가격이 오름세를 보이고 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1181": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The weekend market area is very noisy with people's sounds”.",
      "canonicalTargetKey": "주말 시장통은 사람들 소리로 무척 시끄러워요.",
      "acceptedAnswers": [
        "주말 시장통은 사람들 소리로 무척 시끄러워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "direction-euro",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1182": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I checked the price tag attached to the clothes before choosing them”.",
      "canonicalTargetKey": "옷을 고르기 전에 옷에 달린 가격표를 확인했어요.",
      "acceptedAnswers": [
        "옷을 고르기 전에 옷에 달린 가격표를 확인했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1183": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A fee incurred when withdrawing money from the bank ATM”.",
      "canonicalTargetKey": "은행 현금인출기에서 돈을 뽑을 때 수수료가 발생했어요.",
      "acceptedAnswers": [
        "은행 현금인출기에서 돈을 뽑을 때 수수료가 발생했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "past-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1184": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I filed a complaint about the defective product at the consumer report center”.",
      "canonicalTargetKey": "소비자 고발 센터에 불량 제품에 대한 불만을 접수했어요.",
      "acceptedAnswers": [
        "소비자 고발 센터에 불량 제품에 대한 불만을 접수했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1185": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The buyer of the item appeared on the used transaction site”.",
      "canonicalTargetKey": "중고 거래 사이트에서 물건의 구매자가 나타났어요.",
      "acceptedAnswers": [
        "중고 거래 사이트에서 물건의 구매자가 나타났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1186": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I bought a computer from a reliable seller”.",
      "canonicalTargetKey": "신뢰할 수 있는 판매자에게 컴퓨터를 샀어요.",
      "acceptedAnswers": [
        "신뢰할 수 있는 판매자에게 컴퓨터를 샀어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "can-su-itda",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1187": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I gathered receipts in a receipt binder for company expense verification”.",
      "canonicalTargetKey": "회사 지출 증빙을 위해 영수증을 영수증철에 모았어요.",
      "acceptedAnswers": [
        "회사 지출 증빙을 위해 영수증을 영수증철에 모았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1188": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I requested a refund at the store because there was a defect in the product”.",
      "canonicalTargetKey": "제품에 하자가 있어서 매장에 환불을 요청했어요.",
      "acceptedAnswers": [
        "제품에 하자가 있어서 매장에 환불을 요청했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1189": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I found the lost coin inside the coat pocket”.",
      "canonicalTargetKey": "코트 주머니 속에서 잃어버렸던 동전을 찾아냈어요.",
      "acceptedAnswers": [
        "코트 주머니 속에서 잃어버렸던 동전을 찾아냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1190": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I bought light sneakers to start running exercises”.",
      "canonicalTargetKey": "달리기 운동을 시작하려고 가벼운 운동화를 샀어요.",
      "acceptedAnswers": [
        "달리기 운동을 시작하려고 가벼운 운동화를 샀어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1191": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “In the office, I work comfortably wearing indoor slippers”.",
      "canonicalTargetKey": "사무실 안에서는 편하게 실내용 슬리퍼를 신고 일해요.",
      "acceptedAnswers": [
        "사무실 안에서는 편하게 실내용 슬리퍼를 신고 일해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1192": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I carefully inserted the button into the shirt buttonhole”.",
      "canonicalTargetKey": "셔츠 단추구멍에 단추를 조심스럽게 끼워 넣었어요.",
      "acceptedAnswers": [
        "셔츠 단추구멍에 단추를 조심스럽게 끼워 넣었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1193": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to the optician's shop and changed the lenses because they got scratched”.",
      "canonicalTargetKey": "안경 렌즈에 흠집이 나서 안경원에 가서 바꿨어요.",
      "acceptedAnswers": [
        "안경 렌즈에 흠집이 나서 안경원에 가서 바꿨어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "because-aseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1194": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I adjusted the backpack bag strap length because my shoulder hurt”.",
      "canonicalTargetKey": "어깨가 아파서 백팩의 가방끈 길이를 조절했어요.",
      "acceptedAnswers": [
        "어깨가 아파서 백팩의 가방끈 길이를 조절했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "possessive-ui",
        "because-aseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1195": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I connected the wallet strap to the bag so I wouldn't lose the wallet”.",
      "canonicalTargetKey": "지갑을 분실하지 않으려고 지갑끈을 가방에 연결했어요.",
      "acceptedAnswers": [
        "지갑을 분실하지 않으려고 지갑끈을 가방에 연결했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite",
        "neg-an",
        "neg-ji-anta"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1196": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “In autumn, I enjoy wearing a cozy sweater over a shirt”.",
      "canonicalTargetKey": "가을에는 셔츠 위에 포근한 스웨터를 즐겨 입어요.",
      "acceptedAnswers": [
        "가을에는 셔츠 위에 포근한 스웨터를 즐겨 입어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "location-e",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1197": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I bought a pink one-piece dress for the weekend date”.",
      "canonicalTargetKey": "주말 데이트를 위해 분홍색 원피스를 한 벌 샀어요.",
      "acceptedAnswers": [
        "주말 데이트를 위해 분홍색 원피스를 한 벌 샀어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1198": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Foreign students learn kicking at the Taekwondo dojang”.",
      "canonicalTargetKey": "외국인 학생들이 태권도 도장에서 발차기를 배웁니다.",
      "acceptedAnswers": [
        "외국인 학생들이 태권도 도장에서 발차기를 배웁니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1199": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I definitely want to win the table tennis match this time”.",
      "canonicalTargetKey": "이번 탁구 시합에서 반드시 우승을 하고 싶어요.",
      "acceptedAnswers": [
        "이번 탁구 시합에서 반드시 우승을 하고 싶어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "time-expression",
        "present-polite",
        "and-go",
        "want-go-sipda"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1200": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our team combined strength and won 1st place in the project competition”.",
      "canonicalTargetKey": "우리 팀이 힘을 합쳐 프로젝트 공모전에서 1등을 했어요.",
      "acceptedAnswers": [
        "우리 팀이 힘을 합쳐 프로젝트 공모전에서 1등을 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l17"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1201": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I hit and passed the tennis ball accurately with the racket”.",
      "canonicalTargetKey": "테니스 공을 라켓으로 정확하게 쳐서 넘겼어요.",
      "acceptedAnswers": [
        "테니스 공을 라켓으로 정확하게 쳐서 넘겼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l15"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1202": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I checked our team's score on the match scoreboard”.",
      "canonicalTargetKey": "경기 스코어보드에서 우리 팀의 점수를 확인했어요.",
      "acceptedAnswers": [
        "경기 스코어보드에서 우리 팀의 점수를 확인했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1203": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our school player achieved victory in the marathon competition”.",
      "canonicalTargetKey": "마라톤 대회에서 우리 학교 선수가 우승을 거두었어요.",
      "acceptedAnswers": [
        "마라톤 대회에서 우리 학교 선수가 우승을 거두었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1204": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Father goes to the field to play golf with friends over the weekend”.",
      "canonicalTargetKey": "아버지가 주말에 친구들과 골프를 치러 필드에 가십니다.",
      "acceptedAnswers": [
        "아버지가 주말에 친구들과 골프를 치러 필드에 가십니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "with-hago-wa",
        "time-expression",
        "formal-nida",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1205": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “National representative players are striving in training for the Olympics”.",
      "canonicalTargetKey": "국가대표 선수들이 올림픽 대비 훈련에 매진하고 있어요.",
      "acceptedAnswers": [
        "국가대표 선수들이 올림픽 대비 훈련에 매진하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1206": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I checked my current position as a red dot on the map”.",
      "canonicalTargetKey": "지도에서 제 현재 위치를 빨간색 점으로 확인했어요.",
      "acceptedAnswers": [
        "지도에서 제 현재 위치를 빨간색 점으로 확인했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-travel-u1-l20"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1207": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I changed the meeting place to a cafe in front of Seoul City Hall”.",
      "canonicalTargetKey": "회의 장소를 서울 시청 앞 카페로 변경했어요.",
      "acceptedAnswers": [
        "회의 장소를 서울 시청 앞 카페로 변경했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1208": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I decided to meet friends early in the morning in front of the school gate”.",
      "canonicalTargetKey": "학교 정문 앞에서 아침 일찍 친구들을 만나기로 했어요.",
      "acceptedAnswers": [
        "학교 정문 앞에서 아침 일찍 친구들을 만나기로 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-travel-u1-l20"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1209": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I cleanly emptied the trash can next to the desk”.",
      "canonicalTargetKey": "책상 옆에 있는 쓰레기통을 깨끗이 비웠어요.",
      "acceptedAnswers": [
        "책상 옆에 있는 쓰레기통을 깨끗이 비웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1210": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There is a narrow gap between the desk and the bed”.",
      "canonicalTargetKey": "책상과 침대 사이에 좁은 틈이 있어요.",
      "acceptedAnswers": [
        "책상과 침대 사이에 좁은 틈이 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "with-hago-wa",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn2-travel-u1-l19"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1211": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If you turn right at the intersection, the bus stop comes out”.",
      "canonicalTargetKey": "사거리에서 오른쪽으로 돌면 버스 정류장이 나와요.",
      "acceptedAnswers": [
        "사거리에서 오른쪽으로 돌면 버스 정류장이 나와요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "direction-euro",
        "if-myeon",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1212": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The man standing on the left side is my university professor”.",
      "canonicalTargetKey": "왼쪽에 서 있는 남자가 제 대학교 교수님입니다.",
      "acceptedAnswers": [
        "왼쪽에 서 있는 남자가 제 대학교 교수님입니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "possessive-ui",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1213": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I walked silently following the direction the signpost pointed”.",
      "canonicalTargetKey": "이정표가 가리키는 방향을 따라 묵묵히 걸었어요.",
      "acceptedAnswers": [
        "이정표가 가리키는 방향을 따라 묵묵히 걸었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1214": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A red sunset is setting prettily in the western sky”.",
      "canonicalTargetKey": "서쪽 하늘로 붉은 노을이 예쁘게 지고 있어요.",
      "acceptedAnswers": [
        "서쪽 하늘로 붉은 노을이 예쁘게 지고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1215": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “In winter, relatively southern regions are on the warmer side”.",
      "canonicalTargetKey": "겨울에는 비교적 남쪽 지역이 더 따뜻한 편이에요.",
      "acceptedAnswers": [
        "겨울에는 비교적 남쪽 지역이 더 따뜻한 편이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1216": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A peace talk was held near the northern truce line”.",
      "canonicalTargetKey": "북쪽 휴전선 근처에서 평화 회담이 개최되었습니다.",
      "acceptedAnswers": [
        "북쪽 휴전선 근처에서 평화 회담이 개최되었습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l11"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1217": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I placed a pretty circular table in the middle of the room”.",
      "canonicalTargetKey": "방 한가운데에 예쁜 원형 테이블을 놓아 두었어요.",
      "acceptedAnswers": [
        "방 한가운데에 예쁜 원형 테이블을 놓아 두었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1218": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The time walking around the lake is peaceful”.",
      "canonicalTargetKey": "호수 주변을 걸으며 산책하는 시간이 평화로워요.",
      "acceptedAnswers": [
        "호수 주변을 걸으며 산책하는 시간이 평화로워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1219": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is a cold weather, so I am scared to go outside the building”.",
      "canonicalTargetKey": "추운 날씨라 건물 바깥으로 나가기가 무서워요.",
      "acceptedAnswers": [
        "추운 날씨라 건물 바깥으로 나가기가 무서워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1220": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Photo taking is prohibited inside the art gallery”.",
      "canonicalTargetKey": "미술관 내부에서는 사진 촬영을 금지하고 있어요.",
      "acceptedAnswers": [
        "미술관 내부에서는 사진 촬영을 금지하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "with-hago-wa",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1221": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We strictly restrict the entry of people outside the company”.",
      "canonicalTargetKey": "회사 외부 사람의 출입을 철저히 제한하고 있어요.",
      "acceptedAnswers": [
        "회사 외부 사람의 출입을 철저히 제한하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "with-hago-wa",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1222": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The city hall plaza spreads out wide in the center of downtown”.",
      "canonicalTargetKey": "도심 중앙에 시청 광장이 널찍하게 펼쳐져 있어요.",
      "acceptedAnswers": [
        "도심 중앙에 시청 광장이 널찍하게 펼쳐져 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1223": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After a three-hour hike, I finally stood on the mountain summit”.",
      "canonicalTargetKey": "세 시간 산행 끝에 산 정상에 드디어 올랐어요.",
      "acceptedAnswers": [
        "세 시간 산행 끝에 산 정상에 드디어 올랐어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "when-ttae",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1224": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The patient's blood pressure returned to normal after taking medicine”.",
      "canonicalTargetKey": "환자의 혈압이 약을 복용한 후에 정상으로 돌아왔어요.",
      "acceptedAnswers": [
        "환자의 혈압이 약을 복용한 후에 정상으로 돌아왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "direction-euro",
        "possessive-ui",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l12"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1225": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wiped and cleaned the room floor cleanly with a wet mop”.",
      "canonicalTargetKey": "방 바닥을 물걸레로 깨끗하게 닦고 청소했어요.",
      "acceptedAnswers": [
        "방 바닥을 물걸레로 깨끗하게 닦고 청소했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l11"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1226": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A pretty chandelier light is hung on the living room ceiling”.",
      "canonicalTargetKey": "거실 천장에 예쁜 샹들리에 조명이 달려 있네요.",
      "acceptedAnswers": [
        "거실 천장에 예쁜 샹들리에 조명이 달려 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn8-travel-u7-l10"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1227": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I quietly put the bag down in the room corner and lay on the bed”.",
      "canonicalTargetKey": "방 구석에 가방을 가만히 내려두고 침대에 누웠어요.",
      "acceptedAnswers": [
        "방 구석에 가방을 가만히 내려두고 침대에 누웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1228": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Recently, the national economic growth rate has slowed down”.",
      "canonicalTargetKey": "최근 국가 경제 성장률이 둔화되었어요.",
      "acceptedAnswers": [
        "최근 국가 경제 성장률이 둔화되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l4"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1229": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This survey is targeted at university students”.",
      "canonicalTargetKey": "이 설문 조사는 대학생을 대상으로 해요.",
      "acceptedAnswers": [
        "이 설문 조사는 대학생을 대상으로 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1230": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Before entering the library, please take out your student ID card first”.",
      "canonicalTargetKey": "도서관에 들어가기 전에 먼저 학생증을 꺼내세요.",
      "acceptedAnswers": [
        "도서관에 들어가기 전에 먼저 학생증을 꺼내세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "time-expression",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-daily-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1231": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He is a very important presence in our team”.",
      "canonicalTargetKey": "그는 우리 팀에서 아주 중요한 존재예요.",
      "acceptedAnswers": [
        "그는 우리 팀에서 아주 중요한 존재예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn2-nature-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1232": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The orange juice I drank today is very sweet and cool”.",
      "canonicalTargetKey": "오늘 마신 오렌지 주스는 아주 달고 시원해요.",
      "acceptedAnswers": [
        "오늘 마신 오렌지 주스는 아주 달고 시원해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "present-polite",
        "and-go",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1233": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Police officers are thoroughly investigating the incident scene”.",
      "canonicalTargetKey": "경찰관들이 사건 현장을 철저히 조사하고 있어요.",
      "acceptedAnswers": [
        "경찰관들이 사건 현장을 철저히 조사하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "with-hago-wa",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1234": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the teacher's recommendation, I applied to a good company”.",
      "canonicalTargetKey": "선생님의 추천 덕분에 좋은 회사에 지원했어요.",
      "acceptedAnswers": [
        "선생님의 추천 덕분에 좋은 회사에 지원했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1235": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please analyze the composition components of this sentence in detail”.",
      "canonicalTargetKey": "이 문장의 구성 성분을 자세히 분석해 보세요.",
      "acceptedAnswers": [
        "이 문장의 구성 성분을 자세히 분석해 보세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1236": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Many large enterprises are striving to create youth jobs”.",
      "canonicalTargetKey": "많은 대기업들이 청년 일자리 창출에 노력하고 있어요.",
      "acceptedAnswers": [
        "많은 대기업들이 청년 일자리 창출에 노력하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "location-e",
        "with-hago-wa",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1237": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I quietly appreciated a movie alone at home over the weekend”.",
      "canonicalTargetKey": "주말에 혼자 집에서 조용히 영화를 감상했어요.",
      "acceptedAnswers": [
        "주말에 혼자 집에서 조용히 영화를 감상했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "time-expression",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1238": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A majority of the students are satisfied with this exam result”.",
      "canonicalTargetKey": "학생들의 대부분이 이번 시험 결과를 만족해요.",
      "acceptedAnswers": [
        "학생들의 대부분이 이번 시험 결과를 만족해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1239": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The content of this book is highly useful for beginners”.",
      "canonicalTargetKey": "이 책의 내용은 초보자에게 매우 유익해요.",
      "acceptedAnswers": [
        "이 책의 내용은 초보자에게 매우 유익해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1240": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He started a business developing new technology”.",
      "canonicalTargetKey": "그는 새로운 기술을 개발하는 사업을 시작했어요.",
      "acceptedAnswers": [
        "그는 새로운 기술을 개발하는 사업을 시작했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1241": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We need an attitude of helping and caring for each other”.",
      "canonicalTargetKey": "우리는 서로 돕고 배려하는 자세가 필요해요.",
      "acceptedAnswers": [
        "우리는 서로 돕고 배려하는 자세가 필요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "and-go",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1242": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Camping in nature over the weekend releases stress”.",
      "canonicalTargetKey": "주말에 자연 속에서 캠핑을 하니 스트레스가 풀려요.",
      "acceptedAnswers": [
        "주말에 자연 속에서 캠핑을 하니 스트레스가 풀려요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-nature-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1243": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I read the whole report, and its completeness is high”.",
      "canonicalTargetKey": "보고서 전체를 다 읽어보았는데 완성도가 높아요.",
      "acceptedAnswers": [
        "보고서 전체를 다 읽어보았는데 완성도가 높아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1244": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The hotel provides free breakfast to customers”.",
      "canonicalTargetKey": "호텔에서 고객들에게 무료 아침 식사를 제공해요.",
      "acceptedAnswers": [
        "호텔에서 고객들에게 무료 아침 식사를 제공해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1245": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I learned the importance of eating habits to maintain health”.",
      "canonicalTargetKey": "건강을 지키기 위한 식습관의 중요성을 배웠어요.",
      "acceptedAnswers": [
        "건강을 지키기 위한 식습관의 중요성을 배웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1246": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “People form groups according to various relationships”.",
      "canonicalTargetKey": "사람들은 여러 이해관계에 따라 집단을 형성해요.",
      "acceptedAnswers": [
        "사람들은 여러 이해관계에 따라 집단을 형성해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1247": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The doctor made a quick judgment looking at the patient's condition”.",
      "canonicalTargetKey": "의사는 환자의 상태를 보고 빠른 판단을 내렸어요.",
      "acceptedAnswers": [
        "의사는 환자의 상태를 보고 빠른 판단을 내렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "possessive-ui",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1248": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I felt the necessity of establishing laws for environmental protection”.",
      "canonicalTargetKey": "환경 보호를 위한 법률 제정의 필요성을 느꼈어요.",
      "acceptedAnswers": [
        "환경 보호를 위한 법률 제정의 필요성을 느꼈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1249": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We promoted an amicable solution to the difficult conflict situation”.",
      "canonicalTargetKey": "어려운 갈등 상황의 원만한 해결을 도모했어요.",
      "acceptedAnswers": [
        "어려운 갈등 상황의 원만한 해결을 도모했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1250": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Overseas travel is a good experience to broaden one's horizon”.",
      "canonicalTargetKey": "해외 여행은 시야를 넓히는 좋은 경험이에요.",
      "acceptedAnswers": [
        "해외 여행은 시야를 넓히는 좋은 경험이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1251": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Understanding the principles of math formulas makes them easy to solve”.",
      "canonicalTargetKey": "수학 공식의 원리를 이해하면 쉽게 풀 수 있어요.",
      "acceptedAnswers": [
        "수학 공식의 원리를 이해하면 쉽게 풀 수 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite",
        "if-myeon",
        "can-su-itda"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1252": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We are investigating everyone connected with this incident”.",
      "canonicalTargetKey": "이 사건과 관련된 모든 사람들을 조사하고 있어요.",
      "acceptedAnswers": [
        "이 사건과 관련된 모든 사람들을 조사하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1253": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I put on a facial mask and sleep every night for skin care”.",
      "canonicalTargetKey": "피부 관리를 위해 매일 밤 팩을 하고 자요.",
      "acceptedAnswers": [
        "피부 관리를 위해 매일 밤 팩을 하고 자요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "and-go",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1254": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is necessary to look at the problem from different points of view”.",
      "canonicalTargetKey": "서로 다른 관점에서 문제를 바라볼 필요가 있어요.",
      "acceptedAnswers": [
        "서로 다른 관점에서 문제를 바라볼 필요가 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1255": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I learn sentence structure”.",
      "canonicalTargetKey": "문장의 구조를 배워요.",
      "acceptedAnswers": [
        "문장의 구조를 배워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1256": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Rescue work started at the accident scene”.",
      "canonicalTargetKey": "사고 현장에서 구조 작업이 시작됐어요.",
      "acceptedAnswers": [
        "사고 현장에서 구조 작업이 시작됐어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1257": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We have the right to assert basic human rights guaranteed by the constitution”.",
      "canonicalTargetKey": "헌법이 보장하는 기본 인권을 주장할 권리가 있어요.",
      "acceptedAnswers": [
        "헌법이 보장하는 기본 인권을 주장할 권리가 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l9"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1258": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This exhibition is held on the largest scale in history”.",
      "canonicalTargetKey": "이번 전시회는 역대 최대 규모로 열립니다.",
      "acceptedAnswers": [
        "이번 전시회는 역대 최대 규모로 열립니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "direction-euro",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l1"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1259": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I keep regular lifestyle habits for health”.",
      "canonicalTargetKey": "건강을 위해 규칙적인 생활 습관을 지키고 있어요.",
      "acceptedAnswers": [
        "건강을 위해 규칙적인 생활 습관을 지키고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1260": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Work-life balance is a hot topic”.",
      "canonicalTargetKey": "일과 삶의 균형을 뜻하는 워라밸이 화제예요.",
      "acceptedAnswers": [
        "일과 삶의 균형을 뜻하는 워라밸이 화제예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "possessive-ui",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1261": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Write it down in the notebook exactly as I said”.",
      "canonicalTargetKey": "제가 말한 그대로 공책에 받아 적으세요.",
      "acceptedAnswers": [
        "제가 말한 그대로 공책에 받아 적으세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; particle-or-word-order-ambiguity."
    },
    "s1262": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am meeting a friend I couldn't meet often due to being busy in the meantime”.",
      "canonicalTargetKey": "그동안 바빠서 자주 만나지 못한 친구를 만나요.",
      "acceptedAnswers": [
        "그동안 바빠서 자주 만나지 못한 친구를 만나요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "because-aseo",
        "neg-mot",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l13"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1263": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A popular idol group goes on a world tour concert”.",
      "canonicalTargetKey": "인기 아이돌 그룹이 전 세계 순회공연을 해요.",
      "acceptedAnswers": [
        "인기 아이돌 그룹이 전 세계 순회공연을 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1264": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please check the amount of money to transfer accurately on the screen”.",
      "canonicalTargetKey": "송금할 금액을 화면에서 정확히 확인해 주세요.",
      "acceptedAnswers": [
        "송금할 금액을 화면에서 정확히 확인해 주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1265": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Average temperatures rose rapidly due to climate change”.",
      "canonicalTargetKey": "기후 변화로 인해 평균 기온이 급격히 올랐어요.",
      "acceptedAnswers": [
        "기후 변화로 인해 평균 기온이 급격히 올랐어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1266": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Maintain positive thoughts even in difficult adversity”.",
      "canonicalTargetKey": "어려운 역경 속에서도 긍정적인 생각을 유지해요.",
      "acceptedAnswers": [
        "어려운 역경 속에서도 긍정적인 생각을 유지해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "also-do",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1267": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Greeting is the very first step and basis of good manners”.",
      "canonicalTargetKey": "인사는 예의범절의 가장 첫걸음이자 기본이에요.",
      "acceptedAnswers": [
        "인사는 예의범절의 가장 첫걸음이자 기본이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1268": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I donated a large sum of development fund to the scholarship foundation”.",
      "canonicalTargetKey": "장학 재단에 거액의 발전 기금을 기부했어요.",
      "acceptedAnswers": [
        "장학 재단에 거액의 발전 기금을 기부했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1269": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government plans to continue maintaining the peace settlement keynote”.",
      "canonicalTargetKey": "정부는 평화 정착 기조를 계속 유지할 방침이에요.",
      "acceptedAnswers": [
        "정부는 평화 정착 기조를 계속 유지할 방침이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1270": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A good opportunity to make up for the mistake was given”.",
      "canonicalTargetKey": "실수를 만회할 수 있는 좋은 기회가 주어졌어요.",
      "acceptedAnswers": [
        "실수를 만회할 수 있는 좋은 기회가 주어졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "can-su-itda",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1271": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please adjust the bag strap length to fit your shoulder”.",
      "canonicalTargetKey": "가방끈의 길이가 어깨에 맞게 알맞게 조절하세요.",
      "acceptedAnswers": [
        "가방끈의 길이가 어깨에 맞게 알맞게 조절하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "possessive-ui",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1272": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “In order to solve the problem, study the solution plan deeply”.",
      "canonicalTargetKey": "문제를 해결하기 위해 해결 방안을 깊이 연구해요.",
      "acceptedAnswers": [
        "문제를 해결하기 위해 해결 방안을 깊이 연구해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1273": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I just ate it because they say there are many nutrients in apple skin”.",
      "canonicalTargetKey": "사과 껍질에 영양소가 많다고 해서 그냥 먹었어요.",
      "acceptedAnswers": [
        "사과 껍질에 영양소가 많다고 해서 그냥 먹었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "because-aseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1274": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The puppy follows shaking its tail happily”.",
      "canonicalTargetKey": "강아지가 반갑다고 꼬리를 흔들며 쫓아와요.",
      "acceptedAnswers": [
        "강아지가 반갑다고 꼬리를 흔들며 쫓아와요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-nature-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1275": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Reading books steadily every day is of big help”.",
      "canonicalTargetKey": "매일 꾸준히 책을 읽으면 큰 도움이 돼요.",
      "acceptedAnswers": [
        "매일 꾸준히 책을 읽으면 큰 도움이 돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "if-myeon",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1276": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I achieved the dream of wanting to become a painter when I was young”.",
      "canonicalTargetKey": "어릴 때 화가가 되고 싶어 하던 꿈을 이뤘어요.",
      "acceptedAnswers": [
        "어릴 때 화가가 되고 싶어 하던 꿈을 이뤘어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "and-go",
        "when-ttae",
        "want-go-sipda",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1277": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Successful people endlessly challenge new tasks”.",
      "canonicalTargetKey": "성공한 사람들은 끊임없이 새로운 일에 도전해요.",
      "acceptedAnswers": [
        "성공한 사람들은 끊임없이 새로운 일에 도전해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1278": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because they held out without giving up, they finally did it”.",
      "canonicalTargetKey": "포기하지 않고 버티더니 끝내 해내고 말았어요.",
      "acceptedAnswers": [
        "포기하지 않고 버티더니 끝내 해내고 말았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "neg-ji-anta",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1279": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My age is 22 years old and I study history at university”.",
      "canonicalTargetKey": "제 나이는 스물두 살이고 대학에서 역사 공부해요.",
      "acceptedAnswers": [
        "제 나이는 스물두 살이고 대학에서 역사 공부해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "present-polite",
        "and-go",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1280": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Suddenly a white puppy appeared in the darkness”.",
      "canonicalTargetKey": "어둠 속에서 갑자기 하얀 강아지가 나타났어요.",
      "acceptedAnswers": [
        "어둠 속에서 갑자기 하얀 강아지가 나타났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1281": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I ate without leaving food behind so as not to waste it”.",
      "canonicalTargetKey": "음식을 낭비하지 않으려고 남기지 않고 먹었어요.",
      "acceptedAnswers": [
        "음식을 낭비하지 않으려고 남기지 않고 먹었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "neg-ji-anta",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1282": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This clothing is very popular with male customers”.",
      "canonicalTargetKey": "이 옷은 남성 고객들에게 인기가 아주 높습니다.",
      "acceptedAnswers": [
        "이 옷은 남성 고객들에게 인기가 아주 높습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1283": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed the utility fee payment with the bank mobile app”.",
      "canonicalTargetKey": "은행 모바일 앱으로 공과금 납부를 완료했어요.",
      "acceptedAnswers": [
        "은행 모바일 앱으로 공과금 납부를 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-shopping-u4-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1284": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I organize the daily schedule to prevent wasting time”.",
      "canonicalTargetKey": "시간 낭비를 막기 위해 하루 일정을 정리해 둬요.",
      "acceptedAnswers": [
        "시간 낭비를 막기 위해 하루 일정을 정리해 둬요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1285": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Pretty flowers of the neighbor's garden are visible beyond the window”.",
      "canonicalTargetKey": "창문 너머로 이웃집 정원의 예쁜 꽃들이 보여요.",
      "acceptedAnswers": [
        "창문 너머로 이웃집 정원의 예쁜 꽃들이 보여요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1286": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I measured the classroom width and placed new desks”.",
      "canonicalTargetKey": "교실의 넓이를 측정하여 새 책상을 배치했어요.",
      "acceptedAnswers": [
        "교실의 넓이를 측정하여 새 책상을 배치했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1287": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The water overflowed because I poured it too full in the cup”.",
      "canonicalTargetKey": "컵에 물을 너무 가득 따라 물이 넘쳤어요.",
      "acceptedAnswers": [
        "컵에 물을 너무 가득 따라 물이 넘쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "because-aseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1288": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Farmers grow grains with sincere labor in the field”.",
      "canonicalTargetKey": "농부들이 밭에서 정성 어린 노동으로 곡식을 길러요.",
      "acceptedAnswers": [
        "농부들이 밭에서 정성 어린 노동으로 곡식을 길러요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1289": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I recorded the interview content with the smartphone recording function”.",
      "canonicalTargetKey": "스마트폰 녹음 기능으로 인터뷰 내용을 녹음했어요.",
      "acceptedAnswers": [
        "스마트폰 녹음 기능으로 인터뷰 내용을 녹음했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1290": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “His assertion is persuasive because its logic is orderly”.",
      "canonicalTargetKey": "그의 주장은 논리가 정연해서 설득력이 있어요.",
      "acceptedAnswers": [
        "그의 주장은 논리가 정연해서 설득력이 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "possessive-ui",
        "present-polite",
        "because-aseo",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1291": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The two scholars engaged in a debate over a historical fact”.",
      "canonicalTargetKey": "두 학자는 역사적 사실에 대한 논쟁을 벌였어요.",
      "acceptedAnswers": [
        "두 학자는 역사적 사실에 대한 논쟁을 벌였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1292": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This country developed from a traditional agricultural nation into an industrial state”.",
      "canonicalTargetKey": "이 나라는 전통적인 농업 국가에서 공업국으로 발전했어요.",
      "acceptedAnswers": [
        "이 나라는 전통적인 농업 국가에서 공업국으로 발전했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1293": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Satellite technology is used to measure the mountain's height”.",
      "canonicalTargetKey": "산의 높이를 측정하려고 인공위성 기술을 써요.",
      "acceptedAnswers": [
        "산의 높이를 측정하려고 인공위성 기술을 써요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1294": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I pressed the elevator button 3 with my finger”.",
      "canonicalTargetKey": "엘리베이터의 삼 번 버튼을 손가락으로 눌렀어요.",
      "acceptedAnswers": [
        "엘리베이터의 삼 번 버튼을 손가락으로 눌렀어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "possessive-ui",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1295": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Audiences who watched the sad movie shed some tears”.",
      "canonicalTargetKey": "슬픈 영화를 본 관객들이 눈물을 조금 흘렸어요.",
      "acceptedAnswers": [
        "슬픈 영화를 본 관객들이 눈물을 조금 흘렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1296": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Looking at her warm eyes, I received a lot of comfort”.",
      "canonicalTargetKey": "그녀의 따뜻한 눈빛을 보고 위로를 많이 받았어요.",
      "acceptedAnswers": [
        "그녀의 따뜻한 눈빛을 보고 위로를 많이 받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1297": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Airports are very crowded because international tourists increased”.",
      "canonicalTargetKey": "국제 관광객이 늘어나 공항이 아주 붐빕니다.",
      "acceptedAnswers": [
        "국제 관광객이 늘어나 공항이 아주 붐빕니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "because-aseo",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1298": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My speaking improved because I practiced Korean conversation every day”.",
      "canonicalTargetKey": "매일 한국어 회화를 연습했더니 말하기가 늘었어요.",
      "acceptedAnswers": [
        "매일 한국어 회화를 연습했더니 말하기가 늘었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1299": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am continuing to grow my coding ability as a programmer”.",
      "canonicalTargetKey": "프로그래머로서의 코딩 능력을 계속 키우고 있어요.",
      "acceptedAnswers": [
        "프로그래머로서의 코딩 능력을 계속 키우고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1300": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I rode a taxi and rushed so as not to be late for the appointment”.",
      "canonicalTargetKey": "약속 시간에 늦지 않으려고 택시를 타고 달렸어요.",
      "acceptedAnswers": [
        "약속 시간에 늦지 않으려고 택시를 타고 달렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "neg-ji-anta",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1301": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thinking differently shows a new solution method”.",
      "canonicalTargetKey": "생각을 다르게 하니 새로운 해결 방법이 보여요.",
      "acceptedAnswers": [
        "생각을 다르게 하니 새로운 해결 방법이 보여요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1302": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This shop sells Korean food with a very diverse menu”.",
      "canonicalTargetKey": "이 가게는 아주 다양한 메뉴의 한국 음식을 팔아요.",
      "acceptedAnswers": [
        "이 가게는 아주 다양한 메뉴의 한국 음식을 팔아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1303": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I quarreled badly with my friend yesterday due to a minor misunderstanding”.",
      "canonicalTargetKey": "사소한 오해 때문에 친구와 어제 크게 다퉜어요.",
      "acceptedAnswers": [
        "사소한 오해 때문에 친구와 어제 크게 다퉜어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1304": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It poured rain, but luckily I packed an umbrella so it's fortunate”.",
      "canonicalTargetKey": "비가 쏟아졌지만 다행히 우산을 챙겨서 다행이에요.",
      "acceptedAnswers": [
        "비가 쏟아졌지만 다행히 우산을 챙겨서 다행이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "copula-ieyo",
        "but-jiman",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u8-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1305": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed the first stage of English conversation learning successfully”.",
      "canonicalTargetKey": "영어 회화 학습의 첫 단계를 성공적으로 마쳤어요.",
      "acceptedAnswers": [
        "영어 회화 학습의 첫 단계를 성공적으로 마쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l13"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1306": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This machine's operation is very simple, so it is highly popular”.",
      "canonicalTargetKey": "이 기계는 조작이 아주 단순해서 인기가 높아요.",
      "acceptedAnswers": [
        "이 기계는 조작이 아주 단순해서 인기가 높아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1307": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I merely stated my opinion frankly”.",
      "canonicalTargetKey": "저는 단지 제 의견을 솔직하게 말했을 뿐이에요.",
      "acceptedAnswers": [
        "저는 단지 제 의견을 솔직하게 말했을 뿐이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1308": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The teacher gave a kind answer to my question”.",
      "canonicalTargetKey": "선생님이 제 질문에 친절한 답변을 해주셨어요.",
      "acceptedAnswers": [
        "선생님이 제 질문에 친절한 답변을 해주셨어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "past-polite",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1309": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If you committed a crime, you should naturally be punished”.",
      "canonicalTargetKey": "죄를 지었으면 당연히 벌을 받아야 합니다.",
      "acceptedAnswers": [
        "죄를 지었으면 당연히 벌을 받아야 합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "formal-nida",
        "if-myeon",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1310": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The US is a major power equipped with military and economic strength”.",
      "canonicalTargetKey": "미국은 군사력과 경제력을 갖춘 강대국이에요.",
      "acceptedAnswers": [
        "미국은 군사력과 경제력을 갖춘 강대국이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "with-hago-wa",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1311": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The atmosphere is clear today”.",
      "canonicalTargetKey": "오늘 대기가 맑아요.",
      "acceptedAnswers": [
        "오늘 대기가 맑아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-nature-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1312": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The waiting time before the meeting was long”.",
      "canonicalTargetKey": "회의 전 대기 시간이 길었어요.",
      "acceptedAnswers": [
        "회의 전 대기 시간이 길었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1313": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thank you very much for helping me”.",
      "canonicalTargetKey": "도와주셔서 대단히 감사합니다.",
      "acceptedAnswers": [
        "도와주셔서 대단히 감사합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "because-aseo",
        "formal-nida",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1314": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I faithfully performed the deputy duties during the manager's business trip”.",
      "canonicalTargetKey": "과장님 출장 중에 대리 직무를 충실히 수행했어요.",
      "acceptedAnswers": [
        "과장님 출장 중에 대리 직무를 충실히 수행했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1315": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's meet directly and share a face-to-face conversation instead of internet chatting”.",
      "canonicalTargetKey": "인터넷 대화 대신 직접 만나 대면 대화를 나눠요.",
      "acceptedAnswers": [
        "인터넷 대화 대신 직접 만나 대면 대화를 나눠요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1316": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The Blue House spokesperson officially announced the government's new statement”.",
      "canonicalTargetKey": "청와대 대변인이 정부의 새 성명을 공식 발표했어요.",
      "acceptedAnswers": [
        "청와대 대변인이 정부의 새 성명을 공식 발표했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1317": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We prepare sandbags in provision for heavy winter snowfall”.",
      "canonicalTargetKey": "겨울철 폭설에 대비해 모래주머니를 준비해 둬요.",
      "acceptedAnswers": [
        "겨울철 폭설에 대비해 모래주머니를 준비해 둬요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1318": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The actor recites lines clearly on the stage”.",
      "canonicalTargetKey": "배우가 무대 위에서 대사를 또렷하게 읊조려요.",
      "acceptedAnswers": [
        "배우가 무대 위에서 대사를 또렷하게 읊조려요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-eseo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1319": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We counted limiting the age group of the survey target to the twenties”.",
      "canonicalTargetKey": "조사 대상의 연령대를 이십대로 한정하여 집계했어요.",
      "acceptedAnswers": [
        "조사 대상의 연령대를 이십대로 한정하여 집계했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-study-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1320": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I learned basic algebra formulas in detail at university”.",
      "canonicalTargetKey": "대학교에서 기초 대수학 공식을 상세히 배웠어요.",
      "acceptedAnswers": [
        "대학교에서 기초 대수학 공식을 상세히 배웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-study-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1321": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I want to receive fair treatment matching achievements in the company”.",
      "canonicalTargetKey": "회사에서 성과에 맞게 정당한 대우를 받고 싶어요.",
      "acceptedAnswers": [
        "회사에서 성과에 맞게 정당한 대우를 받고 싶어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "location-e",
        "object-eul-reul",
        "present-polite",
        "want-go-sipda",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1322": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A carbon neutrality policy responding to abnormal climate is needed”.",
      "canonicalTargetKey": "이상 기후에 대응하는 탄소 중립 정책이 필요해요.",
      "acceptedAnswers": [
        "이상 기후에 대응하는 탄소 중립 정책이 필요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1323": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Great chaos came to the disaster region due to the earthquake occurrence”.",
      "canonicalTargetKey": "지진 발생으로 재난 지역에 대혼란이 찾아왔어요.",
      "acceptedAnswers": [
        "지진 발생으로 재난 지역에 대혼란이 찾아왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "location-e",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1324": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I ate cool watermelon to cool down midsummer's hot weather”.",
      "canonicalTargetKey": "한여름의 무더위를 식히려고 시원한 수박을 먹었어요.",
      "acceptedAnswers": [
        "한여름의 무더위를 식히려고 시원한 수박을 먹었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1325": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “As autumn deepens, the autumn sunset is increasingly beautiful”.",
      "canonicalTargetKey": "가을이 깊어질수록 가을 노을이 더욱 아름답습니다.",
      "acceptedAnswers": [
        "가을이 깊어질수록 가을 노을이 더욱 아름답습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1326": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He has excellent skill, and furthermore, his character is humble”.",
      "canonicalTargetKey": "그는 실력이 뛰어난 데다 더욱이 성품도 겸손해요.",
      "acceptedAnswers": [
        "그는 실력이 뛰어난 데다 더욱이 성품도 겸손해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "also-do",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1327": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the doctor's dedication, my disease was cured cleanly”.",
      "canonicalTargetKey": "의사 선생님의 헌신 덕분에 병이 깨끗이 나았어요.",
      "acceptedAnswers": [
        "의사 선생님의 헌신 덕분에 병이 깨끗이 나았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1328": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please be careful because the road floor is very slippery due to rain”.",
      "canonicalTargetKey": "비가 와서 도로 바닥이 무척 미끄러우니 조심하세요.",
      "acceptedAnswers": [
        "비가 와서 도로 바닥이 무척 미끄러우니 조심하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants; particle-or-word-order-ambiguity."
    },
    "s1329": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Seeing the police checkpoint, the thief fled in a hurry”.",
      "canonicalTargetKey": "경찰의 불심검문을 보고 도둑이 황급히 도망갔어요.",
      "acceptedAnswers": [
        "경찰의 불심검문을 보고 도둑이 황급히 도망갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "subject-i-ga",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1330": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I received my friend's help when solving a difficult math problem”.",
      "canonicalTargetKey": "어려운 수학 문제를 풀 때 친구의 도움을 받았어요.",
      "acceptedAnswers": [
        "어려운 수학 문제를 풀 때 친구의 도움을 받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1331": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We conducted employee training at the new technology introduction stage”.",
      "canonicalTargetKey": "새 기술 도입 단계에서 직원 교육을 진행했어요.",
      "acceptedAnswers": [
        "새 기술 도입 단계에서 직원 교육을 진행했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1332": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We continue to challenge endlessly without fearing failure”.",
      "canonicalTargetKey": "실패를 두려워하지 않고 끊임없이 도전을 이어가요.",
      "acceptedAnswers": [
        "실패를 두려워하지 않고 끊임없이 도전을 이어가요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "neg-ji-anta",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1333": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The train station arrival estimated time is 2:30 PM”.",
      "canonicalTargetKey": "기차역 도착 예정 시각은 오후 두 시 반이에요.",
      "acceptedAnswers": [
        "기차역 도착 예정 시각은 오후 두 시 반이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-ieyo",
        "counter-phrase",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1334": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This clothing's design is very unique, so it attracts eyes”.",
      "canonicalTargetKey": "이 옷은 디자인이 아주 독특해서 눈길을 끌어요.",
      "acceptedAnswers": [
        "이 옷은 디자인이 아주 독특해서 눈길을 끌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1335": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A majority of countries escaped colonial rule and became independent”.",
      "canonicalTargetKey": "대다수 국가들이 식민지 지배에서 벗어나 독립했어요.",
      "acceptedAnswers": [
        "대다수 국가들이 식민지 지배에서 벗어나 독립했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1336": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Motivation for learning must be clear to get high learning results”.",
      "canonicalTargetKey": "배움에 대한 동기가 확실해야 학습 성과가 높아요.",
      "acceptedAnswers": [
        "배움에 대한 동기가 확실해야 학습 성과가 높아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1337": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Merchants move busily in the neighborhood market alley”.",
      "canonicalTargetKey": "동네 시장 골목에 상인들이 분주하게 움직여요.",
      "acceptedAnswers": [
        "동네 시장 골목에 상인들이 분주하게 움직여요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l11"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1338": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The two departments work bearing equal rights and responsibilities”.",
      "canonicalTargetKey": "두 부서는 동등한 권리와 책임을 지고 일해요.",
      "acceptedAnswers": [
        "두 부서는 동등한 권리와 책임을 지고 일해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "with-hago-wa",
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1339": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The police are investigating because two incidents occurred at the same time”.",
      "canonicalTargetKey": "두 사건이 동시에 발생해서 경찰이 수사 중이에요.",
      "acceptedAnswers": [
        "두 사건이 동시에 발생해서 경찰이 수사 중이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "copula-ieyo",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1340": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A majority of members actively agreed with his proposal”.",
      "canonicalTargetKey": "그의 제안에 대다수 회원들이 적극 동의했어요.",
      "acceptedAnswers": [
        "그의 제안에 대다수 회원들이 적극 동의했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "location-e",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1341": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Having a reliable companionship on the travel path makes me not lonely”.",
      "canonicalTargetKey": "여행길에 든든한 동행이 있어서 외롭지 않아요.",
      "acceptedAnswers": [
        "여행길에 든든한 동행이 있어서 외롭지 않아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite",
        "neg-ji-anta",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1342": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You cannot turn back past time that has already passed”.",
      "canonicalTargetKey": "이미 지나가버린 과거의 시간을 되돌릴 수는 없어요.",
      "acceptedAnswers": [
        "이미 지나가버린 과거의 시간을 되돌릴 수는 없어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "topic-neun",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1343": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went back home from the bus stop because I left my wallet”.",
      "canonicalTargetKey": "지갑을 두고 와서 버스 정류장에서 집으로 되돌아갔어요.",
      "acceptedAnswers": [
        "지갑을 두고 와서 버스 정류장에서 집으로 되돌아갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "direction-euro",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1344": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The textbook's thickness is thick, so the bag is very heavy”.",
      "canonicalTargetKey": "교과서의 두께가 두꺼워서 가방이 아주 무거워요.",
      "acceptedAnswers": [
        "교과서의 두께가 두꺼워서 가방이 아주 무거워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1345": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You must overcome the fear of failure to succeed”.",
      "canonicalTargetKey": "실패에 대한 두려움을 극복해야 성공할 수 있어요.",
      "acceptedAnswers": [
        "실패에 대한 두려움을 극복해야 성공할 수 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "present-polite",
        "can-su-itda",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1346": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It takes an hour to walk along the lake perimeter”.",
      "canonicalTargetKey": "호수 둘레를 따라 걷는 데 한 시간이 걸립니다.",
      "acceptedAnswers": [
        "호수 둘레를 따라 걷는 데 한 시간이 걸립니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1347": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The space behind the desk is narrow, so the vacuum cleaner doesn't enter”.",
      "canonicalTargetKey": "책상 뒤쪽 공간이 좁아서 청소기가 들어가지 않아요.",
      "acceptedAnswers": [
        "책상 뒤쪽 공간이 좁아서 청소기가 들어가지 않아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "neg-ji-anta",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1348": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After a year of effort, I finally passed the exam”.",
      "canonicalTargetKey": "일 년의 노력 끝에 드디어 시험에 합격했어요.",
      "acceptedAnswers": [
        "일 년의 노력 끝에 드디어 시험에 합격했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1349": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I enjoy watching Korean dramas trending on Netflix”.",
      "canonicalTargetKey": "넷플릭스에서 유행하는 한국 드라마를 즐겨 봐요.",
      "acceptedAnswers": [
        "넷플릭스에서 유행하는 한국 드라마를 즐겨 봐요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l15"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1350": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I presented a pretty carnation to the teacher on Teacher's Day”.",
      "canonicalTargetKey": "스승의 날에 선생님께 예쁜 카네이션을 드렸어요.",
      "acceptedAnswers": [
        "스승의 날에 선생님께 예쁜 카네이션을 드렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1351": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I got a perfect score in the listening evaluation of the language exam”.",
      "canonicalTargetKey": "어학 시험에서 듣기 평가 점수가 만점이 나왔어요.",
      "acceptedAnswers": [
        "어학 시험에서 듣기 평가 점수가 만점이 나왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-study-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1352": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This car's interior space design is very excellent”.",
      "canonicalTargetKey": "이 자동차는 실내 공간 디자인이 아주 훌륭합니다.",
      "acceptedAnswers": [
        "이 자동차는 실내 공간 디자인이 아주 훌륭합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l17"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1353": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I busily followed the footsteps of the senior walking ahead”.",
      "canonicalTargetKey": "앞장서서 걷는 선배의 발걸음을 바쁘게 따라갔어요.",
      "acceptedAnswers": [
        "앞장서서 걷는 선배의 발걸음을 바쁘게 따라갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1354": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Can we pay for the food price separately when calculating”.",
      "canonicalTargetKey": "계산할 때 밥값을 따로 계산해도 될까요?",
      "acceptedAnswers": [
        "계산할 때 밥값을 따로 계산해도 될까요?"
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "also-do",
        "question-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1355": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am pouring sweat playing basketball in the gym in hot summer”.",
      "canonicalTargetKey": "더운 여름에 체육관에서 농구를 하니 땀이 쏟아져요.",
      "acceptedAnswers": [
        "더운 여름에 체육관에서 농구를 하니 땀이 쏟아져요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l9"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1356": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “As it rains in spring, the dry ground became moist”.",
      "canonicalTargetKey": "봄이 되어 비가 내리니 마른 땅이 촉촉해졌어요.",
      "acceptedAnswers": [
        "봄이 되어 비가 내리니 마른 땅이 촉촉해졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-nature-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1357": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Living life, sometimes sad and lonely moments come”.",
      "canonicalTargetKey": "살다 보면 때로 슬프고 외로운 순간이 찾아와요.",
      "acceptedAnswers": [
        "살다 보면 때로 슬프고 외로운 순간이 찾아와요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "subject-i-ga",
        "present-polite",
        "and-go",
        "if-myeon",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l11"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1358": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The police arrested the man who hit the opponent because a fight broke out”.",
      "canonicalTargetKey": "싸움이 나서 경찰이 상대를 때린 남자를 연행했어요.",
      "acceptedAnswers": [
        "싸움이 나서 경찰이 상대를 때린 남자를 연행했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1359": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The train left the platform and started heading to Seoul”.",
      "canonicalTargetKey": "기차가 플랫폼을 떠나 서울로 향하기 시작했어요.",
      "acceptedAnswers": [
        "기차가 플랫폼을 떠나 서울로 향하기 시작했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1360": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Suddenly the memory of reading books in the library when young came to mind”.",
      "canonicalTargetKey": "문득 어릴 때 도서관에서 책을 읽던 기억이 떠올랐어요.",
      "acceptedAnswers": [
        "문득 어릴 때 도서관에서 책을 읽던 기억이 떠올랐어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "subject-i-ga",
        "past-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1361": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I distributed Baekseolgi rice cakes to friendly neighbors after moving”.",
      "canonicalTargetKey": "이사 온 후에 친근한 이웃들에게 백설기 떡을 돌렸어요.",
      "acceptedAnswers": [
        "이사 온 후에 친근한 이웃들에게 백설기 떡을 돌렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1362": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Parents love two children equally without discrimination”.",
      "canonicalTargetKey": "부모님은 두 자녀를 차별 없이 똑같이 사랑하셔요.",
      "acceptedAnswers": [
        "부모님은 두 자녀를 차별 없이 똑같이 사랑하셔요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "subject-i-ga",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-pragmatic-variants",
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-pragmatic-variants; productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1363": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My body got chubby because I gained weight due to a lack of exercise”.",
      "canonicalTargetKey": "운동 부족으로 살이 쪄서 몸이 뚱뚱해졌어요.",
      "acceptedAnswers": [
        "운동 부족으로 살이 쪄서 몸이 뚱뚱해졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1364": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Children are running around and playing energetically in the lawn park”.",
      "canonicalTargetKey": "아이들이 잔디밭 공원에서 활기차게 뛰놀고 있네요.",
      "acceptedAnswers": [
        "아이들이 잔디밭 공원에서 활기차게 뛰놀고 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1365": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please do not touch the boiling water of the kettle because it is too hot”.",
      "canonicalTargetKey": "주전자의 끓는 물이 너무 뜨거우니 만지지 마세요.",
      "acceptedAnswers": [
        "주전자의 끓는 물이 너무 뜨거우니 만지지 마세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "subject-i-ga",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-pragmatic-variants",
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-pragmatic-variants; productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1366": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I checked the deep meaning of the Hangul word in the Korean dictionary”.",
      "canonicalTargetKey": "한글 단어의 깊은 뜻을 국어사전에서 확인했어요.",
      "acceptedAnswers": [
        "한글 단어의 깊은 뜻을 국어사전에서 확인했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1367": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Family members sat around on the country house yard platform and ate”.",
      "canonicalTargetKey": "가족들이 시골 집 마당 평상에 둘러앉아 밥을 먹었어요.",
      "acceptedAnswers": [
        "가족들이 시골 집 마당 평상에 둘러앉아 밥을 먹었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1368": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wore a health mask to prevent colds and block fine dust”.",
      "canonicalTargetKey": "감기 예방과 미세먼지 차단을 위해 보건 마스크를 썼어요.",
      "acceptedAnswers": [
        "감기 예방과 미세먼지 차단을 위해 보건 마스크를 썼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l9"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1369": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “In community life, you should not act as you wish”.",
      "canonicalTargetKey": "공동체 생활에서는 자기 마음대로 행동하면 안 돼요.",
      "acceptedAnswers": [
        "공동체 생활에서는 자기 마음대로 행동하면 안 돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "present-polite",
        "neg-an",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1370": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The two people sat facing the table in the meeting room”.",
      "canonicalTargetKey": "회의실에서 두 사람이 테이블을 마주 보고 앉았어요.",
      "acceptedAnswers": [
        "회의실에서 두 사람이 테이블을 마주 보고 앉았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite",
        "and-go",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l9"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1371": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “She looked as if she already knew all the facts”.",
      "canonicalTargetKey": "그녀는 마치 모든 사실을 다 알고 있는 것처럼 보였어요.",
      "acceptedAnswers": [
        "그녀는 마치 모든 사실을 다 알고 있는 것처럼 보였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1372": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After long research, we finally succeeded in developing a new drug”.",
      "canonicalTargetKey": "오랜 연구 끝에 마침내 신약 개발에 성공했어요.",
      "acceptedAnswers": [
        "오랜 연구 끝에 마침내 신약 개발에 성공했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1373": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I barely caught the last subway train because leaving work was late”.",
      "canonicalTargetKey": "퇴근이 늦어져 지하철 막차를 간신히 잡아탔어요.",
      "acceptedAnswers": [
        "퇴근이 늦어져 지하철 막차를 간신히 잡아탔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1374": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I read the interesting adventure comic book carefully lying down over the weekend”.",
      "canonicalTargetKey": "주말에 누워서 재미있는 모험 만화책을 정독했어요.",
      "acceptedAnswers": [
        "주말에 누워서 재미있는 모험 만화책을 정독했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l15"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1375": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Kind neighbors gave me a lot of help”.",
      "canonicalTargetKey": "친절한 이웃들이 제게 도움을 많이 주셨어요.",
      "acceptedAnswers": [
        "친절한 이웃들이 제게 도움을 많이 주셨어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "honorific-si",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-feelings-u1-l9"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s1376": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Among Korean studies, the speaking domain is the most difficult”.",
      "canonicalTargetKey": "한국어 공부 중에서 말하기 영역이 제일 어렵습니다.",
      "acceptedAnswers": [
        "한국어 공부 중에서 말하기 영역이 제일 어렵습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn6-study-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1377": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because it was a difficult proposal, I hesitated whether to accept or reject it”.",
      "canonicalTargetKey": "어려운 제안이라 수락할지 거절할지 망설였어요.",
      "acceptedAnswers": [
        "어려운 제안이라 수락할지 거절할지 망설였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l1"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1378": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I arrived at the train station waiting room matching the appointment time”.",
      "canonicalTargetKey": "약속 시간에 맞춰 기차역 대합실에 도착했어요.",
      "acceptedAnswers": [
        "약속 시간에 맞춰 기차역 대합실에 도착했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1379": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The singer's sweet voice is a big attraction”.",
      "canonicalTargetKey": "그 가수는 감미로운 목소리가 큰 매력이에요.",
      "acceptedAnswers": [
        "그 가수는 감미로운 목소리가 큰 매력이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1380": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “She tied her long black hair neatly”.",
      "canonicalTargetKey": "그녀는 길고 검은 머리칼을 단정하게 묶었어요.",
      "acceptedAnswers": [
        "그녀는 길고 검은 머리칼을 단정하게 묶었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1381": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am practicing eating a lot of vegetables and fruits for health”.",
      "canonicalTargetKey": "건강을 위해 야채와 과일 많이 먹기를 실천하고 있어요.",
      "acceptedAnswers": [
        "건강을 위해 야채와 과일 많이 먹기를 실천하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "subject-i-ga",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1382": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wiped with a tissue because dust was piled softly on the desk”.",
      "canonicalTargetKey": "책상 위에 먼지가 소복이 쌓여서 휴지로 닦았어요.",
      "acceptedAnswers": [
        "책상 위에 먼지가 소복이 쌓여서 휴지로 닦았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-nature-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1383": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He dressed cool for winter wearing a leather coat”.",
      "canonicalTargetKey": "그는 가죽 코트를 걸쳐서 겨울 멋을 냈어요.",
      "acceptedAnswers": [
        "그는 가죽 코트를 걸쳐서 겨울 멋을 냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1384": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I carefully memoed the meeting important transmission matters in my pocket notebook”.",
      "canonicalTargetKey": "수첩에 회의 중요 전달 사항을 꼼꼼히 메모했어요.",
      "acceptedAnswers": [
        "수첩에 회의 중요 전달 사항을 꼼꼼히 메모했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1385": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I took the company new employee public recruitment interview calmly”.",
      "canonicalTargetKey": "회사 신입 사원 공채 면접을 침착하게 치렀어요.",
      "acceptedAnswers": [
        "회사 신입 사원 공채 면접을 침착하게 치렀어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "if-myeon",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1386": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The soldier moved quickly hearing the general's solemn command”.",
      "canonicalTargetKey": "군인이 장군의 준엄한 명령을 듣고 신속히 움직였어요.",
      "acceptedAnswers": [
        "군인이 장군의 준엄한 명령을 듣고 신속히 움직였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1387": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The whole family gathered at the country grandmother's house on Chuseok holiday”.",
      "canonicalTargetKey": "추석 명절에 온 가족이 시골 할머니 댁에 모였어요.",
      "acceptedAnswers": [
        "추석 명절에 온 가족이 시골 할머니 댁에 모였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l11"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1388": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The department members gathered in the meeting room all cast yes votes”.",
      "canonicalTargetKey": "회의실에 모인 부서원들이 모두 찬성표를 던졌어요.",
      "acceptedAnswers": [
        "회의실에 모인 부서원들이 모두 찬성표를 던졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-feelings-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1389": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am saving money every month to buy a new computer”.",
      "canonicalTargetKey": "새 컴퓨터를 사려고 매달 저금을 모으고 있어요.",
      "acceptedAnswers": [
        "새 컴퓨터를 사려고 매달 저금을 모으고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1390": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I plan to attend the college alumni meeting on weekend evening”.",
      "canonicalTargetKey": "주말 저녁에 대학 동창 모임에 참석할 예정이에요.",
      "acceptedAnswers": [
        "주말 저녁에 대학 동창 모임에 참석할 예정이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "copula-ieyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l10"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1391": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This report's purpose is verifying the feasibility of business planning”.",
      "canonicalTargetKey": "이 보고서는 사업 기획의 타당성 검증이 목적이에요.",
      "acceptedAnswers": [
        "이 보고서는 사업 기획의 타당성 검증이 목적이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1392": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I set raising all subject grades this semester as the goal”.",
      "canonicalTargetKey": "이번 학기에 전 과목 성적 올리기를 목표로 잡았어요.",
      "acceptedAnswers": [
        "이번 학기에 전 과목 성적 올리기를 목표로 잡았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1393": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I got a body ache all over due to carrying moving luggage all day”.",
      "canonicalTargetKey": "하루 종일 이삿짐을 나르느라 온몸에 몸살이 났어요.",
      "acceptedAnswers": [
        "하루 종일 이삿짐을 나르느라 온몸에 몸살이 났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1394": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I usually eat out on weekends because I can't cook well”.",
      "canonicalTargetKey": "요리를 잘 못해서 보통 주말에는 외식을 해요.",
      "acceptedAnswers": [
        "요리를 잘 못해서 보통 주말에는 외식을 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "present-polite",
        "because-aseo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1395": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The weight of the delivery box is too heavy, so it is hard to lift”.",
      "canonicalTargetKey": "택배 상자의 무게가 너무 무거워서 들기 힘들어요.",
      "acceptedAnswers": [
        "택배 상자의 무게가 너무 무거워서 들기 힘들어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1396": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The Wi-Fi service inside the library is all free”.",
      "canonicalTargetKey": "도서관 내부의 와이파이 서비스는 모두 무료입니다.",
      "acceptedAnswers": [
        "도서관 내부의 와이파이 서비스는 모두 무료입니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "topic-neun",
        "formal-nida",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1397": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I used the fire station first-aid kit because my knee bled falling down”.",
      "canonicalTargetKey": "넘어져서 무릎에 피가 나니 소방서 구급상자를 썼어요.",
      "acceptedAnswers": [
        "넘어져서 무릎에 피가 나니 소방서 구급상자를 썼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l10"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1398": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The act of ignoring the opponent's opinion is not correct”.",
      "canonicalTargetKey": "상대방의 의견을 무시하는 행동은 옳지 않아요.",
      "acceptedAnswers": [
        "상대방의 의견을 무시하는 행동은 옳지 않아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "topic-neun",
        "present-polite",
        "neg-ji-anta"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1399": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There are huge tombs of ancient kings near the museum”.",
      "canonicalTargetKey": "박물관 근처에 고대 왕들의 거대한 무덤이 있네요.",
      "acceptedAnswers": [
        "박물관 근처에 고대 왕들의 거대한 무덤이 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "possessive-ui",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1400": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A shirt with a check pattern is pretty to wear in autumn”.",
      "canonicalTargetKey": "체크 무늬가 들어간 셔츠가 가을에 입기 예뻐요.",
      "acceptedAnswers": [
        "체크 무늬가 들어간 셔츠가 가을에 입기 예뻐요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1401": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My parents were exceedingly happy hearing the news of passing”.",
      "canonicalTargetKey": "합격했다는 소식을 듣고 부모님이 무척 기뻐하셨어요.",
      "acceptedAnswers": [
        "합격했다는 소식을 듣고 부모님이 무척 기뻐하셨어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "subject-i-ga",
        "and-go",
        "honorific-si",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1402": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Going grocery shopping is scary because prices of goods rose too much recently”.",
      "canonicalTargetKey": "최근 물가가 너무 많이 올라서 시장보기가 무서워요.",
      "acceptedAnswers": [
        "최근 물가가 너무 많이 올라서 시장보기가 무서워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1403": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I took items in the bag out onto the desk”.",
      "canonicalTargetKey": "가방 안에 든 물건들을 책상 위에 꺼내놓았어요.",
      "acceptedAnswers": [
        "가방 안에 든 물건들을 책상 위에 꺼내놓았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1404": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Naturally I will help with that work, of course”.",
      "canonicalTargetKey": "그 일은 당연히 제가 도와드리지요, 물론입니다.",
      "acceptedAnswers": [
        "그 일은 당연히 제가 도와드리지요, 물론입니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "question-polite",
        "formal-nida",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-pragmatic-variants."
    },
    "s1405": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The student hesitated to answer at the teacher's sharp question”.",
      "canonicalTargetKey": "선생님의 날카로운 물음에 학생이 대답을 망설였어요.",
      "acceptedAnswers": [
        "선생님의 날카로운 물음에 학생이 대답을 망설였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "location-e",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-study-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1406": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I bought boarding tickets in advance fearing the train might be sold out”.",
      "canonicalTargetKey": "기차가 매진될까 봐 미리 승차표를 사 두었어요.",
      "acceptedAnswers": [
        "기차가 매진될까 봐 미리 승차표를 사 두었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l13"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1407": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I reserved at my regular hair salon to do my hair newly over the weekend”.",
      "canonicalTargetKey": "주말에 머리를 새로 하려고 단골 미용실에 예약했어요.",
      "acceptedAnswers": [
        "주말에 머리를 새로 하려고 단골 미용실에 예약했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "and-go",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1408": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Grandmother hums a traditional folk song with a joyful tune”.",
      "canonicalTargetKey": "할머니가 흥겨운 가락의 전통 민요를 흥얼거리셔요.",
      "acceptedAnswers": [
        "할머니가 흥겨운 가락의 전통 민요를 흥얼거리셔요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1409": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The Korean ethnic group has shared a long history in the Korean peninsula”.",
      "canonicalTargetKey": "한민족은 한반도에서 오랜 역사를 함께 해 왔어요.",
      "acceptedAnswers": [
        "한민족은 한반도에서 오랜 역사를 함께 해 왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l10"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1410": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Having a deep trust in each other makes us long friends”.",
      "canonicalTargetKey": "서로에 대한 깊은 믿음이 있어야 오랜 친구가 돼요.",
      "acceptedAnswers": [
        "서로에 대한 깊은 믿음이 있어야 오랜 친구가 돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1411": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I appreciated a famous artist's sculpture artwork at that art gallery”.",
      "canonicalTargetKey": "그 미술관에서 유명 작가의 조각 작품을 감상했어요.",
      "acceptedAnswers": [
        "그 미술관에서 유명 작가의 조각 작품을 감상했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l17"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1412": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The president and the assembly must cooperate to stabilize politics”.",
      "canonicalTargetKey": "대통령과 국회가 협력하여 정치를 안정시켜야 해요.",
      "acceptedAnswers": [
        "대통령과 국회가 협력하여 정치를 안정시켜야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1413": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Instead of making a phone call, I visited the office in person”.",
      "canonicalTargetKey": "전화를 거는 대신 직접 사무실에 방문했어요.",
      "acceptedAnswers": [
        "전화를 거는 대신 직접 사무실에 방문했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1414": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After much debate, we finally drew up an agreement”.",
      "canonicalTargetKey": "많은 논쟁 끝에 결국 합의안을 도출해 냈어요.",
      "acceptedAnswers": [
        "많은 논쟁 끝에 결국 합의안을 도출해 냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1415": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I conducted a price comparison of products at the internet shopping mall”.",
      "canonicalTargetKey": "인터넷 쇼핑몰에서 제품의 가격 비교를 진행했어요.",
      "acceptedAnswers": [
        "인터넷 쇼핑몰에서 제품의 가격 비교를 진행했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1416": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We learned several sports such as soccer and basketball in PE class”.",
      "canonicalTargetKey": "체육 시간에 축구와 농구 등 여러 스포츠를 배웠어요.",
      "acceptedAnswers": [
        "체육 시간에 축구와 농구 등 여러 스포츠를 배웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l18"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1417": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The assembly representative attended the meeting to establish the bill”.",
      "canonicalTargetKey": "국회의원이 법안 제정을 위해 회의에 참석했어요.",
      "acceptedAnswers": [
        "국회의원이 법안 제정을 위해 회의에 참석했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1418": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I made a request to the teacher to write a recommendation letter”.",
      "canonicalTargetKey": "선생님께 추천서를 써달라는 부탁을 드렸어요.",
      "acceptedAnswers": [
        "선생님께 추천서를 써달라는 부탁을 드렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l6"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1419": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I applied for computer utilization training at the local resident center”.",
      "canonicalTargetKey": "동네 주민 센터에서 컴퓨터 활용 교육을 신청했어요.",
      "acceptedAnswers": [
        "동네 주민 센터에서 컴퓨터 활용 교육을 신청했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1420": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They are getting married next month after a long dating period”.",
      "canonicalTargetKey": "그들은 오랜 연애 끝에 다음 달에 결혼을 해요.",
      "acceptedAnswers": [
        "그들은 오랜 연애 끝에 다음 달에 결혼을 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1421": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I learned a strong challenging spirit even in a difficult environment”.",
      "canonicalTargetKey": "어려운 환경에서도 강인한 도전 정신을 배웠어요.",
      "acceptedAnswers": [
        "어려운 환경에서도 강인한 도전 정신을 배웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1422": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “An additional fee incurred when purchasing train tickets”.",
      "canonicalTargetKey": "기차표 구매 시 추가 수수료가 발생했어요.",
      "acceptedAnswers": [
        "기차표 구매 시 추가 수수료가 발생했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1423": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Grandfather told me words that serve as a lesson”.",
      "canonicalTargetKey": "할아버지께서 제게 교훈이 되는 말씀을 해주셨어요.",
      "acceptedAnswers": [
        "할아버지께서 제게 교훈이 되는 말씀을 해주셨어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "honorific-si",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s1424": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We newly installed a traffic light and crosswalk in the park”.",
      "canonicalTargetKey": "공원에 신호등과 횡단보도를 새로 설치했어요.",
      "acceptedAnswers": [
        "공원에 신호등과 횡단보도를 새로 설치했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "with-hago-wa",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l6"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1425": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I keep family photos in the smartphone gallery album”.",
      "canonicalTargetKey": "스마트폰 갤러리 앨범에 가족 사진을 보관해요.",
      "acceptedAnswers": [
        "스마트폰 갤러리 앨범에 가족 사진을 보관해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l15"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1426": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They frankly admitted their mistake and apologized”.",
      "canonicalTargetKey": "자신의 잘못을 솔직하게 인정하고 사과했어요.",
      "acceptedAnswers": [
        "자신의 잘못을 솔직하게 인정하고 사과했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "with-hago-wa",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1427": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Peace was broken due to the war between the two nations”.",
      "canonicalTargetKey": "두 국가 사이의 전쟁으로 평화가 깨졌어요.",
      "acceptedAnswers": [
        "두 국가 사이의 전쟁으로 평화가 깨졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1428": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Among Korean dishes, I particularly like bibimbap”.",
      "canonicalTargetKey": "저는 한국 요리 중에서 특히 비빔밥을 좋아해요.",
      "acceptedAnswers": [
        "저는 한국 요리 중에서 특히 비빔밥을 좋아해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1429": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I plan to go on an overseas backpacking trip during the vacation period”.",
      "canonicalTargetKey": "방학 기간 동안 해외 배낭 여행을 떠날 예정이에요.",
      "acceptedAnswers": [
        "방학 기간 동안 해외 배낭 여행을 떠날 예정이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1430": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I met a resident who was near the scene at the time of the incident”.",
      "canonicalTargetKey": "사건 당시 현장 근처에 있던 주민을 만났어요.",
      "acceptedAnswers": [
        "사건 당시 현장 근처에 있던 주민을 만났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1431": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I picked up the pencil that fell on the classroom floor below the blackboard”.",
      "canonicalTargetKey": "칠판 아래 교실 바닥에 떨어진 연필을 주웠어요.",
      "acceptedAnswers": [
        "칠판 아래 교실 바닥에 떨어진 연필을 주웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1432": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the doctor's prescription, my cold was completely cured”.",
      "canonicalTargetKey": "의사의 처방 덕분에 감기가 완전하게 나았어요.",
      "acceptedAnswers": [
        "의사의 처방 덕분에 감기가 완전하게 나았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1433": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The environmental committee discussed global warming countermeasures”.",
      "canonicalTargetKey": "환경 위원회에서 지구 온난화 대책을 논의했어요.",
      "acceptedAnswers": [
        "환경 위원회에서 지구 온난화 대책을 논의했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1434": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We changed players to strengthen the offense in the soccer match”.",
      "canonicalTargetKey": "축구 경기에서 공격을 강화하기 위해 선수를 바꿨어요.",
      "acceptedAnswers": [
        "축구 경기에서 공격을 강화하기 위해 선수를 바꿨어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l18"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1435": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He is a famous model active on the fashion show stage”.",
      "canonicalTargetKey": "그는 패션쇼 무대에서 활약하는 유명 모델이에요.",
      "acceptedAnswers": [
        "그는 패션쇼 무대에서 활약하는 유명 모델이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1436": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I walked home quickly because rain started falling”.",
      "canonicalTargetKey": "비가 내리기 시작해서 집으로 빨리 걸어갔어요.",
      "acceptedAnswers": [
        "비가 내리기 시작해서 집으로 빨리 걸어갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1437": {
      "typedClass": "canonical",
      "examPromptEn": "In a formal presentation, with this hotel already established as the topic, state that it is famous for friendly customer service. Use 고객 서비스 and 유명하다.",
      "canonicalTargetKey": "이 호텔은 친절한 고객 서비스로 유명합니다.",
      "acceptedAnswers": [
        "이 호텔은 친절한 고객 서비스로 유명합니다."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "direction-euro",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1438": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We newly adopted the company's electronic approval system”.",
      "canonicalTargetKey": "회사의 전자 결재 시스템을 새로 도입했어요.",
      "acceptedAnswers": [
        "회사의 전자 결재 시스템을 새로 도입했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l7"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1439": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A part of the members showed dissatisfaction with the new rule establishment”.",
      "canonicalTargetKey": "회원들의 일부가 새 규칙 제정에 불만을 나타냈어요.",
      "acceptedAnswers": [
        "회원들의 일부가 새 규칙 제정에 불만을 나타냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1440": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I must visit several provincial cities due to a business trip”.",
      "canonicalTargetKey": "출장 때문에 지방 여러 도시를 다녀와야 해요.",
      "acceptedAnswers": [
        "출장 때문에 지방 여러 도시를 다녀와야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1441": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A citizen organization is carrying out an environmental protection campaign”.",
      "canonicalTargetKey": "시민 단체에서 환경 보호 캠페인을 벌이고 있어요.",
      "acceptedAnswers": [
        "시민 단체에서 환경 보호 캠페인을 벌이고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l14"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1442": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I drank cool orange juice instead of coffee”.",
      "canonicalTargetKey": "커피 대신 시원한 오렌지 주스를 마셨어요.",
      "acceptedAnswers": [
        "커피 대신 시원한 오렌지 주스를 마셨어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "honorific-si",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1443": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I spent the vacation in a quiet and peaceful country village”.",
      "canonicalTargetKey": "조용하고 한적한 시골 마을에서 휴가를 보냈어요.",
      "acceptedAnswers": [
        "조용하고 한적한 시골 마을에서 휴가를 보냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1444": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We decided to change the way we solve the problem”.",
      "canonicalTargetKey": "우리는 문제를 해결하는 방식을 바꾸기로 했어요.",
      "acceptedAnswers": [
        "우리는 문제를 해결하는 방식을 바꾸기로 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1445": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A big traffic accident happened on the road, so the path is jammed tight”.",
      "canonicalTargetKey": "도로에서 큰 교통 사고가 나서 길이 꽉 막혔어요.",
      "acceptedAnswers": [
        "도로에서 큰 교통 사고가 나서 길이 꽉 막혔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1446": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I met the teacher who taught students for a long time at school”.",
      "canonicalTargetKey": "학교에서 오랫동안 학생을 가르친 선생을 만났어요.",
      "acceptedAnswers": [
        "학교에서 오랫동안 학생을 가르친 선생을 만났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l9"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1447": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They became a popular star overnight through YouTube broadcasting”.",
      "canonicalTargetKey": "유튜브 방송을 통해 하루아침에 인기 스타가 되었어요.",
      "acceptedAnswers": [
        "유튜브 방송을 통해 하루아침에 인기 스타가 되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "subject-i-ga",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l18"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1448": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I checked and restored the internet network connection state”.",
      "canonicalTargetKey": "인터넷망 연결 상태를 점검하여 복구했어요.",
      "acceptedAnswers": [
        "인터넷망 연결 상태를 점검하여 복구했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l3"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1449": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Parents' positive thoughts have a big influence on children”.",
      "canonicalTargetKey": "부모님의 긍정적인 생각은 자녀에게 큰 영향을 줘요.",
      "acceptedAnswers": [
        "부모님의 긍정적인 생각은 자녀에게 큰 영향을 줘요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1450": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I gifted handmade chocolate I made myself for my friend's birthday”.",
      "canonicalTargetKey": "친구 생일에 직접 만든 수제 초콜릿을 선물했어요.",
      "acceptedAnswers": [
        "친구 생일에 직접 만든 수제 초콜릿을 선물했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1451": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I appreciated the history documentary video at the museum”.",
      "canonicalTargetKey": "박물관에서 역사 다큐멘터리 영상을 감상했어요.",
      "acceptedAnswers": [
        "박물관에서 역사 다큐멘터리 영상을 감상했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l10"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1452": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I collected relevant statistical data for writing the report”.",
      "canonicalTargetKey": "보고서 작성을 위해 관련 통계 자료를 수집했어요.",
      "acceptedAnswers": [
        "보고서 작성을 위해 관련 통계 자료를 수집했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1453": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We investigated a radius of 1 kilometer centered on the subway station exit”.",
      "canonicalTargetKey": "지하철역 출구 중심 반경 일 킬로미터를 조사했어요.",
      "acceptedAnswers": [
        "지하철역 출구 중심 반경 일 킬로미터를 조사했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1454": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please actively express your honest emotions”.",
      "canonicalTargetKey": "자신의 솔직한 감정을 적극적으로 표현해 보세요.",
      "acceptedAnswers": [
        "자신의 솔직한 감정을 적극적으로 표현해 보세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "direction-euro",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; productive-word-order-family."
    },
    "s1455": {
      "typedClass": "canonical",
      "examPromptEn": "In a formal workplace announcement, with this rule already established as the topic, state that it applies only to employees of the relevant department. Use 적용되다.",
      "canonicalTargetKey": "이 규칙은 해당 부서 직원들에게만 적용됩니다.",
      "acceptedAnswers": [
        "이 규칙은 해당 부서 직원들에게만 적용됩니다."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "only-man"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1456": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The newspaper article covered global environmental pollution conditions”.",
      "canonicalTargetKey": "신문 기사에서 세계 환경 오염 실태를 다뤘어요.",
      "acceptedAnswers": [
        "신문 기사에서 세계 환경 오염 실태를 다뤘어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1457": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I saw the Earth photo taken by the astronaut in the spaceship”.",
      "canonicalTargetKey": "우주 비행사가 우주선에서 찍은 지구 사진을 봤어요.",
      "acceptedAnswers": [
        "우주 비행사가 우주선에서 찍은 지구 사진을 봤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-nature-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1458": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A new year welcoming event is held on the first weekend of this year”.",
      "canonicalTargetKey": "올해 첫째 주말에 신년맞이 행사가 개최됩니다.",
      "acceptedAnswers": [
        "올해 첫째 주말에 신년맞이 행사가 개최됩니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1459": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Residents of this apartment hold a neighborhood meeting every month”.",
      "canonicalTargetKey": "이 아파트 주민들은 매월 반상회를 개최해요.",
      "acceptedAnswers": [
        "이 아파트 주민들은 매월 반상회를 개최해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1460": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He faithfully performs the president role in our club”.",
      "canonicalTargetKey": "그는 우리 동호회에서 회장 역할을 충실히 해요.",
      "acceptedAnswers": [
        "그는 우리 동호회에서 회장 역할을 충실히 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1461": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The historical novel that writer wrote became a bestseller”.",
      "canonicalTargetKey": "그 작가가 쓴 역사 소설이 베스트셀러가 되었어요.",
      "acceptedAnswers": [
        "그 작가가 쓴 역사 소설이 베스트셀러가 되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1462": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Maintaining a clean environment is essential for human health”.",
      "canonicalTargetKey": "인간의 건강을 위해 깨끗한 환경 유지가 필수예요.",
      "acceptedAnswers": [
        "인간의 건강을 위해 깨끗한 환경 유지가 필수예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-nature-u2-l16"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1463": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed writing the project result report on the computer”.",
      "canonicalTargetKey": "컴퓨터로 프로젝트 결과 보고서 작성을 완료했어요.",
      "acceptedAnswers": [
        "컴퓨터로 프로젝트 결과 보고서 작성을 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1464": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please sit on the chair with a correct posture during class”.",
      "canonicalTargetKey": "수업 시간에 바른 자세로 의자에 앉으세요.",
      "acceptedAnswers": [
        "수업 시간에 바른 자세로 의자에 앉으세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "direction-euro",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1465": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The dictionary's explanation is very accurate, so it helps studies”.",
      "canonicalTargetKey": "사전의 뜻풀이가 아주 정확해서 공부에 도움 돼요.",
      "acceptedAnswers": [
        "사전의 뜻풀이가 아주 정확해서 공부에 도움 돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "location-e",
        "present-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1466": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Republic of Korea citizens have duties of national defense and tax payment”.",
      "canonicalTargetKey": "대한민국 국민은 국방과 납세의 의무가 있습니다.",
      "acceptedAnswers": [
        "대한민국 국민은 국방과 납세의 의무가 있습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "with-hago-wa",
        "possessive-ui",
        "subject-i-ga",
        "formal-nida",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1467": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This city became wealthy with the development of the IT industry”.",
      "canonicalTargetKey": "이 도시는 정보 통신 산업의 발전으로 부유해졌어요.",
      "acceptedAnswers": [
        "이 도시는 정보 통신 산업의 발전으로 부유해졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1468": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government announced emergency measures to solve the housing shortage”.",
      "canonicalTargetKey": "정부는 주택난 해결을 위한 긴급 대책을 발표했어요.",
      "acceptedAnswers": [
        "정부는 주택난 해결을 위한 긴급 대책을 발표했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1469": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He is deeply majoring in German literature at university”.",
      "canonicalTargetKey": "그는 대학교에서 독일 문학을 깊이 전공하고 있어요.",
      "acceptedAnswers": [
        "그는 대학교에서 독일 문학을 깊이 전공하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "subject-i-ga",
        "with-hago-wa",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1470": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I joined the university Korean conversation club and practice”.",
      "canonicalTargetKey": "대학교 한국어 회화 동아리에 가입해 연습해요.",
      "acceptedAnswers": [
        "대학교 한국어 회화 동아리에 가입해 연습해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1471": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The bride wore a dazzlingly white wedding dress at the wedding”.",
      "canonicalTargetKey": "신부가 결혼식에서 눈부시게 하얀 웨딩 드레스를 입었어요.",
      "acceptedAnswers": [
        "신부가 결혼식에서 눈부시게 하얀 웨딩 드레스를 입었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1472": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Project progress is delayed due to frequent friction between departments”.",
      "canonicalTargetKey": "부서 간의 잦은 마찰로 프로젝트 진행이 지연돼요.",
      "acceptedAnswers": [
        "부서 간의 잦은 마찰로 프로젝트 진행이 지연돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "direction-euro",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1473": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am studying social reform movements of the late Joseon Dynasty period”.",
      "canonicalTargetKey": "조선 시대 말기의 사회 개혁 운동을 연구하고 있어요.",
      "acceptedAnswers": [
        "조선 시대 말기의 사회 개혁 운동을 연구하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "with-hago-wa",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1474": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The puppy causes trouble every day, so the house is untidy”.",
      "canonicalTargetKey": "강아지가 매일 말썽을 부려서 집안이 어수선해요.",
      "acceptedAnswers": [
        "강아지가 매일 말썽을 부려서 집안이 어수선해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1475": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There are many customers in the department store winter new product clothing shop”.",
      "canonicalTargetKey": "백화점 겨울 신상품 의류 매장에 손님이 많아요.",
      "acceptedAnswers": [
        "백화점 겨울 신상품 의류 매장에 손님이 많아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1476": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our house gives an open feeling because the living room area is wide”.",
      "canonicalTargetKey": "우리 집은 거실 면적이 넓어서 탁 트인 느낌을 줘요.",
      "acceptedAnswers": [
        "우리 집은 거실 면적이 넓어서 탁 트인 느낌을 줘요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "object-eul-reul",
        "because-aseo",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1477": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I heard the exact official designation of this sculpture from the scholar”.",
      "canonicalTargetKey": "이 조각품의 정확한 공식 명칭을 학자에게 들었어요.",
      "acceptedAnswers": [
        "이 조각품의 정확한 공식 명칭을 학자에게 들었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1478": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He enjoys the adventure of exploring various unexplored parts of the world”.",
      "canonicalTargetKey": "그는 세계 여러 미개척지를 탐험하는 모험을 즐겨요.",
      "acceptedAnswers": [
        "그는 세계 여러 미개척지를 탐험하는 모험을 즐겨요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1479": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I took a bath after work drawing warm water in the bathtub”.",
      "canonicalTargetKey": "퇴근 후에 욕조에 따뜻한 물을 받아 목욕을 했어요.",
      "acceptedAnswers": [
        "퇴근 후에 욕조에 따뜻한 물을 받아 목욕을 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1480": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “She records audiobooks in a calm and clear voice”.",
      "canonicalTargetKey": "그녀는 차분하고 맑은 목소리로 오디오북을 녹음해요.",
      "acceptedAnswers": [
        "그녀는 차분하고 맑은 목소리로 오디오북을 녹음해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "with-hago-wa",
        "direction-euro",
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1481": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The singer appeared on the stage with colorful lights turned on”.",
      "canonicalTargetKey": "가수가 화려한 조명이 켜진 무대 위로 등장했어요.",
      "acceptedAnswers": [
        "가수가 화려한 조명이 켜진 무대 위로 등장했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l18"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1482": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Korea is a representative trading nation achieving economic growth through export”.",
      "canonicalTargetKey": "한국은 수출을 통해 경제 성장을 이룬 대표 무역 국가예요.",
      "acceptedAnswers": [
        "한국은 수출을 통해 경제 성장을 이룬 대표 무역 국가예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1483": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Since we are late anyway, let's not rush and go safely”.",
      "canonicalTargetKey": "어차피 늦었으니 서두르지 말고 안전하게 갑시다.",
      "acceptedAnswers": [
        "어차피 늦었으니 서두르지 말고 안전하게 갑시다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1484": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You must keep the rules properly to maintain community order”.",
      "canonicalTargetKey": "규칙을 제대로 지켜야 공동체 질서가 유지돼요.",
      "acceptedAnswers": [
        "규칙을 제대로 지켜야 공동체 질서가 유지돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1485": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This is an important secret between the two of us”.",
      "canonicalTargetKey": "이것은 우리 두 사람 사이의 중요한 비밀이에요.",
      "acceptedAnswers": [
        "이것은 우리 두 사람 사이의 중요한 비밀이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "copula-ieyo",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1486": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He was inevitably absent today due to a body ache cold”.",
      "canonicalTargetKey": "그는 몸살 감기 때문에 오늘 부득이하게 결석했어요.",
      "acceptedAnswers": [
        "그는 몸살 감기 때문에 오늘 부득이하게 결석했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "past-polite",
        "when-ttae",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1487": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Mother is preparing dinner in the kitchen”.",
      "canonicalTargetKey": "어머니가 주방에서 저녁 식사 준비를 하십니다.",
      "acceptedAnswers": [
        "어머니가 주방에서 저녁 식사 준비를 하십니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul",
        "honorific-si",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1488": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I live in a newly built modern apartment near the station”.",
      "canonicalTargetKey": "역 근처에 새로 지은 현대식 아파트에 살아요.",
      "acceptedAnswers": [
        "역 근처에 새로 지은 현대식 아파트에 살아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1489": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We must prepare a rational solution to the conflict situation”.",
      "canonicalTargetKey": "갈등 상황의 합리적인 해결책을 마련해야 해요.",
      "acceptedAnswers": [
        "갈등 상황의 합리적인 해결책을 마련해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1490": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I spread a mat and lay down on the cool riverside lawn”.",
      "canonicalTargetKey": "시원한 강가 잔디밭에 돗자리를 펴고 누웠어요.",
      "acceptedAnswers": [
        "시원한 강가 잔디밭에 돗자리를 펴고 누웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "object-eul-reul",
        "and-go",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1491": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Children play joyfully on the park green lawn”.",
      "canonicalTargetKey": "공원 푸른 잔디밭에서 아이들이 신나게 뛰놀아요.",
      "acceptedAnswers": [
        "공원 푸른 잔디밭에서 아이들이 신나게 뛰놀아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1492": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “As autumn comes, the whole mountain is dyed in red autumn leaves”.",
      "canonicalTargetKey": "가을이 오니 산 전체가 붉은 단풍으로 물들었어요.",
      "acceptedAnswers": [
        "가을이 오니 산 전체가 붉은 단풍으로 물들었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "topic-neun",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1493": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please listen to my words to the end”.",
      "canonicalTargetKey": "제발 제 말을 끝까지 들어주세요.",
      "acceptedAnswers": [
        "제발 제 말을 끝까지 들어주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "until-kkaji",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l1"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1494": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Today's meeting is scheduled to start at 2 PM”.",
      "canonicalTargetKey": "오늘 회의는 오후 두 시에 시작될 예정이에요.",
      "acceptedAnswers": [
        "오늘 회의는 오후 두 시에 시작될 예정이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-ieyo",
        "counter-phrase",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1495": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I review listening to online lectures via the internet”.",
      "canonicalTargetKey": "인터넷으로 온라인 강의를 들으며 복습해요.",
      "acceptedAnswers": [
        "인터넷으로 온라인 강의를 들으며 복습해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l4"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1496": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He frankly acknowledged his mistake”.",
      "canonicalTargetKey": "그는 자신의 잘못을 솔직히 인정했어요.",
      "acceptedAnswers": [
        "그는 자신의 잘못을 솔직히 인정했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l1"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1497": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is important to unfold one's claim logically”.",
      "canonicalTargetKey": "자신의 주장을 논리적으로 펴는 것이 중요해요.",
      "acceptedAnswers": [
        "자신의 주장을 논리적으로 펴는 것이 중요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "direction-euro",
        "topic-neun",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1498": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Drama filming is in progress at the park entrance”.",
      "canonicalTargetKey": "공원 입구에서 드라마 촬영이 진행 중이에요.",
      "acceptedAnswers": [
        "공원 입구에서 드라마 촬영이 진행 중이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l16"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1499": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I checked the new exam schedule on the school homepage”.",
      "canonicalTargetKey": "학교 홈페이지에서 새 시험 일정을 확인했어요.",
      "acceptedAnswers": [
        "학교 홈페이지에서 새 시험 일정을 확인했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l7"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1500": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Researchers study policies at the government agency”.",
      "canonicalTargetKey": "정부 기관에서 연구원들이 정책을 연구해요.",
      "acceptedAnswers": [
        "정부 기관에서 연구원들이 정책을 연구해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1501": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Environmental protection is needed to prevent global warming”.",
      "canonicalTargetKey": "지구 온난화를 막기 위해 환경 보호가 필요해요.",
      "acceptedAnswers": [
        "지구 온난화를 막기 위해 환경 보호가 필요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1502": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I waited for my friend for a long time at the train station stop”.",
      "canonicalTargetKey": "기차역 정류장에서 친구를 오래 기다렸어요.",
      "acceptedAnswers": [
        "기차역 정류장에서 친구를 오래 기다렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1503": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I checked the plane ticket at the Incheon Airport entrance”.",
      "canonicalTargetKey": "인천 공항 입구에서 비행기 표를 확인했어요.",
      "acceptedAnswers": [
        "인천 공항 입구에서 비행기 표를 확인했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1504": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The movie director guides acting at the filming scene”.",
      "canonicalTargetKey": "영화감독이 촬영 현장에서 연기를 지도해요.",
      "acceptedAnswers": [
        "영화감독이 촬영 현장에서 연기를 지도해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1505": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The site supervisor checks safety”.",
      "canonicalTargetKey": "현장 감독이 안전을 확인해요.",
      "acceptedAnswers": [
        "현장 감독이 안전을 확인해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1506": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because the schedule suddenly changed, I canceled the train ticket”.",
      "canonicalTargetKey": "일정이 갑자기 변경되어 기차표를 취소했어요.",
      "acceptedAnswers": [
        "일정이 갑자기 변경되어 기차표를 취소했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l6"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1507": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government's new environmental policy was announced today”.",
      "canonicalTargetKey": "정부의 새로운 환경 정책이 오늘 발표되었어요.",
      "acceptedAnswers": [
        "정부의 새로운 환경 정책이 오늘 발표되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1508": {
      "typedClass": "canonical",
      "examPromptEn": "A classmate asks what was newly reorganized. In ordinary polite Korean, answer that your company organization was reorganized. Use 조직 and 개편되다.",
      "canonicalTargetKey": "우리 회사 조직이 새로 개편되었어요.",
      "acceptedAnswers": [
        "우리 회사 조직이 새로 개편되었어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1509": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The opponent of this soccer match is an extremely strong team”.",
      "canonicalTargetKey": "이번 축구 시합의 상대는 대단히 강한 팀이에요.",
      "acceptedAnswers": [
        "이번 축구 시합의 상대는 대단히 강한 팀이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l18"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1510": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I read English novels in the library every weekend”.",
      "canonicalTargetKey": "주말마다 도서관에서 영어 소설을 읽어요.",
      "acceptedAnswers": [
        "주말마다 도서관에서 영어 소설을 읽어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1511": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This traditional food originally has a strong spicy taste”.",
      "canonicalTargetKey": "이 전통 음식은 원래 매운 맛이 강해요.",
      "acceptedAnswers": [
        "이 전통 음식은 원래 매운 맛이 강해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1512": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You must watch your eating habits to maintain health”.",
      "canonicalTargetKey": "건강 유지를 위해 식습관을 조심해야 해요.",
      "acceptedAnswers": [
        "건강 유지를 위해 식습관을 조심해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1513": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I showed the entry right card at the museum entrance”.",
      "canonicalTargetKey": "박물관 입구에서 입장 권리 카드를 보였어요.",
      "acceptedAnswers": [
        "박물관 입구에서 입장 권리 카드를 보였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1514": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I received cold treatment quickly at the hospital internal medicine clinic”.",
      "canonicalTargetKey": "병원 내과에서 감기 치료를 신속히 받았어요.",
      "acceptedAnswers": [
        "병원 내과에서 감기 치료를 신속히 받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1515": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This exam result is reflected in the teacher's teaching evaluation”.",
      "canonicalTargetKey": "이번 시험 결과가 교사의 교수 평가에 반영돼요.",
      "acceptedAnswers": [
        "이번 시험 결과가 교사의 교수 평가에 반영돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1516": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I did an eyesight test at the optician because my eyes were uncomfortable”.",
      "canonicalTargetKey": "눈이 불편해서 안경원에서 시력 검사를 했어요.",
      "acceptedAnswers": [
        "눈이 불편해서 안경원에서 시력 검사를 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1517": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The prosecutor handles the criminal case”.",
      "canonicalTargetKey": "검사가 범죄 사건을 맡아요.",
      "acceptedAnswers": [
        "검사가 범죄 사건을 맡아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1518": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Tourists from all over the country gather in Seoul”.",
      "canonicalTargetKey": "전국 각지에서 관광객들이 서울로 모여들어요.",
      "acceptedAnswers": [
        "전국 각지에서 관광객들이 서울로 모여들어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1519": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The doctor checks the sickroom patient's condition carefully”.",
      "canonicalTargetKey": "의사가 병실 환자의 상태를 꼼꼼히 체크해요.",
      "acceptedAnswers": [
        "의사가 병실 환자의 상태를 꼼꼼히 체크해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1520": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The Republic of Korea is a country where tradition and modernity harmonize”.",
      "canonicalTargetKey": "대한민국은 전통과 현대가 조화를 이룬 나라예요.",
      "acceptedAnswers": [
        "대한민국은 전통과 현대가 조화를 이룬 나라예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "with-hago-wa",
        "subject-i-ga",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1521": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The gym internal exercise facilities are very well equipped”.",
      "canonicalTargetKey": "체육관 내부 운동 시설이 아주 잘 되어 위치해요.",
      "acceptedAnswers": [
        "체육관 내부 운동 시설이 아주 잘 되어 위치해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-travel-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1522": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed large-capacity data processing with the computer”.",
      "canonicalTargetKey": "컴퓨터로 대용량 데이터 처리를 완료했어요.",
      "acceptedAnswers": [
        "컴퓨터로 대용량 데이터 처리를 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l7"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1523": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “His claim is in the exact opposite direction of my thought”.",
      "canonicalTargetKey": "그의 주장은 제 생각과 정반대 방향이에요.",
      "acceptedAnswers": [
        "그의 주장은 제 생각과 정반대 방향이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "with-hago-wa",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l4"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1524": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They overcame obstacles and won victory even in a difficult situation”.",
      "canonicalTargetKey": "어려운 상황에서도 장애를 딛고 우승했어요.",
      "acceptedAnswers": [
        "어려운 상황에서도 장애를 딛고 우승했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1525": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please explain the exact meaning difference between the two words”.",
      "canonicalTargetKey": "두 단어의 정확한 의미 차이를 설명해 주세요.",
      "acceptedAnswers": [
        "두 단어의 정확한 의미 차이를 설명해 주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1526": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The smartphone camera feature's resolution is extremely good”.",
      "canonicalTargetKey": "스마트폰 카메라 기능의 화질이 대단히 좋아요.",
      "acceptedAnswers": [
        "스마트폰 카메라 기능의 화질이 대단히 좋아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1527": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I plan to go on a business trip to Daejeon taking the train”.",
      "canonicalTargetKey": "기차를 타고 대전에 출장을 다녀올 예정이에요.",
      "acceptedAnswers": [
        "기차를 타고 대전에 출장을 다녀올 예정이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "copula-ieyo",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1528": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government promotes developing alternative resources to fossil fuels”.",
      "canonicalTargetKey": "정부는 화석 연료 대체 자원 개발을 추진해요.",
      "acceptedAnswers": [
        "정부는 화석 연료 대체 자원 개발을 추진해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1529": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Walking the dark alley alone carries risk”.",
      "canonicalTargetKey": "어두운 골목을 혼자 걷는 것은 위험이 따라요.",
      "acceptedAnswers": [
        "어두운 골목을 혼자 걷는 것은 위험이 따라요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "subject-i-ga",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l5"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1530": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The place I live now is much wider and more comfortable than the previous apartment”.",
      "canonicalTargetKey": "이전 아파트보다 지금 사는 곳이 훨씬 넓고 편해요.",
      "acceptedAnswers": [
        "이전 아파트보다 지금 사는 곳이 훨씬 넓고 편해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "and-go",
        "time-expression",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1531": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please refer to the textbook formulas when doing math homework”.",
      "canonicalTargetKey": "수학 숙제를 할 때 교과서 공식을 참고하세요.",
      "acceptedAnswers": [
        "수학 숙제를 할 때 교과서 공식을 참고하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "imperative-seyo",
        "when-ttae",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1532": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The smartphone design I saw in the TV commercial is pretty”.",
      "canonicalTargetKey": "텔레비전 광고에서 본 스마트폰 디자인이 예뻐요.",
      "acceptedAnswers": [
        "텔레비전 광고에서 본 스마트폰 디자인이 예뻐요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1533": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I lost the paper writing the phone number written in my wallet”.",
      "canonicalTargetKey": "지갑에 적어둔 전화번호가 적힌 종이를 잃어버렸어요.",
      "acceptedAnswers": [
        "지갑에 적어둔 전화번호가 적힌 종이를 잃어버렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1534": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wrote the major agendas of this meeting on the blackboard”.",
      "canonicalTargetKey": "이번 회의의 주요 안건들을 칠판에 적었어요.",
      "acceptedAnswers": [
        "이번 회의의 주요 안건들을 칠판에 적었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l4"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1535": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The Earth's environmental pollution problem is getting severe day by day”.",
      "canonicalTargetKey": "지구 환경 오염 문제가 갈수록 심각해지고 있어요.",
      "acceptedAnswers": [
        "지구 환경 오염 문제가 갈수록 심각해지고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-nature-u1-l13"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1536": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We hold this year's national marathon competition near city hall”.",
      "canonicalTargetKey": "올해 전국 마라톤 대회를 시청 근처에서 개최해요.",
      "acceptedAnswers": [
        "올해 전국 마라톤 대회를 시청 근처에서 개최해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1537": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I efficiently utilized the room's narrow space to place the bed”.",
      "canonicalTargetKey": "방의 좁은 공간을 효율적으로 활용해 침대를 놓았어요.",
      "acceptedAnswers": [
        "방의 좁은 공간을 효율적으로 활용해 침대를 놓았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1538": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The development speed of the modern IT industry is very fast”.",
      "canonicalTargetKey": "현대 정보 통신 산업의 발전 속도는 매우 빠릅니다.",
      "acceptedAnswers": [
        "현대 정보 통신 산업의 발전 속도는 매우 빠릅니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1539": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The president election date is marked in red on the calendar”.",
      "canonicalTargetKey": "대통령 선거 날짜가 달력에 빨간색으로 표시되었어요.",
      "acceptedAnswers": [
        "대통령 선거 날짜가 달력에 빨간색으로 표시되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1540": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is good to solve homework by yourself without others' help”.",
      "canonicalTargetKey": "숙제는 남의 도움 없이 스스로 해결하는 것이 좋아요.",
      "acceptedAnswers": [
        "숙제는 남의 도움 없이 스스로 해결하는 것이 좋아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1541": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Looking at artworks in the art gallery, I felt the beauty of art”.",
      "canonicalTargetKey": "미술관의 미술품들을 보며 예술의 아름다움을 느꼈어요.",
      "acceptedAnswers": [
        "미술관의 미술품들을 보며 예술의 아름다움을 느꼈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l16"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1542": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Interest of foreigners in Korean culture is very great lately”.",
      "canonicalTargetKey": "요즘 한국 문화에 대한 외국인의 관심이 무척 커요.",
      "acceptedAnswers": [
        "요즘 한국 문화에 대한 외국인의 관심이 무척 커요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "possessive-ui",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1543": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government's legal system was strengthened for consumer protection”.",
      "canonicalTargetKey": "소비자 보호를 위해 정부의 법률 제도가 강화되었어요.",
      "acceptedAnswers": [
        "소비자 보호를 위해 정부의 법률 제도가 강화되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1544": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I analyzed and corrected the error code on the computer screen”.",
      "canonicalTargetKey": "컴퓨터 화면에서 에러 코드를 분석하여 수정했어요.",
      "acceptedAnswers": [
        "컴퓨터 화면에서 에러 코드를 분석하여 수정했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1545": {
      "typedClass": "canonical",
      "examPromptEn": "A classmate asks what was damaged. In ordinary polite Korean, answer that the skin tissue was damaged. Use 피부 조직 and 손상되다.",
      "canonicalTargetKey": "피부 조직이 손상됐어요.",
      "acceptedAnswers": [
        "피부 조직이 손상됐어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1546": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The new phone model comes out next month”.",
      "canonicalTargetKey": "새 휴대폰 모델이 다음 달에 나와요.",
      "acceptedAnswers": [
        "새 휴대폰 모델이 다음 달에 나와요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "copula-ieyo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1547": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This restaurant has a dress code”.",
      "canonicalTargetKey": "이 식당은 드레스 코드를 지켜요.",
      "acceptedAnswers": [
        "이 식당은 드레스 코드를 지켜요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l4"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1548": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I left a satisfaction review on the internet shopping mall review board”.",
      "canonicalTargetKey": "인터넷 쇼핑몰 후기 게시판에 만족 후기를 남겼어요.",
      "acceptedAnswers": [
        "인터넷 쇼핑몰 후기 게시판에 만족 후기를 남겼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1549": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Consumer reaction to the newly released smartphone is very hot”.",
      "canonicalTargetKey": "새로 출시된 스마트폰에 대한 소비자 반응이 아주 뜨거워요.",
      "acceptedAnswers": [
        "새로 출시된 스마트폰에 대한 소비자 반응이 아주 뜨거워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1550": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I improved performance greatly by installing the app's latest version”.",
      "canonicalTargetKey": "앱의 최신 버전을 설치하여 성능을 크게 개선했어요.",
      "acceptedAnswers": [
        "앱의 최신 버전을 설치하여 성능을 크게 개선했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1551": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “When the baseball season started, the area near the stadium got very crowded”.",
      "canonicalTargetKey": "야구 시즌이 시작되자 경기장 근처가 무척 붐빕니다.",
      "acceptedAnswers": [
        "야구 시즌이 시작되자 경기장 근처가 무척 붐빕니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l18"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1552": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed moving to another provincial city taking the train”.",
      "canonicalTargetKey": "기차를 타고 다른 지방 도시로 이동을 완료했어요.",
      "acceptedAnswers": [
        "기차를 타고 다른 지방 도시로 이동을 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1553": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After tidying the desk drawer, the study room is very clean”.",
      "canonicalTargetKey": "책상 서랍 정리를 마치니 공부방이 아주 깨끗해요.",
      "acceptedAnswers": [
        "책상 서랍 정리를 마치니 공부방이 아주 깨끗해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1554": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I like apples the most among Korean fruits”.",
      "canonicalTargetKey": "저는 한국 과일 중에서 사과를 제일 좋아합니다.",
      "acceptedAnswers": [
        "저는 한국 과일 중에서 사과를 제일 좋아합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1555": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I read the main character's tragic death scene in the history novel”.",
      "canonicalTargetKey": "역사 소설에서 주인공의 비극적인 죽음 장면을 읽었어요.",
      "acceptedAnswers": [
        "역사 소설에서 주인공의 비극적인 죽음 장면을 읽었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l10"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1556": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This comic character design is extremely cute and unique”.",
      "canonicalTargetKey": "이 만화 캐릭터 디자인이 대단히 귀엽고 독특해요.",
      "acceptedAnswers": [
        "이 만화 캐릭터 디자인이 대단히 귀엽고 독특해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l19"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1557": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I finally found the umbrella I left in the library at that time”.",
      "canonicalTargetKey": "그때 도서관에 두고 온 우산을 드디어 찾았어요.",
      "acceptedAnswers": [
        "그때 도서관에 두고 온 우산을 드디어 찾았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "and-go",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1558": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Since we are busy now, let's handle this work later”.",
      "canonicalTargetKey": "지금은 바쁘니 이 일은 나중에 처리하도록 합시다.",
      "acceptedAnswers": [
        "지금은 바쁘니 이 일은 나중에 처리하도록 합시다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "propositive-eyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1559": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I conveyed my sorry heart to my friend for being late for the appointment”.",
      "canonicalTargetKey": "친구에게 약속 시간에 늦어 미안한 마음을 전했어요.",
      "acceptedAnswers": [
        "친구에게 약속 시간에 늦어 미안한 마음을 전했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1560": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our company contracted with an external company procuring parts”.",
      "canonicalTargetKey": "우리 회사는 부품을 조달하는 외부 업체와 계약했어요.",
      "acceptedAnswers": [
        "우리 회사는 부품을 조달하는 외부 업체와 계약했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "with-hago-wa",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1561": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This restaurant is a famous stew eatery near the department store”.",
      "canonicalTargetKey": "이 식당은 백화점 근처 유명 찌개 맛집이에요.",
      "acceptedAnswers": [
        "이 식당은 백화점 근처 유명 찌개 맛집이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1562": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The plan itself is excellent, but the budget to execute it lacks”.",
      "canonicalTargetKey": "계획 자체는 훌륭하지만 실행할 예산이 부족해요.",
      "acceptedAnswers": [
        "계획 자체는 훌륭하지만 실행할 예산이 부족해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "only-man",
        "subject-i-ga",
        "present-polite",
        "but-jiman"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l4"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1563": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I finished editing project documents with the computer”.",
      "canonicalTargetKey": "컴퓨터로 프로젝트 문서 편집 작업을 끝냈어요.",
      "acceptedAnswers": [
        "컴퓨터로 프로젝트 문서 편집 작업을 끝냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1564": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wrote my home address in the passport application form with a black ballpoint pen”.",
      "canonicalTargetKey": "여권 신청서에 집 주소를 검은 볼펜으로 적었어요.",
      "acceptedAnswers": [
        "여권 신청서에 집 주소를 검은 볼펜으로 적었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "topic-neun",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1565": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If you have an extra pencil in your bag by any chance, lend it”.",
      "canonicalTargetKey": "혹시 가방 안에 여분의 연필이 있으면 빌려주세요.",
      "acceptedAnswers": [
        "혹시 가방 안에 여분의 연필이 있으면 빌려주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "possessive-ui",
        "subject-i-ga",
        "imperative-seyo",
        "if-myeon",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants",
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants; productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1566": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Taking the new cold medicine has the effect of immediately easing symptoms”.",
      "canonicalTargetKey": "새 감기약을 먹으니 증상이 즉각 완화되는 효과가 있네요.",
      "acceptedAnswers": [
        "새 감기약을 먹으니 증상이 즉각 완화되는 효과가 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1567": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We analyzed the causes of market price rises from various angles”.",
      "canonicalTargetKey": "시장 물가 상승의 원인을 다각적으로 분석했어요.",
      "acceptedAnswers": [
        "시장 물가 상승의 원인을 다각적으로 분석했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1568": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I introduced my university friend to my parents at the family gathering”.",
      "canonicalTargetKey": "가족 모임에서 제 대학교 친구를 부모님께 소개했어요.",
      "acceptedAnswers": [
        "가족 모임에서 제 대학교 친구를 부모님께 소개했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l14"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1569": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Standing on the presentation stage, my heart beat quickly pit-a-pat”.",
      "canonicalTargetKey": "발표 무대에 서니 심장이 두근두근 빠르게 뛰었어요.",
      "acceptedAnswers": [
        "발표 무대에 서니 심장이 두근두근 빠르게 뛰었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l10"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1570": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This apartment's contract conditions are very advantageous to me”.",
      "canonicalTargetKey": "이 아파트의 계약 조건이 저에게 매우 유리해요.",
      "acceptedAnswers": [
        "이 아파트의 계약 조건이 저에게 매우 유리해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1571": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I signed the housing provision fund loan contract at the bank”.",
      "canonicalTargetKey": "은행에서 주택 마련 자금 대출 계약서에 서명했어요.",
      "acceptedAnswers": [
        "은행에서 주택 마련 자금 대출 계약서에 서명했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1572": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Next weekend, I am going on a train trip to my hometown Daegu”.",
      "canonicalTargetKey": "다음 주말에 고향인 대구로 기차 여행을 다녀와요.",
      "acceptedAnswers": [
        "다음 주말에 고향인 대구로 기차 여행을 다녀와요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1573": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I sent the related article internet link to the KakaoTalk chat room”.",
      "canonicalTargetKey": "카카오톡 대화방에 관련 기사 인터넷 링크를 보냈어요.",
      "acceptedAnswers": [
        "카카오톡 대화방에 관련 기사 인터넷 링크를 보냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1574": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our Korean study group members increased to five people”.",
      "canonicalTargetKey": "우리 한국어 공부 모임 멤버가 다섯 명으로 늘었어요.",
      "acceptedAnswers": [
        "우리 한국어 공부 모임 멤버가 다섯 명으로 늘었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l14"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1575": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I applied for a lecture by a doctor majoring in computer science”.",
      "canonicalTargetKey": "컴퓨터 사이언스를 전공한 박사의 강의를 신청했어요.",
      "acceptedAnswers": [
        "컴퓨터 사이언스를 전공한 박사의 강의를 신청했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1576": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Since the weather is cold, let's enter a warm cafe first of all”.",
      "canonicalTargetKey": "날씨가 추우니 일단 따뜻한 카페로 들어갑시다.",
      "acceptedAnswers": [
        "날씨가 추우니 일단 따뜻한 카페로 들어갑시다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1577": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You must absolutely never forget to keep the appointment time”.",
      "canonicalTargetKey": "약속 시간을 지키는 것은 절대 잊어버리면 안 돼요.",
      "acceptedAnswers": [
        "약속 시간을 지키는 것은 절대 잊어버리면 안 돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "present-polite",
        "neg-an",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1578": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The attitude of taking responsibility for one's mistake is courage”.",
      "canonicalTargetKey": "자신의 실수에 대해 책임을 지는 태도가 용기예요.",
      "acceptedAnswers": [
        "자신의 실수에 대해 책임을 지는 태도가 용기예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "location-e",
        "object-eul-reul",
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1579": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The cloud's shape changes to a beautiful appearance moment by moment”.",
      "canonicalTargetKey": "구름의 형태가 시시각각 아름다운 모습으로 변해요.",
      "acceptedAnswers": [
        "구름의 형태가 시시각각 아름다운 모습으로 변해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l4"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1580": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A newly built modern building stands tall near city hall”.",
      "canonicalTargetKey": "시청 근처에 새로 지은 현대식 건물이 우뚝 서 있네요.",
      "acceptedAnswers": [
        "시청 근처에 새로 지은 현대식 건물이 우뚝 서 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l11"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1581": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “She is the only student who speaks German in our club”.",
      "canonicalTargetKey": "그녀는 우리 동아리에서 독일어를 하는 유일한 학생이에요.",
      "acceptedAnswers": [
        "그녀는 우리 동아리에서 독일어를 하는 유일한 학생이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-feelings-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1582": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This place is the village where I lived with my grandmother when young”.",
      "canonicalTargetKey": "이곳은 제가 어릴 때 할머니와 함께 산 마을이에요.",
      "acceptedAnswers": [
        "이곳은 제가 어릴 때 할머니와 함께 산 마을이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "with-hago-wa",
        "copula-ieyo",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l11"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1583": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I study to learn expertise in the IT field”.",
      "canonicalTargetKey": "정보기술 분야의 전문 지식을 배우려고 연구해요.",
      "acceptedAnswers": [
        "정보기술 분야의 전문 지식을 배우려고 연구해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1584": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Due to traffic congestion, vehicles are packed tight on the road floor”.",
      "canonicalTargetKey": "교통 체증으로 인해 도로 바닥에 차량들이 꽉 차 있어요.",
      "acceptedAnswers": [
        "교통 체증으로 인해 도로 바닥에 차량들이 꽉 차 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "location-e",
        "subject-i-ga",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l11"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1585": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The scholar translated ancient Korean novels into Hangul for the first time”.",
      "canonicalTargetKey": "그 학자는 최초로 한국 고대 소설을 한글로 번역했어요.",
      "acceptedAnswers": [
        "그 학자는 최초로 한국 고대 소설을 한글로 번역했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "direction-euro",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1586": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's not forget our dreams even in front of difficult reality”.",
      "canonicalTargetKey": "어려운 현실 앞에서도 우리의 꿈을 잊지 맙시다.",
      "acceptedAnswers": [
        "어려운 현실 앞에서도 우리의 꿈을 잊지 맙시다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "possessive-ui",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1587": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I check the mailbox frequently because I am curious about passing”.",
      "canonicalTargetKey": "합격 여부가 너무 궁금해서 메일함을 자주 확인해요.",
      "acceptedAnswers": [
        "합격 여부가 너무 궁금해서 메일함을 자주 확인해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1588": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “With the appearance of smartphones, humanity's lifestyle changed completely”.",
      "canonicalTargetKey": "스마트폰의 등장으로 인류 생활 방식이 완전히 변했어요.",
      "acceptedAnswers": [
        "스마트폰의 등장으로 인류 생활 방식이 완전히 변했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "direction-euro",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1589": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Consumers' service improvement demands were conveyed to the company”.",
      "canonicalTargetKey": "소비자들의 서비스 개선 요구가 회사에 전달되었어요.",
      "acceptedAnswers": [
        "소비자들의 서비스 개선 요구가 회사에 전달되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1590": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I installed a cooling device to cool heat inside the computer”.",
      "canonicalTargetKey": "컴퓨터 내부에 열을 식히는 냉각 장치를 설치했어요.",
      "acceptedAnswers": [
        "컴퓨터 내부에 열을 식히는 냉각 장치를 설치했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "topic-neun",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1591": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The department store discounts up to a maximum of 50 percent during this sale”.",
      "canonicalTargetKey": "이번 세일 기간에 백화점은 최대 오십 퍼센트 할인해요.",
      "acceptedAnswers": [
        "이번 세일 기간에 백화점은 최대 오십 퍼센트 할인해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "topic-neun",
        "present-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1592": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Firefighters strived in lifesaving rescue at the fire scene all night”.",
      "canonicalTargetKey": "소방관들이 화재 현장에서 밤새 인명 구조에 매진했어요.",
      "acceptedAnswers": [
        "소방관들이 화재 현장에서 밤새 인명 구조에 매진했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l11"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1593": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He works as the president of the university Korean study club”.",
      "canonicalTargetKey": "그는 대학교 한국어 학습 동아리 회장으로 일해요.",
      "acceptedAnswers": [
        "그는 대학교 한국어 학습 동아리 회장으로 일해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1594": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It's already been three months since I started studying Korean”.",
      "canonicalTargetKey": "저는 한국어를 배운 지 벌써 삼 개월이 다 되었어요.",
      "acceptedAnswers": [
        "저는 한국어를 배운 지 벌써 삼 개월이 다 되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "subject-i-ga",
        "copula-ieyo",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1595": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Considering the price, I selected cheap clothes instead of the bag”.",
      "canonicalTargetKey": "가격을 고려해서 가방 대신 저렴한 옷을 선택했어요.",
      "acceptedAnswers": [
        "가격을 고려해서 가방 대신 저렴한 옷을 선택했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1596": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “In the interview, you must answer your thoughts honestly”.",
      "canonicalTargetKey": "면접에서는 본인의 생각을 솔직하게 답변해야 해요.",
      "acceptedAnswers": [
        "면접에서는 본인의 생각을 솔직하게 답변해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1597": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Buying coffee at the convenience store gets you a 1+1 promotion”.",
      "canonicalTargetKey": "편의점에서 커피를 사니 원 플러스 원 이벤트를 하네요.",
      "acceptedAnswers": [
        "편의점에서 커피를 사니 원 플러스 원 이벤트를 하네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l19"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1598": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Meeting Korean friends often improved my Hangul speaking skill”.",
      "canonicalTargetKey": "한국 친구를 자주 만나니 한글 말하기 실력이 늘었어요.",
      "acceptedAnswers": [
        "한국 친구를 자주 만나니 한글 말하기 실력이 늘었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l13"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1599": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I saw Joseon Dynasty traditional pottery artworks at the museum”.",
      "canonicalTargetKey": "박물관에서 조선 시대 전통 도자기 작품들을 봤어요.",
      "acceptedAnswers": [
        "박물관에서 조선 시대 전통 도자기 작품들을 봤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l11"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1600": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Acts causing harm to others in public places are prohibited”.",
      "canonicalTargetKey": "공공장소에서 타인에게 피해를 주는 행위는 금지예요.",
      "acceptedAnswers": [
        "공공장소에서 타인에게 피해를 주는 행위는 금지예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "topic-neun",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1601": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Today at 10 AM, the weekly meeting is held in the office”.",
      "canonicalTargetKey": "오늘 오전 열 시에 사무실에서 주간 회의가 열려요.",
      "acceptedAnswers": [
        "오늘 오전 열 시에 사무실에서 주간 회의가 열려요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "time-expression",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1602": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I strengthened security to protect smartphone personal information”.",
      "canonicalTargetKey": "스마트폰 개인 정보 보호를 위해 보안을 강화했어요.",
      "acceptedAnswers": [
        "스마트폰 개인 정보 보호를 위해 보안을 강화했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l10"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1603": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Experience has a precious value that cannot be converted into money”.",
      "canonicalTargetKey": "경험은 돈으로 환산할 수 없는 소중한 가치가 있어요.",
      "acceptedAnswers": [
        "경험은 돈으로 환산할 수 없는 소중한 가치가 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "can-su-itda",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1604": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Read the example sentences of the two words aloud once each”.",
      "canonicalTargetKey": "두 단어의 예시 문장을 각각 한 번씩 소리 내어 읽으세요.",
      "acceptedAnswers": [
        "두 단어의 예시 문장을 각각 한 번씩 소리 내어 읽으세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1605": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We decided to pay the food price each after the meal ended”.",
      "canonicalTargetKey": "식사가 끝난 후에 밥값은 각자 계산하기로 했어요.",
      "acceptedAnswers": [
        "식사가 끝난 후에 밥값은 각자 계산하기로 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "topic-neun",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l10"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1606": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My fingers have no feeling exposed to winter weather too long”.",
      "canonicalTargetKey": "겨울 날씨에 너무 오래 노출되어 손가락 감각이 없어요.",
      "acceptedAnswers": [
        "겨울 날씨에 너무 오래 노출되어 손가락 감각이 없어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "existence-itda",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l10"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1607": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The teacher emphasized the important formula with a red pen”.",
      "canonicalTargetKey": "교사가 칠판에 빨간색 볼펜으로 중요 공식을 강조했어요.",
      "acceptedAnswers": [
        "교사가 칠판에 빨간색 볼펜으로 중요 공식을 강조했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1608": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government officially announced road traffic environment upgrade measures”.",
      "canonicalTargetKey": "정부는 도로 교통 환경 개선 대책을 공식 발표했어요.",
      "acceptedAnswers": [
        "정부는 도로 교통 환경 개선 대책을 공식 발표했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1609": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He designs clothes with his own clear individuality”.",
      "canonicalTargetKey": "그는 자신만의 개성이 뚜렷한 옷을 디자인해요.",
      "acceptedAnswers": [
        "그는 자신만의 개성이 뚜렷한 옷을 디자인해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1610": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “When solving problems, an objective perspective is important instead of emotions”.",
      "canonicalTargetKey": "문제를 해결할 때는 감정 대신 객관적 관점이 중요해요.",
      "acceptedAnswers": [
        "문제를 해결할 때는 감정 대신 객관적 관점이 중요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1611": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A spider is spinning a pretty web in the living room ceiling corner”.",
      "canonicalTargetKey": "거실 천장 구석에 거미가 예쁜 거미줄을 치고 있네요.",
      "acceptedAnswers": [
        "거실 천장 구석에 거미가 예쁜 거미줄을 치고 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1612": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “All the claims he made finally turned out to be lies”.",
      "canonicalTargetKey": "그가 한 모든 주장이 결국 거짓으로 밝혀졌어요.",
      "acceptedAnswers": [
        "그가 한 모든 주장이 결국 거짓으로 밝혀졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1613": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Large apartment complex construction is in full swing downtown”.",
      "canonicalTargetKey": "시내 중심가에 대형 아파트 단지 건설이 한창이에요.",
      "acceptedAnswers": [
        "시내 중심가에 대형 아파트 단지 건설이 한창이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l11"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1614": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Winter climate is dry in the atmosphere, so watch out for forest fires”.",
      "canonicalTargetKey": "겨울철 기후는 대기가 무척 건조해서 산불을 조심해야 해요.",
      "acceptedAnswers": [
        "겨울철 기후는 대기가 무척 건조해서 산불을 조심해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn4-nature-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1615": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I searched the location of Seoul historical ruins with my smartphone”.",
      "canonicalTargetKey": "스마트폰으로 서울 역사 유적지 위치를 검색했어요.",
      "acceptedAnswers": [
        "스마트폰으로 서울 역사 유적지 위치를 검색했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1616": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Seeing a fierce puppy in the alley, I fled in fear”.",
      "canonicalTargetKey": "골목길에서 사나운 강아지를 보고 겁이 나 도망갔어요.",
      "acceptedAnswers": [
        "골목길에서 사나운 강아지를 보고 겁이 나 도망갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "subject-i-ga",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1617": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the senior's warm encouragement, I endured the hard period”.",
      "canonicalTargetKey": "선배의 따뜻한 격려 덕분에 힘든 시기를 버텼어요.",
      "acceptedAnswers": [
        "선배의 따뜻한 격려 덕분에 힘든 시기를 버텼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1618": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We engaged in a long discussion, but finally couldn't make a final conclusion”.",
      "canonicalTargetKey": "오랜 토론을 벌였으나 결국 최종 결론을 내리지 못했어요.",
      "acceptedAnswers": [
        "오랜 토론을 벌였으나 결국 최종 결론을 내리지 못했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "neg-mot"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1619": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our baseball team advanced to the finals, receiving nationwide interest”.",
      "canonicalTargetKey": "우리 야구 팀이 결승에 진출해서 전국적인 관심을 받아요.",
      "acceptedAnswers": [
        "우리 야구 팀이 결승에 진출해서 전국적인 관심을 받아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1620": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I discovered a technical defect inside the new computer system”.",
      "canonicalTargetKey": "새 컴퓨터 시스템 내부의 기술적 결함을 발견했어요.",
      "acceptedAnswers": [
        "새 컴퓨터 시스템 내부의 기술적 결함을 발견했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1621": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The police officer warned the pedestrian crossing the crosswalk illegally”.",
      "canonicalTargetKey": "경찰관이 횡단보도를 무단 횡단하는 보행자에게 경고했어요.",
      "acceptedAnswers": [
        "경찰관이 횡단보도를 무단 횡단하는 보행자에게 경고했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1622": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wrote my career working as a programmer at a large company on the resume”.",
      "canonicalTargetKey": "이력서에 대기업에서 프로그래머로 일한 경력을 적었어요.",
      "acceptedAnswers": [
        "이력서에 대기업에서 프로그래머로 일한 경력을 적었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1623": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This trip cost a lot in moving costs and meal expenses”.",
      "canonicalTargetKey": "이번 여행은 이동 비용과 식사 경비가 많이 들었어요.",
      "acceptedAnswers": [
        "이번 여행은 이동 비용과 식사 경비가 많이 들었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "with-hago-wa",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1624": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Father is a professional manager in charge of company management”.",
      "canonicalTargetKey": "아버지는 회사 경영을 담당하는 전문 경영인이에요.",
      "acceptedAnswers": [
        "아버지는 회사 경영을 담당하는 전문 경영인이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1625": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Modern society has very fierce competition for job hunting”.",
      "canonicalTargetKey": "현대 사회는 일자리 구직을 위한 경쟁이 무척 치열해요.",
      "acceptedAnswers": [
        "현대 사회는 일자리 구직을 위한 경쟁이 무척 치열해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1626": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to a mountain valley where a cool breeze blows in summer vacation”.",
      "canonicalTargetKey": "여름 방학에 시원한 바람이 부는 산 속 계곡에 갔어요.",
      "acceptedAnswers": [
        "여름 방학에 시원한 바람이 부는 산 속 계곡에 갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "topic-neun",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-nature-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1627": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government prepared support policies for vulnerable social classes”.",
      "canonicalTargetKey": "정부는 사회 취약 계층을 위한 지원 정책을 마련했어요.",
      "acceptedAnswers": [
        "정부는 사회 취약 계층을 위한 지원 정책을 마련했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1628": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The department store employee greets the customer who came to buy a bag”.",
      "canonicalTargetKey": "백화점 직원이 가방을 사러 오신 고객에게 인사해요.",
      "acceptedAnswers": [
        "백화점 직원이 가방을 사러 오신 고객에게 인사해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1629": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I tossed and turned at night worrying over career choice”.",
      "canonicalTargetKey": "진로 선택을 앞두고 밤새 고민을 하느라 잠을 설쳤어요.",
      "acceptedAnswers": [
        "진로 선택을 앞두고 밤새 고민을 하느라 잠을 설쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1630": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They suffer farming in the outdoor field in hot summer”.",
      "canonicalTargetKey": "더운 여름철 야외 밭에서 농사를 지으시느라 고생하셔요.",
      "acceptedAnswers": [
        "더운 여름철 야외 밭에서 농사를 지으시느라 고생하셔요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1631": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “When holidays come, I visit my parents' house in my hometown”.",
      "canonicalTargetKey": "명절이 되면 고향에 계신 부모님 댁을 방문해요.",
      "acceptedAnswers": [
        "명절이 되면 고향에 계신 부모님 댁을 방문해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "object-eul-reul",
        "present-polite",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l12"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1632": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The farmer spreads grains harvested in the autumn yard to dry”.",
      "canonicalTargetKey": "농부가 가을 마당에 수확한 곡식을 가득 널어 말려요.",
      "acceptedAnswers": [
        "농부가 가을 마당에 수확한 곡식을 가득 널어 말려요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1633": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I was embarrassed because answering the sudden question was difficult”.",
      "canonicalTargetKey": "갑작스러운 질문에 답변하기 곤란해서 당황했어요.",
      "acceptedAnswers": [
        "갑작스러운 질문에 답변하기 곤란해서 당황했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1634": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our soccer team player put a goal in the opponent's goal post”.",
      "canonicalTargetKey": "우리 축구 팀 선수가 상대편 골대에 골을 넣었어요.",
      "acceptedAnswers": [
        "우리 축구 팀 선수가 상대편 골대에 골을 넣었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1635": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is noisy because road construction is in progress near the subway exit”.",
      "canonicalTargetKey": "지하철 출구 근처에서 도로 공사가 진행 중이라 시끄러워요.",
      "acceptedAnswers": [
        "지하철 출구 근처에서 도로 공사가 진행 중이라 시끄러워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1636": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We aim for a healthy community helping neighbors mutually”.",
      "canonicalTargetKey": "우리는 서로 이웃을 돕는 건강한 공동체를 지향해요.",
      "acceptedAnswers": [
        "우리는 서로 이웃을 돕는 건강한 공동체를 지향해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l10"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1637": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The police arrested the person who violated others' rights”.",
      "canonicalTargetKey": "경찰은 다른 사람의 권리를 침해한 자를 구속했어요.",
      "acceptedAnswers": [
        "경찰은 다른 사람의 권리를 침해한 자를 구속했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l12"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1638": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I search job hunting sites every weekend after college graduation”.",
      "canonicalTargetKey": "대학 졸업 후에 주말마다 구직 사이트를 검색해요.",
      "acceptedAnswers": [
        "대학 졸업 후에 주말마다 구직 사이트를 검색해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1639": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The two countries made a military alliance and strengthened border security”.",
      "canonicalTargetKey": "두 나라는 군사 동맹을 맺고 국경 보안을 강화했어요.",
      "acceptedAnswers": [
        "두 나라는 군사 동맹을 맺고 국경 보안을 강화했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l12"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1640": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The president has basic authority granted by the citizens”.",
      "canonicalTargetKey": "대통령은 국민이 부여한 기본 권력을 가집니다.",
      "acceptedAnswers": [
        "대통령은 국민이 부여한 기본 권력을 가집니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l8"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1641": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I returned home late after work, washed, and lay on the bed right away”.",
      "canonicalTargetKey": "퇴근 후에 늦게 귀가하여 씻고 바로 침대에 누웠어요.",
      "acceptedAnswers": [
        "퇴근 후에 늦게 귀가하여 씻고 바로 침대에 누웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "present-polite",
        "and-go",
        "past-polite",
        "location-e",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1642": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because the sunlight is strong, I placed a chair under the park tree shade”.",
      "canonicalTargetKey": "햇빛이 강해서 공원 나무 그늘 밑에 의자를 놓았어요.",
      "acceptedAnswers": [
        "햇빛이 강해서 공원 나무 그늘 밑에 의자를 놓았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1643": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Hearing your clear voice, longing pushes in”.",
      "canonicalTargetKey": "그대의 맑은 목소리를 들으니 그리움이 밀려와요.",
      "acceptedAnswers": [
        "그대의 맑은 목소리를 들으니 그리움이 밀려와요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l8"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1644": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They avoided conflicts and refrained from extreme choices”.",
      "canonicalTargetKey": "그들은 갈등을 피하고 극단적인 선택을 삼갔어요.",
      "acceptedAnswers": [
        "그들은 갈등을 피하고 극단적인 선택을 삼갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "with-hago-wa",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-hobbies-u3-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1645": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You must present objective bases for your claim”.",
      "canonicalTargetKey": "자신의 주장에 대한 객관적 근거를 제시해야 해요.",
      "acceptedAnswers": [
        "자신의 주장에 대한 객관적 근거를 제시해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1646": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The Labor Standards Act guarantees workers' fair rights”.",
      "canonicalTargetKey": "근로기준법은 근로자의 정당한 권리를 보장해요.",
      "acceptedAnswers": [
        "근로기준법은 근로자의 정당한 권리를 보장해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l1"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1647": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “All passages inside our apartment are designated as non-smoking zones”.",
      "canonicalTargetKey": "우리 아파트 내부 통로는 모두 금연 구역으로 지정되었어요.",
      "acceptedAnswers": [
        "우리 아파트 내부 통로는 모두 금연 구역으로 지정되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1648": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Flash photography is strictly prohibited inside the art gallery”.",
      "canonicalTargetKey": "미술관 내부에서는 플래시 촬영이 절대 금지예요.",
      "acceptedAnswers": [
        "미술관 내부에서는 플래시 촬영이 절대 금지예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1649": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Big machines run all day long inside the factory”.",
      "canonicalTargetKey": "공장 내부에서 큰 기계들이 하루 종일 돌아갑니다.",
      "acceptedAnswers": [
        "공장 내부에서 큰 기계들이 하루 종일 돌아갑니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1650": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I reserved a hotel restaurant to celebrate the wedding anniversary”.",
      "canonicalTargetKey": "결혼 기념일을 축하하려고 호텔 식당을 예약했어요.",
      "acceptedAnswers": [
        "결혼 기념일을 축하하려고 호텔 식당을 예약했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1651": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I offered a prayer wishing for the health and happiness of needy neighbors”.",
      "canonicalTargetKey": "어려운 이웃의 건강과 행복을 바라는 기도를 드렸어요.",
      "acceptedAnswers": [
        "어려운 이웃의 건강과 행복을 바라는 기도를 드렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "with-hago-wa",
        "object-eul-reul",
        "topic-neun",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1652": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I planted pretty flowers like roses and lilies full in the garden flowerbed”.",
      "canonicalTargetKey": "정원 꽃밭에 장미와 백합 등 예쁜 꽃을 가득 심었어요.",
      "acceptedAnswers": [
        "정원 꽃밭에 장미와 백합 등 예쁜 꽃을 가득 심었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "with-hago-wa",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1653": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I buried my longing for my hometown deep in my heart”.",
      "canonicalTargetKey": "고향에 대한 그리움을 가슴속에 깊이 묻었어요.",
      "acceptedAnswers": [
        "고향에 대한 그리움을 가슴속에 깊이 묻었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1654": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “When the autumn season comes, foliage is very pretty everywhere in the park”.",
      "canonicalTargetKey": "가을철이 되면 공원 곳곳에 단풍이 아주 예쁩니다.",
      "acceptedAnswers": [
        "가을철이 되면 공원 곳곳에 단풍이 아주 예쁩니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "if-myeon",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l8"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1655": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is his dream to build a harmonious and healthy household”.",
      "canonicalTargetKey": "그는 화목하고 건강한 가정을 꾸리는 것이 꿈이에요.",
      "acceptedAnswers": [
        "그는 화목하고 건강한 가정을 꾸리는 것이 꿈이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "with-hago-wa",
        "object-eul-reul",
        "subject-i-ga",
        "copula-ieyo",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l10"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1656": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If that assumption is correct, the answer changes”.",
      "canonicalTargetKey": "그 가정이 맞다면 답이 달라져요.",
      "acceptedAnswers": [
        "그 가정이 맞다면 답이 달라져요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l4"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1657": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They overcame with tight family love even in a difficult situation”.",
      "canonicalTargetKey": "어려운 상황에서도 끈끈한 가족애로 극복했어요.",
      "acceptedAnswers": [
        "어려운 상황에서도 끈끈한 가족애로 극복했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1658": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Ambassadors of various nations in the world attended the peace talks”.",
      "canonicalTargetKey": "세계 각국의 대사들이 평화 회담에 참석했어요.",
      "acceptedAnswers": [
        "세계 각국의 대사들이 평화 회담에 참석했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1659": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The nurse does her best in the patient's bedside nursing”.",
      "canonicalTargetKey": "간호사가 환자의 병상 간호에 최선을 다합니다.",
      "acceptedAnswers": [
        "간호사가 환자의 병상 간호에 최선을 다합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "object-eul-reul",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1660": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We held a meeting to solve the conflict between departments”.",
      "canonicalTargetKey": "부서 간의 갈등 해결을 위해 회의를 열었어요.",
      "acceptedAnswers": [
        "부서 간의 갈등 해결을 위해 회의를 열었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1661": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We analyzed features of the human sensory system in medical research”.",
      "canonicalTargetKey": "의학 연구에서 인간 감각계의 기능을 분석했어요.",
      "acceptedAnswers": [
        "의학 연구에서 인간 감각계의 기능을 분석했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1662": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The actors' excellent acting gave great emotion to the audience”.",
      "canonicalTargetKey": "배우들의 명연기가 관객들에게 큰 감동을 주었어요.",
      "acceptedAnswers": [
        "배우들의 명연기가 관객들에게 큰 감동을 주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1663": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I rested appreciating masterpieces at the quiet art gallery”.",
      "canonicalTargetKey": "조용한 미술관에서 명화를 감상하며 쉬었어요.",
      "acceptedAnswers": [
        "조용한 미술관에서 명화를 감상하며 쉬었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1664": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I run along the riverside bicycle road every weekend”.",
      "canonicalTargetKey": "주말마다 강변 자전거 도로를 따라 달립니다.",
      "acceptedAnswers": [
        "주말마다 강변 자전거 도로를 따라 달립니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1665": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The autumn precipitation is less than average, so it's dry”.",
      "canonicalTargetKey": "가을철 강수량이 평년보다 적어 건조해요.",
      "acceptedAnswers": [
        "가을철 강수량이 평년보다 적어 건조해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1666": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please watch out for strong winds due to the typhoon tonight”.",
      "canonicalTargetKey": "오늘 밤 태풍으로 인한 강풍에 주의하세요.",
      "acceptedAnswers": [
        "오늘 밤 태풍으로 인한 강풍에 주의하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "imperative-seyo",
        "honorific-si",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1667": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The national sports competition's colorful opening event was held”.",
      "canonicalTargetKey": "전국 체육 대회의 화려한 개막 행사가 열렸어요.",
      "acceptedAnswers": [
        "전국 체육 대회의 화려한 개막 행사가 열렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l8"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1668": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The city hall library is open to general citizens for free”.",
      "canonicalTargetKey": "시청 도서관을 일반 시민에게 무료 개방해요.",
      "acceptedAnswers": [
        "시청 도서관을 일반 시민에게 무료 개방해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1669": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A new bakery opened business in the local market alley”.",
      "canonicalTargetKey": "동네 시장 골목에 새 빵집이 개업을 했어요.",
      "acceptedAnswers": [
        "동네 시장 골목에 새 빵집이 개업을 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1670": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Korean acquisition speed has individual differences by student”.",
      "canonicalTargetKey": "한국어 습득 속도는 학생마다 개인차가 있어요.",
      "acceptedAnswers": [
        "한국어 습득 속도는 학생마다 개인차가 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1671": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The hotel guest room interior is clean and the bed is comfortable”.",
      "canonicalTargetKey": "호텔 객실 내부가 깨끗하고 침대가 편해요.",
      "acceptedAnswers": [
        "호텔 객실 내부가 깨끗하고 침대가 편해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "with-hago-wa",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1672": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I dug up clams in the sea mudflat near Incheon”.",
      "canonicalTargetKey": "인천 근처 바다 갯벌에서 조개를 캤어요.",
      "acceptedAnswers": [
        "인천 근처 바다 갯벌에서 조개를 캤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1673": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Pedestrians must be careful when crossing the train crossing”.",
      "canonicalTargetKey": "보행자는 기차 건널목을 건널 때 조심해야 해요.",
      "acceptedAnswers": [
        "보행자는 기차 건널목을 건널 때 조심해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1674": {
      "typedClass": "canonical",
      "examPromptEn": "Continuing a conversation about him, tell a classmate in ordinary polite Korean that he works as an engineer in the construction field of a large company. Use 엔지니어로 일하다.",
      "canonicalTargetKey": "그는 대기업 건설업 분야의 엔지니어로 일해요.",
      "acceptedAnswers": [
        "그는 대기업 건설업 분야의 엔지니어로 일해요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1675": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I put washed clothes in the dryer and dried them”.",
      "canonicalTargetKey": "빨래를 마친 옷을 건조기에 넣고 말렸어요.",
      "acceptedAnswers": [
        "빨래를 마친 옷을 건조기에 넣고 말렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1676": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Police officers conduct vehicle checks at the road checkpoint”.",
      "canonicalTargetKey": "경찰관들이 도로 검문소에서 차량 검문을 해요.",
      "acceptedAnswers": [
        "경찰관들이 도로 검문소에서 차량 검문을 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1677": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He is a coward who is scared of even a gentle puppy”.",
      "canonicalTargetKey": "그는 얌전한 강아지도 무서워하는 겁쟁이예요.",
      "acceptedAnswers": [
        "그는 얌전한 강아지도 무서워하는 겁쟁이예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "also-do",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1678": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We apply policies to resolve the economic strength gap of the two regions”.",
      "canonicalTargetKey": "두 지역의 경제력 격차를 해소하려 정책을 펴요.",
      "acceptedAnswers": [
        "두 지역의 경제력 격차를 해소하려 정책을 펴요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1679": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Students went on a field trip to the history museum”.",
      "canonicalTargetKey": "학생들이 역사 박물관으로 견학을 다녀왔어요.",
      "acceptedAnswers": [
        "학생들이 역사 박물관으로 견학을 다녀왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1680": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The co-worker was absent from work without notice due to a cold body ache today”.",
      "canonicalTargetKey": "회사 동료가 오늘 감기 몸살로 무단 결근했어요.",
      "acceptedAnswers": [
        "회사 동료가 오늘 감기 몸살로 무단 결근했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1681": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I cried reading the novel's tragic ending”.",
      "canonicalTargetKey": "소설의 비극적인 결말을 읽고 눈물이 났어요.",
      "acceptedAnswers": [
        "소설의 비극적인 결말을 읽고 눈물이 났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "subject-i-ga",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1682": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Running match athletes run toward the finish line”.",
      "canonicalTargetKey": "달리기 시합 선수들이 결승선을 향해 달려요.",
      "acceptedAnswers": [
        "달리기 시합 선수들이 결승선을 향해 달려요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1683": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The soccer competition final game is held tomorrow weekend”.",
      "canonicalTargetKey": "축구 대회 결승전이 내일 주말에 열립니다.",
      "acceptedAnswers": [
        "축구 대회 결승전이 내일 주말에 열립니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "time-expression",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1684": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The final decision-making right of the department lies with the manager”.",
      "canonicalTargetKey": "부서의 최종 결정권은 과장님께 있습니다.",
      "acceptedAnswers": [
        "부서의 최종 결정권은 과장님께 있습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "formal-nida",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l1"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1685": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government set measures to reduce small business tax expenses”.",
      "canonicalTargetKey": "정부는 소상공인 세금 경비 경감 대책을 세웠어요.",
      "acceptedAnswers": [
        "정부는 소상공인 세금 경비 경감 대책을 세웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1686": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I searched the shortest route location with a smartphone map”.",
      "canonicalTargetKey": "스마트폰 지도로 최단 경로 위치를 검색했어요.",
      "acceptedAnswers": [
        "스마트폰 지도로 최단 경로 위치를 검색했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l11"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1687": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The apartment security guard manages the entrance parking lot”.",
      "canonicalTargetKey": "아파트 경비원이 입구 주차장 관리를 하십니다.",
      "acceptedAnswers": [
        "아파트 경비원이 입구 주차장 관리를 하십니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "honorific-si",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s1688": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “She studies business administration major subjects at university”.",
      "canonicalTargetKey": "그녀는 대학교에서 경영학 전공 과목을 배워요.",
      "acceptedAnswers": [
        "그녀는 대학교에서 경영학 전공 과목을 배워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1689": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our corporation has high competitiveness in the technology field”.",
      "canonicalTargetKey": "우리 기업은 기술 분야에서 높은 경쟁력이 있어요.",
      "acceptedAnswers": [
        "우리 기업은 기술 분야에서 높은 경쟁력이 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "subject-i-ga",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1690": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He is my strongest competitor in the running match”.",
      "canonicalTargetKey": "그는 달리기 시합에서 저의 가장 강력한 경쟁자예요.",
      "acceptedAnswers": [
        "그는 달리기 시합에서 저의 가장 강력한 경쟁자예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "possessive-ui",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1691": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The clerk adds the amount with a calculator at the mart counter”.",
      "canonicalTargetKey": "마트 계산대에서 점원이 계산기로 금액을 더해요.",
      "acceptedAnswers": [
        "마트 계산대에서 점원이 계산기로 금액을 더해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1692": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed the apartment contract and deposited the down payment first”.",
      "canonicalTargetKey": "아파트 계약을 완료하고 계약금을 먼저 입금했어요.",
      "acceptedAnswers": [
        "아파트 계약을 완료하고 계약금을 먼저 입금했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l1"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1693": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This shop mainly targets the male customer base”.",
      "canonicalTargetKey": "이 가게는 남성 고객층을 주로 대상으로 삼아요.",
      "acceptedAnswers": [
        "이 가게는 남성 고객층을 주로 대상으로 삼아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1694": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If you start a business without a preparation process, a tough path opens”.",
      "canonicalTargetKey": "준비 과정 없이 사업을 시작하면 고생길이 열려요.",
      "acceptedAnswers": [
        "준비 과정 없이 사업을 시작하면 고생길이 열려요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1695": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went down to my hometown home in the holiday autumn and helped harvest rice”.",
      "canonicalTargetKey": "명절 가을에 고향집에 내려가 벼 수확을 도왔어요.",
      "acceptedAnswers": [
        "명절 가을에 고향집에 내려가 벼 수확을 도왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1696": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The degree of difficulty of this Korean exam grammar questions was high”.",
      "canonicalTargetKey": "이번 한국어 시험 문법 문제의 곤란도가 높았어요.",
      "acceptedAnswers": [
        "이번 한국어 시험 문법 문제의 곤란도가 높았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1697": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The US legation secretary works in an office near city hall”.",
      "canonicalTargetKey": "미국 공사관 비서가 시청 근처 사무실에서 일해요.",
      "acceptedAnswers": [
        "미국 공사관 비서가 시청 근처 사무실에서 일해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1698": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The building rooftop construction cost was spent more than expected”.",
      "canonicalTargetKey": "건물 옥상 공사비가 예상보다 많이 지출되었어요.",
      "acceptedAnswers": [
        "건물 옥상 공사비가 예상보다 많이 지출되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1699": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The vehicle noise sound is noisy at the road construction site”.",
      "canonicalTargetKey": "도로 공사판에서 차량 소음 소리가 시끄러워요.",
      "acceptedAnswers": [
        "도로 공사판에서 차량 소음 소리가 시끄러워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1700": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government agency's official authority guarantees this report”.",
      "canonicalTargetKey": "이 보고서는 정부 기관의 공식력이 보장합니다.",
      "acceptedAnswers": [
        "이 보고서는 정부 기관의 공식력이 보장합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1701": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Audiences filled in the music performance hall cheered”.",
      "canonicalTargetKey": "음악 공연장에 가득 찬 관객들이 환호했어요.",
      "acceptedAnswers": [
        "음악 공연장에 가득 찬 관객들이 환호했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1702": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I quietly walked the park path breathing the cool breeze”.",
      "canonicalTargetKey": "시원한 바람을 쐬며 공원길을 조용히 걸었어요.",
      "acceptedAnswers": [
        "시원한 바람을 쐬며 공원길을 조용히 걸었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1703": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government actively promotes establishing the alternative holiday law”.",
      "canonicalTargetKey": "정부는 대체 공휴일법 제정을 적극 추진해요.",
      "acceptedAnswers": [
        "정부는 대체 공휴일법 제정을 적극 추진해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1704": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Sitting in the theater audience seats, I looked at the actor on the stage”.",
      "canonicalTargetKey": "극장 관객석에 앉아 무대 위 배우를 바라봤어요.",
      "acceptedAnswers": [
        "극장 관객석에 앉아 무대 위 배우를 바라봤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1705": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There are many tourists enjoying Korean culture on Insadong street”.",
      "canonicalTargetKey": "인사동 거리에 한국 문화를 즐기는 관광객이 많아요.",
      "acceptedAnswers": [
        "인사동 거리에 한국 문화를 즐기는 관광객이 많아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn8-travel-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1706": {
      "typedClass": "canonical",
      "examPromptEn": "Continuing a conversation about Jeju Island, tell a classmate in ordinary polite Korean that it is Korea’s most famous marine tourist destination. Use 해양 관광지.",
      "canonicalTargetKey": "제주도는 한국에서 가장 유명한 해양 관광지예요.",
      "acceptedAnswers": [
        "제주도는 한국에서 가장 유명한 해양 관광지예요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l1"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1707": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wrote a thesis revealing the relevance of the two research results”.",
      "canonicalTargetKey": "두 연구 결과의 관련성을 밝히는 논문을 작성했어요.",
      "acceptedAnswers": [
        "두 연구 결과의 관련성을 밝히는 논문을 작성했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "topic-neun",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1708": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The building custodian locked the rooftop access door tightly”.",
      "canonicalTargetKey": "건물 관리인이 옥상 출입문을 단단히 닫아 두었어요.",
      "acceptedAnswers": [
        "건물 관리인이 옥상 출입문을 단단히 닫아 두었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1709": {
      "typedClass": "canonical",
      "examPromptEn": "Continuing a conversation about university students these days, tell a classmate in ordinary polite Korean that their greatest concern is finding employment. Use 최대 관심사 and 취업 구직.",
      "canonicalTargetKey": "요즘 대학생들의 최대 관심사는 취업 구직이에요.",
      "acceptedAnswers": [
        "요즘 대학생들의 최대 관심사는 취업 구직이에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1710": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Observation power capturing phenomena is needed in science experiments”.",
      "canonicalTargetKey": "과학 실험에서는 현상을 포착하는 관찰력이 필요해요.",
      "acceptedAnswers": [
        "과학 실험에서는 현상을 포착하는 관찰력이 필요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1711": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The professor lectures on an effective Korean teaching method”.",
      "canonicalTargetKey": "교수님이 효과적인 한국어 교수법을 강의하셔요.",
      "acceptedAnswers": [
        "교수님이 효과적인 한국어 교수법을 강의하셔요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s1712": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Every month educational expenses spending like academy fees and textbook fees is high”.",
      "canonicalTargetKey": "매달 학원비와 교재비 등 교육비 지출이 큽니다.",
      "acceptedAnswers": [
        "매달 학원비와 교재비 등 교육비 지출이 큽니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1713": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government passed the amendment regarding the compulsory education law”.",
      "canonicalTargetKey": "정부는 의무 교육법에 관한 개정안을 통과시켰어요.",
      "acceptedAnswers": [
        "정부는 의무 교육법에 관한 개정안을 통과시켰어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1714": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The metropolis transport network is connected tightly like a spider web”.",
      "canonicalTargetKey": "대도시의 교통망은 거미줄처럼 촘촘히 연결되어 있어요.",
      "acceptedAnswers": [
        "대도시의 교통망은 거미줄처럼 촘촘히 연결되어 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l1"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1715": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Subway transportation costs spent regularly every month rose”.",
      "canonicalTargetKey": "매달 정기적으로 지출하는 지하철 교통비가 올랐어요.",
      "acceptedAnswers": [
        "매달 정기적으로 지출하는 지하철 교통비가 올랐어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1716": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to the counter carrying the gift exchange voucher at the department store”.",
      "canonicalTargetKey": "백화점에서 사은품 교환권을 들고 계산대로 갔어요.",
      "acceptedAnswers": [
        "백화점에서 사은품 교환권을 들고 계산대로 갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "direction-euro",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1717": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I bought shoe polish to shine leather shoes”.",
      "canonicalTargetKey": "가죽 구두를 반짝이게 닦으려고 구두약을 샀어요.",
      "acceptedAnswers": [
        "가죽 구두를 반짝이게 닦으려고 구두약을 샀어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1718": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There is a thrilling suspension bridge over the valley near the mountain summit”.",
      "canonicalTargetKey": "산 정상 근처 계곡 위에 아슬아슬한 구름다리가 있네요.",
      "acceptedAnswers": [
        "산 정상 근처 계곡 위에 아슬아슬한 구름다리가 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1719": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I took a seat in the library corner room to read quietly”.",
      "canonicalTargetKey": "조용히 독서하려고 도서관 구석방에 자리를 잡았어요.",
      "acceptedAnswers": [
        "조용히 독서하려고 도서관 구석방에 자리를 잡았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1720": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Members of a social community have a duty to care for each other mutually”.",
      "canonicalTargetKey": "사회 공동체 구성원은 서로 배려할 의무가 있어요.",
      "acceptedAnswers": [
        "사회 공동체 구성원은 서로 배려할 의무가 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l10"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1721": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This contract is a document bearing legal binding force”.",
      "canonicalTargetKey": "이 계약서는 법적 구속력을 지닌 문서입니다.",
      "acceptedAnswers": [
        "이 계약서는 법적 구속력을 지닌 문서입니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "formal-nida",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1722": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The beach lifeguard saved the baby drowning in the sea”.",
      "canonicalTargetKey": "해수욕장 구조원이 바다에 빠진 아기를 구했어요.",
      "acceptedAnswers": [
        "해수욕장 구조원이 바다에 빠진 아기를 구했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1723": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because it is a national holiday, public institutions like city hall and post office all rest”.",
      "canonicalTargetKey": "국경일이라 시청과 우체국 등 공공 기관이 다 쉽니다.",
      "acceptedAnswers": [
        "국경일이라 시청과 우체국 등 공공 기관이 다 쉽니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l8"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1724": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “An attitude valuing honesty and sincerity is that country's national character”.",
      "canonicalTargetKey": "정직과 성실을 중시하는 태도는 그 나라의 국민성이에요.",
      "acceptedAnswers": [
        "정직과 성실을 중시하는 태도는 그 나라의 국민성이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "object-eul-reul",
        "topic-neun",
        "possessive-ui",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1725": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The two nations coordinated the border dispute situation according to international law”.",
      "canonicalTargetKey": "두 국가는 국경 분쟁 상황을 국제법에 따라 조율했어요.",
      "acceptedAnswers": [
        "두 국가는 국경 분쟁 상황을 국제법에 따라 조율했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1726": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “That nation is a major power possessing mighty military and economic strength”.",
      "canonicalTargetKey": "그 국가는 막강한 군사력과 경제력을 지닌 강대국이에요.",
      "acceptedAnswers": [
        "그 국가는 막강한 군사력과 경제력을 지닌 강대국이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1727": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “That general is a brave and upright ideal soldier's image”.",
      "canonicalTargetKey": "그 장군은 용감하고 강직한 이상적인 군인상입니다.",
      "acceptedAnswers": [
        "그 장군은 용감하고 강직한 이상적인 군인상입니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "with-hago-wa",
        "formal-nida",
        "copula-ieyo",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1728": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I transferred key money to the landlord to take over the convenience store”.",
      "canonicalTargetKey": "편의점 인수를 위해 건물주에게 권리금을 송금했어요.",
      "acceptedAnswers": [
        "편의점 인수를 위해 건물주에게 권리금을 송금했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1729": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government groups corporations by scale, providing differential fund support”.",
      "canonicalTargetKey": "정부는 기업들을 규모별로 묶어 자금을 차등 지원해요.",
      "acceptedAnswers": [
        "정부는 기업들을 규모별로 묶어 자금을 차등 지원해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1730": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We check the patient's condition measuring the regularity of heartbeats”.",
      "canonicalTargetKey": "심장 박동의 규칙성을 측정하여 환자의 상태를 체크해요.",
      "acceptedAnswers": [
        "심장 박동의 규칙성을 측정하여 환자의 상태를 체크해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1731": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Training to maintain a sense of balance is needed when riding a bicycle”.",
      "canonicalTargetKey": "자전거를 탈 때는 균형감을 유지하는 훈련이 필요해요.",
      "acceptedAnswers": [
        "자전거를 탈 때는 균형감을 유지하는 훈련이 필요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1732": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I installed a shade canopy on the park green lawn and read a book”.",
      "canonicalTargetKey": "공원 푸른 잔디밭 위에 그늘막을 설치하고 책을 읽었어요.",
      "acceptedAnswers": [
        "공원 푸른 잔디밭 위에 그늘막을 설치하고 책을 읽었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "with-hago-wa",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1733": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I played with the baby reading them a colorful picture book”.",
      "canonicalTargetKey": "아기에게 알록달록한 그림책을 읽어주며 놀아주었어요.",
      "acceptedAnswers": [
        "아기에게 알록달록한 그림책을 읽어주며 놀아주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1734": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is dangerous to make extreme decisions in opinion conflict situations”.",
      "canonicalTargetKey": "의견 갈등 상황에서 극단적인 판단을 내리는 건 위험해요.",
      "acceptedAnswers": [
        "의견 갈등 상황에서 극단적인 판단을 내리는 건 위험해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "topic-neun",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1735": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Investigators finally found the secret base of the criminal organization”.",
      "canonicalTargetKey": "수사관들이 마침내 범죄 조직의 비밀 근거지를 찾아냈어요.",
      "acceptedAnswers": [
        "수사관들이 마침내 범죄 조직의 비밀 근거지를 찾아냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1736": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government increases livelihood support for low-income worker families”.",
      "canonicalTargetKey": "정부는 저소득 근로자 가정을 위한 생계 지원을 늘려요.",
      "acceptedAnswers": [
        "정부는 저소득 근로자 가정을 위한 생계 지원을 늘려요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1737": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The new workplace location changed to in front of the station near home”.",
      "canonicalTargetKey": "새로운 근무지 위치가 집 근처 역 앞으로 변경되었어요.",
      "acceptedAnswers": [
        "새로운 근무지 위치가 집 근처 역 앞으로 변경되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1738": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Nurses' night shift table was posted on the hospital bulletin board”.",
      "canonicalTargetKey": "간호사들의 야간 교대 근무표가 병원 게시판에 실렸어요.",
      "acceptedAnswers": [
        "간호사들의 야간 교대 근무표가 병원 게시판에 실렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1739": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the anti-smoking law enforcement, restaurant internal air became very clean”.",
      "canonicalTargetKey": "금연법 시행 덕분에 식당 내부 공기가 아주 깨끗해졌어요.",
      "acceptedAnswers": [
        "금연법 시행 덕분에 식당 내부 공기가 아주 깨끗해졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1740": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The assembly officially established the environmental pollutant emission prohibition law”.",
      "canonicalTargetKey": "국회는 환경 오염 물질 배출 금지법을 공식 제정했어요.",
      "acceptedAnswers": [
        "국회는 환경 오염 물질 배출 금지법을 공식 제정했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1741": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Mechanics working in the factory are repairing a big machine”.",
      "canonicalTargetKey": "공장에서 일하는 기계공들이 큰 기계를 수리하고 있어요.",
      "acceptedAnswers": [
        "공장에서 일하는 기계공들이 큰 기계를 수리하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1742": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to the war memorial hall and honored the noble spirit of the patriotic martyrs”.",
      "canonicalTargetKey": "전쟁 기념관에 가서 순국선열들의 숭고한 정신을 기렸어요.",
      "acceptedAnswers": [
        "전쟁 기념관에 가서 순국선열들의 숭고한 정신을 기렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "present-polite",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l2"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1743": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I looked around the souvenir shop near the information desk before traveling”.",
      "canonicalTargetKey": "여행을 가기 전에 안내소 주변 기념품 가게를 둘러봤어요.",
      "acceptedAnswers": [
        "여행을 가기 전에 안내소 주변 기념품 가게를 둘러봤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1744": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The museum is filled with record documents of Joseon Dynasty kings' deeds”.",
      "canonicalTargetKey": "박물관에는 조선 시대 왕들의 행적 기록물이 가득해요.",
      "acceptedAnswers": [
        "박물관에는 조선 시대 왕들의 행적 기록물이 가득해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1745": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I donated contribution funds to the scholarship foundation, helping poor students”.",
      "canonicalTargetKey": "장학 재단에 기부금을 기부하여 가난한 학생을 도왔어요.",
      "acceptedAnswers": [
        "장학 재단에 기부금을 기부하여 가난한 학생을 도왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1746": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “That rumor finally turned out to be not true”.",
      "canonicalTargetKey": "그 소문은 결국 사실이 아닌 것으로 밝혀졌어요.",
      "acceptedAnswers": [
        "그 소문은 결국 사실이 아닌 것으로 밝혀졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1747": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The noise sound generated from the road construction site is too noisy”.",
      "canonicalTargetKey": "도로 공사 현장에서 발생하는 소음 소리가 너무 시끄러워요.",
      "acceptedAnswers": [
        "도로 공사 현장에서 발생하는 소음 소리가 너무 시끄러워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1748": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The internet connection speed became much faster than before”.",
      "canonicalTargetKey": "인터넷망 연결 속도가 예전보다 훨씬 빨라졌어요.",
      "acceptedAnswers": [
        "인터넷망 연결 속도가 예전보다 훨씬 빨라졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1749": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please remember the Korean proverb saying that starting is half”.",
      "canonicalTargetKey": "한국어 속담인 시작이 반이다라는 말을 기억하세요.",
      "acceptedAnswers": [
        "한국어 속담인 시작이 반이다라는 말을 기억하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo",
        "honorific-si",
        "imperative-seyo"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-pragmatic-variants",
        "productive-word-order-family",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-pragmatic-variants; productive-word-order-family; particle-or-word-order-ambiguity."
    },
    "s1750": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I washed my hands cleanly and cut my fingernails neatly”.",
      "canonicalTargetKey": "손을 깨끗이 씻고 손톱을 단정하게 깎았어요.",
      "acceptedAnswers": [
        "손을 깨끗이 씻고 손톱을 단정하게 깎았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1751": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed the remittance to mother using the bank mobile app”.",
      "canonicalTargetKey": "은행 모바일 앱을 이용해 어머니께 송금을 완료했어요.",
      "acceptedAnswers": [
        "은행 모바일 앱을 이용해 어머니께 송금을 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1752": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “In a metropolis, the subway is the most convenient transportation means”.",
      "canonicalTargetKey": "대도시에서는 지하철이 가장 편리한 교통 수단이에요.",
      "acceptedAnswers": [
        "대도시에서는 지하철이 가장 편리한 교통 수단이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1753": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our country achieved great economic growth through semiconductor export”.",
      "canonicalTargetKey": "우리나라는 반도체 수출을 통해 큰 경제 성장을 이뤘어요.",
      "acceptedAnswers": [
        "우리나라는 반도체 수출을 통해 큰 경제 성장을 이뤘어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1754": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I collected relevant statistical data in the library for research”.",
      "canonicalTargetKey": "연구를 위해 도서관에서 관련 통계 자료를 수집했어요.",
      "acceptedAnswers": [
        "연구를 위해 도서관에서 관련 통계 자료를 수집했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1755": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Arriving at the travel site, I moved right away to the reserved lodging”.",
      "canonicalTargetKey": "여행지에 도착해서 예약해 둔 숙소로 바로 이동했어요.",
      "acceptedAnswers": [
        "여행지에 도착해서 예약해 둔 숙소로 바로 이동했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "past-polite",
        "because-aseo",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1756": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our baseball team's league ranking rose to 2nd place”.",
      "canonicalTargetKey": "우리 야구 팀의 리그 순위가 이위로 올라갔어요.",
      "acceptedAnswers": [
        "우리 야구 팀의 리그 순위가 이위로 올라갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1757": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Looking at the baby's innocent eyes purifies the mind”.",
      "canonicalTargetKey": "아기의 순진한 눈빛을 보면 마음이 정화돼요.",
      "acceptedAnswers": [
        "아기의 순진한 눈빛을 보면 마음이 정화돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "subject-i-ga",
        "present-polite",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1758": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is important to develop a good habit of waking up early in the morning”.",
      "canonicalTargetKey": "아침 일찍 일어나는 좋은 습관을 기르는 것이 중요해요.",
      "acceptedAnswers": [
        "아침 일찍 일어나는 좋은 습관을 기르는 것이 중요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "subject-i-ga",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1759": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Plane passengers board following the flight attendant's guidance”.",
      "canonicalTargetKey": "비행기 승객들이 승무원의 안내에 따라 탑승해요.",
      "acceptedAnswers": [
        "비행기 승객들이 승무원의 안내에 따라 탑승해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "present-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1760": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “After athletes' blood-sweating efforts, they finally achieved a value victory”.",
      "canonicalTargetKey": "선수들의 피나는 노력 끝에 마침내 값진 승리를 거두었어요.",
      "acceptedAnswers": [
        "선수들의 피나는 노력 끝에 마침내 값진 승리를 거두었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1761": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government approved the new apartment complex construction plan”.",
      "canonicalTargetKey": "정부가 새로운 아파트 단지 건설 계획을 승인했어요.",
      "acceptedAnswers": [
        "정부가 새로운 아파트 단지 건설 계획을 승인했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1762": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government starts enforcing the new traffic law starting tomorrow”.",
      "canonicalTargetKey": "정부는 새로운 교통법 시행을 내일부터 시작해요.",
      "acceptedAnswers": [
        "정부는 새로운 교통법 시행을 내일부터 시작해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "from-buteo",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1763": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Various kinds of marvelous plants live in the park garden”.",
      "canonicalTargetKey": "공원 정원에 다양한 종류의 신기한 식물들이 살아요.",
      "acceptedAnswers": [
        "공원 정원에 다양한 종류의 신기한 식물들이 살아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "present-polite",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn3-nature-u2-l16"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1764": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to the nearby police station to report the wallet loss accident”.",
      "canonicalTargetKey": "지갑 분실 사고를 신고하러 근처 경찰서에 갔어요.",
      "acceptedAnswers": [
        "지갑 분실 사고를 신고하러 근처 경찰서에 갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1765": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He acts according to the moral beliefs he established”.",
      "canonicalTargetKey": "그는 자신이 세운 도덕적 신념에 따라 행동해요.",
      "acceptedAnswers": [
        "그는 자신이 세운 도덕적 신념에 따라 행동해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u8-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1766": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If deep trust in each other is broken, relationship recovery is hard”.",
      "canonicalTargetKey": "서로 간의 깊은 신뢰가 깨지면 관계 회복이 어려워요.",
      "acceptedAnswers": [
        "서로 간의 깊은 신뢰가 깨지면 관계 회복이 어려워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1767": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I showed my passport proving identity at the airport entrance checkpoint”.",
      "canonicalTargetKey": "공항 입구 검문소에서 신분을 증명하는 여권을 보였어요.",
      "acceptedAnswers": [
        "공항 입구 검문소에서 신분을 증명하는 여권을 보였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l11"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1768": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I felt the mystery of the universe in the Earth photo taken by the spaceship”.",
      "canonicalTargetKey": "우주선이 찍은 지구 사진에서 우주의 신비를 느꼈어요.",
      "acceptedAnswers": [
        "우주선이 찍은 지구 사진에서 우주의 신비를 느꼈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "topic-neun",
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-nature-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1769": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I chose very fresh tomatoes at the market vegetable shop”.",
      "canonicalTargetKey": "시장 야채 가게에서 아주 신선한 토마토를 골랐어요.",
      "acceptedAnswers": [
        "시장 야채 가게에서 아주 신선한 토마토를 골랐어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u8-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1770": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A computer science major department was newly established in the university”.",
      "canonicalTargetKey": "대학교에 컴퓨터 사이언스 전공 학과가 신설되었어요.",
      "acceptedAnswers": [
        "대학교에 컴퓨터 사이언스 전공 학과가 신설되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1771": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Excessive use of credit cards drops credit ratings”.",
      "canonicalTargetKey": "신용카드를 과도하게 사용하면 신용 등급이 떨어져요.",
      "acceptedAnswers": [
        "신용카드를 과도하게 사용하면 신용 등급이 떨어져요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l8"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1772": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The police officer verified the witness's identity around the accident scene”.",
      "canonicalTargetKey": "경찰관이 사고 현장 주변에서 목격자의 신원을 확인했어요.",
      "acceptedAnswers": [
        "경찰관이 사고 현장 주변에서 목격자의 신원을 확인했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1773": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A talented rookie employee entered the company office today”.",
      "canonicalTargetKey": "오늘 회사 사무실에 유능한 신입 사원이 들어왔어요.",
      "acceptedAnswers": [
        "오늘 회사 사무실에 유능한 신입 사원이 들어왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "time-expression",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l11"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1774": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Regular exercise is an essential requirement helping maintain a healthy body”.",
      "canonicalTargetKey": "규칙적인 운동은 건강한 신체 유지를 돕는 필수 요건이에요.",
      "acceptedAnswers": [
        "규칙적인 운동은 건강한 신체 유지를 돕는 필수 요건이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l10"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1775": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “They finished the wedding and start new marriage in a clean apartment”.",
      "canonicalTargetKey": "그들은 결혼식을 마치고 깨끗한 아파트에서 신혼을 시작해요.",
      "acceptedAnswers": [
        "그들은 결혼식을 마치고 깨끗한 아파트에서 신혼을 시작해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "location-eseo",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1776": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My skill improved a lot because I steadily practiced speaking Hangul”.",
      "canonicalTargetKey": "꾸준히 한글 말하기 연습을 해서 실력이 많이 늘었어요.",
      "acceptedAnswers": [
        "꾸준히 한글 말하기 연습을 해서 실력이 많이 늘었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1777": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “University education is also important, but field work experience is more important”.",
      "canonicalTargetKey": "대학 교육도 중요하지만 현장 실무 경험이 더 중요해요.",
      "acceptedAnswers": [
        "대학 교육도 중요하지만 현장 실무 경험이 더 중요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "subject-i-ga",
        "present-polite",
        "but-jiman"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1778": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Unlike rumors, the reality of the case was extremely ordinary”.",
      "canonicalTargetKey": "소문과 달리 그 사건의 실상은 대단히 평범했어요.",
      "acceptedAnswers": [
        "소문과 달리 그 사건의 실상은 대단히 평범했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "possessive-ui",
        "topic-neun",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1779": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Anyone can make mistakes, so don't blame yourself and overcome it”.",
      "canonicalTargetKey": "누구나 실수를 할 수 있으니 자책하지 말고 극복하세요.",
      "acceptedAnswers": [
        "누구나 실수를 할 수 있으니 자책하지 말고 극복하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "imperative-seyo",
        "can-su-itda",
        "and-go",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1780": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The school executes an English mock exam targeting students”.",
      "canonicalTargetKey": "학교는 학생들을 대상으로 영어 모의고사를 실시해요.",
      "acceptedAnswers": [
        "학교는 학생들을 대상으로 영어 모의고사를 실시해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1781": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Medical students do clinical training in the internal medicine ward”.",
      "canonicalTargetKey": "의과대학 학생들이 내과 병실에서 임상 실습을 해요.",
      "acceptedAnswers": [
        "의과대학 학생들이 내과 병실에서 임상 실습을 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1782": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please watch out for outdoor activities because the winter weather is very cold”.",
      "canonicalTargetKey": "겨울 날씨가 매우 추우니 실외 활동을 조심하세요.",
      "acceptedAnswers": [
        "겨울 날씨가 매우 추우니 실외 활동을 조심하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants; particle-or-word-order-ambiguity."
    },
    "s1783": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This novel was written based on a real incident”.",
      "canonicalTargetKey": "이 소설은 실제 사건을 바탕으로 작성되었어요.",
      "acceptedAnswers": [
        "이 소설은 실제 사건을 바탕으로 작성되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1784": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Acting in practice is more valuable than making plans”.",
      "canonicalTargetKey": "계획을 세우는 것보다 행동으로 실천하는 게 가치 있어요.",
      "acceptedAnswers": [
        "계획을 세우는 것보다 행동으로 실천하는 게 가치 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "present-polite",
        "comparison-boda",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1785": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We experimented the safety of the new medicine in the science lab”.",
      "canonicalTargetKey": "과학 실험실에서 새로운 약의 안전성을 실험했어요.",
      "acceptedAnswers": [
        "과학 실험실에서 새로운 약의 안전성을 실험했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1786": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He finally realized his dream after efforts his whole life”.",
      "canonicalTargetKey": "그는 평생 노력한 끝에 마침내 꿈을 실현했어요.",
      "acceptedAnswers": [
        "그는 평생 노력한 끝에 마침내 꿈을 실현했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1787": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I confessed my worries to the counselor and coordinated my anxious mind”.",
      "canonicalTargetKey": "상담사에게 고민을 털어놓고 불안한 심리를 조율했어요.",
      "acceptedAnswers": [
        "상담사에게 고민을 털어놓고 불안한 심리를 조율했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1788": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The committee completed screening the new project draft plan”.",
      "canonicalTargetKey": "위원회에서 새 프로젝트 계획안 심사를 완료했어요.",
      "acceptedAnswers": [
        "위원회에서 새 프로젝트 계획안 심사를 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1789": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The kimchi stew was too bland, so I added a little salt”.",
      "canonicalTargetKey": "김치찌개가 너무 싱거워서 소금을 조금 넣었어요.",
      "acceptedAnswers": [
        "김치찌개가 너무 싱거워서 소금을 조금 넣었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l3"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1790": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to the ophthalmology hospital because my eyes were bloodshot and hurt”.",
      "canonicalTargetKey": "눈이 충혈되고 아파서 안과 병원에 다녀왔어요.",
      "acceptedAnswers": [
        "눈이 충혈되고 아파서 안과 병원에 다녀왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "and-go",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1791": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I received an audio guide at the information desk at the museum entrance”.",
      "canonicalTargetKey": "박물관 입구에 있는 안내소에서 오디오 가이드를 받았어요.",
      "acceptedAnswers": [
        "박물관 입구에 있는 안내소에서 오디오 가이드를 받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1792": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Welcoming the holidays, I made a greeting call to my grandmother in the countryside”.",
      "canonicalTargetKey": "명절을 맞아 시골에 계신 할머니께 안부 전화를 드렸어요.",
      "acceptedAnswers": [
        "명절을 맞아 시골에 계신 할머니께 안부 전화를 드렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1793": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “His complexion is not good today, as if he got a body ache from overwork”.",
      "canonicalTargetKey": "그는 과로로 몸살이 났는지 오늘 안색이 좋지 않아요.",
      "acceptedAnswers": [
        "그는 과로로 몸살이 났는지 오늘 안색이 좋지 않아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "neg-ji-anta",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1794": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the doctor's prescription medicine, the patient's blood pressure found stability”.",
      "canonicalTargetKey": "의사의 처방 약 덕분에 환자의 혈압이 안정을 찾았어요.",
      "acceptedAnswers": [
        "의사의 처방 약 덕분에 환자의 혈압이 안정을 찾았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1795": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “When drinking beer, I paired it with savory chips as a side dish”.",
      "canonicalTargetKey": "맥주를 마실 때 안주로 고소한 과자를 곁들였어요.",
      "acceptedAnswers": [
        "맥주를 마실 때 안주로 고소한 과자를 곁들였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1796": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Congratulatory wreaths for the opening are placed full inside and outside the shop”.",
      "canonicalTargetKey": "가게 안팎에 개업 축하 화환들이 가득 놓여 있네요.",
      "acceptedAnswers": [
        "가게 안팎에 개업 축하 화환들이 가득 놓여 있네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1797": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I set the smartphone alarm to wake up early in the morning dawn”.",
      "canonicalTargetKey": "아침 새벽 일찍 일어나려고 스마트폰 알람을 맞췄어요.",
      "acceptedAnswers": [
        "아침 새벽 일찍 일어나려고 스마트폰 알람을 맞췄어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "and-go",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1798": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Leaders of both countries gathered and signed a trade vitalization agreement”.",
      "canonicalTargetKey": "양국 정상들이 모여 무역 활성화 협정을 체결했어요.",
      "acceptedAnswers": [
        "양국 정상들이 모여 무역 활성화 협정을 체결했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1799": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I spread seasoning evenly on the meat and grilled it on the grill”.",
      "canonicalTargetKey": "고기에 양념을 골고루 바르고 불판 위에 구웠어요.",
      "acceptedAnswers": [
        "고기에 양념을 골고루 바르고 불판 위에 구웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "and-go",
        "location-e"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1800": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He never acts against his conscience”.",
      "canonicalTargetKey": "그는 자신의 양심에 어긋나는 행동을 절대 하지 않아요.",
      "acceptedAnswers": [
        "그는 자신의 양심에 어긋나는 행동을 절대 하지 않아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "present-polite",
        "neg-ji-anta"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1801": {
      "typedClass": "canonical",
      "examPromptEn": "In a formal civic discussion, with free press activity already established as the topic, state that it is a basic right of democracy. Use 기본 권리.",
      "canonicalTargetKey": "자유로운 언론 활동은 민주주의의 기본 권리입니다.",
      "acceptedAnswers": [
        "자유로운 언론 활동은 민주주의의 기본 권리입니다."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "formal-nida",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1802": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I study the foreign language, Korean language, steadily every day”.",
      "canonicalTargetKey": "외국어인 한국어 언어 학습을 매일 꾸준히 해요.",
      "acceptedAnswers": [
        "외국어인 한국어 언어 학습을 매일 꾸준히 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1803": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wrote the weekly business draft plan on the computer in the office”.",
      "canonicalTargetKey": "사무실에서 컴퓨터로 주간 업무 계획안을 작성했어요.",
      "acceptedAnswers": [
        "사무실에서 컴퓨터로 주간 업무 계획안을 작성했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1804": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Lately, industries related to IT technology are very popular”.",
      "canonicalTargetKey": "최근 정보통신 기술과 관련된 업종의 인기가 많습니다.",
      "acceptedAnswers": [
        "최근 정보통신 기술과 관련된 업종의 인기가 많습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "possessive-ui",
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1805": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A cunning fox tricked a rabbit in the fairy tale book”.",
      "canonicalTargetKey": "동화책 속에서 교활한 여우가 토끼를 속였어요.",
      "acceptedAnswers": [
        "동화책 속에서 교활한 여우가 토끼를 속였어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-nature-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1806": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Do not lose peace of mind even during busy weekday work”.",
      "canonicalTargetKey": "바쁜 평일 업무 중에도 마음의 여유를 잃지 마세요.",
      "acceptedAnswers": [
        "바쁜 평일 업무 중에도 마음의 여유를 잃지 마세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "possessive-ui",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; productive-word-order-family."
    },
    "s1807": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We completed the 3-night, 4-day Seoul travel itinerary”.",
      "canonicalTargetKey": "우리는 삼 박 사 일간의 서울 여행 여정을 마쳤어요.",
      "acceptedAnswers": [
        "우리는 삼 박 사 일간의 서울 여행 여정을 마쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1808": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I watched a play where actors act passionately at the Daehangno theater”.",
      "canonicalTargetKey": "대학로 극장에서 배우들이 열연하는 연극을 봤어요.",
      "acceptedAnswers": [
        "대학로 극장에서 배우들이 열연하는 연극을 봤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l7"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1809": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Retired elderly people receive pensions from the government every month”.",
      "canonicalTargetKey": "은퇴한 노인들이 매달 정부에서 연금을 받아요.",
      "acceptedAnswers": [
        "은퇴한 노인들이 매달 정부에서 연금을 받아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1810": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “That actor's natural acting gave great emotion”.",
      "canonicalTargetKey": "그 배우의 자연스러운 연기가 큰 감동을 주었어요.",
      "acceptedAnswers": [
        "그 배우의 자연스러운 연기가 큰 감동을 주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l19"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1811": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If the meeting schedule changes, please contact me immediately”.",
      "canonicalTargetKey": "회의 일정이 변경되면 즉시 제게 연락을 주세요.",
      "acceptedAnswers": [
        "회의 일정이 변경되면 즉시 제게 연락을 주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "imperative-seyo",
        "if-myeon",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants; particle-or-word-order-ambiguity."
    },
    "s1812": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This movie's viewable age is limited”.",
      "canonicalTargetKey": "이 영화는 관람 가능 연령이 제한되어 있어요.",
      "acceptedAnswers": [
        "이 영화는 관람 가능 연령이 제한되어 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s1813": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Various citizen groups alliance to run environmental protection campaigns”.",
      "canonicalTargetKey": "여러 시민 단체들이 연합해 환경 보호 운동을 펴요.",
      "acceptedAnswers": [
        "여러 시민 단체들이 연합해 환경 보호 운동을 펴요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l13"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1814": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I plan to go down to my hometown home and rest well during the Chuseok holiday”.",
      "canonicalTargetKey": "추석 연휴 동안 고향집에 내려가 푹 쉴 예정이에요.",
      "acceptedAnswers": [
        "추석 연휴 동안 고향집에 내려가 푹 쉴 예정이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "copula-ieyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l11"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1815": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The hot heat of midsummer daytime does not cool even at night”.",
      "canonicalTargetKey": "한여름 낮의 뜨거운 열기가 밤에도 식지 않아요.",
      "acceptedAnswers": [
        "한여름 낮의 뜨거운 열기가 밤에도 식지 않아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "also-do",
        "present-polite",
        "neg-ji-anta"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1816": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The express train bound for Seoul enters the platform slowly”.",
      "canonicalTargetKey": "서울행 고속 열차가 플랫폼으로 서서히 들어오네요.",
      "acceptedAnswers": [
        "서울행 고속 열차가 플랫폼으로 서서히 들어오네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1817": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A Korean study craze is blowing globally”.",
      "canonicalTargetKey": "전 세계적으로 한국어 학습 열풍이 불고 있어요.",
      "acceptedAnswers": [
        "전 세계적으로 한국어 학습 열풍이 불고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1818": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I reserved a general checkup due to concern for my parents' health”.",
      "canonicalTargetKey": "부모님의 건강 염려 때문에 종합 검사를 예약했어요.",
      "acceptedAnswers": [
        "부모님의 건강 염려 때문에 종합 검사를 예약했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1819": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A nutrition-balanced meal is needed to maintain health”.",
      "canonicalTargetKey": "건강을 유지하려면 영양 균형이 잡힌 식사가 필요해요.",
      "acceptedAnswers": [
        "건강을 유지하려면 영양 균형이 잡힌 식사가 필요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "present-polite",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l10"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1820": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This research pioneers a new domain of computer engineering”.",
      "canonicalTargetKey": "이번 연구는 컴퓨터 공학의 새로운 영역을 개척해요.",
      "acceptedAnswers": [
        "이번 연구는 컴퓨터 공학의 새로운 영역을 개척해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1821": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This novel is a story of a war hero who saved the country”.",
      "canonicalTargetKey": "이 소설은 나라를 구한 전쟁 영웅의 이야기입니다.",
      "acceptedAnswers": [
        "이 소설은 나라를 구한 전쟁 영웅의 이야기입니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "possessive-ui",
        "formal-nida",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l11"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1822": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Listening to music, I felt my exhausted soul being healed”.",
      "canonicalTargetKey": "음악을 들으며 지친 내 영혼이 치유되는 느낌을 받았어요.",
      "acceptedAnswers": [
        "음악을 들으며 지친 내 영혼이 치유되는 느낌을 받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l4"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1823": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I have a good hunch that this project will succeed”.",
      "canonicalTargetKey": "이번 프로젝트가 성공할 것 같은 좋은 예감이 들어요.",
      "acceptedAnswers": [
        "이번 프로젝트가 성공할 것 같은 좋은 예감이 들어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "topic-neun",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1824": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The weather agency warned of heavy rain with strong winds tomorrow morning”.",
      "canonicalTargetKey": "기상청은 내일 아침 강풍 동반 폭우를 예고했어요.",
      "acceptedAnswers": [
        "기상청은 내일 아침 강풍 동반 폭우를 예고했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l11"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1825": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I deposit savings in the bank regularly every month”.",
      "canonicalTargetKey": "매달 정기적으로 은행에 예금을 저축하고 있어요.",
      "acceptedAnswers": [
        "매달 정기적으로 은행에 예금을 저축하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "location-e",
        "object-eul-reul",
        "with-hago-wa",
        "present-polite",
        "and-go",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1826": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I watched a funny variety show program with my family on Sunday evening”.",
      "canonicalTargetKey": "주말 저녁에 가족들과 재미있는 예능 프로그램을 봤어요.",
      "acceptedAnswers": [
        "주말 저녁에 가족들과 재미있는 예능 프로그램을 봤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "with-hago-wa",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1827": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The scholar dug into social problems with sharp analytical power”.",
      "canonicalTargetKey": "그 학자는 예리한 분석력으로 사회 문제를 파헤쳤어요.",
      "acceptedAnswers": [
        "그 학자는 예리한 분석력으로 사회 문제를 파헤쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1828": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I reserved the Chuseok holiday train station train tickets in advance”.",
      "canonicalTargetKey": "추석 연휴 기차역 열차 표를 미리 예매해 두었어요.",
      "acceptedAnswers": [
        "추석 연휴 기차역 열차 표를 미리 예매해 두었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1829": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to church and offered a devout worship service on Sunday morning”.",
      "canonicalTargetKey": "주말 일요일 아침에 교회에 가서 경건한 예배를 드렸어요.",
      "acceptedAnswers": [
        "주말 일요일 아침에 교회에 가서 경건한 예배를 드렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1830": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to the public health center and got a vaccine to prevent flu”.",
      "canonicalTargetKey": "독감 예방을 위해 보건소에 가서 백신을 맞았어요.",
      "acceptedAnswers": [
        "독감 예방을 위해 보건소에 가서 백신을 맞았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l10"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1831": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government budget bill according to the new year business draft plan passed”.",
      "canonicalTargetKey": "새해 사업 계획안에 따른 정부 예산안이 통과되었어요.",
      "acceptedAnswers": [
        "새해 사업 계획안에 따른 정부 예산안이 통과되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1832": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Before entering class, I preview the textbook contents first”.",
      "canonicalTargetKey": "수업에 들어가기 전에 교과서 내용을 먼저 예습해요.",
      "acceptedAnswers": [
        "수업에 들어가기 전에 교과서 내용을 먼저 예습해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1833": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The teacher wrote example sentences of difficult grammar on the blackboard”.",
      "canonicalTargetKey": "교사가 칠판에 어려운 문법의 예시 문장을 적어 주었어요.",
      "acceptedAnswers": [
        "교사가 칠판에 어려운 문법의 예시 문장을 적어 주었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1834": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I reserved a famous restaurant in advance for weekend dinner”.",
      "canonicalTargetKey": "주말 저녁 식사를 위해 유명한 식당을 미리 예약했어요.",
      "acceptedAnswers": [
        "주말 저녁 식사를 위해 유명한 식당을 미리 예약했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1835": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Greeting by bowing your head when meeting elders is basic courtesy”.",
      "canonicalTargetKey": "어른을 만나면 머리를 숙여 인사하는 것이 기본 예의예요.",
      "acceptedAnswers": [
        "어른을 만나면 머리를 숙여 인사하는 것이 기본 예의예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "copula-ieyo",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1836": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The modern IT development speed is indeed difficult to predict”.",
      "canonicalTargetKey": "현대 정보 기술 발전 속도는 참 예측하기 어렵습니다.",
      "acceptedAnswers": [
        "현대 정보 기술 발전 속도는 참 예측하기 어렵습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1837": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We strengthen factory wastewater treatment to prevent groundwater contamination”.",
      "canonicalTargetKey": "지하수의 오염 방지를 위해 공장 폐수 처리를 강화해요.",
      "acceptedAnswers": [
        "지하수의 오염 방지를 위해 공장 폐수 처리를 강화해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-nature-u3-l7"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1838": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A misunderstanding arose between friends due to a minor slip of the tongue”.",
      "canonicalTargetKey": "사소한 말실수 때문에 친구 사이에 오해가 생겼어요.",
      "acceptedAnswers": [
        "사소한 말실수 때문에 친구 사이에 오해가 생겼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "when-ttae"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1839": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My whole body aches because I carried moving packages all day”.",
      "canonicalTargetKey": "하루 종일 이삿짐을 날랐더니 온몸이 쑤시고 아파요.",
      "acceptedAnswers": [
        "하루 종일 이삿짐을 날랐더니 온몸이 쑤시고 아파요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "subject-i-ga",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1840": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Exotic and pretty flowers grow inside the glass greenhouse”.",
      "canonicalTargetKey": "유리 온실 내부에서 이국적이고 예쁜 꽃들이 자라요.",
      "acceptedAnswers": [
        "유리 온실 내부에서 이국적이고 예쁜 꽃들이 자라요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1841": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government implemented mortgage loan regulation easing measures”.",
      "canonicalTargetKey": "정부는 주택 담보 대출 규제 완화 조치를 시행했어요.",
      "acceptedAnswers": [
        "정부는 주택 담보 대출 규제 완화 조치를 시행했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1842": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Both nations' leaders meet and maintain peaceful diplomatic relations”.",
      "canonicalTargetKey": "양국 정상들이 만나 평화로운 외교 관계를 유지해요.",
      "acceptedAnswers": [
        "양국 정상들이 만나 평화로운 외교 관계를 유지해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l13"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1843": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “When evaluating people, we must value personality more than appearance”.",
      "canonicalTargetKey": "사람을 평가할 때 외모보다 성격을 중시해야 해요.",
      "acceptedAnswers": [
        "사람을 평가할 때 외모보다 성격을 중시해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda",
        "when-ttae",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l11"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1844": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He was scolded because he slept out without parents' permission”.",
      "canonicalTargetKey": "그는 부모님의 허락 없이 무단외박을 해서 꾸중을 들었어요.",
      "acceptedAnswers": [
        "그는 부모님의 허락 없이 무단외박을 해서 꾸중을 들었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l8"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1845": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Since the winter weather is very cold, dress warmly when going out”.",
      "canonicalTargetKey": "겨울 날씨가 매우 추우니 외출할 때 옷을 따뜻이 입으세요.",
      "acceptedAnswers": [
        "겨울 날씨가 매우 추우니 외출할 때 옷을 따뜻이 입으세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "imperative-seyo",
        "when-ttae",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn8-travel-u7-l10"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants",
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants; particle-or-word-order-ambiguity."
    },
    "s1846": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am a left-hander who uses the spoon with the left hand”.",
      "canonicalTargetKey": "저는 왼손으로 숟가락질을 하는 왼손잡이예요.",
      "acceptedAnswers": [
        "저는 왼손으로 숟가락질을 하는 왼손잡이예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn6-health-u3-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1847": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The most important factor of success is persistence and a sincere attitude”.",
      "canonicalTargetKey": "성공의 가장 중요한 요소는 끈기와 성실한 태도입니다.",
      "acceptedAnswers": [
        "성공의 가장 중요한 요소는 끈기와 성실한 태도입니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "with-hago-wa",
        "formal-nida",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1848": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I summarized the lecture contents clearly in a notebook”.",
      "canonicalTargetKey": "강의 내용을 공책에 일목요연하게 요약해 두었어요.",
      "acceptedAnswers": [
        "강의 내용을 공책에 일목요연하게 요약해 두었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1849": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The government's technical support request was officially received, starting processing”.",
      "canonicalTargetKey": "정부의 기술 지원 요청이 공식 접수되어 처리를 시작해요.",
      "acceptedAnswers": [
        "정부의 기술 지원 요청이 공식 접수되어 처리를 시작해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1850": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I read this machine's exact use in the user manual”.",
      "canonicalTargetKey": "이 기계의 정확한 용도를 사용설명서에서 읽었어요.",
      "acceptedAnswers": [
        "이 기계의 정확한 용도를 사용설명서에서 읽었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l8"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1851": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I looked up the meanings of difficult terms appearing in legal reports”.",
      "canonicalTargetKey": "법률 보고서에 나오는 어려운 용어들의 뜻을 찾아봤어요.",
      "acceptedAnswers": [
        "법률 보고서에 나오는 어려운 용어들의 뜻을 찾아봤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1852": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because it is the department store sale period, baby supplies prices are cheap”.",
      "canonicalTargetKey": "백화점 할인 기간이라 유아 용품 가격이 저렴하네요.",
      "acceptedAnswers": [
        "백화점 할인 기간이라 유아 용품 가격이 저렴하네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1853": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He was proved to have very excellent skills in the technology field”.",
      "canonicalTargetKey": "그는 기술 분야에서 아주 우수한 실력을 입증받았어요.",
      "acceptedAnswers": [
        "그는 기술 분야에서 아주 우수한 실력을 입증받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1854": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I was startled to meet an old alumnus by coincidence at the airport entrance”.",
      "canonicalTargetKey": "공항 입구에서 옛날 동창을 우연히 만나 깜짝 놀랐어요.",
      "acceptedAnswers": [
        "공항 입구에서 옛날 동창을 우연히 만나 깜짝 놀랐어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1855": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Friendship with a friend made during school days remains precious for life”.",
      "canonicalTargetKey": "학창 시절에 맺은 친구와의 우정은 평생 소중히 남아요.",
      "acceptedAnswers": [
        "학창 시절에 맺은 친구와의 우정은 평생 소중히 남아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-people-u3-l5"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1856": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We must pioneer our own destiny by making efforts ourselves”.",
      "canonicalTargetKey": "우리는 스스로 노력하여 자신의 운명을 개척해야 해요.",
      "acceptedAnswers": [
        "우리는 스스로 노력하여 자신의 운명을 개척해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1857": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to my friend's warm comfort, I could overcome the disappointment”.",
      "canonicalTargetKey": "친구의 따뜻한 위로 덕분에 실망감을 이겨낼 수 있었어요.",
      "acceptedAnswers": [
        "친구의 따뜻한 위로 덕분에 실망감을 이겨낼 수 있었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "can-su-itda"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1858": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If you are not careful, you can hurt your hand on broken glass pieces”.",
      "canonicalTargetKey": "조심하지 않으면 깨진 유리 조각에 손을 다칠 수 있어요.",
      "acceptedAnswers": [
        "조심하지 않으면 깨진 유리 조각에 손을 다칠 수 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "present-polite",
        "neg-ji-anta",
        "can-su-itda",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1859": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This contract condition was written very advantageously for our company”.",
      "canonicalTargetKey": "이 계약 조건은 우리 회사에 매우 유리하게 작성되었어요.",
      "acceptedAnswers": [
        "이 계약 조건은 우리 회사에 매우 유리하게 작성되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1860": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Gyeongju is filled with historical ruins of the Silla Dynasty 1,000 years ago”.",
      "canonicalTargetKey": "경주에는 천 년 전 신라 시대의 역사 유적이 가득해요.",
      "acceptedAnswers": [
        "경주에는 천 년 전 신라 시대의 역사 유적이 가득해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "subject-i-ga",
        "present-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1861": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I bought clothes trending among young people these days at the department store”.",
      "canonicalTargetKey": "요즘 젊은이들 사이에서 유행하는 옷을 백화점에서 샀어요.",
      "acceptedAnswers": [
        "요즘 젊은이들 사이에서 유행하는 옷을 백화점에서 샀어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1862": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I jogged lightly along the gym indoor athletic track”.",
      "canonicalTargetKey": "체육관 실내 육상 트랙을 따라 가볍게 조깅했어요.",
      "acceptedAnswers": [
        "체육관 실내 육상 트랙을 따라 가볍게 조깅했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1863": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He is scheduled to retire next month from the workplace where he worked for life”.",
      "canonicalTargetKey": "그는 평생 일한 직장에서 다음 달에 은퇴할 예정이에요.",
      "acceptedAnswers": [
        "그는 평생 일한 직장에서 다음 달에 은퇴할 예정이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "copula-ieyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l8"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1864": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I listened carefully to diverse opinions of department members at the meeting”.",
      "canonicalTargetKey": "회의에서 부서원들의 다양한 의견들을 경청했어요.",
      "acceptedAnswers": [
        "회의에서 부서원들의 다양한 의견들을 경청했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1865": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please answer grasping the other party's question intention accurately”.",
      "canonicalTargetKey": "상대방의 질문 의도를 정확히 파악하여 답변하세요.",
      "acceptedAnswers": [
        "상대방의 질문 의도를 정확히 파악하여 답변하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1866": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I cannot erase suspicion because his claim lacks basis”.",
      "canonicalTargetKey": "그의 주장에는 근거가 부족해 의심을 지울 수 없어요.",
      "acceptedAnswers": [
        "그의 주장에는 근거가 부족해 의심을 지울 수 없어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite",
        "can-su-itda"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1867": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Assembly members gather to discuss the new budget policy”.",
      "canonicalTargetKey": "의회 의원들이 모여 새 예산안 정책을 논의해요.",
      "acceptedAnswers": [
        "의회 의원들이 모여 새 예산안 정책을 논의해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1868": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I learned the basic principles of gravity theory in science class”.",
      "canonicalTargetKey": "과학 수업 시간에 중력 이론의 기본 원리를 배웠어요.",
      "acceptedAnswers": [
        "과학 수업 시간에 중력 이론의 기본 원리를 배웠어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1869": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I wrote my relevant career in detail on the resume to enter the company”.",
      "canonicalTargetKey": "회사 입사를 위해 이력서에 관련 경력을 상세히 적었어요.",
      "acceptedAnswers": [
        "회사 입사를 위해 이력서에 관련 경력을 상세히 적었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1870": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The company made a great profit through overseas exports this year”.",
      "canonicalTargetKey": "회사는 올해 해외 수출을 통해 큰 이익을 남겼어요.",
      "acceptedAnswers": [
        "회사는 올해 해외 수출을 통해 큰 이익을 남겼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1871": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I decided to change jobs to another company for better work conditions”.",
      "canonicalTargetKey": "더 나은 근무 조건을 위해 다른 업체로 이직을 결심했어요.",
      "acceptedAnswers": [
        "더 나은 근무 조건을 위해 다른 업체로 이직을 결심했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1872": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A polite attitude respecting others is the basis of a fine personality”.",
      "canonicalTargetKey": "타인을 존중하는 예의 바른 태도가 훌륭한 인격의 기본이에요.",
      "acceptedAnswers": [
        "타인을 존중하는 예의 바른 태도가 훌륭한 인격의 기본이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "possessive-ui",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1873": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “There are many large convenience stores near the apartment complex in the city hall vicinity”.",
      "canonicalTargetKey": "시청 인근 아파트 단지 근처에 대형 편의점이 많아요.",
      "acceptedAnswers": [
        "시청 인근 아파트 단지 근처에 대형 편의점이 많아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l13"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1874": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Able professional workforce was newly recruited in the factory technology department”.",
      "canonicalTargetKey": "공장 기술 부서에 유능한 전문 인력이 새로 충원되었어요.",
      "acceptedAnswers": [
        "공장 기술 부서에 유능한 전문 인력이 새로 충원되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1875": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Worry over commuting transport costs arose at the bus fare raise news”.",
      "canonicalTargetKey": "버스 요금 인상 소식에 출퇴근 교통비 걱정이 생겼어요.",
      "acceptedAnswers": [
        "버스 요금 인상 소식에 출퇴근 교통비 걱정이 생겼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1876": {
      "typedClass": "canonical",
      "examPromptEn": "A classmate asks what is good. In ordinary polite Korean, answer that the first impression is good. Use 첫 인상.",
      "canonicalTargetKey": "첫 인상이 좋아요.",
      "acceptedAnswers": [
        "첫 인상이 좋아요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l1"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1877": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Citizens' awareness regarding environmental pollution problems improved greatly”.",
      "canonicalTargetKey": "환경 오염 문제에 대한 국민들의 인식이 크게 개선되었어요.",
      "acceptedAnswers": [
        "환경 오염 문제에 대한 국민들의 인식이 크게 개선되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1878": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The reporter conducts the famous movie director's filming impressions interview”.",
      "canonicalTargetKey": "기자가 유명 영화감독의 촬영 소감 인터뷰를 진행해요.",
      "acceptedAnswers": [
        "기자가 유명 영화감독의 촬영 소감 인터뷰를 진행해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1879": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I write a diary in Hangul every evening before going to bed”.",
      "canonicalTargetKey": "매일 저녁 잠자리에 들기 전에 한글로 일기를 써요.",
      "acceptedAnswers": [
        "매일 저녁 잠자리에 들기 전에 한글로 일기를 써요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "object-eul-reul",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1880": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The weather is nice today”.",
      "canonicalTargetKey": "오늘 일기가 좋아요.",
      "acceptedAnswers": [
        "오늘 일기가 좋아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-nature-u3-l2"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1881": {
      "typedClass": "canonical",
      "examPromptEn": "Continuing a conversation about that illness, tell a classmate in ordinary polite Korean that it lasts a long time. Use 오래 가다.",
      "canonicalTargetKey": "그 병은 오래 가요.",
      "acceptedAnswers": [
        "그 병은 오래 가요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s1882": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Trainees write the internal medicine ward training log every day”.",
      "canonicalTargetKey": "실습생들이 매일 내과 병동의 실습 일지를 작성해요.",
      "acceptedAnswers": [
        "실습생들이 매일 내과 병동의 실습 일지를 작성해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "possessive-ui",
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l6"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1883": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please note that cheating during the exam is entirely prohibited”.",
      "canonicalTargetKey": "시험 도중 부정행위는 일체 금지되니 주의하시기 바랍니다.",
      "acceptedAnswers": [
        "시험 도중 부정행위는 일체 금지되니 주의하시기 바랍니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u8-l7"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1884": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our party gathered in front of the train station ticket office and bought tickets”.",
      "canonicalTargetKey": "기차역 매표소 앞에 우리 일행이 모여 표를 샀어요.",
      "acceptedAnswers": [
        "기차역 매표소 앞에 우리 일행이 모여 표를 샀어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1885": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because holidays overlapped, next Monday became a temporary public holiday”.",
      "canonicalTargetKey": "공휴일이 겹쳐서 다음 주 월요일이 임시 공휴일이 되었어요.",
      "acceptedAnswers": [
        "공휴일이 겹쳐서 다음 주 월요일이 임시 공휴일이 되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l11"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1886": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I checked the object price and deposited it into the seller's bank account”.",
      "canonicalTargetKey": "물건 가격을 확인하고 판매자의 은행 계좌로 입금했어요.",
      "acceptedAnswers": [
        "물건 가격을 확인하고 판매자의 은행 계좌로 입금했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "possessive-ui",
        "direction-euro",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn6-shopping-u5-l4"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1887": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Overcoming the difficult interview process, I finally succeeded in joining a large company”.",
      "canonicalTargetKey": "어려운 면접 과정을 딛고 마침내 대기업 입사에 성공했어요.",
      "acceptedAnswers": [
        "어려운 면접 과정을 딛고 마침내 대기업 입사에 성공했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "and-go",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1888": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I study at the library even over the weekend to acquire a qualification license”.",
      "canonicalTargetKey": "자격증을 취득하려고 주말에도 도서관에서 공부해요.",
      "acceptedAnswers": [
        "자격증을 취득하려고 주말에도 도서관에서 공부해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "also-do",
        "location-eseo",
        "present-polite",
        "and-go",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1889": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I raised loan funds from the bank for the housing provision contract”.",
      "canonicalTargetKey": "주택 마련 계약을 위해 은행에서 대출 자금을 조달했어요.",
      "acceptedAnswers": [
        "주택 마련 계약을 위해 은행에서 대출 자금을 조달했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u2-l8"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1890": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He boasted to his parents showing his exam report card”.",
      "canonicalTargetKey": "그는 시험 성적표를 보이며 부모님께 자랑을 늘어놓았어요.",
      "acceptedAnswers": [
        "그는 시험 성적표를 보이며 부모님께 자랑을 늘어놓았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1891": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Have confidence in your Hangul speaking skill and speak up confidently”.",
      "canonicalTargetKey": "한글 말하기 실력에 자신감을 갖고 당당히 말해 보세요.",
      "acceptedAnswers": [
        "한글 말하기 실력에 자신감을 갖고 당당히 말해 보세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "imperative-seyo",
        "and-go",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-feelings-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1892": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Because the weather is clear, I set up a shade canopy on the park lawn and rested”.",
      "canonicalTargetKey": "날씨가 맑아서 공원 잔디밭 위에 그늘막을 치고 쉬었어요.",
      "acceptedAnswers": [
        "날씨가 맑아서 공원 잔디밭 위에 그늘막을 치고 쉬었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-e",
        "object-eul-reul",
        "past-polite",
        "and-go",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1893": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Getting interested in reading Hangul novel books, I go to the library every day”.",
      "canonicalTargetKey": "한글 소설책 읽기에 재미를 붙여 매일 도서관에 가요.",
      "acceptedAnswers": [
        "한글 소설책 읽기에 재미를 붙여 매일 도서관에 가요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l9"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1894": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He donated a significant amount of the wealth gathered for life to the scholarship foundation”.",
      "canonicalTargetKey": "그는 평생 모은 재산의 상당액을 장학 재단에 기부했어요.",
      "acceptedAnswers": [
        "그는 평생 모은 재산의 상당액을 장학 재단에 기부했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1895": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We must prepare natural disaster measures due to heavy rain and strong winds”.",
      "canonicalTargetKey": "폭우와 강풍으로 인한 자연 재해 대책을 마련해야 해요.",
      "acceptedAnswers": [
        "폭우와 강풍으로 인한 자연 재해 대책을 마련해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "direction-euro",
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1896": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our department starts new project business starting tomorrow”.",
      "canonicalTargetKey": "저희 부서는 내일부터 새로운 프로젝트 업무를 시작합니다.",
      "acceptedAnswers": [
        "저희 부서는 내일부터 새로운 프로젝트 업무를 시작합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "from-buteo",
        "object-eul-reul",
        "formal-nida",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l14"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1897": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is good to actively participate in Korean class conversation practice”.",
      "canonicalTargetKey": "한국어 수업 대화 실습에 적극적으로 참여하는 게 좋아요.",
      "acceptedAnswers": [
        "한국어 수업 대화 실습에 적극적으로 참여하는 게 좋아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1898": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I heard a mysterious legend tangled with the valley behind the country village”.",
      "canonicalTargetKey": "시골 마을 뒤편 계곡에 얽힌 신비로운 전설을 들었어요.",
      "acceptedAnswers": [
        "시골 마을 뒤편 계곡에 얽힌 신비로운 전설을 들었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1899": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Chuseok is Korea's unique traditional holiday passed down from ancestors”.",
      "canonicalTargetKey": "추석은 조상들로부터 이어져 온 한국의 고유 전통 명절이에요.",
      "acceptedAnswers": [
        "추석은 조상들로부터 이어져 온 한국의 고유 전통 명절이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "from-buteo",
        "possessive-ui",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l6"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1900": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The passport issuance application procedure became much simpler than before”.",
      "canonicalTargetKey": "여권 발급 신청 절차가 예전보다 훨씬 간단해졌어요.",
      "acceptedAnswers": [
        "여권 발급 신청 절차가 예전보다 훨씬 간단해졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "past-polite",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1901": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The clock hands pointed to noon 12, and the alarm rang”.",
      "canonicalTargetKey": "시계 바늘이 정오 열두 시를 가리키며 알람이 울렸어요.",
      "acceptedAnswers": [
        "시계 바늘이 정오 열두 시를 가리키며 알람이 울렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l8"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1902": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I urgently corrected the phone number incorrectly written on the resume”.",
      "canonicalTargetKey": "이력서에 잘못 기재된 전화번호를 긴급히 정정했어요.",
      "acceptedAnswers": [
        "이력서에 잘못 기재된 전화번호를 긴급히 정정했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-actions-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1903": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “During the summer vacation period, I go on a trip to the beautiful island Jeju”.",
      "canonicalTargetKey": "여름 방학 기간 동안 아름다운 섬 제주도로 여행을 가요.",
      "acceptedAnswers": [
        "여름 방학 기간 동안 아름다운 섬 제주도로 여행을 가요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn7-travel-u6-l7"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1904": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please submit the written planning sheet draft to the office by this afternoon”.",
      "canonicalTargetKey": "오늘 오후까지 기획서 작성 본을 사무실에 제출하세요.",
      "acceptedAnswers": [
        "오늘 오후까지 기획서 작성 본을 사무실에 제출하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "until-kkaji",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1905": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I saw harmonious sculpture artworks exhibited in the art gallery lobby”.",
      "canonicalTargetKey": "미술관 로비에 전시된 조화로운 조각 작품들을 보았어요.",
      "acceptedAnswers": [
        "미술관 로비에 전시된 조화로운 조각 작품들을 보았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1906": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Basement parking lot of the department store is packed with vehicles, making parking difficult”.",
      "canonicalTargetKey": "백화점 지하 주차장에 차량들이 꽉 차서 주차가 곤란해요.",
      "acceptedAnswers": [
        "백화점 지하 주차장에 차량들이 꽉 차서 주차가 곤란해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1907": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A weak earthquake occurred near the sea side late last night”.",
      "canonicalTargetKey": "어젯밤 늦게 인근 바다 쪽에서 약한 지진이 발생했어요.",
      "acceptedAnswers": [
        "어젯밤 늦게 인근 바다 쪽에서 약한 지진이 발생했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-nature-u2-l16"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1908": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please watch out for the crosswalk going down to the basement parking entrance”.",
      "canonicalTargetKey": "지하 주차장 입구로 내려가는 횡단보도 조심하세요.",
      "acceptedAnswers": [
        "지하 주차장 입구로 내려가는 횡단보도 조심하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "also-do",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l13"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1909": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's keep order by lining up at the stop where many people gather”.",
      "canonicalTargetKey": "많은 사람이 몰린 정류장에서 줄을 서서 질서를 지킵시다.",
      "acceptedAnswers": [
        "많은 사람이 몰린 정류장에서 줄을 서서 질서를 지킵시다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u7-l6"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1910": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A giant typhoon is approaching through the south sea of the Korean peninsula”.",
      "canonicalTargetKey": "거대한 태풍이 한반도 남쪽 바다를 통해 다가오고 있어요.",
      "acceptedAnswers": [
        "거대한 태풍이 한반도 남쪽 바다를 통해 다가오고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "also-do",
        "object-eul-reul",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-nature-u2-l16"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1911": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “During the Gyeongju trip, I stayed at a pretty Hanok village lodging”.",
      "canonicalTargetKey": "경주 여행 도중 예쁜 한옥 마을 숙소에서 묵었어요.",
      "acceptedAnswers": [
        "경주 여행 도중 예쁜 한옥 마을 숙소에서 묵었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1912": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I studied new words in today's morning Korean class time”.",
      "canonicalTargetKey": "오늘 오전 한국어 수업 시간에 새 단어를 공부했어요.",
      "acceptedAnswers": [
        "오늘 오전 한국어 수업 시간에 새 단어를 공부했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1913": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I looked around Suwon Hwaseong fortress wall taking the train over the weekend”.",
      "canonicalTargetKey": "주말에 열차를 타고 수원 화성 성곽을 둘러보았어요.",
      "acceptedAnswers": [
        "주말에 열차를 타고 수원 화성 성곽을 둘러보았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "and-go",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1914": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I finished modifying the email address incorrectly written on the resume”.",
      "canonicalTargetKey": "이력서에 잘못 적힌 이메일 주소의 수정을 끝마쳤어요.",
      "acceptedAnswers": [
        "이력서에 잘못 적힌 이메일 주소의 수정을 끝마쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1915": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is very important to align the horizontal level accurately before bookshelf assembly”.",
      "canonicalTargetKey": "책장 조립 전에 수평을 정확히 맞추는 게 아주 중요해요.",
      "acceptedAnswers": [
        "책장 조립 전에 수평을 정확히 맞추는 게 아주 중요해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1916": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The baby's pure smile completely resolves the whole body's fatigue”.",
      "canonicalTargetKey": "아기의 순수한 미소는 온몸의 피로를 싹 풀어주네요.",
      "acceptedAnswers": [
        "아기의 순수한 미소는 온몸의 피로를 싹 풀어주네요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u6-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1917": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I adopted a golden retriever of a gentle and obedient personality”.",
      "canonicalTargetKey": "얌전하고 순종적인 성격의 골든 리트리버를 입양했어요.",
      "acceptedAnswers": [
        "얌전하고 순종적인 성격의 골든 리트리버를 입양했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l2"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1918": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Police officers patrol local alley corners late at night”.",
      "canonicalTargetKey": "경찰관들이 밤늦게 동네 골목 구석구석 순찰을 돕니다.",
      "acceptedAnswers": [
        "경찰관들이 밤늦게 동네 골목 구석구석 순찰을 돕니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn5-work-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1919": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I parked the newly prepared white passenger car in the apartment parking lot”.",
      "canonicalTargetKey": "새로 장만한 흰색 승용차를 아파트 주차장에 대었어요.",
      "acceptedAnswers": [
        "새로 장만한 흰색 승용차를 아파트 주차장에 대었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-e",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u9-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1920": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Watch out for mold due to high indoor moisture in summer rainy season”.",
      "canonicalTargetKey": "여름 장마철에는 실내 습기가 많아 곰팡이를 조심해요.",
      "acceptedAnswers": [
        "여름 장마철에는 실내 습기가 많아 곰팡이를 조심해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-nature-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1921": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We went on a field trip to the forest to observe animals' wild behaviors”.",
      "canonicalTargetKey": "동물들의 야생 습성을 관찰하려 숲으로 견학을 갔어요.",
      "acceptedAnswers": [
        "동물들의 야생 습성을 관찰하려 숲으로 견학을 갔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u11-l5"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1922": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The fierce match of both baseball teams finally ended in a tie”.",
      "canonicalTargetKey": "두 야구 팀의 치열한 승부는 결국 무승부로 끝났어요.",
      "acceptedAnswers": [
        "두 야구 팀의 치열한 승부는 결국 무승부로 끝났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "direction-euro",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-hobbies-u3-l6"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1923": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Regardless of the match outcome, the image of doing one's best is beautiful”.",
      "canonicalTargetKey": "시합의 승패와 상관없이 최선을 다한 모습이 아름다워요.",
      "acceptedAnswers": [
        "시합의 승패와 상관없이 최선을 다한 모습이 아름다워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "with-hago-wa",
        "subject-i-ga",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u4-l5"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1924": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The project beginning is an important period when thorough investigation is demanded”.",
      "canonicalTargetKey": "프로젝트 초기는 철저한 조사가 요구되는 중요한 시기예요.",
      "acceptedAnswers": [
        "프로젝트 초기는 철저한 조사가 요구되는 중요한 시기예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l13"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1925": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Citizens' peaceful protest is in progress at the plaza in front of city hall”.",
      "canonicalTargetKey": "시청 앞 광장에서 시민들의 평화적인 시위가 진행돼요.",
      "acceptedAnswers": [
        "시청 앞 광장에서 시민들의 평화적인 시위가 진행돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "possessive-ui",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l13"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1926": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The poet published a poetry book containing the mysteries of nature”.",
      "canonicalTargetKey": "그 시인은 자연의 신비로움을 담은 시집을 출판했어요.",
      "acceptedAnswers": [
        "그 시인은 자연의 신비로움을 담은 시집을 출판했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1927": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We have arrived at a point in time when we must correct the business draft plan completely”.",
      "canonicalTargetKey": "사업 계획안을 전면 정정해야 하는 시점에 와 있어요.",
      "acceptedAnswers": [
        "사업 계획안을 전면 정정해야 하는 시점에 와 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "must-ya-dwaeda",
        "if-myeon",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-daily-u4-l11"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1928": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If you look at this problem from a different viewpoint, the answer changes”.",
      "canonicalTargetKey": "이 문제를 다른 시점에서 보면 답이 달라져요.",
      "acceptedAnswers": [
        "이 문제를 다른 시점에서 보면 답이 달라져요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "location-eseo",
        "subject-i-ga",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn4-study-u3-l9"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1929": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This plant skin has no toxicity, so it is possible for edible use”.",
      "canonicalTargetKey": "이 식물 껍질은 독성이 없어 식용으로 가능합니다.",
      "acceptedAnswers": [
        "이 식물 껍질은 독성이 없어 식용으로 가능합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn5-food-u3-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1930": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He always seems like a polite and honest English gentleman”.",
      "canonicalTargetKey": "그는 항상 예의 바르고 정직한 영국의 신사 같습니다.",
      "acceptedAnswers": [
        "그는 항상 예의 바르고 정직한 영국의 신사 같습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "formal-nida",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l11"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1931": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Medical school trainees do clinical training in the internal medicine ward”.",
      "canonicalTargetKey": "의과대학 실습생들이 내과 병실에서 임상 실습을 해요.",
      "acceptedAnswers": [
        "의과대학 실습생들이 내과 병실에서 임상 실습을 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "location-eseo",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-study-u6-l3"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1932": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I make future plans looking back at the footsteps of the past gone by”.",
      "canonicalTargetKey": "지나온 과거의 발자취를 돌아보며 미래 계획을 세워요.",
      "acceptedAnswers": [
        "지나온 과거의 발자취를 돌아보며 미래 계획을 세워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn7-daily-u6-l8"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1933": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The pharmacy is located very closely to the convenience store building”.",
      "canonicalTargetKey": "약국은 편의점 건물 아주 가까이에 위치해 있어요.",
      "acceptedAnswers": [
        "약국은 편의점 건물 아주 가까이에 위치해 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l13"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1934": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am very sorry for being late”.",
      "canonicalTargetKey": "늦어서 대단히 죄송합니다.",
      "acceptedAnswers": [
        "늦어서 대단히 죄송합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "formal-nida",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1935": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “She got a perfect score on the exam”.",
      "canonicalTargetKey": "그녀는 시험에서 완벽한 점수를 받았어요.",
      "acceptedAnswers": [
        "그녀는 시험에서 완벽한 점수를 받았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l1"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1936": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Due to heavy rain and strong winds, our neighborhood electricity was cut off”.",
      "canonicalTargetKey": "폭우와 강풍으로 인해 우리 동네 전기가 끊겼어요.",
      "acceptedAnswers": [
        "폭우와 강풍으로 인해 우리 동네 전기가 끊겼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "subject-i-ga",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1937": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The claims he made all turned out to be lies”.",
      "canonicalTargetKey": "그가 한 주장은 전부 거짓인 것으로 드러났어요.",
      "acceptedAnswers": [
        "그가 한 주장은 전부 거짓인 것으로 드러났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "topic-neun",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1938": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I do not know about that rumor at all”.",
      "canonicalTargetKey": "저는 그 소문에 대해 전혀 알지 못합니다.",
      "acceptedAnswers": [
        "저는 그 소문에 대해 전혀 알지 못합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "formal-nida",
        "neg-mot"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1939": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The company ran street publicity campaigns to launch the new product”.",
      "canonicalTargetKey": "회사는 신제품 출시를 위해 거리 홍보 활동을 폈어요.",
      "acceptedAnswers": [
        "회사는 신제품 출시를 위해 거리 홍보 활동을 폈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1940": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The shape of the cloud floating in the sky is marvelous and cute”.",
      "canonicalTargetKey": "하늘에 떠 있는 구름 모양이 신기하고 귀여워요.",
      "acceptedAnswers": [
        "하늘에 떠 있는 구름 모양이 신기하고 귀여워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "with-hago-wa",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-nature-u2-l16"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1941": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I changed the smartphone home screen background image to a pretty flower”.",
      "canonicalTargetKey": "스마트폰 바탕화면 배경 이미지를 예쁜 꽃으로 변경했어요.",
      "acceptedAnswers": [
        "스마트폰 바탕화면 배경 이미지를 예쁜 꽃으로 변경했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "direction-euro",
        "past-polite",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l4"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1942": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The committee selected the final candidate site for this project”.",
      "canonicalTargetKey": "위원회에서 이번 프로젝트의 최종 후보지를 선정했어요.",
      "acceptedAnswers": [
        "위원회에서 이번 프로젝트의 최종 후보지를 선정했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1943": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He realized his dream after continuous attempts”.",
      "canonicalTargetKey": "그는 끊임없는 시도 끝에 꿈을 실현하게 되었습니다.",
      "acceptedAnswers": [
        "그는 끊임없는 시도 끝에 꿈을 실현하게 되었습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "also-do",
        "object-eul-reul",
        "formal-nida",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1944": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went on a trip to Jeju Island with classmates during my college days”.",
      "canonicalTargetKey": "대학 시절에 동창들과 제주도로 여행을 다녀왔어요.",
      "acceptedAnswers": [
        "대학 시절에 동창들과 제주도로 여행을 다녀왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "with-hago-wa",
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1945": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My sibling tends to care a lot about grooming their appearance”.",
      "canonicalTargetKey": "동생은 외모 가꾸기에 무척 신경을 쓰는 편이에요.",
      "acceptedAnswers": [
        "동생은 외모 가꾸기에 무척 신경을 쓰는 편이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l10"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1946": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The cold medicine taste is slightly flat and bitter”.",
      "canonicalTargetKey": "감기약 맛이 약간 싱겁고 쓴 편이에요.",
      "acceptedAnswers": [
        "감기약 맛이 약간 싱겁고 쓴 편이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "copula-ieyo",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1947": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Recently, the metropolis population is moving to nearby satellite cities”.",
      "canonicalTargetKey": "최근 대도시 인구가 인근 위성 도시로 이동해요.",
      "acceptedAnswers": [
        "최근 대도시 인구가 인근 위성 도시로 이동해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l13"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1948": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “His pronunciation is clear, and his voice tone is extremely sharp”.",
      "canonicalTargetKey": "그의 발음은 분명하고 목소리 톤이 대단히 예리해요.",
      "acceptedAnswers": [
        "그의 발음은 분명하고 목소리 톤이 대단히 예리해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "with-hago-wa",
        "subject-i-ga",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation; productive-word-order-family."
    },
    "s1949": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I set the smartphone alarm time to 6:30 AM”.",
      "canonicalTargetKey": "스마트폰 알람 시간을 오전 여섯 시 반으로 설정했어요.",
      "acceptedAnswers": [
        "스마트폰 알람 시간을 오전 여섯 시 반으로 설정했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "counter-phrase",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1950": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He was awarded this year's excellent literature prize for his novel work”.",
      "canonicalTargetKey": "그는 소설 작품으로 올해의 우수 문학상을 수상했어요.",
      "acceptedAnswers": [
        "그는 소설 작품으로 올해의 우수 문학상을 수상했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l19"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1951": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Maybe because of the summer season, the midday temperature is extremely hot”.",
      "canonicalTargetKey": "여름철이라 그런지 한낮 기온이 엄청 뜨겁습니다.",
      "acceptedAnswers": [
        "여름철이라 그런지 한낮 기온이 엄청 뜨겁습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1952": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Now the transportation network is connected much more tightly than in the past”.",
      "canonicalTargetKey": "지금은 예전보다 교통망이 훨씬 촘촘하게 연결되었어요.",
      "acceptedAnswers": [
        "지금은 예전보다 교통망이 훨씬 촘촘하게 연결되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "past-polite",
        "time-expression",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l10"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1953": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to the public health center and applied for a general internal medicine health checkup”.",
      "canonicalTargetKey": "보건소에 가서 내과 종합 건강 검진을 신청했어요.",
      "acceptedAnswers": [
        "보건소에 가서 내과 종합 건강 검진을 신청했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l10"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1954": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We had a family dinner out to congratulate my sibling's college admission”.",
      "canonicalTargetKey": "동생의 대학교 입학을 축하하러 가족 외식을 했어요.",
      "acceptedAnswers": [
        "동생의 대학교 입학을 축하하러 가족 외식을 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l14"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1955": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The integration schedule proposal of the two departments was officially announced”.",
      "canonicalTargetKey": "두 부서의 통합 일정 계획안이 공식 발표되었습니다.",
      "acceptedAnswers": [
        "두 부서의 통합 일정 계획안이 공식 발표되었습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "subject-i-ga",
        "formal-nida",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1956": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Clouds filled the sky, and suddenly a rain shower fell”.",
      "canonicalTargetKey": "하늘에 구름이 가득 차더니 갑자기 소나기가 내렸어요.",
      "acceptedAnswers": [
        "하늘에 구름이 가득 차더니 갑자기 소나기가 내렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l14"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1957": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This traditional clothing is made of eco-friendly materials, so it is very soft”.",
      "canonicalTargetKey": "이 전통 의류는 친환경 소재로 제작되어 아주 부드러워요.",
      "acceptedAnswers": [
        "이 전통 의류는 친환경 소재로 제작되어 아주 부드러워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1958": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I applied for a desired book purchase on the library homepage”.",
      "canonicalTargetKey": "도서관 홈페이지에서 희망 도서 구입 신청을 했어요.",
      "acceptedAnswers": [
        "도서관 홈페이지에서 희망 도서 구입 신청을 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1959": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I completed moving to the nearby apartment complex early Sunday morning”.",
      "canonicalTargetKey": "주말 아침 일찍 인근 아파트 단지로 이사를 완료했어요.",
      "acceptedAnswers": [
        "주말 아침 일찍 인근 아파트 단지로 이사를 완료했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "direction-euro",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l7"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1960": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Before the meeting started, I briefly drank coffee, enjoying composure”.",
      "canonicalTargetKey": "회의 시작 전에 잠시 커피를 마시며 여유를 즐겼어요.",
      "acceptedAnswers": [
        "회의 시작 전에 잠시 커피를 마시며 여유를 즐겼어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l14"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1961": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “My younger sister rises to sophomore in college this year”.",
      "canonicalTargetKey": "제 여동생은 올해 대학교 이 학년으로 올라갑니다.",
      "acceptedAnswers": [
        "제 여동생은 올해 대학교 이 학년으로 올라갑니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "time-expression",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1962": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He registered as an official member of the Korean Language Teachers Association”.",
      "canonicalTargetKey": "그는 한국어 교사 협회의 정식 회원으로 등록했어요.",
      "acceptedAnswers": [
        "그는 한국어 교사 협회의 정식 회원으로 등록했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1963": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The enterprise was proved of its excellent technology-based competitiveness”.",
      "canonicalTargetKey": "그 기업은 기술 기반의 우수한 경쟁력을 입증받았습니다.",
      "acceptedAnswers": [
        "그 기업은 기술 기반의 우수한 경쟁력을 입증받았습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "possessive-ui",
        "object-eul-reul",
        "formal-nida",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1964": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The new project planning meeting starts today at 10 AM”.",
      "canonicalTargetKey": "새 프로젝트 기획 회의가 오늘 오전 열 시에 시작돼요.",
      "acceptedAnswers": [
        "새 프로젝트 기획 회의가 오늘 오전 열 시에 시작돼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "counter-phrase",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1965": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “If you happen to be late for the appointment time, please contact me by email in advance”.",
      "canonicalTargetKey": "만약 약속 시간에 늦으면 제 이메일로 미리 연락해 주세요.",
      "acceptedAnswers": [
        "만약 약속 시간에 늦으면 제 이메일로 미리 연락해 주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "imperative-seyo",
        "if-myeon",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-pragmatic-variants."
    },
    "s1966": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “His Korean speaking skill is at a very excellent level”.",
      "canonicalTargetKey": "그의 한국어 말하기 실력은 아주 우수한 수준이에요.",
      "acceptedAnswers": [
        "그의 한국어 말하기 실력은 아주 우수한 수준이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "topic-neun",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1967": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The basement parking lot construction site is a zone restricted from general public access”.",
      "canonicalTargetKey": "지하 주차장 공사 현장은 일반인 접근 금지 구역이에요.",
      "acceptedAnswers": [
        "지하 주차장 공사 현장은 일반인 접근 금지 구역이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1968": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Our baseball team achieved the feat of taking up second place in the league”.",
      "canonicalTargetKey": "우리 야구 팀이 리그 이위를 차지하는 쾌거를 이뤘어요.",
      "acceptedAnswers": [
        "우리 야구 팀이 리그 이위를 차지하는 쾌거를 이뤘어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1969": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Due to the typhoon, farms in our region suffered great damage”.",
      "canonicalTargetKey": "태풍으로 인해 우리 지역 농가가 큰 피해를 입었어요.",
      "acceptedAnswers": [
        "태풍으로 인해 우리 지역 농가가 큰 피해를 입었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-feelings-u4-l5"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1970": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I sometimes go out to dine with family on Sunday evenings”.",
      "canonicalTargetKey": "저는 주말 저녁에 가끔 가족들과 외식하러 나갑니다.",
      "acceptedAnswers": [
        "저는 주말 저녁에 가끔 가족들과 외식하러 나갑니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "with-hago-wa",
        "time-expression",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l14"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1971": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The library homepage sign-up procedure requires identity verification”.",
      "canonicalTargetKey": "도서관 홈페이지 가입 절차는 본인 인증이 필수예요.",
      "acceptedAnswers": [
        "도서관 홈페이지 가입 절차는 본인 인증이 필수예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1972": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I accurately understood the basic concept of gravity in math class”.",
      "canonicalTargetKey": "수학 수업 시간에 중력의 기본 개념을 정확히 이해했어요.",
      "acceptedAnswers": [
        "수학 수업 시간에 중력의 기본 개념을 정확히 이해했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1973": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I shared the relevant data in the computer folder with department members”.",
      "canonicalTargetKey": "컴퓨터 폴더 내 관련 자료를 부서원들과 공유했습니다.",
      "acceptedAnswers": [
        "컴퓨터 폴더 내 관련 자료를 부서원들과 공유했습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "formal-nida",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1974": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I finished voting going to the polling place early on election day”.",
      "canonicalTargetKey": "선거 날에 아침 일찍 투표소에 가서 투표를 마쳤어요.",
      "acceptedAnswers": [
        "선거 날에 아침 일찍 투표소에 가서 투표를 마쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1975": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The newly built modern building is much larger than the existing apartment”.",
      "canonicalTargetKey": "기존 아파트보다 새로 지은 현대식 건물이 훨씬 더 큽니다.",
      "acceptedAnswers": [
        "기존 아파트보다 새로 지은 현대식 건물이 훨씬 더 큽니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "comparison-boda",
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1976": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He is in charge of marketing publicity work in the company”.",
      "canonicalTargetKey": "그는 회사에서 마케팅 홍보 업무를 담당하고 있어요.",
      "acceptedAnswers": [
        "그는 회사에서 마케팅 홍보 업무를 담당하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "object-eul-reul",
        "with-hago-wa",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-work-u2-l9"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1977": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Police officers patrol alleys, striving to prevent crime”.",
      "canonicalTargetKey": "경찰관들이 골목길을 순찰해 범죄 예방에 노력하고 있어요.",
      "acceptedAnswers": [
        "경찰관들이 골목길을 순찰해 범죄 예방에 노력하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "object-eul-reul",
        "location-e",
        "with-hago-wa",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1978": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I learned about the unfortunate death news due to the accident through news”.",
      "canonicalTargetKey": "사고로 인한 안타까운 사망 소식을 뉴스로 접했어요.",
      "acceptedAnswers": [
        "사고로 인한 안타까운 사망 소식을 뉴스로 접했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l10"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1979": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Hearing the news of my friend passing the college exam makes my chest overflow”.",
      "canonicalTargetKey": "친구의 대학 시험 합격 소식을 들으니 가슴이 벅차요.",
      "acceptedAnswers": [
        "친구의 대학 시험 합격 소식을 들으니 가슴이 벅차요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l14"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation; productive-word-order-family."
    },
    "s1980": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We are producing pollution-free clean energy using sunlight”.",
      "canonicalTargetKey": "태양광을 이용해 무공해 청정 에너지를 생산하고 있어요.",
      "acceptedAnswers": [
        "태양광을 이용해 무공해 청정 에너지를 생산하고 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "with-hago-wa",
        "present-polite",
        "and-go"
      ],
      "supportingLessonIds": [
        "sn3-nature-u2-l16"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1981": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You must complete the identity authentication procedure when signing up on the homepage”.",
      "canonicalTargetKey": "홈페이지 가입 시 본인 인증 절차를 완료해야 합니다.",
      "acceptedAnswers": [
        "홈페이지 가입 시 본인 인증 절차를 완료해야 합니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "formal-nida",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn2-tech-u1-l11"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1982": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We stood in a long library waiting line, keeping our turns”.",
      "canonicalTargetKey": "차례를 지키며 도서관 대기 줄을 길게 섰어요.",
      "acceptedAnswers": [
        "차례를 지키며 도서관 대기 줄을 길게 섰어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l14"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1983": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “We perform ancestral rites on Lunar New Year”.",
      "canonicalTargetKey": "설날에 차례를 지내요.",
      "acceptedAnswers": [
        "설날에 차례를 지내요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l1"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1984": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I look at the table of contents first”.",
      "canonicalTargetKey": "책 차례를 먼저 봐요.",
      "acceptedAnswers": [
        "책 차례를 먼저 봐요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1985": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Never give up on your dreams even in front of difficult situations”.",
      "canonicalTargetKey": "어려운 상황 앞에서도 꿈을 절대 포기하지 마세요.",
      "acceptedAnswers": [
        "어려운 상황 앞에서도 꿈을 절대 포기하지 마세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1986": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I finished the safe remittance transaction with the bank mobile app”.",
      "canonicalTargetKey": "은행 모바일 앱으로 안전한 송금 거래를 끝마쳤어요.",
      "acceptedAnswers": [
        "은행 모바일 앱으로 안전한 송금 거래를 끝마쳤어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn2-shopping-u1-l12"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1987": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I got acupuncture because I am suffering from shoulder pain”.",
      "canonicalTargetKey": "어깨 통증으로 고통을 겪고 있어서 침을 맞았어요.",
      "acceptedAnswers": [
        "어깨 통증으로 고통을 겪고 있어서 침을 맞았어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "and-go",
        "because-aseo"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l10"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1988": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “A new budget policy passed in the National Assembly this afternoon”.",
      "canonicalTargetKey": "국회에서 오늘 오후 새로운 예산안 정책이 통과되었어요.",
      "acceptedAnswers": [
        "국회에서 오늘 오후 새로운 예산안 정책이 통과되었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "subject-i-ga",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1989": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The museum exhibition room interior is filled with ancient war weapons”.",
      "canonicalTargetKey": "박물관 전시실 내부에는 고대 전쟁 무기들이 가득해요.",
      "acceptedAnswers": [
        "박물관 전시실 내부에는 고대 전쟁 무기들이 가득해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s1990": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I sent a text message notifying my friend of the appointment place location”.",
      "canonicalTargetKey": "친구에게 약속 장소 위치를 알리는 문자를 보냈어요.",
      "acceptedAnswers": [
        "친구에게 약속 장소 위치를 알리는 문자를 보냈어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "topic-neun",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1991": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The image of the girl running and playing chasing butterflies in the flower garden is pretty”.",
      "canonicalTargetKey": "꽃밭에서 나비를 쫓아 뛰어노는 소녀의 모습이 예뻐요.",
      "acceptedAnswers": [
        "꽃밭에서 나비를 쫓아 뛰어노는 소녀의 모습이 예뻐요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul",
        "topic-neun",
        "possessive-ui",
        "subject-i-ga"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l14"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; productive-word-order-family."
    },
    "s1992": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “He tends to always arrive earlier than the appointment time”.",
      "canonicalTargetKey": "그는 약속 시간보다 언제나 일찍 도착하는 편이에요.",
      "acceptedAnswers": [
        "그는 약속 시간보다 언제나 일찍 도착하는 편이에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-ieyo",
        "comparison-boda"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1993": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I shed tears looking at the sad scene of the movie ending”.",
      "canonicalTargetKey": "영화 결말의 슬픈 장면을 보며 눈물을 흘렸어요.",
      "acceptedAnswers": [
        "영화 결말의 슬픈 장면을 보며 눈물을 흘렸어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "past-polite",
        "if-myeon"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s1994": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I read the definition of the formula in the first chapter of the math textbook”.",
      "canonicalTargetKey": "수학 교과서 첫 장에 나오는 공식의 정의를 읽었어요.",
      "acceptedAnswers": [
        "수학 교과서 첫 장에 나오는 공식의 정의를 읽었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "possessive-ui",
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s1995": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The idea suggestion he made during the meeting time was adopted”.",
      "canonicalTargetKey": "그가 회의 시간에 낸 아이디어 제안이 채택되었습니다.",
      "acceptedAnswers": [
        "그가 회의 시간에 낸 아이디어 제안이 채택되었습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "formal-nida",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-actions-u2-l5"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1996": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “You must listen carefully to the other party's story with a sincere attitude”.",
      "canonicalTargetKey": "상대방의 이야기를 진심 어린 태도로 경청해야 해요.",
      "acceptedAnswers": [
        "상대방의 이야기를 진심 어린 태도로 경청해야 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "copula-ieyo",
        "present-polite",
        "must-ya-dwaeda"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l10"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1997": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Do not lose study room concentration even in noisy noise”.",
      "canonicalTargetKey": "시끄러운 소음 속에서도 공부방 집중력을 잃지 마세요.",
      "acceptedAnswers": [
        "시끄러운 소음 속에서도 공부방 집중력을 잃지 마세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "also-do",
        "object-eul-reul",
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s1998": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I analyzed the morphological characteristic differences of the two plant kinds”.",
      "canonicalTargetKey": "두 식물 종류의 형태적 특징 차이를 분석해 보았습니다.",
      "acceptedAnswers": [
        "두 식물 종류의 형태적 특징 차이를 분석해 보았습니다."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "object-eul-reul",
        "formal-nida",
        "past-polite",
        "counter-phrase"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l7"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s1999": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Thanks to the quick administrative processing of government agencies, it became convenient”.",
      "canonicalTargetKey": "정부 기관의 신속한 행정 처리 덕분에 편해졌어요.",
      "acceptedAnswers": [
        "정부 기관의 신속한 행정 처리 덕분에 편해졌어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "possessive-ui",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-travel-u4-l8"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s2000": {
      "typedClass": "canonical",
      "examPromptEn": "Talking to a classmate about a service you stop using, say in ordinary polite Korean that you disconnect the internet. Use 끊다.",
      "canonicalTargetKey": "인터넷을 끊어요.",
      "acceptedAnswers": [
        "인터넷을 끊어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2001": {
      "typedClass": "canonical",
      "examPromptEn": "Referring to a completed change in habit, tell a classmate in ordinary polite Korean that you quit coffee. Use 끊다.",
      "canonicalTargetKey": "커피를 끊었어요.",
      "acceptedAnswers": [
        "커피를 끊었어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2002": {
      "typedClass": "canonical",
      "examPromptEn": "Referring to a completed action, tell a classmate in ordinary polite Korean that you unplugged the phone charger. Use 빼다.",
      "canonicalTargetKey": "휴대폰 충전기를 뺐어요.",
      "acceptedAnswers": [
        "휴대폰 충전기를 뺐어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite"
      ],
      "supportingLessonIds": [
        "sn7-tech-u3-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2003": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I subtract 3 from 10”.",
      "canonicalTargetKey": "10에서 3을 빼요.",
      "acceptedAnswers": [
        "10에서 3을 빼요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "object-eul-reul"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u3-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2004": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I have money left over”.",
      "canonicalTargetKey": "돈이 남아요.",
      "acceptedAnswers": [
        "돈이 남아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-shopping-u3-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2005": {
      "typedClass": "canonical",
      "examPromptEn": "Describing what you do next, tell a classmate in ordinary polite Korean that you close your eyes. Use 감다.",
      "canonicalTargetKey": "눈을 감아요.",
      "acceptedAnswers": [
        "눈을 감아요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn5-health-u2-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2006": {
      "typedClass": "canonical",
      "examPromptEn": "With this cake already established as the topic, tell a classmate in ordinary polite Korean that it is sweet. Use 달다.",
      "canonicalTargetKey": "이 케이크는 달아요.",
      "acceptedAnswers": [
        "이 케이크는 달아요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-food-u2-l2"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2007": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I hang a picture on the wall”.",
      "canonicalTargetKey": "벽에 그림을 달아요.",
      "acceptedAnswers": [
        "벽에 그림을 달아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-daily-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2008": {
      "typedClass": "finite",
      "examPromptEn": "With yourself already established as the topic, tell a classmate in ordinary polite Korean that you drink coffee. Use 마시다.",
      "canonicalTargetKey": "저는 커피를 마셔요.",
      "acceptedAnswers": [
        "저는 커피를 마셔요.",
        "전 커피를 마셔요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l5"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction."
    },
    "s2009": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The weather is good today”.",
      "canonicalTargetKey": "오늘은 날씨가 좋아요.",
      "acceptedAnswers": [
        "오늘은 날씨가 좋아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-nature-u2-l4"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s2010": {
      "typedClass": "canonical",
      "examPromptEn": "Telling a classmate what you eat, say in ordinary polite Korean that you eat an apple. Use 먹다.",
      "canonicalTargetKey": "사과를 먹어요.",
      "acceptedAnswers": [
        "사과를 먹어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-feelings-u5-l1"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2011": {
      "typedClass": "canonical",
      "examPromptEn": "Telling a classmate how you travel, say in ordinary polite Korean that you take the bus. Use 타다.",
      "canonicalTargetKey": "버스를 타요.",
      "acceptedAnswers": [
        "버스를 타요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-travel-u3-l2"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2012": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am not a student”.",
      "canonicalTargetKey": "저는 학생이 아니에요.",
      "acceptedAnswers": [
        "저는 학생이 아니에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn2-grammar-u1-l3"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s2013": {
      "typedClass": "canonical",
      "examPromptEn": "Continuing a conversation about your home, tell a classmate in ordinary polite Korean that it is nearby. Use 가깝다.",
      "canonicalTargetKey": "우리 집은 가까워요.",
      "acceptedAnswers": [
        "우리 집은 가까워요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-travel-u1-l4"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2014": {
      "typedClass": "canonical",
      "examPromptEn": "A classmate asks what is available. In ordinary polite Korean, answer that there is water. Use 있다.",
      "canonicalTargetKey": "물이 있어요.",
      "acceptedAnswers": [
        "물이 있어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l2"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2015": {
      "typedClass": "finite",
      "examPromptEn": "Pointing to a nearby object and treating it as the topic, identify it for a classmate in ordinary polite Korean as a book. Use 책.",
      "canonicalTargetKey": "이것은 책이에요.",
      "acceptedAnswers": [
        "이것은 책이에요.",
        "이건 책이에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u3-l3"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction."
    },
    "s2016": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I have time”.",
      "canonicalTargetKey": "저는 시간이 있어요.",
      "acceptedAnswers": [
        "저는 시간이 있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "present-polite",
        "existence-itda"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity."
    },
    "s2017": {
      "typedClass": "canonical",
      "examPromptEn": "A classmate asks what is fun. In ordinary polite Korean, answer that Korean is fun. Use 재미있다.",
      "canonicalTargetKey": "한국어가 재미있어요.",
      "acceptedAnswers": [
        "한국어가 재미있어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l4"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2018": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I go to school”.",
      "canonicalTargetKey": "저는 학교에 가요.",
      "acceptedAnswers": [
        "저는 학교에 가요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-travel-u1-l4"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2019": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I read a book yesterday”.",
      "canonicalTargetKey": "어제 책을 읽었어요.",
      "acceptedAnswers": [
        "어제 책을 읽었어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l1"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2020": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I will meet a friend tomorrow”.",
      "canonicalTargetKey": "내일 친구를 만날 거예요.",
      "acceptedAnswers": [
        "내일 친구를 만날 거예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "future-geoyeyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "future-authoring-locked"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — future-authoring-locked."
    },
    "s2021": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am drinking coffee now”.",
      "canonicalTargetKey": "지금 커피를 마셔요.",
      "acceptedAnswers": [
        "지금 커피를 마셔요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-daily-u1-l2"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2022": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I learn Korean”.",
      "canonicalTargetKey": "저는 한국어를 배워요.",
      "acceptedAnswers": [
        "저는 한국어를 배워요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u2-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2023": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I will go home”.",
      "canonicalTargetKey": "저는 집에 갈 거예요.",
      "acceptedAnswers": [
        "저는 집에 갈 거예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e",
        "future-geoyeyo"
      ],
      "supportingLessonIds": [
        "sn2-travel-u1-l4"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "future-authoring-locked"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — future-authoring-locked."
    },
    "s2024": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I exercised yesterday”.",
      "canonicalTargetKey": "저는 어제 운동했어요.",
      "acceptedAnswers": [
        "저는 어제 운동했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l1"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2025": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Grandmother is coming”.",
      "canonicalTargetKey": "할머니가 오세요.",
      "acceptedAnswers": [
        "할머니가 오세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l1"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s2026": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The teacher is here”.",
      "canonicalTargetKey": "선생님이 계세요.",
      "acceptedAnswers": [
        "선생님이 계세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn5-grammar-u3-l1"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s2027": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I help a friend”.",
      "canonicalTargetKey": "저는 친구를 도와요.",
      "acceptedAnswers": [
        "저는 친구를 도와요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u2-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2028": {
      "typedClass": "canonical",
      "examPromptEn": "With your group already established as the topic, tell a classmate in ordinary polite Korean that you watch a movie. Use 보다.",
      "canonicalTargetKey": "우리는 영화를 봐요.",
      "acceptedAnswers": [
        "우리는 영화를 봐요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-hobbies-u1-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2029": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I work every day”.",
      "canonicalTargetKey": "저는 매일 일해요.",
      "acceptedAnswers": [
        "저는 매일 일해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2030": {
      "typedClass": "canonical",
      "examPromptEn": "Contrasting today with other days, tell a classmate in ordinary polite Korean that you are resting today. Use 쉬다.",
      "canonicalTargetKey": "오늘은 쉬어요.",
      "acceptedAnswers": [
        "오늘은 쉬어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn2-daily-u1-l1"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2031": {
      "typedClass": "canonical",
      "examPromptEn": "Greet an unfamiliar adult politely with the standard lesson greeting meaning “Hello”.",
      "canonicalTargetKey": "안녕하세요.",
      "acceptedAnswers": [
        "안녕하세요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l4"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2032": {
      "typedClass": "canonical",
      "examPromptEn": "At a formal first meeting, use the respectful lesson expression meaning “Nice to meet you”. Use 뵙다.",
      "canonicalTargetKey": "처음 뵙겠습니다.",
      "acceptedAnswers": [
        "처음 뵙겠습니다."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn2-feelings-u1-l1"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2033": {
      "typedClass": "canonical",
      "examPromptEn": "In a formal situation, use the lesson expression meaning “Thank you” built from 감사하다.",
      "canonicalTargetKey": "감사합니다.",
      "acceptedAnswers": [
        "감사합니다."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l4"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2034": {
      "typedClass": "canonical",
      "examPromptEn": "Reassuring a classmate in ordinary polite Korean, say that it is okay. Use 괜찮다.",
      "canonicalTargetKey": "괜찮아요.",
      "acceptedAnswers": [
        "괜찮아요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2035": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Yes”.",
      "canonicalTargetKey": "네.",
      "acceptedAnswers": [
        "네."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2036": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “No”.",
      "canonicalTargetKey": "아니요.",
      "acceptedAnswers": [
        "아니요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2037": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “This one, please”.",
      "canonicalTargetKey": "이거 주세요.",
      "acceptedAnswers": [
        "이거 주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u2-l3"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2038": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “One moment, please”.",
      "canonicalTargetKey": "잠시만요.",
      "acceptedAnswers": [
        "잠시만요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "only-man",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2039": {
      "typedClass": "canonical",
      "examPromptEn": "Telling a classmate in ordinary polite Korean that you do not understand well, use 잘 모르다.",
      "canonicalTargetKey": "잘 모르겠어요.",
      "acceptedAnswers": [
        "잘 모르겠어요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-feelings-u1-l1"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2040": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please help me”.",
      "canonicalTargetKey": "도와주세요.",
      "acceptedAnswers": [
        "도와주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2041": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please say it again”.",
      "canonicalTargetKey": "다시 말씀해 주세요.",
      "acceptedAnswers": [
        "다시 말씀해 주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l2"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2042": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Please speak slowly”.",
      "canonicalTargetKey": "천천히 말씀해 주세요.",
      "acceptedAnswers": [
        "천천히 말씀해 주세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l2"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2043": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “What does it mean”.",
      "canonicalTargetKey": "무슨 뜻이에요?",
      "acceptedAnswers": [
        "무슨 뜻이에요?"
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "copula-ieyo",
        "question-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u2-l3"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2044": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I speak a little Korean”.",
      "canonicalTargetKey": "한국어 조금 해요.",
      "acceptedAnswers": [
        "한국어 조금 해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2045": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Yes, I will say it again”.",
      "canonicalTargetKey": "네, 다시 말씀드릴게요.",
      "acceptedAnswers": [
        "네, 다시 말씀드릴게요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "future-geoyeyo"
      ],
      "supportingLessonIds": [
        "sn2-actions-u1-l3"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "future-authoring-locked"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — future-authoring-locked."
    },
    "s2046": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Yes, I will speak slowly”.",
      "canonicalTargetKey": "네, 천천히 말할게요.",
      "acceptedAnswers": [
        "네, 천천히 말할게요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "future-geoyeyo"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l7"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "future-authoring-locked"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — future-authoring-locked."
    },
    "s2047": {
      "typedClass": "canonical",
      "examPromptEn": "Pointing out a place at some distance, tell a classmate in ordinary polite Korean that it is over there. Use 저쪽.",
      "canonicalTargetKey": "저쪽이에요.",
      "acceptedAnswers": [
        "저쪽이에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "copula-ieyo"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u2-l3"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2048": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Yes, here you go”.",
      "canonicalTargetKey": "네, 여기요.",
      "acceptedAnswers": [
        "네, 여기요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2049": {
      "typedClass": "canonical",
      "examPromptEn": "Formally acknowledge an instruction with the formal lesson expression built from 알다, meaning that you understand.",
      "canonicalTargetKey": "알겠습니다.",
      "acceptedAnswers": [
        "알겠습니다."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2050": {
      "typedClass": "canonical",
      "examPromptEn": "Make a formal apology with the lesson expression meaning “I am sorry”. Use 죄송하다.",
      "canonicalTargetKey": "죄송합니다",
      "acceptedAnswers": [
        "죄송합니다"
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l6"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2051": {
      "typedClass": "canonical",
      "examPromptEn": "Politely get an unfamiliar adult’s attention with the formal lesson expression meaning “Excuse me”. Use 실례하다.",
      "canonicalTargetKey": "실례합니다",
      "acceptedAnswers": [
        "실례합니다"
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "formal-nida"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u1-l6"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2052": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Coffee, please”.",
      "canonicalTargetKey": "커피 주세요",
      "acceptedAnswers": [
        "커피 주세요"
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "imperative-seyo",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l2"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2053": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “How much is it”.",
      "canonicalTargetKey": "얼마예요?",
      "acceptedAnswers": [
        "얼마예요?"
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "copula-ieyo",
        "question-polite"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u2-l3"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2054": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Where is the bathroom”.",
      "canonicalTargetKey": "화장실 어디예요?",
      "acceptedAnswers": [
        "화장실 어디예요?"
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "copula-ieyo",
        "question-polite"
      ],
      "supportingLessonIds": [
        "sn6-travel-u5-l1"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2055": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Can you speak English”.",
      "canonicalTargetKey": "영어 할 수 있어요?",
      "acceptedAnswers": [
        "영어 할 수 있어요?"
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "can-su-itda",
        "present-polite",
        "question-polite"
      ],
      "supportingLessonIds": [
        "sn3-study-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2056": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The teacher is coming”.",
      "canonicalTargetKey": "선생님이 오세요.",
      "acceptedAnswers": [
        "선생님이 오세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u2-l3"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s2057": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Grandmother is sleeping”.",
      "canonicalTargetKey": "할머니가 주무세요.",
      "acceptedAnswers": [
        "할머니가 주무세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn8-people-u2-l1"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s2058": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The boss is here”.",
      "canonicalTargetKey": "사장님이 계세요.",
      "acceptedAnswers": [
        "사장님이 계세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn5-grammar-u3-l1"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s2059": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The professor speaks”.",
      "canonicalTargetKey": "교수님이 말씀하세요.",
      "acceptedAnswers": [
        "교수님이 말씀하세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-study-u1-l1"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s2060": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Mother eats”.",
      "canonicalTargetKey": "어머니가 드세요.",
      "acceptedAnswers": [
        "어머니가 드세요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "honorific-si"
      ],
      "supportingLessonIds": [
        "sn2-people-u1-l1"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "particle-or-word-order-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — particle-or-word-order-ambiguity."
    },
    "s2061": {
      "typedClass": "finite",
      "examPromptEn": "Treating this nearby object as the topic, correct a classmate in ordinary polite Korean by saying that it is not a book.",
      "canonicalTargetKey": "이것은 책이 아니에요.",
      "acceptedAnswers": [
        "이것은 책이 아니에요.",
        "이건 책이 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn2-grammar-u1-l3"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction."
    },
    "s2062": {
      "typedClass": "finite",
      "examPromptEn": "With yourself already established as the topic, correct a classmate in ordinary polite Korean by saying that you are not a singer.",
      "canonicalTargetKey": "저는 가수가 아니에요.",
      "acceptedAnswers": [
        "저는 가수가 아니에요.",
        "전 가수가 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn3-work-u1-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction."
    },
    "s2063": {
      "typedClass": "finite",
      "examPromptEn": "Treating this nearby object as the topic, correct a classmate in ordinary polite Korean by saying that it is not water.",
      "canonicalTargetKey": "이것은 물이 아니에요.",
      "acceptedAnswers": [
        "이것은 물이 아니에요.",
        "이건 물이 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l2"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction."
    },
    "s2064": {
      "typedClass": "finite",
      "examPromptEn": "Treating this nearby object as the topic, correct a classmate in ordinary polite Korean by saying that it is not coffee.",
      "canonicalTargetKey": "이것은 커피가 아니에요.",
      "acceptedAnswers": [
        "이것은 커피가 아니에요.",
        "이건 커피가 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn2-food-u1-l3"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction."
    },
    "s2065": {
      "typedClass": "finite",
      "examPromptEn": "Treating that object as the topic, correct a classmate in ordinary polite Korean by saying that it is not your bag.",
      "canonicalTargetKey": "그것은 제 가방이 아니에요.",
      "acceptedAnswers": [
        "그것은 제 가방이 아니에요.",
        "그건 제 가방이 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn6-tech-u2-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction."
    },
    "s2066": {
      "typedClass": "canonical",
      "examPromptEn": "With that person already established as the topic, correct a classmate in ordinary polite Korean by saying that the person is not a doctor.",
      "canonicalTargetKey": "저 사람은 의사가 아니에요.",
      "acceptedAnswers": [
        "저 사람은 의사가 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2067": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Today is not my birthday”.",
      "canonicalTargetKey": "오늘은 제 생일이 아니에요.",
      "acceptedAnswers": [
        "오늘은 제 생일이 아니에요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l2"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "unsafe-existing-alternative-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — unsafe-existing-alternative-family."
    },
    "s2068": {
      "typedClass": "canonical",
      "examPromptEn": "With this place already established as the topic, tell a classmate in ordinary polite Korean that it is not a hospital.",
      "canonicalTargetKey": "여기는 병원이 아니에요.",
      "acceptedAnswers": [
        "여기는 병원이 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn3-health-u1-l3"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2069": {
      "typedClass": "canonical",
      "examPromptEn": "Speaking respectfully about that person and treating the person as the topic, tell a classmate in ordinary polite Korean that the person is not a teacher.",
      "canonicalTargetKey": "그분은 선생님이 아니에요.",
      "acceptedAnswers": [
        "그분은 선생님이 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn1-firstwords-u2-l5"
      ],
      "minimumSectionOrder": 1,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2070": {
      "typedClass": "finite",
      "examPromptEn": "Treating that object as the topic, correct a classmate in ordinary polite Korean by saying that it is not a dream.",
      "canonicalTargetKey": "그것은 꿈이 아니에요.",
      "acceptedAnswers": [
        "그것은 꿈이 아니에요.",
        "그건 꿈이 아니에요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "copula-negative-anieyo"
      ],
      "supportingLessonIds": [
        "sn3-feelings-u2-l1"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction."
    },
    "s2071": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's sing together”.",
      "canonicalTargetKey": "우리 같이 노래해요.",
      "acceptedAnswers": [
        "우리 같이 노래해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "propositive-eyo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l1"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "unsafe-existing-alternative-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; unsafe-existing-alternative-family."
    },
    "s2072": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's go home now”.",
      "canonicalTargetKey": "이제 집에 가요.",
      "acceptedAnswers": [
        "이제 집에 가요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-e",
        "propositive-eyo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u7-l3"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2073": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's meet again tomorrow morning”.",
      "canonicalTargetKey": "내일 아침에 다시 만나요.",
      "acceptedAnswers": [
        "내일 아침에 다시 만나요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "propositive-eyo",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "unsafe-existing-alternative-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; unsafe-existing-alternative-family."
    },
    "s2074": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's start practice now”.",
      "canonicalTargetKey": "우리 이제 연습을 시작해요.",
      "acceptedAnswers": [
        "우리 이제 연습을 시작해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "propositive-eyo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "unsafe-existing-alternative-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; unsafe-existing-alternative-family."
    },
    "s2075": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's eat ramyeon together”.",
      "canonicalTargetKey": "우리 같이 라면을 먹어요.",
      "acceptedAnswers": [
        "우리 같이 라면을 먹어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "propositive-eyo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn4-food-u2-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "unsafe-existing-alternative-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; unsafe-existing-alternative-family."
    },
    "s2076": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's watch a movie together this weekend”.",
      "canonicalTargetKey": "주말에 같이 영화를 봐요.",
      "acceptedAnswers": [
        "주말에 같이 영화를 봐요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "propositive-eyo",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-daily-u3-l2"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2077": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's all dance together”.",
      "canonicalTargetKey": "다 같이 춤을 춰요.",
      "acceptedAnswers": [
        "다 같이 춤을 춰요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "object-eul-reul",
        "propositive-eyo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "productive-pragmatic-variants",
        "unsafe-existing-alternative-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants; unsafe-existing-alternative-family."
    },
    "s2078": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's rest at the park today”.",
      "canonicalTargetKey": "오늘은 공원에서 쉬어요.",
      "acceptedAnswers": [
        "오늘은 공원에서 쉬어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-eseo",
        "propositive-eyo",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-daily-u5-l6"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2079": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Practice starts from the morning”.",
      "canonicalTargetKey": "연습은 아침부터 시작해요.",
      "acceptedAnswers": [
        "연습은 아침부터 시작해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "from-buteo",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2080": {
      "typedClass": "canonical",
      "examPromptEn": "Describing a regular schedule to a classmate in ordinary polite Korean, say that you practise from morning until evening. Use 아침부터 and 저녁까지.",
      "canonicalTargetKey": "아침부터 저녁까지 연습해요.",
      "acceptedAnswers": [
        "아침부터 저녁까지 연습해요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "from-buteo",
        "until-kkaji",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn3-daily-u2-l2"
      ],
      "minimumSectionOrder": 3,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2081": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The new class starts from tomorrow”.",
      "canonicalTargetKey": "새 수업은 내일부터 시작해요.",
      "acceptedAnswers": [
        "새 수업은 내일부터 시작해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "from-buteo",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2082": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I practice again from the beginning”.",
      "canonicalTargetKey": "처음부터 다시 연습해요.",
      "acceptedAnswers": [
        "처음부터 다시 연습해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "from-buteo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn2-feelings-u1-l2"
      ],
      "minimumSectionOrder": 2,
      "exclusionReasons": [
        "unsafe-existing-alternative-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — unsafe-existing-alternative-family."
    },
    "s2083": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It has been raining since yesterday”.",
      "canonicalTargetKey": "어제부터 비가 왔어요.",
      "acceptedAnswers": [
        "어제부터 비가 왔어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "from-buteo",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-travel-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2084": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Work starts from nine o'clock”.",
      "canonicalTargetKey": "일은 아홉 시부터 시작해요.",
      "acceptedAnswers": [
        "일은 아홉 시부터 시작해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "from-buteo",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2085": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am going to start exercising from next week”.",
      "canonicalTargetKey": "다음 주부터 운동을 시작할 거예요.",
      "acceptedAnswers": [
        "다음 주부터 운동을 시작할 거예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "from-buteo",
        "object-eul-reul",
        "future-geoyeyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l6"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "future-authoring-locked"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — future-authoring-locked."
    },
    "s2086": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I did dance practice until night”.",
      "canonicalTargetKey": "밤까지 춤 연습을 했어요.",
      "acceptedAnswers": [
        "밤까지 춤 연습을 했어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "until-kkaji",
        "object-eul-reul",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn6-hobbies-u2-l2"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    },
    "s2087": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I go from home to school by bus”.",
      "canonicalTargetKey": "집에서 학교까지 버스로 가요.",
      "acceptedAnswers": [
        "집에서 학교까지 버스로 가요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "location-eseo",
        "until-kkaji",
        "direction-euro",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "productive-word-order-family"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-word-order-family."
    },
    "s2088": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Let's sing together until the end”.",
      "canonicalTargetKey": "끝까지 같이 노래해요.",
      "acceptedAnswers": [
        "끝까지 같이 노래해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "until-kkaji",
        "propositive-eyo",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn6-actions-u5-l3"
      ],
      "minimumSectionOrder": 6,
      "exclusionReasons": [
        "productive-pragmatic-variants"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — productive-pragmatic-variants."
    },
    "s2089": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I will do the homework by tomorrow”.",
      "canonicalTargetKey": "내일까지 숙제를 할 거예요.",
      "acceptedAnswers": [
        "내일까지 숙제를 할 거예요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "until-kkaji",
        "object-eul-reul",
        "future-geoyeyo",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn5-study-u4-l2"
      ],
      "minimumSectionOrder": 5,
      "exclusionReasons": [
        "future-authoring-locked"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — future-authoring-locked."
    },
    "s2090": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am busy, but I practice every day”.",
      "canonicalTargetKey": "바쁘지만 매일 연습해요.",
      "acceptedAnswers": [
        "바쁘지만 매일 연습해요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "but-jiman",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn7-feelings-u10-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s2091": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I am tired, but I feel good”.",
      "canonicalTargetKey": "피곤하지만 기분은 좋아요.",
      "acceptedAnswers": [
        "피곤하지만 기분은 좋아요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "but-jiman",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s2092": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The song is hard, but it is fun”.",
      "canonicalTargetKey": "노래는 어렵지만 재미있어요.",
      "acceptedAnswers": [
        "노래는 어렵지만 재미있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "but-jiman",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s2093": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “The room is small, but the window is big”.",
      "canonicalTargetKey": "방은 작지만 창문이 커요.",
      "acceptedAnswers": [
        "방은 작지만 창문이 커요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "subject-i-ga",
        "but-jiman",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "topic-subject-information-structure-ambiguity",
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — topic-subject-information-structure-ambiguity; connective-clause-continuation."
    },
    "s2094": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “It is raining, but I am going to the park”.",
      "canonicalTargetKey": "비가 오지만 공원에 가요.",
      "acceptedAnswers": [
        "비가 오지만 공원에 가요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "subject-i-ga",
        "but-jiman",
        "location-e",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-travel-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s2095": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “Kimchi is spicy, but delicious”.",
      "canonicalTargetKey": "김치는 맵지만 맛있어요.",
      "acceptedAnswers": [
        "김치는 맵지만 맛있어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "but-jiman",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn8-feelings-u8-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s2096": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I went to bed late yesterday, but I got up early today”.",
      "canonicalTargetKey": "어제 늦게 잤지만 오늘 일찍 일어났어요.",
      "acceptedAnswers": [
        "어제 늦게 잤지만 오늘 일찍 일어났어요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "but-jiman",
        "past-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l6"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [
        "connective-clause-continuation"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — connective-clause-continuation."
    },
    "s2097": {
      "typedClass": "canonical",
      "examPromptEn": "Contrasting today with other days, tell a classmate in ordinary polite Korean that you cannot practise today. Use 못 for the inability.",
      "canonicalTargetKey": "오늘은 연습을 못 해요.",
      "acceptedAnswers": [
        "오늘은 연습을 못 해요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "neg-mot",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-actions-u3-l4"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2098": {
      "typedClass": "canonical",
      "examPromptEn": "Contrasting mornings with later times, tell a classmate in ordinary polite Korean that you cannot drink coffee in the morning. Use 못 for the inability.",
      "canonicalTargetKey": "아침에는 커피를 못 마셔요.",
      "acceptedAnswers": [
        "아침에는 커피를 못 마셔요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "neg-mot",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn4-food-u2-l3"
      ],
      "minimumSectionOrder": 4,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2099": {
      "typedClass": "canonical",
      "examPromptEn": "Contrasting today with other days, tell a classmate in ordinary polite Korean that you cannot go to the performance today. Use 못 for the inability.",
      "canonicalTargetKey": "오늘은 공연에 못 가요.",
      "acceptedAnswers": [
        "오늘은 공연에 못 가요."
      ],
      "eligibleModes": [
        "translate-type",
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "location-e",
        "neg-mot",
        "present-polite",
        "time-expression"
      ],
      "supportingLessonIds": [
        "sn8-travel-u7-l4"
      ],
      "minimumSectionOrder": 8,
      "exclusionReasons": [],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act."
    },
    "s2100": {
      "typedClass": "excluded",
      "examPromptEn": "Recognize the lesson sentence that means “I can't dance very well”.",
      "canonicalTargetKey": "저는 춤을 잘 못 춰요.",
      "acceptedAnswers": [
        "저는 춤을 잘 못 춰요."
      ],
      "eligibleModes": [
        "sentence-recognition"
      ],
      "primaryCompetencies": [
        "topic-neun",
        "object-eul-reul",
        "neg-mot",
        "present-polite"
      ],
      "supportingLessonIds": [
        "sn7-actions-u6-l1"
      ],
      "minimumSectionOrder": 7,
      "exclusionReasons": [
        "lexical-or-information-structure-ambiguity"
      ],
      "reviewStatus": "approved",
      "reviewedAt": "2026-07-25T22:20:00Z",
      "reviewerNote": "Independent reviewer correction: excluded from exact-match typed production — lexical-or-information-structure-ambiguity."
    }
  }
};
})();
