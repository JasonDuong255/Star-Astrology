/**
 * Sigil — dấu hiệu thương hiệu tối giản: vòng thiên bàn + sao bắc cực 4 cánh.
 * SVG hình học đơn giản (không phải icon vẽ tay tuỳ tiện).
 */
export default function Sigil({
  size = 26,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="16" cy="16" r="9.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      {[0, 90, 180, 270].map((a) => (
        <line
          key={a}
          x1="16"
          y1="2.5"
          x2="16"
          y2="5.5"
          stroke="currentColor"
          strokeWidth="1"
          transform={`rotate(${a} 16 16)`}
        />
      ))}
      <path
        d="M16 8.5 L17.4 14.6 L23.5 16 L17.4 17.4 L16 23.5 L14.6 17.4 L8.5 16 L14.6 14.6 Z"
        fill="currentColor"
      />
    </svg>
  );
}
