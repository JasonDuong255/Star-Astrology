import { notFound, redirect } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import { createClient } from "@/lib/supabase/server";
import ChartResult from "@/components/chart/ChartResult";
import LuanGiaiButton from "@/components/chart/LuanGiaiButton";
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
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-4 font-serif text-2xl font-bold">
          {input.name || "Lá số tử vi"}
        </h1>
        <ChartResult input={input} actions={<LuanGiaiButton />} />
      </main>
    </>
  );
}
