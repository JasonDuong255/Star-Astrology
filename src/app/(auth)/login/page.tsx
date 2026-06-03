"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/components/auth/AuthProvider";

function LoginInner() {
  const { supabase } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-5 py-16">
      <p className="eyebrow text-center">Tài khoản</p>
      <h1 className="mt-3 text-center font-serif text-3xl font-semibold text-fg">
        Đăng nhập
      </h1>
      <div className="mt-7 rounded-2xl border border-line bg-surface/60 p-6">
        <AuthForm
          supabase={supabase}
          defaultMode="login"
          onSuccess={() => router.push(redirect)}
        />
      </div>
      <p className="mt-5 text-center text-sm text-fg-muted">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="text-brass hover:underline">
          Đăng ký
        </Link>
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <Suspense>
        <LoginInner />
      </Suspense>
    </>
  );
}
