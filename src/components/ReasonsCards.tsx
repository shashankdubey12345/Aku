'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Smile, Sparkles, Laugh, Shield, Wand2, Target, Home, Gem,
  Infinity, HeartHandshake, Compass, Moon, Brain, Heart,
  Gift, HeartPulse, RefreshCw, Star
} from 'lucide-react';
import { playPopSound, triggerHaptic } from '@/utils/sounds';

interface Reason {
  id: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

export default function ReasonsCards() {
  const reasons: Reason[] = [
    {
      id: 1,
      icon: <Smile className="w-6 h-6 text-rose-500" />,
      title: "Your Smile",
      desc: "Your smile has the power to make my darkest and most stressful days instantly beautiful.",
      color: "from-pink-100 to-rose-100 dark:from-pink-950/30 dark:to-rose-950/30"
    },
    {
      id: 2,
      icon: <Sparkles className="w-6 h-6 text-fuchsia-500" />,
      title: "Your Kindness",
      desc: "The gentle and pure way you care for people melts my heart every single day.",
      color: "from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30"
    },
    {
      id: 3,
      icon: <Laugh className="w-6 h-6 text-pink-500" />,
      title: "Cute Humour",
      desc: "You always make me laugh with your sweet little quirks, copycat voices, and silly giggles.",
      color: "from-rose-100 to-pink-100 dark:from-rose-950/30 dark:to-pink-950/30"
    },
    {
      id: 4,
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: "Your Inner Strength",
      desc: "You are far stronger and more resilient than you know, and I admire your brave spirit.",
      color: "from-teal-100 to-emerald-100 dark:from-teal-950/30 dark:to-emerald-950/30"
    },
    {
      id: 5,
      icon: <Wand2 className="w-6 h-6 text-amber-500" />,
      title: "Magical Aura",
      desc: "Every single moment I spend with you, whether doing something big or just silent, feels magical.",
      color: "from-pink-100 to-amber-100 dark:from-pink-950/30 dark:to-amber-950/30"
    },
    {
      id: 6,
      icon: <Target className="w-6 h-6 text-violet-500" />,
      title: "Your Determination",
      desc: "I admire how focused you are on what you want to achieve. Your drive keeps me going.",
      color: "from-indigo-100 to-purple-100 dark:from-indigo-950/30 dark:to-purple-950/30"
    },
    {
      id: 7,
      icon: <Home className="w-6 h-6 text-rose-600" />,
      title: "You Are Home",
      desc: "No matter where I go or how chaotic life becomes, your arms remain my safest place.",
      color: "from-rose-100/90 to-purple-100/90 dark:from-rose-950/40 dark:to-purple-950/40"
    },
    {
      id: 8,
      icon: <Gem className="w-6 h-6 text-cyan-500" />,
      title: "My Lucky Charm",
      desc: "You bring positivity and grace into my universe. You truly are my most precious charm.",
      color: "from-sky-100 to-cyan-100 dark:from-sky-950/30 dark:to-cyan-950/30"
    },
    {
      id: 9,
      icon: <Infinity className="w-6 h-6 text-rose-500" />,
      title: "Infinite Choices",
      desc: "In every lifetime, in every alternate reality, I would always cross paths and choose you.",
      color: "from-pink-100 to-violet-100 dark:from-pink-950/30 dark:to-violet-950/30"
    },
    {
      id: 10,
      icon: <HeartHandshake className="w-6 h-6 text-pink-600" />,
      title: "Holding Hands",
      desc: "The way your fingers lock perfectly with mine, matching my steps. Our hearts connect too.",
      color: "from-rose-100 to-pink-100 dark:from-rose-950/30 dark:to-pink-950/30"
    },
    {
      id: 11,
      icon: <Compass className="w-6 h-6 text-amber-600" />,
      title: "Mystical Banaras Trip",
      desc: "Holding your hand at Assi Ghat, seeing the reflection of Ganga Aarti in your eyes was divine.",
      color: "from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30"
    },
    {
      id: 12,
      icon: <Moon className="w-6 h-6 text-indigo-500" />,
      title: "Cute Sleepy Habit",
      desc: "Your cute little half-asleep yawns and morning grumbles that only I get to witness.",
      color: "from-indigo-100 to-slate-100 dark:from-indigo-950/30 dark:to-slate-950/30"
    },
    {
      id: 13,
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "Telepathic Connection",
      desc: "How we can understand what each other is thinking with just one simple look from across the room.",
      color: "from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30"
    },
    {
      id: 14,
      icon: <HeartPulse className="w-6 h-6 text-red-500" />,
      title: "Gentle Caretaker",
      desc: "The endless warmth and concern you show when I am sick or feeling stressed.",
      color: "from-red-100 to-rose-100 dark:from-red-950/30 dark:to-rose-950/30"
    },
    {
      id: 15,
      icon: <Gift className="w-6 h-6 text-blue-500" />,
      title: "Your Cute Excitement",
      desc: "The absolute, childish spark in your eyes when you open gifts or try new foods.",
      color: "from-blue-100 to-violet-100 dark:from-blue-950/30 dark:to-violet-950/30"
    },
    {
      id: 16,
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "My Inspiration",
      desc: "You inspire me to study harder, work smarter, and be a kinder, better man every day.",
      color: "from-yellow-105 to-pink-100 dark:from-yellow-950/30 dark:to-pink-950/30"
    },
    {
      id: 17,
      icon: <RefreshCw className="w-6 h-6 text-rose-500" />,
      title: "Unwavering Trust",
      desc: "The solid foundation of trust we share, ensuring we can resolve anything together.",
      color: "from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30"
    }
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const handleCardInteraction = () => {
    playPopSound();
    triggerHaptic(40);
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
          Deep Feelings
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 mt-2 text-glow">
          💝 Reasons I Love You
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
          To my princess Aku - here are just a few little things that make you irreplaceable...
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {reasons.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            onClick={handleCardInteraction}
            onTouchStart={handleCardInteraction}
            className={`glass-card p-5 rounded-2xl border-t bg-gradient-to-br ${item.color} cursor-pointer flex flex-col gap-3 relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 dark:bg-white/5 rounded-bl-full flex items-center justify-center translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform duration-300">
              <span className="text-[10px] font-bold text-rose-500/30 dark:text-white/20 select-none mr-2 mb-2">
                #{item.id}
              </span>
            </div>

            <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-md animate-sway-medium">
              {item.icon}
            </div>

            <div>
              <h3 className="font-extrabold text-zinc-800 dark:text-pink-100 text-base">
                {item.title}
              </h3>
              <p className="text-zinc-650 dark:text-zinc-350 text-xs mt-1 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose-400 to-pink-500 w-0 group-hover:w-full transition-all duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
