"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboard } from "@/contexts/DashboardContext";

export default function DailyUpdates() {
    const { updates, loading } = useDashboard();

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <Card className="glass border-white/5 overflow-hidden relative rounded-[3rem] premium-shadow">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-500 to-blue-500" />
                    <CardHeader className="p-10 md:p-16 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <CardTitle className="text-3xl md:text-5xl font-black text-white tracking-tighter flex items-center justify-center md:justify-start gap-4">
                                <FileSpreadsheet className="h-10 w-10 text-teal-400" />
                                Operational Feed
                            </CardTitle>
                            <p className="text-slate-400 text-lg font-light">
                                Real-time updates from <span className="text-white font-medium">on-ground distribution teams</span>.
                            </p>
                        </div>
                        {updates.length === 0 ? (
                            <Badge variant="outline" className="border-blue-500/20 bg-blue-500/5 text-blue-500/80 px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-[0.2em] flex gap-2">
                                Initializing
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="glass-teal border-teal-500/20 text-teal-400 px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-[0.2em] flex gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                </span>
                                System Live
                            </Badge>
                        )}
                    </CardHeader>
                    <CardContent className="p-10 md:p-16">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-10 w-10 text-teal-500 animate-spin" />
                            </div>
                        ) : updates.length > 0 ? (
                            <div className="space-y-12">
                                {updates.map((update, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group"
                                    >
                                        <div className="flex-shrink-0 md:w-32 md:text-right pt-2">
                                            <span className="text-[10px] font-black text-slate-600 block uppercase tracking-[0.2em]">{update.date}</span>
                                        </div>
                                        <div className="relative flex-1 pl-8 md:pl-12 border-l border-white/5 group-hover:border-teal-500/30 transition-all pb-12 last:pb-0">
                                            <div className="absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-teal-500 group-hover:scale-125 transition-all" />
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-teal-100 text-[10px] font-black uppercase tracking-[0.1em] mb-4">
                                                {update.category}
                                            </div>
                                            <p className="text-slate-300 text-xl font-light leading-relaxed group-hover:text-white transition-colors">
                                                {update.message}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                                <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                                    Awaiting field reports from Ground Reality Teams...
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
