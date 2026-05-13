"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    // IMPORTANT
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP RAF
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    // REFRESH
    const resize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", resize);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);

      window.removeEventListener("resize", resize);

      lenis.destroy();
    };
  }, []);
};
