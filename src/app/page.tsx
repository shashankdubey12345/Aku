'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon, Sun, Share2, Download, ShieldAlert, Sparkles, HeartHandshake } from 'lucide-react';

// Import components
import FloatingParticles from '@/components/FloatingParticles';
import CursorSparkles from '@/components/CursorSparkles';
import LoveLetter from '@/components/LoveLetter';
import ReasonsCards from '@/components/ReasonsCards';
import BirthdayWishes from '@/components/BirthdayWishes';
import BirthdayCake from '@/components/BirthdayCake';
import GiftBox from '@/components/GiftBox';
import LoveQuiz from '@/components/LoveQuiz';
import MusicController from '@/components/MusicController';
import SurpriseMessage from '@/components/SurpriseMessage';

import { playBackgroundMusic, triggerHaptic, playChimeSound, playPopSound } from '@/utils/sounds';

export default function Home() {
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [nameParam, setNameParam] = useState('Aku');

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState<{ wish: string; gift: string; couponsCount: number }>({
    wish: 'No wish made yet 🌟',
    gift: 'No gift chosen yet 🎁',
    couponsCount: 0,
  });

  // Load URL parameter to personalize the name & check admin parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const name = query.get('name') || query.get('to');
      if (name) {
        setNameParam(name);
      }

      if (query.get('admin') === 'true' || query.get('check') === 'true') {
        setIsAdmin(true);
        // Refresh local storage stats in real-time
        const interval = setInterval(() => {
          const w = localStorage.getItem('aku_wish') || 'No wish made yet 🌟';
          const gRaw = localStorage.getItem('aku_gift');
          const g = gRaw === 'dinner' ? '🕯 Candlelight Dinner Date' : gRaw === 'shopping' ? '🛍 Surprise Mall Spree' : gRaw === 'album' ? '🎨 Custom Handmade Frame' : 'No gift chosen yet 🎁';
          const cpRaw = localStorage.getItem('aku_coupons');
          const cpCount = cpRaw ? JSON.parse(cpRaw).length : 0;
          setAdminData({ wish: w, gift: g, couponsCount: cpCount });
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, []);

  // Sync Dark mode DOM elements
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleUnlockSurprise = () => {
    // Start ambient piano audio
    playBackgroundMusic(0.4);
    if (typeof window !== 'undefined') (window as any)._musicPlaying = true;
    
    // Haptic thrum
    triggerHaptic(200);

    setHasUnlocked(true);
  };

  const handleDarkModeToggle = () => {
    playPopSound();
    triggerHaptic(60);
    setIsDark((prev) => !prev);
  };

  const handleShare = async () => {
    playChimeSound();
    triggerHaptic(80);

    const shareData = {
      title: `Happy Birthday ${nameParam}!`,
      text: `Shashank created a premium interactive birthday surprise for you! 💖`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled/failed:', err);
      }
    } else {
      // Fallback copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePrintPDF = () => {
    playChimeSound();
    triggerHaptic(100);
    window.print();
  };

  return (
    <div className="relative min-h-screen w-full transition-colors duration-500 selection:bg-rose-200">
      
      {/* Background Interactive Overlays */}
      <FloatingParticles />
      <CursorSparkles />

      <AnimatePresence mode="wait">
        
        {/* State 1: Opening Screen (Locked) */}
        {!hasUnlocked ? (
          <motion.div
            key="opening-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-pink-100 to-purple-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-neutral-900"
          >
            {/* Spinning heart background glow */}
            <div className="absolute w-[280px] h-[280px] rounded-full bg-rose-250/20 dark:bg-rose-900/10 blur-3xl -z-10 animate-pulse" />

            <div className="flex flex-col items-center text-center max-w-sm gap-6 p-6">
              
              {/* Pulsing main icon */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-lg border border-pink-200/50"
              >
                <Heart className="w-10 h-10 text-rose-500 fill-rose-500/20" />
              </motion.div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-zinc-800 dark:text-pink-100 tracking-wide leading-snug">
                  ❤️ Happy Birthday <br/>My Princess ❤️
                </h1>
                <p className="text-zinc-550 dark:text-zinc-400 text-xs md:text-sm font-sans tracking-tight italic mt-1">
                  "For {nameParam}, with all my love."
                </p>
              </div>

              {/* Loading Bar Simulator */}
              <div className="w-[180px] h-2 bg-pink-100 dark:bg-zinc-850 rounded-full overflow-hidden shadow-inner mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.5, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-rose-455 to-pink-500"
                />
              </div>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlockSurprise}
                className="mt-6 py-3.5 px-8 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-650 font-extrabold text-white text-sm rounded-full shadow-lg hover:shadow-xl shadow-rose-350 dark:shadow-none hover:scale-103 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Open Your Surprise</span>
                <Heart className="w-4 h-4 fill-white" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          
          /* State 2: Main Surprise Page */
          <motion.div
            key="surprise-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            
            {/* Top Toolbar (No-Print) */}
            <div className="w-full max-w-4xl mx-auto flex items-center justify-between px-4 py-4 sticky top-0 z-80 no-print">
              
              {/* Back to top Logo / Greeting */}
              <div className="glass rounded-full px-4 py-1.5 flex items-center gap-2 border border-pink-100/50 shadow-sm">
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                <span className="text-[10.5px] font-black text-zinc-700 dark:text-pink-100 uppercase tracking-widest leading-none">
                  For {nameParam} 👑
                </span>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-2">
                {/* PDF Print Button */}
                <button
                  onClick={handlePrintPDF}
                  className="p-2.5 bg-white/70 hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 rounded-full border border-pink-100/50 dark:border-white/5 shadow-sm transition-colors cursor-pointer"
                  title="Download / Print scrap-book PDF"
                >
                  <Download className="w-4 h-4" />
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={handleDarkModeToggle}
                  className="p-2.5 bg-white/70 hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 rounded-full border border-pink-100/50 dark:border-white/5 shadow-sm transition-colors cursor-pointer"
                  title="Toggle Light/Dark Theme"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-500 fill-amber-300" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* Share URL Button */}
                <button
                  onClick={handleShare}
                  className="p-2.5 bg-white/70 hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 rounded-full border border-pink-100/50 dark:border-white/5 shadow-sm transition-colors cursor-pointer relative"
                  title="Copy/Share Surprise Link"
                >
                  <Share2 className="w-4 h-4" />
                  
                  {/* Copy Alert bubble */}
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: -30, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute right-0 top-0 px-2.5 py-1 bg-zinc-900 text-white text-[9.5px] rounded-lg shadow-md font-bold text-center block w-24"
                      >
                        Copied Link!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Main Interactive Deck */}
            <main className="w-full flex-1 flex flex-col items-center">
              
              {/* Secret Lover Console (Admin Mode) */}
              {isAdmin && (
                <div className="w-full max-w-sm glass p-5 rounded-3xl border border-dashed border-rose-350 dark:border-rose-800/40 my-6 bg-white/70 dark:bg-zinc-900/80 shadow-md text-left z-30 no-print animate-pulse-slow">
                  <div className="flex items-center gap-2 mb-3 text-rose-500">
                    <HeartHandshake className="w-4 h-4 text-rose-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Shashank's Secrets Console
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 font-mono text-[10px] text-zinc-650 dark:text-zinc-350">
                    <div>
                      <span className="text-rose-500 font-bold">★ Secret Wish:</span>
                      <p className="font-sans italic text-zinc-800 dark:text-pink-100 bg-rose-50/20 dark:bg-zinc-800/50 p-2.5 rounded-2xl mt-1 text-xs leading-relaxed">
                        {adminData.wish}
                      </p>
                    </div>
                    <div className="mt-1">
                      <span className="text-rose-500 font-bold">★ Selected Gift:</span>
                      <p className="font-sans text-zinc-800 dark:text-pink-105 bg-rose-50/20 dark:bg-zinc-800/50 p-2.5 rounded-2xl mt-1 text-xs font-semibold leading-relaxed">
                        {adminData.gift}
                      </p>
                    </div>
                    <div className="mt-1 flex justify-between items-center bg-rose-50/20 dark:bg-zinc-800/30 p-2.5 rounded-2xl">
                      <span className="text-rose-500 font-bold">★ Claims Redeemed:</span>
                      <span className="font-sans font-bold text-xs bg-rose-500 text-white px-2.5 py-0.5 rounded-full">
                        {adminData.couponsCount} / 4
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 1: Love Letter */}
              <section id="love-letter" className="w-full print-page-break flex flex-col items-center py-6">
                <LoveLetter />
              </section>

              <hr className="w-24 border-rose-200/50 my-6 no-print" />

              {/* Section 2: Reasons I Love You */}
              <section id="reasons" className="w-full print-page-break flex flex-col items-center py-6">
                <ReasonsCards />
              </section>

              <hr className="w-24 border-rose-200/50 my-6 no-print" />

              {/* Section 5: Birthday Wishes */}
              <section id="wishes" className="w-full print-page-break flex flex-col items-center py-6">
                <BirthdayWishes />
              </section>

              <hr className="w-24 border-rose-200/50 my-6 no-print" />

              {/* Section 6: Birthday Cake */}
              <section id="cake" className="w-full print-page-break flex flex-col items-center py-6 no-print">
                <BirthdayCake />
              </section>

              <hr className="w-24 border-rose-200/50 my-6 no-print" />

              {/* Section 7: Gift Box */}
              <section id="giftbox" className="w-full print-page-break flex flex-col items-center py-6 no-print">
                <GiftBox />
              </section>

              <hr className="w-24 border-rose-200/50 my-6 no-print" />

              {/* Section 9: Love Quiz */}
              <section id="quiz" className="w-full print-page-break flex flex-col items-center py-6 no-print">
                <LoveQuiz />
              </section>

              <hr className="w-24 border-rose-200/50 my-6 no-print" />

              {/* Section 11 & Final Screen celebration */}
              <section id="suprisemsg" className="w-full flex flex-col items-center py-6 pb-24">
                <SurpriseMessage />
              </section>

            </main>

            {/* Persistent Audio floating HUD */}
            <div className="no-print">
              <MusicController />
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Printable Book Footer branding (Only visible during print) */}
      <div className="hidden print:block text-center text-xs mt-12 border-t pt-4 text-zinc-400">
        ♥ Handcrafted with love by Shashank for Akriti (Aku) ♥
      </div>
    </div>
  );
}
