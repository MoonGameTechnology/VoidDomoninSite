import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  z: number;
  brightness: number;
  color: string;
};

type Flight = {
  setRunning: (running: boolean) => void;
  destroy: () => void;
};

const FAR = 1.4;
const NEAR = 0.16;
const SPEED = 0.085;
const COLORS = ['#dbf7ff', '#b4deff', '#a8f0f1', '#d2d0fa'];
const clamp = (value: number) => Math.max(0, Math.min(1, value));

function createFlight(canvas: HTMLCanvasElement): Flight {
  const context = canvas.getContext('2d');
  if (!context) return { setRunning() {}, destroy() {} };

  const stars: Star[] = [];
  let width = 0;
  let height = 0;
  let focal = 1;
  let running = false;
  let destroyed = false;
  let frame: number | null = null;
  let previousTime: number | null = null;

  const placeStar = (star: Star, initial: boolean) => {
    star.z = initial ? NEAR + Math.random() * (FAR - NEAR) : FAR;
    // Seed across the current view at every depth. Recycled stars enter at
    // the far plane and fade in individually, so the flight never resets.
    star.x = (Math.random() - 0.5) * width / focal * star.z * 1.12;
    star.y = (Math.random() - 0.43) * height / focal * star.z * 1.12;
  };

  const draw = (seconds: number) => {
    context.clearRect(0, 0, width, height);
    const centerX = width * 0.5;
    const centerY = height * 0.43;

    for (const star of stars) {
      star.z -= seconds * SPEED;
      if (star.z <= NEAR) placeStar(star, false);

      const x = centerX + star.x * focal / star.z;
      const y = centerY + star.y * focal / star.z;
      if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
        placeStar(star, false);
        continue;
      }

      const depth = clamp((FAR - star.z) / (FAR - NEAR));
      const arrival = clamp((FAR - star.z) / 0.12);
      const edge = clamp(Math.min(x, width - x, y, height - y) / 28);
      const alpha = star.brightness * (0.28 + depth * 0.72) * arrival * edge;
      const radius = 0.4 + depth * depth * 1.35;
      context.fillStyle = star.color;

      // Short exposure trails reveal direction near the edge without
      // turning a calm cruise into long hyperspace streaks.
      if (running && depth > 0.3) {
        const tailZ = star.z + SPEED * 0.065;
        const dx = x - (centerX + star.x * focal / tailZ);
        const dy = y - (centerY + star.y * focal / tailZ);
        const length = Math.hypot(dx, dy);
        const scale = Math.min(1, 12 / Math.max(1, length));
        context.globalAlpha = alpha * 0.35;
        context.strokeStyle = star.color;
        context.lineWidth = Math.min(1.25, radius);
        context.beginPath();
        context.moveTo(x - dx * scale, y - dy * scale);
        context.lineTo(x, y);
        context.stroke();
      }

      if (depth > 0.55 && star.brightness > 0.8) {
        context.globalAlpha = alpha * 0.09;
        context.beginPath();
        context.arc(x, y, radius * 3.2, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = alpha;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  };

  const tick = (time: number) => {
    frame = null;
    if (!running || destroyed) return;
    // Speed is time based; a slow frame or returning from another tab must
    // not cause a leap forward. Resuming starts with a fresh timestamp.
    const seconds = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    draw(seconds);
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTime = null;
  };

  const resize = () => {
    if (destroyed) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) {
      width = bounds.width;
      height = bounds.height;
      stop();
      return;
    }
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4_000_000 / (bounds.width * bounds.height)));
    const pixelWidth = Math.max(1, Math.floor(bounds.width * ratio));
    const pixelHeight = Math.max(1, Math.floor(bounds.height * ratio));
    // Mobile browser chrome can fire resize without changing the canvas.
    // Keep the existing stars in that case instead of reseeding the view.
    if (width === bounds.width && height === bounds.height && canvas.width === pixelWidth && canvas.height === pixelHeight) return;
    width = bounds.width;
    height = bounds.height;
    focal = Math.min(width, height) * 0.85;
    // Bound the transparent layer on high DPI and 4K displays. The existing
    // 4K sky image remains full resolution underneath it.
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = 'round';

    const count = Math.round(Math.max(150, Math.min(340, width * height / 4000)));
    stars.length = 0;
    for (let index = 0; index < count; index++) {
      const star = { x: 0, y: 0, z: FAR, brightness: 0.55 + Math.random() * 0.45, color: COLORS[index % COLORS.length] };
      placeStar(star, true);
      stars.push(star);
    }
    draw(0);
    if (running && frame === null) frame = requestAnimationFrame(tick);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  window.addEventListener('resize', resize, { passive: true });
  resize();

  return {
    setRunning(next) {
      if (destroyed || next === running) return;
      running = next;
      if (running && width && height) {
        previousTime = null;
        frame = requestAnimationFrame(tick);
      } else {
        stop();
      }
    },
    destroy() {
      destroyed = true;
      running = false;
      stop();
      observer.disconnect();
      window.removeEventListener('resize', resize);
    },
  };
}

export function StarFlight({ running }: { running: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const flight = useRef<Flight | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const renderer = createFlight(canvas.current);
    flight.current = renderer;
    return () => {
      renderer.destroy();
      flight.current = null;
    };
  }, []);

  useEffect(() => { flight.current?.setRunning(running); }, [running]);

  return <canvas ref={canvas} className="hero-flight" aria-hidden="true" />;
}
