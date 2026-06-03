"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FloppyDisk } from "@phosphor-icons/react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import type { ChartInput } from "@/lib/iztro/types";
import { buildSummary, castChart } from "@/lib/iztro/cast";

export default function SaveChartButton({ input }: { input: ChartInput }) {
  const { requireAuth, supabase } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    if (!supabase) {
      setError("Chưa cấu hình Supabase.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Bạn cần đăng nhập để lưu lá số.");

      const summary = buildSummary(castChart(input));
      const { data, error } = await supabase
        .from("charts")
        .insert({
          user_id: user.id,
          name: input.name ?? null,
          gender: input.gender,
          calendar_type: input.calendarType,
          birth_date: input.birthDate,
          birth_time_index: input.birthTimeIndex,
          is_leap_month: input.isLeapMonth ?? false,
          language: input.language ?? "vi-VN",
          summary,
        })
        .select("id")
        .single();
      if (error) throw error;

      const id = (data as { id: string } | null)?.id;
      router.push(id ? `/charts/${id}` : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => requireAuth(save)} disabled={busy}>
        <FloppyDisk size={16} weight="bold" />
        {busy ? "Đang lưu…" : "Lưu lá số"}
      </Button>
      {error && <span className="text-sm text-cinnabar">{error}</span>}
    </div>
  );
}
