
import { useState } from "react";

const DevOpsInfinity = () => {
  const [activeStage, setActiveStage] = useState(null);
  const [hoveredStage, setHoveredStage] = useState(null);

  const stages = [
    { id: "code", label: "Code", top: "59%", left: "17%", rotate: "-35deg", color: "#fbbf24",size: "lg"},
    { id: "build", label: "Build", top: "35%", left: "40%", rotate: "-20deg", color: "#fbbf24", size: "lg" },
    { id: "plan", label: "Plan", top: "63%", left: "40%", rotate: "0deg", color: "#fbbf24", size: "lg" },
    { id: "test", label: "Test", top: "42%", left: "15%", rotate: "15deg", color: "#fbbf24", size: "lg" },

    { id: "release", label: "Release", top: "50%", left: "50%", rotate: "0deg", color: "#22d3ee", size: "lg" },

    { id: "deploy", label: "Deploy", top: "65%", left: "72%", rotate: "20deg", color: "#3b82f6", size: "lg" },
    { id: "operate", label: "Operate", top: "35%", left: "78%", rotate: "20deg", color: "#3b82f6", size: "lg" },
    { id: "monitor", label: "Monitor", top: "50%", left: "85%", rotate: "-15deg", color: "#3b82f6" , size: "lg"}
  ];

  return (
    <div className="
  relative w-full 
  h-[420px] md:h-[600px]
  overflow-hidden 
  flex items-center justify-center
">

      {/* ♾️ BIGGER DEVOPS INFINITY LINE */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 60"
        xmlns="http://www.w3.org/2000/svg"
      >
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
          strokeWidth="1.2"     /* 🔥 thicker line */
          strokeLinecap="round"
          strokeDasharray="8 8" /* 🔥 bigger dashes */
          opacity="0.55"
          className="animate-flow"
        />
      </svg>

      {/* Buttons on Path */}
      {stages.map(stage => {
        const active = activeStage === stage.id || hoveredStage === stage.id;

        return (
          <button
            key={stage.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ top: stage.top, left: stage.left }}
            onClick={() => setActiveStage(stage.id)}
            onMouseEnter={() => setHoveredStage(stage.id)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <div
              className={`
                ${stage.size === "lg" ? "px-10 py-3 text-sm" : "px-4 py-1.5 text-xs"}
                rounded-full font-semibold transition-all
              `}
              style={{
                background: active ? stage.color : "rgba(0,0,0,0.9)",
                color: active ? "#000" : "#fff",
                border: `1.5px solid ${stage.color}`,
                boxShadow: active ? `0 0 18px ${stage.color}` : "none",
                transform: `
                  scale(${active ? 1.15 : 1})
                  rotate(${stage.rotate})
                `
              }}
            >
              {stage.label}
            </div>
          </button>
        );
      })}

      {/* 🔤 BIGGER CENTER TEXT */}
      <div className="absolute flex gap-3 text-6xl font-black pointer-events-none">
        <span className="text-yellow-400">DEV</span>
        <span className="text-cyan-400">∞</span>
        <span className="text-blue-500">OPS</span>
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


