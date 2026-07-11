import { useState, useMemo } from "react";
import { Calculator, ArrowRightLeft, Target, TrendingUp, Package, Sparkles } from "lucide-react";

// ── 공식 제품 마스터 (회원가 / PV) · CV = PV 동일 취급 ──
const PRODUCTS = [
  { id: "pkg254", name: "254 SET 패키지", price: 2540000, pv: 700000 },
  { id: "premium", name: "프리미엄 앰플(10EA)", price: 396000, pv: 200000 },
  { id: "mytholo3", name: "미솔로뮨 3BOX", price: 550000, pv: 200000 },
  { id: "slimssok1", name: "슬림쏙 1BOX", price: 330000, pv: 130000 },
  { id: "ampoule20", name: "앰플(20EA)", price: 220000, pv: 110000 },
  { id: "gungae", name: "궁애(10EA)", price: 242000, pv: 110000 },
  { id: "mytholo1", name: "미솔로뮨 1BOX", price: 242000, pv: 110000 },
  { id: "scalpia_dev", name: "스칼피아 크로마 디바이스", price: 275000, pv: 80000 },
  { id: "oil", name: "오일 50ml", price: 121000, pv: 80000 },
  { id: "dermacream", name: "더마크림 50ml", price: 165000, pv: 75000 },
  { id: "scalpia_amp", name: "스칼피아 플러스 앰플", price: 143000, pv: 65000 },
  { id: "cellulose", name: "셀룰로오스 팩(10EA)", price: 132000, pv: 60000 },
  { id: "cnstox", name: "씨앤톡스 5set", price: 77000, pv: 35000 },
  { id: "cushion", name: "쿠션", price: 59000, pv: 23000 },
  { id: "serum", name: "세럼 200ml", price: 38500, pv: 16000 },
  { id: "suncream", name: "썬크림 50g", price: 33000, pv: 15000 },
];

// ── 직급 (소실적 PV 승급 기준) ──
const RANKS = [
  { id: "member", name: "멤버", pv: 0 },
  { id: "mania", name: "매니아", pv: 700000 },
  { id: "director", name: "디렉터", pv: 2100000 },
  { id: "emerald", name: "에메랄드", pv: 14000000 },
  { id: "diamond", name: "다이아몬드", pv: 100000000 },
  { id: "green", name: "그린다이아몬드", pv: 300000000 },
  { id: "blue", name: "블루다이아몬드", pv: 1000000000 },
  { id: "red", name: "레드다이아몬드", pv: 3000000000 },
  { id: "crown", name: "크라운", pv: 10000000000 },
];

const won = (n) => n.toLocaleString("ko-KR");
const pvfmt = (n) => n.toLocaleString("ko-KR");

