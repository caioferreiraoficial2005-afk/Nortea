import { memo } from "react";

const HeroBg = memo(function HeroBg() {
  const W = 1400;
  const H = 800;
  const GREEN = "#057a41";

  const chartPoints: [number, number][] = [
    [0.0,  0.88],
    [0.05, 0.84],
    [0.10, 0.86],
    [0.15, 0.79],
    [0.20, 0.75],
    [0.25, 0.77],
    [0.30, 0.69],
    [0.35, 0.65],
    [0.40, 0.67],
    [0.45, 0.58],
    [0.50, 0.53],
    [0.55, 0.56],
    [0.60, 0.47],
    [0.65, 0.42],
    [0.70, 0.44],
    [0.75, 0.35],
    [0.80, 0.30],
    [0.85, 0.32],
    [0.90, 0.23],
    [0.95, 0.18],
    [1.00, 0.14],
  ];

  const chart2Points: [number, number][] = chartPoints.map(([x, y]) => [x, Math.min(y + 0.10, 0.98)]);

  const px = (x: number) => x * W;
  const py = (y: number) => y * H;

  const toPath = (pts: [number, number][]) =>
    "M " + pts.map(([x, y]) => `${px(x)},${py(y)}`).join(" L ");

  const linePath  = toPath(chartPoints);
  const line2Path = toPath(chart2Points);
  const areaPath  = linePath + ` L ${px(1)},${py(1)} L ${px(0)},${py(1)} Z`;

  // Barras — apenas estáticas, sem animação individual
  const bars = Array.from({ length: 18 }, (_, i) => {
    const x = 0.04 + i * 0.054;
    const seed = (i * 137 + 31) % 100;
    const h = 0.15 + (seed / 100) * 0.38;
    return { x, h, w: 0.022, highlight: i >= 15 };
  });

  const vLines = [0.15, 0.30, 0.45, 0.60, 0.75, 0.90];
  const hLines = [0.25, 0.50, 0.75];

  // Partículas estáticas — sem animate, sem filter
  const particles = Array.from({ length: 30 }, (_, i) => {
    const seed1 = (i * 137.508) % 1;
    const seed2 = (i * 97.333) % 1;
    return {
      cx: seed1 * W,
      cy: seed2 * H,
      r: 0.8 + ((i * 53) % 3) * 0.4,
      opacity: 0.04 + ((i * 29) % 12) / 100,
      green: i % 7 === 0,
    };
  });

  const diagLines = Array.from({ length: 8 }, (_, i) => {
    const base = 0.08 + i * 0.12;
    return { x1: base, y1: 0, x2: base + 0.25, y2: 1 };
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        {/* Glow apenas na linha principal — um único filter */}
        <filter id="hbg-glow-main" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="hbg-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={GREEN} stopOpacity="0.28" />
          <stop offset="55%"  stopColor={GREEN} stopOpacity="0.08" />
          <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
        </linearGradient>

        <linearGradient id="hbg-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>

        <linearGradient id="hbg-bar-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={GREEN} stopOpacity="0.85" />
          <stop offset="100%" stopColor={GREEN} stopOpacity="0.12" />
        </linearGradient>

        <linearGradient id="hbg-vignette" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#02070e" stopOpacity="1" />
          <stop offset="45%"  stopColor="#02070e" stopOpacity="0.6" />
          <stop offset="70%"  stopColor="#02070e" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#02070e" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="hbg-vignette-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#02070e" stopOpacity="0.5" />
          <stop offset="20%"  stopColor="#02070e" stopOpacity="0" />
          <stop offset="80%"  stopColor="#02070e" stopOpacity="0" />
          <stop offset="100%" stopColor="#02070e" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* 1. Grid */}
      <g stroke="#ffffff" strokeWidth="0.5" opacity="0.04">
        {vLines.map((x) => (
          <line key={`v${x}`} x1={px(x)} y1={0} x2={px(x)} y2={H} />
        ))}
        {hLines.map((y) => (
          <line key={`h${y}`} x1={0} y1={py(y)} x2={W} y2={py(y)} />
        ))}
      </g>

      {/* 2. Linhas diagonais */}
      <g stroke="#ffffff" strokeWidth="0.4" opacity="0.02">
        {diagLines.map((l, i) => (
          <line key={i} x1={px(l.x1)} y1={py(l.y1)} x2={px(l.x2)} y2={py(l.y2)} />
        ))}
      </g>

      {/* 3. Barras — estáticas, sem animate */}
      <g>
        {bars.map((b, i) => {
          const barH = b.h * H * 0.60;
          const barW = b.w * W;
          return (
            <rect
              key={i}
              x={px(b.x) - barW / 2}
              y={H - barH}
              width={barW}
              height={barH}
              fill={b.highlight ? "url(#hbg-bar-green)" : "url(#hbg-bar)"}
              opacity={b.highlight ? 0.9 : 0.6}
              rx="2"
            />
          );
        })}
      </g>

      {/* 4. Área fill */}
      <path d={areaPath} fill="url(#hbg-area)" />

      {/* 5. Linha ghost */}
      <path
        d={line2Path}
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.04"
        strokeDasharray="5 11"
      />

      {/* 6. Linha principal — glow (apenas uma vez, sem animate no glow) */}
      <path
        d={linePath}
        fill="none"
        stroke={GREEN}
        strokeWidth="12"
        strokeOpacity="0.30"
        filter="url(#hbg-glow-main)"
      />

      {/* 7. Linha principal — corpo */}
      <path
        d={linePath}
        fill="none"
        stroke={GREEN}
        strokeWidth="2.2"
        strokeOpacity="0.95"
      >
        {/* Apenas 1 animate na linha inteira — CSS animation seria melhor mas SVG ok aqui */}
        <animate
          attributeName="stroke-opacity"
          values="0.80;1;0.80"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* 8. Fio fino */}
      <path
        d={linePath}
        fill="none"
        stroke={GREEN}
        strokeWidth="0.8"
        strokeOpacity="1"
      />

      {/* 9. Pontos de dados — estáticos, sem halos pulsantes */}
      {chartPoints
        .filter((_, i) => i % 4 === 0)
        .map(([x, y], i) => (
          <circle
            key={i}
            cx={px(x)} cy={py(y)}
            r="3"
            fill={GREEN}
            opacity="0.9"
          />
        ))}

      {/* 10. Ponto de chegada — apenas 1 animate no halo */}
      <g>
        <circle cx={px(1)} cy={py(0.14)} r="18" fill={GREEN} opacity="0.06" filter="url(#hbg-glow-main)">
          <animate attributeName="r" values="14;26;14" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={px(1)} cy={py(0.14)} r="5" fill={GREEN} opacity="1" filter="url(#hbg-glow-main)" />
      </g>

      {/* 11. Partículas — estáticas, sem animate, sem filter */}
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill={p.green ? GREEN : "#ffffff"}
          opacity={p.opacity}
        />
      ))}

      {/* 12. Vignettes */}
      <rect x={0} y={0} width={W} height={H} fill="url(#hbg-vignette)" />
      <rect x={0} y={0} width={W} height={H} fill="url(#hbg-vignette-v)" />
    </svg>
  );
});

export default HeroBg;
