// Abstract AI logo — static SVG
// Rounded square with overlapping triple-arc node-graph pattern

export default function LogoCube({ size = 36 }: { size?: number }) {
  const s  = size;
  const cx = s / 2, cy = s / 2;
  const r  = s * 0.42;   // orbit radius for offset circles
  const rc = s * 0.38;   // each circle radius

  // Three overlapping translucent circles at 120° apart
  const orbs = [0, 120, 240].map(deg => {
    const a = (Math.PI / 180) * (deg - 90);
    return { x: cx + r * 0.38 * Math.cos(a), y: cy + r * 0.38 * Math.sin(a) };
  });

  // Node points: center + 6 around at two radii
  const inner = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (i * 60);
    return { x: cx + r * 0.52 * Math.cos(a), y: cy + r * 0.52 * Math.sin(a) };
  });
  const outer = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (i * 60 + 30);
    return { x: cx + r * 0.88 * Math.cos(a), y: cy + r * 0.88 * Math.sin(a) };
  });

  const rr = s * 0.22; // corner radius for rounded square

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${s} ${s}`}
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Biz.AI Logo"
    >
      <defs>
        <linearGradient id="ab-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#312E81" />
          <stop offset="50%"  stopColor="#5B21B6" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>

        <linearGradient id="ab-arc1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="ab-arc2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#6EE7B7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="ab-arc3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#F0ABFC" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
        </linearGradient>

        <clipPath id="ab-clip">
          <rect x="0" y="0" width={s} height={s} rx={rr} ry={rr} />
        </clipPath>

        <filter id="ab-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(91,33,182,0.45)" />
        </filter>

        <filter id="ab-glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background: rounded square */}
      <rect x="0" y="0" width={s} height={s} rx={rr} ry={rr}
        fill="url(#ab-bg)" filter="url(#ab-shadow)" />

      {/* Clipped abstract content */}
      <g clipPath="url(#ab-clip)">

        {/* Three overlapping translucent orbs — abstract AI layer concept */}
        <circle cx={orbs[0].x} cy={orbs[0].y} r={rc} fill="url(#ab-arc1)" />
        <circle cx={orbs[1].x} cy={orbs[1].y} r={rc} fill="url(#ab-arc2)" />
        <circle cx={orbs[2].x} cy={orbs[2].y} r={rc} fill="url(#ab-arc3)" />

        {/* Connection lines: inner nodes to center */}
        {inner.map((p, i) => (
          <line key={`ic-${i}`}
            x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
        ))}

        {/* Connection lines: inner to adjacent outer nodes */}
        {inner.map((p, i) => {
          const o1 = outer[i];
          const o2 = outer[(i + 5) % 6];
          return (
            <g key={`io-${i}`}>
              <line x1={p.x} y1={p.y} x2={o1.x} y2={o1.y}
                stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
              <line x1={p.x} y1={p.y} x2={o2.x} y2={o2.y}
                stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
            </g>
          );
        })}

        {/* Outer nodes */}
        {outer.map((p, i) => (
          <circle key={`on-${i}`} cx={p.x} cy={p.y} r={s * 0.025}
            fill="rgba(255,255,255,0.35)" />
        ))}

        {/* Inner nodes */}
        {inner.map((p, i) => (
          <circle key={`in-${i}`} cx={p.x} cy={p.y} r={s * 0.032}
            fill="rgba(255,255,255,0.6)" filter="url(#ab-glow)" />
        ))}

        {/* Center node */}
        <circle cx={cx} cy={cy} r={s * 0.07}
          fill="white" fillOpacity="0.92" filter="url(#ab-glow)" />
        <circle cx={cx} cy={cy} r={s * 0.04}
          fill="white" />
      </g>
    </svg>
  );
}
