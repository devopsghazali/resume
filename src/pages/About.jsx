import useReveal from "../hooks/useReveal";

const About = () => {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      id="about"
      className="relative bg-[#0b0f1a] px-6 py-28 overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-[-120px] left-[-120px] w-[360px] h-[360px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[360px] h-[360px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div
        ref={sectionRef}
        className={`relative max-w-5xl mx-auto ${visible ? "animate-fade-up" : "opacity-0"}`}
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-3">
            About
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white hero-title">
            My Journey
          </h2>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#101628]/90 p-7 md:p-10 project-card-surface">
          <p className="text-gray-300 leading-relaxed mb-5">
            I don&apos;t come from a traditional computer science background. I completed my bachelor&apos;s in Humanities, but I always had a strong curiosity for technology and software. After getting my first laptop, that curiosity slowly turned into a habit of building, breaking, and understanding things on my own.
          </p>

          <p className="text-gray-300 leading-relaxed mb-5">
            Around February 2025, I started learning tech more actively. Not in a strict or academic way, but as a hobby. Whenever I found time, I explored different fields like data science, quantum computing, robotics, web development, app development, DSA, product design, GenAI, agentic AI, and cybersecurity testing.
          </p>

          <p className="text-gray-300 leading-relaxed mb-5">
            Over time, I realized that curiosity alone is not enough. I also needed to prepare myself for a real-world job. That&apos;s when I decided to narrow my focus and move seriously toward DevOps and system engineering.
          </p>

          <p className="text-gray-300 leading-relaxed">
            I built my foundation in Linux, networking, operating systems, and system fundamentals, and then worked with tools and workflows such as Docker, GitHub, GitLab, Kubernetes, Argo CD, Terraform, Prometheus, Grafana, Jira, Git, Jenkins, and Ansible. Learning in public and building real projects is still the way I keep moving forward.
          </p>

        </div>
      </div>
    </section>
  );
};

export default About;
