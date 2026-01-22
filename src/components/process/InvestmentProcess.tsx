"use client";

import { Check, ArrowRight, ShieldCheck, FileSignature, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
    {
        id: "01",
        title: "KYC Verification",
        desc: "Instant Aadhaar & PAN verification via Digilocker integration.",
        icon: ShieldCheck
    },
    {
        id: "02",
        title: "Digital Agreement",
        desc: "Sign investment mandate using DocuSign-integrated smart contracts.",
        icon: FileSignature
    },
    {
        id: "03",
        title: "Fund Allocation",
        desc: "Transfer funds via UPI/NEFT to the escrow account managed by Trustees.",
        icon: Wallet
    }
];

export default function InvestmentProcess() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">How It Works</h2>
                    <p className="text-slate-400 text-lg font-light">Secure, compliant, and fully digital investment onboarding.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 z-0" />

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="h-24 w-24 rounded-full bg-slate-950 border border-teal-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(20,184,166,0.1)] group-hover:scale-110 group-hover:border-teal-400 group-hover:shadow-[0_0_40px_rgba(20,184,166,0.2)] transition-all duration-500">
                                <step.icon className="h-10 w-10 text-teal-400" />
                            </div>
                            <div className="bg-secondary/30 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 w-full hover:border-teal-500/30 transition-all duration-500 glass shadow-xl">
                                <div className="text-teal-400 font-black text-xs mb-4 uppercase tracking-[0.3em] opacity-50">{step.id}</div>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{step.title}</h3>
                                <p className="text-slate-400 text-base leading-relaxed mb-4 font-light">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-secondary/40 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 glass shadow-2xl">
                    <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Check className="h-7 w-7 text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="text-white text-xl font-black tracking-tight">SEBI Compliant Infrastructure</h4>
                            <p className="text-slate-400 font-light">All assets are held in a separate escrow trust.</p>
                        </div>
                    </div>
                    <Button size="lg" className="h-14 px-8 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 hover:shadow-teal-500/30 transition-all hover:scale-105 active:scale-95">
                        Start Verification
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
