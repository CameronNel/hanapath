# Curriculum v2 P1-0 reconciliation

Source snapshot: immutable v1 data from commit `567aa098`. This PR creates no v2 plan, lock, app change, or durable v2 ID.

## Owner sign-off recorded

- Earliest curated duplicate placement retained.
- All 15 mixed/default connective rows moved to Grammar Glue.
- All 97 S1 words gate S2.
- S1–S8 are the finite required core; later expansion is elective.
- Content checkpoints cap at 18 prompts; unit checkpoints use 12–18 deterministic prompts.

## Reconciliation totals

- Curated words: 2028; legacy lessons: 298.
- Manifest destinations: 2028; S1 words: 97.
- Section unit counts: {"s2":11,"s3":11,"s4":10,"s5":10,"s6":10,"s7":10,"s8":10}.
- Contrast links: 59 ({"unique":51,"polysemous":6,"unresolved":2}).

## Duplicate placements

| Word ID | Surface | Retain | Remove | Reason |
|---|---|---|---|---|
| `w0610_eonje` | 언제 | `w6-time-daily-01` | `w38-theme-83` | Retain the earlier hand-curated daily-life placement; remove the later machine-tail duplicate. |
| `w1506_bae` | 배 | `w15-body-health-02` | `w24-theme-16` | Retain the earlier hand-curated body-health placement; remove the later machine-tail duplicate. |
| `fw1803_geona` | 거나 | `w18-connectives-01` | `w75-theme-121` | Retain the protected custom grammar placement; remove the mixed machine-tail duplicate. |
| `w_m6_3034_gujo_rescue` | 구조 | `w113-theme-159` | `w189-theme-235` | Retain the first curated rescue-themed placement; remove the later duplicate. |
| `w_m6_3035_jojik_tissue` | 조직 | `w149-theme-195` | `w197-theme-243` | Retain the first curated tissue-themed placement; remove the later duplicate. |

## Mixed connectives

| Word ID | Surface | Meaning | Destination |
|---|---|---|---|
| `w_m5_658_geuraeseo` | 그래서 | so / therefore | Grammar Glue |
| `w_m5_724_ttoneun` | 또는 | or | Grammar Glue |
| `w_m5_825_geurigo` | 그리고 | and | Grammar Glue |
| `w_m5_852_euro` | 으로 | to / toward / by means of | Grammar Glue |
| `w_m5_853_ege` | 에게 | to (a person - formal) | Grammar Glue |
| `w_m5_854_hante` | 한테 | to (a person - casual) | Grammar Glue |
| `w_m5_855_kkaji` | 까지 | until / up to | Grammar Glue |
| `w_m5_856_buteo` | 부터 | from / starting from | Grammar Glue |
| `w_m5_857_jiman` | 지만 | but / although | Grammar Glue |
| `w_m5_858_myeonseo` | 면서 | while / simultaneously | Grammar Glue |
| `w_m5_860_dorok` | 도록 | so that / in order to | Grammar Glue |
| `w_m5_861_ryeogo` | 려고 | in order to / intending to | Grammar Glue |
| `w_m5_863_chigo` | 치고 | for a / considering | Grammar Glue |
| `w_m5_864_jocha` | 조차 | even (extreme case / negation) | Grammar Glue |
| `w_m5_865_majeo` | 마저 | even (last remaining / negation) | Grammar Glue |

## ContrastWith resolution

Unique links resolve to IDs and may be co-located only when sense-safe. Polysemous and unresolved links remain report-only and are never forced together.

