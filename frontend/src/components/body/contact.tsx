import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Mail, Copy, Check, Send, X, MessageSquare
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          time: new Date().toLocaleString(),
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setNotification({ message: "Message envoyé avec succès !", type: "success" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Erreur EmailJS :", error);
      setNotification({ message: "Erreur lors de l'envoi. Réessayez.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Localisation",
      value: "Antsiranana, Madagascar",
      href: "https://www.google.com/maps/search/?api=1&query=Antsiranana+Madagascar",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-900/20",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+261 32 17 158 15",
      href: "tel:+261321715815",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      isEmail: true,
      color: "text-primary-500",
      bg: "bg-primary-50 dark:bg-primary-900/20",
    },
  ];

  const socialLinks = [
    {
      icon: FaWhatsapp,
      href: "https://wa.me/261386334120",
      label: "WhatsApp",
      color: "hover:bg-emerald-500 hover:text-white hover:border-emerald-500",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/rabenantenaina-cl%C3%A9vin-4a727314b/",
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
    },
    {
      icon: FaGithub,
      href: "https://github.com/clevino512",
      label: "GitHub",
      color: "hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:border-gray-900",
    },
  ];

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 text-sm";

  return (
    <>
      {/* Toast notification */}
      <AnimatePresence>
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-4 z-50 px-5 py-4 rounded-2xl shadow-2xl text-white text-sm flex items-center gap-3 backdrop-blur-sm max-w-sm ${
              notification.type === "success" ? "bg-emerald-600" : "bg-red-600"
            }`}
          >
            <span className="flex-1">{notification.message}</span>
            <button
              onClick={() => setNotification({ message: "", type: "" })}
              className="hover:opacity-75 transition-opacity flex-shrink-0"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-full px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">
                Me contacter directement
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Parlons de votre{" "}
              <span className="bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">
                projet
              </span>
            </motion.h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full mx-auto mt-4" />

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-6"
            >
              Vous avez un projet en tête ? Une collaboration ou une mission freelance ?
              Je vous réponds dans les 24h.
            </motion.p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >

            {/* Left column — info */}
            <motion.div variants={fadeUp} custom={0} className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${info.bg} ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={19} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                          {info.label}
                        </p>
                        {info.isEmail ? (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {info.value}
                            </span>
                            <button
                              onClick={handleCopy}
                              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                              aria-label="Copier l'email"
                            >
                              {copied ? (
                                <Check size={13} className="text-emerald-500" />
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>
                            {copied && (
                              <span className="text-xs text-emerald-500 font-medium animate-pulse">
                                Copié !
                              </span>
                            )}
                          </div>
                        ) : (
                          <a
                            href={info.href}
                            target={info.label === "Localisation" ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Social networks */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={17} className="text-primary-500" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Retrouvez-moi sur
                  </h3>
                </div>
                <div className="flex gap-3">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 ${social.color} transition-all duration-300 text-sm font-medium`}
                        aria-label={social.label}
                      >
                        <Icon size={16} />
                        <span className="hidden sm:inline">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right column — form */}
            <motion.div variants={fadeUp} custom={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Envoyez-moi un message
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Remplissez le formulaire et je vous répondrai rapidement.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jean@exemple.com"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Mission freelance / Collaboration"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Décrivez votre projet ou votre besoin..."
                      required
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        Envoyer le message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
