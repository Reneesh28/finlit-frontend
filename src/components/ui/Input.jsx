import { cn } from "../../utils/cn";

export const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  onIconClick, 
  className, 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 px-1 transition-colors">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors cursor-pointer"
            onClick={onIconClick}
          >
            <Icon size={20} strokeWidth={2.5} />
          </div>
        )}
        <input
          className={cn(
            "w-full bg-slate-50 dark:bg-dark-secondary border-2 border-slate-200 dark:border-dark-divider rounded-2xl p-4 font-semibold text-slate-700 dark:text-slate-200 outline-none transition-all",
            "focus:border-primary focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary/10",
            Icon && "pl-12",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs font-bold text-red-500 px-1">
          {error}
        </span>
      )}
    </div>
  );
};
