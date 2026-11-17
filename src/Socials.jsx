import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import newsign from "./assets/newsign.png";
import githubIcon from "./assets/socials/github.jpeg";
import instagramIcon from "./assets/socials/instagram.jpg";
import facebookIcon from "./assets/socials/facebook.jpg";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "github", label: "GITHUB", handle: "@AdaVercatti", href: "https://github.com/AdaVercatti", icon: "💻", barIcon: githubIcon, bars: 1, newBars: [0], counts: [""],
    links: ["github.com/AdaVercatti"],
    stats: [
      { tag: "USR", value: "AdaVercatti", color: "#bf94ff" },
    ],
  },
  {
    id: "instagram", label: "INSTAGRAM", handle: "@adavercatti", href: "https://www.instagram.com/adavercatti/", icon: "📷", barIcon: instagramIcon, bars: 1, newBars: [0], counts: [""],
    links: ["www.instagram.com/adavercatti/"],
    stats: [
      { tag: "USR", value: "adavercatti", color: "#e1306c" },
    ],
  },
  {
    id: "facebook", label: "FACEBOOK", handle: "@namjil.ada.jr", href: "https://www.facebook.com/namjil.ada.jr/", icon: "👤", barIcon: facebookIcon, bars: 1, newBars: [0], counts: [""],
    links: ["www.facebook.com/namjil.ada.jr/"],
    stats: [
      { tag: "USR", value: "namjil.ada.jr", color: "#4a8fff" },
    ],
  },
];

export default function Socials() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left"); // "left" | "right"
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp")    setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown")  setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter")      window.open(ITEMS[active].href, "_blank");
      } else {
        const barCount = ITEMS[active].bars;
        if (e.key === "ArrowUp")   setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter")     window.open("https://" + ITEMS[active].links[activeInfoBar], "_blank");
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: calc(6 * var(--u));
          padding-left: 0;
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

        /* lb/rb nav row */
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(calc(-5 * var(--u))); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(calc(5 * var(--u))); opacity: 0.4; }
        }
        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(12 * var(--u)));
          letter-spacing: 2px;
          color: #111;
          border: 1px solid rgba(0,0,0,0.35);
          padding: 1px calc(7 * var(--u));
          line-height: 1.5;
          user-select: none;
        }
        .sc-nav-arrow {
          font-size: max(10px, calc(12 * var(--u)));
          color: #c4001a;
          display: inline-block;
        }
        .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

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

        /* right-side nav bar */
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(calc(-10 * var(--u))); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: fixed;
          top: calc(40 * var(--u));
          right: calc(40 * var(--u));
          display: flex;
          align-items: center;
          gap: calc(6 * var(--u));
          pointer-events: none;
          z-index: 50;
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
        }
        .sc-right-nav .sc-nav-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(28 * var(--u));
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #111;
          padding: 0 calc(8 * var(--u));
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(22 * var(--u)));
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        /* info bar under nav */
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(calc(40 * var(--u))); }
          60%  { opacity: 1; transform: translateX(calc(-4 * var(--u))); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-info-bar-wrap {
          position: fixed;
          right: 0;
          left: 65%;
          top: calc((155 + var(--i, 0) * 52) * var(--u));
          height: calc(46 * var(--u));
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          z-index: 50;
          padding: 0;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-info-bar-wrap.selected {
          background: #111;
          padding: 1.5px;
          border-radius: calc(8 * var(--u));
        }
        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: #fff;
          border-radius: calc(7 * var(--u));
        }
        .sc-info-bar-new {
          position: absolute;
          left: calc(-40 * var(--u));
          bottom: 0;
          height: 65%;
          width: auto;
          pointer-events: none;
          z-index: 3;
        }
        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: calc(4 * var(--u));
          background: #c4001a;
          z-index: 1;
        }
        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(22 * var(--u)));
          letter-spacing: 2px;
          color: #111;
          padding: 0 calc(14 * var(--u));
          user-select: none;
        }
        .sc-info-bar-box {
          height: 70%;
          background: #000;
          display: flex;
          align-items: center;
          padding: 0 calc(12 * var(--u));
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(20 * var(--u)));
          letter-spacing: 1px;
          color: #fff;
          flex-shrink: 0;
          border-radius: calc(6 * var(--u));
          margin-right: calc(4 * var(--u));
          user-select: none;
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;
          flex-shrink: 0;
          margin-left: calc(14 * var(--u));
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(22 * var(--u)));
          letter-spacing: 1px;
          color: #111;
          margin-right: calc(80 * var(--u));
          flex-shrink: 0;
          user-select: none;
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: calc(20 * var(--u)); right: max(72px, calc(28 * var(--u)));
          display: flex; flex-direction: column;
          align-items: flex-end; gap: calc(5 * var(--u));
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: calc(8 * var(--u));
          font-size: max(10px, calc(13 * var(--u))); letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px calc(6 * var(--u)); font-size: calc(11 * var(--u));
        }

        /* ── Narrow / portrait screens ── */
        @media (max-aspect-ratio: 1/1), (max-width: 760px) {
          .sc-root { justify-content: flex-start; padding-top: 24vh; gap: calc(10 * var(--u)); }
          .sc-bar, .sc-bar-red { width: 94vw; }
          .sc-bar, .sc-bar-red { height: calc(96 * var(--u)); }
          .sc-bar-outer.active .sc-bar,
          .sc-bar-outer.active .sc-bar-red { height: calc(130 * var(--u)); }
          .sc-right-nav { top: 3vh; right: 0; left: 0; justify-content: center; }
          .sc-right-nav .sc-nav-btn { font-size: calc(80 * var(--u)); }
          .sc-info-bar-wrap {
            left: 6vw; right: 6vw;
            top: calc(58vh + var(--i, 0) * 62 * var(--u));
            height: calc(52 * var(--u));
            min-height: 40px;
          }
          .sc-char { left: calc(96 * var(--u)); max-width: calc(110 * var(--u)); }
          .sc-label { font-size: max(14px, calc(26 * var(--u))); letter-spacing: 2px; }
          .sc-icon { display: none; }
          .sc-stats { padding-right: calc(10 * var(--u)); }
          .sc-stat-num { font-size: max(12px, calc(22 * var(--u))); }
          .sc-info-bar-text { font-size: max(14px, calc(26 * var(--u))); }
          .sc-info-bar-count { margin-right: 12px; }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i) window.open(item.href, "_blank");
              else setActive(i);
            }}
            onMouseEnter={() => setActive(i)}
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
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted && Array.from({ length: ITEMS[active].bars }).map((_, i) => (
        <div
          className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
          key={`bar-${active}-${i}`}
          style={{ "--i": i, animationDelay: `${i * 50}ms` }}
          onClick={() => setActiveInfoBar(i)}
          onMouseEnter={() => setActiveInfoBar(i)}
        >
          {ITEMS[active].newBars.includes(i) && (
            <img className="sc-info-bar-new" src={newsign} alt="" />
          )}
          <div className="sc-info-bar">
            <img className="sc-info-bar-icon" src={ITEMS[active].barIcon} alt="" />
            <span className="sc-info-bar-text">{ITEMS[active].links[i].slice(0, 10)}...</span>
            <span className="sc-info-bar-box">VIEWS</span>
            <span className="sc-info-bar-count">{ITEMS[active].counts[i]}</span>
          </div>
        </div>
      ))}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OPEN</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
