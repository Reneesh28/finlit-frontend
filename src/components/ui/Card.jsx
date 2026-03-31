import { cn } from "../../utils/cn";

export const Card = ({ children, className, variant = "glass", ...props }) => {
  const variants = {
    elevation: "bg-white dark:bg-dark-card border-2 border-slate-100 dark:border-dark-border shadow-soft",
    glass: "bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-2 border-slate-100 dark:border-dark-border",
    outline: "bg-transparent border-2 border-slate-200 dark:border-dark-border",
    ghost: "bg-slate-50 dark:bg-dark-secondary border-none",
    flat: "bg-white dark:bg-dark-card",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
