

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Car SVG parts — premium luxury sedan ── */
const CAR_PARTS = [
  // ── Underbody / chassis shadow
  {
    id: "shadow",
    delay: 0,
    fromX: 0, fromY: 30,
    path: `M 120 228 Q 400 238 680 228 Q 700 232 680 236 Q 400 246 120 236 Z`,
    fill: "rgba(0,0,0,0.35)",
    stroke: "none", strokeW: 0,
  },
  // ── Main body — long low fastback silhouette
  {
    id: "body",
    delay: 0.04,
    fromX: -100, fromY: 50,
    path: `M 108 210
           L 108 185
           Q 112 165 135 155
           L 185 148
           Q 220 140 255 132
           Q 295 118 345 110
           L 460 106
           Q 520 106 560 112
           Q 595 118 618 130
           L 648 148
           Q 685 158 710 172
           Q 728 182 732 195
           L 735 210 Z`,
    fill: "url(#bodyGrad)",
    stroke: "#b4101d",
    strokeW: 1.2,
  },
  // ── Roof — sleek fastback slope
  {
    id: "roof",
    delay: 0.12,
    fromX: 0, fromY: -70,
    path: `M 255 132
           Q 278 108 308 90
           L 360 76
           Q 400 68 445 66
           Q 490 64 525 70
           Q 558 76 578 90
           Q 600 106 618 130
           L 560 112
           Q 520 106 460 106
           L 345 110
           Q 295 118 255 132 Z`,
    fill: "url(#roofGrad)",
    stroke: "#b4101d",
    strokeW: 1,
  },
  // ── Front windshield
  {
    id: "windshield-front",
    delay: 0.20,
    fromX: 50, fromY: -40,
    path: `M 578 90 Q 600 106 618 130 L 560 112 Q 520 106 510 106 L 510 80 Q 548 78 578 90 Z`,
    fill: "rgba(120,200,255,0.13)",
    stroke: "rgba(120,200,255,0.45)",
    strokeW: 0.8,
  },
  // ── Rear windshield
  {
    id: "windshield-rear",
    delay: 0.26,
    fromX: -50, fromY: -40,
    path: `M 255 132 Q 278 108 308 90 L 360 76 L 355 106 Q 310 112 255 132 Z`,
    fill: "rgba(120,200,255,0.10)",
    stroke: "rgba(120,200,255,0.38)",
    strokeW: 0.8,
  },
  // ── Side windows (3 panes)
  {
    id: "window-rear",
    delay: 0.30,
    fromX: -30, fromY: -30,
    path: `M 360 76 L 355 106 L 415 106 L 418 70 Z`,
    fill: "rgba(120,200,255,0.09)",
    stroke: "rgba(120,200,255,0.28)",
    strokeW: 0.7,
  },
  {
    id: "window-mid",
    delay: 0.34,
    fromX: 0, fromY: -30,
    path: `M 418 70 L 415 106 L 468 106 L 470 66 Z`,
    fill: "rgba(120,200,255,0.09)",
    stroke: "rgba(120,200,255,0.28)",
    strokeW: 0.7,
  },
  {
    id: "window-front",
    delay: 0.38,
    fromX: 30, fromY: -30,
    path: `M 470 66 L 468 106 L 510 106 L 510 80 Q 492 68 470 66 Z`,
    fill: "rgba(120,200,255,0.09)",
    stroke: "rgba(120,200,255,0.28)",
    strokeW: 0.7,
  },
  // ── Door lines
  {
    id: "door-line-1",
    delay: 0.42,
    fromX: 0, fromY: 20,
    path: `M 355 106 L 352 210`,
    fill: "none", stroke: "rgba(180,16,29,0.4)", strokeW: 1.2,
  },
  {
    id: "door-line-2",
    delay: 0.44,
    fromX: 0, fromY: 20,
    path: `M 468 106 L 466 210`,
    fill: "none", stroke: "rgba(180,16,29,0.4)", strokeW: 1.2,
  },
  // ── Door handles
  {
    id: "handle-rear",
    delay: 0.46,
    fromX: -20, fromY: 0,
    path: `M 390 162 L 415 162 Q 418 160 418 165 L 415 168 L 390 168 Q 387 166 390 162 Z`,
    fill: "rgba(255,255,255,0.12)", stroke: "rgba(255,255,255,0.25)", strokeW: 0.6,
  },
  {
    id: "handle-front",
    delay: 0.48,
    fromX: 20, fromY: 0,
    path: `M 500 162 L 525 162 Q 528 160 528 165 L 525 168 L 500 168 Q 497 166 500 162 Z`,
    fill: "rgba(255,255,255,0.12)", stroke: "rgba(255,255,255,0.25)", strokeW: 0.6,
  },
  // ── Side body crease / character line
  {
    id: "crease",
    delay: 0.50,
    fromX: 0, fromY: 10,
    path: `M 140 178 Q 300 170 460 168 Q 580 168 660 175`,
    fill: "none", stroke: "rgba(255,255,255,0.08)", strokeW: 3,
  },
  // ── Lower sill / rocker panel
  {
    id: "sill",
    delay: 0.52,
    fromX: 0, fromY: 15,
    path: `M 175 210 L 175 218 Q 400 222 625 218 L 625 210 Z`,
    fill: "rgba(255,255,255,0.04)", stroke: "rgba(180,16,29,0.3)", strokeW: 0.8,
  },
  // ── Hood
  {
    id: "hood",
    delay: 0.54,
    fromX: 80, fromY: 15,
    path: `M 618 130 Q 648 148 685 158 Q 710 165 732 178 L 735 210 L 625 210 L 625 148 Z`,
    fill: "url(#hoodGrad)",
    stroke: "#b4101d", strokeW: 1,
  },
  // ── Hood vent lines
  {
    id: "hood-vent",
    delay: 0.56,
    fromX: 60, fromY: 0,
    path: `M 650 155 L 660 185 M 665 158 L 674 188 M 680 162 L 688 190`,
    fill: "none", stroke: "rgba(180,16,29,0.35)", strokeW: 0.8,
  },
  // ── Trunk / rear deck
  {
    id: "trunk",
    delay: 0.58,
    fromX: -80, fromY: 15,
    path: `M 108 185 Q 112 165 135 155 L 185 148 L 175 210 L 108 210 Z`,
    fill: "url(#trunkGrad)",
    stroke: "#b4101d", strokeW: 1,
  },
  // ── Rear spoiler lip
  {
    id: "spoiler",
    delay: 0.60,
    fromX: -60, fromY: -20,
    path: `M 108 183 Q 100 180 96 185 L 100 190 Q 108 188 115 186 Z`,
    fill: "rgba(180,16,29,0.7)", stroke: "#b4101d", strokeW: 0.8,
  },
  // ── Front bumper
  {
    id: "bumper-front",
    delay: 0.62,
    fromX: 80, fromY: 10,
    path: `M 732 195 Q 740 198 742 205 L 740 212 Q 735 215 728 213 L 725 210 L 735 210 Z`,
    fill: "url(#bumperGrad)", stroke: "#b4101d", strokeW: 1,
  },
  // ── Rear bumper
  {
    id: "bumper-rear",
    delay: 0.63,
    fromX: -80, fromY: 10,
    path: `M 108 210 L 105 213 Q 98 215 94 210 L 96 205 Q 100 200 108 198 Z`,
    fill: "url(#bumperGrad)", stroke: "#b4101d", strokeW: 1,
  },
  // ── Front wheel
  {
    id: "wheel-front",
    delay: 0.66,
    fromX: 60, fromY: 70,
    cx: 648, cy: 222, r: 38,
    type: "wheel",
  },
  // ── Rear wheel
  {
    id: "wheel-rear",
    delay: 0.72,
    fromX: -60, fromY: 70,
    cx: 168, cy: 222, r: 38,
    type: "wheel",
  },
  // ── Headlight — slim LED strip style
  {
    id: "headlight-main",
    delay: 0.80,
    fromX: 100, fromY: 0,
    path: `M 726 162 Q 736 158 742 163 L 742 170 Q 736 174 726 172 Z`,
    fill: "rgba(255,245,200,0.95)",
    stroke: "rgba(255,230,120,0.9)", strokeW: 0.8,
  },
  {
    id: "headlight-drl",
    delay: 0.82,
    fromX: 100, fromY: 0,
    path: `M 720 172 L 742 170 L 742 173 L 720 175 Z`,
    fill: "rgba(255,255,255,0.8)",
    stroke: "rgba(255,255,255,0.6)", strokeW: 0.5,
  },
  // ── Taillight — full-width LED bar
  {
    id: "taillight-bar",
    delay: 0.84,
    fromX: -100, fromY: 0,
    path: `M 108 162 L 120 160 L 120 175 L 108 177 Z`,
    fill: "rgba(255,30,30,0.9)",
    stroke: "rgba(255,80,80,0.8)", strokeW: 0.8,
  },
  {
    id: "taillight-strip",
    delay: 0.86,
    fromX: -80, fromY: 0,
    path: `M 108 177 L 175 178 L 175 181 L 108 180 Z`,
    fill: "rgba(255,30,30,0.5)",
    stroke: "none", strokeW: 0,
  },
  // ── Ground reflection line
  {
    id: "ground-line",
    delay: 0.90,
    fromX: 0, fromY: 18,
    path: `M 100 260 Q 400 265 700 260`,
    fill: "none", stroke: "rgba(180,16,29,0.2)", strokeW: 1,
  },
  // ── Front grille — horizontal slats
  {
    id: "grille",
    delay: 0.92,
    fromX: 70, fromY: 0,
    path: `M 733 178 L 742 176 L 742 179 L 733 181 Z
           M 733 182 L 742 180 L 742 183 L 733 185 Z
           M 733 186 L 742 184 L 742 187 L 733 189 Z`,
    fill: "rgba(180,16,29,0.55)", stroke: "#b4101d", strokeW: 0.6,
  },
  // ── Mirror
  {
    id: "mirror",
    delay: 0.94,
    fromX: 30, fromY: -10,
    path: `M 618 130 L 628 124 L 634 128 L 626 136 Z`,
    fill: "rgba(40,40,40,0.9)", stroke: "rgba(180,16,29,0.5)", strokeW: 0.8,
  },
];

