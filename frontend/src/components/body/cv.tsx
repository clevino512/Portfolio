import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Calendar,
  Code2, Database, Palette, Server, Award, Printer,
  ExternalLink, Heart, Star,
  CheckCircle2, FileText, User, Clock
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import cvData from "../../data/cv.json";

const skillIcons: Record<string, any> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  design: Palette
};

export default function CV() {
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          html, body {
            background: white !important;
            color: #111827 !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .print-hide {
            display: none !important;
          }

          .cv-wrapper {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .cv-container {
            background: white !important;
            box-shadow: none !important;
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            overflow: visible !important;
          }

          /* Header violet */
          .cv-header {
            background: #4f46e5 !important;
            color: white !important;
          }
          .cv-header * { color: white !important; }

          /* Barre de contact */
          .cv-contact-bar {
            background: #f3f4f6 !important;
            border-bottom: 1px solid #e5e7eb !important;
          }
          .cv-contact-bar span,
          .cv-contact-bar svg { color: #374151 !important; }

          /* Corps blanc */
          .cv-body { background: white !important; }

          /* Titres sections */
          h2.section-title {
            color: #111827 !important;
            border-left: 4px solid #4f46e5 !important;
          }

          /* Textes */
          .text-gray-800, .dark\\:text-gray-200 { color: #111827 !important; }
          .text-gray-700, .dark\\:text-gray-300 { color: #374151 !important; }
          .text-gray-600, .dark\\:text-gray-400 { color: #4b5563 !important; }
          .text-gray-500, .dark\\:text-gray-400 { color: #6b7280 !important; }
          .text-primary-600, .dark\\:text-primary-400 { color: #4f46e5 !important; }
          .text-primary-500 { color: #6366f1 !important; }

          /* Boîtes de compétences */
          .skill-box {
            background: #f9fafb !important;
            border: 1px solid #e5e7eb !important;
          }
          .skill-tag {
            background: white !important;
            color: #374151 !important;
            border: 1px solid #d1d5db !important;
          }
          .tech-tag {
            background: #ede9fe !important;
            color: #4f46e5 !important;
          }

          /* Points timeline */
          .timeline-dot { background: #4f46e5 !important; }
          .timeline-line { background: #d1d5db !important; }

          /* Barres de langue */
          .lang-bg { background: #e5e7eb !important; }
          .lang-fill { background: #4f46e5 !important; }

          /* Boîtes grises */
          .gray-box { background: #f9fafb !important; }

          /* Footer */
          .cv-footer {
            background: #f9fafb !important;
            border-top: 1px solid #e5e7eb !important;
          }
          .cv-footer * { color: #6b7280 !important; }

          /* FLUX CONTINU : on laisse le contenu couler entre les pages */
          /* Seuls les petits éléments atomiques évitent d'être coupés */
          .cv-experience-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .cert-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .project-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* Les titres de section restent collés à leur contenu */
          h2.section-title {
            break-after: avoid;
            page-break-after: avoid;
          }

          @page {
            size: A4;
            margin: 1.2cm;
          }
        }
      `}</style>

      <div className="cv-wrapper min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">

        {/* Boutons */}
        <div className="print-hide max-w-4xl mx-auto mb-6 flex justify-center gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Printer size={18} />
            Imprimer / PDF
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FileText size={18} />
            Retour au portfolio
          </Link>
        </div>

        {/* CV */}
        <div ref={cvRef} className="cv-container max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="cv-header relative bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
            <div className="relative z-10 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {cvData.personal.name}{" "}
                    <span className="text-primary-200">{cvData.personal.lastName}</span>
                  </h1>
                  <p className="text-xl text-primary-100 mb-4">{cvData.personal.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-primary-100">
                    <div className="flex items-center gap-2"><MapPin size={16} /><span>{cvData.personal.location}</span></div>
                    <div className="flex items-center gap-2"><Calendar size={16} /><span>{cvData.personal.birthDate}</span></div>
                    <div className="flex items-center gap-2"><User size={16} /><span>{cvData.personal.nationality}</span></div>
                  </div>
                </div>
                <div className="hidden md:flex w-20 h-20 bg-white/10 rounded-xl backdrop-blur-sm items-center justify-center">
                  {/* <Code2 size={32} className="text-white/60" /> */}
                  <img className="w-full h-full object-cover rounded-full " src="./profil.jpg" alt="Profil" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="cv-contact-bar bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail size={16} className="text-primary-500" /><span>{cvData.personal.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={16} className="text-primary-500" /><span>{cvData.personal.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaGithub size={16} className="text-primary-500" /><span>{cvData.personal.github}</span>
              </div>
            </div>
          </div>

          {/* Corps */}
          <div className="cv-body p-8">

            {/* À propos */}
            <section className="mb-8">
              <h2 className="section-title text-xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-primary-500 pl-3 mb-4">
                À propos
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{cvData.about}</p>
            </section>

            {/* Compétences */}
            <section className="mb-8">
              <h2 className="section-title text-xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-primary-500 pl-3 mb-4">
                Compétences techniques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(cvData.skills).map(([key, skill]: [string, any]) => {
                  const Icon = skillIcons[key] || Code2;
                  return (
                    <div key={key} className="skill-box bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={18} className="text-primary-500" />
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">{skill.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item: string) => (
                          <span key={item} className="skill-tag px-3 py-1 text-sm rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Expériences */}
            <section className="mb-8">
              <h2 className="section-title text-xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-primary-500 pl-3 mb-4">
                Expériences professionnelles
              </h2>
              <div className="space-y-6">
                {cvData.experiences.map((exp, idx) => (
                  <div key={idx} className="cv-experience-item relative pl-6">
                    <div className="timeline-dot absolute left-0 top-1 w-3 h-3 bg-primary-500 rounded-full" />
                    <div className="timeline-line absolute left-1 top-4 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{exp.title}</h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        <Clock size={14} /><span>{exp.period}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{exp.description}</p>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle2 size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Formation + Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <section>
                <h2 className="section-title text-xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-primary-500 pl-3 mb-4">
                  Formation
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="timeline-dot absolute left-0 top-1 w-2.5 h-2.5 bg-primary-400 rounded-full" />
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{edu.degree}</h3>
                      {edu.specialty && <p className="text-sm text-primary-600 dark:text-primary-400">{edu.specialty}</p>}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.school}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Calendar size={12} /><span>{edu.period}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="section-title text-xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-primary-500 pl-3 mb-4">
                  Certifications
                </h2>
                <div className="space-y-3">
                  {cvData.certifications.map((cert, idx) => (
                    <div key={idx} className="cert-item skill-box flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700">
                      <Award size={18} className="text-primary-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{cert.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer} · {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Projets + Langues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <section>
                <h2 className="section-title text-xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-primary-500 pl-3 mb-4">
                  Projets personnels
                </h2>
                <div className="space-y-3">
                  {cvData.projects.map((project, idx) => (
                    <div key={idx} className="project-item skill-box p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{project.name}</h3>
                        <div className="flex gap-2">
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600">
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                              <FaGithub size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tech.map(tech => (
                          <span key={tech} className="tech-tag text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="section-title text-xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-primary-500 pl-3 mb-4">
                  Langues
                </h2>
                <div className="space-y-4">
                  {cvData.languages.map((lang, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{lang.name}</span>
                        <span className="text-sm text-gray-500">{lang.level}</span>
                      </div>
                      <div className="lang-bg w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="lang-fill bg-gradient-to-r from-primary-500 to-primary-600 rounded-full h-2"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Heart size={16} className="text-primary-500" />
                    Centres d'intérêt
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cvData.interests.map((interest, idx) => (
                      <span key={idx} className="skill-tag px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Faits marquants */}
            <section>
              <h2 className="section-title text-xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-primary-500 pl-3 mb-4">
                Faits marquants
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cvData.achievements.map((achievement, idx) => (
                  <div key={idx} className="gray-box text-center p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                    <Star size={24} className="text-primary-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{achievement.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="cv-footer text-center py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              RABENANTENAINA Clévin - CV mis à jour le {currentDate}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Disponible pour des missions freelance et opportunités professionnelles
            </p>
          </div>
        </div>
      </div>
    </>
  );
}