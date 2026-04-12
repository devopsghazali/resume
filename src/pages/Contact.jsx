const contactLinks = [
  {
    label: "Email",
    href: "mailto:devopsghazali@gmail.com",
    icon: "/images/contact/email.png",
    note: "devopsghazali@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/devopsghazali",
    icon: "/images/contact/github.png",
    note: "github.com/devopsghazali",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devops-hasnain/",
    icon: "/images/contact/linkedin.png",
    note: "linkedin.com/in/devops-hasnain",
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[#0b0f1a] px-6 py-28 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-cyan-500/15 blur-[110px]" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-indigo-500/15 blur-[110px]" />

      <div className="relative max-w-4xl mx-auto animate-fade-up">
        <div className="mb-8">
          <p className="text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">
            Contact
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Email" ? "_self" : "_blank"}
              rel={item.label === "Email" ? undefined : "noreferrer"}
              className="group rounded-[1.75rem] border border-white/10 bg-[#101628]/85 p-5 text-left project-card-surface transition hover:-translate-y-1 hover:border-cyan-300/50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="h-14 w-14 rounded-2xl border border-white/10 bg-black/20 p-2 object-contain transition group-hover:scale-105"
                />
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-white">{item.note}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
