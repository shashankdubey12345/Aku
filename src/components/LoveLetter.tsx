'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { playPopSound, triggerHaptic } from '@/utils/sounds';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const letterText = `My Dearest Aku, 💖

On this beautiful day, I want to tell you how incredibly blessed I am to have you in my life. You're my best friend, my safest shelter, and my ultimate lucky charm. 

No matter where we go—whether we are walking along the crowded, sacred ghats of Banaras, enjoying the serenity of Ganga Aarti, or just sharing routine laughs at home—every single second with you feels like pure magic. Your smile melts away my hardest days, and your laughter is the sweet melody I want to play on loop forever.

I promise to stand by you through every storm and every sunshine, to cheer for you in all your dreams, and to love you more with each passing day. 

Happy Birthday, my Princess. Today is all about celebrating the wonderful soul that you are.

Forever Yours,
— Shashank ❤️`;

  useEffect(() => {
    if (!startTyping) return;
    if (charIndex >= letterText.length) return;

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, 35); // Slick typewriter transition delay

    return () => clearTimeout(timer);
  }, [startTyping, charIndex]);

  const typedText = letterText.slice(0, charIndex);

  const handleOpen = () => {
    if (!isOpen) {
      playPopSound();
      triggerHaptic(100);
      setIsOpen(true);
      // Wait for slide-out animation to finish before typing
      setTimeout(() => {
        setStartTyping(true);
      }, 800);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 w-full">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-6 text-center italic"
      >
        💌 Inside My Heart
      </motion.h2>

      <div className="relative w-full max-w-[340px] h-[340px] flex items-center justify-center select-none">
        {/* Main Envelope Body container */}
        <div 
          onClick={handleOpen}
          className={`relative w-[320px] h-[200px] bg-romantic-pink rounded-b-xl shadow-lg cursor-pointer transform transition-transform duration-500 ${
            isOpen ? 'scale-95 translate-y-16' : 'hover:scale-102 hover:shadow-2xl'
          }`}
          style={{ perspective: '800px' }}
        >
          {/* Back & Sides of envelope */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-pink-400 rounded-b-xl z-10" />

          {/* Left Flap */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-romantic-pink-light/35 border-y-[100px] border-y-transparent rounded-l-xl z-20" />

          {/* Right Flap */}
          <div className="absolute top-0 right-0 w-0 h-0 border-r-[160px] border-r-romantic-pink-light/35 border-y-[100px] border-y-transparent rounded-r-xl z-20" />

          {/* Bottom Flap */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[100px] border-b-pink-100 border-x-[160px] border-x-transparent rounded-b-xl z-20" />

          {/* Top Flap (Rotates on Open) */}
          <div 
            className={`absolute top-0 left-0 w-0 h-0 border-t-[100px] border-t-romantic-pink-dark border-x-[160px] border-x-transparent rounded-t-xl transform origin-top transition-transform duration-500 z-30 ${
              isOpen ? 'rotate-x-180 -translate-y-[1px]' : 'rotate-x-0'
            }`}
          />

          {/* Seal Heart (fades away or stays pinned) */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div 
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[80px] left-[140px] w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-md animate-bounce z-40"
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 flex items-center justify-center z-15">
            <span className="text-white/80 font-bold tracking-widest text-xs uppercase">
              Tap To Unseal
            </span>
          </div>

          {/* Letter / Paper */}
          <motion.div
            initial={{ y: 0, scale: 0.95, zIndex: 11 }}
            animate={isOpen ? { y: -200, scale: 1, zIndex: 50 } : { y: 0, scale: 0.95, zIndex: 11 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.2 }}
            className="absolute left-[10px] top-[10px] w-[300px] min-h-[300px] max-h-[380px] bg-amber-50 rounded-lg shadow-xl p-4 overflow-y-auto border border-amber-105 no-scrollbar origin-bottom"
          >
            <div className="prose text-zinc-800 text-xs md:text-sm font-serif leading-relaxed whitespace-pre-wrap">
              {typedText}
              {!startTyping && isOpen && (
                <div className="flex justify-center items-center h-24">
                  <span className="text-zinc-400 italic">Unfolding letter...</span>
                </div>
              )}
              {startTyping && typedText.length < letterText.length && (
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-black animate-pulse" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
