'use client';

import { useEffect, useState, RefObject } from 'react';

interface ScrollRevealConfig {
    threshold?: number;
    triggerOnce?: boolean;
    delay?: number;
}

export function useScrollReveal(
    ref: RefObject<HTMLElement | null>,
    config: ScrollRevealConfig = {}
) {
    const { threshold = 0.1, triggerOnce = true, delay = 0 } = config;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);

                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [ref, threshold, triggerOnce, delay]);

    return isVisible;
}
