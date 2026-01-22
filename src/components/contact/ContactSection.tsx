'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HolographicCard from '@/components/effects/HolographicCard';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden bg-slate-950">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    style={{ y }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-teal-500/10 to-transparent blur-[120px] animate-pulse-glow"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a608_1px,transparent_1px),linear-gradient(to_bottom,#14b8a608_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <motion.div
                style={{ opacity }}
                className="container mx-auto px-4 relative z-10"
            >
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8"
                        >
                            <Sparkles className="h-4 w-4 text-teal-400 animate-neon-pulse" />
                            <span className="text-sm font-black tracking-wider text-teal-400">GET IN TOUCH</span>
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            <span className="inline-block perspective-1000">
                                {["C", "O", "N", "T", "A", "C", "T"].map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, rotateX: -90, y: 20 }}
                                        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05, duration: 0.6 }}
                                        whileHover={{ scale: 1.2, color: '#14b8a6' }}
                                        className="inline-block transform-3d cursor-default"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 animate-shimmer-wave">
                                US
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Have questions? We're here to help make clean water accessible to everyone.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <HolographicCard intensity={0.8}>
                                <form className="glass-card p-10 rounded-3xl space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">NAME</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 backdrop-blur-xl"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">EMAIL</label>
                                        <input
                                            type="email"
                                            className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 backdrop-blur-xl"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">MESSAGE</label>
                                        <textarea
                                            rows={5}
                                            className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 backdrop-blur-xl resize-none"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(20, 184, 166, 0.5)' }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300"
                                    >
                                        SEND MESSAGE
                                        <Send className="h-5 w-5" />
                                    </motion.button>
                                </form>
                            </HolographicCard>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-6"
                        >
                            {[
                                { icon: Mail, title: "Email", value: "jalavitarana@gmail.com", color: "text-teal-400" },
                                { icon: Phone, title: "Phone", value: "+91 8096275914", color: "text-cyan-400" },
                                { icon: MapPin, title: "Location", value: "India", color: "text-blue-400" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                >
                                    <HolographicCard intensity={0.6}>
                                        <div className="glass-card p-8 rounded-2xl group hover:scale-105 transition-all duration-500">
                                            <div className="flex items-start gap-6">
                                                <div className={`p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                                                    <item.icon className="h-6 w-6" style={{ filter: 'drop-shadow(0 0 10px currentColor)' }} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-400 mb-1 tracking-wide">{item.title}</p>
                                                    <p className="text-xl font-black text-white">{item.value}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </HolographicCard>
                                </motion.div>
                            ))}

                            {/* Additional Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.9 }}
                            >
                                <HolographicCard intensity={0.7}>
                                    <div className="glass-card p-8 rounded-2xl">
                                        <h3 className="text-2xl font-black text-white mb-4">Office Hours</h3>
                                        <div className="space-y-2 text-slate-300">
                                            <p><span className="font-bold text-teal-400">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                                            <p><span className="font-bold text-cyan-400">Saturday:</span> 10:00 AM - 4:00 PM</p>
                                            <p><span className="font-bold text-slate-500">Sunday:</span> Closed</p>
                                        </div>
                                    </div>
                                </HolographicCard>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
