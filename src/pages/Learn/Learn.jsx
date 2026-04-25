import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Target, Shield, Coins, TrendingUp, Star, Award } from "lucide-react";

import { XPBar } from "../../components/gamification/XPBar";
import { LearningPath } from "../../components/gamification/LearningPath";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";

const lessonsData = [
   { id: "1", label: "Intro to Money", status: "completed", icon: Coins },
   { id: "2", label: "Smart Saving", status: "completed", icon: Star },
   { id: "3", label: "Budgeting Basics", status: "current", icon: Book },
   { id: "4", label: "Emergency Fund", status: "locked", icon: Shield },
   { id: "5", label: "Managing Debt", status: "locked", icon: TrendingUp },
   { id: "6", label: "Student Loans", status: "locked", icon: Target },
   { id: "7", label: "Wealth Building", status: "locked", icon: Award },
];

export default function Learn() {
   const navigate = useNavigate();
   const [selectedLesson, setSelectedLesson] = useState(null);


   const handleNodeClick = (lesson) => {
      setSelectedLesson(lesson);
   };

   return (
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto pb-12">
         {/* Learning Path Column */}
         <div className="flex-1 max-w-2xl mx-auto px-4">
            <XPBar level={7} xp={2450} totalXp={3000} />

            <section className="bg-slate-50/50 dark:bg-dark-secondary/20 rounded-3xl border-2 border-slate-100 dark:border-dark-divider shadow-inner transition-colors duration-300">
               <LearningPath lessons={lessonsData} onNodeClick={handleNodeClick} />
            </section>
         </div>

         {/* Sidebar Info Column */}
         <aside className="lg:w-80 space-y-6">
            {/* Daily Goal Card */}
            <Card variant="elevation" className="p-6 bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30 transition-colors">
               <Badge variant="primary" icon={Star} className="mb-4">Goal Tracker</Badge>
               <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-1 transition-colors">Daily Quest</h3>
               <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 transition-colors">Complete 2 lessons today to earn a streak bonus!</p>

               <div className="flex items-center gap-4 mb-4">
                  <div className="h-2 flex-1 bg-slate-200 dark:bg-dark-divider rounded-full overflow-hidden transition-colors">
                     <div className="h-full bg-primary w-1/2 rounded-full" />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest">1/2</span>
               </div>

               <Button variant="primary" className="w-full shadow-lg border-primary-dark">Upgrade Goal</Button>
            </Card>

            {/* Coach Tip Card */}
            <Card variant="outline" className="p-6 space-y-4 border-2 border-slate-50 dark:border-dark-divider transition-colors">
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-2xl">
                     <Shield size={22} strokeWidth={3} />
                  </div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none transition-colors">Coach Tip</h4>
               </div>

               <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic transition-colors">
                  "Saving is a muscle. The more you use it, the stronger it gets. Start with small, consistent habits!"
               </p>

               <Badge variant="secondary" className="w-full justify-center">Read More Tips</Badge>
            </Card>
         </aside>

         {/* Lesson Details Modal */}
         <Modal
            isOpen={!!selectedLesson}
            onClose={() => setSelectedLesson(null)}
            title={selectedLesson?.label}
            footer={
               <Button variant="primary" className="w-full h-14 text-lg" onClick={() => navigate("/learn/quiz")}>
                  Start Lesson (+50 XP)
               </Button>
            }

         >
            <div className="space-y-6 py-4">
               <div className="p-6 bg-slate-50 dark:bg-dark-secondary rounded-3xl text-center space-y-2 border-4 border-white dark:border-dark-divider shadow-inner transition-colors">
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none transition-colors">Chapter 3</p>
                  <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight tracking-tight transition-colors">Understanding Cashflow</h4>
               </div>

               <div className="space-y-2 font-bold text-slate-600 dark:text-slate-300 transition-colors">
                  <p>In this lesson, you will learn:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                     <li>Difference between needs and wants</li>
                     <li>The 50/30/20 Rule</li>
                     <li>Setting up your first bucket</li>
                  </ul>
               </div>
            </div>
         </Modal>
      </div>
   );
}
