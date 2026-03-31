import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Calendar, Download, PieChart } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { TransactionItem } from "../../components/ui/TransactionItem";

const mockTransactions = [
  { id: 1, title: "Whole Foods Market", category: "Shopping", amount: 154.20, type: "expense", date: "Today" },
  { id: 2, title: "Starbucks Coffee", category: "Food", amount: 12.50, type: "expense", date: "Today" },
  { id: 3, title: "Freelance Payment", category: "Income", amount: 2500.00, type: "income", date: "Yesterday" },
  { id: 4, title: "Netflix Subscription", category: "Digital", amount: 18.99, type: "expense", date: "Yesterday" },
  { id: 5, title: "Apple Store", category: "Digital", amount: 1299.00, type: "expense", date: "Oct 24" },
  { id: 6, title: "Monthly Rent", category: "Housing", amount: 1800.00, type: "expense", date: "Oct 22" },
  { id: 7, title: "Electric Bill", category: "Utilities", amount: 142.50, type: "expense", date: "Oct 20" },
  { id: 8, title: "Gas Station #42", category: "Transport", amount: 65.00, type: "expense", date: "Oct 19" },
];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Shopping", "Food", "Digital", "Housing", "Income"];

  const filteredTransactions = mockTransactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || t.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Badge variant="secondary" icon={Calendar}>History</Badge>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight transition-colors">
            Transaction <span className="text-primary italic text-2xl">Log</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold transition-colors">Keep track of every cent you earn and spend.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Download} size="sm">Export CSV</Button>
          <Button variant="primary" icon={Plus} size="sm">New Entry</Button>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by vendor or category..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-dark-card"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap transition-all duration-200 border-2 ${activeFilter === cat
                  ? "bg-primary text-white border-primary-dark shadow-md"
                  : "bg-white dark:bg-dark-card text-slate-500 dark:text-slate-400 border-slate-100 dark:border-dark-border hover:border-primary/20"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction List */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredTransactions.length > 0 ? (
            <div className="space-y-4">
              {filteredTransactions.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TransactionItem {...t} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card variant="outline" className="flex flex-col items-center justify-center p-20 text-center space-y-4 dark:border-dark-border transition-colors">
              <div className="p-4 bg-slate-50 dark:bg-dark-secondary rounded-3xl text-slate-300 dark:text-slate-600 transition-colors">
                <Search size={48} strokeWidth={3} />
              </div>
              <div className="transition-colors">
                <p className="text-xl font-black text-slate-800 dark:text-slate-100">No results found</p>
                <p className="text-slate-400 dark:text-slate-500 font-bold">Try searching for something else or adjusting your filters.</p>
              </div>
              <Button variant="secondary" onClick={() => { setSearchTerm(""); setActiveFilter("All"); }}>
                Clear All Filters
              </Button>
            </Card>
          )}
        </div>

        {/* Sidebar Summary Widget */}
        <aside className="space-y-6">
          <Card variant="elevation" className="bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary text-white rounded-2xl">
                <PieChart size={24} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors">Spending Split</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Food & Drinks", value: 450, color: "bg-orange-400" },
                { label: "Shopping", value: 320, color: "bg-amber-400" },
                { label: "Housing", value: 1200, color: "bg-blue-400" },
                { label: "Transport", value: 180, color: "bg-purple-400" },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors">
                    <span>{item.label}</span>
                    <span>${item.value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-dark-divider rounded-full overflow-hidden transition-colors">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.value / 2150) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" className="w-full mt-6">Review Full Report</Button>
          </Card>

          <Card variant="outline" className="text-center p-6 space-y-3 dark:border-dark-divider transition-colors">
            <p className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Need help?</p>
            <p className="text-slate-600 dark:text-slate-400 font-bold transition-colors">Wondering where your money goes? Ask our AI coach for a summary!</p>
            <Button variant="secondary" className="w-full">Chat with Coach</Button>
          </Card>
        </aside>
      </section>
    </div>
  );
}
