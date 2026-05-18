"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/card";

const defaultStats = [
  { value: "500+", label: "Dealerships" },
  { value: "98%", label: "Satisfaction" },
  { value: "3X", label: "Growth" },
];

const defaultTestimonials = [
  {
    name: "Elena Vasquez",
    title: "Owner · Pacific Coast Motors · San Diego, CA",
    rating: 5,
    quote:
      "“The AI does more in a day than our entire BDC did in a week. Our SDRs now focus on closing instead of chasing the phones — gross per unit is up nine points.”",
    avatarSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "David Chen",
    title: "VP Operations · Summit Automotive · Denver, CO",
    rating: 4.9,
    quote:
      "“Auto Forge cut our lead response time from 4 hours to 90 seconds. Conversions jumped 38% in the first quarter — and we didn't add a single BDC headcount.”",
    avatarSrc: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Marcus Reilly",
    title: "General Manager · Northgate Auto Group · Austin, TX",
    rating: 5,
    quote:
      "“Auto Forge cut our lead response time from 4 hours to 90 seconds. Conversions jumped 38% in the first quarter — and we didn't add a single BDC headcount.”",
    avatarSrc: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Elena Vasquez",
    title: "Owner · Pacific Coast Motors · San Diego, CA",
    rating: 5,
    quote:
      "“The AI does more in a day than our entire BDC did in a week. Our SDRs now focus on closing instead of chasing the phones — gross per unit is up nine points.”",
    avatarSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "David Chen",
    title: "VP Operations · Summit Automotive · Denver, CO",
    rating: 4.9,
    quote:
      "“Auto Forge cut our lead response time from 4 hours to 90 seconds. Conversions jumped 38% in the first quarter — and we didn't add a single BDC headcount.”",
    avatarSrc: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Marcus Reilly",
    title: "General Manager · Northgate Auto Group · Austin, TX",
    rating: 5,
    quote:
      "“Auto Forge cut our lead response time from 4 hours to 90 seconds. Conversions jumped 38% in the first quarter — and we didn't add a single BDC headcount.”",
    avatarSrc: "https://i.pravatar.cc/150?img=3",
  },
];

const brandNames = [
  "NORTHGATE",
  "PACIFIC COAST",
  "SUMMIT AUTO",
  "MERIDIAN",
  "CRESTLINE",
  "IRONCLAD",
  "VANGUARD",
  "BLACKSTONE",
  "RIDGELINE",
  "HARBOR",
];

const marqueeBrands = [...brandNames, ...brandNames];

const StatCard = ({ value, label }) => (
  <Card className=" border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-[#B30E1C]/40 hover:bg-[#B30E1C]/[0.06]">
    <CardContent className="p-4">
      <p className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {value}
      </p>
      <p className="text-sm text-white">{label}</p>
    </CardContent>
  </Card>
);

const StickyTestimonialCard = ({ testimonial, index }) => (
  <div
    className="lg:sticky"
    style={{ top: `${100 + index * 30}px`, zIndex: index }}
  >
    <motion.div
      className="p-6 rounded-2xl shadow-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-[#B30E1C]/40 hover:bg-[#B30E1C]/[0.06]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={testimonial.avatarSrc}
          alt={testimonial.name}
          className="w-14 h-14 rounded-xl object-cover"
        />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 my-4">
        <span>{testimonial.rating}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(testimonial.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground/30",
              )}
            />
          ))}
        </div>
      </div>

      <p className="text-muted-foreground break-words">“{testimonial.quote}”</p>
    </motion.div>
  </div>
);

const Testimonials = ({
  tagLabel = "Client Success",
  title = "Trusted by Leading Dealerships",
  description = "Real client success stories.",
  stats = defaultStats,
  testimonials = defaultTestimonials,
  className,
}) => {
  return (
    <section className={cn("w-full py-24 bg-[#050507]", className)}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0 grid lg:grid-cols-2 gap-20">
        {/* Left sticky content */}
        <div className="lg:sticky top-24 h-fit">
          <header className="animate-header text-start">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-[#B30E1C]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-xl">
              <span
                aria-hidden="true"
                className="w-[7px] h-[7px] rounded-full inline-block"
                style={{
                  background: "#B30E1C",
                  animation: "dotPulse 2.2s ease-in-out infinite",
                }}
              />
              Built for Results
            </div>

            <h2
              className="animate-title m-0 text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px,9vw,82px)",
                lineHeight: 0.97,
                letterSpacing: "0.02em",
              }}
            >
              The numbers don&apos;t{" "}
              <span style={{ color: "#b4101d" }}>whisper.</span>
            </h2>

            <p
              className="animate-title mt-5 text-base leading-[1.65] max-w-[520px] text-start"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Auto Forge connects your DMS, CRM, inventory feeds, and customer
              touchpoints into a single intelligent ecosystem — and gives every
              team in your store a smarter weapon.
            </p>
          </header>
          {/* <div className="inline-flex items-center gap-2 border rounded-full px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            {tagLabel}
          </div>

          <h2 className="text-5xl font-bold mt-6">{title}</h2>
          <p className="text-muted-foreground mt-4">
            {description}
          </p> */}

          <div className="grid grid-cols-3 gap-4 mt-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Sticky stacked cards */}
        <div className="relative space-y-8 lg:min-h-[220vh]">
          {testimonials.map((testimonial, index) => (
            <StickyTestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 mx-auto w-full max-w-7xl px-4 lg:px-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] py-4">
        <div className="marquee overflow-hidden">
          <div className="marquee-track inline-flex items-center gap-10 whitespace-nowrap px-4 text-sm uppercase tracking-[0.28em] text-white/80">
            {marqueeBrands.concat(marqueeBrands).map((brand, index) => (
              <span
                key={`${brand}-${index}`}
                className="inline-flex items-center gap-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#B30E1C]" />
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
