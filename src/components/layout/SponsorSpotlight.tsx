"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Sparkles, Award } from "lucide-react";

export default function SponsorSpotlight() {
    const { sponsors } = useDashboard();

    // Elite sponsors are those who provide custom branding (message or logo)
    const eliteSponsors = sponsors.filter(s =>
        (s.message && s.message !== "Official Supporter") ||
        (s.logo && s.logo !== "🌟")
    ).slice(0, 12);

    if (eliteSponsors.length === 0) return null;

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden border-y border-white/5">
            {/* Background Aesthetic */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                    >
                        <Award className="h-3 w-3" />
                        Elite Mission Partners
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                        Supported by <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">Visionary Leaders</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed pt-4">
                        Elite sponsors who go beyond contribution to embrace full ownership of the Jala Vitarana vision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eliteSponsors.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] group relative flex flex-col items-center text-center h-full"
                        >
                            <div className="absolute top-6 right-8">
                                <ShieldCheck className="h-6 w-6 text-blue-500/30 group-hover:text-blue-400 transition-colors" />
                            </div>

                            {/* Brand Identifier */}
                            <div className="mb-8 relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="w-28 h-28 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center relative z-10 p-5 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                    {s.logo?.startsWith('http') ? (
                                        <img src={s.logo} alt={s.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <span className="text-6xl group-hover:animate-bounce-slow">{s.logo || "🌟"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Partner Details */}
                            <div className="space-y-4 flex-1 flex flex-col justify-between w-full">
                                <div>
                                    <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors mb-2 tracking-tight">
                                        {s.name}
                                    </h3>
                                    <div className="h-px w-12 bg-white/10 mx-auto mb-4" />
                                    <p className="text-blue-100/90 italic font-medium text-lg leading-snug px-2">
                                        "{s.message}"
                                    </p>
                                </div>
                                <div className="pt-8 flex items-center justify-center gap-2">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 py-1.5 px-4 rounded-full border border-white/5 group-hover:border-blue-500/20 group-hover:text-blue-300 transition-all">
                                        {s.bottles} Bottles Funded
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        Brand Visibility active for ₹10+ contributors
                        <Sparkles className="h-4 w-4 text-blue-500" />
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
