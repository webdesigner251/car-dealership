"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLenis } from "@/hooks/useLenis";
import { useScrollVideo, TextScene } from "@/hooks/useScrollVideo";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useMagneticButtons } from "@/hooks/useMagneticButtons";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";

gsap.registerPlugin(ScrollTrigger);

// ── Define your text scenes here ──────────────────────────────────────────
// `at` is 0–1 progress through the video scroll
const SCENES: TextScene[] = [
  {
    at: 0.0,
    title: "The AI Brain Behind Every Sale",
    sub: "AI-powered automotive ecosystems transforming dealerships into high-performance revenue machines.",
  },
  {
    at: 0.28,
    title: "Intelligent Lead Management",
    sub: "Every prospect captured, nurtured, and converted — automatically.",
  },
  {
    at: 0.55,
    title: "Predictive Revenue Analytics",
    sub: "Know what your customer wants before they walk through the door.",
  },
  {
    at: 0.78,
    title: "Always-On Dealership Intelligence",
    sub: "24/7 AI that never sleeps, never misses, never forgets.",
  },
];

const SCROLL_DISTANCE = 5000; // px — more = slower / smoother feel

export default function Hero() {
  useLenis();
  useMouseParallax();
  useMagneticButtons();
  useCustomCursor();
  useNavbarScroll();

  // ── Intro badge + button animation (runs once, no scroll) ────────────
  useEffect(() => {
    gsap.set(["#hero-badge", "#btn-group"], { opacity: 0, y: 20 });

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to("#hero-badge", { opacity: 1, y: 0, duration: 0.8 })
      .to("#btn-group", { opacity: 1, y: 0, duration: 0.8 }, 0.4);
  }, []);

  // ── Canvas-based scroll video + text scenes ──────────────────────────
  useScrollVideo("hero-video", "hero-canvas", SCENES, SCROLL_DISTANCE);

  return (
    <main>
      {/* Cursor */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />

      {/* Noise overlay */}
      <div id="noise" />

      {/*
        hero-scroll-wrapper  → ScrollTrigger pins this
        hero-canvas          → video frames drawn here
        scene-N              → text overlays, absolutely positioned
      */}
      <div
        id="hero-scroll-wrapper"
        style={{ position: "relative", width: "100%", height: "100vh" }}
      >
        {/* Canvas fills the screen — video frames drawn here */}
        <canvas
          id="hero-canvas"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />

        {/* Hidden video element — never shown, only used as pixel source */}
        <video
          id="hero-video"
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          style={{ display: "none" }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient + grid overlays */}
        <div
          className="gradient-overlay"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />
        <div
          className="grid-lines"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />
        <div
          className="orb orb-1"
          style={{ position: "absolute", zIndex: 1 }}
        />
        <div
          className="orb orb-2"
          style={{ position: "absolute", zIndex: 1 }}
        />
        <div
          className="vignette"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />
        <canvas
          id="particles-canvas"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />

        {/* ── Text scenes — one per SCENES entry ── */}
        {SCENES.map((scene, i) => (
          <div
            key={i}
            id={`scene-${i}`}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 2rem",
              textAlign: "center",
              // First scene starts visible (hero headline); rest start hidden
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {/* Badge only on scene 0 */}
            {i === 0 && (
              <div id="hero-badge" className="hero-badge">
                <div className="badge-dot" />
                Next-Gen Automotive AI
              </div>
            )}

            <h2
              className={i === 0 ? "hero-headline" : "scene-headline"}
              style={{ maxWidth: 900 }}
            >
              {scene.title}
            </h2>

            <p
              className={i === 0 ? "hero-sub" : "scene-sub"}
              style={{ maxWidth: 600 }}
            >
              {scene.sub}
            </p>

            {/* CTA buttons only on scene 0 */}
            {i === 0 && (
              <div id="btn-group" className="btn-group">
                <button className="btn btn-primary" data-magnetic>
                  Request Demo
                </button>
                <button className="btn btn-secondary" data-magnetic>
                  Explore Platform
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content below the pinned hero */}
      <section>
        <div className="container">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil dolore
          unde suscipit deleniti saepe incidunt provident totam, minima fugiat
          dicta nostrum vel porro repudiandae sit, magni voluptatum nesciunt
          adipisci dolor voluptatibus sed ea! Fugit modi nihil natus sint eum
          quod itaque magni dolorem? Quae similique facere tempore eius nesciunt
          cupiditate quam laboriosam sunt totam corporis reprehenderit ipsa
          consequuntur incidunt ipsam possimus asperiores aspernatur, voluptate
          sit itaque quidem debitis vitae doloribus rem explicabo. Cupiditate
          minus iste beatae temporibus unde assumenda numquam, ullam accusantium
          repellat rem saepe, suscipit possimus aliquam optio ea. Ullam possimus
          ab veritatis ex iusto deserunt. Iure, dicta, error ipsum qui
          temporibus, sint magni voluptates nostrum provident ducimus facere
          recusandae neque distinctio inventore vel doloremque autem voluptatum
          consectetur pariatur libero iste minima quis. Dolor rerum molestias
          est officia nobis odit, nulla quod eveniet illo porro enim odio quasi
          harum, accusamus, quam ducimus atque ad consequuntur maxime dolorum?
          Possimus illo maxime quam quibusdam. Accusamus ea quos amet sapiente
          quibusdam rerum aperiam quas voluptates quasi ipsum cumque veritatis
          qui, nihil, officiis harum rem id vel in? Obcaecati vel culpa natus
          ipsa officia eaque velit necessitatibus reiciendis at facere eligendi
          quo, quaerat temporibus provident excepturi. Cum porro maxime ipsum
          aspernatur perspiciatis quasi?
        </div>
      </section>
    </main>
  );
}
