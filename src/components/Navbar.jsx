

import "./index1.css";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          scrolled
            ? "bg-[#0b0f1a]/70 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LEFT : NAME / BRAND */}
        <Link  to="/"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="relative name-orbit-h text-base md:text-lg font-semibold tracking-wide text-white px-1">
          Hasnain Ghazali
        </Link>

        {/* RIGHT : NAV LINKS */}
        <nav className="flex items-center gap-10 text-sm">
         <Link
  to="/#projects"
  className="nav-orbit"
>
  Projects
</Link>
          <Link to="/articles" className="nav-orbit">
  Articles
</Link>
   <Link to="/problems" className="nav-orbit">
  Problems & Solutions
</Link>


          
        </nav>

      </div>
    </header>
  );
}
