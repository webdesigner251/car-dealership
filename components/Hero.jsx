// components/Hero.jsx
"use client";

import { useEffect, useRef } from "react";
import { useLenis }        from "@/hooks/useLenis";
import { useScrollVideo }  from "@/hooks/useScrollVideo";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { SCENES }          from "@/hooks/scenes";

const SCROLL_DISTANCE = 7000;

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

/**
 * CharReveal
 *
 * Splits `text` into individual character <span class="char"> elements.
 * Each char starts at rgba(255,255,255,0.12) — a dim ghost.
 * The hook sweeps their color left→right to rgba(255,255,255,1) as scroll
 * progresses, exactly like Terminal Industries.
 *
 * Spaces are rendered as non-breaking spaces so layout is preserved.
 */
function CharReveal({ text }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{
            color: "rgba(255,255,255,0.12)",
            // Preserve space width
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  useLenis();
  useNavbarScroll();
  useScrollVideo("hero-video", "hero-canvas", SCROLL_DISTANCE);

  // Floating dust particles
  useEffect(() => {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 50 }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 1.3 + 0.2,
      vx:    (Math.random() - 0.5) * 0.15,
      vy:    (Math.random() - 0.5) * 0.10,
      alpha: Math.random() * 0.28 + 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,85,0,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main>
      {/* Film-grain noise */}
      <div
        id="noise"
        className="animate-noise fixed inset-0 z-[9990] pointer-events-none opacity-[0.028]"
        style={{ backgroundImage: NOISE_SVG, backgroundSize: "200px 200px" }}
      />

      {/* SCROLL WRAPPER — pinned by ScrollTrigger */}
      <div id="hero-scroll-wrapper" ref={heroRef} className="relative w-full">
        <section
          id="hero"
          className="relative w-full h-screen overflow-hidden bg-[#050507]"
        >
          {/* Hidden video — seeked by hook, frames drawn to canvas */}
          <video
            id="hero-video"
            muted
            playsInline
            preload="auto"
            className="absolute opacity-0 pointer-events-none"
            style={{ width: 1, height: 1 }}
            aria-hidden="true"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Canvas — zero-stutter frame rendering */}
          <canvas
            id="hero-canvas"
            className="absolute inset-0 w-full h-full z-[1] bg-[#050507]"
          />

          {/* Cinematic overlay */}
          <div
            id="cinematic-overlay"
            className="absolute inset-0 z-[2] bg-[#050507] pointer-events-none"
            style={{ opacity: 0 }}
          />

          {/* Grid lines */}
          <div className="bg-grid-lines absolute inset-0 z-[3] pointer-events-none" />

          {/* Vignette */}
          <div className="bg-vignette absolute inset-0 z-[4] pointer-events-none" />

          {/* Bottom gradient */}
          <div className="bg-gradient-bottom absolute inset-0 z-[4] pointer-events-none" />

          {/* Orb 1 */}
          <div
            className="animate-orb-1 absolute rounded-full pointer-events-none z-[3] blur-[80px]"
            style={{
              width: 400, height: 400,
              background: "radial-gradient(circle, rgba(255,85,0,0.08), transparent 70%)",
              top: "-10%", left: "-8%",
            }}
          />

          {/* Orb 2 */}
          <div
            className="animate-orb-2 absolute rounded-full pointer-events-none z-[3] blur-[80px]"
            style={{
              width: 500, height: 500,
              background: "radial-gradient(circle, rgba(30,60,120,0.07), transparent 70%)",
              bottom: "-15%", right: "-10%",
            }}
          />

          {/* Particles */}
          <canvas id="particles-canvas" className="absolute inset-0 z-[5] pointer-events-none" />

          {/* Light streaks */}
          <div className="animate-streak-1 absolute z-[6] h-px pointer-events-none opacity-0"
            style={{ width: 200, top: "30%", left: "10%", background: "linear-gradient(90deg,transparent,rgba(255,85,0,0.45),transparent)", transform: "rotate(-15deg)" }} />
          <div className="animate-streak-2 absolute z-[6] h-px pointer-events-none opacity-0"
            style={{ width: 300, top: "60%", right: "5%", background: "linear-gradient(90deg,transparent,rgba(255,85,0,0.45),transparent)", transform: "rotate(-8deg)" }} />
          <div className="animate-streak-3 absolute z-[6] h-px pointer-events-none opacity-0"
            style={{ width: 150, top: "20%", right: "25%", background: "linear-gradient(90deg,transparent,rgba(255,85,0,0.45),transparent)", transform: "rotate(-20deg)" }} />

          {/* ── TEXT SCENES ── */}
          {SCENES.map((scene, i) => (
            <div
              key={scene.id}
              id={scene.id}
              className="absolute inset-0 z-[20] flex flex-col items-center justify-center text-center px-6 pointer-events-none"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              {/* Headline — chars illuminated left→right by hook */}
              <h2
                className={[
                  "font-bebas leading-[0.95] tracking-[0.02em] mb-6 max-w-5xl",
                  scene.isFinal
                    ? "text-[clamp(2.2rem,4.8vw,5.8rem)]"
                    : "text-[clamp(3rem,7vw,8.5rem)]",
                  "[text-shadow:0_2px_60px_rgba(0,0,0,0.8)]",
                ].join(" ")}
              >
                <CharReveal text={scene.headline} />
              </h2>

              {/* Sub text */}
              <p
                id={`scene-${i}-sub`}
                className="font-grotesk text-[clamp(0.88rem,1.4vw,1.05rem)] font-light text-white max-w-lg leading-[1.78] tracking-[0.01em]"
              >
                {scene.sub}
              </p>

              {/* CTA buttons — final scene only */}
              {scene.isFinal && (
                <div
                  id={`scene-${i}-btns`}
                  className="flex items-center justify-center gap-4 flex-wrap mt-10 pointer-events-auto"
                  style={{ opacity: 0, transform: "translateY(18px)" }}
                >
                  <button className="group relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg text-[13px] font-bold tracking-[0.12em] uppercase text-white bg-[#B30E1C] border border-[#B30E1C] cursor-pointer transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 [box-shadow:0_0_30px_rgba(255,85,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] hover:[box-shadow:0_0_55px_rgba(255,85,0,0.5),0_8px_30px_rgba(255,85,0,0.25)]">
                    <span className="btn-shine-track" />
                    Explore Platform
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                  <button className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg text-[13px] font-bold tracking-[0.12em] uppercase text-white/85 bg-white/4 border border-white/15 backdrop-blur-md cursor-pointer transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#B30E1C]/50 hover:text-white [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06)] hover:[box-shadow:0_0_25px_rgba(255,85,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]">
                    View Solutions
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Scroll hint */}
          <div
            id="scroll-hint"
            className="absolute bottom-11 left-1/2 -translate-x-1/2 z-[25] flex flex-col items-center gap-2.5 pointer-events-none"
            style={{ opacity: 0 }}
          >
            <span className="text-[9px] tracking-[0.32em] uppercase text-white/30 font-grotesk">
              Scroll to explore
            </span>
            <div className="w-[26px] h-[42px] border border-[#B30E1C]/40 rounded-[20px] flex justify-center pt-[7px] [box-shadow:0_0_12px_rgba(255,85,0,0.1)]">
              <div className="animate-scroll-thumb w-1 h-2 bg-[#B30E1C] rounded-full [box-shadow:0_0_8px_#B30E1C]" />
            </div>
          </div>

        </section>
      </div>


      {/* <section className="h-screen bg-[#080809] flex items-center justify-center font-bebas text-[4rem] text-white/5 tracking-[0.2em] border-t border-white/8">
        <span>Auto Forge Solutions</span>
      </section> */}
    </main>
  );
}

