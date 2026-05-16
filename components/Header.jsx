// components/Header.jsx
"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";


export default function Header() {
  return (
    
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-1000 bg-transparent border-b border-transparent backdrop-blur-none transition-[background,border-color,backdrop-filter,transform] duration-500 px-[3.5vw] py-4"
    >
      {/* Single inner wrapper — handles padding + layout */}
      <div className="flex items-center justify-between h-full ">
      {/* Logo */}
      <a className="flex items-center gap-2.5 no-underline cursor-pointer">
        <Image
          src={Logo}
          alt="Logo"
          width={140}
          height={40}
          priority
        />
      </a>

      {/* Nav links — centered */}
      <ul className="hidden md:flex items-center gap-11 list-none absolute left-1/2 -translate-x-1/2">
        {["Platform", "Why Forge", "How It Works", "Results"].map((label) => (
          <li key={label}>
            <a
              href="#"
              className="nav-link-underline text-[12px] font-medium tracking-[0.14em] uppercase text-white/55 hover:text-[#FAFAFA] transition-colors duration-300 no-underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className="bg-[#B30E1C] text-white px-[22px] py-[9px] rounded-md text-[12px] font-bold tracking-[0.12em] uppercase border-none cursor-pointer whitespace-nowrap [box-shadow:0_0_22px_rgba(255,85,0,0.35)] transition-[box-shadow,transform] duration-300 hover:[box-shadow:0_0_40px_rgba(255,85,0,0.55)] hover:scale-105">
        Get Started
      </button>
      </div>
    </nav>
  );
}
