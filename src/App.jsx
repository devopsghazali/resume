import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Hero.jsx";
import About from "./pages/About.jsx";
import Articles from "./pages/Articles.jsx";
import Problems from "./pages/Problems.jsx";
import Contact from "./pages/Contact.jsx";
import ProjectSection from "./components/ProjectsSection.jsx"
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // small timeout to allow DOM to render when navigating to home
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
  return (
     <>
    <BrowserRouter>
      <Navbar />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </BrowserRouter>
  
   </>
  );
}

export default App;
