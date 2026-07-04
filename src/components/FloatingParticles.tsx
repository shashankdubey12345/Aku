'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'heart' | 'petal' | 'sparkle';
  color: string;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    
    const colors = {
      heart: ['#ffb3c1', '#ff85a1', '#ff477e', '#ff0a54', '#f72585'],
      petal: ['#fff0f3', '#ffccd5', '#ffb3c1', '#ffd6ff', '#e8dbfc'],
      sparkle: ['#ffd700', '#ffffff', '#fff275', '#ff9f1c']
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Helper to draw a heart
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, color: string) => {
      c.save();
      c.globalAlpha = opacity;
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(x, y + size / 4);
      c.quadraticCurveTo(x, y, x - size / 2, y);
      c.quadraticCurveTo(x - size, y, x - size, y + size / 2);
      c.quadraticCurveTo(x - size, y + (size * 7) / 8, x - size / 2, y + (size * 5) / 4);
      c.lineTo(x, y + size * 1.6);
      c.lineTo(x + size / 2, y + (size * 5) / 4);
      c.quadraticCurveTo(x + size, y + (size * 7) / 8, x + size, y + size / 2);
      c.quadraticCurveTo(x + size, y, x + size / 2, y);
      c.quadraticCurveTo(x, y, x, y + size / 4);
      c.fill();
      c.restore();
    };

    // Helper to draw a petal
    const drawPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.globalAlpha = p.opacity;
      c.fillStyle = p.color;
      
      // Draw an organic almond-like petal shape
      c.beginPath();
      c.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
      c.fill();
      
      // Draw a subtle crease line in the petal
      c.strokeStyle = 'rgba(255,255,255,0.4)';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(-p.size, 0);
      c.lineTo(p.size, 0);
      c.stroke();
      
      c.restore();
    };

    // Helper to draw a twinkle sparkle
    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, color: string) => {
      c.save();
      c.globalAlpha = opacity;
      c.fillStyle = color;
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.lineTo(x, y - size);
        c.quadraticCurveTo(x, y, x + size, y);
        c.quadraticCurveTo(x, y, x, y + size);
        c.quadraticCurveTo(x, y, x - size, y);
        c.quadraticCurveTo(x, y, x, y - size);
      }
      c.fill();
      c.restore();
    };

    const createParticle = (initY = false): Particle => {
      const types: ('heart' | 'petal' | 'sparkle')[] = ['heart', 'petal', 'sparkle'];
      // Weigh particle types: more petals and sparkles, fewer hearts
      const rand = Math.random();
      const type = rand < 0.25 ? 'heart' : rand < 0.7 ? 'petal' : 'sparkle';
      
      const size = type === 'heart' 
        ? Math.random() * 8 + 6 
        : type === 'petal' 
          ? Math.random() * 12 + 6 
          : Math.random() * 5 + 3;

      const pColors = colors[type];
      const color = pColors[Math.floor(Math.random() * pColors.length)];

      const x = Math.random() * canvas.width;
      // Start below (for hearts rising) or above (for petals/sparkles falling/twinkling)
      let y = 0;
      if (initY) {
        y = Math.random() * canvas.height;
      } else {
        y = type === 'heart' ? canvas.height + 20 : -20;
      }

      // Speeds: hearts go UP (- speedY), petals drop DOWN (+ speedY)
      const speedY = type === 'heart' 
        ? -(Math.random() * 0.8 + 0.4) 
        : type === 'petal' 
          ? Math.random() * 0.9 + 0.6
          : Math.random() * 0.2 + 0.1; // Sparkles drift very slowly

      return {
        x,
        y,
        size,
        speedY,
        speedX: (Math.random() * 0.6 - 0.3),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.02 - 0.01),
        opacity: Math.random() * 0.6 + 0.3,
        type,
        color,
        swayAmplitude: Math.random() * 20 + 5,
        swaySpeed: Math.random() * 0.02 + 0.005,
        swayOffset: Math.random() * Math.PI * 2
      };
    };

    // Initialize state particles
    const particleCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Move y
        p.y += p.speedY;

        // Apply horizontal sway (sine wave)
        p.swayOffset += p.swaySpeed;
        const sway = Math.sin(p.swayOffset) * p.swayAmplitude * 0.05;
        p.x += p.speedX + sway;

        // Update rotation
        p.rotation += p.rotationSpeed;

        // Render based on type
        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.color);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p);
        } else {
          // Sparkle twinkle
          const opacityVal = p.opacity * (0.6 + 0.4 * Math.sin(p.swayOffset * 2));
          drawSparkle(ctx, p.x, p.y, p.size, opacityVal, p.color);
        }

        // Recycle particles out of bounds
        const isOutOfBounds = p.type === 'heart' 
          ? p.y < -30 
          : p.y > canvas.height + 30;

        if (isOutOfBounds || p.x < -30 || p.x > canvas.width + 30) {
          particles[idx] = createParticle(false);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
