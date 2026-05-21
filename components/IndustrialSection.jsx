// "use client"

// import { useLayoutEffect, useRef } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import {
//   ArrowUpRight,
//   Clock3,
//   DollarSign,
//   Users,
//   BarChart3,
//   Boxes,
//   Cog,
//   UserRound,
// } from "lucide-react"

// gsap.registerPlugin(ScrollTrigger)

// export default function AutoForgeEcosystem() {

//   const sectionRef = useRef(null)

//   useLayoutEffect(() => {

//     const ctx = gsap.context(() => {

//       gsap.from(".ecosystem-label", {
//         opacity: 0,
//         y: 20,
//         duration: 1,
//       })

//       gsap.from(".ecosystem-title span", {
//         opacity: 0,
//         y: 120,
//         stagger: 0.04,
//         duration: 1.2,
//         ease: "power4.out",
//       })

//       gsap.from(".ecosystem-text", {
//         opacity: 0,
//         y: 40,
//         duration: 1,
//         delay: 0.4,
//       })

//       gsap.from(".ecosystem-btn", {
//         opacity: 0,
//         y: 30,
//         duration: 1,
//         delay: 0.6,
//       })

//         gsap.from(".metric-card", {
//         opacity: 0,
//         y: 60,
//         stagger: 0.15,
//         duration: 1,
//         ease: "power4.out",
//         scrollTrigger: {
//             trigger: ".metrics-wrapper",
//             start: "top 85%",
//         },
//         })

//       gsap.from(".orbit-card", {
//         opacity: 0,
//         scale: 0.8,
//         stagger: 0.15,
//         duration: 1.2,
//         ease: "power4.out",
//       })

//       gsap.to(".rotating-ring", {
//         rotate: 360,
//         duration: 30,
//         repeat: -1,
//         ease: "none",
//       })

//       gsap.to(".rotating-ring-reverse", {
//         rotate: -360,
//         duration: 40,
//         repeat: -1,
//         ease: "none",
//       })

//       gsap.to(".pulse-core", {
//         scale: 1.08,
//         opacity: 0.9,
//         duration: 2,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       })

//       gsap.to(".signal-dot", {
//         opacity: 0.2,
//         stagger: 0.2,
//         duration: 1,
//         repeat: -1,
//         yoyo: true,
//       })

//     }, sectionRef)

//     return () => ctx.revert()

//   }, [])

//   const title =
//     "Auto Forge Solutions builds intelligent ecosystems that transform car dealerships into data-driven revenue machines."

//   const metrics = [
//     {
//       icon: Clock3,
//       value: "67%",
//       text: "of leads go unresponded within the first hour.",
//     },
//     {
//       icon: DollarSign,
//       value: "$2.3M",
//       text: "average annual revenue left on the table.",
//     },
//     {
//       icon: Users,
//       value: "89%",
//       text: "of buyers research online before ever visiting.",
//     },
//   ]

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden bg-black py-28 text-white"
//     >

//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(179,14,28,0.22),transparent_45%)]" />

//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

//       <div className="absolute left-1/2 top-[20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#B30E1C]/10 blur-[160px]" />

//       <div className="relative z-10 mx-auto max-w-[1500px] px-6">


//           <div className="w-full">

//             <div className="ecosystem-label mb-8 flex items-center justify-center gap-4">

//               <div className="h-px w-28 bg-[#B30E1C]" />

//               <div className="text-[13px] uppercase tracking-[0.35em] text-[#B30E1C]">
//                 Auto Forge Ecosystem
//               </div>

//             </div>

//             <h2 className="ecosystem-title text-center text-[clamp(3.5rem,6vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.05em]">

//               {title.split(" ").map((word, i) => (

//                 <span
//                   key={i}
//                   className={`mr-[0.25em] inline-block ${
//                     [
//                       "intelligent",
//                       "ecosystems",
//                       "machines.",
//                     ].includes(word)
//                       ? "text-[#B30E1C]"
//                       : ""
//                   }`}
//                 >
//                   {word}
//                 </span>

//               ))}

//             </h2>

//             <p className="ecosystem-text mt-10 max-w-xl text-[20px] leading-2 text-white/55">

//               We connect leads, sales, operations, inventory and customer engagement into one AI-powered platform that automates workflows, eliminates friction and maximizes profitability.

//             </p>

//             <button className="ecosystem-btn group mt-14 inline-flex items-center gap-4 rounded-2xl border border-[#B30E1C]/40 bg-[#B30E1C]/10 px-8 py-5 text-sm font-medium uppercase tracking-[0.2em] text-[#B30E1C] transition-all duration-500 hover:bg-[#B30E1C] hover:text-white">

