import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, PieChart, BarChart3, Calendar, Target, Zap, Rocket, ShieldCheck } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { InsightCard } from "../../components/ui/InsightCard";
import { ProgressBar } from "../../components/ui/ProgressBar";

export default function Insights() {
  const chartData = [
    { day: "Mon", income: 100, expense: 80 },
    { day: "Tue", income: 120, expense: 90 },
    { day: "Wed", income: 110, expense: 120 },
    { day: "Thu", income: 130, expense: 100 },
    { day: "Fri", income: 150, expense: 140 },
    { day: "Sat", income: 140, expense: 160 },
    { day: "Sun", income: 160, expense: 120 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Badge variant="accent" icon={BarChart3}>Analysis</Badge>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight transition-colors">
            Smart <span className="text-secondary italic text-2xl">Insights</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold transition-colors">Deep diving into your spending patterns.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Calendar} size="sm">Monthly View</Button>
          <Button variant="primary" icon={Target} size="sm">Plan Budget</Button>
        </div>
      </header>

      {/* High-Level Comparison */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card variant="elevation" className="flex flex-col justify-between h-48 border-l-8 border-primary transition-colors">
          <div>
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Total Income</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">$12,450.20</h3>
          </div>
          <div className="flex items-center gap-2 text-primary transition-colors">
            <TrendingUp size={20} strokeWidth={3} />
            <span className="font-black text-sm">+15% from last month</span>
          </div>
        </Card>

        <Card variant="elevation" className="flex flex-col justify-between h-48 border-l-8 border-warning transition-colors">
          <div>
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Total Expenses</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">$8,210.50</h3>
          </div>
          <div className="flex items-center gap-2 text-warning transition-colors">
            <TrendingDown size={20} strokeWidth={3} />
            <span className="font-black text-sm">-5% from last month</span>
          </div>
        </Card>

        <Card variant="elevation" className="flex flex-col justify-between h-48 border-l-8 border-secondary overflow-hidden relative transition-colors">
          <div className="z-10">
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Net Savings</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">$4,239.70</h3>
          </div>
          <div className="flex items-center gap-2 text-secondary z-10 transition-colors">
            <Rocket size={20} strokeWidth={3} />
            <span className="font-black text-sm">On path to your goal!</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16" />
        </Card>
      </section>

      {/* Main Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SVG Area Chart (Mockup) */}
        <Card variant="elevation" className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors">Spending vs Income</h3>
            <Badge variant="slate">Last 7 Days</Badge>
          </div>

          <div className="h-64 w-full relative pt-4">
            {/* SVG Chart Placeholder */}
            <svg className="w-full h-full overflow-visible">
              {/* Legend / Axes */}
              <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" className="text-slate-200 dark:text-dark-divider transition-colors" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="0" y1="100%" x2="100%" y2="100%" stroke="currentColor" className="text-slate-200 dark:text-dark-divider transition-colors" strokeWidth="2" />

              {/* Income Path */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
                d="M 0 180 Q 50 160, 100 170 T 200 140 T 300 150 T 400 120 T 500 130"
                fill="none"
                stroke="#22C55E"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Expense Path */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                d="M 0 220 Q 50 200, 100 210 T 200 230 T 300 200 T 400 215 T 500 190"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            {/* Floating Labels */}
            <div className="absolute top-0 right-0 flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 transition-colors">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Income</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Expense</div>
            </div>
          </div>
        </Card>

        {/* Category Breakdown (Bar Chart Style) */}
        <Card variant="elevation" className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Category Breakdown</h3>
            <Badge variant="secondary" icon={PieChart}>Details</Badge>
          </div>

          <div className="space-y-6">
            {[
              { label: "Housing & Utilities", value: 45, color: "primary" },
              { label: "Food & Groceries", value: 25, color: "secondary" },
              { label: "Entertainment", value: 15, color: "accent" },
              { label: "Transport", value: 10, color: "warning" },
              { label: "Others", value: 5, color: "highlight" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight transition-colors">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <ProgressBar value={item.value} color={item.color} height="h-3" />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Intelligence Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCard
          title="Predictive Savings"
          description="At your current saving rate, you will reach your 'Car Fund' goal in 4 months instead of 6!"
          icon={Rocket}
          status="positive"
          statusText="Ahead of Target"
        />
        <InsightCard
          title="Subscription Alert"
          description="You have 3 recurring subscriptions that you haven't interacted with in 30 days. Save $45/mo by canceling."
          icon={Zap}
          status="warning"
          statusText="Save $45/mo"
        />
        <InsightCard
          title="Safety Net Found"
          description="You've officially covered 3 months of basic expenses. You're now in the top 10% of users!"
          icon={ShieldCheck}
          status="accent"
          statusText="Milestone reached"
        />
      </section>
    </div>
  );
}