| From | Surface | Target surface | Status | Matches |
|---|---|---|---|---|
| w0003_mal | 말 | 말씀 | unique | w_m6_1512_malsseum |
| w0201_jeo_i | 저 | 나 | unique | w0202_na |
| w0202_na | 나 | 저 | polysemous | w0201_jeo_i, w0303_jeo_that_over |
| w0204_uri | 우리 | 저희 | unique | w_m6_2536_jeohui |
| w0209_ireum | 이름 | 성함 | unique | w1905_seongham |
| w0509_meokda | 먹다 | 드시다 | unique | w1903_deusida |
| w_m6_3027_itda_exist | 있다 | 계시다 | unique | w1902_gyesida |
| w0708_jada | 자다 | 주무시다 | unique | w1904_jumusida |
| fw1001_eun_neun | 은/는 | 이/가 | unique | fw1002_i_ga |
| fw1002_i_ga | 이/가 | 은/는 | unique | fw1001_eun_neun |
| fw1004_e | 에 | 에서 | unique | fw1005_eseo |
| fw1005_eseo | 에서 | 에 | unique | fw1004_e |
| fw1008_wa_gwa | 와/과 | 하고 | unique | fw1009_hago |
| fw1009_hago | 하고 | 와/과 | unique | fw1008_wa_gwa |
| fw1701_a_eo | 아/어 | 아요/어요 | unique | fw1702_ayo_eoyo |
| fw1702_ayo_eoyo | 아요/어요 | 아/어 | unique | fw1701_a_eo |
| fw1702_ayo_eoyo | 아요/어요 | 습니다 | unique | fw1703_seumnida |
| fw1703_seumnida | 습니다 | 아요/어요 | unique | fw1702_ayo_eoyo |
| fw1704_neyo | 네요 | 아요/어요 | unique | fw1702_ayo_eoyo |
| fw1705_lkkayo | (으)ㄹ까요? | 아요/어요 | unique | fw1702_ayo_eoyo |
| fw1711_an | 안 | 못 | unique | fw1712_mot |
| fw1711_an | 안 | 지 않다 | unique | fw1713_ji_anta |
| fw1712_mot | 못 | 안 | unique | fw1711_an |
| fw1712_mot | 못 | 지 못하다 | unique | fw1714_ji_mothada |
| fw1713_ji_anta | 지 않다 | 안 | unique | fw1711_an |
| fw1714_ji_mothada | 지 못하다 | 못 | unique | fw1712_mot |
| fw1715_asseoyo | 았어요/었어요 | 아요/어요 | unique | fw1702_ayo_eoyo |
| fw1801_myeon | (으)면 | 니까 | unresolved | — |
| fw1802_reo | (으)러 | (으)면 | unique | fw1801_myeon |
| fw1803_geona | 거나 | 고 | unique | fw1010_go |
| fw1804_jamaja | 자마자 | 다가 | unique | fw1805_daga |
| fw1805_daga | 다가 | 자마자 | unique | fw1804_jamaja |
| fw1806_ttaemune | 때문에 | 니까 | unresolved | — |
| fw1811_neun_mod | 는 | (으)ㄴ | polysemous | fw1812_eun_verb, fw1814_eun_adj |
| fw1812_eun_verb | (으)ㄴ | 는 | unique | fw1811_neun_mod |
| fw1813_eul_prosp | (으)ㄹ | 는 | unique | fw1811_neun_mod |
| fw1813_eul_prosp | (으)ㄹ | (으)ㄴ | polysemous | fw1812_eun_verb, fw1814_eun_adj |
| fw1814_eun_adj | (으)ㄴ | 는 | unique | fw1811_neun_mod |
| fw1901_si | (으)시 | 아요/어요 | unique | fw1702_ayo_eoyo |
| fw1901_si | (으)시 | 습니다 | unique | fw1703_seumnida |
| w1902_gyesida | 계시다 | 있다 | polysemous | w0702_itda, w_m6_3027_itda_exist |
| w1903_deusida | 드시다 | 먹다 | unique | w0509_meokda |
| w1904_jumusida | 주무시다 | 자다 | unique | w0708_jada |
| w1905_seongham | 성함 | 이름 | unique | w0209_ireum |
| w1906_yeonse | 연세 | 나이 | unique | w_m6_1300_nai |
| w_m5_029_myeong | 명 | 분 | polysemous | w_m5_034_bun, w_m6_3023_bun_honorific |
| w_m6_3023_bun_honorific | 분 | 명 | unique | w_m5_029_myeong |
| w_m5_852_euro | 으로 | 에 | unique | fw1004_e |
| w_m5_853_ege | 에게 | 한테 | unique | w_m5_854_hante |
| w_m5_854_hante | 한테 | 에게 | unique | w_m5_853_ege |
| w_m5_855_kkaji | 까지 | 부터 | unique | w_m5_856_buteo |
| w_m5_856_buteo | 부터 | 까지 | unique | w_m5_855_kkaji |
| w_m5_864_jocha | 조차 | 마저 | unique | w_m5_865_majeo |
| w_m5_865_majeo | 마저 | 조차 | unique | w_m5_864_jocha |
| w_m6_1094_juda | 주다 | 드리다 | unique | w_m6_1370_deurida |
| w_m6_1300_nai | 나이 | 연세 | unique | w1906_yeonse |
| w_m6_1370_deurida | 드리다 | 주다 | unique | w_m6_1094_juda |
| w_m6_1512_malsseum | 말씀 | 말 | polysemous | w0003_mal, w_m5_132_mal_animal |
| w_m6_2536_jeohui | 저희 | 우리 | unique | w0204_uri |

