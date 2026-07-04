'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBlowCandleSound, triggerHaptic } from '@/utils/sounds';

export default function BirthdayCake() {
  const [isBlown, setIsBlown] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; scale: number; delay: number }[]>([]);

  const handleBlow = () => {
    if (isBlown) return;

    // 1. Play blowing wind audio effect
    playBlowCandleSound();
    
    // 2. Trigger mobile haptics
    triggerHaptic(200);

    // 3. Extinguish candle flame
    setIsBlown(true);

    // 4. Generate rising dynamic floating hearts
    const heartArray = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 - 40, // random horizontal drift
      scale: Math.random() * 0.6 + 0.6,
      delay: Math.random() * 0.4
    }));
    setFloatingHearts(heartArray);

    // 5. Trigger massive heart & stars confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff85a1', '#ff477e', '#d6bbfb', '#ffd700', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff85a1', '#ff477e', '#d6bbfb', '#ffd700', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();

    // Center circular confetti explosion
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#ffd700']
      });
    }, 100);
  };

  const handleReset = () => {
    triggerHaptic(50);
    setIsBlown(false);
    setFloatingHearts([]);
  };

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto flex flex-col items-center select-none relative">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="px-3 py-1 font-bold text-xs uppercase bg-rose-100 dark:bg-rose-955 text-rose-500 dark:text-rose-300 rounded-full">
          Make A Wish
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 mt-2 text-glow">
          🎂 Blow The Candle
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
          Close your eyes, make a wish in your heart, and blow out the candle!
        </p>
      </motion.div>

      {/* Cake Card */}
      <div className="w-full max-w-[325px] glass p-8 rounded-3xl flex flex-col items-center shadow-lg relative border border-pink-100 dark:border-white/5 overflow-hidden min-h-[380px]">
        {/* Glow backdrop behind cake */}
        <div 
          className={`absolute w-48 h-48 rounded-full blur-3xl -z-10 transition-all duration-1000 ${
            isBlown 
              ? 'bg-gradient-to-tr from-amber-200/50 via-pink-300/60 to-purple-300/50 opacity-100' 
              : 'bg-rose-100/30 dark:bg-rose-950/10 opacity-70'
          }`}
        />

        {/* Floating Hearts Animation above Wick */}
        <div className="absolute top-[80px] w-full flex justify-center pointer-events-none z-20">
          {floatingHearts.map((heart) => (
            <motion.span
              key={heart.id}
              initial={{ y: 0, opacity: 0, x: heart.x, scale: 0.2 }}
              animate={{ 
                y: -180, 
                opacity: [0, 1, 1, 0], 
                scale: heart.scale,
                x: heart.x + (Math.sin(heart.id) * 30) // Gentle swaying drift
              }}
              transition={{ duration: 2.8, delay: heart.delay, ease: 'easeOut' }}
              className="absolute text-rose-500 fill-rose-500 text-lg"
            >
              ❤️
            </motion.span>
          ))}
        </div>

        {/* Cake Container SVG */}
        <div className="w-full h-56 flex items-end justify-center mb-6">
          <svg viewBox="0 0 200 230" className="w-[85%] h-full">
            {/* Candle stand & Candle Stick */}
            <g id="candle" className="transition-transform duration-300">
              <ellipse cx="100" cy="80" rx="10" ry="3" fill="#cbd5e1" id="candle-holder" />
              <rect x="97" y="50" width="6" height="30" fill="#f43f5e" rx="1" />
              <line x1="97" y1="55" x2="103" y2="60" stroke="#ffffff" strokeWidth="2" />
              <line x1="97" y1="65" x2="103" y2="70" stroke="#ffffff" strokeWidth="2" />
              <line x1="100" y1="50" x2="100" y2="44" stroke="#475569" strokeWidth="1.5" />
              
              {/* Flickering Flame */}
              <AnimatePresence>
                {!isBlown && (
                  <motion.path
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.15, 0.9, 1.1, 1], opacity: 0.95 }}
                    exit={{ 
                      scale: [0.9, 1.2, 0.1], 
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.4 } 
                    }}
                    className="origin-bottom animate-candle-flicker fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    d="M100 22 C96 32 94 38 97 44 C100 47 100 48 100 48 C100 48 100 47 103 44 C106 38 104 32 100 22 Z"
                  />
                )}
              </AnimatePresence>

              {/* Smoke drift after blowing */}
              {isBlown && (
                <motion.path
                  initial={{ opacity: 0.7, y: 38, x: 100, scale: 0.2 }}
                  animate={{ opacity: 0, y: 15, x: 92, scale: 1.5 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  d="M100 42 Q92 35 100 28 T94 20"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              )}
            </g>

            {/* Cake Tiers - Tier 3 (Top) */}
            <g className={`transition-all duration-1000 ${isBlown ? 'drop-shadow-[0_0_15px_rgba(244,143,177,0.7)]' : ''}`}>
              <rect x="60" y="80" width="80" height="40" fill="#fbcfe8" rx="8" />
              <path d="M60 90 Q65 98 70 90 T80 90 T90 90 T100 90 T110 90 T120 90 T130 90 T140 90" fill="none" stroke="#f472b6" strokeWidth="6" strokeLinecap="round" />
              <circle cx="70" cy="85" r="3" fill="#ef4444" />
              <circle cx="95" cy="85" r="3" fill="#ef4444" />
              <circle cx="110" cy="85" r="3" fill="#ef4444" />
              <circle cx="130" cy="85" r="3" fill="#ef4444" />
            </g>

            {/* Tier 2 (Middle) */}
            <g className={`transition-all duration-1000 ${isBlown ? 'drop-shadow-[0_0_15px_rgba(230,200,250,0.7)]' : ''}`}>
              <rect x="40" y="120" width="120" height="50" fill="#e8dbfc" rx="10" />
              <path d="M40 132 Q48 142 55 132 T70 132 T85 132 T100 132 T115 132 T130 132 T145 132 T160 132" fill="none" stroke="#d6bbfb" strokeWidth="7" strokeLinecap="round" />
              <path d="M70 152 Q72 148 76 152 T80 152 L78 156 L76 158 L74 156 Z" fill="#ff477e" />
              <path d="M100 152 Q102 148 106 152 T110 152 L108 156 L106 158 L104 156 Z" fill="#ff477e" />
              <path d="M130 152 Q132 148 136 152 T140 152 L138 156 L136 158 L134 156 Z" fill="#ff477e" />
            </g>

            {/* Tier 1 (Base) */}
            <g className={`transition-all duration-1000 ${isBlown ? 'drop-shadow-[0_0_15px_rgba(255,179,193,0.7)]' : ''}`}>
              <rect x="20" y="170" width="160" height="50" fill="#ffe4e6" rx="12" />
              <path d="M20 182 Q28 194 38 182 T58 182 T78 182 T98 182 T118 182 T138 182 T158 182 T178 182" fill="none" stroke="#fecdd3" strokeWidth="8" strokeLinecap="round" />
              <rect x="35" y="200" width="6" height="2" fill="#3b82f6" rx="1" transform="rotate(15 35 200)" />
              <rect x="65" y="202" width="6" height="2" fill="#ffd700" rx="1" transform="rotate(-30 65 202)" />
              <rect x="95" y="198" width="6" height="2" fill="#10b981" rx="1" transform="rotate(45 95 198)" />
              <rect x="125" y="202" width="6" height="2" fill="#ef4444" rx="1" transform="rotate(-15 125 202)" />
              <rect x="155" y="199" width="6" height="2" fill="#a855f7" rx="1" transform="rotate(20 155 199)" />
            </g>

            {/* Cake Stand Plate */}
            <ellipse cx="100" cy="223" rx="90" ry="7" fill="#e2e8f0" />
            <rect x="60" y="226" width="80" height="4" fill="#cbd5e1" />
          </svg>
        </div>

        {/* Buttons / Controls */}
        <div className="w-full flex justify-center mt-2 z-10">
          <AnimatePresence mode="wait">
            {!isBlown ? (
              <motion.button
                key="blow-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlow}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-650 font-extrabold text-white text-xs rounded-full shadow-lg hover:shadow-xl shadow-rose-300 dark:shadow-none transition-all cursor-pointer"
              >
                <Wind className="w-4 h-4 animate-pulse" />
                🎂 Blow the Candle
              </motion.button>
            ) : (
              <motion.div
                key="blown-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center gap-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-pink-400 font-extrabold text-center uppercase tracking-wider animate-bounce">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
                    Wish Sent To The Stars!
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 italic text-center px-2">
                    "May all your sweet dreams bloom beautifully, Aku! 💖"
                  </p>
                </div>
                
                <button
                  onClick={handleReset}
                  className="px-4 py-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-300 rounded-full text-[10px] font-bold transition-all border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  Light Candle Again 🕯
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
