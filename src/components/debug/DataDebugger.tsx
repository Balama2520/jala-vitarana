"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { Card } from "@/components/ui/card";
import { RefreshCw, Activity, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function DataDebugger() {
    const { stats, loading, sponsors, updates, refreshData } = useDashboard();
    const controls = useAnimation();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Trigger animation when stats change
    useEffect(() => {
        controls.start({
            scale: [1, 1.05, 1],
            transition: { duration: 0.3 }
        });
    }, [stats, controls]);

    if (!mounted) return null;

    return (
        <motion.div
            drag
            dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
            whileDrag={{ scale: 1.02, opacity: 0.9 }}
            initial={{ x: isCollapsed ? 120 : 0, y: 0, opacity: 0 }}
            animate={{ x: isCollapsed ? 120 : 0, opacity: 1 }}
            className="fixed bottom-4 right-4 z-[9999]"
        >
            <div className={`p-4 bg-slate-950/90 border border-teal-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(20,184,166,0.15)] rounded-2xl cursor-grab active:cursor-grabbing group transition-all duration-500 ${isCollapsed ? 'w-14 h-14 overflow-hidden' : 'max-w-md'}`}>
                {isCollapsed && (
                    <button onClick={() => setIsCollapsed(false)} className="w-full h-full flex items-center justify-center">
                        <Activity className="h-6 w-6 text-teal-400 animate-pulse" />
                    </button>
                )}

                <div className={`${isCollapsed ? 'hidden' : 'block'} space-y-3`}>
                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsCollapsed(true)} className="h-6 w-6 rounded-lg bg-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/40 transition-colors">
                                <Activity className="h-4 w-4 text-teal-400 animate-pulse" />
                            </button>
                            <div>
                                <h3 className="text-teal-400 font-black text-[10px] uppercase tracking-[0.2em] leading-tight">
                                    Live Ledger
                                </h3>
                                <p className="text-[8px] text-slate-500 font-mono tracking-tighter">MISSION_READY_SYS_01</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Move className="h-3 w-3 text-slate-700 group-hover:text-teal-500/50 transition-colors" />
                            <Button
                                size="sm"
                                variant="ghost"
                                disabled={loading}
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    const { toast } = await import("sonner");
                                    try {
                                        await refreshData();
                                        toast.success("Ledger Sync Complete");
                                    } catch (err) {
                                        toast.error("Ledger Sync Failed");
                                    }
                                }}
                                className="h-7 w-7 p-0 text-slate-500 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg"
                            >
                                <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2 text-[10px]">
                        <motion.div animate={controls} className="bg-white/5 p-2 rounded-xl border border-white/5 hover:border-teal-500/30 transition-colors">
                            <div className="flex justify-between items-end mb-1">
                                <p className="text-slate-500 font-bold uppercase tracking-widest">Revenue</p>
                                <span className="text-[8px] text-emerald-500 font-bold bg-emerald-500/10 px-1 rounded">SECURE</span>
                            </div>
                            <p className="text-xl font-black text-white tracking-tighter tabular-nums">
                                ₹{stats.totalRevenue.toLocaleString()}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                                <p className="text-slate-500 font-bold uppercase tracking-widest">Units</p>
                                <p className="text-lg font-black text-white tabular-nums">{stats.totalDistributed}</p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                                <p className="text-slate-500 font-bold uppercase tracking-widest">Cities</p>
                                <p className="text-lg font-black text-white tabular-nums">{stats.activeCities.length}</p>
                            </div>
                        </div>

                        <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                            <div className="flex justify-between text-slate-500 font-bold uppercase tracking-widest mb-1">
                                <span>Daily Quota</span>
                                <span>{Math.round((stats.totalDistributed / stats.dailyGoal) * 100)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.totalDistributed / stats.dailyGoal) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <div className="flex gap-2">
                                <div className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/5 text-slate-500">
                                    UDP_{stats.totalDistributed * 7}
                                </div>
                                <div className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/5 text-slate-500">
                                    LOGS_{updates.length}
                                </div>
                            </div>
                            <p className="text-[8px] text-slate-600 font-mono animate-pulse">AUTOSYNC_ON</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
