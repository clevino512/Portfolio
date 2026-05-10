import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight,  ExternalLink, Code2, Users, Layers, Award } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import projectsData from "../../data/projects.json";


import imgUNM from "../../assets/UNM.png";
import imgPortfolio from "../../assets/PORTFOLIO.png";
import imgTsingy from "../../assets/Tsingy.png";
import imgESPA from "../../assets/ESPA.png";
import imgEndless from "../../assets/endless.png";
import imgPromabio from "../../assets/promabio.png";

const imageMap: Record<string, string> = {
  "UNM.png": imgUNM,
  "PORTFOLIO.png": imgPortfolio,
  "Tsingy.png": imgTsingy,
  "ESPA.png": imgESPA,
  "endless.png": imgEndless,
  "promabio.png": imgPromabio
};

interface Project {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  link: string;
  github: string | null;
  tags: string[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};


const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
};

const stats = [
  { label: "Projets réalisés", value: projectsData.length, icon: Code2 },
  { label: "Clients satisfaits", value: "8+", icon: Users },
  { label: "Technologies", value: "15+", icon: Layers },
  { label: "Années d'expérience", value: "2+", icon: Award }
];

export default function Project() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1);
      else if (width < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(projectsData.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage);
  
  const visibleProjects = projectsData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const next = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + itemsPerPage);
    }
  }, [currentPage, totalPages, itemsPerPage]);

  const prev = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - itemsPerPage);
    }
  }, [currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page > currentPage) setDirection(1);
    else if (page < currentPage) setDirection(-1);
    setCurrentIndex(page * itemsPerPage);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  return (
    <motion.section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* En-tête */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-medium text-primary-700 dark:text-primary-300">
              Réalisations
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Projets Récents
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mt-4" />
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6 text-base leading-relaxed">
            Découvrez une sélection de mes projets les plus significatifs, 
            allant du développement web à la création de designs UI/UX.
          </p>
        </motion.div>

        {/* Carrousel */}
        <div className="relative">
          
          {totalPages > 1 && (
            <>
              <button
                onClick={prev}
                disabled={currentPage === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ${
                  currentPage === 0
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white shadow-lg"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                disabled={currentPage === totalPages - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ${
                  currentPage === totalPages - 1
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white shadow-lg"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div className="overflow-hidden px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`grid gap-6 ${
                  itemsPerPage === 1 ? "grid-cols-1" : 
                  itemsPerPage === 2 ? "grid-cols-1 sm:grid-cols-2" : 
                  "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {visibleProjects.map((project: Project) => (
                  <motion.div
                    key={project.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -8 }}
                    className="group relative bg-white dark:bg-gray-900/80 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden h-56 bg-gray-100 dark:bg-gray-800">
                      <img
                        src={imageMap[project.image]}
                        alt={project.title}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          {project.subtitle && (
                            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                              {project.subtitle}
                            </p>
                          )}
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          title="Voir le projet"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FaGithub size={14} />
                          Voir le code
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentPage === i
                    ? "w-6 bg-primary-600 dark:bg-primary-500"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-6 border-t border-gray-200 dark:border-gray-800"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <Icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}