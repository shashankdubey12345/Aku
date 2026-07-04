'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Plus, Check, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChimeSound, playSuccessSound, triggerHaptic } from '@/utils/sounds';

interface Coupon {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

const couponsList: Coupon[] = [
  { id: 1, title: 'Banaras Ghat Walk 🌅', desc: 'Valid for a quiet evening stroll along Ganga Aarti.', icon: '🌊' },
  { id: 2, title: 'Warm Hug Token 🤗', desc: 'Valid for an infinite, giant hug whenever you feel low.', icon: '💝' },
  { id: 3, title: 'Late Night Ice Cream 🍦', desc: 'Redeemable for a midnight dessert run of your choice.', icon: '🍨' },
  { id: 4, title: 'Shashank’s Yes Day Pass ✅', desc: 'A full day where I must say YES to all your commands.', icon: '👑' },
];

const memorySlides = [
  {
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=650&q=80',
    title: 'Hold My Hand',
    desc: '"In case you ever foolishly forget: I am never not thinking of you." — Virginia Woolf'
  },
  {
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=650&q=80',
    title: 'Ganga Aarti Lights',
    desc: '"You are the light that guides me through the sacred ghats and quiet streets of my heart."'
  }
];

const giftChoices = [
  { id: 'dinner', label: '🕯 Candlelight Dinner Date', desc: 'A cozy evening at a premium restaurant' },
  { id: 'shopping', label: '🛍 Surprise Mall Spree', desc: 'A fun afternoon of retail therapy' },
  { id: 'album', label: '🎨 Custom Handmade Frame', desc: 'A detailed memory book of our milestones' }
];

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'coupons' | 'memories' | 'game'>('coupons');
  const [redeemed, setRedeemed] = useState<number[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedGift, setSelectedGift] = useState<string | null>(null);

