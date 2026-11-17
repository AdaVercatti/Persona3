import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "National University of Mongolia", rank: 3 },
  { id: "ii", badge: "II", title: "SKILLS", subtitle: "Python / JavaScript / Flutter", rank: 4 },
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "Featured Work", rank: 5 },
  { id: "iv", badge: "IV", title: "EXPERIENCE", subtitle: "IT Engineer", rank: 2 },
];

const DETAILS = [
  {
    heading: "EDUCATION LOG",
    rows: [
      { title: "National University of Mongolia", status: "2026" },
      { title: "Bachelor of Computer Science", status: "Graduated" },
    ],
    bullets: ["- Graduated with a Bachelor's degree in Computer Science in 2026."],
  },
  {
  heading: "TECHNICAL SKILLS",
  rows: [
    { title: "JavaScript / TypeScript", status: "Advanced" },
    { title: "JS Frameworks & Libraries", status: "Advanced" },
    { title: "Python (FastAPI / Flask)", status: "Strong" },
    { title: "Flutter / Dart", status: "Proficient" },
    { title: "Java / C", status: "Familiar" },
  ],
  bullets: [
    "Full-stack web development with modern JavaScript and Python technologies.",
    "Experienced in frontend architecture, UI/UX, backend logic, and REST API development.",
    "Hands-on experience with AI-powered systems, including Face Liveness Detection and Korean ID OCR.",
    "Experienced in AI/ML model training, fine-tuning, and performance optimization."
  ],
},
  {
    heading: "PROJECTS LOG",
    rows: [{ title: "See GitHub", status: "AdaVercatti" }],
    bullets: ["- Projects are available at github.com/AdaVercatti."],
  },
  {
    heading: "EXPERIENCE LOG",
    rows: [{ title: "IT Engineer", status: "Current" }],
    bullets: ["- Currently working as an IT engineer.", "- 1 year of engineering experience."],
  },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, calc(720 * var(--u)));
          display: flex;
          flex-direction: column;
          gap: calc(10 * var(--u));
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: calc(92 * var(--u));
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 calc(6 * var(--u)) calc(12 * var(--u));
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(calc(-24 * var(--u)));
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(calc(-48 * var(--u)));
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: calc(112 * var(--u));
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 calc(8 * var(--u)) 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: calc(10 * var(--u)) calc(8 * var(--u)) 0 #d63232;
          transform: translateX(calc(6 * var(--u)));
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: calc(14 * var(--u)) calc(22 * var(--u)) calc(14 * var(--u)) calc(62 * var(--u));
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: calc(10 * var(--u));
          left: calc(-10 * var(--u));
          width: calc(56 * var(--u));
          height: calc(70 * var(--u));
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 calc(4 * var(--u)) 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(36 * var(--u));
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: calc(56 * var(--u));
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: calc(10 * var(--u));
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(28 * var(--u));
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: calc(70 * var(--u));
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: calc(64 * var(--u));
          right: calc(14 * var(--u));
          bottom: calc(12 * var(--u));
          height: calc(34 * var(--u));
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(10 * var(--u))) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 calc(18 * var(--u));
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(28 * var(--u));
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, calc(620 * var(--u)));
          min-height: 74vh;
          max-height: 86vh;
          overflow-y: auto;
          scrollbar-width: none;
          z-index: 12;
          padding: calc(22 * var(--u)) calc(24 * var(--u)) calc(24 * var(--u)) calc(24 * var(--u));
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(18 * var(--u))) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            calc(16 * var(--u)) calc(16 * var(--u)) 0 rgba(0, 6, 30, 0.55);
        }
        .resume-detail-panel::-webkit-scrollbar { display: none; }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: calc(70 * var(--u)) 1fr auto;
          align-items: center;
          gap: calc(14 * var(--u));
          min-height: calc(92 * var(--u));
          padding: 0 calc(18 * var(--u));
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(16 * var(--u))) 100%, 0 100%);
          color: #08153f;
          box-shadow: calc(10 * var(--u)) 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: calc(46 * var(--u));
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: calc(42 * var(--u));
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(42 * var(--u));
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: calc(10 * var(--u));
          margin-top: calc(18 * var(--u));
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: calc(50 * var(--u)) 1fr auto;
          align-items: center;
          gap: calc(14 * var(--u));
          min-height: calc(56 * var(--u));
          padding: 0 calc(14 * var(--u));
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(14 * var(--u))) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(calc(4 * var(--u)));
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(26 * var(--u));
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: calc(28 * var(--u));
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: max(10px, calc(22 * var(--u)));
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: calc(7 * var(--u)) calc(12 * var(--u));
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(8 * var(--u))) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: calc(22 * var(--u));
          padding: calc(18 * var(--u));
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - calc(16 * var(--u))) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: calc(30 * var(--u));
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: calc(14 * var(--u));
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: calc(10 * var(--u));
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: max(10px, calc(21 * var(--u)));
          line-height: 1.15;
          color: #edfaff;
        }


        .resume-detail-top-title,
        .resume-detail-row-title,
        .resume-detail-bullet { min-width: 0; overflow-wrap: anywhere; }

        /* ── Portrait phones / tablets: stack list above details, scroll ── */
        @media (max-aspect-ratio: 1/1) {
          .resume-overlay {
            --u: min(0.18vw, 0.1dvh);
            pointer-events: auto;
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: calc(30 * var(--u));
            padding: 3vh 3vw 96px;
            -webkit-overflow-scrolling: touch;
          }
          .resume-stack {
            position: relative;
            top: auto; left: auto;
            width: 100%;
            transform: none;
            flex-shrink: 0;
          }
          .resume-detail-panel {
            position: relative;
            top: auto; right: auto;
            width: 100%;
            min-height: 0;
            max-height: none;
            overflow: visible;
            flex-shrink: 0;
          }
          .resume-card { height: calc(120 * var(--u)); }
          .resume-detail-row { padding-top: calc(6 * var(--u)); padding-bottom: calc(6 * var(--u)); }
          .resume-detail-row-title, .resume-detail-top-title { line-height: 1.1; }
          .resume-list-tag { font-size: calc(80 * var(--u)); }
        }
      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-detail-panel">
          <div className="resume-detail-top">
            <div className="resume-detail-top-index">{String(active + 1).padStart(2, "0")}</div>
            <div className="resume-detail-top-title">{DETAILS[active].heading}</div>
            <div className="resume-detail-top-progress">{DETAILS[active].rows.length}</div>
          </div>

          <div className="resume-detail-list">
            {DETAILS[active].rows.map((row, i) => (
              <div className="resume-detail-row" key={row.title}>
                <div className="resume-detail-row-index">{String(i + 1).padStart(2, "0")}</div>
                <div className="resume-detail-row-title">{row.title}</div>
                <div className="resume-detail-status">{row.status}</div>
              </div>
            ))}
          </div>

          <div className="resume-detail-bottom">
            <div className="resume-detail-bottom-title">DETAILS</div>
            <div className="resume-detail-bullets">
              {DETAILS[active].bullets.map((b) => (
                <div className="resume-detail-bullet" key={b}>{b}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
