'use client';

import { useEffect, useRef } from 'react';

import {
  ambientGlow,
  COLUMNS,
  RIPPLE_LIFE,
  rippleGlow,
  ROWS,
  stillGlow,
  tileAt,
  tileQuads,
  type Box,
  type Point,
  type Ripple,
} from '@/components/home/tile-floor';
import { cn } from '@/lib/utils';

/** Frame budget while only the ambient light moves (it changes slowly). */
const AMBIENT_FRAME_MS = 1000 / 30;
/** Frame budget while ripples run; high-refresh screens needn't redraw more. */
const RIPPLE_FRAME_MS = 1000 / 60 - 1;
/** Most ripples alive at once; the oldest makes way. */
const MAX_RIPPLES = 10;
/** Hover ripples are softer than taps, and spaced out. */
const HOVER_STRENGTH = 0.5;
const TAP_STRENGTH = 1;
const HOVER_GAP_MS = 80;
/** Backing-store density: the light is soft, so cap the pixel cost. */
const MAX_DPR = 1.5;
/** Tile outline opacity, as Tom's `rgba(237,232,223,.07)` borders. */
const OUTLINE_ALPHA = 0.07;
/** Below this a tile's light isn't worth a draw call. */
const MIN_GLOW = 0.004;

/** Reads a colour token from the root element (follows the theme). */
const token = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function sizeCanvas(canvas: HTMLCanvasElement, box: Box) {
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  canvas.width = Math.round(box.width * dpr);
  canvas.height = Math.round(box.height * dpr);
  const context = canvas.getContext('2d');
  context?.setTransform(dpr, 0, 0, dpr, 0, 0);
  return context;
}

function tracePath(context: CanvasRenderingContext2D, quad: Point[]) {
  context.moveTo(quad[0].x, quad[0].y);
  for (let i = 1; i < 4; i += 1) context.lineTo(quad[i].x, quad[i].y);
  context.closePath();
}

/**
 * The hero's waffle floor: 18 × 9 tiles tipped back in perspective, faded at
 * the edges, a slow diagonal wave of light and pools of gold. Moving the
 * mouse across it, or tapping a tile, sends a ripple out from that tile.
 *
 * Two canvases replace 162 animated elements: the outlines are drawn once
 * per size or theme, and the light layer redraws only the lit tiles, from
 * one animation loop that sleeps while the hero is off screen or the tab is
 * hidden. Reduced motion gets a still frame and no ripples. Decorative, so
 * hidden from assistive tech; without JavaScript the hero simply has no
 * floor.
 */
