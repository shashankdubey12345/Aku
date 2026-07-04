'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChimeSound, triggerHaptic } from '@/utils/sounds';

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;

    playChimeSound();
    triggerHaptic(250);
    setIsOpen(true);

    // Trigger sweet confetti sparks
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff477e', '#ff85a1', '#d6bbfb', '#ffd700', '#ffffff']
    });
  };

  const handleReset = () => {
    setIsOpen(false);
  };

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto flex flex-col items-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="px-3 py-1 font-bold text-xs uppercase bg-rose-100 dark:bg-rose-955 text-rose-500 dark:text-rose-300 rounded-full">
          Special Delivery
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-650 mt-2 text-glow">
          🎁 Unwrap Your Surprise
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
          There stands a little gift, sent with all my heartbeat. Tap to open...
        </p>
      </motion.div>

      {/* Gift Box Card Container */}
      <div className="relative w-full max-w-[340px] flex flex-col items-center justify-center min-h-[420px]">
        
        {/* The Gift Box */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="box-closed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={handleOpen}
              className="flex flex-col items-center cursor-pointer group"
            >
              {/* Lid */}
              <motion.div
                whileHover={{ y: -6, rotate: [0, -1, 1, -1, 1, 0] }}
                transition={{ duration: 0.4 }}
                className="w-[180px] h-[55px] bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 rounded-lg relative z-20 flex justify-center shadow-md border-b-2 border-pink-600/30"
              >
                {/* Horizontal Ribbon */}
                <div className="absolute left-[80px] top-0 w-[20px] h-[55px] bg-rose-600 z-10" />
                {/* Bow */}
                <div className="absolute -top-6 left-[65px] w-12 h-6 flex justify-between z-20">
                  <div className="w-6 h-6 border-4 border-rose-600 rounded-full rotate-45 transform bg-rose-700/10" />
                  <div className="w-6 h-6 border-4 border-rose-600 rounded-full -rotate-45 transform bg-rose-700/10" />
                </div>
              </motion.div>

              {/* Box Base */}
              <div className="w-[160px] h-[140px] bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 relative rounded-b-xl z-10 -mt-1 shadow-xl flex justify-center border-t border-white/20">
                {/* Vertical Ribbon */}
                <div className="absolute left-[70px] top-0 w-[20px] h-[140px] bg-rose-600" />
                {/* Shadow */}
                <div className="absolute bottom-[-10px] w-[140px] h-[15px] bg-rose-200/40 dark:bg-black/40 blur-md rounded-full -z-10" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-8 py-3 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 font-extrabold text-white text-xs rounded-full shadow-lg hover:shadow-xl cursor-pointer"
              >
                🎁 Open Your Gift
              </motion.button>
            </motion.div>
          ) : (
            /* Open Lid Surprise Roll */
            <motion.div
              key="box-open"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="w-full glass p-6 rounded-3xl border border-pink-200 shadow-xl flex flex-col items-center gap-4 bg-white/90 dark:bg-zinc-900/90 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 dark:bg-rose-500/2 rounded-bl-full flex items-center justify-center -z-10 pointer-events-none">
                <Heart className="w-10 h-10 text-rose-500/10" />
              </div>

              {/* Reveal Header */}
              <div className="text-center">
                <h3 className="text-xl font-black text-rose-600 dark:text-pink-400 text-glow flex items-center justify-center gap-1.5 animate-pulse">
                  <Heart className="w-5 h-5 fill-rose-500 animate-heart-beat" />
                  I Love You Forever
                  <Heart className="w-5 h-5 fill-rose-500 animate-heart-beat" />
                </h3>
              </div>

              {/* Couple Photo (Unsplash Scenic Placeholder representation) */}
              <div className="w-full h-44 rounded-2xl overflow-hidden shadow-md border border-pink-100 flex-shrink-0 relative group">
                <img
                  src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=650&q=80"
                  alt="Us"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Quotes & Notes */}
              <div className="flex flex-col gap-3 font-sans w-full text-center">
                {/* Quote */}
                <div className="p-3 bg-rose-100/40 dark:bg-rose-950/20 rounded-2xl border border-rose-100/50 dark:border-white/5">
                  <p className="text-[11px] md:text-xs text-zinc-550 dark:text-zinc-350 italic font-serif leading-relaxed">
                    "In case you ever foolishly forget: I am never not thinking of you."
                  </p>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold block mt-1 block">
                    — Virginia Woolf
                  </span>
                </div>

                {/* Handwritten notes */}
                <div className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed font-serif text-left border-l-2 border-pink-300 pl-3">
                  <p className="italic">
                    Dear Aku,
                  </p>
                  <p className="mt-1">
                    You are the blessing I search for in every prayer, my lucky charm in all my actions, and the sweet light of my soul. Every path in Banaras reflects our love, and every birthday of yours reminds me how lucky I am.
                  </p>
                  <p className="font-bold text-right mt-1.5 text-rose-500">
                    Yours, Shashank ❤️
                  </p>
                </div>
              </div>

              {/* Reset Box Button */}
              <button
                onClick={handleReset}
                className="mt-2 text-xs font-extrabold text-zinc-400 dark:text-zinc-500 hover:text-rose-500 transition-colors uppercase tracking-widest cursor-pointer"
              >
                Close Box • Wrap Up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
