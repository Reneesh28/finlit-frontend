import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  BookOpen,
  ReceiptText,
  MessageSquare,
  PieChart,
  User,
  LogOut,
  Trophy,
  Zap,
  Settings as SettingsIcon,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { getProfile } from "../../api/profileApi";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Learning Path", path: "/learn" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: ReceiptText, label: "Transactions", path: "/transactions" },
  { icon: MessageSquare, label: "AI Coach", path: "/chat" },
  { icon: PieChart, label: "Insights", path: "/insights" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-dark-secondary border-r-2 border-slate-100 dark:border-dark-divider h-screen fixed left-0 top-0 z-40 transition-all duration-500">
      {/* Brand Logo */}
      <div className="p-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
            <Sparkles size={24} strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-none">
              FinLit <span className="text-primary block text-sm italic tracking-normal">Intelligence</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center justify-between px-4 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300",
                isActive
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02] z-10"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-card hover:text-primary dark:hover:text-primary"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3 relative z-10">
                  <div className={cn(
                    "p-2 rounded-xl transition-colors",
                    isActive ? "bg-white/20" : "bg-slate-100 dark:bg-dark-divider group-hover:bg-primary/10"
                  )}>
                    <item.icon size={18} strokeWidth={isActive ? 3 : 2.5} />
                  </div>
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-primary rounded-2xl -z-10"
                  />
                )}
                {isActive && <ChevronRight size={16} strokeWidth={3} className="relative z-10" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* XP Widget */}
      <div className="p-6">
        <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-dark-card dark:to-dark-elevated rounded-3xl space-y-4 shadow-xl border border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Rank {Math.floor((profile?.xp || 0) / 1000) + 1} Explorer</span>
            <div className="flex items-center gap-1 text-orange-400 font-black text-[10px] uppercase tracking-widest">
              <Zap size={10} strokeWidth={3} /> {profile?.streak || 0}d Streak
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((profile?.xp || 0) % 1000) / 10}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
            <div className="flex justify-between text-[10px] font-black text-slate-400">
              <span>Next Level</span>
              <span className="text-white">{(profile?.xp || 0) % 1000 / 10}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t-2 border-slate-50 dark:border-dark-divider space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-card hover:text-slate-600 dark:hover:text-slate-200"
            )
          }
        >
          <SettingsIcon size={18} strokeWidth={2.5} />
          Settings
        </NavLink>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-accent hover:bg-accent/5 transition-colors"
        >
          <LogOut size={18} strokeWidth={2.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
