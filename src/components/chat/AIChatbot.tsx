'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import HolographicCard from '@/components/effects/HolographicCard';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  hello: "Hi! 👋 I'm Jala Buddy. How can I help?",
  hi: 'Hello! 😊 What do you need?',
  hey: 'Hey! 👋 Ask away!',
  good: "Good to see you! What's up?",
  water:
    'Free water bottles! Download voucher - just phone + location. No verification!',
  voucher:
    'Easy! Scroll down → Enter phone → Pick location → Download. Done! ✅',
  get: "Want water? Scroll to 'Download Voucher' section. Enter phone + location. Instant download!",
  download:
    'Voucher downloads as a text file with unique code. Show it at collection point!',
  code:
    'Each voucher has a unique code. Valid for 7 days. Show at any location!',
  collect:
    "Take your voucher code to nearest location. Show it. Get water. That's it!",
  valid: 'Vouchers valid for 7 days from download. Use anytime within that!',
  location: '8+ spots: Hyderabad, Bangalore, Mumbai, Delhi. Check the list!',
  where:
    'Hyderabad (4 spots), Bangalore (2), Mumbai, Delhi. More coming soon!',
  near: "Check 'Download Voucher' section for full location list with addresses!",
  hyderabad: 'Kukatpally, Madhapur, Ameerpet, Secunderabad - all active!',
  bangalore: 'Koramangala & Whitefield - both operational!',
  timing:
    'Most locations: 9 AM - 6 PM, Mon-Fri. Some open weekends too!',
  support:
    '₹1 = Operations | ₹5 = Distribution | ₹10 = One Bottle. Every rupee helps!',
  donate:
    "Scroll to 'Support' section. Pick amount. Simple payment. Get receipt!",
  sponsor:
    'Yes! Any amount works. ₹10 = 1 bottle for someone in need!',
  payment:
    'UPI, cards, all methods accepted. Instant receipt after payment!',
  receipt:
    'Auto-generated after payment. Downloadable PDF + WhatsApp share!',
  tax:
    "Currently no 80G. We're a transparent initiative, not registered charity yet.",
  trust:
    '100% transparent! Every bottle tracked, documented, shared publicly.',
  track:
    'Live monitoring dashboard shows real-time distributions. Check it out!',
  proof:
    'Every distribution documented with photos, location, time. All public!',
  transparent:
    "We show EVERYTHING. If it's not shown, it's not claimed. Simple!",
  contact:
    '📧 jalavitarana@gmail.com\n📱 +91 8096275914\nMon-Fri, 9 AM - 6 PM',
  email: 'jalavitarana@gmail.com - we reply within 24 hours!',
  phone: '+91 8096275914 - call Mon-Fri, 9 AM - 6 PM',
  founder:
    'Founded by Bala. He handles everything - operations, transparency, mission.',
  who:
    'Jala Vitarana = Water Distribution. Founded by Bala. Mission: Free water for all!',
  bala:
    'Bala founded Jala Vitarana. Oversees operations, distribution, transparency. Full accountability!',
  about:
    'Jala Vitarana = Water Democracy platform. Free water for all. 100% transparent. Founded by Bala.',
  company:
    'Social initiative, not a company! Mission-driven. Goal: Free water access for everyone.',
  goal:
    'Water Democracy! Make clean water free & accessible. Dignified distribution. Zero barriers.',
  goals:
    'Short-term: 8+ cities. Long-term: Pan-India. Ultimate: Water for everyone who needs it!',
  vision:
    'World where clean water is a right, not a privilege. Transparent, dignified, free!',
  mission:
    'Water Democracy! Free, dignified water access for everyone who needs it!',
  future:
    'Expanding to more cities. More sponsors. More water. Same transparency!',
  plan:
    'Grow carefully. Add locations. Keep transparency. Scale with support. Stay true!',
  growth:
    'Started small. Now 8+ locations. Growing with each sponsor. Sustainable expansion!',
  scale:
    'We scale with support! ₹10 = 1 bottle. More sponsors = more locations = more water!',
  expand:
    'Adding cities based on demand & sponsors. Next: More metros & tier-2 cities!',
  cities: 'Currently: Hyderabad, Bangalore, Mumbai, Delhi. More coming soon!',
  review:
    'Check our live monitoring! Real distributions, real impact. Transparency is our review!',
  reviews:
    "See live dashboard for real-time proof. Every bottle tracked. That's our review!",
  feedback:
    'Love to hear! Email jalavitarana@gmail.com or call +91 8096275914!',
  testimonial:
    "Our transparency speaks! Check live monitoring for real impact. Numbers don't lie!",
  free: 'Yes! 100% FREE. No cost, no catch. Water is a right!',
  why:
    "Because clean water should be free for everyone. It's that simple!",
  how: 'I can help! What do you want to know?',
  work:
    'Sponsors donate → We distribute → Everyone gets water. Transparent & simple!',
  help:
    "Ask about: Water, Vouchers, Locations, Support, Contact, Trust. What's up?",
  thanks: "You're welcome! 😊 Anything else?",
  thank: 'Happy to help! Need anything else?',
  default:
    "Ask me:\n• Water/Voucher\n• Locations\n• Support\n• Contact\n\nWhat's up?",
};

