import { useState, useEffect } from "react";
import { Menu, X, Code, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [activeItem, setActiveItem] = useState("Accueil");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Accueil", id: "accueil" },
    { name: "Profil", id: "profil" },
    { name: "Expériences", id: "experiences" },
    { name: "Compétences", id: "competence" },
    { name: "Projets", id: "project" },
    { name: "Contact", id: "contact" },
  ];

  const handleClick = (name: string, id: string) => {
    setActiveItem(name);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          const name = visibleSection.target.getAttribute("data-name");
          if (name) setActiveItem(name);
        }
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        section.setAttribute("data-name", item.name);
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-500">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo Professionnel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => handleClick("Accueil", "accueil")}
        >
          <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-500/20 group-hover:rotate-12 transition-transform duration-300">
            <Code size={18} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
            PORTFOLIO<span className="text-primary-500">.</span>
          </span>
        </motion.div>

        {/* Liens Desktop avec soulignement intelligent */}
        <ul className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <li key={item.name} className="relative">
                <button
                  onClick={() => handleClick(item.name, item.id)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive 
                      ? "text-primary-600 dark:text-primary-400" 
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                  
                  {/* Barre de soulignement animée (Active) */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full mx-4"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Actions (Dark Mode + Mobile Menu) */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:ring-2 ring-primary-500/20 transition-all"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="lg:hidden p-2.5 text-gray-600 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile avec Design Épuré */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 lg:hidden shadow-2xl"
            >
              <ul className="flex flex-col p-4 gap-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleClick(item.name, item.id)}
                      className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all ${
                        activeItem === item.name
                          ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}