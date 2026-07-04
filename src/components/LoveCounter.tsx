'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LoveCounter() {
  // Configurable Start Date: September 18, 2023
  const ANNIVERSARY_DATE = '2023-09-18T00:00:00';

  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const start = new Date(ANNIVERSARY_DATE).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = now - start;

      if (difference <= 0) return;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 65));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeDiff({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeCards = [
    { label: 'Days', value: timeDiff.days },
    { label: 'Hours', value: timeDiff.hours },
    { label: 'Minutes', value: timeDiff.minutes },
    { label: 'Seconds', value: timeDiff.seconds }
  ];

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="px-3 py-1 font-bold text-xs uppercase bg-rose-100 dark:bg-rose-955 text-rose-500 dark:text-rose-300 rounded-full">
          Deep Bond
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500 mt-2 text-glow">
          ⏳ Our Love Counter
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
          Every ticking second is a beautiful memory added to our fairy tale...
        </p>
      </motion.div>

      {/* Love Meter Dashboard */}
      <div className="w-full max-w-2xl glass p-8 rounded-3xl flex flex-col items-center shadow-lg border border-pink-100 dark:border-white/5 relative">
        <Heart className="w-12 h-12 text-rose-500 fill-rose-500/20 animate-heart-beat mb-4" />
        
        <h3 className="text-lg md:text-xl font-extrabold dark:text-pink-100 text-zinc-800 text-center mb-6 font-sans">
          ❤️ We've been together for
        </h3>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {timeCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 12, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-4 bg-white/70 dark:bg-zinc-850/60 rounded-2xl border border-pink-105/30 shadow-md relative overflow-hidden group"
            >
              {/* Card numbers with micro-bounce transitions on updates */}
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-500 to-pink-600 tabular-nums">
                {String(card.value).padStart(2, '0')}
              </span>
              
              <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mt-2">
                {card.label}
              </span>
              
              {/* Hover shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-8 text-center text-[10px] md:text-xs font-sans tracking-wide text-zinc-400 dark:text-zinc-500 uppercase font-black">
          Anniversary Date: Sept 18, 2023 • Banaras trip: Feb 14, 2024
        </div>
      </div>
    </div>
  );
}
