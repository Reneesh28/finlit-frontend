import { cn } from "../../utils/cn";
import { Card } from "./Card";

export const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendValue,
  story,
  color = "primary",
  className
}) => {
  const colors = {
    primary: "bg-primary/10 text-primary shadow-lg shadow-primary/10",
    secondary: "bg-secondary/10 text-secondary shadow-lg shadow-secondary/10",
    accent: "bg-accent/10 text-accent shadow-lg shadow-accent/10",
    warning: "bg-warning/10 text-warning shadow-lg shadow-warning/10",
    highlight: "bg-highlight/10 text-highlight shadow-lg shadow-highlight/10",
  };

  return (
    <Card variant="elevation" className={cn("group overflow-hidden relative", className)}>
      {/* Background Decor */}
      <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-2xl transition-all group-hover:scale-150", colors[color])} />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className={cn("p-4 rounded-2xl transition-transform group-hover:rotate-12", colors[color])}>
            <Icon size={28} strokeWidth={3} />
          </div>
          {trend && (
            <div className={cn(
              "px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1",
              trend === "up" ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            )}>
              {trend === "up" ? "▲" : "▼"} {trendValue}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] transition-colors group-hover:text-primary">
            {label}
          </p>
          <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-all group-hover:scale-105 origin-left">
            {value}
          </p>
          {story && (
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 italic">
              {story}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

