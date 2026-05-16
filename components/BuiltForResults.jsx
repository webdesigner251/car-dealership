"use client";

import { useEffect, useState } from "react";

const stats = [
  {
    value: 127,
    prefix: "",
    suffix: "+",
    label: "Dealerships Powered",
  },
  {
    value: 34,
    prefix: "+",
    suffix: "%",
    label: "Avg Lead Conversion Lift",
  },
  {
    value: 18,
    prefix: "$",
    suffix: "M",
    label: "Revenue Generated",
  },
];

function Counter({ target, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / 100;

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / 100);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function BuiltForResults() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6 py-24">
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* Glow Rings */}
      <div className="absolute w-[900px] h-[900px] border border-[#b4101d]/10 rounded-full animate-pulse" />
      <div className="absolute w-[650px] h-[650px] border border-[#b4101d]/10 rounded-full" />

      <div className="relative z-10 max-w-7xl w-full text-center">
        
        {/* header — items animated on scroll */}
          <header className="animate-header text-center mb-[clamp(48px,8vw,80px)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
                <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full inline-block"
                style={{ background: "#B30E1C", animation: "dotPulse 2.2s ease-in-out infinite" }} />
                Built for Results
            </div>

            <h2 className="animate-title m-0 text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px,9vw,82px)",
                lineHeight: 0.97,
                letterSpacing: "0.02em",
              }}>
              The numbers don&apos;t{" "}
              <span style={{ color: "#b4101d" }}>whisper.</span>
            </h2>

            <p className="animate-title mt-5 text-base leading-[1.65] max-w-[520px] text-center mx-auto"
              style={{ color: "rgba(255,255,255,0.42)" }}>
              Auto Forge connects your DMS, CRM, inventory feeds, and customer
              touchpoints into a single intelligent ecosystem — and gives every
              team in your store a smarter weapon.
            </p>
          </header>

        {/* Stats Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 transition-all duration-500 hover:-translate-y-4 hover:border-[#b4101d]/50 hover:shadow-[0_0_50px_rgba(255,106,0,0.15)]"
            >
              <div className="text-6xl md:text-7xl font-black">
                <Counter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>

              <p className="mt-5 text-xs uppercase tracking-[0.35em] text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}