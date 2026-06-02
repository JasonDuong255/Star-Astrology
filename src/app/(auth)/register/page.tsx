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
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-center font-serif text-2xl font-bold">
          Tạo tài khoản
        </h1>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <AuthForm
            supabase={supabase}
            defaultMode="register"
            onSuccess={() => router.push("/dashboard")}
          />
        </div>
        <p className="mt-4 text-center text-sm text-white/60">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-gold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </main>
    </>
  );
}
