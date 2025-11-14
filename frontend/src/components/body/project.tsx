import ESPA from '../../assets/ESPA.png';
import UNM from '../../assets/UNM.png';
import PORTFOLIO from '../../assets/PORTFOLIO.png';
import Tsingy from '../../assets/Tsingy.png';
import { FaGlobe, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const projects = [
  {
    title: "UNM Sambava Madagascar – Site Web Template",
    image: UNM,
    description:
      "Création de templates web professionnels et réutilisables : design UI soigné, structure optimisée et intégration facile.",
    link: "https://unm-7agc.vercel.app/"
  },

  {
    title: "Portofolio P.O Professionel– Site Web Template",
    image: PORTFOLIO,
    description:
      "Conception et développement complet d’un portfolio moderne présentant mes services, projets et expériences en UI/UX et développement frontend.",
    link: "https://portfolio-six-theta-qsmr10tp8l.vercel.app/"
  },

  {
    title: "Tsingy Rouge – Site Web Template",
    image: Tsingy,
    description:
      "Réalisation d’un site web complet en 48 heures durant une compétition Hackathon, basé sur React et Laravel, avec une interface fluide et entièrement responsive.",
    link: "https://tsingyrouge.msi2025a.net/"
  },
    {
    title: "Design UI/UX -Logo et création Visuelle",
    image: ESPA,
    description:
      "Création de logos et visuels attractifs pour renforcer l'identité de marque, en utilisant des principes de design modernes et adaptés aux besoins clients.",
    link: "https://drive.google.com/drive/folders/1EGHeUniI6hrIJzknMaIBph338ulAiSdW?usp=sharing"
  }

];


export default function Project() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const visibleCount = 3; // Desktop only

  const prev = () => setIndex(prev => Math.max(prev - visibleCount, 0));
  const next = () => setIndex(prev => Math.min(prev + visibleCount, projects.length - visibleCount));

  const dragConstraints = () => {
    if (!containerRef.current) return { left: 0, right: 0 };
    const totalWidth = containerRef.current.scrollWidth;
    const visibleWidth = containerRef.current.offsetWidth;
    return { left: -(totalWidth - visibleWidth), right: 0 };
  };

  return (
    <section className="min-h-screen px-6 my-30 lg:my-40 bg-gray-900 text-gray-100 transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center mb-12">Projets</h1>

      {/* Mobile & Tablet Grid */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.title} className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-gray-200 transition-all duration-300 relative">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 z-10 hover:text-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              <FaGlobe className="text-3xl hover:text-4xl transition-all duration-300" />
            </a>
            <div className="w-full h-60 bg-gray-900 flex items-center justify-center overflow-hidden rounded-t-xl">
              <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-sm text-gray-300">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Carousel */}
      <div className="hidden lg:block relative overflow-hidden">
        {projects.length > visibleCount && (
          <>
            <button onClick={prev} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-600/80 rounded-full text-white text-3xl p-2">
              <FaChevronLeft />
            </button>
            <button onClick={next} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-600/80 rounded-full text-white text-3xl p-2">
              <FaChevronRight />
            </button>
          </>
        )}

        <motion.div
          ref={containerRef}
          className="flex cursor-grab"
          drag="x"
          dragConstraints={dragConstraints()}
          style={{ x }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex-shrink-0 mx-2 bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-gray-200 transition-all duration-300 relative"
              style={{ width: `calc(${100 / visibleCount}% - 16px)` }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 z-10 hover:text-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                <FaGlobe className="text-3xl hover:text-4xl transition-all duration-300" />
              </a>
              <div className="w-full h-60 bg-gray-900 flex items-center justify-center overflow-hidden rounded-t-xl">
                <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-sm text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
