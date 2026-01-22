'use client';

import { motion } from 'framer-motion';
import { Download, Droplet, MapPin, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import HolographicCard from '@/components/effects/HolographicCard';
import { Button } from '@/components/ui/button';

export default function DistributionSection() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [downloading, setDownloading] = useState(false);

    const handleDownloadVoucher = () => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
        if (!location) {
            alert('Please select your location');
            return;
        }

        setDownloading(true);

        // Generate voucher
        setTimeout(() => {
            const voucherData = {
                voucherCode: `JV-${Date.now().toString(36).toUpperCase()}`,
                phoneNumber,
                location,
                date: new Date().toLocaleDateString(),
                bottles: 1,
                status: 'ACTIVE'
            };

            // Create downloadable voucher
            const voucherText = `
╔════════════════════════════════════════╗
║     JALA VITARANA WATER VOUCHER       ║
╠════════════════════════════════════════╣
║                                        ║
║  Voucher Code: ${voucherData.voucherCode.padEnd(22)}║
║  Phone: ${phoneNumber.padEnd(29)}║
║  Location: ${location.padEnd(27)}║
║  Date: ${voucherData.date.padEnd(30)}║
║  Bottles: 1 (20L)                     ║
║  Status: ACTIVE                        ║
║                                        ║
╠════════════════════════════════════════╣
║  Show this code at distribution point  ║
║  Valid for 7 days from issue date      ║
╚════════════════════════════════════════╝
      `;

            const blob = new Blob([voucherText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `JalaVitarana_Voucher_${voucherData.voucherCode}.txt`;
            a.click();
            URL.revokeObjectURL(url);

            setDownloading(false);
            alert(`✅ Voucher Downloaded!\n\nCode: ${voucherData.voucherCode}\n\nShow this at your nearest distribution point.`);
            setPhoneNumber('');
            setLocation('');
        }, 1500);
    };

    const locations = [
        'Hyderabad - Kukatpally',
        'Hyderabad - Madhapur',
        'Hyderabad - Ameerpet',
        'Hyderabad - Secunderabad',
        'Bangalore - Koramangala',
        'Bangalore - Whitefield',
        'Mumbai - Andheri',
        'Delhi - Connaught Place'
    ];

    return (
        <section id="distribution" className="py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-gradient-radial from-cyan-500/10 to-transparent blur-[140px] animate-pulse-glow" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
                        >
                            <Droplet className="h-4 w-4 text-cyan-400 animate-neon-pulse" />
                            <span className="text-sm font-black tracking-wider text-cyan-300">GET FREE WATER</span>
                            <Sparkles className="h-3 w-3 text-cyan-400" />
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            <span className="inline-block perspective-1000">
                                {["D", "O", "W", "N", "L", "O", "A", "D"].map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, rotateX: -90 }}
                                        whileInView={{ opacity: 1, rotateX: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05, duration: 0.6 }}
                                        whileHover={{ scale: 1.2, color: '#06b6d4' }}
                                        className="inline-block transform-3d cursor-default"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 animate-shimmer-wave">
                                Your Voucher
                            </span>
                        </h2>
                        <p className="text-slate-300 text-xl">
                            Simple. Fast. No verification needed. Just download and collect.
                        </p>
                    </motion.div>

                    {/* Voucher Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <HolographicCard intensity={1}>
                            <div className="glass-card p-12 rounded-3xl space-y-8">
                                <div className="space-y-6">
                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-sm font-black text-slate-300 mb-3 tracking-wide flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-cyan-400" />
                                            PHONE NUMBER (10 DIGITS)
                                        </label>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                            className="w-full px-6 py-5 rounded-xl bg-slate-900/50 border-2 border-white/10 text-white text-lg placeholder-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-xl font-mono"
                                            placeholder="9876543210"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-black text-slate-300 mb-3 tracking-wide flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-cyan-400" />
                                            COLLECTION LOCATION
                                        </label>
                                        <select
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full px-6 py-5 rounded-xl bg-slate-900/50 border-2 border-white/10 text-white text-lg focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-xl"
                                        >
                                            <option value="">Select your nearest location</option>
                                            {locations.map((loc) => (
                                                <option key={loc} value={loc}>{loc}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Info */}
                                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                                            <div className="space-y-2">
                                                <p className="text-sm font-bold text-cyan-300">What you'll get:</p>
                                                <ul className="text-sm text-slate-300 space-y-1">
                                                    <li>• 1 voucher code (valid for 7 days)</li>
                                                    <li>• 1 bottle of clean water (20L)</li>
                                                    <li>• Instant download - no waiting</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Download Button */}
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        onClick={handleDownloadVoucher}
                                        disabled={downloading}
                                        className="w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xl rounded-xl transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {downloading ? (
                                            <span className="flex items-center gap-3">
                                                <div className="animate-spin h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full" />
                                                GENERATING VOUCHER...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-3">
                                                <Download className="h-6 w-6" />
                                                DOWNLOAD VOUCHER NOW
                                            </span>
                                        )}
                                    </Button>
                                </motion.div>

                                <p className="text-center text-slate-500 text-sm">
                                    No registration. No verification. Just download and show at collection point.
                                </p>
                            </div>
                        </HolographicCard>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 grid grid-cols-3 gap-6"
                    >
                        {[
                            { label: 'Avg. Download Time', value: '< 2 sec' },
                            { label: 'Collection Points', value: '8+' },
                            { label: 'Vouchers Today', value: '247' }
                        ].map((stat, i) => (
                            <HolographicCard key={i} intensity={0.5}>
                                <div className="glass-card p-6 rounded-2xl text-center">
                                    <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{stat.label}</p>
                                </div>
                            </HolographicCard>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
