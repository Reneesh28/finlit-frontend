import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, Award } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulation
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-bg-soft dark:bg-dark-primary flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Greeting */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 bg-primary/10 dark:bg-primary/20 rounded-[2rem] text-primary mb-2 transition-colors">
            <Award size={48} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">Welcome Back!</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold transition-colors">Your financial journey continues here.</p>
        </div>

        <Card variant="elevation" className="p-8 shadow-xl transition-colors">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              icon={Mail}
              required
            />

            <div className="space-y-1">
              <Input
                label="Password"
                placeholder="••••••••"
                type="password"
                icon={Lock}
                required
              />
              <div className="text-right">
                <button type="button" className="text-sm font-black text-primary hover:text-primary-dark transition-colors">
                  Forgot Password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <LogIn size={20} className="ml-2" strokeWidth={3} />}
            </Button>
          </form>

          <div className="mt-8 text-center transition-colors">
            <p className="text-slate-400 dark:text-slate-500 font-bold">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-secondary hover:text-secondary-dark transition-colors"
              >
                Start Your Journey
              </Link>
            </p>
          </div>
        </Card>

        {/* Gamified Footer Info */}
        <div className="text-center">
          <Badge variant="slate" className="font-bold">
            🛡️ Your data is encrypted and secure.
          </Badge>
        </div>
      </div>
    </div>
  );
}
