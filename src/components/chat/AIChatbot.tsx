'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

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

  water: 'Free water bottles! Download voucher using phone + location.',
  voucher: 'Scroll down → Enter phone → Pick location → Download voucher.',
  get: 'Go to the Download Voucher section. Instant access!',
  download: 'Voucher downloads with a unique code. Show it at the center.',
  code: 'Each voucher has a unique code, valid for 7 days.',
  collect: 'Show the voucher code at the nearest distribution point.',
  valid: 'Voucher valid for 7 days from download.',

  location: 'Hyderabad, Bangalore, Mumbai, Delhi.',
  where: 'Hyderabad (4), Bangalore (2), Mumbai, Delhi.',
  near: 'Check the Download Voucher section for locations.',
  hyderabad: 'Kukatpally, Madhapur, Ameerpet, Secunderabad.',
  bangalore: 'Koramangala & Whitefield.',

  timing: 'Most locations operate 9 AM – 6 PM, Mon–Fri.',

  support: '₹10 = 1 bottle. Every contribution helps.',
  donate: 'Go to Support section to donate.',
  sponsor: 'Yes! Any amount helps provide water.',
  payment: 'UPI, cards supported. Instant receipt.',
  receipt: 'Receipt generated instantly after payment.',

  tax: "Currently no 80G. Not a registered charity yet.",
  trust: '100% transparent. Every bottle tracked.',
  track: 'Live dashboard shows real-time distribution.',
  proof: 'Photos, location & time shared publicly.',
  transparent: "If it's not shown, it's not claimed.",

  contact: `📧 jalavitarana@gmail.com
📱 +91 8096275914
Mon–Fri, 9 AM – 6 PM`,

  email: 'jalavitarana@gmail.com',
  phone: '+91 8096275914',

  founder: 'Founded by Bala Maneesh Ayanala.',
  about: 'Jala Vitarana = Water Democracy platform.',
  mission: 'Free, dignified water access for all.',
  vision: 'Clean water is a right, not a privilege.',
  free: 'Yes! 100% FREE water.',

  thanks: "You're welcome! 😊",
  thank: 'Happy to help!',
  help: 'Ask about water, vouchers, locations, or support.',

  default: `Ask me about:
• Water
• Voucher
• Locations
• Support
• Contact`,
};

const quickSuggestions = [
  'How to get a voucher?',
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) setTimeout(scrollToBottom, 100);
  }, [messages, isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const words = userMessage.toLowerCase().split(/\s+/);
    for (const key of Object.keys(botResponses)) {
      if (words.includes(key)) {
        return botResponses[key];
      }
    }
    return botResponses.default;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);

    setInputText('');
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200));

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);

    setIsTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center"
          >
            <MessageCircle />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed bottom-6 right-6 z-50 w-[340px] h-[480px] bg-slate-900 rounded-2xl flex flex-col">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between">
              <span className="text-white font-bold flex items-center gap-2">
                <Bot /> Jala Buddy
              </span>
              <button onClick={() => setIsOpen(false)}>
                <X className="text-white" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={m.sender === 'user' ? 'text-right' : 'text-left'}>
                  <p className="inline-block bg-white/10 px-3 py-2 rounded-xl text-white">
                    {m.text}
                  </p>
                </div>
              ))}
              {isTyping && <p className="text-cyan-400">Typing...</p>}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2 mb-2 flex-wrap">
                {quickSuggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
                  className="flex-1 bg-white/10 px-3 py-2 rounded-xl text-white"
                  placeholder="Type your message..."
                />
                <button onClick={() => sendMessage(inputText)}>
                  <Send className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
