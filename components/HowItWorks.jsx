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
    desc: "Auto Forge connects to your DMS, CRM, website, and inventory feeds in 48 hours.",
    video: "./step-01.mp4",
  },
  {
    num: "02",
    label: "Forge",
    title: "AI learns your store.",
    desc: "Our models ingest inventory and customer history.",
    video: "./step-02.mp4",
  },
  {
    num: "03",
    label: "Dominate",
    title: "Results. Week over week.",
    desc: "Watch conversion and gross-per-unit climb every week.",
    video: "./step-03.mp4",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const videoWrapRefs = useRef([]);
  const videoRefs = useRef([]);

  const contentRefs = useRef([]);
  const dotRefs = useRef([]);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        /* INITIAL */
        gsap.set(videoWrapRefs.current, {
          opacity: 0,
          scale: 1.15,
          filter: "blur(10px)",
        });

        gsap.set(videoWrapRefs.current[0], {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        });

        videoRefs.current[0]?.play();

        /* MAIN TIMELINE */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: `+=${STEPS.length * 120}%`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,

            onUpdate: (self) => {
              const step = Math.min(
                STEPS.length - 1,
                Math.round(self.progress * (STEPS.length - 1))
              );

              if (step !== currentStep) {
                changeStep(step);
              }
            },
          },
        });

        /* CONTENT ANIMATION */
        STEPS.forEach((_, index) => {
          if (!contentRefs.current[index]) return;

          const content = contentRefs.current[index];

          if (index !== 0) {
            gsap.set(content, {
              opacity: 0,
              y: 120,
            });
          }

          tl.to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
            index
          );

          if (index !== STEPS.length - 1) {
            tl.to(
              content,
              {
                opacity: 0,
                y: -120,
                duration: 1,
                ease: "power3.inOut",
              },
              index + 0.7
            );
          }
        });

        function changeStep(step) {
          setCurrentStep(step);

          /* DOTS */
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return;

            if (i === step) {
              dot.classList.add("bg-[#b4101d]", "h-8");
              dot.classList.remove("bg-black/20", "h-2");
            } else {
              dot.classList.remove("bg-[#b4101d]", "h-8");
              dot.classList.add("bg-black/20", "h-2");
            }
          });

          /* VIDEOS */
          videoWrapRefs.current.forEach((wrap, i) => {
            if (!wrap) return;

            if (i === step) {
              gsap.to(wrap, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out",
              });

              videoRefs.current[i]?.play();
            } else {
              gsap.to(wrap, {
                opacity: 0,
                scale: 1.15,
                filter: "blur(10px)",
                duration: 1,
                ease: "power3.out",
              });

              videoRefs.current[i]?.pause();
            }
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [currentStep]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#050507] text-black overflow-hidden"
    >
      {/* HEADER */}
        <div className="relative z-2 mx-auto">

          {/* header — items animated on scroll */}
          <div className="ai-header text-center mb-[clamp(48px,8vw,80px)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
                <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full inline-block"
                style={{ background: "#B30E1C", animation: "dotPulse 2.2s ease-in-out infinite" }} />
                The Platform
            </div>


            <h2 className="ai-header-item m-0 text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px,9vw,112px)",
                lineHeight: 0.97,
                letterSpacing: "0.02em",
              }}>
              One Forge.{" "}
              <span style={{ color: "#b4101d" }}>Five Engines.</span>
            </h2>

            <p className="ai-header-item mt-5 text-base leading-[1.65] max-w-[520px] text-center mx-auto"
              style={{ color: "rgba(255,255,255,0.42)" }}>
              Auto Forge connects your DMS, CRM, inventory feeds, and customer
              touchpoints into a single intelligent ecosystem — and gives every
              team in your store a smarter weapon.
            </p>
          </div>
        </div>

      {/* TRACK */}

      <div ref={trackRef} className="relative">
        <div className="grid h-screen grid-cols-2 overflow-hidden">
          {/* LEFT VIDEO */}

          <div className="relative overflow-hidden bg-black">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                ref={(el) => (videoWrapRefs.current[index] = el)}
                className="absolute inset-0"
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={step.video}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}

            {/* NUMBER */}

            <div className="pointer-events-none absolute bottom-6 left-8 z-10 text-[clamp(6rem,12vw,12rem)] font-bold leading-none text-white/10">
              {STEPS[currentStep].num}
            </div>

            {/* OVERLAY */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
          </div>

          {/* RIGHT */}

          <div className="relative overflow-hidden bg-white">
            {/* LINE */}

            <div className="absolute left-0 top-[10%] bottom-[10%] w-px bg-black/10" />

            {/* DOTS */}

            <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => (dotRefs.current[i] = el)}
                  className={`w-2 rounded-full transition-all duration-500 ${
                    i === 0
                      ? "h-8 bg-[#b4101d]"
                      : "h-2 bg-black/20"
                  }`}
                />
              ))}
            </div>

            {/* CONTENT */}

            <div className="relative h-full">
              {STEPS.map((step, index) => (
                <div
                  key={step.num}
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="absolute inset-0 flex flex-col justify-center px-10 lg:px-24"
                >
                  <span className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#b4101d]">
                    Step {step.num}
                  </span>

                  <h3 className="mb-4 text-[clamp(4rem,7vw,7rem)] font-semibold uppercase leading-[0.9] tracking-tight">
                    {step.label}
                  </h3>

                  <h4 className="mb-6 max-w-[500px] text-[clamp(1.3rem,2vw,2rem)] leading-[1.2] tracking-[-0.03em]">
                    {step.title}
                  </h4>

                  <p className="max-w-[460px] text-[15px] leading-[1.9] text-black/55">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}

      <div className="block md:hidden">
        {STEPS.map((step) => (
          <div key={step.num} className="border-b border-black/10">
            <video
              src={step.video}
              muted
              loop
              autoPlay
              playsInline
              className="aspect-video w-full object-cover"
            />

            <div className="px-6 py-10">
              <span className="mb-4 block text-[11px] uppercase tracking-[0.3em] text-[#b4101d]">
                Step {step.num}
              </span>

              <h3 className="mb-3 text-5xl font-semibold uppercase leading-none">
                {step.label}
              </h3>

              <h4 className="mb-5 text-2xl">
                {step.title}
              </h4>

              <p className="text-black/60 leading-8">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}