'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { playPopSound, playChimeSound, triggerHaptic } from '@/utils/sounds';

interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  aspect: string; // for representation height variation
}

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const photos: GalleryItem[] = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
      title: 'Our Sweet Sparkle ✨',
      aspect: 'h-64'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
      title: 'Candid Giggles 🌸',
      aspect: 'h-48'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      title: 'Kashi Memories 🌟',
      aspect: 'h-72'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=80',
      title: 'Princess Vibes 👑',
      aspect: 'h-52'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
      title: 'Your Lucky Smile ❤️',
      aspect: 'h-60'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
      title: 'Warm Coffee Chats ☕',
      aspect: 'h-64'
    }
  ];

  const handleOpen = (photo: GalleryItem) => {
    playChimeSound();
    triggerHaptic(100);
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    playPopSound();
    triggerHaptic(60);
    setSelectedPhoto(null);
  };

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="px-3 py-1 font-bold text-xs uppercase bg-rose-100 dark:bg-rose-950 text-rose-500 dark:text-rose-300 rounded-full">
          Glimpses of Us
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 mt-2 text-glow">
          📸 My Princess Gallery
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
          Every picture of you has a story I keep locked in my heart. Tap to zoom.
        </p>
      </motion.div>

      {/* Pinterest Masonry Layout */}
      <div className="columns-2 md:columns-3 gap-4 w-full space-y-4 pb-4">
        {photos.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            onClick={() => handleOpen(item)}
            className="break-inside-avoid relative rounded-2xl overflow-hidden glass border border-pink-100/50 dark:border-white/5 cursor-pointer shadow-sm group"
          >
            <div className={`relative w-full ${item.aspect} overflow-hidden`}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                <div className="bg-white/90 p-2.5 rounded-full shadow-md text-rose-500 scale-90 group-hover:scale-100 transition-transform duration-305">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md flex items-center justify-center">
              <span className="text-xs font-semibold text-zinc-700 dark:text-pink-100 text-center">
                {item.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Responsive Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 w-full h-full bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10 shadow-lg cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image Display */}
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 16 }}
              className="relative max-w-full max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl"
              />
              
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-center">
                <h3 className="text-white text-lg font-bold tracking-wide text-glow">
                  {selectedPhoto.title}
                </h3>
                <p className="text-white/60 text-xs mt-1">
                  Aku's Special Day • Captured with Love
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
