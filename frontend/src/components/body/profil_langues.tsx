import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface Langue {
  name: string;
  progress: number;
  level: string;
  flag: string;
  link?: string;
}

interface LanguesProps {
  languages: Langue[];
}

const barColor: Record<number, string> = {
  100: "bg-primary-500 dark:bg-primary-400",
  70:  "bg-amber-500 dark:bg-amber-400",
  50:  "bg-emerald-500 dark:bg-emerald-400",
};

export default function Langues({ languages }: LanguesProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Globe size={18} className="text-primary-500" />
        Langues
      </h3>

      {languages.map((langue, i) => (
        <div
          key={i}
          className="group cursor-pointer"
          onClick={() => langue.link && window.open(langue.link, "_blank")}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-gray-200">
              {langue.name}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              {langue.level}
            </span>
          </div>

          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className={`h-1.5 rounded-full ${barColor[langue.progress] ?? "bg-primary-500"} transition-opacity duration-200 group-hover:opacity-80`}
              initial={{ width: 0 }}
              whileInView={{ width: `${langue.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}