'use client';

import { Heart, Droplets, ShieldCheck, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HolographicCard from "@/components/effects/HolographicCard";

const supportTiers = [
    {
        name: "Operations Plan",
        amount: 1,
        tagline: "One rupee creates the system.",
        bestFor: "Small amount help company growth",
        supports: ["Ecosystem engineering", "Zero-friction maintenance"],
        receives: ["Full operational transparency", "Design-logic verification"],
        icon: ShieldCheck,
        color: "text-blue-400",
        bg: "from-blue-500/20",
        glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    },
    {
        name: "Distribution Plan",
        amount: 5,
        tagline: "Five rupees keeps it moving.",
        bestFor: "Operational support, logistics",
        supports: ["Last-mile delivery", "Verified tracking"],
        receives: ["Visibility reports", "Digital proof access"],
        icon: Droplets,
        color: "text-teal-400",
        bg: "from-teal-500/20",
        glow: "group-hover:shadow-[0_0_40px_rgba(20,184,166,0.3)]",
    },
    {
        name: "One Bottle",
        amount: 10,
        tagline: "Ten rupees, one full bottle.",
        bestFor: "Direct water provision",
        supports: ["Clean water production", "Final distribution"],
        receives: ["Personal impact summary", "Real-time bottle counting"],
        icon: Heart,
        color: "text-rose-400",
        bg: "from-rose-500/20",
        glow: "group-hover:shadow-[0_0_40px_rgba(251,113,133,0.3)]",
    }
];

export default function SupportSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="py-32 bg-slate-950 relative overflow-hidden" id="support">
            {/* Advanced Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    style={{ y }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent blur-[150px] rounded-full animate-pulse-glow"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf620_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf620_1px,transparent_1px)] bg-[size:60px_60px]" />

                {/* Floating Orbs */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.2, 0.5, 0.2],
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-sm"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                style={{ opacity }}
                className="container mx-auto px-4 relative z-10"
            >
                <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                    >
                        <Heart className="h-4 w-4 text-rose-400 animate-neon-pulse" />
                        <span className="text-sm font-black tracking-wider text-purple-300">COMMUNITY PHILANTHROPY</span>
                        <Sparkles className="h-3 w-3 text-pink-400" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tight"
                    >
                        <span className="inline-block perspective-1000">
                            {["S", "U", "P", "P", "O", "R", "T"].map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, rotateX: -90 }}
                                    whileInView={{ opacity: 1, rotateX: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.6 }}
                                    whileHover={{ scale: 1.2, color: '#a855f7' }}
                                    className="inline-block transform-3d cursor-default"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-shimmer-wave">
                            Water Distribution
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        Simple contributions. <span className="text-teal-400 font-semibold">Clear impact</span>. Honest responsibility.
                        <br />
                        <span className="text-white/60 text-sm mt-4 block">One-time support that makes a lasting difference.</span>
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {supportTiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                        >
                            <HolographicCard intensity={0.9}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className={`group relative p-8 rounded-3xl glass-card transition-all duration-500 ${tier.glow} flex flex-col h-full transform-3d`}
                                >
                                    {/* Animated Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${tier.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.2 }}
                                            transition={{ duration: 0.6 }}
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.bg} to-transparent flex items-center justify-center mb-6 group-hover:shadow-lg`}
                                        >
                                            <tier.icon className={`h-8 w-8 ${tier.color}`} style={{ filter: 'drop-shadow(0 0 10px currentColor)' }} />
                                        </motion.div>

                                        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{tier.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-3">
                                            <span className="text-5xl font-black text-white">₹{tier.amount}</span>
                                            <span className="text-sm text-slate-500 font-bold">one-time</span>
                                        </div>

                                        <p className={`text-sm font-bold ${tier.color} italic mb-6 leading-relaxed`}>"{tier.tagline}"</p>

                                        <div className="space-y-6 flex-1">
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-black">BEST FOR</p>
                                                <p className="text-sm text-slate-300 font-medium">{tier.bestFor}</p>
                                            </div>

                                            <div className="border-t border-white/10 pt-4">
                                                <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-black flex items-center gap-2">
                                                    <Zap className="h-3 w-3" /> IMPACT
                                                </p>
                                                <ul className="space-y-2">
                                                    {tier.supports.map((s, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.5 + idx * 0.1 }}
                                                            className="text-xs text-slate-400 flex items-center gap-2"
                                                        >
                                                            <span className={`w-1.5 h-1.5 rounded-full ${tier.color.replace('text', 'bg')} animate-pulse-glow`} />
                                                            {s}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                onClick={() => window.location.href = '/receipt-generator'}
                                                className="mt-8 w-full h-12 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white border border-white/20 rounded-xl text-sm font-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                            >
                                                SELECT PLAN
                                                <TrendingUp className="h-4 w-4 ml-2" />
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </HolographicCard>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <HolographicCard intensity={0.6}>
                            <div className="glass-card p-8 rounded-2xl">
                                <h4 className="text-teal-400 font-black text-lg mb-4 flex items-center gap-2">
                                    <ShieldCheck size={20} className="animate-neon-pulse" /> Important Disclosure
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    These plans are <strong className="text-white">impact-driven contributions</strong>, not financial investments. Jala Vitarana is built on the principle of selfless giving. No equity or profit returns are provided beyond verified social impact.
                                </p>
                            </div>
                        </HolographicCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                    >
                        <HolographicCard intensity={0.6}>
                            <div className="glass-card p-8 rounded-2xl">
                                <h4 className="text-blue-400 font-black text-lg mb-4 flex items-center gap-2">
                                    <Droplets size={20} className="animate-neon-pulse" /> Transparency Rule
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Every bottle counted = distributed. Every distribution = documented. Every report = shared. If it&apos;s not shown, it&apos;s not claimed.
                                </p>
                            </div>
                        </HolographicCard>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="text-center text-slate-600 text-xs mt-16 font-mono italic"
                >
                    Support grows when trust is simple. © Jala Vitarana
                </motion.p>
            </motion.div>
        </section>
    );
}
