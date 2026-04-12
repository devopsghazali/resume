import { useEffect, useState } from "react";
import ProjectsSection from "./ProjectsSection.jsx";
import DevOpsInfinity from "./DevOpsInfinity.jsx";

const Hero = () => {
  const fullText = "AWS, Docker, Terraform, GitOps, Kubernetes";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 55);

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <>
      <section className="relative w-full min-h-screen bg-[#0b0f1a] overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl hero-copy">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-4">
              DevOps showcase
            </p>
            <h1 className="hero-title text-4xl md:text-6xl font-bold text-white leading-tight">
              Practical DevOps <br />
              <span className="hero-accent text-cyan-400">projects with real repo links</span>
            </h1>

            <p className="mt-6 text-gray-400 max-w-lg leading-relaxed">
              A simple portfolio built around release safety, observability, and platform
              basics. The focus is on clean explanation, interview-ready repos, and
              practical DevOps scenarios.
            </p>

            <div className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <span className="text-cyan-300 font-medium mr-2">Focus:</span>
              {typedText}
              <span className="animate-pulse ml-1">|</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-cyan-500 text-black font-medium rounded-md hover:bg-cyan-400 transition inline-flex items-center"
              >
                View Projects
              </button>

              <button
                type="button"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 border border-white/20 text-white rounded-md hover:bg-white/10 transition inline-flex items-center"
              >
                About Me
              </button>

              <a
                href="/cv/devops-ghazali-cv.pdf"
                download
                className="px-6 py-3 border border-cyan-400/30 text-cyan-100 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 transition inline-flex items-center"
              >
                Download CV
              </a>
            </div>

            <div
              id="about"
              className="mt-8 rounded-3xl border border-white/10 bg-[#101628]/85 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] project-card-surface"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">
                About Me
              </p>
              <p className="text-gray-300 leading-relaxed">
                I do not come from a traditional computer science background. I completed my
                bachelor&apos;s in Humanities, but I always had a strong curiosity for technology and software. After getting my first laptop, that curiosity slowly turned into a habit of building, breaking, and understanding things on my own.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Around February 2025, I started learning tech more actively as a hobby and explored data science, quantum computing, robotics, web development, app development, DSA, product design, GenAI, agentic AI, and cybersecurity testing. Over time I shifted toward DevOps and system engineering because I wanted to build real-world systems, not just follow tutorials.
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end mt-16">
            <DevOpsInfinity />
          </div>
        </div>
      </section>
      <ProjectsSection />
    </>
  );
};

export default Hero;
