import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Share2, X } from 'lucide-react';
import { contactInfo } from '../data/portfolioData';
import { EASE_EDITORIAL } from './MotionPrimitives';

interface SocialNode {
  id: 'github' | 'linkedin' | 'instagram';
  label: string;
  href: string;
  x: number;
  y: number;
  labelClass: string;
}

const socialNodes: SocialNode[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: contactInfo.github,
    x: -86,
    y: 0,
    labelClass: 'bottom-[50px] left-1/2 -translate-x-1/2',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: contactInfo.linkedin,
    x: -62,
    y: -62,
    labelClass: 'bottom-[50px] right-0',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: contactInfo.instagram,
    x: 0,
    y: -86,
    labelClass: 'top-1/2 right-[52px] -translate-y-1/2',
  },
];

export function SocialIcon({
  id,
  className = 'h-4 w-4',
}: {
  id: SocialNode['id'];
  className?: string;
}) {
  if (id === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 11v6M8 7.5v.5M12 17v-4a2 2 0 0 1 4 0v4M12 11v6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function FloatingConnectionHub() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed right-5 bottom-5 z-40"
    >
      {/* Expanded hover-bridge zone so moving pointer along radial arc stays open */}
      <div
        className={`relative flex items-end justify-end transition-all duration-200 ${
          expanded ? 'h-[144px] w-[144px]' : 'h-12 w-12'
        }`}
      >
        {/* Futuristic radial orbital arc */}
        <AnimatePresence>
          {expanded && (
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 140 140"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.65 }}
              transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
              className="pointer-events-none absolute right-0 bottom-0 h-[136px] w-[136px] origin-bottom-right"
            >
              <circle
                cx="116"
                cy="116"
                r="86"
                fill="none"
                stroke="var(--accent-primary)"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Radial Social Link Nodes */}
        <AnimatePresence>
          {expanded &&
            socialNodes.map((node, idx) => (
              <motion.a
                key={node.id}
                href={node.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={node.label}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                animate={{ opacity: 1, x: node.x, y: node.y, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                transition={{
                  type: 'spring',
                  stiffness: 360,
                  damping: 24,
                  delay: idx * 0.045,
                }}
                whileHover={{ scale: 1.12 }}
                className="group absolute right-0.5 bottom-0.5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 text-[var(--text-primary)] shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
              >
                <SocialIcon id={node.id} />

                {/* Clean tooltip label on node hover */}
                <span
                  className={`font-mono-tabular pointer-events-none absolute whitespace-nowrap border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/95 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[var(--text-primary)] uppercase opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 ${node.labelClass}`}
                >
                  {node.label}
                </span>
              </motion.a>
            ))}
        </AnimatePresence>

        {/* Central Hub Trigger Button */}
        <motion.button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Close connection hub' : 'Open social connection hub'}
          whileTap={{ scale: 0.94 }}
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border shadow-xl backdrop-blur-md transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${
            expanded
              ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white'
              : 'border-[var(--border-strong)] bg-[var(--bg-surface)]/92 text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
          }`}
        >
          {/* Subtle corner tech ring */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-1 rounded-full border border-[var(--accent-primary)]/35 transition-transform duration-300 ${
              expanded ? 'scale-110 opacity-100' : 'scale-95 opacity-0'
            }`}
          />
          {expanded ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Share2 className="h-4 w-4" aria-hidden="true" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
