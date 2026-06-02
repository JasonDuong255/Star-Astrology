-- =====================================================================
-- Tử Vi MVP — schema khởi tạo (profiles + charts + RLS + triggers)
-- Chạy trong Supabase SQL Editor hoặc qua `supabase db push`.
-- =====================================================================

-- ---------- PROFILES ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());

-- Tự tạo profile khi đăng ký user mới
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- CHARTS ----------
create table if not exists public.charts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text,
  gender text not null check (gender in ('male', 'female')),
  calendar_type text not null check (calendar_type in ('solar', 'lunar')),
  birth_date date not null,
  birth_time_index int not null check (birth_time_index between 0 and 12),
  is_leap_month boolean not null default false,
  language text not null default 'vi-VN',
  summary jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists charts_user_id_created_at_idx
  on public.charts (user_id, created_at desc);

alter table public.charts enable row level security;

drop policy if exists "charts_select_own" on public.charts;
create policy "charts_select_own" on public.charts
  for select using (user_id = auth.uid());

drop policy if exists "charts_insert_own" on public.charts;
create policy "charts_insert_own" on public.charts
  for insert with check (user_id = auth.uid());

drop policy if exists "charts_update_own" on public.charts;
create policy "charts_update_own" on public.charts
  for update using (user_id = auth.uid());

drop policy if exists "charts_delete_own" on public.charts;
create policy "charts_delete_own" on public.charts
  for delete using (user_id = auth.uid());

-- updated_at tự cập nhật khi sửa
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists charts_set_updated_at on public.charts;
create trigger charts_set_updated_at
  before update on public.charts
  for each row execute function public.set_updated_at();
