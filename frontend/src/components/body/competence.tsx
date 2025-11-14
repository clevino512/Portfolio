
import { motion } from "framer-motion";

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

const competences: Categorie[] = [
  {
    title: "Frameworks",
    outils: [
      { name: "React.js", niveau: "avancé" },
      { name: "Vue.js", niveau: "intermédiaire" },
      { name: "Django / Tkinter", niveau: "intermédiaire" },
      { name: "Flutter", niveau: "débutant" }
    ]
  },

  {
    title: "API & Services REST",
    outils: [
      { name: "Axios", niveau: "avancé" },
      { name: "Fetch API", niveau: "intermédiaire" },
      { name: "REST Architecture", niveau: "intermédiaire" }
    ]
  },

  {
    title: "Suite Adobe Creative",
    outils: [
      { name: "InDesign", niveau: "intermédiaire" },
      { name: "Photoshop", niveau: "avancé" },
      { name: "Illustrator", niveau: "intermédiaire" },
      { name: "Premiere Pro", niveau: "intermédiaire" }
    ]
  },

  {
    title: "Outils de conception & prototypage",
    outils: [
      { name: "Figma", niveau: "intermédiaire" },
      { name: "Draw.io", niveau: "intermédiaire" }
    ]
  },

  {
    title: "Bases de données",
    outils: [
      { name: "MySQL", niveau: "intermédiaire" },
      { name: "SQL", niveau: "intermédiaire" },
      { name: "PostgreSQL", niveau: "intermédiaire" },
      { name: "MongoDB", niveau: "débutant" }
    ]
  },

];

export default function Competence() {
  const getBadgeColor = (niveau: string) => {
    switch (niveau) {
      case "débutant":
        return "bg-gray-700 text-gray-200";
      case "intermédiaire":
        return "bg-blue-500/20 text-blue-400";
      case "avancé":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-700 text-gray-200";
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className="mb-10 px-6 text-gray-100 transition-colors duration-300"
    >
      {/* Titre */}
      <motion.div variants={fadeInUp} className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-center items-center mb-4">
          <h1 className="text-4xl font-bold mb-2  text-white tracking-tight leading-snug">
            Compétences

          </h1>
        </div>
      </motion.div>

      {/* Intro */}
      <motion.p
        variants={fadeInUp}
        className="text-center text-sm md:text-xl -gray-300 max-w-7xl mx-auto leading-relaxed mb-8"
      >
        Voici un aperçu des compétences techniques que j’ai acquises au fil de mes expériences et de mes projets. 
        Chaque domaine regroupe les outils et technologies que je maîtrise à différents niveaux, allant des bases aux connaissances avancées.
      </motion.p>

      {/* Grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {competences.map((cat, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className=" border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-lg font-semibold mb-4 text-white">
              {cat.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {cat.outils.map((outil, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-1 rounded-full text-sm font-medium ${getBadgeColor(outil.niveau)} transition-all duration-300 cursor-default`}
                >
                  {outil.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
        <div className=" flex justify-center">
          <div className="flex gap-4 flex-wrap justify-center items-center text-sm">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-gray-700" />
              <span className="text-gray-300">Base</span>
            </span>
          <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-400" />
              <span className="text-blue-400">Bon</span>
            </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500/20 border border-green-400" />
            <span className="text-green-400">Avancé</span>
          </span>
          </div>
        </div>
      </div>

    </motion.section>
  );
}
