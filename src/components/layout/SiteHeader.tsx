"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X, ArrowRight, SignOut } from "@phosphor-icons/react";
import { useAuth } from "@/components/auth/AuthProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Sigil from "@/components/brand/Sigil";

const NAV = [
  { label: "Luận giải", href: "/charts/new" },
  { label: "Kiến thức", href: "/#kien-thuc" },
  { label: "Lịch sử lá số", href: "/dashboard" },
];

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-brass">
      <Sigil size={26} />
      <span className="font-serif text-xl font-semibold leading-none tracking-wide text-fg">
        Tử Vi
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const { user, requireAuth, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5">
        <Wordmark />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-sm text-fg-muted transition hover:text-fg"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brass transition-all duration-300 ease-expo group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {!loading && user ? (
            <button
              onClick={() => signOut()}
              className="hidden h-9 items-center gap-1.5 rounded-xl border border-line px-3 text-sm text-fg-muted transition hover:border-line-strong hover:text-fg sm:flex"
            >
              <SignOut size={15} />
              Đăng xuất
            </button>
          ) : (
            <button
              onClick={() => requireAuth()}
              className="hidden h-9 items-center rounded-xl px-3 text-sm text-fg-muted transition hover:text-fg sm:flex"
            >
              Đăng nhập
            </button>
          )}

          <Link
            href="/charts/new"
            className="hidden h-9 items-center gap-1.5 rounded-xl bg-cta px-4 text-sm font-medium text-cta-ink shadow-[0_8px_24px_-10px_var(--color-cta)] transition hover:bg-cta-soft active:translate-y-px sm:inline-flex"
          >
            Lập lá số ngay
            <ArrowRight size={15} weight="bold" />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-xl border border-line text-fg-muted lg:hidden"
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {/* Menu di động */}
      {open ? (
        <div className="border-t border-line bg-surface/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-[1180px] flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-fg-muted transition hover:bg-surface-2 hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-line" />
            <Link
              href="/charts/new"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-cta px-4 text-sm font-medium text-cta-ink"
            >
              Lập lá số ngay
              <ArrowRight size={15} weight="bold" />
            </Link>
            {!loading && user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="mt-1 inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-line text-sm text-fg-muted"
              >
                <SignOut size={15} /> Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  requireAuth();
                }}
                className="mt-1 inline-flex h-11 items-center justify-center rounded-xl border border-line text-sm text-fg-muted"
              >
                Đăng nhập
              </button>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
