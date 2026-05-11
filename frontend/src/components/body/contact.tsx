import { useState} from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, Copy, Check, Send, MessageCircle, X 
} from "lucide-react";
import { FaGithub , FaLinkedin, FaWhatsapp} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = "clevino512@gmail.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://portfolio-aktc.onrender.com/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setNotification({ message: "Message envoyé avec succès !", type: "success" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setNotification({ message: "Erreur lors de l'envoi du message", type: "error" });
      }
    } catch (error) {
      console.error("Erreur :", error);
      setNotification({ message: "Erreur serveur, réessayez plus tard", type: "error" });
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  const contactInfo = [
    { icon: MapPin, label: "Localisation", value: "Antsiranana, Madagascar", href: "https://www.google.com/maps/search/?api=1&query=Antsiranana+Madagascar" },
    { icon: Phone, label: "Téléphone", value: "+261 32 17 158 15 / +261 38 63 341 20", href: "tel:+261321715815" },
    { icon: Mail, label: "Email", value: email, isEmail: true },
  ];

  const socialLinks = [
    { icon: MessageCircle, href: "https://wa.me/261386334120", label: "WhatsApp", color: "hover:text-emerald-500" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/rabenantenaina-cl%C3%A9vin-4a727314b/", label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: FaGithub, href: "https://github.com/clevino512", label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: FaWhatsapp, href: "https://wa.me/261386334120", label: "WhatsApp", color: "hover:text-emerald-500" },
  ];

  return (
    <>
      <AnimatePresence>
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={`fixed top-6 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl text-white  text-sm sm:text-base flex items-center gap-3 backdrop-blur-sm ${
              notification.type === "success"
                ? "bg-emerald-600"
                : "bg-red-600"
            }`}
          >
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification({ message: "", type: "" })}
              className="ml-2 text-gray-400  text-white hover:text-gray-200 transition-colors"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* En-tête */}
          <motion.div
            className="space-y-8 text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p
              variants={fadeUp} custom={0}
              className="text-sm font-semibold tracking-[0.18em] uppercase text-primary-600 dark:text-primary-400"
            >
              Me contacter directement
            </motion.p>

            <motion.h1
              variants={fadeUp} custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Parlons de votre{" "}
              <span className="text-primary-600 dark:text-primary-400">projet</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} custom={2}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Vous avez un projet en tête ? Une collaboration ou une mission freelance ?
              N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.
            </motion.p>
          </motion.div>

          {/* Grille Contact */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            
            {/* Colonne gauche - Infos */}
            <motion.div variants={fadeUp} custom={0.1} className="space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{info.label}</h3>
                        {info.isEmail ? (
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-gray-900 dark:text-white font-medium">{info.value}</span>
                            <button
                              onClick={handleCopy}
                              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary-600 transition-colors"
                              aria-label="Copier l'email"
                            >
                              {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                            {copied && (
                              <span className="text-xs text-emerald-500 animate-pulse">Copié !</span>
                            )}
                          </div>
                        ) : (
                          <a
                            href={info.href}
                            target={info.label === "Localisation" ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="text-gray-900 dark:text-white font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Réseaux sociaux */}
              <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Retrouvez-moi sur
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                        aria-label={social.label}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Colonne droite - Formulaire */}
            <motion.div variants={fadeUp} custom={0.2}>
              <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Envoyez-moi un message
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Remplissez le formulaire et je vous répondrai rapidement
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Votre email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sujet"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Votre message"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
