import { useState, useEffect } from "react";

export default function Side() {

    const [activeItem, setActiveItem] = useState("Accueil");
    const [isOpen, setIsOpen] = useState(false);

      // Liste des sections
      const navItems = [
        { name: "Accueil", id: "accueil" },
        { name: "Profil", id: "profil" },
        { name: "Expériences", id: "experiences" },
        { name: "Compétences", id: "competence" },
        { name: "Projets", id: "project" },
        { name: "Contact", id: "contact" },
      ];

      // Scroll fluide
      const handleClick = (name: string, id: string) => {
        setActiveItem(name);
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }
      };

      // Suivre la section active selon le scroll
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting);
            if (visibleSection) {
              const name = visibleSection.target.getAttribute("data-name");
              if (name) setActiveItem(name);
            }
          },
          { threshold: 0.6 }
        );

        navItems.forEach((item) => {
          const section = document.getElementById(item.id);
          if (section) observer.observe(section);
        });

        return () => observer.disconnect();
      }, []);

  return (
        <header className="bg-neutral-800 shadow-md sticky top-0 z-50 w-full">
          <nav className="w-full mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-3">
            {/* Logo */}
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-indigo-600 dark:text-white">
              <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                <p className="text-white font-bold">P</p>
              </div>
              Portfolio
            </div>

            {/* Bouton menu mobile */}
            <button
               className= "block [@media(min-width:850px)]:hidden text-gray-600 dark:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>

            {/* Liens du menu */}
            <ul
              className={`flex flex-col w-full [@media(min-width:850px)]:w-auto items-center [@media(min-width:850px)]:flex-row gap-4 [@media(min-width:850px)]:gap-8 mt-4 [@media(min-width:850px)]:mt-0 transition-all duration-300 ease-in-out ${
                isOpen
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 [@media(min-width:850px)]:max-h-none [@media(min-width:850px)]:opacity-100"
              } overflow-hidden [@media(min-width:850px)]:overflow-visible`}

            >
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleClick(item.name, item.id)}
                    className={`block px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                      activeItem === item.name
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-500"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
  )
}
