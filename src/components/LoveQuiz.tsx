'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessSound, playPopSound, triggerHaptic } from '@/utils/sounds';

interface Question {
  id: number;
  qText: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  successMessage: string;
}

export default function LoveQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<'idle' | 'success' | 'incorrect'>('idle');
  const [score, setScore] = useState(0);
  const [shakeCard, setShakeCard] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      qText: "What is my absolute favorite nickname for you?",
      options: ["Aki", "Princess", "Aku ❤️", "Pinky"],
      correctAnswer: "Aku ❤️",
      hint: "It starts with A and ends with U, and has my whole heart attached to it!",
      successMessage: "Correct! You will always be my sweet Aku."
    },
    {
      id: 2,
      qText: "Where did we take our most divine, magical evening trip together?",
      options: ["Pondicherry", "Banaras (Kashi) ⛵", "Manali Valley", "Goa Beaches"],
      correctAnswer: "Banaras (Kashi) ⛵",
      hint: "Think about boat rides, floating diyas, and temple bells near the Ganges!",
      successMessage: "Yes! Sitting at Assi Ghat with you was the most peaceful day of my life."
    },
    {
      id: 3,
      qText: "Which food/drink combo is our absolute favourite to share?",
      options: ["Mexican Tacos + Soda", "Spicy Ramen + Green Tea", "Momos + Cold Coffee ☕", "Burgers + Milkshake"],
      correctAnswer: "Momos + Cold Coffee ☕",
      hint: "Our typical go-to date snack that always makes us super happy!",
      successMessage: "Aha! Momos and cold coffee are indeed our soul fuel!"
    },
    {
      id: 4,
      qText: "What does Shashank always call Akriti when he talks about luck?",
      options: ["My lucky charm! ✨", "My shooting star", "My golden coin", "My fortune cookie"],
      correctAnswer: "My lucky charm! ✨",
      hint: "It makes my life full of blessings whenever you are near!",
      successMessage: "Correct! You are, and will always be, my lucky charm!"
    }
  ];

  const handleOptionClick = (opt: string) => {
    if (quizState === 'success') return;

    setSelectedOpt(opt);
    const correct = opt === questions[currentIdx].correctAnswer;

    if (correct) {
      playSuccessSound();
      triggerHaptic(150);
      setQuizState('success');
      setScore((s) => s + 1);

      // Trigger beautiful heart-shaped confetti explosion
      const duration = 1.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#ff477e', '#ff85a1', '#ffd700']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#ff477e', '#ff85a1', '#ffd700']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();

    } else {
      playPopSound();
      triggerHaptic(80);
      setQuizState('incorrect');

      // Shake animation trigger
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setQuizState('idle');
    setCurrentIdx((idx) => idx + 1);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setQuizState('idle');
    setScore(0);
  };

  const currentQ = questions[currentIdx];
  const isFinished = currentIdx >= questions.length;

  return (
    <div className="py-12 px-4 w-full max-w-4xl mx-auto flex flex-col items-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="px-3 py-1 font-bold text-xs uppercase bg-rose-100 dark:bg-rose-955 text-rose-500 dark:text-rose-300 rounded-full">
          Fun Trivia
        </span>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500 mt-2 text-glow">
          🧩 Our Love Quiz
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-xs md:text-sm italic">
          Let's see how well you know our little story, Princess!
        </p>
      </motion.div>

      {/* Quiz Card */}
      <motion.div
        animate={shakeCard ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[340px] glass p-6 rounded-3xl shadow-lg border border-pink-100 dark:border-white/5 relative min-h-[380px] flex flex-col justify-between"
      >
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 justify-between gap-4"
            >
              {/* Card Header progress */}
              <div className="flex justify-between items-center text-[10px] font-bold text-zinc-450 uppercase">
                <span>Question {currentIdx + 1} of {questions.length}</span>
                <span className="text-rose-500">Score: {score}</span>
              </div>

              {/* Question Text */}
              <div className="my-2">
                <h3 className="text-base font-extrabold text-zinc-800 dark:text-pink-100 leading-snug">
                  {currentQ.qText}
                </h3>
              </div>

              {/* Options buttons */}
              <div className="flex flex-col gap-2.5 my-2">
                {currentQ.options.map((opt) => {
                  const isCorrectAnswer = opt === currentQ.correctAnswer;
                  const isSelected = opt === selectedOpt;

                  let btnStyle = "bg-white/70 dark:bg-zinc-800/40 hover:bg-rose-50/50 border-pink-100/40 dark:border-white/5 text-zinc-800 dark:text-pink-100";

                  if (quizState === 'success' && isCorrectAnswer) {
                    btnStyle = "bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300 font-extrabold shadow-sm";
                  } else if (isSelected && quizState === 'incorrect') {
                    btnStyle = "bg-rose-100 dark:bg-rose-950/40 border-rose-300 text-rose-700 dark:text-rose-300 font-extrabold shadow-sm";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      disabled={quizState === 'success'}
                      className={`w-full text-left py-3 px-4 rounded-2xl border text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>

                      {quizState === 'success' && isCorrectAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                      {isSelected && quizState === 'incorrect' && (
                        <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status / Hints feedback bar */}
              <div className="min-h-[50px] flex items-center justify-center text-center">
                {quizState === 'success' && (
                  <motion.p
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 italic px-2"
                  >
                    🎉 {currentQ.successMessage}
                  </motion.p>
                )}
                {quizState === 'incorrect' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] font-semibold text-rose-500 dark:text-rose-400 italic px-2 flex items-center gap-1"
                  >
                    💡 Hint: {currentQ.hint}
                  </motion.p>
                )}
              </div>

              {/* Next Question Control */}
              <div className="mt-2">
                {quizState === 'success' && (
                  <motion.button
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onClick={handleNext}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 font-extrabold text-white text-xs rounded-full shadow-md cursor-pointer hover:shadow-lg transition-all"
                  >
                    Next Question ➔
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            /* Finished State */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center gap-6 py-6"
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-rose-950/40 flex items-center justify-center shadow-lg border border-pink-200">
                <Sparkles className="w-8 h-8 text-rose-500 animate-spin-slow" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-zinc-950 dark:text-zinc-950">
                  you aced it, princess 👑
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 px-2 max-w-[280px]">
                  You got all answers correct! Every memory in Banaras and every shared MOMO date is safely stored in our hearts.
                </p>
                <div className="mt-4 px-4 py-1 bg-rose-100 dark:bg-rose-955 text-rose-600 dark:text-pink-400 font-black rounded-full inline-block text-xs uppercase tracking-wider">
                  Score: {score} / 4 ❤️
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="py-2.5 px-6 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-pink-100 text-xs font-bold rounded-full transition-all border border-zinc-200 dark:border-zinc-700 cursor-pointer"
              >
                Play Again ↻
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
