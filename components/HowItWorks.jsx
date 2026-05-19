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
    carImg: "/car4.png",
    entryFrom: "left",
  },
  {
    num: "02",
    label: "Forge",
    title: "AI learns your store.",
    desc: "Our models ingest your inventory, customer history, and market data to build a brain that's uniquely yours.",
    video: "./step-02.mp4",
    carImg: "/car2.png",
    entryFrom: "right",
  },
  {
    num: "03",
    label: "Dominate",
    title: "Results. Week over week.",
    desc: "Watch conversion rates and gross-per-unit climb every single week as the AI compounds its learning.",
    video: "./step-03.mp4",
    carImg: "/car3.png",
    entryFrom: "left",
  },
];

// ----------------------------------------------------------------------
//                    REAL CAR IMAGE
// ----------------------------------------------------------------------
function RealCar({ src, flip = false }) {
  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Ground glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "10%", right: "10%",
        height: 24, background: "radial-gradient(ellipse, rgba(180,16,29,0.35) 0%, transparent 70%)",
        filter: "blur(10px)", pointerEvents: "none",
      }} />
      <img
        src={src}
        alt="car"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          display: "block",
          transform: flip ? "scaleX(-1)" : "none",
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.7))",
        }}
      />
    </div>
  );
}

// ----------------------------------------------------------------------
//                    INDIVIDUAL STEP
// ----------------------------------------------------------------------
function AnimatedStep({ step, index }) {
  const stepRef = useRef(null);
  const carContainerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = stepRef.current;
    const carWrap = carContainerRef.current;
    const contentWrap = contentRef.current;
    if (!section || !carWrap || !contentWrap) return;

    const fromLeft = step.entryFrom === "left";
    const startX = fromLeft ? "-120vw" : "120vw";
    const endX = fromLeft ? "120vw" : "-120vw";

    gsap.set(carWrap, { x: startX });
    gsap.set(contentWrap, { opacity: 0, y: 16 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const prog = self.progress;
          if (prog >= 0.28 && prog <= 0.72) {
            const fade = Math.min(1, (prog - 0.28) / 0.18);
            gsap.set(contentWrap, { opacity: fade, y: 16 * (1 - fade) });
          } else {
            gsap.set(contentWrap, { opacity: 0, y: 16 });
          }
        },
      },
    });

    // drive in to x:0 (rest), hold, drive out
    tl.to(carWrap, { x: "0%", duration: 0.35, ease: "power2.out" }, 0).to(
      carWrap,
      { x: endX, duration: 0.35, ease: "power2.inOut" },
      0.65,
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.trigger === section) st.kill();
      });
    };
  }, [step.entryFrom]);

  const fromLeft = step.entryFrom === "left";

  return (
    <section
      ref={stepRef}
      className="relative h-screen w-full overflow-hidden border-b border-white/5"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/*
        Layout when rested:
          fromLeft  (01,03): car came from left → rests RIGHT side,  content on LEFT
          !fromLeft (02):    car came from right → rests LEFT side,  content on RIGHT

        Car wrapper starts off-screen, animates to its rest position.
        Content fades in once car is near rest.
      */}

      {/*
        Both car + content grouped together in center as a flex row.
        fromLeft: [CONTENT] [rope] [CAR]  — car enters from left, rests right of content
        !fromLeft: [CAR] [rope] [CONTENT] — car enters from right, rests left of content
      */}

      {/* Outer wrapper — centers the whole group, car animates inside */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="flex items-center"
          style={{
            gap: 0,
            flexDirection: fromLeft ? "row" : "row-reverse",
            width: "clamp(700px, 88vw, 1200px)",
          }}
        >
          {/* CONTENT — fades in */}
          <div
            ref={contentRef}
            style={{
              opacity: 0,
              flex: "0 0 clamp(340px, 52%, 620px)",
              padding: "0 clamp(12px, 2vw, 28px)",
            }}
          >
            <div className="w-full flex flex-col gap-5">
              {/* Video */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-2xl shadow-black/50">
                <video
                  src={step.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    aspectRatio: "16/10",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#b4101d]/30 to-transparent" />
                <div
                  className="absolute bottom-3 right-4 font-bebas text-white/10 leading-none pointer-events-none select-none"
                  style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(180,16,29,0.15)",
                    border: "1px solid rgba(180,16,29,0.4)",
                    borderRadius: 999,
                    padding: "4px 12px",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#b4101d",
                      display: "inline-block",
                      boxShadow: "0 0 6px rgba(180,16,29,0.8)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    Step {step.num}
                  </span>
                </div>
              </div>
              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="block w-8 h-px bg-[#b4101d]" />
                  <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#b4101d]">
                    Step {step.num}
                  </span>
                </div>
                <h3
                  className="font-bebas leading-none text-white mb-3"
                  style={{
                    fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {step.label}
                </h3>
                <div className="w-full h-px bg-white/10 mb-4" />
                <h4
                  className="text-white font-medium mb-2 leading-snug"
                  style={{ fontSize: "clamp(1rem, 1.6vw, 1.35rem)" }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.52)",
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          </div>

          {/* ROPE connector */}
          <div
            style={{
              flexShrink: 0,
              width: "clamp(32px, 4vw, 64px)",
              height: 6,
              position: "relative",
            }}
          >
            <svg
              width="100%"
              height="6"
              viewBox="0 0 64 6"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="3"
                x2="64"
                y2="3"
                stroke="#555"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="3"
                x2="64"
                y2="3"
                stroke="#aaa"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <line
                x1="0"
                y1="3"
                x2="64"
                y2="3"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {/* CAR — animates in */}
          <div
            ref={carContainerRef}
            style={{
              flex: "0 0 clamp(260px, 38%, 480px)",
              willChange: "transform",
            }}
          >
            <RealCar src={step.carImg} flip={!fromLeft} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
//                          MAIN EXPORT
// ----------------------------------------------------------------------
export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const titles = document.querySelectorAll(".hiw-title");
    gsap.fromTo(
      titles,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  if (isMobile) {
    return (
      <section className="relative bg-[#050507] text-white overflow-hidden py-24">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
              <span
                className="w-[7px] h-[7px] rounded-full inline-block"
                style={{ background: "#B30E1C" }}
              />
              How It Works
            </div>
            <h2
              className="font-bebas text-white m-0 hiw-title"
              style={{ fontSize: "clamp(52px,9vw,96px)", lineHeight: 0.95 }}
            >
              From Plug-In to <span style={{ color: "#b4101d" }}>Profit</span>{" "}
              <br /> in Three Steps.
            </h2>
            <p
              className="mt-6 text-base leading-[1.75] max-w-[500px] mx-auto hiw-title"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Auto Forge connects your DMS, CRM, inventory feeds, and customer
              touchpoints into a single intelligent ecosystem.
            </p>
          </div>
          <div className="space-y-20">
            {STEPS.map((step) => (
              <div key={step.num}>
                <video
                  src={step.video}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full rounded-xl mb-6"
                  style={{ aspectRatio: "16/10" }}
                />
                <span
                  className="mb-3 block text-[11px] uppercase tracking-[0.35em]"
                  style={{ color: "#b4101d" }}
                >
                  Step {step.num}
                </span>
                <h3
                  className="font-bebas text-white uppercase leading-none mb-2"
                  style={{ fontSize: "clamp(3rem,12vw,5rem)" }}
                >
                  {step.label}
                </h3>
                <h4 className="text-xl font-medium text-white mb-3">
                  {step.title}
                </h4>
                <p
                  className="text-[15px] leading-[1.8]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050507] text-white overflow-hidden"
    >
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
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(180,16,29,0.08) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(180,16,29,0.4), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-32 pb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl hiw-title">
            <span
              className="w-[7px] h-[7px] rounded-full inline-block"
              style={{ background: "#B30E1C" }}
            />
            How It Works
          </div>
          <h2
            className="font-bebas text-white m-0 hiw-title"
            style={{ fontSize: "clamp(52px,9vw,96px)", lineHeight: 0.95 }}
          >
            From Plug-In to <span style={{ color: "#b4101d" }}>Profit</span>{" "}
            <br /> in Three Steps.
          </h2>
          <p
            className="mt-6 text-base leading-[1.75] max-w-[500px] mx-auto hiw-title"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Auto Forge connects your DMS, CRM, inventory feeds, and customer
            touchpoints into a single intelligent ecosystem.
          </p>
        </div>

        {/* Steps */}
        {STEPS.map((step, idx) => (
          <AnimatedStep key={step.num} step={step} index={idx} />
        ))}
      </div>
    </section>
  );
}
