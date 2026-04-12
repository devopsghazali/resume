import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(form.subject || "Collaboration Inquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:storytotech@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[#0b0f1a] px-6 py-28 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-cyan-500/15 blur-[110px]" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-indigo-500/15 blur-[110px]" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-8 animate-fade-up">
        <div className="rounded-2xl border border-white/10 bg-[#101628] p-7">
          <p className="text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">Let us connect</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            If you are building infrastructure, improving deployment reliability, or setting up DevOps workflows,
            feel free to reach out. I am always open to meaningful technical collaboration.
          </p>

          <div className="space-y-3 mb-6">
            <a
              href="mailto:storytotech@gmail.com"
              className="block rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4 hover:border-cyan-300/60 transition"
            >
              <p className="text-xs uppercase tracking-wider text-cyan-200">Email</p>
              <p className="text-white text-sm mt-1">storytotech@gmail.com</p>
            </a>

            <a
              href="https://github.com/devopsghazali"
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/15 bg-white/5 p-4 hover:border-cyan-300/40 transition"
            >
              <p className="text-xs uppercase tracking-wider text-cyan-200">GitHub</p>
              <p className="text-white text-sm mt-1">github.com/devopsghazali</p>
            </a>

            <a
              href="https://www.linkedin.com/in/devops-hasnain/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/15 bg-white/5 p-4 hover:border-cyan-300/40 transition"
            >
              <p className="text-xs uppercase tracking-wider text-cyan-200">LinkedIn</p>
              <p className="text-white text-sm mt-1">linkedin.com/in/devops-hasnain</p>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-cyan-200">Response</p>
              <p className="text-gray-300 mt-1">Within 24 hrs</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-cyan-200">Focus</p>
              <p className="text-gray-300 mt-1">DevOps / Cloud</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-[#101628] p-7">
          <h3 className="text-xl font-semibold text-white mb-1">Send a Message</h3>
          <p className="text-gray-400 text-sm mb-6">Share your requirement and I will get back with a practical approach.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-cyan-200">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-wider text-cyan-200">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="block mb-4">
            <span className="text-xs uppercase tracking-wider text-cyan-200">Subject</span>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={onChange}
              required
              className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300"
              placeholder="Project discussion / collaboration"
            />
          </label>

          <label className="block mb-6">
            <span className="text-xs uppercase tracking-wider text-cyan-200">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={7}
              className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300 resize-y"
              placeholder="Briefly describe what you are building, where you are blocked, and expected timeline."
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-cyan-400 transition"
          >
            Send via Email
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
