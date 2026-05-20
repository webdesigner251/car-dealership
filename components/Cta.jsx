"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT_ITEMS = [
  { id: "badge",   start: 0.10 },
  { id: "heading", start: 0.20 },
  { id: "sub",     start: 0.35 },
  { id: "btn",     start: 0.50 },
  { id: "contact", start: 0.60 },
];

export default function CTA() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    video.playbackRate = 1.5;

    // Play video only when section enters viewport
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        video.currentTime = 0;
        video.play();
      },
      onLeaveBack: () => {
        video.pause();
        video.currentTime = 0;
      },
    });

    const isMobile = window.innerWidth < 1024;

    // Hide text initially
    TEXT_ITEMS.forEach(({ id }) => {
      const el = section.querySelector(`[data-cta="${id}"]`);
      if (el) gsap.set(el, { opacity: 0, y: 24 });
    });

    if (isMobile) {
      // Mobile: simple scroll-in, no pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 10%",
          scrub: 1,
        },
      });
      TEXT_ITEMS.forEach(({ id, start }) => {
        const el = section.querySelector(`[data-cta="${id}"]`);
        if (!el) return;
        tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, start);
      });
      return () => { tl?.scrollTrigger?.kill(); tl?.kill(); };
    }

    // Desktop: pinned scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=4000",
        pin: true,
        pinSpacing: true,
        scrub: 1.6,
      },
    });

    TEXT_ITEMS.forEach(({ id, start }) => {
      const el = section.querySelector(`[data-cta="${id}"]`);
      if (!el) return;
      tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, start);
    });

    return () => { tl?.scrollTrigger?.kill(); tl?.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", background: "#050507", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(180,16,29,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,16,29,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red glow orbs */}
      <div className="pointer-events-none absolute rounded-full"
        style={{ top: "-20%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(179,14,28,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />
      <div className="pointer-events-none absolute rounded-full"
        style={{ bottom: "-20%", right: "-10%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(179,14,28,0.08) 0%, transparent 65%)", filter: "blur(70px)" }} />

      {/* Glow rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b4101d]/[0.08]"
        style={{ width: "80vw", height: "80vw", maxWidth: 900, maxHeight: 900 }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b4101d]/[0.05]"
        style={{ width: "55vw", height: "55vw", maxWidth: 650, maxHeight: 650 }} />

      {/* Main layout — stacked on mobile, side-by-side on desktop */}
      <div className="relative z-10 flex flex-col lg:flex-row h-full w-full items-center px-6 md:px-12 lg:px-24 py-20 lg:py-0 gap-10 lg:gap-16"
        style={{ minHeight: "100vh" }}>

        {/* Video */}
        <div className="w-full lg:flex-shrink-0 lg:w-[55%] flex items-center justify-center" style={{ maxWidth: 800 }}>
          <video
            ref={videoRef}
            src="./ctacar2.mp4"
            muted
            playsInline
            preload="auto"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "left center",
              clipPath: "inset(0 6.5% 0 0)",
              display: "block",
              borderRadius: "12px",
              filter: "drop-shadow(0 0 40px rgba(179,14,28,0.25))",
            }}
          />
        </div>

        {/* Text content */}
        <div className="w-full lg:flex-1 flex flex-col items-start justify-center min-w-0">

          <div data-cta="badge" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
            <span className="h-[7px] w-[7px] rounded-full bg-[#B30E1C] animate-pulse" aria-hidden="true" />
            Take the Next Step
          </div>

          <h2
            data-cta="heading"
            className="m-0 text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(42px, 6vw, 88px)", lineHeight: 0.95, letterSpacing: "0.02em" }}
          >
            Ready to{" "}
            <span style={{ color: "#B30E1C", textShadow: "0 0 40px rgba(179,14,28,0.5)" }}>Forge</span>{" "}
            Your Future?
          </h2>

          <p data-cta="sub" className="mt-5 max-w-[420px] text-base leading-[1.7]" style={{ color: "rgba(255,255,255,0.42)" }}>
            Join the dealerships already running on the most advanced AI platform in the industry. Most stores are live inside 30 days.
          </p>

          <button
            data-cta="btn"
            className="group relative mt-8 overflow-hidden inline-flex items-center gap-2.5 rounded-lg bg-[#B30E1C] border border-[#B30E1C] px-8 py-3.5 text-[13px] font-bold tracking-[0.12em] uppercase text-white cursor-pointer transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5"
            style={{ boxShadow: "0 0 30px rgba(179,14,28,0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 55px rgba(179,14,28,0.55), 0 8px 30px rgba(179,14,28,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(179,14,28,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          >
            Schedule Your Demo
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>

          <div data-cta="contact" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.28)" }}>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              demo@autoforge.example
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
              </svg>
              +1 (555) 010-AUTO
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Austin · Texas
            </span>
          </div>

        </div>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(5,5,7,0.6) 100%)" }} />
    </section>
  );
}
