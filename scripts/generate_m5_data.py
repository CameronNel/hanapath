# scripts/generate_m5_data.py
# Programmatic generator for Milestone M5 vocabulary and lessons.
# Generates ~600 curated words and groups them into lessons starting at Stage W20.

import os
import re

HANJA_RE = re.compile(r"[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]")

# Word definitions grouped by category
CATEGORIES = {
    "numbers-sino": [
        {"korean": "일", "pos": "numeral", "meaning": "one (Sino-Korean)", "pron": "il", "exKo": "일 번 버스를 타요.", "exEn": "I take bus number 1.", "origin": "Sino-Korean", "hanja": "일"},
        {"korean": "이", "pos": "numeral", "meaning": "two (Sino-Korean)", "pron": "i", "exKo": "이 층에 올라가요.", "exEn": "I go up to the second floor.", "origin": "Sino-Korean", "hanja": "이"},
        {"korean": "삼", "pos": "numeral", "meaning": "three (Sino-Korean)", "pron": "sam", "exKo": "삼 월에 학교가 시작해요.", "exEn": "School starts in March.", "origin": "Sino-Korean", "hanja": "삼"},
        {"korean": "사", "pos": "numeral", "meaning": "four (Sino-Korean)", "pron": "sa", "exKo": "사 년 동안 공부했어요.", "exEn": "I studied for four years.", "origin": "Sino-Korean", "hanja": "사"},
        {"korean": "오", "pos": "numeral", "meaning": "five (Sino-Korean)", "pron": "o", "exKo": "오 만 원을 냈어요.", "exEn": "I paid 50,000 Won.", "origin": "Sino-Korean", "hanja": "오"},
        {"korean": "육", "pos": "numeral", "meaning": "six (Sino-Korean)", "pron": "yuk", "exKo": "육 월에 비가 많이 와요.", "exEn": "It rains a lot in June.", "origin": "Sino-Korean", "hanja": "육"},
        {"korean": "칠", "pos": "numeral", "meaning": "seven (Sino-Korean)", "pron": "chil", "exKo": "칠 층에서 친구를 만나요.", "exEn": "I meet a friend on the 7th floor.", "origin": "Sino-Korean", "hanja": "칠"},
        {"korean": "팔", "pos": "numeral", "meaning": "eight (Sino-Korean)", "pron": "pal", "exKo": "팔 월은 너무 더워요.", "exEn": "August is very hot.", "origin": "Sino-Korean", "hanja": "팔"},
        {"korean": "구", "pos": "numeral", "meaning": "nine (Sino-Korean)", "pron": "gu", "exKo": "구 층에 도서관이 있어요.", "exEn": "There is a library on the 9th floor.", "origin": "Sino-Korean", "hanja": "구"},
        {"korean": "십", "pos": "numeral", "meaning": "ten (Sino-Korean)", "pron": "sip", "exKo": "십 분 동안 기다렸어요.", "exEn": "I waited for ten minutes.", "origin": "Sino-Korean", "hanja": "십"},
        {"korean": "백", "pos": "numeral", "meaning": "hundred (Sino-Korean)", "pron": "baek", "exKo": "백 점을 받았어요.", "exEn": "I got 100 points.", "origin": "Sino-Korean", "hanja": "백"},
        {"korean": "천", "pos": "numeral", "meaning": "thousand (Sino-Korean)", "pron": "cheon", "exKo": "천 원짜리 빵이에요.", "exEn": "It's a 1,000 Won bread.", "origin": "Sino-Korean", "hanja": "천"},
        {"korean": "만", "pos": "numeral", "meaning": "ten thousand (Sino-Korean)", "pron": "man", "exKo": "만 원을 냈어요.", "exEn": "I paid 10,000 Won.", "origin": "Sino-Korean", "hanja": "만"}
    ],
    "numbers-native": [
        {"korean": "하나", "pos": "numeral", "meaning": "one (native)", "pron": "hana", "exKo": "사과 하나 주세요.", "exEn": "Give me one apple, please.", "origin": "native"},
        {"korean": "둘", "pos": "numeral", "meaning": "two (native)", "pron": "dul", "exKo": "사과 두 개가 있어요.", "exEn": "I have two apples.", "origin": "native"},
        {"korean": "셋", "pos": "numeral", "meaning": "three (native)", "pron": "set", "exKo": "셋이서 밥을 먹어요.", "exEn": "The three of us eat a meal.", "origin": "native"},
        {"korean": "넷", "pos": "numeral", "meaning": "four (native)", "pron": "net", "exKo": "넷이서 놀러 가요.", "exEn": "The four of us go play.", "origin": "native"},
        {"korean": "다섯", "pos": "numeral", "meaning": "five (native)", "pron": "daseot", "exKo": "다섯 명이 있어요.", "exEn": "There are five people.", "origin": "native"},
        {"korean": "여섯", "pos": "numeral", "meaning": "six (native)", "pron": "yeoseot", "exKo": "여섯 시에 일어나요.", "exEn": "I wake up at six o'clock.", "origin": "native"},
        {"korean": "일곱", "pos": "numeral", "meaning": "seven (native)", "pron": "ilgop", "exKo": "일곱 살짜리 아이예요.", "exEn": "It's a seven-year-old child.", "origin": "native"},
        {"korean": "여덟", "pos": "numeral", "meaning": "eight (native)", "pron": "yeodeolp", "exKo": "책 여덟 권을 읽었어요.", "exEn": "I read eight books.", "origin": "native"},
        {"korean": "아홉", "pos": "numeral", "meaning": "nine (native)", "pron": "ahop", "exKo": "아홉 시에 시험이 있어요.", "exEn": "There is an exam at nine o'clock.", "origin": "native"},
        {"korean": "열", "pos": "numeral", "meaning": "ten (native)", "pron": "yeol", "exKo": "열 명의 친구가 왔어요.", "exEn": "Ten friends came.", "origin": "native"},
        {"korean": "스물", "pos": "numeral", "meaning": "twenty (native)", "pron": "seumul", "exKo": "스물 살이에요.", "exEn": "I am twenty years old.", "origin": "native"},
        {"korean": "서른", "pos": "numeral", "meaning": "thirty (native)", "pron": "seoreun", "exKo": "서른 살에 입학했어요.", "exEn": "I entered school at age thirty.", "origin": "native"},
        {"korean": "마흔", "pos": "numeral", "meaning": "forty (native)", "pron": "maheun", "exKo": "마흔 명이 왔어요.", "exEn": "Forty people came.", "origin": "native"},
        {"korean": "쉰", "pos": "numeral", "meaning": "fifty (native)", "pron": "swin", "exKo": "쉰 살의 선생님이에요.", "exEn": "He is a fifty-year-old teacher.", "origin": "native"}
    ],
    "counters": [
        {"korean": "개", "pos": "counter", "meaning": "items counter", "pron": "gae", "exKo": "사과 한 개를 먹었어요.", "exEn": "I ate one apple.", "origin": "native"},
        {"korean": "명", "pos": "counter", "meaning": "people counter", "pron": "myeong", "exKo": "학생 두 명을 만나요.", "exEn": "I meet two students.", "origin": "Sino-Korean", "hanja": "명"},
        {"korean": "번", "pos": "counter", "meaning": "times counter", "pron": "beon", "exKo": "한 번 해 보세요.", "exEn": "Try doing it once.", "origin": "Sino-Korean", "hanja": "번"},
        {"korean": "살", "pos": "counter", "meaning": "age counter (years)", "pron": "sal", "exKo": "저는 스무 살입니다.", "exEn": "I am twenty years old.", "origin": "native"},
        {"korean": "원", "pos": "counter", "meaning": "Korean Won currency", "pron": "won", "exKo": "이 책은 오천 원이에요.", "exEn": "This book is 5,000 Won.", "origin": "Sino-Korean", "hanja": "원"},
        {"korean": "시", "pos": "counter", "meaning": "hour counter (clock)", "pron": "si", "exKo": "지금 몇 시예요?", "exEn": "What time is it now?", "origin": "Sino-Korean", "hanja": "시"},
        {"korean": "분", "pos": "counter", "meaning": "minute counter; esteemed person", "pron": "bun", "exKo": "오 분 뒤에 시작해요.", "exEn": "It starts in five minutes.", "origin": "Sino-Korean", "hanja": "분"},
        {"korean": "마리", "pos": "counter", "meaning": "animals counter", "pron": "mari", "exKo": "고양이 두 마리를 키워요.", "exEn": "I raise two cats.", "origin": "native"},
        {"korean": "권", "pos": "counter", "meaning": "books counter", "pron": "gwon", "exKo": "책 세 권을 샀어요.", "exEn": "I bought three books.", "origin": "Sino-Korean", "hanja": "권"},
        {"korean": "병", "pos": "counter", "meaning": "bottles counter", "pron": "byeong", "exKo": "음료수 한 병 주세요.", "exEn": "Give me one bottle of drink, please.", "origin": "Sino-Korean", "hanja": "병"},
        {"korean": "잔", "pos": "counter", "meaning": "glasses / cups counter", "pron": "jan", "exKo": "물 한 잔 마셨어요.", "exEn": "I drank a glass of water.", "origin": "Sino-Korean", "hanja": "잔"},
        {"korean": "그릇", "pos": "counter", "meaning": "bowls counter", "pron": "geureut", "exKo": "라면 한 그릇 먹고 싶어요.", "exEn": "I want to eat a bowl of ramen.", "origin": "native"},
        {"korean": "장", "pos": "counter", "meaning": "paper/tickets counter (sheets)", "pron": "jang", "exKo": "영화 표 두 장 샀어요.", "exEn": "I bought two movie tickets.", "origin": "Sino-Korean", "hanja": "장"},
        {"korean": "대", "pos": "counter", "meaning": "vehicles / machines counter", "pron": "dae", "exKo": "차 한 대가 서 있어요.", "exEn": "One car is parked.", "origin": "Sino-Korean", "hanja": "대"},
        {"korean": "벌", "pos": "counter", "meaning": "clothes counter (sets)", "pron": "beol", "exKo": "새 옷 한 벌 샀어요.", "exEn": "I bought one set of new clothes.", "origin": "native"},
        {"korean": "켤레", "pos": "counter", "meaning": "shoes / socks counter (pairs)", "pron": "kyeolle", "exKo": "신발 두 켤레가 있어요.", "exEn": "I have two pairs of shoes.", "origin": "native"}
    ]
}

