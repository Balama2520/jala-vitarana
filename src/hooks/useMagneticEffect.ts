'use client';

import { useEffect, useState, RefObject } from 'react';

interface MagneticConfig {
    strength?: number;
    radius?: number;
    smooth?: number;
}

export function useMagneticEffect(
    ref: RefObject<HTMLElement>,
    config: MagneticConfig = {}
) {
    const { strength = 0.3, radius = 100, smooth = 0.15 } = config;
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let animationFrameId: number;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < radius) {
                const force = (radius - distance) / radius;
                targetX = deltaX * strength * force;
                targetY = deltaY * strength * force;
            } else {
                targetX = 0;
                targetY = 0;
            }
        };

        const handleMouseLeave = () => {
            targetX = 0;
            targetY = 0;
        };

        const animate = () => {
            currentX += (targetX - currentX) * smooth;
            currentY += (targetY - currentY) * smooth;

            setPosition({ x: currentX, y: currentY });

            if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [ref, strength, radius, smooth]);

    return position;
}
