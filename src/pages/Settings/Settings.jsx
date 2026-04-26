import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Shield, Bell, Moon, User, DollarSign, Target, CreditCard, Save, LogOut } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import { Loading } from "../../components/ui/Loading";
import { getProfile, setProfile } from "../../api/profileApi";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfileData] = useState({
    name: "",
    email: "",
    monthlyIncome: 0,
    savingsGoal: 0,
    fixedExpenses: 0,
    variableExpenses: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        if (res.success) {
          setProfileData({
            name: res.data.name,
            email: res.data.email,
            monthlyIncome: res.data.financials.monthlyIncome,
            savingsGoal: res.data.financials.savingsGoal,
            fixedExpenses: res.data.financials.fixedExpenses,
            variableExpenses: res.data.financials.variableExpenses,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setProfile({
        monthlyIncome: Number(profile.monthlyIncome),
        savingsGoal: Number(profile.savingsGoal),
        fixedExpenses: Number(profile.fixedExpenses),
        variableExpenses: Number(profile.variableExpenses),
      });
      alert("Settings saved successfully! ✅");
    } catch (error) {
      alert("Failed to save settings: " + error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  if (loading) return <Loading fullPage />;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Badge variant="secondary" icon={SettingsIcon}>Account Control</Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight transition-colors">
            Account <span className="text-primary italic">Settings</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold transition-colors">Manage your financial identity and preferences.</p>
        </div>
        <Button
          variant="primary"
          icon={Save}
          onClick={handleSave}
          disabled={saving}
          className="h-14 px-10 rounded-2xl shadow-xl shadow-primary/20"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Profile & Security */}
        <div className="lg:col-span-1 space-y-8">
          <Card variant="elevation" className="p-8 space-y-6">
            <div className="flex items-center gap-4 border-b-2 border-slate-50 dark:border-dark-divider pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary text-2xl font-black">
                {profile.name?.[0] || "U"}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none">{profile.name}</h3>
                <p className="text-sm font-bold text-slate-400 mt-1">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Name</label>
                <Input value={profile.name} disabled className="bg-slate-50 dark:bg-dark-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                <Input value={profile.email} disabled className="bg-slate-50 dark:bg-dark-secondary" />
              </div>
            </div>
          </Card>

          <Card variant="outline" className="p-6 space-y-4 border-dashed border-2">
            <h4 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Shield size={18} className="text-accent" /> Security Session
            </h4>
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 gap-3 rounded-xl" onClick={handleLogout}>
              <LogOut size={18} />
              Sign Out from Device
            </Button>
          </Card>
        </div>

        {/* Right Column: Financial Data */}
        <div className="lg:col-span-2 space-y-8">
          <Card variant="elevation" className="p-8 space-y-8">
            <div className="flex items-center justify-between border-b-2 border-slate-50 dark:border-dark-divider pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                  <DollarSign size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white">Financial Profile</h3>
              </div>
              <Badge variant="secondary">Syncs with AI Coach</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                  <DollarSign size={16} className="text-primary" /> Monthly Income
                </label>
                <Input
                  type="number"
                  value={profile.monthlyIncome}
                  onChange={(e) => setProfileData({ ...profile, monthlyIncome: e.target.value })}
                  className="h-14 text-lg font-bold rounded-2xl"
                />
                <p className="text-xs text-slate-400 font-bold">Your total take-home pay per month.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                  <Target size={16} className="text-secondary" /> Monthly Savings Goal
                </label>
                <Input
                  type="number"
                  value={profile.savingsGoal}
                  onChange={(e) => setProfileData({ ...profile, savingsGoal: e.target.value })}
                  className="h-14 text-lg font-bold rounded-2xl"
                />
                <p className="text-xs text-slate-400 font-bold">How much you aim to save each month.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                  <CreditCard size={16} className="text-accent" /> Fixed Expenses
                </label>
                <Input
                  type="number"
                  value={profile.fixedExpenses}
                  onChange={(e) => setProfileData({ ...profile, fixedExpenses: e.target.value })}
                  className="h-14 text-lg font-bold rounded-2xl"
                />
                <p className="text-xs text-slate-400 font-bold">Rent, bills, and recurring costs.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                  <User size={16} className="text-highlight" /> Variable Expenses
                </label>
                <Input
                  type="number"
                  value={profile.variableExpenses}
                  onChange={(e) => setProfileData({ ...profile, variableExpenses: e.target.value })}
                  className="h-14 text-lg font-bold rounded-2xl"
                />
                <p className="text-xs text-slate-400 font-bold">Food, entertainment, and shopping.</p>
              </div>
            </div>
          </Card>

          {/* Preferences Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="glass" className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-dark-secondary rounded-2xl shadow-sm text-slate-400">
                  <Bell size={24} />
                </div>
                <div>
                  <p className="font-black text-slate-800 dark:text-white">Push Notifications</p>
                  <p className="text-xs font-bold text-slate-400">Daily summaries and alerts</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </Card>

            <Card variant="glass" className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-dark-secondary rounded-2xl shadow-sm text-slate-400">
                  <Moon size={24} />
                </div>
                <div>
                  <p className="font-black text-slate-800 dark:text-white">Dynamic Dark Mode</p>
                  <p className="text-xs font-bold text-slate-400">Switch via sidebar toggle</p>
                </div>
              </div>
              <Badge variant="slate">Active</Badge>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
