
import { cn } from "@/lib/utils"; // Assure-toi que utils.ts existe

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
};

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";

  const variants = {
    default: "bg-blue-600 text-white",
    outline: "border border-gray-300 text-gray-700 bg-white",
    secondary: "bg-gray-100 text-gray-600",
  };

  return (
    <span className={cn(`${base} ${variants[variant]} ${className}`)}>
      {children}
    </span>
  );
};
