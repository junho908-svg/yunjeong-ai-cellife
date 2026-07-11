import { ShieldCheck, Info } from "lucide-react";

// 2025년 비아블 공식 후원수당 지급 분포 (소득 공시) — 금액 수준별
const ROWS = [
  { label: "1억원 이상", avg: 283204457, n: 41 },
  { label: "5천만 ~ 1억원", avg: 71073626, n: 51 },
  { label: "3천만 ~ 5천만원", avg: 38378288, n: 78 },
  { label: "2천만 ~ 3천만원", avg: 24084182, n: 78 },
  { label: "1천만 ~ 2천만원", avg: 14458941, n: 150 },
  { label: "500만 ~ 1천만원", avg: 6836524, n: 339 },
  { label: "100만 ~ 500만원", avg: 2155662, n: 1858 },
  { label: "50만 ~ 100만원", avg: 714392, n: 2008 },
  { label: "0원 초과 ~ 50만원", avg: 131222, n: 12299 },
  { label: "미지급 (0원)", avg: 0, n: 39215 },
];
const TOTAL = 56117;
const won = (n) => n.toLocaleString("ko-KR");
const pct = (n) => ((n / TOTAL) * 100).toFixed(1);

export default function IncomeDisclosure() {
  return (
    <div className="bg-slate-50" style={{ fontFamily: "'Pretendard','Gothic A1','Noto Sans KR',sans-serif" }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-1.5">
            <Info size={16} className="text-[#b76e79]" />
            <h2 className="text-sm font-bold text-slate-700">2025년 비아블 공식 후원수당 지급 공시 (실제 분포)</h2>
          </div>
          <p className="text-[12.5px] text-slate-500 leading-relaxed mb-4">
            위 시뮬레이터는 <b>구조상 가능한 금액</b>을 보여줍니다. 아래는 회사가 공시한 <b>2025년 실제 후원수당 지급 분포</b>로, 대부분은 소액이거나 미지급이며 극소수만 고소득입니다. 시작 전 현실적인 기대치로 참고하세요.
          </p>

          {/* 핵심 요약 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            {[
              { k: "전체 판매원", v: "56,117명" },
              { k: "후원수당 미지급", v: "39,215명", s: "약 70%" },
              { k: "전체 평균(연)", v: "563,969원" },
              { k: "연 1억 이상", v: "41명", s: "0.07%" },
            ].map((c) => (
              <div key={c.k} className="rounded-xl bg-rose-50/60 border border-rose-100 px-3 py-2.5">
                <div className="text-[11px] text-slate-500">{c.k}</div>
                <div className="text-[15px] font-extrabold text-[#8f4f5a] leading-tight">{c.v}</div>
                {c.s && <div className="text-[10px] text-slate-400">{c.s}</div>}
              </div>
            ))}
          </div>

          {/* 금액 수준별 표 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[440px]">
              <thead>
                <tr className="text-[11px] text-slate-400 border-b border-slate-100">
                  <th className="text-left font-semibold py-2 pl-1">연간 후원수당 구간</th>
                  <th className="text-right font-semibold py-2 px-2">1인당 평균(연)</th>
                  <th className="text-right font-semibold py-2 px-2">판매원수</th>
                  <th className="text-right font-semibold py-2 pl-2 pr-1">비중</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className={`border-b border-slate-50 ${r.label.startsWith("미지급") ? "bg-slate-50/60" : ""}`}>
                    <td className="py-1.5 pl-1 text-slate-700">{r.label}</td>
                    <td className="py-1.5 px-2 text-right tabular-nums text-slate-500">{r.avg ? won(r.avg) + "원" : "-"}</td>
                    <td className="py-1.5 px-2 text-right tabular-nums text-slate-600">{won(r.n)}명</td>
                    <td className="py-1.5 pl-2 pr-1 text-right tabular-nums text-slate-400">{pct(r.n)}%</td>
                  </tr>
                ))}
                <tr className="text-xs font-bold text-slate-700">
                  <td className="py-2 pl-1">합계</td>
                  <td className="py-2 px-2 text-right tabular-nums">563,969원</td>
                  <td className="py-2 px-2 text-right tabular-nums">56,117명</td>
                  <td className="py-2 pl-2 pr-1 text-right tabular-nums">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed mt-4 flex gap-1.5">
            <ShieldCheck size={14} className="text-[--gold] shrink-0 mt-0.5" style={{ color: "#caa07a" }} />
            <span>본 자료는 회사가 공시한 2025년 <b>후원수당</b>(7대 보상 중 하나) 실지급 분포입니다. 개인의 실제 소득은 활동·기간·조직에 따라 크게 달라지며, 특정 수익을 보장하지 않습니다. 네트워크 마케팅 참여는 신중한 판단이 필요합니다.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
