import { useState, useEffect } from "react";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [activeItem, setActiveItem] = useState("Accueil");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          const name = visibleSection.target.getAttribute("data-name");
          if (name) setActiveItem(name);
        }
      },
      { threshold: 0.4 }
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-sm border-b border-gray-200/60 dark:border-gray-800/60"
          : "bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => handleClick("Accueil", "accueil")}
        >
          <div className="bg-gradient-to-br from-primary-600 to-indigo-600 p-2 rounded-xl shadow-md shadow-primary-500/20 group-hover:rotate-12 transition-transform duration-300">
            <Code2 size={17} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
            RC<span className="text-primary-500">.</span>dev
          </span>
        </motion.div>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <li key={item.name} className="relative">
                <button
                  onClick={() => handleClick(item.name, item.id)}
                  className={`relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-primary-50 dark:bg-primary-900/20 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Contact CTA (desktop) */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleClick("Contact", "contact")}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-sm shadow-primary-500/20 transition-all duration-200"
          >
            Me contacter
          </motion.button>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 lg:hidden shadow-xl shadow-gray-900/10"
            >
              <ul className="flex flex-col p-3 gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <button
                      onClick={() => handleClick(item.name, item.id)}
                      className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                        activeItem === item.name
                          ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
                <li className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-1">
                  <button
                    onClick={() => handleClick("Contact", "contact")}
                    className="w-full text-center py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors"
                  >
                    Me contacter
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
