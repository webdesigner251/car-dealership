// components/Header.tsx

"use client";

export default function Header() {
  return (
    <nav id="navbar">
      <a className="nav-logo">
        <div className="logo-mark">AF</div>

        <div className="logo-text">
          Auto Forge <span>Solutions</span>
        </div>
      </a>

      <ul className="nav-links">
        <li>
          <a href="#">Platform</a>
        </li>

        <li>
          <a href="#">Why Forge</a>
        </li>

        <li>
          <a href="#">How It Works</a>
        </li>

        <li>
          <a href="#">Results</a>
        </li>
      </ul>

      <button className="nav-cta" data-magnetic>
        Get Started
      </button>
    </nav>
  );
}
