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
          I don’t come from a traditional computer science background.  
          I completed my bachelor’s in <span className="text-white">Humanities</span>, 
          but I always had a strong curiosity for technology and software.
          After getting my first laptop, that curiosity slowly turned into a habit — 
          building, breaking, and understanding things on my own.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          Around <span className="text-cyan-400 font-medium">February 2025</span>, 
          I started learning tech more actively — not in a strict or academic way,
          but as a <span className="text-white">hobby</span>. Whenever I found time, 
          I explored different fields like{" "}
          <span className="text-white">
            data science, quantum computing, robotics, web development, app development,
            DSA, product design, GenAI, agentic AI, and cybersecurity testing
          </span>.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          Over time, I realized that curiosity alone isn’t enough — 
          I also needed to prepare myself for a <span className="text-white">real-world job</span>.
          That’s when I decided to narrow my focus and move seriously toward
          <span className="text-cyan-400 font-medium"> DevOps and system engineering</span>.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          I built my foundation in{" "}
          <span className="text-white">
            Linux, networking, operating systems, and system fundamentals
          </span>, and then worked with tools and workflows such as{" "}
          <span className="text-white">
            Docker, GitHub, GitLab, Kubernetes, Argo CD, Terraform,
            Prometheus, Grafana, Jira, Git, Jenkins, and Ansible
          </span>.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          Today, with AI tools becoming extremely capable — including ChatGPT —
          writing code is often no longer the hardest part.  
          I believe the real value now lies in <span className="text-white">
          system design, architecture, and understanding how components work together
          </span>. That’s where I intentionally focus most of my learning.
        </p>

        <p className="text-gray-400 leading-relaxed mb-6">
          I don’t believe in endlessly watching tutorials.  
          My approach is simple: <span className="text-white">
          learn the fundamentals once, then apply them through real projects
          </span>.  
          Theory, for me, exists to support practice — especially in computer science,
          where understanding comes from implementation.
        </p>

        <p className="text-gray-400 leading-relaxed">
          Even now, I continue to explore new areas when something genuinely
          interests me. This space reflects that journey — learning in public,
          refining my skills, and steadily moving toward becoming a strong
          DevOps and systems engineer.
        </p>
      </div>
    </section>
  );
};

export default About;
