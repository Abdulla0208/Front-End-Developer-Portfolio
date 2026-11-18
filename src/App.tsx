import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { CursorFollower } from './components/CursorFollower';
import { FloatingConnectionHub } from './components/FloatingConnectionHub';
import { HeroPixelCanvas } from './components/HeroPixelCanvas';
import { Navbar } from './components/Navbar';
import { MarqueeRibbon, ScrollProgressBar } from './components/MotionPrimitives';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

const editorialRibbonItems = [
  'Frontend Engineering',
  'React & Next.js',
  'Responsive Architecture',
  'Expressive Typography',
  'TypeScript Systems',
  'Interactive Motion',
];

const workRibbonItems = [
  'Selected Work',
  'Production Delivery',
  'UI Craft',
  'Clean State Architecture',
  'Open Source',
];

export default function App() {
  useEffect(() => {
    if (
      window.location.protocol !== 'https:' &&
      window.location.protocol !== 'http:'
    ) {
      return;
    }

    const safeOrigin = window.location.origin;
    const safePath = window.location.pathname.replace(/\/+/g, '/');
    const canonicalUrl = `${safeOrigin}${safePath}`;
    const previewImageUrl = `${safeOrigin}/hero-portrait-2.png`;

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    const upsertMeta = (attr: 'property' | 'name', key: string, value: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.content = value;
    };

    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', previewImageUrl);
    upsertMeta('name', 'twitter:image', previewImageUrl);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] selection:bg-[var(--accent-primary)] selection:text-white">
        {/* Global cursor-reactive falling pixel particle system */}
        <HeroPixelCanvas />
        <CursorFollower />
        <ScrollProgressBar />
        <Navbar />
        <FloatingConnectionHub />

        <main className="relative z-10">
          <Hero />
          <MarqueeRibbon items={editorialRibbonItems} />
          <About />
          <Skills />
          <MarqueeRibbon items={workRibbonItems} />
          <Projects />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}
