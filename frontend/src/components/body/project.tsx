import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Code2, Users, Layers, Award } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import projectsData from "../../data/projects.json";

import imgUNM from "../../assets/UNM.png";
import imgPortfolio from "../../assets/PORTFOLIO.png";
import imgTsingy from "../../assets/Tsingy.png";
import imgESPA from "../../assets/ESPA.png";
import imgEndless from "../../assets/endless.png";
import imgPromabio from "../../assets/promabio.png";
import imgAiko from "../../assets/aikovoyage.png";

const imageMap: Record<string, string> = {
  "UNM.png": imgUNM,
  "PORTFOLIO.png": imgPortfolio,
  "Tsingy.png": imgTsingy,
  "ESPA.png": imgESPA,
  "endless.png": imgEndless,
  "promabio.png": imgPromabio,
  "aikovoyage.png": imgAiko
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
};

const stats = [
  { label: "Projets réalisés", value: `${projectsData.length}+`, icon: Code2 },
  { label: "Clients satisfaits", value: "8+", icon: Users },
  { label: "Technologies maîtrisées", value: "15+", icon: Layers },
  { label: "Années d'expérience", value: "5+", icon: Award },
];

export default function Project() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerPage(1);
      else if (w < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  }, [currentPage, totalPages, itemsPerPage]);

  const prev = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  }, [currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentIndex(page * itemsPerPage);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, transition: { duration: 0.3 } }),
  };

  return (
    <motion.section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">
              Réalisations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Projets{" "}
            <span className="bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">
              Récents
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full mx-auto mt-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6 text-base leading-relaxed">
            Une sélection de mes projets les plus significatifs — du développement web full stack à la conception UI/UX.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {totalPages > 1 && (
            <>
              <button
                onClick={prev}
                disabled={currentPage === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 shadow-lg ${
                  currentPage === 0
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 hover:shadow-xl"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                disabled={currentPage === totalPages - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 shadow-lg ${
                  currentPage === totalPages - 1
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 hover:shadow-xl"
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
                  itemsPerPage === 1
                    ? "grid-cols-1"
                    : itemsPerPage === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {visibleProjects.map((project: Project) => (
                  <motion.div
                    key={project.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700/50 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-52 bg-gray-50 dark:bg-gray-800">
                      <img
                        src={imageMap[project.image]}
                        alt={project.title}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Overlay links on hover */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.link && project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white/90 text-gray-900 hover:bg-primary-600 hover:text-white transition-all duration-200 shadow-lg"
                            title="Voir le projet"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white/90 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 shadow-lg"
                            title="Voir le code"
                          >
                            <FaGithub size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-0.5">
                            {project.subtitle}
                          </p>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tags?.slice(0, 5).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags?.length > 5 && (
                          <span className="px-2.5 py-1 text-xs rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium">
                            +{project.tags.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Footer links */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                          >
                            <FaGithub size={13} />
                            Code source
                          </a>
                        ) : (
                          <span />
                        )}
                        {project.link && project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
                          >
                            Voir le projet
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`transition-all duration-300 rounded-full ${
                  currentPage === i
                    ? "w-7 h-2.5 bg-primary-600 dark:bg-primary-500"
                    : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                className="text-center p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 transition-all duration-200"
              >
                <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 w-fit mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary-500" />
                </div>
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
