import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, LogIn, Award } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/ui/ProgressBar"; // Fixed name

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setLoading(true);
    // Simulation
    setTimeout(() => setLoading(false), 2000);
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
            {step === 1 ? (
              <>
                <Input 
                  label="Full Name"
                  placeholder="e.g. John Doe"
                  type="text"
                  icon={User}
                  required
                />
                <Input 
                  label="Email Address"
                  placeholder="name@example.com"
                  type="email"
                  icon={Mail}
                  required
                />
              </>
            ) : (
              <>
                <Input 
                  label="Choose Password"
                  placeholder="••••••••"
                  type="password"
                  icon={Lock}
                  required
                />
                 <Input 
                  label="Confirm Password"
                  placeholder="••••••••"
                  type="password"
                  icon={Lock}
                  required
                />
              </>
            )}

            <Button 
              type="submit" 
              className="w-full h-14 text-lg" 
              disabled={loading}
            >
              {loading ? "Initializing..." : (step === 1 ? "Next Step" : "Create Account")}
              {!loading && step === 2 && <Award size={20} className="ml-2" strokeWidth={3} />}
            </Button>
            
            {step === 2 && (
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
