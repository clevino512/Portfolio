import { useRef, useState, useEffect, useCallback } from "react";
import Home from "./components/body/home";
import Profil from "./components/body/profil";
import Experiences from "./components/body/experience";
import Project from "./components/body/project";
import Competence from "./components/body/competence";
import Contact from "./components/body/contact";
import FooterNavs from "./components/header/FooterNavs";
import Footer from "./components/header/footer";
import Navbar from "./components/header/side";
import './index.css';

declare const gtag: Function;

function App() {
  const topRef = useRef<HTMLDivElement>(null);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.pathname + window.location.hash;
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', { page_path: path, page_title: document.title });
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div ref={topRef} />

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        {/* Hero — white bg */}
        <section id="accueil">
          <Home />
        </section>

        {/* Profil — alternate bg */}
        <section id="profil" className="border-t border-gray-100 dark:border-gray-800/60">
          <Profil />
        </section>

        {/* Experiences — white bg */}
        <section id="experiences" className="border-t border-gray-100 dark:border-gray-800/60">
          <Experiences />
        </section>

        {/* Competences — gray bg (handled inside component) */}
        <section id="competence" className="border-t border-gray-100 dark:border-gray-800/60">
          <Competence />
        </section>

        {/* Projects — white bg */}
        <section id="project" className="border-t border-gray-100 dark:border-gray-800/60">
          <Project />
        </section>

        {/* Contact — gray bg (handled inside component) */}
        <section id="contact" className="border-t border-gray-100 dark:border-gray-800/60">
          <Contact />
        </section>
      </main>

      <FooterNavs scrollToTop={scrollToTop} />
      <Footer />
    </div>
  );
}

export default App;
