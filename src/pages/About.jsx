const About = () => {
  return (
    <section
      id="about"
      className="
        min-h-screen
        bg-[#0b0f1a]
        px-6 py-32
        border-t border-white/5
      "
    >
      <div className="max-w-4xl mx-auto animate-fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          About Me
        </h2>

        <p className="text-gray-400 leading-relaxed mb-6">
          I do not come from a traditional computer science background. I completed my
          bachelor&apos;s in <span className="text-white">Humanities</span>, but I always
          enjoyed figuring out how software and systems work.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          Around <span className="text-cyan-400 font-medium">February 2025</span>, I
          started learning tech more seriously and explored different areas like
          <span className="text-white">
            {" "}
            Linux, networking, DevOps, cloud, web development, cybersecurity, and GenAI
          </span>.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          Over time, I realized that I wanted to focus on a path that maps to real work,
          not just tutorials. That is what pushed me toward
          <span className="text-cyan-400 font-medium"> DevOps and system engineering</span>.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          I&apos;ve spent time with <span className="text-white">
            Docker, Kubernetes, Argo CD, Terraform, Jenkins, Ansible, Prometheus, Grafana,
            GitHub, and GitLab
          </span>, while also building my understanding of operating systems and basic
          infrastructure design.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          My approach is simple: learn the fundamentals, build real projects, then explain
          the system clearly. That is why this portfolio focuses on practical DevOps work
          instead of flashy demos.
        </p>

        <p className="text-gray-400 leading-relaxed">
          This space reflects that journey. I keep learning in public, improving the
          projects, and moving steadily toward becoming a stronger DevOps and systems
          engineer.
        </p>
      </div>
    </section>
  );
};

export default About;
