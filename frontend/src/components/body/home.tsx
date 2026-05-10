import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Palette, Users, Globe, Sparkles, ArrowRight, Download} from 'lucide-react';
import homeData from "../../data/home.json";
import { FaFacebookF , FaGithub , FaLinkedin, FaWhatsapp} from "react-icons/fa";

const iconMap = {
  Code2: Code2,
  Palette: Palette,
  Users: Users,
  Globe: Globe,
  Github: FaGithub,
  Linkedin: FaWhatsapp,
  Facebook: FaFacebookF,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const skillCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay }
  }),
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  }
};

export default function Home() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const IconComponent = ({ name, size = 20 }: { name: string; size?: number }) => {
    const Icon = iconMap[name as keyof typeof iconMap];
    return Icon ? <Icon size={size} /> : null;
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Colonne gauche - Texte */}
          <motion.div variants={fadeInUp} custom={0} className="w-full lg:w-1/2 text-center lg:text-left">
            
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              custom={0.1}
              className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles size={14} className="text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-medium text-primary-700 dark:text-primary-300">
                {homeData.badge}
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              variants={fadeInUp}
              custom={0.2}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                {homeData.title}
              </span>
            </motion.h1>

            {/* Nom */}
            <motion.h2
              variants={fadeInUp}
              custom={0.3}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mt-4"
            >
              {homeData.name.split(' ')[0]} <span className="text-primary-600 dark:text-primary-400">{homeData.name.split(' ')[1]}</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              custom={0.4}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-6 max-w-xl mx-auto lg:mx-0"
            >
              {homeData.description}
            </motion.p>

            {/* Compétences clés */}
            <motion.div
              variants={fadeInUp}
              custom={0.5}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6"
            >
              {homeData.quickSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Boutons d'action */}
            <motion.div
              variants={fadeInUp}
              custom={0.6}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8"
            >
              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Me contacter
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/CLEVIN_CV.png";
                  link.download = "CLEVIN_CV.png";
                  link.click();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Download size={18} />
                Télécharger CV
              </motion.button>
            </motion.div>

            {/* Réseaux sociaux */}
            <motion.div
              variants={fadeInUp}
              custom={0.7}
              className="flex justify-center lg:justify-start gap-3 mt-8"
            >
              {homeData.socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-110"
                >
                  <IconComponent name={social.icon} size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Colonne droite - Photo et compétences */}
          <motion.div variants={fadeInUp} custom={0.2} className="w-full lg:w-1/2">
            
            {/* Photo de profil */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 blur-2xl opacity-30" />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl ring-2 ring-primary-500/50">
                  <img
                    src='/profil.jpg'
                    alt="Rabenantenaina Clévin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full px-4 py-1.5 shadow-lg whitespace-nowrap">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    3+ ans d'expérience
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Grille des compétences */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-3 mt-8"
            >
              {homeData.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  custom={idx * 0.1}
                  variants={skillCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                      <IconComponent name={skill.icon} size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                      {skill.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => (
                      <span key={i} className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-0.5 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Citation */}
            <motion.div
              variants={fadeInUp}
              custom={0.5}
              className="mt-6 text-center"
            >
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500 italic">
                "{homeData.quote}"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}