const sc = ["개", "명", "마리", "대", "번", "잔", "병", "살", "장", "권", "시간", "달", "년", "일", "시", "분", "초", "가지", "종류", "바퀴", "켤레", "그릇", "벌", "박", "등", "원", "퍼센트", "사람", "분"];
const ko = "두 부서는 동등한 권리와 책임을 지고 일해요.";
for (const cls of sc) {
  const r1 = new RegExp(`[일이삼사오육칠팔구십백천만학한두세네다섯여섯일곱여덟아홉열스물서른마흔쉰]\\s*${cls}`);
  if (r1.test(ko)) {
    console.log(`Matched classifier: "${cls}" with regex: ${r1.source}`);
  }
}
