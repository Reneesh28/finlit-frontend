import { motion } from "framer-motion";
import { Trophy, Medal, Crown, ArrowUp, ArrowDown, Minus, Zap, Search } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", xp: 12450, streak: 42, trend: "up", isUser: false },
  { rank: 2, name: "Alex Rivera", xp: 11200, streak: 15, trend: "same", isUser: true },
  { rank: 3, name: "James Wilson", xp: 9800, streak: 28, trend: "down", isUser: false },
  { rank: 4, name: "Emily Blunt", xp: 8500, streak: 12, trend: "up", isUser: false },
  { rank: 5, name: "Michael Scott", xp: 7200, streak: 3, trend: "down", isUser: false },
  { rank: 6, name: "Pam Beesly", xp: 6800, streak: 7, trend: "up", isUser: false },
  { rank: 7, name: "Jim Halpert", xp: 6500, streak: 5, trend: "same", isUser: false },
  { rank: 8, name: "Dwight Schrute", xp: 6100, streak: 30, trend: "up", isUser: false },
];

export default function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Badge variant="accent" icon={Trophy}>Global Ranking</Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Hall of Fame</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Top performers in the FinLit community</p>
        </div>

        <div className="relative w-full md:w-72">
          <Input
            placeholder="Search players..."
            icon={Search}
          />

        </div>
      </header>

      {/* Top 3 Podium */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-8">
        {/* Rank 2 */}
        <div className="order-2 md:order-1">
          <PodiumCard user={leaderboardData[1]} height="h-48" medal={<Medal className="text-slate-400" size={32} />} />
        </div>
        {/* Rank 1 */}
        <div className="order-1 md:order-2">
          <PodiumCard user={leaderboardData[0]} height="h-64" medal={<Crown className="text-amber-400" size={48} />} isGold />
        </div>
        {/* Rank 3 */}
        <div className="order-3 md:order-3">
          <PodiumCard user={leaderboardData[2]} height="h-40" medal={<Medal className="text-amber-700" size={32} />} />
        </div>
      </section>

      {/* List View */}
      <Card variant="elevation" className="overflow-hidden border-2 border-slate-100 dark:border-dark-divider">
        <div className="bg-slate-50 dark:bg-dark-secondary/50 p-4 grid grid-cols-12 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b-2 border-slate-100 dark:border-dark-divider">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-6 pl-4">Player</div>
          <div className="col-span-2 text-center">Streak</div>
          <div className="col-span-3 text-right pr-4">Total XP</div>
        </div>

        <div className="divide-y-2 divide-slate-50 dark:divide-dark-divider">
          {leaderboardData.slice(3).map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-4 grid grid-cols-12 items-center hover:bg-slate-50 dark:hover:bg-dark-secondary/30 transition-colors ${user.isUser ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
            >
              <div className="col-span-1 text-center font-black text-slate-400">{user.rank}</div>
              <div className="col-span-6 pl-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-dark-divider flex items-center justify-center font-black text-slate-500">
                  {user.name.charAt(0)}
                </div>
                <span className={`font-black tracking-tight ${user.isUser ? 'text-primary' : 'text-slate-700 dark:text-slate-200'}`}>
                  {user.name} {user.isUser && "(You)"}
                </span>
              </div>
              <div className="col-span-2 flex justify-center items-center gap-1 font-bold text-orange-500">
                <Zap size={14} strokeWidth={3} />
                {user.streak}d
              </div>
              <div className="col-span-3 text-right pr-4 font-black text-slate-900 dark:text-white">
                {user.xp.toLocaleString()} XP
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PodiumCard({ user, height, medal, isGold }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <div className="mb-4 relative">
        {medal}
        <div className={`w-20 h-20 rounded-3xl border-4 ${isGold ? 'border-amber-400 shadow-lg shadow-amber-400/20' : 'border-white dark:border-dark-divider'} bg-slate-200 dark:bg-dark-secondary flex items-center justify-center font-black text-2xl text-slate-500 overflow-hidden`}>
          {user.name.charAt(0)}
        </div>
      </div>
      <Card variant="elevation" className={`w-full ${height} flex flex-col items-center justify-center p-6 space-y-2 border-2 ${isGold ? 'border-amber-400/30 bg-amber-500/5' : 'border-slate-100 dark:border-dark-divider'}`}>
        <span className="font-black text-slate-800 dark:text-white text-center leading-tight">{user.name}</span>
        <div className="flex items-center gap-1 text-primary font-black text-sm">
          {user.xp.toLocaleString()} XP
        </div>
        <div className="flex items-center gap-1 text-orange-500 font-black text-xs uppercase tracking-widest">
          <Zap size={12} strokeWidth={3} /> {user.streak} day streak
        </div>

        <div className="mt-4">
          {user.trend === "up" && <ArrowUp className="text-green-500" size={20} />}
          {user.trend === "down" && <ArrowDown className="text-red-500" size={20} />}
          {user.trend === "same" && <Minus className="text-slate-400" size={20} />}
        </div>
      </Card>
    </motion.div>
  );
}
