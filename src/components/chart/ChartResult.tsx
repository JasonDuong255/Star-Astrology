"use client";

import type { ReactNode } from "react";
import type { ChartInput } from "@/lib/iztro/types";
import { timeOptionLabel } from "@/lib/iztro/timeIndex";
import IztrolabeClient from "./IztrolabeClient";

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
      {children}
    </span>
  );
}

export default function ChartResult({
  input,
  actions,
}: {
  input: ChartInput;
  actions?: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {input.name ? (
          <span className="rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-gold-soft">
            {input.name}
          </span>
        ) : null}
        <Chip>{input.gender === "male" ? "Nam" : "Nữ"}</Chip>
        <Chip>
          {input.calendarType === "solar" ? "Dương lịch" : "Âm lịch"}{" "}
          {input.birthDate}
        </Chip>
        <Chip>{timeOptionLabel(input.birthTimeIndex)}</Chip>
      </div>

      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}

      <div className="overflow-x-auto pb-2">
        <IztrolabeClient input={input} />
      </div>
    </div>
  );
}