  const handleOpen = () => {
    if (isOpen) return;

    playChimeSound();
    triggerHaptic(250);
    setIsOpen(true);

    // Initial confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff477e', '#ff85a1', '#d6bbfb', '#ffd700', '#ffffff']
    });
  };

  const handleRedeemCoupon = (id: number) => {
    if (redeemed.includes(id)) return;
    playSuccessSound();
    triggerHaptic(120);
    const newRedeemed = [...redeemed, id];
    setRedeemed(newRedeemed);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aku_coupons', JSON.stringify(newRedeemed));
    }

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.6 },
      colors: ['#ff477e', '#d6bbfb']
    });
  };

  const handleGiftSelect = (id: string) => {
    if (selectedGift) return;
    playChimeSound();
    triggerHaptic(150);
    setSelectedGift(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aku_gift', id);
    }

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#ff477e', '#ffd700', '#a855f7']
    });
  };

  const handleNextSlide = () => {
    triggerHaptic(40);
    setSlideIndex((prev) => (prev + 1) % memorySlides.length);
  };

  const handlePrevSlide = () => {
    triggerHaptic(40);
    setSlideIndex((prev) => (prev - 1 + memorySlides.length) % memorySlides.length);
  };

  const handleReset = () => {
    triggerHaptic(60);
    setIsOpen(false);
    setActiveTab('coupons');
    setRedeemed([]);
    setSelectedGift(null);
    setSlideIndex(0);
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
          Tap the box to open your interactive gift catalog, Aku!
        </p>
      </motion.div>

      {/* Gift Box Card Container */}
      <div className="relative w-full max-w-[340px] flex flex-col items-center justify-center min-h-[420px]">
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
                <div className="absolute left-[80px] top-0 w-[20px] h-[55px] bg-rose-600 z-10" />
                <div className="absolute -top-6 left-[65px] w-12 h-6 flex justify-between z-20">
                  <div className="w-6 h-6 border-4 border-rose-600 rounded-full rotate-45 transform bg-rose-700/10" />
                  <div className="w-6 h-6 border-4 border-rose-600 rounded-full -rotate-45 transform bg-rose-700/10" />
                </div>
              </motion.div>

              {/* Box Base */}
              <div className="w-[160px] h-[140px] bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 relative rounded-b-xl z-10 -mt-1 shadow-xl flex justify-center border-t border-white/20">
                <div className="absolute left-[70px] top-0 w-[20px] h-[140px] bg-rose-600" />
                <div className="absolute bottom-[-10px] w-[140px] h-[15px] bg-rose-200/40 dark:bg-black/40 blur-md rounded-full -z-10" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-8 py-3 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-650 font-extrabold text-white text-xs rounded-full shadow-lg hover:shadow-xl cursor-pointer"
              >
                🎁 Open Your Gift
              </motion.button>
            </motion.div>
          ) : (
            /* Open Lid Surprise Roll Tabs */
            <motion.div
              key="box-open"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="w-full glass p-5 rounded-3xl border border-pink-200 dark:border-white/10 shadow-xl flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 relative overflow-hidden"
            >
              {/* Tab Bar Selector */}
              <div className="flex gap-1 w-full bg-rose-50/50 dark:bg-zinc-800 p-1 rounded-xl mb-4 border border-pink-100/50 dark:border-white/5">
                {(['coupons', 'memories', 'game'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { triggerHaptic(30); setActiveTab(tab); }}
                    className={`flex-1 text-center py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-zinc-550 dark:text-zinc-400 hover:text-rose-500'
                    }`}
                  >
                    {tab === 'coupons' ? 'Vouchers' : tab === 'memories' ? 'Memories' : 'Pick Gift'}
                  </button>
                ))}
              </div>

              {/* Tab Contents: Vouchers */}
              <div className="w-full flex-1 max-h-[300px] overflow-y-auto no-scrollbar py-1">
                {activeTab === 'coupons' && (
                  <div className="flex flex-col gap-2.5">
                    {couponsList.map((cp) => {
                      const isClaimed = redeemed.includes(cp.id);
                      return (
                        <div
                          key={cp.id}
                          className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-350 ${
                            isClaimed
                              ? 'bg-emerald-50/30 dark:bg-emerald-950/15 border-dashed border-emerald-300 dark:border-emerald-800'
                              : 'bg-white/70 dark:bg-zinc-850/60 border-rose-100/40 hover:bg-rose-50/20'
                          }`}
                        >
                          <span className="text-2xl">{cp.icon}</span>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-xs font-bold truncate ${isClaimed ? 'text-emerald-700 dark:text-emerald-400 line-through' : 'text-zinc-800 dark:text-pink-100'}`}>
                              {cp.title}
                            </h4>
                            <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-0.5 leading-relaxed">
                              {cp.desc}
                            </p>
                          </div>
                          <button
                            disabled={isClaimed}
                            onClick={() => handleRedeemCoupon(cp.id)}
                            className={`py-1 px-3 rounded-full text-[9px] font-extrabold uppercase transition-colors cursor-pointer ${
                              isClaimed
                                ? 'bg-emerald-500 text-white'
                                : 'bg-rose-100 text-rose-600 hover:bg-rose-200 dark:bg-rose-950/50 dark:text-rose-300'
                            }`}
                          >
                            {isClaimed ? <Check className="w-3 h-3" /> : 'Claim'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab Contents: Memories snaps */}
                {activeTab === 'memories' && (
                  <div className="flex flex-col items-center">
                    <div className="w-full h-36 rounded-2xl overflow-hidden shadow-xs relative border border-pink-100/50 dark:border-white/5">
                      <img
                        src={memorySlides[slideIndex].url}
                        alt={memorySlides[slideIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      
                      {/* Left Arrow */}
                      <button
                        onClick={handlePrevSlide}
                        className="absolute left-2 top-[40%] p-1 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white text-zinc-800 dark:text-pink-100 transition-colors shadow-xs cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      {/* Right Arrow */}
                      <button
                        onClick={handleNextSlide}
                        className="absolute right-2 top-[40%] p-1 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white text-zinc-800 dark:text-pink-100 transition-colors shadow-xs cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-3 text-center px-1">
                      <h4 className="text-xs font-black text-rose-500 dark:text-pink-400">
                        {memorySlides[slideIndex].title}
                      </h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 italic mt-1 font-serif leading-relaxed">
                        {memorySlides[slideIndex].desc}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab Contents: Choice Pick Game */}
                {activeTab === 'game' && (
                  <div className="flex flex-col gap-2.5">
                    {!selectedGift ? (
                      <>
                        <p className="text-[9.5px] text-zinc-400 dark:text-zinc-500 text-center font-bold uppercase tracking-wider mb-1">
                          Pick one gift you want me to arrange first:
                        </p>
                        {giftChoices.map((gt) => (
                          <button
                            key={gt.id}
                            onClick={() => handleGiftSelect(gt.id)}
                            className="bg-white/70 dark:bg-zinc-850/60 p-3 rounded-2xl border border-rose-100/30 hover:border-rose-350 text-left transition-all hover:bg-rose-50/10 cursor-pointer w-full group"
                          >
                            <h4 className="text-xs font-bold text-zinc-700 dark:text-pink-100 group-hover:text-rose-500 transition-colors">
                              {gt.label}
                            </h4>
                            <p className="text-[9.5px] text-zinc-450 dark:text-zinc-500 mt-0.5">
                              {gt.desc}
                            </p>
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-center p-4 bg-rose-50/20 dark:bg-rose-955/10 rounded-2xl border border-rose-200/50">
                        <Award className="w-10 h-10 text-amber-500 animate-bounce" />
                        <h4 className="text-xs font-black text-rose-600 dark:text-pink-300 mt-2">
                          Selection Registered! 🎁
                        </h4>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1.5 px-3">
                          You chose: <br /><b>{giftChoices.find((g) => g.id === selectedGift)?.label}</b>.
                        </p>
                        <span className="text-[9.5px] text-rose-455 font-bold uppercase tracking-widest mt-3 block">
                          I will get this ready for you, Princess! 😉❤️
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Reset Box Button */}
              <button
                onClick={handleReset}
                className="mt-4 text-[9px] font-extrabold text-zinc-400 dark:text-zinc-500 hover:text-rose-500 transition-colors uppercase tracking-widest cursor-pointer"
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
