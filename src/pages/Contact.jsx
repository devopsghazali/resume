const Contact = () => {
  return (
    <section
      id="contact"
      className="
        min-h-screen
        bg-[#0b0f1a]
        px-6 py-32
        border-t border-white/5
      "
    >
      <div className="max-w-3xl mx-auto animate-fade-up text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Contact
        </h2>

        <p className="text-gray-400 mb-12">
          If you’re learning, building, or fixing systems —  
          feel free to reach out. I’m always open to meaningful conversations.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* EMAIL */}
          <a
            href="mailto:storytotech@gmail.com"
            className="
              px-6 py-3 rounded-md
              bg-cyan-500 text-black font-medium
              hover:bg-cyan-400
              transition
            "
          >
            Email Me
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/devopsghazali"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-3 rounded-md
              border border-white/20 text-white
              hover:bg-white/10
              transition
            "
          >
            GitHub
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/devops-hasnain/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-3 rounded-md
              border border-white/20 text-white
              hover:bg-white/10
              transition
            "
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
