import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MessageSquare, Info, Trash2, Maximize2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { ChatMessage } from "../../components/ui/ChatMessage";

const initialMessages = [
  { id: 1, isAi: true, message: "Hello Alex! I noticed you've been doing great with your 'Emergency Fund' goal this month. How can I help you today?", timestamp: "10:30 AM" },
  { id: 2, isAi: false, message: "Can you analyze my spending for the last 7 days?", timestamp: "10:32 AM" },
  { id: 3, isAi: true, message: "Absolutely! Looking at your transactions, you've spent approximately $450 on 'Food & Drinks', which is 15% lower than your average. You also have a recurring $18.99 charge for Netflix coming up tomorrow.", timestamp: "10:33 AM" },
];

const quickSuggestions = [
  "Analyze my spending",
  "Can I afford coffee?",
  "Check my car fund",
  "Monthly summary",
  "Savings tips"
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setValue] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      isAi: false,
      message: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newUserMsg]);
    setValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        isAi: true,
        message: "I'm processing that for you... (Integration pending backend setup!)",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  const handleQuickSuggestion = (text) => {
    setValue(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm border-b-2 border-slate-100 dark:border-dark-divider rounded-t-3xl transition-colors">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-2xl text-accent border-b-4 border-accent/20 dark:border-accent/30 transition-colors">
              <Sparkles size={24} strokeWidth={3} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white dark:border-dark-card rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none transition-colors">FinLit AI Coach</h1>
            <Badge variant="accent" size="sm" className="mt-1">Online & Ready</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Info size={20} /></button>
          <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" onClick={() => setMessages(initialMessages)}><Trash2 size={20} /></button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-2 no-scrollbar bg-slate-50/30 dark:bg-dark-primary/30 transition-colors">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <ChatMessage key={m.id} {...m} />
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <footer className="p-4 md:p-6 bg-white dark:bg-dark-card border-t-2 border-slate-100 dark:border-dark-divider rounded-b-3xl space-y-4 transition-colors">
        <div className="max-w-4xl mx-auto">
          {/* Quick Suggestions Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {quickSuggestions.map((text) => (
              <button
                key={text}
                onClick={() => handleQuickSuggestion(text)}
                className="px-4 py-2 bg-slate-50 dark:bg-dark-secondary text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest rounded-xl border-2 border-slate-100 dark:border-dark-divider hover:border-accent/40 hover:text-accent transition-all duration-200 whitespace-nowrap shadow-sm"
              >
                {text}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-3"
          >
            <div className="flex-1">
              <Input
                placeholder="Ask your coach anything..."
                className="bg-slate-50 dark:bg-dark-secondary text-base"
                value={inputValue}
                onChange={(e) => setValue(e.target.value)}
                icon={MessageSquare}
              />
            </div>
            <Button
              type="submit"
              variant="accent"
              className="w-14 h-14 p-0 shrink-0"
              disabled={!inputValue.trim()}
            >
              <Send size={24} strokeWidth={3} className="ml-1" />
            </Button>
          </form>
          <p className="text-[10px] text-center mt-3 font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest transition-colors">
            AI can make mistakes. Always verify critical data. ⚖️
          </p>
        </div>
      </footer>
    </div>
  );
}
