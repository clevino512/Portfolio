import React from "react";

interface Langue {
  name: string;
  progress: number;
  level: string;
  link?: string; // lien optionnel pour chaque langue
}

const langues: Langue[] = [
  { name: "Malagasy", progress: 100, level: "Maternelle", link: "https://fr.wikipedia.org/wiki/Malgache" },
  { name: "Français", progress: 70, level: "Intermédiaire", link: "https://fr.wikipedia.org/wiki/Français" },
  { name: "Anglais", progress: 50, level: "Technique", link: "https://en.wikipedia.org/wiki/English_language" },
];

export default function Langues() {
  const handleClick = (link?: string) => {
    if (!link) return;
    window.open(link, "_blank"); // Ouvre dans un nouvel onglet
  };

  return (
    <div className="w-full max-w-xl mx-auto ">
      <h3 className="text-xl font-semibold pb-4 ">
        Langues
      </h3>

      {langues.map((langue, index) => (
        <div
          key={index}
          className="group relative pb-4 cursor-pointer"
          onClick={() => handleClick(langue.link)}
        >
          {/* Nom + Pourcentage */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {langue.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {langue.progress}%
            </span>
          </div>

          {/* Barre de progression */}
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full transition-all duration-700 ease-out group-hover:bg-indigo-500"
              style={{ width: `${langue.progress}%` }}
            />
          </div>

          {/* Tooltip au survol */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-7 bg-gray-800 text-gray-100 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
            {langue.level}
          </div>
        </div>
      ))}
    </div>
  );
}
