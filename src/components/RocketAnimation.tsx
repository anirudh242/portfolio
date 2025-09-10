'use client';

import { useEffect, useRef } from 'react';

export default function RocketAnimation() {
  const rocketRef = useRef<HTMLDivElement>(null);
  const exhaustRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const rocket = rocketRef.current;
    const exhaust = exhaustRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !rocket || !exhaust) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- Stars setup ---
    let stars: { x: number; y: number; radius: number; speed: number }[] = [];
    const numStars = 200;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2;
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: 0.1 + Math.random() * 0.2,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
      });
      requestAnimationFrame(animate);
    };
    animate();

    // --- Rocket and exhaust scroll logic ---
    const handleScroll = () => {
      const h = window.innerHeight;
      const y = document.documentElement.scrollTop;
      const doc = document.body.offsetHeight - 250;
      const perc = y / (doc - h);

      // Shake rocket and show exhaust
      if (perc > 0) {
        rocket.classList.add('shake_rocket');
        exhaust.classList.add('exhaust');
      } else {
        rocket.classList.remove('shake_rocket');
        exhaust.classList.remove('exhaust');
      }

      // Remove exhaust after rocket is mostly gone
      if (perc > 0.37) {
        exhaust.classList.remove('exhaust');
      }

      // Rocket lift
      let bottom = 0;
      if (perc > 0) {
        bottom = (perc - 0.25) * 133;
        if (perc - 0.25 < 0) bottom = 0;
      }
      rocket.style.bottom = bottom + '%';
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="sky"
        style={{ position: 'fixed', bottom: 0, left: 0, zIndex: -1 }}
      />
      <div ref={rocketRef} id="rocket"></div>
      <div ref={exhaustRef} id="exhaust"></div>
    </>
  );
}
