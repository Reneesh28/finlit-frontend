import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Award, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { loginUser } from "../../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginUser(formData);
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
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
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold"
              >
                <AlertCircle size={20} />
                {error}
              </motion.div>
            )}

            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              name="email"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <div className="space-y-1">
              <Input
                label="Password"
                placeholder="••••••••"
                type="password"
                name="password"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
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
