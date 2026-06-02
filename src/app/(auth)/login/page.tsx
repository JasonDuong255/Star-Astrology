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
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center font-serif text-2xl font-bold">Đăng nhập</h1>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <AuthForm
          supabase={supabase}
          defaultMode="login"
          onSuccess={() => router.push(redirect)}
        />
      </div>
      <p className="mt-4 text-center text-sm text-white/60">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="text-gold hover:underline">
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
