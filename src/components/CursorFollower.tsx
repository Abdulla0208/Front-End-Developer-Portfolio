import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const visibleRef = useRef(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth spring ring trailing behind crisp pointer dot
  const ringX = useSpring(rawX, { stiffness: 320, damping: 28, mass: 0.45 });
  const ringY = useSpring(rawY, { stiffness: 320, damping: 28, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labeledEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labeledEl) {
        setCursorLabel(labeledEl.getAttribute('data-cursor-label'));
        setIsPointer(true);
        return;
      }

      setCursorLabel(null);
      const interactiveEl = target.closest('a, button, [role="tab"], input, textarea, select');
      setIsPointer(Boolean(interactiveEl));
    };

    const handleLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const handleEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [rawX, rawY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
    >
      {/* Trailing orbital ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
          width: cursorLabel ? 76 : isPointer ? 44 : 32,
          height: cursorLabel ? 76 : isPointer ? 44 : 32,
          borderColor: isPointer ? 'var(--accent-primary)' : 'var(--border-strong)',
          backgroundColor: cursorLabel
            ? 'var(--accent-primary)'
            : isPointer
              ? 'var(--accent-soft)'
              : 'transparent',
        }}
      >
        {cursorLabel && (
          <span className="font-mono-tabular flex h-full w-full items-center justify-center text-[10px] font-semibold tracking-wider text-white uppercase">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* Precision center dot */}
      {!cursorLabel && (
        <motion.div
          className="fixed top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-primary)] transition-transform duration-150"
          style={{
            x: rawX,
            y: rawY,
            opacity: visible ? 1 : 0,
            scale: isPointer ? 0.6 : 1,
          }}
        />
      )}
    </div>
  );
}
