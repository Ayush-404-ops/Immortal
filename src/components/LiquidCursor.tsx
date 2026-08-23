import { useEffect, useRef } from "react";

/**
 * Ambient fluid cursor trail — original implementation.
 *
 * A short chain of points "chases" the real cursor with spring/lerp
 * physics: the head catches up fast, each following point chases the
 * one before it more slowly, so fast movement stretches the shape
 * into a comet/teardrop and stillness lets it settle into a round
 * blob. The chain is filled as one smooth shape on a full-viewport
 * canvas that sits behind the page content (z-0), with a light grain
 * texture for a painterly edge, plus a small burst of colored
 * particles at the head.
 *
 * Also writes the current head position + a "reach" (chain length /
 * speed proxy) to CSS custom properties on <html>, so other
 * components (e.g. a heading reveal) can react to the same motion
 * without a second physics system.
 */
export default function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();

    const CHAIN_LENGTH = 16;
    const chain = Array.from({ length: CHAIN_LENGTH }, () => ({
      x: -9999,
      y: -9999,
    }));
    let target = { x: -9999, y: -9999 };
    let active = false;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    };
    const particles: Particle[] = [];
    const sparkColors = ["#ff7a29", "#ffd23f", "#4ea8ff", "#ff4ecb"];
    let lastSpark = 0;

    function handlePointerMove(e: PointerEvent) {
      target = { x: e.clientX, y: e.clientY };
      if (!active) {
        active = true;
        chain.forEach((p) => {
          p.x = target.x;
          p.y = target.y;
        });
        raf = requestAnimationFrame(loop);
      }
    }

    let raf = 0;
    function loop(now: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // spring chain: head chases target fast, each link chases the
      // previous link a bit slower, producing an elastic stretch.
      chain[0].x += (target.x - chain[0].x) * 0.22;
      chain[0].y += (target.y - chain[0].y) * 0.22;
      for (let i = 1; i < chain.length; i++) {
        chain[i].x += (chain[i - 1].x - chain[i].x) * 0.28;
        chain[i].y += (chain[i - 1].y - chain[i].y) * 0.28;
      }

      // publish head position + a speed-derived "reach" for other
      // components (e.g. the heading reveal) to read via CSS vars.
      const tail = chain[chain.length - 1];
      const dx = chain[0].x - tail.x;
      const dy = chain[0].y - tail.y;
      const reach = Math.min(260, 90 + Math.sqrt(dx * dx + dy * dy) * 0.6);
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${chain[0].x}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${chain[0].y}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-reach",
        `${reach}px`
      );

      // draw the chain as one smooth filled blob (varying radius,
      // widest near the head, tapering toward the tail)
      ctx.beginPath();
      const radii = chain.map((_, i) => 34 * (1 - i / chain.length) + 6);
      for (let i = 0; i < chain.length; i++) {
        const p = chain[i];
        const r = radii[i];
        ctx.moveTo(p.x + r, p.y);
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      }
      const grad = ctx.createRadialGradient(
        chain[0].x,
        chain[0].y,
        0,
        chain[0].x,
        chain[0].y,
        220
      );
      grad.addColorStop(0, "rgba(78, 90, 200, 0.55)");
      grad.addColorStop(0.6, "rgba(45, 40, 120, 0.32)");
      grad.addColorStop(1, "rgba(20, 15, 60, 0)");
      ctx.fillStyle = grad;
      ctx.filter = "blur(6px)";
      ctx.fill();
      ctx.filter = "none";

      // occasional rainbow spark at the head
      if (now - lastSpark > 90) {
        lastSpark = now;
        particles.push({
          x: chain[0].x + (Math.random() - 0.5) * 10,
          y: chain[0].y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.3,
          life: 1,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        });
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
