import { useEffect, useRef, useState } from "react";
import song from "./assets/Persona 3 Reload - Color Your Night.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;

    const events = ["pointerdown", "keydown"];
    const removeListeners = () =>
      events.forEach((ev) => window.removeEventListener(ev, start));
    function start() {
      audio.play().then(removeListeners).catch(() => {});
    }

    // Try immediately; if the browser blocks it, start on first interaction.
    audio.play().catch(() => {
      events.forEach((ev) => window.addEventListener(ev, start));
    });
    return removeListeners;
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  return (
    <>
      <audio ref={audioRef} src={song} loop preload="auto" />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute music" : "Mute music"}
        style={{
          position: "fixed", right: 16, bottom: 16, zIndex: 1000,
          width: 40, height: 40, borderRadius: "50%",
          border: "2px solid #fff", background: "rgba(0,0,0,0.6)",
          color: "#fff", fontSize: 18, cursor: "pointer",
        }}
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
