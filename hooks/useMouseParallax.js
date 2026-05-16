// hooks/useMouseParallax.js

"use client";

import { useEffect } from "react";

export const useMouseParallax = () => {
  useEffect(() => {
    // Target the cinematic video for subtle parallax
    const videoEl = document.getElementById("hero-video");

    if (!videoEl) return;

    let bgX = 0;
    let bgY = 0;
    let rafId;

    const handleMove = (e) => {
      const nX = (e.clientX / window.innerWidth - 0.5) * 2;
      const nY = (e.clientY / window.innerHeight - 0.5) * 2;

      bgX += (nX * 12 - bgX) * 0.04;
      bgY += (nY * 8  - bgY) * 0.04;
    };

    const animate = () => {
      // Subtle scale + translate so the video never shows edges
      videoEl.style.transform = `scale(1.06) translate(${bgX}px, ${bgY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
};