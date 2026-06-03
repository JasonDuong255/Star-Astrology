"use client";

import { useMemo } from "react";
import { buildChartInfo, castChart } from "@/lib/iztro/cast";
import type { ChartInput } from "@/lib/iztro/types";

function Stat({
  label,
  value,
  accent,
  wide,
}: {
  label: string;
  value: string;
  accent?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2 lg:col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-wide text-fg-faint">{label}</dt>
      <dd
        className={`mt-1 text-sm font-medium ${accent ? "text-brass" : "text-fg"}`}
      >
        {value}
      </dd>
    </div>
  );
}

export default function ChartInfoPanel({ input }: { input: ChartInput }) {
  const items = useMemo(() => {
    try {
      return buildChartInfo(castChart(input));
    } catch {
      return [];
    }
  }, [input]);

  return (
    <section className="rounded-2xl border border-line bg-surface/60 p-6">
      <h3 className="font-serif text-xl text-fg">Tổng quan lá số</h3>
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
        <Stat label="Giới tính" value={input.gender === "male" ? "Nam" : "Nữ"} />
        {items.map((it) => (
          <Stat
            key={it.label}
            label={it.label}
            value={it.value}
            accent={it.accent}
            wide={it.label.startsWith("Can chi")}
          />
        ))}
      </dl>
      {input.hourUnknown ? (
        <p className="mt-5 rounded-lg border border-line px-3 py-2 text-xs leading-relaxed text-fg-faint">
          Giờ sinh chưa rõ. Một số sao và cung có thể sai lệch, kết quả mang
          tính tham khảo.
        </p>
      ) : null}
    </section>
  );
}
