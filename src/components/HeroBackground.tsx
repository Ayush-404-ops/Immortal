import { useEffect, useRef } from "react";

/**
 * PLACEHOLDER hero visual — a canvas signal field (nodes + connecting pulses).
 * Swap this component's contents for a <video> tag once the Higgsfield
 * hero asset is ready. Keep the same wrapper div + gradient overlay below
 * so the glass panel on top still reads correctly.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const NODE_COUNT = width < 768 ? 34 : 60;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
    }));

    const LINK_DIST = 130;
    let raf = 0;
    let frame = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (const n of nodes) {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(94, 234, 212, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = prefersReducedMotion
          ? 0.5
          : 0.5 + 0.5 * Math.sin(frame * 0.02 + n.x * 0.01);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 127, 255, ${0.25 + pulse * 0.35})`;
        ctx.fill();
      }

      frame++;
      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    draw();

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx?.scale(devicePixelRatio, devicePixelRatio);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-70" />
      {/* Radial glow anchored behind the hero panel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(139,127,255,0.16), transparent 70%), radial-gradient(ellipse 40% 40% at 80% 70%, rgba(94,234,212,0.10), transparent 70%)",
        }}
      />
      {/* Fade to void at the edges so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,14,26,0.2) 0%, rgba(10,14,26,0.55) 65%, var(--color-void) 100%)",
        }}
      />
    </div>
  );
}
