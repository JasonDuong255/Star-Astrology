/**
 * ThienBan — thiên bàn hình học thủ công: các vòng đồng, 12 vạch cung,
 * thước tiết khí, chòm sao và sao trung tâm. Dùng làm điểm nhấn hero
 * (ambient, xoay rất chậm) và trạng thái loading (xoay nhẹ rõ hơn).
 *
 * Toàn bộ tiếng Việt / hình học — không chứa ký tự Trung.
 */

const C = 200;

function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

const MAJOR_TICKS = Array.from({ length: 12 }, (_, i) => i * 30);
const FINE_TICKS = Array.from({ length: 60 }, (_, i) => i * 6).filter(
  (a) => a % 30 !== 0,
);

// 12 địa chi (giờ) — chữ Việt, đặt quanh vành ngoài.
const CHI = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

// Chòm sao Bắc Đẩu (7 sao) — toạ độ đặt tay trong vùng trong.
const DIPPER = [
  { x: 150, y: 150 },
  { x: 172, y: 138 },
  { x: 196, y: 142 },
  { x: 214, y: 158 },
  { x: 230, y: 176 },
  { x: 236, y: 204 },
  { x: 214, y: 214 },
];

export default function ThienBan({
  variant = "ambient",
  className = "",
}: {
  variant?: "ambient" | "loading";
  className?: string;
}) {
  const loading = variant === "loading";

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
      className={`text-brass ${className}`}
    >
      {/* quầng sáng nền */}
      <defs>
        <radialGradient id="tb-glow" cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor="var(--color-brass)" stopOpacity="0.16" />
          <stop offset="60%" stopColor="var(--color-brass)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="var(--color-brass)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r="196" fill="url(#tb-glow)" />

      {/* Vành ngoài + thước tiết khí (xoay chậm thuận) */}
      <g
        className={loading ? "animate-spin-load" : "animate-rotate-slow"}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx={C} cy={C} r="190" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
        <circle cx={C} cy={C} r="178" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
        {FINE_TICKS.map((a) => {
          const p1 = polar(190, a);
          const p2 = polar(183, a);
          return (
            <line
              key={`f${a}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.4"
            />
          );
        })}
        {MAJOR_TICKS.map((a) => {
          const p1 = polar(190, a);
          const p2 = polar(174, a);
          return (
            <line
              key={`m${a}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="currentColor"
              strokeWidth="1.4"
            />
          );
        })}
        {/* cung sáng quét — chỉ ở chế độ loading */}
        {loading ? (
          <path
            d={`M ${polar(190, -42).x} ${polar(190, -42).y} A 190 190 0 0 1 ${polar(190, 42).x} ${polar(190, 42).y}`}
            stroke="var(--color-brass-soft)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        ) : null}
      </g>

      {/* Vành 12 cung + nhãn địa chi (xoay ngược, chậm hơn) */}
      <g
        className={loading ? "" : "animate-rotate-rev"}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx={C} cy={C} r="150" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <circle
          cx={C}
          cy={C}
          r="150"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.3"
          strokeDasharray="2 7"
        />
        {MAJOR_TICKS.map((a, i) => {
          const inner = polar(150, a);
          const outer = polar(174, a);
          const label = polar(162, a + 15);
          return (
            <g key={`c${a}`}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.55"
              />
              <text
                x={label.x}
                y={label.y}
                fill="currentColor"
                fontSize="9"
                opacity="0.65"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}
              >
                {CHI[i]}
              </text>
            </g>
          );
        })}
      </g>

      {/* Chòm Bắc Đẩu + vòng trong (tĩnh) */}
      <g opacity={loading ? 0 : 1} className="transition-opacity duration-500">
        <circle cx={C} cy={C} r="110" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
        <polyline
          points={DIPPER.map((p) => `${p.x},${p.y}`).join(" ")}
          stroke="var(--color-brass-soft)"
          strokeWidth="0.9"
          opacity="0.55"
          fill="none"
        />
        {DIPPER.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === 0 || i === 6 ? 2.4 : 1.8}
            fill="var(--color-brass-soft)"
            className="animate-twinkle"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </g>

      {/* Sao trung tâm (la bàn) */}
      <g style={{ transformOrigin: "200px 200px" }}>
        <circle cx={C} cy={C} r="34" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        {[0, 45, 90, 135].map((a) => {
          const p1 = polar(34, a);
          const p2 = polar(34, a + 180);
          return (
            <line
              key={a}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.4"
            />
          );
        })}
        <path
          d={`M 200 178 L 206 200 L 200 222 L 194 200 Z`}
          fill="currentColor"
        />
        <path
          d={`M 178 200 L 200 194 L 222 200 L 200 206 Z`}
          fill="currentColor"
          opacity="0.7"
        />
        <circle cx={C} cy={C} r="3" fill="var(--color-brass-soft)" />
      </g>
    </svg>
  );
}
