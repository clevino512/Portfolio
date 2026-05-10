import { motion } from "framer-motion";
import { Briefcase, MapPin, Phone, Mail, User, GraduationCap } from "lucide-react";
import { FaFacebookF , FaGithub , FaLinkedin, FaWhatsapp} from "react-icons/fa";
import profilData from "../../data/profil.json";
import languagesData from "../../data/languages.json";
import educationData from "../../data/education.json";
import Langues from "./profil_langues";
import StackedListBadgeActionButton from "./profil_parcours";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

const iconMap = {
  Briefcase: Briefcase,
  MapPin: MapPin,
  Phone: Phone,
  Mail: Mail,
  Github: FaGithub,
  Linkedin: FaLinkedin,
};

export default function Profil() {
  const IconComponent = ({ name, size = 16 }: { name: string; size?: number }) => {
    const Icon = iconMap[name as keyof typeof iconMap];
    return Icon ? <Icon size={size} /> : null;
  };

  return (
    <section className="w-full min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* En-tête */}
        <motion.div
          className="space-y-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            variants={fadeUp} custom={0}
            className="text-sm font-semibold tracking-[0.18em] uppercase text-primary-600 dark:text-primary-400"
          >
            {profilData.badge}
          </motion.p>

          <motion.h1
            variants={fadeUp} custom={1}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
          >
            {profilData.title}
          </motion.h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto" />

          <div className="max-w-4xl mx-auto space-y-4">
            <motion.p
              variants={fadeUp} custom={2}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {profilData.description}
            </motion.p>

            <motion.p
              variants={fadeUp} custom={3}
              className="text-base text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {profilData.availability}
            </motion.p>
          </div>
        </motion.div>

        {/* Grille principale */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >

          {/* Colonne gauche — Contact + Langues */}
          <motion.div variants={fadeUp} custom={0} className="lg:col-span-2 space-y-6">

            {/* Contact */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <User size={18} className="text-primary-500" />
                Contact
              </h2>

              <ul className="space-y-3">
                {profilData.contact.map((item, i) => {
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 text-primary-500 dark:text-primary-400">
                        <IconComponent name={item.icon} size={16} />
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-base text-primary-600 dark:text-primary-400 hover:underline leading-snug"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span
                          className={`text-base leading-snug ${
                            item.subtle
                              ? "text-gray-500 dark:text-gray-400 font-medium"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {item.text}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Liens sociaux */}
              <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                {profilData.socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <IconComponent name={social.icon} size={15} />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Langues */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <Langues languages={languagesData} />
            </div>
          </motion.div>

          {/* Colonne droite — Parcours académique */}
          <motion.div variants={fadeUp} custom={1} className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <GraduationCap size={18} className="text-primary-500" />
                Parcours académique
              </h2>
              <StackedListBadgeActionButton education={educationData} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}