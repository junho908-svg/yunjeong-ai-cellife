import { createClient } from "@supabase/supabase-js";

// 윤앤정 AI 셀라이프 — Supabase 연결 (공개용 publishable 키: 클라이언트 노출 안전)
const SUPABASE_URL = "https://isoptaquidzcatyjvhaa.supabase.co";
const SUPABASE_KEY = "sb_publishable_Tlz0zdq-Jmw_bXgEQbBeng_WdwpjLwN";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
