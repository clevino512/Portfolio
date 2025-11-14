import { motion } from 'framer-motion';
import StackedListBadgeActionButton from './profil_parcours';
import { FaAddressCard, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Langues from './profil_langues';

export default function Profil() {
  // Animation de base
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="w-full min-h-screen pb-30 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 bg-gray-900 text-gray-100 transition-colors duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Titre + Description */}
        <motion.div className="text-center space-y-2" variants={fadeInUp}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Profil</h1>

            <p className="leading-relaxed text-sm lg:text-xl  text-gray-300 max-w-9xl mx-auto px-2">
              Développeur Frontend et Designer UI/UX passionné, je conçois et réalise des interfaces modernes,
              intuitives et centrées sur l’utilisateur. À travers mes projets web et mobiles, j’ai développé une
              solide expérience en intégration, design, optimisation UX et création de solutions digitales
              performantes avec React, Typescript et Tailwind CSS.
              Créatif, autonome et orienté qualité, je suis capable de transformer une idée en un produit
              fonctionnel en alliant vision esthétique et rigueur technique. Je recherche des opportunités
              freelance ou professionnelles permettant de contribuer à des projets innovants, en remote ou en
              présentiel.
            </p>

        </motion.div>

        {/* Grille Info + Parcours */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20 items-start">

          {/* Info-contact + Langues */}
          <motion.div className="w-full lg:w-1/2 space-y-6" variants={fadeInUp}>
            
            {/* Info-contact */}
            <motion.div
              className="shadow-md rounded-2xl p-4 sm:p-2 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <h2 className="text-xl sm:text-2xl text-center font-bold mb-4">Info-contact</h2>

              <ul className="space-y-2 text-gray-300">
                <li className="flex flex-wrap sm:flex-nowrap items-center gap-3 text-sm sm:text-base">
                  <FaAddressCard className="text-indigo-500 text-lg sm:text-xl" />
                  <span>Développeur Frontend et Designer UI/UX</span>
                </li>

                <li className="flex flex-wrap sm:flex-nowrap items-start gap-3 text-sm sm:text-base">
                  <FaMapMarkerAlt className="text-indigo-500 text-lg sm:text-xl mt-1" />
                  <span>Province Antsiranana, Madagascar</span>
                </li>

                <li className="flex flex-wrap sm:flex-nowrap items-center gap-3 text-sm sm:text-base">
                  <FaPhone className="text-indigo-500 text-lg sm:text-xl" />
                  <span>+261 32 17 158 15</span>
                </li>

                <li className="flex flex-wrap sm:flex-nowrap items-center gap-3 text-sm sm:text-base">
                  <FaPhone className="text-indigo-500 text-lg sm:text-xl" />
                  <span>+261 38 63 341 20</span>
                </li>

                <li className="flex flex-wrap sm:flex-nowrap items-center gap-3 text-sm sm:text-base">
                  <FaEnvelope className="text-indigo-500 text-lg sm:text-xl" />
                  <span>clevino512@gmail.com</span>
                </li>
              </ul>
            </motion.div>

            {/* Langues (cliquable + animé) */}
            <Langues />
          </motion.div>

          {/* Parcours Académiques */}
          <motion.div className="w-full lg:w-3/4 space-y-6" variants={fadeInUp}>
            <motion.div
              className="text-gray-100 shadow-md rounded-2xl p-2 sm:p-2 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <h2 className="text-xl sm:text-2xl text-center font-bold mb-6">
                Parcours Académiques
              </h2>

              <StackedListBadgeActionButton />
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </motion.section>
  );
}
