import { Link } from "react-router-dom";
import { Settings as SettingsIcon, LogIn, UserPlus, Shield, Bell, Moon } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export default function Settings() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-2">
        <Badge variant="secondary" icon={SettingsIcon}>Preferences</Badge>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold transition-colors">Customize your coaching experience.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Access / Preview Buttons (User Requested) */}
        <Card variant="elevation" className="space-y-4 border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 transition-colors">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-colors">
            <Shield size={22} className="text-primary" strokeWidth={3} />
            Auth Previews
          </h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 transition-colors">
            Easily navigate to the authentication screens for testing and onboarding.
          </p>
          <div className="grid grid-cols-1 gap-3">
            <Link to="/auth/login" className="w-full">
              <Button variant="primary" className="w-full justify-start gap-3">
                <LogIn size={20} strokeWidth={3} />
                View Login Page
              </Button>
            </Link>
            <Link to="/auth/register" className="w-full">
              <Button variant="secondary" className="w-full justify-start gap-3">
                <UserPlus size={20} strokeWidth={3} />
                View Register Page
              </Button>
            </Link>
          </div>
        </Card>

        {/* Typical Settings Placeholder */}
        <Card variant="elevation" className="space-y-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-colors">
            <Bell size={22} className="text-accent" strokeWidth={3} />
            Notifications
          </h2>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-dark-secondary rounded-2xl border-2 border-slate-100 dark:border-dark-divider transition-colors">
                <span className="font-bold text-slate-700 dark:text-slate-200">Daily Reminders</span>
                <div className="w-12 h-6 bg-primary rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                </div>
             </div>
             <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-dark-secondary rounded-2xl border-2 border-slate-100 dark:border-dark-divider transition-colors">
                <span className="font-bold text-slate-700 dark:text-slate-200">Goal Milestones</span>
                <div className="w-12 h-6 bg-primary rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                </div>
             </div>
          </div>
        </Card>
      </section>

      <Card variant="outline" className="flex items-center justify-between p-6 dark:border-dark-divider transition-colors">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-100 dark:bg-dark-secondary rounded-2xl text-slate-500 dark:text-slate-400 transition-colors">
            <Moon size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-black text-slate-800 dark:text-slate-100 transition-colors">Dark Mode</p>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 transition-colors">Available via sidebar toggle! ✅</p>
          </div>
        </div>
        <Badge variant="slate">Experimental</Badge>
      </Card>
    </div>
  );
}
