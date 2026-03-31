import { Star } from "lucide-react";
import { ProgressBar } from "../ui/ProgressBar";
import { Card } from "../ui/Card";

export const XPBar = ({ level = 7, xp = 2450, totalXp = 3000 }) => {
  const progress = (xp / totalXp) * 100;

  return (
    <Card className="sticky top-0 z-30 flex items-center gap-4 p-4 shadow-xl border-b-4 border-slate-100 dark:border-dark-divider bg-white/95 dark:bg-dark-card/95 backdrop-blur-md rounded-b-3xl mb-8 transition-colors duration-300">
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary text-white shadow-lg border-b-4 border-secondary-dark shrink-0">
        <Star size={24} fill="currentColor" />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-end">
          <span className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">
            Level {level}
          </span>
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {xp} / {totalXp} XP
          </span>
        </div>
        <ProgressBar value={progress} color="secondary" height="h-4" />
      </div>
    </Card>
  );
};
