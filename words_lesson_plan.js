// HanaPath word lesson plan (Words section curriculum).
// Plain static browser global — no modules, no build step. Loaded before app.js.
// Every newWordIds entry must exist in words_curated_core.js
// (verified by scripts/audit-words-data.mjs).
(function () {
  "use strict";

  var DEFAULT_CHECKPOINTS = ["ko-to-meaning", "audio-to-meaning", "meaning-to-ko", "type-ko", "sentence-blank"];
  var DEFAULT_PASS = { minFirstTryPct: 75, requireTypedAttempt: true };

  var previousId = null;
  function defineLesson(lesson) {
    var full = {
      id: lesson.id,
      stage: lesson.stage,
      title: lesson.title,
      subtitle: lesson.subtitle,
      goal: lesson.goal,
      tutorial: Boolean(lesson.tutorial),
      unlock: {
        requiresAlphabetComplete: true,
        previousLessonId: previousId,
      },
      newWordIds: lesson.newWordIds,
      reviewPolicy: { includeDue: true, maxReviewCards: 4 },
      checkpoints: lesson.checkpoints || DEFAULT_CHECKPOINTS,
      pass: lesson.pass || DEFAULT_PASS,
    };
    previousId = lesson.id;
    return full;
  }

  window.HANAPATH_WORD_LESSONS = [
    defineLesson({
      id: "w0-post-hangul-bridge-01",
      stage: "W0",
      title: "Post-Hangul bridge",
      subtitle: "Turn letters into words",
      goal: "Learn how word cards work: see, hear, type, repeat, and review.",
      tutorial: true,
      newWordIds: ["w0001_hangul", "w0002_hangugeo", "w0003_mal", "w0004_daneo", "w0005_sori"],
    }),
    defineLesson({
      id: "w0-post-hangul-bridge-02",
      stage: "W0",
      title: "Read, listen, write",
      subtitle: "The study verbs",
      goal: "Learn the verbs you will use to talk about learning Korean.",
      newWordIds: ["w0006_ikda", "w0007_deutda", "w0008_sseuda", "w0009_munjang", "w0010_yeonseup"],
    }),
    defineLesson({
      id: "w1-survival-core-01",
      stage: "W1",
      title: "Survival core",
      subtitle: "Words you can use immediately",
      goal: "Understand, hear, type, and say 5 survival words.",
      newWordIds: ["w0101_annyeonghaseyo", "w0102_gamsahamnida", "w0103_ne", "w0104_aniyo", "w0105_juseyo"],
    }),
    defineLesson({
      id: "w1-survival-core-02",
      stage: "W1",
      title: "Survival core II",
      subtitle: "Polite problem-solving",
      goal: "Apologise, ask for help, and buy yourself a moment.",
      newWordIds: ["w0106_joesonghamnida", "w0107_gwaenchanayo", "w0108_dowajuseyo", "w0109_jamsimanyo", "w0110_mollayo", "w0111_algesseoyo"],
    }),
    defineLesson({
      id: "w2-people-pronouns-01",
      stage: "W2",
      title: "People and pronouns",
      subtitle: "Talking about people",
      goal: "Introduce yourself and ask who someone is.",
      newWordIds: ["w0201_jeo_i", "w0205_saram", "w0206_chingu", "w0209_ireum", "w0210_nugu"],
    }),
    defineLesson({
      id: "w2-people-pronouns-02",
      stage: "W2",
      title: "People and pronouns II",
      subtitle: "We, you, and roles",
      goal: "Learn casual pronouns and the people around you.",
      newWordIds: ["w0202_na", "w0203_neo", "w0204_uri", "w0207_haksaeng", "w0208_seonsaengnim"],
    }),
    defineLesson({
      id: "w3-things-demonstratives-01",
      stage: "W3",
      title: "Things and demonstratives",
      subtitle: "This one, that one",
      goal: "Point at things and ask what they are.",
      newWordIds: ["w0304_igeo", "w0305_geugeo", "w0306_jeogeo", "w0307_geot", "w0308_mwo"],
    }),
    defineLesson({
      id: "w3-things-demonstratives-02",
      stage: "W3",
      title: "Things and demonstratives II",
      subtitle: "This book, that person",
      goal: "Use this/that before nouns you already know.",
      newWordIds: ["w0301_i_this", "w0302_geu_that", "w0303_jeo_that_over", "w0309_chaek", "w0310_jeonhwa"],
    }),
    defineLesson({
      id: "w4-places-movement-01",
      stage: "W4",
      title: "Places and movement",
      subtitle: "Here, there, home",
      goal: "Name the places around you.",
      newWordIds: ["w0401_yeogi", "w0402_geogi", "w0403_jeogi", "w0404_jip", "w0405_hakgyo"],
    }),
    defineLesson({
      id: "w4-places-movement-02",
      stage: "W4",
      title: "Places and movement II",
      subtitle: "Going and coming",
      goal: "Find the bathroom, find the station, go and come.",
      newWordIds: ["w0406_hoesa", "w0407_hwajangsil", "w0408_yeok", "w0409_gada", "w0410_oda"],
    }),
    defineLesson({
      id: "w5-food-drink-01",
      stage: "W5",
      title: "Food and drink",
      subtitle: "Eating essentials",
      goal: "Order water, talk about meals, eat and drink.",
      newWordIds: ["w0501_mul", "w0502_bap", "w0503_eumsik", "w0509_meokda", "w0510_masida"],
    }),
    defineLesson({
      id: "w5-food-drink-02",
      stage: "W5",
      title: "Food and drink II",
      subtitle: "At the café and market",
      goal: "Name common foods and drinks.",
      newWordIds: ["w0504_keopi", "w0505_cha", "w0506_gogi", "w0507_gwail", "w0508_ppang"],
    }),
    defineLesson({
      id: "w6-time-daily-01",
      stage: "W6",
      title: "Time and daily rhythm",
      subtitle: "Yesterday, today, tomorrow",
      goal: "Anchor events in time.",
      newWordIds: ["w0601_oneul", "w0602_naeil", "w0603_eoje", "w0604_jigeum", "w0610_eonje"],
    }),
    defineLesson({
      id: "w6-time-daily-02",
      stage: "W6",
      title: "Time and daily rhythm II",
      subtitle: "Morning to evening",
      goal: "Talk about the parts of the day.",
      newWordIds: ["w0605_sigan", "w0606_achim", "w0607_jeomsim", "w0608_jeonyeok", "w0609_nal"],
    }),
    defineLesson({
      id: "w7-core-actions-01",
      stage: "W7",
      title: "Core actions",
      subtitle: "Do, have, see, speak",
      goal: "Learn the verbs Korean sentences are built on.",
      newWordIds: ["w0701_hada", "w0702_itda", "w0703_eopda", "w0704_boda", "w0705_malhada"],
    }),
    defineLesson({
      id: "w7-core-actions-02",
      stage: "W7",
      title: "Core actions II",
      subtitle: "Daily-life verbs",
      goal: "Buy, meet, sleep, get up, and like.",
      newWordIds: ["w0706_sada", "w0707_mannada", "w0708_jada", "w0709_ireonada", "w0710_joahada"],
    }),
    defineLesson({
      id: "w8-feelings-descriptions-01",
      stage: "W8",
      title: "Feelings and descriptions",
      subtitle: "Good, bad, big, small",
      goal: "Describe things and say what you like.",
      newWordIds: ["w0801_jota", "w0802_silta", "w0803_keuda", "w0804_jakda", "w0809_masitda"],
    }),
    defineLesson({
      id: "w8-feelings-descriptions-02",
      stage: "W8",
      title: "Feelings and descriptions II",
      subtitle: "Many, few, fun, tired",
      goal: "Describe amounts and how you feel.",
      newWordIds: ["w0805_manta", "w0806_jeokda", "w0807_jaemiitda", "w0808_pigonhada", "w0810_yeppeuda"],
    }),
    defineLesson({
      id: "w9-question-words-01",
      stage: "W9",
      title: "Question words",
      subtitle: "Where, why, how",
      goal: "Ask the questions that get you around.",
      newWordIds: ["w0901_eodi", "w0902_wae", "w0903_eotteoke", "w0904_eolma", "w0905_myeot"],
    }),
    defineLesson({
      id: "w9-question-words-02",
      stage: "W9",
      title: "Question words II",
      subtitle: "Which and what kind",
      goal: "Ask about kinds, choices, and degree.",
      newWordIds: ["w0906_museun", "w0907_eotteon", "w0908_eolmana"],
    }),
    defineLesson({
      id: "w10-function-words-01",
      stage: "W10",
      title: "Function words 1",
      subtitle: "The little words that glue Korean together",
      goal: "Meet the topic, subject, and object markers.",
      newWordIds: ["fw1001_eun_neun", "fw1002_i_ga", "fw1003_eul_reul", "fw1004_e", "fw1006_do"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
    defineLesson({
      id: "w10-function-words-02",
      stage: "W10",
      title: "Function words 1 · part 2",
      subtitle: "Where, with, and and",
      goal: "Mark action locations and join words together.",
      newWordIds: ["fw1005_eseo", "fw1007_ui", "fw1008_wa_gwa", "fw1009_hago", "fw1010_go"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),

    defineLesson({
      id: "w11-daily-objects-tech-01",
      stage: "W11",
      title: "Daily objects and technology",
      subtitle: "What's in your bag",
      goal: "Name everyday items you carry and wear.",
      newWordIds: ["w1101_gabang", "w1102_sinbal", "w1103_ot", "w1104_sigye", "w1105_angyeong"],
    }),
    defineLesson({
      id: "w11-daily-objects-tech-02",
      stage: "W11",
      title: "Daily objects and technology II",
      subtitle: "Small essentials",
      goal: "Ask about umbrellas, wallets, and keys.",
      newWordIds: ["w1106_usan", "w1107_jigap", "w1111_yeolsoe", "w1112_jongi", "w1115_gawi"],
    }),
    defineLesson({
      id: "w11-daily-objects-tech-03",
      stage: "W11",
      title: "Daily objects and technology III",
      subtitle: "Screens and devices",
      goal: "Talk about computers, phones, and photos.",
      newWordIds: ["w1108_keompyuteo", "w1109_tellebijeon", "w1110_kamera", "w1118_inteonet", "w1120_sajin"],
    }),
    defineLesson({
      id: "w11-daily-objects-tech-04",
      stage: "W11",
      title: "Daily objects and technology IV",
      subtitle: "Writing and charging",
      goal: "Round out study and tech vocabulary.",
      newWordIds: ["w1113_pen", "w1114_yeonpil", "w1116_baeteori", "w1117_chungjeongi", "w1119_imeil"],
    }),

    defineLesson({
      id: "w12-home-routine-01",
      stage: "W12",
      title: "Home and routine",
      subtitle: "Rooms in the house",
      goal: "Name the rooms and furniture around you.",
      newWordIds: ["w1201_bang", "w1202_chimdae", "w1203_bueok", "w1212_geosil", "w1215_uija", "w_m5_163_geoul"],
    }),
    defineLesson({
      id: "w12-home-routine-02",
      stage: "W12",
      title: "Home and routine II",
      subtitle: "Furniture and fixtures",
      goal: "Name more household objects.",
      newWordIds: ["w1209_otjang", "w1210_changmun", "w1211_mun", "w1213_naengjanggo", "w1216_chaeksang"],
    }),
    defineLesson({
      id: "w12-home-routine-03",
      stage: "W12",
      title: "Home and routine III",
      subtitle: "Your daily habits",
      goal: "Talk about cleaning, washing, and resting at home.",
      newWordIds: ["w1204_cheongsohada", "w1205_ssitda", "w1206_swida", "w1207_yorihada", "w1208_syawohada"],
    }),
    defineLesson({
      id: "w12-home-routine-04",
      stage: "W12",
      title: "Home and routine IV",
      subtitle: "Open, close, on, off",
      goal: "Control the things around your house.",
      newWordIds: ["w1214_siktak", "w1217_yeolda", "w1218_datda", "w1219_kyeoda", "w1220_kkeuda"],
    }),

    defineLesson({
      id: "w13-travel-city-01",
      stage: "W13",
      title: "Travel and city",
      subtitle: "Getting around",
      goal: "Name common ways to travel.",
      newWordIds: ["w1301_gonghang", "w1302_gicha", "w1303_beoseu", "w1304_jihacheol", "w1305_taeksi"],
    }),
    defineLesson({
      id: "w13-travel-city-02",
      stage: "W13",
      title: "Travel and city II",
      subtitle: "Planning a trip",
      goal: "Talk about hotels, tickets, and trips.",
      newWordIds: ["w1306_hotel", "w1307_yeohaeng", "w1308_pyo", "w1311_yeogwon", "w1312_jim"],
    }),
    defineLesson({
      id: "w13-travel-city-03",
      stage: "W13",
      title: "Travel and city III",
      subtitle: "Finding your way",
      goal: "Ask directions and read a map.",
      newWordIds: ["w1309_gil", "w1310_jido", "w1316_gongwon", "w1317_dari", "w1320_geori"],
    }),
    defineLesson({
      id: "w13-travel-city-04",
      stage: "W13",
      title: "Travel and city IV",
      subtitle: "Arriving and departing",
      goal: "Arrive, depart, and book ahead.",
      newWordIds: ["w1313_dochakhada", "w1314_chulbalhada", "w1315_yeyakhada", "w1318_byeong", "w1319_geuncheo"],
    }),

    defineLesson({
      id: "w14-shopping-money-01",
      stage: "W14",
      title: "Shopping and money",
      subtitle: "Paying for things",
      goal: "Talk about money, price, and payment.",
      newWordIds: ["w1401_don", "w1402_gagyeok", "w1403_kadeu", "w1404_hyeongeum", "w1409_gyesanhada"],
    }),
    defineLesson({
      id: "w14-shopping-money-02",
      stage: "W14",
      title: "Shopping and money II",
      subtitle: "Where to shop",
      goal: "Name common places to shop.",
      newWordIds: ["w1410_gage", "w1411_sijang", "w1412_baekhwajeom", "w1413_pyeonuijeom", "w1405_seil"],
    }),
    defineLesson({
      id: "w14-shopping-money-03",
      stage: "W14",
      title: "Shopping and money III",
      subtitle: "Cheap, expensive, and clerks",
      goal: "Describe price and talk with store staff.",
      newWordIds: ["w1407_ssada", "w1408_bissada", "w1414_sonnim", "w1415_jeomwon", "w1416_palda"],
    }),
    defineLesson({
      id: "w14-shopping-money-04",
      stage: "W14",
      title: "Shopping and money IV",
      subtitle: "Sizes, colors, and returns",
      goal: "Handle receipts, exchanges, and refunds.",
      newWordIds: ["w1406_yeongsujeung", "w1417_saijeu", "w1418_saekkal", "w1419_gyohwanhada", "w1420_hwanbulhada"],
    }),

    defineLesson({
      id: "w15-body-health-01",
      stage: "W15",
      title: "Body and health",
      subtitle: "Parts of the body",
      goal: "Name the parts of your body.",
      newWordIds: ["w1501_mom", "w1502_meori", "w1503_son", "w1504_bal", "w1505_eolgul"],
    }),
    defineLesson({
      id: "w15-body-health-02",
      stage: "W15",
      title: "Body and health II",
      subtitle: "More body parts",
      goal: "Round out body vocabulary.",
      newWordIds: ["w1506_bae", "w1512_mok", "w1513_eokkae", "w1514_heori", "w1518_yeol"],
    }),
    defineLesson({
      id: "w15-body-health-03",
      stage: "W15",
      title: "Body and health III",
      subtitle: "Saying what hurts",
      goal: "Say what hurts and how you got hurt.",
      newWordIds: ["w1507_apeuda", "w1511_dachida", "w1517_nupda", "w1510_gamgi", "w1515_geongang"],
    }),
    defineLesson({
      id: "w15-body-health-04",
      stage: "W15",
      title: "Body and health IV",
      subtitle: "Getting help",
      goal: "Find help and take care of yourself.",
      newWordIds: ["w1508_byeongwon", "w1509_yak", "w1519_yakguk", "w1520_uisa", "w1516_undonghada"],
    }),

    defineLesson({
      id: "w16-weather-nature-01",
      stage: "W16",
      title: "Weather and nature",
      subtitle: "Rain or shine",
      goal: "Talk about today's weather.",
      newWordIds: ["w1601_nalssi", "w1602_bi", "w1603_baram", "w1604_deopda", "w1605_chupda"],
    }),
    defineLesson({
      id: "w16-weather-nature-02",
      stage: "W16",
      title: "Weather and nature II",
      subtitle: "Warm and cool",
      goal: "Describe warm and cool weather.",
      newWordIds: ["w1606_ttatteutada", "w1607_siwonhada", "w1608_haneul", "w1616_nun", "w1617_taeyang"],
    }),
    defineLesson({
      id: "w16-weather-nature-03",
      stage: "W16",
      title: "Weather and nature III",
      subtitle: "The four seasons",
      goal: "Name the seasons of the year.",
      newWordIds: ["w1611_gyejeol", "w1612_bom", "w1613_yeoreum", "w1614_gaeul", "w1615_gyeoul"],
    }),
    defineLesson({
      id: "w16-weather-nature-04",
      stage: "W16",
      title: "Weather and nature IV",
      subtitle: "Sky, sea, and trees",
      goal: "Describe the natural world around you.",
      newWordIds: ["w1609_namu", "w1610_kkot", "w1618_dal", "w1619_byeol", "w1620_bada"],
    }),

    // ── Grammar mechanics track (W17–W19): endings, negation, connectives,
    //    noun modification, honorifics, and irregular families. Additive on
    //    top of the thematic core; taught as grammar roles, not vocabulary.
    defineLesson({
      id: "w17-endings-register-01",
      stage: "W17",
      title: "Polite endings and register",
      subtitle: "Casual, polite, and formal force",
      goal: "Contrast sentence endings by politeness and situation.",
      newWordIds: ["fw1701_a_eo", "fw1702_ayo_eoyo", "fw1703_seumnida", "fw1704_neyo", "fw1705_lkkayo", "fw1706_hada_say"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage", "form-recognition", "form-production"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
    defineLesson({
      id: "w17-tense-negation-01",
      stage: "W17",
      title: "Past tense and negation",
      subtitle: "Not, cannot, and the past",
      goal: "Build basic time and negative sentence meanings.",
      newWordIds: ["fw1711_an", "fw1712_mot", "fw1713_ji_anta", "fw1714_ji_mothada", "fw1715_asseoyo"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage", "form-recognition", "form-production"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
    defineLesson({
      id: "w18-connectives-01",
      stage: "W18",
      title: "Connectives and clause chaining",
      subtitle: "Link clauses naturally",
      goal: "Join short Korean clauses with condition, purpose, and reason.",
      newWordIds: ["fw1801_myeon", "fw1802_reo", "fw1803_geona", "fw1804_jamaja", "fw1805_daga", "fw1806_ttaemune", "w1816_boda_try"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage", "form-recognition", "form-production"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
    defineLesson({
      id: "w18-noun-modification-01",
      stage: "W18",
      title: "Noun modification",
      subtitle: "Forms that sit before a noun",
      goal: "Recognize present, past, future, and adjective modifier forms.",
      newWordIds: ["fw1811_neun_mod", "fw1812_eun_verb", "fw1813_eul_prosp", "fw1814_eun_adj", "fw1815_geot"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage", "form-recognition", "form-production"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
    defineLesson({
      id: "w19-honorifics-01",
      stage: "W19",
      title: "Honorifics",
      subtitle: "Respect the subject, not just the listener",
      goal: "Separate the subject honorific marker from listener politeness.",
      newWordIds: ["fw1901_si", "w1902_gyesida", "w1903_deusida", "w1904_jumusida", "w1905_seongham", "w1906_yeonse"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage", "form-recognition", "form-production"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
    defineLesson({
      id: "w19-irregular-families-01",
      stage: "W19",
      title: "Irregular families",
      subtitle: "Trigger-based sound changes",
      goal: "Treat irregular predicates as predictable trigger families.",
      newWordIds: ["w1911_geotda", "w1912_maepda", "w1913_jitda", "w1914_ppalgata", "w1915_ppareuda", "w1916_salda", "w1917_nada_occur", "w1918_nada_sprout"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage", "form-recognition", "form-production"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
      defineLesson({
      id: "w20-theme-01",
      stage: "W20",
      title: "Survival basics Part 1",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for survival basics.",
      newWordIds: ["w_m5_001_il", "w_m5_002_i", "w_m5_003_sam", "w_m5_004_sa", "w_m5_005_o", "w_m5_006_yuk", "w_m5_007_chil"]
    }),
    defineLesson({
      id: "w20-theme-02",
      stage: "W20",
      title: "Survival basics Part 2",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for survival basics.",
      newWordIds: ["w_m5_008_pal", "w_m5_009_gu", "w_m5_010_sip", "w_m5_011_baek", "w_m5_012_cheon", "w_m5_013_man", "w_m5_014_hana"]
    }),
    defineLesson({
      id: "w20-theme-03",
      stage: "W20",
      title: "Survival basics Part 3",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for survival basics.",
      newWordIds: ["w_m5_015_dul", "w_m5_016_set", "w_m5_017_net", "w_m5_018_daseot", "w_m5_019_yeoseot", "w_m5_020_ilgop", "w_m5_021_yeodeolp"]
    }),
    defineLesson({
      id: "w20-theme-04",
      stage: "W20",
      title: "Survival basics Part 4",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for survival basics.",
      newWordIds: ["w_m5_022_ahop", "w_m5_023_yeol", "w_m5_024_seumul", "w_m5_025_seoreun", "w_m5_026_maheun", "w_m5_027_swin"]
    }),
    defineLesson({
      id: "w21-theme-05",
      stage: "W21",
      title: "Building bridge Part 5",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for building bridge.",
      newWordIds: ["w_m5_028_gae", "w_m5_029_myeong", "w_m5_030_beon", "w_m5_031_sal", "w_m5_032_won", "w_m5_033_si", "w_m5_034_bun"]
    }),
    defineLesson({
      id: "w21-theme-06",
      stage: "W21",
      title: "Building bridge Part 6",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for building bridge.",
      newWordIds: ["w_m5_035_mari", "w_m5_036_gwon", "w_m5_037_byeong", "w_m5_038_jan", "w_m5_039_geureut", "w_m5_040_jang", "w_m5_041_dae"]
    }),
    defineLesson({
      id: "w21-theme-07",
      stage: "W21",
      title: "Building bridge Part 7",
      subtitle: "Learn 2 common words",
      goal: "Expand your thematic vocabulary for building bridge.",
      newWordIds: ["w_m5_042_beol", "w_m5_043_kyeolle"]
    }),
    defineLesson({
      id: "w22-theme-08",
      stage: "W22",
      title: "Family and relationship Part 8",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for family and relationship.",
      newWordIds: ["w_m5_044_gajok", "w_m5_045_bumo", "w_m5_046_appa", "w_m5_047_eomma", "w_m5_048_hyeong", "w_m5_049_nuna", "w_m5_050_oppa"]
    }),
    defineLesson({
      id: "w22-theme-09",
      stage: "W22",
      title: "Family and relationship Part 9",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for family and relationship.",
      newWordIds: ["w_m5_051_eonni", "w_m5_052_dongsaeng", "w_m5_053_adeul", "w_m5_054_ttal", "w_m5_055_nampyeon", "w_m5_056_anae", "w_m5_057_halabeoji"]
    }),
    defineLesson({
      id: "w22-theme-10",
      stage: "W22",
      title: "Family and relationship Part 10",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for family and relationship.",
      newWordIds: ["w_m5_058_halmeoni", "w_m5_059_samchon", "w_m5_060_imo", "w_m5_061_gomo", "w_m5_062_sachon", "w_m5_063_joka", "w_m5_402_sikgu", "w_m5_406_daegajok"]
    }),
    defineLesson({
      id: "w23-theme-12",
      stage: "W23",
      title: "Colors of the world Part 12",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for colors of the world.",
      newWordIds: ["w_m5_064_saek", "w_m5_065_hayansaek", "w_m5_066_geomeunsaek", "w_m5_067_ppalgansaek", "w_m5_068_paransaek", "w_m5_069_noransaek", "w_m5_070_choroksaek"]
    }),
    defineLesson({
      id: "w23-theme-13",
      stage: "W23",
      title: "Colors of the world Part 13",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for colors of the world.",
      newWordIds: ["w_m5_071_borasaek", "w_m5_072_galsaek", "w_m5_073_hoesaek", "w_m5_074_juhwangsaek", "w_m5_075_bunhongsaek"]
    }),
    defineLesson({
      id: "w24-theme-14",
      stage: "W24",
      title: "Human body Part 14",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for human body.",
      newWordIds: [   "w_m5_079_ko", "w_m5_080_ip", "w_m5_081_gwi", ]
    }),
    defineLesson({
      id: "w24-theme-15",
      stage: "W24",
      title: "Human body Part 15",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for human body.",
      newWordIds: [  "w_m5_085_pal",    "w_m5_089_gaseum"]
    }),
    defineLesson({
      id: "w24-theme-16",
      stage: "W24",
      title: "Human body Part 16",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for human body.",
      newWordIds: ["w_m5_090_bae", "w_m5_091_songarak", "w_m5_092_balgarak", "w_m5_093_ippal", "w_m5_094_pibu", ]
    }),
    defineLesson({
      id: "w25-theme-17",
      stage: "W25",
      title: "Fashion and clothing Part 17",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for fashion and clothing.",
      newWordIds: [ "w_m5_097_moja", "w_m5_098_baji", "w_m5_099_chima", "w_m5_100_syeocheu", "w_m5_101_yangmal", "w_m5_102_gudu"]
    }),
    defineLesson({
      id: "w25-theme-18",
      stage: "W25",
      title: "Fashion and clothing Part 18",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for fashion and clothing.",
      newWordIds: [ "w_m5_104_koteu", "w_m5_105_tisyeocheu",   "w_m5_108_belteu", "w_m5_109_janggap"]
    }),
    defineLesson({
      id: "w25-theme-19",
      stage: "W25",
      title: "Fashion and clothing Part 19",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for fashion and clothing.",
      newWordIds: ["w_m5_110_mokdori",  "w_m5_112_nektai",  "w_m5_426_hwajangpum", "w_m5_473_sseuda_wear", "w_m5_475_sinda"]
    }),
    defineLesson({
      id: "w25-theme-20",
      stage: "W25",
      title: "Fashion and clothing Part 20",
      subtitle: "Learn 2 common words",
      goal: "Expand your thematic vocabulary for fashion and clothing.",
      newWordIds: ["w_m5_476_ipda", "w_m5_477_beotda"]
    }),
    defineLesson({
      id: "w26-theme-21",
      stage: "W26",
      title: "Nature's animals Part 21",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for nature's animals.",
      newWordIds: ["w_m5_114_dongmul", "w_m5_115_gae", "w_m5_116_goyangi", "w_m5_117_sae", "w_m5_118_mulgogi", "w_m5_119_so", "w_m5_120_dwaeji"]
    }),
    defineLesson({
      id: "w26-theme-22",
      stage: "W26",
      title: "Nature's animals Part 22",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for nature's animals.",
      newWordIds: ["w_m5_121_dak", "w_m5_122_horangi", "w_m5_123_saja", "w_m5_124_tokki", "w_m5_125_gom", "w_m5_126_wonsungi", "w_m5_127_jwi"]
    }),
    defineLesson({
      id: "w26-theme-23",
      stage: "W26",
      title: "Nature's animals Part 23",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for nature's animals.",
      newWordIds: ["w_m5_128_baem", "w_m5_129_yang", "w_m5_130_kokkiri", "w_m5_131_girin", "w_m5_132_mal_animal"]
    }),
    defineLesson({
      id: "w27-theme-24",
      stage: "W27",
      title: "Food and taste Part 24",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for food and taste.",
      newWordIds: ["w_m5_133_banchan",  "w_m5_135_yachae",  "w_m5_137_uyu",  "w_m5_139_gyeran"]
    }),
    defineLesson({
      id: "w27-theme-25",
      stage: "W27",
      title: "Food and taste Part 25",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for food and taste.",
      newWordIds: ["w_m5_140_sogeum", "w_m5_141_seoltang", "w_m5_142_ganjang", "w_m5_143_gochujang", "w_m5_144_chamgireum", "w_m5_145_maneul", "w_m5_146_yangpa"]
    }),
    defineLesson({
      id: "w27-theme-26",
      stage: "W27",
      title: "Food and taste Part 26",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for food and taste.",
      newWordIds: ["w_m5_147_guk", "w_m5_148_jjigae", "w_m5_149_ramyeon", "w_m5_150_chizeu", "w_m5_151_gwaja", "w_m5_152_satang", "w_m5_153_chokollit"]
    }),
    defineLesson({
      id: "w27-theme-27",
      stage: "W27",
      title: "Food and taste Part 27",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for food and taste.",
      newWordIds: ["w_m5_154_juseu", "w_m5_155_maekju", "w_m5_156_soju", "w_m5_390_saengseon", "w_m5_395_saengsu", "w_m5_396_siksa", "w_m5_397_sikdang"]
    }),
    defineLesson({
      id: "w27-theme-28",
      stage: "W27",
      title: "Food and taste Part 28",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for food and taste.",
      newWordIds: ["w_m5_398_hansik", "w_m5_399_yangsik", "w_m5_400_ilsik", "w_m5_401_jungsik", "w_m5_493_gwaja_snack", "w_m5_494_satang_candy", "w_m5_495_chokollit_choco"]
    }),
    defineLesson({
      id: "w27-theme-29",
      stage: "W27",
      title: "Food and taste Part 29",
      subtitle: "Learn 3 common words",
      goal: "Expand your thematic vocabulary for food and taste.",
      newWordIds: ["w_m5_496_juseu_juice", "w_m5_497_maekju_beer", "w_m5_498_soju_soju"]
    }),
    defineLesson({
      id: "w28-theme-31",
      stage: "W28",
      title: "Home routine Part 31",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for home routine.",
      newWordIds: ["w_m5_164_jeondeung",  "w_m5_166_setakgi",  "w_m5_168_jeonhwagi", "w_m5_169_sopa", ]
    }),
    defineLesson({
      id: "w28-theme-32",
      stage: "W28",
      title: "Home routine Part 32",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for home routine.",
      newWordIds: ["w_m5_171_hwabun", "w_m5_172_begae", "w_m5_173_ibul",  "w_m5_175_hyuji", "w_m5_176_sugeon", "w_m5_177_binu"]
    }),
    defineLesson({
      id: "w28-theme-33",
      stage: "W28",
      title: "Home routine Part 33",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for home routine.",
      newWordIds: ["w_m5_178_chiyak", "w_m5_179_chitsol", "w_m5_180_syampu", "w_m5_388_saenghwal", "w_m5_407_daemun",  "w_m5_432_gongdong"]
    }),
    defineLesson({
      id: "w28-theme-34",
      stage: "W28",
      title: "Home routine Part 34",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for home routine.",
      newWordIds: ["w_m5_499_sugeon_towel", "w_m5_500_binu_soap", "w_m5_501_chiyak_paste", "w_m5_502_chitsol_brush", "w_m5_503_syampu_shampoo",  "w_m5_505_kal"]
    }),
    defineLesson({
      id: "w28-theme-35",
      stage: "W28",
      title: "Home routine Part 35",
      subtitle: "Learn 2 common words",
      goal: "Expand your thematic vocabulary for home routine.",
      newWordIds: ["w_m5_506_teipeu", "w_m5_507_sseuregitong"]
    }),
    defineLesson({
      id: "w29-theme-36",
      stage: "W29",
      title: "Travel and city places Part 36",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_181_gyotong",   "w_m5_184_bihaenggi", "w_m5_185_jajeongeo",  "w_m5_187_jeongryujang"]
    }),
    defineLesson({
      id: "w29-theme-37",
      stage: "W29",
      title: "Travel and city places Part 37",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: [  "w_m5_190_otobai", "w_m5_191_bae_boat",  "w_m5_193_unjeon", "w_m5_194_sinhodeung"]
    }),
    defineLesson({
      id: "w29-theme-38",
      stage: "W29",
      title: "Travel and city places Part 38",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_195_dosi",  "w_m5_197_mateu", "w_m5_198_eunhaeng",   "w_m5_201_ucheguk"]
    }),
    defineLesson({
      id: "w29-theme-39",
      stage: "W29",
      title: "Travel and city places Part 39",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_202_seojeom", "w_m5_203_geukjang", "w_m5_204_hotel", "w_m5_376_jungguk", "w_m5_377_miguk", "w_m5_378_yeongguk", "w_m5_379_ilbon"]
    }),
    defineLesson({
      id: "w29-theme-40",
      stage: "W29",
      title: "Travel and city places Part 40",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_380_oeguk", "w_m5_381_oegugeo", "w_m5_382_gukga", "w_m5_383_gungnae", "w_m5_384_gungmin", "w_m5_385_taeguk", "w_m5_393_balsaeng"]
    }),
    defineLesson({
      id: "w29-theme-41",
      stage: "W29",
      title: "Travel and city places Part 41",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_412_munhwa", "w_m5_421_hwajae", "w_m5_428_jadongcha", "w_m5_443_gyohoe", "w_m5_444_seongdang", "w_m5_445_sachal", "w_m5_446_bangmulgwan"]
    }),
    defineLesson({
      id: "w29-theme-42",
      stage: "W29",
      title: "Travel and city places Part 42",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_447_misulgwan", "w_m5_448_suyeongjang", "w_m5_449_cheyukgwan", "w_m5_450_helseujang", "w_m5_451_noraebang", "w_m5_452_yeonghwagwan", ]
    }),
    defineLesson({
      id: "w29-theme-43",
      stage: "W29",
      title: "Travel and city places Part 43",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_454_juyuso", "w_m5_455_gyeongchalseo", "w_m5_456_sobangseo", "w_m5_457_sicheong", "w_m5_458_gucheong", "w_m5_508_hotel_stay", "w_m5_509_suyeongjang_pool"]
    }),
    defineLesson({
      id: "w29-theme-44",
      stage: "W29",
      title: "Travel and city places Part 44",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_510_noraebang_karaoke", "w_m5_511_geukjang_cinema", "w_m5_512_gongwon_park", "w_m5_513_sikdang_eatery", "w_m5_514_kape_cafe", "w_m5_515_hoesa_office"]
    }),
    defineLesson({
      id: "w30-theme-45",
      stage: "W30",
      title: "Nature and landscape Part 45",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for nature and landscape.",
      newWordIds: [ "w_m5_206_hae_sun", "w_m5_207_gureum",  "w_m5_209_ondo", "w_m5_210_san", "w_m5_211_gang"]
    }),
    defineLesson({
      id: "w30-theme-46",
      stage: "W30",
      title: "Nature and landscape Part 46",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for nature and landscape.",
      newWordIds: ["w_m5_212_dol", "w_m5_213_heuk", "w_m5_214_sup", "w_m5_215_morae", "w_m5_216_ssiat", "w_m5_389_saengmyeong", "w_m5_422_hwacho"]
    }),
    defineLesson({
      id: "w30-theme-47",
      stage: "W30",
      title: "Nature and landscape Part 47",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for nature and landscape.",
      newWordIds: ["w_m5_423_byeonhwa", "w_m5_431_dongjjok", "w_m5_479_naerida_fall", "w_m5_516_gang_river", "w_m5_517_bada_sea", "w_m5_518_namu_tree", "w_m5_519_kkot_flower"]
    }),
    defineLesson({
      id: "w30-theme-48",
      stage: "W30",
      title: "Nature and landscape Part 48",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for nature and landscape.",
      newWordIds: ["w_m5_520_pul_grass", "w_m5_521_dol_stone", "w_m5_522_heuk_soil", "w_m5_523_sup_woods", "w_m5_524_morae_sand", "w_m5_525_namunnip", "w_m5_526_ssiat_seed"]
    }),
    defineLesson({
      id: "w31-theme-49",
      stage: "W31",
      title: "Time and calendar Part 49",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for time and calendar.",
      newWordIds: ["w_m5_217_cho", "w_m5_218_ju_week", "w_m5_219_saebyeok", "w_m5_220_ojeon", "w_m5_221_ohu", "w_m5_222_haru", "w_m5_223_maeil"]
    }),
    defineLesson({
      id: "w31-theme-50",
      stage: "W31",
      title: "Time and calendar Part 50",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for time and calendar.",
      newWordIds: ["w_m5_224_ibeon", "w_m5_225_jinan", "w_m5_226_daeum", "w_m5_227_dallyeok", "w_m5_228_olhae", "w_m5_229_naenyeon", "w_m5_230_pyeongil"]
    }),
    defineLesson({
      id: "w31-theme-51",
      stage: "W31",
      title: "Time and calendar Part 51",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for time and calendar.",
      newWordIds: ["w_m5_231_gonghyuil", "w_m5_232_hyuga", "w_m5_386_saengil", "w_m5_387_insaeng", "w_m5_420_hwayoil", "w_m5_527_pyeongil_weekday", "w_m5_528_gonghyuil_holiday"]
    }),
    defineLesson({
      id: "w31-theme-52",
      stage: "W31",
      title: "Time and calendar Part 52",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for time and calendar.",
      newWordIds: ["w_m5_529_hyuga_vacation", "w_m5_530_banghak_break", "w_m5_531_maeil_daily", "w_m5_532_ibeon_this", "w_m5_533_jinan_last", "w_m5_534_daeum_next"]
    }),
    defineLesson({
      id: "w32-theme-53",
      stage: "W32",
      title: "Study and class life Part 53",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for study and class life.",
      newWordIds: ["w_m5_233_gongchaek",   "w_m5_236_sukje", "w_m5_237_chilpan", "w_m5_238_seongjeok", "w_m5_239_gyosil"]
    }),
    defineLesson({
      id: "w32-theme-54",
      stage: "W32",
      title: "Study and class life Part 54",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for study and class life.",
      newWordIds: ["w_m5_240_gyogwaseo", "w_m5_241_piltong", "w_m5_242_jiugae",   "w_m5_368_hagwon", "w_m5_369_suhak"]
    }),
    defineLesson({
      id: "w32-theme-55",
      stage: "W32",
      title: "Study and class life Part 55",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for study and class life.",
      newWordIds: ["w_m5_370_gwahak", "w_m5_371_hakgi", "w_m5_372_janghakgeum", "w_m5_373_yuhak", "w_m5_374_iphak", "w_m5_375_joreop", "w_m5_403_daehakgyo"]
    }),
    defineLesson({
      id: "w32-theme-56",
      stage: "W32",
      title: "Study and class life Part 56",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for study and class life.",
      newWordIds: ["w_m5_404_daehaksaeng", "w_m5_410_daedap", "w_m5_411_munjang_sino", "w_m5_413_munhak", "w_m5_414_mungu", "w_m5_415_munseo", "w_m5_416_hanmun"]
    }),
    defineLesson({
      id: "w32-theme-57",
      stage: "W32",
      title: "Study and class life Part 57",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for study and class life.",
      newWordIds: ["w_m5_417_sinmun", "w_m5_418_jilmun_sino", "w_m5_425_hoehwa", "w_m5_429_hwalldong", "w_m5_535_jilmun_question", "w_m5_536_daedap_answer", "w_m5_537_seongjeok_grades"]
    }),
    defineLesson({
      id: "w32-theme-58",
      stage: "W32",
      title: "Study and class life Part 58",
      subtitle: "Learn 2 common words",
      goal: "Expand your thematic vocabulary for study and class life.",
      newWordIds: ["w_m5_538_gyosil_classroom", "w_m5_539_jiugae_eraser"]
    }),
    defineLesson({
      id: "w33-theme-59",
      stage: "W33",
      title: "Hobbies and leisure Part 59",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for hobbies and leisure.",
      newWordIds: ["w_m5_243_chwimi", "w_m5_244_dokseo", "w_m5_245_sajin", "w_m5_246_yori", "w_m5_247_naksi", "w_m5_248_deungsan", "w_m5_249_geim"]
    }),
    defineLesson({
      id: "w33-theme-60",
      stage: "W33",
      title: "Hobbies and leisure Part 60",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for hobbies and leisure.",
      newWordIds: ["w_m5_250_geurim", "w_m5_251_akgi", "w_m5_252_piano", "w_m5_253_gita_instrument", "w_m5_424_yeonghwa", "w_m5_459_deungsan_hobby", "w_m5_460_dokseo_hobby"]
    }),
    defineLesson({
      id: "w33-theme-61",
      stage: "W33",
      title: "Hobbies and leisure Part 61",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for hobbies and leisure.",
      newWordIds: ["w_m5_461_yeohaeng_hobby", "w_m5_462_sajin_hobby", "w_m5_463_naksi_hobby", "w_m5_464_geurim_hobby", "w_m5_465_yori_hobby", "w_m5_466_akgi_hobby", "w_m5_467_norae_hobby"]
    }),
    defineLesson({
      id: "w33-theme-62",
      stage: "W33",
      title: "Hobbies and leisure Part 62",
      subtitle: "Learn 4 common words",
      goal: "Expand your thematic vocabulary for hobbies and leisure.",
      newWordIds: ["w_m5_468_yeonghwa_hobby", "w_m5_469_gongyeon", "w_m5_470_jeonsihoe", "w_m5_471_eumakhoe"]
    }),
    defineLesson({
      id: "w34-theme-63",
      stage: "W34",
      title: "Active sports Part 63",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for active sports.",
      newWordIds: ["w_m5_254_chukgu", "w_m5_255_yagu", "w_m5_256_nonggu", "w_m5_257_baegu", "w_m5_258_teniseu", "w_m5_259_baedeuminteon", "w_m5_260_suyeong_sport"]
    }),
    defineLesson({
      id: "w34-theme-64",
      stage: "W34",
      title: "Active sports Part 64",
      subtitle: "Learn 3 common words",
      goal: "Expand your thematic vocabulary for active sports.",
      newWordIds: ["w_m5_261_dalligi", "w_m5_408_daehoe", "w_m5_427_undong"]
    }),
    defineLesson({
      id: "w35-theme-65",
      stage: "W35",
      title: "Jobs and careers Part 65",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for jobs and careers.",
      newWordIds: ["w_m5_262_jigeop", "w_m5_263_hoesawon", "w_m5_264_gongmuwon",  "w_m5_266_ganhosa", "w_m5_267_yaksa", "w_m5_268_gyeongchalgwan"]
    }),
    defineLesson({
      id: "w35-theme-66",
      stage: "W35",
      title: "Jobs and careers Part 66",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for jobs and careers.",
      newWordIds: ["w_m5_269_sobanggwan", "w_m5_270_gunin", "w_m5_271_gasu", "w_m5_272_baeu", "w_m5_273_jakga", "w_m5_274_yorisa", "w_m5_275_gija"]
    }),
    defineLesson({
      id: "w35-theme-67",
      stage: "W35",
      title: "Jobs and careers Part 67",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for jobs and careers.",
      newWordIds: ["w_m5_391_saengsan", "w_m5_405_daetongnyeong", "w_m5_409_daepyo", "w_m5_433_gwahakja", "w_m5_434_nongbu", "w_m5_435_eobu", "w_m5_436_gyeongchal"]
    }),
    defineLesson({
      id: "w35-theme-68",
      stage: "W35",
      title: "Jobs and careers Part 68",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for jobs and careers.",
      newWordIds: ["w_m5_437_sobangdaewon", "w_m5_438_eunhaengwon", "w_m5_439_biseo", "w_m5_440_miyongsa", "w_m5_441_ganhowon", "w_m5_442_yakjesa"]
    }),
    defineLesson({
      id: "w36-theme-69",
      stage: "W36",
      title: "Everyday actions Part 69",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_276_danida", "w_m5_277_nagada", "w_m5_278_deureooda", "w_m5_279_doragada", "w_m5_280_ttwida", "w_m5_281_ollagada", "w_m5_282_naeryeogada"]
    }),
    defineLesson({
      id: "w36-theme-70",
      stage: "W36",
      title: "Everyday actions Part 70",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: [   "w_m5_286_mandeulda", "w_m5_287_ireonada",  ]
    }),
    defineLesson({
      id: "w36-theme-71",
      stage: "W36",
      title: "Everyday actions Part 71",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_290_swida",  "w_m5_292_ppallaehada",   "w_m5_295_gidarida", "w_m5_296_baeuda"]
    }),
    defineLesson({
      id: "w36-theme-72",
      stage: "W36",
      title: "Everyday actions Part 72",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_297_gareuchida", "w_m5_298_saenggakhada", "w_m5_299_mureoboda", "w_m5_300_iyagihada", "w_m5_301_jeonhwahada", "w_m5_302_bonaeda", "w_m5_303_batda"]
    }),
    defineLesson({
      id: "w36-theme-73",
      stage: "W36",
      title: "Everyday actions Part 73",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_304_dowajuda",  "w_m5_306_sesuhada", "w_m5_307_yangchihada", "w_m5_308_hwajanghada", "w_m5_309_myeondohada", "w_m5_310_chulgeunhada"]
    }),
    defineLesson({
      id: "w36-theme-74",
      stage: "W36",
      title: "Everyday actions Part 74",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_311_toegeunhada", "w_m5_312_ilhada", "w_m5_313_nolda", "w_m5_314_utda", "w_m5_315_ulda", "w_m5_316_tada", "w_m5_317_naerida"]
    }),
    defineLesson({
      id: "w36-theme-75",
      stage: "W36",
      title: "Everyday actions Part 75",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_318_sijakhada", "w_m5_319_kkeunnada", "w_m5_320_saranghada",  "w_m5_322_sireohada", "w_m5_323_chukhahada", "w_m5_324_noraehada"]
    }),
    defineLesson({
      id: "w36-theme-76",
      stage: "W36",
      title: "Everyday actions Part 76",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_392_saenggak", "w_m5_430_haengdong", "w_m5_472_ireonada_stand", "w_m5_474_sseuda_use", "w_m5_478_tada_burn", "w_m5_480_danida_attend", "w_m5_481_bureuda"]
    }),
    defineLesson({
      id: "w37-theme-77",
      stage: "W37",
      title: "Descriptions and feelings Part 77",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_325_neopda", "w_m5_326_jopda", "w_m5_327_nopda", "w_m5_328_natda", "w_m5_329_neopda_wide", "w_m5_330_saeropda", "w_m5_331_oraedoeda"]
    }),
    defineLesson({
      id: "w37-theme-78",
      stage: "W37",
      title: "Descriptions and feelings Part 78",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_332_madeopda",   "w_m5_335_hangahada", "w_m5_336_neurida",  ]
    }),
    defineLesson({
      id: "w37-theme-79",
      stage: "W37",
      title: "Descriptions and feelings Part 79",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_339_eodupda", "w_m5_340_bakda", "w_m5_341_kkaekkeuthada", "w_m5_342_deoreopda", "w_m5_343_gwiyeopda", "w_m5_344_pyeonhada", "w_m5_345_bulpyeonhada"]
    }),
    defineLesson({
      id: "w37-theme-80",
      stage: "W37",
      title: "Descriptions and feelings Part 80",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_346_gippeuda", "w_m5_347_seulpeuda", "w_m5_348_haengbokhada", "w_m5_349_geonganghada", "w_m5_350_teunteunhada", "w_m5_351_yakhada", "w_m5_352_joyonghada"]
    }),
    defineLesson({
      id: "w37-theme-81",
      stage: "W37",
      title: "Descriptions and feelings Part 81",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_353_sikkeureopda", "w_m5_354_chinjeolhada", "w_m5_355_ttokttokhada", "w_m5_482_bureuda_full",  "w_m5_484_bappuda_busy", "w_m5_485_yeppeuda_pretty"]
    }),
    defineLesson({
      id: "w37-theme-82",
      stage: "W37",
      title: "Descriptions and feelings Part 82",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_486_seulpeuda_sad", "w_m5_487_gippeuda_glad", "w_m5_488_nappuda_bad", "w_m5_489_keuda_big", "w_m5_490_jakda_small", "w_m5_491_gopeuda", "w_m5_492_gichada"]
    }),
    defineLesson({
      id: "w38-theme-83",
      stage: "W38",
      title: "Asking questions Part 83",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for asking questions.",
      newWordIds: [ "w_m5_357_eonje",   "w_m5_360_mueot", "w_m5_361_eoneu", "w_m5_362_igeot"]
    }),
    defineLesson({
      id: "w38-theme-84",
      stage: "W38",
      title: "Asking questions Part 84",
      subtitle: "Learn 3 common words",
      goal: "Expand your thematic vocabulary for asking questions.",
      newWordIds: ["w_m5_363_geugeot", "w_m5_364_jeogeot", ]
    }),
    defineLesson({
      id: "w39-theme-85",
      stage: "W39",
      title: "Body health",
      subtitle: "Learn 1 common words",
      goal: "Expand your thematic vocabulary for body health.",
      newWordIds: ["w_m5_394_wisaeng"]
    }),
  ];
})();
