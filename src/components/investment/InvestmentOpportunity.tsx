"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoiCalculator from "./RoiCalculator";

const data = [
    { name: "Infrastructure", value: 40, color: "#20B2AA" },
    { name: "Operations", value: 30, color: "#001F3F" },
    { name: "Community", value: 20, color: "#FFD700" },
    { name: "R&D", value: 10, color: "#94a3b8" },
];

export default function InvestmentOpportunity() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    return (
        <section id="opportunity" className="py-24 bg-slate-900 border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">High-Yield Impact Investment</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Projected 18% IRR over 5 years. Backed by guaranteed public utility contracts.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Chart */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Capital Allocation</CardTitle>
                            <CardDescription> Strategic fund distribution for maximum efficiency.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            {mounted && (
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={110}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.1)" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-teal-400">Why Invest?</h3>
                            <ul className="space-y-3">
                                {["Guaranteed Revenue Stream (Govt Contracts)", "Zero-Operating Cost Model (Solar Powered)", "Instant Daily Payouts via Blockchain", "Tax-Exempt Green Bonds Qualification"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <div className="h-2 w-2 rounded-full bg-teal-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button className="w-full md:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold">
                            Download Financial Model
                        </Button>
                    </div>
                </div>

                {/* ROI Calculator Section */}
                <div className="mt-24">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">Interactive Returns Calculator</h3>
                    <RoiCalculator />
                </div>
            </div>
        </section>
    );
}
