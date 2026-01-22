"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Droplets, Menu, X, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Support", href: "#support" },
        { name: "Impact", href: "#impact" },
        { name: "Technology", href: "#technology" },
        { name: "Team", href: "#team" },
    ];

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4"
        >
            <div className={cn(
                "w-full max-w-7xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-6 py-3 border",
                scrolled
                    ? "bg-secondary/70 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_0_#0000004d]"
                    : "bg-transparent border-transparent"
            )}>
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <div className="relative">
                        <div className="absolute inset-0 bg-teal-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="bg-gradient-to-br from-teal-400 to-cyan-600 p-2.5 rounded-xl border border-white/10 relative shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Droplets className="h-5 w-5 text-white" />
                        </div>
                    </div>
                    <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 group-hover:to-white transition-all tracking-tight font-heading">
                        Jala Vitarana
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5 border border-white/5 backdrop-blur-sm">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white relative group transition-colors"
                        >
                            <span className="relative z-10">{item.name}</span>
                            <span className="absolute inset-0 bg-white/10 rounded-full scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out" />
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="https://drive.google.com/drive/folders/15h0nRBlOlXK2mAmYOFa7sTb-ST8Pn-Pv?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 rounded-full bg-teal-500/10 text-teal-400 font-bold text-sm hover:bg-teal-500/20 transition-all border border-teal-500/20 flex items-center gap-2"
                    >
                        <Camera size={16} />
                        Live Photos
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-slate-300 relative z-50"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col gap-6 items-center"
                    >
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-black text-slate-400 hover:text-teal-400"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="h-px w-full bg-white/10 my-4" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
