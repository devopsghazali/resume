import { useMemo, useState } from "react";

import { masterLabs } from "../data/masterLabs";
import useReveal from "../hooks/useReveal";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const MasterLabsSection = () => {
  const [sectionRef, visible] = useReveal();
  const [openSlug, setOpenSlug] = useState("python");

  const totals = useMemo(
    () => ({
      projects: masterLabs.tracks.reduce((sum, track) => sum + track.projects.length, 0),
      questions: masterLabs.tracks.reduce((sum, track) => sum + track.questions.length, 0),
    }),
    []
  );

  return (
    <section id="labs" className="relative bg-[#0b0f1a] px-6 py-28 overflow-hidden">
      <div className="absolute top-[-120px] right-[-100px] w-[340px] h-[340px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-120px] left-[-100px] w-[340px] h-[340px] bg-indigo-500/10 rounded-full blur-[120px]" />

      <div
        ref={sectionRef}
        className={`relative max-w-7xl mx-auto ${visible ? "animate-fade-up" : "opacity-0"}`}
      >
        <div className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-3">Master Lab</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 hero-title">
            33 practical DevOps projects with interview questions
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            I grouped related tools so the set stays focused instead of turning into filler.
            Each track keeps three practical projects and ten questions, and each project now
            points to a real code folder with starter files and YAML where it makes sense.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300">
              {masterLabs.tracks.length} tool tracks
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300">
              {totals.projects} projects
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300">
              {totals.questions} questions
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {masterLabs.tracks.map((track, index) => {
            const isOpen = openSlug === track.slug;
            const repoUrl = `https://github.com/devopsghazali/resume/tree/main/labs/${track.slug}`;

            return (
              <article
                key={track.slug}
                className={`
                  group rounded-2xl border border-white/10 bg-gradient-to-b from-[#11172a] to-[#0e1322]
                  shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-300
                  ${isOpen ? "border-cyan-400/40 shadow-[0_24px_60px_rgba(34,211,238,0.14)]" : ""}
                `}
              >
                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? "" : track.slug)}
                  className="w-full text-left p-5 md:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-cyan-300">
                          Track {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300">
                          3 projects
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-100">
                        {track.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{track.focus}</p>
                    </div>

                    <span className="text-cyan-200 text-lg mt-1">{isOpen ? "-" : "+"}</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 md:px-6 pb-6 space-y-5">
                    <div className="grid gap-3">
                      {track.projects.map((project) => {
                        const projectSlug = slugify(project.title);
                        const projectUrl = `https://github.com/devopsghazali/resume/tree/main/labs/${track.slug}/${projectSlug}`;

                        return (
                          <a
                            key={project.title}
                            href={projectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-cyan-300/50 hover:bg-cyan-500/10 transition"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className="font-semibold text-white">{project.title}</h4>
                                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                                  {project.summary}
                                </p>
                              </div>
                              <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] text-cyan-100">
                                Code
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {project.stack.map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-[11px] text-gray-300"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-300 mb-3">
                        10 Interview Questions
                      </p>
                      <div className="grid gap-2 md:grid-cols-2">
                        {track.questions.map((question, questionIndex) => (
                          <div
                            key={question}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300"
                          >
                            <span className="text-cyan-200 mr-2">{questionIndex + 1}.</span>
                            {question}
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/20 hover:border-cyan-300/60 transition"
                    >
                      Open GitHub Track
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MasterLabsSection;