export function HeroTiles({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    const light = lightRef.current;
    if (!container || !grid || !light) return;
    // The hero section hosts the pointer events (the floor sits behind text).
    const surface = container.parentElement ?? container;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let box: Box = { width: 0, height: 0 };
    let quads: Point[][] = [];
    let lightContext: CanvasRenderingContext2D | null = null;
    let brand = '';
    const ripples: Ripple[] = [];
    const epoch = performance.now();
    const clock = () => (performance.now() - epoch) / 1000;
    let frame = 0;
    let timer = 0;
    let lastDraw = 0;
    let visible = false;
    let lastHoverTile = -1;
    let lastHoverAt = 0;

    function drawOutlines() {
      const context = sizeCanvas(grid!, box);
      if (!context) return;
      context.clearRect(0, 0, box.width, box.height);
      context.strokeStyle = token('--foreground');
      context.globalAlpha = OUTLINE_ALPHA;
      context.lineWidth = 1;
      context.beginPath();
      quads.forEach((quad) => tracePath(context, quad));
      context.stroke();
    }

    function drawLight(time: number, still: boolean) {
      if (!lightContext) return;
      lightContext.clearRect(0, 0, box.width, box.height);
      lightContext.fillStyle = brand;
      for (let row = 0; row < ROWS; row += 1) {
        for (let column = 0; column < COLUMNS; column += 1) {
          let glow = still
            ? stillGlow(row, column)
            : ambientGlow(row, column, time);
          for (const ripple of ripples)
            glow += rippleGlow(ripple, row, column, time);
          if (glow < MIN_GLOW) continue;
          lightContext.globalAlpha = Math.min(glow, 1);
          lightContext.beginPath();
          tracePath(lightContext, quads[row * COLUMNS + column]);
          lightContext.fill();
        }
      }
    }

    function layout() {
      const { clientWidth: width, clientHeight: height } = container!;
      if (!width || !height) return;
      box = { width, height };
      quads = tileQuads(box);
      brand = token('--brand');
      drawOutlines();
      lightContext = sizeCanvas(light!, box);
      drawLight(clock(), reduceMotion.matches);
    }

    const running = () => visible && !document.hidden && !reduceMotion.matches;

    /**
     * One frame. Ripples redraw on animation frames (capped at 60fps); the
     * ambient light alone sleeps on a timer between 30fps frames, so the
     * main thread wakes 30 times a second, not once per display refresh.
     */
    function tick(now: number) {
      frame = 0;
      if (!running()) return;
      const time = clock();
      while (ripples.length && time - ripples[0].start > RIPPLE_LIFE) {
        ripples.shift();
      }
      if (!ripples.length || now - lastDraw >= RIPPLE_FRAME_MS) {
        drawLight(time, false);
        lastDraw = now;
      }
      if (ripples.length) {
        frame = requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(() => {
          timer = 0;
          frame = requestAnimationFrame(tick);
        }, AMBIENT_FRAME_MS);
      }
    }

    /** Starts the loop now (a ripple cuts the ambient sleep short). */
    const start = () => {
      if (frame || !running()) return;
      window.clearTimeout(timer);
      timer = 0;
      frame = requestAnimationFrame(tick);
    };

    /** The tile under a pointer, if it is over the floor. */
    function tileFrom(event: PointerEvent) {
      if (!box.width) return null;
      const rect = container!.getBoundingClientRect();
      return tileAt(box, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }

    function ripple(event: PointerEvent, strength: number) {
      if (reduceMotion.matches) return null;
      const tile = tileFrom(event);
      if (!tile) return null;
      ripples.push({ ...tile, start: clock(), strength });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
      start();
      return tile;
    }

    const onMove = (event: PointerEvent) => {
      // Touch moves are scrolls; only mice and pens hover.
      if (event.pointerType === 'touch' || reduceMotion.matches) return;
      const now = performance.now();
      if (now - lastHoverAt < HOVER_GAP_MS) return;
      const tile = tileFrom(event);
      const key = tile ? tile.row * COLUMNS + tile.column : -1;
      if (key === -1 || key === lastHoverTile) return;
      ripple(event, HOVER_STRENGTH);
      lastHoverTile = key;
      lastHoverAt = now;
    };
    const onDown = (event: PointerEvent) => ripple(event, TAP_STRENGTH);
    const onLeave = () => {
      lastHoverTile = -1;
    };

    const resize = new ResizeObserver(layout);
    resize.observe(container);
    const inView = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    inView.observe(container);
    // Theme switches change the outline colour.
    const theme = new MutationObserver(layout);
    theme.observe(document.documentElement, { attributeFilter: ['class'] });
    const onVisibility = () => start();
    const onMotion = () => {
      layout();
      start();
    };

    surface.addEventListener('pointermove', onMove, { passive: true });
    surface.addEventListener('pointerdown', onDown, { passive: true });
    surface.addEventListener('pointerleave', onLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', onMotion);
    layout();
    container.dataset.ready = '';

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      resize.disconnect();
      inView.disconnect();
      theme.disconnect();
      surface.removeEventListener('pointermove', onMove);
      surface.removeEventListener('pointerdown', onDown);
      surface.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onMotion);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn(
        '[mask-image:radial-gradient(ellipse_60%_70%_at_50%_45%,black_30%,transparent_75%)]',
        'pointer-events-none absolute -top-10 left-1/2 -ml-[850px] h-[900px] w-[1700px]',
        'max-[720px]:-ml-[450px] max-[720px]:h-[520px] max-[720px]:w-[900px]',
        // Fade in once drawn, so the floor arrives rather than pops.
        'opacity-0 transition-opacity duration-700 data-ready:opacity-100',
        className,
      )}
    >
      <canvas ref={gridRef} className="absolute inset-0 size-full" />
      <canvas ref={lightRef} className="absolute inset-0 size-full" />
    </div>
  );
}
