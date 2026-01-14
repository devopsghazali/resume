const Articles = () => {
  return (
    <section
      id="articles"
      className="
        min-h-screen
        bg-[#0b0f1a]
        px-6 py-32
        border-t border-white/5
      "
    >
      <div className="max-w-5xl mx-auto animate-fade-up">
        <h2 className="text-3xl font-bold text-white mb-10">
          Articles
        </h2>

        <div className="space-y-4">
          {[
            "Understanding Nginx & Reverse Proxy",
            "Why SELinux Blocks Your Web Server",
            "How I Deployed My First App on a VM",
          ].map((title, i) => (
            <div
              key={i}
              className="
                p-5 rounded-lg
                bg-[#0e1322]
                border border-white/10
                cursor-pointer
                hover:border-cyan-400/40
                transition
              "
            >
              <h3 className="text-white">{title}</h3>
              <p className="text-gray-500 text-sm mt-1">
                Coming soon…
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