export default function SalesCalculator() {
  const [qtyL, setQtyL] = useState({});
  const [qtyR, setQtyR] = useState({});
  const [carryPV, setCarryPV] = useState(0);
  const [carrySide, setCarrySide] = useState("left");
  const [targetRank, setTargetRank] = useState("diamond");

  const setQ = (side, id, v) => {
    const n = Math.max(0, parseInt(v || "0", 10) || 0);
    (side === "left" ? setQtyL : setQtyR)((p) => ({ ...p, [id]: n }));
  };

  const calc = useMemo(() => {
    let lSales = 0, lPV = 0, rSales = 0, rPV = 0;
    for (const p of PRODUCTS) {
      const ql = qtyL[p.id] || 0, qr = qtyR[p.id] || 0;
      lSales += ql * p.price; lPV += ql * p.pv;
      rSales += qr * p.price; rPV += qr * p.pv;
    }
    const lTotal = lPV + (carrySide === "left" ? carryPV : 0);
    const rTotal = rPV + (carrySide === "right" ? carryPV : 0);
    const powerPV = Math.max(lTotal, rTotal);
    const payPV = Math.min(lTotal, rTotal);
    const powerSide = lTotal >= rTotal ? "좌측" : "우측";
    const paySide = lTotal >= rTotal ? "우측" : "좌측";

    let achieved = RANKS[0];
    for (let i = RANKS.length - 1; i >= 0; i--) { if (payPV >= RANKS[i].pv) { achieved = RANKS[i]; break; } }
    const sponsorRate = (achieved.id === "red" || achieved.id === "crown") ? 0.10 : 0.12;
    const teamBonus = Math.floor(payPV * sponsorRate); // CV = PV
    const nextCarry = Math.max(0, powerPV - payPV);

    const target = RANKS.find((r) => r.id === targetRank) || RANKS[0];
    const gap = Math.max(0, target.pv - payPV);

    return { lSales, lPV, rSales, rPV, lTotal, rTotal, powerPV, payPV, powerSide, paySide, achieved, sponsorRate, teamBonus, nextCarry, target, gap };
  }, [qtyL, qtyR, carryPV, carrySide, targetRank]);

  const reset = () => { setQtyL({}); setQtyR({}); setCarryPV(0); };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "'Pretendard','Gothic A1','Noto Sans KR',sans-serif" }}>
      <div className="bg-gradient-to-r from-[#8f4f5a] via-[#b76e79] to-[#caa0a8] text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/15 grid place-items-center"><Calculator className="w-5 h-5" /></div>
          <div className="leading-tight mr-auto">
            <div className="font-bold tracking-tight">매출 · 승급 계산기</div>
            <div className="text-[11px] text-white/60">제품 판매 수량 → PV·매출·후원수당·목표 승급 자동 계산</div>
          </div>
          <button onClick={reset} className="text-white/80 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10">초기화</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* 이월 실적 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3"><ArrowRightLeft size={16} className="text-[#b76e79]" /><h2 className="text-sm font-bold text-slate-700">전월 이월 실적 (대실적 잔액)</h2></div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">이월 PV</span>
              <input type="number" min="0" value={carryPV || ""} onChange={(e) => setCarryPV(Math.max(0, parseInt(e.target.value || "0", 10) || 0))} placeholder="0"
                className="w-40 px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200 tabular-nums" />
            </div>
            <div className="flex items-center gap-1.5">
              {[["left", "좌측"], ["right", "우측"]].map(([k, l]) => (
                <button key={k} onClick={() => setCarrySide(k)} className={`px-3 py-2 text-xs font-semibold rounded-lg border ${carrySide === k ? "bg-[#b76e79] text-white border-[#b76e79]" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{l}에 합산</button>
              ))}
            </div>
          </div>
        </div>

        {/* 제품 입력 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3"><Package size={16} className="text-[#b76e79]" /><h2 className="text-sm font-bold text-slate-700">당월 판매 입력 (회원가 · PV = CV)</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="text-[11px] text-slate-400 border-b border-slate-100">
                  <th className="text-left font-semibold py-2 pl-1">제품</th>
                  <th className="text-right font-semibold py-2 px-2">회원가</th>
                  <th className="text-right font-semibold py-2 px-2">PV</th>
                  <th className="text-center font-semibold py-2 px-1">좌측 수량</th>
                  <th className="text-center font-semibold py-2 px-1">우측 수량</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50">
                    <td className="py-1.5 pl-1 text-slate-700">{p.name}</td>
                    <td className="py-1.5 px-2 text-right tabular-nums text-slate-500">{won(p.price)}</td>
                    <td className="py-1.5 px-2 text-right tabular-nums text-slate-400">{pvfmt(p.pv)}</td>
                    <td className="py-1.5 px-1 text-center">
                      <input type="number" min="0" value={qtyL[p.id] || ""} onChange={(e) => setQ("left", p.id, e.target.value)} placeholder="0"
                        className="w-16 px-2 py-1.5 text-sm text-center rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200 tabular-nums" />
                    </td>
                    <td className="py-1.5 px-1 text-center">
                      <input type="number" min="0" value={qtyR[p.id] || ""} onChange={(e) => setQ("right", p.id, e.target.value)} placeholder="0"
                        className="w-16 px-2 py-1.5 text-sm text-center rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200 tabular-nums" />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-xs font-bold text-slate-600">
                  <td className="py-2 pl-1" colSpan={3}>당월 합계</td>
                  <td className="py-2 px-1 text-center tabular-nums text-[#9d5963]">{pvfmt(calc.lPV)} PV</td>
                  <td className="py-2 px-1 text-center tabular-nums text-[#9d5963]">{pvfmt(calc.rPV)} PV</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* 정산 결과 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3"><TrendingUp size={16} className="text-[#b76e79]" /><h2 className="text-sm font-bold text-slate-700">당월 정산</h2></div>
            <div className="space-y-2 text-sm">
              <Row k={`좌측 (매출 ${won(calc.lSales)}원)`} v={`${pvfmt(calc.lTotal)} PV`} />
              <Row k={`우측 (매출 ${won(calc.rSales)}원)`} v={`${pvfmt(calc.rTotal)} PV`} />
              <div className="h-px bg-slate-100 my-1" />
              <Row k={`대실적 (${calc.powerSide})`} v={`${pvfmt(calc.powerPV)} PV`} />
              <Row k={`소실적 (${calc.paySide})`} v={`${pvfmt(calc.payPV)} PV`} strong />
              <div className="h-px bg-slate-100 my-1" />
              <div className="flex items-center justify-between bg-rose-50 rounded-xl px-3 py-2.5">
                <span className="text-xs font-semibold text-[#9d5963]">예상 후원수당 (소실적 × {Math.round(calc.sponsorRate * 100)}%)</span>
                <span className="text-lg font-extrabold text-[#8f4f5a] tabular-nums">{won(calc.teamBonus)}원</span>
              </div>
              <Row k="익월 이월 대실적" v={`${pvfmt(calc.nextCarry)} PV (${calc.powerSide})`} />
            </div>
          </div>

          {/* 승급 & 목표 플래너 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3"><Target size={16} className="text-[#b76e79]" /><h2 className="text-sm font-bold text-slate-700">승급 · 목표 플래너</h2></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500">현재 달성 직급</span>
              <span className="text-sm font-bold text-[#8f4f5a]">{calc.achieved.name}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-slate-500 shrink-0">목표 직급</span>
              <select value={targetRank} onChange={(e) => setTargetRank(e.target.value)}
                className="flex-1 px-2.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200">
                {RANKS.filter((r) => r.pv > 0).map((r) => (<option key={r.id} value={r.id}>{r.name} ({pvfmt(r.pv)} PV)</option>))}
              </select>
            </div>
            {calc.gap === 0 ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-3 text-sm text-emerald-700 font-semibold flex items-center gap-1.5">
                <Sparkles size={15} /> 목표 직급 {calc.target.name} 조건 달성! (소실적 {pvfmt(calc.payPV)} PV)
              </div>
            ) : (
              <div>
                <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2.5 text-sm text-amber-700 mb-2">
                  목표까지 부족한 소실적 <b className="tabular-nums">{pvfmt(calc.gap)} PV</b>
                </div>
                <div className="text-[11px] text-slate-400 mb-1.5">소실적 라인({calc.paySide})에 아래 중 하나만큼 추가 판매 시 달성:</div>
                <div className="space-y-1">
                  {["pkg254", "premium", "ampoule20", "serum"].map((id) => {
                    const p = PRODUCTS.find((x) => x.id === id);
                    const need = Math.ceil(calc.gap / p.pv);
                    return (
                      <div key={id} className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-slate-50">
                        <span className="text-slate-600">{p.name}</span>
                        <span className="font-bold text-[#9d5963] tabular-nums">+{need.toLocaleString()}개</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[11px] text-slate-400 leading-relaxed">
          ※ 회원가 기준 · CV = PV 동일 취급. 이 계산기는 <b>후원수당(소실적 기준)</b>과 승급을 중심으로 안내합니다. 직접추천·패스트·매칭·품위유지 등 전체 수당 구조는 [트리 시뮬레이터]에서 확인하세요. 후원수당율은 매니아~블루다이아 12% / 레드다이아·크라운 10%이며, 실제 수당·수익은 개인 활동 실적에 따라 달라집니다.
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, strong }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500 text-[13px]">{k}</span>
      <span className={`tabular-nums ${strong ? "font-bold text-[#8f4f5a]" : "font-medium text-slate-700"}`}>{v}</span>
    </div>
  );
}
