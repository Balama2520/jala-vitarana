"use client";

import { motion } from "framer-motion";
import { Printer, CheckCircle2, Droplet, Heart, ArrowLeft, ExternalLink, QrCode, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";

interface SponsorShowcaseProps {
    distributionData: {
        userName: string;
        city: string;
        sponsor: string;
        sponsorMessage: string;
        sponsorLogo: string;
        hash: string;
        timestamp: string;
        id: string;
    };
    onBack: () => void;
}

export default function SponsorShowcase({ distributionData, onBack }: SponsorShowcaseProps) {
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    useEffect(() => {
        // Generate QR code URL (using public QR code API)
        const qrData = `JALA-${distributionData.id}-${distributionData.hash}`;
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`);
    }, [distributionData]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors no-print"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back to Home</span>
                </button>

                {/* Success Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-500/20 border-2 border-teal-500 mb-6">
                        <CheckCircle2 className="w-10 h-10 text-teal-400" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                        Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">Verified.</span>
                    </h1>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-slate-400 text-lg font-medium">
                            Authorized for <span className="text-white">{distributionData.userName}</span> in {distributionData.city}
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] font-black text-teal-400 uppercase tracking-widest">
                            <Activity className="h-3 w-3" />
                            Secure Ledger Entry: {distributionData.id.toUpperCase()}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Left: Sponsor Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass p-8 rounded-3xl border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Heart className="w-6 h-6 text-rose-400" />
                            <h2 className="text-2xl font-bold text-white">Your Water Sponsor</h2>
                        </div>

                        {/* Sponsor Logo */}
                        <div className="bg-white/5 rounded-2xl p-8 mb-6 flex items-center justify-center min-h-[160px]">
                            {distributionData.sponsorLogo.startsWith('http') ? (
                                <img src={distributionData.sponsorLogo} alt="Sponsor Logo" className="max-w-full max-h-32 object-contain rounded-xl" />
                            ) : (
                                <span className="text-8xl">{distributionData.sponsorLogo}</span>
                            )}
                        </div>

                        {/* Sponsor Details */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-teal-400 uppercase tracking-widest mb-2">Sponsored By</p>
                                <p className="text-3xl font-black text-white">{distributionData.sponsor}</p>
                            </div>

                            {distributionData.sponsorMessage && (
                                <div className="bg-teal-500/10 border-l-4 border-teal-500 p-4 rounded-r-lg">
                                    <p className="text-teal-100 italic leading-relaxed">
                                        "{distributionData.sponsorMessage}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right: QR Code & Download */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass p-8 rounded-3xl border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Droplet className="w-6 h-6 text-cyan-400" />
                            <h2 className="text-2xl font-bold text-white">Download Voucher</h2>
                        </div>

                        {/* QR Code */}
                        <div className="bg-white rounded-2xl p-6 mb-6">
                            {qrCodeUrl ? (
                                <img
                                    src={qrCodeUrl}
                                    alt="Distribution QR Code"
                                    className="w-full h-auto"
                                />
                            ) : (
                                <div className="w-full aspect-square bg-slate-100 rounded-lg animate-pulse" />
                            )}
                        </div>

                        <p className="text-slate-400 text-sm text-center mb-6">
                            Scan to verify or download your water voucher
                        </p>

                        {/* Download Button */}
                        <Button
                            onClick={handlePrint}
                            className="w-full h-14 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-black text-lg rounded-xl shadow-xl no-print"
                        >
                            <Printer className="w-5 h-5 mr-2" />
                            Print Water Voucher
                        </Button>

                        <p className="text-xs text-slate-500 text-center mt-4">
                            Distribution ID: {distributionData.id}
                        </p>
                    </motion.div>
                </div>

                {/* About Jala Vitarana - Honest Explanation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass p-10 rounded-3xl border-white/10"
                >
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        How This Works (No Hype, Just Truth)
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🎁</span>
                            </div>
                            <h4 className="text-white font-bold mb-2">Sponsor Pays</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Companies/donors pay ₹1-10 to provide free water
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">💧</span>
                            </div>
                            <h4 className="text-white font-bold mb-2">You Get Water</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Free water with dignity, no questions asked
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📢</span>
                            </div>
                            <h4 className="text-white font-bold mb-2">Sponsor Gets Seen</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Their name/message shows to you (fair exchange)
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <p className="text-slate-300 leading-relaxed text-center">
                            <strong className="text-white">Jala Vitarana</strong> (जल वितरण) means "Water Distribution".
                            We don't own water plants. We just connect people who need water with people who can provide it.
                            <span className="text-teal-400 font-medium"> Transparent. Simple. Honest.</span>
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                            <span className="text-slate-500">Founded by Bala Maneesh Ayanala</span>
                            <span className="text-slate-700">•</span>
                            <Link href="tel:+918096275914" className="text-teal-400 hover:text-teal-300 flex items-center gap-1">
                                +91 80962 75914
                                <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Impact Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-slate-400 text-sm mb-4">
                        ✓ Verified distribution at {new Date(distributionData.timestamp).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-600 font-mono">
                        Blockchain Hash: {distributionData.hash}
                    </p>
                </motion.div>
            </div>

            {/* REAL PAPER VOUCHER (PRINT ONLY) */}
            <div className="print-only fixed inset-0 bg-white z-[9999] overflow-auto p-12 text-slate-900 font-serif">
                <div className="max-w-md mx-auto border-[3px] border-double border-slate-900 p-10 bg-white relative">
                    {/* Header Stamp */}
                    <div className="absolute top-4 right-4 border-2 border-slate-400 text-slate-400 rotate-12 px-2 py-1 text-[8px] font-bold uppercase tracking-widest rounded">
                        Verified Authentic
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center justify-center gap-2 mb-1">
                            <Droplet className="w-8 h-8 text-black" />
                            JALA VITARANA
                        </h2>
                        <div className="h-0.5 w-full bg-slate-900 mb-1" />
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase">Official Distribution Proof</p>
                    </div>

                    <div className="space-y-6 mb-10">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500">Beneficiary Name</span>
                            <span className="font-bold text-sm tracking-tight">{distributionData.userName}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500">Distribution Site</span>
                            <span className="font-bold text-sm">{distributionData.city}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500">Voucher ID</span>
                            <span className="font-mono text-sm font-bold">#{distributionData.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500">Verified On</span>
                            <span className="font-bold text-sm">{new Date(distributionData.timestamp).toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 mb-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-5">
                            <ShieldCheck className="w-12 h-12" />
                        </div>
                        <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-3 text-slate-400">Philanthropic Sponsor Verification</p>
                        <p className="text-3xl font-black mb-2 tracking-tighter">{distributionData.sponsor}</p>
                        <div className="h-px w-12 bg-slate-200 mx-auto mb-3" />
                        <p className="text-xs italic text-slate-600 leading-relaxed max-w-[280px] mx-auto font-medium">
                            "{distributionData.sponsorMessage}"
                        </p>
                    </div>

                    <div className="flex items-center gap-8 border-t-2 border-slate-900 pt-8 mt-10">
                        <div className="border border-slate-200 p-2 bg-white">
                            {qrCodeUrl ? (
                                <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24" />
                            ) : (
                                <div className="w-24 h-24 bg-slate-100 animate-pulse" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-[9px] font-bold uppercase mb-2">Verification Registry</p>
                            <p className="text-[8px] leading-tight text-slate-500 mb-3">
                                This voucher confirms 1 unit of clean water distribution. Authenticity can be verified at jala-vitarana.in/ledger using the hash below.
                            </p>
                            <p className="text-[9px] font-mono break-all font-bold text-slate-400">
                                {distributionData.hash}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <p className="text-[9px] font-black tracking-widest uppercase mb-1">Founded by Bala Maneesh Ayanala</p>
                        <p className="text-[8px] text-slate-400">A decentralized initiative for community water justice.</p>
                    </div>

                    {/* Dotted edge effect bottom */}
                    <div className="absolute -bottom-1 left-0 w-full h-1 flex gap-1">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="flex-1 h-3 bg-white rounded-full border-t border-slate-200" />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 1cm; size: portrait; }
                    .no-print { display: none !important; }
                    .print-only { 
                        display: block !important; 
                        position: relative !important; 
                        inset: auto !important;
                        z-index: 1 !important;
                        background: white !important;
                    }
                    body { background: white !important; color: black !important; }
                }
                @media screen {
                    .print-only { display: none !important; }
                }
            `}</style>
        </div>
    );
}
