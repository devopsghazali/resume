const Problems = () => {
  return (
    <section
      id="problems"
      className="
        min-h-screen
        bg-[#0b0f1a]
        px-6 py-32
        border-t border-white/5
      "
    >
      <div className="max-w-6xl mx-auto animate-fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Problems & Solutions
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            "403 Forbidden on Nginx",
            "SSH Permission Denied (publickey)",
            "Site not loading after deployment",
            "Firewall blocking port 80/443",
            "Docker container exits immediately",
            "Kubernetes pod stuck in CrashLoopBackOff",
            "Service not reachable via LoadBalancer",
            "Git push rejected due to permission issues",
            "Disk space full on production server",
            "CI/CD pipeline failing unexpectedly",
          ].map((problem, i) => (
            <div
              key={i}
              className="
                p-6 rounded-xl
                bg-[#0e1322]
                border border-white/10
                hover:border-cyan-400/40
                transition
              "
            >
              <h3 className="text-white font-medium">
                {problem}
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Detailed breakdown coming soon.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
