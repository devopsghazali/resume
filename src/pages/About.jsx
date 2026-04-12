import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import { devopsTools } from "../data/devopsTools";

const skillGroups = [
  {
    title: "Core Focus",
    items: ["Linux", "Networking", "Operating Systems", "System Fundamentals"],
  },
  {
    title: "Cloud and Platform",
    items: ["AWS", "Docker", "Kubernetes", "GitHub", "GitLab", "Argo CD"],
  },
  {
    title: "Delivery",
    items: ["Terraform", "Ansible", "Jenkins", "GitOps", "CI/CD"],
  },
  {
    title: "Visibility",
    items: ["Prometheus", "Grafana", "Jira", "Confluence", "Trivy"],
  },
];

const bioParagraphs = [
  "I don't come from a traditional computer science background. I completed my bachelor's in Humanities, but I always had a strong curiosity for technology and software. After getting my first laptop, that curiosity slowly turned into a habit of building, breaking, and understanding things on my own.",
  "Around February 2025, I started learning tech more actively. Not in a strict or academic way, but as a hobby. Whenever I found time, I explored different fields like data science, quantum computing, robotics, web development, app development, DSA, product design, GenAI, agentic AI, and cybersecurity testing.",
  "Over time, I realized that curiosity alone is not enough. I also needed to prepare myself for a real-world job. That's when I decided to narrow my focus and move seriously toward DevOps and system engineering.",
  "I built my foundation in Linux, networking, operating systems, and system fundamentals, and then worked with tools and workflows such as Docker, GitHub, GitLab, Kubernetes, Argo CD, Terraform, Prometheus, Grafana, Jira, Git, Jenkins, and Ansible.",
  "Today, with AI tools becoming extremely capable, writing code is often no longer the hardest part. I believe the real value now lies in system design, architecture, and understanding how components work together. That's where I intentionally focus most of my learning.",
  "I don't believe in endlessly watching tutorials. My approach is simple: learn the fundamentals once, then apply them through real projects. Theory, for me, exists to support practice, especially in computer science, where understanding comes from implementation.",
  "Even now, I continue to explore new areas when something genuinely interests me. This space reflects that journey: learning in public, refining my skills, and steadily moving toward becoming a strong DevOps and systems engineer.",
];

const About = () => {
  const [heroRef, heroVisible] = useReveal();
  const [bioRef, bioVisible] = useReveal();
  const [skillsRef, skillsVisible] = useReveal();
  const [toolsRef, toolsVisible] = useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0f1a] px-6 py-28">
      <div className="absolute top-[-140px] left-[-140px] w-[440px] h-[440px] rounded-full bg-cyan-500/15 blur-[130px]" />
      <div className="absolute bottom-[-160px] right-[-120px] w-[420px] h-[420px] rounded-full bg-indigo-500/15 blur-[130px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.08),_transparent_28%)]" />

      <div className="relative max-w-7xl mx-auto space-y-10">
        <section
          ref={heroRef}
          className={`grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch ${
            heroVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="rounded-[2rem] border border-white/10 bg-[#101628]/85 p-7 md:p-10 project-card-surface">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-4">
              About me
            </p>
            <h1 className="hero-title text-4xl md:text-6xl font-bold text-white leading-[1.05]">
              Learning in public,
              <span className="block hero-accent">building for production.</span>
            </h1>
            <p className="mt-6 text-gray-300 leading-relaxed max-w-2xl">
              A focused DevOps journey built from curiosity, consistency, and hands-on
              practice. I keep the portfolio practical, interview-ready, and rooted in
              real delivery workflows instead of theory-only learning.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/#projects"
                className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-3">
                Current direction
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Focus</p>
                  <p className="text-white mt-1">DevOps, Kubernetes, Terraform, GitOps</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Style</p>
                  <p className="text-white mt-1">Practical, simple, and production-minded</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Goal</p>
                  <p className="text-white mt-1">
                    Build systems that are clear, repeatable, and easy to explain in interviews
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/15 bg-cyan-500/10 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200 mb-3">
                What I care about
              </p>
              <div className="flex flex-wrap gap-2">
                {["Release safety", "Observability", "Infrastructure as Code", "GitOps", "System thinking"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-cyan-50"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          ref={bioRef}
          className={`rounded-[2rem] border border-white/10 bg-[#101628]/90 p-7 md:p-10 project-card-surface ${
            bioVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-2">
                Biography
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white hero-title">
                One story, one box.
              </h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300">
              February 2025 onwards
            </span>
          </div>

          <div className="space-y-5 text-gray-300 leading-relaxed">
            {bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          ref={skillsRef}
          className={`grid lg:grid-cols-2 gap-6 ${
            skillsVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[2rem] border border-white/10 bg-[#101628]/80 p-6 project-card-surface"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-4">
                Skills
              </p>
              <h3 className="text-xl font-semibold text-white mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-200 transition hover:border-cyan-300/40 hover:bg-cyan-500/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section
          ref={toolsRef}
          className={`rounded-[2rem] border border-white/10 bg-[#101628]/90 p-7 md:p-10 project-card-surface ${
            toolsVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-2">
                Tools
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white hero-title">
                Practical stack, grouped clearly.
              </h2>
            </div>
            <p className="text-sm text-gray-400 max-w-xl">
              These are the tools I keep returning to when I work on delivery, governance,
              and system visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {Object.entries(devopsTools).map(([group, items]) => (
              <div
                key={group}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200 mb-3">
                  {group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
