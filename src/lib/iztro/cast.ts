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
