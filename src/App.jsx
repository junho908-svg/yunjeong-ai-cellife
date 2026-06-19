import React, { useState, useEffect } from "react";
import {
  Sparkles, Play, Lock, CheckCircle2, Circle, User, ShieldCheck,
  GraduationCap, Droplet, Users, TrendingUp, BookOpen, Menu, X,
  ArrowRight, Crown, Wand2, Globe, Heart, ChevronLeft, ChevronRight, Maximize2, Presentation, Newspaper, HelpCircle
} from "lucide-react";
import RewardSimulator from "./RewardSimulator";

// ▼▼▼ 유튜브 소개 영상 ID — 영상 주소(youtu.be/XXXX 또는 watch?v=XXXX)의 11자리만 여기에 넣으세요 ▼▼▼
const YT_INTRO_ID = "i5b8Rm_DbW4";
// ▲▲▲ 예) https://youtu.be/abcd1234XYZ  →  "abcd1234XYZ" ▲▲▲

// ▼▼▼ 상담 연결 주소 — 카카오 채널/오픈채팅 URL, 또는 "tel:01012345678" 형식. 비워두면 회원 강의실로 연결됩니다 ▼▼▼
const CONSULT_LINK = "";
// ▲▲▲ 예) "https://pf.kakao.com/_xxxxx" 또는 "tel:01000000000" ▲▲▲

