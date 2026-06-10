import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Palette, Users, Globe, Sparkles, ArrowRight, FileText } from 'lucide-react';
import homeData from "../../data/home.json";
import { FaFacebookF, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const iconMap = {
  Code2: Code2,
  Palette: Palette,
  Users: Users,
  Globe: Globe,
  Github: FaGithub,
  Linkedin: FaLinkedin,
  Whatsapp: FaWhatsapp,
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
    y: -4,
    transition: { duration: 0.2 }
  }
};

export default function Home() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary-200/40 to-indigo-200/30 dark:from-primary-900/20 dark:to-indigo-900/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-200/30 to-primary-200/20 dark:from-indigo-900/15 dark:to-primary-900/15 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-violet-200/20 to-primary-200/20 dark:from-violet-900/10 dark:to-primary-900/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left — Text content */}
          <motion.div variants={fadeInUp} custom={0} className="w-full lg:w-1/2 text-center lg:text-left">

            {/* Available badge */}
            <motion.div
              variants={fadeInUp}
              custom={0.1}
              className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {homeData.badge}
              </span>
            </motion.div>

            {/* Role */}
            <motion.div variants={fadeInUp} custom={0.15} className="flex items-center gap-2 justify-center lg:justify-start mb-3">
              <Sparkles size={16} className="text-primary-500" />
              <span className="text-sm font-semibold tracking-widest uppercase text-primary-600 dark:text-primary-400">
                {homeData.title} {homeData.subtitle}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeInUp}
              custom={0.2}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight"
            >
              <span className="text-gray-900 dark:text-white">
                {homeData.name.split(' ')[0]}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-500 bg-clip-text text-transparent">
                {homeData.name.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              custom={0.3}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-5 max-w-xl mx-auto lg:mx-0"
            >
              {homeData.description}
            </motion.p>

            {/* Quick skills pills */}
            <motion.div
              variants={fadeInUp}
              custom={0.4}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mt-5"
            >
              {homeData.quickSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              custom={0.45}
              className="flex justify-center lg:justify-start gap-6 mt-7"
            >
              {homeData.stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl font-black text-primary-600 dark:text-primary-400">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              custom={0.5}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8"
            >
              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
              >
                Me contacter
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                href="/cv"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold rounded-full transition-all duration-300"
              >
                <FileText size={17} />
                Voir mon CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeInUp}
              custom={0.6}
              className="flex justify-center lg:justify-start gap-3 mt-7"
            >
              {homeData.socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-md"
                >
                  <IconComponent name={social.icon} size={17} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Photo + skill cards */}
          <motion.div variants={fadeInUp} custom={0.2} className="w-full lg:w-1/2 flex flex-col items-center">

            {/* Profile photo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-indigo-500 blur-2xl opacity-25 scale-110" />
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary-300/50 dark:border-primary-700/50 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl ring-4 ring-primary-500/20">
                <img
                  src='/profil.jpg'
                  alt="Rabenantenaina Clévin"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Experience badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full px-4 py-1.5 shadow-xl border border-gray-100 dark:border-gray-700 whitespace-nowrap"
              >
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  ⚡ 5+ ans d'expérience
                </p>
              </motion.div>
            </motion.div>

            {/* Skill cards grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-3 mt-12 w-full max-w-md"
            >
              {homeData.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  custom={idx * 0.1}
                  variants={skillCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                      <IconComponent name={skill.icon} size={15} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                      {skill.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, i) => (
                      <span key={i} className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/60 px-2 py-0.5 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={fadeInUp}
              custom={0.7}
              className="mt-6 text-center max-w-md"
            >
              <p className="text-sm text-gray-400 dark:text-gray-500 italic border-l-2 border-primary-400 dark:border-primary-600 pl-3 text-left">
                "{homeData.quote}"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
