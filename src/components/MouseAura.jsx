import { useEffect, useState } from "react";

const MouseAura = () => {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    const onMove = (event) => {
      setPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[5] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl transition-transform duration-150"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.38) 0%, rgba(34,211,238,0.1) 35%, rgba(99,102,241,0.03) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[6] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60 bg-cyan-200/10"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
    </>
  );
};

export default MouseAura;