export default function YunjeongAICellife() {
  const [navOpen, setNavOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [done, setDone] = useState({});
  const [modal, setModal] = useState(null);
  const [deck, setDeck] = useState("yunhee");
  const [heroSlide, setHeroSlide] = useState(0);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [showSim, setShowSim] = useState(false);
  const [showAnnounce, setShowAnnounce] = useState(true);

  const yunheeSlides = [
    { src: "slides-yunhee/slide-01.png", t: "마스터피스: 셀비아 앰플", tag: "표지" },
    { src: "slides-yunhee/slide-02.png", t: "피부 재생의 한계를 넘는 미드나잇 알케미", tag: "도입" },
    { src: "slides-yunhee/slide-03.png", t: "ACT I. 줄기세포의 3대 핵심 자생력", tag: "ACT I" },
    { src: "slides-yunhee/slide-04.png", t: "압도적 효능의 기원: 인체 유래 줄기세포", tag: "원료 비교" },
    { src: "slides-yunhee/slide-05.png", t: "가장 어린 세포의 힘: 인체양수줄기세포배양액", tag: "핵심 성분" },
    { src: "slides-yunhee/slide-06.png", t: "피부 재생의 오케스트라: 성장인자 컴플렉스", tag: "성장인자" },
    { src: "slides-yunhee/slide-07.png", t: "ACT II. 기술적 기적: 피부 장벽의 한계를 허물다", tag: "ACT II" },
    { src: "slides-yunhee/slide-08.png", t: "초미세 나노 공법, MNT", tag: "나노 기술" },
    { src: "slides-yunhee/slide-09.png", t: "ACT III. 제주 용암 해수 베이스", tag: "ACT III" },
    { src: "slides-yunhee/slide-10.png", t: "셀비아만의 독자적 특허 원료", tag: "특허 원료" },
    { src: "slides-yunhee/slide-11.png", t: "ACT IV. 한 방울의 기적: NEW 셀비아 미솔로지 앰플", tag: "ACT IV" },
    { src: "slides-yunhee/slide-12.png", t: "미솔로지 크리에이션 앰플: 포뮬러 해부도", tag: "포뮬러" },
    { src: "slides-yunhee/slide-13.png", t: "10대 핵심 성분 매트릭스", tag: "성분 매트릭스" },
    { src: "slides-yunhee/slide-14.png", t: "더 셀비아 패러다임 (The Cellvia Paradigm)", tag: "패러다임" },
    { src: "slides-yunhee/slide-15.png", t: "세월을 거스르는 당신만의 특권, 셀비아", tag: "메시지" },
    { src: "slides-yunhee/slide-16.png", t: "가격과 성분의 시대를 넘어, 즉각적 체감의 시대로", tag: "체감" },
    { src: "slides-yunhee/slide-17.png", t: "피부 시간을 되돌리는 3대 핵심 원리", tag: "핵심 원리" },
    { src: "slides-yunhee/slide-18.png", t: "왜 양수 줄기세포인가? 재생력의 기원", tag: "재생력" },
    { src: "slides-yunhee/slide-19.png", t: "피부 진피층을 깨우는 프리미엄 칵테일 레시피", tag: "레시피" },
    { src: "slides-yunhee/slide-20.png", t: "시너지의 정점: 앰플과 디바이스의 만남", tag: "시너지" },
    { src: "slides-yunhee/slide-21.png", t: "바르지 않고 분사하다: 슈스펠 에어 테라피", tag: "디바이스" },
    { src: "slides-yunhee/slide-22.png", t: "내 손 안의 고급 에스테틱: 슈스펠 4-in-1", tag: "4-in-1" },
    { src: "slides-yunhee/slide-23.png", t: "단 5분, 4-in-1 시너지로 3배의 흡수율", tag: "4-in-1" },
    { src: "slides-yunhee/slide-24.png", t: "마스터 루틴 요약: 3-Step 공식", tag: "루틴" },
    { src: "slides-yunhee/slide-25.png", t: "Step 1. 에어 테라피: 두피와 림프를 여는 길", tag: "Step 1" },
    { src: "slides-yunhee/slide-26.png", t: "Step 2. 갈바닉 림프 케어: 타겟 리프팅", tag: "Step 2" },
    { src: "slides-yunhee/slide-27.png", t: "ALL IN ONE: Before & After 사례", tag: "사례" },
    { src: "slides-yunhee/slide-28.png", t: "완벽한 Before & After 기록법", tag: "기록법" },
    { src: "slides-yunhee/slide-29.png", t: "경험이 신뢰가 되고, 신뢰가 비즈니스가 됩니다", tag: "클로징" },
  ];

  const junghyoSlides = [
    { src: "slides/slide-01.png", t: "2026 AI 시대의 방향 & 비아블 신화비전", tag: "표지" },
    { src: "slides/slide-02.png", t: "AI를 이해한 사람이 세상을 바꾼다", tag: "관점" },
    { src: "slides/slide-03.png", t: "진화의 끝, ‘개인의 시대’ 도래", tag: "시대 진단" },
    { src: "slides/slide-04.png", t: "소멸과 폭발의 교차점: 노동 시장의 재편", tag: "시대 진단" },
    { src: "slides/slide-05.png", t: "하이테크 시대의 역설: 연결될수록 고립되는 인류", tag: "시대 진단" },
    { src: "slides/slide-06.png", t: "웰니스와 AI의 만남: 초개인화 시대의 진짜 열쇠", tag: "전환점" },
    { src: "slides/slide-07.png", t: "비아블 신화의 재정의: 인간 중심의 웰니스 플랫폼", tag: "비전" },
    { src: "slides/slide-08.png", t: "비아블 신화 비전: 4대 패러다임 전환", tag: "4대 Shift" },
    { src: "slides/slide-09.png", t: "Shift 1. 제품 중심에서 ‘라이프 플랫폼’으로", tag: "Shift 1" },
    { src: "slides/slide-10.png", t: "Shift 2. 억지 영업에서 ‘개인의 영향력’으로", tag: "Shift 2" },
    { src: "slides/slide-11.png", t: "Shift 3. 경직된 조직에서 ‘생명력 있는 문화’로", tag: "Shift 3" },
    { src: "slides/slide-12.png", t: "Shift 4. 한국을 넘어 ‘글로벌 초연결’로", tag: "Shift 4" },
    { src: "slides/slide-13.png", t: "2026년을 맞이하는 리더의 셀프 체크", tag: "셀프 체크" },
    { src: "slides/slide-14.png", t: "인간 가치 회복 플랫폼, 비아블", tag: "종합" },
    { src: "slides/slide-15.png", t: "사람의 인생을 바꾸는 비아블 신화", tag: "클로징" },
  ];
  const decks = {
    yunhee: { label: "이윤희 · 뷰티", sub: "셀비아 앰플 · 슈스펠 디바이스", slides: yunheeSlides },
    junghyo: { label: "이정효 · 비아블 신화비전", sub: "2026 AI 시대의 방향", slides: junghyoSlides },
  };
  const activeSlides = decks[deck].slides;
  const totalSlides = activeSlides.length;
  const goSlide = (n) => setSlide((n + totalSlides) % totalSlides);
  const switchDeck = (d) => { setDeck(d); setSlide(0); setLightbox(false); };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowRight") goSlide(slide + 1);
      else if (e.key === "ArrowLeft") goSlide(slide - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, slide, deck]);

  const heroImages = ["hero-1.jpg", "hero-2.jpg", "hero-3.jpg", "hero-4.jpg", "hero-5.jpg", "hero-6.jpg", "hero-7.jpg"];

  // 소식·인사이트: 일반 기사·인사이트 링크 카드(원문으로 연결). 새 글은 아래 배열에 항목만 추가하면 됩니다.
  const newsItems = [
    {
      type: "인사이트",
      title: "'차라리 돈 없는 게 낫다' — 50살 이후 가장 고통스러운 것 1위",
      summary: "50대 이후 가장 깊은 고통은 돈 부족보다 '내가 더 이상 필요 없는 사람이 된 것 같은' 존재감의 흔들림이라는 이야기입니다. 진짜 노후 준비는 자금만이 아니라, 새로운 역할과 관계 속에서 계속 의미 있는 사람으로 살아갈 자리를 만들어 두는 것임을 짚어봅니다.",
      source: "네이버 블로그 (방구석 유학파)",
      date: "2026-05-15",
      url: "https://m.blog.naver.com/gurwn1725/224285921923",
    },
    {
      type: "인사이트",
      title: "이상하게 도와주고 싶어지는 사람의 특징",
      summary: "주변에서 자연스럽게 돕고 응원하고 싶어지는 사람들의 공통된 태도를 정리한 글입니다. 단단한 자존감, 무언가에 대한 진심, 작은 예의와 존중, 자기 고통을 남에게 전가하지 않는 마음 — 억지로 밀어붙이지 않아도 사람이 끌려오는 태도를 짚어봅니다.",
      source: "네이버 카페 (방현권)",
      date: "2026-06-11",
      url: "https://cafe.naver.com/taeam12/8950",
    },
    {
      type: "인사이트",
      title: "가진 것 없이 성공하는 사람의 5가지 특징",
      summary: "맨손에서 시작해 성장하는 사람들의 공통된 마인드를 정리한 자기계발 영상입니다. 성공 그 자체보다 먼저 버티는 힘(생존)에 집중하는 태도 등, 환경보다 마음가짐이 길을 만든다는 관점을 참고할 만합니다.",
      source: "네이버 클립 (초역철학)",
      date: "2026-06-10",
      url: "https://naver.me/5IfC1W8y",
    },
    {
      type: "인사이트",
      title: "돈에 대한 막연한 불안, 어떻게 다스릴까 — '스스로 버는 힘'의 가치",
      summary: "돈에 대한 환상과 불안을 다스리는 법, 그리고 누군가에게 기대기보다 스스로 벌고 성장하는 힘이 왜 중요한지 짚어보는 글입니다. AI 시대에도 결국 자기 실력과 자립이 자산이 된다는 관점을 참고할 만합니다.",
      source: "네이버 블로그",
      date: "2026-06-10",
      url: "https://blog.naver.com/bookiemb/224302818791",
    },
    {
      type: "언론보도",
      title: '"삼성전자 안 사는 이유 있다"…156억 번 투자 전설의 일침',
      summary: "에셋플러스자산운용 강방천 회장이 한국경제 인터뷰에서 밝힌 장기·가치투자 철학을 다룬 기사입니다.",
      source: "한국경제",
      date: "2026-06-03",
      url: "https://n.news.naver.com/article/015/0005294408",
    },
    {
      type: "블로그",
      title: "30년 동안 매일 아침 '이것' 했더니 돈걱정이 사라졌다, 김미경 교수",
      summary: "매일 반복하는 아침 루틴으로 자기 실력을 쌓아온 과정을 정리한 블로그 글입니다. 꾸준한 자기 성장의 힘을 짚어봅니다.",
      source: "네이버 블로그 (방구석 유학파)",
      date: "2026-05-14",
      url: "https://m.blog.naver.com/gurwn1725/224285371020",
    },
    {
      type: "언론보도",
      title: '"사람과 대화하고 기억한다"…中 교감형 휴머노이드 2종 공개',
      summary: "중국 유비테크 로보틱스가 일반 소비자용 휴머노이드 'U1 시리즈' 2종의 티저 영상을 공개했다는 전자신문 보도입니다.",
      source: "전자신문",
      date: "2026-06-09",
      url: "https://n.news.naver.com/article/030/0003435652",
    },
  ];

  // 비아블 소식: 비아블·셀비아 직접 관련 기사·후기만 별도 관리. 항목이 생기면 아래 배열에 추가하세요.
  // 예시 형식:
  // { type: "언론보도", title: "기사 제목", summary: "한 줄 요약", source: "매체명", date: "2026-00-00", url: "원문 URL" }
  const viableNewsItems = [];
  useEffect(() => {
    const id = setInterval(() => setHeroSlide((cur) => (cur + 1) % heroImages.length), 4500);
    return () => clearInterval(id);
  }, []);
  const toggle = (id) => setDone((d) => ({ ...d, [id]: !d[id] }));
  const [route, setRoute] = useState(typeof window !== "undefined" && window.location.hash === "#/news" ? "news" : "home");
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash === "#/news" ? "news" : "home");
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // ── 채널톡 상담 위젯 (우측 하단 플로팅) ──
  useEffect(() => {
    const w = window;
    if (w.ChannelIO) return;
    const ch = function () { ch.c(arguments); };
    ch.q = [];
    ch.c = function (args) { ch.q.push(args); };
    w.ChannelIO = ch;
    function load() {
      if (w.ChannelIOInitialized) return;
      w.ChannelIOInitialized = true;
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      const x = document.getElementsByTagName("script")[0];
      if (x && x.parentNode) x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === "complete") load();
    else { w.addEventListener("DOMContentLoaded", load); w.addEventListener("load", load); }
    w.ChannelIO("boot", { pluginKey: "99b3177d-5270-4ef9-b861-e9014c93c897" });
    return () => { if (w.ChannelIO) w.ChannelIO("shutdown"); };
  }, []);

  const goNews = () => { window.location.hash = "#/news"; setNavOpen(false); };
  const goTo = (id) => {
    if (window.location.hash === "#/news") {
      window.location.hash = "";
      setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 80);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setNavOpen(false);
  };
  const goTop = () => {
    if (window.location.hash) window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setNavOpen(false);
  };
  const goConsult = () => {
    if (window.ChannelIO) { window.ChannelIO("showMessenger"); return; }
    if (CONSULT_LINK) { window.open(CONSULT_LINK, "_blank", "noopener,noreferrer"); }
    else { goTo("member"); }
  };

  const hosts = [
    { name: "이윤희", photo: "host-yunhee.png", role: "뷰티 · 홈케어 디렉터", tag: "제품 · 케어",
      quote: "복잡한 뷰티, 누구나 따라 할 수 있게.",
      desc: "제품 사용법과 피부 타입별 홈케어 루틴을 영상으로 쉽고 친절하게 풀어드립니다. 뷰티가 처음인 분도 그날 바로 따라 할 수 있도록 한 단계씩 천천히 안내합니다.",
      skills: ["피부 타입 진단", "데일리 홈케어 설계", "제품 올바른 사용법", "셀프 케어 루틴"] },
    { name: "이정효", photo: "host-junghyo.png", role: "네트워크 마케팅 교육 멘토", tag: "마케팅 · 교육",
      quote: "정직한 사업, 함께 오래 가는 길.",
      desc: "사업의 기본기부터 고객 응대, 조직 운영까지 현장에서 검증된 방법을 단계별로 코칭합니다. 무리한 권유가 아니라, 신뢰를 쌓아 오래가는 방식을 알려드립니다.",
      skills: ["사업 입문 코칭", "고객 상담 화법", "조직 운영 시스템", "성장 마인드셋"] },
  ];

  const beautyLessons = [
    { t: "인체양수세포배양액, 성분의 이해", ep: "LESSON 1", lvl: "입문",
      detail: { lead: "셀비아 앰플의 핵심인 인체양수세포배양액이 무엇이고, 화장품 성분으로서 어떻게 쓰이는지 기초부터 쉽게 풀어드립니다.",
        sections: [
          { h: "이 강의에서 배우는 것", items: ["세포배양액 성분의 기본 개념", "왜 '가장 어린 세포'에 주목하는지", "성분을 고객에게 쉽게 설명하는 법"] },
          { h: "준비물", items: ["셀비아 앰플", "필기 노트"] },
        ] } },
    { t: "셀비아 앰플 3-Step 마스터 루틴", ep: "LESSON 2", lvl: "기본",
      detail: { lead: "체감을 끌어올리는 3단계 마스터 루틴을 순서대로 시연합니다.",
        sections: [
          { h: "3-Step 루틴", items: ["Step 1. Prep & Open — 피부를 정돈하고 길을 여는 단계", "Step 2. Care & Lift — 디바이스로 끌어올리는 단계", "Step 3. Seal & Glow — 마무리하고 윤기를 더하는 단계"] },
          { h: "포인트", items: ["각 단계의 적정 사용량과 시간", "아침 · 저녁 루틴 차이"] },
        ] } },
    { t: "슈스펠 4-in-1 디바이스 사용법", ep: "LESSON 3", lvl: "기본",
      detail: { lead: "슈스펠 디바이스의 네 가지 기능을 단 5분 안에 활용하는 순서를 안내합니다.",
        sections: [
          { h: "5분 사용 순서", items: ["미세 미스트로 시작", "갈바닉 이온 케어", "진동 마사지", "LED 라이트로 마무리"] },
          { h: "주의사항", items: ["부위별 권장 사용 시간", "디바이스 관리 · 세척법"] },
        ] } },
    { t: "홈케어 Before & After 기록법", ep: "LESSON 4", lvl: "심화",
      detail: { lead: "변화를 정확하게 보여주는 전후 기록법을 배웁니다. 같은 조건으로 찍는 것이 핵심입니다.",
        sections: [
          { h: "기록 3원칙", items: ["같은 조명 · 같은 각도 · 같은 거리", "얼굴이 화면의 약 70%를 채우도록", "동일한 시간대에 촬영"] },
        ] } },
  ];

  const products = [
    { t: "셀비아 미솔로지 크리에이션 앰플", cat: "앰플 · 집중 케어", icon: Droplet,
      points: ["인체양수세포배양액 함유 포뮬러", "미세 나노(MNT) 흡수 설계", "수분 · 피부결 집중 케어"],
      detail: {
        lead: "인체양수세포배양액을 베이스로 한 집중 케어 앰플입니다. 미세 나노 흡수 설계로 산뜻하게 발리며, 매일의 피부결과 수분 인상을 가꿔줍니다.",
        sections: [
          { h: "핵심 포뮬러", items: ["인체양수세포배양액을 담은 포뮬러", "다양한 피부 컨디셔닝 성분의 밸런스 (10대 핵심 성분 컨셉)", "제주 용암해수 베이스"] },
          { h: "흡수 설계 · MNT", items: ["미세 나노 공법으로 가볍고 산뜻한 발림", "아침 · 저녁 데일리 케어에 적합"] },
          { h: "케어 포인트", items: ["수분 · 피부결 인상 케어", "매끄럽고 탄력 있는 피부 인상 연출"] },
        ],
        note: "화장품으로서 일반적인 피부 케어 표현 기준으로 안내합니다.",
      } },
    { t: "슈스펠 에어 디바이스 4-in-1", cat: "홈 뷰티 디바이스", icon: Wand2,
      points: ["미세 미스트 · 갈바닉 · 진동 · LED", "단 5분 홈 셀프 에스테틱", "앰플 흡수를 돕는 데일리 케어"],
      detail: {
        lead: "바르지 않고 분사하는 에어 테라피 컨셉의 홈 뷰티 디바이스입니다. 네 가지 기능을 하나로 모아 단 5분의 셀프 케어를 완성합니다.",
        sections: [
          { h: "4-in-1 기능", items: ["미세 미스트 분사 (에어 스프레이)", "갈바닉 이온", "진동 마사지", "LED 라이트"] },
          { h: "사용 컨셉", items: ["하루 5분 홈 셀프 에스테틱", "앰플의 흡수를 돕는 케어 루틴", "내 손 안의 데일리 뷰티 디바이스"] },
        ],
      } },
    { t: "스칼피아 두피 재생 케어", cat: "두피 · 스칼프 케어", icon: Sparkles,
      points: ["두피 환경을 위한 스칼프 케어", "건강한 모발 베이스 관리", "홈 두피 케어 루틴"],
      detail: {
        lead: "피부를 넘어 두피까지 케어하는 스칼프 라인입니다. 건강한 모발의 시작인 두피 환경을 데일리로 관리합니다.",
        sections: [
          { h: "케어 포인트", items: ["두피 환경을 위한 스칼프 케어", "건강한 모발 베이스 관리", "홈 두피 케어 루틴"] },
        ],
      } },
    { t: "셀비아 궁애 (여성 딥케어)", cat: "여성 위생 · 데일리 케어", icon: Heart,
      points: ["순한 약산성 위생 케어", "여성 청결 데일리 케어", "민감 부위 부드러운 관리"],
      detail: {
        lead: "여성의 데일리 위생을 위한 순한 케어 라인입니다. 약산성 포뮬러로 부드럽게 관리합니다.",
        sections: [
          { h: "케어 포인트", items: ["순한 약산성 위생 케어", "여성 청결 데일리 케어", "민감 부위 부드러운 관리"] },
        ],
        note: "위생용품으로서 일반적인 청결 케어 표현 기준으로 안내합니다.",
      } },
  ];

  const curriculum = [
    { id: "c1", step: "SHIFT 01", t: "라이프 플랫폼", icon: Sparkles, sub: "제품 판매를 넘어, 건강 · 자기다움 · 성장을 돕는 삶의 플랫폼으로",
      detail: { lead: "비아블은 단순한 유통 회사가 아니라, 사람의 삶을 회복시키는 라이프 플랫폼을 지향합니다.",
        sections: [ { h: "무엇이 달라지는가", items: ["제품 중심 → 라이프 플랫폼 중심", "건강 회복(Health)", "자기다움(Self-care)", "성장(Growth)"] } ] } },
    { id: "c2", step: "SHIFT 02", t: "개인의 영향력", icon: TrendingUp, sub: "억지로 미는 영업이 아니라, 사람을 끌어당기는 진정성의 힘으로",
      detail: { lead: "밀어붙이는 영업의 시대는 지났습니다. 나의 진정성과 콘텐츠가 사람을 끌어당기는 시대입니다.",
        sections: [ { h: "전환의 핵심", items: ["과거: 억지로 미는 영업 (Push)", "미래: 끌어당기는 자력 (Magnet · Aura)", "나의 경험과 진심이 곧 영업 자산"] } ] } },
    { id: "c3", step: "SHIFT 03", t: "생명력 있는 문화", icon: Users, sub: "성장 · 존중 · 감사 · 리더십이 살아있는 함께 크는 조직으로",
      detail: { lead: "강력한 실적은 오래갈 수 있지만, 강력한 '문화'는 사람을 평생 이 공간에 머물게 합니다.",
        sections: [ { h: "네 가지 문화", items: ["성장 문화", "존중 문화", "감사 문화", "리더 문화"] } ] } },
    { id: "c4", step: "SHIFT 04", t: "글로벌 초연결", icon: Globe, sub: "한국을 넘어 세계로 연결되는 웰니스 플랫폼 비전",
      detail: { lead: "AI 언어 · 결제 · 콘텐츠 인프라 위에서, 비아블은 한국을 넘어 글로벌로 연결됩니다.",
        sections: [ { h: "비전", items: ["한국 → 글로벌 초연결", "세계로 연결되는 웰니스 플랫폼", "글로벌 성장 패러다임"] } ] } },
  ];

  const completedCount = curriculum.filter((c) => done[c.id]).length;
  const progress = Math.round((completedCount / curriculum.length) * 100);

  if (showSim) {
    return (
      <div style={{ fontFamily: "'Pretendard','Gothic A1','Noto Sans KR',sans-serif" }}>
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-rose-100 px-4 py-2.5">
          <button
            onClick={() => setShowSim(false)}
            className="text-sm font-semibold text-[#9d5963] hover:text-[#8f4f5a] flex items-center gap-1"
          >
            ← 셀라이프 홈으로
          </button>
        </div>
        <RewardSimulator />
      </div>
    );
  }

  return (
    <div className="bha-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Gothic+A1:wght@300;400;500;700;800&family=Gowun+Dodum&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        .bha-root {
          --rose: #D85FA0; --rose-deep: #BE3F7E; --rose-soft: #F5BAD3;
          --blush: #FBE4EF; --cream: #FFFBFD; --cream2: #F8EEF5;
          --gold: #C39A6E; --gold-lt: #EAD2B0; --sage: #A7B79A;
          --rosegold: #B87A65; --rosegold-lt: #EFCDBD;
          --lav: #9B7BD8; --lav-soft: #E9E0FA; --peach-soft: #FFE9DB;
          --pearl: #FFF8FA; --pearl2: #FBEFF4;
          --ink: #44243C; --ink-soft: #7A5670;
          font-family: 'Pretendard', 'Gothic A1', 'Noto Sans KR', sans-serif; color: var(--ink);
          line-height: 1.7; min-height: 100vh;
          background:
            radial-gradient(1000px 700px at 10% -8%, rgba(245,186,211,0.30), transparent 60%),
            radial-gradient(900px 620px at 92% 6%, rgba(233,224,250,0.32), transparent 62%),
            radial-gradient(900px 600px at 50% 112%, rgba(255,233,219,0.26), transparent 60%),
            linear-gradient(180deg, #FFFDFE, var(--pearl));
          background-attachment: fixed;
        }
        .bha-serif { font-family: 'Cormorant Garamond', serif; }
        @keyframes bhaShimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes bhaTwinkle { 0%,100% { opacity:.35; transform:scale(.85) rotate(0deg); } 50% { opacity:1; transform:scale(1.12) rotate(16deg); } }
        .bha-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        .bha-nav { position: sticky; top: 0; z-index: 50; background: rgba(255,251,253,0.78);
          backdrop-filter: blur(20px) saturate(1.3); -webkit-backdrop-filter: blur(20px) saturate(1.3);
          border-bottom: 1px solid rgba(224,99,158,0.14);
          box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 30px rgba(224,99,158,0.06); }
        .bha-nav-inner { display:flex; align-items:center; justify-content:space-between; height: 90px; }
        .bha-logo { display:flex; align-items:center; gap:14px; font-weight:700; cursor:pointer; user-select:none; transition:opacity .2s; }
        .bha-logo:hover { opacity:0.78; }
        .bha-logo:focus-visible { outline:2px solid var(--rose); outline-offset:4px; border-radius:8px; }
        .bha-logo img { width:52px; height:52px; border-radius:50%; object-fit:cover;
          border:2px solid #fff; box-shadow:0 0 0 1.5px var(--rosegold-lt), 0 6px 18px rgba(184,122,101,0.3); }
        .bha-logo-txt { font-size: 17px; font-weight:700; letter-spacing:-0.3px; line-height:1.2; white-space:nowrap; }
        .bha-logo-txt small { display:block; font-size:12px; font-weight:600; letter-spacing:3px; margin-top:2px;
          background:linear-gradient(100deg, var(--rosegold), #D9967E, var(--rosegold)); background-size:200% auto;
          -webkit-background-clip:text; background-clip:text; color:transparent; animation:bhaShimmer 7s linear infinite; }
        .bha-links { display:flex; gap:15px; align-items:center; }
        .bha-links a { color:var(--ink-soft); text-decoration:none; font-size:13px; font-weight:500; transition:.2s; cursor:pointer; white-space:nowrap; }
        .bha-links a:hover { color:var(--rose-deep); }
        .bha-links a.bha-nav-sim { color:var(--rose-deep); font-weight:700; }
        .bha-links a.bha-nav-sim:hover { color:var(--lav); }
        .bha-cta { background: linear-gradient(115deg, var(--rose), var(--rose-deep) 55%, var(--lav)); background-size:200% auto;
          animation:bhaShimmer 8s linear infinite; color:#fff !important; padding:10px 22px; border-radius:999px;
          font-size:13px; border:none; cursor:pointer; transition:.2s; font-weight:700;
          box-shadow:0 8px 22px rgba(190,63,126,0.32), inset 0 1px 0 rgba(255,255,255,0.4); }
        .bha-cta:hover { transform: translateY(-1px); box-shadow:0 12px 28px rgba(155,123,216,0.4), inset 0 1px 0 rgba(255,255,255,0.4); }
        .bha-cta { white-space:nowrap; }
        .bha-burger { display:none; background:none; border:none; cursor:pointer; color:var(--rose); }
        @media (max-width: 1120px) { .bha-links { display:none; } .bha-burger { display:block; } }

        .bha-hero { position:relative; padding: 38px 0 30px; }
        .bha-hero-banner { position:relative; border-radius:30px; overflow:hidden;
          box-shadow:0 30px 70px rgba(190,63,126,0.20), 0 6px 20px rgba(155,123,216,0.14); }
        .bha-hero-banner::after { content:''; position:absolute; inset:0; z-index:4; pointer-events:none; border-radius:30px;
          border:1.5px solid transparent;
          background:linear-gradient(120deg, rgba(255,255,255,0.95), rgba(245,186,211,0.55), rgba(239,205,189,0.75), rgba(233,224,250,0.65), rgba(255,255,255,0.95)) border-box;
          -webkit-mask:linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }
        .bha-hero-banner img { width:100%; display:block; }
        .bha-hero-slides { position:relative; width:100%; aspect-ratio: 1360 / 768; }
        .bha-hero-slide { position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
          display:block; opacity:0; transition:opacity 0.9s ease; }
        .bha-hero-slide.active { opacity:1; }
        .bha-hero-dots { position:absolute; top:14px; right:16px; display:flex; gap:8px; z-index:3; }
        .bha-hero-dot { width:9px; height:9px; padding:0; border:none; border-radius:999px; cursor:pointer;
          background:rgba(255,255,255,0.55); box-shadow:0 1px 4px rgba(0,0,0,0.25); transition:.25s; }
        .bha-hero-dot.active { background:#fff; width:22px; }
        .bha-hero-overlay { position:absolute; left:0; right:0; bottom:0; z-index:2; display:flex;
          justify-content:center; gap:14px; padding:26px; flex-wrap:wrap;
          background:linear-gradient(to top, rgba(74,51,56,0.45), transparent); }
        .bha-btn-primary { background: linear-gradient(115deg, #F586BD, var(--rose) 40%, var(--lav) 95%); background-size:200% auto;
          animation:bhaShimmer 7s linear infinite; color:#fff;
          border:none; padding:14px 30px; border-radius:999px; font-size:15px; cursor:pointer;
          display:inline-flex; align-items:center; gap:9px; font-weight:700;
          box-shadow:0 14px 32px rgba(190,63,126,0.42), inset 0 1.5px 0 rgba(255,255,255,0.5); transition:.25s; }
        .bha-btn-primary:hover { transform:translateY(-2px); box-shadow:0 20px 44px rgba(155,123,216,0.48), inset 0 1.5px 0 rgba(255,255,255,0.5); }
        .bha-btn-ghost { background:rgba(255,255,255,0.6); color:var(--rose-deep); border:1px solid rgba(255,255,255,0.8);
          backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          padding:14px 26px; border-radius:999px; font-size:15px; cursor:pointer;
          display:inline-flex; align-items:center; gap:9px; font-weight:700; transition:.25s;
          box-shadow:0 6px 18px rgba(157,92,99,0.1); }
        .bha-btn-ghost:hover { background:rgba(255,255,255,0.85); transform:translateY(-2px); }

        .bha-sec { padding: 78px 0; scroll-margin-top: 92px; }
        .bha-sec.alt { background: var(--cream2); }
        .bha-sec-head { text-align:center; margin-bottom:52px; }
        .bha-kicker { display:inline-flex; align-items:center; gap:9px; color:var(--rosegold); font-size:12px; letter-spacing:3px; font-weight:700; text-transform:uppercase; }
        .bha-kicker::before, .bha-kicker::after { content:'◆'; font-size:7px; color:var(--rosegold-lt); animation:bhaTwinkle 3s ease-in-out infinite; }
        .bha-kicker::after { animation-delay:1.5s; }
        .bha-sec-title { font-size: clamp(26px, 4vw, 38px); font-weight:800; margin:12px 0 10px; letter-spacing:-0.5px; }
        .bha-sec-desc { color:var(--ink-soft); max-width:520px; margin:0 auto; font-size:15px; }

        .bha-hosts { display:grid; grid-template-columns:1fr 1fr; gap:30px; }
        .bha-host-card { border-radius:28px; padding:34px;
          background:linear-gradient(160deg, rgba(255,255,255,0.92), rgba(255,244,249,0.68));
          backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
          border:1.5px solid rgba(255,255,255,0.92);
          box-shadow:0 22px 56px rgba(190,63,126,0.12), inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -16px 40px rgba(245,186,211,0.1);
          transition:.32s; position:relative; overflow:hidden; }
        .bha-host-card::before { content:''; position:absolute; top:0; left:0; right:0; height:5px;
          background:linear-gradient(90deg, var(--rose-soft), var(--rosegold-lt), var(--lav-soft), var(--rose-soft));
          background-size:220% auto; animation:bhaShimmer 6s linear infinite; }
        .bha-host-card::after { content:'✦'; position:absolute; top:22px; right:26px; font-size:17px; color:var(--rosegold-lt); animation:bhaTwinkle 3.4s ease-in-out infinite; }
        .bha-host-card:hover { transform:translateY(-6px); box-shadow:0 34px 76px rgba(155,123,216,0.2), inset 0 1.5px 0 #fff; }
        .bha-host-top { display:flex; align-items:center; gap:22px; margin-bottom:20px; }
        .bha-host-photo { width:120px; height:120px; border-radius:50%; flex-shrink:0; overflow:hidden;
          border:3px solid #fff; box-shadow:0 0 0 1.5px var(--rosegold-lt), 0 10px 28px rgba(184,122,101,0.28); }
        .bha-host-photo img { width:100%; height:100%; object-fit:cover; }
        .bha-host-meta { flex:1; min-width:0; }
        .bha-host-tag { display:inline-block; font-size:12px; color:#fff;
          background:linear-gradient(135deg, var(--rose), var(--rose-soft)); padding:5px 14px; border-radius:999px;
          margin-bottom:10px; letter-spacing:0.5px; font-weight:600; }
        .bha-host-name { font-size:30px; font-weight:800; margin:0; letter-spacing:-0.8px; line-height:1.2; }
        .bha-host-role { color:var(--gold); font-size:15px; font-weight:600; margin:5px 0 0; }
        .bha-host-quote { font-family:'Gowun Dodum', serif; font-size:17px; color:var(--rose-deep);
          margin:0 0 14px; line-height:1.6; }
        .bha-host-desc { color:var(--ink-soft); font-size:15px; line-height:1.8; margin:0 0 20px; }
        .bha-host-skills { display:flex; flex-wrap:wrap; gap:8px; }
        .bha-skill { font-size:12.5px; color:var(--rose-deep); background:rgba(232,180,188,0.32);
          padding:7px 14px; border-radius:11px; font-weight:600; }

        .bha-grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .bha-grid4 { display:grid; grid-template-columns:repeat(2,1fr); gap:22px; }
        .bha-lesson { background:#fff; border-radius:20px; overflow:hidden; border:1px solid rgba(183,110,121,0.1);
          transition:.3s; cursor:pointer; box-shadow:0 6px 24px rgba(183,110,121,0.06); }
        .bha-lesson:hover { transform:translateY(-3px); box-shadow:0 14px 40px rgba(183,110,121,0.13); }
        .bha-thumb { aspect-ratio:16/9; background: linear-gradient(135deg, var(--rose-soft), var(--gold-lt));
          display:flex; align-items:center; justify-content:center; }
        .bha-thumb .pin { width:54px; height:54px; border-radius:50%; background:rgba(255,255,255,0.9);
          display:flex; align-items:center; justify-content:center; color:var(--rose); box-shadow:0 6px 20px rgba(0,0,0,0.12); }
        .bha-lesson-body { padding:18px 20px; }
        .bha-lesson-lvl { font-size:11px; color:var(--gold); font-weight:700; letter-spacing:1px; }
        .bha-lesson-t { font-weight:700; font-size:16px; margin:6px 0; }
        .bha-lesson-meta { font-size:12px; color:var(--ink-soft); display:flex; gap:6px; align-items:center; }

        .bha-prodgrid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
        .bha-prod { display:flex; gap:20px; background:#fff; border-radius:22px; padding:26px; align-items:flex-start;
          border:1px solid rgba(183,110,121,0.1); box-shadow:0 6px 24px rgba(183,110,121,0.06); transition:.3s; }
        .bha-prod:hover { transform:translateY(-4px); box-shadow:0 16px 44px rgba(183,110,121,0.14); }
        .bha-prod-ic { width:62px; height:62px; border-radius:18px; flex-shrink:0;
          background:linear-gradient(135deg, var(--blush), var(--gold-lt)); display:flex; align-items:center;
          justify-content:center; color:var(--rose); }
        .bha-prod-t { font-weight:700; font-size:18px; margin:0; letter-spacing:-0.3px; line-height:1.35; }
        .bha-prod-cat { color:var(--gold); font-size:12.5px; font-weight:600; margin:4px 0 12px; }
        .bha-prod-points { list-style:none; padding:0; margin:0; }
        .bha-prod-points li { font-size:13.5px; color:var(--ink-soft); padding-left:16px; position:relative; margin:6px 0; line-height:1.5; }
        .bha-prod-points li::before { content:''; position:absolute; left:2px; top:8px; width:6px; height:6px;
          border-radius:50%; background:linear-gradient(135deg,var(--rose),var(--gold)); }
        .bha-vision { max-width:780px; margin:44px auto 0; text-align:center; font-family:'Gowun Dodum', serif;
          font-size:19px; line-height:1.6; color:var(--rose-deep); background:linear-gradient(135deg, #fff, var(--cream2));
          border:1px solid rgba(201,166,107,0.32); border-radius:20px; padding:30px 34px; }
        .bha-vision span { display:block; font-family:'Pretendard',sans-serif; font-size:13px; color:var(--gold);
          font-weight:600; margin-top:12px; letter-spacing:1px; }

        .bha-curr { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
        .bha-curr-card { background:#fff; border-radius:20px; padding:26px 22px; text-align:left;
          border:1px solid rgba(183,110,121,0.12); transition:.3s; }
        .bha-curr-card:hover { transform:translateY(-4px); box-shadow:0 16px 44px rgba(183,110,121,0.13); }
        .bha-curr-ic { width:50px; height:50px; border-radius:14px; margin-bottom:16px;
          background:linear-gradient(135deg, var(--rose), var(--gold)); display:flex; align-items:center;
          justify-content:center; color:#fff; }
        .bha-curr-step { font-size:11px; color:var(--gold); font-weight:700; letter-spacing:2px; }
        .bha-curr-t { font-size:17px; font-weight:700; margin:6px 0 8px; }
        .bha-curr-sub { font-size:13px; color:var(--ink-soft); margin:0; }

        .bha-member { background: linear-gradient(135deg, #fff, var(--cream2)); border-radius:28px; padding:46px;
          border:1px solid rgba(183,110,121,0.15); box-shadow:0 14px 50px rgba(183,110,121,0.1); max-width:760px; margin:0 auto; }
        .bha-login-box { text-align:center; }
        .bha-login-ic { width:64px; height:64px; border-radius:18px; margin:0 auto 20px;
          background:linear-gradient(135deg, var(--rose), var(--gold)); display:flex; align-items:center;
          justify-content:center; color:#fff; }
        .bha-input { width:100%; padding:13px 16px; border-radius:12px; border:1px solid rgba(183,110,121,0.25);
          margin-bottom:12px; font-size:14px; font-family:inherit; background:#fff; box-sizing:border-box; }
        .bha-input:focus { outline:none; border-color:var(--rose); }
        .bha-progress-track { height:10px; background:var(--blush); border-radius:999px; overflow:hidden; }
        .bha-progress-fill { height:100%; background:linear-gradient(90deg, var(--rose), var(--gold)); border-radius:999px; transition:width .5s; }
        .bha-track-row { display:flex; align-items:center; gap:14px; padding:16px; border-radius:14px;
          background:#fff; border:1px solid rgba(183,110,121,0.1); margin-bottom:10px; cursor:pointer; transition:.2s; }
        .bha-track-row:hover { background: var(--cream); }
        .bha-track-row .tt { font-weight:700; font-size:15px; }
        .bha-track-row .ts { font-size:12px; color:var(--ink-soft); }

        .bha-intro-btn { margin-top:22px; display:inline-flex; align-items:center; gap:9px; cursor:pointer;
          background:linear-gradient(135deg, var(--rose), var(--rose-deep)); color:#fff; border:none;
          padding:12px 26px; border-radius:999px; font-size:14px; font-weight:600; font-family:inherit;
          box-shadow:0 10px 26px rgba(157,92,99,0.32); transition:.25s; }
        .bha-intro-btn:hover { transform:translateY(-2px); box-shadow:0 14px 34px rgba(157,92,99,0.42); }
        .bha-vmodal { background:#000; border-radius:22px; max-width:760px; width:100%; padding:14px;
          position:relative; box-shadow:0 30px 80px rgba(0,0,0,0.5); animation:bhaPop .24s ease; }
        .bha-vmodal .bha-modal-x { top:-14px; right:-14px; background:#fff; box-shadow:0 4px 14px rgba(0,0,0,0.3); }
        .bha-modal-overlay { position:fixed; inset:0; z-index:100; background:rgba(74,51,56,0.5);
          backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; padding:24px; animation:bhaFade .2s ease; }
        @keyframes bhaFade { from{opacity:0} to{opacity:1} }
        .bha-modal { background:#fff; border-radius:26px; max-width:560px; width:100%; max-height:86vh; overflow-y:auto;
          padding:40px; position:relative; box-shadow:0 30px 80px rgba(74,51,56,0.3); animation:bhaPop .24s ease; }
        @keyframes bhaPop { from{transform:translateY(16px) scale(.98); opacity:0} to{transform:none; opacity:1} }
        .bha-modal::before { content:''; position:absolute; top:0; left:0; right:0; height:6px; border-radius:26px 26px 0 0;
          background:linear-gradient(90deg, var(--rose), var(--gold), var(--rose-soft)); }
        .bha-modal-x { position:absolute; top:18px; right:18px; width:38px; height:38px; border-radius:50%; border:none;
          background:var(--cream2); color:var(--rose); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:.2s; }
        .bha-modal-x:hover { background:var(--blush); }
        .bha-modal-kicker { color:var(--gold); font-size:12px; letter-spacing:2px; font-weight:700; text-transform:uppercase; margin-top:6px; }
        .bha-modal-title { font-size:25px; font-weight:800; margin:8px 0 14px; letter-spacing:-0.5px; line-height:1.3; }
        .bha-modal-lead { color:var(--ink-soft); font-size:15px; line-height:1.8; margin:0 0 22px; }
        .bha-modal-sec { margin-bottom:18px; }
        .bha-modal-sec h4 { font-size:15px; font-weight:700; color:var(--rose-deep); margin:0 0 10px;
          padding-left:12px; border-left:3px solid var(--rose); }
        .bha-modal-sec ul { list-style:none; padding:0; margin:0; }
        .bha-modal-sec li { font-size:14px; color:var(--ink); padding-left:18px; position:relative; margin:7px 0; line-height:1.6; }
        .bha-modal-sec li::before { content:''; position:absolute; left:3px; top:8px; width:6px; height:6px; border-radius:50%;
          background:linear-gradient(135deg,var(--rose),var(--gold)); }
        .bha-modal-note { margin-top:20px; background:rgba(201,166,107,0.12); border:1px solid rgba(201,166,107,0.3);
          border-radius:12px; padding:13px 16px; font-size:12.5px; color:var(--ink-soft); line-height:1.6; }
        .bha-footer { background: var(--ink); color:#fff; padding:50px 0 30px; margin-top:40px; }
        .bha-footer-grid { display:flex; justify-content:space-between; flex-wrap:wrap; gap:30px; }
        .bha-footer h4 { font-size:14px; margin:0 0 12px; color:var(--gold-lt); }
        .bha-footer a, .bha-footer p { color:rgba(255,255,255,0.7); font-size:13px; text-decoration:none; display:block; margin:6px 0; }
        .bha-footer img { width:40px; height:40px; border-radius:50%; }
        .bha-footer-note { border-top:1px solid rgba(255,255,255,0.12); margin-top:30px; padding-top:20px; font-size:12px; color:rgba(255,255,255,0.5); text-align:center; }
        .bha-disc { background: rgba(201,166,107,0.12); border:1px solid rgba(201,166,107,0.3); border-radius:14px;
          padding:16px 20px; font-size:12px; color:var(--ink-soft); max-width:760px; margin:30px auto 0; }

        @media (max-width: 860px) {
          .bha-links { display:none; } .bha-burger { display:block; }
          .bha-hosts, .bha-grid3, .bha-grid4, .bha-curr, .bha-prodgrid { grid-template-columns:1fr; }
          .bha-member { padding:30px 22px; } .bha-hero { padding:18px 0; }
          .bha-host-top { flex-direction:column; text-align:center; } .bha-host-skills { justify-content:center; }
        }

        /* ===== Shinhwa Vision Deck ===== */
        .bha-deck-sec { background: linear-gradient(160deg, #1b1016 0%, #2c1a22 55%, #1d121a 100%); position: relative; }
        .bha-deck-sec::before { content:''; position:absolute; inset:0; pointer-events:none;
          background: radial-gradient(ellipse 60% 42% at 50% 0%, rgba(201,166,107,0.20), transparent 70%); }
        .bha-deck-sec .bha-wrap { position: relative; }
        .bha-deck-stage { display:flex; align-items:center; justify-content:center; gap:16px; max-width:1000px; margin:0 auto; }
        .bha-deck-frame { position:relative; flex:1; min-width:0; margin:0; border-radius:18px; overflow:hidden; cursor:zoom-in;
          border:1px solid rgba(201,166,107,0.35); box-shadow:0 24px 70px rgba(0,0,0,0.55); background:#000; outline:none; transition:.3s; }
        .bha-deck-frame:hover { transform:translateY(-3px); box-shadow:0 30px 84px rgba(0,0,0,0.66); }
        .bha-deck-frame:focus-visible { box-shadow:0 0 0 3px var(--gold-lt), 0 24px 70px rgba(0,0,0,0.55); }
        .bha-deck-frame img { width:100%; aspect-ratio:16/9; object-fit:cover; display:block; }
        .bha-deck-zoom { position:absolute; top:14px; right:14px; display:inline-flex; align-items:center; gap:6px;
          background:rgba(0,0,0,0.55); color:#fff; font-size:12px; padding:7px 12px; border-radius:999px; backdrop-filter:blur(6px); opacity:0; transition:.25s; }
        .bha-deck-frame:hover .bha-deck-zoom { opacity:1; }
        .bha-deck-cap { position:absolute; left:0; right:0; bottom:0; padding:34px 22px 16px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;
          background:linear-gradient(to top, rgba(0,0,0,0.85), transparent); }
        .bha-deck-tag { flex-shrink:0; font-size:11px; font-weight:700; letter-spacing:1px; color:#1b1016;
          background:linear-gradient(135deg, var(--gold-lt), var(--gold)); padding:5px 12px; border-radius:999px; }
        .bha-deck-cap-t { color:#fff; font-weight:600; font-size:clamp(14px,2.1vw,18px); }
        .bha-deck-arrow { flex-shrink:0; width:50px; height:50px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;
          color:#fff; transition:.22s; background:rgba(255,255,255,0.10); border:1px solid rgba(201,166,107,0.42); }
        .bha-deck-arrow:hover { background:var(--gold); color:#1b1016; transform:scale(1.06); }
        .bha-deck-counter { text-align:center; margin:20px 0 26px; color:var(--gold-lt); font-size:15px; font-weight:700; letter-spacing:2px; }
        .bha-deck-counter span { color:rgba(255,255,255,0.42); font-weight:400; }
        .bha-deck-thumbs { display:grid; grid-template-columns:repeat(8, 1fr); gap:10px; max-width:920px; margin:0 auto; }
        .bha-deck-thumb { position:relative; padding:0; border:2px solid transparent; border-radius:9px; overflow:hidden; cursor:pointer;
          background:#000; aspect-ratio:16/9; transition:.2s; opacity:0.55; }
        .bha-deck-thumb img { width:100%; height:100%; object-fit:cover; display:block; }
        .bha-deck-thumb:hover { opacity:0.92; transform:translateY(-2px); }
        .bha-deck-thumb.active { opacity:1; border-color:var(--gold-lt); box-shadow:0 6px 18px rgba(201,166,107,0.42); }
        .bha-deck-thumb-n { position:absolute; bottom:3px; right:5px; font-size:10px; font-weight:700; color:#fff; text-shadow:0 1px 3px #000; }
        .bha-deck-foot { max-width:760px; margin:34px auto 0; text-align:center; font-size:13px; color:rgba(255,255,255,0.62);
          background:rgba(255,255,255,0.05); border:1px solid rgba(201,166,107,0.22); border-radius:14px; padding:16px 20px; line-height:1.65; }
        .bha-lightbox { padding:20px; gap:10px; }
        .bha-lb-inner { position:relative; max-width:1200px; width:100%; }
        .bha-lb-inner img { width:100%; border-radius:14px; display:block; box-shadow:0 30px 90px rgba(0,0,0,0.7); }
        .bha-lb-cap { text-align:center; color:rgba(255,255,255,0.9); margin-top:14px; font-size:14px; }
        .bha-lb-cap span { color:var(--gold-lt); font-weight:700; }
        .bha-lb-arrow { flex-shrink:0; width:54px; height:54px; border-radius:50%; cursor:pointer; z-index:2; display:flex; align-items:center; justify-content:center;
          color:#fff; transition:.22s; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.3); }
        .bha-lb-arrow:hover { background:var(--gold); color:#1b1016; }
        @media (max-width: 860px) { .bha-deck-thumbs { grid-template-columns:repeat(5, 1fr); } }
        @media (max-width: 640px) {
          .bha-deck-arrow { width:40px; height:40px; }
          .bha-deck-thumbs { grid-template-columns:repeat(4, 1fr); gap:7px; }
          .bha-lb-arrow { display:none; }
        }
        .bha-deck-tabs { display:flex; justify-content:center; gap:10px; margin-bottom:32px; flex-wrap:wrap; }
        .bha-deck-tab { background:rgba(255,255,255,0.06); border:1px solid rgba(201,166,107,0.3); color:rgba(255,255,255,0.72);
          padding:12px 22px; border-radius:14px; cursor:pointer; transition:.22s; text-align:center; line-height:1.3; font-size:15px; font-weight:600; }
        .bha-deck-tab small { display:block; font-size:11px; font-weight:400; color:rgba(255,255,255,0.45); margin-top:3px; }
        .bha-deck-tab:hover { background:rgba(255,255,255,0.12); color:#fff; }
        .bha-deck-tab.active { background:linear-gradient(135deg, var(--gold-lt), var(--gold)); border-color:transparent; color:#1b1016; }
        .bha-deck-tab.active small { color:rgba(27,16,22,0.72); }
        .bha-deck-lock { max-width:440px; margin:0 auto; text-align:center; padding:46px 30px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(201,166,107,0.25); border-radius:22px; }
        .bha-deck-lock h3 { color:#fff; margin:16px 0 8px; font-size:20px; }
        .bha-deck-lock p { color:rgba(255,255,255,0.6); font-size:14px; margin:0 0 22px; }
        .bha-news-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:22px; max-width:980px; margin:0 auto; }
        .bha-news-card { background:#fff; border:1px solid rgba(183,110,121,0.16); border-radius:20px; padding:26px 24px;
          display:flex; flex-direction:column; gap:12px; transition:.25s; box-shadow:0 6px 20px rgba(157,92,99,0.05); }
        .bha-news-card:hover { transform:translateY(-3px); box-shadow:0 14px 34px rgba(157,92,99,0.13); border-color:var(--rose-soft); }
        .bha-news-badge { align-self:flex-start; font-size:12px; font-weight:700; padding:5px 13px; border-radius:999px; letter-spacing:0.3px; }
        .bha-news-badge.is-press { background:rgba(157,92,99,0.1); color:var(--rose-deep); }
        .bha-news-badge.is-blog { background:rgba(167,183,154,0.22); color:#5f6e54; }
        .bha-news-badge.is-viable { background:rgba(157,92,99,0.14); color:var(--rose-deep); }
        .bha-news-empty { max-width:980px; margin:0 auto; text-align:center; padding:38px 24px; border:1px dashed rgba(183,110,121,0.28);
          border-radius:20px; background:rgba(255,255,255,0.55); color:var(--ink-soft); font-size:15px; line-height:1.7; }
        .bha-news-title { font-size:18px; font-weight:700; color:var(--ink); line-height:1.45; margin:0; }
        .bha-news-summary { font-size:14.5px; color:var(--ink-soft); line-height:1.75; margin:0; flex:1; }
        .bha-news-meta { font-size:12.5px; color:var(--ink-soft); opacity:0.85; }
        .bha-news-link { align-self:flex-start; margin-top:2px; font-size:14px; font-weight:700; color:var(--rose-deep);
          text-decoration:none; display:inline-flex; align-items:center; gap:5px; transition:.2s; }
        .bha-news-link:hover { gap:9px; color:var(--rose); }
        .bha-embed { position:relative; width:100%; aspect-ratio:16/9; border-radius:16px; overflow:hidden; background:#000; }
        .bha-embed iframe { position:absolute; inset:0; width:100%; height:100%; border:0; }

        .bha-lecture { max-width:920px; margin:0 auto 56px; background:#fff; border-radius:24px;
          padding:28px; box-shadow:0 18px 54px rgba(183,110,121,0.14); border:1px solid rgba(201,166,107,0.18); }
        .bha-lecture-badge { display:inline-flex; align-items:center; gap:8px; margin:0 0 14px;
          padding:6px 14px; border-radius:999px; background:linear-gradient(135deg, var(--blush), var(--gold-lt));
          color:var(--rose-deep); font-size:12px; font-weight:700; letter-spacing:1px; }
        .bha-lecture-logo { height:18px; width:auto; object-fit:contain; }
        .bha-lecture-title { font-size:24px; font-weight:800; line-height:1.35; color:var(--ink);
          margin:0 0 20px; letter-spacing:-0.4px; }
        .bha-lecture .bha-embed { box-shadow:0 14px 40px rgba(157,92,99,0.16); }
        .bha-lecture-body { display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-top:26px; align-items:start; }
        .bha-lecture-intro p { font-size:16px; line-height:1.8; color:var(--ink-soft); margin:0 0 12px; }
        .bha-lecture-intro strong { color:var(--rose-deep); font-weight:700; }
        .bha-lecture-yt { display:inline-block; margin-top:6px; font-size:14px; font-weight:700;
          color:var(--rose-deep); text-decoration:none; }
        .bha-lecture-yt:hover { text-decoration:underline; }
        .bha-lecture-points { list-style:none; margin:0; padding:0; }
        .bha-lecture-points li { position:relative; padding:14px 16px 14px 18px; margin:0 0 10px;
          background:var(--cream); border-radius:14px; font-size:14.5px; color:var(--ink); line-height:1.55;
          border-left:3px solid var(--gold); }
        .bha-lecture-points li span { display:block; font-size:12px; font-weight:700; color:var(--gold);
          letter-spacing:0.5px; margin-bottom:3px; }
        .bha-lecture-cta { text-align:center; margin-top:28px; }
        .bha-lecture-cta .bha-btn-primary { display:inline-block; }
        @media (max-width:680px) {
          .bha-lecture { padding:20px; border-radius:20px; }
          .bha-lecture-title { font-size:20px; }
          .bha-lecture-body { grid-template-columns:1fr; gap:22px; }
        }

        .bha-refvid { max-width:560px; margin:44px auto 0; text-align:center; }
        .bha-refvid-label { display:inline-block; font-size:11px; font-weight:700; letter-spacing:2px;
          text-transform:uppercase; color:var(--gold); margin-bottom:8px; }
        .bha-refvid-title { font-size:18px; font-weight:700; color:var(--ink); margin:0 0 6px; }
        .bha-refvid-desc { font-size:14px; color:var(--ink-soft); margin:0 0 18px; line-height:1.6; }
        .bha-refvid .bha-embed { border-radius:14px; box-shadow:0 8px 24px rgba(74,51,56,0.12); }
        .bha-refvid-src { font-size:12px; color:var(--ink-soft); opacity:0.75; margin:12px 0 0; }

        .bha-brandvid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        @media (max-width:1000px) and (min-width:761px) { .bha-brandvid { grid-template-columns:repeat(2,1fr); } }
        .bha-brandvid-card { background:#fff; border-radius:20px; padding:22px; display:flex; flex-direction:column;
          box-shadow:0 14px 40px rgba(183,110,121,0.12); border:1px solid rgba(201,166,107,0.16); }
        .bha-brandvid-label { display:inline-block; align-self:flex-start; font-size:11px; font-weight:700;
          letter-spacing:1.5px; color:var(--rose-deep); background:linear-gradient(135deg, var(--blush), var(--gold-lt));
          padding:5px 12px; border-radius:999px; margin-bottom:12px; }
        .bha-brandvid-title { font-size:19px; font-weight:800; color:var(--ink); margin:0 0 14px; letter-spacing:-0.3px; }
        .bha-brandvid-desc { font-size:14px; color:var(--ink-soft); line-height:1.7; margin:16px 0 0; flex:1; }
        .bha-brandvid-foot { display:flex; align-items:center; justify-content:space-between; gap:12px;
          margin-top:16px; padding-top:14px; border-top:1px solid rgba(201,166,107,0.18); flex-wrap:wrap; }
        .bha-brandvid-yt { font-size:14px; font-weight:700; color:var(--rose-deep); text-decoration:none; white-space:nowrap; }
        .bha-brandvid-yt:hover { text-decoration:underline; }
        .bha-brandvid-src { font-size:11.5px; color:var(--ink-soft); opacity:0.7; }
        @media (max-width:760px) {
          .bha-brandvid { grid-template-columns:1fr; gap:22px; }
        }

        .bha-medu { margin-top:28px; padding-top:26px; border-top:1px solid rgba(183,110,121,0.18); }
        .bha-medu-label { display:inline-block; font-size:11px; font-weight:700; letter-spacing:1.5px;
          text-transform:uppercase; color:var(--gold); margin-bottom:8px; }
        .bha-medu-title { font-size:19px; font-weight:800; color:var(--ink); margin:0 0 8px; letter-spacing:-0.3px; }
        .bha-medu-desc { font-size:14px; color:var(--ink-soft); line-height:1.7; margin:0 0 16px; }
        .bha-medu .bha-embed { box-shadow:0 12px 34px rgba(74,51,56,0.14); }
        .bha-medu-foot { display:flex; align-items:center; justify-content:space-between; gap:12px;
          margin-top:14px; flex-wrap:wrap; }
        .bha-medu-yt { font-size:14px; font-weight:700; color:var(--rose-deep); text-decoration:none; white-space:nowrap; }
        .bha-medu-yt:hover { text-decoration:underline; }
        .bha-medu-src { font-size:11.5px; color:var(--ink-soft); opacity:0.7; }
        .bha-medu-note { font-size:12.5px; color:var(--ink-soft); line-height:1.6; margin:14px 0 0;
          background:var(--cream); border-radius:10px; padding:11px 14px; }
        .bha-vmodal-yt { display:block; text-align:center; margin-top:13px; margin-bottom:2px; color:rgba(255,255,255,0.88); font-size:14px; font-weight:600; text-decoration:none; }
        .bha-vmodal-yt:hover { color:#fff; text-decoration:underline; }
        .bha-prod-video { max-width:760px; margin:50px auto 0; text-align:center; }
        .bha-prod-video-t { font-size:22px; font-weight:700; color:var(--ink); margin:0 0 8px; }
        .bha-prod-video-d { font-size:15px; color:var(--ink-soft); margin:0 0 22px; }
        .bha-prod-video .bha-embed { box-shadow:0 14px 40px rgba(157,92,99,0.16); }
        .bha-prod-video-yt { display:inline-block; margin-top:14px; font-size:14px; font-weight:700; color:var(--rose-deep); text-decoration:none; }
        .bha-prod-video-yt:hover { text-decoration:underline; }
        .bha-prod-short { max-width:340px; margin:44px auto 0; text-align:center; }
        .bha-short-embed { position:relative; width:100%; max-width:300px; margin:0 auto; aspect-ratio:9/16; border-radius:18px; overflow:hidden; background:#000; box-shadow:0 14px 40px rgba(157,92,99,0.16); }
        .bha-short-embed iframe { position:absolute; inset:0; width:100%; height:100%; border:0; }
        .bha-short-tag { display:inline-block; font-size:12px; font-weight:700; letter-spacing:0.08em; color:var(--rose-deep); margin-bottom:8px; }
        .bha-faq { max-width:780px; margin:0 auto; }
        .bha-faq-item { border:1px solid rgba(190,63,126,0.14); border-radius:14px; background:#fff; margin-bottom:12px; overflow:hidden; box-shadow:0 4px 14px rgba(157,92,99,0.05); }
        .bha-faq-item summary { list-style:none; cursor:pointer; padding:18px 22px; font-size:16px; font-weight:700; color:var(--ink); display:flex; justify-content:space-between; align-items:center; gap:14px; }
        .bha-faq-item summary::-webkit-details-marker { display:none; }
        .bha-faq-item summary::after { content:"+"; color:var(--rose-deep); font-size:22px; font-weight:400; line-height:1; flex-shrink:0; }
        .bha-faq-item[open] summary::after { content:"\\2212"; }
        .bha-faq-a { padding:0 22px 20px; color:var(--ink-soft); font-size:14.5px; line-height:1.75; }
        .bha-announce { position:relative; background:linear-gradient(90deg,var(--rose-deep),var(--rose)); color:#fff; text-align:center; font-size:13.5px; font-weight:600; padding:9px 44px; letter-spacing:-0.2px; }
        .bha-announce a { color:#fff; text-decoration:underline; cursor:pointer; font-weight:800; }
        .bha-announce-x { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:0; color:#fff; cursor:pointer; opacity:.85; font-size:18px; line-height:1; padding:4px; }
        .bha-howto { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; max-width:920px; margin:0 auto; }
        .bha-howto-step { background:#fff; border:1px solid rgba(190,63,126,0.12); border-radius:16px; padding:30px 24px; text-align:center; box-shadow:0 6px 18px rgba(157,92,99,0.06); }
        .bha-howto-num { width:34px; height:34px; border-radius:50%; background:var(--rose-deep); color:#fff; font-weight:800; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; font-size:14px; }
        .bha-howto-ic { color:var(--rose-deep); margin-bottom:8px; }
        .bha-howto-step h3 { font-size:18px; font-weight:700; margin:0 0 6px; color:var(--ink); }
        .bha-howto-step p { font-size:14px; color:var(--ink-soft); margin:0; line-height:1.6; }
        .bha-howto-arrow { display:flex; align-items:center; justify-content:center; color:var(--rose-soft); }
        @media(max-width:760px){ .bha-howto{ grid-template-columns:1fr; } }
        .bha-mcta { display:none; }
        @media(max-width:760px){ .bha-mcta{ display:flex; position:fixed; left:0; right:0; bottom:0; z-index:60; padding:10px 14px calc(10px + env(safe-area-inset-bottom)); background:rgba(255,255,255,0.96); backdrop-filter:blur(8px); border-top:1px solid rgba(190,63,126,0.16); box-shadow:0 -4px 16px rgba(157,92,99,0.08); } .bha-mcta button{ width:100%; justify-content:center; } }
        .bha-intro-video { max-width:820px; margin:0 auto; text-align:center; }
        .bha-intro-video .bha-embed { box-shadow:0 18px 50px rgba(157,92,99,0.18); }

        /* ===== 시안1 보석·럭셔리 글래스 테마 레이어 ===== */
        .bha-prod, .bha-lesson, .bha-curr-card, .bha-news-card,
        .bha-lecture, .bha-brandvid-card, .bha-member {
          background:linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,244,249,0.66));
          backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
          border:1.5px solid rgba(255,255,255,0.9);
          box-shadow:0 16px 44px rgba(190,63,126,0.10), inset 0 1.5px 0 rgba(255,255,255,1); }
        .bha-prod:hover, .bha-lesson:hover, .bha-curr-card:hover, .bha-news-card:hover {
          box-shadow:0 24px 56px rgba(155,123,216,0.18), inset 0 1.5px 0 #fff; border-color:rgba(255,255,255,0.95); }
        .bha-news-card:hover { border-color:var(--rose-soft); }
        .bha-thumb { background:linear-gradient(125deg, var(--rose-soft), var(--rosegold-lt) 45%, var(--lav-soft));
          background-size:180% auto; animation:bhaShimmer 9s linear infinite alternate; position:relative; }
        .bha-thumb::after { content:'✦'; position:absolute; top:10px; right:14px; color:rgba(255,255,255,0.92); font-size:13px; animation:bhaTwinkle 2.8s ease-in-out infinite; }
        .bha-skill { background:linear-gradient(115deg, rgba(255,255,255,0.9), rgba(245,186,211,0.28));
          border:1px solid rgba(245,186,211,0.7); box-shadow:inset 0 1px 0 #fff, 0 3px 10px rgba(190,63,126,0.08); color:var(--rose-deep); }
        .bha-vision { background:linear-gradient(135deg, rgba(233,224,250,0.42), rgba(255,255,255,0.72));
          backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border:1.5px solid rgba(255,255,255,0.9);
          box-shadow:0 14px 40px rgba(155,123,216,0.10); }
        .bha-curr-ic, .bha-prod-ic, .bha-login-ic { box-shadow:0 8px 20px rgba(190,63,126,0.22), inset 0 1px 0 rgba(255,255,255,0.45); }
        .bha-news-badge.is-blog { background:rgba(155,123,216,0.16); color:#6b54a6; }

        .bha-hero-lead { max-width:760px; margin:30px auto 0; text-align:center; }
        .bha-hero-lead .bha-kicker { margin-bottom:12px; }
        .bha-hero-h1 { font-size:clamp(26px, 4.4vw, 42px); font-weight:800; letter-spacing:-0.8px; line-height:1.28; margin:0 0 14px;
          background:linear-gradient(120deg, var(--rose-deep), var(--gold), var(--lav), var(--rose-deep)); background-size:240% 100%;
          -webkit-background-clip:text; background-clip:text; color:transparent; animation:bhaShimmer 8s linear infinite; }
        .bha-hero-sub { font-size:clamp(15px,2vw,17px); color:var(--ink-soft); max-width:560px; margin:0 auto 24px; line-height:1.7; }
        .bha-hero-cta { display:flex; gap:13px; justify-content:center; flex-wrap:wrap; }

        .bha-cta-band { padding:64px 0; }
        .bha-cta-band-inner { max-width:720px; margin:0 auto; text-align:center; padding:46px 32px; border-radius:28px;
          background:linear-gradient(135deg, rgba(216,95,160,0.12), rgba(255,255,255,0.7), rgba(155,123,216,0.14));
          backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border:1.5px solid rgba(255,255,255,0.9);
          box-shadow:0 24px 60px rgba(190,63,126,0.14), inset 0 1.5px 0 #fff; }
        .bha-cta-band-t { font-size:clamp(22px,3.4vw,30px); font-weight:800; color:var(--ink); letter-spacing:-0.5px; margin:12px 0 10px; }
        .bha-cta-band-d { font-size:15px; color:var(--ink-soft); line-height:1.7; margin:0 0 24px; }
        .bha-cta-band-inner .bha-btn-primary { display:inline-flex; }

        .bha-simcta { max-width:680px; margin:40px auto 0; text-align:center; padding:34px 28px; border-radius:24px;
          background:linear-gradient(135deg, rgba(233,224,250,0.5), rgba(255,255,255,0.78), rgba(245,186,211,0.4));
          backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border:1.5px solid rgba(255,255,255,0.9);
          box-shadow:0 20px 54px rgba(155,123,216,0.16), inset 0 1.5px 0 #fff; }
        .bha-simcta-ic { width:58px; height:58px; border-radius:18px; margin:0 auto 16px; display:flex; align-items:center; justify-content:center;
          color:#fff; background:linear-gradient(135deg, var(--rose), var(--lav)); box-shadow:0 10px 24px rgba(190,63,126,0.28), inset 0 1px 0 rgba(255,255,255,0.45); }
        .bha-simcta-t { font-size:22px; font-weight:800; color:var(--ink); margin:0 0 10px; letter-spacing:-0.4px; }
        .bha-simcta-d { font-size:14px; color:var(--ink-soft); line-height:1.7; margin:0 0 22px; }
        .bha-simcta .bha-btn-primary { display:inline-flex; }

        .bha-news-more-wrap { text-align:center; margin-top:34px; }
        .bha-news-more { font-family:inherit; }
        .bha-news-back { display:inline-flex; align-items:center; gap:4px; margin-bottom:18px; padding:9px 16px; border-radius:999px; cursor:pointer;
          background:rgba(255,255,255,0.7); border:1px solid rgba(255,255,255,0.85); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
          color:var(--rose-deep); font-weight:700; font-size:13.5px; font-family:inherit; transition:.2s; box-shadow:0 4px 14px rgba(157,92,99,0.08); }
        .bha-news-back:hover { background:#fff; transform:translateY(-1px); }

        /* 380px 등 소형 화면 안전장치 */
        @media (max-width:420px) {
          .bha-wrap { padding:0 16px; }
          .bha-host-card, .bha-lecture, .bha-member { padding:22px; }
          .bha-host-name { font-size:26px; }
          .bha-lecture-title { font-size:19px; }
          .bha-hero-overlay { padding:18px; }
          .bha-btn-primary, .bha-btn-ghost { padding:12px 22px; font-size:14px; }
          .bha-sec { padding:54px 0; }
        }
      `}</style>

      {showAnnounce && (
        <div className="bha-announce">
          🎉 6월 신규 교육 오픈 · 무료 상담 예약 받습니다 <a onClick={goConsult}>지금 신청 →</a>
          <button className="bha-announce-x" onClick={() => setShowAnnounce(false)} aria-label="공지 닫기">×</button>
        </div>
      )}

      <nav className="bha-nav">
        <div className="bha-wrap bha-nav-inner">
          <div className="bha-logo" onClick={goTop} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTop(); } }}
            title="처음으로" aria-label="윤앤정 AI 셀라이프 — 처음으로">
            <img src="logo.png" alt="윤앤정 AI 셀라이프 로고" />
            <div className="bha-logo-txt">윤앤정 AI 셀라이프<small>AI CELLIFE</small></div>
          </div>
          <div className="bha-links">
            <a onClick={() => goTo("about")}>소개</a>
            <a onClick={() => goTo("beauty")}>뷰티 교육</a>
            <a onClick={() => goTo("product")}>제품</a>
            <a onClick={() => goTo("brand")}>브랜드 영상</a>
            <a onClick={() => goTo("curriculum")}>마케팅 교육</a>
            <a className="bha-nav-sim" onClick={() => setShowSim(true)}>시뮬레이터</a>
            <a onClick={goNews}>소식</a>
            <a onClick={() => goTo("viable-news")}>비아블 소식</a>
            <a onClick={() => goTo("vision")}>발표자료</a>
            <a onClick={() => goTo("member")}>회원 강의실</a>
            <button className="bha-cta" onClick={() => goTo("member")}>무료 시작하기</button>
          </div>
          <button className="bha-burger" onClick={() => setNavOpen(!navOpen)}>{navOpen ? <X /> : <Menu />}</button>
        </div>
        {navOpen && (
          <div className="bha-wrap" style={{ paddingBottom: 16 }}>
            {["소개|about","뷰티 교육|beauty","제품|product","브랜드 영상|brand","마케팅 교육|curriculum"].map((s)=>{
              const [label,id]=s.split("|");
              return <a key={id} onClick={()=>goTo(id)} style={{display:"block",padding:"8px 0",color:"var(--ink-soft)",textDecoration:"none",cursor:"pointer"}}>{label}</a>;
            })}
            <a onClick={()=>{ setShowSim(true); setNavOpen(false); }} style={{display:"block",padding:"8px 0",color:"var(--rose-deep)",fontWeight:700,textDecoration:"none",cursor:"pointer"}}>보상 시뮬레이터</a>
            <a onClick={goNews} style={{display:"block",padding:"8px 0",color:"var(--ink-soft)",textDecoration:"none",cursor:"pointer"}}>소식</a>
            {["비아블 소식|viable-news","신화비전 발표자료|vision","회원 강의실|member"].map((s)=>{
              const [label,id]=s.split("|");
              return <a key={id} onClick={()=>goTo(id)} style={{display:"block",padding:"8px 0",color:"var(--ink-soft)",textDecoration:"none",cursor:"pointer"}}>{label}</a>;
            })}
          </div>
        )}
      </nav>

      {route !== "news" && (<>
      <header className="bha-hero">
        <div className="bha-wrap">
          <div className="bha-hero-banner">
            <div className="bha-hero-slides">
              {heroImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="윤앤정 AI 셀라이프 - AI로 쉽게 배우는 뷰티·홈케어"
                  className={"bha-hero-slide" + (i === heroSlide ? " active" : "")}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
              <div className="bha-hero-dots">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    className={"bha-hero-dot" + (i === heroSlide ? " active" : "")}
                    onClick={() => setHeroSlide(i)}
                    aria-label={`히어로 슬라이드 ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bha-hero-lead">
            <div className="bha-kicker">AI Beauty · Wellness · Business</div>
            <h1 className="bha-hero-h1">막막함은 능력이 아니라, 순서의 문제입니다</h1>
            <p className="bha-hero-sub">제품 케어부터 네트워크 마케팅 교육까지 — 윤앤정과 함께 나만의 속도로, 단계별로 시작하세요.</p>
            <div className="bha-hero-cta">
              <button className="bha-btn-primary" onClick={goConsult}><Heart size={18} /> 무료 상담 신청</button>
              <button className="bha-btn-ghost" onClick={() => goTo("curriculum")}>사업 · 교육 둘러보기</button>
            </div>
          </div>
        </div>
      </header>

      <section className="bha-sec bha-intro-sec" id="intro">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker"><Play size={13} fill="currentColor" style={{ verticalAlign: "-2px", marginRight: 6 }} />Brand Film</div>
            <h2 className="bha-sec-title">윤앤정 AI 셀라이프 소개 영상</h2>
            <p className="bha-sec-desc">1분으로 만나는 우리 채널 이야기 — AI로 쉽게 배우는 뷰티·홈케어.</p>
          </div>
          <div className="bha-intro-video">
            <div className="bha-embed">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YT_INTRO_ID}?rel=0&modestbranding=1`}
                title="윤앤정 AI 셀라이프 소개 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a className="bha-prod-video-yt" href={`https://youtu.be/${YT_INTRO_ID}`} target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
          </div>
        </div>
      </section>

      <section className="bha-sec alt" id="howto">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker">How it works</div>
            <h2 className="bha-sec-title">3단계로 시작하기</h2>
            <p className="bha-sec-desc">복잡하지 않아요. 딱 세 단계면 시작입니다.</p>
          </div>
          <div className="bha-howto">
            <div className="bha-howto-step">
              <div className="bha-howto-num">1</div>
              <div className="bha-howto-ic"><Heart size={26} /></div>
              <h3>신청</h3>
              <p>무료 상담을 신청하고, 지금 내 상황을 편하게 이야기해요.</p>
            </div>
            <div className="bha-howto-step">
              <div className="bha-howto-num">2</div>
              <div className="bha-howto-ic"><GraduationCap size={26} /></div>
              <h3>교육</h3>
              <p>뷰티·마케팅 교육으로 기본기를 쌓고, 단계별로 배웁니다.</p>
            </div>
            <div className="bha-howto-step">
              <div className="bha-howto-num">3</div>
              <div className="bha-howto-ic"><TrendingUp size={26} /></div>
              <h3>성장</h3>
              <p>마니아부터 다이아몬드까지, 함께 단계별로 성장합니다.</p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="bha-btn-primary" onClick={goConsult}><Heart size={18} /> 무료 상담 신청</button>
          </div>
        </div>
      </section>

      <section className="bha-sec" id="about">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker">Your Mentors</div>
            <h2 className="bha-sec-title">두 분이 함께 이끄는 교육</h2>
            <p className="bha-sec-desc">제품 케어와 사업 교육, 두 영역을 각각의 전문가가 맡아 균형 있게 안내합니다.</p>
          </div>
          <div className="bha-hosts">
            {hosts.map((h, i) => (
              <div className="bha-host-card" key={i}>
                <div className="bha-host-top">
                  <div className="bha-host-photo"><img src={h.photo} alt={h.name} /></div>
                  <div className="bha-host-meta">
                    <span className="bha-host-tag">{h.tag}</span>
                    <h3 className="bha-host-name">{h.name}</h3>
                    <p className="bha-host-role">{h.role}</p>
                  </div>
                </div>
                <p className="bha-host-quote">“{h.quote}”</p>
                <p className="bha-host-desc">{h.desc}</p>
                <div className="bha-host-skills">
                  {h.skills.map((s, j) => (<span className="bha-skill" key={j}>{s}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bha-sec alt" id="beauty">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker">Beauty Homecare</div>
            <h2 className="bha-sec-title">뷰티 홈케어 교육</h2>
            <p className="bha-sec-desc">성분의 이해부터 디바이스 사용법까지. 영상으로 보고 자료로 복습하며 차근차근 배웁니다.</p>
          </div>
          <div className="bha-grid4">
            {beautyLessons.map((l, i) => (
              <div className="bha-lesson" key={i} onClick={() => setModal({ kicker: l.lvl + " 과정 · " + l.ep, title: l.t, ...l.detail })}>
                <div className="bha-thumb"><div className="pin"><Play size={22} fill="currentColor" /></div></div>
                <div className="bha-lesson-body">
                  <span className="bha-lesson-lvl">{l.lvl}</span>
                  <div className="bha-lesson-t">{l.t}</div>
                  <div className="bha-lesson-meta"><Play size={12} /> {l.ep} · 영상 + 자료</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bha-sec" id="product">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker">Products</div>
            <h2 className="bha-sec-title">제품 라인업</h2>
            <p className="bha-sec-desc">윤앤정이 직접 사용하고 안내하는 핵심 라인업입니다. 자세한 사용법은 뷰티 교육에서 확인하세요.</p>
          </div>
          <div className="bha-prodgrid">
            {products.map((p, i) => {
              const Ic = p.icon;
              return (
                <div className="bha-prod" key={i} style={{ cursor: "pointer" }} onClick={() => setModal({ kicker: p.cat, title: p.t, ...p.detail })}>
                  <div className="bha-prod-ic"><Ic size={30} /></div>
                  <div>
                    <h3 className="bha-prod-t">{p.t}</h3>
                    <p className="bha-prod-cat">{p.cat}</p>
                    <ul className="bha-prod-points">{p.points.map((pt, j) => (<li key={j}>{pt}</li>))}</ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bha-prod-video">
            <h3 className="bha-prod-video-t">제품 사용 영상으로 보기</h3>
            <p className="bha-prod-video-d">셀비아 라인으로 완성하는 모닝 루틴을 영상으로 확인하세요.</p>
            <div className="bha-embed">
              <iframe
                src="https://www.youtube-nocookie.com/embed/0oTiLwAhV-w?rel=0&modestbranding=1"
                title="셀비아 모닝 루틴"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a className="bha-prod-video-yt" href="https://youtu.be/0oTiLwAhV-w" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
          </div>

          <div className="bha-prod-video">
            <h3 className="bha-prod-video-t">슈스펠 에어테라피 사용법</h3>
            <p className="bha-prod-video-d">갈바닉 마사지부터 미솔로지 앰플 미스트까지, 홈 뷰티 케어를 한 영상에 총정리했어요.</p>
            <div className="bha-embed">
              <iframe
                src="https://www.youtube-nocookie.com/embed/p-qo7bFPaeE?rel=0&modestbranding=1"
                title="슈스펠 에어테라피 갈바닉 사용방법 | 셀비아 미솔로지 앰플 홈케어 총정리"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a className="bha-prod-video-yt" href="https://youtu.be/p-qo7bFPaeE" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
          </div>

          <div className="bha-prod-short">
            <span className="bha-short-tag">SHORTS</span>
            <h3 className="bha-prod-video-t">제품 쇼츠로 빠르게</h3>
            <p className="bha-prod-video-d">세안 후 7초, 골든타임 ✨ 셀비아 글로시 부스팅 세럼</p>
            <div className="bha-short-embed">
              <iframe
                src="https://www.youtube-nocookie.com/embed/h0kn5DsHJvI?rel=0&modestbranding=1"
                title="셀비아 글로시 부스팅 세럼 쇼츠"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a className="bha-prod-video-yt" href="https://youtu.be/h0kn5DsHJvI" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
          </div>
        </div>
      </section>

      <section className="bha-sec alt" id="brand">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker">Brand &amp; Vision</div>
            <h2 className="bha-sec-title">브랜드 &amp; 비전 영상</h2>
            <p className="bha-sec-desc">윤앤정이 함께하는 두 축 — 제품을 만드는 기업 비아블, 그리고 함께 성장하는 사업 조직 신화 그룹의 공식 소개·비전 영상입니다.</p>
          </div>
          <div className="bha-brandvid">
            <div className="bha-brandvid-card">
              <div className="bha-brandvid-label">VIABLE · 기업 소개</div>
              <h3 className="bha-brandvid-title">비아블 회사 소개</h3>
              <div className="bha-embed">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/M3QHZEY3iDk?rel=0&modestbranding=1"
                  title="비아블(VIABLE) 회사 소개 영상"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="bha-brandvid-desc">셀비아 · 스칼피아 · 미솔로지를 만드는 코스메슈티컬 화장품 브랜드. 자체 연구소와 품질관리, 인증을 바탕으로 한 ‘정직한 기업, 아름다운 동행’의 이야기.</p>
              <div className="bha-brandvid-foot">
                <a className="bha-brandvid-yt" href="https://youtu.be/M3QHZEY3iDk" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
                <span className="bha-brandvid-src">ⓒ 주식회사 비아블 · 사용 허락 게시</span>
              </div>
            </div>
            <div className="bha-brandvid-card">
              <div className="bha-brandvid-label">SHINHWA · 비전</div>
              <h3 className="bha-brandvid-title">신화 그룹 소개</h3>
              <div className="bha-embed">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/Mo6HRKoxFLs?rel=0&modestbranding=1"
                  title="신화(SHINHWA) 그룹 소개 영상"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="bha-brandvid-desc">‘큰 희망이 큰 사람을 만든다’는 말처럼, 꿈 · 기회 · 용기를 가치로 2019년 출발한 사업 조직. 비아블과 함께 파트너들이 그려가는 성장과 동행의 비전.</p>
              <div className="bha-brandvid-foot">
                <a className="bha-brandvid-yt" href="https://youtu.be/Mo6HRKoxFLs" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
                <span className="bha-brandvid-src">ⓒ 신화 그룹 · 사용 허락 게시</span>
              </div>
            </div>
            <div className="bha-brandvid-card">
              <div className="bha-brandvid-label">SHINHWA · 동기부여</div>
              <h3 className="bha-brandvid-title">신화인의 정신</h3>
              <div className="bha-embed">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/wQePdT44IhY?rel=0&modestbranding=1"
                  title="신화인의 정신 — 4만km를 나는 기러기처럼"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="bha-brandvid-desc">4만km를 함께 나는 기러기처럼, 서로를 끝까지 응원하며 같은 방향으로 나아가는 신화인의 마음. 혼자보다 함께일 때 더 멀리 간다는 동행의 메시지.</p>
              <div className="bha-brandvid-foot">
                <a className="bha-brandvid-yt" href="https://youtu.be/wQePdT44IhY" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
                <span className="bha-brandvid-src">ⓒ 신화 그룹 · 사용 허락 게시</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bha-sec alt" id="curriculum">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker">Network Marketing</div>
            <h2 className="bha-sec-title">네트워크 마케팅 교육 시스템</h2>
            <p className="bha-sec-desc">비아블 신화비전의 4대 패러다임 전환. 제품을 파는 법이 아니라, 사람과 함께 성장하는 길을 배웁니다.</p>
          </div>

          <div className="bha-lecture">
            <div className="bha-lecture-badge">
              <img src="viable_logo_transparent.png" alt="VIABLE" className="bha-lecture-logo"
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <span>VIABLE · 사업 가이드</span>
            </div>
            <h3 className="bha-lecture-title">열심히 하는데 안 풀린다면? 셀비아 사업, ‘순서’만 알면 됩니다</h3>
            <div className="bha-embed">
              <iframe
                src="https://www.youtube-nocookie.com/embed/5WZAaJNMqI8?rel=0&modestbranding=1"
                title="나로부터 시작하는 나의 일: 셀비아 사업 육성 시스템"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="bha-lecture-body">
              <div className="bha-lecture-intro">
                <p>“뭘 먼저 해야 할지” 막막하셨다면, 그건 능력이 아니라 <strong>순서의 문제</strong>입니다.</p>
                <p>셀비아 사업을 어디서부터 어떤 순서로 키워야 하는지, 딱 한 장의 그림으로 정리했습니다.</p>
                <a className="bha-lecture-yt" href="https://youtu.be/5WZAaJNMqI8" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
              </div>
              <ul className="bha-lecture-points">
                <li><span>성장 4단계</span> 마니아 → 디렉터 → 에메랄드 → 다이아몬드</li>
                <li><span>전 과정 기본기</span> ABC 법칙 (A 스폰서 · B 나 · C 고객/파트너)</li>
                <li><span>직급별 실행</span> A·B·C 단계와 체크리스트</li>
                <li><span>끝까지 함께</span> 결속력 · 사랑 · 봉사</li>
              </ul>
            </div>
            <div className="bha-lecture-cta">
              <button className="bha-btn-primary" onClick={() => goTo("member")}>사업 문의 · 상담하기</button>
            </div>
          </div>

          <div className="bha-lecture">
            <div className="bha-lecture-badge">
              <img src="viable_logo_transparent.png" alt="VIABLE" className="bha-lecture-logo"
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <span>VIABLE · 비전 강의</span>
            </div>
            <h3 className="bha-lecture-title">9년을 배고팠습니다 — 평범한 사람이 특별해지는 단 하나의 길</h3>
            <div className="bha-embed">
              <iframe
                src="https://www.youtube-nocookie.com/embed/xPsTypcOXSI?rel=0&modestbranding=1"
                title="9년을 배고팠습니다 | 평범한 사람이 특별해지는 단 하나의 길 — 강태율"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="bha-lecture-body">
              <div className="bha-lecture-intro">
                <p>키 170도 안 되는 평범한 사람이 <strong>바닥에서 보낸 9년</strong>을 지나 어떻게 다시 일어섰는지, 강태율 레드가 자신의 이야기로 풀어냅니다.</p>
                <p>환경보다 마음가짐이 길을 만든다는 것 — 평범한 사람이 특별해지는 하나의 길에 대한 비전 강의입니다.</p>
                <a className="bha-lecture-yt" href="https://youtu.be/xPsTypcOXSI" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
              </div>
              <ul className="bha-lecture-points">
                <li><span>바닥에서 시작</span> 실패의 연속, 그리고 인생을 바꾼 한 장의 비전</li>
                <li><span>왜 지금, 왜 네트워크인가</span> AI · 자동화 시대에 끝까지 남는 일</li>
                <li><span>시스템과 권리소득</span> 그 말이 실제로 무엇을 의미하는지</li>
                <li><span>산업의 미래</span> 그 안에서 우리가 맡을 역할</li>
              </ul>
            </div>
          </div>

          <div className="bha-curr">
            {curriculum.map((c) => {
              const Ic = c.icon;
              return (
                <div className="bha-curr-card" key={c.id} style={{ cursor: "pointer" }} onClick={() => setModal({ kicker: c.step, title: c.t, ...c.detail })}>
                  <div className="bha-curr-ic"><Ic size={24} /></div>
                  <div className="bha-curr-step">{c.step}</div>
                  <h3 className="bha-curr-t">{c.t}</h3>
                  <p className="bha-curr-sub">{c.sub}</p>
                </div>
              );
            })}
          </div>
          <div className="bha-vision">
            “AI는 기술을 만들지만, 사람의 인생은 결국 사람이 바꿉니다.”
            <span>— 비아블 신화비전</span>
          </div>

          <div className="bha-refvid">
            <div className="bha-refvid-label">참고 영상 · 기초 이해</div>
            <h3 className="bha-refvid-title">직접판매란? — 공신력 있는 기관의 설명</h3>
            <p className="bha-refvid-desc">‘회원직접판매’가 어떤 산업인지, 직접판매공제조합의 공식 소개 영상으로 확인하세요.</p>
            <div className="bha-embed">
              <iframe
                src="https://www.youtube-nocookie.com/embed/e_AUdhQ2SdU?rel=0&modestbranding=1"
                title="회원직접판매란? — 직접판매공제조합"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="bha-refvid-src">출처 · 직접판매공제조합</p>
          </div>
        </div>
      </section>

      <section className="bha-sec" id="news">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker"><Newspaper size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />News & Insights</div>
            <h2 className="bha-sec-title">소식 · 인사이트</h2>
            <p className="bha-sec-desc">도움이 될 만한 기사와 인사이트를 모았습니다. 각 카드는 원문 출처로 연결됩니다.</p>
          </div>
          <div className="bha-news-grid">
            {newsItems.slice(0, 3).map((n, i) => (
              <article className="bha-news-card" key={i}>
                <span className={"bha-news-badge " + (n.type === "언론보도" ? "is-press" : "is-blog")}>{n.type}</span>
                <h3 className="bha-news-title">{n.title}</h3>
                <p className="bha-news-summary">{n.summary}</p>
                <div className="bha-news-meta">{n.source}{n.date ? " · " + n.date : ""}</div>
                <a className="bha-news-link" href={n.url} target="_blank" rel="noopener noreferrer">원문 보기 <ArrowRight size={15} /></a>
              </article>
            ))}
          </div>
          <div className="bha-news-more-wrap">
            <button className="bha-btn-ghost bha-news-more" onClick={goNews}>소식 전체보기 <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="bha-sec" id="viable-news">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker"><Newspaper size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />Viable Stories</div>
            <h2 className="bha-sec-title">비아블 소식</h2>
            <p className="bha-sec-desc">비아블 · 셀비아와 윤앤정을 다룬 기사와 후기를 모았습니다. 각 카드는 원문 출처로 연결됩니다.</p>
          </div>
          {viableNewsItems.length > 0 ? (
            <div className="bha-news-grid">
              {viableNewsItems.map((n, i) => (
                <article className="bha-news-card" key={i}>
                  <span className="bha-news-badge is-viable">비아블 · {n.type}</span>
                  <h3 className="bha-news-title">{n.title}</h3>
                  <p className="bha-news-summary">{n.summary}</p>
                  <div className="bha-news-meta">{n.source}{n.date ? " · " + n.date : ""}</div>
                  <a className="bha-news-link" href={n.url} target="_blank" rel="noopener noreferrer">원문 보기 <ArrowRight size={15} /></a>
                </article>
              ))}
            </div>
          ) : (
            <div className="bha-news-empty">비아블 · 셀비아 관련 새 소식을 준비하고 있습니다. 곧 업데이트됩니다.</div>
          )}
        </div>
      </section>

      <section className="bha-sec bha-deck-sec" id="vision">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker" style={{ color: "var(--gold-lt)" }}><Presentation size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />Members Only · 발표자료</div>
            <h2 className="bha-sec-title" style={{ color: "#fff" }}>발표자료</h2>
            <p className="bha-sec-desc" style={{ color: "rgba(255,255,255,0.74)" }}>
              회원 강의실 로그인 후 볼 수 있는 발표자 교육 자료입니다.
            </p>
          </div>

          {!loggedIn ? (
            <div className="bha-deck-lock">
              <Lock size={30} style={{ color: "var(--gold-lt)" }} />
              <h3>회원 전용 자료</h3>
              <p>로그인하시면 이윤희 · 이정효 발표자료를 보실 수 있습니다.</p>
              <button className="bha-btn-primary" onClick={() => goTo("member")}><GraduationCap size={18} /> 회원 강의실 로그인</button>
            </div>
          ) : (
            <>
              <div className="bha-deck-tabs" role="tablist" aria-label="발표자 선택">
                {Object.keys(decks).map((k) => (
                  <button key={k} role="tab" aria-selected={deck === k}
                    className={"bha-deck-tab" + (deck === k ? " active" : "")}
                    onClick={() => switchDeck(k)}>
                    {decks[k].label}<small>{decks[k].sub}</small>
                  </button>
                ))}
              </div>

              <div className="bha-deck-stage">
                <button className="bha-deck-arrow left" onClick={() => goSlide(slide - 1)} aria-label="이전 슬라이드"><ChevronLeft size={26} /></button>
                <figure
                  className="bha-deck-frame"
                  onClick={() => setLightbox(true)}
                  role="button"
                  tabIndex={0}
                  aria-label={`슬라이드 크게 보기: ${activeSlides[slide].t}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightbox(true); } }}
                >
                  <img src={activeSlides[slide].src} alt={`슬라이드 ${slide + 1}: ${activeSlides[slide].t}`} />
                  <span className="bha-deck-zoom"><Maximize2 size={16} /> 크게 보기</span>
                  <figcaption className="bha-deck-cap">
                    <span className="bha-deck-tag">{activeSlides[slide].tag}</span>
                    <span className="bha-deck-cap-t">{activeSlides[slide].t}</span>
                  </figcaption>
                </figure>
                <button className="bha-deck-arrow right" onClick={() => goSlide(slide + 1)} aria-label="다음 슬라이드"><ChevronRight size={26} /></button>
              </div>

              <div className="bha-deck-counter">{String(slide + 1).padStart(2, "0")} <span>/ {String(totalSlides).padStart(2, "0")}</span></div>

              <div className="bha-deck-thumbs" role="tablist" aria-label="슬라이드 목록">
                {activeSlides.map((sl, i) => (
                  <button
                    key={i}
                    className={"bha-deck-thumb" + (i === slide ? " active" : "")}
                    onClick={() => setSlide(i)}
                    role="tab"
                    aria-selected={i === slide}
                    aria-label={`${i + 1}. ${sl.t}`}
                  >
                    <img src={sl.src} alt="" loading="lazy" />
                    <span className="bha-deck-thumb-n">{i + 1}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bha-sec" id="faq">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker"><HelpCircle size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />FAQ</div>
            <h2 className="bha-sec-title">자주 하는 질문</h2>
            <p className="bha-sec-desc">처음 시작하실 때 가장 많이 묻는 질문을 모았습니다.</p>
          </div>
          <div className="bha-faq">
            <details className="bha-faq-item">
              <summary>윤앤정 AI 셀라이프는 어떤 곳인가요?</summary>
              <div className="bha-faq-a">뷰티 홈케어와 사업을 AI의 도움으로 더 쉽게 배우고 함께 성장하는 교육 브랜드예요. 화장품 기업 (주)비아블의 셀비아·스칼피아·미솔로지 제품을 기반으로, 이윤희·이정효 두 사람이 단계별 교육과 1:1 코칭으로 함께합니다. 혼자가 아니라 같이 갑니다 ✨</div>
            </details>
            <details className="bha-faq-item">
              <summary>경험이 전혀 없어도 시작할 수 있나요?</summary>
              <div className="bha-faq-a">네, 가능합니다. 윤앤정은 무엇부터 해야 할지 순서를 알려드리는 교육형 시스템이에요. 막막함은 능력의 문제가 아니라 순서의 문제입니다. 제품 애용부터 차근차근, ABC 법칙(A 스폰서·B 나·C 고객/파트너)이라는 기본기와 함께 시작하시면 됩니다. 처음이신 분들이 가장 많아요 🙂</div>
            </details>
            <details className="bha-faq-item">
              <summary>시간이 많지 않은데 가능할까요?</summary>
              <div className="bha-faq-a">괜찮습니다. 각 단계마다 지금 할 일이 분명하게 정해져 있어서, 적은 시간이라도 방향을 잃지 않고 꾸준히 쌓을 수 있도록 설계돼 있어요. 본업·육아와 병행하시는 분들도 자신의 속도로 함께하고 계세요. 상담 때 생활 패턴에 맞는 시작 방법을 같이 찾아드릴게요.</div>
            </details>
            <details className="bha-faq-item">
              <summary>비용이 많이 들지 않을까 걱정돼요.</summary>
              <div className="bha-faq-a">부담 없이 무료 강의부터 시작하실 수 있어요. 제품·교육 구성은 개인 목표와 상황에 따라 달라서, 무리하지 않는 선에서 함께 계획을 잡아드립니다. 정확한 안내는 상담에서 1:1로 도와드릴게요. (수익을 보장하는 사업이 아니며, 본인의 노력과 활동에 따라 결과는 달라집니다.)</div>
            </details>
            <details className="bha-faq-item">
              <summary>무엇부터 시작하면 되나요?</summary>
              <div className="bha-faq-a">먼저 무료 강의 한 편을 보시는 걸 추천드려요. "셀비아 사업, 순서만 알면 됩니다"에서 성장의 전체 그림을 약 10분에 정리해 드립니다. 보신 뒤 상담을 신청해 주시면, 지금 상황에 맞는 다음 한 걸음을 함께 정해드립니다.</div>
            </details>
            <details className="bha-faq-item">
              <summary>상담은 어떻게 신청하나요?</summary>
              <div className="bha-faq-a">우측 하단 상담 채널 또는 사이트의 "무료 상담 신청" 버튼으로 성함과 연락처를 남겨주세요. 운영 시간(평일 낮 시간대)에는 빠르게, 그 외에는 접수 후 차례로 답변드립니다.</div>
            </details>
            <details className="bha-faq-item">
              <summary>온라인으로도 배울 수 있나요?</summary>
              <div className="bha-faq-a">네. 강의 영상과 콘텐츠로 온라인 학습이 가능하고, 가입 후에는 회원 강의실에서 단계별 교육과 관리 콘텐츠를 이용하실 수 있어요(순차 오픈). 오프라인 미팅·교육과 병행하면 효과가 더 좋습니다.</div>
            </details>
            <details className="bha-faq-item">
              <summary>어떤 제품이 있나요?</summary>
              <div className="bha-faq-a">대표 라인업은 미솔로지 크리에이션 앰플(집중 케어), 글로시 부스팅 세럼(세안 후 골든타임 수분·영양), 슈스펠 에어 디바이스 4-in-1(홈 뷰티 디바이스), 스칼피아 두피 케어, 셀비아 궁애(여성 데일리 케어)입니다. 사용법은 뷰티 교육에서, 맞는 제품 추천은 상담으로 도와드릴게요.</div>
            </details>
            <details className="bha-faq-item">
              <summary>사업은 어떻게 성장하나요?</summary>
              <div className="bha-faq-a">성장은 4단계로 이어집니다 — 마니아(만들기) → 디렉터(지키기) → 에메랄드(확장하기) → 다이아몬드(리더). 단계마다 할 일이 분명해, 지금 내 위치와 다음 할 일이 또렷하게 보여요. 사이트의 단계 진단 시뮬레이터로 내 단계도 미리 확인해보실 수 있습니다.</div>
            </details>
            <details className="bha-faq-item">
              <summary>비아블은 믿을 만한 회사인가요? 두 분은 누구인가요?</summary>
              <div className="bha-faq-a">(주)비아블은 셀비아·스칼피아·미솔로지를 만드는 코스메슈티컬 화장품 기업이에요. 윤앤정은 이윤희·이정효 두 사람이 함께 이끄는 교육 파트너로, 결속력·사랑·봉사의 마음으로 함께하는 분들과 끝까지 동행합니다. 회사·브랜드 소개 영상도 사이트에서 보실 수 있어요.</div>
            </details>
          </div>
        </div>
      </section>

      <section className="bha-sec" id="member">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker">Members Only</div>
            <h2 className="bha-sec-title">회원 강의실</h2>
            <p className="bha-sec-desc">로그인하면 진도 관리와 단계별 수강이 가능합니다. (아래는 동작 미리보기)</p>
          </div>
          <div className="bha-member">
            {!loggedIn ? (
              <div className="bha-login-box">
                <div className="bha-login-ic"><Lock size={28} /></div>
                <h3 style={{ margin: "0 0 6px", fontSize: 22 }}>회원 로그인</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 14, margin: "0 0 22px" }}>교육 과정을 수강하려면 로그인해 주세요.</p>
                <div style={{ maxWidth: 340, margin: "0 auto" }}>
                  <input className="bha-input" placeholder="이메일" />
                  <input className="bha-input" type="password" placeholder="비밀번호" />
                  <button className="bha-btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setLoggedIn(true)}>
                    <GraduationCap size={18} /> 강의실 입장 (데모)
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--rose), var(--gold))", color: "#fff", flexShrink: 0 }}><Crown size={22} /></div>
                    <div><div style={{ fontWeight: 700 }}>환영합니다, 수강생님</div><div style={{ fontSize: 12, color: "var(--ink-soft)" }}>나의 학습 진도</div></div>
                  </div>
                  <button className="bha-btn-ghost" style={{ padding: "8px 16px", fontSize: 13, background:"#fff", border:"1px solid rgba(183,110,121,0.3)" }} onClick={() => setLoggedIn(false)}>로그아웃</button>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                    <span style={{ color: "var(--ink-soft)" }}>전체 진도</span>
                    <span style={{ color: "var(--rose)", fontWeight: 700 }}>{progress}% ({completedCount}/{curriculum.length})</span>
                  </div>
                  <div className="bha-progress-track"><div className="bha-progress-fill" style={{ width: progress + "%" }} /></div>
                </div>
                {curriculum.map((c) => (
                  <div className="bha-track-row" key={c.id} onClick={() => toggle(c.id)}>
                    {done[c.id] ? <CheckCircle2 size={24} style={{ color: "var(--rose)", flexShrink: 0 }} /> : <Circle size={24} style={{ color: "var(--rose-soft)", flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}><div className="tt">{c.step} · {c.t}</div><div className="ts">{c.sub}</div></div>
                    <ArrowRight size={18} style={{ color: "var(--ink-soft)" }} />
                  </div>
                ))}

                <div className="bha-medu">
                  <div className="bha-medu-label">회원 교육 · 참고 영상</div>
                  <h3 className="bha-medu-title">노화와 줄기세포, 어디까지 왔나</h3>
                  <p className="bha-medu-desc">제품 성분을 더 깊이 이해하기 위한 배경 지식 영상입니다. 노화 연구와 줄기세포 과학의 흐름을 다룬 교양 방송으로, 회원 학습용 참고 자료로만 제공됩니다.</p>
                  <div className="bha-embed">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/6nFoVVoUWoY?rel=0&modestbranding=1"
                      title="노화와 줄기세포 과학 — 참고 영상"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="bha-medu-foot">
                    <a className="bha-medu-yt" href="https://youtu.be/6nFoVVoUWoY" target="_blank" rel="noopener noreferrer">유튜브에서 보기 →</a>
                    <span className="bha-medu-src">출처 · JTBC 차이나는 클라스(국과대표) / 교양 Voyage</span>
                  </div>
                  <p className="bha-medu-note"><ShieldCheck size={14} style={{ verticalAlign: "-2px", marginRight: 5, color: "var(--gold)" }} />본 영상은 노화·줄기세포 연구에 대한 일반 과학 정보이며, 특정 제품의 효능·효과를 의미하거나 보장하지 않습니다.</p>
                </div>
              </div>
            )}
          </div>
          <div className="bha-disc">
            <ShieldCheck size={16} style={{ verticalAlign: "-3px", marginRight: 6, color: "var(--gold)" }} />
            본 교육은 제품의 올바른 이해와 정직한 사업 활동을 위한 것입니다. 과장된 수익 보장이나 비현실적 기대를 조장하지 않으며, 모든 제품 효능은 객관적 자료에 근거해 안내합니다.
          </div>
        </div>
      </section>

      <section className="bha-sec bha-cta-band">
        <div className="bha-wrap">
          <div className="bha-cta-band-inner">
            <div className="bha-kicker" style={{ justifyContent: "center" }}>Start Today</div>
            <h2 className="bha-cta-band-t">지금, 가볍게 상담부터 시작해 보세요</h2>
            <p className="bha-cta-band-d">제품도, 사업도 — 궁금한 점을 편하게 물어보세요. 부담 없이 안내해 드립니다.</p>
            <button className="bha-btn-primary" onClick={goConsult}><Heart size={18} /> 무료 상담 신청</button>
          </div>
        </div>
      </section>
      </>)}

      {route === "news" && (
        <section className="bha-sec" id="news-page" style={{ minHeight: "72vh" }}>
          <div className="bha-wrap">
            <button className="bha-news-back" onClick={goTop}><ChevronLeft size={18} /> 홈으로</button>
            <div className="bha-sec-head">
              <div className="bha-kicker"><Newspaper size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />News & Insights</div>
              <h2 className="bha-sec-title">소식 · 인사이트</h2>
              <p className="bha-sec-desc">도움이 될 만한 기사와 인사이트를 모았습니다. 각 카드는 원문 출처로 연결됩니다.</p>
            </div>
            <div className="bha-news-grid">
              {newsItems.map((n, i) => (
                <article className="bha-news-card" key={i}>
                  <span className={"bha-news-badge " + (n.type === "언론보도" ? "is-press" : "is-blog")}>{n.type}</span>
                  <h3 className="bha-news-title">{n.title}</h3>
                  <p className="bha-news-summary">{n.summary}</p>
                  <div className="bha-news-meta">{n.source}{n.date ? " · " + n.date : ""}</div>
                  <a className="bha-news-link" href={n.url} target="_blank" rel="noopener noreferrer">원문 보기 <ArrowRight size={15} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightbox && (
        <div className="bha-modal-overlay bha-lightbox" onClick={() => setLightbox(false)}>
          <button className="bha-lb-arrow left" onClick={(e) => { e.stopPropagation(); goSlide(slide - 1); }} aria-label="이전 슬라이드"><ChevronLeft size={30} /></button>
          <div className="bha-lb-inner" onClick={(e) => e.stopPropagation()}>
            <button className="bha-modal-x" onClick={() => setLightbox(false)} aria-label="닫기"><X size={22} /></button>
            <img src={activeSlides[slide].src} alt={`슬라이드 ${slide + 1}: ${activeSlides[slide].t}`} />
            <div className="bha-lb-cap"><span>{String(slide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}</span> · {activeSlides[slide].t}</div>
          </div>
          <button className="bha-lb-arrow right" onClick={(e) => { e.stopPropagation(); goSlide(slide + 1); }} aria-label="다음 슬라이드"><ChevronRight size={30} /></button>
        </div>
      )}



      {modal && (
        <div className="bha-modal-overlay" onClick={() => setModal(null)}>
          <div className="bha-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bha-modal-x" onClick={() => setModal(null)} aria-label="닫기"><X size={22} /></button>
            <div className="bha-modal-kicker">{modal.kicker}</div>
            <h3 className="bha-modal-title">{modal.title}</h3>
            {modal.lead && <p className="bha-modal-lead">{modal.lead}</p>}
            {modal.sections && modal.sections.map((s, i) => (
              <div className="bha-modal-sec" key={i}>
                <h4>{s.h}</h4>
                <ul>{s.items.map((it, j) => (<li key={j}>{it}</li>))}</ul>
              </div>
            ))}
            {modal.note && <div className="bha-modal-note"><ShieldCheck size={15} style={{ verticalAlign: "-2px", marginRight: 6, color: "var(--gold)" }} />{modal.note}</div>}
          </div>
        </div>
      )}

      <div className="bha-mcta">
        <button className="bha-btn-primary" onClick={goConsult}><Heart size={18} /> 무료 상담 신청</button>
      </div>

      <footer className="bha-footer">
        <div className="bha-wrap bha-footer-grid">
          <div>
            <div className="bha-logo" style={{ color: "#fff", marginBottom: 12 }}>
              <img src="logo.png" alt="logo" />
              <div className="bha-logo-txt" style={{ color: "#fff" }}>윤앤정 AI 셀라이프<small style={{color:"var(--gold-lt)"}}>AI CELLIFE</small></div>
            </div>
            <p style={{ maxWidth: 280 }}>AI로 쉽게 배우는 뷰티·홈케어 · 네트워크 마케팅 교육 채널<br/>제품을 더 쉽게, 뷰티를 더 아름답게</p>
          </div>
          <div><h4>바로가기</h4><a onClick={()=>goTo("about")} style={{cursor:"pointer"}}>진행자 소개</a><a onClick={()=>goTo("beauty")} style={{cursor:"pointer"}}>뷰티 교육</a><a onClick={()=>goTo("curriculum")} style={{cursor:"pointer"}}>마케팅 교육</a><a onClick={goNews} style={{cursor:"pointer"}}>소식</a><a onClick={()=>goTo("viable-news")} style={{cursor:"pointer"}}>비아블 소식</a><a onClick={()=>goTo("vision")} style={{cursor:"pointer"}}>신화비전 발표자료</a></div>
          <div><h4>채널</h4><a href="#">YouTube 채널</a><a href="#">자료실</a><a href="#">문의하기</a></div>
        </div>
        <div className="bha-wrap bha-footer-note">© 2026 윤앤정 AI 셀라이프 · 데모 프로토타입 (제품·영상은 플레이스홀더입니다)</div>
      </footer>
    </div>
  );
}
