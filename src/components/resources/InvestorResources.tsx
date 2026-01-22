"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, FileText } from "lucide-react";

const resources = [
    { name: "Series A Pitch Deck", size: "12.4 MB", type: "PDF" },
    { name: "Q4 2025 Financial Report", size: "4.2 MB", type: "PDF" },
    { name: "Technical Whitepaper v2.1", size: "8.1 MB", type: "PDF" },
    { name: "Impact Audit Certificate", size: "2.5 MB", type: "PDF" }
];

const faqs = [
    {
        q: "How does the revenue model work?",
        a: "We charge a micro-transaction fee (₹0.50/liter) via our dispensed water ATMs. Additionally, we license our IoT stack to government municipalities, generating recurring SaaS revenue."
    },
    {
        q: "What is the expected ROI period?",
        a: "Based on our current unit economics, hardware break-even is achieved in 14-16 months, with a projected 18-22% IRR over a 5-year engagement."
    },
    {
        q: "How is the water quality verified?",
        a: "Our smart nodes measure TDS, pH, and turbidity in real-time. Data is hashed and stored on the Polygon blockchain every hour, creating an immutable quality log accessible via QR code."
    }
];

export default function InvestorResources() {
    return (
        <section className="py-24 bg-background border-t border-white/5">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Investor Resources</h2>
                    <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">
                        Due diligence materials, financial audits, and deep-dive technical documentation available for verified partners.
                    </p>

                    <div className="space-y-4">
                        {resources.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-secondary/30 border border-white/5 hover:border-teal-500/30 transition-all group cursor-pointer glass-card">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold group-hover:text-teal-400 transition-colors">{doc.name}</h4>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{doc.type} • {doc.size}</p>
                                    </div>
                                </div>
                                <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white rounded-xl">
                                    <Download className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary/20 p-10 rounded-[2.5rem] border border-white/5 glass shadow-2xl">
                    <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4 tracking-tight">
                        <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">AI Assistant</span>
                        FAQ
                    </h3>

                    <Accordion type="single" collapsible className="w-full space-y-2">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-white/5 px-2">
                                <AccordionTrigger className="text-slate-200 hover:text-teal-400 hover:no-underline text-left py-6 font-bold text-lg">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-400 leading-relaxed text-base font-light pb-6">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800 shadow-xl`} />
                            ))}
                        </div>
                        <p className="text-sm text-slate-400 font-light">
                            More questions? <span className="text-white font-medium hover:text-teal-400 transition-colors cursor-pointer border-b border-white/20 hover:border-teal-400/50">Chat with Corporate Relations</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
