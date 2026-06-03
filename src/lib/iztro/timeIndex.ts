/** Tuỳ chọn canh giờ theo quy ước timeIndex của iztro (0-12). */
export interface TimeOption {
  index: number;
  /** Tên địa chi (giờ) tiếng Việt. */
  label: string;
  /** Khoảng giờ tương ứng. */
  range: string;
}

export const TIME_OPTIONS: TimeOption[] = [
  { index: 0, label: "Tý (sớm)", range: "00:00 - 00:59" },
  { index: 1, label: "Sửu", range: "01:00 - 02:59" },
  { index: 2, label: "Dần", range: "03:00 - 04:59" },
  { index: 3, label: "Mão (Mẹo)", range: "05:00 - 06:59" },
  { index: 4, label: "Thìn", range: "07:00 - 08:59" },
  { index: 5, label: "Tỵ", range: "09:00 - 10:59" },
  { index: 6, label: "Ngọ", range: "11:00 - 12:59" },
  { index: 7, label: "Mùi", range: "13:00 - 14:59" },
  { index: 8, label: "Thân", range: "15:00 - 16:59" },
  { index: 9, label: "Dậu", range: "17:00 - 18:59" },
  { index: 10, label: "Tuất", range: "19:00 - 20:59" },
  { index: 11, label: "Hợi", range: "21:00 - 22:59" },
  { index: 12, label: "Tý (khuya)", range: "23:00 - 23:59" },
];

/** Chuyển giờ (0-23) sang timeIndex của iztro. 23h = Tý khuya (12). */
export function hourToTimeIndex(hour: number): number {
  if (hour === 23) return 12;
  return Math.floor((hour + 1) / 2);
}

export function timeOptionLabel(index: number): string {
  const opt = TIME_OPTIONS.find((o) => o.index === index);
  return opt ? `${opt.label} (${opt.range})` : `Giờ ${index}`;
}
