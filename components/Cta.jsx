"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Floating dust particles (same pattern as Hero) ─── */
function useParticles(canvasId) {
  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles = Array.from({ length: 60 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.2,
      vx:    (Math.random() - 0.5) * 0.18,
      vy:    (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.3 + 0.04,
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
        ctx.fillStyle = `rgba(179,14,28,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [canvasId]);
}

export default function CTA() {
  const sectionRef  = useRef(null);
  const badgeRef    = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const btnRef      = useRef(null);
  const contactRef  = useRef(null);
  const orb1Ref     = useRef(null);
  const orb2Ref     = useRef(null);
  const ring1Ref    = useRef(null);
  const ring2Ref    = useRef(null);
  const gridRef     = useRef(null);
  const streak1Ref  = useRef(null);
  const streak2Ref  = useRef(null);
  const streak3Ref  = useRef(null);
  const dividerRef  = useRef(null);

  useParticles("cta-particles");

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Grid drift in ── */
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, scale: 1.08 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
        }
      );

      /* ── 2. Orbs bloom in ── */
      gsap.fromTo(
        [orb1Ref.current, orb2Ref.current],
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          stagger: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      /* ── 3. Rings pulse in ── */
      gsap.fromTo(
        [ring1Ref.current, ring2Ref.current],
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "back.out(1.4)",
          stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );

      /* ── 4. Divider line draws in ── */
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      /* ── 5. Badge drops + bounces ── */
      gsap.fromTo(
        badgeRef.current,
        { y: -32, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "back.out(2)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        }
      );

      /* ── 6. Heading — each word flips up with 3-D perspective ── */
      const words = headingRef.current?.querySelectorAll(".cta-word");
      if (words?.length) {
        gsap.set(headingRef.current, { perspective: 700 });
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -40, transformOrigin: "50% 100%" },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.09,
            scrollTrigger: { trigger: sectionRef.current, start: "top 73%" },
          }
        );
      }

      /* ── 7. Sub text slides up ── */
      gsap.fromTo(
        subRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      /* ── 8. Button scale-bounce ── */
      gsap.fromTo(
        btnRef.current,
        { scale: 0.65, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 67%" },
        }
      );

      /* ── 9. Contact row fades up ── */
      gsap.fromTo(
        contactRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 64%" },
        }
      );

      /* ── 10. Light streaks loop ── */
      const streakTween = (el, delay) =>
        gsap.fromTo(
          el,
          { x: "-40px", opacity: 0 },
          {
            x: "40px",
            opacity: 0,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            delay,
            keyframes: [
              { x: "-40px", opacity: 0,   duration: 0 },
              { x: "0px",   opacity: 0.55, duration: 1.2 },
              { x: "40px",  opacity: 0,   duration: 1.2 },
            ],
          }
        );
      streakTween(streak1Ref.current, 0);
      streakTween(streak2Ref.current, 1.4);
      streakTween(streak3Ref.current, 2.8);

      /* ── 11. Orbs continuous drift ── */
      gsap.to(orb1Ref.current, {
        x: 40, y: -28, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
      gsap.to(orb2Ref.current, {
        x: -32, y: 22, duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2,
      });

      /* ── 12. Rings slow pulse ── */
      gsap.to(ring1Ref.current, {
        scale: 1.06, opacity: 0.06, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
      gsap.to(ring2Ref.current, {
        scale: 1.04, opacity: 0.04, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-site-black px-6 py-28 md:py-40"
    >
      {/* ── Particles canvas ── */}
      <canvas
        id="cta-particles"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* ── Grid lines (same as BuiltForResults) ── */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Glow rings (same as BuiltForResults) ── */}
      <div
        ref={ring1Ref}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full border border-[#b4101d]/10"
      />
      <div
        ref={ring2Ref}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full border border-[#b4101d]/10"
      />

      {/* ── Red glow orbs ── */}
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(179,14,28,0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute -bottom-32 -right-32 h-[550px] w-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(179,14,28,0.10) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* ── Light streaks ── */}
      <div
        ref={streak1Ref}
        className="pointer-events-none absolute h-px opacity-0"
        style={{
          width: 220, top: "28%", left: "12%",
          background: "linear-gradient(90deg, transparent, rgba(179,14,28,0.5), transparent)",
          transform: "rotate(-15deg)",
        }}
      />
      <div
        ref={streak2Ref}
        className="pointer-events-none absolute h-px opacity-0"
        style={{
          width: 300, top: "62%", right: "8%",
          background: "linear-gradient(90deg, transparent, rgba(179,14,28,0.4), transparent)",
          transform: "rotate(-8deg)",
        }}
      />
      <div
        ref={streak3Ref}
        className="pointer-events-none absolute h-px opacity-0"
        style={{
          width: 160, top: "18%", right: "22%",
          background: "linear-gradient(90deg, transparent, rgba(179,14,28,0.35), transparent)",
          transform: "rotate(-20deg)",
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(5,5,7,0.72) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">

        {/* Divider line */}
        <div
          ref={dividerRef}
          className="mb-10 h-px w-24 origin-left"
          style={{ background: "linear-gradient(90deg, #B30E1C, transparent)" }}
        />

        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl"
        >
          <span
            className="h-[7px] w-[7px] rounded-full bg-[#B30E1C]"
            style={{ animation: "dotPulse 2.2s ease-in-out infinite" }}
            aria-hidden="true"
          />
          Take the Next Step
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="m-0 text-white"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 10vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
          }}
          aria-label="Ready to Forge Your Future?"
        >
          {[
            { text: "Ready",   red: false },
            { text: "to",      red: false },
            { text: "Forge",   red: true  },
            { text: "Your",    red: false },
            { text: "Future?", red: false },
          ].map(({ text, red }, i) => (
            <span
              key={i}
              className="cta-word inline-block"
              style={{
                marginRight: text === "Future?" ? 0 : "0.22em",
                color: red ? "#B30E1C" : "#FAFAFA",
                textShadow: red ? "0 0 40px rgba(179,14,28,0.5)" : "none",
              }}
            >
              {text}
            </span>
          ))}
        </h2>

        {/* Sub text */}
        <p
          ref={subRef}
          className="mt-6 max-w-[480px] text-base leading-[1.7]"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          Join the dealerships already running on the most advanced AI platform
          in the industry. Most stores are live and seeing results inside 30 days.
        </p>

        {/* CTA Button */}
        <button
          ref={btnRef}
          className="group relative mt-10 overflow-hidden inline-flex items-center gap-2.5 rounded-lg bg-[#B30E1C] border border-[#B30E1C] px-8 py-3.5 text-[13px] font-bold tracking-[0.12em] uppercase text-white cursor-pointer transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5"
          style={{
            boxShadow: "0 0 30px rgba(179,14,28,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 55px rgba(179,14,28,0.55), 0 8px 30px rgba(179,14,28,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 30px rgba(179,14,28,0.3), inset 0 1px 0 rgba(255,255,255,0.15)";
          }}
        >
          {/* Shine sweep */}
          <span className="btn-shine-track" aria-hidden="true" />
          Schedule Your Demo
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </button>

        {/* Contact row */}
        <div
          ref={contactRef}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.25em]"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            demo@autoforge.example
          </span>
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
            </svg>
            +1 (555) 010-AUTO
          </span>
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Austin · Texas
          </span>
        </div>
      </div>
    </section>
  );
}
