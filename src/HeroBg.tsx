export default function HeroBg() {
  // Chart line points — rising trend with volatility (normalized 0–1)
  const points = [
    [0.0, 0.82],
    [0.04, 0.78],
    [0.08, 0.80],
    [0.12, 0.74],
    [0.16, 0.70],
    [0.20, 0.72],
    [0.24, 0.65],
    [0.28, 0.60],
    [0.32, 0.63],
    [0.36, 0.55],
    [0.40, 0.50],
    [0.44, 0.53],
    [0.48, 0.44],
    [0.52, 0.40],
    [0.56, 0.43],
    [0.60, 0.35],
    [0.64, 0.30],
    [0.68, 0.33],
    [0.72, 0.25],
    [0.76, 0.20],
    [0.80, 0.22],
    [0.84, 0.16],
    [0.88, 0.12],
    [0.92, 0.15],
    [0.96, 0.10],
    [1.0,  0.06],
  ];

  const W = 1200;
  const H = 700;

  const toSvg = ([x, y]: number[]) =>
    `${x * W},${y * H}`;

  const linePath = "M " + points.map(toSvg).join(" L ");

  // Area fill path (closed below)
  const areaPath =
    linePath +
    ` L ${W},${H} L 0,${H} Z`;

  // Bar chart columns in the background
  const bars = [0.05, 0.12, 0.19, 0.26, 0.33, 0.40, 0.47, 0.54, 0.61, 0.68, 0.75, 0.82, 0.89, 0.96];
  const barHeights = [0.35, 0.50, 0.42, 0.60, 0.48, 0.65, 0.55, 0.70, 0.58, 0.75, 0.62, 0.80, 0.68, 0.88];

  // Scatter particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    cx: (((i * 137.5) % 100) / 100) * W,
    cy: (((i * 97.3) % 100) / 100) * H,
    r: 1 + ((i * 53) % 3),
    opacity: 0.15 + ((i * 31) % 40) / 100,
    delay: ((i * 0.17) % 2).toFixed(2),
    dur: (1.5 + ((i * 0.23) % 1.5)).toFixed(2),
  }));

  // Vertical grid lines
  const gridLines = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  const gridLinesH = [0.2, 0.4, 0.6, 0.8];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        {/* Main line glow */}
        <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur1" />
          <feGaussianBlur stdDeviation="10" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Secondary softer glow */}
        <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Bar glow */}
        <filter id="glow-bar">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for area fill */}
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Gradient for bar fill */}
        <linearGradient id="bar-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff3a3a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff3a3a" stopOpacity="0.05" />
        </linearGradient>

        {/* Overall scene fade-in */}
        <clipPath id="scene-clip">
          <rect width={W} height={H} />
        </clipPath>
      </defs>

      {/* ── Background grid ── */}
      <g opacity="0.06" stroke="#ffffff" strokeWidth="0.5">
        {gridLines.map((x) => (
          <line key={x} x1={x * W} y1={0} x2={x * W} y2={H} />
        ))}
        {gridLinesH.map((y) => (
          <line key={y} x1={0} y1={y * H} x2={W} y2={y * H} />
        ))}
      </g>

      {/* ── Bar chart (background layer) ── */}
      <g filter="url(#glow-bar)">
        {bars.map((x, i) => {
          const bh = barHeights[i] * H * 0.55;
          const bw = W * 0.03;
          return (
            <rect
              key={i}
              x={x * W - bw / 2}
              y={H - bh}
              width={bw}
              height={bh}
              fill="url(#bar-fill)"
              rx="2"
            >
              <animate
                attributeName="opacity"
                values="0.4;0.7;0.4"
                dur={`${2 + (i % 3) * 0.5}s`}
                begin={`${(i * 0.15).toFixed(2)}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        })}
      </g>

      {/* ── Area fill under the line ── */}
      <path d={areaPath} fill="url(#area-fill)" clipPath="url(#scene-clip)" />

      {/* ── Secondary line (white, soft) ── */}
      <path
        d={linePath}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.18"
        filter="url(#glow-soft)"
        clipPath="url(#scene-clip)"
      />

      {/* ── Main neon line (red/orange) ── */}
      <path
        d={linePath}
        fill="none"
        stroke="#ff4444"
        strokeWidth="2.5"
        filter="url(#glow-line)"
        clipPath="url(#scene-clip)"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.85;1;0.85"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* ── Bright core line (crisp center) ── */}
      <path
        d={linePath}
        fill="none"
        stroke="#ff8888"
        strokeWidth="1"
        strokeOpacity="0.7"
        clipPath="url(#scene-clip)"
      />

      {/* ── Data point dots on line ── */}
      {points
        .filter((_, i) => i % 3 === 0)
        .map(([x, y], i) => (
          <circle
            key={i}
            cx={x * W}
            cy={y * H}
            r="3"
            fill="#ff4444"
            opacity="0.9"
            filter="url(#glow-line)"
          >
            <animate
              attributeName="r"
              values="2.5;4;2.5"
              dur={`${1.8 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

      {/* ── Tip glow (most recent / highest point) ── */}
      <circle cx={W} cy={0.06 * H} r="12" fill="#ff3a3a" opacity="0.15" filter="url(#glow-soft)" />
      <circle cx={W} cy={0.06 * H} r="5" fill="#ff6666" opacity="0.8" filter="url(#glow-line)">
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* ── Scattered particles ── */}
      {particles.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#ff4444" opacity={p.opacity}>
          <animate
            attributeName="opacity"
            values={`${p.opacity};${Math.min(p.opacity * 2.5, 0.6)};${p.opacity}`}
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* ── Right-side vertical glow bar ── */}
      <rect x={W * 0.78} y={0} width={W * 0.22} height={H} fill="url(#area-fill)" opacity="0.4" />
    </svg>
  );
}
