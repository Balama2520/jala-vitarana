'use client';

import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
    type?: 'fade' | 'slide' | 'glitch' | 'decrypt';
}

export default function TextReveal({
    text,
    className = '',
    delay = 0,
    speed = 50,
    type = 'fade'
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useScrollReveal(ref, { threshold: 0.5, delay });
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        if (type === 'decrypt') {
            // Decryption effect
            const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            let iterations = 0;
            const maxIterations = text.length;

            const interval = setInterval(() => {
                setDisplayText(
                    text
                        .split('')
                        .map((char, index) => {
                            if (index < iterations) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('')
                );

                iterations += 1 / 3;

                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    setDisplayText(text);
                }
            }, speed);

            return () => clearInterval(interval);
        } else {
            // Character-by-character reveal
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(text.slice(0, currentIndex + 1));
                    setCurrentIndex(currentIndex + 1);
                }, speed);

                return () => clearTimeout(timeout);
            }
        }
    }, [isVisible, currentIndex, text, speed, type]);

    const getCharClass = (index: number) => {
        if (!isVisible || index >= displayText.length) return 'opacity-0';

        switch (type) {
            case 'slide':
                return 'animate-slide-up';
            case 'glitch':
                return 'animate-glitch';
            default:
                return 'animate-fade-in';
        }
    };

    return (
        <div ref={ref} className={className}>
            {type === 'decrypt' ? (
                <span className="font-mono">{displayText}</span>
            ) : (
                text.split('').map((char, index) => (
                    <span
                        key={index}
                        className={`inline-block ${getCharClass(index)}`}
                        style={{
                            animationDelay: `${index * (speed / 1000)}s`
                        }}
                    >
                        {char === ' ' ? '\u00A0' : displayText[index] || char}
                    </span>
                ))
            )}
        </div>
    );
}
