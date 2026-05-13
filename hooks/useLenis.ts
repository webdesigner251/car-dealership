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

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    const handleRefresh = () => {
      lenis.resize();
    };

    lenis.on("scroll", handleScroll);
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value as number, { immediate: true });
          return;
        }

        return lenis.scroll ?? 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    let animationFrame = 0;
    const raf = (time: number) => {
      lenis.raf(time * 1000);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
    };
  }, []);
};
