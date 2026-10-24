/** Top-down sports car, nose pointing right. Pure SVG so it scales crisply. */
export default function CarSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 180"
      className={className}
      role="img"
      aria-label="Sports car, top view"
    >
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff7a3d" />
          <stop offset="0.5" stopColor="#ff4d12" />
          <stop offset="1" stopColor="#c7340a" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d1117" />
          <stop offset="1" stopColor="#2b3442" />
        </linearGradient>
        <filter id="car-shadow" x="-10%" y="-20%" width="120%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <rect x="28" y="22" width="356" height="148" rx="60" fill="#000" opacity="0.55" filter="url(#car-shadow)" />

      {/* Tyres */}
      <g fill="#0b0b0b">
        <rect x="70" y="8" width="62" height="24" rx="8" />
        <rect x="70" y="148" width="62" height="24" rx="8" />
        <rect x="282" y="10" width="56" height="22" rx="8" />
        <rect x="282" y="148" width="56" height="22" rx="8" />
      </g>

      {/* Body */}
      <path
        d="M30 46 C30 24 52 16 84 16 L286 18 C338 20 372 42 384 72 L388 90 L384 108 C372 138 338 160 286 162 L84 164 C52 164 30 156 30 134 Z"
        fill="url(#car-body)"
      />

      {/* Side mirrors */}
      <g fill="#c7340a">
        <path d="M236 18 L248 4 L258 6 L252 20 Z" />
        <path d="M236 162 L248 176 L258 174 L252 160 Z" />
      </g>

      {/* Cabin: rear window, roof, windscreen */}
      <path d="M118 46 C126 40 140 38 150 38 L150 142 C140 142 126 140 118 134 Z" fill="url(#car-glass)" />
      <rect x="150" y="38" width="80" height="104" rx="10" fill="#e8481a" />
      <path d="M230 38 C258 40 278 54 286 70 L286 110 C278 126 258 140 230 142 Z" fill="url(#car-glass)" />
      <path d="M238 48 C256 52 270 60 276 72" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="3" fill="none" />

      {/* Engine vents */}
      <g stroke="#7a1f04" strokeWidth="3" strokeLinecap="round">
        <line x1="54" y1="62" x2="96" y2="62" />
        <line x1="54" y1="76" x2="96" y2="76" />
        <line x1="54" y1="104" x2="96" y2="104" />
        <line x1="54" y1="118" x2="96" y2="118" />
      </g>

      {/* Racing stripe */}
      <rect x="290" y="84" width="88" height="12" rx="6" fill="#ffffff" opacity="0.85" />

      {/* Headlights and tail lights */}
      <g fill="#fff6c8">
        <path d="M362 38 L382 62 L372 64 L352 42 Z" />
        <path d="M362 142 L382 118 L372 116 L352 138 Z" />
      </g>
      <g fill="#ff1a1a">
        <rect x="30" y="30" width="8" height="30" rx="3" />
        <rect x="30" y="120" width="8" height="30" rx="3" />
      </g>
    </svg>
  );
}
