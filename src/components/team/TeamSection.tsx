'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Twitter, Users, Sparkles, Award, Target } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import HolographicCard from "@/components/effects/HolographicCard";

export default function TeamSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} id="team" className="py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
            {/* Advanced Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    style={{ y }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-gradient-radial from-teal-500/10 via-cyan-500/5 to-transparent blur-[140px] rounded-full animate-pulse-glow"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a608_1px,transparent_1px),linear-gradient(to_bottom,#14b8a608_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <motion.div
                style={{ opacity }}
                className="container mx-auto px-4 relative z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left: Founder Persona */}
                    <div className="space-y-12">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 mb-8"
                            >
                                <Users className="h-4 w-4 text-teal-400 animate-neon-pulse" />
                                <span className="text-sm font-black tracking-wider text-teal-300">FOUNDER & VISIONARY</span>
                                <Sparkles className="h-3 w-3 text-cyan-400" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight"
                            >
                                <span className="inline-block perspective-1000">
                                    {["B", "a", "l", "a", " ", "M", "a", "n", "e", "e", "s", "h"].map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, rotateX: -90 }}
                                            whileInView={{ opacity: 1, rotateX: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.03, duration: 0.5 }}
                                            whileHover={{ scale: 1.1, color: '#14b8a6' }}
                                            className="inline-block transform-3d cursor-default"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 animate-shimmer-wave">
                                    Ayanala
                                </span>
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <HolographicCard intensity={1.2}>
                                <div className="relative group max-w-md">
                                    <div className="absolute -inset-6 bg-gradient-to-tr from-teal-500/30 via-cyan-500/20 to-blue-500/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse-glow" />
                                    <div className="relative aspect-square rounded-[3.5rem] overflow-hidden border-2 border-white/20 glass-dark p-6 backdrop-blur-ultra group-hover:border-teal-400/50 transition-all duration-500">
                                        <Image
                                            src="/images/founder_v3.png"
                                            alt="Bala"
                                            width={800}
                                            height={800}
                                            className="rounded-[2.5rem] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                        />

                                        {/* Supremacy Status Badge */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full bg-slate-950/90 border-2 border-teal-500/40 backdrop-blur-ultra flex items-center gap-3 shadow-[0_0_30px_rgba(20,184,166,0.3)] group-hover:border-teal-400 group-hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] transition-all duration-500"
                                        >
                                            <div className="h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_10px_#14b8a6]" />
                                            <span className="text-xs font-black text-teal-400 uppercase tracking-wider">VERIFIED_PROTOCOL_LEAD</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </HolographicCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-4"
                        >
                            {[
                                { href: "https://www.linkedin.com/in/bala-maneesh-ayanala-702582266/", icon: Linkedin, color: "teal" },
                                { href: "https://x.com/bala_manee28504", icon: Twitter, color: "cyan" },
                                { href: "https://www.instagram.com/balamaneeshayanala2520/", icon: null, color: "pink" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`bg-white/5 h-14 w-14 rounded-xl flex items-center justify-center border-2 border-white/10 hover:border-${social.color}-500/50 hover:bg-${social.color}-500/10 transition-all cursor-pointer group backdrop-blur-xl hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]`}
                                >
                                    {social.icon ? (
                                        <social.icon className={`h-6 w-6 text-slate-400 group-hover:text-${social.color}-400 transition-colors`} />
                                    ) : (
                                        <svg className="h-6 w-6 text-slate-400 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    )}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Narrative & Philosophy */}
                    <div className="space-y-12 lg:pt-20">
                        <motion.section
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <HolographicCard intensity={0.7}>
                                <div className="glass-card p-10 rounded-3xl space-y-6">
                                    <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                                        <Award className="h-6 w-6 text-teal-400 animate-neon-pulse" />
                                        Founder Responsibility
                                    </h3>
                                    <p className="text-slate-300 text-lg leading-relaxed font-light italic">
                                        Bala oversees:
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "System and distribution design",
                                            "Daily operations",
                                            "Transparency and record-keeping",
                                            "Long-term alignment with the mission"
                                        ].map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.5 + i * 0.1 }}
                                                className="flex items-center gap-4 text-slate-300 group"
                                            >
                                                <div className="h-2 w-2 rounded-full bg-teal-500 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_#14b8a6]" />
                                                <span className="group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    <p className="text-slate-500 text-sm italic mt-6 border-t border-white/10 pt-6">
                                        The initiative is intentionally <strong className="text-teal-400">founder-operated</strong>, ensuring clear accountability.
                                    </p>
                                </div>
                            </HolographicCard>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <HolographicCard intensity={0.6}>
                                <div className="glass-card p-10 rounded-3xl border-l-4 border-teal-500/50 space-y-6">
                                    <h3 className="text-xl font-black text-white italic flex items-center gap-3">
                                        <Target className="h-5 w-5 text-cyan-400" />
                                        Personal Commitment
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed font-light italic text-lg">
                                        "Jala Vitarana is not built to impress. It is built to work — <span className="text-teal-400 font-semibold">quietly</span>, <span className="text-cyan-400 font-semibold">consistently</span>, and <span className="text-blue-400 font-semibold">responsibly</span>."
                                    </p>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Growth will be careful. Technology will stay supportive. Trust will always come first.
                                    </p>
                                </div>
                            </HolographicCard>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            <HolographicCard intensity={1}>
                                <div className="bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 border-2 border-teal-500/30 rounded-[2.5rem] p-12 backdrop-blur-xl relative overflow-hidden group hover:border-teal-400/50 transition-all duration-500">
                                    <div className="absolute inset-0 bg-shimmer opacity-20" />
                                    <div className="relative z-10">
                                        <h3 className="text-sm font-black text-teal-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 animate-neon-pulse" />
                                            Final Principle (Locked)
                                        </h3>
                                        <div className="space-y-4">
                                            <p className="text-white text-2xl font-black tracking-tight leading-tight">
                                                "We curate supply, <span className="text-teal-400">never dignity</span>. <br />
                                                We verify impact, <span className="text-cyan-400">never falsify it</span>. <br />
                                                We scale responsibility, <span className="text-blue-400">without sacrificing truth</span>."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </HolographicCard>
                        </motion.section>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
