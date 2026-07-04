'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBlowCandleSound, triggerHaptic } from '@/utils/sounds';

export default function BirthdayCake() {
  const [phase, setPhase] = useState<'idle' | 'wishing' | 'blown'>('idle');
  const [wish, setWish] = useState('');

  const handleStartWish = () => {
    triggerHaptic(60);
    setPhase('wishing');
  };

  const handleBlowAndSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === 'blown') return;

    // 1. Play blowing wind audio effect
    playBlowCandleSound();
    
    // 2. Trigger mobile haptics
    triggerHaptic(200);

    // 3. Extinguish candle flame
    setPhase('blown');

    // Save wish to localstorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('aku_wish', wish);
    }

    // 4. Trigger massive heart & stars confetti
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
    setPhase('idle');
    setWish('');
  };

  const isBlown = phase === 'blown';

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto flex flex-col items-center select-none relative">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 animate-fade-in"
      >
        <span className="px-3 py-1 font-bold text-xs uppercase bg-rose-100 dark:bg-rose-955 text-rose-500 dark:text-rose-300 rounded-full">
          Make A Wish
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 mt-2 text-glow">
          🎂 Blow The Candle
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
          Make a wish in your heart, write it down, and blow the candle!
        </p>
      </motion.div>

      {/* Floating Wish Text Animation (Only on Blown phase) */}
      <AnimatePresence>
        {phase === 'blown' && wish.trim() !== '' && (
          <motion.div
            initial={{ opacity: 1, y: 100, scale: 1, filter: 'blur(0px)' }}
            animate={{ 
              opacity: 0, 
              y: -240, 
              scale: 0.8, 
              filter: 'blur(3px)' 
            }}
            transition={{ duration: 4.5, ease: 'easeOut' }}
            className="absolute pointer-events-none text-rose-500 dark:text-pink-300 font-serif text-[11px] md:text-xs tracking-wider text-center px-4 py-2 bg-white/70 dark:bg-zinc-850/80 rounded-2xl border border-pink-100 dark:border-white/10 select-none shadow-md z-30 flex items-center gap-1.5 max-w-[250px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-550 fill-amber-300 shrink-0" />
            <span className="italic">"{wish}"</span>
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* Wish Dialog Overlay block */}
        <AnimatePresence>
          {phase === 'wishing' && (
            <motion.form
              onSubmit={handleBlowAndSend}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute inset-0 bg-white/95 dark:bg-zinc-900/95 flex flex-col items-center justify-center p-6 text-center z-25 rounded-3xl"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-2">
                <Heart className="w-5 h-5 fill-rose-500 animate-heart-beat" />
              </div>
              <h4 className="text-xs font-black text-rose-700 dark:text-pink-300 uppercase tracking-widest">
                Make a Secret Wish
              </h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 mb-4 leading-relaxed px-1">
                Close your eyes. Think of what you want most in this world, then write it below...
              </p>
              
              <textarea
                required
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Aku's secret wish..."
                maxLength={70}
                className="w-full text-xs p-3 rounded-2xl bg-pink-50/50 dark:bg-zinc-800 border border-pink-100 dark:border-zinc-700 text-zinc-700 dark:text-white outline-none focus:border-rose-400 resize-none h-16 mb-4 placeholder-zinc-400 dark:placeholder-zinc-550 selection:bg-pink-100 font-sans"
              />

              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  onClick={() => { triggerHaptic(40); setPhase('idle'); }}
                  className="flex-1 py-2 px-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-300 text-xs font-bold rounded-full border border-zinc-200 dark:border-zinc-750 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-3 py-2 px-4 bg-gradient-to-r from-rose-500 to-purple-650 font-extrabold text-white text-xs rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Wind className="w-3.5 h-3.5" />
                  Blow & Send Wish 🕯
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

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
                key="make-wish-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartWish}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 font-extrabold text-white text-xs rounded-full shadow-lg hover:shadow-xl shadow-rose-300 dark:shadow-none transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-white animate-pulse" />
                ✨ Make A Wish & Blow!
              </motion.button>
            ) : (
              <motion.div
                key="blown-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-pink-400 font-extrabold text-center uppercase tracking-wider animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300 animate-pulse" />
                  Wish Sent To The Stars! 🌌
                </div>
                
                <button
                  onClick={handleReset}
                  className="px-4 py-1.5 bg-zinc-55 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-300 rounded-full text-[10px] font-bold transition-all border border-zinc-200 dark:border-zinc-700 cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
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
