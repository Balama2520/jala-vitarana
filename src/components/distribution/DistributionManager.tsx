"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, MapPin, Loader2, CheckCircle2, Droplets, ShieldCheck, ArrowRight, TrendingUp, Activity, Camera, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { useDashboard } from "@/contexts/DashboardContext";
import SponsorShowcase from "./SponsorShowcase";

const COLORS = ['#14b8a6', '#3b82f6', '#6366f1', '#8b5cf6'];

const mockHourlyData = [
    { time: '9 AM', bottles: 45 },
    { time: '10 AM', bottles: 80 },
    { time: '11 AM', bottles: 120 },
    { time: '12 PM', bottles: 90 },
    { time: '1 PM', bottles: 60 },
    { time: '2 PM', bottles: 85 },
    { time: '3 PM', bottles: 110 },
    { time: '4 PM', bottles: 140 },
    { time: '5 PM', bottles: 95 },
];

const mockCityData = [
    { name: 'Hyderabad', value: 400 },
    { name: 'Delhi', value: 300 },
    { name: 'Bangalore', value: 200 },
    { name: 'Mumbai', value: 100 },
];

// Helper to get rough coordinates
const getCityCoords = (city: string) => {
    const coords: Record<string, { lat: number, lng: number }> = {
        "Delhi": { lat: 28.6139, lng: 77.2090 },
        "Mumbai": { lat: 19.0760, lng: 72.8777 },
        "Bangalore": { lat: 12.9716, lng: 77.5946 },
        "Chennai": { lat: 13.0827, lng: 80.2707 },
        "Hyderabad": { lat: 17.3850, lng: 78.4867 },
    };
    return coords[city] || { lat: 20, lng: 78 };
};

