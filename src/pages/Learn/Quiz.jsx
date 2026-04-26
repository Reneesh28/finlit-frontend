import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Brain, Trophy, ChevronLeft, Sparkles as SparklesIcon, Zap, Star } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Badge } from "../../components/ui/Badge";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

import { getQuizQuestions, submitQuiz, explainAnswers } from "../../api/quizApi";

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1: quiz, 2: results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);
  const [aiExplanations, setAiExplanations] = useState([]);
  const [explaining, setExplaining] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuizQuestions(15);
        setQuestions(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQuestion.options[index] === currentQuestion.correctAnswer;
    if (isCorrect) setScore(score + 1);

    setAnswers([...answers, {
      questionId: currentQuestion._id,
      selectedAnswer: currentQuestion.options[index],
      isCorrect
    }]);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      try {
        await submitQuiz(answers);
        setCurrentStep(2); // Show results
      } catch (error) {
        console.error(error);
        setCurrentStep(2); // Still show results but log error
      }
    }
  };

  const handleShowExplanations = async () => {
    setShowExplanations(true);
    setExplaining(true);
    try {
      const res = await explainAnswers(answers);
      setAiExplanations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setExplaining(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswers([]);
    setScore(0);
    setShowExplanations(false);
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-slate-400">PREPARING YOUR CHALLENGE...</div>;

  if (currentStep === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/learn")}
        >
          <ChevronLeft className="mr-2" /> Back to Lessons
        </Button>

        <Card variant="accent" className="p-10 text-center space-y-8 bg-gradient-to-br from-primary/10 via-bg-soft to-secondary/10 border-2">
          <div className="relative mx-auto w-24 h-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-xl"
            />
            <div className="relative w-24 h-24 bg-white dark:bg-dark-card rounded-[2.5rem] shadow-xl flex items-center justify-center text-primary border-2 border-primary/20">
              <Brain size={48} strokeWidth={2.5} />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Ready to level up?</h1>
            <p className="text-lg font-bold text-slate-500 dark:text-slate-400">
              Master your financial knowledge and earn <span className="text-primary font-black">+XP</span> towards your next rank!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card variant="outline" className="p-4 text-left space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Knowledge Check</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{questions.length} Questions</p>
            </Card>
            <Card variant="outline" className="p-4 text-left space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Potential Reward</p>
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-primary" fill="currentColor" />
                <p className="text-2xl font-black text-primary">{questions.length * 10} XP</p>
              </div>
            </Card>
          </div>

          <Button variant="primary" className="w-full h-16 text-xl rounded-3xl shadow-xl shadow-primary/30" onClick={() => setCurrentStep(1)}>
            Start Challenge
          </Button>
        </Card>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 relative">
        <Celebration score={score} total={questions.length} />

        <Card variant="premium" className="p-12 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32" />

          <div className="space-y-4">
            <Badge variant="secondary" icon={Trophy} className="mx-auto bg-white/20 text-white border-white/30 px-6 py-2">Challenge Complete</Badge>
            <h2 className="text-5xl font-black tracking-tighter leading-none">
              {score === questions.length ? "Absolute Legend! 🏆" : "Fantastic Effort! ✨"}
            </h2>
          </div>

          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <p className="text-7xl font-black text-white">{score}</p>
              <p className="text-xs font-black text-white/50 uppercase tracking-widest">Correct</p>
            </div>
            <div className="w-px h-16 bg-white/20" />
            <div className="text-center">
              <p className="text-7xl font-black text-white/40">{questions.length}</p>
              <p className="text-xs font-black text-white/50 uppercase tracking-widest">Total</p>
            </div>
          </div>

          <div className="p-6 bg-white/10 rounded-[2rem] border-2 border-white/10">
            <p className="text-xl font-bold text-white/90 leading-relaxed">
              {score === questions.length
                ? "You've mastered these concepts perfectly. Your financial future looks bright!"
                : score >= questions.length / 2
                  ? "You have a solid foundation! A little more practice and you'll be a master."
                  : "Every master was once a beginner. Review the answers to grow faster!"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 relative z-10">
            <Button variant="ghost" className="flex-1 h-14 rounded-2xl text-white hover:bg-white/10" onClick={resetQuiz}>
              <RotateCcw className="mr-2" size={20} /> Try Again
            </Button>
            <Button
              variant="primary"
              className="flex-1 h-14 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 border-none shadow-xl"
              onClick={handleShowExplanations}
              disabled={explaining}
            >
              <Brain className="mr-2" size={20} /> {explaining ? "AI Thinking..." : "Review AI Explanations"}
            </Button>
          </div>
        </Card>

        {showExplanations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pt-4"
          >
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
              <SparklesIcon className="text-primary" /> Smart Review
            </h3>

            {questions.map((q, idx) => {
              const userAnswer = answers.find(a => a.questionId === q._id);
              const isCorrect = userAnswer?.isCorrect;
              const aiExp = aiExplanations.find(e => e.question === q.question);

              return (
                <Card key={q._id} variant="elevation" className={`p-8 space-y-6 border-l-8 transition-all ${isCorrect ? 'border-secondary' : 'border-accent'}`}>
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-xl font-black text-slate-800 dark:text-white leading-tight">
                      <span className="text-slate-300 dark:text-slate-600 mr-2">{idx + 1}.</span> {q.question}
                    </h4>
                    <div className={cn("p-2 rounded-xl shrink-0", isCorrect ? "bg-secondary/10 text-secondary" : "bg-accent/10 text-accent")}>
                      {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Answer</p>
                      <div className={cn("p-4 rounded-2xl font-bold border-2", isCorrect ? "bg-secondary/5 border-secondary/20 text-secondary" : "bg-accent/5 border-accent/20 text-accent")}>
                        {userAnswer?.selectedAnswer}
                      </div>
                    </div>
                    {!isCorrect && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correct Answer</p>
                        <div className="p-4 rounded-2xl font-bold border-2 bg-slate-50 dark:bg-dark-card border-slate-100 dark:border-dark-border text-slate-700 dark:text-slate-300">
                          {q.correctAnswer}
                        </div>
                      </div>
                    )}
                  </div>

                  {(aiExp || explaining) && (
                    <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-3xl border-2 border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-primary/20 text-primary rounded-lg"><Brain size={14} /></div>
                        <p className="text-xs font-black text-primary uppercase tracking-widest">AI Context</p>
                      </div>
                      <p className="text-[15px] font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        {explaining ? "AI is typing..." : `"${aiExp?.explanation}"`}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}

            <Button variant="primary" className="w-full h-16 rounded-3xl text-lg shadow-xl" onClick={() => navigate("/learn")}>
              Return to Path
            </Button>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Dynamic Header */}
      <Card variant="glass" className="p-6 md:p-8 space-y-6 border-b-4 border-primary/20">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="slate" className="bg-primary/10 text-primary border-primary/20">Budgeting Basics</Badge>
              <span className="text-xs font-bold text-slate-400">Section 3.1</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              Question {currentQuestionIndex + 1} <span className="text-slate-300 font-normal ml-1">/ {questions.length}</span>
            </h2>
          </div>
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-2 text-primary font-black justify-end">
              <Star size={16} fill="currentColor" />
              <span>{Math.round(progress)}% Mastery</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Current Session</p>
          </div>
        </div>
        <ProgressBar value={progress} color="primary" height="h-3" />
      </Card>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Card variant="elevation" className="p-8 md:p-12 space-y-10 min-h-[500px] flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white leading-[1.1] tracking-tight">
                {currentQuestion.question}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, index) => {
                  let state = "default";
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const isSelected = selectedOption === index;

                  if (isAnswered) {
                    if (isCorrect) state = "correct";
                    else if (isSelected) state = "incorrect";
                    else state = "dimmed";
                  } else if (isSelected) {
                    state = "selected";
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={!isAnswered ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={cn(
                        "w-full p-6 rounded-[2rem] text-left font-black text-lg transition-all duration-300 border-4 flex items-center justify-between group relative overflow-hidden",
                        state === "default" && "bg-white dark:bg-dark-card border-slate-100 dark:border-dark-divider hover:border-primary/50 hover:bg-primary/5 text-slate-600 dark:text-slate-300",
                        state === "selected" && "bg-primary/10 border-primary text-primary shadow-lg shadow-primary/10",
                        state === "correct" && "bg-secondary/10 border-secondary text-secondary shadow-lg shadow-secondary/10",
                        state === "incorrect" && "bg-accent/10 border-accent text-accent shadow-lg shadow-accent/10",
                        state === "dimmed" && "opacity-30 grayscale blur-[1px]"
                      )}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={cn(
                          "w-10 h-10 rounded-xl border-2 flex items-center justify-center text-sm transition-colors",
                          state === "default" && "bg-slate-50 dark:bg-dark-secondary border-slate-200 dark:border-dark-divider group-hover:border-primary",
                          state === "selected" && "bg-primary text-white border-primary",
                          state === "correct" && "bg-secondary text-white border-secondary",
                          state === "incorrect" && "bg-accent text-white border-accent"
                        )}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                      <div className="relative z-10 shrink-0">
                        {state === "correct" && <CheckCircle2 size={28} strokeWidth={3} />}
                        {state === "incorrect" && <XCircle size={28} strokeWidth={3} />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {isAnswered && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pt-8 border-t-2 border-slate-50 dark:border-dark-divider flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", currentQuestion.options[selectedOption] === currentQuestion.correctAnswer ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent")}>
                    {currentQuestion.options[selectedOption] === currentQuestion.correctAnswer ? <Trophy size={32} /> : <Brain size={32} />}
                  </div>
                  <div>
                    <p className={cn("text-xl font-black leading-none", currentQuestion.options[selectedOption] === currentQuestion.correctAnswer ? "text-secondary" : "text-accent")}>
                      {currentQuestion.options[selectedOption] === currentQuestion.correctAnswer ? "Correct Answer!" : "Not quite right..."}
                    </p>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                      {currentQuestion.options[selectedOption] === currentQuestion.correctAnswer ? "+50 XP Earned" : "Learn from AI below"}
                    </p>
                  </div>
                </div>
                <Button variant="primary" onClick={handleNext} className="w-full sm:w-auto h-14 px-10 rounded-2xl text-lg shadow-2xl shadow-primary/30">
                  {currentQuestionIndex === questions.length - 1 ? "Complete Challenge" : "Continue"} <ArrowRight className="ml-2" size={20} strokeWidth={3} />
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Footer Info */}
      <div className="flex justify-center items-center gap-2 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
        <Brain size={14} />
        <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
          Powered by FinLit Intelligence Core
        </p>
      </div>
    </div>
  );
}

const Celebration = ({ score, total }) => {
  if (score < total / 2) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            top: "100%",
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            rotate: 0,
            opacity: 1
          }}
          animate={{
            top: "-20%",
            left: `${(Math.random() * 100)}%`,
            rotate: 360,
            opacity: 0
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
          className="absolute text-2xl"
        >
          {["🎉", "✨", "💰", "💎", "🚀", "🔥"][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}
    </div>
  );
};
