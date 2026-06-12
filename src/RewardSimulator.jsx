import { useState, useMemo } from "react";
import { Play, RotateCcw, Users, Zap, TrendingUp, Coins, AlertTriangle, Award, Scale, ChevronDown, ChevronUp, Sparkles, Gem, Crown } from "lucide-react";

// ═══ 가이드북 확정 상수 ═══════════════════════════════
const ME = "나";
const PKG = 700000;                       // 신규 1구좌 70만 CV (=PV)
const REFER_RATE = 0.12;
const SPONSOR_CAP = 50000000;
const FAST_PAY = [100000, 200000, 300000]; // 플랜 1·2·3
const MAN = 10000;
const KRW_CV = { min: 1.845, max: 2.301 };
const PKG_COST = { min: 1452000, max: 1610500 };

const RANK_ORDER = ["MANIA", "DR", "EM", "DM"];
const RANK_LABEL = { MANIA: "Mania", DR: "Director", EM: "Emerald", DM: "Diamond" };
const RANK_COLOR = { MANIA: "bg-slate-200 text-slate-600", DR: "bg-rose-100 text-rose-700", EM: "bg-amber-100 text-amber-700", DM: "bg-violet-100 text-violet-700" };
const MATCH_TABLE = { MANIA: [], DR: [0.10], EM: [0.10, 0.05], DM: [0.10, 0.05, 0.05] };
const DUES = { DR: 150000, EM: 300000, DM: 750000 };
const MAINT_VOL = { DR: 210, EM: 350, DM: 1000 };   // 만 CV (소실적)
const SUB_CV = { MANIA: 0, DR: 1, EM: 1, DM: 3 };   // 만 CV/기수
const sponsorRate = () => 0.12;                       // MANIA~BD 12% (RD~CW 10%)

// ═══ 직급 승급 선물(제품) — 가이드북 DR 예시 역산 ════════
const AMP_PER_REFER = 30;   // 추천 1명당 추천앰플 30병
const AMP_BOX = 20;         // 앰플 1박스 = 20병
const AMP_PRICE = 11000;    // 앰플 1병 환산가(가이드북 역산: 90병=990,000원)

// ═══ 전체 직급 단계 레퍼런스 (마케팅 플랜 요약 기준) ═════
const RANK_REF = [
  { key: "MEMBER", label: "Member",        kr: "멤버",         pv: "1~70만 PV 미만",  sub: "없음",   sponsor: "-",   match: "-",     dues: "-",      vol: "-" },
  { key: "MANIA",  label: "Mania",         kr: "매니아",       pv: "70만 PV 이상",     sub: "없음",   sponsor: "12%", match: "-",     dues: "-",      vol: "-" },
  { key: "DR",     label: "Director",      kr: "디렉터",       pv: "소실적 210만 PV",  sub: "1만 CV", sponsor: "12%", match: "1대",   dues: "15만원", vol: "210만 CV" },
  { key: "EM",     label: "Emerald",       kr: "에메랄드",     pv: "소실적 1,400만 PV", sub: "1만 CV", sponsor: "12%", match: "1~2대", dues: "30만원", vol: "350만 CV" },
  { key: "DM",     label: "Diamond",       kr: "다이아몬드",   pv: "소실적 1억 PV",    sub: "3만 CV", sponsor: "12%", match: "1~3대", dues: "75만원", vol: "1,000만 CV" },
  { key: "GDM",    label: "Green Diamond", kr: "그린다이아몬드", pv: "소실적 3억 PV",   sub: "3만 CV", sponsor: "12%", match: "1~4대", dues: "140만원", vol: "1,900만 CV" },
  { key: "BDM",    label: "Blue Diamond",  kr: "블루다이아몬드", pv: "소실적 10억 PV",  sub: "7만 CV", sponsor: "10%", match: "1~4대", dues: "230만원", vol: "3,400만 CV" },
  { key: "RDM",    label: "Red Diamond",   kr: "레드다이아몬드", pv: "소실적 30억 PV",  sub: "7만 CV", sponsor: "10%", match: "1~5대", dues: "400만원", vol: "6,500만 CV" },
  { key: "CW",     label: "Crown",         kr: "크라운",       pv: "소실적 100억 PV",  sub: "7만 CV", sponsor: "10%", match: "1~5대", dues: "600만원", vol: "1억 3,500만 CV" },
];
// 직급별 보석 색 (밝은색, 진한색)
const RANK_GEM = {
  MEMBER: ["#F5BAD3", "#E8889F"], MANIA: ["#E9A6C4", "#D070A0"], DR: ["#D98AA0", "#B76E79"],
  EM: ["#7FD3B6", "#2BB596"], DM: ["#C9B8E6", "#8E7BD8"], GDM: ["#86C9A0", "#3FA56B"],
  BDM: ["#86AEE0", "#3E7BC4"], RDM: ["#E58A98", "#C9445A"], CW: ["#EAD08A", "#C9A04B"],
};

const fmt = (n) => Math.round(n).toLocaleString("ko-KR");
const man = (cv) => fmt(cv / MAN);
const labelFor = (i) => {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return i < 26 ? A[i] : A[i % 26] + Math.floor(i / 26);
};

