import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MessageSquare, Info, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { ChatMessage } from "../../components/ui/ChatMessage";
import { cn } from "../../utils/cn";

import { sendMessage, getChats, getChatById, deleteChat } from "../../api/chatApi";

export default function Chat() {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [prevChats, setPrevChats] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const chatEndRef = useRef(null);

  const fetchChatList = async () => {
    try {
      const chats = await getChats();
      setPrevChats(chats || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChatList();
    if (location.state?.initialMessage) {
      setValue(location.state.initialMessage);
    }
  }, [location.state]);

  const selectChat = async (id) => {
    try {
      setChatId(id);
      const fullChat = await getChatById(id);
      setMessages(fullChat.messages || []);
    } catch (error) {
      console.error(error);
    }
  };

  const startNewChat = () => {
    setChatId(null);
    setMessages([]);
    setValue("");
  };

  const handleDeleteChat = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteChat(id);
      if (chatId === id) startNewChat();
      fetchChatList();
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    const newUserMsg = {
      id: Date.now(),
      isAi: false,
      message: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newUserMsg]);
    setValue("");
    setIsTyping(true);

    try {
      const response = await sendMessage({
        message: userMessage,
        chatId: chatId
      });

      if (response && response.response) {
        if (!chatId && response.chatId) {
          setChatId(response.chatId);
          fetchChatList();
        }

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          isAi: true,
          message: response.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] lg:h-[calc(100vh-160px)] -mt-4 -mx-4 md:-mt-8 md:-mx-10 overflow-hidden relative">

      {/* 📂 SIDEBAR (PREVIOUS CHATS) */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="bg-white dark:bg-dark-card border-r-2 border-slate-100 dark:border-dark-divider overflow-hidden flex flex-col z-30 transition-all duration-300"
      >
        <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar min-w-[320px]">
          <Button
            variant="primary"
            className="w-full h-14 rounded-2xl gap-2 shadow-lg shadow-primary/20"
            onClick={startNewChat}
          >
            <Plus size={20} strokeWidth={3} />
            <span className="font-black text-sm uppercase tracking-widest">New Session</span>
          </Button>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Previous Conversations</p>
            <div className="space-y-2">
              {prevChats.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => selectChat(chat._id)}
                  className={cn(
                    "w-full p-4 rounded-2xl flex items-center justify-between group transition-all border-2",
                    chatId === chat._id
                      ? "bg-primary/5 border-primary/20 text-primary"
                      : "bg-slate-50/50 dark:bg-dark-secondary/50 border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-secondary"
                  )}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare size={18} className={chatId === chat._id ? "text-primary" : "text-slate-300"} />
                    <span className="font-bold text-sm truncate">{chat.title || "Financial Advice"}</span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChat(chat._id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-accent transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </button>
              ))}
              {prevChats.length === 0 && (
                <div className="py-10 text-center space-y-2">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-dark-secondary rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                    <Sparkles size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-400">No previous sessions found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* 💬 MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30 dark:bg-dark-primary/30 relative">

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-6 h-12 bg-white dark:bg-dark-card border-2 border-l-0 border-slate-100 dark:border-dark-divider rounded-r-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm hidden md:flex"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Header */}
        <header className="flex items-center justify-between p-6 bg-white/70 dark:bg-dark-card/70 backdrop-blur-xl border-b-2 border-slate-100 dark:border-dark-divider z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                <Sparkles size={24} strokeWidth={3} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white dark:border-dark-card rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tighter leading-none">AI Coach</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Session</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-slate-400 md:hidden flex" onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <MessageSquare size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400">
              <Info size={20} />
            </Button>
          </div>
        </header>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 no-scrollbar">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-[40px] flex items-center justify-center mx-auto text-primary border-2 border-primary/10">
                  <Sparkles size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">How can I help you today?</h2>
                  <p className="text-slate-400 font-bold max-w-sm mx-auto">Ask me about your spending, saving goals, or financial health.</p>
                </div>
              </motion.div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <ChatMessage
                  key={m._id || m.id || i}
                  isAi={m.role === 'assistant' || m.isAi}
                  message={m.content || m.message}
                  timestamp={m.timestamp || "Just now"}
                />
              ))}
              {isTyping && <ChatMessage isAi isTyping timestamp="Just now" />}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Footer */}
        <footer className="p-6 bg-white dark:bg-dark-card border-t-2 border-slate-100 dark:border-dark-divider z-20">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-4"
            >
              <div className="flex-1 relative group">
                <Input
                  placeholder="Ask your coach anything..."
                  className="bg-slate-50 dark:bg-dark-secondary h-16 text-lg rounded-2xl border-2 border-slate-100 dark:border-dark-divider group-hover:border-primary/20 focus:border-primary transition-all pr-12"
                  value={inputValue}
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                  <MessageSquare size={20} />
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-16 h-16 p-0 shrink-0 rounded-2xl shadow-xl shadow-primary/20"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send size={24} strokeWidth={3} />
              </Button>
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
}
