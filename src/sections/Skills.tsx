import { useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  skillGroups,
  techStack,
  type TechCategory,
  type TechItem,
} from '../data/portfolioData';
import { BlockReveal, EASE_EDITORIAL, TextReveal } from '../components/MotionPrimitives';
import { TechLogo } from '../components/TechLogos';

const filterTabs: { id: TechCategory; label: string }[] = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'tooling', label: 'Tooling' },
];

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<TechCategory>('all');
  const [selectedTech, setSelectedTech] = useState<TechItem>(techStack[0]);
  const dockRef = useRef<HTMLDivElement>(null);

  const filteredTech =
    activeFilter === 'all'
      ? techStack
      : techStack.filter((item) => item.category === activeFilter);

  const handleFilterChange = (category: TechCategory) => {
    setActiveFilter(category);
    const nextList =
      category === 'all'
        ? techStack
        : techStack.filter((item) => item.category === category);
    if (!nextList.some((t) => t.id === selectedTech.id) && nextList.length > 0) {
      setSelectedTech(nextList[0]);
    }
  };

  const handleDockPointerMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    dockRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    dockRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="skills"
      className="relative bg-[var(--bg-surface)]/84 px-5 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <BlockReveal className="mb-12 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
          <p className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[var(--accent-primary)] uppercase md:text-sm">
            03. Tools &amp; Stack
          </p>
          <p className="hidden text-sm text-[var(--text-muted)] md:block">
            Interactive technology matrix
          </p>
        </BlockReveal>

        {/* Top Split: Display Heading + Segmented Filter Tabs */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.85rem,5.2vw,5.75rem)] leading-[0.94] tracking-tight text-[var(--text-primary)] text-balance">
              <TextReveal delay={0.04}>
                <span className="block">TOOLS OF</span>
              </TextReveal>
              <TextReveal delay={0.12}>
                <span className="block">
                  MY TRADE<span className="text-[var(--accent-primary)]">.</span>
                </span>
              </TextReveal>
            </h2>
            <BlockReveal delay={0.18} className="mt-5 max-w-xl">
              <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                Select any technology node below to inspect how I apply it across responsive interfaces, state architecture, and production web delivery.
              </p>
            </BlockReveal>
          </div>

          <BlockReveal delay={0.22} className="lg:col-span-5 lg:flex lg:justify-end">
            <div
              role="tablist"
              aria-label="Filter technologies by category"
              className="inline-flex flex-wrap items-center gap-1 border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1"
            >
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleFilterChange(tab.id)}
                    className={`relative min-h-[38px] px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${
                      isActive
                        ? 'text-white'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skillsFilterIndicator"
                        transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                        className="absolute inset-0 bg-[var(--accent-primary)]"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </BlockReveal>
        </div>

        {/* Main Futuristic Tech Matrix + Editorial Discipline Index */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left 7 Cols: Futuristic Scroll-Revealed Technology Logo Console with Pointer Spotlight */}
          <div className="lg:col-span-7">
            <div
              ref={dockRef}
              onMouseMove={handleDockPointerMove}
              className="group/dock relative overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5 sm:p-7"
            >
              {/* Subtle pointer-tracking radial spotlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/dock:opacity-100"
                style={{
                  background:
                    'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(32, 164, 186, 0.1), transparent 70%)',
                }}
              />

              {/* Futuristic top rail */}
              <div className="relative z-10 mb-6 flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                <span className="font-mono-tabular text-xs font-medium text-[var(--text-muted)]">
                  Technology Dock · {filteredTech.length} Modules
                </span>
                <span className="font-mono-tabular text-xs text-[var(--accent-primary)]">
                  Interactive Inspector
                </span>
              </div>

              {/* Scroll-revealed Logo Nodes */}
              <motion.div
                layout
                className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredTech.map((tech, index) => {
                    const isSelected = selectedTech.id === tech.id;
                    return (
                      <motion.button
                        key={tech.id}
                        layout
                        type="button"
                        onClick={() => setSelectedTech(tech)}
                        onMouseEnter={() => setSelectedTech(tech)}
                        initial={{ opacity: 0, y: 20, scale: 0.94 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.42,
                          delay: index * 0.04,
                          ease: EASE_EDITORIAL,
                        }}
                        className={`group relative flex min-h-[100px] flex-col items-center justify-center gap-2.5 border p-4 text-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${
                          isSelected
                            ? 'border-[var(--accent-primary)] bg-[var(--accent-soft)] text-[var(--accent-primary)]'
                            : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]/55 text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute top-0 left-0 h-2 w-2 border-t border-l transition-opacity ${
                            isSelected
                              ? 'border-[var(--accent-primary)] opacity-100'
                              : 'border-transparent opacity-0 group-hover:border-[var(--accent-primary)] group-hover:opacity-60'
                          }`}
                        />
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-r border-b transition-opacity ${
                            isSelected
                              ? 'border-[var(--accent-primary)] opacity-100'
                              : 'border-transparent opacity-0 group-hover:border-[var(--accent-primary)] group-hover:opacity-60'
                          }`}
                        />

                        <motion.div
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ duration: 0.18, ease: EASE_EDITORIAL }}
                        >
                          <TechLogo
                            id={tech.id}
                            className={`h-8 w-8 transition-colors duration-200 ${
                              isSelected
                                ? 'text-[var(--accent-primary)]'
                                : 'text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]'
                            }`}
                          />
                        </motion.div>

                        <span className="text-xs font-semibold tracking-wide whitespace-nowrap text-[var(--text-primary)]">
                          {tech.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Single Unified Futuristic Inspector Console */}
              <div className="relative z-10 mt-6 border-t border-[var(--border-hairline)] pt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTech.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE_EDITORIAL }}
                    className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--accent-primary)]/40 bg-[var(--accent-soft)] text-[var(--accent-primary)]">
                        <TechLogo id={selectedTech.id} className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                          <span className="font-semibold text-[var(--text-primary)]">
                            {selectedTech.name}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[var(--accent-primary)]">
                            {selectedTech.role}
                          </span>
                        </div>
                        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
                          {selectedTech.summary}
                        </p>
                        <p className="font-mono-tabular mt-2 text-xs text-[var(--text-muted)]">
                          Applied in: {selectedTech.usedIn.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <a
                      href="#projects"
                      className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 self-start border border-[var(--border-strong)] px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] sm:self-center"
                    >
                      <span>See Projects</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Clean Hairline-Divided Discipline List */}
          <div className="flex flex-col justify-center lg:col-span-5">
            {skillGroups.map((group, idx) => (
              <BlockReveal
                key={group.number}
                delay={0.08 + idx * 0.06}
                yOffset={18}
              >
                <div className="group grid grid-cols-[40px_1fr] gap-4 border-t border-[var(--border-hairline)] py-4 last:border-b">
                  <span className="font-mono-tabular pt-1 text-xs font-medium text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-primary)]">
                    {group.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-primary)]">
                      {group.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                      {group.skills.join(' · ')}
                    </p>
                  </div>
                </div>
              </BlockReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
