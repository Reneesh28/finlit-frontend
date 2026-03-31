import { cn } from "../../utils/cn";
import { Card } from "./Card";

export const StatCard = ({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = "primary", 
  className 
}) => {
  const colors = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    warning: "bg-warning/10 text-warning",
    highlight: "bg-highlight/10 text-highlight",
  };

  return (
    <Card className={cn("flex flex-col gap-4 border-2 border-slate-100 dark:border-dark-border", className)}>
      <div className="flex items-start justify-between">
        <div className={cn("p-3 rounded-2xl", colors[color])}>
          <Icon size={24} strokeWidth={3} />
        </div>
        {trend && (
          <div className={cn(
            "px-2 py-1 rounded-lg text-xs font-black uppercase tracking-wider",
            trend === "up" ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
          )}>
            {trend === "up" ? "+" : "-"}{trendValue}%
          </div>
        )}
      </div>
      
      <div>
        <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </p>
      </div>
    </Card>
  );
};
