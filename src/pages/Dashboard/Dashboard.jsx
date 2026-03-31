import { motion } from "framer-motion";
import { Wallet, TrendingUp, CreditCard, Sparkles, ArrowRight, Award, Zap, CheckCircle2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { StatCard } from "../../components/ui/StatCard";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Badge } from "../../components/ui/Badge";

export default function Dashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Hero Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <Badge variant="accent" icon={Zap}>Level 4 Explorer</Badge>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight transition-colors">
            Welcome back, <span className="text-primary italic text-2xl">Alex!</span> 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold transition-colors">You're on a 5-day saving streak. Keep it up!</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="hidden sm:flex">Download Report</Button>
          <Button variant="primary" size="sm">Add Expense</Button>
        </div>
      </header>

      {/* Main Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Balance"
          value="$12,450.00"
          icon={Wallet}
          trend="up"
          trendValue={12}
          color="primary"
        />
        <StatCard
          label="Monthly Spending"
          value="$2,140.00"
          icon={CreditCard}
          trend="down"
          trendValue={5}
          color="secondary"
        />
        <StatCard
          label="Savings Goal"
          value="$8,200.00"
          icon={Award}
          color="accent"
        />
      </section>

      {/* Health & Insights Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Health Score (Gauge Style) */}
        <Card variant="elevation" className="flex flex-col items-center justify-center text-center p-10 space-y-4">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 transition-colors">Financial Health Score</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Gauge Placeholder */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-100 dark:text-dark-divider" />
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-primary" strokeDasharray={500} strokeDashoffset={120} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900 dark:text-white transition-colors">742</span>
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Excellent</span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-bold px-4 transition-colors">
            Your score increased by <span className="text-primary">12 points</span> since your last budget review!
          </p>
        </Card>

        {/* AI Insight Card */}
        <Card variant="elevation" className="bg-accent/5 dark:bg-accent/10 border-accent/20 dark:border-accent/30 flex flex-col justify-between transition-colors">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-2xl text-accent">
                <Sparkles size={24} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 transition-colors">AI Coach Advice</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-bold leading-relaxed transition-colors">
              "Hey Alex! It looks like you've spent 20% less on dining out this week. If you redirect that $150 to your 'Emergency Fund', you'll reach your 3-month goal by next Friday!"
            </p>
          </div>

          <div className="mt-6 pt-6 border-t-2 border-accent/10">
            <Button variant="accent" className="w-full justify-between">
              <span>Accept Suggestion</span>
              <ArrowRight size={20} strokeWidth={3} />
            </Button>
          </div>
        </Card>
      </section>

      {/* Progress & Goals */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="elevation" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 transition-colors">Goal Progress</h3>
            <Badge variant="highlight">Car Fund</Badge>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Saved</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 transition-colors">$18,500 <span className="text-sm font-bold text-slate-400 italic">/ $25,000</span></p>
              </div>
              <p className="text-primary font-black transition-colors">74%</p>
            </div>
            <ProgressBar value={74} color="primary" height="h-6" />
          </div>
        </Card>

        <Card variant="elevation" className="space-y-4">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 transition-colors">Recent Milestones</h3>
          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: "Reached Weekly Savings Target", color: "text-green-500" },
              { icon: Award, text: "Achieved 'Budget Master' Badge", color: "text-primary" },
              { icon: Zap, text: "5-Day Streak Maintained", color: "text-orange-500" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-secondary rounded-2xl border-2 border-slate-100 dark:border-dark-divider transition-colors">
                <m.icon size={20} className={m.color} strokeWidth={3} />
                <span className="font-bold text-slate-700 dark:text-slate-200 transition-colors">{m.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </motion.div>
  );
}
