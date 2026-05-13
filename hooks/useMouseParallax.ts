// hooks/useMouseParallax.ts

"use client";

import { useEffect } from "react";

export const useMouseParallax = () => {
  useEffect(() => {
    const videoBg = document.getElementById("video-bg");

    if (!videoBg) return;

    let bgX = 0;
    let bgY = 0;

    const handleMove = (e: MouseEvent) => {
      const nX = (e.clientX / window.innerWidth - 0.5) * 2;
      const nY = (e.clientY / window.innerHeight - 0.5) * 2;

      bgX += (nX * 18 - bgX) * 0.04;
      bgY += (nY * 12 - bgY) * 0.04;
    };

    const animate = () => {
      videoBg.style.transform = `translate(${bgX}px, ${bgY}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);
};