## Exact S1 order

1. `w0001_hangul` — 한글
2. `w0002_hangugeo` — 한국어
3. `w0003_mal` — 말
4. `w0004_daneo` — 단어
5. `w0005_sori` — 소리
6. `w0006_ikda` — 읽다
7. `w0007_deutda` — 듣다
8. `w0008_sseuda` — 쓰다
9. `w0009_munjang` — 문장
10. `w0010_yeonseup` — 연습
11. `w0101_annyeonghaseyo` — 안녕하세요
12. `w0102_gamsahamnida` — 감사합니다
13. `w0103_ne` — 네
14. `w0104_aniyo` — 아니요
15. `w0105_juseyo` — 주세요
16. `w0106_joesonghamnida` — 죄송합니다
17. `w0107_gwaenchanayo` — 괜찮아요
18. `w0108_dowajuseyo` — 도와주세요
19. `w0109_jamsimanyo` — 잠시만요
20. `w0110_mollayo` — 몰라요
21. `w0111_algesseoyo` — 알겠어요
22. `w0201_jeo_i` — 저
23. `w0205_saram` — 사람
24. `w0206_chingu` — 친구
25. `w0209_ireum` — 이름
26. `w0210_nugu` — 누구
27. `w0202_na` — 나
28. `w0203_neo` — 너
29. `w0204_uri` — 우리
30. `w0207_haksaeng` — 학생
31. `w0208_seonsaengnim` — 선생님
32. `w0304_igeo` — 이거
33. `w0305_geugeo` — 그거
34. `w0306_jeogeo` — 저거
35. `w0307_geot` — 것
36. `w0308_mwo` — 뭐
37. `w0301_i_this` — 이
38. `w0302_geu_that` — 그
39. `w0303_jeo_that_over` — 저
40. `w0309_chaek` — 책
41. `w0310_jeonhwa` — 전화
42. `w0901_eodi` — 어디
43. `w0902_wae` — 왜
44. `w0903_eotteoke` — 어떻게
45. `w0904_eolma` — 얼마
46. `w0905_myeot` — 몇
47. `w0906_museun` — 무슨
48. `w0907_eotteon` — 어떤
49. `w0908_eolmana` — 얼마나
50. `w_m5_001_il` — 일
51. `w_m5_002_i` — 이
52. `w_m5_003_sam` — 삼
53. `w_m5_004_sa` — 사
54. `w_m5_005_o` — 오
55. `w_m5_006_yuk` — 육
56. `w_m5_007_chil` — 칠
57. `w_m5_008_pal` — 팔
58. `w_m5_009_gu` — 구
59. `w_m5_010_sip` — 십
60. `w_m5_011_baek` — 백
61. `w_m5_012_cheon` — 천
62. `w_m5_013_man` — 만
63. `w_m5_014_hana` — 하나
64. `w_m5_015_dul` — 둘
65. `w_m5_016_set` — 셋
66. `w_m5_017_net` — 넷
67. `w_m5_018_daseot` — 다섯
68. `w_m5_019_yeoseot` — 여섯
69. `w_m5_020_ilgop` — 일곱
70. `w_m5_021_yeodeolp` — 여덟
71. `w_m5_022_ahop` — 아홉
72. `w_m5_023_yeol` — 열
73. `w_m5_024_seumul` — 스물
74. `w_m5_025_seoreun` — 서른
75. `w_m5_026_maheun` — 마흔
76. `w_m5_027_swin` — 쉰
77. `w_m5_028_gae` — 개
78. `w_m5_029_myeong` — 명
79. `w_m5_030_beon` — 번
80. `w_m5_031_sal` — 살
81. `w_m5_032_won` — 원
82. `w_m5_033_si` — 시
83. `w_m5_034_bun` — 분
84. `w_m5_035_mari` — 마리
85. `w_m5_036_gwon` — 권
86. `w_m5_037_byeong` — 병
87. `w_m5_038_jan` — 잔
88. `w_m5_039_geureut` — 그릇
89. `w_m5_040_jang` — 장
90. `w_m5_041_dae` — 대
91. `w_m5_042_beol` — 벌
92. `w_m5_043_kyeolle` — 켤레
93. `w_m5_360_mueot` — 무엇
94. `w_m5_361_eoneu` — 어느
95. `w_m5_362_igeot` — 이것
96. `w_m5_363_geugeot` — 그것
97. `w_m5_364_jeogeot` — 저것

