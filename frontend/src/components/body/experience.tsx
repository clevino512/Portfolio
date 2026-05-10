import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import experiencesData from "../../data/experience.json";

interface Experience {
  titre: string;
  entreprise: string;
  date: string;
  type: "Stage" | "embauche" | "Freelance" | "Autres";
  contenu: string;
  descriptions: string[];
  badges: string[];
}

const typeConfig: Record<string, { dot: string; badge: string; pill: string }> = {
  Stage: {
    dot: "bg-primary-500",
    badge: "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300",
    pill: "border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20",
  },
  embauche: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    pill: "border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20",
  },
  Freelance: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    pill: "border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20",
  },
  Autres: {
    dot: "bg-gray-400",
    badge: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    pill: "border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40",
  },
};

const TYPES = ["Tous", "Stage", "embauche", "Freelance", "Autres"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function Experiences() {
  const [selectedType, setSelectedType] = useState("Tous");
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered: Experience[] =
    selectedType === "Tous"
      ? experiencesData
      : experiencesData.filter((e: Experience) => e.type === selectedType);

  const total = experiencesData.length;

  if (!experiencesData || total === 0) {
    return (
      <div className="bg-red-500/10 border border-red-400 text-red-400 p-10 text-center rounded-2xl m-10">
        ⚠️ Aucune donnée trouvée dans experience.json
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">

        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 rounded-full px-4 py-1.5 mb-4">
            <Briefcase size={14} className="text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-medium text-primary-700 dark:text-primary-300">
              Parcours Professionnel
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Expériences &{" "}
            <span className="text-primary-600 dark:text-primary-400">réalisations</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mt-4" />
          <p className="text-base text-center sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mt-6">
            Développeur Full Stack & UI/UX Designer — je conçois et livre des produits
            web modernes, performants et orientés utilisateur. Du design Figma au
            déploiement en production, chaque projet est une occasion de créer quelque
            chose de réellement utile.
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedType === type
                  ? "bg-primary-600 dark:bg-primary-500 text-white border-primary-600 dark:border-primary-500 scale-[1.03]"
                  : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-primary-400 dark:hover:border-primary-600"
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-800" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType}
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              exit="hidden"
              className="flex flex-col gap-4"
            >
              {filtered.length === 0 ? (
                <motion.p
                  variants={cardVariants}
                  className="text-center text-gray-400 dark:text-gray-600 py-12 text-base"
                >
                  Aucune expérience pour ce filtre.
                </motion.p>
              ) : (
                filtered.map((exp: Experience, index: number) => {
                  const cfg = typeConfig[exp.type] ?? typeConfig["Autres"];
                  const isExpanded = expandedCards[index] ?? false;
                  const isActive = exp.date.includes("Présent");
                  const hasMore = exp.descriptions.length > 3;
                  const shown = isExpanded ? exp.descriptions : exp.descriptions.slice(0, 3);

                  return (
                    <motion.div
                      key={`${selectedType}-${index}`}
                      variants={cardVariants}
                      className="relative pl-11"
                    >
                      <div
                        className={`absolute left-[14px] top-5 w-[11px] h-[11px] rounded-full ${cfg.dot} ring-[3px] ring-white dark:ring-gray-950 transition-transform duration-200`}
                      />

                      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 sm:p-6 transition-colors duration-200 hover:border-gray-200 dark:hover:border-gray-700">

                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm px-3 py-1 rounded-full font-medium ${cfg.pill}`}>
                              {exp.type}
                            </span>
                            {isActive && (
                              <span className="flex items-center gap-1.5 text-sm text-emerald-500 dark:text-emerald-400 font-medium">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                En cours
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 dark:text-gray-500 italic flex-shrink-0">
                            {exp.date}
                          </p>
                        </div>

                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-snug mb-1">
                          {exp.titre}
                        </h3>
                        <p className="text-base font-medium text-primary-600 dark:text-primary-400 mb-3">
                          {exp.entreprise}
                        </p>

                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                          {exp.contenu}
                        </p>

                        <div className="space-y-2 mb-4">
                          <AnimatePresence initial={false}>
                            {shown.map((desc, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="flex items-start gap-2.5 text-base text-gray-500 dark:text-gray-400"
                              >
                                <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${cfg.dot}`} />
                                <span className="leading-relaxed">{desc}</span>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        {hasMore && (
                          <button
                            onClick={() => setExpandedCards(prev => ({ ...prev, [index]: !prev[index] }))}
                            className="text-sm text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-4 flex items-center gap-1"
                          >
                            <span>{isExpanded ? "Voir moins" : `Voir les ${exp.descriptions.length - 3} autres détails`}</span>
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="inline-block"
                            >
                              ↓
                            </motion.span>
                          </button>
                        )}

                        <div className="flex flex-wrap gap-1.5">
                          {exp.badges.slice(0, 7).map((badge, idx) => (
                            <span
                              key={idx}
                              className={`text-sm px-3 py-1 rounded-lg font-medium ${cfg.badge}`}
                            >
                              {badge}
                            </span>
                          ))}
                          {exp.badges.length > 7 && (
                            <span className="text-sm px-3 py-1 rounded-lg font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                              +{exp.badges.length - 7}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}