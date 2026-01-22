"use client";

import { Droplets, Twitter, Linkedin, Github, Instagram, Heart, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Droplets className="h-8 w-8 text-teal-400" />
                            <span className="text-2xl font-bold text-white tracking-tight">Jala Vitarana</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed font-light italic">
                            Ensuring free water reaches people with dignity, proof, and honesty. 💧
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://x.com/bala_manee28504" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-400/50 hover:bg-teal-400/10 transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/bala-maneesh-ayanala-702582266/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-400/50 hover:bg-teal-400/10 transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://github.com/jalavitarana" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-400/50 hover:bg-teal-400/10 transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://www.instagram.com/balamaneeshayanala2520/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-400/50 hover:bg-teal-400/10 transition-all">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="#impact" className="hover:text-teal-400 transition-colors">Real-Time Impact</Link></li>
                            <li><Link href="#technology" className="hover:text-teal-400 transition-colors">IoT Technology</Link></li>
                            <li><Link href="/receipt-generator" className="hover:text-teal-400 transition-colors">Donate / Receipt</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-teal-400 mt-0.5 shrink-0" />
                                <span>Sattenapalle<br />Andhrapradesh, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-teal-400 shrink-0" />
                                <a href="tel:+918096275914" className="hover:text-white transition-colors">+91 8096275914</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-teal-400 shrink-0" />
                                <a href="mailto:jalavitarana@gmail.com" className="hover:text-white transition-colors">jalavitarana@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Support / UPI */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Support Mission</h4>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl inline-block text-center">
                            <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-bold">Scan to Support</p>
                            <div className="bg-white p-2 rounded-lg mb-2">
                                <Image
                                    src="/payment-qr.png"
                                    alt="UPI QR Code"
                                    width={120}
                                    height={120}
                                    className="block mx-auto"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono">balamaneesh@ybl</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">Founded and operated by <b>Bala Maneesh Ayanala</b>.</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>© Jala Vitarana — Community-supported initiative 🌱</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
