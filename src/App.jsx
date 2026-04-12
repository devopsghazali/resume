import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Hero.jsx";
import Articles from "./pages/Articles.jsx";
import Problems from "./pages/Problems.jsx";
import Contact from "./pages/Contact.jsx";
import ProjectNotes from "./pages/ProjectNotes.jsx";
import ArticleDetails from "./pages/ArticleDetails.jsx";
import ProblemDetails from "./pages/ProblemDetails.jsx";
import Saved from "./pages/Saved.jsx";
import MouseAura from "./components/MouseAura.jsx";
import BackToTopButton from "./components/BackToTopButton.jsx";
import useTheme from "./hooks/useTheme";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <BrowserRouter>
        <MouseAura />
        <BackToTopButton />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <ScrollToHash />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:slug" element={<ProblemDetails />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:id/notes" element={<ProjectNotes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
