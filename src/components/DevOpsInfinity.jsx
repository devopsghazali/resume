import { useEffect, useMemo, useState } from "react";
import { devopsTools } from "../data/devopsTools";

const stageMeta = {
  plan: {
    title: "Plan Stage",
    subtitle: "Planning and coordination tools used before implementation starts.",
    accent: "#f59e0b",
    symbol: "P",
  },
  code: {
    title: "Code Stage",
    subtitle: "Version control and collaboration tools for source management.",
    accent: "#fbbf24",
    symbol: "</>",
  },
  build: {
    title: "Build Stage",
    subtitle: "Build and packaging tools used for repeatable delivery.",
    accent: "#f97316",
    symbol: "B",
  },
  test: {
    title: "Test Stage",
    subtitle: "Validation and quality gates before release promotion.",
    accent: "#eab308",
    symbol: "T",
  },
  release: {
    title: "Release Stage",
    subtitle: "Automation and orchestration tools for controlled promotion.",
    accent: "#22d3ee",
    symbol: "R",
  },
  deploy: {
    title: "Deploy Stage",
    subtitle: "Container and cluster delivery tools for runtime rollout.",
    accent: "#3b82f6",
    symbol: "D",
  },
  operate: {
    title: "Operate Stage",
    subtitle: "Operating system and runtime tools for system management.",
    accent: "#60a5fa",
    symbol: "O",
  },
  monitor: {
    title: "Monitor Stage",
    subtitle: "Observation and alerting tools for ongoing visibility.",
    accent: "#38bdf8",
    symbol: "M",
  },
};

const toolCardMeta = {
  Jira: { accent: "#38bdf8", symbol: "J" },
  Confluence: { accent: "#818cf8", symbol: "C" },
  Git: { accent: "#f97316", symbol: "G" },
  GitHub: { accent: "#94a3b8", symbol: "GH" },
  GitLab: { accent: "#fb7185", symbol: "GL" },
  Maven: { accent: "#c084fc", symbol: "M" },
  Gradle: { accent: "#a3e635", symbol: "G" },
  npm: { accent: "#f97316", symbol: "N" },
  Jest: { accent: "#fbbf24", symbol: "J" },
  SonarQube: { accent: "#06b6d4", symbol: "SQ" },
  "GitHub Actions": { accent: "#60a5fa", symbol: "GA" },
  "GitLab CI": { accent: "#fb7185", symbol: "GC" },
  Docker: { accent: "#38bdf8", symbol: "D" },
  Kubernetes: { accent: "#3b82f6", symbol: "K" },
  Linux: { accent: "#eab308", symbol: "LX" },
  Systemd: { accent: "#f59e0b", symbol: "SD" },
  Prometheus: { accent: "#fb7185", symbol: "PM" },
  Grafana: { accent: "#f97316", symbol: "GF" },
};

function ToolTile({ name }) {
  const meta = toolCardMeta[name] ?? { accent: "#22d3ee", symbol: name.slice(0, 2).toUpperCase() };
  const gradientId = `grad-${name.replace(/\s+/g, "-")}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_10px_20px_rgba(0,0,0,0.18)]">
      <div
        className="mb-2 flex h-20 items-center justify-center rounded-xl border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${meta.accent}22, rgba(15, 23, 42, 0.95))`,
        }}
      >
        <svg viewBox="0 0 120 120" className="h-14 w-14" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={meta.accent} stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="42" fill={`url(#${gradientId})`} opacity="0.2" />
          <circle cx="60" cy="60" r="38" fill="none" stroke={meta.accent} strokeWidth="2.5" opacity="0.85" />
          <text
            x="60"
            y="68"
            textAnchor="middle"
            fontSize="24"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="Segoe UI, Arial, sans-serif"
          >
            {meta.symbol}
          </text>
        </svg>
      </div>
      <p className="text-center text-xs font-medium text-gray-100">{name}</p>
    </div>
  );
}

const DevOpsInfinity = () => {
  const [activeStage, setActiveStage] = useState(null);
  const [hoveredStage, setHoveredStage] = useState(null);

  const stages = useMemo(
    () => [
      { id: "code", label: "Code", top: "58%", left: "17%", rotate: "-35deg", color: "#fbbf24", size: "lg" },
      { id: "build", label: "Build", top: "35%", left: "40%", rotate: "-20deg", color: "#fbbf24", size: "lg" },
      { id: "plan", label: "Plan", top: "63%", left: "40%", rotate: "0deg", color: "#fbbf24", size: "lg" },
      { id: "test", label: "Test", top: "42%", left: "15%", rotate: "15deg", color: "#fbbf24", size: "lg" },
      { id: "release", label: "Release", top: "50%", left: "50%", rotate: "0deg", color: "#22d3ee", size: "lg" },
      { id: "deploy", label: "Deploy", top: "65%", left: "72%", rotate: "20deg", color: "#3b82f6", size: "lg" },
      { id: "operate", label: "Operate", top: "35%", left: "78%", rotate: "20deg", color: "#3b82f6", size: "lg" },
      { id: "monitor", label: "Monitor", top: "50%", left: "85%", rotate: "-15deg", color: "#3b82f6", size: "lg" },
    ],
    []
  );

  const selectedStage = activeStage ? stageMeta[activeStage] : null;
  const selectedTools = activeStage ? devopsTools[activeStage] ?? [] : [];

  useEffect(() => {
    document.body.style.overflow = activeStage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeStage]);

  return (
    <>
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
        </svg>

        {stages.map((stage) => {
          const active = activeStage === stage.id || hoveredStage === stage.id;

          return (
            <button
              key={stage.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ top: stage.top, left: stage.left }}
              onClick={() => setActiveStage(stage.id)}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              type="button"
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
                  transform: `scale(${active ? 1.15 : 1}) rotate(${stage.rotate})`,
                }}
              >
                {stage.label}
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setActiveStage("release")}
          className="absolute flex gap-3 text-6xl font-black pointer-events-auto select-none"
          aria-label="Open release tools"
        >
          <span className="text-yellow-400">DEV</span>
          <span className="text-cyan-400">∞</span>
          <span className="text-blue-500">OPS</span>
        </button>

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

      {activeStage && selectedStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f1a]/85 backdrop-blur-md px-4 py-8">
          <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#0e1322]/95 p-6 md:p-8 shadow-2xl shadow-cyan-950/30">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-3">
                  Clicked stage
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white">{selectedStage.title}</h3>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-gray-300">
                  {selectedStage.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveStage(null)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:border-cyan-300/50 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {selectedTools.map((tool) => (
                <ToolTile key={tool} name={tool} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevOpsInfinity;
