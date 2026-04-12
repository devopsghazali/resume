import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import useReveal from "../hooks/useReveal";
import "./index.css";

const ProjectsSection = () => {
  const scrollRef = useRef(null);
  const [sectionRef, visible] = useReveal();

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="relative bg-[#0b0f1a] px-6 py-28 overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px]" />

      <div
        ref={sectionRef}
        className={`relative max-w-7xl mx-auto ${visible ? "animate-fade-up" : "opacity-0"}`}
      >
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">
            Showcase
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interview-ready DevOps projects
          </h2>
          <p className="text-gray-400">
            Practical builds around AWS, Docker, Terraform, GitOps, and Kubernetes.
            Each card opens a short explanation plus the GitHub repository link.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="
            flex gap-6
            overflow-x-auto
            scroll-smooth
            hide-scrollbar
            pb-4
          "
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Scroll sideways on smaller screens, or use the arrows to browse the cards.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="
                w-11 h-11 rounded-full
                border border-white/20
                text-white text-lg
                hover:bg-cyan-500 hover:text-black
                transition
              "
              aria-label="Scroll projects left"
            >
              ‹
            </button>

            <button
              onClick={() => scroll("right")}
              className="
                w-11 h-11 rounded-full
                border border-white/20
                text-white text-lg
                hover:bg-cyan-500 hover:text-black
                transition
              "
              aria-label="Scroll projects right"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
