'use client';

import {
  useTransform,
  motion,
  MotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Animation variants for the rocket and exhaust
const rocketVariants = {
  still: { x: 0 },
  shaking: {
    x: [-1, 1, -1],
    transition: { duration: 0.1, repeat: Infinity },
  },
};

const exhaustVariants = {
  hidden: { x: 0 },
  shaking: {
    x: [-1, 1, -1, 1, -1],
    transition: { duration: 0.1, repeat: Infinity },
  },
};

export default function RocketAnimation({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [isShaking, setIsShaking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Ref for the canvas

  // --- Starfield Animation ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- UPDATED: Star object now includes direction (dx, dy) ---
    let stars: {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
    }[] = [];
    const numStars = 200;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(ratio, ratio);

      stars = [];
      for (let i = 0; i < numStars; i++) {
        const speed = 0.02 + Math.random() * 0.01;
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2,
          // --- UPDATED: Set random direction and speed ---
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // --- UPDATED: Move star in its given direction ---
        star.x += star.dx;
        star.y += star.dy;

        // --- UPDATED: Wrap star around all four edges ---
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- Framer Motion Logic (Unchanged) ---
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setIsShaking(latest > 0);
  });

  const rocketBottom = useTransform(
    scrollYProgress,
    [0.15, 0.4],
    ['0%', '120%']
  );

  const exhaustOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.37],
    [0, 1, 0]
  );

  const exhaustBottom = useTransform(
    scrollYProgress,
    [0, 0.01],
    ['-50px', '0px']
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        id="sky"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          height: '100vh',
          width: '100vw',
        }}
      />
      <motion.div
        id="exhaust"
        style={{
          opacity: exhaustOpacity,
          bottom: exhaustBottom,
        }}
        variants={exhaustVariants}
        animate={isShaking ? 'shaking' : 'hidden'}
      />
      <motion.div
        id="rocket"
        style={{ bottom: rocketBottom }}
        variants={rocketVariants}
        animate={isShaking ? 'shaking' : 'still'}
      />
    </>
  );
}
