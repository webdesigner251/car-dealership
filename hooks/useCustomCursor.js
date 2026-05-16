// hooks/useCustomCursor.js

"use client";

import { useEffect } from "react";
import gsap from "gsap";

export const useCustomCursor = () => {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");

    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    // GSAP optimized setters
    const moveDotX = gsap.quickSetter(dot, "x", "px");
    const moveDotY = gsap.quickSetter(dot, "y", "px");

    const moveRingX = gsap.quickSetter(ring, "x", "px");
    const moveRingY = gsap.quickSetter(ring, "y", "px");

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      moveDotX(mouseX);
      moveDotY(mouseY);
    };

    document.addEventListener("mousemove", handleMouseMove);

    gsap.ticker.add(() => {
      // Faster follow
      ringX += (mouseX - ringX) * 0.28;
      ringY += (mouseY - ringY) * 0.28;

      moveRingX(ringX);
      moveRingY(ringY);
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-magnetic]",
    );

    const enter = () => ring.classList.add("expanded");
    const leave = () => ring.classList.remove("expanded");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);

      gsap.ticker.remove(() => {});

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);
};