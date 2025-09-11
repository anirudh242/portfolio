'use client';

import RocketAnimation from '@/components/RocketAnimation';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();

  // --- UPDATED TIMING ---
  // The hero text now starts fading out slightly AFTER the rocket begins to move.
  // It starts fading at 18% scroll and is gone by 30% scroll.
  const heroOpacity = useTransform(scrollYProgress, [0.18, 0.3], [1, 0]);

  // The main content still fades in after the rocket is gone.
  // This timing remains good.
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  return (
    <>
      <RocketAnimation scrollYProgress={scrollYProgress} />

      <section className="relative h-screen">
        <motion.div
          style={{ opacity: heroOpacity }}
          className="fixed inset-0 flex flex-col justify-center items-center text-center px-4 gap-2"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[100px] font-extrabold tracking-tight leading-none">
            Anirudh Bhardwaj
          </h1>
          <p className="text-lg italic sm:text-xl md:text-2xl lg:text-3xl opacity-70">
            Scroll to begin the journey
          </p>
        </motion.div>
      </section>

      <motion.main
        style={{ opacity: contentOpacity }}
        className="relative z-10"
      >
        <section className="h-screen grid place-items-center">
          <h2 className="text-4xl font-semibold">About Me</h2>
        </section>

        <section className="h-screen grid place-items-center">
          <h2 className="text-4xl font-semibold">Projects</h2>
        </section>

        <section className="h-screen grid place-items-center">
          <h2 className="text-4xl font-semibold">Contact</h2>
        </section>
      </motion.main>
    </>
  );
}
