import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote, Star, ChevronLeft, ChevronRight,
  MessageSquareQuote, Plus, X, Send, Trash2,
  Lock, Check, AlertCircle, ShieldCheck
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  color: string;
  text: string;
  rating: number;
  relation: string;
  submittedAt: string;
  status: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.97, transition: { duration: 0.3 } }),
};

const RELATIONS = ["Client", "Collaborateur", "Superviseur", "Pair de développement", "Partenaire", "Autre"];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800/80 transition-all duration-200 text-sm";

const labelClass = "block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5";
const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "https://portfolio-backend-ruby-nine.vercel.app/api" : "/api")
).replace(/\/$/, "");

const getApiError = (response: Response, body: string) => {
  try {
    const parsed = JSON.parse(body) as { error?: string };
    if (parsed.error) return parsed.error;
  } catch {
    // The API returned plain text or HTML instead of JSON.
  }

  if (response.status === 404) {
    return "Le service des témoignages n'est pas disponible sur ce déploiement. Configurez VITE_API_URL vers le backend.";
  }

  return `Le serveur a renvoyé une réponse inattendue (${response.status}).`;
};

const readApiResponse = async <T,>(response: Response): Promise<T> => {
  const body = await response.text();

  if (!response.ok) {
    throw new Error(getApiError(response, body));
  }

  try {
    return JSON.parse(body) as T;
  } catch {
    throw new Error(getApiError(response, body));
  }
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Modal states
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Admin states
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "", role: "", company: "", relation: "Client", text: "", rating: 5,
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`);
      const data = await readApiResponse<Testimonial[]>(res);
      if (!Array.isArray(data)) throw new Error("Réponse invalide du service des témoignages.");
      setTestimonials(data);
      setApiError("");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Le service des témoignages est indisponible.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // AutoPlay
  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [autoPlay, testimonials.length]);

  const go = (idx: number) => {
    if (testimonials.length === 0) return;
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 12000);
  };
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);
  const next = () => go((current + 1) % testimonials.length);

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.text.trim().length < 30) {
      setFormError("Votre témoignage doit contenir au moins 30 caractères.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      await readApiResponse<{ success: boolean; testimonial: Testimonial }>(res);
      setSubmitted(true);
      await fetchTestimonials();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Une erreur est survenue. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormError("");
      setForm({ name: "", role: "", company: "", relation: "Client", text: "", rating: 5 });
    }, 300);
  };

  // Admin
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce témoignage définitivement ?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey || localStorage.getItem("rc_admin_key") || "" },
      });
      if (!res.ok) {
        const body = await res.text();
        alert(getApiError(res, body));
        setAdminMode(false);
        return;
      }
      // Remove from local state and adjust current index
      const newList = testimonials.filter((t) => t.id !== id);
      setTestimonials(newList);
      if (current >= newList.length) setCurrent(Math.max(0, newList.length - 1));
    } finally {
      setDeletingId(null);
    }
  };

  // Store admin key when entering admin mode
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim()) {
      localStorage.setItem("rc_admin_key", adminKey.trim());
      setAdminMode(true);
      setAdminError("");
      setShowAdminPrompt(false);
    } else {
      setAdminError("Clé requise.");
    }
  };

  const testimonial = testimonials[current];
  const total = testimonials.length;
  const avgRating = total > 0 ? (testimonials.reduce((s, t) => s + t.rating, 0) / total).toFixed(1) : "—";

  return (
    <section ref={sectionRef} className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={fadeInUp} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-full px-4 py-1.5 mb-4">
            <MessageSquareQuote size={13} className="text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">Ce qu'ils disent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Témoignages &{" "}
            <span className="bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">Recommandations</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full mx-auto mt-4" />
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-6">
            Retours de clients, superviseurs et collaborateurs qui ont travaillé directement avec moi.
          </p>
          {apiError && (
            <p className="max-w-2xl mx-auto mt-4 text-sm text-amber-700 dark:text-amber-300" role="status">
              {apiError}
            </p>
          )}

          {/* Add testimonial button */}
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-full shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-300"
          >
            <Plus size={16} />
            Laisser un témoignage
          </motion.button>
        </motion.div>

        {/* ── Main carousel card ── */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
          </div>
        ) : total === 0 ? (
          <div className="text-center py-16 text-gray-400">Aucun témoignage pour l'instant. Soyez le premier !</div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-900/20 blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-indigo-50 dark:bg-indigo-900/20 blur-2xl" />

            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm overflow-hidden">
              <div className="absolute top-6 right-8 opacity-5 dark:opacity-10"><Quote size={100} className="text-primary-600" /></div>

              {/* Admin delete button on current card */}
              {adminMode && testimonial && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => handleDelete(testimonial.id)}
                  disabled={deletingId === testimonial.id}
                  className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-xl text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 disabled:opacity-50"
                >
                  {deletingId === testimonial.id ? (
                    <div className="w-3 h-3 rounded-full border border-red-500 border-t-transparent animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                  Supprimer
                </motion.button>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={current} custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit"
                  className="flex flex-col md:flex-row gap-8 items-start"
                >
                  {/* Author */}
                  <div className="flex flex-col items-center md:items-start gap-3 md:w-52 flex-shrink-0">
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl font-black text-white">{testimonial.avatar}</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">{testimonial.name}</h3>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-0.5">{testimonial.role}</p>
                      {testimonial.company && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{testimonial.company}</p>}
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"} />
                      ))}
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                      {testimonial.relation}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="flex-1">
                    <Quote size={28} className="text-primary-200 dark:text-primary-800 mb-4" />
                    <blockquote className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic font-light">
                      "{testimonial.text}"
                    </blockquote>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => go(i)}
                      className={`transition-all duration-300 rounded-full ${current === i ? "w-6 h-2.5 bg-primary-600 dark:bg-primary-500" : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{current + 1} / {total}</span>
                  <button onClick={prev} className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-200"><ChevronLeft size={16} /></button>
                  <button onClick={next} className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-200"><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Thumbnails ── */}
        {total > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
            className="flex justify-center gap-3 mt-8 flex-wrap"
          >
            {testimonials.map((t, i) => (
              <button key={t.id} onClick={() => go(i)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-300 ${
                  current === i
                    ? "border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20 shadow-sm"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-bold text-white">{t.avatar}</span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className={`text-xs font-semibold leading-none ${current === i ? "text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300"}`}>
                    {t.name.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{t.company || t.role}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Stats + admin toggle ── */}
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="flex gap-8">
            {[
              { value: String(total), label: "Recommandations" },
              { value: avgRating, label: "Note moyenne", star: true },
              { value: "100%", label: "Satisfaction" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-2xl font-black text-primary-600 dark:text-primary-400">{s.value}</span>
                  {s.star && <Star size={13} className="fill-amber-400 text-amber-400 mb-1.5" />}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Admin toggle button */}
          <div className="flex items-center gap-2">
            {adminMode ? (
              <button onClick={() => { setAdminMode(false); localStorage.removeItem("rc_admin_key"); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200"
              >
                <ShieldCheck size={13} />
                Admin actif — Quitter
              </button>
            ) : (
              <button onClick={() => setShowAdminPrompt(true)}
                className="p-2 text-gray-300 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-500 transition-colors duration-200"
                title="Mode administrateur"
              >
                <Lock size={14} />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════
          MODAL — Submit Testimonial
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeForm(); }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30">
                    <MessageSquareQuote size={17} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Laisser un témoignage</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Votre avis compte beaucoup</p>
                  </div>
                </div>
                <button onClick={closeForm} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="px-7 py-6 max-h-[70vh] overflow-y-auto">
                {submitted ? (
                  /* ── Success state ── */
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={30} className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Merci pour votre témoignage !</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                      Votre témoignage a été publié et est maintenant visible sur le portfolio.
                      Il ne peut plus être modifié.
                    </p>
                    <button onClick={closeForm}
                      className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
                    >
                      Fermer
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Nom complet *</label>
                        <input type="text" required placeholder="Jean Dupont"
                          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputClass} maxLength={80}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Rôle / Poste *</label>
                        <input type="text" required placeholder="CEO, Directeur, ..."
                          value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className={inputClass} maxLength={80}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Entreprise</label>
                        <input type="text" placeholder="Nom de l'entreprise"
                          value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className={inputClass} maxLength={80}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Relation *</label>
                        <select value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })}
                          className={inputClass + " cursor-pointer"}
                        >
                          {RELATIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Star rating */}
                    <div>
                      <label className={labelClass}>Note *</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setForm({ ...form, rating: star })}
                            className="transition-transform duration-100 hover:scale-110 focus:outline-none"
                          >
                            <Star
                              size={26}
                              className={
                                star <= (hoverRating || form.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 self-center font-medium">
                          {form.rating}/5
                        </span>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass}>Votre témoignage * <span className="text-gray-400 font-normal">(min. 30 caractères)</span></label>
                      <textarea required rows={5} placeholder="Décrivez votre expérience de collaboration..."
                        value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
                        className={inputClass + " resize-none"} maxLength={600}
                      />
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs ${form.text.length < 30 ? "text-gray-400" : "text-emerald-500"}`}>
                          {form.text.length < 30 ? `${30 - form.text.length} caractères min. restants` : "✓ Longueur suffisante"}
                        </span>
                        <span className="text-xs text-gray-400">{form.text.length}/600</span>
                      </div>
                    </div>

                    {/* Error */}
                    {formError && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle size={15} className="flex-shrink-0" />
                        {formError}
                      </div>
                    )}

                    {/* Notice */}
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-start gap-1.5">
                      <Lock size={11} className="mt-0.5 flex-shrink-0" />
                      Une fois envoyé, votre témoignage ne peut plus être modifié.
                    </p>

                    {/* Submit */}
                    <motion.button type="submit" disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }} whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      {submitting ? (
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Envoi en cours...</>
                      ) : (
                        <><Send size={16} />Publier mon témoignage</>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          MODAL — Admin Login
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {showAdminPrompt && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setShowAdminPrompt(false); setAdminKey(""); setAdminError(""); } }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
                  <Lock size={20} className="text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Accès Administrateur</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Entrez votre clé pour gérer les témoignages</p>
              </div>

              <form onSubmit={handleAdminSubmit} className="space-y-3">
                <div>
                  <input type="password" placeholder="Clé administrateur"
                    value={adminKey} onChange={(e) => setAdminKey(e.target.value)}
                    className={inputClass} autoFocus
                  />
                </div>
                {adminError && (
                  <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{adminError}</p>
                )}
                <div className="flex gap-2 pt-1">
                  <button type="button" onClick={() => { setShowAdminPrompt(false); setAdminKey(""); setAdminError(""); }}
                    className="flex-1 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Annuler
                  </button>
                  <button type="submit"
                    className="flex-1 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors shadow-sm"
                  >
                    Connexion
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
