import React, { useState, useEffect } from "react";
import {
  Sparkles, Play, Lock, CheckCircle2, Circle, User, ShieldCheck,
  GraduationCap, Droplet, Users, TrendingUp, BookOpen, Menu, X,
  ArrowRight, Crown, Wand2, Globe, Heart, ChevronLeft, ChevronRight, Maximize2, Presentation, Newspaper
} from "lucide-react";

// ▼▼▼ 유튜브 소개 영상 ID — 영상 주소(youtu.be/XXXX 또는 watch?v=XXXX)의 11자리만 여기에 넣으세요 ▼▼▼
const YT_INTRO_ID = "i5b8Rm_DbW4";
// ▲▲▲ 예) https://youtu.be/abcd1234XYZ  →  "abcd1234XYZ" ▲▲▲

export default function YunjeongAICellife() {
  const [navOpen, setNavOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [done, setDone] = useState({});
  const [modal, setModal] = useState(null);
  const [deck, setDeck] = useState("yunhee");
  const [heroSlide, setHeroSlide] = useState(0);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState(false);

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

  // 소식: 링크 카드(원문으로 연결). 새 글은 아래 배열에 항목만 추가하면 됩니다.
  const newsItems = [
    {
      type: "언론보도",
      title: "한국경제에 소개된 비아블 이야기",
      summary: "한국경제가 비아블과 그 현장의 사람들을 다룬 기사입니다. 회사가 걸어온 길과 함께하는 이들의 모습을 차분히 들여다봅니다.",
      source: "한국경제",
      date: "",
      url: "https://n.news.naver.com/article/015/0005294408",
    },
    {
      type: "블로그 후기",
      title: "비아블을 직접 경험한 분의 이야기",
      summary: "비아블 제품과 활동을 직접 겪은 경험을 담담하게 풀어낸 블로그 글입니다. 실제 현장의 시선에서 느낀 점을 엿볼 수 있습니다.",
      source: "네이버 블로그",
      date: "",
      url: "https://m.blog.naver.com/gurwn1725/224285371020",
    },
  ];
  useEffect(() => {
    const id = setInterval(() => setHeroSlide((cur) => (cur + 1) % heroImages.length), 4500);
    return () => clearInterval(id);
  }, []);
  const toggle = (id) => setDone((d) => ({ ...d, [id]: !d[id] }));
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
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

  return (
    <div className="bha-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Gothic+A1:wght@300;400;500;700;800&family=Gowun+Dodum&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        .bha-root {
          --rose: #B76E79; --rose-deep: #9D5C63; --rose-soft: #E8B4BC;
          --blush: #F6E3DD; --cream: #FFF9F4; --cream2: #FBEFE7;
          --gold: #C9A66B; --gold-lt: #E4CDA0; --sage: #A7B79A;
          --ink: #4A3338; --ink-soft: #8A6F74;
          font-family: 'Pretendard', 'Gothic A1', 'Noto Sans KR', sans-serif; color: var(--ink);
          background: var(--cream); line-height: 1.7; min-height: 100vh;
        }
        .bha-serif { font-family: 'Cormorant Garamond', serif; }
        .bha-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        .bha-nav { position: sticky; top: 0; z-index: 50; background: rgba(255,249,244,0.88);
          backdrop-filter: blur(12px); border-bottom: 1px solid rgba(183,110,121,0.15); }
        .bha-nav-inner { display:flex; align-items:center; justify-content:space-between; height: 90px; }
        .bha-logo { display:flex; align-items:center; gap:14px; font-weight:700; }
        .bha-logo img { width:68px; height:68px; border-radius:50%; object-fit:cover;
          box-shadow:0 4px 16px rgba(183,110,121,0.28); }
        .bha-logo-txt { font-size: 20px; font-weight:700; letter-spacing:-0.3px; line-height:1.25; }
        .bha-logo-txt small { display:block; font-size:12px; color:var(--gold); font-weight:600; letter-spacing:3px; margin-top:2px; }
        .bha-links { display:flex; gap:28px; align-items:center; }
        .bha-links a { color:var(--ink-soft); text-decoration:none; font-size:14px; font-weight:500; transition:.2s; cursor:pointer; }
        .bha-links a:hover { color:var(--rose); }
        .bha-cta { background: var(--rose); color:#fff !important; padding:9px 20px; border-radius:999px;
          font-size:13px; border:none; cursor:pointer; transition:.2s; font-weight:500; }
        .bha-cta:hover { background: var(--rose-deep); transform: translateY(-1px); }
        .bha-burger { display:none; background:none; border:none; cursor:pointer; color:var(--rose); }

        .bha-hero { position:relative; padding: 38px 0 30px; }
        .bha-hero-banner { position:relative; border-radius:28px; overflow:hidden;
          box-shadow:0 22px 60px rgba(183,110,121,0.22); }
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
        .bha-btn-primary { background: linear-gradient(135deg, var(--rose), var(--rose-deep)); color:#fff;
          border:none; padding:14px 30px; border-radius:999px; font-size:15px; cursor:pointer;
          display:inline-flex; align-items:center; gap:9px; font-weight:500;
          box-shadow:0 12px 30px rgba(157,92,99,0.4); transition:.25s; }
        .bha-btn-primary:hover { transform:translateY(-2px); box-shadow:0 16px 40px rgba(157,92,99,0.5); }
        .bha-btn-ghost { background:rgba(255,255,255,0.95); color:var(--rose); border:1px solid rgba(255,255,255,0.6);
          padding:14px 26px; border-radius:999px; font-size:15px; cursor:pointer;
          display:inline-flex; align-items:center; gap:9px; font-weight:500; transition:.25s; }
        .bha-btn-ghost:hover { background:#fff; transform:translateY(-2px); }

        .bha-sec { padding: 78px 0; scroll-margin-top: 92px; }
        .bha-sec.alt { background: var(--cream2); }
        .bha-sec-head { text-align:center; margin-bottom:52px; }
        .bha-kicker { color:var(--gold); font-size:12px; letter-spacing:3px; font-weight:700; text-transform:uppercase; }
        .bha-sec-title { font-size: clamp(26px, 4vw, 38px); font-weight:700; margin:12px 0 10px; letter-spacing:-0.5px; }
        .bha-sec-desc { color:var(--ink-soft); max-width:520px; margin:0 auto; font-size:15px; }

        .bha-hosts { display:grid; grid-template-columns:1fr 1fr; gap:30px; }
        .bha-host-card { background:linear-gradient(165deg, #ffffff 0%, #FFF3EF 100%); border-radius:28px; padding:34px;
          border:1px solid rgba(183,110,121,0.14); box-shadow:0 14px 46px rgba(183,110,121,0.10);
          transition:.32s; position:relative; overflow:hidden; }
        .bha-host-card::before { content:''; position:absolute; top:0; left:0; right:0; height:5px;
          background:linear-gradient(90deg, var(--rose), var(--gold), var(--rose-soft)); }
        .bha-host-card:hover { transform:translateY(-6px); box-shadow:0 26px 60px rgba(183,110,121,0.18); }
        .bha-host-top { display:flex; align-items:center; gap:22px; margin-bottom:20px; }
        .bha-host-photo { width:120px; height:120px; border-radius:50%; flex-shrink:0; overflow:hidden;
          border:3px solid #fff; box-shadow:0 8px 26px rgba(183,110,121,0.24); }
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
        .bha-news-title { font-size:18px; font-weight:700; color:var(--ink); line-height:1.45; margin:0; }
        .bha-news-summary { font-size:14.5px; color:var(--ink-soft); line-height:1.75; margin:0; flex:1; }
        .bha-news-meta { font-size:12.5px; color:var(--ink-soft); opacity:0.85; }
        .bha-news-link { align-self:flex-start; margin-top:2px; font-size:14px; font-weight:700; color:var(--rose-deep);
          text-decoration:none; display:inline-flex; align-items:center; gap:5px; transition:.2s; }
        .bha-news-link:hover { gap:9px; color:var(--rose); }
        .bha-embed { position:relative; width:100%; aspect-ratio:16/9; border-radius:16px; overflow:hidden; background:#000; }
        .bha-embed iframe { position:absolute; inset:0; width:100%; height:100%; border:0; }
        .bha-vmodal-yt { display:block; text-align:center; margin-top:13px; margin-bottom:2px; color:rgba(255,255,255,0.88); font-size:14px; font-weight:600; text-decoration:none; }
        .bha-vmodal-yt:hover { color:#fff; text-decoration:underline; }
        .bha-prod-video { max-width:760px; margin:50px auto 0; text-align:center; }
        .bha-prod-video-t { font-size:22px; font-weight:700; color:var(--ink); margin:0 0 8px; }
        .bha-prod-video-d { font-size:15px; color:var(--ink-soft); margin:0 0 22px; }
        .bha-prod-video .bha-embed { box-shadow:0 14px 40px rgba(157,92,99,0.16); }
        .bha-prod-video-yt { display:inline-block; margin-top:14px; font-size:14px; font-weight:700; color:var(--rose-deep); text-decoration:none; }
        .bha-prod-video-yt:hover { text-decoration:underline; }
        .bha-intro-video { max-width:820px; margin:0 auto; text-align:center; }
        .bha-intro-video .bha-embed { box-shadow:0 18px 50px rgba(157,92,99,0.18); }
      `}</style>

      <nav className="bha-nav">
        <div className="bha-wrap bha-nav-inner">
          <div className="bha-logo">
            <img src="logo.png" alt="윤앤정 AI 셀라이프 로고" />
            <div className="bha-logo-txt">윤앤정 AI 셀라이프<small>AI CELLIFE</small></div>
          </div>
          <div className="bha-links">
            <a onClick={() => goTo("about")}>소개</a>
            <a onClick={() => goTo("beauty")}>뷰티 교육</a>
            <a onClick={() => goTo("product")}>제품</a>
            <a onClick={() => goTo("curriculum")}>마케팅 교육</a>
            <a onClick={() => goTo("news")}>소식</a>
            <a onClick={() => goTo("vision")}>발표자료</a>
            <a onClick={() => goTo("member")}>회원 강의실</a>
            <button className="bha-cta" onClick={() => goTo("member")}>무료 시작하기</button>
          </div>
          <button className="bha-burger" onClick={() => setNavOpen(!navOpen)}>{navOpen ? <X /> : <Menu />}</button>
        </div>
        {navOpen && (
          <div className="bha-wrap" style={{ paddingBottom: 16 }}>
            {["소개|about","뷰티 교육|beauty","제품|product","마케팅 교육|curriculum","신화비전 발표자료|vision","회원 강의실|member"].map((s)=>{
              const [label,id]=s.split("|");
              return <a key={id} onClick={()=>goTo(id)} style={{display:"block",padding:"8px 0",color:"var(--ink-soft)",textDecoration:"none",cursor:"pointer"}}>{label}</a>;
            })}
          </div>
        )}
      </nav>

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
        </div>
      </section>

      <section className="bha-sec alt" id="curriculum">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker">Network Marketing</div>
            <h2 className="bha-sec-title">네트워크 마케팅 교육 시스템</h2>
            <p className="bha-sec-desc">비아블 신화비전의 4대 패러다임 전환. 제품을 파는 법이 아니라, 사람과 함께 성장하는 길을 배웁니다.</p>
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
        </div>
      </section>

      <section className="bha-sec" id="news">
        <div className="bha-wrap">
          <div className="bha-sec-head">
            <div className="bha-kicker"><Newspaper size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />In the News</div>
            <h2 className="bha-sec-title">소식 · 언론 속 비아블</h2>
            <p className="bha-sec-desc">비아블과 윤앤정을 다룬 기사와 후기를 모았습니다. 각 카드는 원문 출처로 연결됩니다.</p>
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
              </div>
            )}
          </div>
          <div className="bha-disc">
            <ShieldCheck size={16} style={{ verticalAlign: "-3px", marginRight: 6, color: "var(--gold)" }} />
            본 교육은 제품의 올바른 이해와 정직한 사업 활동을 위한 것입니다. 과장된 수익 보장이나 비현실적 기대를 조장하지 않으며, 모든 제품 효능은 객관적 자료에 근거해 안내합니다.
          </div>
        </div>
      </section>

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

      <footer className="bha-footer">
        <div className="bha-wrap bha-footer-grid">
          <div>
            <div className="bha-logo" style={{ color: "#fff", marginBottom: 12 }}>
              <img src="logo.png" alt="logo" />
              <div className="bha-logo-txt" style={{ color: "#fff" }}>윤앤정 AI 셀라이프<small style={{color:"var(--gold-lt)"}}>AI CELLIFE</small></div>
            </div>
            <p style={{ maxWidth: 280 }}>AI로 쉽게 배우는 뷰티·홈케어 · 네트워크 마케팅 교육 채널<br/>제품을 더 쉽게, 뷰티를 더 아름답게</p>
          </div>
          <div><h4>바로가기</h4><a onClick={()=>goTo("about")} style={{cursor:"pointer"}}>진행자 소개</a><a onClick={()=>goTo("beauty")} style={{cursor:"pointer"}}>뷰티 교육</a><a onClick={()=>goTo("curriculum")} style={{cursor:"pointer"}}>마케팅 교육</a><a onClick={()=>goTo("news")} style={{cursor:"pointer"}}>소식</a><a onClick={()=>goTo("vision")} style={{cursor:"pointer"}}>신화비전 발표자료</a></div>
          <div><h4>채널</h4><a href="#">YouTube 채널</a><a href="#">자료실</a><a href="#">문의하기</a></div>
        </div>
        <div className="bha-wrap bha-footer-note">© 2026 윤앤정 AI 셀라이프 · 데모 프로토타입 (제품·영상은 플레이스홀더입니다)</div>
      </footer>
    </div>
  );
}
