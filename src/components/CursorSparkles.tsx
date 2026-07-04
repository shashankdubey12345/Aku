'use client';

import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number; // how long it lives (frames)
  maxLife: number;
}

export default function CursorSparkles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let sparkles: Sparkle[] = [];
    let animationId: number;

    const colors = [
      '#ff85a1', // Pink
      '#ff477e', // Rose
      '#d6bbfb', // Lavender
      '#ffd700', // Gold
      '#ffffff', // White
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createSparkle = (x: number, y: number) => {
      const count = Math.random() > 0.5 ? 2 : 1; // Emit 1-2 elements per movement stamp
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const maxLife = Math.random() * 20 + 20; // 20 to 40 frames
        
        // Random velocity spread
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed + 0.2; // slight gravity pull

        sparkles.push({
          x,
          y,
          vx,
          vy,
          size,
          color,
          opacity: 1,
          life: maxLife,
          maxLife,
        });
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      createSparkle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        createSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove);

    const drawSparkleStar = (c: CanvasRenderingContext2D, s: Sparkle) => {
      c.save();
      c.globalAlpha = s.opacity;
      c.fillStyle = s.color;
      c.beginPath();
      
      const x = s.x;
      const y = s.y;
      const r = s.size;
      
      // Draw a neat 4-pointed star
      c.moveTo(x, y - r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.quadraticCurveTo(x, y, x, y + r);
      c.quadraticCurveTo(x, y, x - r, y);
      c.quadraticCurveTo(x, y, x, y - r);
      
      c.fill();
      c.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        
        // Apply physics
        s.x += s.vx;
        s.y += s.vy;
        s.life--;
        s.opacity = s.life / s.maxLife;

        drawSparkleStar(ctx, s);

        if (s.life <= 0) {
          sparkles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden"
    />
  );
}
