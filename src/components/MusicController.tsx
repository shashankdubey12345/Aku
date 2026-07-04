'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { playBackgroundMusic, pauseBackgroundMusic, triggerHaptic, setMusicVolume } from '@/utils/sounds';

export default function MusicController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize playback state listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const active = (window as any)._musicPlaying;
      if (active) {
        setIsPlaying(true);
      }
    }
  }, []);

  const handlePlayPause = () => {
    triggerHaptic(60);
    if (isPlaying) {
      pauseBackgroundMusic();
      setIsPlaying(false);
      if (typeof window !== 'undefined') (window as any)._musicPlaying = false;
    } else {
      playBackgroundMusic(isMuted ? 0 : 0.4);
      setIsPlaying(true);
      if (typeof window !== 'undefined') (window as any)._musicPlaying = true;
    }
  };

  const handleMuteToggle = () => {
    triggerHaptic(40);
    const newMute = !isMuted;
    setIsMuted(newMute);
    setMusicVolume(newMute ? 0 : 0.4);
  };

  return (
    /* Floating HUD Controller (Pinned Bottom Right) */
    <div className="fixed bottom-6 right-6 z-90 select-none pointer-events-auto no-print">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 1 }}
        className="glass rounded-full px-4 py-2 flex items-center gap-3 shadow-lg border border-pink-100 dark:border-white/10"
      >
        {/* Animated sound bars */}
        {isPlaying && !isMuted ? (
          <div className="flex items-end gap-0.5 h-3.5 w-4 mr-0.5">
            <span className="w-0.75 bg-rose-500 rounded-xs animate-[bounce_0.8s_infinite] [animation-delay:0.1s] origin-bottom h-3" />
            <span className="w-0.75 bg-rose-500 rounded-xs animate-[bounce_0.6s_infinite] [animation-delay:0.3s] origin-bottom h-2" />
            <span className="w-0.75 bg-rose-500 rounded-xs animate-[bounce_0.9s_infinite] [animation-delay:0.5s] origin-bottom h-4" />
          </div>
        ) : (
          <Music className="w-4 h-4 text-zinc-400 dark:text-zinc-550" />
        )}

        {/* Title label */}
        <span className="text-[10px] font-bold text-zinc-655 dark:text-pink-100 hidden sm:inline tracking-wider uppercase">
          {isPlaying && !isMuted ? 'Happy Birthday' : 'Music Paused'}
        </span>

        <div className="flex items-center gap-1.5 border-l border-pink-200/50 dark:border-white/10 pl-2">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="p-1.5 hover:bg-rose-50 dark:hover:bg-zinc-800 rounded-full text-rose-550 transition-colors cursor-pointer"
            title="Play/Pause Background Music"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-rose-500 text-rose-550" /> : <Play className="w-4 h-4 fill-rose-550 text-rose-550" />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={handleMuteToggle}
            className="p-1.5 hover:bg-rose-50 dark:hover:bg-zinc-800 rounded-full text-zinc-555 dark:text-zinc-300 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
