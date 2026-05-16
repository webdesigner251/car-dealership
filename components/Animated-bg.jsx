"use client";

export default function AnimatedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        width="903"
        height="1287"
        viewBox="0 0 903 1287"
        className="absolute inset-0 w-full h-full opacity-30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="glow"
            x="0"
            y="0"
            width="155"
            height="89"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="17" />
          </filter>
        </defs>

        {/* TOP LINE */}
        <path
          d="M 0,64.35 L 160.6,64.35 A 62.53,62.53 0 0 1 196.89,75.96 L 583.24,351.28 A 30.92,30.92 0 0 0 632.1,326.1 L 632.1,94.35 A 30,30 0 0 1 662.1,64.35 L 903,64.35"
          stroke="rgba(255,106,0,0.18)"
          strokeWidth="1"
          fill="none"
        />

        <path
          d="M 0,64.35 L 160.6,64.35 A 62.53,62.53 0 0 1 196.89,75.96 L 583.24,351.28 A 30.92,30.92 0 0 0 632.1,326.1 L 632.1,94.35 A 30,30 0 0 1 662.1,64.35 L 903,64.35"
          stroke="#ff6a00"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="animate-line"
        />

        {/* BOTTOM RIGHT */}
        <path
          d="M 903,1029.6 L 662.1,1029.6 A 30,30 0 0 0 632.1,1059.6 L 632.1,1287"
          stroke="rgba(255,106,0,0.18)"
          strokeWidth="1"
          fill="none"
        />

        <path
          d="M 903,1029.6 L 662.1,1029.6 A 30,30 0 0 0 632.1,1059.6 L 632.1,1287"
          stroke="#ff6a00"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="animate-line-slow"
        />

        {/* BOTTOM LEFT */}
        <path
          d="M 0,965.25 L 195.9,965.25 A 29.95,29.95 0 0 1 216.53,1016.91 L 0,1222.65"
          stroke="rgba(255,106,0,0.18)"
          strokeWidth="1"
          fill="none"
        />

        <path
          d="M 0,965.25 L 195.9,965.25 A 29.95,29.95 0 0 1 216.53,1016.91 L 0,1222.65"
          stroke="#ff6a00"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="animate-line-fast"
        />
      </svg>
    </div>
  );
}