import { useMemo, useState } from "react";

const stages = [
  { id: "code", label: "Code", top: "58%", left: "17%", rotate: "-35deg", color: "#fbbf24" },
  { id: "build", label: "Build", top: "35%", left: "40%", rotate: "-20deg", color: "#fbbf24" },
  { id: "plan", label: "Plan", top: "63%", left: "40%", rotate: "0deg", color: "#fbbf24" },
  { id: "test", label: "Test", top: "42%", left: "15%", rotate: "15deg", color: "#fbbf24" },
  { id: "release", label: "Release", top: "50%", left: "50%", rotate: "0deg", color: "#22d3ee" },
  { id: "deploy", label: "Deploy", top: "65%", left: "72%", rotate: "20deg", color: "#3b82f6" },
  { id: "operate", label: "Operate", top: "35%", left: "78%", rotate: "20deg", color: "#3b82f6" },
  { id: "monitor", label: "Monitor", top: "50%", left: "85%", rotate: "-15deg", color: "#3b82f6" },
];

const DevOpsInfinity = () => {
  const [hoveredStage, setHoveredStage] = useState(null);

  const activeLine = useMemo(() => stages.find((item) => item.id === hoveredStage) ?? null, [hoveredStage]);

  return (
    <div className="relative w-full h-[420px] md:h-[600px] overflow-hidden flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M 15 30
            C 15 6, 40 6, 50 30
            C 60 54, 85 54, 85 30
            C 85 6, 60 6, 50 30
            C 40 54, 15 54, 15 30
          "
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="8 8"
          opacity="0.55"
          className="animate-flow"
        />
        {activeLine && (
          <line
            x1="50"
            y1="30"
            x2={parseFloat(activeLine.left)}
            y2={parseFloat(activeLine.top)}
            stroke="rgba(34,211,238,0.88)"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
        )}
      </svg>

      {stages.map((stage) => {
        const active = hoveredStage === stage.id;

        return (
          <button
            key={stage.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ top: stage.top, left: stage.left }}
            onMouseEnter={() => setHoveredStage(stage.id)}
            onMouseLeave={() => setHoveredStage(null)}
            type="button"
            aria-label={stage.label}
          >
            <div
              className="
                h-20 w-20 md:h-24 md:w-24 rounded-full
                flex items-center justify-center
                border transition duration-300
                text-white font-semibold
              "
              style={{
                background: active ? stage.color : "rgba(15, 23, 42, 0.94)",
                borderColor: stage.color,
                boxShadow: active ? `0 0 24px ${stage.color}` : "none",
                transform: active ? "scale(1.08)" : `rotate(${stage.rotate})`,
              }}
            >
              <span className="text-lg font-black md:text-xl">{stage.id === "code" ? "</>" : stage.label[0]}</span>
            </div>
            <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-gray-200">
              {stage.label}
            </span>
          </button>
        );
      })}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
        <div className="flex items-center gap-3 rounded-full border border-cyan-300/30 bg-black/70 px-8 py-4 text-4xl font-black shadow-[0_0_40px_rgba(34,211,238,0.12)]">
          <span className="text-yellow-400">DEV</span>
          <span className="text-cyan-400">∞</span>
          <span className="text-blue-500">OPS</span>
        </div>
      </div>

      <style>{`
        @keyframes flow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -60; }
        }
        .animate-flow {
          animation: flow 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DevOpsInfinity;
