"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, FileJson } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const impactFeatures = [
    {
        title: "Digital Verification",
        desc: "Each distribution event is digitally logged. Immutable proof of delivery for every liter.",
        icon: ShieldCheck,
        color: "text-emerald-400",
        delay: 0
    },
    {
        title: "Real-Time Ledger",
        desc: "Live public transparent database. Anyone can audit the flow of resources instantly.",
        icon: FileJson,
        color: "text-blue-400",
        delay: 0.1
    },
    {
        title: "Zero-Knowledge Privacy",
        desc: "Beneficiaries receive water with dignity. We verify existence without exposing personal identity.",
        icon: Lock,
        color: "text-teal-400",
        delay: 0.2
    }
];

export default function ImpactSustainability() {
    return (
        <section id="impact" className="py-40 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-[0.25em]"
                    >
                        <Lock className="h-3.5 w-3.5" />
                        Transparency by Design
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white tracking-tighter font-heading"
                    >
                        Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 text-glow">Proof of Work</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-3xl mx-auto text-xl font-light leading-relaxed"
                    >
                        We addresses a simple global gap: Water availability alone is not enough. Distribution needs systems people can trust. Jala Vitarana focuses on <span className="text-white font-medium">execution over claims</span>.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {impactFeatures.map((feature, i) => (
                        <GlassCard
                            key={i}
                            variant="dark"
                            glow
                            className="p-10 group overflow-visible"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: feature.delay }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-700" />

                            <div className={`h-16 w-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)]`}>
                                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight font-heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors">
                                {feature.desc}
                            </p>

                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Status</span>
                                <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    LIVE AUDIT
                                </span>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
