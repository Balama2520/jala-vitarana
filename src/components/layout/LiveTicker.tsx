"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";

type Distribution = {
    city: string;
    sponsor: string;
    hash: string;
    timestamp: Date;
    color?: string;
};

const defaultData = [
    { city: "Delhi", sponsor: "JV Foundation", hash: "0x74a...8b2", color: "text-blue-400", timestamp: new Date() },
    { city: "Mumbai", sponsor: "Apex Fund", hash: "0x91c...2f4", color: "text-emerald-400", timestamp: new Date() },
    { city: "Bangalore", sponsor: "Green Earth", hash: "0xe2b...1d9", color: "text-teal-400", timestamp: new Date() },
];

export default function LiveTicker() {
    const { stats, sponsors } = useDashboard();
    const [liveData, setLiveData] = useState<Distribution[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        if (stats.activeCities.length > 0 || sponsors.length > 0) {
            const dataPool = stats.activeCities.length > 0 ? stats.activeCities : ["HYDERABAD", "VIZAG", "WARANGAL"];

            const generated = dataPool.map((city, i) => ({
                city: city.toUpperCase(),
                sponsor: sponsors[i % sponsors.length]?.name || "JV_FOUNDATION",
                hash: `TX_${Math.abs(Math.sin(i) * 1000000).toString(16).slice(0, 8).toUpperCase()}`,
                timestamp: new Date(),
                color: ["text-teal-400", "text-blue-400", "text-cyan-400", "text-emerald-400"][i % 4]
            }));
            setLiveData(generated as Distribution[]);
        } else {
            setLiveData(defaultData as Distribution[]);
        }
    }, [stats.activeCities, sponsors]);

    const displayData = liveData.length > 0 ? [...liveData, ...liveData, ...liveData, ...liveData] : [];

    if (!mounted) return <div className="h-16 bg-slate-950 border-y border-white/5" />;

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-3xl border-y border-white/10 py-5 overflow-hidden whitespace-nowrap relative z-20 group">
            {/* Terminal Scanline */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.3)] animate-scan" />

            <motion.div
                animate={{ x: [0, -3000] }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="inline-flex gap-24 items-center"
            >
                {displayData.map((item, i) => (
                    <div key={i} className="flex items-center gap-6 text-sm font-black transition-all duration-500 hover:scale-105">
                        <div className="flex items-center gap-3">
                            <span className={`flex h-2.5 w-2.5 rounded-full ${item.color?.replace('text', 'bg') || 'bg-teal-400'} animate-pulse shadow-[0_0_12px_currentColor]`} />
                            <span className="text-white tracking-[0.15em] uppercase font-black">{item.city}</span>
                        </div>

                        <div className="h-4 w-px bg-white/10" />

                        <span className="text-slate-600 font-mono text-[10px] tracking-[0.3em] font-black flex items-center gap-2">
                            NODE_SYNCED
                        </span>

                        <div className="flex items-center gap-3 px-6 py-2 rounded-2xl bg-white/5 border border-white/10 shadow-3xl hover:border-teal-500/30 transition-colors">
                            <ShieldCheck size={14} className="text-teal-400" />
                            <span className="text-[10px] text-teal-300 uppercase tracking-[0.25em] font-black">{item.sponsor}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono text-slate-700 tracking-tighter uppercase opacity-60">HASH:</span>
                            <span className="text-[10px] font-mono text-white/40 tracking-widest">{item.hash}</span>
                        </div>

                        <div className="hidden md:flex items-center gap-2 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
                            <span className="h-1 w-1 rounded-full bg-blue-400" />
                            <span className="text-[8px] text-blue-400/80 font-mono font-black">LATENCY_0.42MS</span>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Cinematic Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-slate-950 via-slate-950/50 to-transparent pointer-events-none z-10" />

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(64px); opacity: 0; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}</style>
        </div>
    );
}
