"use client";

import dynamic from "next/dynamic";
import type { ChartInput } from "@/lib/iztro/types";

// react-iztro dùng API trình duyệt → bắt buộc tải client-only (ssr: false),
// nếu render phía server sẽ lỗi "window is not defined".
const Iztrolabe = dynamic(
  () => import("react-iztro").then((m) => m.Iztrolabe),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[480px] w-[480px] items-center justify-center text-ink/60">
        Đang vẽ lá số…
      </div>
    ),
  },
);

export default function IztrolabeClient({ input }: { input: ChartInput }) {
  return (
    <div className="iztro-frame">
      <Iztrolabe
        birthday={input.birthDate}
        birthTime={input.birthTimeIndex}
        birthdayType={input.calendarType}
        gender={input.gender}
        isLeapMonth={input.isLeapMonth ?? false}
        lang={input.language ?? "vi-VN"}
      />
    </div>
  );
}
