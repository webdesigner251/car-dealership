"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,           // standard smooth scroll feel
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("resize", onResize);
      lenis.destroy();
    };
  }, []);
};
