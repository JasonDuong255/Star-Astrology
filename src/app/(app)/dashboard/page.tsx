import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
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
      <main className="mx-auto max-w-[1180px] px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Lịch sử lá số</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-fg md:text-4xl">
              Lá số của tôi
            </h1>
          </div>
          <Link href="/charts/new">
            <Button>
              <Plus size={16} weight="bold" /> Lập lá số mới
            </Button>
          </Link>
        </div>

        {charts.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-line px-6 py-16 text-center text-fg-muted">
            Chưa có lá số nào được lưu. Hãy lập lá số đầu tiên của bạn.
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {charts.map((c) => (
              <li
                key={c.id}
                className="group flex flex-col rounded-2xl border border-line bg-surface/60 p-5 transition hover:border-brass/40"
              >
                <h3 className="font-serif text-xl text-fg">
                  {c.name || "Lá số không tên"}
                </h3>
                <p className="mt-1.5 text-sm text-fg-muted">
                  {c.gender === "male" ? "Nam" : "Nữ"} ·{" "}
                  {c.calendar_type === "solar" ? "DL" : "ÂL"} {c.birth_date}
                </p>
                <p className="mt-0.5 text-sm text-fg-faint">
                  {timeOptionLabel(c.birth_time_index)}
                </p>
                {c.summary?.fiveElementsClass ? (
                  <p className="mt-3 text-xs text-brass">
                    {c.summary.fiveElementsClass}
                    {c.summary.soul ? ` · Mệnh chủ ${c.summary.soul}` : ""}
                  </p>
                ) : null}

                <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
                  <Link href={`/charts/${c.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      Xem lá số
                    </Button>
                  </Link>
                  <DeleteChartButton id={c.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