//               Explore Platform

//               <ArrowUpRight className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />

//             </button>

//           </div>

//         <div className=" items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

//           <div className="relative h-[900px]">

//             <div className="rotating-ring absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B30E1C]/15" />

//             <div className="rotating-ring-reverse absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B30E1C]/10" />

//             <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B30E1C]/20" />

//             <div className="pulse-core absolute left-1/2 top-1/2 flex h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#B30E1C]/40 bg-[radial-gradient(circle,rgba(255,115,0,0.45),rgba(255,115,0,0.08),transparent)] shadow-[0_0_120px_rgba(255,115,0,0.45)]">

//               <div className="text-center">

//                 <div className="text-[52px] font-semibold tracking-[-0.05em]">
//                   Revenue
//                 </div>

//                 <div className="text-[52px] font-semibold tracking-[-0.05em]">
//                   Engine
//                 </div>

//                 <div className="mt-3 text-[13px] uppercase tracking-[0.35em] text-orange-300/70">
//                   AI Core
//                 </div>

//               </div>

//             </div>

//             <div className="signal-dot absolute left-[49%] top-[16%] h-3 w-3 rounded-full bg-[#B30E1C] shadow-[0_0_20px_#ff6a00]" />
//             <div className="signal-dot absolute right-[18%] top-[34%] h-3 w-3 rounded-full bg-[#B30E1C] shadow-[0_0_20px_#ff6a00]" />
//             <div className="signal-dot absolute bottom-[18%] left-[31%] h-3 w-3 rounded-full bg-[#B30E1C] shadow-[0_0_20px_#ff6a00]" />
//             <div className="signal-dot absolute bottom-[28%] right-[23%] h-3 w-3 rounded-full bg-[#B30E1C] shadow-[0_0_20px_#ff6a00]" />

//             <div className="orbit-card absolute left-[3%] top-[32%] w-[260px] rounded-[28px] border border-[#B30E1C]/20 bg-black/60 p-7 backdrop-blur-2xl">

//               <BarChart3 className="mb-5 text-[#B30E1C]" size={34} />

//               <div className="text-[26px] font-medium leading-tight">
//                 Sales
//                 <br />
//                 Automation
//               </div>

//               <p className="mt-5 text-[15px] leading-8 text-white/50">
//                 Automate follow-ups, nurture journeys and close more deals.
//               </p>

//             </div>

//             <div className="orbit-card absolute right-[0%] top-[28%] w-[280px] rounded-[28px] border border-[#B30E1C]/20 bg-black/60 p-7 backdrop-blur-2xl">

//               <Boxes className="mb-5 text-[#B30E1C]" size={34} />

//               <div className="text-[26px] font-medium leading-tight">
//                 Inventory
//                 <br />
//                 Management
//               </div>

//               <p className="mt-5 text-[15px] leading-8 text-white/50">
//                 Real-time inventory sync and availability across all channels.
//               </p>

//             </div>

//             <div className="orbit-card absolute left-[18%] top-[2%] w-[360px] rounded-[28px] border border-[#B30E1C]/20 bg-black/60 p-7 backdrop-blur-2xl">

//               <UserRound className="mb-5 text-[#B30E1C]" size={34} />

//               <div className="text-[26px] font-medium leading-tight">
//                 Lead Intelligence
//               </div>

//               <p className="mt-5 text-[15px] leading-8 text-white/50">
//                 Capture, qualify and route high-intent leads in real time.
//               </p>

//             </div>

//             <div className="orbit-card absolute bottom-[8%] left-[22%] w-[300px] rounded-[28px] border border-[#B30E1C]/20 bg-black/60 p-7 backdrop-blur-2xl">

//               <Cog className="mb-5 text-[#B30E1C]" size={34} />

//               <div className="text-[26px] font-medium leading-tight">
//                 Operations
//                 <br />
//                 Optimization
//               </div>

//               <p className="mt-5 text-[15px] leading-8 text-white/50">
//                 Streamline processes, reduce manual work and boost efficiency.
//               </p>

//             </div>

//             <div className="orbit-card absolute bottom-[8%] right-[8%] w-[300px] rounded-[28px] border border-[#B30E1C]/20 bg-black/60 p-7 backdrop-blur-2xl">

//               <Users className="mb-5 text-[#B30E1C]" size={34} />

//               <div className="text-[26px] font-medium leading-tight">
//                 Customer
//                 <br />
//                 Analytics
//               </div>

//               <p className="mt-5 text-[15px] leading-8 text-white/50">
//                 Understand customer behavior and drive long-term loyalty.
//               </p>

//             </div>

//           </div>

//         </div>

