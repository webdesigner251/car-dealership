"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 127, prefix: "", suffix: "+", label: "Dealerships Powered" },
  { value: 34,  prefix: "+", suffix: "%", label: "Avg Lead Conversion Lift" },
  { value: 18,  prefix: "$", suffix: "M", label: "Revenue Generated" },
];

/* Counter — resets to 0 and counts up every time `trigger` flips */
function Counter({ target, prefix = "", suffix = "", trigger }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setCount(0);
    let start = null;
    const duration = 1800;

    const tick = (now) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setCount(target);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, trigger]);

  return <span>{prefix}{count}{suffix}</span>;
}

export default function BuiltForResults() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const cardsRef    = useRef([]);
  const [counterTrigger, setCounterTrigger] = useState(0);

  /* Heading + paragraph scroll-in animation */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const badge = header.querySelector(".bfr-badge");
    const title = header.querySelector(".bfr-title");
    const para  = header.querySelector(".bfr-para");

    gsap.set([badge, title, para], { opacity: 0, y: 40 });

    const st = ScrollTrigger.create({
      trigger: header,
      start: "top 85%",
      onEnter: () => {
        gsap.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        gsap.to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.12 });
        gsap.to(para,  { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.24 });
      },
      onLeaveBack: () => {
        gsap.set([badge, title, para], { opacity: 0, y: 40 });
      },
    });

    return () => st.kill();
  }, []);

  /* Cards stagger animation + counter re-trigger every time section enters */
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 50 });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1, y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
        });
        setCounterTrigger(n => n + 1);
      },
      onLeaveBack: () => {
        gsap.set(cards, { opacity: 0, y: 50 });
        setCounterTrigger(0);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 py-24 lg:py-0"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow Rings */}
      <div className="absolute w-[900px] h-[900px] border border-[#b4101d]/10 rounded-full animate-pulse" />
      <div className="absolute w-[650px] h-[650px] border border-[#b4101d]/10 rounded-full" />

      <div className="relative z-10 max-w-7xl w-full text-center">

        {/* Header */}
        <header ref={headerRef} className="text-center mb-[clamp(48px,8vw,80px)]">
          <div className="bfr-badge mb-5 inline-flex items-center gap-2 rounded-full border bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
            <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full inline-block"
              style={{ background: "#B30E1C", animation: "dotPulse 2.2s ease-in-out infinite" }} />
            Built for Results
          </div>

          <h2
            className="bfr-title m-0 text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px,9vw,82px)", lineHeight: 0.97, letterSpacing: "0.02em" }}
          >
            The numbers don&apos;t{" "}
            <span style={{ color: "#b4101d" }}>whisper.</span>
          </h2>

          <p
            className="bfr-para mt-5 text-base leading-[1.65] max-w-[520px] text-center mx-auto"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
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
              ref={(el) => (cardsRef.current[index] = el)}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 transition-all duration-500 hover:-translate-y-4 hover:border-[#b4101d]/50 hover:shadow-[0_0_50px_rgba(180,16,29,0.2)]"
            >
              <div
                className="text-6xl md:text-7xl font-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
              >
                <Counter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  trigger={counterTrigger}
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
