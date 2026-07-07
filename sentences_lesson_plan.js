// HanaPath sentence lesson plan (Sentences section curriculum).
// Plain static browser global — no modules, no build step. Loaded before app.js.
(function () {
  "use strict";

  window.HANAPATH_SENTENCE_LESSONS = [
    {
      id: "s0-topic-subject",
      title: "Topic & subject",
      concept: "Topic marker 은/는 introduces the main topic, while subject marker 이/가 focuses on the specific subject.",
      patternTags: ["topic-neun", "subject-i-ga"],
      sentenceIds: ["s0001", "s0002", "s0003", "s0024", "s0026", "s0030"]
    },
    {
      id: "s1-object-verb",
      title: "Object + verb",
      concept: "Identify the object of an action using the particle 을/를.",
      patternTags: ["object-eul-reul"],
      sentenceIds: ["s0002", "s0007", "s0008", "s0033", "s0062", "s0064"]
    },
    {
      id: "s2-location-direction",
      title: "Location & direction",
      concept: "Use 에 for destination/existence, 에서 for actions at a place, and 으로 for direction.",
      patternTags: ["location-e", "location-eseo", "direction-euro"],
      sentenceIds: ["s0043", "s0045", "s0114", "s0141", "s0170", "s0553"]
    },
    {
      id: "s3-past-tense",
      title: "Past tense",
      concept: "Describe past actions using the suffix 았/었어요.",
      patternTags: ["past-polite"],
      sentenceIds: ["s0324", "s0341", "s0641", "s0645", "s0785", "s2001"]
    },
    {
      id: "s4-future-tense",
      title: "Future tense",
      concept: "Express future plans or intentions using 거예요 or ㄹ게요.",
      patternTags: ["future-geoyeyo"],
      sentenceIds: ["s0019", "s0021", "s2020", "s2023", "s2045", "s2046"]
    },
    {
      id: "s5-basic-negation",
      title: "Basic negation",
      concept: "Negate actions and states using 안 (do not), 못 (cannot), or -지 않다.",
      patternTags: ["neg-an", "neg-mot", "neg-ji-anta"],
      sentenceIds: ["s0134", "s0235", "s0280", "s0281", "s0438", "s0670"]
    },
    {
      id: "s6-because-but",
      title: "Because & but",
      concept: "Connect sentences to show cause with 아서/어서 or contrast with 지만.",
      patternTags: ["because-aseo", "but-jiman"],
      sentenceIds: ["s0660", "s0722", "s0741", "s0744", "s0767", "s0841"]
    },
    {
      id: "s7-can-want",
      title: "Can & want",
      concept: "Express ability with ㄹ 수 있다 and desire with 고 싶다.",
      patternTags: ["can-su-itda", "want-go-sipda"],
      sentenceIds: ["s0353", "s0495", "s0779", "s0831", "s0955", "s2055"]
    },
    {
      id: "s8-must-should",
      title: "Must & should",
      concept: "Express obligation or necessity using -어야 하다/되다.",
      patternTags: ["must-ya-dwaeda"],
      sentenceIds: ["s0582", "s0760", "s0871", "s0923", "s0982", "s1053"]
    },
    {
      id: "s9-honorifics-formal",
      title: "Honorifics & formal",
      concept: "Use the honorific suffix -시- or the formal ending -습니다 to show politeness.",
      patternTags: ["honorific-si", "formal-nida"],
      sentenceIds: ["s0015", "s2031", "s2032", "s2033", "s2037", "s2040"]
    },
    {
      id: "s10-time-counters",
      title: "Telling time & counters",
      concept: "Learn how to tell time and count objects using number-classifier pairs.",
      patternTags: ["time-expression", "counter-phrase"],
      sentenceIds: ["s0050", "s0098", "s0099", "s0101", "s0103", "s0348"]
    },
    {
      id: "s11-existence-copula",
      title: "Existence & copula",
      concept: "State existence with 있다/없다 or identify things with copula 이다/아니다.",
      patternTags: ["existence-itda", "copula-ieyo", "copula-negative-anieyo"],
      sentenceIds: ["s0022", "s0025", "s0028", "s0030", "s0035", "s0043"]
    }
  ];
})();
