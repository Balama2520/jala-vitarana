"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Play,
    Square,
    Users,
    MessageSquare,
    MapPin,
    LayoutDashboard,
    TrendingUp,
    Settings,
    LogOut
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [isSessionActive, setIsSessionActive] = useState(true);
    const [currentSponsor, setCurrentSponsor] = useState("Jala Vitarana Foundation");
    const [otpTemplate, setOtpTemplate] = useState("Today your free water is distributed by {{sponsor}} 💧");

    return (
        <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-500/30">
            {/* Sidebar / Nav */}
            <div className="flex">
                <aside className="w-64 min-h-screen border-r border-white/10 p-6 space-y-8 hidden md:block">
                    <div className="flex items-center gap-2 px-2">
                        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-slate-950">JV</div>
                        <span className="font-bold text-xl tracking-tight">Admin Portal</span>
                    </div>

                    <nav className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start gap-3 bg-white/5 text-teal-400">
                            <LayoutDashboard size={20} /> Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white">
                            <Users size={20} /> Sponsors
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white">
                            <MapPin size={20} /> Regions
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white">
                            <Settings size={20} /> Settings
                        </Button>
                    </nav>

                    <div className="pt-20">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-rose-400 hover:bg-rose-500/10">
                            <LogOut size={20} /> Logout
                        </Button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-8 md:p-12 max-w-7xl mx-auto space-y-12">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">Operational Control</h1>
                            <p className="text-slate-500 mt-1 text-lg">Manage distribution sessions and sponsor alignment.</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/">
                                <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 px-6 border-0">View Public Site</Button>
                            </Link>
                            <Button
                                onClick={() => setIsSessionActive(!isSessionActive)}
                                className={`h-12 px-6 font-bold border-0 ${isSessionActive ? 'bg-rose-600 hover:bg-rose-500' : 'bg-teal-600 hover:bg-teal-500'}`}
                            >
                                {isSessionActive ? (
                                    <><Square className="mr-2 h-4 w-4 fill-current" /> End Session</>
                                ) : (
                                    <><Play className="mr-2 h-4 w-4 fill-current" /> Start Session</>
                                )}
                            </Button>
                        </div>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Today's Bottles", value: "1,240", sub: "+12% from avg", icon: TrendingUp, color: "text-teal-400" },
                            { label: "Active Sponsors", value: "12", sub: "3 in queue", icon: MessageSquare, color: "text-blue-400" },
                            { label: "Phone Verifications", value: "98.2%", sub: "High trust score", icon: Users, color: "text-emerald-400" },
                            { label: "Active Cities", value: "8", sub: "Expanding next week", icon: MapPin, color: "text-amber-400" },
                        ].map((stat, i) => (
                            <Card key={i} className="bg-white/5 border-white/10">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium text-slate-400">{stat.label}</CardTitle>
                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Session Config */}
                        <Card className="bg-white/5 border-white/10 p-2">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <MessageSquare className="text-teal-400" />
                                    OTP Branded Content
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-500">Current Sponsor</label>
                                    <Input
                                        value={currentSponsor}
                                        onChange={(e) => setCurrentSponsor(e.target.value)}
                                        className="bg-slate-900 border-white/10 h-12 focus:border-teal-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-500">OTP Message Template</label>
                                    <textarea
                                        value={otpTemplate}
                                        onChange={(e) => setOtpTemplate(e.target.value)}
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 h-32 focus:border-teal-500 focus:outline-none text-sm leading-relaxed"
                                    />
                                    <p className="text-[10px] text-slate-600 italic">Use {"{{sponsor}}"} to inject the sponsor name dynamically.</p>
                                </div>
                                <Button className="w-full h-12 bg-white text-slate-950 font-bold hover:bg-slate-200 border-0">
                                    Update Distribution Brand
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-xl">Verified Traction</CardTitle>
                                <Badge variant="outline" className="text-teal-400 border-teal-500/20">Live</Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {[
                                        { user: "+91 99*** **321", city: "Delhi", time: "2m ago", status: "Success" },
                                        { user: "+91 88*** **456", city: "Mumbai", time: "5m ago", status: "Success" },
                                        { user: "+91 70*** **789", city: "Pune", time: "8m ago", status: "Success" },
                                        { user: "+91 91*** **111", city: "Delhi", time: "12m ago", status: "Success" },
                                    ].map((log, i) => (
                                        <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 border-0">
                                            <div>
                                                <p className="font-mono text-sm text-slate-100">{log.user}</p>
                                                <p className="text-xs text-slate-500">{log.city} • {log.time}</p>
                                            </div>
                                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border-0">{log.status}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
