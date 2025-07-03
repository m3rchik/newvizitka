"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 1.2 + Math.random() * 1.8,
        opacity: 0.08 + Math.random() * 0.12,
        hue: 190 + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.04,
    };
}

export function BeamsBackground({
    className = "",
    children,
    intensity = "strong",
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 15;

    const opacityMap = useMemo(() => ({
        subtle: 0.5,
        medium: 0.7,
        strong: 0.85,
    }), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        ctx.imageSmoothingEnabled = false;

        const updateCanvasSize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(width, height)
            );
        };

        const debouncedResize = debounce(updateCanvasSize, 250);
        window.addEventListener("resize", debouncedResize);
        updateCanvasSize();

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            if (!canvas) return beam;
            
            const column = index % 3;
            const spacing = canvas.width / 3;

            beam.y = canvas.height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 80 + Math.random() * 80;
            beam.speed = 1 + Math.random() * 0.8;
            beam.hue = 190 + (index * 70) / totalBeams;
            beam.opacity = 0.15 + Math.random() * 0.1;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity =
                beam.opacity *
                (0.8 + Math.sin(beam.pulse) * 0.2) *
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            const hueStr = `${beam.hue}, 85%, 65%`;

            gradient.addColorStop(0, `hsla(${hueStr}, 0)`);
            gradient.addColorStop(0.1, `hsla(${hueStr}, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(0.4, `hsla(${hueStr}, ${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${hueStr}, ${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${hueStr}, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${hueStr}, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        function animate(currentTime: number) {
            if (!canvas || !ctx) return;

            animationFrameRef.current = requestAnimationFrame(animate);

            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) return;

            lastTime = currentTime - (deltaTime % frameInterval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(25px)";

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed * (deltaTime / frameInterval);
                beam.pulse += beam.pulseSpeed * (deltaTime / frameInterval);

                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }

                drawBeam(ctx, beam);
            });
        }

        animate(0);

        return () => {
            window.removeEventListener("resize", debouncedResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity, opacityMap]);

    return (
        <div className={`fixed inset-0 -z-20 overflow-hidden bg-neutral-950 ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ filter: "blur(12px)" }}
            />

            <motion.div
                className="absolute inset-0 bg-neutral-950/5"
                animate={{
                    opacity: [0.03, 0.08, 0.03],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                    backdropFilter: "blur(40px)",
                }}
            />
            {children}
        </div>
    );
}

function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 