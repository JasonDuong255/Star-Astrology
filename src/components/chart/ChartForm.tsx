"use client";

import { FormEvent, useState } from "react";
import { Info } from "@phosphor-icons/react";
import { chartInputSchema } from "@/lib/validations/chart";
import type { CalendarType, ChartInput, Gender } from "@/lib/iztro/types";
import { TIME_OPTIONS } from "@/lib/iztro/timeIndex";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";

const DEFAULT_UNKNOWN_HOUR = 6; // Ngọ — mốc trung tính khi chưa rõ giờ

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`h-9 rounded-lg text-sm transition ${
            value === o.value
              ? "bg-surface-2 font-medium text-fg shadow-sink"
              : "text-fg-muted hover:text-fg"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function ChartForm({
  onCast,
  initial,
  submitting = false,
}: {
  onCast: (input: ChartInput) => void;
  initial?: Partial<ChartInput>;
  submitting?: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [gender, setGender] = useState<Gender>(initial?.gender ?? "male");
  const [calendarType, setCalendarType] = useState<CalendarType>(
    initial?.calendarType ?? "solar",
  );
  const [birthDate, setBirthDate] = useState(initial?.birthDate ?? "");
  const [birthTimeIndex, setBirthTimeIndex] = useState(
    initial?.birthTimeIndex ?? 0,
  );
  const [hourUnknown, setHourUnknown] = useState(initial?.hourUnknown ?? false);
  const [isLeapMonth, setIsLeapMonth] = useState(initial?.isLeapMonth ?? false);
  const [birthPlace, setBirthPlace] = useState(initial?.birthPlace ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = chartInputSchema.safeParse({
      name,
      gender,
      calendarType,
      birthDate,
      birthTimeIndex: hourUnknown ? DEFAULT_UNKNOWN_HOUR : birthTimeIndex,
      isLeapMonth,
      hourUnknown,
      birthPlace,
      language: "vi-VN",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu chưa hợp lệ");
      return;
    }
    setError(null);
    onCast({
      ...parsed.data,
      name: parsed.data.name || undefined,
      birthPlace: parsed.data.birthPlace || undefined,
    } as ChartInput);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Họ tên" htmlFor="name">
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên người được lập lá số"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Giới tính">
          <Segmented<Gender>
            value={gender}
            onChange={setGender}
            options={[
              { value: "male", label: "Nam" },
              { value: "female", label: "Nữ" },
            ]}
          />
        </Field>
        <Field label="Loại lịch">
          <Segmented<CalendarType>
            value={calendarType}
            onChange={setCalendarType}
            options={[
              { value: "solar", label: "Dương lịch" },
              { value: "lunar", label: "Âm lịch" },
            ]}
          />
        </Field>
      </div>

      <Field
        label="Ngày sinh"
        htmlFor="birthDate"
        hint={calendarType === "lunar" ? "Nhập theo âm lịch" : "Nhập theo dương lịch"}
      >
        <Input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </Field>

      {calendarType === "lunar" && (
        <label className="flex items-center gap-2.5 text-sm text-fg-muted">
          <input
            type="checkbox"
            checked={isLeapMonth}
            onChange={(e) => setIsLeapMonth(e.target.checked)}
            className="h-4 w-4 accent-brass"
          />
          Sinh vào tháng nhuận
        </label>
      )}

      <Field label="Giờ sinh (canh giờ)" htmlFor="birthTime">
        <Select
          id="birthTime"
          value={birthTimeIndex}
          disabled={hourUnknown}
          onChange={(e) => setBirthTimeIndex(Number(e.target.value))}
          className={hourUnknown ? "opacity-50" : ""}
        >
          {TIME_OPTIONS.map((o) => (
            <option key={o.index} value={o.index}>
              {o.label} · {o.range}
            </option>
          ))}
        </Select>
      </Field>

      <label className="flex items-center gap-2.5 text-sm text-fg-muted">
        <input
          type="checkbox"
          checked={hourUnknown}
          onChange={(e) => setHourUnknown(e.target.checked)}
          className="h-4 w-4 accent-brass"
        />
        Tôi không rõ giờ sinh
      </label>

      <p className="flex gap-2 rounded-xl border border-line bg-surface px-3.5 py-3 text-xs leading-relaxed text-fg-faint">
        <Info size={16} className="mt-px shrink-0 text-brass" />
        <span>
          Giờ sinh quyết định vị trí cung Mệnh và nhiều sao. Biết giờ càng chính
          xác, lá số càng đáng tin. Chưa rõ giờ, lá số vẫn dựng được nhưng mang
          tính tham khảo.
        </span>
      </p>

      <Field
        label="Nơi sinh"
        htmlFor="birthPlace"
        hint="Tuỳ chọn: để tham khảo, lá số tính theo canh giờ bạn chọn."
      >
        <Input
          id="birthPlace"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          placeholder="Ví dụ: Hà Nội"
        />
      </Field>

      {error && <p className="text-sm text-cinnabar">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Đang an sao…" : "An lá số"}
      </Button>
    </form>
  );
}
