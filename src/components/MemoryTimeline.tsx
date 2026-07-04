'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { playPopSound, triggerHaptic } from '@/utils/sounds';

interface Memory {
  id: number;
  title: string;
  date: string;
  location: string;
  caption: string;
  imageUrl: string;
}

export default function MemoryTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const memories: Memory[] = [
    {
      id: 1,
      title: "First Meeting",
      date: "October 12, 2023",
      location: "Cozy Cafe Corner",
      caption: "That nervous eye contact, the warm cup of coffee, and how my heart skipped a beat when you smiled at me. I knew then you were special, Aku.",
      imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=650&q=80"
    },
    {
      id: 2,
      title: "Our First Selfie",
      date: "November 05, 2023",
      location: "Sunny Park Walk",
      caption: "Trying to get both of us in the frame! You laughed at my front-facing camera struggles, leaning close so our shoulders touched. A core memory.",
      imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=650&q=80"
    },
    {
      id: 3,
      title: "The First Gift",
      date: "December 25, 2023",
      location: "Bright Festive Evening",
      caption: "I wrapped it myself (quite badly, I admit!). The sheer child-like excitement in your eyes as you ripped open the pastel paper made my whole winter warm.",
      imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=650&q=80"
    },
    {
      id: 4,
      title: "Unforgettable Banaras",
      date: "February 14, 2024",
      location: "Assi Ghat & Kashi Vishwanath",
      caption: "Sitting silently on the wooden boat as floating lamps lit up the Ganges. The sound of Kashi temple bells, and praying side-by-side with you. Best date ever.",
      imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Our First Road Trip",
      date: "April 18, 2024",
      location: "Swaying Hills & Clouds",
      caption: "Windows down, singing lofi covers out of tune, and chasing the sunset through winding misty roads. Getting lost with you is my favourite adventure.",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=650&q=80"
    }
  ];

  const handleCardTouch = () => {
    playPopSound();
    triggerHaptic(50);
  };

  return (
    <div className="py-12 bg-romantic-pink-light/30 dark:bg-zinc-950/20 w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="px-3 py-1 font-bold text-xs uppercase bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 rounded-full">
            Our Journey
          </span>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 mt-2 text-glow">
            🗓️ Romantic Memory Timeline
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
            Swipe left or scroll to walked down memory lane...
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-xs text-rose-500 font-bold">
          Scroll Right <ArrowRight className="w-4 h-4 animate-sway-medium" />
        </div>
      </div>

      {/* Timeline Scroll Runway */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto px-4 md:px-16 pb-8 pt-4 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing w-full"
      >
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 70, damping: 14, delay: index * 0.15 }}
            onClick={handleCardTouch}
            className="flex-shrink-0 w-[290px] md:w-[350px] snap-center rounded-2xl glass shadow-lg border border-pink-100 dark:border-white/5 overflow-hidden flex flex-col group relative"
          >
            {/* Memory Header Image */}
            <div className="relative h-[200px] w-full overflow-hidden">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating badges on photo */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-white/95 dark:bg-zinc-900/95 text-rose-600 rounded-full shadow-md">
                  <Calendar className="w-3 h-3" />
                  {memory.date}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-black/60 text-white rounded-full backdrop-blur-sm self-start">
                  <MapPin className="w-2.5 h-2.5 text-orange-400" />
                  {memory.location}
                </span>
              </div>
              
              <div className="absolute bottom-3 left-4 z-10">
                <h3 className="font-extrabold text-white text-lg tracking-wide text-glow">
                  {memory.title}
                </h3>
              </div>
            </div>

            {/* Memory caption */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md">
              <p className="text-zinc-650 dark:text-zinc-350 text-xs md:text-sm font-sans italic leading-relaxed">
                "{memory.caption}"
              </p>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-rose-100/40 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-pink-500">
                  Milestone #{index + 1}
                </span>
                <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-rose-950/40 flex items-center justify-center text-[10px] font-bold text-rose-600">
                  ❤
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
