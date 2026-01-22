"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Users, Globe, ArrowRight, Activity, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDashboard } from "@/contexts/DashboardContext";
import { useRef } from "react";
import ParticleField from "@/components/effects/ParticleField";
import HolographicCard from "@/components/effects/HolographicCard";

export default function HeroSection() {
    const { stats, loading } = useDashboard();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    const isQuotaFull = stats.totalDistributed >= stats.dailyGoal;

    const livesImpacted = (stats.totalDistributed * 5).toLocaleString();
    const litersDistributed = (stats.totalDistributed * 20).toLocaleString();

    const headlineText = "WATER FOR";
    const subHeadlineText = "EVERYONE.";

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden bg-slate-950">
            {/* Advanced Particle Field Background */}
            <div className="absolute inset-0 pointer-events-none">
                <ParticleField count={80} speed={0.3} className="absolute inset-0" />

                {/* Multi-layer Depth Glow Effects */}
                <motion.div
                    style={{ y }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] bg-gradient-radial from-teal-500/20 via-cyan-500/10 to-transparent blur-[180px] rounded-full animate-pulse-glow"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
                    className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-gradient-radial from-blue-500/15 via-purple-500/5 to-transparent blur-[120px] rounded-full animate-liquid-morph"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "70%"]) }}
                    className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 to-transparent blur-[140px] rounded-full"
                />

                {/* Advanced Grid System with Perspective */}
                <div className="absolute inset-0 perspective-2000">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a620_1px,transparent_1px),linear-gradient(to_bottom,#14b8a620_1px,transparent_1px)] bg-[size:60px_60px] transform-3d" style={{ transform: 'rotateX(60deg) translateZ(-200px)' }} />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* Floating Light Orbs */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                            y: [0, -150, 0],
                            x: [0, Math.random() * 100 - 50, 0],
                            rotate: [0, 360, 0]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 15,
                            repeat: Infinity,
                            delay: Math.random() * 8,
                            ease: "easeInOut"
                        }}
                        className="absolute rounded-full glow-cyan"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${2 + Math.random() * 4}px`,
                            height: `${2 + Math.random() * 4}px`,
                            background: `radial-gradient(circle, ${['#14b8a6', '#06b6d4', '#0891b2', '#22d3ee'][Math.floor(Math.random() * 4)]}, transparent)`
                        }}
                    />
                ))}

                {/* Scanline Effect */}
                <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm"
                />

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
            </div >

            <motion.div
                style={{ opacity, scale }}
                className="container mx-auto px-4 relative z-10"
            >
                <div className="max-w-6xl mx-auto text-center space-y-16">
                    {/* Supreme System Status with Holographic Effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex justify-center"
                    >
                        <HolographicCard intensity={0.8} className="inline-block">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/30 via-cyan-500/30 to-blue-500/30 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 animate-pulse-glow"></div>
                                <Badge variant="outline" className="relative glass-dark py-3 px-10 rounded-full border-white/20 flex gap-4 items-center backdrop-blur-ultra transition-all duration-500 group-hover:border-teal-400/60 group-hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                                    <Sparkles className="h-3 w-3 text-teal-400 animate-neon-pulse" />
                                    <span className="text-[10px] font-black tracking-[0.4em] text-slate-400">INFRASTRUCTURE STATUS:</span>
                                    {isQuotaFull ? (
                                        <span className="text-rose-400 font-black text-[10px] tracking-widest flex items-center gap-2 animate-pulse">
                                            🔴 CAPACITY MAXIMIZED
                                        </span>
                                    ) : (
                                        <span className="text-teal-400 font-black text-[10px] tracking-widest flex items-center gap-2">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500 shadow-[0_0_20px_#14b8a6]"></span>
                                            </span>
                                            🟢 SYSTEM OPERATIONAL
                                        </span>
                                    )}
                                </Badge>
                            </div>
                        </HolographicCard>
                    </motion.div>

                    {/* Ultra-Cinematic Headline with 3D Depth */}
                    <div className="space-y-8 perspective-2000">
                        <div className="overflow-hidden">
                            <motion.h1 className="text-7xl md:text-[9.5rem] font-black text-white leading-[0.8] tracking-tighter flex flex-wrap justify-center gap-x-8 transform-3d">
                                {headlineText.split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: "100%", opacity: 0, rotateX: -90 }}
                                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                        whileHover={{
                                            scale: 1.1,
                                            textShadow: "0 0 30px rgba(20, 184, 166, 0.8)",
                                            transition: { duration: 0.2 }
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            delay: i * 0.06,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className="inline-block cursor-default"
                                        style={{
                                            textShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
                                        }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.h1>
                            <motion.h1 className="text-7xl md:text-[9.5rem] font-black leading-[0.8] tracking-tighter flex flex-wrap justify-center transform-3d">
                                {subHeadlineText.split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: "100%", opacity: 0, rotateX: -90, scale: 0.5 }}
                                        animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                                        whileHover={{
                                            scale: 1.15,
                                            filter: "brightness(1.5) drop-shadow(0 0 40px currentColor)",
                                            transition: { duration: 0.2 }
                                        }}
                                        transition={{
                                            duration: 1.4,
                                            delay: 0.6 + i * 0.06,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-teal-300 via-cyan-400 to-blue-600 cursor-default animate-neon-pulse"
                                        style={{
                                            filter: "drop-shadow(0 0 25px rgba(20, 184, 166, 0.5)) drop-shadow(0 0 50px rgba(6, 182, 212, 0.3))"
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-slate-300 text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed relative"
                        >
                            <span className="relative inline-block">
                                The world&apos;s most advanced{" "}
                                <span className="relative inline-block text-white font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                    Water Access Protocol
                                    <span className="absolute inset-0 bg-shimmer opacity-50"></span>
                                </span>
                                . Verified through multi-node digital ledgers and autonomous distribution logic.{" "}
                                <span className="text-teal-400 font-semibold">100% Transparent</span>.{" "}
                                <span className="text-cyan-400 font-semibold">100% Free</span>.
                            </span>
                        </motion.p>
                    </div>

                    {/* Magnetic UI Actions with Holographic Effects */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                    >
                        <HolographicCard intensity={1.2}>
                            <motion.button
                                whileHover={{ scale: 1.08, rotateY: 5 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isQuotaFull}
                                className={`group relative h-20 px-14 rounded-2xl text-xl font-black transition-all duration-500 overflow-hidden transform-3d ${isQuotaFull
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-[0_0_40px_rgba(20,184,166,0.4)] hover:shadow-[0_0_60px_rgba(20,184,166,0.6)]'
                                    }`}
                            >
                                {!isQuotaFull && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-shimmer opacity-30" />
                                    </>
                                )}
                                <a href="#distribution" className="relative flex items-center gap-3 py-5">
                                    {isQuotaFull ? "SYSTEM_LOCKED" : "INITIALIZE_DISTRIBUTION"}
                                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
                                </a>
                            </motion.button>
                        </HolographicCard>

                        <HolographicCard intensity={0.9}>
                            <motion.button
                                whileHover={{ scale: 1.08, rotateY: -5, backgroundColor: "rgba(255,255,255,0.15)" }}
                                whileTap={{ scale: 0.95 }}
                                className="h-20 px-14 rounded-2xl border-2 border-white/20 bg-white/5 text-white font-black text-xl backdrop-blur-ultra transition-all duration-500 hover:border-teal-400/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] transform-3d"
                            >
                                <a href="#support" className="flex items-center gap-3 py-5">
                                    SUPPORT_MISSION
                                    <Sparkles className="h-5 w-5 animate-neon-pulse" />
                                </a>
                            </motion.button>
                        </HolographicCard>
                    </motion.div>

                    {/* Precision Impact Metrics with Holographic Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16"
                    >
                        {[
                            { label: "Liters_Synced", val: loading ? "QUANTIZING" : litersDistributed, icon: Droplets, color: "text-teal-400", bgColor: "from-teal-500/20" },
                            { label: "Lives_Impacted", val: loading ? "ANALYZING" : livesImpacted, icon: Users, color: "text-blue-400", bgColor: "from-blue-500/20" },
                            { label: "Active_Nodes", val: loading ? "SCANNING" : stats.activeCities.length, icon: Globe, color: "text-cyan-400", bgColor: "from-cyan-500/20" },
                            { label: "Network_Capacity", val: loading ? "READING" : `${stats.totalDistributed}/${stats.dailyGoal}`, icon: Activity, color: "text-emerald-400", bgColor: "from-emerald-500/20" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                transition={{ delay: 2.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <HolographicCard intensity={0.7}>
                                    <div className="glass-card p-8 rounded-[2rem] group hover:scale-105 transition-all duration-500 relative overflow-hidden text-left transform-3d h-full">
                                        {/* Animated Background Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        {/* Bottom Accent Line */}
                                        <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.color.replace('text', 'bg')} opacity-20 group-hover:opacity-60 transition-all duration-500 group-hover:h-2`} />

                                        {/* Icon with Glow */}
                                        <div className="relative">
                                            <stat.icon className={`h-7 w-7 ${stat.color} mb-6 group-hover:scale-125 transition-all duration-500 relative z-10`} style={{ filter: 'drop-shadow(0 0 10px currentColor)' }} />
                                            <div className={`absolute top-0 left-0 h-7 w-7 ${stat.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />
                                        </div>

                                        {/* Value */}
                                        <motion.p
                                            className="text-4xl font-black text-white tracking-tighter tabular-nums mb-2 relative z-10"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {stat.val}
                                        </motion.p>

                                        {/* Label */}
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em] group-hover:text-slate-400 transition-colors duration-500">
                                            {stat.label}
                                        </p>
                                    </div>
                                </HolographicCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes scan {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
                .text-glow-supreme {
                    filter: drop-shadow(0 0 15px rgba(20, 184, 166, 0.3));
                }
                :global(.animate-pulse-slow) {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </section >
    );
}