## Concrete S2 preview

### s2-actions-u1 (actions)

- Lessons: `s2-actions-u1-l1`, `s2-actions-u1-l2`, `s2-actions-u1-l3`
- Words: `w_m5_392_saenggak`, `w_m5_614_sijak`, `w_m5_615_sarang`, `w_m5_616_sayong`, `w0704_boda`, `w_m5_829_dasi`, `w_m5_623_chamyeo`, `w_m5_624_jinhaeng`, `w_m5_617_junbi`, `w_m5_618_hwagin`, `w_m5_625_jejak`, `w_m5_620_gyehoek`, `w_m5_619_gyeoljeong`, `w_m5_622_iyong`, `w_m6_1080_gonggae`, `w_m6_1081_jiwon`, `w_m6_1082_gaebal`, `w_m5_621_balgyeon`, `w_m5_626_unyeong`, `w_m5_627_panmae`, `w_m6_1256_chucheon`, `w_m6_1083_seontaek`, `w_m6_1350_doum`, `w_m6_1507_butak`, `w_m6_1511_chuga`, `w_m6_1275_gwanri`, `w_m6_1513_seolchi`, `w_m6_1531_daesin`, `w_m5_430_haengdong`, `w_m6_2012_byeongyeong`, `w_m6_2018_yuji`, `w_m6_2027_cheori`

### s2-daily-u1 (daily)

- Lessons: `s2-daily-u1-l1`, `s2-daily-u1-l2`, `s2-daily-u1-l3`
- Words: `w_m2_hae_year`, `w_m5_218_ju_week`, `w_m5_810_wol`, `w_m5_812_nyeon`, `w_m5_813_ttae`, `w_m5_797_jeon`, `w_m5_819_du`, `w0605_sigan`, `w0604_jigeum`, `w_m5_782_hu`, `w0609_nal`, `w0601_oneul`, `w_m6_1127_kkeut`, `w_m5_226_daeum`, `w_m5_733_ije`, `w_m5_721_dongan`, `w_m5_224_ibeon`, `w_m5_727_bam`, `w_m5_728_bul`, `w_m5_749_hyeonjae`, `w_m5_659_ihu`, `w1201_bang`, `w1211_mun`, `w_m5_217_cho`, `w_m5_222_haru`, `w0610_eonje`, `w_m6_1252_meonjeo`, `w0606_achim`, `w_m6_1128_gwajeong`, `w_m5_387_insaeng`

### s2-feelings-u1 (feelings)

- Lessons: `s2-feelings-u1-l1`, `s2-feelings-u1-l2`, `s2-feelings-u1-l3`
- Words: `w_m5_840_deo`, `w_m5_841_ani`, `w_m5_848_jal`, `w_m5_821_dareun`, `w_m5_850_jom`, `w_m5_830_hamkke`, `w_m5_833_tto`, `w_m5_839_neomu`, `w_m5_763_isang`, `w_m5_743_modeun`, `w_m5_744_piryo`, `w_m5_745_jeongmal`, `w_m6_2531_jasin`, `w_m6_1410_modu`, `w_m6_1395_mani`, `w_m5_631_ganeung`, `w_m5_826_geunyang`, `w_m5_719_jinjja`, `w_m5_720_gyeongu`, `w_m5_722_cheot`, `w_m5_723_jeongdo`, `w_m5_718_jagi`, `w_m5_647_cheoeum`, `w_m5_740_ttohan`, `w_m5_742_gamsa`, `w_m5_632_anjeon`, `w_m5_754_gyesok`, `w_m5_760_ajik`, `w_m5_630_jungyo`, `w_m5_706_choego`

### s2-food-u1 (food)

- Lessons: `s2-food-u1-l1`, `s2-food-u1-l2`, `s2-food-u1-l3`
- Words: `w0505_cha`, `w0501_mul`, `w_m6_2969_bam_chestnut`, `w_m6_3024_bae_pear`, `w_m5_149_ramyeon`, `w_m6_1108_mat`, `w0503_eumsik`, `w0502_bap`, `w0504_keopi`, `w_m5_147_guk`, `w_m6_1110_sagwa`, `w_m6_3004_sosig_eating`, `w_m5_396_siksa`, `w0508_ppang`, `w0506_gogi`, `w_m5_155_maekju`, `w_m5_803_sikpum`, `w_m5_399_yangsik`, `w_m5_397_sikdang`, `w_m5_150_chizeu`, `w0507_gwail`, `w_m6_1109_menyu`, `w_m6_1113_mandu`, `w_m5_137_uyu`, `w_m6_1381_tteok`, `w_m5_715_gimchi`, `w_m5_140_sogeum`, `w_m5_153_chokollit`, `w_m5_139_gyeran`, `w_m5_141_seoltang`, `w_m5_152_satang`

