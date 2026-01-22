"use client";

import SystemArchitecture from "@/components/tech/SystemArchitecture";

import { Cpu, Smartphone, Lock, BarChart3, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function TechShowcase() {
    return (
        <section id="technology" className="py-40 bg-slate-950 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-32 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-teal-500/20 text-teal-400 text-[11px] font-black uppercase tracking-[0.3em] mx-auto shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                    >
                        <Fingerprint className="h-4 w-4" />
                        Technology Philosophy
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                        Trust <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-glow">Architecture</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                        Jala Vitarana uses modern, lightweight digital systems to <span className="text-white font-medium">support the mission — never to overshadow it.</span> Technology reduces friction. Trust does the rest.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        {[
                            {
                                icon: Lock,
                                title: "Digital Confirmation",
                                desc: "Website-generated codes confirm distribution. No SMS required.",
                                color: "text-blue-400",
                                bg: "bg-blue-500/10"
                            },
                            {
                                icon: Smartphone,
                                title: "No App Required",
                                desc: "Universal web access. No downloads or signups.",
                                color: "text-teal-400",
                                bg: "bg-teal-500/10"
                            },
                            {
                                icon: BarChart3,
                                title: "Live Impact Data",
                                desc: "Aggregated, near real-time data mapped by city and sponsor.",
                                color: "text-emerald-400",
                                bg: "bg-emerald-500/10"
                            },
                            {
                                icon: Cpu,
                                title: "Simple Scale",
                                desc: "Designed to scale efficiently using reliable infrastructure.",
                                color: "text-cyan-400",
                                bg: "bg-cyan-500/10"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ x: 10, scale: 1.02 }}
                                className="flex gap-8 group p-6 rounded-[2rem] hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
                            >
                                <div className={`h-20 w-20 shrink-0 rounded-[1.5rem] ${item.bg} border border-white/5 flex items-center justify-center group-hover:border-teal-500/30 transition-all premium-shadow group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]`}>
                                    <item.icon className={`h-8 w-8 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                                </div>
                                <div className="space-y-2 pt-2">
                                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-teal-400 transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-light group-hover:text-slate-400 transition-colors">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="order-1 lg:order-2 relative"
                    >
                        <div className="absolute inset-0 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 p-8 glass rounded-[3rem] border-white/10 premium-shadow">
                            <SystemArchitecture />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