export default function DistributionManager() {
    const [step, setStep] = useState<"request" | "code_display" | "verifying" | "success" | "showcase">("request");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", city: "", phone: "" });
    const [generatedCode, setGeneratedCode] = useState("");
    const [userEnteredCode, setUserEnteredCode] = useState("");
    // const [remainingBottles, setRemainingBottles] = useState<number | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [lastDistribution, setLastDistribution] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    // Redemption code state
    const [securityLogs, setSecurityLogs] = useState<string[]>([]);
    const [redemptionCode, setRedemptionCode] = useState("");
    const [codeValidation, setCodeValidation] = useState<{ valid: boolean; sponsor: any; message: string } | null>(null);
    const [validatingCode, setValidatingCode] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { stats, loading: contextLoading, sponsors } = useDashboard();

    // Validate redemption code
    const validateRedemptionCode = async (code: string) => {
        if (!code || code.length < 8) {
            setCodeValidation(null);
            return;
        }

        setValidatingCode(true);

        // Simulate validation (in production, check against Google Sheets)
        setTimeout(() => {
            const codePattern = /^JV-WATER-[A-Z0-9]{6}$/;

            if (!codePattern.test(code.toUpperCase())) {
                setCodeValidation({
                    valid: false,
                    sponsor: null,
                    message: "Invalid code format. Code should be like: JV-WATER-ABC123"
                });
            } else {
                // Check if code was already used (in real app, check localStorage or backend)
                const usedCodes = JSON.parse(localStorage.getItem('jv_used_codes') || '[]');

                if (usedCodes.includes(code.toUpperCase())) {
                    setCodeValidation({
                        valid: false,
                        sponsor: null,
                        message: "This code has already been redeemed."
                    });
                } else {
                    // Code is valid! Get sponsor from random pool or create mock
                    const mockSponsor = sponsors.length > 0
                        ? sponsors[Math.floor(Math.random() * sponsors.length)]
                        : {
                            name: "Code Sponsor",
                            message: "Thank you for using this redemption code!",
                            logo: "🎁"
                        };

                    setCodeValidation({
                        valid: true,
                        sponsor: mockSponsor,
                        message: `✅ Valid code! Sponsored by ${mockSponsor.name}`
                    });
                }
            }

            setValidatingCode(false);
        }, 800);
    };

    // Real Data from Sheet
    const distributedCount = stats.totalDistributed;
    const totalBottles = stats.dailyGoal;
    const isQuotaFull = distributedCount >= totalBottles;

    // Initial Data Fetching
    useEffect(() => {
        if ((window as any).recaptchaVerifier) {
            try { (window as any).recaptchaVerifier.clear(); } catch { }
            (window as any).recaptchaVerifier = null;
        }
        // Local history init if needed
    }, []);

    const handleGenerateCode = async (e: React.FormEvent) => {
        e.preventDefault();
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Please enter a valid 10-digit Indian mobile number");
            return;
        }
        if (isQuotaFull) {
            toast.error("Today's quota has been reached. Please come back tomorrow!");
            return;
        }

        // 30-Day Cooldown Check (Local Throttling)
        const lastRequest = localStorage.getItem(`jv_last_req_${formData.phone}`);
        if (lastRequest) {
            const lastDate = new Date(parseInt(lastRequest));
            const diffDays = Math.ceil((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays < 30) {
                toast.error(`Limit reached. You can request again in ${30 - diffDays} days.`);
                return;
            }
        }

        if (!formData.name || !formData.city) {
            toast.error("Please fill all details");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedCode(code);
            setStep("code_display");
            setLoading(false);
            toast.success("Verification Code Generated");
        }, 1500);
    };

    const handleVerifyCode = async () => {
        if (userEnteredCode !== generatedCode) {
            toast.error("Incorrect Code");
            return;
        }

        setStep("verifying");
        setSecurityLogs([]);

        const logs = [
            "Initializing secure uplink...",
            "Checking regional distribution quota...",
            `Targeting Node: ${formData.city.toUpperCase()}_STATION_01`,
            "Verifying Sponsor authentication...",
            "Encrypting water distribution token...",
            "SYNCHRONIZATION_COMPLETE"
        ];

        for (let i = 0; i < logs.length; i++) {
            await new Promise(r => setTimeout(r, 600));
            setSecurityLogs(prev => [...prev, logs[i]]);
        }

        await new Promise(r => setTimeout(r, 800));

        setLoading(true);
        try {
            const coords = getCityCoords(formData.city);

            // Priority: Validated Redemption Code Sponsor > Random Pool > Community Pool
            const sponsorToUse = (codeValidation && codeValidation.valid && codeValidation.sponsor)
                ? codeValidation.sponsor
                : (sponsors.length > 0
                    ? sponsors[Math.floor(Math.random() * sponsors.length)]
                    : { name: "Community Pool", message: "Water for all, supported by the community.", logo: "🌟" });

            const newDist = {
                id: Math.random().toString(36).substr(2, 9),
                userName: formData.name,
                city: formData.city,
                phone: formData.phone.replace(/.(?=.{4})/g, '*'),
                sponsor: sponsorToUse.name,
                sponsorMessage: sponsorToUse.message,
                sponsorLogo: sponsorToUse.logo,
                hash: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 6)}`,
                timestamp: new Date().toISOString(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                lat: coords.lat,
                lng: coords.lng
            };

            // Update local history
            setHistory(prev => [newDist, ...prev].slice(0, 5));
            setLastDistribution(newDist);

            // 1. Set Cooldown
            localStorage.setItem(`jv_last_req_${formData.phone}`, Date.now().toString());

            // 2. Automated Sheet Submission for Distribution
            const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZrmLRCuut-IfHI7rDGgW9Yi8NgDzd0i9DT9DpaC9AiCQlQk4UHFsh1rJUn5lV_/exec"
            fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    type: 'DISTRIBUTION_ENTRY',
                    name: String(newDist.userName),
                    phone: String(formData.phone),
                    city: String(newDist.city),
                    date: String(newDist.timestamp),
                    distId: String(newDist.id),
                    sponsor: String(newDist.sponsor),
                    redemptionCode: codeValidation?.valid ? String(redemptionCode) : 'None',
                    sponsorMessage: String(newDist.sponsorMessage),
                    sponsorLogo: String(newDist.sponsorLogo)
                })
            }).catch(e => console.warn("Background log failed", e));

            // If code was used, mark it as used locally
            if (codeValidation?.valid) {
                const used = JSON.parse(localStorage.getItem('jv_used_codes') || '[]');
                if (!used.includes(redemptionCode.toUpperCase())) {
                    used.push(redemptionCode.toUpperCase());
                }
                localStorage.setItem('jv_used_codes', JSON.stringify(used));
            }

            setStep("showcase");
            toast.success("Distribution Verified!");
        } catch (error) {
            console.error(error);
            toast.error("Verification Failed");
        } finally {
            setLoading(false);
        }
    };

    // Show sponsor showcase after verification
    if (step === "showcase" && lastDistribution) {
        return (
            <SponsorShowcase
                distributionData={lastDistribution}
                onBack={() => {
                    setStep("request");
                    setFormData({ name: "", phone: "", city: "" });
                }}
            />
        );
    }

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[600px]">
                {/* Left Side: Interaction Panel */}
                <GlassCard variant="default" glow className="p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Droplets size={120} />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                <Activity className="h-3 w-3" />
                                Live Distribution
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
                                Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Free Water</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-light leading-relaxed">
                                No login. No app. No judgment first come first serve. <br />
                                <span className="text-teal-500/80 font-mono text-xs uppercase tracking-widest mt-2 block">Direct verification only.</span>
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://drive.google.com/drive/folders/15h0nRBlOlXK2mAmYOFa7sTb-ST8Pn-Pv?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-teal-400 hover:bg-white/10 transition-all group w-full md:w-auto"
                                >
                                    <div className="p-2 rounded-lg bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors">
                                        <Camera className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">View Ground Reality</p>
                                        <p className="text-[10px] text-slate-500 font-mono">Daily Distribution Gallery</p>
                                    </div>
                                </a>

                                <div className="flex-1 min-w-[200px] flex items-center gap-4 px-6 py-3 rounded-2xl bg-teal-500/5 border border-teal-500/10 backdrop-blur-sm">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                                                <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">
                                        Network Status: <span className="text-teal-400">Optimal</span><br />
                                        <span className="text-slate-600 font-mono">0.42ms Latency</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                                <span>Daily Goal</span>
                                <span>{Math.round((distributedCount / totalBottles) * 100)}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(distributedCount / totalBottles) * 100}%` }}
                                    transition={{ duration: 1 }}
                                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 shadow-[0_0_20px_#14b8a680]"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-slate-500">
                                <span>{distributedCount} / {totalBottles} Distributed</span>
                                <span className="text-teal-400">{totalBottles - distributedCount} Reamining</span>
                            </div>
                        </div>

                        <form onSubmit={handleGenerateCode} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                                        <Input
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="h-12 pl-12 bg-white/5 border-white/10 focus:border-teal-500/50 rounded-xl transition-all text-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">City</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                                        <Input
                                            placeholder="Current City"
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            className="h-12 pl-12 bg-white/5 border-white/10 focus:border-teal-500/50 rounded-xl transition-all text-white"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Phone (+91)</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                                    <Input
                                        placeholder="98765 43210"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                        className="h-12 pl-12 bg-white/5 border-white/10 focus:border-teal-500/50 rounded-xl transition-all text-white font-mono tracking-wider"
                                        required
                                        type="tel"
                                    />
                                </div>
                            </div>

                            {/* Redemption Code Input (Optional) */}
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Redemption Code (Optional)</label>
                                    {validatingCode && <Loader2 className="h-3 w-3 animate-spin text-teal-500" />}
                                </div>
                                <div className="relative group">
                                    <Droplets className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                                    <Input
                                        placeholder="JV-WATER-XXXXXX"
                                        value={redemptionCode}
                                        onChange={e => {
                                            const val = e.target.value.toUpperCase();
                                            setRedemptionCode(val);
                                            validateRedemptionCode(val);
                                        }}
                                        className={`h-12 pl-12 bg-white/5 border-white/10 rounded-xl transition-all text-white font-mono tracking-widest
                                            ${codeValidation?.valid ? 'border-teal-500/50 bg-teal-500/5' : codeValidation === null ? '' : 'border-red-500/50 bg-red-500/5'}`}
                                    />
                                </div>
                                {codeValidation && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${codeValidation.valid ? 'text-teal-400' : 'text-red-400'}`}
                                    >
                                        {codeValidation.message}
                                    </motion.p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || step !== "request" || isQuotaFull}
                                className={`w-full h-14 rounded-xl text-lg font-bold shadow-[0_0_30px_#14b8a64d] transition-all transform hover:scale-[1.02] active:scale-[0.98] border-0
                                    ${isQuotaFull ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none grayscale' : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white'}`}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : isQuotaFull ? "Daily Quota Reached" : <>Get Code <ArrowRight className="ml-2 h-5 w-5" /></>}
                            </Button>

                            {isQuotaFull && (
                                <p className="text-center text-[10px] font-bold text-teal-500/60 uppercase tracking-widest mt-2">
                                    Refresh at midnight for new stock
                                </p>
                            )}
                        </form>
                    </div>
                </GlassCard>

                {/* Right Side: Analytics or Verification */}
                <GlassCard variant="dark" className="p-8 md:p-12 relative overflow-hidden flex flex-col">
                    <AnimatePresence mode="wait">
                        {step === "request" ? (
                            <motion.div
                                key="analytics"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="h-full flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <TrendingUp className="text-teal-400 h-5 w-5" />
                                            Live Analytics
                                        </h3>
                                        <p className="text-slate-400 text-xs">Real-time network stats</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                                        <span className="text-[10px] font-mono text-teal-500">LIVE</span>
                                    </div>
                                </div>

                                <div className="space-y-6 flex-1">
                                    <div className="h-48 w-full bg-white/5 rounded-2xl border border-white/5 p-4 relative">
                                        {mounted ? (
                                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                                <AreaChart data={mockHourlyData}>
                                                    <defs>
                                                        <linearGradient id="colorBottles" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                                        itemStyle={{ color: '#2dd4bf' }}
                                                    />
                                                    <Area type="monotone" dataKey="bottles" stroke="#14b8a6" fillOpacity={1} fill="url(#colorBottles)" strokeWidth={2} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-4 text-[10px] text-slate-500 uppercase font-bold tracking-wider">Hourly Volume</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                            <div className="h-32 w-full relative">
                                                {mounted ? (
                                                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                                        <PieChart>
                                                            <Pie
                                                                data={mockCityData}
                                                                cx="50%"
                                                                cy="50%"
                                                                innerRadius={25}
                                                                outerRadius={40}
                                                                paddingAngle={5}
                                                                dataKey="value"
                                                                stroke="none"
                                                            >
                                                                {mockCityData.map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                ))}
                                                            </Pie>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Loader2 className="h-4 w-4 animate-spin text-teal-400" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <span className="text-[10px] font-bold text-slate-500">CITY</span>
                                                </div>
                                            </div>
                                            <p className="text-center text-[10px] text-slate-400 mt-2">Distribution by City</p>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-center gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                                                    <CheckCircle2 className="h-4 w-4 text-teal-400" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold text-white">98%</p>
                                                    <p className="text-[10px] text-slate-400">Confirmation Rate</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                    <ShieldCheck className="h-4 w-4 text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold text-white">0s</p>
                                                    <p className="text-[10px] text-slate-400">Fraud Incidents</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="verification-flow"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-6"
                            >
                                {step === "verifying" && (
                                    <div className="w-full space-y-6 animate-in fade-in duration-500">
                                        <div className="relative h-48 bg-slate-950 rounded-2xl border border-teal-500/20 overflow-hidden p-6 font-mono text-left">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-teal-500/30 animate-scan" style={{ animation: 'scan 2s linear infinite' }} />
                                            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2 text-[10px] text-teal-500/50 uppercase tracking-widest">
                                                <Activity className="h-3 w-3" />
                                                SECURE_UPLINK_ESTABLISHED
                                            </div>
                                            <div className="space-y-1 overflow-y-auto h-32 custom-scrollbar">
                                                {securityLogs.map((log, i) => (
                                                    <motion.p
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="text-[10px] text-teal-400/80 leading-relaxed"
                                                    >
                                                        <span className="text-teal-900 mr-2">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                                        {log}
                                                    </motion.p>
                                                ))}
                                            </div>
                                            <div className="absolute bottom-2 right-4 text-[8px] text-slate-700 animate-pulse">ENCRYPTION: AES-256</div>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Processing Secure Ledger</p>
                                        </div>
                                    </div>
                                )}
                                {step === "code_display" && (
                                    <>
                                        <div className="w-full bg-slate-950 p-6 rounded-2xl border border-teal-500/30">
                                            <p className="text-sm text-slate-500 mb-2 font-mono uppercase">Verification Code</p>
                                            <p className="text-5xl font-mono font-black text-teal-400 tracking-[0.2em]">{generatedCode}</p>
                                        </div>
                                        <div className="w-full space-y-4">
                                            <Input
                                                placeholder="Enter Code"
                                                value={userEnteredCode}
                                                onChange={e => setUserEnteredCode(e.target.value)}
                                                className="h-14 text-center text-xl bg-white/5 border-white/10"
                                                maxLength={6}
                                            />
                                            <Button onClick={handleVerifyCode} disabled={loading} className="w-full h-12 bg-white text-black hover:bg-slate-200">
                                                {loading ? <Loader2 className="animate-spin" /> : "Verify Now"}
                                            </Button>
                                        </div>
                                    </>
                                )}
                                {step === "success" && (
                                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                        <div className="relative">
                                            <div className="h-24 w-24 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto border border-teal-500/50 shadow-[0_0_40px_#14b8a64d] mb-6">
                                                <CheckCircle2 size={48} className="text-teal-400" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-black text-[10px] font-black px-2 py-1 rounded-full shadow-lg">
                                                LIVE VERIFIED
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-2">Distribution Verified</h3>
                                            <p className="text-slate-400 text-sm mb-4">Water release authorized for {lastDistribution?.city}</p>

                                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 inline-block mx-auto max-w-md w-full backdrop-blur-sm relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                                    <span className="text-4xl">{lastDistribution?.sponsorLogo || "💧"}</span>
                                                </div>

                                                <div className="relative z-10">
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-teal-500 font-black mb-3">Official Sponsorship</p>
                                                    <div className="space-y-3">
                                                        <p className="text-2xl font-bold text-white tracking-tight">
                                                            {lastDistribution?.sponsor}
                                                        </p>
                                                        {lastDistribution?.sponsorMessage && (
                                                            <div className="py-3 px-4 bg-teal-500/5 rounded-lg border-l-2 border-teal-500 italic text-teal-100/80 text-sm leading-relaxed">
                                                                "{lastDistribution.sponsorMessage}"
                                                            </div>
                                                        )}
                                                        <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                                                            <span>Verified Partner Branding</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button onClick={() => setStep("request")} variant="outline" className="h-12 border-white/10 text-white hover:bg-white/5 hover:text-teal-400 transition-colors w-full">
                                            Process New Request
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </GlassCard>
            </div>

            {/* History Table */}
            <div className="mt-12">
                <GlassCard className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="h-5 w-5 text-teal-500" />
                            Live Distribution Ledger
                        </h3>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] font-black text-teal-400 uppercase tracking-widest">
                            <ShieldCheck className="h-3 w-3" />
                            Immutable Proof
                        </div>
                    </div>
                    <div className="space-y-4">
                        {history.length > 0 ? history.map((record) => (
                            <div key={record.id} className="group relative overflow-hidden flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/20 transition-all duration-300">
                                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-5">
                                    <div className="h-12 w-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-teal-500 font-black text-xl shadow-2xl">
                                        {record.city?.[0]}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-white font-black tracking-tight">{record.city}</p>
                                            <span className="text-[8px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded font-black uppercase tracking-widest border border-teal-500/20">LIVE</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                                            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {record.userName}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 text-teal-500/70"><Heart className="h-3 w-3" /> {record.sponsor}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-teal-400 text-xs font-mono font-bold tracking-tighter mb-1 uppercase bg-teal-500/5 px-2 py-1 rounded border border-teal-500/10">
                                        TX_{record.hash?.slice(4, 12)}
                                    </p>
                                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">{record.time}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="py-12 text-center space-y-4 border-2 border-dashed border-white/5 rounded-3xl">
                                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                                    <Droplets className="h-6 w-6 text-slate-700" />
                                </div>
                                <p className="text-slate-500 text-sm font-medium">Waiting for system synchronization...</p>
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
