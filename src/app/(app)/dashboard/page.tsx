import Link from "next/link";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import { createClient } from "@/lib/supabase/server";
import { timeOptionLabel } from "@/lib/iztro/timeIndex";
import DeleteChartButton from "@/components/chart/DeleteChartButton";
import { Button } from "@/components/ui/Button";
import type { ChartSummary, Gender, CalendarType } from "@/lib/iztro/types";

export const dynamic = "force-dynamic";

interface ChartRow {
  id: string;
  name: string | null;
  gender: Gender;
  calendar_type: CalendarType;
  birth_date: string;
  birth_time_index: number;
  summary: ChartSummary | null;
  created_at: string;
}

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/dashboard");

  const { data } = await supabase
    .from("charts")
    .select("*")
    .order("created_at", { ascending: false });
  const charts = (data ?? []) as ChartRow[];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold">Lá số của tôi</h1>
          <Link href="/charts/new">
            <Button>+ Lập lá số mới</Button>
          </Link>
        </div>

        {charts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/60">
            Chưa có lá số nào được lưu. Hãy lập lá số đầu tiên của bạn!
          </div>
        ) : (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {charts.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-medium text-white">
                  {c.name || "Lá số không tên"}
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  {c.gender === "male" ? "Nam" : "Nữ"} ·{" "}
                  {c.calendar_type === "solar" ? "DL" : "ÂL"} {c.birth_date} ·{" "}
                  {timeOptionLabel(c.birth_time_index)}
                </p>
                {c.summary?.fiveElementsClass ? (
                  <p className="mt-1 text-xs text-gold-soft">
                    {c.summary.fiveElementsClass}
                    {c.summary.soul ? ` · Mệnh chủ: ${c.summary.soul}` : ""}
                  </p>
                ) : null}

                <div className="mt-4 flex items-center gap-2">
                  <Link href={`/charts/${c.id}`}>
                    <Button variant="secondary">Xem</Button>
                  </Link>
                  <DeleteChartButton id={c.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
