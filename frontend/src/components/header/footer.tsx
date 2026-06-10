import { Code2, Heart, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Accueil", id: "accueil" },
  { name: "Profil", id: "profil" },
  { name: "Expériences", id: "experiences" },
  { name: "Compétences", id: "competence" },
  { name: "Projets", id: "project" },
  { name: "Contact", id: "contact" },
];

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/clevino512", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/rabenantenaina-cl%C3%A9vin-4a727314b/", label: "LinkedIn" },
  { icon: FaWhatsapp, href: "https://wa.me/261386334120", label: "WhatsApp" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gray-950 dark:bg-black text-gray-400 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-primary-600 to-indigo-600 p-2 rounded-xl">
                <Code2 size={17} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                R<span className="text-primary-400">.</span>.Clévin
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Développeur Full Stack & UI/UX Designer basé à Madagascar.
              Disponible pour missions freelance et collaborations.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 pt-1">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="p-2.5 rounded-xl bg-gray-800/80 text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-primary-400 transition-colors" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Travailler ensemble
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Disponible pour des projets web, du freelance et des collaborations techniques.
            </p>
            <a
              href="mailto:clevino512@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20 group"
            >
              clevino512@gmail.com
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">
            © {currentYear}{" "}
            <span className="text-gray-400 font-semibold">RABENANTENAINA Clévin</span>
            . Tous droits réservés.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1.5">
            Fait avec
            <Heart size={12} className="text-rose-500 fill-rose-500" />
            à Madagascar — mis à jour le{" "}
            <span className="text-gray-400 font-medium">10 Juin 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
