import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true nếu đã cấu hình biến môi trường Supabase. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** Supabase client phía trình duyệt (dùng cookie để giữ session). */
export function createClient() {
  return createBrowserClient(url!, anonKey!);
}
