import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  CreditCard,
  Sparkles,
  ArrowRight,
  Award,
  Zap,
  CheckCircle2,
  XCircle,
  Brain,
  ArrowUpRight,
  Target,
  Flame,
  LayoutGrid
} from "lucide-react";

import { cn } from "../../utils/cn";
import { Card } from "../../components/ui/Card";

import { Button } from "../../components/ui/Button";
import { StatCard } from "../../components/ui/StatCard";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Badge } from "../../components/ui/Badge";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/profileApi";
import { getBudgets } from "../../api/budgetApi";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, budgetRes] = await Promise.all([
          getProfile(),
          getBudgets()
        ]);
        setProfile(profileRes.data);
        setBudgets(budgetRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-slate-400">LOADING YOUR INTELLIGENCE...</div>;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-20"
    >
      {/* 1. HERO SECTION - EMOTIONAL SUMMARY */}
      <motion.section variants={item} className="relative overflow-hidden rounded-[3rem] bg-slate-900 dark:bg-dark-secondary p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -ml-32 -mb-32" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4 max-w-xl">
            <Badge variant="secondary" icon={Flame} className="bg-secondary/20 text-secondary border-secondary/30">
              {profile?.streak || 0} Day Streak
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
              You're <span className="text-secondary italic">crushing it</span>, {profile?.name?.split(" ")[0] || "User"}! 🚀
            </h1>
            <p className="text-lg font-bold text-slate-400 leading-relaxed">
              You've saved <span className="text-white">${(profile?.totalSavings || 0).toLocaleString()}</span> total. You're making excellent progress on your financial freedom!
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" className="h-12 px-8 rounded-2xl shadow-lg shadow-primary/30">
                View Breakdown
              </Button>
              <Button variant="ghost" className="h-12 px-8 rounded-2xl text-white hover:bg-white/10">
                Plan Next Month
              </Button>
            </div>
          </div>

          <div className="hidden lg:block w-px h-32 bg-slate-700/50" />

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Financial Health</p>
              <p className="text-4xl font-black text-secondary">742</p>
              <p className="text-[10px] font-bold text-slate-400">+12 pts this week</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Total Net Worth</p>
              <p className="text-4xl font-black text-white">${(profile?.totalSavings || 0).toLocaleString()}</p>
              <p className="text-[10px] font-bold text-slate-400">Rank: #1,452</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. KEY STATS - VISUAL HIERARCHY */}
      <motion.section variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Available Balance"
          value={`$${(profile?.totalSavings || 0).toLocaleString()}`}
          icon={Wallet}
          trend="up"
          trendValue={12}
          story="Ready for your next goal"
          color="primary"
        />
        <StatCard
          label="Monthly Spending"
          value="$2,140"
          icon={CreditCard}
          trend="down"
          trendValue={5}
          story="5.2% below budget"
          color="secondary"
        />
        <StatCard
          label="Emergency Fund"
          value="$8,200"
          icon={Target}
          story="3.2 months covered"
          color="accent"
        />
        <StatCard
          label="Knowledge Level"
          value={`Level ${Math.floor((profile?.xp || 0) / 1000) + 1}`}
          icon={Brain}
          story="Top 15% in community"
          color="warning"
        />
      </motion.section>

      {/* 3. SMART INSIGHTS - VISUAL MEANING */}
      <motion.section variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles className="text-primary" /> Intelligence Feed
            </h2>
            <button className="text-sm font-black text-primary hover:underline">View All Insights</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="highlight" className="p-6 space-y-4 border-l-8 border-secondary border-2 transition-transform hover:scale-[1.02]">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                  <TrendingUp size={24} />
                </div>
                <Badge variant="secondary">Positive</Badge>
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-800 dark:text-white">Compound Growth Alert</h4>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                  Your $2k in high-yield savings earned $12.50 this month. If you add $200/mo, you'll reach $10k in 3 years.
                </p>
              </div>
              <Button variant="primary" size="sm" className="w-full">Auto-Invest Now</Button>
            </Card>

            <Card variant="highlight" className="p-6 space-y-4 border-l-8 border-accent border-2 transition-transform hover:scale-[1.02]">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-accent/10 text-accent rounded-2xl">
                  <XCircle size={24} />
                </div>
                <Badge variant="accent">Action Required</Badge>
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-800 dark:text-white">Unused Subscription</h4>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                  We detected a $14.99 charge from "StreamBox". You haven't used this service in 45 days.
                </p>
              </div>
              <Button variant="accent" size="sm" className="w-full">Cancel Subscription</Button>
            </Card>
          </div>
        </div>

        {/* 4. PROGRESS TRACKING */}
        <div className="space-y-6">
          <div className="px-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
              <Target className="text-secondary" /> Active Goals
            </h2>
          </div>

          <Card variant="elevation" className="p-6 space-y-6">
            <div className="space-y-4">
              {budgets.length > 0 ? budgets.map((goal, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black text-slate-700 dark:text-slate-200">{goal.category}</span>
                    <span className="text-xs font-bold text-slate-400">${(goal.spent || 0).toLocaleString()} / ${(goal.amount || 0).toLocaleString()}</span>
                  </div>
                  <ProgressBar value={((goal.spent || 0) / (goal.amount || 1)) * 100} color={i % 2 === 0 ? "primary" : "secondary"} height="h-3" />
                </div>
              )) : (
                <p className="text-sm font-bold text-slate-400 text-center py-4">No active goals found. Start by setting a budget!</p>
              )}
            </div>
            <Button variant="outline" className="w-full h-12 rounded-2xl" onClick={() => navigate("/insights")}>Manage All Goals</Button>
          </Card>
        </div>
      </motion.section>

      {/* 5. CHARTS & ANALYTICS */}
      <motion.section variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Knowledge Mastery</h3>
              <p className="text-sm font-bold text-slate-400">Your performance across categories</p>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
              <LayoutGrid size={24} />
            </div>
          </div>

          <div className="space-y-5">
            {[
              { label: "Budgeting", accuracy: 85, color: "bg-primary" },
              { label: "Investing", accuracy: 42, color: "bg-secondary" },
              { label: "Saving", accuracy: 92, color: "bg-accent" },
              { label: "Taxation", accuracy: 65, color: "bg-info" },
            ].map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                  <span>{cat.label}</span>
                  <span className="text-slate-800 dark:text-white">{cat.accuracy}%</span>
                </div>
                <div className="h-4 w-full bg-slate-100 dark:bg-dark-border rounded-full overflow-hidden p-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.accuracy}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={cn("h-full rounded-full shadow-inner relative", cat.color)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="elevation" className="p-8 space-y-6 bg-gradient-to-br from-white to-slate-50 dark:from-dark-card dark:to-dark-secondary">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">AI Coach Insights</h3>
              <p className="text-sm font-bold text-slate-400">Predictive spending analysis</p>
            </div>
            <Badge variant="accent" icon={Brain}>Live Analysis</Badge>
          </div>

          <div className="p-6 bg-white dark:bg-dark-card rounded-3xl border-2 border-slate-100 dark:border-dark-border space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center shrink-0">
                <ArrowUpRight size={24} strokeWidth={3} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                  "Based on your current trajectory, you'll have <span className="text-primary font-black">$450 surplus</span> by the end of the month. I recommend moving <span className="text-secondary font-black">$300</span> to your 'Europe Trip' goal."
                </p>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">Accept Plan</Button>
                  <Button variant="ghost" size="sm">Dismiss</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card variant="outline" className="p-4 space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Monthly Savings</p>
              <p className="text-2xl font-black text-secondary">$1,452</p>
            </Card>
            <Card variant="outline" className="p-4 space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Savings Rate</p>
              <p className="text-2xl font-black text-primary">24.5%</p>
            </Card>
          </div>
        </Card>
      </motion.section>
    </motion.div>
  );
}
