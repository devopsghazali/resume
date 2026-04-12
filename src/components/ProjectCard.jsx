import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
  };

  const openNotes = () => {
    closeModal();
    navigate(`/projects/${project.id}/notes`);
  };

  const openRepository = (event) => {
    event.stopPropagation();
    window.open(project.links[0].url, "_blank", "noreferrer");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          group project-card-surface min-w-[320px] w-[320px] h-[390px]
          rounded-2xl
          bg-gradient-to-b from-[#11172a] to-[#0e1322]
          border border-white/10
          cursor-pointer
          text-left
          transition-all duration-300
          hover:-translate-y-2 hover:scale-[1.01]
          hover:border-cyan-400/40
          hover:shadow-[0_22px_50px_rgba(34,211,238,0.14)]
          active:scale-[0.99]
        "
      >
        <div className="relative h-[180px] bg-black/20 flex items-center justify-center border-b border-white/10 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a]/45 via-transparent to-transparent" />
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-3">
              <h3 className="text-white font-semibold leading-snug transition-colors group-hover:text-cyan-100">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
            </div>
            <button
              type="button"
              onClick={openRepository}
              className="shrink-0 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
            >
              Repo
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300 transition-transform duration-300 group-hover:-translate-y-[1px]"
              >
                {item}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-200">
                +{project.stack.length - 5} more
              </span>
            )}
          </div>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#0b0f1a]/55 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e1322] rounded-2xl p-6 max-w-2xl w-full relative border border-white/10 shadow-2xl shadow-cyan-900/20">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              aria-label="Close project options"
              type="button"
            >
              x
            </button>

            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-2">Project Brief</p>
            <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-400 mb-5 max-w-2xl">
              Clean summary, repo link, and interview-ready notes are attached below.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 mb-5">
              <button
                onClick={openNotes}
                className="rounded-xl border border-cyan-300/40 bg-cyan-500/15 px-4 py-3 text-left hover:border-cyan-300/70 hover:-translate-y-0.5 transition"
                type="button"
              >
                <p className="text-cyan-200 font-semibold text-sm">Open Explanation</p>
                <p className="text-gray-300 text-xs mt-1">
                  View the long-form build, architecture, and deployment notes.
                </p>
              </button>

              <button
                onClick={() => window.open(project.links[0].url, "_blank", "noreferrer")}
                className="rounded-xl border border-indigo-300/40 bg-indigo-500/15 px-4 py-3 text-left hover:border-indigo-300/70 hover:-translate-y-0.5 transition"
                type="button"
              >
                <p className="text-indigo-200 font-semibold text-sm">Open Repository</p>
                <p className="text-gray-300 text-xs mt-1">
                  Jump straight to the GitHub repo linked with this project.
                </p>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 hover:border-cyan-300/60 hover:-translate-y-0.5 transition"
                >
                  <p className="text-sm font-semibold text-cyan-200">{link.label}</p>
                  <p className="text-xs text-gray-300 mt-1">{link.note}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