// ═══ 정산 엔진 (순수 함수) ════════════════════════════
function settle({ nodes, period, carries, rank, sub, fast, pvL, pvR }) {
  const map = { [ME]: { id: ME, parentId: null } };
  nodes.forEach((n) => (map[n.id] = n));
  const sideOfMe = (id) => { let c = map[id]; while (c.parentId !== ME) c = map[c.parentId]; return c.side; };
  const genOf = (id) => { let g = 0, c = map[id]; while (c && c.id !== ME) { g++; c = map[c.recruiterId]; } return g; };

  // 신규 CV를 모든 상위 레그에 적립
  const add = {};
  const bump = (id, s) => { add[id] = add[id] || { L: 0, R: 0 }; add[id][s] += PKG; };
  const newNodes = nodes.filter((n) => n.period === period);
  for (const n of newNodes) { let c = n; while (c.parentId !== null) { bump(c.parentId, c.side); c = map[c.parentId]; } }

  // 전 회원 후원 정산 (하위는 구독 충족 가정)
  const carryOf = (id) => carries[id] || { L: 0, R: 0 };
  const nodeBonus = {}; const nextCarries = {}; const events = [];
  for (const n of nodes) {
    const a = add[n.id] || { L: 0, R: 0 };
    const tL = carryOf(n.id).L + a.L, tR = carryOf(n.id).R + a.R;
    const w = Math.min(tL, tR);
    nodeBonus[n.id] = w * 0.12;
    nextCarries[n.id] = { L: tL - w, R: tR - w };
  }

  // 나의 정산
  const aMe = add[ME] || { L: 0, R: 0 };
  const tL = carryOf(ME).L + aMe.L, tR = carryOf(ME).R + aMe.R;
  const weak = Math.min(tL, tR);
  let sponsor = 0, destroyed = 0;
  if (sub) {
    sponsor = Math.min(weak * sponsorRate(rank), SPONSOR_CAP);
    nextCarries[ME] = { L: tL - weak, R: tR - weak };
  } else {
    destroyed = tL + tR;
    nextCarries[ME] = { L: 0, R: 0 };
    if (destroyed > 0) events.push({ type: "danger", text: `구독 미충족 — 좌·우 CV ${man(destroyed)}만 전액 소멸` });
  }

  const refer = newNodes.filter((n) => n.recruiterId === ME).length * PKG * REFER_RATE;

  // 매칭 (추천 계보, 현재 직급 세대표)
  const table = MATCH_TABLE[rank];
  let match = 0;
  if (table.length) for (const n of nodes) { const g = genOf(n.id); if (g >= 1 && g <= table.length) match += nodeBonus[n.id] * table[g - 1]; }
  if (!sub) match = match; // 매칭은 추천계 권리소득 — 구독 연동 규정 모호하여 유지 (각주)

  // 품위유지 (직급 + 구독 + 유지볼륨)
  let dues = 0;
  if (DUES[rank] && sub && weak >= MAINT_VOL[rank] * MAN) dues = DUES[rank];

  // 패스트 파워 (순서 강제)
  const f = { ...fast };
  const refsOf = (id) => nodes.filter((n) => n.recruiterId === id);
  const fastEvents = []; let fastPay = 0;
  if (!f.p1) {
    const byP = {};
    nodes.filter((n) => n.recruiterId === ME && sideOfMe(n.id) === "L").forEach((n) => { (byP[n.period] = byP[n.period] || []).push(n); });
    const hit = Object.values(byP).find((arr) => arr.length >= 2);
    if (hit) { f.p1 = true; f.p1Nodes = hit.slice(0, 2).map((n) => n.id); fastPay += FAST_PAY[0]; fastEvents.push(`플랜1 달성 (+10만) — 좌측 직추천 ${f.p1Nodes.join("·")}`); }
  }
  if (f.p1 && !f.p2 && f.p1Nodes.every((id) => refsOf(id).length >= 2)) {
    f.p2 = true; fastPay += FAST_PAY[1]; fastEvents.push(`플랜2 달성 (+20만) — ${f.p1Nodes.join("·")} 각 2명 추천 (하위 각 10만 별도 수령)`);
  }
  if (f.p2 && !f.p3) {
    const rNodes = nodes.filter((n) => n.recruiterId === ME && sideOfMe(n.id) === "R");
    if (rNodes.length >= 2) {
      const pair = rNodes.slice(0, 2);
      if (pair.every((n) => refsOf(n.id).length >= 2)) { f.p3 = true; f.p3Nodes = pair.map((n) => n.id); fastPay += FAST_PAY[2]; fastEvents.push(`플랜3 달성 (+30만) — 우측 ${f.p3Nodes.join("·")} 사이클 완성!`); }
    }
  }
  fastEvents.forEach((t) => events.push({ type: "fast", text: t }));

  // 직급 PV (소실적, 4기수 롤링) — PV는 구독과 무관하게 누적
  const hL = [...pvL, aMe.L], hR = [...pvR, aMe.R];
  const win = (h) => h.slice(-4).reduce((s, v) => s + v, 0);
  const winWeak = Math.min(win(hL), win(hR));
  const allWeak = Math.min(hL.reduce((s, v) => s + v, 0), hR.reduce((s, v) => s + v, 0));
  const dirL = nodes.some((n) => n.recruiterId === ME && sideOfMe(n.id) === "L");
  const dirR = nodes.some((n) => n.recruiterId === ME && sideOfMe(n.id) === "R");
  let promo = null;
  if (rank === "MANIA" && winWeak >= 2100000 && dirL && dirR) promo = "DR";
  else if (rank === "DR" && winWeak >= 14000000) promo = "EM";
  if (promo) events.push({ type: "promo", text: `🎉 ${RANK_LABEL[promo]} 승급! (4기수 소실적 ${man(winWeak)}만 PV)` });

  // 직급 승급 선물(제품) — 가이드북 DR 예시 기준
  const directNew = newNodes.filter((n) => n.recruiterId === ME).length;
  let giftAmp = directNew * AMP_PER_REFER;            // 추천앰플 30병/명
  let giftSerum = 0, giftMist = 0;
  if (promo === "DR") { giftAmp += AMP_BOX; giftSerum += 1; giftMist += 1; }  // DR 승급선물(앰플 1박스·세럼·미스트)
  if (dues > 0)       { giftAmp += AMP_BOX; giftMist += 1; }                  // 품위(품의) 선물(앰플 1박스·미스트)
  const gift = { amp: giftAmp, serum: giftSerum, mist: giftMist };

  const total = refer + sponsor + fastPay + match + dues;
  return { refer, sponsor, fastPay, match, dues, total, weak, tL, tR, destroyed, nextCarries, fast: f, events, promo, gift, hL, hR, winWeak, allWeak, dirL, dirR, newCount: newNodes.length };
}

