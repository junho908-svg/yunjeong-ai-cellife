import { useState, useEffect } from "react";
import { Users, Check, Crown, Trash2, Clock, ShieldCheck, RefreshCw } from "lucide-react";
import { supabase } from "./supabaseClient";

// members: { id, email, name, phone, approved, role, created_at }
const fmt = (s) => { if (!s) return ""; const d = new Date(s); return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`; };

export default function Members({ currentUserId = null }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);

  const load = async () => {
    const { data, error } = await supabase.from("members").select("*").order("created_at", { ascending: false });
    if (!error) setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setApproved = async (id, val) => { setBusy(id); await supabase.from("members").update({ approved: val }).eq("id", id); await load(); setBusy(null); };
  const setRole = async (id, val) => { setBusy(id); await supabase.from("members").update({ role: val }).eq("id", id); await load(); setBusy(null); };
  const remove = async (id) => { if (!window.confirm("이 회원을 목록에서 삭제할까요? (가입 신청 거절)")) return; setBusy(id); await supabase.from("members").delete().eq("id", id); await load(); setBusy(null); };

  const pending = rows.filter((r) => !r.approved);
  const approved = rows.filter((r) => r.approved);

  const Row = ({ m, kind }) => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-white">
      <div className="w-10 h-10 rounded-full grid place-items-center text-white shrink-0"
        style={{ background: m.role === "admin" ? "linear-gradient(135deg,#caa0a8,#8f4f5a)" : "linear-gradient(135deg,#e7c6cd,#b76e79)" }}>
        {m.role === "admin" ? <Crown size={18} /> : <Users size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-800 truncate">{m.name || "이름 미설정"}</span>
          {m.role === "admin" && <span className="text-[10px] font-bold text-[#8f4f5a] bg-rose-50 border border-rose-200 rounded px-1.5 py-0.5">관리자</span>}
        </div>
        <div className="text-xs text-slate-400 truncate">{m.email} · 가입 {fmt(m.created_at)}</div>
      </div>
      {kind === "pending" ? (
        <div className="flex items-center gap-1.5 shrink-0">
          <button disabled={busy === m.id} onClick={() => setApproved(m.id, true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#b76e79] hover:bg-[#9d5963] disabled:opacity-40 px-3 py-2 rounded-lg">
            <Check size={14} /> 승인
          </button>
          <button disabled={busy === m.id} onClick={() => remove(m.id)}
            className="text-slate-300 hover:text-rose-500 disabled:opacity-40 px-1.5 py-2" title="거절(삭제)"><Trash2 size={16} /></button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 shrink-0">
          {m.id !== currentUserId && (m.role === "admin" ? (
            <button disabled={busy === m.id} onClick={() => setRole(m.id, "member")}
              className="text-xs font-semibold text-[#8f4f5a] border border-rose-200 hover:bg-rose-50 disabled:opacity-40 px-2.5 py-2 rounded-lg">관리자 해제</button>
          ) : (
            <button disabled={busy === m.id} onClick={() => setRole(m.id, "admin")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#8f4f5a] border border-rose-200 hover:bg-rose-50 disabled:opacity-40 px-2.5 py-2 rounded-lg"><Crown size={13} /> 관리자 지정</button>
          ))}
          {m.id !== currentUserId && (
            <button disabled={busy === m.id} onClick={() => setApproved(m.id, false)}
              className="text-xs text-slate-400 hover:text-rose-500 disabled:opacity-40 px-2 py-2 rounded-lg" title="승인 취소">보류</button>
          )}
          {m.id === currentUserId && <span className="text-[11px] text-slate-300 px-2">나</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "'Pretendard','Gothic A1','Noto Sans KR',sans-serif" }}>
      <div className="bg-gradient-to-r from-[#8f4f5a] via-[#b76e79] to-[#caa0a8] text-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/15 grid place-items-center"><Users className="w-5 h-5" /></div>
          <div className="leading-tight mr-auto">
            <div className="font-bold tracking-tight">회원 관리</div>
            <div className="text-[11px] text-white/60">가입 신청 승인 · 관리자 지정 (관리자 전용)</div>
          </div>
          <button onClick={load} className="text-white/80 hover:text-white p-2" title="새로고침"><RefreshCw size={18} /></button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-7">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-[#b76e79]" />
            <h2 className="text-sm font-bold text-slate-700">승인 대기 {pending.length > 0 && <span className="text-[#b76e79]">({pending.length})</span>}</h2>
          </div>
          {loading ? <p className="text-xs text-slate-400 px-1">불러오는 중…</p>
            : pending.length === 0 ? <p className="text-xs text-slate-400 px-1 py-3 bg-white rounded-xl border border-slate-100 text-center">대기 중인 가입 신청이 없습니다.</p>
              : <div className="space-y-2">{pending.map((m) => <Row key={m.id} m={m} kind="pending" />)}</div>}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={16} className="text-[#b76e79]" />
            <h2 className="text-sm font-bold text-slate-700">승인 회원 <span className="text-slate-400">({approved.length})</span></h2>
          </div>
          {loading ? <p className="text-xs text-slate-400 px-1">불러오는 중…</p>
            : approved.length === 0 ? <p className="text-xs text-slate-400 px-1">아직 승인된 회원이 없습니다.</p>
              : <div className="space-y-2">{approved.map((m) => <Row key={m.id} m={m} kind="approved" />)}</div>}
        </section>

        <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[11px] text-slate-400 leading-relaxed">
          ※ 승인하면 회원이 강의실·시뮬레이터·일정표를 이용할 수 있습니다. 관리자로 지정하면 일정 등록·회원 관리 권한이 생깁니다. 본인 계정은 변경할 수 없습니다.
        </div>
      </div>
    </div>
  );
}
