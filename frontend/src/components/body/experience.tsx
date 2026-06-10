import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown } from "lucide-react";
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

const typeConfig: Record<string, { dot: string; badge: string; pill: string; label: string }> = {
  Stage: {
    dot: "bg-primary-500",
    badge: "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300",
    pill: "border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20",
    label: "Stage",
  },
  embauche: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    pill: "border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20",
    label: "Emploi",
  },
  Freelance: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    pill: "border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20",
    label: "Freelance",
  },
  Autres: {
    dot: "bg-violet-400",
    badge: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
    pill: "border border-violet-200 dark:border-violet-800 text-violet-500 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20",
    label: "Autres",
  },
};

const TYPES = ["Tous", "Stage", "embauche", "Freelance", "Autres"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function Experiences() {
  const [selectedType, setSelectedType] = useState("Tous");
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
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
      className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-full px-4 py-1.5 mb-4">
            <Briefcase size={13} className="text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">
              Parcours Professionnel
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Expériences &{" "}
            <span className="bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">
              réalisations
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full mx-auto mt-4" />
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mt-6">
            Full Stack & UI/UX Designer — je conçois et livre des produits web modernes,
            performants et orientés utilisateur. Du design Figma au déploiement en production.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {TYPES.map((type) => {
            const isActive = selectedType === type;
            const cfg = typeConfig[type];
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20 scale-[1.03]"
                    : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {cfg ? cfg.label : type}
                {type !== "Tous" && (
                  <span className={`ml-1.5 text-xs ${isActive ? "opacity-70" : "opacity-50"}`}>
                    ({experiencesData.filter((e: Experience) => e.type === type).length})
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-primary-300 via-gray-200 to-gray-100 dark:from-primary-700 dark:via-gray-800 dark:to-gray-900" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType}
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              exit="hidden"
              className="flex flex-col gap-5"
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
                      className="relative pl-12"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-[13px] top-5 w-[13px] h-[13px] rounded-full flex-shrink-0">
                        <div className={`w-full h-full rounded-full ${cfg.dot} ring-[3px] ring-white dark:ring-gray-950`} />
                        {isActive && (
                          <div className={`absolute inset-0 rounded-full ${cfg.dot} animate-ping opacity-40`} />
                        )}
                      </div>

                      {/* Card */}
                      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 sm:p-6 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300">

                        {/* Header row */}
                        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${cfg.pill}`}>
                              {cfg.label}
                            </span>
                            {isActive && (
                              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                En cours
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium italic flex-shrink-0">
                            {exp.date}
                          </p>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                          {exp.titre}
                        </h3>
                        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-0.5 mb-3">
                          {exp.entreprise}
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                          {exp.contenu}
                        </p>

                        {/* Descriptions */}
                        <AnimatePresence initial={false}>
                          <div className="space-y-2 mb-4">
                            {shown.map((desc, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400"
                              >
                                <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${cfg.dot}`} />
                                <span className="leading-relaxed">{desc}</span>
                              </motion.div>
                            ))}
                          </div>
                        </AnimatePresence>

                        {hasMore && (
                          <button
                            onClick={() => setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }))}
                            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-4"
                          >
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <ChevronDown size={14} />
                            </motion.span>
                            {isExpanded
                              ? "Voir moins"
                              : `+${exp.descriptions.length - 3} détails`}
                          </button>
                        )}

                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 dark:border-gray-800">
                          {exp.badges.slice(0, 8).map((badge, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.badge}`}
                            >
                              {badge}
                            </span>
                          ))}
                          {exp.badges.length > 8 && (
                            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                              +{exp.badges.length - 8}
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
