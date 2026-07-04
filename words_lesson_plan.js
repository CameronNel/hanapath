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
      newWordIds: ["w0401_yeogi", "w0402_geogi", "w0403_jeogi", "w0404_jip", "w0405_hakgyo", "w_m6_2983_seoda_stop", "w_m6_3051_seuda_stop"],
    }),
    defineLesson({
      id: "w4-places-movement-02",
      stage: "W4",
      title: "Places and movement II",
      subtitle: "Going and coming",
      goal: "Find the bathroom, find the station, go and come.",
      newWordIds: ["w0406_hoesa", "w0407_hwajangsil", "w0408_yeok", "w0409_gada", "w0410_oda", "w_m6_3046_naoda_exit", "w_m6_2988_dolda_turn"],
    }),
    defineLesson({
      id: "w5-food-drink-01",
      stage: "W5",
      title: "Food and drink",
      subtitle: "Eating essentials",
      goal: "Order water, talk about meals, eat and drink.",
      newWordIds: ["w0501_mul", "w0502_bap", "w_m6_3005_bap_rice", "w0503_eumsik", "w0509_meokda", "w0510_masida", "w_m6_2995_chada_full", "w_m6_3059_dalda_sweet"],
    }),
    defineLesson({
      id: "w5-food-drink-02",
      stage: "W5",
      title: "Food and drink II",
      subtitle: "At the café and market",
      goal: "Name common foods and drinks.",
      newWordIds: ["w0504_keopi", "w0505_cha", "w0506_gogi", "w0507_gwail", "w0508_ppang", "w_m6_3004_sosig_eating"],
    }),
    defineLesson({
      id: "w6-time-daily-01",
      stage: "W6",
      title: "Time and daily rhythm",
      subtitle: "Yesterday, today, tomorrow",
      goal: "Anchor events in time.",
      newWordIds: ["w0601_oneul", "w0602_naeil", "w0603_eoje", "w0604_jigeum", "w0610_eonje", "w_m6_2972_gada_time"],
    }),
    defineLesson({
      id: "w6-time-daily-02",
      stage: "W6",
      title: "Time and daily rhythm II",
      subtitle: "Morning to evening",
      goal: "Talk about the parts of the day.",
      newWordIds: ["w0605_sigan", "w_m6_3006_sigan_hour", "w0606_achim", "w_m6_3007_achim_breakfast", "w0607_jeomsim", "w_m6_3008_jeomsim_noon", "w_m6_3032_jungsik_lunch", "w0608_jeonyeok", "w_m6_3009_jeonyeok_dinner", "w0609_nal", "w_m6_2976_geollida_time"],
    }),
    defineLesson({
      id: "w7-core-actions-01",
      stage: "W7",
      title: "Core actions",
      subtitle: "Do, have, see, speak",
      goal: "Learn the verbs Korean sentences are built on.",
      newWordIds: ["w0701_hada", "w0702_itda", "w_m6_3027_itda_exist", "w0703_eopda", "w_m6_3028_eopda_absent", "w0704_boda", "w0705_malhada", "w_m2_japda_set_arrange", "w_m6_2974_deulda_hold", "w_m6_2990_jaeda_measure", "w_m6_3064_seda_count"],
    }),
    defineLesson({
      id: "w7-core-actions-02",
      stage: "W7",
      title: "Core actions II",
      subtitle: "Daily-life verbs",
      goal: "Buy, meet, sleep, get up, and like.",
      newWordIds: ["w0706_sada", "w0707_mannada", "w0708_jada", "w0709_ireonada", "w0710_joahada", "w_m6_2982_seoda_stand", "w_m6_3049_nohda_release", "w_m6_3050_seuda_erect", "w_m6_2993_jjada_plan"],
    }),
    defineLesson({
      id: "w8-feelings-descriptions-01",
      stage: "W8",
      title: "Feelings and descriptions",
      subtitle: "Good, bad, big, small",
      goal: "Describe things and say what you like.",
      newWordIds: ["w0801_jota", "w0802_silta", "w0803_keuda", "w_m2_keuda_grow_up", "w0804_jakda", "w0809_masitda", "w_m6_2991_jaeda_hesitant"],
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
      newWordIds: ["w0901_eodi", "w0902_wae", "w0903_eotteoke", "w0904_eolma", "w0905_myeot", "w0906_museun", "w0907_eotteon", "w0908_eolmana"],
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
      newWordIds: ["w1101_gabang", "w1102_sinbal", "w1103_ot", "w1104_sigye", "w_m6_3019_sigye_watch", "w1105_angyeong", "w_m6_2981_geolda_call"],
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
      newWordIds: ["w1108_keompyuteo", "w1109_tellebijeon", "w_m6_3047_naoda_media", "w1110_kamera", "w1118_inteonet", "w_m6_3052_kkeunhda_cutoff", "w1120_sajin"],
    }),
    defineLesson({
      id: "w11-daily-objects-tech-04",
      stage: "W11",
      title: "Daily objects and technology IV",
      subtitle: "Writing and charging",
      goal: "Round out study and tech vocabulary.",
      newWordIds: ["w1113_pen", "w1114_yeonpil", "w1116_baeteori", "w1117_chungjeongi", "w_m6_3054_ppaeda_remove", "w1119_imeil"],
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
      newWordIds: ["w1209_otjang", "w1210_changmun", "w1211_mun", "w1213_naengjanggo", "w1216_chaeksang", "w_m6_3048_nohda_put", "w_m6_3065_duda_put", "w_m6_3066_duda_leave", "w_m6_2973_ssada_pack"],
    }),
    defineLesson({
      id: "w12-home-routine-03",
      stage: "W12",
      title: "Home and routine III",
      subtitle: "Your daily habits",
      goal: "Talk about cleaning, washing, and resting at home.",
      newWordIds: ["w1204_cheongsohada", "w1205_ssitda", "w1206_swida", "w1207_yorihada", "w1208_syawohada", "w_m6_3058_gamda_wash_hair", "w_m6_2980_geolda_hang", "w_m2_swida_breathe"],
    }),
    defineLesson({
      id: "w12-home-routine-04",
      stage: "W12",
      title: "Home and routine IV",
      subtitle: "Open, close, on, off",
      goal: "Control the things around your house.",
      newWordIds: ["w1214_siktak", "w1217_yeolda", "w1218_datda", "w1219_kyeoda", "w1220_kkeuda", "w_m6_3060_dalda_hang", "w_m6_2998_butda_stick", "w_m2_yeolda_hold_event"],
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
      newWordIds: ["w1309_gil", "w_m2_gil_way_method", "w1310_jido", "w1316_gongwon", "w1317_dari", "w1320_geori", "w_m2_geori_street"],
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
      newWordIds: ["w1401_don", "w1402_gagyeok", "w1403_kadeu", "w1404_hyeongeum", "w1409_gyesanhada", "w_m6_3055_ppaeda_subtract", "w_m6_2975_deulda_cost", "w_m6_3026_tonghwa_currency", "w_m6_3043_tteoreojida_runout"],
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
      newWordIds: ["w1407_ssada", "w1408_bissada", "w_m6_3045_oreuda_rise", "w1414_sonnim", "w1415_jeomwon", "w1416_palda"],
    }),
    defineLesson({
      id: "w14-shopping-money-04",
      stage: "W14",
      title: "Shopping and money IV",
      subtitle: "Sizes, colors, and returns",
      goal: "Handle receipts, exchanges, and refunds.",
      newWordIds: ["w1406_yeongsujeung", "w1417_saijeu", "w1418_saekkal", "w1419_gyohwanhada", "w_m6_3056_namda_remain", "w1420_hwanbulhada"],
    }),

    defineLesson({
      id: "w15-body-health-01",
      stage: "W15",
      title: "Body and health",
      subtitle: "Parts of the body",
      goal: "Name the parts of your body.",
      newWordIds: ["w1501_mom", "w1502_meori", "w_m6_3020_meori_hair", "w1503_son", "w1504_bal", "w1505_eolgul", "w_m6_3057_gamda_close_eyes", "w_m6_2977_geollida_ill"],
    }),
    defineLesson({
      id: "w15-body-health-02",
      stage: "W15",
      title: "Body and health II",
      subtitle: "More body parts",
      goal: "Round out body vocabulary.",
      newWordIds: ["w1506_bae", "w1512_mok", "w_m6_3021_mok_neck", "w1513_eokkae", "w1514_heori", "w1518_yeol"],
    }),
    defineLesson({
      id: "w15-body-health-03",
      stage: "W15",
      title: "Body and health III",
      subtitle: "Saying what hurts",
      goal: "Say what hurts and how you got hurt.",
      newWordIds: ["w1507_apeuda", "w1511_dachida", "w1517_nupda", "w1510_gamgi", "w_m6_3053_kkeunhda_quit", "w1515_geongang"],
    }),
    defineLesson({
      id: "w15-body-health-04",
      stage: "W15",
      title: "Body and health IV",
      subtitle: "Getting help",
      goal: "Find help and take care of yourself.",
      newWordIds: ["w1508_byeongwon", "w1509_yak", "w_m6_3010_byeong_illness", "w1519_yakguk", "w1520_uisa", "w1516_undonghada"],
    }),

    defineLesson({
      id: "w16-weather-nature-01",
      stage: "W16",
      title: "Weather and nature",
      subtitle: "Rain or shine",
      goal: "Talk about today's weather.",
      newWordIds: ["w1601_nalssi", "w_m6_3011_ilgi_weather", "w1602_bi", "w1603_baram", "w1604_deopda", "w1605_chupda", "w_m6_3063_seda_strong", "w_m6_2979_jida_sunset"],
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
      newWordIds: ["w1609_namu", "w1610_kkot", "w1618_dal", "w1619_byeol", "w1620_bada", "w_m6_3001_yeongi_smoke"],
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
      newWordIds: ["fw1811_neun_mod", "fw1812_eun_verb", "fw1813_eul_prosp", "fw1814_eun_adj", "fw1815_geot", "w_m6_3025_sae_new"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage", "form-recognition", "form-production"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
    defineLesson({
      id: "w19-honorifics-01",
      stage: "W19",
      title: "Honorifics",
      subtitle: "Respect the subject, not just the listener",
      goal: "Separate the subject honorific marker from listener politeness.",
      newWordIds: ["fw1901_si", "w1902_gyesida", "w1903_deusida", "w1904_jumusida", "w1905_seongham", "w1906_yeonse", "w_m6_3023_bun_honorific"],
      checkpoints: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage", "form-recognition", "form-production"],
      pass: { minFirstTryPct: 60, requireTypedAttempt: false },
    }),
    defineLesson({
      id: "w19-irregular-families-01",
      stage: "W19",
      title: "Irregular families",
      subtitle: "Trigger-based sound changes",
      goal: "Treat irregular predicates as predictable trigger families.",
      newWordIds: ["w1911_geotda", "w1912_maepda", "w1913_jitda", "w1914_ppalgata", "w1915_ppareuda", "w1916_salda", "w1917_nada_occur", "w1918_nada_sprout", "w_m2_jitda_make_prepare", "w_m2_salda_be_alive"],
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
      subtitle: "Learn 9 common words",
      goal: "Expand your thematic vocabulary for building bridge.",
      newWordIds: ["w_m5_035_mari", "w_m5_036_gwon", "w_m5_037_byeong", "w_m5_038_jan", "w_m5_039_geureut", "w_m5_040_jang", "w_m5_041_dae", "w_m5_042_beol", "w_m5_043_kyeolle"]
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
      subtitle: "Learn 8 common words",
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
      id: "w24-theme-15",
      stage: "W24",
      title: "Human body Part 15",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for human body.",
      newWordIds: [  "w_m5_085_pal",    "w_m5_089_gaseum", "w_m6_3022_gaseum_chest", "w_m6_2967_dari_leg", "w_m6_2968_nun_eye"]
    }),
    defineLesson({
      id: "w24-theme-16",
      stage: "W24",
      title: "Human body Part 16",
      subtitle: "Learn 8 common words",
      goal: "Expand your thematic vocabulary for human body.",
      newWordIds: ["w1506_bae", "w_m5_091_songarak", "w_m5_092_balgarak", "w_m5_093_ippal", "w_m5_094_pibu", "w_m5_079_ko", "w_m5_080_ip", "w_m5_081_gwi"]
    }),
    defineLesson({
      id: "w25-theme-17",
      stage: "W25",
      title: "Fashion and clothing Part 17",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for fashion and clothing.",
      newWordIds: [ "w_m5_097_moja", "w_m5_098_baji", "w_m5_099_chima", "w_m5_100_syeocheu", "w_m5_101_yangmal", "w_m5_102_gudu"]
    }),
    defineLesson({
      id: "w25-theme-18",
      stage: "W25",
      title: "Fashion and clothing Part 18",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for fashion and clothing.",
      newWordIds: ["w_m5_104_koteu", "w_m5_105_tisyeocheu", "w_m5_108_belteu", "w_m5_109_janggap", "w_m5_476_ipda", "w_m5_477_beotda"]
    }),
    defineLesson({
      id: "w25-theme-19",
      stage: "W25",
      title: "Fashion and clothing Part 19",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for fashion and clothing.",
      newWordIds: ["w_m5_110_mokdori",  "w_m5_112_nektai",  "w_m5_426_hwajangpum", "w_m5_473_sseuda_wear", "w_m5_475_sinda"]
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
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for food and taste.",
      newWordIds: ["w_m5_133_banchan", "w_m5_135_yachae", "w_m5_137_uyu", "w_m5_139_gyeran", "w_m6_2992_jjada_salty"]
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
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for food and taste.",
      newWordIds: ["w_m5_398_hansik", "w_m5_399_yangsik", "w_m5_400_ilsik", "w_m5_401_jungsik", "w_m6_2969_bam_chestnut"]
    }),
        defineLesson({
      id: "w28-theme-31",
      stage: "W28",
      title: "Home routine Part 31",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for home routine.",
      newWordIds: ["w_m5_164_jeondeung", "w_m5_166_setakgi", "w_m5_168_jeonhwagi", "w_m5_169_sopa", "w_m5_505_kal"]
    }),
    defineLesson({
      id: "w28-theme-32",
      stage: "W28",
      title: "Home routine Part 32",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for home routine.",
      newWordIds: ["w_m5_171_hwabun", "w_m5_172_begae", "w_m5_173_ibul",  "w_m5_175_hyuji", "w_m5_176_sugeon", "w_m5_177_binu"]
    }),
    defineLesson({
      id: "w28-theme-33",
      stage: "W28",
      title: "Home routine Part 33",
      subtitle: "Learn 8 common words",
      goal: "Expand your thematic vocabulary for home routine.",
      newWordIds: ["w_m5_178_chiyak", "w_m5_179_chitsol", "w_m5_180_syampu", "w_m5_388_saenghwal", "w_m5_407_daemun", "w_m5_432_gongdong", "w_m5_506_teipeu", "w_m5_507_sseuregitong"]
    }),
            defineLesson({
      id: "w29-theme-36",
      stage: "W29",
      title: "Travel and city places Part 36",
      subtitle: "Learn 4 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_181_gyotong",   "w_m5_184_bihaenggi", "w_m5_185_jajeongeo",  "w_m5_187_jeongryujang"]
    }),
    defineLesson({
      id: "w29-theme-37",
      stage: "W29",
      title: "Travel and city places Part 37",
      subtitle: "Learn 4 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: [  "w_m5_190_otobai", "w_m5_191_bae_boat",  "w_m5_193_unjeon", "w_m5_194_sinhodeung"]
    }),
    defineLesson({
      id: "w29-theme-38",
      stage: "W29",
      title: "Travel and city places Part 38",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_195_dosi", "w_m5_197_mateu", "w_m5_198_eunhaeng", "w_m5_201_ucheguk", "w_m5_514_kape_cafe", "w_m6_2966_cha_car"]
    }),
    defineLesson({
      id: "w29-theme-39",
      stage: "W29",
      title: "Travel and city places Part 39",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_202_seojeom", "w_m5_203_geukjang", "w_m5_376_jungguk", "w_m5_377_miguk", "w_m5_378_yeongguk", "w_m5_379_ilbon"]
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
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_447_misulgwan", "w_m5_448_suyeongjang", "w_m5_449_cheyukgwan", "w_m5_450_helseujang", "w_m5_451_noraebang", "w_m5_452_yeonghwagwan", ]
    }),
    defineLesson({
      id: "w29-theme-43",
      stage: "W29",
      title: "Travel and city places Part 43",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for travel and city places.",
      newWordIds: ["w_m5_454_juyuso", "w_m5_455_gyeongchalseo", "w_m5_456_sobangseo", "w_m5_457_sicheong", "w_m5_458_gucheong"]
    }),
        defineLesson({
      id: "w30-theme-45",
      stage: "W30",
      title: "Nature and landscape Part 45",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for nature and landscape.",
      newWordIds: [ "w_m5_206_hae_sun", "w_m6_3031_ilsik_eclipse", "w_m5_207_gureum",  "w_m5_209_ondo", "w_m5_210_san", "w_m6_3044_oreuda_climb", "w_m5_211_gang"]
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
      newWordIds: ["w_m5_423_byeonhwa", "w_m5_431_dongjjok", "w_m5_479_naerida_fall", "w_m6_3042_tteoreojida_fall", "w_m2_bul_fire", "w_m5_520_pul_grass", "w_m5_525_namunnip"]
    }),
        defineLesson({
      id: "w31-theme-49",
      stage: "W31",
      title: "Time and calendar Part 49",
      subtitle: "Learn 8 common words",
      goal: "Expand your thematic vocabulary for time and calendar.",
      newWordIds: ["w_m5_217_cho", "w_m5_218_ju_week", "w_m5_219_saebyeok", "w_m5_220_ojeon", "w_m5_221_ohu", "w_m5_222_haru", "w_m5_223_maeil", "w_m2_cho_candle"]
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
      newWordIds: ["w_m5_231_gonghyuil", "w_m5_232_hyuga", "w_m5_386_saengil", "w_m6_3030_dol_birthday", "w_m5_387_insaeng", "w_m5_420_hwayoil", "w_m5_530_banghak_break"]
    }),
        defineLesson({
      id: "w32-theme-53",
      stage: "W32",
      title: "Study and class life Part 53",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for study and class life.",
      newWordIds: ["w_m5_233_gongchaek",   "w_m5_236_sukje", "w_m5_237_chilpan", "w_m5_238_seongjeok", "w_m5_239_gyosil"]
    }),
    defineLesson({
      id: "w32-theme-54",
      stage: "W32",
      title: "Study and class life Part 54",
      subtitle: "Learn 5 common words",
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
      newWordIds: ["w_m5_404_daehaksaeng", "w_m5_410_daedap", "w_m5_413_munhak", "w_m5_414_mungu", "w_m6_3013_mungu_phrase", "w_m5_415_munseo", "w_m5_416_hanmun"]
    }),
    defineLesson({
      id: "w32-theme-57",
      stage: "W32",
      title: "Study and class life Part 57",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for study and class life.",
      newWordIds: ["w_m5_417_sinmun", "w_m5_418_jilmun_sino", "w_m5_425_hoehwa", "w_m5_429_hwalldong", "w_m6_2997_ppajida_omit"]
    }),
        defineLesson({
      id: "w33-theme-59",
      stage: "W33",
      title: "Hobbies and leisure Part 59",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for hobbies and leisure.",
      newWordIds: ["w_m5_243_chwimi", "w_m5_244_dokseo", "w_m5_246_yori", "w_m5_247_naksi", "w_m5_248_deungsan", "w_m5_249_geim"]
    }),
    defineLesson({
      id: "w33-theme-60",
      stage: "W33",
      title: "Hobbies and leisure Part 60",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for hobbies and leisure.",
      newWordIds: ["w_m5_250_geurim", "w_m5_251_akgi", "w_m5_252_piano", "w_m5_253_gita_instrument", "w_m5_424_yeonghwa"]
    }),
        defineLesson({
      id: "w33-theme-62",
      stage: "W33",
      title: "Hobbies and leisure Part 62",
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for hobbies and leisure.",
      newWordIds: ["w_m5_469_gongyeon", "w_m5_470_jeonsihoe", "w_m5_471_eumakhoe", "w_m5_467_norae_hobby", "w_m6_2985_chida_instrument"]
    }),
    defineLesson({
      id: "w34-theme-63",
      stage: "W34",
      title: "Active sports Part 63",
      subtitle: "Learn 10 common words",
      goal: "Expand your thematic vocabulary for active sports.",
      newWordIds: ["w_m5_254_chukgu", "w_m5_255_yagu", "w_m5_256_nonggu", "w_m5_257_baegu", "w_m5_258_teniseu", "w_m5_259_baedeuminteon", "w_m5_260_suyeong_sport", "w_m5_261_dalligi", "w_m5_408_daehoe", "w_m5_427_undong"]
    }),
        defineLesson({
      id: "w35-theme-65",
      stage: "W35",
      title: "Jobs and careers Part 65",
      subtitle: "Learn 6 common words",
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
      id: "w36-theme-71",
      stage: "W36",
      title: "Everyday actions Part 71",
      subtitle: "Learn 7 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_292_ppallaehada", "w_m5_295_gidarida", "w_m5_296_baeuda", "w_m5_286_mandeulda", "w_m6_2971_ttwida_jump", "w_m6_2984_chida_hit", "w_m6_2996_ppajida_fall"]
    }),
    defineLesson({
      id: "w36-theme-72",
      stage: "W36",
      title: "Everyday actions Part 72",
      subtitle: "Learn 8 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_297_gareuchida", "w_m5_298_saenggakhada", "w_m5_299_mureoboda", "w_m5_300_iyagihada", "w_m5_301_jeonhwahada", "w_m5_302_bonaeda", "w_m6_3029_bonaeda_spend", "w_m5_303_batda"]
    }),
    defineLesson({
      id: "w36-theme-73",
      stage: "W36",
      title: "Everyday actions Part 73",
      subtitle: "Learn 6 common words",
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
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_318_sijakhada", "w_m5_319_kkeunnada", "w_m5_320_saranghada",  "w_m5_322_sireohada", "w_m5_323_chukhahada", "w_m5_324_noraehada"]
    }),
    defineLesson({
      id: "w36-theme-76",
      stage: "W36",
      title: "Everyday actions Part 76",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for everyday actions.",
      newWordIds: ["w_m5_392_saenggak", "w_m5_430_haengdong", "w_m5_472_ireonada_stand", "w_m5_474_sseuda_use", "w_m5_478_tada_burn", "w_m5_481_bureuda"]
    }),
    defineLesson({
      id: "w37-theme-77",
      stage: "W37",
      title: "Descriptions and feelings Part 77",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_325_neopda", "w_m5_326_jopda", "w_m5_327_nopda", "w_m5_328_natda", "w_m5_330_saeropda", "w_m5_331_oraedoeda"]
    }),
    defineLesson({
      id: "w37-theme-78",
      stage: "W37",
      title: "Descriptions and feelings Part 78",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_332_madeopda", "w_m5_335_hangahada", "w_m5_336_neurida", "w_m5_488_nappuda_bad", "w_m5_491_gopeuda", "w_m5_492_gichada"]
    }),
    defineLesson({
      id: "w37-theme-79",
      stage: "W37",
      title: "Descriptions and feelings Part 79",
      subtitle: "Learn 8 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_339_eodupda", "w_m5_340_bakda", "w_m6_3062_bakda_cheerful", "w_m5_341_kkaekkeuthada", "w_m5_342_deoreopda", "w_m5_343_gwiyeopda", "w_m5_344_pyeonhada", "w_m5_345_bulpyeonhada"]
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
      subtitle: "Learn 5 common words",
      goal: "Expand your thematic vocabulary for descriptions and feelings.",
      newWordIds: ["w_m5_353_sikkeureopda", "w_m5_354_chinjeolhada", "w_m5_355_ttokttokhada", "w_m5_482_bureuda_full", "w_m6_2970_sagwa_apology"]
    }),
        defineLesson({
      id: "w38-theme-83",
      stage: "W38",
      title: "Asking questions Part 83",
      subtitle: "Learn 6 common words",
      goal: "Expand your thematic vocabulary for asking questions.",
      newWordIds: ["w0610_eonje", "w_m5_360_mueot", "w_m5_361_eoneu", "w_m5_362_igeot", "w_m5_363_geugeot", "w_m5_364_jeogeot"]
    }),
        defineLesson({
      id: "w39-theme-85",
      stage: "W39",
      title: "Body and health",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for body and health.",
      newWordIds: ["w_m5_394_wisaeng", "w_m5_600_dutong", "w_m5_601_chitong", "w_m5_602_chigwa", "w_m5_603_naegwa", "w_m5_604_cheobangjeon", "w_m5_605_gichim"]
    }),
    defineLesson({
      id: "w40-theme-86",
      stage: "W40",
      title: "Body and health",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for body and health.",
      newWordIds: ["w_m5_606_konmul", "w_m5_607_daehak", "w_m5_608_gyoyuk", "w_m5_609_yeongu", "w_m5_610_yeoksa", "w_m5_611_ihae", "w_m5_612_gieok"]
    }),
    defineLesson({
      id: "w41-theme-87",
      stage: "W41",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m5_613_balpyo", "w_m5_614_sijak", "w_m5_615_sarang", "w_m5_616_sayong", "w_m5_617_junbi", "w_m5_618_hwagin", "w_m5_619_gyeoljeong"]
    }),
    defineLesson({
      id: "w42-theme-88",
      stage: "W42",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m5_620_gyehoek", "w_m5_621_balgyeon", "w_m5_622_iyong", "w_m5_623_chamyeo", "w_m5_624_jinhaeng", "w_m5_625_jejak", "w_m5_626_unyeong"]
    }),
    defineLesson({
      id: "w43-theme-89",
      stage: "W43",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m5_627_panmae", "w_m5_628_haengbok", "w_m5_629_gwenchanta", "w_m5_630_jungyo", "w_m5_631_ganeung", "w_m5_632_anjeon", "w_m5_633_dareuda"]
    }),
    defineLesson({
      id: "w44-theme-90",
      stage: "W44",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m5_635_yeoja", "w_m5_636_namja", "w_m5_637_ai", "w_m5_638_yeoseong", "w_m5_639_ingan", "w_m5_640_abeoji", "w_m5_641_eomeoni"]
    }),
    defineLesson({
      id: "w45-theme-91",
      stage: "W45",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m5_642_hanguk", "w_m5_643_seoul", "w_m5_644_segye", "w_m5_645_nara", "w_m5_646_jiyeok", "w_m5_647_cheoeum", "w_m5_648_busan"]
    }),
    defineLesson({
      id: "w46-theme-92",
      stage: "W46",
      title: "Weather and nature",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for weather and nature.",
      newWordIds: ["w_m5_649_sasil", "w_m5_650_maeum", "w_m5_651_sesang", "w_m5_652_iyagi", "w_m5_653_iyu", "w_m5_654_sanghwang", "w_m5_655_naeyong"]
    }),
    defineLesson({
      id: "w47-theme-93",
      stage: "W47",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m5_656_sahoe", "w_m5_657_jeongbu", "w_m5_658_geuraeseo", "w_m5_659_ihu", "w_m5_660_bangsong", "w_m5_661_jeongbo", "w_m5_662_nyuseu"]
    }),
    defineLesson({
      id: "w48-theme-94",
      stage: "W48",
      title: "Sports and physical recreation",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for sports and physical recreation.",
      newWordIds: ["w_m5_663_goldae", "w_m5_664_sugu", "w_m5_665_deungsanhwa", "w_m5_666_undongjang", "w_m5_667_cheyuk", "w_m5_668_takgu", "w_m5_669_danchu", "w_m6_2978_jida_lose"]
    }),
    defineLesson({
      id: "w49-theme-95",
      stage: "W49",
      title: "Shopping and money",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for shopping and money.",
      newWordIds: ["w_m5_670_harin", "w_m5_671_jipeo", "w_m5_672_taryuisil", "w_m5_673_gyohwan", "w_m5_674_sinyongkadeu", "w_m5_675_geoseureumdon", "w_m5_676_jeonjaupyeon"]
    }),
    defineLesson({
      id: "w50-theme-96",
      stage: "W50",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m5_677_oegugin", "w_m5_678_simin", "w_m5_679_insa", "w_m5_680_ingi", "w_m5_681_ingu", "w_m5_682_inhyeong", "w_m5_683_inmul"]
    }),
    defineLesson({
      id: "w51-theme-97",
      stage: "W51",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m5_684_daehwa", "w_m5_685_daehwabang", "w_m5_686_hwaje", "w_m5_687_seolhwa", "w_m5_688_donghwa", "w_m5_689_suhwa", "w_m5_690_tonghwa"]
    }),
    defineLesson({
      id: "w52-theme-98",
      stage: "W52",
      title: "School and study",
      subtitle: "Learn 6 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m5_691_bangbeop", "w_m5_692_seonsu", "w_m5_693_baksu", "w_m5_694_susul", "w_m5_696_sudong", "w_m5_697_sucheop"]
    }),
    defineLesson({
      id: "w53-theme-99",
      stage: "W53",
      title: "Weather and nature",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for weather and nature.",
      newWordIds: ["w_m5_698_gonggi", "w_m5_699_gibun", "w_m5_700_gion", "w_m5_701_gihu", "w_m5_702_yonggi", "w_m5_703_giun", "w_m5_704_giche"]
    }),
    defineLesson({
      id: "w54-theme-100",
      stage: "W54",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m5_705_sinae", "w_m5_706_choego", "w_m5_707_sioe", "w_m5_708_sigak", "w_m5_709_sijang_mayor", "w_m5_710_sijang_hunger", "w_m5_711_siseon"]
    }),
    defineLesson({
      id: "w55-theme-101",
      stage: "W55",
      title: "Food and drink",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for food and drink.",
      newWordIds: ["w_m5_712_gimbap", "w_m5_713_bibimbap", "w_m5_714_bulgogi", "w_m5_715_gimchi", "w_m5_716_tteokbokki", "w_m5_717_eumryosu", "w_m5_718_jagi"]
    }),
    defineLesson({
      id: "w56-theme-102",
      stage: "W56",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m5_719_jinjja", "w_m5_720_gyeongu", "w_m5_721_dongan", "w_m5_722_cheot", "w_m5_723_jeongdo", "w_m5_724_ttoneun", "w_m5_725_seupdo"]
    }),
    defineLesson({
      id: "w57-theme-103",
      stage: "W57",
      title: "Time and daily rhythm",
      subtitle: "Learn 5 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m5_726_jangnyeon", "w_m5_727_bam", "w_m5_728_bul", "w_m5_730_jumal", "w_m5_732_hyuil"]
    }),
    defineLesson({
      id: "w58-theme-104",
      stage: "W58",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m5_733_ije", "w_m5_734_radio", "w_m5_735_sonmoksigye", "w_m5_736_cheongsogi", "w_m5_737_jeonjareinji", "w_m5_738_eeokeon", "w_m5_739_seonpunggi"]
    }),
    defineLesson({
      id: "w59-theme-105",
      stage: "W59",
      title: "Feelings and descriptions",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m5_740_ttohan", "w_m5_741_bak", "w_m5_742_gamsa", "w_m5_743_modeun", "w_m5_744_piryo", "w_m5_745_jeongmal", "w_m5_746_dwi", "w_m6_2989_dolda_around"]
    }),
    defineLesson({
      id: "w60-theme-106",
      stage: "W60",
      title: "Hobbies and leisure",
      subtitle: "Learn 6 common words",
      goal: "Expand your vocabulary for hobbies and leisure.",
      newWordIds: ["w_m5_747_chum", "w_m5_748_pisibang", "w_m5_749_hyeonjae", "w_m5_751_bidio", "w_m5_752_yutyubeu", "w_m5_753_seumateupon"]
    }),
    defineLesson({
      id: "w61-theme-107",
      stage: "W61",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m5_754_gyesok", "w_m5_755_gyosa", "w_m5_756_gyosu", "w_m5_757_byeonhosa", "w_m5_758_sin", "w_m5_759_jul", "w_m5_760_ajik"]
    }),
    defineLesson({
      id: "w62-theme-108",
      stage: "W62",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m5_761_saengsin", "w_m5_762_haksaengjeung", "w_m5_763_isang", "w_m5_764_pyeongsaeng", "w_m5_765_saengpilpum", "w_m5_766_saengtaegye", "w_m5_767_saengmul"]
    }),
    defineLesson({
      id: "w63-theme-109",
      stage: "W63",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m5_768_daehagwon", "w_m5_769_wi", "w_m5_770_daehyeong", "w_m5_771_daejung", "w_m5_772_daedasu", "w_m5_773_daeryuk", "w_m5_774_daedosi"]
    }),
    defineLesson({
      id: "w64-theme-110",
      stage: "W64",
      title: "School and study",
      subtitle: "Learn 5 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m5_776_munmaek", "w_m5_777_munmyeong", "w_m5_778_munbeop", "w_m5_779_munhwajae", "w_m5_780_mungujeom"]
    }),
    defineLesson({
      id: "w65-theme-111",
      stage: "W65",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m5_782_hu", "w_m5_783_hwahak", "w_m5_784_onnanhwa", "w_m5_785_mit", "w_m5_786_hwaseok", "w_m5_787_sohyeonghwa", "w_m5_788_dayanghwa"]
    }),
    defineLesson({
      id: "w66-theme-112",
      stage: "W66",
      title: "Places and movement",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for places and movement.",
      newWordIds: ["w_m5_789_got", "w_m5_790_dongjak", "w_m5_791_dongryeok", "w_m5_792_dongyeongsang", "w_m5_793_jindong", "w_m5_794_jadong", "w_m5_795_dongyo"]
    }),
    defineLesson({
      id: "w67-theme-113",
      stage: "W67",
      title: "Travel and city",
      subtitle: "Learn 5 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m5_796_gukje", "w_m5_797_jeon", "w_m5_798_gukgi", "w_m5_799_gukgyeong", "w_m5_802_gukjeok"]
    }),
    defineLesson({
      id: "w68-theme-114",
      stage: "W68",
      title: "Food and drink",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for food and drink.",
      newWordIds: ["w_m5_803_sikpum", "w_m5_804_sikjaeryo", "w_m5_805_sikgi", "w_m5_806_gansik", "w_m5_807_oesik", "w_m5_808_sikseupgwan", "w_m5_809_sikjungdok"]
    }),
    defineLesson({
      id: "w69-theme-115",
      stage: "W69",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m5_810_wol", "w_m5_811_hakja", "w_m5_812_nyeon", "w_m5_813_ttae", "w_m5_814_eohak", "w_m5_815_cheolhak", "w_m5_816_uihak"]
    }),
    defineLesson({
      id: "w70-theme-116",
      stage: "W70",
      title: "Core actions",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m5_817_barada", "w_m5_818_mitda", "w_m5_819_du", "w_m5_821_dareun", "w_m5_822_munje", "w_m5_823_billida", "w_m5_824_matda", "w_m6_2965_matda_hit"]
    }),
    defineLesson({
      id: "w71-theme-117",
      stage: "W71",
      title: "Connectives and clause chaining",
      subtitle: "Learn 6 common words",
      goal: "Expand your vocabulary for connectives and clause chaining.",
      newWordIds: ["w_m5_825_geurigo", "w_m5_826_geunyang", "w_m5_828_neotda", "w_m5_829_dasi", "w_m5_830_hamkke", "w_m6_2986_pulda_untie"]
    }),
    defineLesson({
      id: "w72-theme-118",
      stage: "W72",
      title: "Feelings and descriptions",
      subtitle: "Learn 6 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m5_833_tto", "w_m5_834_museopda", "w_m5_835_jeulgeopda", "w_m5_837_oeropda", "w_m5_839_neomu", "w_m5_840_deo"]
    }),
    defineLesson({
      id: "w73-theme-119",
      stage: "W73",
      title: "Feelings and descriptions",
      subtitle: "Learn 6 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m5_841_ani", "w_m5_842_meolda", "w_m5_843_gakkapda", "w_m5_844_eoryeopda", "w_m5_845_swipda", "w_m5_846_bappeuda"]
    }),
    defineLesson({
      id: "w74-theme-120",
      stage: "W74",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m5_848_jal", "w_m5_850_jom", "w_m5_852_euro", "w_m5_853_ege", "w_m5_854_hante", "w_m5_855_kkaji", "w_m5_856_buteo"]
    }),
    defineLesson({
      id: "w75-theme-121",
      stage: "W75",
      title: "Connectives and clause chaining",
      subtitle: "Learn 6 common words",
      goal: "Expand your vocabulary for connectives and clause chaining.",
      newWordIds: ["w_m5_857_jiman", "w_m5_858_myeonseo", "fw1803_geona", "w_m5_860_dorok", "w_m5_861_ryeogo", "w_m5_863_chigo"]
    }),
    defineLesson({
      id: "w76-theme-122",
      stage: "W76",
      title: "Connectives and clause chaining",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for connectives and clause chaining.",
      newWordIds: ["w_m5_864_jocha", "w_m5_865_majeo", "w_m6_1000_gyeolgwa", "w_m6_1001_girok", "w_m6_1002_uimi", "w_m6_1003_gijun", "w_m6_1004_gwamok"]
    }),
    defineLesson({
      id: "w77-theme-123",
      stage: "W77",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_1005_seonggong", "w_m6_1006_silpae", "w_m6_1007_noryeok", "w_m6_1008_jisik", "w_m6_1009_hakseup", "w_m6_1010_taedo", "w_m6_1011_seolmyeong"]
    }),
    defineLesson({
      id: "w78-theme-124",
      stage: "W78",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_1012_misul", "w_m6_1013_eumak", "w_m6_1014_siheom", "w_m6_1015_seongjang", "w_m6_1016_baldal", "w_m6_1017_doseo", "w_m6_1018_sajeon"]
    }),
    defineLesson({
      id: "w79-theme-125",
      stage: "W79",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_1019_sageon", "w_m6_1020_golmok", "w_m6_1021_gwangwang", "w_m6_1022_hoengdanbodo", "w_m6_1023_chulgu", "w_m6_1024_ipgu", "w_m6_1025_maepyoso"]
    }),
    defineLesson({
      id: "w80-theme-126",
      stage: "W80",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_1026_annaeso", "w_m6_1027_doseogwan", "w_m6_1028_hosu", "w_m6_1029_jeongwon", "w_m6_1030_sangtae", "w_m6_1031_jogeum", "w_m6_1032_moseup"]
    }),
    defineLesson({
      id: "w81-theme-127",
      stage: "W81",
      title: "Feelings and descriptions",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1033_majimak", "w_m6_1034_bubun", "w_m6_1035_imi", "w_m6_1036_hangsang", "w_m6_1037_jayu", "w_m6_1038_pyeonghwa", "w_m6_1039_huimang", "w_m6_3061_baram_wish"]
    }),
    defineLesson({
      id: "w82-theme-128",
      stage: "W82",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1040_seulpeum", "w_m6_1041_chinjeol", "w_m6_1042_jeongjik", "w_m6_1043_yonggam", "w_m6_1044_josim", "w_m6_1045_simgak", "w_m6_1046_teukbyeol"]
    }),
    defineLesson({
      id: "w83-theme-129",
      stage: "W83",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1047_ilban", "w_m6_1048_pyeonan", "w_m6_1049_bulpyeon", "w_m6_1050_gidae", "w_m6_1051_silmang", "w_m6_1052_geokjeong", "w_m6_1053_gwansim"]
    }),
    defineLesson({
      id: "w84-theme-130",
      stage: "W84",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1054_neukkim", "w_m6_1055_gamjeong", "w_m6_1056_gippeum", "w_m6_1057_jjajeung", "w_m6_1058_uul", "w_m6_1059_ginjang", "w_m6_1060_bunno"]
    }),
    defineLesson({
      id: "w85-theme-131",
      stage: "W85",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1061_oeroum", "w_m6_1062_bukkeureoum", "w_m6_1063_mium", "w_m6_1064_geurium", "w_m6_1065_manjok", "w_m6_1066_bulman", "w_m6_1067_ando"]
    }),
    defineLesson({
      id: "w86-theme-132",
      stage: "W86",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1068_danghwang", "w_m6_1069_gongpo", "w_m6_1070_buran", "w_m6_1071_heungbun", "w_m6_1072_sangnyang", "w_m6_1073_yamjeon", "w_m6_1074_soljik"]
    }),
    defineLesson({
      id: "w87-theme-133",
      stage: "W87",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1075_chingeun", "w_m6_1076_eosaek", "w_m6_1077_dangyeon", "w_m6_1078_chungbun", "w_m6_1079_bujok", "w_m6_1080_gonggae", "w_m6_1081_jiwon"]
    }),
    defineLesson({
      id: "w88-theme-134",
      stage: "W88",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1082_gaebal", "w_m6_1083_seontaek", "w_m6_1084_kkeutnaeda", "w_m6_1085_bakkuda", "w_m6_1086_deonjida", "w_m6_1087_japda", "w_m6_1088_milda"]
    }),
    defineLesson({
      id: "w89-theme-135",
      stage: "W89",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1089_danggida", "w_m6_1090_sumda", "w_m6_1091_chatda", "w_m6_1092_ollida", "w_m6_1093_billyeojuda", "w_m6_1094_juda", "w_m6_1095_dopda"]
    }),
    defineLesson({
      id: "w90-theme-136",
      stage: "W90",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1096_chumchuda", "w_m6_1097_gongbuhada", "w_m6_1098_yeohenghada", "w_m6_1099_unjeonhada", "w_m6_1100_syopinghada", "w_m6_1101_gieokhada", "w_m6_1102_ijeobeorida"]
    }),
    defineLesson({
      id: "w91-theme-137",
      stage: "W91",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1103_ihaehada", "w_m6_1104_ohaehada", "w_m6_1105_yaksokhada", "w_m6_1106_geojitmalhada", "w_m6_1107_uisimhada", "w_m6_1108_mat", "w_m6_1109_menyu"]
    }),
    defineLesson({
      id: "w92-theme-138",
      stage: "W92",
      title: "Food and drink",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for food and drink.",
      newWordIds: ["w_m6_1110_sagwa", "w_m6_1111_banana", "w_m6_1112_guksu", "w_m6_1113_mandu", "w_m6_1114_husik", "w_m6_1115_gwageo", "w_m6_1116_mirae", "w_m6_3024_bae_pear"]
    }),
    defineLesson({
      id: "w93-theme-139",
      stage: "W93",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m6_1117_iljuil", "w_m6_1118_handal", "w_m6_1119_ilnyeon", "w_m6_1120_nat", "w_m6_1121_maeju", "w_m6_1122_maewol", "w_m6_1123_maenyeon"]
    }),
    defineLesson({
      id: "w94-theme-140",
      stage: "W94",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m6_1124_naljja", "w_m6_1125_iljeong", "w_m6_1126_yaksok", "w_m6_1127_kkeut", "w_m6_1128_gwajeong", "w_m6_1129_sungan", "w_m6_1130_hyeondae"]
    }),
    defineLesson({
      id: "w95-theme-141",
      stage: "W95",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m6_1131_godae", "w_m6_1132_miraehak", "w_m6_1133_segi", "w_m6_1134_yeondo", "w_m6_1135_gigan", "w_m6_1136_gisul", "w_m6_1137_yeonpilkkaki"]
    }),
    defineLesson({
      id: "w96-theme-142",
      stage: "W96",
      title: "Daily objects and technology",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for daily objects and technology.",
      newWordIds: ["w_m6_1138_ja", "w_m6_1139_bolpen", "w_m6_1140_sangja", "w_m6_1141_binilbongji", "w_m6_1142_keop", "w_m6_1143_jeopsi", "w_m6_1144_sujeo"]
    }),
    defineLesson({
      id: "w97-theme-143",
      stage: "W97",
      title: "Daily objects and technology",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for daily objects and technology.",
      newWordIds: ["w_m6_1145_naembi", "w_m6_1146_huraipaen", "w_m6_1147_doma", "w_m6_1148_jujeonja", "w_m6_1149_geoulsigye", "w_m6_1150_deuraigi", "w_m6_1151_chuljang"]
    }),
    defineLesson({
      id: "w98-theme-144",
      stage: "W98",
      title: "occupations",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_1152_hwaga", "w_m6_1153_pansa", "w_m6_1154_unjeonsa", "w_m6_1155_anaunseo", "w_m6_1156_suuisa", "w_m6_1157_geonchukga", "w_m6_1158_jojongsa"]
    }),
    defineLesson({
      id: "w99-theme-145",
      stage: "W99",
      title: "occupations",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_1159_seungmuwon", "w_m6_1160_dijaineo", "w_m6_1161_gaideu", "w_m6_1162_beonyeokga", "w_m6_1163_tongyeoksa", "w_m6_1164_sangdamsa", "w_m6_1165_peurogeuraemeo"]
    }),
    defineLesson({
      id: "w100-theme-146",
      stage: "W100",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_1166_namdongsaeng", "w_m6_1167_yeodongsaeng", "w_m6_1168_eorini", "w_m6_1169_agi", "w_m6_1170_iut", "w_m6_1171_dongryeo", "w_m6_1172_seonbae"]
    }),
    defineLesson({
      id: "w101-theme-147",
      stage: "W101",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_1173_hubae", "w_m6_1174_inryu", "w_m6_1175_gaein", "w_m6_1176_dongjeon", "w_m6_1177_jipye", "w_m6_1178_gumae", "w_m6_1179_gyesan"]
    }),
    defineLesson({
      id: "w102-theme-148",
      stage: "W102",
      title: "Shopping and money",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for shopping and money.",
      newWordIds: ["w_m6_1180_hwanjeon", "w_m6_1181_jichul", "w_m6_1182_suip", "w_m6_1183_jeogeum", "w_m6_1184_tongjang", "w_m6_1185_biyong", "w_m6_1186_yeongeop"]
    }),
    defineLesson({
      id: "w103-theme-149",
      stage: "W103",
      title: "Shopping and money",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for shopping and money.",
      newWordIds: ["w_m6_1187_sijanggagyeok", "w_m6_1188_sijangtong", "w_m6_1189_gagyeokpyo", "w_m6_1190_susuryo", "w_m6_1191_sobija", "w_m6_1192_gumaeja", "w_m6_1193_panmaeja"]
    }),
    defineLesson({
      id: "w104-theme-150",
      stage: "W104",
      title: "Shopping and money",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for shopping and money.",
      newWordIds: ["w_m6_1194_yeongsujeungcheol", "w_m6_1195_hwanbul", "w_m6_1196_jumeoni", "w_m6_1197_undonghwa", "w_m6_1198_seullipeo", "w_m6_1199_danchugumeong", "w_m6_1200_angyeongwon"]
    }),
    defineLesson({
      id: "w105-theme-151",
      stage: "W105",
      title: "clothing",
      subtitle: "Learn 9 common words",
      goal: "Expand your vocabulary for clothing.",
      newWordIds: ["w_m6_1201_gabangkkeun", "w_m6_1202_jigapkkeun", "w_m6_1203_seuweteo", "w_m6_1204_wonpiseu", "w_m6_1205_taekwondo", "w_m6_1206_sihap", "w_m6_1207_tim", "w_m6_2994_chada_kick", "w_m6_3037_kodeu_dress"]
    }),
    defineLesson({
      id: "w106-theme-152",
      stage: "W106",
      title: "Sports and physical recreation",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for sports and physical recreation.",
      newWordIds: ["w_m6_1208_gong", "w_m6_1209_jeomsu", "w_m6_1210_useung", "w_m6_1211_golpeu", "w_m6_1212_hunryeon", "w_m6_1213_wichi", "w_m6_1214_jangso"]
    }),
    defineLesson({
      id: "w107-theme-153",
      stage: "W107",
      title: "Places and movement",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for places and movement.",
      newWordIds: ["w_m6_1215_ap", "w_m6_1216_yeop", "w_m6_1217_sai", "w_m6_1218_oreunjjok", "w_m6_1219_oenjjok", "w_m6_1220_banghyang", "w_m6_1221_seojjok"]
    }),
    defineLesson({
      id: "w108-theme-154",
      stage: "W108",
      title: "Places and movement",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for places and movement.",
      newWordIds: ["w_m6_1222_namjjok", "w_m6_1223_bukjjok", "w_m6_1224_gaunde", "w_m6_1225_jubyeon", "w_m6_1226_bakat", "w_m6_1227_naebu", "w_m6_1228_oebu"]
    }),
    defineLesson({
      id: "w109-theme-155",
      stage: "W109",
      title: "Places and movement",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for places and movement.",
      newWordIds: ["w_m6_1229_jungang", "w_m6_1230_jeongsang_summit", "w_m6_1231_jeongsang_normality", "w_m6_1232_badak", "w_m6_1233_cheonjang", "w_m6_1234_guseok", "w_m6_1250_gyeongje"]
    }),
    defineLesson({
      id: "w110-theme-156",
      stage: "W110",
      title: "School and study",
      subtitle: "Learn 9 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_1251_daesang", "w_m6_1252_meonjeo", "w_m6_1253_jonjae", "w_m6_1254_aju", "w_m6_1255_josa", "w_m6_1256_chucheon", "w_m6_1257_guseong", "w_m6_3012_yangsik_form", "w_m6_3016_gajeong_assumption"]
    }),
    defineLesson({
      id: "w111-theme-157",
      stage: "W111",
      title: "occupations",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_1258_gieop", "w_m6_1259_honja", "w_m6_1260_daebubun", "w_m6_1261_maeu", "w_m6_1262_sabeop", "w_m6_1263_seoro", "w_m6_1264_jayeon", "w_m6_3015_geomsa_prosecutor"]
    }),
    defineLesson({
      id: "w112-theme-158",
      stage: "W112",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1265_jeonche", "w_m6_1266_jegong", "w_m6_1267_jungyoseong", "w_m6_1268_jipdan", "w_m6_1269_pandan", "w_m6_1270_piryoseong", "w_m6_1271_haegyeol"]
    }),
    defineLesson({
      id: "w113-theme-159",
      stage: "W113",
      title: "Feelings and descriptions",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1272_gyeongheom", "w_m6_1273_gongsik", "w_m6_1274_gwanryeon", "w_m6_1275_gwanri", "w_m6_1276_gwanjeom", "w_m6_1277_gujo", "w_m6_1278_gwonri", "w_m6_3034_gujo_rescue"]
    }),
    defineLesson({
      id: "w114-theme-160",
      stage: "W114",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1279_gyumo", "w_m6_1280_gyuchik", "w_m6_1281_gyunhyeong", "w_m6_1282_geudaero", "w_m6_1283_geudongan", "w_m6_1284_geureup", "w_m6_1285_geumaek"]
    }),
    defineLesson({
      id: "w115-theme-161",
      stage: "W115",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1286_geupgyeok", "w_m6_1287_geungjeong", "w_m6_1288_gibon", "w_m6_1289_gibu", "w_m6_1290_gijo", "w_m6_1291_gihoe", "w_m6_1292_giri"]
    }),
    defineLesson({
      id: "w116-theme-162",
      stage: "W116",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1293_gipi", "w_m6_1294_kkeopjil", "w_m6_1295_kkori", "w_m6_1296_kkujunhi", "w_m6_1297_kkum", "w_m6_1298_kkeunimeopsi", "w_m6_1299_kkeutnae"]
    }),
    defineLesson({
      id: "w117-theme-163",
      stage: "W117",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_1300_nai", "w_m6_1301_natanada", "w_m6_1302_namgida", "w_m6_1303_namseong", "w_m6_1304_napbu", "w_m6_1305_nangbi", "w_m6_1306_neomeo"]
    }),
    defineLesson({
      id: "w118-theme-164",
      stage: "W118",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1307_neolbi", "w_m6_1308_neomchida", "w_m6_1309_nodong", "w_m6_1310_nogeum", "w_m6_1311_nonri", "w_m6_1312_nonjaeng", "w_m6_1313_nongeop"]
    }),
    defineLesson({
      id: "w119-theme-165",
      stage: "W119",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1314_nopi", "w_m6_1315_nureuda", "w_m6_1316_nunmul", "w_m6_1317_nunbit", "w_m6_1318_neureonada", "w_m6_1319_neulda", "w_m6_1320_neungryeok"]
    }),
    defineLesson({
      id: "w120-theme-166",
      stage: "W120",
      title: "Time and daily rhythm",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m6_1321_neutda", "w_m6_1322_dareuge", "w_m6_1323_dayang", "w_m6_1324_datuda", "w_m6_1325_dahaenghi", "w_m6_1326_dangye", "w_m6_1327_dansun", "w_m6_3038_daegi_waiting"]
    }),
    defineLesson({
      id: "w121-theme-167",
      stage: "W121",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1328_danji", "w_m6_1329_dapbyeon", "w_m6_1330_dangyeonhi", "w_m6_1331_daeguk", "w_m6_1332_daegi", "w_m6_1333_daedanhi", "w_m6_1334_daeri"]
    }),
    defineLesson({
      id: "w122-theme-168",
      stage: "W122",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_1335_daemyon", "w_m6_1336_daebyeon", "w_m6_1337_daebi", "w_m6_1338_daesa", "w_m6_1339_daesangui", "w_m6_1340_daesu", "w_m6_1341_daeu"]
    }),
    defineLesson({
      id: "w123-theme-169",
      stage: "W123",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1342_daeeung", "w_m6_1343_daehonran", "w_m6_1344_deowi", "w_m6_1345_deouk", "w_m6_1346_deougi", "w_m6_1347_deokbune", "w_m6_1348_doro"]
    }),
    defineLesson({
      id: "w124-theme-170",
      stage: "W124",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1349_domang", "w_m6_1350_doum", "w_m6_1351_doip", "w_m6_1352_dojeon", "w_m6_1353_dochak", "w_m6_1354_dokteuk", "w_m6_1355_dongrip"]
    }),
    defineLesson({
      id: "w125-theme-171",
      stage: "W125",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1356_donggi", "w_m6_1357_dongne", "w_m6_1358_dongdeung", "w_m6_1359_dongsi", "w_m6_1360_dongui", "w_m6_1361_donghaeng", "w_m6_1362_doedollida"]
    }),
    defineLesson({
      id: "w126-theme-172",
      stage: "W126",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1363_doedolagada", "w_m6_1364_dukke", "w_m6_1365_duryeoum", "w_m6_1366_dulle", "w_m6_1367_dwijjok", "w_m6_1368_deudieo", "w_m6_1369_deurama"]
    }),
    defineLesson({
      id: "w127-theme-173",
      stage: "W127",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1370_deurida", "w_m6_1371_deutgi", "w_m6_1372_dijain", "w_m6_1373_ttaragada", "w_m6_1374_ttaro", "w_m6_1375_ttam", "w_m6_1376_ttang"]
    }),
    defineLesson({
      id: "w128-theme-174",
      stage: "W128",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m6_1377_ttaero", "w_m6_1378_ttaerida", "w_m6_1379_tteonada", "w_m6_1380_tteooruda", "w_m6_1381_tteok", "w_m6_1382_ttokgati", "w_m6_1383_ttungttunghada"]
    }),
    defineLesson({
      id: "w129-theme-175",
      stage: "W129",
      title: "Hobbies and leisure",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for hobbies and leisure.",
      newWordIds: ["w_m6_1384_ttwinolda", "w_m6_1385_tteugeopda", "w_m6_1386_tteut", "w_m6_1387_madang", "w_m6_1388_maseukeu", "w_m6_1389_maeumdaero", "w_m6_1390_maju"]
    }),
    defineLesson({
      id: "w130-theme-176",
      stage: "W130",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1391_machi", "w_m6_1392_machimnae", "w_m6_1393_makcha", "w_m6_1394_manhwa", "w_m6_1395_mani", "w_m6_1396_malhagi", "w_m6_1397_mangseorida"]
    }),
    defineLesson({
      id: "w131-theme-177",
      stage: "W131",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_1398_matchuda", "w_m6_1399_maeryeok", "w_m6_1401_meorikal", "w_m6_1402_meokgi", "w_m6_1404_meonji", "w_m6_1405_meot", "w_m6_1406_memo"]
    }),
    defineLesson({
      id: "w132-theme-178",
      stage: "W132",
      title: "occupations",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_1407_myeonjeop", "w_m6_1408_myeongryeok", "w_m6_1409_myeongjeol", "w_m6_1410_modu", "w_m6_1411_moeuda", "w_m6_1412_moim", "w_m6_1413_mokjeok"]
    }),
    defineLesson({
      id: "w133-theme-179",
      stage: "W133",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_1414_mokpyo", "w_m6_1415_momsal", "w_m6_1416_mothada", "w_m6_1417_muge", "w_m6_1418_muryo", "w_m6_1419_mureup", "w_m6_1420_musi"]
    }),
    defineLesson({
      id: "w134-theme-180",
      stage: "W134",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_1421_mudeom", "w_m6_1422_munui", "w_m6_1423_mucheok", "w_m6_1424_mulga", "w_m6_1425_mulgeon", "w_m6_1426_mulron", "w_m6_1427_mureum"]
    }),
    defineLesson({
      id: "w135-theme-181",
      stage: "W135",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m6_1428_miri", "w_m6_1429_miyongsil", "w_m6_1430_minyo", "w_m6_1431_minjok", "w_m6_1432_mideum", "w_m6_1500_jakpum", "w_m6_1501_jeongchi"]
    }),
    defineLesson({
      id: "w136-theme-182",
      stage: "W136",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1502_jikjeop", "w_m6_1503_gyeolhuk", "w_m6_1504_bigyo", "w_m6_1505_seupocheu", "w_m6_1506_uiwon", "w_m6_1507_butak", "w_m6_1508_senteo"]
    }),
    defineLesson({
      id: "w137-theme-183",
      stage: "W137",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_1509_gyeolhon", "w_m6_1510_jeongsin", "w_m6_1511_chuga", "w_m6_1512_malsseum", "w_m6_1513_seolchi", "w_m6_1514_aelbeom", "w_m6_1515_jalmot"]
    }),
    defineLesson({
      id: "w138-theme-184",
      stage: "W138",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_1516_jeonjaeng", "w_m6_1517_teukhi", "w_m6_1518_haewoe", "w_m6_1519_dangsi", "w_m6_1520_arae", "w_m6_1521_wanjeon", "w_m6_1522_wiwonhoe"]
    }),
    defineLesson({
      id: "w139-theme-185",
      stage: "W139",
      title: "Sports and physical recreation",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for sports and physical recreation.",
      newWordIds: ["w_m6_1523_gonggyeok", "w_m6_1524_model", "w_m6_1525_ppalli", "w_m6_1526_seobiseu", "w_m6_1527_siseutem", "w_m6_1528_ilbu", "w_m6_1529_jibang"]
    }),
    defineLesson({
      id: "w140-theme-186",
      stage: "W140",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_1530_danche", "w_m6_1531_daesin", "w_m6_1532_maeul", "w_m6_1533_bangsik", "w_m6_1534_sago", "w_m6_1535_seonsaeng", "w_m6_1536_seuta"]
    }),
    defineLesson({
      id: "w141-theme-187",
      stage: "W141",
      title: "Daily objects and technology",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for daily objects and technology.",
      newWordIds: ["w_m6_1537_yeongyeol", "w_m6_1538_yeonghyang", "w_m6_1539_seonmul", "w_m6_1540_yeongsang", "w_m6_1541_jaryo", "w_m6_1542_jungsim", "w_m6_1543_pyohyeon"]
    }),
    defineLesson({
      id: "w142-theme-188",
      stage: "W142",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_1544_haedang", "w_m6_1545_gisa", "w_m6_1546_uju", "w_m6_1547_haengsa", "w_m6_1548_jumin", "w_m6_1549_yeokhal", "w_m6_1550_sooseol"]
    }),
    defineLesson({
      id: "w143-theme-189",
      stage: "W143",
      title: "Weather and nature",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for weather and nature.",
      newWordIds: ["w_m6_1551_hwangyeong", "w_m6_1552_jakseong", "w_m6_1553_jase", "w_m6_1554_jeonghwak", "w_m6_1555_uimu", "w_m6_1556_baljeon", "w_m6_1557_daechaek"]
    }),
    defineLesson({
      id: "w144-theme-190",
      stage: "W144",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_1558_dogil", "w_m6_1559_dongari", "w_m6_1560_deureseu", "w_m6_1561_machal", "w_m6_1562_malgi", "w_m6_1563_malsseong", "w_m6_1564_maejang"]
    }),
    defineLesson({
      id: "w145-theme-191",
      stage: "W145",
      title: "Feelings and descriptions",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1565_myeonjeok", "w_m6_1566_myeongching", "w_m6_1567_moheom", "w_m6_1568_mogyok", "w_m6_1569_moksori", "w_m6_1570_mudae", "w_m6_1571_muyeok", "w_m6_3018_insang_impression"]
    }),
    defineLesson({
      id: "w146-theme-192",
      stage: "W146",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_1600_eochapi", "w_m6_1601_jedaero", "w_m6_1602_bimil", "w_m6_1603_gyeolseok", "w_m6_1604_jubang", "w_m6_1605_apateu", "w_m6_1606_haegyeolchaek"]
    }),
    defineLesson({
      id: "w147-theme-193",
      stage: "W147",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_1607_gangga", "w_m6_1608_jandibat", "w_m6_1609_danpung", "w_m6_2000_jebal", "w_m6_2001_yejeong", "w_m6_2002_onrain", "w_m6_2003_injeong"]
    }),
    defineLesson({
      id: "w148-theme-194",
      stage: "W148",
      title: "School and study",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_2004_jujang", "w_m6_2005_chwaryeong", "w_m6_2006_hompeiji", "w_m6_2007_giguan", "w_m6_2008_boho", "w_m6_2009_orae", "w_m6_2010_incheon", "w_m6_3017_gwajeong_course"]
    }),
    defineLesson({
      id: "w149-theme-195",
      stage: "W149",
      title: "occupations",
      subtitle: "Learn 9 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_2011_gamdok", "w_m6_3014_gamdok_supervisor", "w_m6_2012_byeongyeong", "w_m6_2013_jeongchaek", "w_m6_2014_jojik", "w_m6_2015_sangdae", "w_m6_2016_yeangeo", "w_m6_2017_wonrae", "w_m6_3035_jojik_tissue"]
    }),
    defineLesson({
      id: "w150-theme-196",
      stage: "W150",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_2018_yuji", "w_m6_2019_ipjang", "w_m6_2020_chiryo", "w_m6_2021_pyeongga", "w_m6_2022_geomsa", "w_m6_2023_jeonguk", "w_m6_2024_hwanja"]
    }),
    defineLesson({
      id: "w151-theme-197",
      stage: "W151",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2025_daehanminguk", "w_m6_2026_siseol", "w_m6_2027_cheori", "w_m6_2028_bandae", "w_m6_2029_jangae", "w_m6_2030_chai", "w_m6_2031_gineung"]
    }),
    defineLesson({
      id: "w152-theme-198",
      stage: "W152",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2032_daejeon", "w_m6_2033_daeche", "w_m6_2034_wiheom", "w_m6_2035_ijeon", "w_m6_2036_chamgo", "w_m6_2037_gwanggo", "w_m6_2038_beonho"]
    }),
    defineLesson({
      id: "w153-theme-199",
      stage: "W153",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2039_juyo", "w_m6_2040_jigu", "w_m6_2041_gaechoe", "w_m6_2042_gonggan", "w_m6_2043_saneop", "w_m6_2044_seongeo", "w_m6_2045_seuseuro"]
    }),
    defineLesson({
      id: "w154-theme-200",
      stage: "W154",
      title: "Hobbies and leisure",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for hobbies and leisure.",
      newWordIds: ["w_m6_2046_yesul", "w_m6_2047_yojeum", "w_m6_2048_jedo", "w_m6_2049_kodeu", "w_m6_2050_hugi", "w_m6_2051_baneung", "w_m6_2052_beojeon", "w_m6_3036_model_prototype"]
    }),
    defineLesson({
      id: "w155-theme-201",
      stage: "W155",
      title: "Sports and physical recreation",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for sports and physical recreation.",
      newWordIds: ["w_m6_2053_sijeon", "w_m6_2054_idong", "w_m6_2055_jeongri", "w_m6_2056_jeil", "w_m6_2057_jugeum", "w_m6_2058_kaerikteo", "w_m6_2059_geuttae"]
    }),
    defineLesson({
      id: "w156-theme-202",
      stage: "W156",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m6_2060_najung", "w_m6_2061_mian", "w_m6_2062_eopche", "w_m6_2063_yumyeong", "w_m6_2064_jache", "w_m6_2065_jageop", "w_m6_2066_juso"]
    }),
    defineLesson({
      id: "w157-theme-203",
      stage: "W157",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2067_hoksi", "w_m6_2068_hyogwa", "w_m6_2069_bunseok", "w_m6_2070_sogae", "w_m6_2071_simjang", "w_m6_2072_jogeon", "w_m6_2073_gyeyak"]
    }),
    defineLesson({
      id: "w158-theme-204",
      stage: "W158",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2074_daegu", "w_m6_2075_ringkeu", "w_m6_2076_membeo", "w_m6_2077_baksa", "w_m6_2078_ildan", "w_m6_2079_jeoldae", "w_m6_2080_chaegim"]
    }),
    defineLesson({
      id: "w159-theme-205",
      stage: "W159",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2081_hyeongtae", "w_m6_2082_geonmul", "w_m6_2083_yuil", "w_m6_2084_igot", "w_m6_2085_jeonmun", "w_m6_2086_charyang", "w_m6_2087_choecho"]
    }),
    defineLesson({
      id: "w160-theme-206",
      stage: "W160",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2088_hyeonseol", "w_m6_2089_gunggeum", "w_m6_2090_deungjang", "w_m6_2091_yogu", "w_m6_2092_jangchi", "w_m6_2093_choeda", "w_m6_2094_hyeonjang"]
    }),
    defineLesson({
      id: "w161-theme-207",
      stage: "W161",
      title: "occupations",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_2095_hoejang", "w_m6_2096_gaewol", "w_m6_2097_goryeo", "w_m6_2098_bonin", "w_m6_2099_ibenteu", "w_m6_2100_jaju", "w_m6_2101_joseon"]
    }),
    defineLesson({
      id: "w162-theme-208",
      stage: "W162",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_2102_haengwi", "w_m6_2103_hoeui", "w_m6_2104_boan", "w_m6_2105_gachi", "w_m6_2106_gakgak", "w_m6_2107_gakja", "w_m6_2108_gamgak"]
    }),
    defineLesson({
      id: "w163-theme-209",
      stage: "W163",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_2109_gangjo", "w_m6_2110_gaeseon", "w_m6_2111_gaeseong", "w_m6_2112_gaekgwan", "w_m6_2113_geomi", "w_m6_2114_geojit", "w_m6_2115_geonseol"]
    }),
    defineLesson({
      id: "w164-theme-210",
      stage: "W164",
      title: "Weather and nature",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for weather and nature.",
      newWordIds: ["w_m6_2116_geonjo", "w_m6_2117_geomsaek", "w_m6_2118_geop", "w_m6_2119_gyeongryeo", "w_m6_2120_gyeollon", "w_m6_2121_gyeolsung", "w_m6_2122_gyeolham"]
    }),
    defineLesson({
      id: "w165-theme-211",
      stage: "W165",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2123_gyeonggo", "w_m6_2124_gyeongnyeok", "w_m6_2125_gyeongbi", "w_m6_2126_gyeongyeong", "w_m6_2127_gyeongjaeng", "w_m6_2128_gyegok", "w_m6_2129_gyecheung"]
    }),
    defineLesson({
      id: "w166-theme-212",
      stage: "W166",
      title: "Shopping and money",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for shopping and money.",
      newWordIds: ["w_m6_2130_gogaek", "w_m6_2131_gomin", "w_m6_2132_gosaeng", "w_m6_2133_gohyang", "w_m6_2134_goksik", "w_m6_2135_gollan", "w_m6_2136_gol"]
    }),
    defineLesson({
      id: "w167-theme-213",
      stage: "W167",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2137_gongsa", "w_m6_2138_gongdongche", "w_m6_2139_gusok", "w_m6_2140_gujik", "w_m6_2141_gunsa", "w_m6_2142_gwollyeok", "w_m6_2143_gwiga"]
    }),
    defineLesson({
      id: "w168-theme-214",
      stage: "W168",
      title: "Weather and nature",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for weather and nature.",
      newWordIds: ["w_m6_2144_geuneul", "w_m6_2145_geudae", "w_m6_2146_geukdan", "w_m6_2147_geungeo", "w_m6_2148_geunlo", "w_m6_2149_geumyeon", "w_m6_2150_geumji"]
    }),
    defineLesson({
      id: "w169-theme-215",
      stage: "W169",
      title: "Daily objects and technology",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for daily objects and technology.",
      newWordIds: ["w_m6_2151_gigye", "w_m6_2152_ginyeom", "w_m6_2153_gido", "w_m6_2154_kkotbat", "w_m6_2155_gaseumsok", "w_m6_2156_gaeulcheol", "w_m6_2157_gajeong"]
    }),
    defineLesson({
      id: "w170-theme-216",
      stage: "W170",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_2158_gajokae", "w_m6_2159_gakguk", "w_m6_2160_ganho", "w_m6_2161_galdeung", "w_m6_2162_gamgakgye", "w_m6_2163_gamdong", "w_m6_2164_gamsang"]
    }),
    defineLesson({
      id: "w171-theme-217",
      stage: "W171",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2165_gangbyeon", "w_m6_2166_gangsuryang", "w_m6_2167_gangpung", "w_m6_2168_gaemak", "w_m6_2169_gaebang", "w_m6_2170_gaeeop", "w_m6_2171_gaeincha"]
    }),
    defineLesson({
      id: "w172-theme-218",
      stage: "W172",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2172_gaeksil", "w_m6_2173_gaetbeol", "w_m6_2174_geonneolmok", "w_m6_2175_geonseoleop", "w_m6_2176_geonjogi", "w_m6_2177_geommun", "w_m6_2178_geopjaengi"]
    }),
    defineLesson({
      id: "w173-theme-219",
      stage: "W173",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2179_gyeokcha", "w_m6_2180_gyeonhak", "w_m6_2181_gyeolgeun", "w_m6_2182_gyeolmal", "w_m6_2183_gyeolsungseon", "w_m6_2184_gyeolsungjeon", "w_m6_2185_gyeoljeonggwon"]
    }),
    defineLesson({
      id: "w174-theme-220",
      stage: "W174",
      title: "Shopping and money",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for shopping and money.",
      newWordIds: ["w_m6_2186_gyeonggam", "w_m6_2187_gyeongro", "w_m6_2188_gyeongbiwon", "w_m6_2189_gyeongyeonghak", "w_m6_2190_gyeongjaengryeok", "w_m6_2191_gyeongjaengja", "w_m6_2192_gyesangi"]
    }),
    defineLesson({
      id: "w175-theme-221",
      stage: "W175",
      title: "Shopping and money",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for shopping and money.",
      newWordIds: ["w_m6_2193_gyeyakgeum", "w_m6_2194_gogaekcheung", "w_m6_2195_gosaenggil", "w_m6_2196_gohyangjip", "w_m6_2197_gollando", "w_m6_2198_gongsagan", "w_m6_2199_gongsabi"]
    }),
    defineLesson({
      id: "w176-theme-222",
      stage: "W176",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2200_gongsapan", "w_m6_2201_gongsikryeok", "w_m6_2202_gongyeonjang", "w_m6_2203_gongwongil", "w_m6_2204_gonghyuilbeop", "w_m6_2205_gwangaekseok", "w_m6_2206_gwangwanggaek"]
    }),
    defineLesson({
      id: "w177-theme-223",
      stage: "W177",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2207_gwangwangji", "w_m6_2208_gwanryeonseong", "w_m6_2209_gwanriin", "w_m6_2210_gwansimsa", "w_m6_2211_gwanchallyeok", "w_m6_2212_gyosubeop", "w_m6_2213_gyoyukbi"]
    }),
    defineLesson({
      id: "w178-theme-224",
      stage: "W178",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_2214_gyoyukbeop", "w_m6_2215_gyotongmang", "w_m6_2216_gyotongbi", "w_m6_2217_gyohwangwon", "w_m6_2218_guduyak", "w_m6_2219_gureumdari", "w_m6_2220_guseokbang"]
    }),
    defineLesson({
      id: "w179-theme-225",
      stage: "W179",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_2221_guseongwon", "w_m6_2222_gusokryeok", "w_m6_2223_gujowon", "w_m6_2224_gukgyeongil", "w_m6_2225_gungminseong", "w_m6_2226_gukjebeop", "w_m6_2227_gunsaryeok"]
    }),
    defineLesson({
      id: "w180-theme-226",
      stage: "W180",
      title: "occupations",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_2228_guninsang", "w_m6_2229_gwonrigeum", "w_m6_2230_gyumobyeol", "w_m6_2231_gyuchikseong", "w_m6_2232_gyunhyeonggam", "w_m6_2233_geuneulmak", "w_m6_2234_geurimchaek"]
    }),
    defineLesson({
      id: "w181-theme-227",
      stage: "W181",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2235_geukdanjeok", "w_m6_2236_geungeoji", "w_m6_2237_geunloja", "w_m6_2238_geunmuji", "w_m6_2239_geunmupyo", "w_m6_2240_geumyeonbeop", "w_m6_2241_geumjibeop"]
    }),
    defineLesson({
      id: "w182-theme-228",
      stage: "W182",
      title: "occupations",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_2242_gigyegong", "w_m6_2243_ginyeomgwan", "w_m6_2244_ginyeompum", "w_m6_2245_girokmul", "w_m6_2246_gibugeum", "w_m6_2300_somun", "w_m6_2301_soeum"]
    }),
    defineLesson({
      id: "w183-theme-229",
      stage: "W183",
      title: "Daily objects and technology",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for daily objects and technology.",
      newWordIds: ["w_m6_2302_sogdo", "w_m6_2303_sogdam", "w_m6_2304_sontop", "w_m6_2305_songgeum", "w_m6_2306_sudan", "w_m6_2307_suchul", "w_m6_2308_sujib"]
    }),
    defineLesson({
      id: "w184-theme-230",
      stage: "W184",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2309_sugso", "w_m6_2310_sunwi", "w_m6_2311_sunjin", "w_m6_2312_seubgwan", "w_m6_2313_seunggaeg", "w_m6_2314_seungri", "w_m6_2315_seungin"]
    }),
    defineLesson({
      id: "w185-theme-231",
      stage: "W185",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_2316_sihaeng", "w_m6_2317_sigmul", "w_m6_2318_singo", "w_m6_2319_sinnyeom", "w_m6_2320_sinroe", "w_m6_2321_sinbun", "w_m6_2322_sinbi"]
    }),
    defineLesson({
      id: "w186-theme-232",
      stage: "W186",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2323_sinseon", "w_m6_2324_sinseol", "w_m6_2325_sinyong", "w_m6_2326_sinwon", "w_m6_2327_sinib", "w_m6_2328_sinche", "w_m6_2329_sinhon"]
    }),
    defineLesson({
      id: "w187-theme-233",
      stage: "W187",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2330_sillyeog", "w_m6_2331_silmu", "w_m6_2332_silsang", "w_m6_2333_silsu", "w_m6_2334_silsi", "w_m6_2335_silseub", "w_m6_2336_siloe"]
    }),
    defineLesson({
      id: "w188-theme-234",
      stage: "W188",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2337_silje", "w_m6_2338_silcheon", "w_m6_2339_silheom", "w_m6_2340_silhyeon", "w_m6_2341_simri", "w_m6_2342_simsa", "w_m6_2343_singgeobda"]
    }),
    defineLesson({
      id: "w189-theme-235",
      stage: "W189",
      title: "Body and health",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for body and health.",
      newWordIds: ["w_m6_2344_angwa", "w_m6_2345_annae", "w_m6_2346_anbu", "w_m6_2347_ansaeg", "w_m6_2348_anjeong", "w_m6_2349_anju", "w_m6_2350_anpakk", "w_m6_3034_gujo_rescue"]
    }),
    defineLesson({
      id: "w190-theme-236",
      stage: "W190",
      title: "Daily objects and technology",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for daily objects and technology.",
      newWordIds: ["w_m6_2351_allam", "w_m6_2352_yanggug", "w_m6_2353_yangnyeom", "w_m6_2354_yangsim", "w_m6_2355_eonron", "w_m6_2356_eoneo", "w_m6_2357_eobmu"]
    }),
    defineLesson({
      id: "w191-theme-237",
      stage: "W191",
      title: "occupations",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_2358_eobjong", "w_m6_2359_yeou", "w_m6_2360_yeoyu", "w_m6_2361_yeojeong", "w_m6_2362_yeongeug", "w_m6_2363_yeongeum", "w_m6_2364_yeongi"]
    }),
    defineLesson({
      id: "w192-theme-238",
      stage: "W192",
      title: "Daily objects and technology",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for daily objects and technology.",
      newWordIds: ["w_m6_2365_yeonrag", "w_m6_2366_yeonryeong", "w_m6_2367_yeonhab", "w_m6_2368_yeonhyu", "w_m6_2369_yeolgi", "w_m6_2370_yeolcha", "w_m6_2371_yeolpung"]
    }),
    defineLesson({
      id: "w193-theme-239",
      stage: "W193",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2372_yeomryeo", "w_m6_2373_yeongyang", "w_m6_2374_yeongeog", "w_m6_2375_yeongung", "w_m6_2376_yeonghon", "w_m6_2377_yegam", "w_m6_2378_yego"]
    }),
    defineLesson({
      id: "w194-theme-240",
      stage: "W194",
      title: "Shopping and money",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for shopping and money.",
      newWordIds: ["w_m6_2379_yegeum", "w_m6_2380_yeneung", "w_m6_2381_yeri", "w_m6_2382_yemae", "w_m6_2383_yebae", "w_m6_2384_yebang", "w_m6_2385_yesan"]
    }),
    defineLesson({
      id: "w195-theme-241",
      stage: "W195",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_2386_yeseub", "w_m6_2387_yesi", "w_m6_2388_yeyag", "w_m6_2389_yeui", "w_m6_2390_yeteug", "w_m6_2391_oyeom", "w_m6_2392_ohae"]
    }),
    defineLesson({
      id: "w196-theme-242",
      stage: "W196",
      title: "Body and health",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for body and health.",
      newWordIds: ["w_m6_2393_onmom", "w_m6_2394_onsil", "w_m6_2395_wanhwa", "w_m6_2396_oegyo", "w_m6_2397_oemo", "w_m6_2398_oebag", "w_m6_2399_oechul"]
    }),
    defineLesson({
      id: "w197-theme-243",
      stage: "W197",
      title: "Body and health",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for body and health.",
      newWordIds: ["w_m6_2400_oenson", "w_m6_2401_yoso", "w_m6_2402_yoyag", "w_m6_2403_yocheong", "w_m6_2404_yongdo", "w_m6_2405_yongeo", "w_m6_2406_yongpum", "w_m6_3035_jojik_tissue"]
    }),
    defineLesson({
      id: "w198-theme-244",
      stage: "W198",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2407_usu", "w_m6_2408_uyeon", "w_m6_2409_ujeong", "w_m6_2410_unmyeong", "w_m6_2500_wiro", "w_m6_2501_yuri", "w_m6_2502_yurihada"]
    }),
    defineLesson({
      id: "w199-theme-245",
      stage: "W199",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2503_yujeog", "w_m6_2504_yuhaeng", "w_m6_2505_yugsang", "w_m6_2506_euntoe", "w_m6_2507_uigyeon", "w_m6_2508_uido", "w_m6_2509_uisim"]
    }),
    defineLesson({
      id: "w200-theme-246",
      stage: "W200",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2510_uihoe", "w_m6_2511_ilon", "w_m6_2512_iryeog", "w_m6_2513_iig", "w_m6_2514_ijig", "w_m6_2515_ingyeog", "w_m6_2516_ingeun"]
    }),
    defineLesson({
      id: "w201-theme-247",
      stage: "W201",
      title: "occupations",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_2517_inryeog", "w_m6_2518_insang", "w_m6_2519_insig", "w_m6_2520_inteobyuyeo", "w_m6_2521_ilgi", "w_m6_2522_ilji", "w_m6_2523_ilche"]
    }),
    defineLesson({
      id: "w202-theme-248",
      stage: "W202",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2524_ilhaeng", "w_m6_2525_imsi", "w_m6_2526_ibgeum", "w_m6_2527_ibsa", "w_m6_2528_jagyeog", "w_m6_2529_jageum", "w_m6_2530_jarang"]
    }),
    defineLesson({
      id: "w203-theme-249",
      stage: "W203",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2531_jasin", "w_m6_2532_jandi", "w_m6_2533_jaemi", "w_m6_2534_jaesan", "w_m6_2535_jaehae", "w_m6_2536_jeohui", "w_m6_2537_jeoggeug"]
    }),
    defineLesson({
      id: "w204-theme-250",
      stage: "W204",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_2538_jeonseol", "w_m6_2539_jeontong", "w_m6_2540_jeolcha", "w_m6_2541_jeongo", "w_m6_2542_jeongjeong", "w_m6_2543_jejudo", "w_m6_2544_jechul"]
    }),
    defineLesson({
      id: "w205-theme-251",
      stage: "W205",
      title: "Hobbies and leisure",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for hobbies and leisure.",
      newWordIds: ["w_m6_2545_jogag", "w_m6_2546_juchajang", "w_m6_2547_jijin", "w_m6_2548_jiha", "w_m6_2549_jilseo", "w_m6_2550_taepung", "w_m6_2551_hanog"]
    }),
    defineLesson({
      id: "w206-theme-252",
      stage: "W206",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_2700_suyeob", "w_m6_2701_suwon", "w_m6_2702_sujeong", "w_m6_2703_supyeong", "w_m6_2704_sunsu", "w_m6_2705_sunjong", "w_m6_2706_sunchal"]
    }),
    defineLesson({
      id: "w207-theme-253",
      stage: "W207",
      title: "Travel and city",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for travel and city.",
      newWordIds: ["w_m6_2707_seungyongcha", "w_m6_2708_seubgi", "w_m6_2709_seubseong", "w_m6_2710_seungbu", "w_m6_2711_seungpae", "w_m6_2712_sigi", "w_m6_2713_siwi"]
    }),
    defineLesson({
      id: "w208-theme-254",
      stage: "W208",
      title: "occupations",
      subtitle: "Learn 8 common words",
      goal: "Expand your vocabulary for occupations.",
      newWordIds: ["w_m6_2714_siin", "w_m6_2715_sijeom", "w_m6_2716_sigyong", "w_m6_2717_sinsa", "w_m6_2718_silseubsaeng", "w_m6_2719_jinaon", "w_m6_2720_gakkai", "w_m6_3003_isa_director"]
    }),
    defineLesson({
      id: "w209-theme-255",
      stage: "W209",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2900_joesong", "w_m6_2901_wanbyeog", "w_m6_2902_jeongi", "w_m6_2903_jeonbu", "w_m6_2904_jeonhyeo", "w_m6_2905_hongbo", "w_m6_2906_moyang"]
    }),
    defineLesson({
      id: "w210-theme-256",
      stage: "W210",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2907_baegyeong", "w_m6_2908_seonjeong", "w_m6_2909_sido", "w_m6_2910_sijeol", "w_m6_2911_singyeong", "w_m6_2912_yaggan", "w_m6_2913_choegeun"]
    }),
    defineLesson({
      id: "w211-theme-257",
      stage: "W211",
      title: "Daily objects and technology",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for daily objects and technology.",
      newWordIds: ["w_m6_2914_chulsi", "w_m6_2915_bunmyeong", "w_m6_2916_seoljeong", "w_m6_2917_susang", "w_m6_2918_eomcheong", "w_m6_2919_yejeon", "w_m6_2920_jonghab"]
    }),
    defineLesson({
      id: "w212-theme-258",
      stage: "W212",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_2921_chugha", "w_m6_2922_tonghab", "w_m6_2923_gabjagi", "w_m6_2924_sojae", "w_m6_2925_sincheong", "w_m6_2926_isa", "w_m6_2927_jamsi"]
    }),
    defineLesson({
      id: "w213-theme-259",
      stage: "W213",
      title: "School and study",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_2928_hangnyeon", "w_m6_2929_hyeobhoe", "w_m6_2930_giban", "w_m6_2931_gihoeg", "w_m6_2932_manyag", "w_m6_2933_sujun", "w_m6_2934_jeobgeun"]
    }),
    defineLesson({
      id: "w214-theme-260",
      stage: "W214",
      title: "Core actions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for core actions.",
      newWordIds: ["w_m6_2935_chaji", "w_m6_2936_pihae", "w_m6_2937_gaggeum", "w_m6_2938_gaib", "w_m6_2939_gaenyeom", "w_m6_2940_gongyu", "w_m6_2941_tupyo"]
    }),
    defineLesson({
      id: "w215-theme-261",
      stage: "W215",
      title: "Feelings and descriptions",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for feelings and descriptions.",
      newWordIds: ["w_m6_2942_gijon", "w_m6_2943_damdang", "w_m6_2944_beomjoe", "w_m6_2945_samang", "w_m6_2946_sosig", "w_m6_2947_eneoji", "w_m6_2948_injeong"]
    }),
    defineLesson({
      id: "w216-theme-262",
      stage: "W216",
      title: "Time and daily rhythm",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for time and daily rhythm.",
      newWordIds: ["w_m6_2949_charye", "w_m6_2950_pogi", "w_m6_2951_georae", "w_m6_2952_gotong", "w_m6_2953_gughoe", "w_m6_2954_mugi", "w_m6_2955_munja"]
    }),
    defineLesson({
      id: "w217-theme-263",
      stage: "W217",
      title: "People and family",
      subtitle: "Learn 7 common words",
      goal: "Expand your vocabulary for people and family.",
      newWordIds: ["w_m6_2956_sonyeo", "w_m6_2957_eonjena", "w_m6_2958_jangmyeon", "w_m6_2959_jeongui", "w_m6_2960_jean", "w_m6_2961_jinsim", "w_m6_3040_charye_rites"]
    }),
    defineLesson({
      id: "w218-theme-264",
      stage: "W218",
      title: "School and study",
      subtitle: "Learn 9 common words",
      goal: "Expand your vocabulary for school and study.",
      newWordIds: ["w_m6_2962_jibjung", "w_m6_2963_teugjing", "w_m6_2964_haengjeong", "w_m6_2987_pulda_solve", "w_m6_2999_butda_pass", "w_m6_3000_sago_thinking", "w_m6_3002_jeongi_biography", "w_m6_3039_sijeom_viewpoint", "w_m6_3041_charye_contents"]
    }),
  ];
})();
