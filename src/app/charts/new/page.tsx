"use client";

import { useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ChartForm from "@/components/chart/ChartForm";
import ChartResult from "@/components/chart/ChartResult";
import SaveChartButton from "@/components/chart/SaveChartButton";
import { ChartEmpty, ChartError, ChartLoading } from "@/components/chart/ChartStates";
import { castChart } from "@/lib/iztro/cast";
import type { ChartInput } from "@/lib/iztro/types";

type Phase = "empty" | "loading" | "error" | "done";

const RITUAL_MS = 850;

export default function NewChartPage() {
  const [input, setInput] = useState<ChartInput | null>(null);
  const [phase, setPhase] = useState<Phase>("empty");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleCast(next: ChartInput) {
    setInput(next);
    setErrorMsg(null);
    setPhase("loading");
    window.setTimeout(() => {
      try {
        castChart(next); // xác thực dữ liệu trước khi vẽ
        setPhase("done");
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : null);
        setPhase("error");
      }
    }, RITUAL_MS);
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1180px] px-5 py-12">
        <header className="max-w-2xl">
          <p className="eyebrow">An lá số</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-fg md:text-4xl">
            Lập lá số tử vi
          </h1>
          <p className="mt-3 text-fg-muted">
            Miễn phí, không cần đăng nhập để xem. Đăng nhập khi muốn lưu hoặc
            luận giải.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="h-fit rounded-2xl border border-line bg-surface/60 p-6 lg:sticky lg:top-24">
            <ChartForm
              onCast={handleCast}
              initial={input ?? undefined}
              submitting={phase === "loading"}
            />
          </div>

          <div>
            {phase === "empty" && <ChartEmpty />}
            {phase === "loading" && <ChartLoading />}
            {phase === "error" && (
              <ChartError
                message={errorMsg ?? undefined}
                onRetry={() => setPhase("empty")}
              />
            )}
            {phase === "done" && input && (
              <ChartResult
                input={input}
                saveSlot={<SaveChartButton input={input} />}
              />
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
