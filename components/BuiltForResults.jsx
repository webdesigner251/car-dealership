"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BuiltForResults() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade + lift
      gsap.from(".bfr-section", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bfr-section",
          start: "top 80%",
        },
      });

      // Terminal lines stagger
      gsap.from(".terminal-line", {
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bfr-section",
          start: "top 75%",
        },
      });

      // Counter animation
      const counters = document.querySelectorAll(".counter");

      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");

        ScrollTrigger.create({
          trigger: counter,
          start: "top 90%",
          once: true,
          onEnter: () => {
            let obj = { val: 0 };

            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                counter.innerText = Math.floor(obj.val);
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bfr-section relative w-full bg-black text-white py-28 overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-bg" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Terminal Header */}
        <div className="mb-10">
          <p className="text-green-400 font-mono text-sm terminal-line">
            &gt; initializing performance engine...
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 terminal-line">
            Built for <span className="text-green-400">Results</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl terminal-line">
            High-performance dealership systems engineered for conversion, speed, and automation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          
          <div className="bg-[#0a0a0a] border border-green-500/20 p-6 rounded-xl shadow-[0_0_40px_rgba(0,255,100,0.08)]">
            <p className="text-green-400 font-mono">conversion_rate</p>
            <h3 className="text-4xl font-bold mt-3">
              <span className="counter" data-target="320">0</span>%
            </h3>
            <p className="text-gray-500 mt-2">increase in lead conversion</p>
          </div>

          <div className="bg-[#0a0a0a] border border-green-500/20 p-6 rounded-xl shadow-[0_0_40px_rgba(0,255,100,0.08)]">
            <p className="text-green-400 font-mono">system_speed</p>
            <h3 className="text-4xl font-bold mt-3">
              <span className="counter" data-target="98">0</span>%
            </h3>
            <p className="text-gray-500 mt-2">faster workflow execution</p>
          </div>

          <div className="bg-[#0a0a0a] border border-green-500/20 p-6 rounded-xl shadow-[0_0_40px_rgba(0,255,100,0.08)]">
            <p className="text-green-400 font-mono">automation_level</p>
            <h3 className="text-4xl font-bold mt-3">
              <span className="counter" data-target="87">0</span>%
            </h3>
            <p className="text-gray-500 mt-2">processes fully automated</p>
          </div>

        </div>
      </div>

      {/* Background Animation Styles */}
      <style jsx>{`
        .grid-bg {
          width: 100%;
          height: 100%;
          background-image:
            linear-gradient(rgba(0,255,100,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,100,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: moveGrid 12s linear infinite;
        }

        @keyframes moveGrid {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(60px);
          }
        }
      `}</style>
    </section>
  );
}