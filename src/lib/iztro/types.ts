export type Gender = "male" | "female";
export type CalendarType = "solar" | "lunar";
export type Language =
  | "vi-VN"
  | "zh-CN"
  | "zh-TW"
  | "en-US"
  | "ja-JP"
  | "ko-KR";

/** Tham số đầu vào để lập lá số — đủ để tái dựng lá số deterministic. */
export interface ChartInput {
  name?: string;
  gender: Gender;
  calendarType: CalendarType;
  /** Định dạng YYYY-MM-DD (dương lịch hoặc âm lịch tuỳ calendarType). */
  birthDate: string;
  /** Chỉ số canh giờ 0–12 theo quy ước iztro. */
  birthTimeIndex: number;
  /** Chỉ dùng khi calendarType = "lunar". */
  isLeapMonth?: boolean;
  /** Người dùng không rõ giờ sinh — khi đó dùng canh giờ mặc định. */
  hourUnknown?: boolean;
  /** Nơi sinh (tham khảo, không ảnh hưởng cách an sao của iztro). */
  birthPlace?: string;
  language?: Language;
}

/** Tóm tắt lá số để hiển thị nhanh trong danh sách. */
export interface ChartSummary {
  fiveElementsClass?: string; // ngũ hành cục
  soulPalaceBranch?: string; // địa chi cung mệnh
  bodyPalaceBranch?: string; // địa chi cung thân
  soul?: string; // mệnh chủ
  body?: string; // thân chủ
  zodiac?: string; // con giáp
  sign?: string; // cung hoàng đạo
  ganzhi?: string; // can chi (tứ trụ)
}
