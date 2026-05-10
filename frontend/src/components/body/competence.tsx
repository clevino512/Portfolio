import { motion } from "framer-motion";
import skillsData from "../../data/skills.json";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type Outil = {
  name: string;
  niveau: "débutant" | "intermédiaire" | "avancé";
};

type Categorie = {
  title: string;
  outils: Outil[];
};

export default function Competence() {
  const getBadgeColor = (niveau: string) => {
    switch (niveau) {
      case "débutant":
        return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
      case "intermédiaire":
        return "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400";
      case "avancé":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-medium text-primary-700 dark:text-primary-300">
              Expertise Technique
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Compétences
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Intro */}
        <motion.p
          variants={fadeInUp}
          className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
        >
          Voici un aperçu des compétences techniques que j'ai acquises au fil de mes expériences et de mes projets.
          Chaque domaine regroupe les outils et technologies que je maîtrise à différents niveaux.
        </motion.p>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.categories.map((cat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.outils.map((outil, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(outil.niveau)} transition-all duration-300 cursor-default`}
                  >
                    {outil.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Légende */}
        <div className="flex justify-center gap-6 mt-8 pt-4">
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
            Débutant
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="w-3 h-3 rounded-full bg-primary-400 dark:bg-primary-500" />
            Intermédiaire
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            Avancé
          </span>
        </div>
      </div>
    </motion.section>
  );
}