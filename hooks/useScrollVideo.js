"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/hooks/scenes";

gsap.registerPlugin(ScrollTrigger);

export const useScrollVideo = (
  videoId = "hero-video",
  canvasId = "hero-canvas",
  scrollDistance = 7000,
) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const video = document.getElementById(videoId);
    const canvas = document.getElementById(canvasId);
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: true,
    });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
    }

    // ── Canvas sizing ────────────────────────────────────────────────────
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ── Cover-fit draw ───────────────────────────────────────────────────
    const drawFrame = () => {
      if (!video.videoWidth || !ctx) return;
      const vr = video.videoWidth / video.videoHeight;
      const cr = canvas.width / canvas.height;
      let w = canvas.width,
        h = canvas.height,
        x = 0,
        y = 0;
      if (vr > cr) {
        w = h * vr;
        x = (canvas.width - w) / 2;
      } else {
        h = w / vr;
        y = (canvas.height - h) / 2;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, x, y, w, h);
    };

    // ── State ────────────────────────────────────────────────────────────
    let rawTarget = 0; // progress set by ScrollTrigger
    let smoothP = 0; // lerped progress — drives everything
    let rafId = null;
    let rvfcId = null; // requestVideoFrameCallback handle
    let isSeeking = false;

    // ── DOM refs ─────────────────────────────────────────────────────────
    const overlay = document.getElementById("cinematic-overlay");
    const scrollHint = document.getElementById("scroll-hint");

    const sceneCache = SCENES.map((scene, i) => ({
      scene,
      sceneEl: document.getElementById(scene.id),
      subEl: document.getElementById(`scene-${i}-sub`),
      btnEl: document.getElementById(`scene-${i}-btns`),
    }));

    // ── requestVideoFrameCallback — draw ONLY when a new frame is ready ──
    // This is the key fix. Instead of drawing every RAF tick (which shows
    // the same frozen frame while a seek is pending), we register a callback
    // that fires exactly when the browser has a new decoded frame ready.
    // Result: canvas always shows a real frame, never a frozen duplicate.
    const scheduleFrameDraw = () => {
      if ("requestVideoFrameCallback" in video) {
        rvfcId = video.requestVideoFrameCallback(() => {
          drawFrame();
          scheduleFrameDraw(); // re-register for next frame
        });
      }
    };

    // ── Update UI (overlay, text, scenes) ────────────────────────────────
    // Runs every RAF tick from smoothP — independent of video decode state
    const updateUI = (p) => {
      if (overlay) {
        overlay.style.opacity =
          p < 0.2 ? 0.52 : gsap.utils.mapRange(0.2, 1.0, 0.52, 0.15, p);
      }

      if (scrollHint) {
        scrollHint.style.opacity =
          p < 0.05 ? gsap.utils.mapRange(0, 0.05, 1, 0, p) : 0;
      }

      sceneCache.forEach(({ scene, sceneEl, subEl, btnEl }) => {
        if (!sceneEl) return;
        const { enter, exit } = scene;
        // Final scene never exits — it stays visible until the pin releases
        const exitStart = scene.isFinal ? Infinity : exit - 0.05;

        let sceneOp = 0;
        if (p >= enter) {
          if (p < enter + 0.03) {
            sceneOp = gsap.utils.mapRange(enter, enter + 0.03, 0, 1, p);
          } else if (!scene.isFinal && p >= exitStart) {
            sceneOp = gsap.utils.mapRange(exitStart, exit, 1, 0, p);
          } else {
            sceneOp = 1;
          }
        }
        sceneEl.style.opacity = sceneOp;
        sceneEl.style.visibility = sceneOp > 0.005 ? "visible" : "hidden";

        const revealStart = enter;
        const revealEnd = enter + 0.14;
        const charEls = sceneEl.querySelectorAll(".char");
        const total = charEls.length;

        charEls.forEach((charEl, ci) => {
          const charPos = total > 1 ? ci / (total - 1) : 0;
          const front = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(revealStart, revealEnd, 0, 1, p),
          );
          const dist = front - charPos;
          let charOpacity;
          if (p < revealStart) charOpacity = 0.12;
          else if (p <= revealEnd) {
            if (dist < 0) charOpacity = 0.12;
            else if (dist < 0.08)
              charOpacity = gsap.utils.mapRange(0, 0.08, 1.0, 0.85, dist);
            else charOpacity = 1.0;
          } else charOpacity = 1.0;
          charEl.style.color = `rgba(255,255,255,${charOpacity})`;
        });

        if (subEl) {
          const subEnter = enter + 0.1;
          const subEnd = enter + 0.17;
          let subOp = 0,
            subTy = 14;
          if (p >= subEnter && (scene.isFinal || p < exitStart)) {
            subOp =
              p < subEnd ? gsap.utils.mapRange(subEnter, subEnd, 0, 1, p) : 1;
            subTy =
              p < subEnd ? gsap.utils.mapRange(subEnter, subEnd, 14, 0, p) : 0;
          } else if (!scene.isFinal && p >= exitStart && p < exit) {
            subOp = gsap.utils.mapRange(exitStart, exit, 1, 0, p);
            subTy = gsap.utils.mapRange(exitStart, exit, 0, -14, p);
          }
          subEl.style.opacity = subOp;
          subEl.style.transform = `translateY(${subTy}px)`;
        }

        if (scene.isFinal && btnEl) {
          const btnEnter = enter + 0.14;
          const btnEnd = enter + 0.21;
          const btnOp =
            p >= btnEnter
              ? p < btnEnd
                ? gsap.utils.mapRange(btnEnter, btnEnd, 0, 1, p)
                : 1
              : 0;
          btnEl.style.opacity = btnOp;
          btnEl.style.transform = `translateY(${(1 - btnOp) * 18}px)`;
        }
      });
    };

    let lastSeekTime = 0;
    const seekThreshold = 1 / 24; // only seek when progress changes enough for a new frame

    // ── Master RAF loop ──────────────────────────────────────────────────
    // Lerps smoothP and seeks video. Drawing happens separately via
    // requestVideoFrameCallback so canvas never shows a stale frame.
    const loop = () => {
      // Lerp toward scroll target — 0.12 = responsive but smooth
      smoothP += (rawTarget - smoothP) * 0.12;

      if (video.duration) {
        const targetTime = smoothP * video.duration;
        const timeDelta = Math.abs(lastSeekTime - targetTime);

        // Only seek when the desired time moves far enough to justify it.
        // This avoids repeated micro-seeks that can make playback feel choppy.
        if (timeDelta > seekThreshold) {
          lastSeekTime = targetTime;
          video.currentTime = targetTime;
        }
      }

      // Update all UI from smoothP every frame — independent of video state
      updateUI(smoothP);

      // Fallback draw every frame for browsers without requestVideoFrameCallback
      if (!("requestVideoFrameCallback" in video)) {
        drawFrame();
      }

      rafId = requestAnimationFrame(loop);
    };

    // ── Start everything once video metadata is ready ────────────────────
    const startLoop = () => {
      video.pause();
      video.currentTime = 0;

      // Start the frame-ready draw loop
      scheduleFrameDraw();

      // Start the lerp + seek loop
      rafId = requestAnimationFrame(loop);
    };

    if (video.readyState >= 2) {
      startLoop();
    } else {
      video.addEventListener("loadeddata", startLoop, { once: true });
    }

    // ── ScrollTrigger ────────────────────────────────────────────────────
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const st = ScrollTrigger.create({
      trigger: "#hero-scroll-wrapper",
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      anticipatePin: 1,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate(self) {
        rawTarget = self.progress;
      },
    });

    if (scrollHint) {
      gsap.to(scrollHint, {
        opacity: 1,
        duration: 1.4,
        delay: 1.0,
        ease: "power2.out",
      });
    }

    ScrollTrigger.refresh();

    return () => {
      initialized.current = false;
      cancelAnimationFrame(rafId);
      if ("requestVideoFrameCallback" in video && rvfcId) {
        video.cancelVideoFrameCallback(rvfcId);
      }
      window.removeEventListener("resize", resizeCanvas);
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [videoId, canvasId, scrollDistance]);
};
