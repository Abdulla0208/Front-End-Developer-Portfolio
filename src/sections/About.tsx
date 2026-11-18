import { educationMilestones, qualities } from '../data/portfolioData';
import { BlockReveal, TextReveal } from '../components/MotionPrimitives';

export function About() {
  return (
    <section
      id="about"
      className="relative bg-[var(--bg-canvas)]/82 px-5 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <BlockReveal className="mb-12 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
          <p className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[var(--accent-primary)] uppercase md:text-sm">
            02. About &amp; Foundation
          </p>
          <p className="hidden text-sm text-[var(--text-muted)] md:block">
            Craft, curiosity, and computer science rigor
          </p>
        </BlockReveal>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Statement Display Headline */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <h2 className="font-display text-[clamp(2.85rem,5.2vw,5.75rem)] leading-[0.94] tracking-tight text-[var(--text-primary)] text-balance">
                <TextReveal delay={0.04}>
                  <span className="block">MORE THAN</span>
                </TextReveal>
                <TextReveal delay={0.12}>
                  <span className="block">JUST WRITING</span>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <span className="block">
                    CODE<span className="text-[var(--accent-primary)]">.</span>
                  </span>
                </TextReveal>
              </h2>

              <BlockReveal delay={0.26} className="mt-6 max-w-lg">
                <p className="text-lg leading-relaxed text-[var(--text-muted)] md:text-xl">
                  A curious mind with a product-first mindset.{' '}
                  <span className="font-semibold text-[var(--text-primary)]">
                    Always learning, always shipping.
                  </span>
                </p>
              </BlockReveal>
            </div>

            {/* Compact Quantitative Proof Row (adjacent to claim, tabular numerals) */}
            <BlockReveal
              delay={0.32}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--border-hairline)] pt-6"
            >
              <div>
                <p className="font-display font-mono-tabular text-3xl text-[var(--text-primary)] md:text-4xl">
                  B.Tech
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Computer Science
                </p>
              </div>
              <div>
                <p className="font-display font-mono-tabular text-3xl text-[var(--accent-primary)] md:text-4xl">
                  12+
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Core Web Tools
                </p>
              </div>
              <div>
                <p className="font-display font-mono-tabular text-3xl text-[var(--text-primary)] md:text-4xl">
                  100%
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Responsive Craft
                </p>
              </div>
            </BlockReveal>
          </div>

          {/* Right Column: Narrative + Hairline-Divided Qualities */}
          <div className="flex flex-col justify-center gap-10 lg:col-span-6">
            <BlockReveal delay={0.14}>
              <p className="font-mono-tabular mb-3 text-xs font-medium tracking-[0.2em] text-[var(--accent-primary)] uppercase">
                Background
              </p>
              <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                I&apos;m a Computer Science graduate focused on frontend engineering and modern UI architecture. I love breaking down how interfaces work and turning complex user workflows into fast, intuitive products.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                Whether shipping a bilingual commercial service site or engineering state-driven ordering flows, I believe in learning by building and sweating every pixel across mobile and desktop screens.
              </p>
            </BlockReveal>

            <div>
              <BlockReveal delay={0.2}>
                <p className="font-mono-tabular mb-4 text-xs font-medium tracking-[0.2em] text-[var(--accent-primary)] uppercase">
                  What Defines My Approach
                </p>
              </BlockReveal>

              <div>
                {qualities.map((quality, idx) => (
                  <BlockReveal
                    key={quality.number}
                    delay={0.22 + idx * 0.08}
                    yOffset={18}
                  >
                    <div className="group grid grid-cols-[40px_1fr] gap-4 border-t border-[var(--border-hairline)] py-4 transition-colors">
                      <span className="font-mono-tabular pt-1 text-xs font-medium text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-primary)]">
                        {quality.number}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-primary)] md:text-3xl">
                          {quality.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                          {quality.description}
                        </p>
                      </div>
                    </div>
                  </BlockReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Academic & Engineering Foundation Timeline (completes unfinished Education section cleanly without extra cards) */}
        <div id="education" className="mt-20 border-t border-[var(--border-hairline)] pt-14 md:mt-24">
          <BlockReveal className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[var(--accent-primary)] uppercase">
                Academic &amp; Engineering Timeline
              </p>
              <h3 className="font-display mt-2 text-3xl tracking-tight text-[var(--text-primary)] md:text-4xl">
                FOUNDATION &amp; DELIVERY
              </h3>
            </div>
            <p className="max-w-md text-sm text-[var(--text-muted)]">
              From formal computer science fundamentals to live commercial frontend delivery.
            </p>
          </BlockReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {educationMilestones.map((item, idx) => (
              <BlockReveal
                key={item.number}
                delay={0.1 + idx * 0.1}
                className="border-t border-[var(--border-hairline)] pt-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono-tabular text-xs font-medium text-[var(--accent-primary)]">
                    {item.number} · {item.period}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {item.institution}
                  </span>
                </div>

                <h4 className="mt-3 text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
                  {item.degree}
                </h4>
                <p className="mt-1.5 text-sm font-medium text-[var(--accent-primary)]">
                  {item.focus}
                </p>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-primary)]"
                      />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </BlockReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
