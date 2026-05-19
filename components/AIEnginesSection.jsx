"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  @keyframes partDrop {
    0%   { opacity:0; transform: translateY(-22px) scale(0.93); }
    55%  { transform: translateY(4px) scale(1.01); }
    100% { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes activeGlow {
    0%,100% { filter: drop-shadow(0 0 6px rgba(180,16,29,0.95)) drop-shadow(0 0 16px rgba(180,16,29,0.5)); }
    50%      { filter: drop-shadow(0 0 12px rgba(180,16,29,1)) drop-shadow(0 0 30px rgba(180,16,29,0.7)); }
  }
  @keyframes lightningTrace {
    0%   { stroke-dashoffset: 3200; opacity: 0; }
    4%   { opacity: 1; }
    72%  { stroke-dashoffset: 0; opacity: 1; }
    88%  { opacity: 0.5; }
    100% { stroke-dashoffset: 0; opacity: 0; }
  }
  @keyframes carSpin {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }
  .car-spin {
    animation: carSpin 1.2s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  }
  .forge-scrollbar-none::-webkit-scrollbar { display: none; }
  .forge-scrollbar-none { scrollbar-width: none; }
`;

const MODULES = [
  {
    id: "autolead",
    num: "01",
    name: "AutoLeadAI",
    tag: "Lead Intelligence",
    desc: "Real-time lead scoring and intelligent routing puts the hottest buyers in front of your best closers — automatically, every time.",
    stats: [
      { label: "Leads Scored Daily", value: 847, suffix: "" },
      { label: "Routing Accuracy", value: 94, suffix: "%" },
      { label: "Avg Response", value: 2.3, suffix: "s", decimal: true },
    ],
    features: [
      "Behavioral intent signals",
      "Auto-assign by rep capacity",
      "CRM push in real time",
    ],
    code: `forge.leads.score({\n  source: "web",\n  priority: "hot"\n})`,
    partLabel: "Front & Engine Bay",
  },
  {
    id: "forgechat",
    num: "02",
    name: "ForgeChat",
    tag: "Engagement Engine",
    desc: "AI-powered chat and SMS that qualifies, nurtures, and books appointments while your team focuses on the floor.",
    stats: [
      { label: "Messages / Month", value: 12400, suffix: "" },
      { label: "SMS Open Rate", value: 68, suffix: "%" },
      { label: "Appt Conversion", value: 31, suffix: "%" },
    ],
    features: [
      "Automotive-trained AI",
      "Two-way SMS & web chat",
      "Live calendar booking",
    ],
    code: `forge.chat.send({\n  to: lead.phone,\n  template: "follow_up"\n})`,
    partLabel: "Cabin & Roof",
  },
  {
    id: "pricepulse",
    num: "03",
    name: "PricePulse",
    tag: "Pricing Engine",
    desc: "Dynamic inventory pricing that reacts to market velocity, competitor shifts, and days-on-lot in real time.",
    stats: [
      {
        label: "Inventory Value",
        value: 3.2,
        suffix: "M",
        prefix: "$",
        decimal: true,
      },
      {
        label: "Gross Lift",
        value: 9.4,
        suffix: "%",
        prefix: "+",
        decimal: true,
      },
      { label: "Vehicles Active", value: 847, suffix: "" },
    ],
    features: [
      "Market comp scanning",
      "Automated repricing rules",
      "Margin floor protection",
    ],
    code: `forge.pricing.reprice({\n  vin: "1G6KD57...",\n  strategy: "velocity"\n})`,
    partLabel: "Wheels & Chassis",
  },
  {
    id: "servicesync",
    num: "04",
    name: "ServiceSync",
    tag: "Service Intelligence",
    desc: "Predictive maintenance outreach and upsell triggers that fill your service lanes before customers think to call.",
    stats: [
      { label: "Repair Orders", value: 1240, suffix: "" },
      { label: "Upsell Attach", value: 78, suffix: "%" },
      { label: "Service GP", value: 214, suffix: "K", prefix: "$" },
    ],
    features: [
      "OBD mileage triggers",
      "Declined service follow-up",
      "Multi-point inspection AI",
    ],
    code: `forge.service.notify({\n  trigger: "overdue_oil",\n  segment: "loyal"\n})`,
    partLabel: "Doors & Body",
  },
  {
    id: "dealeriq",
    num: "05",
    name: "DealerIQ",
    tag: "Executive Analytics",
    desc: "One pane of glass for the entire store — sales velocity, gross per unit, F&I attach, service throughput, and CSI — live.",
    stats: [
      { label: "Gross / Unit", value: 3182, suffix: "", prefix: "$" },
      { label: "F&I Attach Rate", value: 78, suffix: "%" },
      { label: "CSI Score", value: 94.6, suffix: "", decimal: true },
    ],
    features: [
      "Real-time KPI dashboard",
      "Forecast vs quota tracking",
      "Slack / SMS anomaly alerts",
    ],
    code: `forge.iq.kpi({\n  metric: "gross_per_unit",\n  range: "ytd"\n})`,
    partLabel: "Rear & Tail",
  },
];

function StatCounter({
  value,
  prefix = "",
  suffix = "",
  decimal = false,
  trigger,
}) {
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
      const formatted = decimal
        ? Number(cur).toFixed(1)
        : Math.floor(cur).toLocaleString();
      el.textContent = `${prefix}${formatted}${suffix}`;
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else
        el.textContent = `${prefix}${decimal ? value.toFixed(1) : value.toLocaleString()}${suffix}`;
    };
    const delay = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, 80);
    return () => {
      clearTimeout(delay);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, trigger, decimal, prefix, suffix]);
  return (
    <span ref={elRef}>
      {prefix}0{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   LUXURY SEDAN SVG (full car visible from start)
   Each part (0-4) uses active highlight but always visible
   ───────────────────────────────────────────────────────── */
const CAR_SILHOUETTE =
  "M 82,288 C 82,288 72,274 78,258 C 84,242 100,234 118,232 " +
  "C 118,232 120,216 128,204 C 136,192 148,184 162,180 " +
  "C 162,180 168,162 180,148 C 194,132 214,122 238,116 " +
  "C 262,110 294,106 330,102 " +
  "C 330,102 360,84 396,72 C 432,60 474,56 516,54 " +
  "C 558,52 600,54 636,60 C 672,66 700,76 720,90 " +
  "C 740,104 750,120 752,138 " +
  "C 752,138 766,142 776,154 C 786,166 790,182 788,198 " +
  "C 788,198 802,204 812,218 C 822,232 820,250 812,262 " +
  "C 804,274 790,282 774,284 C 758,286 742,280 730,270 " +
  "C 718,260 714,246 716,232 " +
  "C 716,232 700,236 680,238 L 340,238 " +
  "C 340,238 320,236 304,232 " +
  "C 304,232 306,246 298,258 C 290,270 276,278 260,280 " +
  "C 244,282 228,276 216,264 C 204,252 200,236 204,220 " +
  "C 204,220 190,216 178,206 C 166,196 160,182 162,168 Z";

function SedanCarSVG({ active, lightning, allVisited }) {
  const R = "#b4101d";
  // Base fill & stroke (always visible)
  const BASE_FILL = "rgba(255,255,255,0.025)";
  const BASE_STROKE = "rgba(255,255,255,0.12)";
  // Active highlight styles
  const ACTIVE_FILL = "rgba(180,16,29,0.2)";
  const ACTIVE_STROKE = "#b4101d";
  const ACTIVE_STROKE_WIDTH = 1.8;
  const GLOW_FILTER = "url(#glow4)";

  const isActive = (i) => active === i;
  const partStyle = (i) => ({
    fill: isActive(i) ? ACTIVE_FILL : BASE_FILL,
    stroke: isActive(i) ? ACTIVE_STROKE : BASE_STROKE,
    strokeWidth: isActive(i) ? ACTIVE_STROKE_WIDTH : 0.9,
    filter: isActive(i) ? GLOW_FILTER : undefined,
    transition: "fill 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease",
  });

  const Wheel = ({ cx, cy, r, idx }) => {
    const activeWheel = isActive(idx);
    return (
      <g style={{ opacity: 1 }}>
        <ellipse cx={cx} cy={cy + r + 4} rx={r + 4} ry={5} fill="rgba(0,0,0,0.45)" />
        <circle
          cx={cx} cy={cy} r={r + 10}
          fill="rgba(14,14,16,1)"
          stroke={activeWheel ? R : "rgba(255,255,255,0.1)"}
          strokeWidth={activeWheel ? 1.5 : 0.8}
        />
        <circle cx={cx} cy={cy} r={r + 6} fill="none"
          stroke={activeWheel ? "rgba(180,16,29,0.3)" : "rgba(255,255,255,0.06)"}
          strokeWidth="2" strokeDasharray="6 4"
        />
        <circle
          cx={cx} cy={cy} r={r}
          fill={activeWheel ? "rgba(30,30,35,0.95)" : "rgba(18,18,22,0.95)"}
          stroke={activeWheel ? ACTIVE_STROKE : BASE_STROKE}
          strokeWidth={activeWheel ? 1.5 : 0.8}
        />
        <circle cx={cx} cy={cy} r={r - 2} fill="none"
          stroke={activeWheel ? "rgba(180,16,29,0.5)" : "rgba(255,255,255,0.1)"}
          strokeWidth="1.5"
        />
        {/* 5 spokes */}
        {[90, 162, 234, 306, 18].map((deg, si) => {
          const rad = (deg * Math.PI) / 180;
          const radL = ((deg - 10) * Math.PI) / 180;
          const radR = ((deg + 10) * Math.PI) / 180;
          const irN = r * 0.10;
          const orN = r * 0.93;
          const x0 = cx + irN * Math.cos(radL), y0 = cy + irN * Math.sin(radL);
          const x1 = cx + irN * Math.cos(radR), y1 = cy + irN * Math.sin(radR);
          const x2 = cx + orN * Math.cos(radR), y2 = cy + orN * Math.sin(radR);
          const x3 = cx + orN * Math.cos(radL), y3 = cy + orN * Math.sin(radL);
          return (
            <path key={si}
              d={`M${x0},${y0} L${x1},${y1} L${x2},${y2} L${x3},${y3}Z`}
              fill={activeWheel ? "rgba(180,16,29,0.35)" : "rgba(255,255,255,0.08)"}
              stroke={activeWheel ? "rgba(180,16,29,0.6)" : "rgba(255,255,255,0.12)"}
              strokeWidth="0.6"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={r * 0.22}
          fill={activeWheel ? "rgba(180,16,29,0.4)" : "rgba(0,0,0,0.8)"}
          stroke={activeWheel ? ACTIVE_STROKE : BASE_STROKE} strokeWidth="1.2"
        />
        <circle cx={cx} cy={cy} r={r * 0.11}
          fill={activeWheel ? R : "rgba(255,255,255,0.2)"}
        />
        <circle cx={cx} cy={cy} r={r * 0.6} fill="none"
          stroke={activeWheel ? "rgba(180,16,29,0.25)" : "rgba(255,255,255,0.06)"}
          strokeWidth="4"
        />
      </g>
    );
  };

  return (
    <svg
      viewBox="60 40 860 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", overflow: "visible" }}
      aria-label="Luxury sedan diagram"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(180,200,255,0.18)" />
          <stop offset="60%" stopColor="rgba(100,140,220,0.08)" />
          <stop offset="100%" stopColor="rgba(20,30,60,0.4)" />
        </linearGradient>
        <linearGradient id="glassActive" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(180,16,29,0.28)" />
          <stop offset="100%" stopColor="rgba(80,0,10,0.1)" />
        </linearGradient>
        <linearGradient id="hoodGrad" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.09)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
        </linearGradient>
        <filter id="glow4" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="headlightGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="taillightGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="460" cy="298" rx="360" ry="14" fill="rgba(0,0,0,0.7)" />
      <ellipse cx="460" cy="298" rx="300" ry="8" fill="rgba(180,16,29,0.07)" />
      <line x1="80" y1="288" x2="850" y2="288" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

      {/* Base body shell - subtle outline */}
      <path
        d="M 162,168 C 140,168 118,172 100,184 C 82,196 76,214 78,230 C 80,246 90,260 106,268 C 118,276 134,280 150,280 C 170,280 186,274 198,264 C 210,254 216,240 216,226 L 304,226 L 716,226 C 716,240 720,254 730,264 C 742,274 758,280 776,280 C 794,280 810,272 820,260 C 830,248 832,232 828,218 C 824,204 814,194 802,188 C 802,188 808,178 808,166 C 808,154 802,142 792,134 C 780,124 762,118 742,116 C 742,116 738,94 728,80 C 718,66 702,58 682,54 C 662,50 636,48 606,48 C 556,46 508,48 468,54 C 428,60 398,70 378,84 C 354,96 338,112 332,130 C 318,128 290,124 258,120 C 226,116 192,116 162,120 C 138,124 116,132 102,144 C 92,152 84,162 82,174 Z"
        fill="rgba(255,255,255,0.012)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />

      {/* PART 0: Front fascia, hood, headlights */}
      <g style={partStyle(0)}>
        <path d="M 162,120 C 192,116 226,116 258,120 C 290,124 318,128 332,130 C 338,112 354,96 378,84 L 340,82 C 310,80 276,78 244,80 C 212,82 184,88 162,98 C 140,108 124,122 116,138 C 108,150 108,162 108,162 L 162,168 Z" fill={partStyle(0).fill} stroke={partStyle(0).stroke} strokeWidth={partStyle(0).strokeWidth} strokeLinejoin="round" />
        <path d="M 120,158 C 150,138 190,124 240,116 C 280,110 320,108 340,108" fill="none" stroke={isActive(0) ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.05)"} strokeWidth="1.5" />
        <path d="M 108,162 C 84,162 76,174 76,188 C 76,200 80,212 88,220 L 108,224 L 162,224 L 162,168 Z" fill={partStyle(0).fill} stroke={partStyle(0).stroke} strokeWidth={partStyle(0).strokeWidth} />
        <path d="M 82,218 C 82,218 90,232 110,238 C 130,244 162,244 162,244 L 216,244 L 216,226 L 162,224 L 108,224" fill={partStyle(0).fill} stroke={partStyle(0).stroke} strokeWidth={partStyle(0).strokeWidth * 0.8} />
        <path d="M 110,162 C 110,155 112,148 118,142 C 124,136 132,132 142,130 C 154,128 166,130 176,136 C 186,142 192,152 192,162 L 192,168 L 110,168 Z" fill={isActive(0) ? "rgba(255,240,200,0.12)" : "rgba(255,255,255,0.03)"} stroke={partStyle(0).stroke} strokeWidth={partStyle(0).strokeWidth * 0.8} />
        <path d="M 116,162 C 116,156 118,150 124,146 C 130,140 140,138 150,140 C 160,142 168,148 172,156 L 172,162 Z" fill={isActive(0) ? "rgba(255,250,230,0.2)" : "rgba(255,255,255,0.04)"} stroke={isActive(0) ? "rgba(255,240,180,0.6)" : "rgba(255,255,255,0.08)"} strokeWidth="0.8" />
        <path d="M 116,144 C 130,140 150,140 168,144" fill="none" stroke={isActive(0) ? "rgba(255,248,220,0.9)" : "rgba(255,255,255,0.1)"} strokeWidth={isActive(0) ? 2.5 : 1} strokeLinecap="round" filter={isActive(0) ? "url(#headlightGlow)" : undefined} />
        <path d="M 90,192 C 92,184 98,178 106,174 L 160,174 L 160,206 C 160,206 130,210 110,208 C 90,206 84,200 90,192 Z" fill={isActive(0) ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)"} stroke={partStyle(0).stroke} strokeWidth={partStyle(0).strokeWidth * 0.7} />
        {[180, 188, 196, 204].map((y) => (<line key={y} x1="92" y1={y} x2="158" y2={y} stroke={isActive(0) ? "rgba(180,16,29,0.6)" : "rgba(255,255,255,0.1)"} strokeWidth="1" />))}
        <circle cx="124" cy="192" r="7" fill={isActive(0) ? "rgba(180,16,29,0.6)" : "rgba(255,255,255,0.05)"} stroke={partStyle(0).stroke} strokeWidth="1" />
        <ellipse cx="104" cy="222" rx="10" ry="5" fill={isActive(0) ? "rgba(255,240,140,0.2)" : "rgba(255,255,255,0.03)"} stroke={partStyle(0).stroke} strokeWidth="0.7" />
      </g>

      {/* PART 1: Roof, pillars, windows */}
      <g style={partStyle(1)}>
        <path d="M 378,84 C 398,70 428,60 468,54 C 508,48 556,46 606,48 C 636,48 662,50 682,54 C 702,58 718,66 728,80 L 742,116 L 332,130 Z" fill={partStyle(1).fill} stroke={partStyle(1).stroke} strokeWidth={partStyle(1).strokeWidth} strokeLinejoin="round" />
        <path d="M 390,86 C 460,68 560,56 660,60 C 700,62 720,68 730,76" fill="none" stroke={isActive(1) ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)"} strokeWidth="2" strokeLinecap="round" />
        <path d="M 332,130 C 338,112 354,96 378,84 L 440,86 L 440,168 L 332,168 Z" fill={isActive(1) ? "url(#glassActive)" : "url(#glassGrad)"} stroke={partStyle(1).stroke} strokeWidth={partStyle(1).strokeWidth} />
        <path d="M 340,164 C 352,140 370,118 392,100 L 412,88" fill="none" stroke={isActive(1) ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)"} strokeWidth="1.5" />
        <rect x="438" y="84" width="18" height="84" rx="2" fill={isActive(1) ? "rgba(180,16,29,0.25)" : "rgba(0,0,0,0.7)"} stroke={partStyle(1).stroke} strokeWidth="0.8" />
        <path d="M 456,84 L 630,60 L 630,168 L 456,168 Z" fill={isActive(1) ? "rgba(180,16,29,0.12)" : "rgba(120,160,200,0.06)"} stroke={partStyle(1).stroke} strokeWidth={partStyle(1).strokeWidth} />
        <rect x="460" y="58" width="180" height="50" rx="4" fill={isActive(1) ? "rgba(180,16,29,0.14)" : "rgba(0,10,30,0.5)"} stroke={isActive(1) ? R : "rgba(255,255,255,0.08)"} strokeWidth="1" />
        <line x1="378" y1="84" x2="742" y2="116" stroke={isActive(1) ? R : "rgba(255,255,255,0.1)"} strokeWidth={isActive(1) ? "1.6" : "0.8"} opacity="0.8" />
      </g>

      {/* PART 2: Wheels, arches, sills */}
      <g>
        <path d="M 216,226 L 304,226 L 304,244 C 304,244 260,248 216,244 Z" fill={partStyle(2).fill} stroke={partStyle(2).stroke} strokeWidth={partStyle(2).strokeWidth} />
        <path d="M 716,226 L 802,226 L 802,244 C 802,244 758,248 716,244 Z" fill={partStyle(2).fill} stroke={partStyle(2).stroke} strokeWidth={partStyle(2).strokeWidth} />
        <path d="M 304,226 L 716,226 L 716,244 L 304,244 Z" fill={partStyle(2).fill} stroke={partStyle(2).stroke} strokeWidth={partStyle(2).strokeWidth * 0.7} />
        <line x1="216" y1="236" x2="802" y2="236" stroke={isActive(2) ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.06)"} strokeWidth={isActive(2) ? "1.2" : "0.6"} />
        <path d="M 162,168 C 162,168 164,152 174,142 C 186,130 204,124 228,124 C 252,124 270,132 282,146 C 296,162 302,182 302,204 L 302,226 L 162,226 Z" fill={partStyle(2).fill} stroke={partStyle(2).stroke} strokeWidth={partStyle(2).strokeWidth} />
        <path d="M 716,168 C 730,168 744,170 756,178 C 772,188 782,204 784,222 L 784,226 L 716,226 Z" fill={partStyle(2).fill} stroke={partStyle(2).stroke} strokeWidth={partStyle(2).strokeWidth} />
        <path d="M 784,222 C 786,228 788,236 788,244 L 856,244 C 856,220 850,200 838,186 C 826,170 808,160 788,156 C 768,152 750,154 736,162 L 716,168 L 716,226 L 784,226 Z" fill={partStyle(2).fill} stroke={partStyle(2).stroke} strokeWidth={partStyle(2).strokeWidth} />
        <Wheel cx={262} cy={270} r={44} idx={2} />
        <Wheel cx={784} cy={270} r={44} idx={2} />
      </g>

      {/* PART 3: Doors, handles, mirror */}
      <g style={partStyle(3)}>
        <path d="M 332,130 L 440,86 L 440,168 L 440,226 L 302,226 L 302,168 Z" fill={partStyle(3).fill} stroke={partStyle(3).stroke} strokeWidth={partStyle(3).strokeWidth} strokeLinejoin="round" />
        <path d="M 440,86 L 630,60 L 630,168 L 630,226 L 440,226 L 440,168 Z" fill={partStyle(3).fill} stroke={partStyle(3).stroke} strokeWidth={partStyle(3).strokeWidth} strokeLinejoin="round" />
        <line x1="440" y1="86" x2="440" y2="226" stroke={isActive(3) ? R : "rgba(255,255,255,0.08)"} strokeWidth={isActive(3) ? 1.8 : 0.9} />
        <path d="M 162,184 C 200,180 280,176 380,174 C 480,172 600,172 700,174 C 760,176 800,180 820,184" fill="none" stroke={isActive(3) ? R : "rgba(255,255,255,0.1)"} strokeWidth={isActive(3) ? "1.6" : "0.8"} />
        <rect x="380" y="184" width="44" height="10" rx="5" fill={isActive(3) ? "rgba(180,16,29,0.5)" : "rgba(255,255,255,0.09)"} stroke={partStyle(3).stroke} strokeWidth="1" />
        <rect x="555" y="172" width="44" height="10" rx="5" fill={isActive(3) ? "rgba(180,16,29,0.5)" : "rgba(255,255,255,0.09)"} stroke={partStyle(3).stroke} strokeWidth="1" />
        <path d="M 332,168 C 320,164 308,158 300,150 C 296,144 296,136 302,130 L 332,130 Z" fill={isActive(3) ? "rgba(180,16,29,0.35)" : "rgba(255,255,255,0.06)"} stroke={partStyle(3).stroke} strokeWidth="1" />
        <line x1="332" y1="168" x2="630" y2="168" stroke={isActive(3) ? R : "rgba(255,255,255,0.1)"} strokeWidth={isActive(3) ? "1.8" : "0.9"} />
      </g>

      {/* PART 4: Rear quarter, trunk, lights */}
      <g style={partStyle(4)}>
        <path d="M 630,60 C 650,52 668,50 682,54 C 702,58 718,66 728,80 L 742,116 L 742,226 L 630,226 L 630,60 Z" fill={partStyle(4).fill} stroke={partStyle(4).stroke} strokeWidth={partStyle(4).strokeWidth} strokeLinejoin="round" />
        <path d="M 682,54 C 700,56 718,62 730,72 C 744,84 752,100 754,118 L 754,140 L 742,116 L 728,80 C 718,66 702,58 682,54 Z" fill={isActive(4) ? "rgba(180,16,29,0.2)" : "rgba(255,255,255,0.03)"} stroke={partStyle(4).stroke} strokeWidth={partStyle(4).strokeWidth} />
        <path d="M 742,116 L 754,118 C 766,126 778,140 784,158 C 790,174 790,192 784,208 C 778,224 766,236 754,242 L 742,244 L 716,244 L 716,226 L 742,226 Z" fill={partStyle(4).fill} stroke={partStyle(4).stroke} strokeWidth={partStyle(4).strokeWidth} />
        <path d="M 754,118 C 762,120 770,130 774,144 L 774,222 C 774,234 766,242 754,244 L 742,244 L 742,116 Z" fill={isActive(4) ? "rgba(180,16,29,0.7)" : "rgba(255,255,255,0.06)"} stroke={partStyle(4).stroke} strokeWidth="1.2" />
        {isActive(4) && (
          <path d="M 754,118 C 762,120 770,130 774,144 L 774,222 C 774,234 766,242 754,244 L 742,244 L 742,116 Z" fill="rgba(255,30,30,0.25)" filter="url(#taillightGlow)" />
        )}
        <ellipse cx="724" cy="256" rx="13" ry="7" fill="rgba(0,0,0,0.9)" stroke={partStyle(4).stroke} strokeWidth="1" />
        <ellipse cx="746" cy="254" rx="11" ry="6" fill="rgba(0,0,0,0.9)" stroke={partStyle(4).stroke} strokeWidth="1" />
        <circle cx="762" cy="116" r="9" fill={isActive(4) ? "rgba(180,16,29,0.55)" : "rgba(255,255,255,0.06)"} stroke={partStyle(4).stroke} strokeWidth="1.2" />
      </g>

      {/* Lightning effect when all modules visited */}
      {lightning && (
        <>
          <path d={CAR_SILHOUETTE} fill="none" stroke="rgba(180,16,29,0.3)" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="3200" strokeDashoffset="3200" style={{ animation: "lightningTrace 2.4s cubic-bezier(0.4,0,0.2,1) forwards", filter: "blur(6px)" }} />
          <path d={CAR_SILHOUETTE} fill="none" stroke={R} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="3200" strokeDashoffset="3200" style={{ animation: "lightningTrace 2.4s cubic-bezier(0.4,0,0.2,1) forwards" }} />
        </>
      )}
      {allVisited && <circle cx="460" cy="170" r="8" fill={R} style={{ animation: "activeGlow 1s infinite" }} />}
    </svg>
  );
}


/* DESKTOP LAYOUT with driving effect + car spin after all 5 visited */
function DesktopLayout({ active, setActive }) {
  const panelRefs = useRef([]);
  const indicatorRef = useRef(null);
  const carContainerRef = useRef(null);
  const [revealed, setRevealed] = useState([true, false, false, false, false]);
  const [lightning, setLightning] = useState(false);
  const [allVisitedTrigger, setAllVisitedTrigger] = useState(false);
  const [carSpinClass, setCarSpinClass] = useState("");
  const spinExecuted = useRef(false);
  const TAB_H = 84;

  // Track visited modules for final spin effect
  const updateRevealed = useCallback((idx) => {
    setRevealed(prev => {
      if (prev[idx]) return prev;
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  }, []);

  // Trigger lightning and spin when all 5 modules revealed
  useEffect(() => {
    if (revealed.every(Boolean) && !lightning && !spinExecuted.current) {
      setLightning(true);
      spinExecuted.current = true;
      setTimeout(() => setLightning(false), 2600);
      // Car spin after lightning starts
      setCarSpinClass("car-spin");
      setTimeout(() => {
        setCarSpinClass("");
        setAllVisitedTrigger(true);
      }, 1200);
    }
  }, [revealed, lightning]);

  // ScrollTrigger for each panel: animation + mark module visited
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
          updateRevealed(i);
          gsap.to(panel, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" });
          gsap.fromTo(panel.querySelectorAll(".stat-cell"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.15 });
          gsap.fromTo(panel.querySelectorAll(".feature-item"), { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power2.out", delay: 0.25 });
        },
        onEnterBack: () => {
          setActive(i);
          updateRevealed(i);
          gsap.to(panel, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" });
        },
        onLeave: () => gsap.to(panel, { opacity: 0, y: -30, filter: "blur(4px)", duration: 0.45, ease: "power2.in" }),
        onLeaveBack: () => gsap.to(panel, { opacity: 0, y: 40, filter: "blur(6px)", duration: 0.45, ease: "power2.in" }),
      });
      triggers.push(st);
    });
    return () => triggers.forEach(t => t.kill());
  }, [setActive, updateRevealed]);

  // Driving effect: car moves horizontally as user scrolls
  useEffect(() => {
    const carDiv = carContainerRef.current;
    if (!carDiv) return;
    const section = carDiv.closest("section");
    if (!section) return;
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        const translateX = -40 + progress * 80; // from -40px to +40px
        gsap.to(carDiv, { x: translateX, duration: 0.2, ease: "none", overwrite: true });
        // move background grid slightly as well
        const bgGrid = section.querySelector(".animated-grid-bg");
        if (bgGrid) bgGrid.style.backgroundPosition = `${progress * 100}px 0px`;
      },
    });
    return () => scrollTrigger.kill();
  }, []);

  useEffect(() => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, { top: active * TAB_H + 14, duration: 0.5, ease: "power3.out" });
  }, [active]);

  const scrollToPanel = (i) => {
    const el = panelRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top + rect.height/2 - window.innerHeight/2, behavior: "smooth" });
  };

  return (
    <div className="flex items-start">
      {/* Left navigation */}
      <div className="shrink-0 self-start" style={{ width: 220, position: "sticky", top: 96 }}>
        <nav aria-label="Platform modules" className="relative">
          <div aria-hidden="true" className="absolute w-px" style={{ left: 26, top: TAB_H*0.5, bottom: TAB_H*0.5, background: "rgba(255,255,255,0.07)" }} />
          <div ref={indicatorRef} aria-hidden="true" className="absolute left-0 w-0.5 rounded-sm" style={{ top: 14, height: TAB_H-28, background: "#b4101d", boxShadow: "0 0 18px rgba(180,16,29,0.6)" }} />
          {MODULES.map((m, i) => {
            const isActive = i === active;
            return (
              <button key={m.id} onClick={() => scrollToPanel(i)} role="tab" aria-selected={isActive}
                className="relative text-left w-full rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 block"
                style={{ height: TAB_H, padding: "0 12px 0 46px", background: isActive ? "rgba(180,16,29,0.1)" : "transparent", border: isActive ? "1px solid rgba(180,16,29,0.35)" : "1px solid transparent", boxShadow: isActive ? "0 0 24px rgba(180,16,29,0.15)" : "none" }}>
                <div aria-hidden="true" className="absolute rounded-full transition-all duration-300" style={{ left: 22, top: "50%", transform: "translateY(-50%)", width: 9, height: 9, border: `1.5px solid ${isActive ? "#b4101d" : "rgba(255,255,255,0.18)"}`, background: isActive ? "#b4101d" : "#050507", boxShadow: isActive ? "0 0 10px rgba(180,16,29,0.6)" : "none" }} />
                <div className="flex flex-col justify-center h-full gap-0.5">
                  <span className="text-[10px] tracking-[0.22em] leading-none transition-colors duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif", color: isActive ? "#b4101d" : "rgba(255,255,255,0.22)" }}>{m.num}</span>
                  <span className="text-[17px] tracking-wide leading-none transition-colors duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif", color: isActive ? "#fff" : "rgba(255,255,255,0.4)" }}>{m.name}</span>
                  <span className="text-[9px] tracking-[0.15em] uppercase transition-colors duration-300" style={{ color: isActive ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.18)" }}>{m.tag}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Center: Car with driving effect + spin animation */}
      <div className="flex-1 self-start flex flex-col items-center justify-center" style={{ position: "sticky", top: 50, padding: "0 clamp(10px,1.5vw,24px)", borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)", minHeight: "80vh" }}>
        <div aria-hidden="true" className="text-center leading-none select-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px,7vw,100px)", color: "rgba(180,16,29,0.05)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "-0.12em" }}>{MODULES[active].num}</div>
        <div ref={carContainerRef} className={`${carSpinClass}`} style={{ width: "100%", position: "relative", transformStyle: "preserve-3d", perspective: "800px" }}>
          <div aria-hidden="true" style={{ position: "absolute", bottom: -20, left: "6%", right: "6%", height: 40, background: "radial-gradient(ellipse, rgba(180,16,29,0.3) 0%, transparent 70%)", filter: "blur(12px)" }} />
          <SedanCarSVG active={active} lightning={lightning} allVisited={allVisitedTrigger} />
        </div>
        <div className="mt-5 text-center" style={{ minHeight: 36 }}>
          <div key={active} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: "rgba(180,16,29,0.12)", border: "1px solid rgba(180,16,29,0.35)", animation: "panelReveal 0.4s ease both" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#b4101d", boxShadow: "0 0 6px rgba(180,16,29,0.8)" }} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{MODULES[active].partLabel}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {MODULES.map((_, i) => (
            <button key={i} onClick={() => scrollToPanel(i)} aria-label={`Go to ${MODULES[i].name}`} className="rounded-full transition-all duration-400" style={{ height: 4, width: i === active ? 24 : 4, background: i === active ? "#b4101d" : "rgba(255,255,255,0.15)", boxShadow: i === active ? "0 0 8px rgba(180,16,29,0.6)" : "none" }} />
          ))}
        </div>
      </div>

      {/* Right side details panels */}
      <div className="flex-1 min-w-0">
        {MODULES.map((mod, i) => (
          <div key={mod.id} ref={(el) => (panelRefs.current[i] = el)} className="flex flex-col justify-center will-change-transform" style={{ minHeight: "80vh", padding: "50px clamp(20px,3.5vw,52px)", borderBottom: i < MODULES.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", borderLeft: "1px solid rgba(255,255,255,0.06)", transition: "border-left-color 0.4s ease", borderLeftColor: active === i ? "rgba(180,16,29,0.3)" : "rgba(255,255,255,0.06)" }}>
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


/* MOBILE LAYOUT (full car visible, simplified) */
function MobileLayout({ active, setActive }) {
  const stripRef = useRef(null);
  const tabBtnRefs = useRef([]);
  const [revealed, setRevealed] = useState([true, false, false, false, false]);
  const [lightning, setLightning] = useState(false);
  const [allVisitedTrigger, setAllVisitedTrigger] = useState(false);
  const spinExecuted = useRef(false);

  useEffect(() => {
    setRevealed(prev => { const n = [...prev]; n[active] = true; return n; });
    const el = tabBtnRefs.current[active];
    const strip = stripRef.current;
    if (el && strip) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth/2 + el.offsetWidth/2, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    if (revealed.every(Boolean) && !lightning && !spinExecuted.current) {
      setLightning(true);
      spinExecuted.current = true;
      setTimeout(() => setLightning(false), 2600);
      setTimeout(() => setAllVisitedTrigger(true), 1000);
    }
  }, [revealed, lightning]);

  return (
    <div>
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #050507, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #050507, transparent)" }} />
        <div ref={stripRef} className="flex gap-2 overflow-x-auto px-4 pb-3 forge-scrollbar-none">
          {MODULES.map((m, i) => {
            const isActive = i === active;
            return (
              <button key={m.id} ref={(el) => (tabBtnRefs.current[i] = el)} onClick={() => setActive(i)} className="shrink-0 flex flex-col items-start gap-0.5 rounded-xl px-4 py-3 transition-all duration-300" style={{ minWidth: 110, background: isActive ? "rgba(180,16,29,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${isActive ? "rgba(180,16,29,0.5)" : "rgba(255,255,255,0.07)"}`, boxShadow: isActive ? "0 0 20px rgba(180,16,29,0.2)" : "none" }}>
                <span className="text-[9px] tracking-[0.2em] leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: isActive ? "#b4101d" : "rgba(255,255,255,0.25)" }}>{m.num}</span>
                <span className="text-[15px] tracking-wide leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}>{m.name}</span>
                <span className="text-[9px] tracking-[0.12em] uppercase leading-none" style={{ color: isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)" }}>{m.tag}</span>
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
      <div className="px-2 mb-6">
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", bottom: -8, left: "8%", right: "8%", height: 24, background: "radial-gradient(ellipse, rgba(180,16,29,0.2) 0%, transparent 70%)", filter: "blur(6px)" }} />
          <SedanCarSVG active={active} lightning={lightning} allVisited={allVisitedTrigger} />
        </div>
        <div className="flex justify-center mt-3">
          <div key={active} className="inline-flex items-center gap-2 rounded-full px-3 py-1" style={{ background: "rgba(180,16,29,0.12)", border: "1px solid rgba(180,16,29,0.3)", animation: "panelReveal 0.4s ease both" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#b4101d" }} />
            <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.65)" }}>{MODULES[active].partLabel}</span>
          </div>
        </div>
      </div>
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

/* ROOT */
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
    gsap.fromTo(header.querySelectorAll(".animate-title"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: header, start: "top 80%", once: true } });
    return () => ScrollTrigger.getAll().forEach((t) => { if (t.trigger && section.contains(t.trigger)) t.kill(); });
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <section ref={sectionRef} className="relative" style={{ background: "#050507", padding: "clamp(80px,12vw,160px) clamp(20px,5vw,80px)", fontFamily: "'Space Grotesk', sans-serif" }}>
        <div aria-hidden="true" className="absolute inset-0 z-0 animated-grid-bg" style={{ backgroundImage: "linear-gradient(rgba(180,16,29,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(180,16,29,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", animation: "gridDrift 24s linear infinite" }} />
        <div aria-hidden="true" className="absolute pointer-events-none z-0 rounded-full" style={{ top: "-15%", right: "0", width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(180,16,29,0.13) 0%, transparent 65%)", animation: "orbFloat 10s ease-in-out infinite" }} />
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