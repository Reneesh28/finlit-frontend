import { cn } from "../../utils/cn";

export const Badge = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon: Icon, 
  className 
}) => {
  const variants = {
    primary: "bg-primary/15 text-primary border-primary/20",
    secondary: "bg-secondary/15 text-secondary border-secondary/20",
    accent: "bg-accent/15 text-accent border-accent/20",
    warning: "bg-warning/15 text-warning border-warning/20",
    highlight: "bg-highlight/15 text-highlight border-highlight/20",
    slate: "bg-slate-100 text-slate-500 border-slate-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs font-black uppercase tracking-wider",
    lg: "px-4 py-1.5 text-sm font-black uppercase tracking-wider",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {Icon && <Icon size={size === "sm" ? 12 : 14} strokeWidth={3} />}
      {children}
    </span>
  );
};
