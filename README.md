# Tử Vi — Hệ thống lập lá số tử vi

Ứng dụng web **lập lá số Tử Vi Đẩu Số** (Zi Wei Dou Shu) bằng tiếng Việt.
Tái sử dụng logic an sao của thư viện [**iztro**](https://github.com/SylarLong/iztro)
và component [**react-iztro**](https://github.com/SylarLong/react-iztro) để hiển thị;
hệ thống tài khoản & lưu trữ riêng dựng bằng **Next.js + Supabase**.

## ✨ Tính năng (MVP)

- **Miễn phí, không cần đăng nhập**: nhập ngày/giờ sinh → an sao → xem lá số 12 cung
  đầy đủ (chính/phụ tinh, tứ hoá, đại vận) bằng tiếng Việt.
- **Đăng nhập (email + mật khẩu)** qua pop-up khi dùng tính năng nâng cao.
- **Lưu & quản lý lá số** theo tài khoản (dashboard).
- **"Luận giải lá số"** — nút placeholder (yêu cầu đăng nhập), sẽ phát triển sau.

## 🧱 Tech stack

| Lớp        | Công nghệ |
|------------|-----------|
| Framework  | Next.js 14 (App Router), React 18, TypeScript |
| UI         | Tailwind CSS |
| Lá số      | iztro `^2.5.x`, react-iztro `^1.4.2` (locale `vi-VN`) |
| Backend    | Supabase (Auth + Postgres + RLS), `@supabase/ssr` |
| Validate   | zod |

> ⚠️ Ghim **React 18 / Next 14** vì react-iztro nhắm React `^18.2.0` (chưa hỗ trợ React 19).

## 🚀 Bắt đầu

```bash
# 1. Cài dependencies
npm install

# 2. Cấu hình môi trường
copy .env.local.example .env.local   # Windows
# rồi điền NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Chạy dev
npm run dev    # http://localhost:3000
```

> Phần **lập + xem lá số** chạy được ngay cả khi chưa cấu hình Supabase.
> Đăng nhập/lưu lá số cần bước cấu hình Supabase bên dưới.

## 🗄️ Cấu hình Supabase

1. Tạo project tại [supabase.com](https://supabase.com) → lấy **Project URL** và
   **anon key** trong *Project Settings → API* → điền vào `.env.local`.
2. Mở **SQL Editor**, dán & chạy nội dung `supabase/migrations/0001_init.sql`
   (tạo bảng `profiles`, `charts`, RLS và trigger). Hoặc dùng Supabase CLI:
   ```bash
   npx supabase db push
   ```
3. (Dev) Vào *Authentication → Providers → Email* và **tắt "Confirm email"**
   để đăng nhập ngay sau khi đăng ký. Khi lên production, bật lại — luồng xác
   thực email đã có sẵn qua `/auth/callback`.

## 📁 Cấu trúc

```
src/
├─ app/
│  ├─ page.tsx                      # landing
│  ├─ (auth)/login | register       # trang auth đầy đủ
│  ├─ auth/callback/route.ts        # xác thực email
│  ├─ charts/new                    # lập + xem lá số (CÔNG KHAI)
│  ├─ charts/[id]                   # xem lá số đã lưu (owner-gated qua RLS)
│  └─ (app)/dashboard               # danh sách lá số (cần đăng nhập)
├─ components/
│  ├─ chart/ (IztrolabeClient, ChartForm, ChartResult,
│  │          SaveChartButton, LuanGiaiButton, DeleteChartButton)
│  ├─ auth/  (AuthProvider, AuthForm, LoginDialog)
│  └─ ui/    (Button, Field, Modal)
├─ lib/
│  ├─ iztro/   (cast.ts, types.ts, timeIndex.ts)
│  ├─ supabase/(client.ts, server.ts, middleware.ts)
│  └─ validations/chart.ts
└─ middleware.ts                    # làm mới session + bảo vệ /dashboard
supabase/migrations/0001_init.sql
```

## 🔐 Mô hình quyền (freemium)

- `charts/new`, `charts/[id]` (lập/xem) — **công khai**, render từ tham số.
- "Lưu lá số" & "Luận giải lá số" — gọi `requireAuth()` → mở pop-up `LoginDialog`
  nếu chưa đăng nhập, chạy tiếp hành động sau khi đăng nhập.
- `middleware.ts` chỉ bảo vệ `/dashboard`. RLS đảm bảo mỗi user chỉ thấy lá số của mình.

## 🧮 Ghi chú iztro

- `react-iztro` chạy **client-only** → nạp qua `next/dynamic({ ssr:false })`
  (xem `src/components/chart/IztrolabeClient.tsx`).
- `timeIndex` 0–12: `0` = Tý sớm (00:00–00:59) … `11` = Hợi (21:00–22:59),
  `12` = Tý khuya (23:00–23:59) — xem `src/lib/iztro/timeIndex.ts`.
- Lá số được **tái dựng từ tham số đầu vào** (deterministic) nên DB chỉ lưu input
  + một `summary` ngắn để hiển thị danh sách.

## 🛠️ Công cụ dev: ECC harness & taste-skill

Đây là cấu hình dành cho **Claude Code** khi phát triển dự án (không ảnh hưởng runtime).

### taste-skill — đã vendor sẵn
Skill `design-taste-frontend` nằm ở `.claude/skills/design-taste-frontend/SKILL.md`.
Dùng khi dựng/đánh bóng UI (landing, form, dashboard) để tránh giao diện "generic".

### ECC harness
ECC chủ yếu cài qua **plugin marketplace** của Claude Code (lệnh interactive — bạn tự chạy):

```text
/plugin marketplace add affaan-m/ECC
/plugin install ecc@ecc
```

Rules KHÔNG tự phân phối qua plugin → đã vendor sẵn các thư mục cần dùng ở
`.claude/rules/ecc/` (`common`, `typescript`). Tinh chỉnh runtime bằng env
(sau khi cài plugin): `ECC_HOOK_PROFILE`, `ECC_DISABLED_HOOKS`.

> Lưu ý: không "chồng" nhiều cách cài ECC (plugin + installer thủ công đầy đủ) — dễ trùng lặp.

## 📜 Lệnh

```bash
npm run dev        # dev server
npm run build      # build production
npm run lint       # eslint
npx tsc --noEmit   # type-check
```

## 🗺️ Roadmap

- [ ] **Luận giải lá số** (thay placeholder) — diễn giải mệnh/thân, cung, sao.
- [ ] Tự render lá số (thay react-iztro) để tuỳ biến UI hoàn toàn.
- [ ] Tương tác đại vận / lưu niên / nguyệt hạn.
- [ ] Chia sẻ lá số công khai (`is_public`).
- [ ] Đa ngôn ngữ (iztro hỗ trợ zh/en/ja/ko/vi).
