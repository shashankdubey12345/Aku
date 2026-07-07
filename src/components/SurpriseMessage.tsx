'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessSound, playPopSound, triggerHaptic } from '@/utils/sounds';

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export default function SurpriseMessage() {
  const [startType, setStartType] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const surpriseText = `No matter how many birthdays pass,
I'll always celebrate you,
support you,
protect you,
and love you more every single day (haath mat chhodna, saath mat chhodna).

Happy Birthday My Princess.
❤️`;

  const typewriterRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Scroll visibility checker to start typing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartType(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (typewriterRef.current) {
      observer.observe(typewriterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter execution
  useEffect(() => {
    if (!startType) return;
    if (charIndex >= surpriseText.length) {
      setTypingDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, 45); // Slick typewriter speed

    return () => clearTimeout(timer);
  }, [startType, charIndex]);

  const typedText = surpriseText.slice(0, charIndex);

  // Fireworks Animation Engine on Canvas
  useEffect(() => {
    if (!celebrated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rockets: Rocket[] = [];
    let particles: FireworkParticle[] = [];

    const colors = ['#ff477e', '#ff85a1', '#d6bbfb', '#ffd705', '#22c55e', '#3b82f6', '#ffffff'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const spawnRocket = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const tx = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
      const ty = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
      const angle = Math.atan2(ty - y, tx - x);
      const speed = Math.random() * 8 + 7;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];

      rockets.push({ x, y, tx, ty, vx, vy, color, size: 3 });
    };

    const explode = (x: number, y: number, color: string) => {
      const pCount = Math.random() * 50 + 60;
      for (let i = 0; i < pCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed + 0.1; // gravity drag
        const decay = Math.random() * 0.015 + 0.01;
        const size = Math.random() * 2 + 1;

        particles.push({
          x,
          y,
          vx,
          vy,
          color,
          alpha: 1,
          decay,
          size,
        });
      }
    };

    const loop = () => {
      // Semi-transparent clearing for beautiful blur/light tails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Move/Render Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Draw rocket head
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw spark tail behind rocket
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(r.x - r.vx * 0.5, r.y - r.vy * 0.5, r.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Check if rocket reached height apex
        if (r.vy >= 0 || r.y <= r.ty) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // 2. Move/Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity pull
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // Random launch spawn logic
      if (Math.random() < 0.05 && rockets.length < 5) {
        spawnRocket();
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [celebrated]);

  const handleCelebrate = () => {
    playSuccessSound();
    triggerHaptic(300);
    setCelebrated(true);

    // Initial confetti burst
    const end = Date.now() + 4 * 1000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff477e', '#ff85a1', '#d6bbfb', '#ffd700', '#ffffff']
      });
    }, 250);
  };

  const handleReset = () => {
    playPopSound();
    triggerHaptic(50);
    setCelebrated(false);
  };

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="px-3 py-1 font-bold text-xs uppercase bg-rose-100 dark:bg-rose-955 text-rose-500 dark:text-rose-300 rounded-full">
          My Promise
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500 mt-2 text-glow">
          📜 A Surprise Letter
        </h2>
      </motion.div>

      {/* Typewriter Card Block */}
      <div 
        ref={typewriterRef}
        className="w-full max-w-lg glass p-8 rounded-3xl border border-pink-100 dark:border-white/5 shadow-lg relative min-h-[220px]"
      >
        <div className="prose text-zinc-750 dark:text-pink-150 text-sm md:text-base font-serif leading-relaxed whitespace-pre-wrap select-text selection:bg-pink-200">
          {typedText}
          {!startType && (
            <span className="text-zinc-400 italic">Scrolling to read...</span>
          )}
          {startType && !typingDone && (
            <span className="inline-block w-2 h-4.5 bg-rose-500 ml-0.5 animate-pulse" />
          )}
        </div>

        {/* Transition Celebrate Button */}
        {typingDone && !celebrated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={handleCelebrate}
              className="py-3 px-8 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-650 font-extrabold text-white text-sm rounded-full shadow-lg hover:shadow-xl shadow-rose-350 dark:shadow-none hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white animate-heart-beat" />
              Celebrate My Princess! 💖
            </button>
          </motion.div>
        )}
      </div>

      {/* Full screen Celebration Fireworks & Heart Cards */}
      <AnimatePresence>
        {celebrated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-hidden"
          >
            {/* Fireworks canvas layer */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none" />

            {/* Content Curtain Overlay */}
            <motion.div
              initial={{ scale: 0.85, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 25 }}
              transition={{ type: 'spring', stiffness: 100, damping: 14 }}
              className="glass max-w-sm w-full p-8 rounded-3xl border border-white/10 shadow-2xl text-center flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-505/20 text-rose-500">
                <Heart className="w-8 h-8 fill-rose-550 animate-heart-beat" />
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-455 via-pink-400 to-yellow-300 text-glow">
                  Happy Birthday Akriti ❤️
                </h1>
                
                <p className="text-zinc-300 text-xs md:text-sm font-sans tracking-wide leading-relaxed italic px-2">
                  "Thank you for being my lucky charm, my sweet shelter, and my forever peace. I love you, Aku."
                </p>
              </div>

              <div className="w-full border-t border-white/5 pt-4 text-xs">
                <span className="text-zinc-400 block font-serif">Forever Yours,</span>
                <span className="text-rose-400 font-extrabold text-sm tracking-wide mt-1 block">
                  Shashank ❤️
                </span>
              </div>

              {/* Close Celebrating Overlay button */}
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-white/10 text-white font-bold text-xs rounded-full hover:bg-white/20 transition-all cursor-pointer border border-white/10 shadow-md"
              >
                Close Show ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
