"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#050507] text-white"
      style={{ zIndex: 9999 }}
    >
      <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-white/10 bg-white/4 px-10 py-12 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#b4101d]/20 bg-[#0b0b0d]">
          <div className="absolute inset-0 rounded-full border border-white/10 opacity-40 animate-spin" />
          <img
            src="./logo.svg"
            alt="Auto Forge logo"
            className="relative h-20 w-20 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
