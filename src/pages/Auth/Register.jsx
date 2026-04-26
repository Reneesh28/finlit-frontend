import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, LogIn, Award, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { registerUser } from "../../api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { confirmPassword, ...registerData } = formData;
      await registerUser(registerData);
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-soft dark:bg-dark-primary flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8">
        {/* Progress Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === 1 ? 'bg-primary w-8' : 'bg-slate-300 dark:bg-slate-600'}`} />
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === 2 ? 'bg-primary w-8' : 'bg-slate-300 dark:bg-slate-600'}`} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 transition-colors">
            {step === 1 ? "Start Your Journey" : "Secure Your Account"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold transition-colors">
            {step === 1 ? "Tell us a bit about you." : "Create your secret passkey."}
          </p>
        </div>

        <Card variant="elevation" className="p-8 shadow-xl transition-colors">
          <form onSubmit={handleSubmit} className="space-y-6 transition-all duration-300">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold"
                >
                  <AlertCircle size={20} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Input
                  label="Full Name"
                  placeholder="e.g. John Doe"
                  type="text"
                  name="name"
                  icon={User}
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
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
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Input
                  label="Choose Password"
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  icon={Lock}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <Input
                  label="Confirm Password"
                  placeholder="••••••••"
                  type="password"
                  name="confirmPassword"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-14 text-lg"
              disabled={loading}
            >
              {loading ? "Initializing..." : (step === 1 ? "Next Step" : "Create Account")}
              {!loading && step === 2 && <Award size={20} className="ml-2" strokeWidth={3} />}
            </Button>

            {step === 2 && !loading && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-slate-400 dark:text-slate-500 font-black hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
              >
                Back
              </button>
            )}
          </form>

          <div className="mt-8 text-center transition-colors">
            <p className="text-slate-400 dark:text-slate-500 font-bold">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-secondary hover:text-secondary-dark transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
