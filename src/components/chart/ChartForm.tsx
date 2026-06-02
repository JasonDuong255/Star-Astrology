"use client";

import { FormEvent, useState } from "react";
import { chartInputSchema } from "@/lib/validations/chart";
import type { CalendarType, ChartInput, Gender } from "@/lib/iztro/types";
import { TIME_OPTIONS } from "@/lib/iztro/timeIndex";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";

export default function ChartForm({
  onCast,
  initial,
}: {
  onCast: (input: ChartInput) => void;
  initial?: Partial<ChartInput>;
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
  const [isLeapMonth, setIsLeapMonth] = useState(initial?.isLeapMonth ?? false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = chartInputSchema.safeParse({
      name,
      gender,
      calendarType,
      birthDate,
      birthTimeIndex,
      isLeapMonth,
      language: "vi-VN",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ");
      return;
    }
    setError(null);
    onCast({ ...parsed.data, name: parsed.data.name || undefined } as ChartInput);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Họ tên (tuỳ chọn)">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Giới tính">
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </Select>
        </Field>
        <Field label="Loại lịch">
          <Select
            value={calendarType}
            onChange={(e) => setCalendarType(e.target.value as CalendarType)}
          >
            <option value="solar">Dương lịch</option>
            <option value="lunar">Âm lịch</option>
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Ngày sinh"
          hint={calendarType === "lunar" ? "Theo âm lịch" : "Theo dương lịch"}
        >
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </Field>
        <Field label="Giờ sinh (canh giờ)">
          <Select
            value={birthTimeIndex}
            onChange={(e) => setBirthTimeIndex(Number(e.target.value))}
          >
            {TIME_OPTIONS.map((o) => (
              <option key={o.index} value={o.index}>
                {o.label} · {o.range}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {calendarType === "lunar" && (
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={isLeapMonth}
            onChange={(e) => setIsLeapMonth(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/10"
          />
          Sinh vào tháng nhuận
        </label>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" size="lg" className="w-full">
        Lập lá số
      </Button>
    </form>
  );
}
