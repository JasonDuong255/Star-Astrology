"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function SiteHeader() {
  const { user, requireAuth, signOut, loading } = useAuth();

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-bold text-gold"
        >
          <span aria-hidden>✦</span> Tử Vi
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/charts/new"
            className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Lập lá số
          </Link>

          {!loading && user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Lá số của tôi
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              onClick={() => requireAuth()}
              className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
            >
              Đăng nhập
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
