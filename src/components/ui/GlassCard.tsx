import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, motionValue, useMotionTemplate } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    variant?: "default" | "dark" | "frosted";
    glow?: boolean;
}

export function GlassCard({
    children,
    className,
    variant = "default",
    glow = false,
    ...props
}: GlassCardProps) {
    const mouseX = motionValue(0);
    const mouseY = motionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative rounded-[2.5rem] border transition-all duration-500 overflow-hidden group/card",
                // Variants
                variant === "default" && "bg-slate-900/40 border-white/10 backdrop-blur-3xl",
                variant === "dark" && "bg-black/80 border-white/5 backdrop-blur-[40px]",
                variant === "frosted" && "bg-white/5 border-white/20 backdrop-blur-2xl",
                // Interaction
                "hover:border-teal-500/30",
                className
            )}
            {...props}
        >
            {/* Supreme Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-soft-light pointer-events-none" />

            {glow && (
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover/card:opacity-100 transition duration-500"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                rgba(20, 184, 166, 0.12),
                                transparent 80%
                            )
                        `,
                    }}
                />
            )}
            {glow && (
                <div className="absolute -inset-[150px] bg-teal-500/10 opacity-0 group-hover/card:opacity-10 blur-[100px] transition-opacity duration-1000 pointer-events-none" />
            )}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
