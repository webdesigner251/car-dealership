// hooks/useMagneticButtons.js

"use client";

import { useEffect } from "react";
import gsap from "gsap";

export const useMagneticButtons = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll("[data-magnetic]");

    buttons.forEach((btn) => {
      const element = btn;

      const move = (e) => {
        const r = element.getBoundingClientRect();

        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;

        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;

        gsap.to(element, {
          x: dx,
          y: dy,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const leave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      };

      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);

      return () => {
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      };
    });
  }, []);
};