import { motion } from "framer-motion";
import { User, Award, Zap, Target, Star, Shield, TrendingUp, Settings, LogOut, Heart, Diamond } from "lucide-react";
import { cn } from "../../utils/cn";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { BadgeItem } from "../../components/gamification/BadgeItem";

export default function Profile() {
   const badges = [
      { label: "Early Bird", description: "Saved $100 in your first week", icon: Zap, date: "Oct 12" },
      { label: "Budget Master", description: "Stayed under budget for 30 days", icon: Shield, date: "Sep 28" },
      { label: "Goal Getter", description: "Reached your first savings goal", icon: Target, date: "Aug 15" },
      { label: "High Roller", description: "Saved over $10k total", icon: Diamond, locked: true },
      { label: "Safe Haven", description: "Built a 3-month emergency fund", icon: Heart, locked: true },
      { label: "Crypto King", description: "Invested in 5+ diverse assets", icon: Star, locked: true },
   ];

   return (
      <div className="space-y-8 pb-12 transition-colors duration-300">
         {/* Profile Hero Section */}
         <section className="relative">
            <Card variant="elevation" className="p-8 md:p-12 overflow-hidden border-b-8 border-primary-dark dark:border-dark-divider shadow-2xl transition-colors">
               <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  {/* Avatar Holder */}
                  <div className="relative group">
                     <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-100 dark:bg-dark-secondary border-8 border-white dark:border-dark-card shadow-xl flex items-center justify-center overflow-hidden transition-colors">
                        <User size={64} className="text-slate-300 dark:text-slate-600" strokeWidth={2.5} />
                     </div>
                     <div className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl border-4 border-white dark:border-dark-card shadow-lg transition-colors">
                        <Award size={24} strokeWidth={3} />
                     </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center md:text-left space-y-4">
                     <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-2 transition-colors">Alex Johnson</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                           <Badge variant="primary">Level 7 Expert</Badge>
                           <Badge variant="secondary">Pro Member</Badge>
                           <Badge variant="accent">Top 5% Saver</Badge>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <div className="flex justify-between items-end text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors">
                           <span>Experience Points (XP)</span>
                           <span>2,450 / 3,000</span>
                        </div>
                        <ProgressBar value={82} color="primary" height="h-6" />
                     </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                     <Button variant="secondary" icon={Settings} className="w-full md:w-auto">Account Settings</Button>
                     <Button variant="primary" icon={LogOut} className="w-full md:w-auto">Sign Out</Button>
                  </div>
               </div>

               {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full -mr-32 -mt-32 pointer-events-none transition-colors" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 dark:bg-secondary/10 rounded-full -ml-16 -mb-16 pointer-events-none transition-colors" />
            </Card>
         </section>

         {/* Gamified Stats Row */}
         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
               { label: "Saving Streak", value: "5 Days", icon: Zap, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
               { label: "Total Saved", value: "$45.2k", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10 dark:bg-primary/20" },
               { label: "Achievements", value: "12 / 48", icon: Award, color: "text-secondary", bg: "bg-secondary/10 dark:bg-secondary/20" },
               { label: "Global Rank", value: "#1,452", icon: Star, color: "text-accent", bg: "bg-accent/10 dark:bg-accent/20" },
            ].map((stat, i) => (
               <Card key={i} variant="outline" className="flex items-center gap-4 p-4 border-2 border-slate-50 dark:border-dark-divider hover:border-primary/20 dark:hover:border-primary/40 transition-all cursor-pointer">
                  <div className={cn("p-3 rounded-2xl transition-colors", stat.bg, stat.color)}>
                     <stat.icon size={24} strokeWidth={3} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 transition-colors">{stat.label}</p>
                     <p className="text-xl font-black text-slate-800 dark:text-slate-100 transition-colors">{stat.value}</p>
                  </div>
               </Card>
            ))}
         </section>

         {/* Badge Gallery */}
         <section className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors">Badge Gallery</h3>
               <p className="text-sm font-bold text-slate-400 dark:text-slate-500 italic transition-colors">Collect them all to level up! 🚀</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
               {badges.map((badge, i) => (
                  <BadgeItem key={i} {...badge} />
               ))}
            </div>
         </section>

         {/* Financial Personality Card */}
         <section>
            <Card variant="elevation" className="bg-accent/5 dark:bg-accent/10 border-2 border-accent/20 dark:border-accent/30 p-8 space-y-6 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="p-4 bg-accent text-white rounded-3xl shadow-xl transition-colors">
                     <Shield size={32} strokeWidth={3} />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-1 transition-colors">The Cautious Planner</h3>
                     <Badge variant="accent">Current Personality Type</Badge>
                  </div>
               </div>

               <p className="text-lg font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl transition-colors">
                  You prioritize security and long-term stability. You've consistently maintained a 3-month safety net and rarely overspend on impulse purchases. Your discipline is in the top 10% of users!
               </p>

               <div className="pt-6 border-t-2 border-accent/10 dark:border-accent/20 transition-colors">
                  <Button variant="accent" className="w-full md:w-auto">View Personality Breakdown</Button>
               </div>
            </Card>
         </section>
      </div>
   );
}
