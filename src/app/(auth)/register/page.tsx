"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/components/auth/AuthProvider";

export default function RegisterPage() {
  const { supabase } = useAuth();
  const router = useRouter();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-5 py-16">
        <p className="eyebrow text-center">Tài khoản</p>
        <h1 className="mt-3 text-center font-serif text-3xl font-semibold text-fg">
          Tạo tài khoản
        </h1>
        <div className="mt-7 rounded-2xl border border-line bg-surface/60 p-6">
          <AuthForm
            supabase={supabase}
            defaultMode="register"
            onSuccess={() => router.push("/dashboard")}
          />
        </div>
        <p className="mt-5 text-center text-sm text-fg-muted">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-brass hover:underline">
            Đăng nhập
          </Link>
        </p>
      </main>
    </>
  );
}
