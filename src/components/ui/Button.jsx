import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-white border-b-4 border-primary-dark active:border-b-0",
    secondary: "bg-white dark:bg-dark-secondary text-secondary dark:text-slate-200 border-2 border-b-4 border-slate-200 dark:border-dark-border active:border-b-2 hover:bg-slate-50 dark:hover:bg-dark-elevated",
    accent: "bg-accent text-white border-b-4 border-purple-700 active:border-b-0",
    ghost: "bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-secondary",
    warning: "bg-warning text-white border-b-4 border-red-700 active:border-b-0",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base font-bold",
    lg: "px-8 py-4 text-lg font-extrabold",
    icon: "p-2",
  };

  return (
    <motion.button
      whileTap={{ y: 2 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl transition-all duration-100 active:top-[2px]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