//         <div className="metrics-wrapper mt-24 grid gap-px overflow-hidden rounded-[36px] border border-white/5 bg-white/5 backdrop-blur-2xl lg:grid-cols-3">

//           {metrics.map((metric, index) => {

//             const Icon = metric.icon

//             return (

//               <div
//                 key={index}
//                 className="metric-card flex items-center gap-8 bg-black/40 px-10 py-12"
//               >

//                 <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#B30E1C]/20 bg-[#B30E1C]/5">

//                   <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#B30E1C]/20 bg-black/40">
//                     <Icon className="text-[#B30E1C]" size={32} />
//                   </div>

//                 </div>

//                 <div>

//                   <div className="text-[64px] font-semibold leading-none tracking-[-0.06em] text-[#B30E1C]">
//                     {metric.value}
//                   </div>

//                   <p className="mt-3 max-w-xs text-[20px] leading-9 text-white/55">
//                     {metric.text}
//                   </p>

//                 </div>

//               </div>

//             )

//           })}

//         </div>

//       </div>

//     </section>
//   )
// }


"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useInView } from "motion/react"
import {
  CircleAlert,
  Database,
  Radar,
} from "lucide-react"
import { ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroVideo } from "@/components/animated-video-on-scroll"


gsap.registerPlugin(ScrollTrigger)

// Animated counter that counts from 0 to target when in view
function AnimatedNumber({ value, suffix = "", prefix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const [display, setDisplay] = useState(0)

  // Parse numeric part from value like "67%", "$2.3M", "+38%"
  const numericStr = value.replace(/[^0-9.]/g, "")
  const target = parseFloat(numericStr)
  const isDecimal = numericStr.includes(".")

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1800
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = eased * target
      setDisplay(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, target, isDecimal])

  return (
    <span ref={ref}>
      {prefix}{display}{isDecimal ? "" : ""}{suffix}
    </span>
  )
}

// Reconstruct the display value with animated number
function AnimatedValue({ raw }) {
  // patterns: "67%"  "$2.3M"  "+38%"
  if (raw.startsWith("$")) {
    const num = raw.replace(/[^0-9.]/g, "")
    const suffix = raw.replace(/[$0-9.]/g, "")
    return <><span>$</span><AnimatedNumber value={raw} suffix={suffix} /></>
  }
  if (raw.startsWith("+")) {
    const suffix = raw.replace(/[^a-zA-Z%]/g, "")
    return <><span>+</span><AnimatedNumber value={raw} suffix={suffix} /></>
  }
  const suffix = raw.replace(/[0-9.]/g, "")
  return <AnimatedNumber value={raw} suffix={suffix} />
}

