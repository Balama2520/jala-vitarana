'use client';

import { useEffect, useState, RefObject } from 'react';

interface ParallaxConfig {
    speed?: number;
    direction?: 'vertical' | 'horizontal' | 'both';
    smooth?: boolean;
}

export function useParallax(
    ref: RefObject<HTMLElement>,
    config: ParallaxConfig = {}
) {
    const { speed = 0.5, direction = 'vertical', smooth = true } = config;
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.scrollY;
            const elementTop = rect.top + scrolled;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate if element is in viewport
            const isInView = scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight;

            if (isInView) {
                const relativeScroll = scrolled - elementTop + windowHeight;
                const parallaxY = direction !== 'horizontal' ? relativeScroll * speed : 0;
                const parallaxX = direction !== 'vertical' ? relativeScroll * speed : 0;

                if (smooth) {
                    requestAnimationFrame(() => {
                        setOffset({ x: parallaxX, y: parallaxY });
                    });
                } else {
                    setOffset({ x: parallaxX, y: parallaxY });
                }
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [ref, speed, direction, smooth]);

    return offset;
}
