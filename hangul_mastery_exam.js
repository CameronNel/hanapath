// hangul_mastery_exam.js — Hangul Mastery Examination question bank (v2).
// Plain browser global; must load before app.js. Generated verbatim from
// docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md §6 — edit the spec, not this file,
// and keep scripts/audit-hangul-mastery-exam.mjs passing after any change.
//
// Section shapes:
//   mcq  { id, stage, type, promptKo, promptEn, stimulus, audioText, options[6], answer }
//   type { id, stage, type, promptKo, promptEn, audioText, answer, normalization }
//   draw { id, stage, type, promptKo, promptEn, audioText, target, requireExactGlyph, requireGreatVerdict }
// draw targets are implementation data only — never render them to the candidate.
window.HANGUL_MASTERY_EXAM = {
  "id": "hangul-mastery-v2",
  "version": 2,
  "requiredCorrect": 200,
  "optionCount": 6,
  "referenceAllowed": false,
  "feedbackDuringExam": false,
  "timeLimitMinutes": 90,
  "audioPlayLimit": 2,
  "sections": [
    {
      "part": 1,
      "id": "part-1",
      "type": "mcq",
      "titleKo": "자모 식별",
      "titleEn": "All-jamo identification",
      "instructionKo": "다음을 듣고 알맞은 것을 고르십시오.",
      "instructionEn": "Listen and choose the correct answer.",
      "items": [
        {
          "id": "P1-V01",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound a?",
          "stimulus": "Sound cue: a",
          "audioText": "아",
          "options": [
            "ㅏ",
            "ㅓ",
            "ㅑ",
            "ㅕ",
            "ㅐ",
            "ㅔ"
          ],
          "answer": "ㅏ"
        },
        {
          "id": "P1-V02",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound ya?",
          "stimulus": "Sound cue: ya",
          "audioText": "야",
          "options": [
            "ㅑ",
            "ㅏ",
            "ㅕ",
            "ㅒ",
            "ㅛ",
            "ㅠ"
          ],
          "answer": "ㅑ"
        },
        {
          "id": "P1-V03",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound eo?",
          "stimulus": "Sound cue: eo",
          "audioText": "어",
          "options": [
            "ㅓ",
            "ㅏ",
            "ㅕ",
            "ㅗ",
            "ㅜ",
            "ㅔ"
          ],
          "answer": "ㅓ"
        },
        {
          "id": "P1-V04",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound yeo?",
          "stimulus": "Sound cue: yeo",
          "audioText": "여",
          "options": [
            "ㅕ",
            "ㅓ",
            "ㅑ",
            "ㅖ",
            "ㅛ",
            "ㅠ"
          ],
          "answer": "ㅕ"
        },
        {
          "id": "P1-V05",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound o?",
          "stimulus": "Sound cue: o",
          "audioText": "오",
          "options": [
            "ㅗ",
            "ㅜ",
            "ㅛ",
            "ㅠ",
            "ㅡ",
            "ㅘ"
          ],
          "answer": "ㅗ"
        },
        {
          "id": "P1-V06",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound yo?",
          "stimulus": "Sound cue: yo",
          "audioText": "요",
          "options": [
            "ㅛ",
            "ㅗ",
            "ㅠ",
            "ㅑ",
            "ㅕ",
            "ㅜ"
          ],
          "answer": "ㅛ"
        },
        {
          "id": "P1-V07",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound u?",
          "stimulus": "Sound cue: u",
          "audioText": "우",
          "options": [
            "ㅜ",
            "ㅗ",
            "ㅠ",
            "ㅛ",
            "ㅡ",
            "ㅝ"
          ],
          "answer": "ㅜ"
        },
        {
          "id": "P1-V08",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound yu?",
          "stimulus": "Sound cue: yu",
          "audioText": "유",
          "options": [
            "ㅠ",
            "ㅜ",
            "ㅛ",
            "ㅑ",
            "ㅕ",
            "ㅣ"
          ],
          "answer": "ㅠ"
        },
        {
          "id": "P1-V09",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound eu?",
          "stimulus": "Sound cue: eu",
          "audioText": "으",
          "options": [
            "ㅡ",
            "ㅣ",
            "ㅜ",
            "ㅗ",
            "ㅢ",
            "ㅓ"
          ],
          "answer": "ㅡ"
        },
        {
          "id": "P1-V10",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound i / ee?",
          "stimulus": "Sound cue: i / ee",
          "audioText": "이",
          "options": [
            "ㅣ",
            "ㅡ",
            "ㅟ",
            "ㅢ",
            "ㅔ",
            "ㅐ"
          ],
          "answer": "ㅣ"
        },
        {
          "id": "P1-V11",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound ae?",
          "stimulus": "Sound cue: ae",
          "audioText": "애",
          "options": [
            "ㅐ",
            "ㅔ",
            "ㅒ",
            "ㅖ",
            "ㅏ",
            "ㅣ"
          ],
          "answer": "ㅐ"
        },
        {
          "id": "P1-V12",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound yae?",
          "stimulus": "Sound cue: yae",
          "audioText": "얘",
          "options": [
            "ㅒ",
            "ㅖ",
            "ㅐ",
            "ㅔ",
            "ㅑ",
            "ㅕ"
          ],
          "answer": "ㅒ"
        },
        {
          "id": "P1-V13",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound e?",
          "stimulus": "Sound cue: e",
          "audioText": "에",
          "options": [
            "ㅔ",
            "ㅐ",
            "ㅖ",
            "ㅒ",
            "ㅓ",
            "ㅣ"
          ],
          "answer": "ㅔ"
        },
        {
          "id": "P1-V14",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound ye?",
          "stimulus": "Sound cue: ye",
          "audioText": "예",
          "options": [
            "ㅖ",
            "ㅒ",
            "ㅔ",
            "ㅐ",
            "ㅕ",
            "ㅑ"
          ],
          "answer": "ㅖ"
        },
        {
          "id": "P1-V15",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound wa?",
          "stimulus": "Sound cue: wa",
          "audioText": "와",
          "options": [
            "ㅘ",
            "ㅙ",
            "ㅚ",
            "ㅝ",
            "ㅞ",
            "ㅟ"
          ],
          "answer": "ㅘ"
        },
        {
          "id": "P1-V16",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound wae?",
          "stimulus": "Sound cue: wae",
          "audioText": "왜",
          "options": [
            "ㅙ",
            "ㅘ",
            "ㅚ",
            "ㅞ",
            "ㅔ",
            "ㅐ"
          ],
          "answer": "ㅙ"
        },
        {
          "id": "P1-V17",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound oe?",
          "stimulus": "Sound cue: oe",
          "audioText": "외",
          "options": [
            "ㅚ",
            "ㅙ",
            "ㅟ",
            "ㅞ",
            "ㅘ",
            "ㅣ"
          ],
          "answer": "ㅚ"
        },
        {
          "id": "P1-V18",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound wo?",
          "stimulus": "Sound cue: wo",
          "audioText": "워",
          "options": [
            "ㅝ",
            "ㅞ",
            "ㅟ",
            "ㅘ",
            "ㅙ",
            "ㅜ"
          ],
          "answer": "ㅝ"
        },
        {
          "id": "P1-V19",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound we?",
          "stimulus": "Sound cue: we",
          "audioText": "웨",
          "options": [
            "ㅞ",
            "ㅝ",
            "ㅙ",
            "ㅚ",
            "ㅟ",
            "ㅔ"
          ],
          "answer": "ㅞ"
        },
        {
          "id": "P1-V20",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound wi?",
          "stimulus": "Sound cue: wi",
          "audioText": "위",
          "options": [
            "ㅟ",
            "ㅚ",
            "ㅞ",
            "ㅢ",
            "ㅣ",
            "ㅜ"
          ],
          "answer": "ㅟ"
        },
        {
          "id": "P1-V21",
          "stage": "Stage 01/04",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Which Hangul vowel represents the sound ui?",
          "stimulus": "Sound cue: ui",
          "audioText": "의",
          "options": [
            "ㅢ",
            "ㅟ",
            "ㅡ",
            "ㅣ",
            "ㅚ",
            "ㅔ"
          ],
          "answer": "ㅢ"
        },
        {
          "id": "P1-C01",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "가",
          "options": [
            "ㄱ",
            "ㅋ",
            "ㄲ",
            "ㄴ",
            "ㄷ",
            "ㅂ"
          ],
          "answer": "ㄱ"
        },
        {
          "id": "P1-C02",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "나",
          "options": [
            "ㄴ",
            "ㄹ",
            "ㄷ",
            "ㅁ",
            "ㅇ",
            "ㄱ"
          ],
          "answer": "ㄴ"
        },
        {
          "id": "P1-C03",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "다",
          "options": [
            "ㄷ",
            "ㅌ",
            "ㄸ",
            "ㄴ",
            "ㄱ",
            "ㅂ"
          ],
          "answer": "ㄷ"
        },
        {
          "id": "P1-C04",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "라",
          "options": [
            "ㄹ",
            "ㄴ",
            "ㅁ",
            "ㄷ",
            "ㅇ",
            "ㅎ"
          ],
          "answer": "ㄹ"
        },
        {
          "id": "P1-C05",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "마",
          "options": [
            "ㅁ",
            "ㅂ",
            "ㄴ",
            "ㅇ",
            "ㄹ",
            "ㅍ"
          ],
          "answer": "ㅁ"
        },
        {
          "id": "P1-C06",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "바",
          "options": [
            "ㅂ",
            "ㅍ",
            "ㅃ",
            "ㅁ",
            "ㄷ",
            "ㅈ"
          ],
          "answer": "ㅂ"
        },
        {
          "id": "P1-C07",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "사",
          "options": [
            "ㅅ",
            "ㅆ",
            "ㅈ",
            "ㅊ",
            "ㅎ",
            "ㄴ"
          ],
          "answer": "ㅅ"
        },
        {
          "id": "P1-C08",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the vowel-initial syllable and choose the silent initial placeholder.",
          "stimulus": null,
          "audioText": "아",
          "options": [
            "ㅇ",
            "ㅎ",
            "ㅁ",
            "ㄴ",
            "ㄱ",
            "ㅅ"
          ],
          "answer": "ㅇ"
        },
        {
          "id": "P1-C09",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "자",
          "options": [
            "ㅈ",
            "ㅊ",
            "ㅉ",
            "ㅅ",
            "ㄷ",
            "ㄱ"
          ],
          "answer": "ㅈ"
        },
        {
          "id": "P1-C10",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "차",
          "options": [
            "ㅊ",
            "ㅈ",
            "ㅉ",
            "ㅋ",
            "ㅌ",
            "ㅎ"
          ],
          "answer": "ㅊ"
        },
        {
          "id": "P1-C11",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "카",
          "options": [
            "ㅋ",
            "ㄱ",
            "ㄲ",
            "ㅌ",
            "ㅍ",
            "ㅊ"
          ],
          "answer": "ㅋ"
        },
        {
          "id": "P1-C12",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "타",
          "options": [
            "ㅌ",
            "ㄷ",
            "ㄸ",
            "ㅋ",
            "ㅍ",
            "ㅊ"
          ],
          "answer": "ㅌ"
        },
        {
          "id": "P1-C13",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "파",
          "options": [
            "ㅍ",
            "ㅂ",
            "ㅃ",
            "ㅋ",
            "ㅌ",
            "ㅁ"
          ],
          "answer": "ㅍ"
        },
        {
          "id": "P1-C14",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "하",
          "options": [
            "ㅎ",
            "ㅇ",
            "ㅊ",
            "ㅅ",
            "ㅋ",
            "ㅍ"
          ],
          "answer": "ㅎ"
        },
        {
          "id": "P1-C15",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "까",
          "options": [
            "ㄲ",
            "ㄱ",
            "ㅋ",
            "ㄸ",
            "ㅃ",
            "ㅆ"
          ],
          "answer": "ㄲ"
        },
        {
          "id": "P1-C16",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "따",
          "options": [
            "ㄸ",
            "ㄷ",
            "ㅌ",
            "ㄲ",
            "ㅃ",
            "ㅉ"
          ],
          "answer": "ㄸ"
        },
        {
          "id": "P1-C17",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "빠",
          "options": [
            "ㅃ",
            "ㅂ",
            "ㅍ",
            "ㄲ",
            "ㄸ",
            "ㅉ"
          ],
          "answer": "ㅃ"
        },
        {
          "id": "P1-C18",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "싸",
          "options": [
            "ㅆ",
            "ㅅ",
            "ㅉ",
            "ㄲ",
            "ㅎ",
            "ㅈ"
          ],
          "answer": "ㅆ"
        },
        {
          "id": "P1-C19",
          "stage": "Stage 02/05",
          "type": "mcq",
          "promptKo": "다음을 듣고 알맞은 것을 고르십시오.",
          "promptEn": "Listen to the syllable and choose its initial consonant.",
          "stimulus": null,
          "audioText": "짜",
          "options": [
            "ㅉ",
            "ㅈ",
            "ㅊ",
            "ㅆ",
            "ㄸ",
            "ㅃ"
          ],
          "answer": "ㅉ"
        }
      ]
    },
    {
      "part": 2,
      "id": "part-2",
      "type": "mcq",
      "titleKo": "대조와 자모 관계",
      "titleEn": "Contrast families and vowel relationships",
      "instructionKo": "알맞은 것을 고르십시오.",
      "instructionEn": "Choose the correct answer.",
      "items": [
        {
          "id": "P2-01",
          "stage": "Stage 05",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which row is ordered plain → aspirated → tense for the ㄱ family?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄱ → ㅋ → ㄲ",
            "ㄱ → ㄲ → ㅋ",
            "ㅋ → ㄱ → ㄲ",
            "ㄲ → ㅋ → ㄱ",
            "ㄷ → ㅌ → ㄸ",
            "ㅂ → ㅍ → ㅃ"
          ],
          "answer": "ㄱ → ㅋ → ㄲ"
        },
        {
          "id": "P2-02",
          "stage": "Stage 05",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which row is ordered plain → aspirated → tense for the ㄷ family?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄷ → ㅌ → ㄸ",
            "ㄷ → ㄸ → ㅌ",
            "ㅌ → ㄷ → ㄸ",
            "ㄸ → ㅌ → ㄷ",
            "ㄱ → ㅋ → ㄲ",
            "ㅈ → ㅊ → ㅉ"
          ],
          "answer": "ㄷ → ㅌ → ㄸ"
        },
        {
          "id": "P2-03",
          "stage": "Stage 05",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which row is ordered plain → aspirated → tense for the ㅂ family?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅂ → ㅍ → ㅃ",
            "ㅂ → ㅃ → ㅍ",
            "ㅍ → ㅂ → ㅃ",
            "ㅃ → ㅍ → ㅂ",
            "ㄷ → ㅌ → ㄸ",
            "ㅈ → ㅊ → ㅉ"
          ],
          "answer": "ㅂ → ㅍ → ㅃ"
        },
        {
          "id": "P2-04",
          "stage": "Stage 05",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which row is ordered plain → aspirated → tense for the ㅈ family?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅈ → ㅊ → ㅉ",
            "ㅈ → ㅉ → ㅊ",
            "ㅊ → ㅈ → ㅉ",
            "ㅉ → ㅊ → ㅈ",
            "ㄱ → ㅋ → ㄲ",
            "ㅂ → ㅍ → ㅃ"
          ],
          "answer": "ㅈ → ㅊ → ㅉ"
        },
        {
          "id": "P2-05",
          "stage": "Stage 05",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which pair is the plain/tense ㅅ family?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅅ / ㅆ",
            "ㅅ / ㅈ",
            "ㅈ / ㅉ",
            "ㄷ / ㄸ",
            "ㅂ / ㅃ",
            "ㄱ / ㄲ"
          ],
          "answer": "ㅅ / ㅆ"
        },
        {
          "id": "P2-06",
          "stage": "Stage 05",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which syllable begins with an aspirated k sound?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "카",
            "가",
            "까",
            "타",
            "파",
            "차"
          ],
          "answer": "카"
        },
        {
          "id": "P2-07",
          "stage": "Stage 05",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which syllable begins with a tense tt sound?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "따",
            "다",
            "타",
            "짜",
            "빠",
            "까"
          ],
          "answer": "따"
        },
        {
          "id": "P2-08",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which vowel is the y-version of ㅏ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅑ",
            "ㅕ",
            "ㅛ",
            "ㅠ",
            "ㅒ",
            "ㅖ"
          ],
          "answer": "ㅑ"
        },
        {
          "id": "P2-09",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which vowel is the y-version of ㅓ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅕ",
            "ㅑ",
            "ㅛ",
            "ㅠ",
            "ㅖ",
            "ㅒ"
          ],
          "answer": "ㅕ"
        },
        {
          "id": "P2-10",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which vowel is the y-version of ㅗ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅛ",
            "ㅠ",
            "ㅑ",
            "ㅕ",
            "ㅘ",
            "ㅚ"
          ],
          "answer": "ㅛ"
        },
        {
          "id": "P2-11",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which vowel is the y-version of ㅜ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅠ",
            "ㅛ",
            "ㅑ",
            "ㅕ",
            "ㅝ",
            "ㅟ"
          ],
          "answer": "ㅠ"
        },
        {
          "id": "P2-12",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which compound vowel is built from ㅗ + ㅏ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅘ",
            "ㅙ",
            "ㅚ",
            "ㅝ",
            "ㅞ",
            "ㅟ"
          ],
          "answer": "ㅘ"
        },
        {
          "id": "P2-13",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which compound vowel is built from ㅗ + ㅐ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅙ",
            "ㅘ",
            "ㅚ",
            "ㅞ",
            "ㅐ",
            "ㅔ"
          ],
          "answer": "ㅙ"
        },
        {
          "id": "P2-14",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which compound vowel is built from ㅗ + ㅣ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅚ",
            "ㅙ",
            "ㅟ",
            "ㅞ",
            "ㅘ",
            "ㅢ"
          ],
          "answer": "ㅚ"
        },
        {
          "id": "P2-15",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which compound vowel is built from ㅜ + ㅓ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅝ",
            "ㅞ",
            "ㅟ",
            "ㅘ",
            "ㅙ",
            "ㅚ"
          ],
          "answer": "ㅝ"
        },
        {
          "id": "P2-16",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which compound vowel is built from ㅜ + ㅔ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅞ",
            "ㅝ",
            "ㅟ",
            "ㅙ",
            "ㅚ",
            "ㅔ"
          ],
          "answer": "ㅞ"
        },
        {
          "id": "P2-17",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which compound vowel is built from ㅜ + ㅣ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅟ",
            "ㅚ",
            "ㅞ",
            "ㅢ",
            "ㅝ",
            "ㅣ"
          ],
          "answer": "ㅟ"
        },
        {
          "id": "P2-18",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which compound vowel is built from ㅡ + ㅣ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅢ",
            "ㅟ",
            "ㅚ",
            "ㅞ",
            "ㅡ",
            "ㅣ"
          ],
          "answer": "ㅢ"
        },
        {
          "id": "P2-19",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which answer correctly distinguishes the shapes ㅐ and ㅔ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅐ uses ㅏ+ㅣ; ㅔ uses ㅓ+ㅣ",
            "ㅐ uses ㅓ+ㅣ; ㅔ uses ㅏ+ㅣ",
            "Both are ㅏ+ㅣ",
            "Both are ㅓ+ㅣ",
            "ㅐ is ㅗ+ㅣ; ㅔ is ㅜ+ㅣ",
            "ㅐ is ㅡ+ㅣ; ㅔ is ㅜ+ㅓ"
          ],
          "answer": "ㅐ uses ㅏ+ㅣ; ㅔ uses ㅓ+ㅣ"
        },
        {
          "id": "P2-20",
          "stage": "Stage 04",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which answer correctly distinguishes the y-vowels ㅒ and ㅖ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅒ is based on ㅐ; ㅖ is based on ㅔ",
            "ㅒ is based on ㅔ; ㅖ is based on ㅐ",
            "Both are based on ㅏ",
            "Both are based on ㅓ",
            "ㅒ is ㅛ+ㅣ; ㅖ is ㅠ+ㅣ",
            "ㅒ is ㅘ; ㅖ is ㅝ"
          ],
          "answer": "ㅒ is based on ㅐ; ㅖ is based on ㅔ"
        }
      ]
    },
    {
      "part": 3,
      "id": "part-3",
      "type": "mcq",
      "titleKo": "글자 짜임",
      "titleEn": "Block geometry and composition",
      "instructionKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
      "instructionEn": "Choose the correct answer about block composition.",
      "items": [
        {
          "id": "P3-01",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Where does a vertical vowel such as ㅏ sit in a CV block?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "To the right of the consonant",
            "Below the consonant",
            "Above the consonant",
            "Inside the consonant",
            "Under a batchim",
            "Outside the block"
          ],
          "answer": "To the right of the consonant"
        },
        {
          "id": "P3-02",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Where does a horizontal vowel such as ㅗ sit in a CV block?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "Below the consonant",
            "To the right of the consonant",
            "Above the consonant",
            "Inside the consonant",
            "Under a batchim",
            "Outside the block"
          ],
          "answer": "Below the consonant"
        },
        {
          "id": "P3-03",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "What fills the initial consonant seat when a syllable begins with a vowel?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅇ",
            "ㅎ",
            "ㅁ",
            "ㄴ",
            "ㄱ",
            "ㅅ"
          ],
          "answer": "ㅇ"
        },
        {
          "id": "P3-04",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Which block is built from ㄱ + ㅏ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "가",
            "거",
            "고",
            "구",
            "까",
            "카"
          ],
          "answer": "가"
        },
        {
          "id": "P3-05",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Which block is built from ㄴ + ㅗ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "노",
            "누",
            "너",
            "나",
            "로",
            "도"
          ],
          "answer": "노"
        },
        {
          "id": "P3-06",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Which block is built from ㅁ + ㅜ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "무",
            "모",
            "머",
            "마",
            "부",
            "누"
          ],
          "answer": "무"
        },
        {
          "id": "P3-07",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Which block is built from ㅂ + ㅓ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "버",
            "바",
            "보",
            "부",
            "퍼",
            "머"
          ],
          "answer": "버"
        },
        {
          "id": "P3-08",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Which block is built from ㅈ + ㅣ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "지",
            "자",
            "저",
            "주",
            "치",
            "찌"
          ],
          "answer": "지"
        },
        {
          "id": "P3-09",
          "stage": "Stage 03/05",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Which block is built from ㄲ + ㅘ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "꽈",
            "과",
            "콰",
            "꿔",
            "까",
            "꼬"
          ],
          "answer": "꽈"
        },
        {
          "id": "P3-10",
          "stage": "Stage 03/04",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Which block is built from ㅇ + ㅢ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "의",
            "이",
            "으",
            "위",
            "외",
            "웨"
          ],
          "answer": "의"
        },
        {
          "id": "P3-11",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "How does 마 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅁ + ㅏ",
            "ㅂ + ㅏ",
            "ㅁ + ㅓ",
            "ㄴ + ㅏ",
            "ㅁ + ㅗ",
            "ㅁ + ㅏ + ㄴ"
          ],
          "answer": "ㅁ + ㅏ"
        },
        {
          "id": "P3-12",
          "stage": "Stage 03",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "How does 모 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅁ + ㅗ",
            "ㅁ + ㅜ",
            "ㅂ + ㅗ",
            "ㅁ + ㅓ",
            "ㄴ + ㅗ",
            "ㅁ + ㅗ + ㄴ"
          ],
          "answer": "ㅁ + ㅗ"
        },
        {
          "id": "P3-13",
          "stage": "Stage 03/06",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "How does 한 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅎ + ㅏ + ㄴ",
            "ㅎ + ㅓ + ㄴ",
            "ㅇ + ㅏ + ㄴ",
            "ㅎ + ㅏ + ㅇ",
            "ㄱ + ㅏ + ㄴ",
            "ㅎ + ㅏ"
          ],
          "answer": "ㅎ + ㅏ + ㄴ"
        },
        {
          "id": "P3-14",
          "stage": "Stage 03/06",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "How does 글 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄱ + ㅡ + ㄹ",
            "ㄱ + ㅜ + ㄹ",
            "ㅋ + ㅡ + ㄹ",
            "ㄱ + ㅣ + ㄹ",
            "ㄱ + ㅡ + ㄴ",
            "ㄱ + ㅡ"
          ],
          "answer": "ㄱ + ㅡ + ㄹ"
        },
        {
          "id": "P3-15",
          "stage": "Stage 03/06",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "How does 밤 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅂ + ㅏ + ㅁ",
            "ㅂ + ㅓ + ㅁ",
            "ㅃ + ㅏ + ㅁ",
            "ㅂ + ㅏ + ㅂ",
            "ㅁ + ㅏ + ㅁ",
            "ㅂ + ㅏ"
          ],
          "answer": "ㅂ + ㅏ + ㅁ"
        },
        {
          "id": "P3-16",
          "stage": "Stage 03/06",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "How does 공 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄱ + ㅗ + ㅇ",
            "ㄱ + ㅜ + ㅇ",
            "ㅋ + ㅗ + ㅇ",
            "ㄱ + ㅗ + ㄴ",
            "ㅇ + ㅗ + ㅇ",
            "ㄱ + ㅗ"
          ],
          "answer": "ㄱ + ㅗ + ㅇ"
        },
        {
          "id": "P3-17",
          "stage": "Stage 03/06",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "Where is the batchim placed in a closed syllable block?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "Along the bottom",
            "At the top",
            "To the right of the vowel",
            "To the left of the onset",
            "Outside the block",
            "Between onset and vowel"
          ],
          "answer": "Along the bottom"
        },
        {
          "id": "P3-18",
          "stage": "Stage 03/07",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "What is the onset of 집?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅈ",
            "ㅣ",
            "ㅂ",
            "ㅉ",
            "ㅊ",
            "ㅅ"
          ],
          "answer": "ㅈ"
        },
        {
          "id": "P3-19",
          "stage": "Stage 03/07",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "What is the medial vowel of 물?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅜ",
            "ㅡ",
            "ㅗ",
            "ㅓ",
            "ㅠ",
            "ㅣ"
          ],
          "answer": "ㅜ"
        },
        {
          "id": "P3-20",
          "stage": "Stage 03/07",
          "type": "mcq",
          "promptKo": "주어진 자모를 바르게 모아 쓴 것을 고르십시오.",
          "promptEn": "What is the final consonant of 문?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄴ",
            "ㅁ",
            "ㅇ",
            "ㄹ",
            "ㅂ",
            "No final"
          ],
          "answer": "ㄴ"
        }
      ]
    },
    {
      "part": 4,
      "id": "part-4",
      "type": "mcq",
      "titleKo": "받침",
      "titleEn": "Final consonants",
      "instructionKo": "알맞은 것을 고르십시오.",
      "instructionEn": "Choose the correct answer about final consonants.",
      "items": [
        {
          "id": "P4-01",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which list contains the seven basic batchim end sounds?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "k, n, t, l, m, p, ng",
            "g, d, b, j, ch, h, s",
            "a, eo, o, u, eu, i, e",
            "k, r, s, h, y, w, ng",
            "n, r, m, s, j, ch, h",
            "k, n, d, r, b, g, h"
          ],
          "answer": "k, n, t, l, m, p, ng"
        },
        {
          "id": "P4-02",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "What basic end sound does final ㄱ make?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "k",
            "n",
            "t",
            "l",
            "m",
            "ng"
          ],
          "answer": "k"
        },
        {
          "id": "P4-03",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "What basic end sound does final ㄴ make?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "n",
            "k",
            "t",
            "l",
            "m",
            "ng"
          ],
          "answer": "n"
        },
        {
          "id": "P4-04",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "What basic end sound does final ㄷ make?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "t",
            "k",
            "n",
            "l",
            "p",
            "ng"
          ],
          "answer": "t"
        },
        {
          "id": "P4-05",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "What basic end sound does final ㄹ make?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "l",
            "n",
            "t",
            "m",
            "p",
            "ng"
          ],
          "answer": "l"
        },
        {
          "id": "P4-06",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "What basic end sound does final ㅁ make?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "m",
            "n",
            "l",
            "p",
            "k",
            "ng"
          ],
          "answer": "m"
        },
        {
          "id": "P4-07",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "What basic end sound does final ㅂ make?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "p",
            "m",
            "t",
            "k",
            "n",
            "ng"
          ],
          "answer": "p"
        },
        {
          "id": "P4-08",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "What basic end sound does final ㅇ make?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ng",
            "n",
            "m",
            "k",
            "t",
            "p"
          ],
          "answer": "ng"
        },
        {
          "id": "P4-09",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which written finals collapse to the same k end sound?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄱ, ㄲ, ㅋ",
            "ㄷ, ㅅ, ㅈ",
            "ㅂ, ㅍ, ㅃ",
            "ㄴ, ㄹ, ㅁ",
            "ㅇ, ㅎ, ㅊ",
            "ㄱ, ㄴ, ㄷ"
          ],
          "answer": "ㄱ, ㄲ, ㅋ"
        },
        {
          "id": "P4-10",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which set belongs to the common t-sound final group?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ",
            "ㄱ, ㄲ, ㅋ",
            "ㅂ, ㅍ",
            "ㄴ, ㄹ, ㅁ",
            "ㅇ only",
            "ㄷ, ㄴ, ㄹ"
          ],
          "answer": "ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ"
        },
        {
          "id": "P4-11",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which written final joins ㅂ in the basic p end-sound group?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅍ",
            "ㅃ",
            "ㅁ",
            "ㅌ",
            "ㅋ",
            "ㅎ"
          ],
          "answer": "ㅍ"
        },
        {
          "id": "P4-12",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which consonant is the batchim in 악?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄱ",
            "ㅇ",
            "ㅏ",
            "ㅋ",
            "ㄴ",
            "No final"
          ],
          "answer": "ㄱ"
        },
        {
          "id": "P4-13",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which consonant is the batchim in 안?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄴ",
            "ㅇ",
            "ㅏ",
            "ㅁ",
            "ㄹ",
            "No final"
          ],
          "answer": "ㄴ"
        },
        {
          "id": "P4-14",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which consonant is written as the batchim in 옷?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅅ",
            "ㅇ",
            "ㅗ",
            "ㄷ",
            "ㅈ",
            "No final"
          ],
          "answer": "ㅅ"
        },
        {
          "id": "P4-15",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which consonant is the batchim in 달?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄹ",
            "ㄷ",
            "ㅏ",
            "ㄴ",
            "ㅁ",
            "No final"
          ],
          "answer": "ㄹ"
        },
        {
          "id": "P4-16",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which consonant is the batchim in 밤?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅁ",
            "ㅂ",
            "ㅏ",
            "ㄴ",
            "ㅇ",
            "No final"
          ],
          "answer": "ㅁ"
        },
        {
          "id": "P4-17",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which consonant is the batchim in 밥?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅂ",
            "ㅃ",
            "ㅏ",
            "ㅁ",
            "ㅍ",
            "No final"
          ],
          "answer": "ㅂ"
        },
        {
          "id": "P4-18",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which consonant is the batchim in 공?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅇ",
            "ㄱ",
            "ㅗ",
            "ㄴ",
            "ㅁ",
            "No final"
          ],
          "answer": "ㅇ"
        },
        {
          "id": "P4-19",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which block has final ㄴ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "한",
            "하",
            "함",
            "항",
            "할",
            "핫"
          ],
          "answer": "한"
        },
        {
          "id": "P4-20",
          "stage": "Stage 06",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which block is open and has no batchim?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "가",
            "각",
            "간",
            "갈",
            "감",
            "강"
          ],
          "answer": "가"
        }
      ]
    },
    {
      "part": 5,
      "id": "part-5",
      "type": "mcq",
      "titleKo": "낱말 읽기",
      "titleEn": "Real-word decoding",
      "instructionKo": "알맞은 것을 고르십시오.",
      "instructionEn": "Choose the correct word.",
      "items": [
        {
          "id": "P5-01",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅇ+ㅏ / ㄱ+ㅣ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "아기",
            "오이",
            "우유",
            "고기",
            "아니",
            "여기"
          ],
          "answer": "아기"
        },
        {
          "id": "P5-02",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅇ+ㅗ / ㅇ+ㅣ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "오이",
            "아이",
            "우유",
            "오리",
            "이유",
            "여우"
          ],
          "answer": "오이"
        },
        {
          "id": "P5-03",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅇ+ㅜ / ㅇ+ㅠ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "우유",
            "오이",
            "이유",
            "여우",
            "아이",
            "우비"
          ],
          "answer": "우유"
        },
        {
          "id": "P5-04",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㄴ+ㅏ / ㅁ+ㅜ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "나무",
            "나라",
            "나비",
            "마음",
            "너무",
            "나물"
          ],
          "answer": "나무"
        },
        {
          "id": "P5-05",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅂ+ㅏ / ㄷ+ㅏ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "바다",
            "보다",
            "바지",
            "마다",
            "파다",
            "바닥"
          ],
          "answer": "바다"
        },
        {
          "id": "P5-06",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅁ+ㅗ / ㅈ+ㅏ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "모자",
            "모두",
            "마자",
            "보자",
            "모기",
            "무지"
          ],
          "answer": "모자"
        },
        {
          "id": "P5-07",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅅ+ㅏ / ㄹ+ㅏ+ㅁ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "사람",
            "사랑",
            "바람",
            "나라",
            "사슴",
            "살다"
          ],
          "answer": "사람"
        },
        {
          "id": "P5-08",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㄴ+ㅏ / ㄹ+ㅏ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "나라",
            "나무",
            "바다",
            "사라",
            "노래",
            "머리"
          ],
          "answer": "나라"
        },
        {
          "id": "P5-09",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅁ+ㅓ / ㄹ+ㅣ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "머리",
            "미리",
            "마리",
            "거리",
            "허리",
            "무리"
          ],
          "answer": "머리"
        },
        {
          "id": "P5-10",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㄱ+ㅗ / ㄱ+ㅣ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "고기",
            "거기",
            "아기",
            "모기",
            "고리",
            "구기"
          ],
          "answer": "고기"
        },
        {
          "id": "P5-11",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅎ+ㅏ / ㅁ+ㅏ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "하마",
            "하나",
            "마마",
            "하루",
            "호마",
            "하늘"
          ],
          "answer": "하마"
        },
        {
          "id": "P5-12",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅅ+ㅏ / ㄱ+ㅘ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "사과",
            "사고",
            "과자",
            "가사",
            "사자",
            "소과"
          ],
          "answer": "사과"
        },
        {
          "id": "P5-13",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅎ+ㅏ+ㄴ / ㄱ+ㅜ+ㄱ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "한국",
            "한글",
            "한강",
            "중국",
            "한국어",
            "하국"
          ],
          "answer": "한국"
        },
        {
          "id": "P5-14",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word is built from ㅎ+ㅏ+ㄴ / ㄱ+ㅡ+ㄹ?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "한글",
            "한국",
            "한강",
            "하늘",
            "글자",
            "한굴"
          ],
          "answer": "한글"
        },
        {
          "id": "P5-15",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "How does 밤 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅂ+ㅏ+ㅁ",
            "ㅂ+ㅓ+ㅁ",
            "ㅃ+ㅏ+ㅁ",
            "ㅂ+ㅏ+ㅂ",
            "ㅁ+ㅏ+ㅁ",
            "ㅂ+ㅏ"
          ],
          "answer": "ㅂ+ㅏ+ㅁ"
        },
        {
          "id": "P5-16",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "How does 문 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅁ+ㅜ+ㄴ",
            "ㅁ+ㅡ+ㄴ",
            "ㅂ+ㅜ+ㄴ",
            "ㅁ+ㅜ+ㅇ",
            "ㅁ+ㅓ+ㄴ",
            "ㅁ+ㅜ"
          ],
          "answer": "ㅁ+ㅜ+ㄴ"
        },
        {
          "id": "P5-17",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "How does 집 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅈ+ㅣ+ㅂ",
            "ㅉ+ㅣ+ㅂ",
            "ㅈ+ㅏ+ㅂ",
            "ㅊ+ㅣ+ㅂ",
            "ㅈ+ㅣ+ㅍ",
            "ㅈ+ㅣ"
          ],
          "answer": "ㅈ+ㅣ+ㅂ"
        },
        {
          "id": "P5-18",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "How does 밥 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㅂ+ㅏ+ㅂ",
            "ㅃ+ㅏ+ㅂ",
            "ㅂ+ㅓ+ㅂ",
            "ㅂ+ㅏ+ㅍ",
            "ㅁ+ㅏ+ㅂ",
            "ㅂ+ㅏ"
          ],
          "answer": "ㅂ+ㅏ+ㅂ"
        },
        {
          "id": "P5-19",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "How does 공 split?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "ㄱ+ㅗ+ㅇ",
            "ㅋ+ㅗ+ㅇ",
            "ㄱ+ㅜ+ㅇ",
            "ㄱ+ㅗ+ㄴ",
            "ㅇ+ㅗ+ㅇ",
            "ㄱ+ㅗ"
          ],
          "answer": "ㄱ+ㅗ+ㅇ"
        },
        {
          "id": "P5-20",
          "stage": "Stage 07",
          "type": "mcq",
          "promptKo": "알맞은 것을 고르십시오.",
          "promptEn": "Which word contains two open syllables with no batchim?",
          "stimulus": null,
          "audioText": null,
          "options": [
            "바다",
            "한글",
            "한국",
            "사람",
            "공원",
            "밥"
          ],
          "answer": "바다"
        }
      ]
    },
    {
      "part": 6,
      "id": "part-6",
      "type": "type",
      "titleKo": "한글 입력",
      "titleEn": "Korean keyboard production",
      "instructionKo": "한국어 키보드로 정확히 입력하십시오.",
      "instructionEn": "Type it accurately with the Korean keyboard.",
      "items": [
        {
          "id": "P6-V01",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for a.",
          "audioText": "아",
          "answer": "아",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V02",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for ya.",
          "audioText": "야",
          "answer": "야",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V03",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for eo.",
          "audioText": "어",
          "answer": "어",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V04",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for yeo.",
          "audioText": "여",
          "answer": "여",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V05",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for o.",
          "audioText": "오",
          "answer": "오",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V06",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for yo.",
          "audioText": "요",
          "answer": "요",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V07",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for u.",
          "audioText": "우",
          "answer": "우",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V08",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for yu.",
          "audioText": "유",
          "answer": "유",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V09",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for eu.",
          "audioText": "으",
          "answer": "으",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V10",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for i / ee.",
          "audioText": "이",
          "answer": "이",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V11",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for ae.",
          "audioText": "애",
          "answer": "애",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V12",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for yae.",
          "audioText": "얘",
          "answer": "얘",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V13",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for e.",
          "audioText": "에",
          "answer": "에",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V14",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for ye.",
          "audioText": "예",
          "answer": "예",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V15",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for wa.",
          "audioText": "와",
          "answer": "와",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V16",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for wae.",
          "audioText": "왜",
          "answer": "왜",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V17",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for oe.",
          "audioText": "외",
          "answer": "외",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V18",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for wo.",
          "audioText": "워",
          "answer": "워",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V19",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for we.",
          "audioText": "웨",
          "answer": "웨",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V20",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for wi.",
          "audioText": "위",
          "answer": "위",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-V21",
          "stage": "Stage 01/04",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the vowel syllable for ui.",
          "audioText": "의",
          "answer": "의",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C01",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (g/k initial + ㅏ).",
          "audioText": "가",
          "answer": "가",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C02",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (n initial + ㅏ).",
          "audioText": "나",
          "answer": "나",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C03",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (d/t initial + ㅏ).",
          "audioText": "다",
          "answer": "다",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C04",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (r/l initial + ㅏ).",
          "audioText": "라",
          "answer": "라",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C05",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (m initial + ㅏ).",
          "audioText": "마",
          "answer": "마",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C06",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (b/p initial + ㅏ).",
          "audioText": "바",
          "answer": "바",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C07",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (s initial + ㅏ).",
          "audioText": "사",
          "answer": "사",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C08",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable made from silent initial ㅇ + ㅏ.",
          "audioText": "아",
          "answer": "아",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C09",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (j initial + ㅏ).",
          "audioText": "자",
          "answer": "자",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C10",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (ch initial + ㅏ).",
          "audioText": "차",
          "answer": "차",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C11",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (aspirated k initial + ㅏ).",
          "audioText": "카",
          "answer": "카",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C12",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (aspirated t initial + ㅏ).",
          "audioText": "타",
          "answer": "타",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C13",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (aspirated p initial + ㅏ).",
          "audioText": "파",
          "answer": "파",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C14",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (h initial + ㅏ).",
          "audioText": "하",
          "answer": "하",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C15",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (tense kk initial + ㅏ).",
          "audioText": "까",
          "answer": "까",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C16",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (tense tt initial + ㅏ).",
          "audioText": "따",
          "answer": "따",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C17",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (tense pp initial + ㅏ).",
          "audioText": "빠",
          "answer": "빠",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C18",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (tense ss initial + ㅏ).",
          "audioText": "싸",
          "answer": "싸",
          "normalization": "NFC_TRIM"
        },
        {
          "id": "P6-C19",
          "stage": "Stage 02/05",
          "type": "type",
          "promptKo": "한국어 키보드로 정확히 입력하십시오.",
          "promptEn": "Using the Korean keyboard, type the syllable heard in the audio (tense jj initial + ㅏ).",
          "audioText": "짜",
          "answer": "짜",
          "normalization": "NFC_TRIM"
        }
      ]
    },
    {
      "part": 7,
      "id": "part-7",
      "type": "draw",
      "titleKo": "글자 쓰기",
      "titleEn": "Handwriting from memory",
      "instructionKo": "제시된 소리에 맞는 글자를 쓰십시오.",
      "instructionEn": "Write the letter matching the sound.",
      "items": [
        {
          "id": "P7-V01",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents a.",
          "audioText": "아",
          "target": "ㅏ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V02",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents ya.",
          "audioText": "야",
          "target": "ㅑ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V03",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents eo.",
          "audioText": "어",
          "target": "ㅓ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V04",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents yeo.",
          "audioText": "여",
          "target": "ㅕ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V05",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents o.",
          "audioText": "오",
          "target": "ㅗ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V06",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents yo.",
          "audioText": "요",
          "target": "ㅛ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V07",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents u.",
          "audioText": "우",
          "target": "ㅜ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V08",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents yu.",
          "audioText": "유",
          "target": "ㅠ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V09",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents eu.",
          "audioText": "으",
          "target": "ㅡ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V10",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents i / ee.",
          "audioText": "이",
          "target": "ㅣ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V11",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents ae.",
          "audioText": "애",
          "target": "ㅐ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V12",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents yae.",
          "audioText": "얘",
          "target": "ㅒ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V13",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents e.",
          "audioText": "에",
          "target": "ㅔ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V14",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents ye.",
          "audioText": "예",
          "target": "ㅖ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V15",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents wa.",
          "audioText": "와",
          "target": "ㅘ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V16",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents wae.",
          "audioText": "왜",
          "target": "ㅙ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V17",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents oe.",
          "audioText": "외",
          "target": "ㅚ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V18",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents wo.",
          "audioText": "워",
          "target": "ㅝ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V19",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents we.",
          "audioText": "웨",
          "target": "ㅞ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V20",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents wi.",
          "audioText": "위",
          "target": "ㅟ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-V21",
          "stage": "Stage 01/04",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the Hangul vowel that represents ui.",
          "audioText": "의",
          "target": "ㅢ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C01",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 가 and draw its initial consonant.",
          "audioText": "가",
          "target": "ㄱ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C02",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 나 and draw its initial consonant.",
          "audioText": "나",
          "target": "ㄴ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C03",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 다 and draw its initial consonant.",
          "audioText": "다",
          "target": "ㄷ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C04",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 라 and draw its initial consonant.",
          "audioText": "라",
          "target": "ㄹ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C05",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 마 and draw its initial consonant.",
          "audioText": "마",
          "target": "ㅁ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C06",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 바 and draw its initial consonant.",
          "audioText": "바",
          "target": "ㅂ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C07",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 사 and draw its initial consonant.",
          "audioText": "사",
          "target": "ㅅ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C08",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Draw the silent initial consonant used before vowels.",
          "audioText": "아",
          "target": "ㅇ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C09",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 자 and draw its initial consonant.",
          "audioText": "자",
          "target": "ㅈ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C10",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 차 and draw its initial consonant.",
          "audioText": "차",
          "target": "ㅊ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C11",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 카 and draw its initial consonant.",
          "audioText": "카",
          "target": "ㅋ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C12",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 타 and draw its initial consonant.",
          "audioText": "타",
          "target": "ㅌ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C13",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 파 and draw its initial consonant.",
          "audioText": "파",
          "target": "ㅍ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C14",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 하 and draw its initial consonant.",
          "audioText": "하",
          "target": "ㅎ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C15",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 까 and draw its initial consonant.",
          "audioText": "까",
          "target": "ㄲ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C16",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 따 and draw its initial consonant.",
          "audioText": "따",
          "target": "ㄸ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C17",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 빠 and draw its initial consonant.",
          "audioText": "빠",
          "target": "ㅃ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C18",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 싸 and draw its initial consonant.",
          "audioText": "싸",
          "target": "ㅆ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        },
        {
          "id": "P7-C19",
          "stage": "Stage 02/05",
          "type": "draw",
          "promptKo": "제시된 소리에 맞는 글자를 쓰십시오.",
          "promptEn": "Listen to 짜 and draw its initial consonant.",
          "audioText": "짜",
          "target": "ㅉ",
          "requireExactGlyph": true,
          "requireGreatVerdict": true
        }
      ]
    }
  ]
};
