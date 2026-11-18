import { useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import type { ProjectItem } from '../data/portfolioData';
import { EASE_EDITORIAL } from './MotionPrimitives';

interface ProjectSchematicProps {
  project: ProjectItem;
  compact?: boolean;
  onInspect?: () => void;
}

export function ProjectSchematic({
  project,
  compact = false,
  onInspect,
}: ProjectSchematicProps) {
  const [activeNode, setActiveNode] = useState(0);

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 180, damping: 24 });
  const tiltY = useSpring(rawTiltY, { stiffness: 180, damping: 24 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (compact) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawTiltX.set(-py * 5);
    rawTiltY.set(px * 6);
  };

  const resetTilt = () => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  };

  const nodes = project.blueprintNodes;
  const current = nodes[activeNode] ?? nodes[0];

  if (compact) {
    // Compact zero-photo schematic preview for Archive Grid cards
    return (
      <div
        onClick={onInspect}
        data-cursor-label="Inspect"
        className="group relative flex aspect-[16/9] w-full cursor-pointer flex-col justify-between overflow-hidden bg-[var(--bg-canvas)] bg-architectural-grid p-5"
      >
        {/* Subtle radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-[var(--accent-glow)] opacity-35 blur-2xl transition-opacity group-hover:opacity-65"
        />

        {/* Top header bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[var(--border-hairline)] pb-2.5">
          <span className="font-mono-tabular text-[11px] font-medium text-[var(--accent-primary)]">
            {project.number} · {project.schematicLabel}
          </span>
          <span className="font-mono-tabular text-[11px] text-[var(--text-muted)]">
            {project.status}
          </span>
        </div>

        {/* Center geometric schematic pipeline */}
        <div className="relative z-10 my-auto grid grid-cols-2 gap-2.5 py-2 sm:grid-cols-4">
          {nodes.map((node, idx) => (
            <div
              key={node.step}
              className="border border-[var(--border-hairline)] bg-[var(--bg-surface)]/85 p-2.5 transition-colors group-hover:border-[var(--border-strong)]"
            >
              <span className="font-mono-tabular block text-[10px] text-[var(--accent-primary)]">
                0{idx + 1}
              </span>
              <p className="mt-1 truncate text-xs font-semibold text-[var(--text-primary)]">
                {node.module}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom stack strip */}
        <div className="relative z-10 flex items-center justify-between border-t border-[var(--border-hairline)] pt-2.5">
          <span className="font-mono-tabular truncate text-[11px] text-[var(--text-muted)]">
            {project.technologies.slice(0, 4).join(' · ')}
          </span>
          <span className="font-mono-tabular shrink-0 text-[11px] font-semibold text-[var(--accent-primary)]">
            Inspect ↗
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-canvas)] bg-architectural-grid p-5 shadow-2xl sm:p-7"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full bg-[var(--accent-glow)] opacity-25 blur-3xl"
        />

        {/* Corner crosshairs */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-[var(--accent-primary)]/70"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 bottom-2.5 h-3 w-3 border-r border-b border-[var(--accent-primary)]/70"
        />

        {/* Schematic Chrome Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
          <div className="font-mono-tabular flex items-center gap-2.5 text-xs">
            <span className="font-semibold text-[var(--accent-primary)]">
              {project.schematicLabel}
            </span>
            <span aria-hidden="true" className="text-[var(--text-muted)]">
              ·
            </span>
            <span className="text-[var(--text-muted)]">
              {project.liveLink
                ? project.liveLink.replace('https://', '')
                : `github.com/Abdulla0208/${project.slug}`}
            </span>
          </div>

          {onInspect && (
            <button
              type="button"
              onClick={onInspect}
              className="font-mono-tabular text-xs font-semibold text-[var(--accent-primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            >
              Open Full Brief ↗
            </button>
          )}
        </div>

        {/* Interactive Wireframe + Signal Flow Matrix */}
        <div className="relative z-10 my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {nodes.map((node, idx) => {
            const isActive = activeNode === idx;
            return (
              <motion.button
                key={node.step}
                type="button"
                onClick={() => setActiveNode(idx)}
                onMouseEnter={() => setActiveNode(idx)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05, ease: EASE_EDITORIAL }}
                className={`group relative flex flex-col justify-between border p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${
                  isActive
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-soft)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]/75 hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-primary)]">
                    {node.step}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-6 transition-colors ${
                      isActive ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-strong)]'
                    }`}
                  />
                </div>

                <div className="mt-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {node.module}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                    {node.detail}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Node Deep-Dive Readout */}
        <div className="relative z-10 flex flex-col gap-3 border-t border-[var(--border-hairline)] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono-tabular text-[11px] text-[var(--accent-primary)] uppercase">
              Active Layer · {current.module}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
              {project.architectureNote}
            </p>
          </div>
          <div className="font-mono-tabular shrink-0 border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1.5 text-[11px] text-[var(--text-primary)]">
            {project.year} · {project.status}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
