import { useEffect, useRef } from "react";

/**
 * PLACEHOLDER hero visual — layered mission-control scene:
 * 1. Perspective grid horizon (CSS)
 * 2. Drifting nebula glow (CSS, animated)
 * 3. Canvas node network with traveling "data packet" pulses along edges
 * 4. Slow radar sweep (CSS conic-gradient rotation)
 *
 * Swap the <canvas> block for a <video> tag once the Higgsfield hero
 * asset is ready — keep the grid/nebula/vignette layers, they're what
 * keep the glass panel text readable on top.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    type Edge = { a: number; b: number; packets: number[] };

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    const LINK_DIST = 150;

    function buildField() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const NODE_COUNT = w < 768 ? 30 : 48;
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.7,
      }));

      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < LINK_DIST) {
            // occasionally seed a traveling packet on this edge
            const packets = Math.random() < 0.35 ? [Math.random()] : [];
            edges.push({ a: i, b: j, packets });
          }
        }
      }
    }

    buildField();

    let raf = 0;
    let frame = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      if (!prefersReducedMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1;
        }
      }

      // edges + traveling packets
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        if (!a || !b) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= LINK_DIST) continue;

        const opacity = (1 - dist / LINK_DIST) * 0.16;
        ctx.strokeStyle = `rgba(94, 234, 212, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        if (!prefersReducedMotion) {
          for (let k = 0; k < e.packets.length; k++) {
            e.packets[k] += 0.006;
            if (e.packets[k] > 1) e.packets[k] -= 1;
            const t = e.packets[k];
            const px = a.x + (b.x - a.x) * t;
            const py = a.y + (b.y - a.y) * t;
            ctx.beginPath();
            ctx.arc(px, py, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(251, 191, 36, 0.85)";
            ctx.shadowColor = "rgba(251, 191, 36, 0.8)";
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const pulse = prefersReducedMotion
          ? 0.5
          : 0.5 + 0.5 * Math.sin(frame * 0.018 + n.x * 0.01);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 127, 255, ${0.3 + pulse * 0.4})`;
        ctx.fill();
      }

      frame++;
      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    draw();

    function handleResize() {
      if (!canvas || !ctx) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      buildField();
      if (prefersReducedMotion) draw();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1: perspective grid horizon */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(94,234,212,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.14) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 100%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 100%, black 0%, transparent 75%)",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* Layer 2: drifting nebula glow */}
      <div
        className="absolute inset-0 animate-[drift_22s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 30% 30%, rgba(139,127,255,0.20), transparent 70%), radial-gradient(ellipse 45% 40% at 75% 65%, rgba(94,234,212,0.14), transparent 70%)",
        }}
      />

      {/* Layer 3: node network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Layer 4: slow radar sweep */}
      <div
        className="absolute inset-0 opacity-40 animate-[spin_16s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 40%, transparent 0deg, rgba(94,234,212,0.10) 8deg, transparent 40deg)",
        }}
      />

      {/* Vignette: fade to void at edges + bottom so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,14,26,0.25) 0%, rgba(10,14,26,0.55) 65%, var(--color-void) 100%), radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgba(10,14,26,0.5) 100%)",
        }}
      />
    </div>
  );
}
