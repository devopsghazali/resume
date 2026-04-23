import useReveal from "../hooks/useReveal";
import { backendRoadmap } from "../data/backendRoadmap";

const BackendRoadmap = () => {
  const [sectionRef, visible] = useReveal();

  return (
    <section id="backend-roadmap" className="relative min-h-screen bg-[#0b0f1a] px-6 py-28 overflow-hidden border-t border-white/5">
      <div className="absolute top-[-120px] left-[-120px] w-[360px] h-[360px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[360px] h-[360px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div ref={sectionRef} className={`relative max-w-6xl mx-auto ${visible ? "animate-fade-up" : "opacity-0"}`}>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-3">Backend Lab</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white hero-title">{backendRoadmap.title}</h1>
          <p className="mt-4 text-gray-400 max-w-3xl leading-relaxed">{backendRoadmap.subtitle}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 mb-8">
          {backendRoadmap.projects.map((project, index) => (
            <article key={project.slug} className="rounded-[1.75rem] border border-white/10 bg-[#101628]/90 p-6 project-card-surface">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Project {index + 1}</p>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-gray-300">Node.js</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">{project.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.purpose}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/20 hover:border-cyan-300/60 transition"
              >
                Open {project.repoLabel}
              </a>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#101628]/90 p-6 md:p-8 project-card-surface">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-4">21 Concepts Checklist</p>
          <div className="grid gap-3 md:grid-cols-2">
            {backendRoadmap.checklist.map((item, index) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                <span className="text-cyan-200 mr-2">{index + 1}.</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackendRoadmap;
