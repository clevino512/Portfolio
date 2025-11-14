import React, { useState } from "react";

export default function Translator() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [sourceLang, setSourceLang] = useState("fr");
  const [targetLang, setTargetLang] = useState("en");

  const handleTranslate = async () => {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      }),
    });
    const data = await res.json();
    setTranslated(data.translatedText);
  };

  return (
    <section className="max-w-2xl mx-auto my-10 px-6 py-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Traducteur Français ↔ Anglais
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Texte à traduire..."
        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={5}
      />

      <div className="flex justify-between items-center my-6">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
        >
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </select>

        <span className="text-xl font-bold text-gray-600 dark:text-gray-300">→</span>

        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
        >
          <option value="en">Anglais</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <button
        onClick={handleTranslate}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition"
      >
        Traduire
      </button>

      {translated && (
        <div className="mt-6 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
          <strong className="block mb-2">Traduction :</strong>
          <p>{translated}</p>
        </div>
      )}
    </section>
  );
}
