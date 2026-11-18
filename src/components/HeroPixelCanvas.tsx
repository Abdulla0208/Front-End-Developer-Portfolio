import { useEffect, useRef } from 'react';

interface PixelDrop {
  baseX: number;
  x: number;
  vx: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  accent: boolean;
}

interface CursorSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface StaticNode {
  x: number;
  y: number;
  phase: number;
  speed: number;
}

export function HeroPixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    let width = 0;
    let height = 0;
    const cellSize = 32;
    const pixelSize = 3;

    let drops: PixelDrop[] = [];
    let nodes: StaticNode[] = [];
    const sparks: CursorSpark[] = [];

    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999 };

    const initParticles = () => {
      const cols = Math.max(10, Math.floor(width / cellSize));
      const dropCount = Math.min(44, Math.max(18, Math.floor(cols * 0.9)));

      drops = Array.from({ length: dropCount }, () => {
        const bx = Math.floor(Math.random() * cols) * cellSize;
        return {
          baseX: bx,
          x: bx,
          vx: 0,
          y: Math.random() * height,
          speed: 0.65 + Math.random() * 1.25,
          length: 5 + Math.floor(Math.random() * 7),
          opacity: 0.28 + Math.random() * 0.5,
          accent: Math.random() > 0.3,
        };
      });

      const rows = Math.max(8, Math.floor(height / cellSize));
      nodes = Array.from({ length: Math.min(36, Math.floor((cols * rows) / 12)) }, () => ({
        x: Math.floor(Math.random() * cols) * cellSize,
        y: Math.floor(Math.random() * rows) * cellSize,
        phase: Math.random() * Math.PI * 2,
        speed: 0.018 + Math.random() * 0.03,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
      const nx = e.clientX;
      const ny = e.clientY;
      const speed = Math.hypot(nx - mouse.prevX, ny - mouse.prevY);

      if (!reducedMotion && speed > 4 && sparks.length < 48) {
        const count = Math.min(3, Math.floor(speed / 12) + 1);
        for (let i = 0; i < count; i++) {
          sparks.push({
            x: nx + (Math.random() - 0.5) * 14,
            y: ny + (Math.random() - 0.5) * 14,
            vx: (Math.random() - 0.5) * 1.4,
            vy: 0.8 + Math.random() * 1.8,
            life: 0,
            maxLife: 24 + Math.random() * 20,
            size: Math.random() > 0.4 ? 3 : 2,
          });
        }
      }
      mouse.prevX = nx;
      mouse.prevY = ny;
      mouse.x = nx;
      mouse.y = ny;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const accentBright = '#38bdd4';
    const accentPrimary = '#20a4ba';
    const slateMuted = '#a9b8cc';

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Twinkling grid nodes reactive to cursor proximity
      for (const node of nodes) {
        node.phase += node.speed;
        const pulse = (Math.sin(node.phase) + 1) * 0.5;
        const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        const boost = dist < 170 ? (1 - dist / 170) * 0.7 : 0;

        ctx.globalAlpha = Math.min(0.85, 0.08 + pulse * 0.2 + boost);
        ctx.fillStyle = boost > 0.15 ? accentBright : slateMuted;
        const size = boost > 0.35 ? pixelSize + 1 : pixelSize;
        ctx.fillRect(node.x - size / 2, node.y - size / 2, size, size);
      }

      // 2. Falling pixel columns with cursor deflection & glow
      const interactRadius = 170;
      for (const drop of drops) {
        if (!reducedMotion) {
          drop.y += drop.speed;

          const dx = drop.x - mouse.x;
          const dy = drop.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < interactRadius && dist > 1) {
            const force = (1 - dist / interactRadius) * 2.4;
            drop.vx += (dx / dist) * force;
            drop.y += force * 0.8;
          }

          drop.vx += (drop.baseX - drop.x) * 0.045;
          drop.vx *= 0.84;
          drop.x += drop.vx;

          if (drop.y - drop.length * 8 > height) {
            const cols = Math.max(10, Math.floor(width / cellSize));
            drop.baseX = Math.floor(Math.random() * cols) * cellSize;
            drop.x = drop.baseX;
            drop.vx = 0;
            drop.y = -24;
            drop.speed = 0.65 + Math.random() * 1.25;
          }
        }

        const dist = Math.hypot(drop.x - mouse.x, drop.y - mouse.y);
        const nearCursor = dist < interactRadius ? 1 - dist / interactRadius : 0;

        for (let i = 0; i < drop.length; i++) {
          const py = drop.y - i * 8;
          if (py < -10 || py > height + 10) continue;

          const trailFade = 1 - i / drop.length;
          ctx.globalAlpha = Math.min(
            0.9,
            drop.opacity * trailFade * 0.52 + nearCursor * 0.45 * trailFade
          );

          if (nearCursor > 0.35 && i === 0) {
            ctx.fillStyle = accentBright;
          } else {
            ctx.fillStyle = i === 0 || drop.accent ? accentPrimary : slateMuted;
          }

          const size = i === 0 ? pixelSize + 1 : pixelSize;
          ctx.fillRect(drop.x - size / 2, py, size, size);
        }
      }

      // 3. Cursor-emitted falling pixel sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }
        const alpha = (1 - s.life / s.maxLife) * 0.85;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = accentBright;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      ctx.globalAlpha = 1;
      if (!reducedMotion) {
        animationId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