### s2-grammar-u1 (grammar)

- Lessons: `s2-grammar-u1-l1`, `s2-grammar-u1-l2`
- Words: `fw1001_eun_neun`, `fw1002_i_ga`, `fw1003_eul_reul`, `fw1004_e`, `fw1006_do`, `fw1005_eseo`, `fw1007_ui`, `fw1008_wa_gwa`, `fw1009_hago`, `fw1010_go`

### s2-nature-u1 (nature)

- Lessons: `s2-nature-u1-l1`, `s2-nature-u1-l2`, `s2-nature-u1-l3`
- Words: `w_m5_206_hae_sun`, `w_m5_132_mal_animal`, `w_m5_115_gae`, `w1618_dal`, `w1602_bi`, `w_m5_649_sasil`, `w_m5_650_maeum`, `w_m5_651_sesang`, `w1616_nun`, `w_m5_652_iyagi`, `w_m5_653_iyu`, `w_m2_bul_fire`, `w1619_byeol`, `w_m5_119_so`, `w_m5_117_sae`, `w_m5_654_sanghwang`, `w_m5_129_yang`, `w_m6_1253_jonjae`, `w_m5_655_naeyong`, `w_m5_210_san`, `w_m5_520_pul_grass`, `w_m5_212_dol`, `w_m5_211_gang`, `w_m6_1546_uju`, `w1603_baram`, `w_m6_2040_jigu`, `w_m5_114_dongmul`, `w_m6_1376_ttang`, `w_m6_1264_jayeon`, `w1609_namu`

### s2-people-u1 (people)

- Lessons: `s2-people-u1-l1`, `s2-people-u1-l2`, `s2-people-u1-l3`
- Words: `w_m5_635_yeoja`, `w_m5_636_namja`, `w_m5_637_ai`, `w_m5_048_hyeong`, `w_m5_638_yeoseong`, `w_m5_639_ingan`, `w_m5_044_gajok`, `w_m5_053_adeul`, `w_m5_047_eomma`, `w_m5_640_abeoji`, `w_m6_1175_gaein`, `w_m6_1509_gyeolhon`, `w_m5_054_ttal`, `w_m6_1284_geureup`, `w_m6_1530_danche`, `w_m6_2536_jeohui`, `w_m5_641_eomeoni`, `w_m5_052_dongsaeng`, `w_m5_045_bumo`, `w_m6_1300_nai`, `w_m5_046_appa`, `w_m6_2070_sogae`, `w_m6_1303_namseong`, `w_m6_2076_membeo`, `w_m5_051_eonni`, `w_m6_2098_bonin`, `w_m6_1569_moksori`, `w_m5_056_anae`, `w_m6_2921_chugha`, `w_m5_050_oppa`, `w_m6_3040_charye_rites`, `w_m6_2956_sonyeo`, `w_m6_1169_agi`

### s2-shopping-u1 (shopping)

- Lessons: `s2-shopping-u1-l1`, `s2-shopping-u1-l2`, `s2-shopping-u1-l3`
- Words: `w_m5_758_sin`, `w1401_don`, `w1402_gagyeok`, `w_m6_1250_gyeongje`, `w_m6_1418_muryo`, `w_m6_1526_seobiseu`, `w_m6_1539_seonmul`, `w1403_kadeu`, `w1411_sijang`, `w_m6_2037_gwanggo`, `w_m6_3037_kodeu_dress`, `w_m6_2050_hugi`, `w_m6_2073_gyeyak`, `w_m6_1178_gumae`, `w_m6_2951_georae`, `w_m6_2388_yeyag`, `w_m6_1186_yeongeop`, `w_m6_2518_insang`, `w_m6_1179_gyesan`, `w_m5_673_gyohwan`, `w_m6_1185_biyong`, `w_m6_3026_tonghwa_currency`, `w_m6_2130_gogaek`, `w_m6_2534_jaesan`, `w_m6_1571_muyeok`, `w1410_gage`, `w_m5_770_daehyeong`, `w_m6_2325_sinyong`, `w_m5_097_moja`, `w_m6_2513_iig`

