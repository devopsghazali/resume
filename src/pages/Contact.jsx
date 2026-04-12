const Contact = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[#0b0f1a] px-6 py-28 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-cyan-500/15 blur-[110px]" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-indigo-500/15 blur-[110px]" />

      <div className="relative max-w-3xl mx-auto animate-fade-up">
        <div className="rounded-[2rem] border border-white/10 bg-[#101628]/85 p-7 md:p-8 project-card-surface">
          <p className="text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 hero-title">
            Keep it simple
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            If you want to discuss DevOps, cloud, or project ideas, the fastest way to reach me is through these three links.
          </p>

          <div className="space-y-3">
            <a
              href="mailto:devopsghazali@gmail.com"
              className="block rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-4 hover:border-cyan-300/60 hover:-translate-y-0.5 transition"
            >
              <p className="text-xs uppercase tracking-wider text-cyan-200">Email</p>
              <p className="text-white text-sm mt-1">devopsghazali@gmail.com</p>
            </a>

            <a
              href="https://github.com/devopsghazali"
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-white/15 bg-white/5 p-4 hover:border-cyan-300/40 hover:-translate-y-0.5 transition"
            >
              <p className="text-xs uppercase tracking-wider text-cyan-200">GitHub</p>
              <p className="text-white text-sm mt-1">github.com/devopsghazali</p>
            </a>

            <a
              href="https://www.linkedin.com/in/devops-hasnain/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-white/15 bg-white/5 p-4 hover:border-cyan-300/40 hover:-translate-y-0.5 transition"
            >
              <p className="text-xs uppercase tracking-wider text-cyan-200">LinkedIn</p>
              <p className="text-white text-sm mt-1">linkedin.com/in/devops-hasnain</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
