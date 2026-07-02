// HanaPath curated learning bank (Words section).
// Plain static browser global — no modules, no build step. Loaded before app.js.
// Schema: docs/WORDS_SECTION_MASTER_SPEC.md §4.3 (words) and §4.4 (function words).
// Raw 5,000-frequency CSV entries stay reference-only; every entry here must
// carry a real meaning, a simple example, and Korean-only voice text.
(function () {
  "use strict";

  var GROUP_TITLES = {
    "post-hangul-bridge": "Post-Hangul bridge",
    "survival-core": "Survival core",
    "people-pronouns": "People and pronouns",
    "things-demonstratives": "Things and demonstratives",
    "places-movement": "Places and movement",
    "food-drink": "Food and drink",
    "time-daily": "Time and daily rhythm",
    "core-actions": "Core actions",
    "feelings-descriptions": "Feelings and descriptions",
    "question-words": "Question words",
    "function-words-1": "Function words 1",
  };

  function defineWord(entry) {
    var word = {
      id: entry.id,
      korean: entry.korean,
      lemma: entry.lemma || entry.korean,
      display: entry.display || entry.korean,
      meaning: entry.meaning,
      meaningShort: entry.meaningShort || entry.meaning,
      pos: entry.pos,
      pronunciation: entry.pronunciation,
      exampleKo: entry.exampleKo,
      exampleEn: entry.exampleEn,
      usageNote: entry.usageNote || "",
      lessonGroup: entry.lessonGroup,
      lessonTitle: GROUP_TITLES[entry.lessonGroup] || entry.lessonGroup,
      difficulty: entry.difficulty || 1,
      priority: entry.priority || "core",
      isFunctionWord: Boolean(entry.isFunctionWord),
      isPhrase: Boolean(entry.isPhrase),
      tags: entry.tags || [],
      rawFrequencyRank: Number.isInteger(entry.rawFrequencyRank) ? entry.rawFrequencyRank : null,
      frequencyBand: entry.frequencyBand || "curated",
      source: "curated",
      voiceText: entry.voiceText || entry.korean,
      exampleVoiceText: entry.exampleVoiceText || entry.exampleKo,
    };
    if (entry.forms) word.forms = entry.forms;
    if (entry.grammarRole) word.grammarRole = entry.grammarRole;
    if (entry.contrastWith) word.contrastWith = entry.contrastWith;
    if (entry.pattern) word.pattern = entry.pattern;
    if (entry.allowSpaceFlexible) word.allowSpaceFlexible = true;
    return word;
  }

  window.HANAPATH_CURATED_WORDS = [
    // ── W0 · Post-Hangul bridge ─────────────────────────────────────────────
    defineWord({ id: "w0001_hangul", korean: "한글", meaning: "Hangul (the Korean alphabet)", meaningShort: "Hangul", pos: "noun", pronunciation: "hangeul", exampleKo: "한글은 재미있어요.", exampleEn: "Hangul is fun.", usageNote: "The name of the Korean writing system you just learned.", lessonGroup: "post-hangul-bridge", tags: ["language", "study"] }),
    defineWord({ id: "w0002_hangugeo", korean: "한국어", meaning: "Korean language", meaningShort: "Korean (language)", pos: "noun", pronunciation: "hangugeo", exampleKo: "저는 한국어를 공부해요.", exampleEn: "I study Korean.", usageNote: "한국 (Korea) + 어 (language).", lessonGroup: "post-hangul-bridge", tags: ["language", "study"] }),
    defineWord({ id: "w0003_mal", korean: "말", meaning: "speech, words", meaningShort: "speech / words", pos: "noun", pronunciation: "mal", exampleKo: "말이 빨라요.", exampleEn: "The speech is fast.", usageNote: "Spoken language in general. Also appears in 말하다 (to speak).", lessonGroup: "post-hangul-bridge", tags: ["language"] }),
    defineWord({ id: "w0004_daneo", korean: "단어", meaning: "word (vocabulary item)", meaningShort: "word", pos: "noun", pronunciation: "daneo", exampleKo: "이 단어는 쉬워요.", exampleEn: "This word is easy.", usageNote: "What you are learning right now: individual words.", lessonGroup: "post-hangul-bridge", tags: ["language", "study"] }),
    defineWord({ id: "w0005_sori", korean: "소리", meaning: "sound", meaningShort: "sound", pos: "noun", pronunciation: "sori", exampleKo: "소리를 들어요.", exampleEn: "I listen to the sound.", usageNote: "Any sound — a voice, music, or noise.", lessonGroup: "post-hangul-bridge", tags: ["listening"] }),
    defineWord({ id: "w0006_ikda", korean: "읽다", meaning: "to read", pos: "verb", pronunciation: "ikda", exampleKo: "책을 읽어요.", exampleEn: "I read a book.", usageNote: "Polite present form: 읽어요.", lessonGroup: "post-hangul-bridge", tags: ["study", "action"] }),
    defineWord({ id: "w0007_deutda", korean: "듣다", meaning: "to listen, to hear", meaningShort: "to listen", pos: "verb", pronunciation: "deutda", exampleKo: "음악을 들어요.", exampleEn: "I listen to music.", usageNote: "Irregular: ㄷ becomes ㄹ before a vowel, so the polite form is 들어요.", lessonGroup: "post-hangul-bridge", difficulty: 2, tags: ["study", "action", "listening"] }),
    defineWord({ id: "w0008_sseuda", korean: "쓰다", meaning: "to write; to use", meaningShort: "to write", pos: "verb", pronunciation: "sseuda", exampleKo: "이름을 써요.", exampleEn: "I write my name.", usageNote: "Also means \"to use\" and \"to wear (a hat/glasses)\". Polite form: 써요.", lessonGroup: "post-hangul-bridge", difficulty: 2, tags: ["study", "action"] }),
    defineWord({ id: "w0009_munjang", korean: "문장", meaning: "sentence", meaningShort: "sentence", pos: "noun", pronunciation: "munjang", exampleKo: "문장을 읽어요.", exampleEn: "I read a sentence.", usageNote: "Words become sentences — the next step after this section.", lessonGroup: "post-hangul-bridge", tags: ["language", "study"] }),
    defineWord({ id: "w0010_yeonseup", korean: "연습", meaning: "practice", meaningShort: "practice", pos: "noun", pronunciation: "yeonseup", exampleKo: "연습이 필요해요.", exampleEn: "Practice is needed.", usageNote: "연습하다 = to practice.", lessonGroup: "post-hangul-bridge", tags: ["study"] }),

    // ── W1 · Survival core ─────────────────────────────────────────────────
    defineWord({ id: "w0101_annyeonghaseyo", korean: "안녕하세요", meaning: "hello", pos: "phrase", pronunciation: "annyeonghaseyo", exampleKo: "안녕하세요. 저는 학생이에요.", exampleEn: "Hello. I am a student.", usageNote: "Safe polite greeting for most situations, any time of day.", lessonGroup: "survival-core", isPhrase: true, tags: ["greeting", "survival", "speaking"] }),
    defineWord({ id: "w0102_gamsahamnida", korean: "감사합니다", meaning: "thank you", pos: "phrase", pronunciation: "gamsahamnida", exampleKo: "정말 감사합니다.", exampleEn: "Thank you very much.", usageNote: "Formal-polite thank you. Works everywhere.", lessonGroup: "survival-core", isPhrase: true, tags: ["greeting", "survival", "speaking"] }),
    defineWord({ id: "w0103_ne", korean: "네", meaning: "yes", pos: "interjection", pronunciation: "ne", exampleKo: "네, 맞아요.", exampleEn: "Yes, that's right.", usageNote: "Also used as \"I see / uh-huh\" while listening.", lessonGroup: "survival-core", tags: ["survival", "speaking"] }),
    defineWord({ id: "w0104_aniyo", korean: "아니요", meaning: "no", pos: "interjection", pronunciation: "aniyo", exampleKo: "아니요, 괜찮아요.", exampleEn: "No, it's okay.", usageNote: "Polite no. Casual form: 아니.", lessonGroup: "survival-core", tags: ["survival", "speaking"] }),
    defineWord({ id: "w0105_juseyo", korean: "주세요", meaning: "please give me", pos: "phrase", pronunciation: "juseyo", exampleKo: "물 주세요.", exampleEn: "Water, please.", usageNote: "Put the thing you want before it: [thing] + 주세요.", lessonGroup: "survival-core", isPhrase: true, tags: ["survival", "ordering", "speaking"] }),
    defineWord({ id: "w0106_joesonghamnida", korean: "죄송합니다", meaning: "I'm sorry", pos: "phrase", pronunciation: "joesonghamnida", exampleKo: "늦어서 죄송합니다.", exampleEn: "Sorry for being late.", usageNote: "Formal-polite apology, safe with strangers.", lessonGroup: "survival-core", isPhrase: true, tags: ["survival", "speaking"] }),
    defineWord({ id: "w0107_gwaenchanayo", korean: "괜찮아요", meaning: "it's okay, I'm fine", meaningShort: "it's okay", pos: "phrase", pronunciation: "gwaenchanayo", exampleKo: "괜찮아요. 걱정하지 마세요.", exampleEn: "It's okay. Don't worry.", usageNote: "Also \"no thanks\" when offered something.", lessonGroup: "survival-core", isPhrase: true, tags: ["survival", "speaking"] }),
    defineWord({ id: "w0108_dowajuseyo", korean: "도와주세요", meaning: "please help me", pos: "phrase", pronunciation: "dowajuseyo", exampleKo: "저 좀 도와주세요.", exampleEn: "Please help me.", usageNote: "돕다 (to help) + 주세요 (please do for me).", lessonGroup: "survival-core", isPhrase: true, tags: ["survival", "speaking"] }),
    defineWord({ id: "w0109_jamsimanyo", korean: "잠시만요", meaning: "one moment, excuse me", meaningShort: "one moment", pos: "phrase", pronunciation: "jamsimanyo", exampleKo: "잠시만요. 금방 올게요.", exampleEn: "One moment. I'll be right back.", usageNote: "Also used to pass through a crowd, like \"excuse me\".", lessonGroup: "survival-core", isPhrase: true, tags: ["survival", "speaking"] }),
    defineWord({ id: "w0110_mollayo", korean: "몰라요", meaning: "I don't know", pos: "phrase", pronunciation: "mollayo", exampleKo: "저는 잘 몰라요.", exampleEn: "I don't really know.", usageNote: "From 모르다 (to not know).", lessonGroup: "survival-core", isPhrase: true, tags: ["survival", "speaking"] }),
    defineWord({ id: "w0111_algesseoyo", korean: "알겠어요", meaning: "I understand, got it", meaningShort: "got it", pos: "phrase", pronunciation: "algesseoyo", exampleKo: "네, 알겠어요.", exampleEn: "Yes, got it.", usageNote: "From 알다 (to know). More formal: 알겠습니다.", lessonGroup: "survival-core", isPhrase: true, tags: ["survival", "speaking"] }),

    // ── W2 · People and pronouns ────────────────────────────────────────────
    defineWord({ id: "w0201_jeo_i", korean: "저", meaning: "I, me (polite)", meaningShort: "I (polite)", pos: "pronoun", pronunciation: "jeo", exampleKo: "저는 학생이에요.", exampleEn: "I am a student.", usageNote: "Humble/polite \"I\". Use with people you don't know well.", lessonGroup: "people-pronouns", tags: ["people", "pronoun"] }),
    defineWord({ id: "w0202_na", korean: "나", meaning: "I, me (casual)", meaningShort: "I (casual)", pos: "pronoun", pronunciation: "na", exampleKo: "나는 커피 좋아해.", exampleEn: "I like coffee. (casual)", usageNote: "Casual \"I\" — only with close friends or younger people.", lessonGroup: "people-pronouns", tags: ["people", "pronoun", "casual"] }),
    defineWord({ id: "w0203_neo", korean: "너", meaning: "you (casual)", meaningShort: "you (casual)", pos: "pronoun", pronunciation: "neo", exampleKo: "너는 어디 가?", exampleEn: "Where are you going? (casual)", usageNote: "Casual only. Koreans often use a name or title instead of \"you\".", lessonGroup: "people-pronouns", tags: ["people", "pronoun", "casual"] }),
    defineWord({ id: "w0204_uri", korean: "우리", meaning: "we, us, our", meaningShort: "we / our", pos: "pronoun", pronunciation: "uri", exampleKo: "우리는 친구예요.", exampleEn: "We are friends.", usageNote: "Also \"our\": 우리 집 (our house), even when it's just yours.", lessonGroup: "people-pronouns", tags: ["people", "pronoun"] }),
    defineWord({ id: "w0205_saram", korean: "사람", meaning: "person", meaningShort: "person", pos: "noun", pronunciation: "saram", exampleKo: "저 사람은 누구예요?", exampleEn: "Who is that person?", usageNote: "한국 사람 = a Korean person.", lessonGroup: "people-pronouns", tags: ["people"] }),
    defineWord({ id: "w0206_chingu", korean: "친구", meaning: "friend", meaningShort: "friend", pos: "noun", pronunciation: "chingu", exampleKo: "친구를 만나요.", exampleEn: "I meet a friend.", usageNote: "Usually implies same age in Korean culture.", lessonGroup: "people-pronouns", tags: ["people"] }),
    defineWord({ id: "w0207_haksaeng", korean: "학생", meaning: "student", meaningShort: "student", pos: "noun", pronunciation: "haksaeng", exampleKo: "제 친구는 학생이에요.", exampleEn: "My friend is a student.", usageNote: "", lessonGroup: "people-pronouns", tags: ["people", "study"] }),
    defineWord({ id: "w0208_seonsaengnim", korean: "선생님", meaning: "teacher", meaningShort: "teacher", pos: "noun", pronunciation: "seonsaengnim", exampleKo: "선생님, 감사합니다.", exampleEn: "Thank you, teacher.", usageNote: "님 is an honorific ending. Also a polite way to address strangers.", lessonGroup: "people-pronouns", tags: ["people"] }),
    defineWord({ id: "w0209_ireum", korean: "이름", meaning: "name", meaningShort: "name", pos: "noun", pronunciation: "ireum", exampleKo: "이름이 뭐예요?", exampleEn: "What is your name?", usageNote: "", lessonGroup: "people-pronouns", tags: ["people"] }),
    defineWord({ id: "w0210_nugu", korean: "누구", meaning: "who", meaningShort: "who", pos: "pronoun", pronunciation: "nugu", exampleKo: "누구세요?", exampleEn: "Who is it?", usageNote: "As the subject it becomes 누가: 누가 왔어요? (Who came?)", lessonGroup: "people-pronouns", tags: ["people", "question"] }),

    // ── W3 · Things and demonstratives ─────────────────────────────────────
    defineWord({ id: "w0301_i_this", korean: "이", meaning: "this (before a noun)", meaningShort: "this", pos: "determiner", pronunciation: "i", exampleKo: "이 책 주세요.", exampleEn: "This book, please.", usageNote: "Goes before a noun: 이 사람 (this person). Near the speaker.", lessonGroup: "things-demonstratives", tags: ["demonstrative"] }),
    defineWord({ id: "w0302_geu_that", korean: "그", meaning: "that (before a noun)", meaningShort: "that", pos: "determiner", pronunciation: "geu", exampleKo: "그 사람을 알아요.", exampleEn: "I know that person.", usageNote: "Near the listener, or something already mentioned.", lessonGroup: "things-demonstratives", tags: ["demonstrative"] }),
    defineWord({ id: "w0303_jeo_that_over", korean: "저", display: "저 (that over there)", meaning: "that over there (before a noun)", meaningShort: "that over there", pos: "determiner", pronunciation: "jeo", exampleKo: "저 집이 커요.", exampleEn: "That house over there is big.", usageNote: "Far from both speaker and listener. Same spelling as 저 (I) — context decides.", lessonGroup: "things-demonstratives", difficulty: 2, tags: ["demonstrative"] }),
    defineWord({ id: "w0304_igeo", korean: "이거", meaning: "this thing", meaningShort: "this thing", pos: "pronoun", pronunciation: "igeo", exampleKo: "이거 뭐예요?", exampleEn: "What is this?", usageNote: "Spoken form of 이것. Extremely common when pointing.", lessonGroup: "things-demonstratives", tags: ["demonstrative"] }),
    defineWord({ id: "w0305_geugeo", korean: "그거", meaning: "that thing", meaningShort: "that thing", pos: "pronoun", pronunciation: "geugeo", exampleKo: "그거 주세요.", exampleEn: "Please give me that.", usageNote: "Spoken form of 그것.", lessonGroup: "things-demonstratives", tags: ["demonstrative"] }),
    defineWord({ id: "w0306_jeogeo", korean: "저거", meaning: "that thing over there", meaningShort: "that one over there", pos: "pronoun", pronunciation: "jeogeo", exampleKo: "저거는 얼마예요?", exampleEn: "How much is that one over there?", usageNote: "Spoken form of 저것.", lessonGroup: "things-demonstratives", tags: ["demonstrative"] }),
    defineWord({ id: "w0307_geot", korean: "것", meaning: "thing", meaningShort: "thing", pos: "noun", pronunciation: "geot", exampleKo: "이것은 제 것이에요.", exampleEn: "This is mine.", usageNote: "A grammar workhorse: 제 것 = my thing = mine. Often shortened to 거.", lessonGroup: "things-demonstratives", difficulty: 2, tags: ["grammar"] }),
    defineWord({ id: "w0308_mwo", korean: "뭐", meaning: "what", meaningShort: "what", pos: "pronoun", pronunciation: "mwo", exampleKo: "뭐 먹어요?", exampleEn: "What are you eating?", usageNote: "Spoken form of 무엇.", lessonGroup: "things-demonstratives", tags: ["question"] }),
    defineWord({ id: "w0309_chaek", korean: "책", meaning: "book", meaningShort: "book", pos: "noun", pronunciation: "chaek", exampleKo: "이 책은 재미있어요.", exampleEn: "This book is fun.", usageNote: "", lessonGroup: "things-demonstratives", tags: ["object", "study"] }),
    defineWord({ id: "w0310_jeonhwa", korean: "전화", meaning: "phone, phone call", meaningShort: "phone", pos: "noun", pronunciation: "jeonhwa", exampleKo: "전화 주세요.", exampleEn: "Please call me.", usageNote: "전화하다 = to make a phone call.", lessonGroup: "things-demonstratives", tags: ["object"] }),

    // ── W4 · Places and movement ────────────────────────────────────────────
    defineWord({ id: "w0401_yeogi", korean: "여기", meaning: "here", meaningShort: "here", pos: "pronoun", pronunciation: "yeogi", exampleKo: "여기 앉으세요.", exampleEn: "Please sit here.", usageNote: "", lessonGroup: "places-movement", tags: ["place"] }),
    defineWord({ id: "w0402_geogi", korean: "거기", meaning: "there", meaningShort: "there", pos: "pronoun", pronunciation: "geogi", exampleKo: "거기에 있어요.", exampleEn: "It's there.", usageNote: "Near the listener, or a place already mentioned.", lessonGroup: "places-movement", tags: ["place"] }),
    defineWord({ id: "w0403_jeogi", korean: "저기", meaning: "over there", meaningShort: "over there", pos: "pronoun", pronunciation: "jeogi", exampleKo: "화장실은 저기예요.", exampleEn: "The bathroom is over there.", usageNote: "Also used to get attention: 저기요! (Excuse me!)", lessonGroup: "places-movement", tags: ["place"] }),
    defineWord({ id: "w0404_jip", korean: "집", meaning: "home, house", meaningShort: "home", pos: "noun", pronunciation: "jip", exampleKo: "집에 가요.", exampleEn: "I'm going home.", usageNote: "", lessonGroup: "places-movement", tags: ["place"] }),
    defineWord({ id: "w0405_hakgyo", korean: "학교", meaning: "school", meaningShort: "school", pos: "noun", pronunciation: "hakgyo", exampleKo: "학교에 가요.", exampleEn: "I go to school.", usageNote: "", lessonGroup: "places-movement", tags: ["place"] }),
    defineWord({ id: "w0406_hoesa", korean: "회사", meaning: "company, workplace", meaningShort: "company / work", pos: "noun", pronunciation: "hoesa", exampleKo: "회사에서 일해요.", exampleEn: "I work at a company.", usageNote: "", lessonGroup: "places-movement", tags: ["place"] }),
    defineWord({ id: "w0407_hwajangsil", korean: "화장실", meaning: "bathroom, restroom", meaningShort: "bathroom", pos: "noun", pronunciation: "hwajangsil", exampleKo: "화장실이 어디예요?", exampleEn: "Where is the bathroom?", usageNote: "A survival essential.", lessonGroup: "places-movement", tags: ["place", "survival"] }),
    defineWord({ id: "w0408_yeok", korean: "역", meaning: "station (train/subway)", meaningShort: "station", pos: "noun", pronunciation: "yeok", exampleKo: "역이 가까워요.", exampleEn: "The station is close.", usageNote: "서울역 = Seoul Station.", lessonGroup: "places-movement", tags: ["place", "travel"] }),
    defineWord({ id: "w0409_gada", korean: "가다", meaning: "to go", pos: "verb", pronunciation: "gada", exampleKo: "지금 가요.", exampleEn: "I'm going now.", usageNote: "Polite present form: 가요.", lessonGroup: "places-movement", tags: ["action", "movement"] }),
    defineWord({ id: "w0410_oda", korean: "오다", meaning: "to come", pos: "verb", pronunciation: "oda", exampleKo: "친구가 와요.", exampleEn: "A friend is coming.", usageNote: "Polite present form: 와요.", lessonGroup: "places-movement", tags: ["action", "movement"] }),

    // ── W5 · Food and drink ─────────────────────────────────────────────────
    defineWord({ id: "w0501_mul", korean: "물", meaning: "water", meaningShort: "water", pos: "noun", pronunciation: "mul", exampleKo: "물 주세요.", exampleEn: "Water, please.", usageNote: "Common noun. Often appears in ordering phrases.", lessonGroup: "food-drink", tags: ["food", "survival"] }),
    defineWord({ id: "w0502_bap", korean: "밥", meaning: "rice; a meal", meaningShort: "rice / meal", pos: "noun", pronunciation: "bap", exampleKo: "밥 먹었어요?", exampleEn: "Did you eat?", usageNote: "밥 먹었어요? is also a friendly greeting, like \"how are you?\".", lessonGroup: "food-drink", tags: ["food"] }),
    defineWord({ id: "w0503_eumsik", korean: "음식", meaning: "food", meaningShort: "food", pos: "noun", pronunciation: "eumsik", exampleKo: "한국 음식이 맛있어요.", exampleEn: "Korean food is delicious.", usageNote: "", lessonGroup: "food-drink", tags: ["food"] }),
    defineWord({ id: "w0504_keopi", korean: "커피", meaning: "coffee", meaningShort: "coffee", pos: "noun", pronunciation: "keopi", exampleKo: "커피 마셔요.", exampleEn: "I drink coffee.", usageNote: "A loanword from English.", lessonGroup: "food-drink", tags: ["food", "drink"] }),
    defineWord({ id: "w0505_cha", korean: "차", meaning: "tea", meaningShort: "tea", pos: "noun", pronunciation: "cha", exampleKo: "차 한 잔 주세요.", exampleEn: "A cup of tea, please.", usageNote: "Also means \"car\" — context decides.", lessonGroup: "food-drink", tags: ["food", "drink"] }),
    defineWord({ id: "w0506_gogi", korean: "고기", meaning: "meat", meaningShort: "meat", pos: "noun", pronunciation: "gogi", exampleKo: "고기를 좋아해요.", exampleEn: "I like meat.", usageNote: "소고기 beef, 돼지고기 pork, 닭고기 chicken.", lessonGroup: "food-drink", tags: ["food"] }),
    defineWord({ id: "w0507_gwail", korean: "과일", meaning: "fruit", meaningShort: "fruit", pos: "noun", pronunciation: "gwail", exampleKo: "과일을 사요.", exampleEn: "I buy fruit.", usageNote: "", lessonGroup: "food-drink", tags: ["food"] }),
    defineWord({ id: "w0508_ppang", korean: "빵", meaning: "bread", meaningShort: "bread", pos: "noun", pronunciation: "ppang", exampleKo: "빵을 먹어요.", exampleEn: "I eat bread.", usageNote: "", lessonGroup: "food-drink", tags: ["food"] }),
    defineWord({ id: "w0509_meokda", korean: "먹다", meaning: "to eat", pos: "verb", pronunciation: "meokda", exampleKo: "뭐 먹어요?", exampleEn: "What are you eating?", usageNote: "Polite present form: 먹어요.", lessonGroup: "food-drink", tags: ["action", "food"] }),
    defineWord({ id: "w0510_masida", korean: "마시다", meaning: "to drink", pos: "verb", pronunciation: "masida", exampleKo: "물을 마셔요.", exampleEn: "I drink water.", usageNote: "Polite present form: 마셔요.", lessonGroup: "food-drink", tags: ["action", "food", "drink"] }),

    // ── W6 · Time and daily rhythm ──────────────────────────────────────────
    defineWord({ id: "w0601_oneul", korean: "오늘", meaning: "today", meaningShort: "today", pos: "noun", pronunciation: "oneul", exampleKo: "오늘은 바빠요.", exampleEn: "I'm busy today.", usageNote: "", lessonGroup: "time-daily", tags: ["time"] }),
    defineWord({ id: "w0602_naeil", korean: "내일", meaning: "tomorrow", meaningShort: "tomorrow", pos: "noun", pronunciation: "naeil", exampleKo: "내일 만나요.", exampleEn: "See you tomorrow.", usageNote: "", lessonGroup: "time-daily", tags: ["time"] }),
    defineWord({ id: "w0603_eoje", korean: "어제", meaning: "yesterday", meaningShort: "yesterday", pos: "noun", pronunciation: "eoje", exampleKo: "어제 뭐 했어요?", exampleEn: "What did you do yesterday?", usageNote: "", lessonGroup: "time-daily", tags: ["time"] }),
    defineWord({ id: "w0604_jigeum", korean: "지금", meaning: "now", meaningShort: "now", pos: "noun", pronunciation: "jigeum", exampleKo: "지금 시간 있어요?", exampleEn: "Do you have time now?", usageNote: "", lessonGroup: "time-daily", tags: ["time"] }),
    defineWord({ id: "w0605_sigan", korean: "시간", meaning: "time; an hour", meaningShort: "time / hour", pos: "noun", pronunciation: "sigan", exampleKo: "시간이 없어요.", exampleEn: "I don't have time.", usageNote: "", lessonGroup: "time-daily", tags: ["time"] }),
    defineWord({ id: "w0606_achim", korean: "아침", meaning: "morning; breakfast", meaningShort: "morning", pos: "noun", pronunciation: "achim", exampleKo: "아침에 커피를 마셔요.", exampleEn: "I drink coffee in the morning.", usageNote: "Means both the morning and the morning meal.", lessonGroup: "time-daily", tags: ["time", "food"] }),
    defineWord({ id: "w0607_jeomsim", korean: "점심", meaning: "lunch; midday", meaningShort: "lunch", pos: "noun", pronunciation: "jeomsim", exampleKo: "점심 먹었어요?", exampleEn: "Did you have lunch?", usageNote: "", lessonGroup: "time-daily", tags: ["time", "food"] }),
    defineWord({ id: "w0608_jeonyeok", korean: "저녁", meaning: "evening; dinner", meaningShort: "evening", pos: "noun", pronunciation: "jeonyeok", exampleKo: "저녁에 만나요.", exampleEn: "Let's meet in the evening.", usageNote: "Means both the evening and the evening meal.", lessonGroup: "time-daily", tags: ["time", "food"] }),
    defineWord({ id: "w0609_nal", korean: "날", meaning: "day", meaningShort: "day", pos: "noun", pronunciation: "nal", exampleKo: "좋은 날이에요.", exampleEn: "It's a nice day.", usageNote: "", lessonGroup: "time-daily", tags: ["time"] }),
    defineWord({ id: "w0610_eonje", korean: "언제", meaning: "when", meaningShort: "when", pos: "adverb", pronunciation: "eonje", exampleKo: "언제 가요?", exampleEn: "When are you going?", usageNote: "", lessonGroup: "time-daily", tags: ["time", "question"] }),

    // ── W7 · Core actions ───────────────────────────────────────────────────
    defineWord({ id: "w0701_hada", korean: "하다", meaning: "to do", pos: "verb", pronunciation: "hada", exampleKo: "뭐 해요?", exampleEn: "What are you doing?", usageNote: "The most useful verb in Korean: 공부하다, 전화하다, 연습하다…", lessonGroup: "core-actions", tags: ["action"] }),
    defineWord({ id: "w0702_itda", korean: "있다", meaning: "to exist; to have", meaningShort: "to exist / have", pos: "verb", pronunciation: "itda", exampleKo: "시간이 있어요?", exampleEn: "Do you have time?", usageNote: "Both \"there is\" and \"to have\". Polite form: 있어요.", lessonGroup: "core-actions", tags: ["action", "grammar"] }),
    defineWord({ id: "w0703_eopda", korean: "없다", meaning: "to not exist; to not have", meaningShort: "to not have", pos: "verb", pronunciation: "eopda", exampleKo: "시간이 없어요.", exampleEn: "I don't have time.", usageNote: "The opposite of 있다. Polite form: 없어요.", lessonGroup: "core-actions", tags: ["action", "grammar"] }),
    defineWord({ id: "w0704_boda", korean: "보다", meaning: "to see, to watch", meaningShort: "to see", pos: "verb", pronunciation: "boda", exampleKo: "영화를 봐요.", exampleEn: "I watch a movie.", usageNote: "Polite present form: 봐요.", lessonGroup: "core-actions", tags: ["action"] }),
    defineWord({ id: "w0705_malhada", korean: "말하다", meaning: "to speak, to say", meaningShort: "to speak", pos: "verb", pronunciation: "malhada", exampleKo: "천천히 말해 주세요.", exampleEn: "Please speak slowly.", usageNote: "말 (speech) + 하다 (to do).", lessonGroup: "core-actions", tags: ["action", "speaking"] }),
    defineWord({ id: "w0706_sada", korean: "사다", meaning: "to buy", pos: "verb", pronunciation: "sada", exampleKo: "빵을 사요.", exampleEn: "I buy bread.", usageNote: "Polite present form: 사요.", lessonGroup: "core-actions", tags: ["action", "shopping"] }),
    defineWord({ id: "w0707_mannada", korean: "만나다", meaning: "to meet", pos: "verb", pronunciation: "mannada", exampleKo: "내일 친구를 만나요.", exampleEn: "I'm meeting a friend tomorrow.", usageNote: "만나서 반갑습니다 = nice to meet you.", lessonGroup: "core-actions", tags: ["action", "people"] }),
    defineWord({ id: "w0708_jada", korean: "자다", meaning: "to sleep", pos: "verb", pronunciation: "jada", exampleKo: "잘 자요.", exampleEn: "Sleep well.", usageNote: "잘 자요 = good night (to someone close).", lessonGroup: "core-actions", tags: ["action", "daily"] }),
    defineWord({ id: "w0709_ireonada", korean: "일어나다", meaning: "to get up, to wake up", meaningShort: "to get up", pos: "verb", pronunciation: "ireonada", exampleKo: "아침에 일찍 일어나요.", exampleEn: "I get up early in the morning.", usageNote: "", lessonGroup: "core-actions", difficulty: 2, tags: ["action", "daily"] }),
    defineWord({ id: "w0710_joahada", korean: "좋아하다", meaning: "to like", pos: "verb", pronunciation: "joahada", exampleKo: "커피를 좋아해요.", exampleEn: "I like coffee.", usageNote: "Takes an object with 을/를, unlike 좋다.", lessonGroup: "core-actions", tags: ["action", "feeling"] }),

    // ── W8 · Feelings and descriptions ──────────────────────────────────────
    defineWord({ id: "w0801_jota", korean: "좋다", meaning: "to be good", pos: "adjective", pronunciation: "jota", exampleKo: "날씨가 좋아요.", exampleEn: "The weather is good.", usageNote: "Describes things: [thing]이/가 좋아요. Compare 좋아하다 (to like).", lessonGroup: "feelings-descriptions", tags: ["feeling", "description"] }),
    defineWord({ id: "w0802_silta", korean: "싫다", meaning: "to be disliked, to hate", meaningShort: "to dislike", pos: "adjective", pronunciation: "silta", exampleKo: "비가 싫어요.", exampleEn: "I don't like rain.", usageNote: "[thing]이/가 싫어요 = I dislike [thing].", lessonGroup: "feelings-descriptions", tags: ["feeling"] }),
    defineWord({ id: "w0803_keuda", korean: "크다", meaning: "to be big", pos: "adjective", pronunciation: "keuda", exampleKo: "집이 커요.", exampleEn: "The house is big.", usageNote: "Polite form: 커요.", lessonGroup: "feelings-descriptions", tags: ["description"] }),
    defineWord({ id: "w0804_jakda", korean: "작다", meaning: "to be small", pos: "adjective", pronunciation: "jakda", exampleKo: "방이 작아요.", exampleEn: "The room is small.", usageNote: "Polite form: 작아요.", lessonGroup: "feelings-descriptions", tags: ["description"] }),
    defineWord({ id: "w0805_manta", korean: "많다", meaning: "to be many, a lot", meaningShort: "to be many", pos: "adjective", pronunciation: "manta", exampleKo: "사람이 많아요.", exampleEn: "There are many people.", usageNote: "Polite form: 많아요.", lessonGroup: "feelings-descriptions", tags: ["description"] }),
    defineWord({ id: "w0806_jeokda", korean: "적다", meaning: "to be few, little", meaningShort: "to be few", pos: "adjective", pronunciation: "jeokda", exampleKo: "시간이 적어요.", exampleEn: "There is little time.", usageNote: "The opposite of 많다.", lessonGroup: "feelings-descriptions", tags: ["description"] }),
    defineWord({ id: "w0807_jaemiitda", korean: "재미있다", meaning: "to be fun, interesting", meaningShort: "to be fun", pos: "adjective", pronunciation: "jaemiitda", exampleKo: "이 책은 재미있어요.", exampleEn: "This book is fun.", usageNote: "재미 (fun) + 있다 (to have). Opposite: 재미없다.", lessonGroup: "feelings-descriptions", tags: ["feeling", "description"] }),
    defineWord({ id: "w0808_pigonhada", korean: "피곤하다", meaning: "to be tired", pos: "adjective", pronunciation: "pigonhada", exampleKo: "오늘 너무 피곤해요.", exampleEn: "I'm so tired today.", usageNote: "Polite form: 피곤해요.", lessonGroup: "feelings-descriptions", tags: ["feeling"] }),
    defineWord({ id: "w0809_masitda", korean: "맛있다", meaning: "to be delicious", pos: "adjective", pronunciation: "masitda", exampleKo: "이 빵은 맛있어요.", exampleEn: "This bread is delicious.", usageNote: "맛 (taste) + 있다 (to have). Opposite: 맛없다.", lessonGroup: "feelings-descriptions", tags: ["feeling", "food"] }),
    defineWord({ id: "w0810_yeppeuda", korean: "예쁘다", meaning: "to be pretty", pos: "adjective", pronunciation: "yeppeuda", exampleKo: "꽃이 예뻐요.", exampleEn: "The flowers are pretty.", usageNote: "Polite form: 예뻐요.", lessonGroup: "feelings-descriptions", tags: ["description"] }),

    // ── W9 · Question words ─────────────────────────────────────────────────
    defineWord({ id: "w0901_eodi", korean: "어디", meaning: "where", meaningShort: "where", pos: "pronoun", pronunciation: "eodi", exampleKo: "어디에 가요?", exampleEn: "Where are you going?", usageNote: "", lessonGroup: "question-words", tags: ["question"] }),
    defineWord({ id: "w0902_wae", korean: "왜", meaning: "why", meaningShort: "why", pos: "adverb", pronunciation: "wae", exampleKo: "왜 안 와요?", exampleEn: "Why aren't you coming?", usageNote: "", lessonGroup: "question-words", tags: ["question"] }),
    defineWord({ id: "w0903_eotteoke", korean: "어떻게", meaning: "how", meaningShort: "how", pos: "adverb", pronunciation: "eotteoke", exampleKo: "어떻게 가요?", exampleEn: "How do I get there?", usageNote: "", lessonGroup: "question-words", tags: ["question"] }),
    defineWord({ id: "w0904_eolma", korean: "얼마", meaning: "how much (price)", meaningShort: "how much", pos: "pronoun", pronunciation: "eolma", exampleKo: "이거 얼마예요?", exampleEn: "How much is this?", usageNote: "얼마예요? is the essential shopping question.", lessonGroup: "question-words", tags: ["question", "shopping"] }),
    defineWord({ id: "w0905_myeot", korean: "몇", meaning: "how many, what number", meaningShort: "how many", pos: "determiner", pronunciation: "myeot", exampleKo: "몇 시예요?", exampleEn: "What time is it?", usageNote: "Goes before a counter: 몇 시 (what hour), 몇 명 (how many people).", lessonGroup: "question-words", difficulty: 2, tags: ["question"] }),
    defineWord({ id: "w0906_museun", korean: "무슨", meaning: "what kind of", meaningShort: "what kind of", pos: "determiner", pronunciation: "museun", exampleKo: "무슨 음식을 좋아해요?", exampleEn: "What food do you like?", usageNote: "Goes before a noun.", lessonGroup: "question-words", tags: ["question"] }),
    defineWord({ id: "w0907_eotteon", korean: "어떤", meaning: "which, what kind of", meaningShort: "which", pos: "determiner", pronunciation: "eotteon", exampleKo: "어떤 영화를 봐요?", exampleEn: "What kind of movie are you watching?", usageNote: "Asks about qualities or choice among options.", lessonGroup: "question-words", tags: ["question"] }),
    defineWord({ id: "w0908_eolmana", korean: "얼마나", meaning: "how long, how much (degree)", meaningShort: "how long / how much", pos: "adverb", pronunciation: "eolmana", exampleKo: "얼마나 걸려요?", exampleEn: "How long does it take?", usageNote: "Asks about degree or duration, not price.", lessonGroup: "question-words", difficulty: 2, tags: ["question"] }),

    // ── W10 · Function words 1 ──────────────────────────────────────────────
    defineWord({ id: "fw1001_eun_neun", korean: "은/는", forms: ["은", "는"], meaning: "topic marker", pos: "particle", pronunciation: "eun / neun", exampleKo: "저는 학생이에요.", exampleEn: "I am a student.", usageNote: "Marks what the sentence is about. Use 는 after a vowel and 은 after a consonant.", grammarRole: "topic", contrastWith: ["이/가"], pattern: "[topic] + 은/는", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "topic", "grammar"], voiceText: "은, 는" }),
    defineWord({ id: "fw1002_i_ga", korean: "이/가", forms: ["이", "가"], meaning: "subject marker", pos: "particle", pronunciation: "i / ga", exampleKo: "친구가 와요.", exampleEn: "A friend is coming.", usageNote: "Marks the subject of the sentence. Use 가 after a vowel and 이 after a consonant.", grammarRole: "subject", contrastWith: ["은/는"], pattern: "[subject] + 이/가", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "subject", "grammar"], voiceText: "이, 가" }),
    defineWord({ id: "fw1003_eul_reul", korean: "을/를", forms: ["을", "를"], meaning: "object marker", pos: "particle", pronunciation: "eul / reul", exampleKo: "물을 마셔요.", exampleEn: "I drink water.", usageNote: "Marks what the action happens to. Use 를 after a vowel and 을 after a consonant.", grammarRole: "object", pattern: "[object] + 을/를", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "object", "grammar"], voiceText: "을, 를" }),
    defineWord({ id: "fw1004_e", korean: "에", meaning: "to / at (place or time marker)", meaningShort: "to / at", pos: "particle", pronunciation: "e", exampleKo: "집에 가요.", exampleEn: "I'm going home.", usageNote: "Marks a destination (집에 가요) or a time (아침에).", grammarRole: "location-time", contrastWith: ["에서"], pattern: "[place/time] + 에", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "place", "grammar"] }),
    defineWord({ id: "fw1005_eseo", korean: "에서", meaning: "at / in (where an action happens); from", meaningShort: "at (action) / from", pos: "particle", pronunciation: "eseo", exampleKo: "학교에서 공부해요.", exampleEn: "I study at school.", usageNote: "Marks where an action happens. 에 marks a destination; 에서 marks activity or a starting point.", grammarRole: "action-location", contrastWith: ["에"], pattern: "[place] + 에서", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "place", "grammar"] }),
    defineWord({ id: "fw1006_do", korean: "도", meaning: "also, too", meaningShort: "also / too", pos: "particle", pronunciation: "do", exampleKo: "저도 가요.", exampleEn: "I'm going too.", usageNote: "Replaces 은/는 or 이/가 rather than stacking on top of them.", grammarRole: "additive", pattern: "[noun] + 도", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "grammar"] }),
    defineWord({ id: "fw1007_ui", korean: "의", meaning: "possessive marker (of, 's)", meaningShort: "of / 's", pos: "particle", pronunciation: "ui (often e)", exampleKo: "친구의 책이에요.", exampleEn: "It's my friend's book.", usageNote: "Often pronounced 에 in this role, and frequently dropped in speech.", grammarRole: "possessive", pattern: "[owner] + 의 + [thing]", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "grammar"] }),
    defineWord({ id: "fw1008_wa_gwa", korean: "와/과", forms: ["와", "과"], meaning: "and, with (written/formal)", meaningShort: "and / with", pos: "particle", pronunciation: "wa / gwa", exampleKo: "친구와 가요.", exampleEn: "I'm going with a friend.", usageNote: "Use 와 after a vowel and 과 after a consonant. More formal than 하고.", grammarRole: "connective", contrastWith: ["하고"], pattern: "[noun] + 와/과 + [noun]", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "grammar"], voiceText: "와, 과" }),
    defineWord({ id: "fw1009_hago", korean: "하고", meaning: "and, with (spoken)", meaningShort: "and / with (spoken)", pos: "particle", pronunciation: "hago", exampleKo: "밥하고 물 주세요.", exampleEn: "Rice and water, please.", usageNote: "The everyday spoken \"and\" between nouns.", grammarRole: "connective", contrastWith: ["와/과"], pattern: "[noun] + 하고 + [noun]", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["particle", "grammar"] }),
    defineWord({ id: "fw1010_go", korean: "고", meaning: "and, and then (connects verbs)", meaningShort: "and (verbs)", pos: "ending", pronunciation: "go", exampleKo: "먹고 가요.", exampleEn: "Eat and then go.", usageNote: "Attaches to a verb stem to chain actions: 먹다 → 먹고.", grammarRole: "verb-connective", pattern: "[verb stem] + 고", lessonGroup: "function-words-1", isFunctionWord: true, difficulty: 2, tags: ["ending", "grammar"] }),
  ];
})();
