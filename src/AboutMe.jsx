import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
      upper: [
      "Ada Vercatti",
      "National University of Mongolia",
      "B.Sc. in Computer Science, Class of 2026"
      ],
      lower: "Born to create."
      },

      // PAGE 02 — THE CHARACTER
      {
      upper: [
      "180 cm of questionable decisions",
      "I debug code better than my life",
      "Old soul, modern problems",
      "Main character in games, NPC in real life",
      "An outlaw in imagination, a developer by profession"
      ],
      lower: "A walking collection of contradictions."
      },

      // PAGE 03 — BEYOND THE SCREEN
      {
      upper: [
      "Video games, naturally",
      "Wild West enthusiast",
      "Doc Holliday admirer",
      "Red Dead Redemption devotee",
      "Dark humor connoisseur"
      ],
      lower: "I'm your huckleberry."
      }
];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "twitch", label: "ABOUT ME", handle: "@AdaVercatti", href: "https://github.com/AdaVercatti", icon: "🎮", barIcon: icon1, bars: 1, newBars: [0], counts: ["56"],
    links: ["twitch.tv/videos/2041837265"],
    stats: [
      { tag: "EDU", value: "CS",   color: "#9147ff" },
      { tag: "YR",  value: "2026", color: "#bf94ff" },
    ],
  },
  {
    id: "instagram", label: "FUN FACT ABOUT ME", handle: "@adavercatti", href: "https://www.instagram.com/adavercatti/", icon: "📷", barIcon: icon2, bars: 5, newBars: [1, 2], counts: ["3.4M", "2.5M", "676K", "412K", "198K"],
    links: ["instagram.com/p/C4xQmRrNk2a", "instagram.com/p/C3wLpBsOj7f", "instagram.com/reel/C2vKoArMi6e", "instagram.com/p/C1uJnZqLh5d", "instagram.com/reel/C0tImYpKg4c"],
    stats: [
      { tag: "HGT", value: "180", color: "#e1306c" },
      { tag: "MOON", value: "YES", color: "#f77737" },
    ],
  },
  {
    id: "tiktok", label: "WIRED FACT ABOUT ME", handle: "@adavercatti", href: "https://www.instagram.com/adavercatti/", icon: "🎵", barIcon: icon3, bars: 7, newBars: [0, 3, 5, 6], counts: ["5.1M", "3.7M", "2.2M", "1.4M", "831K", "490K", "217K"],
    links: ["tiktok.com/@yourhandle/video/7318492016374859054", "tiktok.com/@yourhandle/video/7305837261940183342", "tiktok.com/@yourhandle/video/7291046385720348974", "tiktok.com/@yourhandle/video/7278392047163820334", "tiktok.com/@yourhandle/video/7264819203847165742", "tiktok.com/@yourhandle/video/7251047382916430126", "tiktok.com/@yourhandle/video/7237294018463851822"],
    stats: [
      { tag: "GAME", value: "YES", color: "#00f2ea" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    let lastWheel = 0;
    const onWheel = (e) => {
      const now = Date.now();
      if (now - lastWheel < 250 || Math.abs(e.deltaY) < 4) return;
      lastWheel = now;
      const d = e.deltaY > 0 ? 1 : -1;
      setActive(i => Math.max(0, Math.min(ITEMS.length - 1, i + d)));
    };
    const onContext = (e) => {
      e.preventDefault();
      if (revealed) setRevealed(false);
      else navigate(-1);
    };
    const onMouseUp = (e) => {
      if (e.button === 3) { // mouse "back" button
        e.preventDefault();
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("contextmenu", onContext);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [active, navigate, revealed]);

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mx", x.toFixed(3));
      document.documentElement.style.setProperty("--my", y.toFixed(3));
    };
    let startX = null;
    const onDown = (e) => { startX = e.clientX; };
    const onUp = (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 80) setActive(i => Math.max(0, Math.min(ITEMS.length - 1, i + (dx < 0 ? 1 : -1))));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const step = (d) => setActive(i => Math.max(0, Math.min(ITEMS.length - 1, i + d)));

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      {revealed && <div key={`dim-${active}`} className="sc-dim" onClick={() => setRevealed(false)} />}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar" onClick={() => setActive(i => (i + 1) % ITEMS.length)}>
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}
      {revealed && (
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left" onClick={() => step(-1)}>◄</span>
          <span className="sc-nav-btn" onClick={() => step(-1)}>LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn" onClick={() => step(1)}>RB</span>
          <span className="sc-nav-arrow right" onClick={() => step(1)}>►</span>
        </div>
      )}
      {revealed && (
        <div key={`portrait-${active}`} className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`} onClick={() => setActive(i => (i + 1) % ITEMS.length)}>
          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[active]}
            alt=""
          />
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: calc(6 * var(--u));
          padding-left: 0;
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 12;
          background: rgba(40, 45, 54, 0.68);
          cursor: pointer;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(calc(-120 * var(--u))) rotate(-20deg) scaleX(0.72);
          }
          60% {
            opacity: 0.96;
            transform: translateX(calc(18 * var(--u))) rotate(-20deg) scaleX(1.03);
          }
          100% {
            opacity: 0.92;
            transform: translateX(0) rotate(-20deg) scaleX(1);
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(calc(78 * var(--u))) skewX(-8deg) scale(0.94);
            filter: blur(calc(8 * var(--u)));
          }
          55% {
            opacity: 0.9;
            transform: translateX(calc(-8 * var(--u))) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 0.96;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(calc(-5 * var(--u))); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(calc(5 * var(--u))); opacity: 0.4; }
        }

        .sc-main-portrait-shell {
          position: absolute;
          top: 0;
          right: -3vw;
          z-index: 13;
          pointer-events: all;
          cursor: pointer;
          width: 43vw;
          height: 100vh;
          overflow: hidden;
          opacity: 0;
          transform: translateX(calc(24 * var(--u))) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-reveal-panel {
          position: absolute;
          top: 44vh;
          left: -6vw;
          width: 88vw;
          height: 60vh;
          z-index: 12;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(88 * var(--u))) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            calc(18 * var(--u)) 0 0 rgba(215, 13, 44, 0.82),
            calc(28 * var(--u)) 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(calc(-40 * var(--u))) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(8 * var(--u));
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0%;
          width: 100%;
          height: 40%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(22 * var(--u))) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          pointer-events: all;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: calc(10 * var(--u));
          color: #fff;
          text-align: center;
        }
        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: max(10px, calc(20 * var(--u)));
          letter-spacing: 0.5px;
          line-height: 1.15;
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 48%;
          height: 20%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(22 * var(--u))) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: max(10px, calc(22 * var(--u)));
          letter-spacing: 0.4px;
          text-transform: lowercase;
          padding-left: calc(22 * var(--u));
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(calc(-10 * var(--u))); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: calc(6 * var(--u));
          pointer-events: none;
          z-index: 14;
          transform: translateX(calc(-40 * var(--u))) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(100 * var(--u));
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 calc(6 * var(--u));
          pointer-events: all;
          cursor: pointer;
          transition: transform 0.15s ease, color 0.15s ease;
        }
        .sc-right-nav .sc-nav-btn:hover { color: #ff3b4f; transform: scale(1.1); }
        .sc-right-nav .sc-nav-btn:active { transform: scale(0.94); }
        .sc-right-nav .sc-nav-dot {
          width: calc(16 * var(--u));
          height: calc(16 * var(--u));
          border-radius: calc(999 * var(--u));
          background: #111;
          margin: 0 calc(10 * var(--u));
          flex-shrink: 0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(22 * var(--u)));
          color: #c4001a;
          display: inline-block;
          user-select: none;
          pointer-events: all;
          cursor: pointer;
          padding: calc(8 * var(--u));
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08) translate(calc(var(--mx, 0) * calc(-10 * var(--u))), calc(var(--my, 0) * calc(-8 * var(--u))));
          transform-origin: top right;
          transition: transform 0.2s ease-out;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 45vw;
          height: calc(64 * var(--u));
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(14 * var(--u))) 100%, 0 100%);
          box-shadow: 0 calc(6 * var(--u)) calc(24 * var(--u)) rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: calc(90 * var(--u)); }
        .sc-bar-outer.active .sc-bar-red { height: calc(90 * var(--u)); }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: calc(64 * var(--u));
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - calc(10 * var(--u))) 100%);
          transform: translateY(calc(-7 * var(--u)));
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - calc(32 * var(--u))) 100%, calc(100% - calc(32 * var(--u))) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - calc(14 * var(--u))) 100%, calc(22% + calc(138 * var(--u))) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: calc(6 * var(--u));
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 calc(20 * var(--u)) 0 calc(20 * var(--u));
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: calc(50 * var(--u));
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 calc(16 * var(--u)) 0 calc(8 * var(--u));
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: calc(78 * var(--u));
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: calc(12 * var(--u));
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(22 * var(--u)));
          width: calc(32 * var(--u));
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(28 * var(--u));
          letter-spacing: calc(4 * var(--u));
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: calc(10 * var(--u));
          padding-right: calc(24 * var(--u));
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: calc(4 * var(--u));
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(9 * var(--u)));
          letter-spacing: 1.5px;
          padding: 1px calc(4 * var(--u));
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(26 * var(--u));
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: calc(110 * var(--u));
          height: 100%;
          width: auto;
          max-width: calc(160 * var(--u));
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(calc(20 * var(--u)) 0%, 100% 0%, calc(100% - calc(20 * var(--u))) 100%, 0% 100%);
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: calc(20 * var(--u)); right: max(72px, calc(28 * var(--u)));
          display: flex; flex-direction: column;
          align-items: flex-end; gap: calc(5 * var(--u));
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          cursor: pointer; pointer-events: all; transition: color 0.15s ease;
          display: flex; align-items: center; gap: calc(8 * var(--u));
          font-size: max(10px, calc(13 * var(--u))); letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-row:hover { color: #fff; }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px calc(6 * var(--u)); font-size: calc(11 * var(--u));
        }

        /* ── Portrait phones / tablets ── */
        @media (max-aspect-ratio: 1/1) {
          .sc-bar, .sc-bar-red { width: 94vw; }
          .sc-bar, .sc-bar-red { height: calc(96 * var(--u)); }
          .sc-bar-outer.active .sc-bar,
          .sc-bar-outer.active .sc-bar-red { height: calc(130 * var(--u)); }
          .sc-root { gap: calc(10 * var(--u)); }
          .sc-label { font-size: max(15px, calc(30 * var(--u))); letter-spacing: 2px; }
          .sc-main-portrait-shell { width: 100vw; right: 0; z-index: 11; height: 100dvh; }
          .sc-reveal-panel { top: 52vh; left: 4vw; width: 108vw; height: 50vh; }
          .sc-reveal-upper-bar { top: 12%; height: 46%; padding-left: 30%; padding-right: 8%; }
          .sc-reveal-lower-bar { top: 64%; height: 22%; }
          .sc-reveal-upper-line { font-size: max(12px, calc(24 * var(--u))); }
          .sc-reveal-lower-bar { font-size: max(12px, calc(26 * var(--u))); width: 62%; }
          .sc-right-nav { top: 12vh; left: 4vw; }
          .sc-right-nav .sc-nav-btn { font-size: calc(90 * var(--u)); }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              setActive(i);
              setRevealed(true);
            }}
            onMouseEnter={() => {
              setActive(i);
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row" onClick={() => step(1)}><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row" onClick={() => setRevealed(r => !r)}><span className="sc-footer-key">↵</span><span>{revealed ? "CLOSE" : "REVEAL"}</span></div>
        <div className="sc-footer-row" onClick={() => (revealed ? setRevealed(false) : navigate(-1))}><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
