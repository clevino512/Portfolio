import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";
import testimonialsData from "../../data/testimonials.json";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  color: string;
  text: string;
  rating: number;
  relation: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.3 },
  }),
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonialsData.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [autoPlay, total]);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 12000);
  };

  const prev = () => go((current - 1 + total) % total);
  const next = () => go((current + 1) % total);

  const testimonial = testimonialsData[current] as Testimonial;

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-full px-4 py-1.5 mb-4">
            <MessageSquareQuote size={13} className="text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">
              Ce qu'ils disent
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Témoignages &{" "}
            <span className="bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">
              Recommandations
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full mx-auto mt-4" />
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-6">
            Retours de clients, superviseurs et collaborateurs qui ont travaillé directement avec moi.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Background decoration */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-900/20 blur-2xl" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-indigo-50 dark:bg-indigo-900/20 blur-2xl" />

          <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm overflow-hidden">

            {/* Large decorative quote mark */}
            <div className="absolute top-6 right-8 opacity-5 dark:opacity-10">
              <Quote size={100} className="text-primary-600" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                {/* Left — author info */}
                <div className="flex flex-col items-center md:items-start gap-4 md:w-52 flex-shrink-0">

                  {/* Avatar */}
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-black text-white">
                        {testimonial.avatar}
                      </span>
                    </div>
                    {/* Verified badge */}
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Author details */}
                  <div className="text-center md:text-left">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-0.5">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {testimonial.company}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}
                      />
                    ))}
                  </div>

                  {/* Relation tag */}
                  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {testimonial.relation}
                  </span>
                </div>

                {/* Right — quote text */}
                <div className="flex-1 flex flex-col justify-center">
                  <Quote size={28} className="text-primary-200 dark:text-primary-800 mb-4 flex-shrink-0" />
                  <blockquote className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic font-light">
                    "{testimonial.text}"
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">

              {/* Dots */}
              <div className="flex gap-1.5">
                {testimonialsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`transition-all duration-300 rounded-full ${
                      current === i
                        ? "w-6 h-2.5 bg-primary-600 dark:bg-primary-500"
                        : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>

              {/* Counter + nav arrows */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {current + 1} / {total}
                </span>
                <button
                  onClick={prev}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all duration-200"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all duration-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex justify-center gap-3 mt-8 flex-wrap"
        >
          {testimonialsData.map((t, i) => {
            const isActive = current === i;
            return (
              <button
                key={i}
                onClick={() => go(i)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20 shadow-sm"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${(t as Testimonial).color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-bold text-white">{(t as Testimonial).avatar}</span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className={`text-xs font-semibold leading-none ${isActive ? "text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300"}`}>
                    {(t as Testimonial).name.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {(t as Testimonial).company}
                  </p>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-8 mt-10 pt-8 border-t border-gray-100 dark:border-gray-800"
        >
          {[
            { value: `${total}`, label: "Recommandations" },
            { value: "5.0", label: "Note moyenne" },
            { value: "100%", label: "Satisfaction client" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-end justify-center gap-1">
                <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
                  {stat.value}
                </span>
                {i === 1 && (
                  <Star size={14} className="fill-amber-400 text-amber-400 mb-1.5" />
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
