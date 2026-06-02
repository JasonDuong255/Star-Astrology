# Tử Vi — Hệ thống lập lá số tử vi

Ứng dụng web lập lá số Tử Vi Đẩu Số (Zi Wei Dou Shu) bằng tiếng Việt. Tái sử
dụng logic an sao của thư viện **iztro** và component **react-iztro** để hiển
thị, hệ thống tài khoản/lưu trữ riêng bằng **Supabase**.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript** + **Tailwind CSS**
- **iztro** `^2.5.x` — logic lập lá số (locale `vi-VN`)
- **react-iztro** `^1.4.2` — component `<Iztrolabe>` (chạy client-only)
- **Supabase** (`@supabase/ssr` + `@supabase/supabase-js`) — Auth + Postgres + RLS
- **zod** — validate form

> Ghim React 18 / Next 14 vì react-iztro nhắm React ^18.2.0 (chưa hỗ trợ React 19).

## Lệnh thường dùng

```bash
npm run dev      # chạy dev tại http://localhost:3000
npm run build    # build production (kiểm tra type + SSR)
npm run lint     # eslint
npx tsc --noEmit # type-check nhanh
```

## Cấu trúc

- `src/app` — route (App Router). Trang `charts/new`, `charts/[id]` công khai phần
  lập/xem; `(app)/dashboard` cần đăng nhập; `(auth)/login|register`, `auth/callback`.
- `src/lib/iztro` — `cast.ts` (wrapper `astro.bySolar/byLunar`), `types.ts`, `timeIndex.ts`.
- `src/lib/supabase` — `client.ts` (browser), `server.ts` (RSC), `middleware.ts`.
- `src/components/chart` — `IztrolabeClient` (dynamic, ssr:false), `ChartForm`, `ChartResult`,
  `SaveChartButton`, `LuanGiaiButton` (placeholder), `DeleteChartButton`.
- `src/components/auth` — `AuthProvider` (context + pop-up), `AuthForm`, `LoginDialog`.
- `supabase/migrations/0001_init.sql` — bảng `profiles`, `charts`, RLS, trigger.

## Mô hình quyền (freemium)

- **Miễn phí, không cần đăng nhập**: lập + xem lá số (`charts/new`, render từ state).
- **Cần đăng nhập (mở pop-up `LoginDialog` qua `requireAuth`)**: "Lưu lá số",
  nút "Luận giải lá số" (placeholder — sẽ phát triển sau).
- `middleware.ts` chỉ bảo vệ `/dashboard`. Lá số đã lưu (`charts/[id]`) gated bằng RLS.

## Quy ước quan trọng (iztro)

- `react-iztro` dùng API trình duyệt → LUÔN tải qua `next/dynamic({ ssr: false })`
  (xem `IztrolabeClient.tsx`). Đừng render `<Iztrolabe>` phía server.
- `timeIndex` 0–12: 0 = Tý sớm (00:00–00:59) … 11 = Hợi (21:00–22:59), 12 = Tý khuya
  (23:00–23:59). Xem `src/lib/iztro/timeIndex.ts`.
- `gender`: dùng `"male" | "female"` (iztro chấp nhận theo locale en-US).
- Mặc định ngôn ngữ `vi-VN`.

## Supabase

- Sao chép `.env.local.example` → `.env.local` và điền `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Chạy `supabase/migrations/0001_init.sql` trong SQL Editor (hoặc `supabase db push`).
- Dev: tắt "Confirm email" trong Auth settings để đăng nhập ngay sau khi đăng ký.

## Harness ECC & taste-skill (công cụ dev)

- **ECC**: cài plugin Claude Code → `/plugin marketplace add affaan-m/ECC` rồi
  `/plugin install ecc@ecc`. Rules đã vendor sẵn ở `.claude/rules/ecc/` (xem README).
- **taste-skill**: skill `design-taste-frontend` đã vendor ở `.claude/skills/`. Dùng
  khi dựng/đánh bóng UI (landing, form, dashboard) để tránh giao diện "generic".
