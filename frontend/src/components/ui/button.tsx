
import { cn } from "@/lib/utils"; // si tu utilises une fonction utilitaire pour les classes

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
  className?: string;
};

export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
}: ButtonProps) => {
  const base = "px-4 py-2 rounded font-medium";
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={cn(`${base} ${variants[variant]} ${className}`)}
    >
      {children}
    </button>
  );
};
