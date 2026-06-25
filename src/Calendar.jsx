import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, CalendarDays, Clock } from "lucide-react";
import { supabase } from "./supabaseClient";

// events 구조: { id, date:"YYYY-MM-DD", time:"HH:MM", title, memo, created_by }
const WD = ["일", "월", "화", "수", "목", "금", "토"];
const pad = (n) => String(n).padStart(2, "0");
const ymd = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const todayStr = () => { const t = new Date(); return ymd(t.getFullYear(), t.getMonth(), t.getDate()); };

export default function Calendar({ canEdit = false, userId = null }) {
  const [view, setView] = useState(() => { const t = new Date(); return { y: t.getFullYear(), m: t.getMonth() }; });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(todayStr());
  const [form, setForm] = useState({ id: null, time: "", title: "", memo: "" });
  const [busy, setBusy] = useState(false);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*").order("date").order("time");
    if (!error) setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    const ch = supabase.channel("events-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => fetchEvents())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const cells = useMemo(() => {
    const start = new Date(view.y, view.m, 1).getDay();
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const arr = [];
    for (let i = 0; i < start; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(ymd(view.y, view.m, d));
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [view]);

  const eventsByDate = useMemo(() => {
    const map = {};
    for (const e of events) { (map[e.date] = map[e.date] || []).push(e); }
    Object.values(map).forEach((list) => list.sort((a, b) => (a.time || "99").localeCompare(b.time || "99")));
    return map;
  }, [events]);

  const dayEvents = eventsByDate[selected] || [];
  const moveMonth = (delta) => setView((v) => { const d = new Date(v.y, v.m + delta, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  const goToday = () => { const t = new Date(); setView({ y: t.getFullYear(), m: t.getMonth() }); setSelected(todayStr()); };
  const resetForm = () => setForm({ id: null, time: "", title: "", memo: "" });

  const submit = async () => {
    if (!form.title.trim() || !canEdit) return;
    setBusy(true);
    if (form.id) {
      await supabase.from("events").update({ time: form.time, title: form.title.trim(), memo: form.memo.trim() }).eq("id", form.id);
    } else {
      await supabase.from("events").insert({ date: selected, time: form.time, title: form.title.trim(), memo: form.memo.trim(), created_by: userId });
    }
    await fetchEvents();
    setBusy(false); resetForm();
  };
  const editEvent = (e) => canEdit && setForm({ id: e.id, time: e.time || "", title: e.title, memo: e.memo || "" });
  const removeEvent = async (id) => { if (!canEdit) return; await supabase.from("events").delete().eq("id", id); await fetchEvents(); if (form.id === id) resetForm(); };

  const selDateLabel = (() => {
    const [y, m, d] = selected.split("-").map(Number);
    return `${y}년 ${m}월 ${d}일 (${WD[new Date(y, m - 1, d).getDay()]})`;
  })();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "'Pretendard','Gothic A1','Noto Sans KR',sans-serif" }}>
      <div className="bg-gradient-to-r from-[#8f4f5a] via-[#b76e79] to-[#caa0a8] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-2.5 flex-wrap">
          <div className="w-9 h-9 rounded-xl bg-white/15 grid place-items-center"><CalendarDays className="w-5 h-5" /></div>
          <div className="leading-tight mr-auto">
            <div className="font-bold tracking-tight">윤앤정 팀 일정표</div>
            <div className="text-[11px] text-white/60">회원·팀 공유 일정 · 실시간 동기화{canEdit ? "" : " · 보기 전용(일정 등록은 관리자만)"}</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[1fr_360px] gap-5 items-start">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button onClick={() => moveMonth(-1)} className="w-9 h-9 rounded-lg border border-slate-200 grid place-items-center text-slate-600 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
              <div className="text-lg font-bold tabular-nums w-32 text-center">{view.y}년 {view.m + 1}월</div>
              <button onClick={() => moveMonth(1)} className="w-9 h-9 rounded-lg border border-slate-200 grid place-items-center text-slate-600 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <button onClick={goToday} className="text-sm font-semibold text-[#9d5963] px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100">오늘</button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WD.map((w, i) => (<div key={w} className={`text-center text-xs font-semibold py-1 ${i === 0 ? "text-rose-500" : i === 6 ? "text-blue-500" : "text-slate-400"}`}>{w}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <div key={i} className="min-h-[78px] rounded-lg" />;
              const d = Number(date.split("-")[2]);
              const dow = i % 7;
              const evs = eventsByDate[date] || [];
              const isToday = date === todayStr();
              const isSel = date === selected;
              return (
                <button key={i} onClick={() => { setSelected(date); resetForm(); }}
                  className={`min-h-[78px] rounded-lg border p-1.5 text-left align-top transition ${isSel ? "border-[#b76e79] bg-rose-50/50 ring-1 ring-[#b76e79]" : "border-slate-100 hover:bg-slate-50"}`}>
                  <div className={`text-xs font-semibold mb-1 inline-flex items-center justify-center ${isToday ? "bg-[#b76e79] text-white w-5 h-5 rounded-full" : dow === 0 ? "text-rose-500" : dow === 6 ? "text-blue-500" : "text-slate-600"}`}>{d}</div>
                  <div className="space-y-0.5">
                    {evs.slice(0, 3).map((e) => (<div key={e.id} className="text-[10px] leading-tight truncate px-1 py-0.5 rounded bg-[#b76e79]/12 text-[#9d5963]">{e.time ? e.time + " " : ""}{e.title}</div>))}
                    {evs.length > 3 && <div className="text-[10px] text-slate-400 px-1">+{evs.length - 3}개 더</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:sticky lg:top-4">
          <h2 className="text-sm font-bold text-slate-700 mb-1">{selDateLabel}</h2>
          <p className="text-[11px] text-slate-400 mb-4">{loading ? "불러오는 중…" : `이 날의 일정 ${dayEvents.length}건`}</p>

          <div className="space-y-2 mb-5">
            {!loading && dayEvents.length === 0 && <p className="text-xs text-slate-400">등록된 일정이 없습니다.</p>}
            {dayEvents.map((e) => (
              <div key={e.id} className="rounded-xl border border-slate-100 px-3 py-2.5 flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {e.time && <span className="text-[11px] font-semibold text-[#9d5963] inline-flex items-center gap-0.5"><Clock className="w-3 h-3" />{e.time}</span>}
                    <span className="text-sm font-semibold text-slate-700 truncate">{e.title}</span>
                  </div>
                  {e.memo && <p className="text-xs text-slate-500 mt-0.5 break-words">{e.memo}</p>}
                </div>
                {canEdit && <button onClick={() => editEvent(e)} className="text-[11px] text-slate-400 hover:text-[#9d5963] shrink-0">수정</button>}
                {canEdit && <button onClick={() => removeEvent(e.id)} className="text-slate-300 hover:text-rose-500 shrink-0"><Trash2 className="w-4 h-4" /></button>}
              </div>
            ))}
          </div>

          {canEdit ? (
            <div className="border-t border-slate-100 pt-4">
              <div className="text-xs font-bold text-slate-500 mb-2">{form.id ? "일정 수정" : "새 일정 추가"}</div>
              <div className="flex gap-2 mb-2">
                <input type="time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} className="w-36 shrink-0 px-2.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200" />
                <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} placeholder="일정 제목 (예: 사업설명회)" className="flex-1 min-w-0 px-2.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200" />
              </div>
              <textarea value={form.memo} onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))} placeholder="메모 (선택)" rows={2} className="w-full px-2.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-200 mb-2 resize-none" />
              <div className="flex gap-2">
                <button onClick={submit} disabled={!form.title.trim() || busy} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#b76e79] hover:bg-[#9d5963] disabled:opacity-40 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  <Plus className="w-4 h-4" />{busy ? "저장 중…" : form.id ? "수정 저장" : "추가"}
                </button>
                {form.id && <button onClick={resetForm} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-50">취소</button>}
              </div>
            </div>
          ) : (
            <div className="border-t border-slate-100 pt-4 text-[12px] text-slate-400">일정 등록·수정은 관리자(대표님·이정효·이윤희)만 가능합니다. 회원은 일정을 확인하실 수 있어요.</div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[11px] text-slate-400 leading-relaxed">
          ※ 모든 승인 회원이 같은 일정을 실시간으로 공유합니다. 일정 등록·수정은 관리자만 가능합니다.
        </div>
      </div>
    </div>
  );
}
