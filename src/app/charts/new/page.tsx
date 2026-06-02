"use client";

import { useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import ChartForm from "@/components/chart/ChartForm";
import ChartResult from "@/components/chart/ChartResult";
import SaveChartButton from "@/components/chart/SaveChartButton";
import LuanGiaiButton from "@/components/chart/LuanGiaiButton";
import type { ChartInput } from "@/lib/iztro/types";

export default function NewChartPage() {
  const [input, setInput] = useState<ChartInput | null>(null);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-serif text-2xl font-bold">Lập lá số</h1>
        <p className="mt-1 text-sm text-white/60">
          Miễn phí, không cần đăng nhập. Đăng nhập chỉ cần khi lưu hoặc luận giải.
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6">
            <ChartForm onCast={setInput} initial={input ?? undefined} />
          </div>
          <div>
            {input ? (
              <ChartResult
                input={input}
                actions={
                  <>
                    <SaveChartButton input={input} />
                    <LuanGiaiButton />
                  </>
                }
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/15 text-center text-white/50">
                Nhập thông tin bên trái rồi bấm “Lập lá số”
                <br />
                để xem lá số tại đây.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
