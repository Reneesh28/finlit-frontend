import { cn } from "../../utils/cn";

export const Card = ({ children, className, variant = "glass", ...props }) => {
  const variants = {
    elevation: "bg-white dark:bg-dark-card border-b-4 border-slate-100 dark:border-dark-border shadow-soft hover:shadow-lg hover:-translate-y-1",
    glass: "bg-white/70 dark:bg-dark-card/60 backdrop-blur-xl border-2 border-white/50 dark:border-white/5 shadow-premium",
    outline: "bg-transparent border-2 border-slate-200 dark:border-dark-divider hover:border-primary/50",
    ghost: "bg-slate-50/50 dark:bg-dark-secondary/50 border-none",
    highlight: "bg-primary/5 dark:bg-primary/10 border-2 border-primary/20 dark:border-primary/30 shadow-primary/5",
    accent: "bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 dark:border-primary/40",
    premium: "bg-gradient-to-br from-slate-900 to-slate-800 dark:from-dark-elevated dark:to-dark-card text-white border-none shadow-2xl",
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
