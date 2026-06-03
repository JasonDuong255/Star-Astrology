import { astro } from "iztro";
import type { ChartInput, ChartSummary } from "./types";

const DEFAULT_LANG = "vi-VN";

export type Astrolabe = ReturnType<typeof astro.bySolar>;

/**
 * Lập lá số bằng logic của iztro. Trả về đối tượng astrolabe đầy đủ
 * (12 cung, sao, đại vận, tứ hoá...). Luôn mặc định ngôn ngữ vi-VN.
 */
export function castChart(input: ChartInput): Astrolabe {
  const language = input.language ?? DEFAULT_LANG;

  if (input.calendarType === "lunar") {
    return astro.byLunar(
      input.birthDate,
      input.birthTimeIndex,
      input.gender,
      input.isLeapMonth ?? false,
      true, // fixLeap: xử lý tháng nhuận
      language,
    );
  }

  return astro.bySolar(
    input.birthDate,
    input.birthTimeIndex,
    input.gender,
    true, // fixLeap
    language,
  );
}

/** Rút gọn lá số thành summary để lưu/hiển thị danh sách. */
export function buildSummary(a: Astrolabe): ChartSummary {
  return {
    fiveElementsClass: a.fiveElementsClass,
    soulPalaceBranch: a.earthlyBranchOfSoulPalace,
    bodyPalaceBranch: a.earthlyBranchOfBodyPalace,
    soul: a.soul,
    body: a.body,
    zodiac: a.zodiac,
    sign: a.sign,
    ganzhi: a.chineseDate,
  };
}

const YANG_STEMS = new Set(["Giáp", "Bính", "Mậu", "Canh", "Nhâm"]);
const YIN_STEMS = new Set(["Ất", "Đinh", "Kỷ", "Tân", "Quý"]);

function yinYangFromGanzhi(ganzhi?: string): string | undefined {
  if (!ganzhi) return undefined;
  const stem = ganzhi.trim().split(/\s+/)[0];
  if (YANG_STEMS.has(stem)) return "Dương";
  if (YIN_STEMS.has(stem)) return "Âm";
  return undefined;
}

export interface ChartInfoItem {
  label: string;
  value: string;
  accent?: boolean;
}

/** Các chỉ số tổng quan để hiển thị panel mệnh cục cạnh lá số. */
export function buildChartInfo(a: Astrolabe): ChartInfoItem[] {
  const bodyPalace = a.palaces.find((p) => p.isBodyPalace)?.name;
  const yinYang = yinYangFromGanzhi(a.chineseDate);
  const items: ChartInfoItem[] = [];

  if (a.fiveElementsClass)
    items.push({ label: "Bản mệnh (cục)", value: a.fiveElementsClass, accent: true });
  if (yinYang) items.push({ label: "Âm dương", value: yinYang });
  if (a.soul) items.push({ label: "Mệnh chủ", value: a.soul });
  if (a.body) items.push({ label: "Thân chủ", value: a.body });
  if (a.earthlyBranchOfSoulPalace)
    items.push({ label: "Cung Mệnh", value: a.earthlyBranchOfSoulPalace });
  if (bodyPalace) items.push({ label: "Thân cư", value: bodyPalace });
  if (a.zodiac) items.push({ label: "Con giáp", value: a.zodiac });
  if (a.sign) items.push({ label: "Cung hoàng đạo", value: a.sign });
  if (a.chineseDate) items.push({ label: "Can chi (tứ trụ)", value: a.chineseDate });
  if (a.lunarDate) items.push({ label: "Ngày âm lịch", value: a.lunarDate });

  return items;
}
