'use client';

import { useRef, useState, ReactNode } from 'react';

interface HolographicCardProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

export default function HolographicCard({
    children,
    className = '',
    intensity = 1
}: HolographicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10 * intensity;
        const rotateY = ((x - centerX) / centerX) * 10 * intensity;

        setRotation({ x: rotateX, y: rotateY });
        setGlowPosition({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100
        });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlowPosition({ x: 50, y: 50 });
    };

    return (
        <div
            ref={cardRef}
            className={`relative transform-gpu transition-transform duration-200 ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Holographic glow effect */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, 
            rgba(0, 255, 255, 0.3) 0%, 
            rgba(0, 200, 255, 0.2) 25%,
            rgba(100, 150, 255, 0.1) 50%,
            transparent 70%)`,
                    filter: 'blur(20px)'
                }}
            />

            {/* Chromatic aberration effect */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none rounded-2xl mix-blend-screen"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, 
            rgba(255, 0, 0, 0.2) 0%, 
            transparent 50%)`,
                    transform: 'translate(-2px, -2px)'
                }}
            />
            <div
                className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none rounded-2xl mix-blend-screen"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, 
            rgba(0, 255, 0, 0.2) 0%, 
            transparent 50%)`,
                    transform: 'translate(2px, 2px)'
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>

            {/* Scanline effect */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
                    animation: 'scanline 8s linear infinite'
                }}
            />
        </div>
    );
}
