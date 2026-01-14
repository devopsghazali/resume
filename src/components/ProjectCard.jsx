import { useState } from "react";

const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="
          min-w-[300px] h-[360px]
          rounded-xl
          bg-[#0e1322]
          border border-white/10
          cursor-pointer
          transition-all

          hover:border-cyan-400/40
          hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]
        "
      >
        <div className="h-[160px] bg-black/30 flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="h-full object-contain p-3"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-white font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-[#0e1322] rounded-xl p-6 max-w-lg w-full relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold text-white mb-3">
              {project.title}
            </h3>

            <p className="text-gray-400 mb-5">
              This project demonstrates a complete DevSecOps + GitOps workflow:
              code commit → Jenkins CI → security scans → Docker image → GitOps
              update → ArgoCD → Kubernetes.
            </p>

            <div className="flex gap-4">
              <a
                href={project.links.ci}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded bg-cyan-500 text-black text-sm font-semibold"
              >
                CI Repo
              </a>

              <a
                href={project.links.gitops}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded bg-indigo-500 text-black text-sm font-semibold"
              >
                GitOps Repo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
