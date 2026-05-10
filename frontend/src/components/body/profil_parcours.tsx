import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface Education {
  name: string;
  status: string;
  desc: string;
  start: string;
  end: string;
  color: string;
}

interface ParcoursProps {
  education: Education[];
}

const statusStyle: Record<string, string> = {
  "En cours":  "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 border border-primary-200 dark:border-primary-800",
  "Diplômé":   "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  "Mémoriste": "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
};

const dotColor: Record<string, string> = {
  primary: "bg-primary-500",
  emerald: "bg-emerald-500",
  amber:   "bg-amber-500",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

export default function StackedListBadgeActionButton({ education }: ParcoursProps) {
  return (
    <div className="relative">
      <div className="absolute left-[10px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-800" />

      <ul className="space-y-4">
        {education.map((item, i) => (
          <motion.li
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative pl-8"
          >
            <div
              className={`absolute left-[5px] top-5 w-2.5 h-2.5 rounded-full ${dotColor[item.color]} ring-[3px] ring-white dark:ring-gray-900`}
            />

            <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 rounded-xl p-4 sm:p-5 hover:border-primary-200 dark:hover:border-primary-800 transition-colors duration-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2.5">
                  <GraduationCap
                    size={18}
                    className="flex-shrink-0 mt-0.5 text-gray-400 dark:text-gray-500"
                  />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                    {item.name}
                  </h3>
                </div>
                <span
                  className={`flex-shrink-0 text-sm px-3 py-1 rounded-full font-medium ${
                    statusStyle[item.status] ?? statusStyle["Diplômé"]
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="pl-7 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <p className="text-base text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 italic flex-shrink-0">
                  {item.start} – {item.end}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}