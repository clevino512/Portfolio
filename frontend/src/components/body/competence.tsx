import React from "react";
import { motion } from "framer-motion";
import { Monitor, Server, Database, GitBranch, Layers, ShieldCheck, Terminal, PenTool } from "lucide-react";
import skillsData from "../../data/skills.json";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Database,
  GitBranch,
  Figma: PenTool,
  ShieldCheck,
  Terminal,
  Layers,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

type Outil = {
  name: string;
  niveau: "débutant" | "intermédiaire" | "avancé";
};

type Categorie = {
  title: string;
  icon: string;
  outils: Outil[];
};

const niveauConfig = {
  débutant: {
    badge: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700",
    dot: "bg-gray-400",
  },
  intermédiaire: {
    badge: "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/50",
    dot: "bg-primary-500",
  },
  avancé: {
    badge: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50",
    dot: "bg-emerald-500",
  },
};

export default function Competence() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">
              Expertise Technique
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Compétences
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full mx-auto mt-4" />
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mt-6">
            Voici un aperçu des compétences techniques acquises au fil de 5+ ans d'expérience.
            Chaque domaine regroupe les outils et technologies maîtrisés à différents niveaux.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {(skillsData.categories as Categorie[]).map((cat, index) => {
            const IconComp = iconMap[cat.icon] || Layers;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 group"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                    <IconComp size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.outils.map((outil, i) => {
                    const cfg = niveauConfig[outil.niveau];
                    return (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badge} transition-all duration-200 cursor-default`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                        {outil.name}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mt-10 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          {[
            { label: "Débutant", dot: "bg-gray-400", text: "text-gray-500 dark:text-gray-400" },
            { label: "Intermédiaire", dot: "bg-primary-500", text: "text-gray-500 dark:text-gray-400" },
            { label: "Avancé", dot: "bg-emerald-500", text: "text-gray-500 dark:text-gray-400" },
          ].map((item, i) => (
            <span key={i} className={`flex items-center gap-2 text-sm font-medium ${item.text}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
              {item.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
