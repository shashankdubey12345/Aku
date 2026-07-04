'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { playChimeSound, triggerHaptic } from '@/utils/sounds';

interface WishData {
  id: number;
  flowerColor: string;
  glowColor: string;
  unopenedTooltip: string;
  wishText: string;
  subText: string;
}

export default function BirthdayWishes() {
  const [openedWishes, setOpenedWishes] = useState<Record<number, boolean>>({});

  const wishes: WishData[] = [
    {
      id: 1,
      flowerColor: 'fill-pink-400 group-hover:fill-pink-500',
      glowColor: 'shadow-pink-300 dark:shadow-pink-900/60',
      unopenedTooltip: 'Tap to bloom 🌸',
      wishText: 'May all your dreams come true. ✨',
      subText: 'I want to see you achieve every single goal you set for yourself. I\'ll be right beside you, cheering you on at every step, Aku.'
    },
    {
      id: 2,
      flowerColor: 'fill-purple-400 group-hover:fill-purple-500',
      glowColor: 'shadow-purple-300 dark:shadow-purple-900/60',
      unopenedTooltip: 'Tap to bloom 🌺',
      wishText: 'May you always smile this beautifully. 😊',
      subText: 'Your joy is my absolute favorite sight in the world. I promise to do everything in my power to keep that radiant smile on your face.'
    },
    {
      id: 3,
      flowerColor: 'fill-rose-450 group-hover:fill-rose-500',
      glowColor: 'shadow-rose-350 dark:shadow-rose-900/60',
      unopenedTooltip: 'Tap to bloom 🌹',
      wishText: 'May we celebrate every birthday together. 💝',
      subText: 'Through all the passing years, I want to celebrate you, protect you, and make you feel like the princess you are. Together, forever.'
    }
  ];

  const handleBloom = (id: number) => {
    if (!openedWishes[id]) {
      playChimeSound();
      triggerHaptic(80);
      setOpenedWishes((prev) => ({ ...prev, [id]: true }));
    }
  };

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="px-3 py-1 font-bold text-xs uppercase bg-rose-100 dark:bg-rose-950 text-rose-500 dark:text-rose-300 rounded-full">
          Magical Blooms
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 mt-2 text-glow">
          🌸 Three Birthday Wishes
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
          Tap each of the three sleeping buds to watch them bloom and release a wish...
        </p>
      </motion.div>

      {/* Flower Bed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl justify-center items-stretch">
        {wishes.map((item) => {
          const isBloomed = !!openedWishes[item.id];
          return (
            <div
              key={item.id}
              onClick={() => handleBloom(item.id)}
              className={`glass-card p-6 rounded-3xl cursor-pointer flex flex-col items-center justify-between min-h-[300px] border transition-all duration-500 ${
                isBloomed 
                  ? `border-pink-250 bg-white/80 dark:bg-zinc-900/60 shadow-lg ${item.glowColor} scale-102` 
                  : 'hover:border-pink-200 hover:bg-white/50'
              }`}
            >
              {/* SVG Flower */}
              <div className="relative w-24 h-24 flex items-center justify-center group mb-4">
                <motion.div
                  animate={isBloomed ? { rotate: 360 } : { y: [0, -4, 0] }}
                  transition={isBloomed ? { duration: 12, ease: 'linear', repeat: Infinity } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Stalk */}
                    <path d="M50 50 L50 95" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
                    {/* Small Leaf */}
                    <path d="M50 75 Q35 70 40 60 Q48 65 50 75" fill="#22c55e" />
                    
                    {/* Flower Petals (Bloomed or Bud) */}
                    <AnimatePresence mode="wait">
                      {isBloomed ? (
                        <motion.g
                          key="bloomed"
                          initial={{ scale: 0.1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                        >
                          {/* 6 Petals */}
                          <circle cx="50" cy="30" r="16" className={item.flowerColor} />
                          <circle cx="68" cy="40" r="16" className={item.flowerColor} />
                          <circle cx="68" cy="60" r="16" className={item.flowerColor} />
                          <circle cx="50" cy="70" r="16" className={item.flowerColor} />
                          <circle cx="32" cy="60" r="16" className={item.flowerColor} />
                          <circle cx="32" cy="40" r="16" className={item.flowerColor} />
                          {/* Flower Center */}
                          <circle cx="50" cy="50" r="14" fill="#facc15" className="shadow-lg" />
                        </motion.g>
                      ) : (
                        <motion.g
                          key="bud"
                          className="origin-bottom"
                          whileHover={{ scale: 1.1 }}
                        >
                          {/* Sleek Rosebud shape */}
                          <path
                            d="M50 25 C38 25 38 52 50 58 C62 52 62 25 50 25 Z"
                            className={item.flowerColor}
                          />
                          <path
                            d="M50 28 C44 28 44 48 50 54 C56 48 56 28 50 28 Z"
                            fill="rgba(255,255,255,0.2)"
                          />
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </svg>
                </motion.div>

                {/* Sparkling dots on bloom */}
                {isBloomed && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Sparkles className="w-16 h-16 text-yellow-300 animate-sparkle opacity-40" />
                  </div>
                )}
              </div>

              {/* Wish Panel */}
              <div className="text-center w-full flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isBloomed ? (
                    <motion.div
                      key="wish"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-2"
                    >
                      <h4 className="font-extrabold text-zinc-900 dark:text-pink-100 text-sm md:text-base leading-snug">
                        {item.wishText}
                      </h4>
                      <p className="text-zinc-550 dark:text-zinc-350 text-xs md:text-sm font-sans tracking-tight leading-relaxed">
                        {item.subText}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="tooltip"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      className="text-xs uppercase tracking-wide font-extrabold text-pink-500 text-glow"
                    >
                      {item.unopenedTooltip}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-6 w-full flex items-end justify-center select-none">
                {isBloomed && (
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-sans">
                    Bloomed with Love
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
