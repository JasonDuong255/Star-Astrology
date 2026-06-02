import { z } from "zod";

export const LANGUAGES = [
  "vi-VN",
  "zh-CN",
  "zh-TW",
  "en-US",
  "ja-JP",
  "ko-KR",
] as const;

export const chartInputSchema = z.object({
  name: z.string().trim().max(100).optional().or(z.literal("")),
  gender: z.enum(["male", "female"]),
  calendarType: z.enum(["solar", "lunar"]),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh không hợp lệ (YYYY-MM-DD)"),
  birthTimeIndex: z.coerce.number().int().min(0).max(12),
  isLeapMonth: z.boolean().optional().default(false),
  language: z.enum(LANGUAGES).default("vi-VN"),
});

export type ChartInputSchema = z.infer<typeof chartInputSchema>;