const quickSuggestions = [
  'How to get voucher?',
  'Nearest location?',
  'Is water free?',
  'How to donate?',
  'Contact details',
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Jala Buddy 💧 Ask me anything!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    const anchor = messagesEndRef.current;
    const container = messagesContainerRef.current;
    if (!anchor || !container) return;

    // force layout before scrolling
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    container.offsetHeight;

    anchor.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, []);

  // Single effect: run when messages change and chat is open
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(() => {
      scrollToBottom();
    }, 150);
    return () => clearTimeout(id);
  }, [messages, isOpen, scrollToBottom]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    return botResponses.default;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const trimmed = text.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const delay = 1200 + Math.random() * 800;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(trimmed),
      sender: 'bot',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSend = () => {
    if (!inputText.trim() || isTyping) return;
    const current = inputText;
    setInputText('');
    void sendMessage(current);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_rgba(6,182,212,0.8)] transition-all duration-300 flex items-center justify-center group"
          >
            <MessageCircle className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 h-3 w-3 md:h-4 md:w-4 rounded-full bg-green-500 border-2 border-white shadow-[0_0_10px_#22c55e]"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[320px] h-[460px] md:w-[350px] md:h-[500px] max-w-[calc(100vw-2rem)]"
          >
            <HolographicCard intensity={1.2}>
              <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col border-2 border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.4)]">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 md:p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-shimmer opacity-30" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
                      >
                        <Bot className="h-6 w-6 md:h-7 md:w-7 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-black text-base md:text-lg flex items-center gap-2">
                          Jala Buddy
                          <Sparkles className="h-4 w-4 animate-neon-pulse" />
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]" />
                          <p className="text-white/80 text-xs md:text-sm font-medium">
                            Online
                          </p>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <X className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* Messages */}
                <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-950/50 scrollbar-thin scrollbar-thumb-cyan-400/60 scrollbar-track-slate-900/50"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(6,182,212,0.6) transparent',
                  }}
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex ${
                        message.sender === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.sender === 'user'
                            ? 'flex-row-reverse'
                            : 'flex-row'
                        }`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                              : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          }`}
                        >
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 md:h-5 md:w-5 text-white" />
                          )}
                        </motion.div>

                        <div
                          className={`px-3 py-2 md:px-4 md:py-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                              : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm shadow-lg shadow-cyan-500/20'
                          }`}
                        >
                          <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line">
                            {message.text}
                          </p>
                          <p className="text-[10px] md:text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                        <Bot className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <div className="bg-white/10 border border-white/20 px-3 py-2 md:px-4 md:py-3 rounded-2xl shadow-lg shadow-cyan-500/20">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -8, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-cyan-400 shadow-md"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Anchor must be last */}
                  <div ref={messagesEndRef} className="h-px w-full" />
                </div>

                {/* Input + Quick suggestions */}
                <div className="p-3 md:p-4 bg-slate-900/50 border-t border-white/10">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {quickSuggestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => void sendMessage(q)}
                        disabled={isTyping}
                        className="text-xs md:text-[13px] px-3 py-1.5 rounded-full bg-white/5 border border-cyan-400/40 text-cyan-100 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 md:gap-3">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      disabled={isTyping}
                      className="flex-1 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputText.trim() || isTyping}
                      className="px-4 md:px-6 py-2 md:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center"
                    >
                      <Send className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