export default function DealershipProblemSection() {
  const titleRef = useRef(null)
  const lineRef = useRef(null)
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-10% 0px" })

  const stats = [
    {
      value: "67%",
      text: "of leads go unresponded within 1 hour.",
      icon: CircleAlert,
    },
    {
      value: "$2.3M",
      text: "average annual revenue left on the table per dealership.",
      icon: Database,
    },
    {
      value: "89%",
      text: "of buyers research online before ever visiting a lot.",
      icon: Radar,
    },
  ]

  return (
    <>
      {/* <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#060606] py-28 text-white"
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(179,16,30,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="floating-orb absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-[#B30E1C]/10 blur-3xl" />
        <div className="floating-orb absolute right-[10%] top-[50%] h-52 w-52 rounded-full bg-[#B30E1C]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div
              ref={titleRef}
              className="mx-auto max-w-4xl text-center"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#B30E1C]" />
                The Problem
              </div>

              <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl md:leading-[1.1]">
                The Old Dealership
                <span className="relative ml-3 inline-block text-[#B30E1C]">
                  Is Broken
                  <span
                    ref={lineRef}
                    className="absolute -bottom-3 left-0 h-[3px] w-full rounded-full bg-[linear-gradient(90deg,transparent,#B30E1C,transparent)] bg-[length:200%_100%]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
                While buyers move at the speed of the internet, most dealerships
                are still running on yesterday’s playbook — leaking leads,
                leaving money on the table, and reacting instead of forecasting.
              </p>
            </div>
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-[#B30E1C]/10 bg-gradient-to-r from-[#B30E1C]/10 to-transparent p-6">
              <div className="absolute left-0 top-0 h-full w-1 bg-[#B30E1C]" />

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#B30E1C]">
                    Auto Forge Intelligence Layer
                  </p>

                  <h4 className="mt-3 text-2xl font-semibold text-white">
                    Turning dealership chaos into predictive growth.
                  </h4>
                </div>

                <div className="rounded-2xl border border-[#B30E1C]/20 bg-black/40 px-6 py-4 text-right backdrop-blur-xl">
                  <p className="text-sm text-zinc-400">
                    Revenue Opportunity
                  </p>
                  <h3 className="mt-1 text-4xl font-bold text-white">
                    +38%
                  </h3>
                </div>
              </div>
            </div>

          <div className="mt-8 grid items-center gap-5 lg:grid-cols-[1fr_1fr_1fr]">

              {stats.map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    key={index}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#B30E1C]/40 hover:bg-[#B30E1C]/[0.06]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative flex items-start gap-5">
                      <div className="rounded-2xl border border-[#B30E1C]/20 bg-[#B30E1C]/10 p-4 text-[#B30E1C]">
                        <Icon size={24} />
                      </div>

                      <div>
                        <h3 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                          {item.value}
                        </h3>

                        <p className="mt-4 max-w-sm text-lg leading-8 text-zinc-400">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          
        </div>
      </section> */}

      <section className="relative bg-[#060606] py-28 text-white">
          {/* <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" /> */}

         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(179,16,30,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="floating-orb absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-[#B30E1C]/10 blur-3xl" />
        <div className="floating-orb absolute right-[10%] top-[50%] h-52 w-52 rounded-full bg-[#B30E1C]/10 blur-3xl" />

        <ContainerScroll className="h-[350vh]">
          <ContainerSticky className=" px-6 py-10 text-slate-50">
            <ContainerAnimated className="space-y-4 text-center">
             <div
              ref={titleRef}
              className="mx-auto max-w-4xl text-center"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
                <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full inline-block"
                style={{ background: "#B30E1C", animation: "dotPulse 2.2s ease-in-out infinite" }} />
                The Problem
              </div>

              <h2 className="animate-title m-0 text-white"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(52px,9vw,82px)",
                  lineHeight: 0.97,
                  letterSpacing: "0.02em",
                }}>
                The Old Dealership {" "}
                <span className="relative ml-3 inline-block text-[#B30E1C]">Is Broken
                   <span
                    ref={lineRef}
                    className="absolute -bottom-3 left-0 h-[3px] w-full rounded-full bg-[linear-gradient(90deg,transparent,#B30E1C,transparent)] bg-[length:200%_100%]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
                While buyers move at the speed of the internet, most dealerships
                are still running on yesterday’s playbook — leaking leads,
                leaving money on the table, and reacting instead of forecasting.
              </p>
            </div>
            </ContainerAnimated>

            <ContainerInset className="max-h-[850px] w-full py-6">
              <HeroVideo
                src="./video-2.mp4"
                data-src="./video-2.mp4"
              />
            </ContainerInset>
            <ContainerAnimated
              transition={{ delay: 0.4 }}
              outputRange={[-120, 0]}
              inputRange={[0, 0.7]}
              className="mx-auto mt-2 w-fit "
            >
              <div className="relative max-w-7xl mx-auto mt-8 overflow-hidden rounded-3xl border border-[#B30E1C]/10 bg-gradient-to-r from-[#B30E1C]/10 to-transparent p-6">
                <div className="absolute left-0 top-0 h-full w-1 bg-[#B30E1C]" />

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#B30E1C]">
                      Auto Forge Intelligence Layer
                    </p>

                    <h4 className="mt-3 text-2xl font-semibold text-white">
                      Turning dealership chaos into predictive growth.
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-[#B30E1C]/20 bg-black/40 px-6 py-4 text-right backdrop-blur-xl">
                    <p className="text-sm text-zinc-400">
                      Revenue Opportunity
                    </p>
                    <h3 className="mt-1 text-4xl font-bold text-white">
                      <AnimatedValue raw="+38%" />
                    </h3>
                  </div>
                </div>
              </div>

              <div ref={statsRef} className="max-w-7xl mx-auto mt-8 grid items-center gap-5 lg:grid-cols-[1fr_1fr_1fr]">

                  {stats.map((item, index) => {
                    const Icon = item.icon

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 60 }}
                        animate={statsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#B30E1C]/40 hover:bg-[#B30E1C]/[0.06]"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative flex items-start gap-5">
                          <div className="rounded-2xl border border-[#B30E1C]/20 bg-[#B30E1C]/10 p-4 text-[#B30E1C]">
                            <Icon size={24} />
                          </div>

                          <div>
                            <h3 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                              <AnimatedValue raw={item.value} />
                            </h3>

                            <p className="mt-4 max-w-sm text-lg leading-8 text-zinc-400">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                {/* <div className="space-y-6">
                </div> */}
              </div>
            </ContainerAnimated>
          </ContainerSticky>
        </ContainerScroll>
      </section>
    </>
  )
}