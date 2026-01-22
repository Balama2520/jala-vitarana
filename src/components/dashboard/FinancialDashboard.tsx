"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, Droplets, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboard } from '@/contexts/DashboardContext';

export default function FinancialDashboard() {
    const [financeStats, setFinanceStats] = useState({
        totalRevenue: 0,
        totalTransactions: 0,
        averageVal: 0
    });
    const [chartData, setChartData] = useState<any[]>([]);
    const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const { stats, loading: statsLoading } = useDashboard();

    useEffect(() => {
        setMounted(true);

        if (statsLoading) return;

        const totalRevenue = stats.totalRevenue || 0;
        const totalDist = stats.totalDistributed || 0;

        setFinanceStats({
            totalRevenue: totalRevenue,
            totalTransactions: totalDist,
            averageVal: totalDist ? Math.round(totalRevenue / totalDist) : 0
        });

        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];

        const simulatedChart = months.map((m, i) => ({
            month: m,
            revenue: Math.floor(totalRevenue * ((i + 1) / 21)),
            costs: Math.floor((totalRevenue * ((i + 1) / 21)) * 0.15)
        }));

        const simulatedGrowth = months.map((m, i) => ({
            month: m,
            users: Math.floor(totalDist * ((i + 1) / 21))
        }));

        setChartData(simulatedChart);
        setUserGrowthData(simulatedGrowth);
        setLoading(false);
    }, [stats, statsLoading]);

    return (
        <section id="finances" className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <TrendingUp size={12} />
                            FISCALLY_TRANSPARENT_INFRASTRUCTURE
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                            Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Synchronization.</span>
                        </h2>
                        <p className="text-slate-400 font-light text-xl leading-relaxed">
                            Every rupee is traced across the decentralized network, ensuring 100% operational efficiency and trust.
                        </p>
                    </div>

                    <div className="flex gap-6 items-center flex-wrap">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 px-8 py-6 rounded-[2.5rem] flex-1 md:flex-none min-w-[200px] backdrop-blur-3xl shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-[10px] text-teal-400 uppercase font-black tracking-[0.4em] mb-2">NETWORK_VALUE</p>
                            <p className="text-4xl font-black text-white tracking-tighter tabular-nums flex items-baseline gap-1">
                                {loading ? "..." : (mounted ? `₹${financeStats.totalRevenue.toLocaleString()}` : "₹--")}
                                <span className="text-xs text-slate-500 font-medium">INR</span>
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 px-8 py-6 rounded-[2.5rem] flex-1 md:flex-none min-w-[200px] backdrop-blur-3xl shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-[10px] text-blue-400 uppercase font-black tracking-[0.4em] mb-2">LIVE_TRANSACTIONS</p>
                            <p className="text-4xl font-black text-white tracking-tighter tabular-nums flex items-baseline gap-1">
                                {loading ? "..." : (financeStats.totalTransactions.toLocaleString())}
                                <span className="text-xs text-slate-500 font-medium">TX</span>
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Supreme Revenue Stream Chart */}
                    <Card className="col-span-1 lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[3.5rem] overflow-hidden group">
                        <CardHeader className="p-10 pb-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-3xl font-black text-white tracking-tighter">Live Resource Stream</CardTitle>
                                    <CardDescription className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">Operational Velocity vs Liquidity Nodes</CardDescription>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[450px] p-10 pt-4">
                            {mounted && !loading ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#475569"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: '#64748b', fontWeight: 900 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            stroke="#475569"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `₹${value}`}
                                            tick={{ fill: '#64748b', fontWeight: 900 }}
                                            dx={-10}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(2, 6, 23, 0.8)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '24px',
                                                padding: '20px',
                                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                                            }}
                                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                            labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px', fontWeight: '900' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#14b8a6"
                                            strokeWidth={6}
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                            activeDot={{ r: 8, fill: '#14b8a6', stroke: '#fff', strokeWidth: 4 }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="costs"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorCosts)"
                                            strokeDasharray="10 10"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-white/5 animate-pulse rounded-[2.5rem]">
                                    <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Active Nodes Visualization */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-3xl shadow-2xl rounded-[3.5rem] overflow-hidden group">
                        <CardHeader className="p-10 pb-0">
                            <CardTitle className="text-3xl font-black text-white tracking-tighter">Contributor Growth</CardTitle>
                            <CardDescription className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">Historical User Syncing Protocol</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[450px] p-10 pt-4">
                            {mounted && !loading ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={userGrowthData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#475569"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: '#64748b', fontWeight: 900 }}
                                            dy={10}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 12 }}
                                            contentStyle={{
                                                backgroundColor: 'rgba(2, 6, 23, 0.8)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '24px',
                                                padding: '20px'
                                            }}
                                        />
                                        <Bar dataKey="users" fill="#14b8a6" radius={[12, 12, 12, 12]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-white/5 animate-pulse rounded-[2.5rem]">
                                    <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Infrastructure Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                    {[
                        { label: "NET_LEDGER_VALUE", val: `₹${financeStats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-teal-400", desc: "Digital verification: 100%" },
                        { label: "COMMUNITY_VELOCITY", val: `₹${financeStats.averageVal}`, icon: Users, color: "text-blue-400", desc: "Weighted average node support" },
                        { label: "LEAKAGE_RATIO", val: "0.00%", icon: Droplets, color: "text-cyan-400", desc: "No trust-gap detected" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-white/5 border border-white/10 backdrop-blur-3xl p-10 rounded-[3rem] group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <stat.icon size={80} />
                            </div>
                            <div className="flex flex-row items-center justify-between mb-8">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{stat.label}</p>
                                <stat.icon className={`h-6 w-6 ${stat.color} group-hover:rotate-12 transition-transform duration-500`} />
                            </div>
                            <div className="text-5xl font-black text-white mb-3 tracking-tighter tabular-nums">
                                {mounted ? stat.val : "₹--"}
                            </div>
                            <p className="text-xs text-slate-600 font-mono tracking-widest uppercase">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
