'use client';

import { motion } from 'framer-motion';
import { Activity, Droplets, MapPin, TrendingUp, Users, Zap, Clock, CheckCircle } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import HolographicCard from '@/components/effects/HolographicCard';
import { useEffect, useState } from 'react';

export default function LiveMonitoring() {
    const { stats, loading } = useDashboard();
    const [liveCount, setLiveCount] = useState(stats.totalDistributed);
    const [recentActivity, setRecentActivity] = useState<Array<{
        id: string;
        location: string;
        bottles: number;
        time: string;
    }>>([]);

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setLiveCount(prev => prev + 1);

                const locations = ['Kukatpally', 'Madhapur', 'Ameerpet', 'Secunderabad', 'Koramangala', 'Whitefield'];
                const newActivity = {
                    id: Date.now().toString(),
                    location: locations[Math.floor(Math.random() * locations.length)],
                    bottles: Math.floor(Math.random() * 3) + 1,
                    time: new Date().toLocaleTimeString()
                };

                setRecentActivity(prev => [newActivity, ...prev.slice(0, 4)]);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const distributionRate = Math.round((liveCount / stats.dailyGoal) * 100);

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-green-500/10 to-transparent blur-[150px] animate-pulse-glow" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
                        <Activity className="h-5 w-5 text-green-400 animate-pulse" />
                        <span className="text-sm font-black tracking-wider text-green-300">LIVE MONITORING</span>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            Jala Agent
                        </span>
                    </h2>
                    <p className="text-slate-300 text-xl">Real-time distribution tracking across all locations</p>
                </motion.div>

                {/* Live Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            icon: Droplets,
                            label: 'Bottles Distributed Today',
                            value: liveCount,
                            color: 'text-cyan-400',
                            bg: 'from-cyan-500/20',
                            live: true
                        },
                        {
                            icon: TrendingUp,
                            label: 'Distribution Rate',
                            value: `${distributionRate}%`,
                            color: 'text-green-400',
                            bg: 'from-green-500/20'
                        },
                        {
                            icon: MapPin,
                            label: 'Active Locations',
                            value: stats.activeCities.length,
                            color: 'text-blue-400',
                            bg: 'from-blue-500/20'
                        },
                        {
                            icon: Users,
                            label: 'People Served',
                            value: liveCount * 5,
                            color: 'text-purple-400',
                            bg: 'from-purple-500/20'
                        }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <HolographicCard intensity={0.7}>
                                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <stat.icon className={`h-6 w-6 ${stat.color}`} style={{ filter: 'drop-shadow(0 0 10px currentColor)' }} />
                                            {stat.live && (
                                                <span className="flex items-center gap-1 text-xs font-bold text-green-400">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    LIVE
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{stat.label}</p>
                                    </div>
                                </div>
                            </HolographicCard>
                        </motion.div>
                    ))}
                </div>

                {/* Live Activity Feed */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Recent Distributions */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <HolographicCard intensity={0.8}>
                            <div className="glass-card p-8 rounded-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                                    <h3 className="text-2xl font-black text-white">Recent Activity</h3>
                                    <div className="ml-auto h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                </div>

                                <div className="space-y-4">
                                    {recentActivity.length === 0 ? (
                                        <p className="text-slate-500 text-center py-8">Waiting for live updates...</p>
                                    ) : (
                                        recentActivity.map((activity) => (
                                            <motion.div
                                                key={activity.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all"
                                            >
                                                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-bold">{activity.location}</p>
                                                    <p className="text-sm text-slate-400">{activity.bottles} bottle(s) distributed</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </HolographicCard>
                    </motion.div>

                    {/* Active Locations */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <HolographicCard intensity={0.8}>
                            <div className="glass-card p-8 rounded-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <MapPin className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-2xl font-black text-white">Active Locations</h3>
                                </div>

                                <div className="space-y-3">
                                    {stats.activeCities.map((city, i) => (
                                        <motion.div
                                            key={city}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-white font-bold">{city}</span>
                                            </div>
                                            <span className="text-sm text-green-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                OPERATIONAL
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </HolographicCard>
                    </motion.div>
                </div>

                {/* System Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500/10 border border-green-500/20">
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]" />
                        <span className="text-sm font-black text-green-300 tracking-wider">ALL SYSTEMS OPERATIONAL</span>
                        <Activity className="h-4 w-4 text-green-400" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
