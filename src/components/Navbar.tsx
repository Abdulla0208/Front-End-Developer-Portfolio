import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { contactInfo, navLinks } from '../data/portfolioData';
import { EASE_EDITORIAL } from './MotionPrimitives';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? 'border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/88 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 py-4 md:px-12 lg:px-16">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#home"
            className="font-display text-2xl tracking-wide whitespace-nowrap shrink-0 text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] md:text-3xl"
          >
            SHAIK<span className="text-[var(--accent-primary)]">.</span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-8 md:flex"
          >
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] ${
                    isActive
                      ? 'text-[var(--accent-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.name}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[var(--accent-primary)] transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action (Desktop) / Mobile Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-surface)]/80 px-5 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] md:inline-flex"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[70] flex flex-col justify-between bg-[var(--bg-canvas)] px-6 py-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex items-center justify-between">
              <a
                href="#home"
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl tracking-wide text-[var(--text-primary)]"
              >
                SHAIK<span className="text-[var(--accent-primary)]">.</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 py-8" aria-label="Mobile Menu Links">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, ease: EASE_EDITORIAL }}
                  className="flex min-h-[52px] items-center justify-between border-b border-[var(--border-hairline)] py-3 font-display text-4xl tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)]"
                >
                  <span>{link.name}</span>
                  <span className="font-mono-tabular text-xs text-[var(--accent-primary)]">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="border-t border-[var(--border-hairline)] pt-6">
              <a
                href={`mailto:${contactInfo.email}`}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white"
              >
                <span>{contactInfo.email}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
