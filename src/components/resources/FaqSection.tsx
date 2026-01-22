"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle2, ShieldCheck } from "lucide-react";

const FAQs = [
    {
        q: "How does Jala Vitarana achieve absolute transparency?",
        a: "We utilize a 'Zero-Trust' architecture where every distribution is logged to a public Google Sheets ledger (Ground Truth) and synced to our dashboard every 30 seconds. No hidden accounts, no private ledgers."
    },
    {
        q: "What is the mission behind this ecosystem?",
        a: "Founded by Bala Maneesh Ayanala, our goal is Water Democracy. We bridge the gap between donors and those in need by automating compassion through technology, ensuring clean water is a right, not a favor."
    },
    {
        q: "How is the Daily Goal calculated?",
        a: "Our growth is dynamic. We start with a base goal of 9 bottles daily. For every ₹10 received from sponsors, our capacity automatically increases by +1 bottle, ensuring we grow as our support grows."
    },
    {
        q: "Is there protection against system abuse?",
        a: "Yes. To ensure fair distribution, we implement a 30-day cooldown period per phone number and a strictly enforced daily quota. Our system is designed for massive impact with individual accountability."
    },
    {
        q: "How can I verify a specific distribution?",
        a: "Every voucher includes a unique ID and a verification hash. You can cross-reference these against our public ledger at any time to verify the date, location, and sponsor of that specific bottle."
    }
];

export default function FaqSection() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            <HelpCircle className="h-4 w-4" />
                            Common Questions
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                            Trust Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Transparency</span>
                        </h2>
                    </div>

                    {/* FAQ Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FAQs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-8 rounded-3xl border-white/5 hover:border-teal-500/20 transition-all group"
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <CheckCircle2 className="h-5 w-5 text-teal-400 mt-1 flex-shrink-0" />
                                    <h3 className="text-white font-bold text-lg leading-tight">{faq.q}</h3>
                                </div>
                                <p className="text-slate-400 font-light leading-relaxed text-sm ml-8">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Founder Verification Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-teal-500/30 transition-all">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">✓ Founder-Verified Operations</p>
                                <p className="text-slate-500 text-xs">Direct accountability by Bala Maneesh Ayanala</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
