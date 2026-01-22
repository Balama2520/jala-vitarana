"use client";

import { useState, useEffect } from "react";

import { Slider } from "@/components/ui/slider";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

export default function RoiCalculator() {
    const [investment, setInvestment] = useState(50000);
    const [years, setYears] = useState(5);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Simple mock calculation logic
    // Pie Chart Data
    const portfolioData = [
        { name: 'Infrastructure', value: 45, fill: '#14b8a6' }, // Teal
        { name: 'Maintenance', value: 25, fill: '#0f766e' },    // Dark Teal
        { name: 'Community', value: 20, fill: '#2dd4bf' },      // Light Teal
        { name: 'Reserve', value: 10, fill: '#0ea5e9' },        // Sky Blue
    ];

    const calculateData = () => {
        const data = [];
        let currentValue = investment;
        const growthRate = 0.18; // 18% IRR

        for (let i = 1; i <= years; i++) {
            currentValue = currentValue * (1 + growthRate);
            data.push({
                year: `Year ${i}`,
                value: Math.round(currentValue),
                initial: investment,
            });
        }
        return data;
    };

    const data = calculateData();
    const finalValue = data[data.length - 1].value;
    const profit = finalValue - investment;
    const roi = ((profit / investment) * 100).toFixed(0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-10 bg-secondary/30 rounded-[2.5rem] border border-white/5 backdrop-blur-md shadow-2xl">
            <div className="space-y-8">
                <div>
                    <h3 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                        <TrendingUp className="h-8 w-8 text-teal-400" />
                        Projected Returns
                    </h3>
                    <p className="text-slate-400 mt-4 text-lg font-light leading-relaxed">
                        Adjust your investment to see projected growth based on our conservative 18% IRR model.
                    </p>
                </div>

                <div className="space-y-10 py-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Investment Amount</span>
                            <span className="text-3xl font-black text-teal-400 tracking-tighter tabular-nums">
                                {mounted ? `₹${investment.toLocaleString()}` : "₹--"}
                            </span>
                        </div>
                        <Slider
                            value={[investment]}
                            onValueChange={(val) => setInvestment(val[0])}
                            min={10000}
                            max={1000000}
                            step={5000}
                            className="py-4"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Duration</span>
                            <span className="text-3xl font-black text-teal-400 tracking-tighter tabular-nums">{years} <span className="text-sm text-slate-500 font-medium">Years</span></span>
                        </div>
                        <Slider
                            value={[years]}
                            onValueChange={(val) => setYears(val[0])}
                            min={1}
                            max={10}
                            step={1}
                            className="py-4"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-6 glass-card group">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Total Profit</p>
                        <div className="text-3xl font-black text-teal-400 tracking-tighter transition-all group-hover:scale-105">
                            {mounted ? `+₹${profit.toLocaleString()}` : "₹--"}
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-6 glass-card group">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Total ROI</p>
                        <div className="text-3xl font-black text-cyan-400 tracking-tighter transition-all group-hover:scale-105">
                            {mounted ? `${roi}%` : "--%"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                <div className="h-full min-h-[350px] bg-slate-950/50 rounded-3xl p-6 border border-white/5 relative glass shadow-inner">
                    <h4 className="absolute top-6 left-6 text-xs font-bold text-slate-500 uppercase tracking-widest z-10">Projection Model</h4>
                    <div className="w-full h-[300px] mt-12">
                        {mounted ? (
                            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis
                                        stroke="#475569"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `₹${value / 1000}k`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                        contentStyle={{ backgroundColor: '#020617', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }}
                                    />
                                    <Bar dataKey="initial" stackId="a" fill="#1e293b" radius={[0, 0, 4, 4]} name="Initial Capital" />
                                    <Bar dataKey="value" stackId="a" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Projected Value" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-[400px] w-full bg-slate-950/50 rounded-xl p-4 border border-white/5 relative flex items-center justify-center">
                    <h4 className="absolute top-4 left-4 text-sm font-semibold text-white z-10">Fund Allocation</h4>
                    {mounted ? (
                        <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                            <PieChart>
                                <Pie
                                    data={portfolioData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {portfolioData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#fff' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                        </div>
                    )}
                    {/* 3D-effect overlay */}
                    <div className="absolute inset-x-0 bottom-20 h-20 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
