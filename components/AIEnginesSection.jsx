"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GLOBAL_STYLES = `
  @keyframes gridDrift {
    0%   { background-position: 0 0; }
    100% { background-position: 48px 48px; }
  }
  @keyframes scanDown {
    0%   { top: -2px; opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(180,16,29,0.6); }
    50%       { box-shadow: 0 0 0 6px transparent; }
  }
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-24px); }
  }
  @keyframes panelReveal {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes imgEnter {
    0%   { opacity:0; transform: perspective(900px) rotateY(-35deg) scale(0.88) translateX(-30px); }
    60%  { transform: perspective(900px) rotateY(6deg) scale(1.03) translateX(4px); }
    100% { opacity:1; transform: perspective(900px) rotateY(0deg) scale(1) translateX(0); }
  }
  @keyframes imgExit {
    0%   { opacity:1; transform: perspective(900px) rotateY(0deg) scale(1); }
    100% { opacity:0; transform: perspective(900px) rotateY(35deg) scale(0.88) translateX(30px); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes glowPulse {
    0%,100% { opacity: 0.5; }
    50%      { opacity: 1; }
  }
  .img-enter { animation: imgEnter 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .img-float { animation: floatY 4s ease-in-out infinite; }
  .forge-scrollbar-none::-webkit-scrollbar { display: none; }
  .forge-scrollbar-none { scrollbar-width: none; }
`;

const MODULES = [
  {
    id: "autolead", num: "01", name: "AutoLeadAI", tag: "Lead Intelligence",
    desc: "Real-time lead scoring and intelligent routing puts the hottest buyers in front of your best closers — automatically, every time.",
    stats: [
      { label: "Leads Scored Daily", value: 847, suffix: "" },
      { label: "Routing Accuracy", value: 94, suffix: "%" },
      { label: "Avg Response", value: 2.3, suffix: "s", decimal: true },
    ],
    features: ["Behavioral intent signals", "Auto-assign by rep capacity", "CRM push in real time"],
    code: `forge.leads.score({\n  source: "web",\n  priority: "hot"\n})`,
    image: "./step1.png",
    partLabel: "Lead Engine",
  },
  {
    id: "forgechat", num: "02", name: "ForgeChat", tag: "Engagement Engine",
    desc: "AI-powered chat and SMS that qualifies, nurtures, and books appointments while your team focuses on the floor.",
    stats: [
      { label: "Messages / Month", value: 12400, suffix: "" },
      { label: "SMS Open Rate", value: 68, suffix: "%" },
      { label: "Appt Conversion", value: 31, suffix: "%" },
    ],
    features: ["Automotive-trained AI", "Two-way SMS & web chat", "Live calendar booking"],
    code: `forge.chat.send({\n  to: lead.phone,\n  template: "follow_up"\n})`,
    image: "./step2.png",
    partLabel: "Chat Engine",
  },
  {
    id: "pricepulse", num: "03", name: "PricePulse", tag: "Pricing Engine",
    desc: "Dynamic inventory pricing that reacts to market velocity, competitor shifts, and days-on-lot in real time.",
    stats: [
      { label: "Inventory Value", value: 3.2, suffix: "M", prefix: "$", decimal: true },
      { label: "Gross Lift", value: 9.4, suffix: "%", prefix: "+", decimal: true },
      { label: "Vehicles Active", value: 847, suffix: "" },
    ],
    features: ["Market comp scanning", "Automated repricing rules", "Margin floor protection"],
    code: `forge.pricing.reprice({\n  vin: "1G6KD57...",\n  strategy: "velocity"\n})`,
    image: "./step3.png",
    partLabel: "Pricing Engine",
  },
  {
    id: "servicesync", num: "04", name: "ServiceSync", tag: "Service Intelligence",
    desc: "Predictive maintenance outreach and upsell triggers that fill your service lanes before customers think to call.",
    stats: [
      { label: "Repair Orders", value: 1240, suffix: "" },
      { label: "Upsell Attach", value: 78, suffix: "%" },
      { label: "Service GP", value: 214, suffix: "K", prefix: "$" },
    ],
    features: ["OBD mileage triggers", "Declined service follow-up", "Multi-point inspection AI"],
    code: `forge.service.notify({\n  trigger: "overdue_oil",\n  segment: "loyal"\n})`,
    image: "./step4.png",
    partLabel: "Service Engine",
  },
  {
    id: "dealeriq", num: "05", name: "DealerIQ", tag: "Executive Analytics",
    desc: "One pane of glass for the entire store — sales velocity, gross per unit, F&I attach, service throughput, and CSI — live.",
    stats: [
      { label: "Gross / Unit", value: 3182, suffix: "", prefix: "$" },
      { label: "F&I Attach Rate", value: 78, suffix: "%" },
      { label: "CSI Score", value: 94.6, suffix: "", decimal: true },
    ],
    features: ["Real-time KPI dashboard", "Forecast vs quota tracking", "Slack / SMS anomaly alerts"],
    code: `forge.iq.kpi({\n  metric: "gross_per_unit",\n  range: "ytd"\n})`,
    image: "./step5.png",
    partLabel: "Analytics Engine",
  },
];

function StatCounter({ value, prefix = "", suffix = "", decimal = false, trigger }) {
  const elRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = elRef.current;
    if (!el) return;
    let start = null;
    const duration = 1400;
    const tick = (now) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const cur = value * eased;
      const formatted = decimal ? Number(cur).toFixed(1) : Math.floor(cur).toLocaleString();
      el.textContent = `${prefix}${formatted}${suffix}`;
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else el.textContent = `${prefix}${decimal ? value.toFixed(1) : value.toLocaleString()}${suffix}`;
    };
    const delay = setTimeout(() => { rafRef.current = requestAnimationFrame(tick); }, 80);
    return () => { clearTimeout(delay); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value, trigger, decimal, prefix, suffix]);
  return <span ref={elRef}>{prefix}0{suffix}</span>;
}

/* ── Step Image with 3D flip animation ── */
function StepImage({ src, label, index }) {
  const [key, setKey] = useState(0);
  const prevSrc = useRef(src);

  useEffect(() => {
    if (prevSrc.current !== src) {
      prevSrc.current = src;
      setKey(k => k + 1);
    }
  }, [src]);

  return (
    <div style={{ position: "relative", width: "100%", perspective: "900px" }}>
      {/* Glow behind image */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: -24, left: "10%", right: "10%", height: 60,
        background: "radial-gradient(ellipse, rgba(180,16,29,0.45) 0%, transparent 70%)",
        filter: "blur(18px)", animation: "glowPulse 3s ease-in-out infinite",
      }} />
      {/* Corner decorations */}
      {[["0%","0%","right","bottom"],["100%","0%","left","bottom"],["0%","100%","right","top"],["100%","100%","left","top"]].map(([l,t,br,bb], ci) => (
        <div key={ci} aria-hidden="true" style={{
          position: "absolute", left: l, top: t, width: 18, height: 18,
          borderRight: br === "right" ? "none" : "1.5px solid rgba(180,16,29,0.6)",
          borderLeft: br === "right" ? "1.5px solid rgba(180,16,29,0.6)" : "none",
          borderBottom: bb === "bottom" ? "none" : "1.5px solid rgba(180,16,29,0.6)",
          borderTop: bb === "bottom" ? "1.5px solid rgba(180,16,29,0.6)" : "none",
          zIndex: 2,
        }} />
      ))}
      <div key={key} className="img-enter img-float" style={{ transformStyle: "preserve-3d" }}>
        <Image
          src={src}
          alt={label}
          width={600}
          height={400}
          style={{
            width: "100%", height: "auto", objectFit: "contain",
            filter: "drop-shadow(0 8px 40px rgba(180,16,29,0.35)) drop-shadow(0 2px 12px rgba(0,0,0,0.8))",
            borderRadius: 8,
          }}
          priority={index === 0}
        />
      </div>
      {/* Part label badge */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <div key={src} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{
          background: "rgba(180,16,29,0.12)", border: "1px solid rgba(180,16,29,0.35)",
          animation: "panelReveal 0.4s ease both",
        }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#b4101d", boxShadow: "0 0 6px rgba(180,16,29,0.8)" }} />
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
        </div>
      </div>
    </div>
  );
}

/* ── DESKTOP LAYOUT ── */
function DesktopLayout({ active, setActive }) {
  const panelRefs = useRef([]);
  const indicatorRef = useRef(null);
  const TAB_H = 84;

  const updateRevealed = useCallback(() => {}, []);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean);
    if (!panels.length) return;
    const triggers = [];
    panels.forEach((panel, i) => {
      gsap.set(panel, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40, filter: i === 0 ? "blur(0px)" : "blur(6px)" });
      const st = ScrollTrigger.create({
        trigger: panel,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => {
          setActive(i);
          gsap.to(panel, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" });
          gsap.fromTo(panel.querySelectorAll(".stat-cell"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.15 });
          gsap.fromTo(panel.querySelectorAll(".feature-item"), { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power2.out", delay: 0.25 });
        },
        onEnterBack: () => {
          setActive(i);
          gsap.to(panel, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" });
        },
        onLeave: () => gsap.to(panel, { opacity: 0, y: -30, filter: "blur(4px)", duration: 0.45, ease: "power2.in" }),
        onLeaveBack: () => gsap.to(panel, { opacity: 0, y: 40, filter: "blur(6px)", duration: 0.45, ease: "power2.in" }),
      });
      triggers.push(st);
    });
    return () => triggers.forEach(t => t.kill());
  }, [setActive]);

  useEffect(() => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, { top: active * TAB_H + 14, duration: 0.5, ease: "power3.out" });
  }, [active]);

  const scrollToPanel = (i) => {
    const el = panelRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2, behavior: "smooth" });
  };

  return (
    <div className="flex items-start">
      {/* Left nav */}
      <div className="shrink-0 self-start" style={{ width: 220, position: "sticky", top: 96 }}>
        <nav aria-label="Platform modules" className="relative">
          <div aria-hidden="true" className="absolute w-px" style={{ left: 26, top: TAB_H * 0.5, bottom: TAB_H * 0.5, background: "rgba(255,255,255,0.07)" }} />
          <div ref={indicatorRef} aria-hidden="true" className="absolute left-0 w-0.5 rounded-sm" style={{ top: 14, height: TAB_H - 28, background: "#b4101d", boxShadow: "0 0 18px rgba(180,16,29,0.6)" }} />
          {MODULES.map((m, i) => {
            const isAct = i === active;
            return (
              <button key={m.id} onClick={() => scrollToPanel(i)} role="tab" aria-selected={isAct}
                className="relative text-left w-full rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 block"
                style={{ height: TAB_H, padding: "0 12px 0 46px", background: isAct ? "rgba(180,16,29,0.1)" : "transparent", border: isAct ? "1px solid rgba(180,16,29,0.35)" : "1px solid transparent", boxShadow: isAct ? "0 0 24px rgba(180,16,29,0.15)" : "none" }}>
                <div aria-hidden="true" className="absolute rounded-full transition-all duration-300" style={{ left: 22, top: "50%", transform: "translateY(-50%)", width: 9, height: 9, border: `1.5px solid ${isAct ? "#b4101d" : "rgba(255,255,255,0.18)"}`, background: isAct ? "#b4101d" : "#050507", boxShadow: isAct ? "0 0 10px rgba(180,16,29,0.6)" : "none" }} />
                <div className="flex flex-col justify-center h-full gap-0.5">
                  <span className="text-[10px] tracking-[0.22em] leading-none transition-colors duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif", color: isAct ? "#b4101d" : "rgba(255,255,255,0.22)" }}>{m.num}</span>
                  <span className="text-[17px] tracking-wide leading-none transition-colors duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif", color: isAct ? "#fff" : "rgba(255,255,255,0.4)" }}>{m.name}</span>
                  <span className="text-[9px] tracking-[0.15em] uppercase transition-colors duration-300" style={{ color: isAct ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.18)" }}>{m.tag}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Center: Step Image */}
      <div className="flex-1 self-start flex flex-col items-center justify-center" style={{ position: "sticky", top: 50, padding: "0 clamp(10px,1.5vw,24px)", borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)", minHeight: "80vh" }}>
        <div aria-hidden="true" className="text-center leading-none select-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px,7vw,100px)", color: "rgba(180,16,29,0.05)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "-0.12em" }}>{MODULES[active].num}</div>
        <StepImage src={MODULES[active].image} label={MODULES[active].partLabel} index={active} />
        <div className="flex gap-2 mt-6">
          {MODULES.map((_, i) => (
            <button key={i} onClick={() => scrollToPanel(i)} aria-label={`Go to ${MODULES[i].name}`} className="rounded-full transition-all duration-400" style={{ height: 4, width: i === active ? 24 : 4, background: i === active ? "#b4101d" : "rgba(255,255,255,0.15)", boxShadow: i === active ? "0 0 8px rgba(180,16,29,0.6)" : "none" }} />
          ))}
        </div>
      </div>

      {/* Right: Detail panels */}
      <div className="flex-1 min-w-0">
        {MODULES.map((mod, i) => (
          <div key={mod.id} ref={(el) => (panelRefs.current[i] = el)} className="flex flex-col justify-center will-change-transform"
            style={{ minHeight: "80vh", padding: "50px clamp(20px,3.5vw,52px)", borderBottom: i < MODULES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", borderLeft: "1px solid rgba(255,255,255,0.06)", transition: "border-left-color 0.4s ease", borderLeftColor: active === i ? "rgba(180,16,29,0.3)" : "rgba(255,255,255,0.06)" }}>
            <div className="flex items-start gap-3 mb-1 overflow-hidden">
              <span aria-hidden="true" className="leading-none select-none shrink-0" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(60px,8vw,110px)", color: "rgba(180,16,29,0.1)", letterSpacing: "-0.03em", marginTop: "-0.05em" }}>{mod.num}</span>
              <div className="pt-[0.35em]">
                <div className="text-[10px] font-medium tracking-[0.28em] uppercase mb-2" style={{ color: "#b4101d" }}>{mod.tag}</div>
                <h3 className="leading-none m-0" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3.8vw,52px)", letterSpacing: "0.04em", color: "#fff" }}>{mod.name}</h3>
              </div>
            </div>
            <p className="text-[14px] leading-[1.7] mb-7 max-w-[420px]" style={{ color: "rgba(255,255,255,0.48)" }}>{mod.desc}</p>
            <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden mb-7" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {mod.stats.map((stat) => (
                <div key={stat.label} className="stat-cell relative" style={{ background: "rgba(5,5,7,0.85)", padding: "16px 12px 14px" }}>
                  <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #b4101d 0%, transparent 100%)", opacity: 0.45 }} />
                  <div className="text-[9px] font-medium tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>{stat.label}</div>
                  <div className="leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px,2.8vw,34px)", letterSpacing: "0.03em", color: "#fff" }}>
                    <StatCounter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} decimal={stat.decimal || false} trigger={i} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
              <ul className="list-none m-0 p-0">
                {mod.features.map((f) => (
                  <li key={f} className="feature-item flex items-center gap-3 py-3 text-sm" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)" }}>
                    <span aria-hidden="true" className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: "#b4101d", boxShadow: "0 0 7px rgba(180,16,29,0.6)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl overflow-hidden" style={{ background: "rgba(5,5,7,0.92)", border: "1px solid rgba(180,16,29,0.22)" }}>
                <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
                  <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
                  <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
                  <span className="ml-2 font-mono text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.22)" }}>api · sample call</span>
                </div>
                <pre className="font-mono text-[11px] leading-[1.75] m-0 p-4 overflow-x-auto" style={{ color: "rgba(255,255,255,0.55)", whiteSpace: "pre" }}>
                  <span style={{ color: "rgba(180,16,29,0.75)" }}>{"// "}</span><span style={{ color: "rgba(255,255,255,0.28)" }}>forge api</span>{"\n"}<span style={{ color: "rgba(255,255,255,0.72)" }}>{mod.code}</span>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MOBILE LAYOUT ── */
function MobileLayout({ active, setActive }) {
  const stripRef = useRef(null);
  const tabBtnRefs = useRef([]);

  useEffect(() => {
    const el = tabBtnRefs.current[active];
    const strip = stripRef.current;
    if (el && strip) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div>
      {/* Tab strip */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #050507, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #050507, transparent)" }} />
        <div ref={stripRef} className="flex gap-2 overflow-x-auto px-4 pb-3 forge-scrollbar-none">
          {MODULES.map((m, i) => {
            const isAct = i === active;
            return (
              <button key={m.id} ref={(el) => (tabBtnRefs.current[i] = el)} onClick={() => setActive(i)}
                className="shrink-0 flex flex-col items-start gap-0.5 rounded-xl px-4 py-3 transition-all duration-300"
                style={{ minWidth: 110, background: isAct ? "rgba(180,16,29,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${isAct ? "rgba(180,16,29,0.5)" : "rgba(255,255,255,0.07)"}`, boxShadow: isAct ? "0 0 20px rgba(180,16,29,0.2)" : "none" }}>
                <span className="text-[9px] tracking-[0.2em] leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: isAct ? "#b4101d" : "rgba(255,255,255,0.25)" }}>{m.num}</span>
                <span className="text-[15px] tracking-wide leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: isAct ? "#fff" : "rgba(255,255,255,0.45)" }}>{m.name}</span>
                <span className="text-[9px] tracking-[0.12em] uppercase leading-none" style={{ color: isAct ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)" }}>{m.tag}</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-center gap-1.5 pt-1">
          {MODULES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Go to ${MODULES[i].name}`} className="rounded-full transition-all duration-300" style={{ height: 4, width: i === active ? 20 : 4, background: i === active ? "#b4101d" : "rgba(255,255,255,0.18)" }} />
          ))}
        </div>
      </div>

      {/* Step image */}
      <div className="px-2 mb-6">
        <StepImage src={MODULES[active].image} label={MODULES[active].partLabel} index={active} />
      </div>

      {/* Module detail */}
      <div key={active} style={{ animation: "panelReveal 0.45s cubic-bezier(0.16,1,0.3,1) both" }} className="px-1">
        <div className="flex items-start gap-3 mb-1">
          <span aria-hidden="true" className="leading-none select-none shrink-0" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px,18vw,96px)", color: "rgba(180,16,29,0.12)", letterSpacing: "-0.03em", marginTop: "-0.05em" }}>{MODULES[active].num}</span>
          <div className="pt-[0.35em]">
            <div className="text-[10px] font-medium tracking-[0.28em] uppercase mb-2" style={{ color: "#b4101d" }}>{MODULES[active].tag}</div>
            <h3 className="leading-none m-0" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px,8vw,52px)", letterSpacing: "0.04em", color: "#fff" }}>{MODULES[active].name}</h3>
          </div>
        </div>
        <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "rgba(255,255,255,0.48)" }}>{MODULES[active].desc}</p>
        <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden mb-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {MODULES[active].stats.map((stat) => (
            <div key={stat.label} className="relative" style={{ background: "rgba(5,5,7,0.85)", padding: "14px 10px 12px" }}>
              <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #b4101d 0%, transparent 100%)", opacity: 0.45 }} />
              <div className="text-[8px] font-medium tracking-[0.18em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.28)" }}>{stat.label}</div>
              <div className="leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(20px,5vw,30px)", letterSpacing: "0.03em", color: "#fff" }}>
                <StatCounter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} decimal={stat.decimal || false} trigger={active} />
              </div>
            </div>
          ))}
        </div>
        <ul className="list-none m-0 p-0">
          {MODULES[active].features.map((f) => (
            <li key={f} className="flex items-center gap-3 py-3 text-sm" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)" }}>
              <span aria-hidden="true" className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: "#b4101d", boxShadow: "0 0 7px rgba(180,16,29,0.6)" }} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── ROOT ── */
export default function AIEnginesSection() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const header = section.querySelector(".animate-header");
    if (!header) return;
    gsap.fromTo(
      header.querySelectorAll(".animate-title"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: header, start: "top 80%", once: true } }
    );
    return () => ScrollTrigger.getAll().forEach((t) => { if (t.trigger && section.contains(t.trigger)) t.kill(); });
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <section ref={sectionRef} className="relative" style={{ background: "#050507", padding: "clamp(80px,12vw,160px) clamp(20px,5vw,80px)", fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Animated grid bg */}
        <div aria-hidden="true" className="absolute inset-0 z-0 animated-grid-bg" style={{ backgroundImage: "linear-gradient(rgba(180,16,29,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(180,16,29,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", animation: "gridDrift 24s linear infinite" }} />
        {/* Orb */}
        <div aria-hidden="true" className="absolute pointer-events-none z-0 rounded-full" style={{ top: "-15%", right: "0", width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(180,16,29,0.13) 0%, transparent 65%)", animation: "orbFloat 10s ease-in-out infinite" }} />
        {/* Scan line */}
        <div aria-hidden="true" className="absolute left-0 right-0 h-px pointer-events-none z-[1]" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(180,16,29,0.35) 30%, rgba(180,16,29,0.6) 50%, rgba(180,16,29,0.35) 70%, transparent 100%)", animation: "scanDown 9s cubic-bezier(0.4,0,0.6,1) infinite" }} />

        <div className="relative z-[2] mx-auto" style={{ maxWidth: 1440 }}>
          <header className="animate-header text-center mb-[clamp(48px,8vw,80px)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
              <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: "#B30E1C", animation: "dotPulse 2.2s ease-in-out infinite" }} />
              The Platform
            </div>
            <h2 className="animate-title m-0 text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px,9vw,82px)", lineHeight: 0.97, letterSpacing: "0.02em" }}>
              One Forge. <span style={{ color: "#b4101d" }}>Five Engines.</span>
            </h2>
            <p className="animate-title mt-5 text-base leading-[1.65] max-w-[520px] text-center mx-auto" style={{ color: "rgba(255,255,255,0.42)" }}>
              Auto Forge connects your DMS, CRM, inventory feeds, and customer touchpoints into a single intelligent ecosystem — and gives every team in your store a smarter weapon.
            </p>
          </header>
          {isMobile ? <MobileLayout active={active} setActive={setActive} /> : <DesktopLayout active={active} setActive={setActive} />}
        </div>
      </section>
    </>
  );
}
