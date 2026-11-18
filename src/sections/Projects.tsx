import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Expand,
  Globe,
  LayoutGrid,
  Rows3,
  X,
} from 'lucide-react';
import {
  projects,
  type ProjectFilterCategory,
  type ProjectItem,
} from '../data/portfolioData';
import { BlockReveal, EASE_EDITORIAL, TextReveal } from '../components/MotionPrimitives';
import { ProjectSchematic } from '../components/ProjectSchematic';

const projectContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.03,
    },
  },
};

const projectCardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_EDITORIAL,
    },
  },
};

const LAYOUT_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 29,
  mass: 0.9,
};

const projectFilters: { id: ProjectFilterCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'production', label: 'Production' },
  { id: 'web-app', label: 'Web Apps' },
  { id: 'open-source', label: 'Open Source' },
];

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilterCategory>('all');
  const [viewMode, setViewMode] = useState<'stage' | 'archive'>('stage');
  const [selectedSlug, setSelectedSlug] = useState<string>(projects[0].slug);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const [modalOriginSlug, setModalOriginSlug] = useState<string | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const modalDialogRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.filterTags.includes(filter));

  const activeStageProject =
    filteredProjects.find((p) => p.slug === selectedSlug) ??
    filteredProjects[0] ??
    projects[0];

  const handleFilterChange = (nextFilter: ProjectFilterCategory) => {
    setFilter(nextFilter);
    const nextList =
      nextFilter === 'all'
        ? projects
        : projects.filter((p) => p.filterTags.includes(nextFilter));
    if (nextList.length > 0 && !nextList.some((p) => p.slug === selectedSlug)) {
      setSelectedSlug(nextList[0].slug);
    }
  };

  const openProjectDetail = (project: ProjectItem) => {
    setSelectedSlug(project.slug);
    setModalOriginSlug(project.slug);
    setModalProject(project);
  };

  const closeProjectDetail = () => {
    setModalProject(null);
  };

  const stepModalProject = useCallback(
    (direction: -1 | 1) => {
      if (!modalProject || filteredProjects.length <= 1) return;
      const currentIndex = filteredProjects.findIndex(
        (item) => item.slug === modalProject.slug
      );
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex =
        (safeIndex + direction + filteredProjects.length) % filteredProjects.length;
      const nextProject = filteredProjects[nextIndex];
      if (nextProject) {
        setModalProject(nextProject);
        modalScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [modalProject, filteredProjects]
  );

  useEffect(() => {
    if (!modalProject) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    // Ensure keyboard focus enters the dialog so Escape and Arrow keys respond immediately
    const focusTimer = window.setTimeout(() => {
      modalDialogRef.current?.focus({ preventScroll: true });
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        closeProjectDetail();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepModalProject(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepModalProject(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalProject, stepModalProject]);

  return (
    <LayoutGroup id="projects-detail-expansion">
      <section
        id="projects"
        className="relative bg-[var(--bg-canvas)]/82 px-5 py-20 md:px-12 md:py-28 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Section Header */}
          <BlockReveal className="mb-12 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
            <p className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[var(--accent-primary)] uppercase md:text-sm">
              04. Selected Work
            </p>
            <p className="font-mono-tabular hidden text-xs text-[var(--text-muted)] md:block">
              {projects.length.toString().padStart(2, '0')} Indexed Systems
            </p>
          </BlockReveal>

          {/* Title + Scalable Controls Toolbar */}
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-[clamp(2.85rem,5.2vw,5.75rem)] leading-[0.94] tracking-tight text-[var(--text-primary)] text-balance">
                <TextReveal delay={0.04}>
                  <span className="block">SELECTED</span>
                </TextReveal>
                <TextReveal delay={0.12}>
                  <span className="block">
                    PROJECTS<span className="text-[var(--accent-primary)]">.</span>
                  </span>
                </TextReveal>
              </h2>
              <BlockReveal delay={0.18}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
                  Interactive architectural schematics and engineering breakdowns—crafted without screenshots so client, open-source, and proprietary projects scale cleanly.
                </p>
              </BlockReveal>
            </div>

            {/* Filter & View Switcher Toolbar */}
            <BlockReveal delay={0.22} className="flex flex-wrap items-center gap-4 lg:shrink-0">
              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="inline-flex flex-wrap items-center gap-1 border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-1"
              >
                {projectFilters.map((tab) => {
                  const isActive = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleFilterChange(tab.id)}
                      className={`relative min-h-[36px] px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${
                        isActive
                          ? 'text-white'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="projectFilterTab"
                          transition={{ duration: 0.24, ease: EASE_EDITORIAL }}
                          className="absolute inset-0 bg-[var(--accent-primary)]"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div
                role="group"
                aria-label="Switch project layout view"
                className="inline-flex items-center gap-1 border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-1"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('stage')}
                  aria-pressed={viewMode === 'stage'}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    viewMode === 'stage'
                      ? 'bg-[var(--bg-elevated)] text-[var(--accent-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Rows3 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Stage</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('archive')}
                  aria-pressed={viewMode === 'archive'}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    viewMode === 'archive'
                      ? 'bg-[var(--bg-elevated)] text-[var(--accent-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Grid</span>
                </button>
              </div>
            </BlockReveal>
          </div>

          {/* VIEW MODE 1: INTERACTIVE ARCHITECTURE STAGE */}
          {viewMode === 'stage' && activeStageProject && (
            <div className="space-y-6">
              {/* Staggered Scroll-Revealing Project Index Rail */}
              <motion.div
                key={`stage-rail-${filter}`}
                variants={projectContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 'some' }}
                role="tablist"
                aria-label="Select featured project"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => {
                  const isSelected = project.slug === activeStageProject.slug;
                  return (
                    <motion.button
                      key={project.slug}
                      variants={projectCardVariants}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedSlug(project.slug)}
                      className={`group relative flex items-center justify-between gap-4 border px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${
                        isSelected
                          ? 'border-[var(--accent-primary)] bg-[var(--bg-surface)]'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]/45 hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="activeProjectAccentBar"
                          transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                          className="absolute inset-x-0 top-0 h-[2px] bg-[var(--accent-primary)]"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="font-mono-tabular flex items-center gap-2 text-xs text-[var(--text-muted)]">
                          <span className={isSelected ? 'font-semibold text-[var(--accent-primary)]' : ''}>
                            {project.number}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{project.year}</span>
                        </div>
                        <p className="mt-1 truncate text-base font-semibold text-[var(--text-primary)]">
                          {project.name}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`font-mono-tabular shrink-0 text-xs transition-transform duration-200 ${
                          isSelected
                            ? 'translate-x-0 text-[var(--accent-primary)]'
                            : 'text-[var(--text-muted)] group-hover:translate-x-0.5'
                        }`}
                      >
                        →
                      </span>
                    </motion.button>
                  );
                })}

                {/* Future Expansion Slot */}
                <motion.div
                  variants={projectCardVariants}
                  className="hidden items-center justify-between border border-dashed border-[var(--border-hairline)] px-5 py-4 lg:flex"
                >
                  <div>
                    <p className="font-mono-tabular text-xs text-[var(--text-muted)]">
                      {(filteredProjects.length + 1).toString().padStart(2, '0')} · Next Release
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
                      NDA-safe schematic ready
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="font-mono-tabular text-xs font-semibold text-[var(--accent-primary)] hover:underline"
                  >
                    Collaborate ↗
                  </a>
                </motion.div>
              </motion.div>

              {/* Active Project Showcase Console with Scroll-In Reveal + Shared-Element Layout Source */}
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
              >
                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeStageProject.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                  >
                    <motion.div
                      layoutId={`project-shell-${activeStageProject.slug}`}
                      transition={{ layout: LAYOUT_SPRING }}
                      className="relative border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/70 px-5 py-3.5 md:px-7">
                        <div className="font-mono-tabular flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                          <span className="font-semibold text-[var(--accent-primary)]">
                            {activeStageProject.number}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{activeStageProject.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{activeStageProject.status}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => openProjectDetail(activeStageProject)}
                          className="font-mono-tabular inline-flex items-center gap-1.5 text-xs text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-hover)]"
                        >
                          <span>Expand Case Study</span>
                          <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Split Showcase Content */}
                      <div className="grid grid-cols-1 gap-8 p-5 md:p-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                        {/* Left 7 Cols: Zero-Photo Interactive System Schematic */}
                        <div className="lg:col-span-7">
                          <ProjectSchematic
                            project={activeStageProject}
                            onInspect={() => openProjectDetail(activeStageProject)}
                          />
                        </div>

                        {/* Right 5 Cols: Spec Breakdown */}
                        <div className="flex flex-col justify-between lg:col-span-5">
                          <div>
                            <h3 className="font-display text-3xl tracking-tight text-[var(--text-primary)] md:text-4xl">
                              {activeStageProject.name}
                            </h3>

                            <p className="mt-3 text-base leading-relaxed text-[var(--text-muted)]">
                              {activeStageProject.description}
                            </p>

                            {/* 3-Column Tabular Spec Strip */}
                            <div className="mt-6 grid grid-cols-3 gap-3 border-y border-[var(--border-hairline)] py-4">
                              {activeStageProject.impactMetrics.map((metric) => (
                                <div key={metric.label}>
                                  <p className="font-mono-tabular text-[11px] text-[var(--text-muted)] uppercase">
                                    {metric.label}
                                  </p>
                                  <p className="mt-1 text-xs font-semibold text-[var(--text-primary)] sm:text-sm">
                                    {metric.value}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-[var(--text-muted)]">
                              {activeStageProject.highlights.slice(0, 2).map((hl) => (
                                <li key={hl} className="flex items-start gap-2.5">
                                  <span
                                    aria-hidden="true"
                                    className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--accent-primary)]"
                                  />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>

                            <p className="font-mono-tabular mt-5 text-xs text-[var(--text-primary)]">
                              {activeStageProject.technologies.join(' · ')}
                            </p>
                          </div>

                          <div className="mt-8 flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => openProjectDetail(activeStageProject)}
                              className="inline-flex min-h-[44px] items-center gap-2 bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
                            >
                              <span>Project Detail</span>
                              <Expand className="h-4 w-4" aria-hidden="true" />
                            </button>

                            {activeStageProject.liveLink && (
                              <a
                                href={activeStageProject.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                              >
                                <Globe className="h-4 w-4" aria-hidden="true" />
                                <span>Live Site</span>
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                              </a>
                            )}

                            <a
                              href={activeStageProject.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--border-hairline)] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-[var(--text-muted)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                            >
                              <Code2 className="h-4 w-4" aria-hidden="true" />
                              <span>GitHub</span>
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.article>
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* VIEW MODE 2: SCALABLE PHOTO-FREE ARCHIVE GRID WITH STAGGERED ENTER-FROM-BOTTOM */}
          {viewMode === 'archive' && (
            <motion.div
              key={`archive-grid-${filter}`}
              variants={projectContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 'some' }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.slug}
                  variants={projectCardVariants}
                  className="h-full"
                >
                  <motion.div
                    layoutId={`project-shell-${project.slug}`}
                    transition={{ layout: LAYOUT_SPRING }}
                    onClick={() => openProjectDetail(project)}
                    data-cursor-label="Inspect"
                    className="group flex h-full cursor-pointer flex-col justify-between border border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-colors hover:border-[var(--border-strong)]"
                  >
                    <div>
                      <div className="border-b border-[var(--border-hairline)]">
                        <ProjectSchematic project={project} compact />
                      </div>

                      <div className="p-6">
                        <div className="font-mono-tabular mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                          <span className="font-semibold text-[var(--accent-primary)]">
                            {project.number}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.status}</span>
                        </div>

                        <h3 className="font-display text-3xl text-[var(--text-primary)]">
                          {project.name}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)]">
                          {project.summary}
                        </p>

                        <p className="font-mono-tabular mt-4 text-xs text-[var(--text-primary)]">
                          {project.technologies.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] px-6 py-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProjectDetail(project);
                        }}
                        className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
                      >
                        <span>Project Detail</span>
                        <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>

                      <div className="flex items-center gap-4 text-xs font-semibold">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex min-h-[40px] items-center gap-1 text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
                          >
                            <span>Live</span>
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex min-h-[40px] items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
                        >
                          <span>Source</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>

        {/* Full-Viewport Futuristic Glassmorphism Project Detail Modal */}
        {typeof document !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {modalProject && (
                <motion.div
                  key="project-detail-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                  onClick={closeProjectDetail}
                  className="fixed inset-0 z-[80] flex items-stretch justify-center bg-[#030914]/72 p-2 backdrop-blur-2xl sm:p-4 md:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${modalProject.name} Project Detail`}
                >
              <motion.div
                ref={modalDialogRef}
                tabIndex={-1}
                layoutId={`project-shell-${modalOriginSlug ?? modalProject.slug}`}
                transition={{ layout: LAYOUT_SPRING }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex h-full w-full flex-col overflow-hidden border border-[#38bdd4]/35 bg-[#091426]/78 text-[var(--text-primary)] shadow-[0_0_96px_rgba(32,164,186,0.22),inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-2xl focus:outline-none"
              >
                {/* Futuristic Glass Sheen & Ambient Optical Layer */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38bdd4]/80 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(32,164,186,0.16),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,212,0.08),transparent_50%)]"
                />
                {/* Corner Reticle Crosshairs */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 left-2.5 z-20 h-3.5 w-3.5 border-t border-l border-[#38bdd4]/70"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 right-2.5 z-20 h-3.5 w-3.5 border-t border-r border-[#38bdd4]/70"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2.5 left-2.5 z-20 h-3.5 w-3.5 border-b border-l border-[#38bdd4]/70"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 bottom-2.5 z-20 h-3.5 w-3.5 border-r border-b border-[#38bdd4]/70"
                />

                {/* Glass Header Toolbar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#060f1f]/75 px-5 py-3.5 backdrop-blur-xl md:px-8">
                  <div className="font-mono-tabular flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--accent-hover)]">
                      Project Detail
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[var(--accent-primary)]">
                      {modalProject.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{modalProject.category}</span>
                    <span aria-hidden="true" className="hidden sm:inline">
                      ·
                    </span>
                    <span className="hidden sm:inline">{modalProject.year}</span>
                    <span aria-hidden="true" className="hidden md:inline">
                      ·
                    </span>
                    <span className="hidden md:inline">{modalProject.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {filteredProjects.length > 1 && (
                      <div className="mr-1 flex items-center gap-1 border border-white/10 bg-white/[0.03] p-0.5">
                        <button
                          type="button"
                          onClick={() => stepModalProject(-1)}
                          aria-label="Previous project"
                          className="inline-flex h-10 w-10 items-center justify-center text-[var(--text-muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => stepModalProject(1)}
                          aria-label="Next project"
                          className="inline-flex h-10 w-10 items-center justify-center text-[var(--text-muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}

                    <span className="font-mono-tabular hidden text-[11px] text-[var(--text-muted)] lg:inline">
                      {filteredProjects.length > 1
                        ? '← / → cycle · ESC close'
                        : 'ESC close'}
                    </span>

                    <button
                      type="button"
                      onClick={closeProjectDetail}
                      aria-label="Close project detail modal"
                      className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.04] text-[var(--text-primary)] transition-colors hover:border-[#38bdd4] hover:bg-[#20a4ba]/15 hover:text-[#38bdd4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Full-Viewport Case Study Canvas */}
                <div
                  ref={modalScrollRef}
                  className="relative z-10 flex-1 overflow-y-auto px-5 py-6 md:px-10 md:py-10"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={modalProject.slug}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.24, ease: EASE_EDITORIAL }}
                      className="mx-auto w-full max-w-6xl space-y-10"
                    >
                      {/* Case Study Hero Banner */}
                      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                          <p className="font-mono-tabular text-xs font-medium tracking-[0.16em] text-[var(--accent-hover)] uppercase">
                            {modalProject.role} · {modalProject.year}
                          </p>
                          <h2 className="font-display mt-3 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[0.96] tracking-tight text-[var(--text-primary)] text-balance">
                            {modalProject.name}
                          </h2>
                          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                            {modalProject.description}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-3">
                          {modalProject.liveLink && (
                            <a
                              href={modalProject.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
                            >
                              <Globe className="h-4 w-4" aria-hidden="true" />
                              <span>Visit Live Website</span>
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                          )}
                          <a
                            href={modalProject.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[var(--text-primary)] transition-colors hover:border-[#38bdd4] hover:text-[#38bdd4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
                          >
                            <Code2 className="h-4 w-4" aria-hidden="true" />
                            <span>View Source on GitHub</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      {/* Key System Metrics & Core Stack */}
                      <div className="grid grid-cols-1 gap-4 border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
                        {modalProject.impactMetrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="border-b border-white/10 pb-3 sm:border-r sm:border-b-0 sm:pr-4 sm:pb-0"
                          >
                            <p className="font-mono-tabular text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
                              {metric.label}
                            </p>
                            <p className="mt-1.5 text-base font-semibold text-[var(--text-primary)]">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                        <div>
                          <p className="font-mono-tabular text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
                            Core Stack
                          </p>
                          <p className="font-mono-tabular mt-1.5 text-sm font-medium text-[var(--accent-hover)]">
                            {modalProject.technologies.join(' · ')}
                          </p>
                        </div>
                      </div>

                      {/* 01. Challenge & Solution Split */}
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md">
                          <p className="font-mono-tabular text-xs font-medium tracking-[0.16em] text-[var(--accent-hover)] uppercase">
                            01. Problem Context
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                            {modalProject.challenge}
                          </p>
                        </div>

                        <div className="border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md">
                          <p className="font-mono-tabular text-xs font-medium tracking-[0.16em] text-[var(--accent-hover)] uppercase">
                            02. Architectural Solution
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                            {modalProject.solution}
                          </p>
                        </div>
                      </div>

                      {/* 03. Full Interactive System Schematic */}
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <p className="font-mono-tabular text-xs font-medium tracking-[0.16em] text-[var(--accent-hover)] uppercase">
                            03. Interactive System Schematic
                          </p>
                          <p className="font-mono-tabular text-xs text-[var(--text-muted)]">
                            Select any layer to inspect
                          </p>
                        </div>
                        <ProjectSchematic project={modalProject} />
                      </div>

                      {/* 04. Key Engineering Decisions */}
                      <div>
                        <p className="font-mono-tabular mb-4 text-xs font-medium tracking-[0.16em] text-[var(--accent-hover)] uppercase">
                          04. Key Engineering Decisions
                        </p>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                          {modalProject.engineeringDecisions.map((decision, idx) => (
                            <div
                              key={decision.title}
                              className="flex flex-col justify-between border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md"
                            >
                              <div>
                                <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-primary)]">
                                  0{idx + 1}
                                </span>
                                <h3 className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                                  {decision.title}
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)]">
                                  {decision.rationale}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 05. Delivery Highlights & Architecture Summary */}
                      <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-8 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                          <p className="font-mono-tabular mb-3 text-xs font-medium tracking-[0.16em] text-[var(--accent-hover)] uppercase">
                            05. Implementation Highlights
                          </p>
                          <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                            {modalProject.highlights.map((hl) => (
                              <li key={hl} className="flex items-start gap-3">
                                <span
                                  aria-hidden="true"
                                  className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--accent-primary)]"
                                />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md lg:col-span-5">
                          <p className="font-mono-tabular text-xs font-medium tracking-[0.16em] text-[var(--accent-hover)] uppercase">
                            Architecture Summary
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                            {modalProject.architectureNote}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </section>
    </LayoutGroup>
  );
}

