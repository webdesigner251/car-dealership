"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    label: "Connect",
    title: "Plug-in in 48 hours.",
    desc: "Auto Forge connects to your DMS, CRM, website, and inventory feeds in 48 hours — zero downtime, zero dev work.",
    video: "./step-01.mp4",
    carImg: "./car4.png",
  },
  {
    num: "02",
    label: "Forge",
    title: "AI learns your store.",
    desc: "Our models ingest your inventory, customer history, and market data to build a brain that's uniquely yours.",
    video: "./step-02.mp4",
    carImg: "./car2.png",
    carClass: "mt-5"
  },
  {
    num: "03",
    label: "Dominate",
    title: "Results. Week over week.",
    desc: "Watch conversion rates and gross-per-unit climb every single week as the AI compounds its learning.",
    video: "./step-03.mp4",
    carImg: "./car3.png",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const stepEls = gsap.utils.toArray(".step-item");
    const triggers = [];

    stepEls.forEach((el, i) => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050507] text-white pt-32 pb-48 lg:pb-0"
      style={{ overflowX: "clip" }}
    >
      {/* Background Grids & Orbs */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(180,16,29,0.06) 0%, transparent 60%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center md:text-left mb-16 md:mb-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
            <span className="w-[7px] h-[7px] rounded-full inline-block bg-[#B30E1C] shadow-[0_0_8px_#b4101d]" />
            How It Works
          </div>
          <h2 className="font-bebas text-white m-0 text-[clamp(48px,8vw,96px)] leading-[0.95] tracking-[0.02em]">
            From Plug-In to{" "}
            <span className="text-[#b4101d] drop-shadow-[0_0_30px_rgba(180,16,29,0.5)]">
              Profit
            </span>
            <br className="hidden md:block" /> in Three Steps.
          </h2>
          <p className="mt-6 text-base leading-[1.75] max-w-[500px] text-white/50 mx-auto md:mx-0">
            Auto Forge connects your DMS, CRM, inventory feeds, and customer
            touchpoints into a single intelligent ecosystem.
          </p>
        </div>

        {isMobile ? (
          /* MOBILE LAYOUT */
          <div className="flex flex-col gap-32">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col relative">
                {/* Visual */}
                <div className="relative w-full aspect-[4/3] rounded-3xl border border-white/10 bg-white/[0.02] overflow-visible shadow-2xl shadow-black mb-16 mt-6">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden bg-[#050507]">
                    <video
                      src={step.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-90" />
                  </div>
                  <img
                    src={step.carImg}
                    alt={step.label}
                    className="absolute bottom-[-15%] right-[-10%] w-[120%] max-w-none"
                    style={{
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                      transform: "scale(1)",
                      transition: "transform 700ms",
                    }}
                  />
                </div>
                {/* Text */}
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#b4101d] shadow-[0_0_12px_#b4101d]" />
                  <div className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#b4101d] mb-4">
                    Step {step.num}
                  </div>
                  <h3 className="font-bebas text-5xl mb-2 text-white">
                    {step.label}
                  </h3>
                  <h4 className="text-xl mb-4 text-white/90">{step.title}</h4>
                  <p className="text-[15px] leading-relaxed text-white/50">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* DESKTOP STICKY LAYOUT */
          <div
            ref={containerRef}
            className="flex items-start gap-16 lg:gap-24 relative"
          >
            {/* LEFT: Timeline */}
            <div className="w-[45%] lg:w-[40%] relative pb-[30vh]">
              {/* Timeline Line */}
              <div className="absolute top-0 bottom-0 left-[35px] w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

              {STEPS.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={i}
                    className={`step-item relative pl-24 py-32 transition-all duration-700 ${isActive ? "opacity-100" : "opacity-30 blur-[2px]"}`}
                  >
                    {/* Glowing Dot */}
                    <div
                      className="absolute left-[31px] top-[140px] w-2.5 h-2.5 rounded-full z-10 transition-all duration-500"
                      style={{
                        background: isActive ? "#b4101d" : "#333",
                        boxShadow: isActive
                          ? "0 0 20px 4px rgba(180,16,29,0.8)"
                          : "none",
                        transform: isActive ? "scale(1.5)" : "scale(1)",
                      }}
                    />

                    {/* Step Number */}
                    <div
                      className="absolute left-0 top-32 font-bebas text-4xl transition-colors duration-500"
                      style={{
                        color: isActive ? "#b4101d" : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {step.num}
                    </div>

                    <h3 className="font-bebas text-[3.5rem] lg:text-[4.5rem] mb-4 text-white leading-none tracking-[0.02em]">
                      {step.label}
                    </h3>
                    <h4 className="text-[1.3rem] mb-4 text-white/90 font-medium">
                      {step.title}
                    </h4>
                    <p className="text-base leading-[1.8] text-white/60">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Sticky Media */}
            <div className="w-[55%] lg:w-[60%] sticky top-[15vh] h-[70vh] flex items-center justify-center">
              {/* Premium Glass Container */}
              <div className="relative w-full max-w-[800px] aspect-[4/3] rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-visible group">
                {/* Glow behind container */}
                <div className="absolute inset-0 rounded-[32px] bg-[#b4101d]/10 blur-[60px] -z-10 transition-opacity duration-1000 opacity-50 group-hover:opacity-100" />

                {/* Videos */}
                <div className="absolute inset-0 rounded-[32px] overflow-hidden bg-[#050507]">
                  {STEPS.map((step, i) => (
                    <video
                      key={i}
                      src={step.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeStep === i ? "opacity-100" : "opacity-0"}`}
                    />
                  ))}
                  {/* Internal Vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,7,0.6)_100%)] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>

                {/* UI Overlay Accents */}
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md z-20">
                  <span className="w-2 h-2 rounded-full bg-[#b4101d] animate-pulse" />
                  <span className="text-[9px] uppercase tracking-widest text-white/70">
                    System Active
                  </span>
                </div>

                {/* Top right decorative corners */}
                <svg
                  className="absolute top-0 right-0 w-16 h-16 text-white/20 z-20 pointer-events-none"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M64 0H0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M64 0V64"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>
                <svg
                  className="absolute bottom-0 left-0 w-16 h-16 text-white/20 z-20 pointer-events-none"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M0 64H64"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M0 64V0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Floating Cars (3D effect outside bounds) */}
                {STEPS.map((step, i) => {
                  const isActive = activeStep === i;
                  // Per-car bottom offset to align wheels consistently
                  const bottomOffset = i === 1 ? "-25%" : "-15%";
                  return (
                    <img
                      key={i}
                      src={step.carImg}
                      alt={step.label}
                      className="absolute right-[-10%] w-[115%] max-w-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-30"
                      style={{
                        bottom: bottomOffset,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scale(1)" : "scale(0.95)",
                        filter: isActive
                          ? "drop-shadow(0 40px 60px rgba(0,0,0,0.8)) brightness(1.1)"
                          : "drop-shadow(0 10px 20px rgba(0,0,0,0.5)) brightness(0.5)",
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
