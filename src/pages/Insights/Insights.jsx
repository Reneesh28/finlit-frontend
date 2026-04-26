import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, PieChart, BarChart3, Calendar, Target, Zap, Rocket, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { InsightCard } from "../../components/ui/InsightCard";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Loading } from "../../components/ui/Loading";
import { cn } from "../../utils/cn";

import { getInsights } from "../../api/insightApi";

export default function Insights() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInsights();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading fullPage />;
  if (!data) return <div className="p-20 text-center font-black text-slate-400">NO DATA AVAILABLE</div>;

  const { distribution, trends, insights } = data;

  const handleDetailedAnalysis = (insight) => {
    navigate("/chat", {
      state: {
        initialMessage: `Can you explain more about this insight: "${insight.message}"? How can I fix this?`
      }
    });
  };

  // Calculate total for percentages
  const totalSpent = distribution.reduce((sum, item) => sum + item.totalSpent, 0);

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
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Current Month Expenses</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">${trends.currentMonth.toLocaleString()}</h3>
          </div>
          <div className={cn(
            "flex items-center gap-2 transition-colors",
            trends.currentMonth > trends.previousMonth ? "text-accent" : "text-primary"
          )}>
            {trends.currentMonth > trends.previousMonth ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span className="font-black text-sm">
              {trends.previousMonth > 0
                ? `${Math.abs(((trends.currentMonth - trends.previousMonth) / trends.previousMonth) * 100).toFixed(0)}% vs last month`
                : "Baseline month"}
            </span>
          </div>
        </Card>

        <Card variant="elevation" className="flex flex-col justify-between h-48 border-l-8 border-secondary overflow-hidden relative transition-colors">
          <div className="z-10">
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Previous Month Total</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">${trends.previousMonth.toLocaleString()}</h3>
          </div>
          <div className="flex items-center gap-2 text-secondary z-10 transition-colors">
            <ShieldCheck size={20} strokeWidth={3} />
            <span className="font-black text-sm">History preserved</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16" />
        </Card>

        <Card variant="elevation" className="flex flex-col justify-between h-48 border-l-8 border-accent overflow-hidden relative transition-colors">
          <div className="z-10">
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Intelligence Status</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">{insights.length} Alerts</h3>
          </div>
          <div className="flex items-center gap-2 text-accent z-10 transition-colors">
            <Zap size={20} strokeWidth={3} />
            <span className="font-black text-sm">Actionable advice ready</span>
          </div>
        </Card>
      </section>

      {/* Main Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SVG Area Chart (Mockup) */}
        <Card variant="elevation" className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors">Spending Momentum</h3>
            <Badge variant="slate">Monthly Trend</Badge>
          </div>

          <div className="h-64 w-full relative pt-4">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="100" x2="100" y2="100" stroke="currentColor" className="text-slate-200 dark:text-dark-divider" strokeWidth="1" />

              {/* Trend Line (Normalized to container) */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
                d={`M 0 ${100 - Math.min(90, (trends.previousMonth / Math.max(trends.currentMonth, trends.previousMonth, 1000)) * 80)} L 100 ${100 - Math.min(90, (trends.currentMonth / Math.max(trends.currentMonth, trends.previousMonth, 1000)) * 80)}`}
                fill="none"
                stroke="#6366F1"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-0 right-0 flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Monthly Velocity</div>
            </div>
          </div>
        </Card>

        {/* Category Breakdown (Real Data) */}
        <Card variant="elevation" className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Category Breakdown</h3>
            <Badge variant="secondary" icon={PieChart}>Live Data</Badge>
          </div>

          <div className="space-y-6">
            {distribution.map((item, i) => {
              const percentage = totalSpent > 0 ? Math.round((item.totalSpent / totalSpent) * 100) : 0;
              const colors = ["primary", "secondary", "accent", "warning", "highlight"];
              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight transition-colors">
                    <span>{item._id}</span>
                    <span>{percentage}% (${item.totalSpent})</span>
                  </div>
                  <ProgressBar value={percentage} color={colors[i % colors.length]} height="h-3" />
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* Intelligence Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <InsightCard
            key={i}
            title={insight.severity === 'high' ? "Critical Alert" : "Financial Tip"}
            description={insight.message}
            icon={insight.type === 'warning' ? AlertTriangle : Info}
            status={insight.type === 'warning' ? (insight.severity === 'high' ? 'warning' : 'accent') : 'positive'}
            statusText={insight.severity.toUpperCase()}
            onClick={() => handleDetailedAnalysis(insight)}
          />
        ))}
        {insights.length === 0 && (
          <Card variant="outline" className="lg:col-span-3 p-12 text-center border-dashed border-4 border-slate-200">
            <Rocket className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-xl font-black text-slate-400 uppercase tracking-widest">Your finances are perfectly stable!</p>
          </Card>
        )}
      </section>
    </div>
  );
}