### s2-study-u1 (study)

- Lessons: `s2-study-u1-l1`, `s2-study-u1-l2`, `s2-study-u1-l3`
- Words: `w_m5_759_jul`, `w_m5_822_munje`, `w_m5_429_hwalldong`, `w_m5_691_bangbeop`, `w_m5_608_gyoyuk`, `w_m5_609_yeongu`, `w_m6_1000_gyeolgwa`, `w_m6_1386_tteut`, `w_m6_1001_girok`, `w_m6_1002_uimi`, `w_m5_607_daehak`, `w_m5_612_gieok`, `w_m5_613_balpyo`, `w_m5_610_yeoksa`, `w_m5_611_ihae`, `w_m6_1003_gijun`, `w_m6_1251_daesang`, `w_m6_1255_josa`, `w_m6_1257_guseong`, `w_m6_3017_gwajeong_course`, `w_m6_1504_bigyo`, `w_m6_1005_seonggong`, `w_m6_1013_eumak`, `w_m2_pul_glue`, `w_m6_1512_malsseum`, `w_m5_418_jilmun_sino`, `w_m6_1533_bangsik`, `w_m6_3000_sago_thinking`, `w_m6_1535_seonsaeng`, `w_m6_1011_seolmyeong`

### s2-tech-u1 (tech)

- Lessons: `s2-tech-u1-l1`, `s2-tech-u1-l2`, `s2-tech-u1-l3`
- Words: `w_m6_1138_ja`, `w1120_sajin`, `w_m6_1136_gisul`, `w1118_inteonet`, `w_m6_3036_model_prototype`, `w_m6_1527_siseutem`, `w_m6_1537_yeongyeol`, `w1103_ot`, `w_m6_2002_onrain`, `w_m6_2006_hompeiji`, `w_m6_2031_gineung`, `w_m6_2038_beonho`, `w_m6_2049_kodeu`, `w_m6_1556_baljeon`, `w_m6_2052_beojeon`, `w_m6_2066_juso`, `w1108_keompyuteo`, `w_m6_2075_ringkeu`, `w_m6_2092_jangchi`, `w_m6_2104_boan`, `w_m5_794_jadong`, `w_m6_2902_jeongi`, `w_m6_2914_chulsi`, `w_m6_2916_seoljeong`, `w_m6_2924_sojae`, `w_m6_2365_yeonrag`, `w1110_kamera`, `w_m6_2940_gongyu`, `w_m6_2302_sogdo`, `w_m6_2948_injeong`

### s2-travel-u1 (travel)

- Lessons: `s2-travel-u1-l1`, `s2-travel-u1-l2`, `s2-travel-u1-l3`
- Words: `w_m5_769_wi`, `w_m5_642_hanguk`, `w_m6_2966_cha_car`, `w0404_jip`, `w1309_gil`, `w_m5_643_seoul`, `w_m5_789_got`, `w_m5_644_segye`, `w_m5_646_jiyeok`, `w0405_hakgyo`, `w_m6_1215_ap`, `w_m5_377_miguk`, `w_m5_379_ilbon`, `w_m5_746_dwi`, `w0401_yeogi`, `w_m5_741_bak`, `w_m5_660_bangsong`, `w_m5_645_nara`, `w_m5_656_sahoe`, `w_m5_661_jeongbo`, `w_m5_657_jeongbu`, `w_m5_376_jungguk`, `w_m5_382_gukga`, `w_m5_412_munhwa`, `w_m5_191_bae_boat`, `w_m5_195_dosi`, `w_m6_1019_sageon`, `w_m6_1217_sai`, `w_m6_1213_wichi`, `w0406_hoesa`

## Workload prototype

- A 10-word content lesson gives all 10 words card/audio exposure and one typed production attempt during study, then at most 18 checkpoint prompts: 10 alternating recognition, 5 delayed typed prompts, and up to 3 context prompts.
- A 30-word unit checkpoint uses a deterministic 12–18 prompt mastery sample, rotating sampled word indexes between attempts; it has no study phase, no typed requirement, and passes at 80% first try.
- Wrong answers seed targeted remediation without expanding the initial prompt wall.

## Self-check contract

The companion script verifies exact coverage, one content destination per word, balanced lesson/unit partitions, S1 ordering, duplicate removal, connective classification, contrast resolution reporting, and byte-identical regeneration.
