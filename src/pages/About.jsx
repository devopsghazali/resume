const aboutPoints = [
  {
    label: "Background",
    title: "Non-traditional start",
    text: "I do not come from a traditional computer science background. I completed my bachelor&apos;s in Humanities, but I always had a strong curiosity for technology and software. After getting my first laptop, that curiosity slowly turned into a habit of building, breaking, and understanding things on my own.",
  },
  {
    label: "Learning Path",
    title: "Started in February 2025",
    text: "Around February 2025, I started learning tech more actively. It was not in a strict academic way, but as a hobby. Whenever I found time, I explored fields like data science, quantum computing, robotics, web development, app development, DSA, product design, GenAI, agentic AI, and cybersecurity testing.",
  },
  {
    label: "Focus Shift",
    title: "Moved toward real-world work",
    text: "Over time, I realized that curiosity alone is not enough. I also needed to prepare myself for a real-world job. That is when I decided to narrow my focus and move seriously toward DevOps and system engineering.",
  },
  {
    label: "Foundation",
    title: "Core system knowledge",
    text: "I built my foundation in Linux, networking, operating systems, and system fundamentals, and then worked with tools and workflows such as Docker, GitHub, GitLab, Kubernetes, Argo CD, Terraform, Prometheus, Grafana, Jira, Git, Jenkins, and Ansible.",
  },
  {
    label: "Mindset",
    title: "Systems matter more than just code",
    text: "Today, with AI tools becoming extremely capable including ChatGPT, writing code is often no longer the hardest part. I believe the real value now lies in system design, architecture, and understanding how components work together. That is where I intentionally focus most of my learning.",
  },
  {
    label: "Approach",
    title: "Learn once, apply through projects",
    text: "I do not believe in endlessly watching tutorials. My approach is simple: learn the fundamentals once, then apply them through real projects. Theory, for me, exists to support practice, especially in computer science, where understanding comes from implementation. Even now, I continue to explore new areas when something genuinely interests me.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="
        min-h-screen
        bg-[#0b0f1a]
        px-6 py-28
        border-t border-white/5
      "
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10 animate-fade-up">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 section-title">
            The journey behind the portfolio
          </h2>
          <p className="text-gray-400 leading-relaxed">
            This section is written so you can read it like a practical story and use it
            to explain your background in an interview without sounding robotic.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {aboutPoints.map((item, index) => (
            <article
              key={item.label}
              className="
                stagger-card
                rounded-2xl border border-white/10 bg-[#101628]/80 p-6
                transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-[#121a30]/90
              "
              style={{ animation: `soft-rise 700ms ease-out ${index * 90}ms both` }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-2">
                {item.label}
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>

        <div
          className="
            mt-6 rounded-2xl border border-white/10 bg-black/20 p-6
            animate-fade-up
          "
        >
          <p className="text-gray-400 leading-relaxed">
            I keep learning in public, refining my skills, and steadily moving toward
            becoming a strong DevOps and systems engineer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
