(function () {
  "use strict";

  const STAGE_ALLOCATIONS = Object.freeze({ P: 14, F: 3, X: 3, R: 2, C: 2 });
  const FINAL_ALLOCATIONS = Object.freeze({ P: 30, F: 6, X: 4, R: 5, C: 5 });
  const RETENTION_ALLOCATIONS = Object.freeze({ P: 15, F: 3, X: 2, R: 3, C: 2 });

  const STAGE_TAG_FLOORS = Object.freeze({
    1: Object.freeze({
      "present-polite": 6, "topic-neun": 3, "subject-i-ga": 3, "object-eul-reul": 4,
      "location-e": 2, "location-eseo": 2, "copula-ieyo": 2, "question-polite": 2,
      "time-expression": 2,
    }),
    2: Object.freeze({
      "present-polite": 4, "past-polite": 4, "future-geoyeyo": 3, "time-expression": 3,
      "object-eul-reul": 4, "subject-i-ga": 3, "topic-neun": 3, "location-e": 2,
      "location-eseo": 2, "neg-an": 2, "neg-mot": 1, "neg-ji-anta": 1,
      "want-go-sipda": 2, "can-su-itda": 2, "question-polite": 2,
    }),
    3: Object.freeze({
      "past-polite": 4, "future-geoyeyo": 4, "present-polite": 3, "formal-nida": 3,
      "honorific-si": 3, "imperative-seyo": 2, "propositive-eyo": 1, "neg-an": 2,
      "neg-mot": 2, "neg-ji-anta": 2, "and-go": 2, "but-jiman": 2,
      "because-aseo": 2, "if-myeon": 2, "when-ttae": 1, "object-eul-reul": 3,
      "subject-i-ga": 3, "topic-neun": 2,
    }),
    4: Object.freeze({
      "present-polite": 3, "past-polite": 4, "future-geoyeyo": 4, "formal-nida": 4,
      "honorific-si": 4, "object-eul-reul": 3, "subject-i-ga": 3, "topic-neun": 3,
      "time-expression": 3, "neg-an": 2, "neg-mot": 2, "neg-ji-anta": 2,
      "and-go": 2, "but-jiman": 2, "because-aseo": 2, "if-myeon": 2,
      "when-ttae": 2, "want-go-sipda": 2, "can-su-itda": 2, "must-ya-dwaeda": 2,
      "question-polite": 2, "imperative-seyo": 2,
    }),
  });

  const FINAL_TAG_FLOORS = Object.freeze({
    "object-eul-reul": 4, "present-polite": 4, "subject-i-ga": 4, "past-polite": 5,
    "topic-neun": 4, "time-expression": 3, "location-e": 3, "location-eseo": 3,
    "possessive-ui": 2, "because-aseo": 2, "imperative-seyo": 2, "copula-ieyo": 2,
    "direction-euro": 2, "honorific-si": 4, "and-go": 2, "question-polite": 2,
    "with-hago-wa": 2, "formal-nida": 4, "if-myeon": 2, "existence-itda": 2,
    "counter-phrase": 2, "when-ttae": 2, "can-su-itda": 2, "must-ya-dwaeda": 2,
    "also-do": 2, "comparison-boda": 2, "want-go-sipda": 2, "neg-ji-anta": 2,
    "neg-an": 2, "neg-mot": 2, "future-geoyeyo": 5, "until-kkaji": 1,
    "propositive-eyo": 1, "but-jiman": 2, "only-man": 1, "from-buteo": 1,
    "copula-negative-anieyo": 2,
  });

  const RETENTION_TAG_FLOORS = Object.freeze({
    "object-eul-reul": 2, "present-polite": 2, "subject-i-ga": 2, "past-polite": 3,
    "topic-neun": 2, "time-expression": 2, "location-e": 2, "location-eseo": 2,
    "possessive-ui": 1, "because-aseo": 1, "imperative-seyo": 1, "copula-ieyo": 1,
    "direction-euro": 1, "honorific-si": 2, "and-go": 1, "question-polite": 1,
    "with-hago-wa": 1, "formal-nida": 2, "if-myeon": 1, "existence-itda": 1,
    "counter-phrase": 1, "when-ttae": 1, "can-su-itda": 1, "must-ya-dwaeda": 1,
    "also-do": 1, "comparison-boda": 1, "want-go-sipda": 1, "neg-ji-anta": 1,
    "neg-an": 1, "neg-mot": 1, "future-geoyeyo": 3, "until-kkaji": 1,
    "propositive-eyo": 1, "but-jiman": 1, "only-man": 1, "from-buteo": 1,
    "copula-negative-anieyo": 1,
  });

  function stageSectionFloors(stage) {
    const floors = {};
    for (let band = 1; band <= stage; band += 1) floors[`band-${band}`] = band === stage ? 8 : 3;
    if (stage === 1) return Object.freeze({ "section-1": 8, "section-2": 8 });
    return Object.freeze(floors);
  }

  function stageBlueprint(order, id, title, sectionMax) {
    return Object.freeze({
      order, id, title, kind: "stage", scopeSectionOrders: Object.freeze(Array.from({ length: sectionMax }, (_, i) => i + 1)),
      unlockSectionOrders: Object.freeze(Array.from({ length: sectionMax }, (_, i) => i + 1)),
      itemCount: 24, timeLimitMinutes: 40, allocations: STAGE_ALLOCATIONS,
      tagFloors: STAGE_TAG_FLOORS[order], sectionFloors: stageSectionFloors(order),
      passPct: 75, distinctionPct: 90,
    });
  }

  const exams = Object.freeze([
    stageBlueprint(1, "sentence-exam-1", "Foundational Sentence Achievement Exam · 기초 문장 성취 시험", 2),
    stageBlueprint(2, "sentence-exam-2", "Time & Plans Sentence Achievement Exam · 시간과 계획 문장 성취 시험", 4),
    stageBlueprint(3, "sentence-exam-3", "Connected Sentence Achievement Exam · 연결 문장 성취 시험", 6),
    stageBlueprint(4, "sentence-exam-4", "Sentence Nuance Achievement Exam · 문장 뉘앙스 성취 시험", 8),
    Object.freeze({
      order: 5, id: "sentence-exam-5", title: "Sentence Mastery Final · 문장 완전 습득 최종 시험",
      kind: "final", scopeSectionOrders: Object.freeze([1,2,3,4,5,6,7,8]),
      unlockSectionOrders: Object.freeze([1,2,3,4,5,6,7,8]), itemCount: 50, timeLimitMinutes: 75,
      allocations: FINAL_ALLOCATIONS, tagFloors: FINAL_TAG_FLOORS,
      sectionFloors: Object.freeze({ "section-1":5,"section-2":5,"section-3":5,"section-4":5,"section-5":5,"section-6":5,"section-7":5,"section-8":5 }),
      passPct: 75, distinctionPct: 90, masteryQualifierPct: 88,
      retention: Object.freeze({
        id: "sentence-exam-5:retention", title: "Retention Confirmation · 지연 확인",
        itemCount: 25, timeLimitMinutes: 40, opensAfterDays: 7, expiresAfterDays: 21,
        allocations: RETENTION_ALLOCATIONS, tagFloors: RETENTION_TAG_FLOORS,
        sectionFloors: Object.freeze({ "band-1":5,"band-2":5,"band-3":5,"band-4":5 }),
        passPct: 75,
      }),
    }),
  ]);

  window.HANAPATH_SENTENCE_EXAMS = exams;
  window.HANAPATH_SENTENCE_EXAM_BLUEPRINTS = exams;
  window.HANAPATH_SENTENCE_EXAM_CAPACITY_SCAFFOLDS = Object.freeze({
    revision: "curated-sentence-exam-v2-cb6b-authoring",
    source: "docs/authoring/sentence_exam_cb6b_witness_assignment.json",
    exams: Object.freeze({
      "sentence-exam-1": "s0007:P,s0088:P,s0335:P,s0351:P,s0358:P,s0413:P,s0757:P,s2064:P,s2190:P,s2587:P,s3006:P,s3045:P,s3589:P,s3965:P,s0414:F,s3447:F,s3602:F,s0620:X,s0990:X,s3605:X,s0336:R,s1172:R,s0345:C,s0616:C/s0037:P,s0632:P,s0792:P,s0871:P,s0897:P,s2207:P,s2214:P,s2228:P,s2287:P,s2455:P,s2998:P,s3021:P,s3027:P,s3525:P,s2050:F,s2327:F,s3188:F,s2259:X,s2326:X,s3581:X,s0495:R,s1208:R,s0024:C,s0353:C/s0104:P,s0137:P,s0155:P,s0446:P,s0486:P,s0674:P,s0747:P,s0752:P,s0768:P,s0798:P,s2045:P,s2269:P,s2272:P,s3573:P,s2047:F,s3599:F,s4078:F,s2271:X,s2590:X,s3364:X,s0619:R,s1457:R,s0085:C,s0317:C/s0001:P,s0012:P,s0026:P,s0030:P,s0042:P,s0045:P,s0101:P,s0343:P,s0346:P,s0906:P,s2373:P,s2631:P,s2697:P,s2700:P,s2702:F,s3262:F,s4171:F,s2061:X,s4114:X,s4164:X,s0002:R,s0038:R,s0858:C,s1544:C/s0092:P,s0138:P,s0322:P,s0323:P,s0366:P,s0436:P,s0635:P,s0734:P,s0883:P,s2034:P,s2285:P,s2621:P,s3157:P,s3627:P,s0215:F,s0327:F,s0359:F,s0355:X,s0685:X,s2154:X,s0020:R,s1206:R,s0011:C,s1279:C",
      "sentence-exam-2": "s0037:P,s0210:P,s0322:P,s0323:P,s0327:P,s0351:P,s0355:P,s0394:P,s0413:P,s0415:P,s0747:P,s2207:P,s2401:P,s2417:P,s0883:F,s2285:F,s2621:F,s0485:X,s2259:X,s3332:X,s0830:R,s2194:R,s1270:C,s2160:C/s0043:P,s0092:P,s0215:P,s0256:P,s0264:P,s0280:P,s0343:P,s0359:P,s0414:P,s0433:P,s0901:P,s2154:P,s3006:P,s3372:P,s0418:F,s2206:F,s2437:F,s0486:X,s2200:X,s2264:X,s0336:R,s2219:R,s0317:C,s1208:C/s0026:P,s0060:P,s0217:P,s0235:P,s0257:P,s0262:P,s0284:P,s0366:P,s0421:P,s0446:P,s0490:P,s2045:P,s3075:P,s3364:P,s0406:F,s2343:F,s3973:F,s0391:X,s0407:X,s2466:X,s0810:R,s3461:R,s0353:C,s1206:C/s0007:P,s0030:P,s0071:P,s0100:P,s0101:P,s0113:P,s0138:P,s0155:P,s0219:P,s0346:P,s0436:P,s0668:P,s2190:P,s2271:P,s0897:F,s2097:F,s3447:F,s0088:X,s2269:X,s3027:X,s0495:R,s1200:R,s3348:C,s3976:C/s0001:P,s0012:P,s0042:P,s0045:P,s0104:P,s0137:P,s0335:P,s0401:P,s0411:P,s0530:P,s2228:P,s2631:P,s2702:P,s4171:P,s0103:F,s2372:F,s3951:F,s0358:X,s0434:X,s2188:X,s0989:R,s1172:R,s0896:C,s1276:C",
      "sentence-exam-3": "s0042:P,s0071:P,s0161:P,s0219:P,s0252:P,s0275:P,s0280:P,s0343:P,s0462:P,s0516:P,s2264:P,s2621:P,s3208:P,s3973:P,s2045:F,s2097:F,s2343:F,s0897:X,s2112:X,s2214:X,s1727:R,s2180:R,s1044:C,s2244:C/s0007:P,s0030:P,s0048:P,s0060:P,s0075:P,s0088:P,s0171:P,s0211:P,s0514:P,s2190:P,s2207:P,s3228:P,s3364:P,s3553:P,s0456:F,s2259:F,s2285:F,s0931:X,s2200:X,s2417:X,s1332:R,s1557:R,s2078:C,s2215:C/s0001:P,s0100:P,s0137:P,s0181:P,s0235:P,s0240:P,s0284:P,s0474:P,s0498:P,s2098:P,s2188:P,s2206:P,s3075:P,s3687:P,s0327:F,s2271:F,s3951:F,s2520:X,s3184:X,s3214:X,s0085:R,s0905:R,s1276:C,s3334:C/s0043:P,s0045:P,s0054:P,s0079:P,s0101:P,s0104:P,s0138:P,s0279:P,s0901:P,s1938:P,s2631:P,s3188:P,s3406:P,s3447:P,s0092:F,s2228:F,s4017:F,s2253:X,s2269:X,s3082:X,s1157:R,s1777:R,s0743:C,s1562:C/s0012:P,s0026:P,s0103:P,s0113:P,s0153:P,s0300:P,s0323:P,s0399:P,s1028:P,s1074:P,s2131:P,s2401:P,s2697:P,s3157:P,s0037:F,s3332:F,s3525:F,s0553:X,s3372:X,s3602:X,s0989:R,s3461:R,s0187:C,s0833:C",
      "sentence-exam-4": "s0012:P,s0050:P,s0060:P,s0165:P,s2099:P,s2188:P,s2253:P,s2259:P,s2269:P,s2702:P,s3075:P,s3157:P,s3240:P,s3332:P,s0309:F,s3184:F,s3553:F,s0130:X,s0901:X,s1011:X,s1049:R,s1276:R,s0830:C,s1063:C/s0280:P,s0371:P,s1028:P,s1092:P,s2154:P,s2207:P,s2224:P,s2377:P,s2417:P,s2631:P,s3228:P,s3384:P,s3908:P,s4171:P,s0514:F,s2098:F,s3372:F,s0709:X,s0712:X,s2697:X,s1557:R,s3461:R,s0982:C,s1727:C/s0070:P,s0312:P,s0923:P,s1097:P,s2045:P,s2112:P,s2190:P,s2271:P,s2314:P,s2401:P,s2520:P,s3082:P,s3214:P,s3364:P,s2097:F,s2621:F,s3396:F,s0300:X,s2587:X,s3234:X,s1052:R,s1930:R,s0810:C,s2093:C/s0040:P,s0609:P,s0931:P,s1865:P,s2206:P,s2223:P,s2228:P,s2285:P,s2483:P,s2499:P,s3188:P,s3525:P,s3951:P,s4020:P,s0380:F,s2264:F,s3973:F,s1938:X,s2200:X,s3058:X,s1304:R,s3344:R,s0353:C,s0905:C/s0056:P,s0068:P,s0235:P,s0471:P,s2214:P,s2343:P,s3027:P,s3191:P,s3379:P,s3447:P,s3602:P,s3667:P,s3687:P,s4164:P,s0871:F,s0897:F,s2568:F,s0732:X,s1074:X,s3406:X,s1199:R,s3348:R,s1845:C,s2244:C",
      "sentence-exam-5": "s0007:P,s0030:P,s0060:P,s0070:P,s0088:P,s0101:P,s0161:P,s0165:P,s0217:P,s0240:P,s0275:P,s0279:P,s0309:P,s0343:P,s0355:P,s0373:P,s0406:P,s0446:P,s0498:P,s0565:P,s0608:P,s0910:P,s1011:P,s2061:P,s2112:P,s2131:P,s2206:P,s2271:P,s3030:P,s3447:P,s0157:F,s0434:F,s0609:F,s1074:F,s2097:F,s2188:F,s2154:X,s2287:X,s3332:X,s3512:X,s0810:R,s0882:R,s1943:R,s2180:R,s2209:R,s0085:C,s1044:C,s1398:C,s1582:C,s3461:C/s0043:P,s0054:P,s0071:P,s0079:P,s0103:P,s0137:P,s0155:P,s0171:P,s0302:P,s0312:P,s0335:P,s0394:P,s0401:P,s0411:P,s0413:P,s0481:P,s0485:P,s0509:P,s0514:P,s0553:P,s0871:P,s0897:P,s0901:P,s2067:P,s2200:P,s2590:P,s2697:P,s3075:P,s3364:P,s4164:P,s0104:F,s0391:F,s0471:F,s2099:F,s2631:F,s3525:F,s0358:X,s0516:X,s2689:X,s3396:X,s1199:R,s1204:R,s1304:R,s1466:R,s2194:R,s0743:C,s1052:C,s1530:C,s1777:C,s2245:C/s0012:P,s0040:P,s0045:P,s0048:P,s0100:P,s0130:P,s0138:P,s0181:P,s0210:P,s0215:P,s0219:P,s0262:P,s0264:P,s0284:P,s0359:P,s0380:P,s0421:P,s0486:P,s0515:P,s0530:P,s0568:P,s0593:P,s0635:P,s1028:P,s2098:P,s2207:P,s2269:P,s2417:P,s2621:P,s3372:P,s0351:F,s0462:F,s0559:F,s2064:F,s2070:F,s2080:F,s2224:X,s2372:X,s3191:X,s3671:X,s0353:R,s0905:R,s0982:R,s1049:R,s1057:R,s0862:C,s1063:C,s1562:C,s1975:C,s2078:C/s0001:P,s0042:P,s0050:P,s0056:P,s0075:P,s0113:P,s0153:P,s0235:P,s0252:P,s0280:P,s0293:P,s0300:P,s0327:P,s0366:P,s0371:P,s0385:P,s0436:P,s0490:P,s0563:P,s0575:P,s1092:P,s2264:P,s2343:P,s2377:P,s2483:P,s2857:P,s3157:P,s3602:P,s4071:P,s4171:P,s0026:F,s0522:F,s2223:F,s3208:F,s3214:F,s3951:F,s0068:X,s2214:X,s3667:X,s3714:X,s0495:R,s1170:R,s1888:R,s2211:R,s2244:R,s0830:C,s1141:C,s1727:C,s1847:C,s1896:C/s0037:P,s0092:P,s0256:P,s0322:P,s0323:P,s0346:P,s0399:P,s0407:P,s0414:P,s0415:P,s0418:P,s0433:P,s0456:P,s0472:P,s0474:P,s0519:P,s0521:P,s0526:P,s0570:P,s0596:P,s0923:P,s0931:P,s1097:P,s1938:P,s2045:P,s2190:P,s2253:P,s2314:P,s2393:P,s3379:P,s0211:F,s0257:F,s0591:F,s0827:F,s0973:F,s2702:F,s2228:X,s3059:X,s3553:X,s3687:X,s1910:R,s1952:R,s2249:R,s3348:R,s3545:R,s0989:C,s1024:C,s1276:C,s2065:C,s3980:C",
    }),
  });
  window.HANAPATH_SENTENCE_EXAM_META = Object.freeze({
    schemaVersion: 1,
    blueprintVersion: 1,
    engineVersion: 1,
    engineRevision: "sentence-exam-engine-v1-x1",
    runnerVersion: null,
    contentBankRevision: "curated-sentence-exam-v2-cb6b",
    macrostrands: Object.freeze(["P", "F", "X", "R", "C"]),
    typedStrands: Object.freeze(["P", "F", "X"]),
    selectedStrands: Object.freeze(["R", "C"]),
    freshnessWindow: Object.freeze({ attempts: 5, maxCanonicalTargetUses: 1, fallbackSeedAttempts: 32 }),
    sentenceSubscoreGuard: Object.freeze({ noPctBelow: 8, directionalFrom: 5, floorFrom: 10 }),
    achievementStandardsProvisional: true,
  });
})();
