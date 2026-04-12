import { useMemo, useState } from "react";
import { devopsTools } from "../data/devopsTools";

const stageMeta = {
  plan: { title: "Plan", subtitle: "Planning and coordination", accent: "#f59e0b", symbol: "P" },
  code: { title: "Code", subtitle: "Version control and collaboration", accent: "#fbbf24", symbol: "</>" },
  build: { title: "Build", subtitle: "Packaging and repeatable delivery", accent: "#f97316", symbol: "B" },
  test: { title: "Test", subtitle: "Validation and quality gates", accent: "#eab308", symbol: "T" },
  release: { title: "Release", subtitle: "Controlled promotion", accent: "#22d3ee", symbol: "R" },
  deploy: { title: "Deploy", subtitle: "Container and cluster delivery", accent: "#3b82f6", symbol: "D" },
  operate: { title: "Operate", subtitle: "Runtime and system operations", accent: "#60a5fa", symbol: "O" },
  monitor: { title: "Monitor", subtitle: "Observability and alerting", accent: "#38bdf8", symbol: "M" },
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

const stages = [
  { id: "test", label: "Test", top: "18%", left: "18%", rotate: "-20deg", color: "#eab308" },
  { id: "build", label: "Build", top: "18%", left: "45%", rotate: "-10deg", color: "#f97316" },
  { id: "plan", label: "Plan", top: "42%", left: "12%", rotate: "-30deg", color: "#f59e0b" },
  { id: "code", label: "Code", top: "42%", left: "82%", rotate: "20deg", color: "#fbbf24" },
  { id: "release", label: "Release", top: "58%", left: "22%", rotate: "10deg", color: "#22d3ee" },
  { id: "deploy", label: "Deploy", top: "58%", left: "74%", rotate: "20deg", color: "#3b82f6" },
  { id: "operate", label: "Operate", top: "80%", left: "36%", rotate: "-10deg", color: "#60a5fa" },
  { id: "monitor", label: "Monitor", top: "80%", left: "64%", rotate: "12deg", color: "#38bdf8" },
];

function ToolTile({ name }) {
  const meta = toolCardMeta[name] ?? { accent: "#22d3ee", symbol: name.slice(0, 2).toUpperCase() };
  const gradientId = `grad-${name.replace(/\s+/g, "-")}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div
        className="mb-2 flex h-20 items-center justify-center rounded-xl border border-white/10"
        style={{ background: `linear-gradient(135deg, ${meta.accent}22, rgba(15, 23, 42, 0.95))` }}
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
          <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="700" fill="#ffffff" fontFamily="Segoe UI, Arial, sans-serif">
            {meta.symbol}
          </text>
        </svg>
      </div>
      <p className="text-center text-xs font-medium text-gray-100">{name}</p>
    </div>
  );
}

const DevOpsInfinity = () => {
  const [activeStage, setActiveStage] = useState("release");

  const selectedStage = stageMeta[activeStage];
  const selectedTools = devopsTools[activeStage] ?? [];

  const branchLine = useMemo(() => {
    const stage = stages.find((item) => item.id === activeStage);
    if (!stage) return null;

    return {
      left: parseFloat(stage.left),
      top: parseFloat(stage.top),
    };
  }, [activeStage]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative h-[500px] md:h-[640px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0f1a]/75">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M 20 50 C 20 20, 40 20, 50 50 C 60 80, 80 80, 80 50 C 80 20, 60 20, 50 50 C 40 80, 20 80, 20 50"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.1"
            strokeDasharray="7 7"
            className="animate-flow"
          />
          <line x1="50" y1="50" x2="50" y2="50" stroke="transparent" />
        </svg>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_35%),radial-gradient(circle_at_top,_rgba(245,158,11,0.09),_transparent_28%)]" />

        {stages.map((stage) => {
          const meta = stageMeta[stage.id];
          const active = activeStage === stage.id;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStage(stage.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: stage.left, top: stage.top }}
            >
              <div
                className="relative flex h-20 w-20 items-center justify-center rounded-full border transition duration-300 md:h-24 md:w-24"
                style={{
                  background: active ? meta.accent : "rgba(15, 23, 42, 0.94)",
                  borderColor: meta.accent,
                  boxShadow: active ? `0 0 24px ${meta.accent}` : "none",
                  transform: active ? "scale(1.08)" : `rotate(${stage.rotate})`,
                }}
              >
                <span className="text-lg font-black text-white md:text-xl">{meta.symbol}</span>
              </div>
              <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-gray-200">
                {stage.label}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setActiveStage("release")}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        >
          <div className="flex items-center gap-3 rounded-full border border-cyan-300/30 bg-black/70 px-8 py-4 text-4xl font-black shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <span className="text-yellow-400">DEV</span>
            <span className="text-cyan-400">∞</span>
            <span className="text-blue-500">OPS</span>
          </div>
        </button>

        {branchLine && (
          <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line
              x1="50"
              y1="50"
              x2={branchLine.left}
              y2={branchLine.top}
              stroke="rgba(34,211,238,0.85)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
          </svg>
        )}
      </div>

      <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#101628]/90 p-6 md:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-2">Selected branch</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedStage.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{selectedStage.subtitle}</p>
          </div>
          <div className="hidden md:block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300">
            click any circle
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {selectedTools.map((tool) => (
            <ToolTile key={tool} name={tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevOpsInfinity;
