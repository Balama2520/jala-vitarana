"use client";

import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SystemArchitecture() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-teal-500/20 shadow-[0_0_40px_rgba(32,178,170,0.1)] group">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
                        <p className="text-teal-500/80 font-mono text-sm">Loading 3D Architecture...</p>
                    </div>
                </div>
            )}

            {/* 
         Using a public Spline scene for demo purposes. 
         In production, this would be the specific Jala Vitarana model.
       */}
            <Spline
                scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                onLoad={() => setLoading(false)}
                className="w-full h-full"
            />

            <div className="absolute bottom-6 left-6 p-4 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <h4 className="text-white font-semibold mb-1">IoT Node v4.0</h4>
                <div className="flex gap-4 text-xs text-slate-400">
                    <span>• Real-time Flow Meter</span>
                    <span>• QR Scanner</span>
                    <span>• Solar Backup</span>
                </div>
            </div>
        </div>
    );
}
