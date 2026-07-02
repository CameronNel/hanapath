(function () {
  "use strict";

  if (window.__curatedWordDetailPatchInstalled) {
    return;
  }
  window.__curatedWordDetailPatchInstalled = true;

  const detailById = {
    w0006_ikda: {
      examplePronunciation: "chaegeul ilgeoyo",
      formNote: "읽다 is the dictionary form. In this sentence it becomes 읽어요 by adding -어요. The final ㄺ is pronounced like ㄱ in this form.",
      soundNote: "책을 links lightly in speech: 책을 → 채글, so the example sounds closer to chae-geul il-geo-yo.",
    },
    w0007_deutda: {
      examplePronunciation: "eumageul deureoyo",
      formNote: "듣다 is the dictionary form. In this sentence it becomes 들어요 because ㄷ irregular verbs change ㄷ to ㄹ before a vowel ending: 듣 + 어요 → 들어요.",
      soundNote: "음악을 links in speech: 음악을 → 으마글, so the example sounds closer to eu-ma-geul deu-reo-yo.",
    },
    w0008_sseuda: {
      examplePronunciation: "ireumeul sseoyo",
      formNote: "쓰다 is the dictionary form. In this sentence it becomes 써요 because the ㅡ vowel drops before -어요.",
    },
    w0409_gada: {
      examplePronunciation: "jigeum gayo",
      formNote: "가다 is the dictionary form. In this sentence it becomes 가요 because polite present uses the stem 가 plus -요.",
    },
    w0410_oda: {
      examplePronunciation: "chinguga wayo",
      formNote: "오다 is the dictionary form. In this sentence it becomes 와요 because 오 + 아요 contracts to 와요.",
    },
    w0509_meokda: {
      examplePronunciation: "mwo meogeoyo",
      formNote: "먹다 is the dictionary form. In this sentence it becomes 먹어요 by adding the polite present ending -어요.",
    },
    w0510_masida: {
      examplePronunciation: "mureul masyeoyo",
      formNote: "마시다 is the dictionary form. In this sentence it becomes 마셔요 because 시 + 어요 contracts to 셔요.",
    },
    w0701_hada: {
      examplePronunciation: "mwo haeyo",
      formNote: "하다 is the dictionary form. In this sentence it becomes 해요, the normal polite present form of 하다.",
    },
    w0702_itda: {
      examplePronunciation: "sigani isseoyo",
      formNote: "있다 is the dictionary form. In this sentence it becomes 있어요, the normal polite present form of 있다.",
    },
    w0703_eopda: {
      examplePronunciation: "sigani eopseoyo",
      formNote: "없다 is the dictionary form. In this sentence it becomes 없어요, the normal polite present form of 없다.",
    },
    w0704_boda: {
      examplePronunciation: "yeonghwareul bwayo",
      formNote: "보다 is the dictionary form. In this sentence it becomes 봐요 because 보 + 아요 contracts to 봐요.",
    },
    w0705_malhada: {
      examplePronunciation: "cheoncheonhi malhae juseyo",
      formNote: "말하다 is the dictionary form. In this sentence it becomes 말해 주세요 because 하다-verbs commonly contract to 해요 and 해 주세요 in polite speech.",
    },
    w0706_sada: {
      examplePronunciation: "ppangeul sayo",
      formNote: "사다 is the dictionary form. In this sentence it becomes 사요, the polite present form of 사다.",
    },
    w0707_mannada: {
      examplePronunciation: "naeil chingureul mannayo",
      formNote: "만나다 is the dictionary form. In this sentence it becomes 만나요, the polite present form of 만나다.",
    },
    w0708_jada: {
      examplePronunciation: "jal jayo",
      formNote: "자다 is the dictionary form. In this sentence it becomes 자요, the polite present form of 자다.",
    },
    w0709_ireonada: {
      examplePronunciation: "achim-e iljjik ireonayo",
      formNote: "일어나다 is the dictionary form. In this sentence it becomes 일어나요, the polite present form of 일어나다.",
    },
    w0710_joahada: {
      examplePronunciation: "keopireul joahaeyo",
      formNote: "좋아하다 is the dictionary form. In this sentence it becomes 좋아해요 because 하다 contracts to 해요 in polite speech.",
    },
    w0801_jota: {
      examplePronunciation: "nalssiga joayo",
      formNote: "좋다 is the dictionary form. In this sentence it becomes 좋아요, the polite present form of 좋다.",
      soundNote: "좋아요 is heard as joayo because ㅎ drops before the vowel.",
    },
    w0802_silta: {
      examplePronunciation: "biga silheoyo",
      formNote: "싫다 is the dictionary form. In this sentence it becomes 싫어요, the polite present form of 싫다.",
    },
    w0803_keuda: {
      examplePronunciation: "jibi keoyo",
      formNote: "크다 is the dictionary form. In this sentence it becomes 커요 because 크 + 어요 contracts to 커요.",
    },
    w0804_jakda: {
      examplePronunciation: "bangi jagayo",
      formNote: "작다 is the dictionary form. In this sentence it becomes 작아요, the polite present form of 작다.",
    },
    w0805_manta: {
      examplePronunciation: "sarami manayo",
      formNote: "많다 is the dictionary form. In this sentence it becomes 많아요, the polite present form of 많다.",
    },
    w0806_jeokda: {
      examplePronunciation: "sigani jeogeoyo",
      formNote: "적다 is the dictionary form. In this sentence it becomes 적어요, the polite present form of 적다.",
    },
    w0807_jaemiitda: {
      examplePronunciation: "i chaegeun jaemiisseoyo",
      formNote: "재미있다 is the dictionary form. In this sentence it becomes 재미있어요, the polite present form of 재미있다.",
    },
    w0808_pigonhada: {
      examplePronunciation: "oneul neomu pigonhaeyo",
      formNote: "피곤하다 is the dictionary form. In this sentence it becomes 피곤해요 because 하다 contracts to 해요.",
    },
    w0809_masitda: {
      examplePronunciation: "i ppangeun masisseoyo",
      formNote: "맛있다 is the dictionary form. In this sentence it becomes 맛있어요, the polite present form of 맛있다.",
    },
    w0810_yeppeuda: {
      examplePronunciation: "kkocchi yeppeoyo",
      formNote: "예쁘다 is the dictionary form. In this sentence it becomes 예뻐요, the polite present form of 예쁘다.",
    },
  };

  const words = Array.isArray(window.HANAPATH_CURATED_WORDS) ? window.HANAPATH_CURATED_WORDS : [];
  words.forEach((word) => {
    if (!word || !word.id) {
      return;
    }

    const details = detailById[word.id];
    if (details) {
      Object.assign(word, details);
    }
  });
})();
