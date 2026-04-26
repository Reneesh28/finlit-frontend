import { cn } from "../../utils/cn";
import { Card } from "./Card";
import { Badge } from "./Badge";

export const InsightCard = ({
  title,
  description,
  icon: Icon,
  status = "neutral",
  statusText,
  className,
  onClick
}) => {
  const statusColors = {
    positive: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30",
    negative: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30",
    neutral: "bg-slate-100 dark:bg-dark-secondary text-slate-600 dark:text-slate-400 border-slate-200 dark:border-dark-divider",
    accent: "bg-accent/10 dark:bg-accent/20 text-accent border-accent/20",
  };

  return (
    <Card className={cn("flex flex-col gap-4 border-2 border-slate-50 dark:border-dark-border", className)}>
      <div className="flex items-center justify-between">
        <div className="p-3 bg-slate-50 dark:bg-dark-secondary rounded-2xl text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {statusText && (
          <div className={cn(
            "px-2 py-1 rounded-lg text-xs font-black uppercase tracking-wider border",
            statusColors[status]
          )}>
            {statusText}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{title}</h4>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>

      <div className="mt-2 pt-4 border-t-2 border-slate-50 dark:border-dark-divider">
        <button
          onClick={onClick}
          className="text-xs font-black text-primary uppercase tracking-widest hover:text-primary-dark transition-colors cursor-pointer"
        >
          View Detail Analysis →
        </button>
      </div>
    </Card>
  );
};