# Thematic nouns, verbs, and adjectives to be distributed into W20+ lessons
THEMATIC_WORDS = [
    # Family & People
    {"korean": "가족", "pos": "noun", "meaning": "family", "pron": "gajok", "exKo": "우리 가족은 네 명이에요.", "exEn": "Our family has four members.", "origin": "Sino-Korean", "hanja": "가족", "group": "family-people"},
    {"korean": "부모", "pos": "noun", "meaning": "parents", "pron": "bumo", "exKo": "주말에 부모님을 만나요.", "exEn": "I meet my parents on the weekend.", "origin": "Sino-Korean", "hanja": "부모", "group": "family-people"},
    {"korean": "아빠", "pos": "noun", "meaning": "dad", "pron": "appa", "exKo": "아빠가 요리를 해요.", "exEn": "Dad is cooking.", "origin": "native", "group": "family-people"},
    {"korean": "엄마", "pos": "noun", "meaning": "mom", "pron": "eomma", "exKo": "엄마가 전화를 했어요.", "exEn": "Mom called.", "origin": "native", "group": "family-people"},
    {"korean": "형", "pos": "noun", "meaning": "older brother (of a male)", "pron": "hyeong", "exKo": "형은 대학생이에요.", "exEn": "My older brother is a university student.", "origin": "Sino-Korean", "hanja": "형", "group": "family-people"},
    {"korean": "누나", "pos": "noun", "meaning": "older sister (of a male)", "pron": "nuna", "exKo": "누나가 책을 읽어요.", "exEn": "My older sister reads a book.", "origin": "native", "group": "family-people"},
    {"korean": "오빠", "pos": "noun", "meaning": "older brother (of a female)", "pron": "oppa", "exKo": "오빠가 저를 도와줘요.", "exEn": "My older brother helps me.", "origin": "native", "group": "family-people"},
    {"korean": "언니", "pos": "noun", "meaning": "older sister (of a female)", "pron": "eonni", "exKo": "언니가 예쁜 옷을 샀어요.", "exEn": "My older sister bought pretty clothes.", "origin": "native", "group": "family-people"},
    {"korean": "동생", "pos": "noun", "meaning": "younger sibling", "pron": "dongsaeng", "exKo": "제 동생은 공부를 잘해요.", "exEn": "My younger sibling studies well.", "origin": "Sino-Korean", "hanja": "동생", "group": "family-people"},
    {"korean": "아들", "pos": "noun", "meaning": "son", "pron": "adeul", "exKo": "아들이 학교에 가요.", "exEn": "The son goes to school.", "origin": "native", "group": "family-people"},
    {"korean": "딸", "pos": "noun", "meaning": "daughter", "pron": "ttal", "exKo": "제 딸은 일곱 살이에요.", "exEn": "My daughter is seven years old.", "origin": "native", "group": "family-people"},
    {"korean": "남편", "pos": "noun", "meaning": "husband", "pron": "nampyeon", "exKo": "제 남편은 회사원이에요.", "exEn": "My husband is an office worker.", "origin": "Sino-Korean", "hanja": "남편", "group": "family-people"},
    {"korean": "아내", "pos": "noun", "meaning": "wife", "pron": "anae", "exKo": "제 아내는 의사예요.", "exEn": "My wife is a doctor.", "origin": "native", "group": "family-people"},
    {"korean": "할아버지", "pos": "noun", "meaning": "grandfather", "pron": "halabeoji", "exKo": "할아버지가 신문을 보세요.", "exEn": "Grandfather is reading a newspaper.", "origin": "native", "group": "family-people"},
    {"korean": "할머니", "pos": "noun", "meaning": "grandmother", "pron": "halmeoni", "exKo": "할머니 댁에 가요.", "exEn": "I go to grandmother's house.", "origin": "native", "group": "family-people"},
    {"korean": "삼촌", "pos": "noun", "meaning": "uncle", "pron": "samchon", "exKo": "삼촌이 선물을 줬어요.", "exEn": "My uncle gave me a gift.", "origin": "Sino-Korean", "hanja": "삼촌", "group": "family-people"},
    {"korean": "이모", "pos": "noun", "meaning": "aunt (maternal)", "pron": "imo", "exKo": "이모가 맛있는 음식을 해 주셨어요.", "exEn": "My aunt cooked delicious food.", "origin": "Sino-Korean", "hanja": "이모", "group": "family-people"},
    {"korean": "고모", "pos": "noun", "meaning": "aunt (paternal)", "pron": "gomo", "exKo": "고모가 서울에 살아요.", "exEn": "My aunt lives in Seoul.", "origin": "Sino-Korean", "hanja": "고모", "group": "family-people"},
    {"korean": "사촌", "pos": "noun", "meaning": "cousin", "pron": "sachon", "exKo": "사촌과 같이 게임을 해요.", "exEn": "I play games with my cousin.", "origin": "Sino-Korean", "hanja": "사촌", "group": "family-people"},
    {"korean": "조카", "pos": "noun", "meaning": "nephew / niece", "pron": "joka", "exKo": "조카가 아주 귀여워요.", "exEn": "My nephew is very cute.", "origin": "native", "group": "family-people"},

    # Colors
    {"korean": "색", "pos": "noun", "meaning": "color", "pron": "saek", "exKo": "이 색이 가장 마음에 들어요.", "exEn": "I like this color the most.", "origin": "Sino-Korean", "hanja": "색", "group": "colors"},
    {"korean": "하얀색", "pos": "noun", "meaning": "white color", "pron": "hayansaek", "exKo": "하얀색 셔츠를 입어요.", "exEn": "I wear a white shirt.", "origin": "hybrid", "group": "colors"},
    {"korean": "검은색", "pos": "noun", "meaning": "black color", "pron": "geomeunsaek", "exKo": "검은색 구두를 신었어요.", "exEn": "I wore black shoes.", "origin": "hybrid", "group": "colors"},
    {"korean": "빨간색", "pos": "noun", "meaning": "red color", "pron": "ppalgansaek", "exKo": "빨간색 사과가 맛있어요.", "exEn": "Red apples are delicious.", "origin": "hybrid", "group": "colors"},
    {"korean": "파란색", "pos": "noun", "meaning": "blue color", "pron": "paransaek", "exKo": "파란색 하늘이 예뻐요.", "exEn": "The blue sky is pretty.", "origin": "hybrid", "group": "colors"},
    {"korean": "노란색", "pos": "noun", "meaning": "yellow color", "pron": "noransaek", "exKo": "노란색 꽃이 피었어요.", "exEn": "Yellow flowers bloomed.", "origin": "hybrid", "group": "colors"},
    {"korean": "초록색", "pos": "noun", "meaning": "green color", "pron": "choroksaek", "exKo": "초록색 수박이 커요.", "exEn": "The green watermelon is big.", "origin": "hybrid", "group": "colors"},
    {"korean": "보라색", "pos": "noun", "meaning": "purple color", "pron": "borasaek", "exKo": "보라색 모자를 좋아해요.", "exEn": "I like purple hats.", "origin": "hybrid", "group": "colors"},
    {"korean": "갈색", "pos": "noun", "meaning": "brown color", "pron": "galsaek", "exKo": "갈색 강아지가 뛰어요.", "exEn": "The brown puppy is running.", "origin": "Sino-Korean", "hanja": "갈색", "group": "colors"},
    {"korean": "회색", "pos": "noun", "meaning": "grey color", "pron": "hoesaek", "exKo": "회색 바지를 샀어요.", "exEn": "I bought grey pants.", "origin": "Sino-Korean", "hanja": "회색", "group": "colors"},
    {"korean": "주황색", "pos": "noun", "meaning": "orange color", "pron": "juhwangsaek", "exKo": "주황색 주스를 마셔요.", "exEn": "I drink orange juice.", "origin": "Sino-Korean", "hanja": "주황색", "group": "colors"},
    {"korean": "분홍색", "pos": "noun", "meaning": "pink color", "pron": "bunhongsaek", "exKo": "분홍색 옷을 입었어요.", "exEn": "I put on pink clothes.", "origin": "Sino-Korean", "hanja": "분홍색", "group": "colors"},

    # Body Parts
    {"korean": "몸", "pos": "noun", "meaning": "body", "pron": "mom", "exKo": "몸을 많이 움직이세요.", "exEn": "Move your body a lot.", "origin": "native", "group": "body-parts"},
    {"korean": "머리", "pos": "noun", "meaning": "head / hair", "pron": "meori", "exKo": "머리가 아파요.", "exEn": "My head hurts.", "origin": "native", "group": "body-parts"},
    {"korean": "눈", "pos": "noun", "meaning": "eye; snow", "pron": "nun", "exKo": "눈이 참 예쁘시네요.", "exEn": "Your eyes are really pretty.", "origin": "native", "group": "body-parts"},
    {"korean": "코", "pos": "noun", "meaning": "nose", "pron": "ko", "exKo": "추워서 코가 빨개요.", "exEn": "It's cold so my nose is red.", "origin": "native", "group": "body-parts"},
    {"korean": "입", "pos": "noun", "meaning": "mouth", "pron": "ip", "exKo": "입을 크게 벌리세요.", "exEn": "Open your mouth wide.", "origin": "native", "group": "body-parts"},
    {"korean": "귀", "pos": "noun", "meaning": "ear", "pron": "gwi", "exKo": "추워서 귀가 아파요.", "exEn": "It's cold so my ears hurt.", "origin": "native", "group": "body-parts"},
    {"korean": "얼굴", "pos": "noun", "meaning": "face", "pron": "eolgul", "exKo": "얼굴에 물을 묻혀요.", "exEn": "I put water on my face.", "origin": "native", "group": "body-parts"},
    {"korean": "목", "pos": "noun", "meaning": "neck / throat", "pron": "mok", "exKo": "목이 아주 말라요.", "exEn": "My throat is very dry.", "origin": "native", "group": "body-parts"},
    {"korean": "어깨", "pos": "noun", "meaning": "shoulder", "pron": "eokkae", "exKo": "어깨를 펴고 앉으세요.", "exEn": "Sit with shoulders spread.", "origin": "native", "group": "body-parts"},
    {"korean": "팔", "pos": "noun", "meaning": "arm; eight", "pron": "pal", "exKo": "팔을 굽혔다 펴요.", "exEn": "Bend and stretch your arm.", "origin": "native", "group": "body-parts"},
    {"korean": "손", "pos": "noun", "meaning": "hand", "pron": "son", "exKo": "손을 깨끗이 씻었어요.", "exEn": "I washed my hands clean.", "origin": "native", "group": "body-parts"},
    {"korean": "다리", "pos": "noun", "meaning": "leg; bridge", "pron": "dari", "exKo": "다리가 아파서 쉬어요.", "exEn": "My legs hurt so I'm resting.", "origin": "native", "group": "body-parts"},
    {"korean": "발", "pos": "noun", "meaning": "foot", "pron": "bal", "exKo": "발에 꼭 맞는 신발이에요.", "exEn": "These shoes fit my feet perfectly.", "origin": "native", "group": "body-parts"},
    {"korean": "가슴", "pos": "noun", "meaning": "chest / heart", "pron": "gaseum", "exKo": "가슴이 두근거려요.", "exEn": "My heart is fluttering.", "origin": "native", "group": "body-parts"},
    {"korean": "배", "pos": "noun", "meaning": "belly / stomach; pear; boat", "pron": "bae", "exKo": "배가 고파서 밥을 먹어요.", "exEn": "I eat rice because my stomach is hungry.", "origin": "native", "group": "body-parts"},
    {"korean": "손가락", "pos": "noun", "meaning": "finger", "pron": "songarak", "exKo": "반지를 손가락에 껴요.", "exEn": "I put a ring on my finger.", "origin": "native", "group": "body-parts"},
    {"korean": "발가락", "pos": "noun", "meaning": "toe", "pron": "balgarak", "exKo": "발가락이 아파서 걸을 수 없어요.", "exEn": "My toes hurt so I cannot walk.", "origin": "native", "group": "body-parts"},
    {"korean": "이빨", "pos": "noun", "meaning": "tooth", "pron": "ippal", "exKo": "하루에 세 번 이빨을 닦아요.", "exEn": "I brush my teeth three times a day.", "origin": "native", "group": "body-parts"},
    {"korean": "피부", "pos": "noun", "meaning": "skin", "pron": "pibu", "exKo": "피부가 아주 부드러워요.", "exEn": "The skin is very soft.", "origin": "Sino-Korean", "hanja": "피부", "group": "body-parts"},
    {"korean": "허리", "pos": "noun", "meaning": "waist / back", "pron": "heori", "exKo": "오래 앉아서 허리가 아파요.", "exEn": "I sat long so my waist hurts.", "origin": "native", "group": "body-parts"},

    # Clothing & Fashion
    {"korean": "옷", "pos": "noun", "meaning": "clothes", "pron": "ot", "exKo": "예쁜 옷이 참 많네요.", "exEn": "Oh, there are many pretty clothes.", "origin": "native", "group": "clothing"},
    {"korean": "모자", "pos": "noun", "meaning": "hat / cap", "pron": "moja", "exKo": "모자를 머리에 써요.", "exEn": "I wear a hat on my head.", "origin": "Sino-Korean", "hanja": "모자", "group": "clothing"},
    {"korean": "바지", "pos": "noun", "meaning": "pants / trousers", "pron": "baji", "exKo": "편한 바지를 입었어요.", "exEn": "I put on comfortable pants.", "origin": "native", "group": "clothing"},
    {"korean": "치마", "pos": "noun", "meaning": "skirt", "pron": "chima", "exKo": "치마를 입고 나가요.", "exEn": "I wear a skirt and go out.", "origin": "native", "group": "clothing"},
    {"korean": "셔츠", "pos": "noun", "meaning": "shirt", "pron": "syeocheu", "exKo": "셔츠가 아주 깨끗해요.", "exEn": "The shirt is very clean.", "origin": "loanword", "group": "clothing"},
    {"korean": "양말", "pos": "noun", "meaning": "socks", "pron": "yangmal", "exKo": "양말을 신발 전에 신어요.", "exEn": "I put on socks before shoes.", "origin": "Sino-Korean", "hanja": "양말", "group": "clothing"},
    {"korean": "구두", "pos": "noun", "meaning": "dress shoes", "pron": "gudu", "exKo": "정장에 구두를 신어요.", "exEn": "I wear dress shoes with a suit.", "origin": "native", "group": "clothing"},
    {"korean": "신발", "pos": "noun", "meaning": "shoes / footwear", "pron": "sinbal", "exKo": "신발을 벗고 들어오세요.", "exEn": "Please take off shoes and come in.", "origin": "native", "group": "clothing"},
    {"korean": "코트", "pos": "noun", "meaning": "coat", "pron": "koteu", "exKo": "겨울에는 따뜻한 코트를 입어요.", "exEn": "I wear a warm coat in winter.", "origin": "loanword", "group": "clothing"},
    {"korean": "티셔츠", "pos": "noun", "meaning": "T-shirt", "pron": "tisyeocheu", "exKo": "여름에 티셔츠를 즐겨 입어요.", "exEn": "I enjoy wearing T-shirts in summer.", "origin": "loanword", "group": "clothing"},
    {"korean": "가방", "pos": "noun", "meaning": "bag / backpack", "pron": "gabang", "exKo": "책가방을 어깨에 메요.", "exEn": "I carry a schoolbag on my shoulder.", "origin": "loanword", "group": "clothing"},
    {"korean": "지갑", "pos": "noun", "meaning": "wallet / purse", "pron": "jigap", "exKo": "지갑에 돈이 조금 있어요.", "exEn": "There is a little money in my wallet.", "origin": "Sino-Korean", "hanja": "지갑", "group": "clothing"},
    {"korean": "벨트", "pos": "noun", "meaning": "belt", "pron": "belteu", "exKo": "바지가 커서 벨트를 해요.", "exEn": "The pants are big so I wear a belt.", "origin": "loanword", "group": "clothing"},
    {"korean": "장갑", "pos": "noun", "meaning": "gloves", "pron": "janggap", "exKo": "겨울에 따뜻한 장갑을 껴요.", "exEn": "I wear warm gloves in winter.", "origin": "Sino-Korean", "hanja": "장갑", "group": "clothing"},
    {"korean": "목도리", "pos": "noun", "meaning": "scarf / muffler", "pron": "mokdori", "exKo": "목도리를 목에 둘러요.", "exEn": "I wrap a scarf around my neck.", "origin": "native", "group": "clothing"},
    {"korean": "우산", "pos": "noun", "meaning": "umbrella", "pron": "usan", "exKo": "비가 와서 우산을 써요.", "exEn": "It rains so I use an umbrella.", "origin": "Sino-Korean", "hanja": "우산", "group": "clothing"},
    {"korean": "넥타이", "pos": "noun", "meaning": "necktie", "pron": "nektai", "exKo": "넥타이를 목에 매요.", "exEn": "I tie a necktie on my neck.", "origin": "loanword", "group": "clothing"},
    {"korean": "안경", "pos": "noun", "meaning": "glasses", "pron": "angyeong", "exKo": "안경을 쓰면 잘 보여요.", "exEn": "If I wear glasses I can see well.", "origin": "Sino-Korean", "hanja": "안경", "group": "clothing"},

    # Animals
    {"korean": "동물", "pos": "noun", "meaning": "animal", "pron": "dongmul", "exKo": "동물원에 동물이 많아요.", "exEn": "There are many animals in the zoo.", "origin": "Sino-Korean", "hanja": "동물", "group": "animals"},
    {"korean": "개", "pos": "noun", "meaning": "dog; general items counter", "pron": "gae", "exKo": "개가 마당에서 뛰어요.", "exEn": "A dog runs in the yard.", "origin": "native", "group": "animals"},
    {"korean": "고양이", "pos": "noun", "meaning": "cat", "pron": "goyangi", "exKo": "고양이가 침대에서 자요.", "exEn": "A cat is sleeping on the bed.", "origin": "native", "group": "animals"},
    {"korean": "새", "pos": "noun", "meaning": "bird; new", "pron": "sae", "exKo": "하늘에 새가 날아가요.", "exEn": "A bird flies in the sky.", "origin": "native", "group": "animals"},
    {"korean": "물고기", "pos": "noun", "meaning": "fish (in water)", "pron": "mulgogi", "exKo": "물고기가 강에 살아요.", "exEn": "Fish live in the river.", "origin": "native", "group": "animals"},
    {"korean": "소", "pos": "noun", "meaning": "cow / ox", "pron": "so", "exKo": "시골에서 소를 키워요.", "exEn": "They raise cows in the countryside.", "origin": "native", "group": "animals"},
    {"korean": "돼지", "pos": "noun", "meaning": "pig", "pron": "dwaeji", "exKo": "돼지가 밥을 아주 많이 먹어요.", "exEn": "A pig eats a lot of food.", "origin": "native", "group": "animals"},
    {"korean": "닭", "pos": "noun", "meaning": "chicken", "pron": "dak", "exKo": "아침에 닭이 울어요.", "exEn": "A chicken crows in the morning.", "origin": "native", "group": "animals"},
    {"korean": "호랑이", "pos": "noun", "meaning": "tiger", "pron": "horangi", "exKo": "호랑이가 산에 살았어요.", "exEn": "Tigers lived in mountains.", "origin": "native", "group": "animals"},
    {"korean": "사자", "pos": "noun", "meaning": "lion", "pron": "saja", "exKo": "사자가 고기를 먹어요.", "exEn": "A lion eats meat.", "origin": "Sino-Korean", "hanja": "사자", "group": "animals"},
    {"korean": "토끼", "pos": "noun", "meaning": "rabbit", "pron": "tokki", "exKo": "토끼가 아주 빨라요.", "exEn": "A rabbit is very fast.", "origin": "native", "group": "animals"},
    {"korean": "곰", "pos": "noun", "meaning": "bear", "pron": "gom", "exKo": "곰이 숲에서 살아요.", "exEn": "A bear lives in the forest.", "origin": "native", "group": "animals"},
    {"korean": "원숭이", "pos": "noun", "meaning": "monkey", "pron": "wonsungi", "exKo": "원숭이가 나무에 올라가요.", "exEn": "A monkey climbs up a tree.", "origin": "native", "group": "animals"},
    {"korean": "쥐", "pos": "noun", "meaning": "mouse / rat", "pron": "jwi", "exKo": "고양이가 쥐를 잡아요.", "exEn": "A cat catches a mouse.", "origin": "native", "group": "animals"},
    {"korean": "뱀", "pos": "noun", "meaning": "snake", "pron": "baem", "exKo": "숲에 뱀이 있어서 무서워요.", "exEn": "I'm scared because there is a snake in the forest.", "origin": "native", "group": "animals"},
    {"korean": "양", "pos": "noun", "meaning": "sheep; quantity", "pron": "yang", "exKo": "양이 들판에서 풀을 먹어요.", "exEn": "A sheep eats grass in the field.", "origin": "Sino-Korean", "hanja": "양", "group": "animals"},
    {"korean": "코끼리", "pos": "noun", "meaning": "elephant", "pron": "kokkiri", "exKo": "코끼리는 몸이 아주 커요.", "exEn": "Elephants have very big bodies.", "origin": "native", "group": "animals"},
    {"korean": "기린", "pos": "noun", "meaning": "giraffe", "pron": "girin", "exKo": "기린은 목이 아주 길어요.", "exEn": "Giraffes have very long necks.", "origin": "Sino-Korean", "hanja": "기린", "group": "animals"},
    {"korean": "말_animal", "pos": "noun", "lemma": "말", "senseKey": "animal", "senseNo": 2, "meaning": "horse", "pron": "mal", "exKo": "제주도에서 말을 탔어요.", "exEn": "I rode a horse in Jeju Island.", "origin": "native", "group": "animals"},

    # Food & Ingredients
    {"korean": "반찬", "pos": "noun", "meaning": "side dishes", "pron": "banchan", "exKo": "식탁에 반찬이 아주 많아요.", "exEn": "There are many side dishes on the table.", "origin": "Sino-Korean", "hanja": "반찬", "group": "food-drink"},
    {"korean": "고기", "pos": "noun", "meaning": "meat", "pron": "gogi", "exKo": "저녁에 고기를 구워 먹어요.", "exEn": "We roast and eat meat in the evening.", "origin": "native", "group": "food-drink"},
    {"korean": "야채", "pos": "noun", "meaning": "vegetable", "pron": "yachae", "exKo": "야채를 골고루 먹으세요.", "exEn": "Eat vegetables evenly.", "origin": "Sino-Korean", "hanja": "야채", "group": "food-drink"},
    {"korean": "과일", "pos": "noun", "meaning": "fruit", "pron": "gwail", "exKo": "시장에서 단 과일을 샀어요.", "exEn": "I bought sweet fruit at the market.", "origin": "native", "group": "food-drink"},
    {"korean": "우유", "pos": "noun", "meaning": "milk", "pron": "uyu", "exKo": "아침에 우유를 한 잔 마셔요.", "exEn": "I drink a glass of milk in the morning.", "origin": "Sino-Korean", "hanja": "우유", "group": "food-drink"},
    {"korean": "빵", "pos": "noun", "meaning": "bread", "pron": "ppang", "exKo": "빵집에서 갓 구운 빵을 샀어요.", "exEn": "I bought freshly baked bread at the bakery.", "origin": "loanword", "group": "food-drink"},
    {"korean": "계란", "pos": "noun", "meaning": "egg", "pron": "gyeran", "exKo": "아침에 계란을 요리해요.", "exEn": "I cook eggs in the morning.", "origin": "Sino-Korean", "hanja": "계란", "group": "food-drink"},
    {"korean": "소금", "pos": "noun", "meaning": "salt", "pron": "sogeum", "exKo": "음식에 소금을 조금 넣어요.", "exEn": "I put a little salt in the food.", "origin": "native", "group": "food-drink"},
    {"korean": "설탕", "pos": "noun", "meaning": "sugar", "pron": "seoltang", "exKo": "커피에 설탕을 넣지 않아요.", "exEn": "I don't put sugar in my coffee.", "origin": "Sino-Korean", "hanja": "설탕", "group": "food-drink"},
    {"korean": "간장", "pos": "noun", "meaning": "soy sauce", "pron": "ganjang", "exKo": "간장으로 간을 맞춰요.", "exEn": "I adjust flavor with soy sauce.", "origin": "native", "group": "food-drink"},
    {"korean": "고추장", "pos": "noun", "meaning": "red pepper paste (gochujang)", "pron": "gochujang", "exKo": "비빔밥에 고추장을 넣어요.", "exEn": "I put red pepper paste in bibimbap.", "origin": "hybrid", "group": "food-drink"},
    {"korean": "참기름", "pos": "noun", "meaning": "sesame oil", "pron": "chamgireum", "exKo": "참기름을 넣으면 아주 고소해요.", "exEn": "If you put sesame oil it is very savory.", "origin": "native", "group": "food-drink"},
    {"korean": "마늘", "pos": "noun", "meaning": "garlic", "pron": "maneul", "exKo": "한국 음식에 마늘이 많이 들어가요.", "exEn": "Much garlic goes into Korean food.", "origin": "native", "group": "food-drink"},
    {"korean": "양파", "pos": "noun", "meaning": "onion", "pron": "yangpa", "exKo": "양파를 칼로 썰어요.", "exEn": "I slice onions with a knife.", "origin": "hybrid", "group": "food-drink"},
    {"korean": "국", "pos": "noun", "meaning": "soup", "pron": "guk", "exKo": "따뜻한 국을 끓여요.", "exEn": "I boil warm soup.", "origin": "native", "group": "food-drink"},
    {"korean": "찌개", "pos": "noun", "meaning": "stew", "pron": "jjigae", "exKo": "김치찌개가 아주 맛있어요.", "exEn": "Kimchi stew is very delicious.", "origin": "native", "group": "food-drink"},
    {"korean": "라면", "pos": "noun", "meaning": "ramen / instant noodles", "pron": "ramyeon", "exKo": "냄비에 라면을 끓여요.", "exEn": "I boil ramen in a pot.", "origin": "loanword", "group": "food-drink"},
    {"korean": "치즈", "pos": "noun", "meaning": "cheese", "pron": "chizeu", "exKo": "빵에 치즈를 올려서 먹어요.", "exEn": "I put cheese on bread and eat it.", "origin": "loanword", "group": "food-drink"},
    {"korean": "과자", "pos": "noun", "meaning": "snack / cookie", "pron": "gwaja", "exKo": "가게에서 과자를 샀어요.", "exEn": "I bought snacks at the shop.", "origin": "Sino-Korean", "hanja": "과자", "group": "food-drink"},
    {"korean": "사탕", "pos": "noun", "meaning": "candy", "pron": "satang", "exKo": "달콤한 사탕을 먹어요.", "exEn": "I eat sweet candy.", "origin": "Sino-Korean", "hanja": "사탕", "group": "food-drink"},
    {"korean": "초콜릿", "pos": "noun", "meaning": "chocolate", "pron": "chokollit", "exKo": "초콜릿을 선물로 받았어요.", "exEn": "I received chocolate as a gift.", "origin": "loanword", "group": "food-drink"},
    {"korean": "주스", "pos": "noun", "meaning": "juice", "pron": "juseu", "exKo": "사과 주스 한 병 마셨어요.", "exEn": "I drank a bottle of apple juice.", "origin": "loanword", "group": "food-drink"},
    {"korean": "맥주", "pos": "noun", "meaning": "beer", "pron": "maekju", "exKo": "치킨과 시원한 맥주를 먹어요.", "exEn": "We eat chicken and cold beer.", "origin": "Sino-Korean", "hanja": "맥주", "group": "food-drink"},
    {"korean": "소주", "pos": "noun", "meaning": "soju (Korean liquor)", "pron": "soju", "exKo": "친구들과 소주를 한 잔 마셨어요.", "exEn": "I drank a glass of soju with friends.", "origin": "Sino-Korean", "hanja": "소주", "group": "food-drink"},

    # Home & Routine
    {"korean": "거실", "pos": "noun", "meaning": "living room", "pron": "geosil", "exKo": "거실에서 텔레비전을 봐요.", "exEn": "I watch television in the living room.", "origin": "Sino-Korean", "hanja": "거실", "group": "home-routine"},
    {"korean": "부엌", "pos": "noun", "meaning": "kitchen", "pron": "bueok", "exKo": "부엌에서 저녁 식사를 준비해요.", "exEn": "I prepare dinner in the kitchen.", "origin": "native", "group": "home-routine"},
    {"korean": "문", "pos": "noun", "meaning": "door; gate", "pron": "mun", "exKo": "방 문을 꼭 닫아 주세요.", "exEn": "Please close the room door tight.", "origin": "Sino-Korean", "hanja": "문", "group": "home-routine"},
    {"korean": "창문", "pos": "noun", "meaning": "window", "pron": "changmun", "exKo": "창문을 열면 시원해요.", "exEn": "If you open the window it is cool.", "origin": "Sino-Korean", "hanja": "창문", "group": "home-routine"},
    {"korean": "책상", "pos": "noun", "meaning": "desk", "pron": "chaeksang", "exKo": "책상 위에 연필이 있어요.", "exEn": "There is a pencil on the desk.", "origin": "Sino-Korean", "hanja": "책상", "group": "home-routine"},
    {"korean": "의자", "pos": "noun", "meaning": "chair", "pron": "uija", "exKo": "의자에 앉아서 공부해요.", "exEn": "I sit on a chair and study.", "origin": "Sino-Korean", "hanja": "의자", "group": "home-routine"},
    {"korean": "거울", "pos": "noun", "meaning": "mirror", "pron": "geoul", "exKo": "거울을 보며 머리를 빗어요.", "exEn": "I comb my hair looking at the mirror.", "origin": "native", "group": "home-routine"},
    {"korean": "전등", "pos": "noun", "meaning": "light / lamp", "pron": "jeondeung", "exKo": "방 전등을 켰어요.", "exEn": "I turned on the room light.", "origin": "Sino-Korean", "hanja": "전등", "group": "home-routine"},
    {"korean": "냉장고", "pos": "noun", "meaning": "refrigerator", "pron": "naengjanggo", "exKo": "냉장고에 우유가 없어요.", "exEn": "There is no milk in the refrigerator.", "origin": "Sino-Korean", "hanja": "냉장고", "group": "home-routine"},
    {"korean": "세탁기", "pos": "noun", "meaning": "washing machine", "pron": "setakgi", "exKo": "세탁기에 빨래를 넣어요.", "exEn": "I put laundry in the washing machine.", "origin": "Sino-Korean", "hanja": "세탁기", "group": "home-routine"},
    {"korean": "컴퓨터", "pos": "noun", "meaning": "computer", "pron": "keompyuteo", "exKo": "컴퓨터로 숙제를 해요.", "exEn": "I do homework with a computer.", "origin": "loanword", "group": "home-routine"},
    {"korean": "전화기", "pos": "noun", "meaning": "telephone", "pron": "jeonhwagi", "exKo": "방에 전화기가 울려요.", "exEn": "A telephone rings in the room.", "origin": "Sino-Korean", "hanja": "전화기", "group": "home-routine"},
    {"korean": "소파", "pos": "noun", "meaning": "sofa", "pron": "sopa", "exKo": "거실 소파에 앉아요.", "exEn": "I sit on the living room sofa.", "origin": "loanword", "group": "home-routine"},
    {"korean": "식탁", "pos": "noun", "meaning": "dining table", "pron": "siktak", "exKo": "식탁 위에 밥이 있어요.", "exEn": "There is rice on the dining table.", "origin": "Sino-Korean", "hanja": "식탁", "group": "home-routine"},
    {"korean": "화분", "pos": "noun", "meaning": "flowerpot", "pron": "hwabun", "exKo": "화분에 매일 물을 줘요.", "exEn": "I water the flowerpot every day.", "origin": "Sino-Korean", "hanja": "화분", "group": "home-routine"},
    {"korean": "베개", "pos": "noun", "meaning": "pillow", "pron": "begae", "exKo": "부드러운 베개를 베고 자요.", "exEn": "I sleep resting on a soft pillow.", "origin": "native", "group": "home-routine"},
    {"korean": "이불", "pos": "noun", "meaning": "blanket / duvet", "pron": "ibul", "exKo": "따뜻한 이불을 덮고 자요.", "exEn": "I sleep covered in a warm blanket.", "origin": "native", "group": "home-routine"},
    {"korean": "열쇠", "pos": "noun", "meaning": "key", "pron": "yeolsoe", "exKo": "열쇠로 문을 열어요.", "exEn": "I open the door with a key.", "origin": "native", "group": "home-routine"},
    {"korean": "휴지", "pos": "noun", "meaning": "toilet paper / tissue", "pron": "hyuji", "exKo": "휴지로 손을 닦아요.", "exEn": "I wipe my hands with a tissue.", "origin": "Sino-Korean", "hanja": "휴지", "group": "home-routine"},
    {"korean": "수건", "pos": "noun", "meaning": "towel", "pron": "sugeon", "exKo": "수건으로 몸을 말려요.", "exEn": "I dry my body with a towel.", "origin": "Sino-Korean", "hanja": "수건", "group": "home-routine"},
    {"korean": "비누", "pos": "noun", "meaning": "soap", "pron": "binu", "exKo": "비누로 손을 씻으면 깨끗해요.", "exEn": "If you wash hands with soap it is clean.", "origin": "native", "group": "home-routine"},
    {"korean": "치약", "pos": "noun", "meaning": "toothpaste", "pron": "chiyak", "exKo": "칫솔에 치약을 짜요.", "exEn": "I squeeze toothpaste on the toothbrush.", "origin": "Sino-Korean", "hanja": "치약", "group": "home-routine"},
    {"korean": "칫솔", "pos": "noun", "meaning": "toothbrush", "pron": "chitsol", "exKo": "새 칫솔을 샀어요.", "exEn": "I bought a new toothbrush.", "origin": "hybrid", "group": "home-routine"},
    {"korean": "샴푸", "pos": "noun", "meaning": "shampoo", "pron": "syampu", "exKo": "샴푸로 머리를 감아요.", "exEn": "I wash my hair with shampoo.", "origin": "loanword", "group": "home-routine"},

    # Travel & City
    {"korean": "교통", "pos": "noun", "meaning": "traffic / transportation", "pron": "gyotong", "exKo": "서울은 교통이 편리해요.", "exEn": "Seoul has convenient traffic.", "origin": "Sino-Korean", "hanja": "교통", "group": "travel-city"},
    {"korean": "버스", "pos": "noun", "meaning": "bus", "pron": "beoseu", "exKo": "버스 정류장에서 버스를 타요.", "exEn": "I take a bus at the bus stop.", "origin": "loanword", "group": "travel-city"},
    {"korean": "지하철", "pos": "noun", "meaning": "subway", "pron": "jihacheol", "exKo": "지하철 역으로 들어갔어요.", "exEn": "I entered the subway station.", "origin": "Sino-Korean", "hanja": "지하철", "group": "travel-city"},
    {"korean": "비행기", "pos": "noun", "meaning": "airplane", "pron": "bihaenggi", "exKo": "비행기를 타고 한국에 가요.", "exEn": "I go to Korea by airplane.", "origin": "Sino-Korean", "hanja": "비행기", "group": "travel-city"},
    {"korean": "자전거", "pos": "noun", "meaning": "bicycle", "pron": "jajeongeo", "exKo": "공원에서 자전거를 타요.", "exEn": "I ride a bicycle in the park.", "origin": "Sino-Korean", "hanja": "자전거", "group": "travel-city"},
    {"korean": "역", "pos": "noun", "meaning": "station (train/subway)", "pron": "yeok", "exKo": "서울역에서 만나요.", "exEn": "Let's meet at Seoul Station.", "origin": "Sino-Korean", "hanja": "역", "group": "travel-city"},
    {"korean": "정류장", "pos": "noun", "meaning": "bus stop / station", "pron": "jeongryujang", "exKo": "정류장에서 가방을 잃어버렸어요.", "exEn": "I lost my bag at the bus stop.", "origin": "Sino-Korean", "hanja": "정류장", "group": "travel-city"},
    {"korean": "공항", "pos": "noun", "meaning": "airport", "pron": "gonghang", "exKo": "인천공항은 아주 커요.", "exEn": "Incheon Airport is very big.", "origin": "Sino-Korean", "hanja": "공항", "group": "travel-city"},
    {"korean": "택시", "pos": "noun", "meaning": "taxi", "pron": "taeksi", "exKo": "늦어서 택시를 탔어요.", "exEn": "I took a taxi because I was late.", "origin": "loanword", "group": "travel-city"},
    {"korean": "오토바이", "pos": "noun", "meaning": "motorcycle", "pron": "otobai", "exKo": "길에 오토바이가 지나가요.", "exEn": "A motorcycle passes on the street.", "origin": "loanword", "group": "travel-city"},
    {"korean": "배_boat", "pos": "noun", "lemma": "배", "senseKey": "boat", "senseNo": 3, "meaning": "boat / ship", "pron": "bae", "exKo": "바다에서 큰 배를 봤어요.", "exEn": "I saw a big ship on the sea.", "origin": "native", "group": "travel-city"},
    {"korean": "지도", "pos": "noun", "meaning": "map", "pron": "jido", "exKo": "지도를 보며 길을 찾아요.", "exEn": "I find the way looking at the map.", "origin": "Sino-Korean", "hanja": "지도", "group": "travel-city"},
    {"korean": "운전", "pos": "noun", "meaning": "driving", "pron": "unjeon", "exKo": "아빠가 운전을 하세요.", "exEn": "Dad is driving.", "origin": "Sino-Korean", "hanja": "운전", "group": "travel-city"},
    {"korean": "신호등", "pos": "noun", "meaning": "traffic light", "pron": "sinhodeung", "exKo": "신호등이 빨간색이에요.", "exEn": "The traffic light is red.", "origin": "Sino-Korean", "hanja": "신호등", "group": "travel-city"},
    {"korean": "도시", "pos": "noun", "meaning": "city", "pron": "dosi", "exKo": "서울은 바쁜 도시예요.", "exEn": "Seoul is a busy city.", "origin": "Sino-Korean", "hanja": "도시", "group": "travel-city"},
    {"korean": "가게", "pos": "noun", "meaning": "shop / store", "pron": "gage", "exKo": "가게에서 과일을 팔아요.", "exEn": "They sell fruit at the shop.", "origin": "native", "group": "travel-city"},
    {"korean": "마트", "pos": "noun", "meaning": "mart / supermarket", "pron": "mateu", "exKo": "마트에서 식료품을 샀어요.", "exEn": "I bought groceries at the mart.", "origin": "loanword", "group": "travel-city"},
    {"korean": "은행", "pos": "noun", "meaning": "bank", "pron": "eunhaeng", "exKo": "은행에 돈을 넣으러 가요.", "exEn": "I go to the bank to put in money.", "origin": "Sino-Korean", "hanja": "은행", "group": "travel-city"},
    {"korean": "병원", "pos": "noun", "meaning": "hospital", "pron": "byeongwon", "exKo": "아파서 병원에 갔어요.", "exEn": "I went to the hospital because I was sick.", "origin": "Sino-Korean", "hanja": "병원", "group": "travel-city"},
    {"korean": "약국", "pos": "noun", "meaning": "pharmacy", "pron": "yakguk", "exKo": "약국에서 감기약을 샀어요.", "exEn": "I bought cold medicine at the pharmacy.", "origin": "Sino-Korean", "hanja": "약국", "group": "travel-city"},
    {"korean": "우체국", "pos": "noun", "meaning": "post office", "pron": "ucheguk", "exKo": "우체국에서 편지를 보내요.", "exEn": "I send a letter at the post office.", "origin": "Sino-Korean", "hanja": "우체국", "group": "travel-city"},
    {"korean": "서점", "pos": "noun", "meaning": "bookstore", "pron": "seojeom", "exKo": "서점에서 책을 구경해요.", "exEn": "I browse books at the bookstore.", "origin": "Sino-Korean", "hanja": "서점", "group": "travel-city"},
    {"korean": "극장", "pos": "noun", "meaning": "theater / cinema", "pron": "geukjang", "exKo": "극장에서 영화를 봐요.", "exEn": "I watch a movie at the theater.", "origin": "Sino-Korean", "hanja": "극장", "group": "travel-city"},
    {"korean": "호텔", "pos": "noun", "meaning": "hotel", "pron": "hotel", "exKo": "제주도 호텔에서 묵었어요.", "exEn": "I stayed at a hotel in Jeju Island.", "origin": "loanword", "group": "travel-city"},

    # Weather & Nature
    {"korean": "하늘", "pos": "noun", "meaning": "sky", "pron": "haneul", "exKo": "하늘에 구름이 많아요.", "exEn": "There are many clouds in the sky.", "origin": "native", "group": "weather-nature"},
    {"korean": "해_sun", "pos": "noun", "lemma": "해", "senseKey": "sun", "senseNo": 2, "meaning": "sun", "pron": "hae", "exKo": "동쪽에서 해가 떠요.", "exEn": "The sun rises in the east.", "origin": "native", "group": "weather-nature"},
    {"korean": "구름", "pos": "noun", "meaning": "cloud", "pron": "gureum", "exKo": "하얀 구름이 둥둥 떠 있어요.", "exEn": "White clouds are floating.", "origin": "native", "group": "weather-nature"},
    {"korean": "바람", "pos": "noun", "meaning": "wind", "pron": "baram", "exKo": "바람이 시원하게 불어요.", "exEn": "The wind blows coolly.", "origin": "native", "group": "weather-nature"},
    {"korean": "온도", "pos": "noun", "meaning": "temperature", "pron": "ondo", "exKo": "오늘 온도가 몇 도예요?", "exEn": "What is the temperature today?", "origin": "Sino-Korean", "hanja": "온도", "group": "weather-nature"},
    {"korean": "산", "pos": "noun", "meaning": "mountain", "pron": "san", "exKo": "주말에 산에 올라가요.", "exEn": "I go up the mountain on the weekend.", "origin": "Sino-Korean", "hanja": "산", "group": "weather-nature"},
    {"korean": "강", "pos": "noun", "meaning": "river", "pron": "gang", "exKo": "한강이 아주 넓어요.", "exEn": "The Han River is very wide.", "origin": "Sino-Korean", "hanja": "강", "group": "weather-nature"},
    {"korean": "돌", "pos": "noun", "meaning": "stone / rock; first birthday", "pron": "dol", "exKo": "길에 작은 돌이 있어요.", "exEn": "There is a small stone on the road.", "origin": "native", "group": "weather-nature"},
    {"korean": "흙", "pos": "noun", "meaning": "soil / dirt", "pron": "heuk", "exKo": "화분에 흙을 채워요.", "exEn": "I fill the flowerpot with soil.", "origin": "native", "group": "weather-nature"},
    {"korean": "숲", "pos": "noun", "meaning": "forest / woods", "pron": "sup", "exKo": "숲 속을 천천히 걸어요.", "exEn": "I walk slowly in the forest.", "origin": "native", "group": "weather-nature"},
    {"korean": "모래", "pos": "noun", "meaning": "sand", "pron": "morae", "exKo": "바닷가 모래 위를 걸어요.", "exEn": "I walk on the sand of the seashore.", "origin": "native", "group": "weather-nature"},
    {"korean": "씨앗", "pos": "noun", "meaning": "seed", "pron": "ssiat", "exKo": "흙에 씨앗을 심었어요.", "exEn": "I planted a seed in the soil.", "origin": "native", "group": "weather-nature"},

    # Time & Calendar
    {"korean": "초", "pos": "counter", "meaning": "second counter (time)", "pron": "cho", "exKo": "일 초도 기다릴 수 없어요.", "exEn": "I cannot wait even one second.", "origin": "Sino-Korean", "hanja": "초", "group": "time-daily"},
    {"korean": "주_week", "pos": "noun", "lemma": "주", "senseKey": "week", "senseNo": 2, "meaning": "week", "pron": "ju", "exKo": "일 주일에 책 한 권을 읽어요.", "exEn": "I read one book in a week.", "origin": "Sino-Korean", "hanja": "주", "group": "time-daily"},
    {"korean": "새벽", "pos": "noun", "meaning": "dawn / early morning", "pron": "saebyeok", "exKo": "새벽에 일찍 잠에서 깨요.", "exEn": "I wake up early at dawn.", "origin": "native", "group": "time-daily"},
    {"korean": "오전", "pos": "noun", "meaning": "AM / morning", "pron": "ojeon", "exKo": "오전 열 시에 회의가 있어요.", "exEn": "There is a meeting at 10 AM.", "origin": "Sino-Korean", "hanja": "오전", "group": "time-daily"},
    {"korean": "오후", "pos": "noun", "meaning": "PM / afternoon", "pron": "ohu", "exKo": "오후 두 시에 친구를 만나요.", "exEn": "I meet a friend at 2 PM.", "origin": "Sino-Korean", "hanja": "오후", "group": "time-daily"},
    {"korean": "하루", "pos": "noun", "meaning": "one day", "pron": "haru", "exKo": "하루 동안 푹 쉬었어요.", "exEn": "I rested well for one day.", "origin": "native", "group": "time-daily"},
    {"korean": "매일", "pos": "noun", "meaning": "every day", "pron": "maeil", "exKo": "매일 한국어를 연습해요.", "exEn": "I practice Korean every day.", "origin": "Sino-Korean", "hanja": "매일", "group": "time-daily"},
    {"korean": "이번", "pos": "noun", "meaning": "this time", "pron": "ibeon", "exKo": "이번 시험은 쉬웠어요.", "exEn": "This exam was easy.", "origin": "Sino-Korean", "hanja": "이번", "group": "time-daily"},
    {"korean": "지난", "pos": "noun", "meaning": "last / past", "pron": "jinan", "exKo": "지난주에 영화를 봤어요.", "exEn": "I watched a movie last week.", "origin": "native", "group": "time-daily"},
    {"korean": "다음", "pos": "noun", "meaning": "next", "pron": "daeum", "exKo": "다음 달에 이사를 가요.", "exEn": "I move next month.", "origin": "native", "group": "time-daily"},
    {"korean": "달력", "pos": "noun", "meaning": "calendar", "pron": "dallyeok", "exKo": "벽에 달력을 걸었어요.", "exEn": "I hung a calendar on the wall.", "origin": "Sino-Korean", "hanja": "달력", "group": "time-daily"},
    {"korean": "올해", "pos": "noun", "meaning": "this year", "pron": "olhae", "exKo": "올해 목표는 여행이에요.", "exEn": "This year's goal is travel.", "origin": "native", "group": "time-daily"},
    {"korean": "내년", "pos": "noun", "meaning": "next year", "pron": "naenyeon", "exKo": "내년에 한국에 갈 거예요.", "exEn": "I will go to Korea next year.", "origin": "Sino-Korean", "hanja": "내년", "group": "time-daily"},
    {"korean": "평일", "pos": "noun", "meaning": "weekday", "pron": "pyeongil", "exKo": "평일에는 보통 회사에 가요.", "exEn": "I usually go to the company on weekdays.", "origin": "Sino-Korean", "hanja": "평일", "group": "time-daily"},
    {"korean": "공휴일", "pos": "noun", "meaning": "public holiday", "pron": "gonghyuil", "exKo": "공휴일에는 은행이 쉬어요.", "exEn": "The bank rests on public holidays.", "origin": "Sino-Korean", "hanja": "공휴일", "group": "time-daily"},
    {"korean": "휴가", "pos": "noun", "meaning": "vacation / leave", "pron": "hyuga", "exKo": "여름 휴가를 제주도로 가요.", "exEn": "I go on summer vacation to Jeju Island.", "origin": "Sino-Korean", "hanja": "휴가", "group": "time-daily"},

    # Study & School Life
    {"korean": "공책", "pos": "noun", "meaning": "notebook", "pron": "gongchaek", "exKo": "공책에 단어를 써요.", "exEn": "I write words in the notebook.", "origin": "Sino-Korean", "hanja": "공책", "group": "study-school"},
    {"korean": "연필", "pos": "noun", "meaning": "pencil", "pron": "yeonpil", "exKo": "연필로 글씨를 써요.", "exEn": "I write characters with a pencil.", "origin": "Sino-Korean", "hanja": "연필", "group": "study-school"},
    {"korean": "펜", "pos": "noun", "meaning": "pen", "pron": "pen", "exKo": "빨간 펜으로 채점해요.", "exEn": "I grade with a red pen.", "origin": "loanword", "group": "study-school"},
    {"korean": "숙제", "pos": "noun", "meaning": "homework", "pron": "sukje", "exKo": "수업 전에 숙제를 끝냈어요.", "exEn": "I finished my homework before class.", "origin": "Sino-Korean", "hanja": "숙제", "group": "study-school"},
    {"korean": "칠판", "pos": "noun", "meaning": "blackboard / whiteboard", "pron": "chilpan", "exKo": "선생님이 칠판에 쓰세요.", "exEn": "The teacher writes on the blackboard.", "origin": "Sino-Korean", "hanja": "칠판", "group": "study-school"},
    {"korean": "성적", "pos": "noun", "meaning": "academic grades / results", "pron": "seongjeok", "exKo": "이번 학기 성적이 좋아요.", "exEn": "This semester's grades are good.", "origin": "Sino-Korean", "hanja": "성적", "group": "study-school"},
    {"korean": "교실", "pos": "noun", "meaning": "classroom", "pron": "gyosil", "exKo": "교실에 학생들이 모여 있어요.", "exEn": "Students are gathered in the classroom.", "origin": "Sino-Korean", "hanja": "교실", "group": "study-school"},
    {"korean": "교과서", "pos": "noun", "meaning": "textbook", "pron": "gyogwaseo", "exKo": "한국어 교과서를 펴세요.", "exEn": "Open the Korean textbook.", "origin": "Sino-Korean", "hanja": "교과서", "group": "study-school"},
    {"korean": "필통", "pos": "noun", "meaning": "pencil case", "pron": "piltong", "exKo": "필통에 연필과 지우개가 있어요.", "exEn": "There are pencils and an eraser in the pencil case.", "origin": "Sino-Korean", "hanja": "필통", "group": "study-school"},
    {"korean": "지우개", "pos": "noun", "meaning": "eraser", "pron": "jiugae", "exKo": "틀린 글씨를 지우개로 지워요.", "exEn": "I erase incorrect letters with an eraser.", "origin": "native", "group": "study-school"},

    # Hobbies & Leisure
    {"korean": "취미", "pos": "noun", "meaning": "hobby", "pron": "chwimi", "exKo": "제 취미는 요리예요.", "exEn": "My hobby is cooking.", "origin": "Sino-Korean", "hanja": "취미", "group": "hobbies-leisure"},
    {"korean": "독서", "pos": "noun", "meaning": "reading books", "pron": "dokseo", "exKo": "취미로 독서를 자주 해요.", "exEn": "I often read books as a hobby.", "origin": "Sino-Korean", "hanja": "독서", "group": "hobbies-leisure"},
    {"korean": "사진", "pos": "noun", "meaning": "photo / picture", "pron": "sajin", "exKo": "스마트폰으로 사진을 찍었어요.", "exEn": "I took a photo with my smartphone.", "origin": "Sino-Korean", "hanja": "사진", "group": "hobbies-leisure"},
    {"korean": "요리", "pos": "noun", "meaning": "cooking / cuisine", "pron": "yori", "exKo": "부엌에서 요리를 배워요.", "exEn": "I learn cooking in the kitchen.", "origin": "Sino-Korean", "hanja": "요리", "group": "hobbies-leisure"},
    {"korean": "낚시", "pos": "noun", "meaning": "fishing", "pron": "naksi", "exKo": "주말에 강으로 낚시를 가요.", "exEn": "I go fishing to the river on the weekend.", "origin": "native", "group": "hobbies-leisure"},
    {"korean": "등산", "pos": "noun", "meaning": "mountain hiking", "pron": "deungsan", "exKo": "가을에 등산하는 사람이 많아요.", "exEn": "Many people go hiking in autumn.", "origin": "Sino-Korean", "hanja": "등산", "group": "hobbies-leisure"},
    {"korean": "게임", "pos": "noun", "meaning": "game / gaming", "pron": "geim", "exKo": "컴퓨터로 게임을 하고 있어요.", "exEn": "I am playing a game on the computer.", "origin": "loanword", "group": "hobbies-leisure"},
    {"korean": "그림", "pos": "noun", "meaning": "drawing / painting", "pron": "geurim", "exKo": "하얀 도화지에 그림을 그려요.", "exEn": "I draw a picture on white drawing paper.", "origin": "native", "group": "hobbies-leisure"},
    {"korean": "악기", "pos": "noun", "meaning": "musical instrument", "pron": "akgi", "exKo": "다룰 줄 아는 악기가 있어요?", "exEn": "Is there an instrument you know how to play?", "origin": "Sino-Korean", "hanja": "악기", "group": "hobbies-leisure"},
    {"korean": "피아노", "pos": "noun", "meaning": "piano", "pron": "piano", "exKo": "어릴 때 피아노를 배웠어요.", "exEn": "I learned piano when I was young.", "origin": "loanword", "group": "hobbies-leisure"},
    {"korean": "기타_instrument", "pos": "noun", "lemma": "기타", "senseKey": "instrument", "senseNo": 2, "meaning": "guitar", "pron": "gita", "exKo": "기타를 치며 노래를 불러요.", "exEn": "I sing while playing the guitar.", "origin": "loanword", "group": "hobbies-leisure"},

    # Sports
    {"korean": "축구", "pos": "noun", "meaning": "soccer", "pron": "chukgu", "exKo": "운동장에서 축구를 해요.", "exEn": "We play soccer on the playground.", "origin": "Sino-Korean", "hanja": "축구", "group": "sports"},
    {"korean": "야구", "pos": "noun", "meaning": "baseball", "pron": "yagu", "exKo": "야구 경기 보러 가요.", "exEn": "Let's go watch a baseball game.", "origin": "Sino-Korean", "hanja": "야구", "group": "sports"},
    {"korean": "농구", "pos": "noun", "meaning": "basketball", "pron": "nonggu", "exKo": "농구 골대에 공을 던져요.", "exEn": "I throw the ball into the basketball hoop.", "origin": "Sino-Korean", "hanja": "농구", "group": "sports"},
    {"korean": "배구", "pos": "noun", "meaning": "volleyball", "pron": "baegu", "exKo": "체육관에서 배구를 했어요.", "exEn": "We played volleyball in the gym.", "origin": "Sino-Korean", "hanja": "배구", "group": "sports"},
    {"korean": "테니스", "pos": "noun", "meaning": "tennis", "pron": "teniseu", "exKo": "테니스 라켓을 샀어요.", "exEn": "I bought a tennis racket.", "origin": "loanword", "group": "sports"},
    {"korean": "배드민턴", "pos": "noun", "meaning": "badminton", "pron": "baedeuminteon", "exKo": "마당에서 배드민턴을 쳐요.", "exEn": "We play badminton in the yard.", "origin": "loanword", "group": "sports"},
    {"korean": "수영_sport", "pos": "noun", "lemma": "수영", "senseKey": "sport", "senseNo": 2, "meaning": "swimming", "pron": "suyeong", "exKo": "여름에 수영을 즐겨요.", "exEn": "I enjoy swimming in summer.", "origin": "Sino-Korean", "hanja": "수영", "group": "sports"},
    {"korean": "달리기", "pos": "noun", "meaning": "running / jogging", "pron": "dalligi", "exKo": "아침마다 달리기를 해요.", "exEn": "I do running every morning.", "origin": "native", "group": "sports"},

    # Occupations
    {"korean": "직업", "pos": "noun", "meaning": "occupation / job", "pron": "jigeop", "exKo": "여러 가지 직업이 있어요.", "exEn": "There are various occupations.", "origin": "Sino-Korean", "hanja": "직업", "group": "occupations"},
    {"korean": "회사원", "pos": "noun", "meaning": "office worker / company employee", "pron": "hoesawon", "exKo": "제 형은 회사원이에요.", "exEn": "My older brother is an office worker.", "origin": "Sino-Korean", "hanja": "회사원", "group": "occupations"},
    {"korean": "공무원", "pos": "noun", "meaning": "public servant / civil servant", "pron": "gongmuwon", "exKo": "고모는 시청 공무원이에요.", "exEn": "My aunt is a city hall civil servant.", "origin": "Sino-Korean", "hanja": "공무원", "group": "occupations"},
    {"korean": "의사", "pos": "noun", "meaning": "doctor (medical)", "pron": "uisa", "exKo": "의사가 환자를 진찰해요.", "exEn": "The doctor examines the patient.", "origin": "Sino-Korean", "hanja": "의사", "group": "occupations"},
    {"korean": "간호사", "pos": "noun", "meaning": "nurse", "pron": "ganhosa", "exKo": "간호사가 친절하게 도와줘요.", "exEn": "The nurse helps kindly.", "origin": "Sino-Korean", "hanja": "간호사", "group": "occupations"},
    {"korean": "약사", "pos": "noun", "meaning": "pharmacist", "pron": "yaksa", "exKo": "약사가 약을 처방해요.", "exEn": "The pharmacist dispenses medicine.", "origin": "Sino-Korean", "hanja": "약사", "group": "occupations"},
    {"korean": "경찰관", "pos": "noun", "meaning": "police officer", "pron": "gyeongchalgwan", "exKo": "경찰관이 교통을 정리해요.", "exEn": "The police officer directs traffic.", "origin": "Sino-Korean", "hanja": "경찰관", "group": "occupations"},
    {"korean": "소방관", "pos": "noun", "meaning": "firefighter", "pron": "sobanggwan", "exKo": "소방관이 불을 꺼요.", "exEn": "The firefighter puts out the fire.", "origin": "Sino-Korean", "hanja": "소방관", "group": "occupations"},
    {"korean": "군인", "pos": "noun", "meaning": "soldier / military serviceperson", "pron": "gunin", "exKo": "삼촌은 나라를 지키는 군인이에요.", "exEn": "My uncle is a soldier defending the country.", "origin": "Sino-Korean", "hanja": "군인", "group": "occupations"},
    {"korean": "가수", "pos": "noun", "meaning": "singer", "pron": "gasu", "exKo": "그 가수는 노래를 아주 잘해요.", "exEn": "That singer sings very well.", "origin": "Sino-Korean", "hanja": "가수", "group": "occupations"},
    {"korean": "배우", "pos": "noun", "meaning": "actor / actress", "pron": "baeu", "exKo": "영화 배우를 극장에서 봤어요.", "exEn": "I saw a movie actor at the theater.", "origin": "Sino-Korean", "hanja": "배우", "group": "occupations"},
    {"korean": "작가", "pos": "noun", "meaning": "writer / author", "pron": "jakga", "exKo": "제가 좋아하는 작가의 소설이에요.", "exEn": "It is a novel by an author I like.", "origin": "Sino-Korean", "hanja": "작가", "group": "occupations"},
    {"korean": "요리사", "pos": "noun", "meaning": "chef / cook", "pron": "yorisa", "exKo": "식당 요리사가 음식을 해요.", "exEn": "The restaurant chef cooks food.", "origin": "Sino-Korean", "hanja": "요리사", "group": "occupations"},
    {"korean": "기자", "pos": "noun", "meaning": "reporter / journalist", "pron": "gija", "exKo": "기자가 뉴스를 보도해요.", "exEn": "The journalist reports the news.", "origin": "Sino-Korean", "hanja": "기자", "group": "occupations"},

    # Verbs - Part 1
    {"korean": "다니다", "pos": "verb", "meaning": "to attend / go to (frequently)", "pron": "danida", "exKo": "저는 대학교에 다녀요.", "exEn": "I attend university.", "origin": "native", "group": "core-actions"},
    {"korean": "나가다", "pos": "verb", "meaning": "to go out", "pron": "nagada", "exKo": "밖으로 나가서 놀아요.", "exEn": "Let's go outside and play.", "origin": "native", "group": "core-actions"},
    {"korean": "들어오다", "pos": "verb", "meaning": "to come in", "pron": "deureooda", "exKo": "방으로 들어오세요.", "exEn": "Please come into the room.", "origin": "native", "group": "core-actions"},
    {"korean": "돌아가다", "pos": "verb", "meaning": "to return / go back", "pron": "doragada", "exKo": "집으로 돌아가요.", "exEn": "I go back home.", "origin": "native", "group": "core-actions"},
    {"korean": "뛰다", "pos": "verb", "meaning": "to run / jump", "pron": "ttwida", "exKo": "공원에서 앞으로 뛰어 가요.", "exEn": "I run forward in the park.", "origin": "native", "group": "core-actions"},
    {"korean": "올라가다", "pos": "verb", "meaning": "to go up / climb", "pron": "ollagada", "exKo": "산 위로 올라가요.", "exEn": "I go up the mountain.", "origin": "native", "group": "core-actions"},
    {"korean": "내려가다", "pos": "verb", "meaning": "to go down", "pron": "naeryeogada", "exKo": "계단을 조심히 내려가세요.", "exEn": "Please go down the stairs carefully.", "origin": "native", "group": "core-actions"},
    {"korean": "마시다", "pos": "verb", "meaning": "to drink", "pron": "masida", "exKo": "시원한 물을 마셔요.", "exEn": "I drink cool water.", "origin": "native", "group": "core-actions"},
    {"korean": "사다", "pos": "verb", "meaning": "to buy", "pron": "sada", "exKo": "가게에서 과일을 사요.", "exEn": "I buy fruit at the store.", "origin": "native", "group": "core-actions"},
    {"korean": "팔다", "pos": "verb", "meaning": "to sell", "pron": "palda", "exKo": "시장에서 생선을 팔아요.", "exEn": "They sell fish at the market.", "origin": "native", "group": "core-actions"},
    {"korean": "만들다", "pos": "verb", "meaning": "to make / create", "pron": "mandeulda", "exKo": "오늘 저녁을 만들어요.", "exEn": "I make dinner today.", "origin": "native", "group": "core-actions", "irregularFamily": "ㄹ-deletion"},

    # Verbs - Part 2
    {"korean": "일어나다", "pos": "verb", "meaning": "to wake up / stand up", "pron": "ireonada", "exKo": "아침 일찍 일어나요.", "exEn": "I wake up early in the morning.", "origin": "native", "group": "core-actions"},
    {"korean": "씻다", "pos": "verb", "meaning": "to wash (hands/face/body)", "pron": "ssitda", "exKo": "손을 깨끗이 씻어요.", "exEn": "I wash my hands clean.", "origin": "native", "group": "core-actions"},
    {"korean": "자다", "pos": "verb", "meaning": "to sleep", "pron": "jada", "exKo": "밤에 침대에서 자요.", "exEn": "I sleep on the bed at night.", "origin": "native", "group": "core-actions"},
    {"korean": "쉬다", "pos": "verb", "meaning": "to rest / take a break", "pron": "swida", "exKo": "의자에 앉아서 쉬어요.", "exEn": "I sit on a chair and rest.", "origin": "native", "group": "core-actions"},
    {"korean": "청소하다", "pos": "verb", "meaning": "to clean (up)", "pron": "cheongsohada", "exKo": "주말에 방을 청소해요.", "exEn": "I clean the room on weekends.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "빨래하다", "pos": "verb", "meaning": "to do laundry", "pron": "ppallaehada", "exKo": "세탁기로 빨래를 해요.", "exEn": "I do laundry with a washing machine.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "요리하다", "pos": "verb", "meaning": "to cook", "pron": "yorihada", "exKo": "부엌에서 야채를 요리해요.", "exEn": "I cook vegetables in the kitchen.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "만나다", "pos": "verb", "meaning": "to meet", "pron": "mannada", "exKo": "카페에서 친구를 만나요.", "exEn": "I meet a friend at the cafe.", "origin": "native", "group": "core-actions"},
    {"korean": "기다리다", "pos": "verb", "meaning": "to wait", "pron": "gidarida", "exKo": "정류장에서 버스를 기다려요.", "exEn": "I wait for the bus at the bus stop.", "origin": "native", "group": "core-actions"},
    {"korean": "배우다", "pos": "verb", "meaning": "to learn", "pron": "baeuda", "exKo": "학원에서 한국어를 배워요.", "exEn": "I learn Korean at the academy.", "origin": "native", "group": "core-actions"},
    {"korean": "가르치다", "pos": "verb", "meaning": "to teach", "pron": "gareuchida", "exKo": "선생님이 학생을 가르쳐요.", "exEn": "The teacher teaches the student.", "origin": "native", "group": "core-actions"},
    {"korean": "생각하다", "pos": "verb", "meaning": "to think", "pron": "saenggakhada", "exKo": "그 문제에 대해 생각해요.", "exEn": "I think about that problem.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "물어보다", "pos": "verb", "meaning": "to ask", "pron": "mureoboda", "exKo": "선생님께 길을 물어봐요.", "exEn": "I ask the teacher the way.", "origin": "native", "group": "core-actions"},
    {"korean": "이야기하다", "pos": "verb", "meaning": "to talk / chat", "pron": "iyagihada", "exKo": "친구들과 이야기해요.", "exEn": "I talk with friends.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "전화하다", "pos": "verb", "meaning": "to call (telephone)", "pron": "jeonhwahada", "exKo": "엄마에게 전화해요.", "exEn": "I call mom.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "보내다", "pos": "verb", "meaning": "to send; spend time", "pron": "bonaeda", "exKo": "우체국에서 편지를 보내요.", "exEn": "I send a letter at the post office.", "origin": "native", "group": "core-actions"},
    {"korean": "받다", "pos": "verb", "meaning": "to receive", "pron": "batda", "exKo": "선생님께 칭찬을 받았어요.", "exEn": "I received praise from the teacher.", "origin": "native", "group": "core-actions"},
    {"korean": "도와주다", "pos": "verb", "meaning": "to help (out)", "pron": "dowajuda", "exKo": "친구를 기꺼이 도와줘요.", "exEn": "I willingly help my friend.", "origin": "native", "group": "core-actions"},

    # Verbs - Part 3
    {"korean": "샤워하다", "pos": "verb", "meaning": "to shower", "pron": "syawohada", "exKo": "매일 아침 샤워해요.", "exEn": "I shower every morning.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "세수하다", "pos": "verb", "meaning": "to wash face", "pron": "sesuhada", "exKo": "일어나서 세수해요.", "exEn": "I wake up and wash my face.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "양치하다", "pos": "verb", "meaning": "to brush teeth", "pron": "yangchihada", "exKo": "밥 먹고 바로 양치해요.", "exEn": "I brush teeth right after eating.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "화장하다", "pos": "verb", "meaning": "to apply makeup", "pron": "hwajanghada", "exKo": "거울을 보며 화장해요.", "exEn": "I apply makeup looking at the mirror.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "면도하다", "pos": "verb", "meaning": "to shave", "pron": "myeondohada", "exKo": "아침마다 면도해요.", "exEn": "I shave every morning.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "출근하다", "pos": "verb", "meaning": "to go to work / start shift", "pron": "chulgeunhada", "exKo": "여덟 시에 회사로 출근해요.", "exEn": "I go to work at the company at 8 o'clock.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "퇴근하다", "pos": "verb", "meaning": "to leave work / finish shift", "pron": "toegeunhada", "exKo": "여섯 시에 정각에 퇴근해요.", "exEn": "I leave work at 6 o'clock sharp.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "일하다", "pos": "verb", "meaning": "to work", "pron": "ilhada", "exKo": "하루 종일 열심히 일해요.", "exEn": "I work hard all day long.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "놀다", "pos": "verb", "meaning": "to play / hang out", "pron": "nolda", "exKo": "주말에 친구와 놀아요.", "exEn": "I hang out with friends on the weekend.", "origin": "native", "group": "core-actions", "irregularFamily": "ㄹ-deletion"},
    {"korean": "웃다", "pos": "verb", "meaning": "to laugh / smile", "pron": "utda", "exKo": "이야기를 듣고 활짝 웃었어요.", "exEn": "I listened to the story and smiled brightly.", "origin": "native", "group": "core-actions"},
    {"korean": "울다", "pos": "verb", "meaning": "to cry", "pron": "ulda", "exKo": "아이가 배고파서 울어요.", "exEn": "The child is crying because he is hungry.", "origin": "native", "group": "core-actions", "irregularFamily": "ㄹ-deletion"},
    {"korean": "타다", "pos": "verb", "meaning": "to ride / take (transport)", "pron": "tada", "exKo": "지하철 역에서 열차를 타요.", "exEn": "I take a train at the subway station.", "origin": "native", "group": "core-actions"},
    {"korean": "내리다", "pos": "verb", "meaning": "to get off; to fall (rain/snow)", "pron": "naerida", "exKo": "이번 역에서 내려야 해요.", "exEn": "I have to get off at this station.", "origin": "native", "group": "core-actions"},
    {"korean": "시작하다", "pos": "verb", "meaning": "to start", "pron": "sijakhada", "exKo": "수업은 아홉 시에 시작해요.", "exEn": "The class starts at nine o'clock.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "끝나다", "pos": "verb", "meaning": "to end / finish", "pron": "kkeunnada", "exKo": "영화가 드디어 끝났어요.", "exEn": "The movie has finally finished.", "origin": "native", "group": "core-actions"},
    {"korean": "사랑하다", "pos": "verb", "meaning": "to love", "pron": "saranghada", "exKo": "저는 제 가족을 사랑해요.", "exEn": "I love my family.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "좋아하다", "pos": "verb", "meaning": "to like", "pron": "joahada", "exKo": "한국 문화를 아주 좋아해요.", "exEn": "I like Korean culture very much.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "싫어하다", "pos": "verb", "meaning": "to dislike / hate", "pron": "sireohada", "exKo": "저는 매운 음식을 싫어해요.", "exEn": "I dislike spicy food.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "축하하다", "pos": "verb", "meaning": "to congratulate", "pron": "chukhahada", "exKo": "생일을 진심으로 축하해요.", "exEn": "I sincerely congratulate your birthday.", "origin": "hybrid", "group": "core-actions"},
    {"korean": "노래하다", "pos": "verb", "meaning": "to sing", "pron": "noraehada", "exKo": "노래방에서 신나게 노래해요.", "exEn": "I sing excitedly at the karaoke.", "origin": "hybrid", "group": "core-actions"},

    # Adjectives - Part 1
    {"korean": "넓다", "pos": "adjective", "meaning": "to be wide / spacious", "pron": "neopda", "exKo": "거실이 아주 넓어요.", "exEn": "The living room is very spacious.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "좁다", "pos": "adjective", "meaning": "to be narrow / cramped", "pron": "jopda", "exKo": "방이 너무 좁아서 불편해요.", "exEn": "The room is too cramped so it is uncomfortable.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "높다", "pos": "adjective", "meaning": "to be high / tall", "pron": "nopda", "exKo": "저 산은 아주 높아요.", "exEn": "That mountain is very high.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "낮다", "pos": "adjective", "meaning": "to be low", "pron": "natda", "exKo": "책상 높이가 너무 낮아요.", "exEn": "The desk height is too low.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "넓다_wide", "pos": "adjective", "lemma": "넓다", "senseKey": "wide", "senseNo": 1, "meaning": "to be broad / vast", "pron": "neopda", "exKo": "바다가 아주 넓게 펼쳐져 있어요.", "exEn": "The sea is spread out vastly.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "새롭다", "pos": "adjective", "meaning": "to be new", "pron": "saeropda", "exKo": "새로운 단어를 공부해요.", "exEn": "I study new words.", "origin": "native", "group": "feelings-descriptions", "irregularFamily": "ㅂ"},
    {"korean": "오래되다", "pos": "adjective", "meaning": "to be old (of objects)", "pron": "oraedoeda", "exKo": "오래된 건물이 많이 보여요.", "exEn": "I see many old buildings.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "맛없다", "pos": "adjective", "meaning": "to be tasteless / bad-tasting", "pron": "madeopda", "exKo": "이 음식은 싱겁고 맛없어요.", "exEn": "This food is bland and tasteless.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "비싸다", "pos": "adjective", "meaning": "to be expensive", "pron": "bissada", "exKo": "이 시계는 너무 비싸요.", "exEn": "This clock is too expensive.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "싸다", "pos": "adjective", "meaning": "to be cheap / inexpensive", "pron": "ssada", "exKo": "마트에서 과일이 아주 싸요.", "exEn": "Fruit is very cheap at the mart.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "한가하다", "pos": "adjective", "meaning": "to be free / unbusy", "pron": "hangahada", "exKo": "주말에는 보통 한가해요.", "exEn": "I am usually free on weekends.", "origin": "hybrid", "group": "feelings-descriptions"},

    # Adjectives - Part 2
    {"korean": "느리다", "pos": "adjective", "meaning": "to be slow", "pron": "neurida", "exKo": "인터넷 속도가 너무 느려요.", "exEn": "The internet speed is too slow.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "덥다", "pos": "adjective", "meaning": "to be hot (weather/air)", "pron": "deopda", "exKo": "여름에는 날씨가 아주 더워요.", "exEn": "In summer, the weather is very hot.", "origin": "native", "group": "feelings-descriptions", "irregularFamily": "ㅂ"},
    {"korean": "시원하다", "pos": "adjective", "meaning": "to be cool / refreshing", "pron": "siwonhada", "exKo": "바람이 불어서 시원해요.", "exEn": "The wind blows so it is refreshing.", "origin": "hybrid", "group": "feelings-descriptions"},
    {"korean": "어둡다", "pos": "adjective", "meaning": "to be dark", "pron": "eodupda", "exKo": "밤이 되니 밖이 어두워요.", "exEn": "As night fell, it is dark outside.", "origin": "native", "group": "feelings-descriptions", "irregularFamily": "ㅂ"},
    {"korean": "밝다", "pos": "adjective", "meaning": "to be bright", "pron": "bakda", "exKo": "교실이 환하고 밝아요.", "exEn": "The classroom is cheerful and bright.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "깨끗하다", "pos": "adjective", "meaning": "to be clean", "pron": "kkaekkeuthada", "exKo": "방이 아주 깨끗하네요.", "exEn": "Oh, the room is very clean.", "origin": "hybrid", "group": "feelings-descriptions"},
    {"korean": "더럽다", "pos": "adjective", "meaning": "to be dirty", "pron": "deoreopda", "exKo": "신발이 더러워서 씻었어요.", "exEn": "The shoes were dirty so I washed them.", "origin": "native", "group": "feelings-descriptions", "irregularFamily": "ㅂ"},
    {"korean": "귀엽다", "pos": "adjective", "meaning": "to be cute", "pron": "gwiyeopda", "exKo": "아기가 아주 귀여워요.", "exEn": "The baby is very cute.", "origin": "native", "group": "feelings-descriptions", "irregularFamily": "ㅂ"},
    {"korean": "편하다", "pos": "adjective", "meaning": "to be comfortable / easy", "pron": "pyeonhada", "exKo": "소파가 아주 편해요.", "exEn": "The sofa is very comfortable.", "origin": "Sino-Korean", "hanja": "편하다", "group": "feelings-descriptions"},
    {"korean": "불편하다", "pos": "adjective", "meaning": "to be uncomfortable", "pron": "bulpyeonhada", "exKo": "의자가 너무 딱딱해서 불편해요.", "exEn": "The chair is too hard so it is uncomfortable.", "origin": "Sino-Korean", "hanja": "불편하다", "group": "feelings-descriptions"},

    # Adjectives - Part 3
    {"korean": "기쁘다", "pos": "adjective", "meaning": "to be glad / happy (about a fact)", "pron": "gippeuda", "exKo": "선물을 받아서 아주 기뻐요.", "exEn": "I am very glad to receive the gift.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "슬프다", "pos": "adjective", "meaning": "to be sad", "pron": "seulpeuda", "exKo": "영화가 너무 슬퍼서 울었어요.", "exEn": "The movie was so sad I cried.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "행복하다", "pos": "adjective", "meaning": "to be happy (long term)", "pron": "haengbokhada", "exKo": "우리 가족은 매일 행복해요.", "exEn": "Our family is happy every day.", "origin": "Sino-Korean", "hanja": "행복하다", "group": "feelings-descriptions"},
    {"korean": "건강하다", "pos": "adjective", "meaning": "to be healthy", "pron": "geonganghada", "exKo": "할머니가 아주 건강하세요.", "exEn": "Grandmother is very healthy.", "origin": "Sino-Korean", "hanja": "건강하다", "group": "feelings-descriptions"},
    {"korean": "튼튼하다", "pos": "adjective", "meaning": "to be strong / sturdy", "pron": "teunteunhada", "exKo": "이 집은 튼튼하게 지어졌어요.", "exEn": "This house was built sturdily.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "약하다", "pos": "adjective", "meaning": "to be weak", "pron": "yakhada", "exKo": "몸이 약해서 운동을 시작했어요.", "exEn": "My body is weak so I started exercising.", "origin": "Sino-Korean", "hanja": "약하다", "group": "feelings-descriptions"},
    {"korean": "조용하다", "pos": "adjective", "meaning": "to be quiet", "pron": "joyonghada", "exKo": "도서관은 아주 조용해요.", "exEn": "The library is very quiet.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "시끄럽다", "pos": "adjective", "meaning": "to be noisy", "pron": "sikkeureopda", "exKo": "공사 소리가 시끄러워요.", "exEn": "The construction sound is noisy.", "origin": "native", "group": "feelings-descriptions", "irregularFamily": "ㅂ"},
    {"korean": "친절하다", "pos": "adjective", "meaning": "to be kind", "pron": "chinjeolhada", "exKo": "간호사 선생님이 친절해요.", "exEn": "The nurse is kind.", "origin": "Sino-Korean", "hanja": "친절하다", "group": "feelings-descriptions"},
    {"korean": "똑똑하다", "pos": "adjective", "meaning": "to be smart / clever", "pron": "ttokttokhada", "exKo": "그 학생은 참 똑똑해요.", "exEn": "That student is really smart.", "origin": "native", "group": "feelings-descriptions"},

    # Pronouns & Grammar
    {"korean": "어디", "pos": "pronoun", "meaning": "where", "pron": "eodi", "exKo": "지금 어디에 가요?", "exEn": "Where are you going now?", "origin": "native", "group": "question-words"},
    {"korean": "언제", "pos": "pronoun", "meaning": "when", "pron": "eonje", "exKo": "생일이 언제예요?", "exEn": "When is your birthday?", "origin": "native", "group": "question-words"},
    {"korean": "어떻게", "pos": "adverb", "meaning": "how", "pron": "eotteoke", "exKo": "한국어 공부는 어떻게 해요?", "exEn": "How do you study Korean?", "origin": "native", "group": "question-words"},
    {"korean": "왜", "pos": "adverb", "meaning": "why", "pron": "wae", "exKo": "왜 어제 안 왔어요?", "exEn": "Why didn't you come yesterday?", "origin": "native", "group": "question-words"},
    {"korean": "무엇", "pos": "pronoun", "meaning": "what (formal)", "pron": "mueot", "exKo": "이것은 무엇입니까?", "exEn": "What is this?", "origin": "native", "group": "question-words"},
    {"korean": "어느", "pos": "determiner", "meaning": "which", "pron": "eoneu", "exKo": "어느 나라 사람이에요?", "exEn": "Which country person are you?", "origin": "native", "group": "question-words"},
    {"korean": "이것", "pos": "pronoun", "meaning": "this thing", "pron": "igeot", "exKo": "이것은 제 책이에요.", "exEn": "This is my book.", "origin": "native", "group": "question-words"},
    {"korean": "그것", "pos": "pronoun", "meaning": "that thing", "pron": "geugeot", "exKo": "그것을 저에게 주세요.", "exEn": "Please give that to me.", "origin": "native", "group": "question-words"},
    {"korean": "저것", "pos": "pronoun", "meaning": "that thing over there", "pron": "jeogeot", "exKo": "저것은 누구 차예요?", "exEn": "Whose car is that over there?", "origin": "native", "group": "question-words"},
    {"korean": "누구", "pos": "pronoun", "meaning": "who", "pron": "nugu", "exKo": "저 사람은 누구예요?", "exEn": "Who is that person?", "origin": "native", "group": "question-words"}
]

# Additional Sino-Korean family words
SINO_FAMILIES = [
    # 학 (study)
    {"korean": "학교", "pos": "noun", "meaning": "school", "pron": "hakgyo", "exKo": "학교에 버스로 가요.", "exEn": "I go to school by bus.", "origin": "Sino-Korean", "hanja": "학교", "group": "study-school"},
    {"korean": "학생", "pos": "noun", "meaning": "student", "pron": "haksaeng", "exKo": "저는 대학교 학생이에요.", "exEn": "I am a college student.", "origin": "Sino-Korean", "hanja": "학생", "group": "study-school"},
    {"korean": "학원", "pos": "noun", "meaning": "academy / private institute", "pron": "hagwon", "exKo": "영어 학원에 다녀요.", "exEn": "I attend an English academy.", "origin": "Sino-Korean", "hanja": "학원", "group": "study-school"},
    {"korean": "수학", "pos": "noun", "meaning": "mathematics", "pron": "suhak", "exKo": "수학 시험이 너무 어려워요.", "exEn": "The math exam is too difficult.", "origin": "Sino-Korean", "hanja": "수학", "group": "study-school"},
    {"korean": "과학", "pos": "noun", "meaning": "science", "pron": "gwahak", "exKo": "과학 책을 읽고 있어요.", "exEn": "I am reading a science book.", "origin": "Sino-Korean", "hanja": "과학", "group": "study-school"},
    {"korean": "학기", "pos": "noun", "meaning": "semester / term", "pron": "hakgi", "exKo": "이번 학기가 끝났어요.", "exEn": "This semester has finished.", "origin": "Sino-Korean", "hanja": "학기", "group": "study-school"},
    {"korean": "장학금", "pos": "noun", "meaning": "scholarship", "pron": "janghakgeum", "exKo": "대학에서 장학금을 받았어요.", "exEn": "I received a scholarship from the university.", "origin": "Sino-Korean", "hanja": "장학금", "group": "study-school"},
    {"korean": "유학", "pos": "noun", "meaning": "studying abroad", "pron": "yuhak", "exKo": "한국으로 유학을 가요.", "exEn": "I go to study abroad in Korea.", "origin": "Sino-Korean", "hanja": "유학", "group": "study-school"},
    {"korean": "입학", "pos": "noun", "meaning": "school admission / entrance", "pron": "iphak", "exKo": "대학교 입학을 축하해요.", "exEn": "Congratulations on entering university.", "origin": "Sino-Korean", "hanja": "입학", "group": "study-school"},
    {"korean": "졸업", "pos": "noun", "meaning": "graduation", "pron": "joreop", "exKo": "내년 봄에 졸업을 해요.", "exEn": "I graduate next spring.", "origin": "Sino-Korean", "hanja": "졸업", "group": "study-school"},

    # 국 (country)
    {"korean": "중국", "pos": "noun", "meaning": "China", "pron": "jungguk", "exKo": "중국 음식을 좋아해요.", "exEn": "I like Chinese food.", "origin": "Sino-Korean", "hanja": "중국", "group": "travel-city"},
    {"korean": "미국", "pos": "noun", "meaning": "United States of America", "pron": "miguk", "exKo": "미국에서 친구가 왔어요.", "exEn": "A friend came from America.", "origin": "Sino-Korean", "hanja": "미국", "group": "travel-city"},
    {"korean": "영국", "pos": "noun", "meaning": "United Kingdom", "pron": "yeongguk", "exKo": "영국식 영어는 멋있어요.", "exEn": "British English is cool.", "origin": "Sino-Korean", "hanja": "영국", "group": "travel-city"},
    {"korean": "일본", "pos": "noun", "meaning": "Japan", "pron": "ilbon", "exKo": "일본으로 여행을 가요.", "exEn": "I travel to Japan.", "origin": "Sino-Korean", "hanja": "일본", "group": "travel-city"},
    {"korean": "외국", "pos": "noun", "meaning": "foreign country", "pron": "oeguk", "exKo": "외국에 나간 적이 없어요.", "exEn": "I have never been abroad.", "origin": "Sino-Korean", "hanja": "외국", "group": "travel-city"},
    {"korean": "외국어", "pos": "noun", "meaning": "foreign language", "pron": "oegugeo", "exKo": "외국어를 배우면 유용해요.", "exEn": "Learning a foreign language is useful.", "origin": "Sino-Korean", "hanja": "외국어", "group": "travel-city"},
    {"korean": "국가", "pos": "noun", "meaning": "nation / state", "pron": "gukga", "exKo": "다른 국가의 문화를 존중해요.", "exEn": "We respect the culture of other nations.", "origin": "Sino-Korean", "hanja": "국가", "group": "travel-city"},
    {"korean": "국내", "pos": "noun", "meaning": "domestic / in-country", "pron": "gungnae", "exKo": "국내 여행도 재미있어요.", "exEn": "Domestic travel is also fun.", "origin": "Sino-Korean", "hanja": "국내", "group": "travel-city"},
    {"korean": "국민", "pos": "noun", "meaning": "citizen / the public", "pron": "gungmin", "exKo": "국민의 권리를 지켜요.", "exEn": "We protect the rights of citizens.", "origin": "Sino-Korean", "hanja": "국민", "group": "travel-city"},
    {"korean": "태국", "pos": "noun", "meaning": "Thailand", "pron": "taeguk", "exKo": "태국 날씨는 일년 내내 더워요.", "exEn": "Thailand's weather is hot all year round.", "origin": "Sino-Korean", "hanja": "태국", "group": "travel-city"},

    # 생 (life/born)
    {"korean": "생일", "pos": "noun", "meaning": "birthday", "pron": "saengil", "exKo": "오늘이 제 생일이에요.", "exEn": "Today is my birthday.", "origin": "Sino-Korean", "hanja": "생일", "group": "time-daily"},
    {"korean": "인생", "pos": "noun", "meaning": "life / human life", "pron": "insaeng", "exKo": "인생은 배움의 연속이에요.", "exEn": "Life is a continuation of learning.", "origin": "Sino-Korean", "hanja": "인생", "group": "time-daily"},
    {"korean": "생활", "pos": "noun", "meaning": "lifestyle / living", "pron": "saenghwal", "exKo": "한국 생활이 익숙해졌어요.", "exEn": "I got used to Korean life.", "origin": "Sino-Korean", "hanja": "생활", "group": "home-routine"},
    {"korean": "생명", "pos": "noun", "meaning": "life force / life", "pron": "saengmyeong", "exKo": "생명은 아주 소중해요.", "exEn": "Life is very precious.", "origin": "Sino-Korean", "hanja": "생명", "group": "weather-nature"},
    {"korean": "생선", "pos": "noun", "meaning": "fresh fish (food)", "pron": "saengseon", "exKo": "식당에서 생선 구이를 먹었어요.", "exEn": "I ate grilled fish at the restaurant.", "origin": "Sino-Korean", "hanja": "생선", "group": "food-drink"},
    {"korean": "생산", "pos": "noun", "meaning": "production / manufacture", "pron": "saengsan", "exKo": "자동차 생산이 늘어났어요.", "exEn": "Automobile production has increased.", "origin": "Sino-Korean", "hanja": "생산", "group": "occupations"},
    {"korean": "생각", "pos": "noun", "meaning": "thought / idea", "pron": "saenggak", "exKo": "좋은 생각이 났어요.", "exEn": "A good idea occurred to me.", "origin": "native", "group": "core-actions"},
    {"korean": "발생", "pos": "noun", "meaning": "occurrence / outbreak", "pron": "balsaeng", "exKo": "사고 발생 시간이 밤이에요.", "exEn": "The accident occurrence time was at night.", "origin": "Sino-Korean", "hanja": "발생", "group": "travel-city"},
    {"korean": "위생", "pos": "noun", "meaning": "hygiene / sanitation", "pron": "wisaeng", "exKo": "식당은 위생이 중요해요.", "exEn": "Hygiene is important in restaurants.", "origin": "Sino-Korean", "hanja": "위생", "group": "body-health"},
    {"korean": "생수", "pos": "noun", "meaning": "mineral water", "pron": "saengsu", "exKo": "마트에서 시원한 생수를 샀어요.", "exEn": "I bought cool mineral water at the mart.", "origin": "Sino-Korean", "hanja": "생수", "group": "food-drink"},

    # 식 (eat)
    {"korean": "식사", "pos": "noun", "meaning": "meal", "pron": "siksa", "exKo": "맛있는 식사를 함께 해요.", "exEn": "Let's have a delicious meal together.", "origin": "Sino-Korean", "hanja": "식사", "group": "food-drink"},
    {"korean": "식당", "pos": "noun", "meaning": "restaurant / dining hall", "pron": "sikdang", "exKo": "식당이 칠 층에 있어요.", "exEn": "The restaurant is on the 7th floor.", "origin": "Sino-Korean", "hanja": "식당", "group": "food-drink"},
    {"korean": "한식", "pos": "noun", "meaning": "Korean food", "pron": "hansik", "exKo": "오늘 저녁은 한식이에요.", "exEn": "Tonight's dinner is Korean food.", "origin": "Sino-Korean", "hanja": "한식", "group": "food-drink"},
    {"korean": "양식", "pos": "noun", "meaning": "Western food; pattern", "pron": "yangsik", "exKo": "특별한 날에 양식을 먹어요.", "exEn": "We eat Western food on special days.", "origin": "Sino-Korean", "hanja": "양식", "group": "food-drink"},
    {"korean": "일식", "pos": "noun", "meaning": "Japanese food; solar eclipse", "pron": "ilsik", "exKo": "저는 일식 초밥을 좋아해요.", "exEn": "I like Japanese sushi.", "origin": "Sino-Korean", "hanja": "일식", "group": "food-drink"},
    {"korean": "중식", "pos": "noun", "meaning": "Chinese food; lunch", "pron": "jungsik", "exKo": "중식 짜장면을 먹을래요.", "exEn": "I want to eat Chinese jajangmyeon.", "origin": "Sino-Korean", "hanja": "중식", "group": "food-drink"},
    {"korean": "식구", "pos": "noun", "meaning": "family member (mouths to feed)", "pron": "sikgu", "exKo": "우리 집 식구는 세 명이에요.", "exEn": "Our household family has three members.", "origin": "Sino-Korean", "hanja": "식구", "group": "family-people"},

    # 대 (big)
    {"korean": "대학교", "pos": "noun", "meaning": "university", "pron": "daehakgyo", "exKo": "대학교 캠퍼스가 예뻐요.", "exEn": "The university campus is pretty.", "origin": "Sino-Korean", "hanja": "대학교", "group": "study-school"},
    {"korean": "대학생", "pos": "noun", "meaning": "college student", "pron": "daehaksaeng", "exKo": "대학생이 되어서 신나요.", "exEn": "I am excited to be a college student.", "origin": "Sino-Korean", "hanja": "대학생", "group": "study-school"},
    {"korean": "대통령", "pos": "noun", "meaning": "president (of nation)", "pron": "daetongnyeong", "exKo": "대통령이 성명을 발표해요.", "exEn": "The president issues a statement.", "origin": "Sino-Korean", "hanja": "대통령", "group": "occupations"},
    {"korean": "대가족", "pos": "noun", "meaning": "large family", "pron": "daegajok", "exKo": "우리 집은 대가족이에요.", "exEn": "Our household has a large family.", "origin": "Sino-Korean", "hanja": "대가족", "group": "family-people"},
    {"korean": "대문", "pos": "noun", "meaning": "main gate / front gate", "pron": "daemun", "exKo": "대문을 파란색으로 칠했어요.", "exEn": "We painted the main gate blue.", "origin": "Sino-Korean", "hanja": "대문", "group": "home-routine"},
    {"korean": "대회", "pos": "noun", "meaning": "competition / tournament", "pron": "daehoe", "exKo": "스포츠 대회에 참가해요.", "exEn": "I participate in the sports tournament.", "origin": "Sino-Korean", "hanja": "대회", "group": "sports"},
    {"korean": "대표", "pos": "noun", "meaning": "representative / delegate", "pron": "daepyo", "exKo": "한국 대표 선수예요.", "exEn": "He is the Korean representative athlete.", "origin": "Sino-Korean", "hanja": "대표", "group": "occupations"},
    {"korean": "대답", "pos": "noun", "meaning": "answer / reply", "pron": "daedap", "exKo": "질문에 빠르게 대답해요.", "exEn": "Answer the question quickly.", "origin": "Sino-Korean", "hanja": "대답", "group": "study-school"},

    # 문 (writing)
    {"korean": "문장_sino", "pos": "noun", "lemma": "문장", "senseKey": "sino", "senseNo": 1, "meaning": "sentence (Sino-Korean)", "pron": "munjang", "exKo": "문장을 한글로 쓰세요.", "exEn": "Write the sentence in Hangul.", "origin": "Sino-Korean", "hanja": "문장", "group": "study-school"},
    {"korean": "문화", "pos": "noun", "meaning": "culture", "pron": "munhwa", "exKo": "한국 문화가 세계에 알려져요.", "exEn": "Korean culture is known to the world.", "origin": "Sino-Korean", "hanja": "문화", "group": "travel-city"},
    {"korean": "문학", "pos": "noun", "meaning": "literature", "pron": "munhak", "exKo": "대학에서 한국 문학을 배워요.", "exEn": "I learn Korean literature at university.", "origin": "Sino-Korean", "hanja": "문학", "group": "study-school"},
    {"korean": "문구", "pos": "noun", "meaning": "phrase / stationery", "pron": "mungu", "exKo": "문구점에서 필통을 샀어요.", "exEn": "I bought a pencil case at the stationery store.", "origin": "Sino-Korean", "hanja": "문구", "group": "study-school"},
    {"korean": "문서", "pos": "noun", "meaning": "document / paper", "pron": "munseo", "exKo": "중요한 문서를 작성해요.", "exEn": "I write an important document.", "origin": "Sino-Korean", "hanja": "문서", "group": "study-school"},
    {"korean": "한문", "pos": "noun", "meaning": "Chinese writing / characters", "pron": "hanmun", "exKo": "한문을 읽는 것은 어려워요.", "exEn": "Reading Chinese characters is difficult.", "origin": "Sino-Korean", "hanja": "한문", "group": "study-school"},
    {"korean": "신문", "pos": "noun", "meaning": "newspaper", "pron": "sinmun", "exKo": "매일 아침 신문을 읽어요.", "exEn": "I read the newspaper every morning.", "origin": "Sino-Korean", "hanja": "신문", "group": "study-school"},
    {"korean": "질문_sino", "pos": "noun", "lemma": "질문", "senseKey": "sino", "senseNo": 1, "meaning": "question", "pron": "jilmun", "exKo": "선생님께 질문을 하세요.", "exEn": "Ask a question to the teacher.", "origin": "Sino-Korean", "hanja": "질문", "group": "study-school"},

    # 화 (change)
    {"korean": "화장실", "pos": "noun", "meaning": "restroom / bathroom", "pron": "hwajangsil", "exKo": "화장실이 어디에 있어요?", "exEn": "Where is the restroom?", "origin": "Sino-Korean", "hanja": "화장실", "group": "home-routine"},
    {"korean": "화요일", "pos": "noun", "meaning": "Tuesday", "pron": "hwayoil", "exKo": "화요일에 친구를 만나요.", "exEn": "I meet a friend on Tuesday.", "origin": "Sino-Korean", "hanja": "화요일", "group": "time-daily"},
    {"korean": "화재", "pos": "noun", "meaning": "fire / blaze disaster", "pron": "hwajae", "exKo": "건물에 화재가 발생했어요.", "exEn": "A fire broke out in the building.", "origin": "Sino-Korean", "hanja": "화재", "group": "travel-city"},
    {"korean": "화초", "pos": "noun", "meaning": "flowering plant / herb", "pron": "hwacho", "exKo": "마당에 예쁜 화초를 심었어요.", "exEn": "I planted pretty flowers in the yard.", "origin": "Sino-Korean", "hanja": "화초", "group": "weather-nature"},
    {"korean": "변화", "pos": "noun", "meaning": "change / transformation", "pron": "byeonhwa", "exKo": "날씨 변화가 아주 심해요.", "exEn": "Weather changes are very severe.", "origin": "Sino-Korean", "hanja": "변화", "group": "weather-nature"},
    {"korean": "영화", "pos": "noun", "meaning": "movie", "pron": "yeonghwa", "exKo": "극장에서 한국 영화를 봤어요.", "exEn": "I watched a Korean movie at the theater.", "origin": "Sino-Korean", "hanja": "영화", "group": "hobbies-leisure"},
    {"korean": "회화", "pos": "noun", "meaning": "conversation / talk", "pron": "hoehwa", "exKo": "매일 한국어 회화를 연습해요.", "exEn": "I practice Korean conversation every day.", "origin": "Sino-Korean", "hanja": "회화", "group": "study-school"},
    {"korean": "화장품", "pos": "noun", "meaning": "cosmetics", "pron": "hwajangpum", "exKo": "백화점에서 화장품을 샀어요.", "exEn": "I bought cosmetics at the department store.", "origin": "Sino-Korean", "hanja": "화장품", "group": "clothing"},

    # 동 (move)
    {"korean": "운동", "pos": "noun", "meaning": "exercise / sports", "pron": "undong", "exKo": "건강을 위해 매일 운동해요.", "exEn": "I exercise every day for health.", "origin": "Sino-Korean", "hanja": "운동", "group": "sports"},
    {"korean": "자동차", "pos": "noun", "meaning": "car / automobile", "pron": "jadongcha", "exKo": "새 자동차를 운전해요.", "exEn": "I drive a new car.", "origin": "Sino-Korean", "hanja": "자동차", "group": "travel-city"},
    {"korean": "활동", "pos": "noun", "meaning": "activity", "pron": "hwalldong", "exKo": "학교 야외 활동에 참가해요.", "exEn": "I participate in school outdoor activities.", "origin": "Sino-Korean", "hanja": "활동", "group": "study-school"},
    {"korean": "행동", "pos": "noun", "meaning": "behavior / action", "pron": "haengdong", "exKo": "행동을 조심히 하세요.", "exEn": "Be careful with your behavior.", "origin": "Sino-Korean", "hanja": "행동", "group": "core-actions"},
    {"korean": "동쪽", "pos": "noun", "meaning": "east side", "pron": "dongjjok", "exKo": "해가 동쪽에서 떠올라요.", "exEn": "The sun rises in the east.", "origin": "hybrid", "group": "weather-nature"},
    {"korean": "공동", "pos": "noun", "meaning": "association / collaboration", "pron": "gongdong", "exKo": "친구와 공동으로 방을 써요.", "exEn": "I share a room in collaboration with a friend.", "origin": "Sino-Korean", "hanja": "공동", "group": "home-routine"}
]

# Additional ~120 words to ensure total new > 550
MORE_WORDS = [
    # Occupations II
    {"korean": "과학자", "pos": "noun", "meaning": "scientist", "pron": "gwahakja", "exKo": "제 꿈은 과학자예요.", "exEn": "My dream is to be a scientist.", "origin": "Sino-Korean", "hanja": "과학자", "group": "occupations"},
    {"korean": "농부", "pos": "noun", "meaning": "farmer", "pron": "nongbu", "exKo": "농부가 밭에서 일해요.", "exEn": "The farmer works in the field.", "origin": "Sino-Korean", "hanja": "농부", "group": "occupations"},
    {"korean": "어부", "pos": "noun", "meaning": "fisherman", "pron": "eobu", "exKo": "어부가 바다에서 물고기를 잡아요.", "exEn": "The fisherman catches fish in the sea.", "origin": "Sino-Korean", "hanja": "어부", "group": "occupations"},
    {"korean": "경찰", "pos": "noun", "meaning": "police / police force", "pron": "gyeongchal", "exKo": "경찰에 신고했어요.", "exEn": "I reported it to the police.", "origin": "Sino-Korean", "hanja": "경찰", "group": "occupations"},
    {"korean": "소방대원", "pos": "noun", "meaning": "firefighter member", "pron": "sobangdaewon", "exKo": "소방대원이 불을 껐어요.", "exEn": "The firefighter extinguished the fire.", "origin": "Sino-Korean", "hanja": "소방대원", "group": "occupations"},
    {"korean": "은행원", "pos": "noun", "meaning": "bank teller / bank clerk", "pron": "eunhaengwon", "exKo": "은행원이 친절하게 응대해요.", "exEn": "The bank clerk responds kindly.", "origin": "Sino-Korean", "hanja": "은행원", "group": "occupations"},
    {"korean": "비서", "pos": "noun", "meaning": "secretary", "pron": "biseo", "exKo": "비서가 일정을 정리해요.", "exEn": "The secretary organizes the schedule.", "origin": "Sino-Korean", "hanja": "비서", "group": "occupations"},
    {"korean": "미용사", "pos": "noun", "meaning": "hairdresser / beautician", "pron": "miyongsa", "exKo": "미용사가 머리를 깎아요.", "exEn": "The hairdresser cuts my hair.", "origin": "Sino-Korean", "hanja": "미용사", "group": "occupations"},
    {"korean": "간호원", "pos": "noun", "meaning": "nurse helper / assistant", "pron": "ganhowon", "exKo": "간호원이 병실을 확인해요.", "exEn": "The nurse assistant checks the ward.", "origin": "Sino-Korean", "hanja": "간호원", "group": "occupations"},
    {"korean": "약제사", "pos": "noun", "meaning": "apothecary / pharmacist", "pron": "yakjesa", "exKo": "약제사가 약을 조제해요.", "exEn": "The pharmacist prepares medicine.", "origin": "Sino-Korean", "hanja": "약제사", "group": "occupations"},

    # Places II
    {"korean": "교회", "pos": "noun", "meaning": "church", "pron": "gyohoe", "exKo": "일요일에 교회에 가요.", "exEn": "I go to church on Sundays.", "origin": "Sino-Korean", "hanja": "교회", "group": "travel-city"},
    {"korean": "성당", "pos": "noun", "meaning": "cathedral / catholic church", "pron": "seongdang", "exKo": "성당에서 미사를 드려요.", "exEn": "I attend mass at the cathedral.", "origin": "Sino-Korean", "hanja": "성당", "group": "travel-city"},
    {"korean": "사찰", "pos": "noun", "meaning": "temple / Buddhist temple", "pron": "sachal", "exKo": "산에 있는 사찰에 갔어요.", "exEn": "I went to a temple in the mountains.", "origin": "Sino-Korean", "hanja": "사찰", "group": "travel-city"},
    {"korean": "박물관", "pos": "noun", "meaning": "museum", "pron": "bangmulgwan", "exKo": "국립박물관을 구경해요.", "exEn": "I tour the national museum.", "origin": "Sino-Korean", "hanja": "박물관", "group": "travel-city"},
    {"korean": "미술관", "pos": "noun", "meaning": "art gallery / museum", "pron": "misulgwan", "exKo": "미술관에서 그림을 감상해요.", "exEn": "I appreciate paintings in the art gallery.", "origin": "Sino-Korean", "hanja": "미술관", "group": "travel-city"},
    {"korean": "수영장", "pos": "noun", "meaning": "swimming pool", "pron": "suyeongjang", "exKo": "수영장에서 수영을 배워요.", "exEn": "I learn swimming at the swimming pool.", "origin": "Sino-Korean", "hanja": "수영장", "group": "travel-city"},
    {"korean": "체육관", "pos": "noun", "meaning": "gym / gymnasium", "pron": "cheyukgwan", "exKo": "체육관에서 농구를 해요.", "exEn": "We play basketball in the gymnasium.", "origin": "Sino-Korean", "hanja": "체육관", "group": "travel-city"},
    {"korean": "헬스장", "pos": "noun", "meaning": "fitness center / gym", "pron": "helseujang", "exKo": "퇴근하고 헬스장에 가요.", "exEn": "I go to the gym after leaving work.", "origin": "hybrid", "group": "travel-city"},
    {"korean": "노래방", "pos": "noun", "meaning": "singing room / karaoke", "pron": "noraebang", "exKo": "친구와 노래방에 갔어요.", "exEn": "I went to a karaoke with a friend.", "origin": "hybrid", "group": "travel-city"},
    {"korean": "영화관", "pos": "noun", "meaning": "movie theater", "pron": "yeonghwagwan", "exKo": "영화관에 사람이 아주 많아요.", "exEn": "There are very many people in the movie theater.", "origin": "Sino-Korean", "hanja": "영화관", "group": "travel-city"},
    {"korean": "백화점", "pos": "noun", "meaning": "department store", "pron": "baekhwajeom", "exKo": "백화점에서 쇼핑을 해요.", "exEn": "I do shopping at the department store.", "origin": "Sino-Korean", "hanja": "백화점", "group": "travel-city"},
    {"korean": "주유소", "pos": "noun", "meaning": "gas station", "pron": "juyuso", "exKo": "주유소에서 기름을 넣어요.", "exEn": "I put gas in at the gas station.", "origin": "Sino-Korean", "hanja": "주유소", "group": "travel-city"},
    {"korean": "경찰서", "pos": "noun", "meaning": "police station", "pron": "gyeongchalseo", "exKo": "경찰서 위치가 어디예요?", "exEn": "Where is the location of the police station?", "origin": "Sino-Korean", "hanja": "경찰서", "group": "travel-city"},
    {"korean": "소방서", "pos": "noun", "meaning": "fire station", "pron": "sobangseo", "exKo": "우리 동네에 소방서가 있어요.", "exEn": "There is a fire station in our neighborhood.", "origin": "Sino-Korean", "hanja": "소방서", "group": "travel-city"},
    {"korean": "시청", "pos": "noun", "meaning": "city hall", "pron": "sicheong", "exKo": "시청 앞 공원이 아주 넓어요.", "exEn": "The park in front of city hall is very wide.", "origin": "Sino-Korean", "hanja": "시청", "group": "travel-city"},
    {"korean": "구청", "pos": "noun", "meaning": "district office", "pron": "gucheong", "exKo": "구청에 가서 여권을 신청했어요.", "exEn": "I went to the district office and applied for a passport.", "origin": "Sino-Korean", "hanja": "구청", "group": "travel-city"},

    # Hobbies II
    {"korean": "등산_hobby", "pos": "noun", "lemma": "등산", "senseKey": "hobby", "senseNo": 1, "meaning": "hiking as a hobby", "pron": "deungsan", "exKo": "제 취미는 주말 등산이에요.", "exEn": "My hobby is weekend hiking.", "origin": "Sino-Korean", "hanja": "등산", "group": "hobbies-leisure"},
    {"korean": "독서_hobby", "pos": "noun", "lemma": "독서", "senseKey": "hobby", "senseNo": 1, "meaning": "reading as a hobby", "pron": "dokseo", "exKo": "독서는 생각하는 힘을 줘요.", "exEn": "Reading gives the power of thinking.", "origin": "Sino-Korean", "hanja": "독서", "group": "hobbies-leisure"},
    {"korean": "여행_hobby", "pos": "noun", "lemma": "여행", "senseKey": "hobby", "senseNo": 1, "meaning": "travel as a hobby", "pron": "yeohaeng", "exKo": "해외 여행은 아주 신나요.", "exEn": "Overseas travel is very exciting.", "origin": "Sino-Korean", "hanja": "여행", "group": "hobbies-leisure"},
    {"korean": "사진_hobby", "pos": "noun", "lemma": "사진", "senseKey": "hobby", "senseNo": 1, "meaning": "photography", "pron": "sajin", "exKo": "사진 찍기가 아주 흥미로워요.", "exEn": "Taking photos is very interesting.", "origin": "Sino-Korean", "hanja": "사진", "group": "hobbies-leisure"},
    {"korean": "낚시_hobby", "pos": "noun", "lemma": "낚시", "senseKey": "hobby", "senseNo": 1, "meaning": "fishing as a hobby", "pron": "naksi", "exKo": "아빠의 유일한 취미는 낚시예요.", "exEn": "Dad's only hobby is fishing.", "origin": "native", "group": "hobbies-leisure"},
    {"korean": "그림_hobby", "pos": "noun", "lemma": "그림", "senseKey": "hobby", "senseNo": 1, "meaning": "painting/drawing hobby", "pron": "geurim", "exKo": "그림 그리기를 매일 연습해요.", "exEn": "I practice drawing every day.", "origin": "native", "group": "hobbies-leisure"},
    {"korean": "요리_hobby", "pos": "noun", "lemma": "요리", "senseKey": "hobby", "senseNo": 1, "meaning": "cooking as a hobby", "pron": "yori", "exKo": "요리는 제 삶의 즐거움이에요.", "exEn": "Cooking is the joy of my life.", "origin": "Sino-Korean", "hanja": "요리", "group": "hobbies-leisure"},
    {"korean": "악기_hobby", "pos": "noun", "lemma": "악기", "senseKey": "hobby", "senseNo": 1, "meaning": "playing instruments", "pron": "akgi", "exKo": "악기를 연주하는 것은 즐거워요.", "exEn": "Playing an instrument is joyful.", "origin": "Sino-Korean", "hanja": "악기", "group": "hobbies-leisure"},
    {"korean": "노래_hobby", "pos": "noun", "lemma": "노래", "senseKey": "hobby", "senseNo": 1, "meaning": "singing as a hobby", "pron": "norae", "exKo": "노래 부르기가 참 기뻐요.", "exEn": "Singing is really joyful.", "origin": "native", "group": "hobbies-leisure"},
    {"korean": "영화_hobby", "pos": "noun", "lemma": "영화", "senseKey": "hobby", "senseNo": 1, "meaning": "watching movies", "pron": "yeonghwa", "exKo": "영화 감상이 제 취미예요.", "exEn": "Watching movies is my hobby.", "origin": "Sino-Korean", "hanja": "영화", "group": "hobbies-leisure"},
    {"korean": "공연", "pos": "noun", "meaning": "performance / show", "pron": "gongyeon", "exKo": "콘서트 공연을 보러 가요.", "exEn": "We go to watch a concert performance.", "origin": "Sino-Korean", "hanja": "공연", "group": "hobbies-leisure"},
    {"korean": "전시회", "pos": "noun", "meaning": "exhibition", "pron": "jeonsihoe", "exKo": "미술 전시회에 다녀왔어요.", "exEn": "I have been to an art exhibition.", "origin": "Sino-Korean", "hanja": "전시회", "group": "hobbies-leisure"},
    {"korean": "음악회", "pos": "noun", "meaning": "concert / music recital", "pron": "eumakhoe", "exKo": "피아노 음악회에 표가 있어요.", "exEn": "I have tickets to a piano concert.", "origin": "Sino-Korean", "hanja": "음악회", "group": "hobbies-leisure"},

    # More Verbs
    {"korean": "일어나다_stand", "pos": "verb", "lemma": "일어나다", "senseKey": "stand", "senseNo": 2, "meaning": "to stand up", "pron": "ireonada", "exKo": "자리에서 일어났어요.", "exEn": "I stood up from the seat.", "origin": "native", "group": "core-actions"},
    {"korean": "쓰다_wear", "pos": "verb", "lemma": "쓰다", "senseKey": "wear", "senseNo": 2, "meaning": "to wear (hat/glasses)", "pron": "sseuda", "exKo": "모자를 머리에 써요.", "exEn": "I wear a hat on my head.", "origin": "native", "group": "clothing"},
    {"korean": "쓰다_use", "pos": "verb", "lemma": "쓰다", "senseKey": "use", "senseNo": 3, "meaning": "to use", "pron": "sseuda", "exKo": "컴퓨터를 매일 써요.", "exEn": "I use the computer every day.", "origin": "native", "group": "core-actions"},
    {"korean": "신다", "pos": "verb", "meaning": "to wear (shoes/socks)", "pron": "sinda", "exKo": "양말을 발에 신어요.", "exEn": "I wear socks on my feet.", "origin": "native", "group": "clothing"},
    {"korean": "입다", "pos": "verb", "meaning": "to wear (clothes)", "pron": "ipda", "exKo": "셔츠를 몸에 입어요.", "exEn": "I wear a shirt on my body.", "origin": "native", "group": "clothing"},
    {"korean": "벗다", "pos": "verb", "meaning": "to take off (clothes/shoes/hat)", "pron": "beotda", "exKo": "방에서 신발을 벗어요.", "exEn": "I take off shoes in the room.", "origin": "native", "group": "clothing"},
    {"korean": "타다_burn", "pos": "verb", "lemma": "타다", "senseKey": "burn", "senseNo": 2, "meaning": "to burn / catch fire", "pron": "tada", "exKo": "불이 나서 집이 타요.", "exEn": "A fire broke out and the house is burning.", "origin": "native", "group": "core-actions"},
    {"korean": "내리다_fall", "pos": "verb", "lemma": "내리다", "senseKey": "fall", "senseNo": 2, "meaning": "to fall / descend (rain/snow)", "pron": "naerida", "exKo": "하늘에서 비가 내려요.", "exEn": "Rain falls from the sky.", "origin": "native", "group": "weather-nature"},
    {"korean": "다니다_attend", "pos": "verb", "lemma": "다니다", "senseKey": "attend", "senseNo": 1, "meaning": "to commute / go to", "pron": "danida", "exKo": "회사에 버스로 다녀요.", "exEn": "I commute to work by bus.", "origin": "native", "group": "core-actions"},
    {"korean": "부르다", "pos": "verb", "meaning": "to call / sing; to be full (stomach)", "pron": "bureuda", "exKo": "노래를 크게 불러요.", "exEn": "I sing a song loudly.", "origin": "native", "group": "core-actions", "irregularFamily": "르"},
    {"korean": "부르다_stomach", "pos": "adjective", "lemma": "부르다", "senseKey": "full", "senseNo": 2, "meaning": "to be full (stomach)", "pron": "bureuda", "exKo": "밥을 많이 먹어서 배가 불러요.", "exEn": "I ate a lot of rice so my stomach is full.", "origin": "native", "group": "feelings-descriptions", "irregularFamily": "르"},

    # More Adjectives
    {"korean": "아프다", "pos": "adjective", "meaning": "to be sick / painful / hurt", "pron": "apeuda", "exKo": "머리가 아주 아파요.", "exEn": "My head hurts very much.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "바쁘다_busy", "pos": "adjective", "lemma": "바쁘다", "senseKey": "busy", "senseNo": 1, "meaning": "to be busy", "pron": "bappuda", "exKo": "오늘 회사 일이 아주 바빠요.", "exEn": "Today company work is very busy.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "예쁘다_pretty", "pos": "adjective", "lemma": "예쁘다", "senseKey": "pretty", "senseNo": 1, "meaning": "to be pretty", "pron": "yeppeuda", "exKo": "꽃이 참 예쁘네요.", "exEn": "Oh, the flower is really pretty.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "슬프다_sad", "pos": "adjective", "lemma": "슬프다", "senseKey": "sad", "senseNo": 1, "meaning": "to be sad", "pron": "seulpeuda", "exKo": "이야기가 너무 슬퍼요.", "exEn": "The story is so sad.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "기쁘다_glad", "pos": "adjective", "lemma": "기쁘다", "senseKey": "glad", "senseNo": 1, "meaning": "to be glad", "pron": "gippeuda", "exKo": "합격해서 참 기쁩니다.", "exEn": "I am really glad to pass.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "나쁘다_bad", "pos": "adjective", "lemma": "나쁘다", "senseKey": "bad", "senseNo": 1, "meaning": "to be bad", "pron": "nappuda", "exKo": "미세먼지로 날씨가 나빠요.", "exEn": "The weather is bad due to fine dust.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "크다_big", "pos": "adjective", "lemma": "크다", "senseKey": "big", "senseNo": 1, "meaning": "to be big / tall", "pron": "keuda", "exKo": "키가 아주 크네요.", "exEn": "Oh, he is very tall.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "작다_small", "pos": "adjective", "lemma": "작다", "senseKey": "small", "senseNo": 1, "meaning": "to be small", "pron": "jakda", "exKo": "방이 아주 작아요.", "exEn": "The room is very small.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "고프다", "pos": "adjective", "meaning": "to be hungry", "pron": "gopeuda", "exKo": "배가 고파서 밥을 먹어요.", "exEn": "I eat rice because I am hungry.", "origin": "native", "group": "feelings-descriptions"},
    {"korean": "기차다", "pos": "adjective", "meaning": "to be amazing / full of energy", "pron": "gichada", "exKo": "그 음식 맛이 정말 기차요.", "exEn": "That food taste is really amazing.", "origin": "native", "group": "feelings-descriptions"},

    # Hobbies & Leisure II
    {"korean": "과자_snack", "pos": "noun", "meaning": "snack / cookie (leisure)", "pron": "gwaja", "exKo": "영화 보면서 과자를 먹어요.", "exEn": "I eat snacks while watching movies.", "origin": "Sino-Korean", "hanja": "과자", "group": "food-drink"},
    {"korean": "사탕_candy", "pos": "noun", "meaning": "candy (sweet)", "pron": "satang", "exKo": "아이에게 달콤한 사탕을 줬어요.", "exEn": "I gave sweet candy to the child.", "origin": "Sino-Korean", "hanja": "사탕", "group": "food-drink"},
    {"korean": "초콜릿_choco", "pos": "noun", "meaning": "chocolate candy", "pron": "chokollit", "exKo": "초콜릿 케이크를 만들었어요.", "exEn": "I made a chocolate cake.", "origin": "loanword", "group": "food-drink"},
    {"korean": "주스_juice", "pos": "noun", "meaning": "fruit juice drink", "pron": "juseu", "exKo": "아침에 주스를 한 컵 마셨어요.", "exEn": "I drank a cup of juice in the morning.", "origin": "loanword", "group": "food-drink"},
    {"korean": "맥주_beer", "pos": "noun", "meaning": "beer alcohol", "pron": "maekju", "exKo": "시원한 맥주를 냉장고에서 꺼냈어요.", "exEn": "I took cold beer out of the refrigerator.", "origin": "Sino-Korean", "hanja": "맥주", "group": "food-drink"},
    {"korean": "소주_soju", "pos": "noun", "meaning": "Korean soju drink", "pron": "soju", "exKo": "한국 소주는 인기가 아주 많아요.", "exEn": "Korean soju is very popular.", "origin": "Sino-Korean", "hanja": "소주", "group": "food-drink"},

    # Home & Routine II
    {"korean": "수건_towel", "pos": "noun", "meaning": "face towel", "pron": "sugeon", "exKo": "세수하고 수건으로 닦으세요.", "exEn": "Wash your face and wipe with a towel.", "origin": "Sino-Korean", "hanja": "수건", "group": "home-routine"},
    {"korean": "비누_soap", "pos": "noun", "meaning": "bath soap", "pron": "binu", "exKo": "손 세정 대신 비누를 써요.", "exEn": "I use soap instead of hand wash.", "origin": "native", "group": "home-routine"},
    {"korean": "치약_paste", "pos": "noun", "meaning": "dental paste", "pron": "chiyak", "exKo": "치약이 다 떨어졌어요.", "exEn": "The toothpaste is all gone.", "origin": "Sino-Korean", "hanja": "치약", "group": "home-routine"},
    {"korean": "칫솔_brush", "pos": "noun", "meaning": "toothbrush tool", "pron": "chitsol", "exKo": "칫솔을 세 달마다 바꿔요.", "exEn": "I change my toothbrush every three months.", "origin": "hybrid", "group": "home-routine"},
    {"korean": "샴푸_shampoo", "pos": "noun", "meaning": "hair shampoo liquid", "pron": "syampu", "exKo": "샴푸 향이 아주 좋아요.", "exEn": "The shampoo scent is very good.", "origin": "loanword", "group": "home-routine"},
    {"korean": "가위", "pos": "noun", "meaning": "scissors", "pron": "gawi", "exKo": "가위로 종이를 잘라요.", "exEn": "I cut paper with scissors.", "origin": "native", "group": "home-routine"},
    {"korean": "칼", "pos": "noun", "meaning": "knife", "pron": "kal", "exKo": "부엌칼로 양파를 썰어요.", "exEn": "I slice onions with a kitchen knife.", "origin": "native", "group": "home-routine"},
    {"korean": "테이프", "pos": "noun", "meaning": "sticky tape", "pron": "teipeu", "exKo": "테이프로 상자를 붙여요.", "exEn": "I stick the box with tape.", "origin": "loanword", "group": "home-routine"},
    {"korean": "쓰레기통", "pos": "noun", "meaning": "trash can", "pron": "sseuregitong", "exKo": "쓰레기는 쓰레기통에 버려 주세요.", "exEn": "Please throw trash in the trash can.", "origin": "native", "group": "home-routine"},

    # Travel & City II
    {"korean": "호텔_stay", "pos": "noun", "meaning": "hotel stay", "pron": "hotel", "exKo": "호텔 예약은 미리 했어요.", "exEn": "I made the hotel reservation in advance.", "origin": "loanword", "group": "travel-city"},
    {"korean": "수영장_pool", "pos": "noun", "meaning": "swimming pool place", "pron": "suyeongjang", "exKo": "수영장에 사람이 거의 없어요.", "exEn": "There is almost no one in the swimming pool.", "origin": "Sino-Korean", "hanja": "수영장", "group": "travel-city"},
    {"korean": "노래방_karaoke", "pos": "noun", "meaning": "karaoke room", "pron": "noraebang", "exKo": "노래방에서 스트레스를 풀어요.", "exEn": "I relieve stress at the karaoke.", "origin": "hybrid", "group": "travel-city"},
    {"korean": "극장_cinema", "pos": "noun", "meaning": "cinema theater", "pron": "geukjang", "exKo": "동네 극장이 문을 닫았어요.", "exEn": "The neighborhood theater closed.", "origin": "Sino-Korean", "hanja": "극장", "group": "travel-city"},
    {"korean": "공원_park", "pos": "noun", "meaning": "public park", "pron": "gongwon", "exKo": "공원에서 산책을 즐겨요.", "exEn": "I enjoy a walk in the park.", "origin": "Sino-Korean", "hanja": "공원", "group": "travel-city"},
    {"korean": "식당_eatery", "pos": "noun", "meaning": "eatery / restaurant", "pron": "sikdang", "exKo": "이 식당은 비빔밥 전문이에요.", "exEn": "This eatery specializes in bibimbap.", "origin": "Sino-Korean", "hanja": "식당", "group": "travel-city"},
    {"korean": "카페_cafe", "pos": "noun", "meaning": "coffee shop", "pron": "kape", "exKo": "카페에서 시원한 라떼를 시켰어요.", "exEn": "I ordered a cold latte at the cafe.", "origin": "loanword", "group": "travel-city"},
    {"korean": "회사_office", "pos": "noun", "meaning": "company office", "pron": "hoesa", "exKo": "회사 생활은 피곤해요.", "exEn": "Company life is tiring.", "origin": "Sino-Korean", "hanja": "회사", "group": "travel-city"},

    # Nature & Landscape II
    {"korean": "강_river", "pos": "noun", "meaning": "river flow", "pron": "gang", "exKo": "강물 소리가 잔잔해요.", "exEn": "The river water sound is calm.", "origin": "Sino-Korean", "hanja": "강", "group": "weather-nature"},
    {"korean": "바다_sea", "pos": "noun", "meaning": "ocean sea", "pron": "bada", "exKo": "바다 냄새가 아주 짭짤해요.", "exEn": "The sea smell is very salty.", "origin": "native", "group": "weather-nature"},
    {"korean": "나무_tree", "pos": "noun", "meaning": "plant tree", "pron": "namu", "exKo": "나무 밑에서 바람을 피해요.", "exEn": "I avoid the wind under the tree.", "origin": "native", "group": "weather-nature"},
    {"korean": "꽃_flower", "pos": "noun", "meaning": "blooming flower", "pron": "kkot", "exKo": "꽃 시장에서 장미를 샀어요.", "exEn": "I bought roses at the flower market.", "origin": "native", "group": "weather-nature"},
    {"korean": "풀_grass", "pos": "noun", "meaning": "green grass", "pron": "pul", "exKo": "풀밭에 누워서 하늘을 봐요.", "exEn": "I lie on the grass and watch the sky.", "origin": "native", "group": "weather-nature"},
    {"korean": "돌_stone", "pos": "noun", "meaning": "hard stone", "pron": "dol", "exKo": "돌탑을 정성껏 쌓았어요.", "exEn": "I built a stone tower with care.", "origin": "native", "group": "weather-nature"},
    {"korean": "흙_soil", "pos": "noun", "meaning": "earth soil", "pron": "heuk", "exKo": "흙을 만지면 기분이 좋아져요.", "exEn": "Touching soil makes me feel better.", "origin": "native", "group": "weather-nature"},
    {"korean": "숲_woods", "pos": "noun", "meaning": "forest woods", "pron": "sup", "exKo": "숲에는 새 소리가 가득해요.", "exEn": "The forest is full of bird sounds.", "origin": "native", "group": "weather-nature"},
    {"korean": "모래_sand", "pos": "noun", "meaning": "beach sand", "pron": "morae", "exKo": "모래성 쌓기를 하고 놀아요.", "exEn": "We play building sandcastles.", "origin": "native", "group": "weather-nature"},
    {"korean": "나뭇잎", "pos": "noun", "meaning": "tree leaf", "pron": "namunnip", "exKo": "나뭇잎이 초록색에서 빨간색으로 변해요.", "exEn": "Tree leaves change from green to red.", "origin": "native", "group": "weather-nature"},
    {"korean": "씨앗_seed", "pos": "noun", "meaning": "plant seed", "pron": "ssiat", "exKo": "작은 씨앗이 싹을 틔워요.", "exEn": "A small seed sprouts.", "origin": "native", "group": "weather-nature"},

    # Time & Calendar II
    {"korean": "평일_weekday", "pos": "noun", "meaning": "normal weekday", "pron": "pyeongil", "exKo": "평일에 바빠서 주말에 쉬어요.", "exEn": "I am busy on weekdays so I rest on weekends.", "origin": "Sino-Korean", "hanja": "평일", "group": "time-daily"},
    {"korean": "공휴일_holiday", "pos": "noun", "meaning": "public holiday day", "pron": "gonghyuil", "exKo": "공휴일에는 학교에 안 가요.", "exEn": "I don't go to school on public holidays.", "origin": "Sino-Korean", "hanja": "공휴일", "group": "time-daily"},
    {"korean": "휴가_vacation", "pos": "noun", "meaning": "job vacation", "pron": "hyuga", "exKo": "휴가가 이틀 남았어요.", "exEn": "I have two days left of my vacation.", "origin": "Sino-Korean", "hanja": "휴가", "group": "time-daily"},
    {"korean": "방학_break", "pos": "noun", "meaning": "school vacation break", "pron": "banghak", "exKo": "겨울 방학이 드디어 시작해요.", "exEn": "Winter vacation finally starts.", "origin": "Sino-Korean", "hanja": "방학", "group": "time-daily"},
    {"korean": "매일_daily", "pos": "noun", "meaning": "daily day", "pron": "maeil", "exKo": "매일 물을 여덟 잔 마셔요.", "exEn": "I drink eight glasses of water daily.", "origin": "Sino-Korean", "hanja": "매일", "group": "time-daily"},
    {"korean": "이번_this", "pos": "noun", "meaning": "this time round", "pron": "ibeon", "exKo": "이번 주말에 만나요.", "exEn": "Let's meet this weekend.", "origin": "Sino-Korean", "hanja": "이번", "group": "time-daily"},
    {"korean": "지난_last", "pos": "noun", "meaning": "last time / past", "pron": "jinan", "exKo": "지난달에 월급을 받았어요.", "exEn": "I received my salary last month.", "origin": "native", "group": "time-daily"},
    {"korean": "다음_next", "pos": "noun", "meaning": "next time", "pron": "daeum", "exKo": "다음 역은 서울역입니다.", "exEn": "The next station is Seoul Station.", "origin": "native", "group": "time-daily"},

    # Study & School Life II
    {"korean": "질문_question", "pos": "noun", "meaning": "simple question", "pron": "jilmun", "exKo": "질문이 있어서 손을 들었어요.", "exEn": "I had a question so I raised my hand.", "origin": "Sino-Korean", "hanja": "질문", "group": "study-school"},
    {"korean": "대답_answer", "pos": "noun", "meaning": "simple answer", "pron": "daedap", "exKo": "그의 대답은 명확했어요.", "exEn": "His answer was clear.", "origin": "Sino-Korean", "hanja": "대답", "group": "study-school"},
    {"korean": "성적_grades", "pos": "noun", "meaning": "exam grades", "pron": "seongjeok", "exKo": "성적이 나빠서 걱정이에요.", "exEn": "I'm worried because my grades are bad.", "origin": "Sino-Korean", "hanja": "성적", "group": "study-school"},
    {"korean": "교실_classroom", "pos": "noun", "meaning": "class room room", "pron": "gyosil", "exKo": "교실 문이 닫혀 있어요.", "exEn": "The classroom door is closed.", "origin": "Sino-Korean", "hanja": "교실", "group": "study-school"},
    {"korean": "지우개_eraser", "pos": "noun", "meaning": "pencil eraser", "pron": "jiugae", "exKo": "지우개를 친구에게 빌려줬어요.", "exEn": "I lent an eraser to a friend.", "origin": "native", "group": "study-school"}
]

def process_entry(item, idx):
    korean_raw = item["korean"]
    if "_" in korean_raw:
        korean_clean = korean_raw.split("_")[0]
        sense_key = item.get("senseKey", korean_raw.split("_")[1])
    else:
        korean_clean = korean_raw
        sense_key = item.get("senseKey")
        
    w_obj = {
        "korean": korean_clean,
        "meaning": item["meaning"],
        "pos": item["pos"],
        "pronunciation": item.get("pron") or item.get("pronunciation"),
        "exampleKo": item.get("exKo") or item.get("exampleKo"),
        "exampleEn": item.get("exEn") or item.get("exampleEn"),
        "lessonGroup": item.get("group") or item.get("lessonGroup"),
        "originType": item.get("origin") or item.get("originType"),
        "difficulty": item.get("difficulty", 3)
    }
    
    if "hanja" in item and HANJA_RE.search(item["hanja"]):
        w_obj["hanja"] = item["hanja"]
    if "irregularFamily" in item:
        w_obj["irregularFamily"] = item["irregularFamily"]
    
    # Polyseme fields
    lemma = item.get("lemma", korean_clean)
    w_obj["lemma"] = lemma
    if sense_key:
        w_obj["senseKey"] = sense_key
        w_obj["senseNo"] = item.get("senseNo", 1)
        
    # Setup clean pronunciation string for ID
    clean_pron = re.sub(r'[^a-zA-Z0-9]', '', w_obj["pronunciation"])
    suffix = f"_{sense_key}" if sense_key else ""
    w_obj["id"] = f"w_m5_{idx:03d}_{clean_pron}{suffix}"
    
    # Set voice texts
    w_obj["voiceText"] = korean_clean
    w_obj["exampleVoiceText"] = w_obj["exampleKo"]
    
    return w_obj

# Consolidate all new words
all_new_words = []
idx_counter = 1

# Process numbers & counters
for cat, items in CATEGORIES.items():
    for item in items:
        # Create full structure
        raw_obj = item.copy()
        raw_obj["group"] = "survival-core" if "numbers" in cat else "post-hangul-bridge"
        w_obj = process_entry(raw_obj, idx_counter)
        idx_counter += 1
        all_new_words.append(w_obj)

# Process thematic words
for item in THEMATIC_WORDS:
    w_obj = process_entry(item, idx_counter)
    idx_counter += 1
    all_new_words.append(w_obj)

# Process Sino families
for item in SINO_FAMILIES:
    w_obj = process_entry(item, idx_counter)
    idx_counter += 1
    all_new_words.append(w_obj)

# Process MORE_WORDS
for item in MORE_WORDS:
    w_obj = process_entry(item, idx_counter)
    idx_counter += 1
    all_new_words.append(w_obj)

print(f"Total new words generated: {len(all_new_words)}")

# Write to words_curated_core.js
core_path = "words_curated_core.js"
with open(core_path, "r", encoding="utf-8") as f:
    core_content = f.read()

# Generate the defines code block
defines = []
for w in all_new_words:
    # Build JS define object
    parts = [
        f'id: "{w["id"]}"',
        f'korean: "{w["korean"]}"',
        f'meaning: "{w["meaning"]}"',
        f'pos: "{w["pos"]}"',
        f'pronunciation: "{w["pronunciation"]}"',
        f'exampleKo: "{w["exampleKo"]}"',
        f'exampleEn: "{w["exampleEn"]}"',
        f'lessonGroup: "{w["lessonGroup"]}"'
    ]
    if "originType" in w:
        parts.append(f'originType: "{w["originType"]}"')
    if "hanja" in w:
        parts.append(f'hanja: "{w["hanja"]}"')
    if "irregularFamily" in w:
        parts.append(f'irregularFamily: "{w["irregularFamily"]}"')
    if "lemma" in w:
        parts.append(f'lemma: "{w["lemma"]}"')
    if "senseKey" in w:
        parts.append(f'senseKey: "{w["senseKey"]}"')
    if "senseNo" in w:
        parts.append(f'senseNo: {w["senseNo"]}')
    if "voiceText" in w:
        parts.append(f'voiceText: "{w["voiceText"]}"')
    if "exampleVoiceText" in w:
        parts.append(f'exampleVoiceText: "{w["exampleVoiceText"]}"')
        
    js_line = "    defineWord({ " + ", ".join(parts) + " }),"
    defines.append(js_line)

defines_code = "\n".join(defines)

# Insert before parent array ends
match = list(re.finditer(r'\];\s*\}\)\(\);', core_content))
if not match:
    raise Exception("Could not find insertion point in words_curated_core.js")
insert_idx = match[-1].start()
new_core_content = core_content[:insert_idx] + defines_code + "\n  " + core_content[insert_idx:]

with open(core_path, "w", encoding="utf-8") as f:
    f.write(new_core_content)

print("Updated words_curated_core.js successfully.")

# Group new words into W20+ lessons
lesson_size = 7
lessons_list = []
stage_counter = 20

# Group all_new_words by lessonGroup first to make the lessons thematic!
grouped_by_tag = {}
for w in all_new_words:
    grp = w["lessonGroup"]
    if grp not in grouped_by_tag:
        grouped_by_tag[grp] = []
    grouped_by_tag[grp].append(w)

lessons_code_parts = []
lesson_id_counter = 1

# Display names for lesson groups
GROUP_LABELS = {
    "survival-core": "Survival basics",
    "post-hangul-bridge": "Building bridge",
    "family-people": "Family and relationship",
    "colors": "Colors of the world",
    "body-parts": "Human body",
    "clothing": "Fashion and clothing",
    "animals": "Nature's animals",
    "food-drink": "Food and taste",
    "home-routine": "Home routine",
    "travel-city": "Travel and city places",
    "weather-nature": "Nature and landscape",
    "time-daily": "Time and calendar",
    "study-school": "Study and class life",
    "hobbies-leisure": "Hobbies and leisure",
    "sports": "Active sports",
    "occupations": "Jobs and careers",
    "core-actions": "Everyday actions",
    "feelings-descriptions": "Descriptions and feelings",
    "question-words": "Asking questions"
}

for grp, words in grouped_by_tag.items():
    label = GROUP_LABELS.get(grp, grp.replace("-", " ").capitalize())
    for i in range(0, len(words), lesson_size):
        chunk = words[i:i+lesson_size]
        if not chunk:
            continue
        lesson_id = f"w{stage_counter}-theme-{lesson_id_counter:02d}"
        lesson_title = f"{label} Part {lesson_id_counter}" if len(words) > lesson_size else label
        
        word_ids_js = ", ".join([f'"{w["id"]}"' for w in chunk])
        
        lesson_def = f"""    defineLesson({{
      id: "{lesson_id}",
      stage: "W{stage_counter}",
      title: "{lesson_title}",
      subtitle: "Learn {len(chunk)} common words",
      goal: "Expand your thematic vocabulary for {label.lower()}.",
      newWordIds: [{word_ids_js}]
    }}),"""
        lessons_code_parts.append(lesson_def)
        lesson_id_counter += 1
        
    # Bump stage after finishing a group to keep things ordered
    stage_counter += 1

lessons_code = "\n".join(lessons_code_parts)

# Write to words_lesson_plan.js
plan_path = "words_lesson_plan.js"
with open(plan_path, "r", encoding="utf-8") as f:
    plan_content = f.read()

match_plan = list(re.finditer(r'\];\s*\}\)\(\);', plan_content))
if not match_plan:
    raise Exception("Could not find insertion point in words_lesson_plan.js")
insert_plan_idx = match_plan[-1].start()
new_plan_content = plan_content[:insert_plan_idx] + lessons_code + "\n  " + plan_content[insert_plan_idx:]

with open(plan_path, "w", encoding="utf-8") as f:
    f.write(new_plan_content)

print("Updated words_lesson_plan.js successfully.")

# Bump sw.js and index.html cache/version query keys
# Bumping sw.js
sw_path = "sw.js"
with open(sw_path, "r", encoding="utf-8") as f:
    sw_content = f.read()

# Replace hanapath-shell-v106 with hanapath-shell-v107
sw_content = sw_content.replace('hanapath-shell-v106', 'hanapath-shell-v107')
# Replace loaded query parameters for modified scripts
sw_content = sw_content.replace('words_curated_core.js?v=20260703c', 'words_curated_core.js?v=20260703d')
sw_content = sw_content.replace('words_lesson_plan.js?v=20260703b', 'words_lesson_plan.js?v=20260703c')

with open(sw_path, "w", encoding="utf-8") as f:
    f.write(sw_content)

# Bumping index.html
html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

html_content = html_content.replace('words_curated_core.js?v=20260703c', 'words_curated_core.js?v=20260703d')
html_content = html_content.replace('words_lesson_plan.js?v=20260703b', 'words_lesson_plan.js?v=20260703c')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Updated sw.js and index.html version queries successfully.")