// ═══ UI 컴포넌트 ═════════════════════════════════════
const CHIP_STYLE = {
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  sky: "bg-sky-50 text-sky-600 border-sky-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  rose: "bg-rose-50 text-rose-600 border-rose-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  slate: "bg-slate-50 text-slate-500 border-slate-100",
};
function Chip({ label, value, tone = "slate" }) {
  return value > 0 ? (
    <span className={`text-[11px] px-1.5 py-0.5 rounded border ${CHIP_STYLE[tone]}`}>{label} {fmt(value)}</span>
  ) : null;
}
function Bar({ now, max, label, ok }) {
  const pct = Math.min(100, (now / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-[11px] text-slate-500 mb-1"><span>{label}</span><span className="tabular-nums">{man(now)} / {man(max)}만</span></div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full rounded-full ${ok ? "bg-emerald-500" : "bg-indigo-500"}`} style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export default function RewardSimulator() {
  const [nodes, setNodes] = useState([]);
  const [period, setPeriod] = useState(1);
  const [carries, setCarries] = useState({ [ME]: { L: 0, R: 0 } });
  const [rank, setRank] = useState("MANIA");
  const [sub, setSub] = useState(true);
  const [fast, setFast] = useState({ p1: false, p2: false, p3: false, p1Nodes: [], p3Nodes: [] });
  const [pvL, setPvL] = useState([]); const [pvR, setPvR] = useState([]);
  const [history, setHistory] = useState([]);
  const [totals, setTotals] = useState({ refer: 0, sponsor: 0, fast: 0, match: 0, dues: 0 });
  const [giftTotals, setGiftTotals] = useState({ amp: 0, serum: 0, mist: 0 });
  const [subCVSpent, setSubCVSpent] = useState(0);
  const [mode, setMode] = useState("ME");
  const [labelIdx, setLabelIdx] = useState(0);
  const [logOpen, setLogOpen] = useState(true);
  const [start, setStart] = useState({ y: 2026, m: 6, half: 1 });
  const [selectedId, setSelectedId] = useState(null);
  const [meName, setMeName] = useState("");

  // 경과 기수(1-based) → 실제 연·월·기
  const dateOf = (p) => {
    const total = (start.m - 1) * 2 + (start.half - 1) + (p - 1);
    const t = ((total % 24) + 24) % 24;
    return { y: start.y + Math.floor(total / 24), m: Math.floor(t / 2) + 1, h: (((total % 2) + 2) % 2) + 1 };
  };
  const dLong = (p) => { const d = dateOf(p); return `${d.y}년 ${d.m}월 ${d.h}기`; };
  const dShort = (p) => { const d = dateOf(p); return `${d.m}월 ${d.h}기`; };
  const nameOf = (id) => (id === ME ? (meName || "나") : (nodes.find((n) => n.id === id)?.name || id));
  const short = (s, m = 5) => (s && s.length > m ? s.slice(0, m) : s || "");
  const fitFont = (s) => { const L = (s || "").length; return L <= 2 ? 12 : L <= 3 ? 10.5 : L <= 4 ? 9 : 8; };
  const rename = (val) => { if (selectedId === ME) setMeName(val); else setNodes((ns) => ns.map((n) => (n.id === selectedId ? { ...n, name: val } : n))); };

  const preview = useMemo(() => settle({ nodes, period, carries, rank, sub, fast, pvL, pvR }), [nodes, period, carries, rank, sub, fast, pvL, pvR]);

  // ── 트리 레이아웃 (in-order) ──
  const layout = useMemo(() => {
    const children = {};
    nodes.forEach((n) => { children[n.parentId] = children[n.parentId] || {}; children[n.parentId][n.side] = n.id; });
    let col = 0, maxD = 0; const pos = {}; const slots = [];
    const visit = (id, d) => {
      maxD = Math.max(maxD, d);
      const c = children[id] || {};
      if (c.L) visit(c.L, d + 1); else slots.push({ parent: id, side: "L", x: col++, y: d + 1 });
      pos[id] = { x: col++, y: d };
      if (c.R) visit(c.R, d + 1); else slots.push({ parent: id, side: "R", x: col++, y: d + 1 });
    };
    visit(ME, 0);
    return { pos, slots, cols: col, maxD: maxD + 1, children };
  }, [nodes]);

  const addNode = (parentId, side, recruiterOverride) => {
    const id = labelFor(labelIdx);
    setNodes((ns) => [...ns, { id, name: "", parentId, side, recruiterId: recruiterOverride ?? (mode === "ME" ? ME : parentId), period }]);
    setLabelIdx((i) => i + 1);
    setSelectedId(id);
  };
  const undo = () => {
    const last = [...nodes].reverse().find((n) => n.period === period);
    if (last) { setNodes((ns) => ns.filter((n) => n.id !== last.id)); }
  };

  // 자동 배치 (패스트 사이클 시나리오)
  const autoChain = (sideTop, specs) => {
    setNodes((prev) => {
      const ns = [...prev]; let li = labelIdx;
      const childOf = (pid, s) => ns.find((n) => n.parentId === pid && n.side === s);
      const made = [];
      for (const rec of specs) {
        let p = ME; while (childOf(p, sideTop)) p = childOf(p, sideTop).id;
        const id = labelFor(li++);
        const recruiter = rec === "SELF" ? ME : rec >= 0 ? made[rec] : ME;
        ns.push({ id, parentId: p, side: sideTop, recruiterId: recruiter, period });
        made.push(id);
      }
      setLabelIdx(li);
      return ns;
    });
  };
  const placePlan1 = () => autoChain("L", ["SELF", "SELF"]);
  const autoChainPlan2 = () => {
    setNodes((prev) => {
      const ns = [...prev]; let li = labelIdx;
      const childOf = (pid, s) => ns.find((n) => n.parentId === pid && n.side === s);
      for (const recId of fast.p1Nodes) for (let k = 0; k < 2; k++) {
        let p = ME; while (childOf(p, "L")) p = childOf(p, "L").id;
        ns.push({ id: labelFor(li++), parentId: p, side: "L", recruiterId: recId, period });
      }
      setLabelIdx(li); return ns;
    });
  };
  const placePlan3 = () => {
    setNodes((prev) => {
      const ns = [...prev]; let li = labelIdx;
      const childOf = (pid, s) => ns.find((n) => n.parentId === pid && n.side === s);
      const pair = [];
      for (let k = 0; k < 2; k++) {
        let p = ME; while (childOf(p, "R")) p = childOf(p, "R").id;
        const id = labelFor(li++); ns.push({ id, parentId: p, side: "R", recruiterId: ME, period }); pair.push(id);
      }
      for (const recId of pair) for (let k = 0; k < 2; k++) {
        let p = ME; while (childOf(p, "R")) p = childOf(p, "R").id;
        ns.push({ id: labelFor(li++), parentId: p, side: "R", recruiterId: recId, period });
      }
      setLabelIdx(li); return ns;
    });
  };

  // ── 기수 마감 ──
  const close = () => {
    const r = preview;
    setCarries((c) => ({ ...c, ...r.nextCarries }));
    setFast(r.fast);
    setPvL(r.hL); setPvR(r.hR);
    setTotals((t) => ({ refer: t.refer + r.refer, sponsor: t.sponsor + r.sponsor, fast: t.fast + r.fastPay, match: t.match + r.match, dues: t.dues + r.dues }));
    setGiftTotals((g) => ({ amp: g.amp + r.gift.amp, serum: g.serum + r.gift.serum, mist: g.mist + r.gift.mist }));
    if (sub) setSubCVSpent((s) => s + SUB_CV[rank] * MAN);
    setHistory((h) => [{ period, rank, ...r }, ...h]);
    if (r.promo) setRank(r.promo);
    setPeriod((p) => p + 1);
  };

  const reset = () => {
    setNodes([]); setPeriod(1); setCarries({ [ME]: { L: 0, R: 0 } }); setRank("MANIA"); setSub(true);
    setFast({ p1: false, p2: false, p3: false, p1Nodes: [], p3Nodes: [] });
    setPvL([]); setPvR([]); setHistory([]); setTotals({ refer: 0, sponsor: 0, fast: 0, match: 0, dues: 0 });
    setGiftTotals({ amp: 0, serum: 0, mist: 0 });
    setSubCVSpent(0); setLabelIdx(0); setSelectedId(null); setMeName("");
  };

  const grand = totals.refer + totals.sponsor + totals.fast + totals.match + totals.dues;
  const COLW = 60, ROWH = 78, R = 20;
  const { pos, slots, cols, maxD } = layout;
  const cx = (x) => x * COLW + 36, cy = (y) => y * ROWH + 36;
  const nodeColor = (n) => (n.recruiterId === ME ? "#4f46e5" : "#059669");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "'Gothic A1', system-ui, -apple-system, sans-serif" }}>

      {/* ── 브랜드 헤더 바 ── */}
      <div className="bg-gradient-to-r from-[#8f4f5a] via-[#b76e79] to-[#caa0a8] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 mr-auto">
            <div className="w-9 h-9 rounded-xl bg-white/10 grid place-items-center text-amber-100"><Sparkles className="w-5 h-5" /></div>
            <div className="leading-tight">
              <div className="font-bold tracking-tight">윤앤정 <span className="text-amber-100">AI 셀라이프</span></div>
              <div className="text-[11px] text-white/55">비아블 신화 보상 시뮬레이터 · 교육용</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 font-medium">{dLong(period)}</span>
            <span className={`px-2 py-1 rounded-lg font-bold ${RANK_COLOR[rank]}`}>{RANK_LABEL[rank]}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* ── 툴바 ── */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <div className="flex items-center gap-1.5 bg-white rounded-xl border border-slate-200 px-2.5 py-1.5">
            <span className="text-[11px] text-slate-400 mr-0.5">사업 시작</span>
            <select value={start.y} onChange={(e) => setStart((s) => ({ ...s, y: +e.target.value }))} className="text-xs rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-slate-700">
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => <option key={y} value={y}>{y}년</option>)}
            </select>
            <select value={start.m} onChange={(e) => setStart((s) => ({ ...s, m: +e.target.value }))} className="text-xs rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-slate-700">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}월</option>)}
            </select>
            <select value={start.half} onChange={(e) => setStart((s) => ({ ...s, half: +e.target.value }))} className="text-xs rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-slate-700">
              <option value={1}>1기</option>
              <option value={2}>2기</option>
            </select>
          </div>
          <label className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-2 cursor-pointer">
            <span className="text-sm text-slate-600">이번 기수 구독</span>
            <button onClick={() => setSub(!sub)} className={`relative w-10 h-6 rounded-full transition-colors ${sub ? "bg-[#b76e79]" : "bg-rose-400"}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${sub ? "translate-x-4" : ""}`} />
            </button>
          </label>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={reset} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-white transition-colors"><RotateCcw className="w-4 h-4" />초기화</button>
            <button onClick={close} className="flex items-center gap-1.5 bg-[#b76e79] hover:bg-[#9d5963] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors">
              <Play className="w-4 h-4" />{dShort(period)} 마감
            </button>
          </div>
        </div>

        {/* ── 3스텝 사용 가이드 ── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[["1", "가운데 '나'를 눌러 본인 이름 입력"], ["2", "＋ 빈자리에 파트너를 놓고 이름 입력"], ["3", "「기수 마감」으로 시간 흘리기 — 수당 자동 계산"]].map(([n, t]) => (
            <div key={n} className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-2">
              <span className="w-5 h-5 rounded-full bg-[#b76e79] text-white text-[11px] font-bold grid place-items-center shrink-0">{n}</span>
              <span className="text-xs text-slate-600">{t}</span>
            </div>
          ))}
        </div>


        <div className="grid xl:grid-cols-[1fr_400px] gap-5 items-start">

          {/* ── 좌: 트리 ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-slate-500">신규 배치 — 빈 자리(＋)를 클릭</span>
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 ml-1">
                  <button onClick={() => setMode("ME")} className={`px-2.5 py-1 text-xs font-medium rounded-md ${mode === "ME" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500"}`}>내 직추천</button>
                  <button onClick={() => setMode("PARENT")} className={`px-2.5 py-1 text-xs font-medium rounded-md ${mode === "PARENT" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}>상위 회원 추천</button>
                </div>
                <button onClick={undo} disabled={!nodes.some((n) => n.period === period)} className="text-xs text-slate-400 hover:text-slate-600 disabled:opacity-30 underline-offset-2 hover:underline ml-1">이번 기수 배치 취소</button>
                <div className="ml-auto flex gap-1.5">
                  <button onClick={placePlan1} disabled={fast.p1} className="text-[11px] font-medium px-2 py-1 rounded-md border border-amber-200 bg-amber-50 text-amber-700 disabled:opacity-30">⚡플랜1 배치</button>
                  <button onClick={autoChainPlan2} disabled={!fast.p1 || fast.p2} className="text-[11px] font-medium px-2 py-1 rounded-md border border-amber-200 bg-amber-50 text-amber-700 disabled:opacity-30">⚡플랜2 배치</button>
                  <button onClick={placePlan3} disabled={!fast.p2 || fast.p3} className="text-[11px] font-medium px-2 py-1 rounded-md border border-amber-200 bg-amber-50 text-amber-700 disabled:opacity-30">⚡플랜3 배치</button>
                </div>
              </div>

              {selectedId ? (
                <div className="flex items-center gap-2 mb-3 p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                  <span className="text-xs font-semibold text-indigo-700 shrink-0">{selectedId === ME ? "본인" : `파트너 ${selectedId}`}</span>
                  <input
                    key={selectedId}
                    autoFocus
                    value={selectedId === ME ? meName : (nodes.find((n) => n.id === selectedId)?.name || "")}
                    onChange={(e) => rename(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") setSelectedId(null); }}
                    placeholder="사업자 이름 입력 (예: 전준호)"
                    className="flex-1 min-w-0 px-2.5 py-1.5 text-sm rounded-lg border border-indigo-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  {selectedId !== ME && (() => { const s = nodes.find((n) => n.id === selectedId); return s ? <span className="text-[11px] text-slate-500 shrink-0 hidden sm:inline">추천 {nameOf(s.recruiterId)} · {s.side === "L" ? "좌" : "우"}레그</span> : null; })()}
                  <button onClick={() => setSelectedId(null)} className="text-xs text-slate-400 hover:text-slate-600 shrink-0">닫기</button>
                </div>
              ) : (
                <div className="text-[11px] text-slate-400 mb-3">💡 트리의 노드(가운데 '나' 포함)를 클릭하면 사업자·파트너 이름을 넣을 수 있습니다</div>
              )}

              <div className="overflow-x-auto rounded-xl bg-slate-50/60 border border-slate-100">
                <svg width={Math.max(cols * COLW + 72, 560)} height={(maxD + 1) * ROWH + 60}>
                  {/* edges */}
                  {nodes.map((n) => { const p = pos[n.parentId], c = pos[n.id]; return <line key={"e" + n.id} x1={cx(p.x)} y1={cy(p.y) + R} x2={cx(c.x)} y2={cy(c.y) - R} stroke="#cbd5e1" strokeWidth="1.5" />; })}
                  {slots.map((s, i) => { const p = pos[s.parent]; return <line key={"se" + i} x1={cx(p.x)} y1={cy(p.y) + R} x2={cx(s.x)} y2={cy(s.y) - 14} stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />; })}
                  {/* me */}
                  <g className="cursor-pointer" onClick={() => setSelectedId(ME)}>
                    {selectedId === ME && <circle cx={cx(pos[ME].x)} cy={cy(pos[ME].y)} r={R + 6} fill="none" stroke="#4f46e5" strokeWidth="2.5" />}
                    <circle cx={cx(pos[ME].x)} cy={cy(pos[ME].y)} r={R + 2} fill="#0f172a" />
                    <text x={cx(pos[ME].x)} y={cy(pos[ME].y) + 4} textAnchor="middle" fill="white" fontSize={fitFont(meName || "나")} fontWeight="700">{short(meName || "나")}</text>
                  </g>
                  {/* nodes */}
                  {nodes.map((n) => { const c = pos[n.id]; const pend = n.period === period; const dn = nameOf(n.id); return (
                    <g key={n.id} className="cursor-pointer" onClick={() => setSelectedId(n.id)}>
                      {selectedId === n.id && <circle cx={cx(c.x)} cy={cy(c.y)} r={R + 5} fill="none" stroke="#4f46e5" strokeWidth="2.5" />}
                      {pend && selectedId !== n.id && <circle cx={cx(c.x)} cy={cy(c.y)} r={R + 5} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />}
                      <circle cx={cx(c.x)} cy={cy(c.y)} r={R} fill={nodeColor(n)} />
                      <text x={cx(c.x)} y={cy(c.y) + 4} textAnchor="middle" fill="white" fontSize={fitFont(dn)} fontWeight="700">{short(dn)}</text>
                      <text x={cx(c.x)} y={cy(c.y) + R + 13} textAnchor="middle" fill="#94a3b8" fontSize="9">{dateOf(n.period).m}/{dateOf(n.period).h}</text>
                    </g>
                  ); })}
                  {/* slots */}
                  {slots.map((s, i) => (
                    <g key={"s" + i} className="cursor-pointer" onClick={() => addNode(s.parent, s.side)}>
                      <circle cx={cx(s.x)} cy={cy(s.y)} r={14} fill="white" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x={cx(s.x)} y={cy(s.y) + 4.5} textAnchor="middle" fill="#94a3b8" fontSize="14">＋</text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />내 직추천 (추천수당 발생)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />산하 추천</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-400 inline-block" />이번 기수 신규 (마감 전)</span>
                <span className="ml-auto">신규 1명 = 70만 CV 구좌 (실구매 약 145~161만 원)</span>
              </div>
            </div>

            {/* 기수 로그 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <button onClick={() => setLogOpen(!logOpen)} className="w-full flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-700">기수 로그 ({history.length})</h2>
                {logOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {logOpen && (history.length === 0 ? (
                <p className="text-xs text-slate-400 mt-3">아직 마감한 기수가 없습니다. 노드를 심고 「기수 마감」을 눌러보세요.</p>
              ) : (
                <div className="mt-3 space-y-2.5">
                  {history.map((h) => (
                    <div key={h.period} className="rounded-xl border border-slate-100 px-3.5 py-2.5">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-700">{dShort(h.period)}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${RANK_COLOR[h.rank]}`}>{RANK_LABEL[h.rank]}</span>
                          {h.newCount > 0 && <span className="text-[11px] text-slate-400">신규 {h.newCount}명</span>}
                        </div>
                        <span className="text-sm font-bold text-[#9d5963] tabular-nums">{fmt(h.total)}원</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <Chip label="추천" value={h.refer} tone="indigo" /><Chip label="후원" value={h.sponsor} tone="sky" />
                        <Chip label="패스트" value={h.fastPay} tone="amber" /><Chip label="매칭" value={h.match} tone="rose" /><Chip label="품위" value={h.dues} tone="emerald" />
                        {h.nextCarries[ME] && (h.nextCarries[ME].L > 0 || h.nextCarries[ME].R > 0) && <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-100">이월 좌{man(h.nextCarries[ME].L)}만·우{man(h.nextCarries[ME].R)}만</span>}
                      </div>
                      {h.events.map((e, i) => (
                        <div key={i} className={`text-[11px] mt-1.5 ${e.type === "danger" ? "text-rose-600" : e.type === "promo" ? "text-violet-600 font-semibold" : "text-amber-600"}`}>{e.text}</div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── 우: 대시보드 ── */}
          <div className="space-y-4 xl:sticky xl:top-4">

            {/* 이번 기수 미리보기 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-5 bg-gradient-to-br from-[#b76e79] to-[#9d5963] text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-rose-50/90 flex items-center gap-1.5"><Coins className="w-3.5 h-3.5" />{dShort(period)} 예상 수당</span>
                  {!sub && preview.destroyed > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500 font-bold">구독 미충족</span>}
                </div>
                <div className="text-[2.5rem] leading-none font-bold tabular-nums mt-2">{fmt(preview.total)}<span className="text-xl font-semibold ml-1">원</span></div>
                <div className="text-[11px] text-rose-50/70 mt-2">현재 레그 — 좌 {man(preview.tL)}만 / 우 {man(preview.tR)}만 CV (이월 포함)</div>
              </div>
              <div className="p-4">
                <div className="divide-y divide-slate-50 text-sm">
                  <div className="flex justify-between py-1.5"><span className="text-slate-500">추천 ({preview.refer / 84000 | 0}명)</span><span className="tabular-nums font-medium">{fmt(preview.refer)}원</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-slate-500">후원 (소실적 {man(preview.weak)}만)</span><span className="tabular-nums font-medium">{fmt(preview.sponsor)}원</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-slate-500">패스트</span><span className="tabular-nums font-medium">{fmt(preview.fastPay)}원</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-slate-500">매칭</span><span className="tabular-nums font-medium">{fmt(preview.match)}원</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-slate-500">품위유지</span><span className="tabular-nums font-medium">{fmt(preview.dues)}원</span></div>
                </div>
                {(preview.gift.amp > 0 || preview.gift.mist > 0 || preview.gift.serum > 0) && (
                  <div className="mt-3 flex items-start gap-1.5 text-[11px] text-rose-700 bg-rose-50/70 rounded-lg px-2.5 py-2">
                    <Sparkles className="w-3.5 h-3.5 mt-px shrink-0 text-[#b76e79]" />
                    <span>이번 기수 선물 — 앰플 {preview.gift.amp}병{preview.gift.serum ? ` · 세럼 ${preview.gift.serum}` : ""}{preview.gift.mist ? ` · 미스트 ${preview.gift.mist}` : ""} <span className="text-rose-400">(제품 · 현금 별도)</span></span>
                  </div>
                )}
                {!sub && preview.destroyed > 0 && (
                  <div className="mt-3 flex items-start gap-1.5 text-[11px] text-rose-600 bg-rose-50 rounded-lg px-2.5 py-2">
                    <AlertTriangle className="w-3.5 h-3.5 mt-px shrink-0" />마감 시 좌·우 CV {man(preview.destroyed)}만이 소멸됩니다
                  </div>
                )}
              </div>
              <div className="px-4 py-3 bg-slate-900 text-white flex items-baseline justify-between">
                <span className="text-xs text-slate-400">누적 수령 ({history.length}기수)</span>
                <span className="text-xl font-bold tabular-nums">{fmt(grand)}원</span>
              </div>
            </div>

            {/* 승급 추적 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5"><Award className="w-3.5 h-3.5" />승급 추적 (소실적 PV)</h2>
              <div className="space-y-3">
                {rank === "MANIA" && (<>
                  <Bar now={preview.winWeak} max={2100000} label="Director — 최근 4기수 소실적" ok={preview.winWeak >= 2100000} />
                  <div className="flex gap-3 text-[11px]">
                    <span className={preview.dirL ? "text-emerald-600 font-medium" : "text-slate-400"}>{preview.dirL ? "✓" : "○"} 좌측 직추천 1명+</span>
                    <span className={preview.dirR ? "text-emerald-600 font-medium" : "text-slate-400"}>{preview.dirR ? "✓" : "○"} 우측 직추천 1명+</span>
                  </div>
                </>)}
                {rank === "DR" && <Bar now={preview.winWeak} max={14000000} label="Emerald — 최근 4기수 소실적" ok={preview.winWeak >= 14000000} />}
                {(rank === "EM" || rank === "DM") && <Bar now={preview.allWeak} max={100000000} label="Diamond — 무한누적 소실적 (추천계보 DR 1:1 별도)" ok={preview.allWeak >= 100000000} />}
                <div className="text-[11px] text-slate-400">PV는 구독과 무관하게 누적됩니다 (CV 소멸과 별개)</div>
              </div>
            </div>

            {/* 직급 승급 선물 (누적) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />직급 승급 선물 (제품 · 누적)</h2>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-rose-50/60 border border-rose-100 py-2.5"><div className="text-lg font-bold text-[#9d5963] tabular-nums">{giftTotals.amp}</div><div className="text-[11px] text-slate-500">앰플(병)</div></div>
                <div className="rounded-xl bg-amber-50/60 border border-amber-100 py-2.5"><div className="text-lg font-bold text-amber-700 tabular-nums">{giftTotals.serum}</div><div className="text-[11px] text-slate-500">세럼(EA)</div></div>
                <div className="rounded-xl bg-violet-50/60 border border-violet-100 py-2.5"><div className="text-lg font-bold text-violet-700 tabular-nums">{giftTotals.mist}</div><div className="text-[11px] text-slate-500">미스트(EA)</div></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">추천앰플 30병/명 · DR 승급선물(앰플 1박스+세럼+미스트) · 품위선물(앰플 1박스+미스트). 앰플 환산 약 {fmt(giftTotals.amp * AMP_PRICE)}원 (1박스=20병).</p>
            </div>

            {/* 패스트 사이클 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" />패스트 파워 사이클</h2>
              <div className="flex items-center gap-1.5">
                {["p1", "p2", "p3"].map((k, i) => (
                  <div key={k} className={`flex-1 rounded-lg px-2 py-2 text-center text-[11px] font-semibold border ${fast[k] ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                    플랜{i + 1}<br /><span className="text-xs">{fast[k] ? "달성 ✓" : `+${FAST_PAY[i] / MAN}만`}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">좌측 2명 직추천 → 그들이 각 2명 → 우측 동일. 순서 필수, 사이클당 60만 원.</p>
            </div>

            {/* 비용 측 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Scale className="w-3.5 h-3.5" />비용 측 (참고)</h2>
              <div className="text-sm divide-y divide-slate-50">
                <div className="flex justify-between py-1.5"><span className="text-slate-500">내 구독 누적 ({man(subCVSpent)}만 CV)</span><span className="tabular-nums font-medium">{fmt(subCVSpent * KRW_CV.min / MAN)}~{fmt(subCVSpent * KRW_CV.max / MAN)}만 원</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-500">조직 전체 구매액 ({nodes.length}명)</span><span className="tabular-nums font-medium">{fmt(nodes.length * PKG_COST.min / MAN)}~{fmt(nodes.length * PKG_COST.max / MAN)}만 원</span></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">조직 구매액은 하위 회원들이 각자 부담한 금액입니다. 내 수당 {fmt(grand)}원의 원천이 이 매출임을 함께 보여주는 지표입니다.</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3">
              <p className="text-[11px] font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" />교육용 시뮬레이션 안내</p>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                본 도구는 비아블 신화 마케팅 플랜의 구조를 이해하기 위한 <b className="text-slate-500">교육용 시뮬레이터</b>로, 특정인의 수익을 보장하거나 가입을 권유하지 않습니다.
                모든 수치는 입력한 조직이 이상적으로 충원됐을 때의 이론값이며, 실제 수익은 탈락·미구매·레그 불균형으로 크게 달라질 수 있습니다.
                단순화 가정: 하위 전원 구독 충족 · 매칭 압축 롤업 및 법정 35% 캡 미반영 · 패스트 50% 페널티 미구현 · DM 이상 승급은 PV 진행률만 표시.
              </p>
            </div>
          </div>
        </div>

        {/* ── 직급 단계 가이드북 (하단 참고) ── */}
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#b76e79] to-[#9d5963] grid place-items-center text-white"><Award className="w-4 h-4" /></div>
            <h2 className="text-sm font-bold text-slate-700">직급 단계 가이드북</h2>
            <span className="text-[11px] text-slate-400">회원 가입부터 크라운까지 — 승급 기준(소실적 PV)과 품위유지 보너스</span>
          </div>
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <div className="flex items-center gap-1.5 min-w-max pt-3">
              {RANK_REF.map((r, i) => (
                <div key={r.key} className="flex items-center">
                  <div className={`w-[126px] rounded-2xl border px-3 py-3 text-center transition-transform ${r.key === rank ? "border-[#b76e79] bg-rose-50/60 shadow-md -translate-y-1" : "border-slate-200 bg-white"}`}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 grid place-items-center text-white" style={{ background: `linear-gradient(145deg, ${RANK_GEM[r.key][0]}, ${RANK_GEM[r.key][1]})`, boxShadow: `0 8px 18px ${RANK_GEM[r.key][1]}55, inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.12)` }}>
                      {r.key === "CW" ? <Crown className="w-5 h-5" /> : <Gem className="w-5 h-5" />}
                    </div>
                    <div className="text-[13px] font-extrabold text-slate-800 leading-tight">{r.kr}</div>
                    <div className="text-[9px] font-bold tracking-wide uppercase" style={{ color: RANK_GEM[r.key][1] }}>{r.label}</div>
                    <div className="text-[10px] text-slate-500 mt-1.5 leading-snug">{r.pv}</div>
                    {r.dues !== "-" ? <div className="text-[10px] font-semibold text-[#9d5963] mt-1">품위 {r.dues}</div> : <div className="text-[10px] text-slate-300 mt-1">—</div>}
                  </div>
                  {i < RANK_REF.length - 1 && <div className="px-0.5 text-slate-300 text-lg shrink-0">›</div>}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">현재 직급은 로즈 카드로 강조됩니다 · 추천 12% 공통 · 후원 보너스 블루다이아까지 12% / 레드다이아·크라운 10% · 계산 구간은 매니아~다이아, 그 이상은 기준 참고용.</p>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-400">윤앤정 AI 셀라이프 · 비아블 신화 보상 시뮬레이터 (교육용)</p>
        </div>
      </div>
    </div>
  );
}
