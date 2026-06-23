import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleSpeed?: number;
}

export const ScrambleText = ({ text, className = "", scrambleSpeed = 1 }: ScrambleTextProps) => {
    const elementRef = useRef<HTMLSpanElement>(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/~0123456789";

    useEffect(() => {
        const ctx = gsap.context(() => {
            const element = elementRef.current;
            if (!element) return;

            // Objeto dummy para animar el valor 'val' de 0 a 1
            const anim = { val: 0 };

            gsap.to(anim, {
                val: 1,
                duration: 1.5 / scrambleSpeed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                onUpdate: () => {
                    const progress = anim.val;
                    const length = text.length;
                    const revealedLength = Math.floor(length * progress);

                    // Parte revelada del texto original
                    let result = text.substring(0, revealedLength);

                    // Parte ofuscada con caracteres aleatorios
                    for (let i = revealedLength; i < length; i++) {
                        if (text[i] === ' ') {
                            result += ' ';
                        } else {
                            result += chars[Math.floor(Math.random() * chars.length)];
                        }
                    }

                    element.innerText = result;
                },
                onComplete: () => {
                    // Asegurar que el texto final sea exactamente el original
                    element.innerText = text;
                }
            });
        });

        return () => ctx.revert();
    }, [text, scrambleSpeed]);

    return (
        <span ref={elementRef} className={className}>
            {text}
        </span>
    );
};
