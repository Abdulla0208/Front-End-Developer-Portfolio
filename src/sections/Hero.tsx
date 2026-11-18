import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { EASE_EDITORIAL } from '../components/MotionPrimitives';
import { contactInfo } from '../data/portfolioData';

const PORTRAITS = [
  {
    src: '/hero-portrait-2.png',
    alt: 'Stylized confident portrait of Shaik Abdulla in charcoal blazer',
  },
  {
    src: '/hero-portrait-3.png',
    alt: 'Stylized confident portrait of Shaik Abdulla in tech hoodie with headphones',
  },
];

export function Hero() {
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    PORTRAITS.forEach((p) => {
      const img = new Image();
      img.src = p.src;
    });
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let swapTimeout: number | undefined;
    let clearTimeoutId: number | undefined;

    const intervalId = window.setInterval(() => {
      if (reducedMotion) {
        setPortraitIndex((prev) => (prev + 1) % PORTRAITS.length);
        return;
      }

      setIsScanning(true);
      swapTimeout = window.setTimeout(() => {
        setPortraitIndex((prev) => (prev + 1) % PORTRAITS.length);
      }, 160);

      clearTimeoutId = window.setTimeout(() => {
        setIsScanning(false);
      }, 400);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
      if (swapTimeout) window.clearTimeout(swapTimeout);
      if (clearTimeoutId) window.clearTimeout(clearTimeoutId);
    };
  }, []);

  const nameStyle =
    'font-display w-full text-center text-[clamp(3.6rem,17.5vw,17.5rem)] leading-[0.78] tracking-[-0.03em] select-none';

  const currentPortrait = PORTRAITS[portraitIndex];

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-architectural-grid px-5 pt-20 md:px-12 md:pt-24 lg:px-16"
    >
      {/* Ambient radial light behind right-aligned portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[44%] left-[58%] h-[min(75vw,620px)] w-[min(75vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl md:left-[78%]"
        style={{
          background:
            'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        }}
      />

      {/* Subtle orbital ring behind character */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.48, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.12, ease: EASE_EDITORIAL }}
        className="pointer-events-none absolute top-[45%] left-[56%] h-[min(64vw,430px)] w-[min(64vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--border-hairline)] md:left-[78%]"
      />

      {/* MAIN HERO LAYERED COMPOSITION — SHAIK left, ABDULLA right, large character complete right on big screens */}
      <div className="relative isolate mx-auto grid w-full max-w-7xl flex-1 place-items-center min-h-[52svh] sm:min-h-[58svh] md:min-h-[64svh]">
        {/* Layer z-0: Background solid subtle typography */}
        <h1
          className={`${nameStyle} pointer-events-none relative z-0 grid place-content-center pt-20 text-[var(--hero-fill)] sm:pt-24 md:pt-28`}
        >
          <motion.span
            initial={{ opacity: 0, x: '-20vw' }}
            animate={{ opacity: 1, x: '-12vw' }}
            transition={{ duration: 0.95, ease: EASE_EDITORIAL }}
            className="block will-change-transform"
          >
            SHAIK
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: '20vw' }}
            animate={{ opacity: 1, x: '12vw' }}
            transition={{ duration: 0.95, ease: EASE_EDITORIAL }}
            className="block will-change-transform"
          >
            ABDULLA
          </motion.span>
        </h1>

        {/* Layer z-10: Large transparent confident portrait anchored complete right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease: EASE_EDITORIAL }}
          className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center pt-1 pl-[8vw] sm:pl-[12vw] md:justify-end md:pt-2 md:pl-0 md:pr-2 lg:pr-6"
        >
          <div className="relative inline-flex h-full items-end justify-center">
            <img
              src={currentPortrait.src}
              alt={currentPortrait.alt}
              referrerPolicy="no-referrer"
              className={`h-[104%] w-auto max-w-[min(88vw,520px)] object-contain object-bottom drop-shadow-[0_18px_36px_rgba(0,0,0,0.45)] sm:h-[110%] sm:max-w-[min(82vw,560px)] md:h-[116%] md:max-w-[620px] ${
                isScanning ? 'animate-optical-scan' : ''
              }`}
            />

            {/* Subtle optical laser sweep aligned with shifted portrait */}
            {isScanning && (
              <motion.div
                aria-hidden="true"
                initial={{ top: '10%', opacity: 0 }}
                animate={{ top: ['10%', '92%'], opacity: [0, 0.85, 0] }}
                transition={{ duration: 0.36, ease: 'linear' }}
                className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#38bdd4] to-transparent shadow-[0_0_14px_#38bdd4]"
              />
            )}
          </div>
        </motion.div>

        {/* Layer z-20: Foreground outlined typography across torso/shoulders */}
        <div
          aria-hidden="true"
          className={`${nameStyle} pointer-events-none absolute inset-0 z-20 grid place-content-center pt-20 text-transparent sm:pt-24 md:pt-28`}
        >
          <motion.span
            initial={{ opacity: 0, x: '-20vw' }}
            animate={{ opacity: 1, x: '-12vw' }}
            transition={{ duration: 0.95, ease: EASE_EDITORIAL }}
            style={{
              WebkitTextStroke: '1.35px var(--hero-stroke)',
            }}
            className="block will-change-transform"
          >
            SHAIK
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: '20vw' }}
            animate={{ opacity: 1, x: '12vw' }}
            transition={{ duration: 0.95, ease: EASE_EDITORIAL }}
            style={{
              WebkitTextStroke: '1.35px var(--hero-stroke)',
            }}
            className="block will-change-transform"
          >
            ABDULLA
          </motion.span>
        </div>
      </div>

      {/* SUPPORTING EDITORIAL FOOTER BAR */}
      <div className="relative z-30 mx-auto flex w-full max-w-7xl flex-col gap-5 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]/78 py-5 backdrop-blur-sm md:flex-row md:items-end md:justify-between md:bg-transparent md:py-7 md:backdrop-blur-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_EDITORIAL }}
          className="max-w-lg"
        >
          <p className="font-mono-tabular mb-2 text-xs font-medium tracking-[0.22em] text-[var(--accent-primary)] uppercase md:text-sm">
            Frontend Developer · B.Tech CSE
          </p>
          <p className="max-w-md text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Building thoughtful digital experiences through expressive typography, responsive architecture, and modern web code.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex min-h-[44px] items-center gap-2.5 bg-[var(--accent-primary)] px-6 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-all duration-200 hover:bg-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE_EDITORIAL }}
          className="hidden items-center gap-2 text-sm font-medium whitespace-nowrap text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] md:inline-flex"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
