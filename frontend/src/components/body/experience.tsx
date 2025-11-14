
import React from "react";

const experiences = [
  {
    titre: "Développeur Frontend Stagiaire",
    Entreprise: "Mahiratra Groupe Antalaha",
    date: "Octobre 2025 – Présent",
    contenu: "Développement Frontend en React, Typescript et Tailwind CSS",
    descriptions: [
      "Développement d’interfaces modernes avec React et Typescript",
      "Intégration Tailwind CSS pour des designs responsives",
      "Participation à la conception et amélioration de l'expérience utilisateur",
      "Collaboration avec l’équipe technique sur les différentes fonctionnalités",
    ],
    badges: ["React", "Typescript", "Tailwind CSS"]
  },

  {
    titre: "Graphic Designer",
    Entreprise: "Freelance",
    date: "2023 – Présent",
    contenu: "Création de visuels graphiques et templates Web",
    descriptions: [
      "Conception de flyers, logos et affiches",
      "Création de bannières réseaux sociaux",
      "Production de templates Web modernes",
      "Approche créative orientée identité visuelle"
    ],
    badges: ["Photoshop", "Illustrator", "Figma", "Canvas"]
  },

  {
    titre: "Développeur Frontend",
    Entreprise: "Vahatra Center Diego",
    date: "Août 2025",
    contenu: "Développement d’un site web responsive (Projet Hackathon – Gagnant)",
    descriptions: [
      "Réalisation complète d’un site web responsive en 48h",
      "Développement en PHP Laravel et React",
      "Conception UI/UX du site et intégration des fonctionnalités",
      "Optimisation des performances et de l’expérience utilisateur"
    ],
    badges: ["React", "Laravel", "PHP", "Tailwind CSS"]
  }
];


const Experiences: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-10 bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100">
        Expériences Professionnelles
      </h2>
      <p className="text-center text-sm lg:text-xl max-w-9xl text-gray-300 p-4">
        Au fil de mes expériences en tant que concepteur UI/UX et développeur frontend, 
        j’ai eu l’opportunité de créer et d’optimiser des interfaces web modernes, 
        intuitives et responsives. Entre la conception graphique (flyers, logos, 
        templates web) et le développement d’applications en React, Typescript et 
        Tailwind CSS, j’ai renforcé ma capacité à allier créativité et performance 
        technique.  
        Mes missions, allant de projets freelances à des réalisations professionnelles 
        et compétitives comme les hackathons m’ont permis de développer un sens 
        aigu du détail, de l’expérience utilisateur et de la qualité du rendu.  
        Chaque projet a été l’occasion de transformer des besoins concrets en solutions 
        digitales efficaces et adaptées aux utilisateurs.
      </p>


      <div className="flex flex-col gap-8">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="bg-gray-800 shadow-lg rounded-2xl p-6 md:p-8 border border-gray-700 hover:shadow-xl  hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-1 ">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-100 order-1">
                {exp.titre}
              </h3>
              <span className="mt-2 md:mt-0 text-sm text-gray-400 italic order-3 md:order-2">
                {exp.date}
              </span>
            </div>  
              <p className="text-base text-blue-400 font-medium mb-4  ">
                {exp.Entreprise}
              </p>

            <p className="text-gray-300 mb-3">
              {exp.contenu}
            </p>

            <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4">
              {exp.descriptions.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.badges.map((badge, k) => (
                <span
                  key={k}
                  className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences