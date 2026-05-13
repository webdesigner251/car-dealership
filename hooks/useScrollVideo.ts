"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface TextScene {
  at: number;
  title: string;
  sub: string;
}

export const useScrollVideo = (
  videoId: string,
  canvasId: string,
  scenes: TextScene[],
  scrollDistance = 5000,
) => {
  const initialized = useRef(false);

  useEffect(() => {
    // STRICT MODE FIX
    if (initialized.current) return;
    initialized.current = true;

    const video = document.getElementById(videoId) as HTMLVideoElement;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    // ─────────────────────────────
    // CANVAS RESIZE
    // ─────────────────────────────
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawFrame();
    };

    // ─────────────────────────────
    // DRAW VIDEO FRAME
    // ─────────────────────────────
    const drawFrame = () => {
      if (!video.videoWidth) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const videoRatio = video.videoWidth / video.videoHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let x = 0;
      let y = 0;

      // COVER MODE
      if (videoRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * videoRatio;
        x = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / videoRatio;
        y = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(video, x, y, drawWidth, drawHeight);
    };

    // ─────────────────────────────
    // VIDEO UPDATE
    // ─────────────────────────────
    const updateVideo = (progress: number) => {
      if (!video.duration) return;

      const targetTime = progress * video.duration;

      if (Math.abs(video.currentTime - targetTime) > 0.016) {
        video.currentTime = targetTime;
      }
    };

    // ─────────────────────────────
    // INIT
    // ─────────────────────────────
    const init = () => {
      resizeCanvas();

      video.pause();

      // DRAW INITIAL FRAME
      video.currentTime = 0;

      const handleSeeked = () => {
        drawFrame();
      };

      video.addEventListener("seeked", handleSeeked);

      // KILL OLD TRIGGERS
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });

      // ─────────────────────────
      // MAIN VIDEO SCRUB
      // ─────────────────────────
      const master = ScrollTrigger.create({
        trigger: "#hero-scroll-wrapper",
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          cancelAnimationFrame(animationFrame);

          animationFrame = requestAnimationFrame(() => {
            updateVideo(self.progress);
          });
        },
      });

      // ─────────────────────────
      // TEXT SCENES
      // ─────────────────────────
      scenes.forEach((scene, i) => {
        const el = document.getElementById(`scene-${i}`);

        if (!el) return;

        const nextScene = scenes[i + 1];

        const start = scene.at * scrollDistance;
        const end = nextScene ? nextScene.at * scrollDistance : scrollDistance;

        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 80,
          filter: i === 0 ? "blur(0px)" : "blur(10px)",
        });

        // ENTER
        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",

          scrollTrigger: {
            trigger: "#hero-scroll-wrapper",
            start: `top+=${start} top`,
            end: `top+=${start + 300} top`,
            scrub: true,
          },
        });

        // EXIT
        gsap.to(el, {
          opacity: 0,
          y: -80,
          filter: "blur(10px)",
          ease: "none",

          scrollTrigger: {
            trigger: "#hero-scroll-wrapper",
            start: `top+=${end - 300} top`,
            end: `top+=${end} top`,
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();

      return () => {
        master.kill();
        video.removeEventListener("seeked", handleSeeked);
      };
    };

    // WAIT VIDEO LOAD
    if (video.readyState >= 2) {
      init();
    } else {
      video.addEventListener("loadeddata", init);
    }

    // RESIZE
    window.addEventListener("resize", resizeCanvas);

    return () => {
      initialized.current = false;

      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resizeCanvas);

      video.removeEventListener("loadeddata", init);

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [videoId, canvasId, scenes, scrollDistance]);
};
