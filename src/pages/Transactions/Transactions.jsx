import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Calendar, Download, PieChart, Inbox, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { TransactionItem } from "../../components/ui/TransactionItem";
import { cn } from "../../utils/cn";

import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from "../../api/transactionApi";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [newTx, setNewTx] = useState({
    title: "",
    amount: "",
    category: "Shopping",
    type: "expense"
  });

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      if (editingTx) {
        await updateTransaction(editingTx._id || editingTx.id, {
          ...newTx,
          amount: parseFloat(newTx.amount)
        });
      } else {
        await addTransaction({
          ...newTx,
          amount: parseFloat(newTx.amount)
        });
      }
      setIsModalOpen(false);
      setEditingTx(null);
      setNewTx({ title: "", amount: "", category: "Shopping", type: "expense" });
      fetchTransactions();
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setNewTx({
      title: tx.title,
      amount: tx.amount.toString(),
      category: tx.category,
      type: tx.type
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        fetchTransactions();
      } catch (error) {
        alert(error);
      }
    }
  };

  const categories = ["All", "Shopping", "Food", "Digital", "Housing", "Income"];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || t.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpenses;

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-slate-400">LOADING YOUR LEDGER...</div>;

  return (
    <div className="space-y-10 pb-20">
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="secondary" icon={Calendar} className="bg-secondary/10 text-secondary border-secondary/20">Financial History</Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-none transition-colors">
            Transaction <span className="text-primary italic">Ledger</span>
          </h1>
          <p className="text-lg font-bold text-slate-500 dark:text-slate-400 transition-colors">Every cent tells a story. Track yours here.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" icon={Download} className="h-12 px-6 rounded-2xl dark:text-slate-400">Export</Button>
          <Button variant="primary" icon={Plus} className="h-12 px-8 rounded-2xl shadow-lg shadow-primary/30" onClick={() => setIsModalOpen(true)}>Add Entry</Button>
        </div>
      </header>

      {/* 2. SUMMARY CARDS - VISUAL HIERARCHY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevation" className="p-6 border-l-8 border-secondary flex justify-between items-center bg-gradient-to-br from-white to-secondary/5 dark:from-dark-card dark:to-secondary/5">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Income</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white">${totalIncome.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
            <ArrowUpRight size={24} strokeWidth={3} />
          </div>
        </Card>
        <Card variant="elevation" className="p-6 border-l-8 border-accent flex justify-between items-center bg-gradient-to-br from-white to-accent/5 dark:from-dark-card dark:to-accent/5">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Expenses</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white">${totalExpenses.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-accent/10 text-accent rounded-2xl">
            <ArrowDownRight size={24} strokeWidth={3} />
          </div>
        </Card>
        <Card variant="premium" className="p-6 flex justify-between items-center shadow-primary/20">
          <div>
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Net Savings</p>
            <p className="text-3xl font-black text-white">${netSavings.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-white/20 text-white rounded-2xl">
            <PieChart size={24} strokeWidth={3} />
          </div>
        </Card>
      </section>

      {/* 3. SEARCH & FILTERS */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by vendor, category, or amount..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-dark-card h-14 text-lg rounded-2xl border-2"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border-2",
                  activeFilter === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-dark-card text-slate-400 dark:text-slate-500 border-slate-100 dark:border-dark-border hover:border-primary/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRANSACTION LIST & ANALYTICS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Recent Movements</h2>
            <span className="text-xs font-bold text-slate-400">{filteredTransactions.length} results</span>
          </div>

          {filteredTransactions.length > 0 ? (
            <div className="space-y-3">
              {filteredTransactions.map((t, index) => (
                <motion.div
                  key={t._id || t.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TransactionItem
                    {...t}
                    onDelete={() => handleDelete(t._id || t.id)}
                    onClick={() => handleEdit(t)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card variant="outline" className="flex flex-col items-center justify-center p-24 text-center space-y-6 border-dashed border-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse" />
                <div className="relative p-6 bg-slate-50 dark:bg-dark-secondary rounded-[2.5rem] text-slate-300 dark:text-slate-700">
                  <Inbox size={64} strokeWidth={1.5} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">Silence in the ledger...</p>
                <p className="text-slate-400 dark:text-slate-500 font-bold max-w-xs mx-auto">We couldn't find any transactions matching "{searchTerm}". Try clearing filters!</p>
              </div>
              <Button variant="secondary" className="px-10 h-12 rounded-2xl" onClick={() => { setSearchTerm(""); setActiveFilter("All"); }}>
                Reset View
              </Button>
            </Card>
          )}
        </div>

        {/* 5. SIDEBAR WIDGETS */}
        <aside className="space-y-6">
          <Card variant="highlight" className="p-8 space-y-6 border-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <PieChart size={24} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Spending Split</h3>
            </div>

            <div className="space-y-6">
              {["Housing", "Food", "Shopping", "Transport"].map((cat, i) => {
                const total = transactions
                  .filter(t => t.category === cat)
                  .reduce((sum, t) => sum + t.amount, 0);
                const colors = ["bg-primary", "bg-secondary", "bg-warning", "bg-accent"];

                return (
                  <div key={cat} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      <span>{cat}</span>
                      <span className="text-slate-900 dark:text-white">${total.toLocaleString()}</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 dark:bg-dark-divider rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${totalExpenses > 0 ? (total / totalExpenses) * 100 : 0}%` }}
                        className={cn("h-full rounded-full shadow-inner", colors[i])}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="primary" className="w-full h-12 rounded-2xl mt-4">Download Detailed Report</Button>
          </Card>

          <Card variant="glass" className="p-8 text-center space-y-4 border-2 border-slate-100">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mx-auto">
              <ArrowDownRight size={32} strokeWidth={3} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-800 dark:text-white leading-none">Smart Advice</h4>
              <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                "Your 'Shopping' expenses are up 12% this week. Redirecting $50 to your savings would maintain your streak!"
              </p>
            </div>
            <Button variant="outline" className="w-full h-12 rounded-2xl border-accent/20 text-accent hover:bg-accent/5">Ask Coach Why</Button>
          </Card>
        </aside>
      </section>

      {/* 6. ADD TRANSACTION MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTx(null);
          setNewTx({ title: "", amount: "", category: "Shopping", type: "expense" });
        }}
        title={editingTx ? "Modify Entry" : "Add New Transaction"}
      >
        <form onSubmit={handleAddTransaction} className="space-y-6 py-4">
          <Input
            label="Transaction Title"
            placeholder="e.g. Monthly Rent"
            value={newTx.title}
            onChange={(e) => setNewTx({ ...newTx, title: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount ($)"
              type="number"
              placeholder="0.00"
              value={newTx.amount}
              onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-500 px-1">Type</label>
              <select
                className="w-full bg-slate-50 dark:bg-dark-secondary border-2 border-slate-200 dark:border-dark-divider rounded-2xl p-4 font-semibold text-slate-700 dark:text-slate-200 outline-none"
                value={newTx.type}
                onChange={(e) => setNewTx({ ...newTx, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-500 px-1">Category</label>
            <select
              className="w-full bg-slate-50 dark:bg-dark-secondary border-2 border-slate-200 dark:border-dark-divider rounded-2xl p-4 font-semibold text-slate-700 dark:text-slate-200 outline-none"
              value={newTx.category}
              onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
            >
              {categories.filter(c => c !== "All").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <Button variant="primary" type="submit" className="w-full h-14 text-lg">
            {editingTx ? "Update Transaction" : "Record Transaction"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
