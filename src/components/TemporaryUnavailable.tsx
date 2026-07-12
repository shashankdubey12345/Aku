'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Moon, Sun, Sparkles, Clock } from 'lucide-react';
import FloatingParticles from '@/components/FloatingParticles';
import CursorSparkles from '@/components/CursorSparkles';

interface TemporaryUnavailableProps {
  isDark: boolean;
  onDarkModeToggle: () => void;
}

export default function TemporaryUnavailable({
  isDark,
  onDarkModeToggle,
}: TemporaryUnavailableProps) {
  return (
    <div className={`fixed inset-0 z-100 flex flex-col items-center justify-center p-4 bg-gradient-to-br transition-colors duration-500 overflow-hidden select-none ${
      isDark 
        ? 'from-zinc-950 via-zinc-900 to-neutral-900' 
        : 'from-rose-50 via-pink-100 to-purple-100'
    }`}>
      
      {/* Background Interactive Overlays */}
      <FloatingParticles />
      <CursorSparkles />
      
      {/* Background Glow */}
      <div className={`absolute w-[320px] h-[320px] rounded-full blur-3xl -z-10 animate-pulse ${
        isDark ? 'bg-rose-900/10' : 'bg-rose-250/20'
      }`} />

      {/* Floating Theme Control (top right) */}
      <div className="absolute top-4 right-4 z-110">
        <button
          onClick={onDarkModeToggle}
          className={`p-3 rounded-full border shadow-md transition-colors cursor-pointer ${
            isDark 
              ? 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-white/5' 
              : 'bg-white/70 hover:bg-white text-zinc-650 border-pink-100/50'
          }`}
          title="Toggle Light/Dark Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-500 fill-amber-300" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full max-w-lg glass p-10 rounded-3xl border shadow-2xl flex flex-col items-center text-center relative ${
          isDark 
            ? 'border-white/5 bg-zinc-900/80' 
            : 'border-pink-200/50 bg-white/80'
        }`}
      >
        
        {/* Animated Badge Header */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider mb-6 animate-pulse ${
          isDark 
            ? 'bg-rose-955/40 border-rose-900/40 text-rose-400' 
            : 'bg-rose-100 border-rose-200/40 text-rose-600'
        }`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Inside My Heart</span>
        </div>

        {/* Triple pulsing decorative circles & heart icon */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-8">
          {/* Loop animations for ripple effect */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute inset-0 rounded-full border-2 ${
              isDark ? 'border-rose-500/20' : 'border-rose-300/30'
            }`}
          />
          <motion.div
            animate={{ scale: [1.1, 1.6, 1.1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className={`absolute inset-0 rounded-full border-2 ${
              isDark ? 'border-pink-500/10' : 'border-pink-300/20'
            }`}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-18 h-18 rounded-full flex items-center justify-center shadow-lg border ${
              isDark ? 'bg-zinc-800 border-zinc-700/55' : 'bg-white border-pink-100'
            }`}
          >
            <Heart className="w-9 h-9 text-rose-500 fill-rose-500/20" />
          </motion.div>

          <Sparkles className="w-5 h-5 text-amber-400 absolute top-2 right-2 animate-pulse" />
        </div>

        {/* Personal Message */}
        <h1 className={`text-2xl font-bold leading-tight ${
          isDark ? 'text-pink-100' : 'text-zinc-800'
        }`}>
          A Message For You... 💌
        </h1>
        
        <div className={`text-xs md:text-sm mt-5 space-y-4 text-left font-serif leading-relaxed ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          <p>If you&apos;re reading this, thank you for finally making it here. ❤️</p>
          <p>I didn&apos;t build this website because I wanted something in return. I built it because you mean that much to me. Every page, every little detail, and every memory here was made with you in mind.</p>
          <p>I&apos;ll be honest, when days passed and you hadn&apos;t opened it, I felt a little disappointed. Not because I wanted attention, but because I had poured my heart into something I hoped would make you smile.</p>
          <p>If life got busy, I understand. I just hope that as you go through this, you&apos;ll see how much love, time, and thought went into creating it. That&apos;s all I ever wanted you to feel.</p>
          <p className="font-bold text-center italic text-rose-500 dark:text-rose-450 mt-6 pt-4 border-t border-rose-200/35 dark:border-rose-900/25 text-xs md:text-sm leading-relaxed">
            Welcome to the little corner of my heart that i made just for you.
          </p>
        </div>

        {/* Small aesthetic divider strip */}
        <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mt-8 opacity-75" />

      </motion.div>
      
      {/* Decorative subtitle credits */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8 }}
        className={`absolute bottom-6 text-[10.5px] font-bold uppercase tracking-widest ${
          isDark ? 'text-zinc-500' : 'text-zinc-450'
        }`}
      >
        For Aku 👑
      </motion.p>
    </div>
  );
}