/* ── Text content items ── */
const TEXT_ITEMS = [
  { id: "badge",   progress: 0.08 },
  { id: "heading", progress: 0.20 },
  { id: "sub",     progress: 0.38 },
  { id: "btn",     progress: 0.52 },
  { id: "contact", progress: 0.62 },
];

export default function CTA() {
  const sectionRef  = useRef(null);
  const carGroupRef = useRef(null);
  const contentRef  = useRef(null);
  const speedRef    = useRef(null);
  const partRefs    = useRef([]);

  useEffect(() => {
    const wrapper = sectionRef.current;
    const section = sectionRef.current;
    const carGroup = carGroupRef.current;
    if (!wrapper || !section || !carGroup) return;

    // Set all parts invisible initially
    partRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0 });
    });

    // Set text items invisible
    ["badge","heading","sub","btn","contact"].forEach((id) => {
      const el = section.querySelector(`[data-cta="${id}"]`);
      if (el) gsap.set(el, { opacity: 0, y: 30 });
    });

    // Speed lines hidden
    if (speedRef.current) gsap.set(speedRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=3000",
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // ── Phase 1: Car parts assemble (0 → 0.60) ──
    CAR_PARTS.forEach((part, i) => {
      const el = partRefs.current[i];
      if (!el) return;
      const startP = part.delay * 0.60;
      tl.fromTo(el,
        { opacity: 0, x: part.fromX, y: part.fromY },
        { opacity: 1, x: 0, y: 0, duration: 0.12, ease: "power3.out" },
        startP
      );
    });

    // ── Phase 1: Text items appear ──
    TEXT_ITEMS.forEach(({ id, progress }) => {
      const el = section.querySelector(`[data-cta="${id}"]`);
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.14, ease: "power3.out" },
        progress
      );
    });

    // ── Phase 2: Car drives right + speed lines (0.65 → 1.0) ──
    tl.to(carGroup, {
      x: "120vw",
      duration: 0.35,
      ease: "power2.in",
    }, 0.65);

    tl.to(speedRef.current, {
      opacity: 1,
      duration: 0.05,
    }, 0.65);

    tl.to(speedRef.current, {
      opacity: 0,
      duration: 0.05,
    }, 0.95);

    // Content fades out as car leaves
    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.15,
      ease: "power2.in",
    }, 0.70);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#050507", fontFamily: "'Space Grotesk', sans-serif" }}
    >
        {/* ── Background grid ── */}
        <div className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "linear-gradient(rgba(180,16,29,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,16,29,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        {/* ── Red glow orbs ── */}
        <div className="pointer-events-none absolute rounded-full"
          style={{ top: "-20%", left: "-10%", width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(179,14,28,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="pointer-events-none absolute rounded-full"
          style={{ bottom: "-20%", right: "-10%", width: "45vw", height: "45vw",
            background: "radial-gradient(circle, rgba(179,14,28,0.08) 0%, transparent 65%)", filter: "blur(70px)" }} />

        {/* ── Glow rings ── */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b4101d]/8"
          style={{ width: "80vw", height: "80vw", maxWidth: 900, maxHeight: 900 }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b4101d]/5"
          style={{ width: "55vw", height: "55vw", maxWidth: 650, maxHeight: 650 }} />

        {/* ── Speed lines (phase 2) ── */}
        <div ref={speedRef} className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: 0 }}>
          {[15, 30, 45, 55, 65, 75, 85].map((top, i) => (
            <div key={i} className="absolute h-px"
              style={{
                top: `${top}%`, left: 0, right: 0,
                background: `linear-gradient(90deg, transparent 0%, rgba(180,16,29,${0.15 + i * 0.04}) 40%, rgba(255,255,255,${0.08 + i * 0.02}) 60%, transparent 100%)`,
                transform: `scaleX(${0.6 + i * 0.06})`,
                transformOrigin: "left center",
              }} />
          ))}
        </div>

        {/* ── Main layout: left car + right content ── */}
        <div className="relative z-10 flex h-full w-full items-center px-8 md:px-16 lg:px-24 gap-8 lg:gap-16">

          {/* LEFT — Car SVG */}
          <div ref={carGroupRef} className="flex-shrink-0 w-full lg:w-[55%]" style={{ maxWidth: 800 }}>
            <svg
              viewBox="0 0 850 280"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto", overflow: "visible" }}
              aria-label="Premium car illustration"
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2e2e2e" />
                  <stop offset="55%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#0d0d0d" />
                </linearGradient>
                <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#252525" />
                  <stop offset="100%" stopColor="#161616" />
                </linearGradient>
                <linearGradient id="hoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="100%" stopColor="#0f0f0f" />
                </linearGradient>
                <linearGradient id="trunkGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="100%" stopColor="#0f0f0f" />
                </linearGradient>
                <linearGradient id="bumperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e1e1e" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
                <radialGradient id="wheelGrad" cx="40%" cy="35%" r="55%">
                  <stop offset="0%" stopColor="#3a3a3a" />
                  <stop offset="60%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#050505" />
                </radialGradient>
                <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="70%" stopColor="#111" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="softglow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Render parts */}
              {CAR_PARTS.map((part, i) => {
                if (part.type === "wheel") {
                  return (
                    <g key={part.id} ref={(el) => (partRefs.current[i] = el)}>
                      {/* Tire */}
                      <circle cx={part.cx} cy={part.cy} r={part.r}
                        fill="url(#tireGrad)" stroke="#1a1a1a" strokeWidth="1.5" />
                      {/* Tire highlight */}
                      <path
                        d={`M ${part.cx - part.r * 0.7} ${part.cy - part.r * 0.55} A ${part.r} ${part.r} 0 0 1 ${part.cx + part.r * 0.7} ${part.cy - part.r * 0.55}`}
                        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round"
                      />
                      {/* Rim outer ring */}
                      <circle cx={part.cx} cy={part.cy} r={part.r * 0.78}
                        fill="none" stroke="rgba(180,16,29,0.5)" strokeWidth="1.5" />
                      {/* Rim face */}
                      <circle cx={part.cx} cy={part.cy} r={part.r * 0.72}
                        fill="url(#wheelGrad)" />
                      {/* 5-spoke alloy */}
                      {[0,72,144,216,288].map((angle) => {
                        const rad = (angle * Math.PI) / 180;
                        const x1 = part.cx + Math.cos(rad) * part.r * 0.18;
                        const y1 = part.cy + Math.sin(rad) * part.r * 0.18;
                        const x2 = part.cx + Math.cos(rad) * part.r * 0.68;
                        const y2 = part.cy + Math.sin(rad) * part.r * 0.68;
                        const lRad = rad - 0.28;
                        const rRad = rad + 0.28;
                        const lx = part.cx + Math.cos(lRad) * part.r * 0.65;
                        const ly = part.cy + Math.sin(lRad) * part.r * 0.65;
                        const rx = part.cx + Math.cos(rRad) * part.r * 0.65;
                        const ry = part.cy + Math.sin(rRad) * part.r * 0.65;
                        return (
                          <path key={angle}
                            d={`M ${x1} ${y1} L ${lx} ${ly} A ${part.r * 0.68} ${part.r * 0.68} 0 0 1 ${rx} ${ry} Z`}
                            fill="rgba(50,50,50,0.9)" stroke="rgba(180,16,29,0.6)" strokeWidth="0.8"
                          />
                        );
                      })}
                      {/* Center hub */}
                      <circle cx={part.cx} cy={part.cy} r={part.r * 0.16}
                        fill="#1a1a1a" stroke="rgba(180,16,29,0.8)" strokeWidth="1" />
                      <circle cx={part.cx} cy={part.cy} r={part.r * 0.08}
                        fill="#b4101d" filter="url(#glow)" />
                    </g>
                  );
                }
                return (
                  <path key={part.id}
                    ref={(el) => (partRefs.current[i] = el)}
                    d={part.path}
                    fill={part.fill}
                    stroke={part.stroke}
                    strokeWidth={part.strokeW}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Body highlight — top reflection */}
              <path
                d="M 260 135 Q 400 125 560 118 Q 600 116 625 122"
                fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Red accent pinstripe */}
              <path
                d="M 145 188 Q 350 180 560 180 Q 620 180 660 185"
                fill="none" stroke="rgba(180,16,29,0.4)" strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* RIGHT — Text content */}
          <div ref={contentRef} className="flex-1 flex flex-col items-start justify-center min-w-0">

            {/* Badge */}
            <div data-cta="badge"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl"
            >
              <span className="h-[7px] w-[7px] rounded-full bg-[#B30E1C] animate-pulse" aria-hidden="true" />
              Take the Next Step
            </div>

            {/* Heading */}
            <h2 data-cta="heading"
              className="m-0 text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(42px, 6vw, 88px)",
                lineHeight: 0.95,
                letterSpacing: "0.02em",
              }}
            >
              Ready to{" "}
              <span style={{ color: "#B30E1C", textShadow: "0 0 40px rgba(179,14,28,0.5)" }}>
                Forge
              </span>{" "}
              Your Future?
            </h2>

            {/* Sub */}
            <p data-cta="sub"
              className="mt-5 max-w-[420px] text-base leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Join the dealerships already running on the most advanced AI platform
              in the industry. Most stores are live inside 30 days.
            </p>

            {/* Button */}
            <button data-cta="btn"
              className="group relative mt-8 overflow-hidden inline-flex items-center gap-2.5 rounded-lg bg-[#B30E1C] border border-[#B30E1C] px-8 py-3.5 text-[13px] font-bold tracking-[0.12em] uppercase text-white cursor-pointer transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 30px rgba(179,14,28,0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 55px rgba(179,14,28,0.55), 0 8px 30px rgba(179,14,28,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(179,14,28,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
            >
              Schedule Your Demo
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>

            {/* Contact */}
            <div data-cta="contact"
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                demo@autoforge.example
              </span>
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
                +1 (555) 010-AUTO
              </span>
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Austin · Texas
              </span>
            </div>

          </div>
        </div>

        {/* ── Vignette ── */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(5,5,7,0.6) 100%)" }} />

    </section>
  );
}