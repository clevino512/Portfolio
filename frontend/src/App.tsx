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

// Declare gtag for TypeScript
declare const gtag: Function;

function App() {
  const topRef = useRef<HTMLDivElement>(null);
  
  const [darkMode, setDarkMode] = useState(() => {
     const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  // Track page views with GA4
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.pathname + window.location.hash;
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
          page_path: path,
          page_title: document.title
        });
      }
    };

    // Track initial pageview
    handleHashChange();

    // Track hash changes
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

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    // bg-white dark:bg-gray-950 permet d'éviter le flash blanc au chargement
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div ref={topRef} />
      
      {/* Navbar avec passage des props nécessaires */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sections avec espacement cohérent */}
        <section id="accueil" className=" py-6 lg:py-10">
          <Home />
        </section>

        <section id="profil" className=" py-6 lg:py-10">
          <Profil />
        </section>

        <section id="experiences" className=" py-6 lg:py-10">
          <Experiences />
        </section>

        <section id="competence" className=" py-6 lg:py-10">
          <Competence />
        </section>

        <section id="project" className=" py-6 lg:py-10">
          <Project />
        </section>

        <section id="contact" className=" py-6 lg:py-10">
          <Contact />
        </section>
      </main>

      <FooterNavs scrollToTop={scrollToTop} />
      <Footer />
    </div>
  );
}

export default App;