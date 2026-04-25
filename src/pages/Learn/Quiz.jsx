import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Brain, Trophy, ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Badge } from "../../components/ui/Badge";
import { useNavigate } from "react-router-dom";

const mockQuestions = [
  {
    id: 1,
    question: "Which of the following is considered a 'Need' in the 50/30/20 budgeting rule?",
    options: ["Netflix Subscription", "Rent/Mortgage", "Dining Out", "New Designer Shoes"],
    correctAnswer: 1,
    explanation: "Rent or mortgage is a basic necessity for living, placing it in the 50% 'Needs' category. Subscriptions and dining out are 'Wants'."
  },
  {
    id: 2,
    question: "What is an Emergency Fund typically recommended to cover?",
    options: ["1 month of income", "3-6 months of essential expenses", "1 year of total spending", "Down payment for a car"],
    correctAnswer: 1,
    explanation: "Financial experts recommend 3-6 months of essential expenses to protect against job loss or medical emergencies."
  },
  {
    id: 3,
    question: "What does APY stand for in banking?",
    options: ["Annual Percentage Yield", "Actual Price Yearly", "Asset Profit Yield", "Annual Payment Yield"],
    correctAnswer: 0,
    explanation: "APY stands for Annual Percentage Yield, which includes the effect of compounding interest over a year."
  }
];

export default function Quiz() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1: quiz, 2: results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctAnswer;
    if (isCorrect) setScore(score + 1);

    setAnswers([...answers, {
      questionId: currentQuestion.id,
      selected: index,
      isCorrect
    }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCurrentStep(2); // Show results
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

        <Card variant="elevation" className="p-8 text-center space-y-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
            <Brain size={40} strokeWidth={2.5} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Ready for a Challenge?</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold">
              Test your knowledge on "Budgeting Basics" and earn up to 150 XP!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-white dark:bg-dark-secondary rounded-2xl border-2 border-slate-100 dark:border-dark-divider">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Questions</p>
              <p className="text-xl font-black text-slate-800 dark:text-white">{mockQuestions.length}</p>
            </div>
            <div className="p-4 bg-white dark:bg-dark-secondary rounded-2xl border-2 border-slate-100 dark:border-dark-divider">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Reward</p>
              <p className="text-xl font-black text-primary">+150 XP</p>
            </div>
          </div>

          <Button variant="primary" className="w-full h-14 text-lg" onClick={() => setCurrentStep(1)}>
            Start Quiz
          </Button>
        </Card>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <Card variant="elevation" className="p-10 text-center space-y-6 relative overflow-hidden border-2 border-primary/20">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

          <div className="space-y-2">
            <Badge variant="primary" icon={Trophy} className="mx-auto">Quiz Completed</Badge>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Great Job!</h2>
          </div>

          <div className="flex justify-center items-end gap-2">
            <span className="text-6xl font-black text-primary">{score}</span>
            <span className="text-2xl font-bold text-slate-400 mb-2">/ {mockQuestions.length}</span>
          </div>

          <p className="text-lg font-bold text-slate-600 dark:text-slate-300">
            {score === mockQuestions.length
              ? "Perfect score! You're a financial wizard! 🧙‍♂️"
              : score >= mockQuestions.length / 2
                ? "Solid performance! Keep practicing to master these concepts."
                : "Good effort! Review the explanations below to learn more."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="outline" className="flex-1 h-12" onClick={resetQuiz}>
              <RotateCcw className="mr-2" size={18} /> Try Again
            </Button>
            <Button variant="primary" className="flex-1 h-12" onClick={() => setShowExplanations(true)}>
              <Brain className="mr-2" size={18} /> Review Answers
            </Button>
          </div>
        </Card>

        {showExplanations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="text-accent" /> Detailed Review
            </h3>

            {mockQuestions.map((q, idx) => {
              const userAnswer = answers.find(a => a.questionId === q.id);
              const isCorrect = userAnswer?.isCorrect;

              return (
                <Card key={q.id} variant="outline" className={`p-6 space-y-4 border-2 transition-colors ${isCorrect ? 'border-green-100 dark:border-green-900/30' : 'border-red-100 dark:border-red-900/30'}`}>
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-lg font-black text-slate-800 dark:text-white leading-tight">
                      {idx + 1}. {q.question}
                    </h4>
                    {isCorrect ? (
                      <CheckCircle2 className="text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 shrink-0" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Your Answer</p>
                    <div className={`p-3 rounded-xl font-bold border-2 ${isCorrect ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400'}`}>
                      {q.options[userAnswer?.selected]}
                    </div>
                  </div>

                  {!isCorrect && (
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Correct Answer</p>
                      <div className="p-3 rounded-xl font-bold border-2 bg-slate-50 dark:bg-dark-secondary border-slate-200 dark:border-dark-divider text-slate-700 dark:text-slate-300">
                        {q.options[q.correctAnswer]}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border-l-4 border-primary">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Brain size={12} /> AI Explanation
                    </p>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </Card>
              );
            })}

            <Button variant="primary" className="w-full h-14" onClick={() => navigate("/learn")}>
              Finish Review
            </Button>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Budgeting Basics</p>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Question {currentQuestionIndex + 1} <span className="text-slate-400 italic">of {mockQuestions.length}</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-black text-primary uppercase tracking-widest">Progress</p>
            <p className="text-xl font-black text-slate-800 dark:text-white">{Math.round(progress)}%</p>
          </div>
        </div>
        <ProgressBar value={progress} color="primary" height="h-3" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card variant="elevation" className="p-8 space-y-8 min-h-[400px] flex flex-col justify-between">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
              {currentQuestion.question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, index) => {
                let state = "default";
                if (isAnswered) {
                  if (index === currentQuestion.correctAnswer) state = "correct";
                  else if (index === selectedOption) state = "incorrect";
                  else state = "dimmed";
                } else if (selectedOption === index) {
                  state = "selected";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswered}
                    className={`
                      w-full p-5 rounded-2xl text-left font-bold transition-all duration-200 border-2 flex items-center justify-between group
                      ${state === "default" && "bg-white dark:bg-dark-secondary border-slate-100 dark:border-dark-divider hover:border-primary/50 hover:bg-primary/5"}
                      ${state === "selected" && "bg-primary/10 border-primary text-primary"}
                      ${state === "correct" && "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400"}
                      ${state === "incorrect" && "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400"}
                      ${state === "dimmed" && "opacity-50 grayscale bg-slate-50 dark:bg-dark-secondary border-slate-100 dark:border-dark-divider"}
                    `}
                  >
                    <span>{option}</span>
                    {state === "correct" && <CheckCircle2 size={20} />}
                    {state === "incorrect" && <XCircle size={20} />}
                    {state === "default" && <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700 group-hover:border-primary/50" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pt-6 border-t-2 border-slate-50 dark:border-dark-divider flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <div className="flex items-center gap-2 text-green-600 font-black uppercase tracking-widest text-sm">
                      <CheckCircle2 size={18} /> Correct!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-sm">
                      <XCircle size={18} /> Incorrect
                    </div>
                  )}
                </div>
                <Button variant="primary" onClick={handleNext} className="w-full sm:w-auto h-12 px-8 shadow-lg shadow-primary/20">
                  {currentQuestionIndex === mockQuestions.length - 1 ? "Finish Quiz" : "Next Question"} <ArrowRight className="ml-2" size={18} />
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Footer Info */}
      <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
        FinLit AI • Powered by Advanced Financial Intelligence
      </p>
    </div>
  );
}

const Sparkles = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);
