const StackedListBadgeActionButton = () => {
  const array = [
    {
      name: "Master en Science Informatique et Télécommunication Réseaux",
      status: "En cours",
      desc: "École Supérieur Polytechnique, Antsiranana",
      start_date: "2024",
      end_date: "Présent",
    },
    {
      name: "Licence en Informatique Industrielle",
      status: "Diplôme",
      desc: "École Supérieure Polytechnique d’Antsiranana",
      start_date: "2023",
      end_date: "2024",
    },
    {
      name: "Baccalauréat série scientifique",
      status: "Diplôme",
      desc: "Lycée Maroantsetra Madagascar",
      start_date: "2018",
      end_date: "2019",
    },
  ];

  return (
    <ul role="list" className="space-y-3 sm:space-y-4">
      {array.map((item, index) => (
        <li
          key={index}
          className="
            bg-gray-800/50 backdrop-blur-md border border-gray-700/70
            rounded-2xl p-5 sm:p-6 shadow-lg
            hover:border-gray-500 hover:shadow-gray-400/20
            transition-all duration-300
          "
        >
          {/* Titre + Statut */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
              {item.name}
            </h3>

            <span
              className={`
                mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs sm:text-sm font-medium
                whitespace-nowrap  /* empêche totalement le wrap */
                ${
                  item.status === "Diplôme"
                    ? "bg-green-700 text-green-100"
                    : item.status === "En cours"
                    ? "bg-orange-700 text-orange-100"
                    : "bg-gray-700 text-gray-100"
                }
              `}
            >
              {item.status}
            </span>
          </div>

          {/* Séparateur */}
          <div className="w-full h-px bg-gray-700 mb-4" />

          {/* Description + Dates */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 text-gray-300">
            <p className="sm:w-3/4 text-sm leading-relaxed">{item.desc}</p>

            <p className="sm:w-1/4 text-sm font-medium text-gray-400 text-end">
              {item.start_date} – {item.end_date}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StackedListBadgeActionButton;
