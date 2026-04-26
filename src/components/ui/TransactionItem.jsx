import { cn } from "../../utils/cn";
import { Badge } from "./Badge";
import {
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Smartphone,
  Zap,
  CreditCard,
  DollarSign,
  Trash2
} from "lucide-react";

const categoryConfigs = {
  Shopping: { icon: ShoppingBag, color: "text-amber-500", bg: "bg-amber-50" },
  Food: { icon: Coffee, color: "text-orange-500", bg: "bg-orange-50" },
  Housing: { icon: Home, color: "text-blue-500", bg: "bg-blue-50" },
  Transport: { icon: Car, color: "text-purple-500", bg: "bg-purple-50" },
  Utilities: { icon: Zap, color: "text-cyan-500", bg: "bg-cyan-50" },
  Digital: { icon: Smartphone, color: "text-indigo-500", bg: "bg-indigo-50" },
  Income: { icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
  General: { icon: CreditCard, color: "text-slate-500", bg: "bg-slate-50" },
};

export const TransactionItem = ({
  title,
  category = "General",
  amount,
  type = "expense",
  date,
  className,
  onDelete,
  onClick
}) => {
  const config = categoryConfigs[category] || categoryConfigs.General;
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-4 bg-white dark:bg-dark-card rounded-2xl border-2 border-slate-50 dark:border-dark-border hover:border-primary/20 transition-all duration-300 group relative cursor-pointer",
        className
      )}>
      <div className="flex items-center gap-4">
        {/* Category Icon */}
        <div className={cn(
          "p-3 rounded-xl transition-colors",
          config.bg,
          "dark:bg-opacity-20"
        )}>
          <Icon size={20} className={config.color} strokeWidth={3} />
        </div>

        <div>
          <p className="font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-primary transition-colors">
            {title}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{date ? new Date(date).toLocaleDateString() : 'Recent'}</span>
            <span className="w-1 h-1 bg-slate-200 dark:bg-dark-divider rounded-full" />
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight">{category}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className={cn(
            "text-lg font-black tracking-tight",
            type === "expense" ? "text-slate-900 dark:text-slate-100" : "text-primary dark:text-primary"
          )}>
            {type === "expense" ? "-" : "+"}${Math.abs(amount).toFixed(2)}
          </p>
          <Badge variant={type === "expense" ? "slate" : "primary"} size="sm">
            {type === "expense" ? "Outflow" : "Inflow"}
          </Badge>
        </div>

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-slate-300 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={18} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
};
