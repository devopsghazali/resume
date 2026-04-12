import "./index1.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3c-.02.27-.03.54-.03.82A7 7 0 0 0 20.18 12c.28 0 .55-.01.82-.03z" />
  </svg>
);

const ThemeIcon = ({ theme }) => (theme === "dark" ? <SunIcon className="w-3.5 h-3.5" /> : <MoonIcon className="w-3.5 h-3.5" />);

export default function Navbar({ theme = "dark", onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${scrolled ? "bg-[#0b0f1a]/75 backdrop-blur-md border-b border-white/10" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative name-orbit-h text-base md:text-lg font-semibold tracking-wide text-white px-1"
        >
          Hasnain Ghazali
        </Link>

        <nav className="flex items-center gap-3 md:gap-4 text-sm">
          <Link to="/#projects" className="nav-orbit">Projects</Link>
          <Link to="/about" className="nav-orbit">About</Link>
          <Link to="/contact" className="nav-orbit">Contact</Link>

          <button
            type="button"
            onClick={onToggleTheme}
            className={`theme-switch ${theme === "light" ? "is-light" : "is-dark"}`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title="Toggle dark/light mode (Shift + T)"
          >
            <span className="theme-switch-track" aria-hidden="true">
              <SunIcon className="theme-switch-rail-icon theme-switch-rail-sun" />
              <MoonIcon className="theme-switch-rail-icon theme-switch-rail-moon" />
              <span className="theme-switch-thumb">
                <ThemeIcon theme={theme} />
              </span>
            </span>
            <span className="hidden md:inline text-xs">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
