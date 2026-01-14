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
    <section id="projects" className=" project relative bg-[#0b0f1a] px-6 py-28 overflow-hidden">
      
      {/* BACKGROUND GLOWS (Hero jaisa) */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px]" />

      <div
        ref={sectionRef}
        className={`relative max-w-7xl mx-auto ${
          visible ? "animate-fade-up" : "opacity-0"
        }`}
      >
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          My Projects
        </h2>
        <p className="text-gray-400 mb-10 max-w-xl">
          Some things I’ve built while learning DevOps, cloud, and system fundamentals.
        </p>
         
        {/* PROJECT CARDS */}
        <div
          ref={scrollRef}
          className="
            flex gap-8
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

        {/* ARROWS */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => scroll("left")}
            className="
              w-11 h-11 rounded-full
              border border-white/20
              text-white text-lg
              hover:bg-cyan-500 hover:text-black
              transition
            "
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
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
