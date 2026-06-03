"use client";

import { useState, type ReactNode } from "react";
import type { ChartInput } from "@/lib/iztro/types";
import { timeOptionLabel } from "@/lib/iztro/timeIndex";
import IztrolabeClient from "./IztrolabeClient";
import ChartInfoPanel from "./ChartInfoPanel";
import LuanGiaiButton from "./LuanGiaiButton";

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-fg-muted">
      {children}
    </span>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative -mb-px px-4 py-2.5 text-sm transition ${
        active ? "text-fg" : "text-fg-muted hover:text-fg"
      }`}
    >
      {children}
      {active ? (
        <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brass" />
      ) : null}
    </button>
  );
}

export default function ChartResult({
  input,
  saveSlot,
}: {
  input: ChartInput;
  saveSlot?: ReactNode;
}) {
  const [tab, setTab] = useState<"chart" | "luan">("chart");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-fg">
            {input.name || "Lá số tử vi"}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip>{input.gender === "male" ? "Nam" : "Nữ"}</Chip>
            <Chip>
              {input.calendarType === "solar" ? "Dương lịch" : "Âm lịch"}{" "}
              {input.birthDate}
            </Chip>
            <Chip>
              {input.hourUnknown
                ? "Giờ chưa rõ"
                : timeOptionLabel(input.birthTimeIndex)}
            </Chip>
            {input.birthPlace ? <Chip>{input.birthPlace}</Chip> : null}
          </div>
        </div>
        {saveSlot ? <div className="shrink-0">{saveSlot}</div> : null}
      </div>

      <div role="tablist" className="flex gap-1 border-b border-line">
        <TabBtn active={tab === "chart"} onClick={() => setTab("chart")}>
          Lá số
        </TabBtn>
        <TabBtn active={tab === "luan"} onClick={() => setTab("luan")}>
          Luận giải
        </TabBtn>
      </div>

      {tab === "chart" ? (
        <div className="space-y-6">
          <div className="mx-auto w-full max-w-[900px]">
            <IztrolabeClient input={input} />
          </div>
          <ChartInfoPanel input={input} />
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-surface/60 px-6 py-12 text-center">
          <p className="font-serif text-2xl text-fg">Luận giải lá số</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-muted">
            Phần luận giải chi tiết từng cung đang được phát triển. Đăng nhập để
            được nhắc khi ra mắt.
          </p>
          <div className="mt-6 flex justify-center">
            <LuanGiaiButton />
          </div>
        </div>
      )}
    </div>
  );
}
