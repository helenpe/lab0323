// Hexagon logo — static SVG, AI solution branding
// Pointy-top hexagon with gradient fill and solution text

export default function LogoCube({ size = 32 }: { size?: number }) {
  const r = size / 2;       // circumradius
  const cx = r, cy = r;     // center

  // Pointy-top hexagon: angles -90, -30, 30, 90, 150, 210 degrees
  const hex = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (-90 + 60 * i);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });
  const pts = hex.map(p => p.join(',')).join(' ');

  // Inner hexagon for stroke ring
  const ri = r * 0.88;
  const hexInner = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (-90 + 60 * i);
    return [cx + ri * Math.cos(angle), cy + ri * Math.sin(angle)];
  });
  const ptsInner = hexInner.map(p => p.join(',')).join(' ');

  const fontMain = r * 0.46;
  const fontSub  = r * 0.28;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Biz.AI Logo"
    >
      <defs>
        {/* Main gradient: indigo → violet (modern AI palette) */}
        <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#4F46E5" />
          <stop offset="55%"  stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        {/* Top-highlight overlay */}
        <linearGradient id="hex-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <clipPath id="hex-clip">
          <polygon points={pts} />
        </clipPath>

        <filter id="hex-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(79,70,229,0.4)" />
        </filter>
      </defs>

      {/* Outer fill */}
      <polygon points={pts} fill="url(#hex-grad)" filter="url(#hex-shadow)" />

      {/* Top-light sheen */}
      <polygon points={pts} fill="url(#hex-highlight)" clipPath="url(#hex-clip)" />

      {/* Inner ring */}
      <polygon points={ptsInner} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />

      {/* Text: "Biz" main + ".AI" sub — representing AI solution brand */}
      <text
        x={cx}
        y={cy - fontSub * 0.3}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={fontMain}
        fontWeight="800"
        fontFamily="'Pretendard', 'Inter', sans-serif"
        letterSpacing="-0.02em"
        style={{ userSelect: 'none' }}
      >
        Biz
      </text>
      <text
        x={cx}
        y={cy + fontMain * 0.72}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(199,210,254,0.92)"
        fontSize={fontSub}
        fontWeight="700"
        fontFamily="'Pretendard', 'Inter', sans-serif"
        letterSpacing="0.08em"
        style={{ userSelect: 'none' }}
      >
        AI SOLUTION
      </text>
    </svg>
  );
}
