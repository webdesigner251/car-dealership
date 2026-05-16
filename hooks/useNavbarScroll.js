// hooks/useNavbarScroll.js

"use client";

import { useEffect } from "react";

export const useNavbarScroll = () => {
  useEffect(() => {
    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    let lastScrollY = 0;
    let navHidden = false;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Background blur effect
      if (currentY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Hide navbar on scroll down
      if (currentY > lastScrollY + 8 && currentY > 200) {
        if (!navHidden) {
          navbar.classList.add("hidden");
          navbar.classList.remove("visible");
          navHidden = true;
        }
      }

      // Show navbar on scroll up
      else if (currentY < lastScrollY - 8) {
        if (navHidden) {
          navbar.classList.remove("hidden");
          navbar.classList.add("visible");
          navHidden = false;
        }
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};