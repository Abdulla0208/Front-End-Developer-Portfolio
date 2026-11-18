import { useRef, type ReactNode } from 'react';
import { motion, useInView, useScroll, useSpring } from 'motion/react';

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-[var(--accent-primary)]"
      style={{ scaleX }}
    />
  );
}

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function TextReveal({ children, delay = 0, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 'some' });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{
          duration: 0.7,
          delay,
          ease: EASE_EDITORIAL,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface BlockRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function BlockReveal({
  children,
  delay = 0,
  className = '',
  yOffset = 28,
}: BlockRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 'some' });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: 0.65,
        delay,
        ease: EASE_EDITORIAL,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MarqueeRibbonProps {
  items: string[];
  className?: string;
}

export function MarqueeRibbon({ items, className = '' }: MarqueeRibbonProps) {
  const repeated = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden border-y border-[var(--border-hairline)] bg-[var(--bg-surface)] py-3.5 select-none ${className}`}
    >
      <div className="animate-marquee flex items-center gap-10">
        {repeated.map((label, idx) => (
          <div key={`${label}-${idx}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-mono-tabular text-xs font-medium tracking-[0.18em] text-[var(--text-muted)] uppercase">
              {label}
            </span>
            <span className="text-[var(--accent-primary)]" aria-hidden="true">
              /
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
