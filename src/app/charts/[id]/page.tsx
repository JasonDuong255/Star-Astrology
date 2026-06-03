import { notFound, redirect } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { createClient } from "@/lib/supabase/server";
import ChartResult from "@/components/chart/ChartResult";
import type { ChartInput } from "@/lib/iztro/types";

export const dynamic = "force-dynamic";

export default async function ChartDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirect=/charts/${params.id}`);

  const { data: chart, error } = await supabase
    .from("charts")
    .select("*")
    .eq("id", params.id)
    .single();
  if (error || !chart) notFound();

  const input: ChartInput = {
    name: chart.name ?? undefined,
    gender: chart.gender,
    calendarType: chart.calendar_type,
    birthDate: chart.birth_date,
    birthTimeIndex: chart.birth_time_index,
    isLeapMonth: chart.is_leap_month ?? false,
    language: chart.language ?? "vi-VN",
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1180px] px-5 py-12">
        <p className="eyebrow">Lá số đã lưu</p>
        <div className="mt-4">
          <ChartResult input={input} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
