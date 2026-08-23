import { useEffect, useRef } from "react";

/**
 * PLACEHOLDER hero visual — interactive mission-control scene:
 * 1. Parallax grid horizon + nebula glow (shift slightly with cursor)
 * 2. Canvas particle field that reacts to the cursor:
 *    - nodes are gently repelled by the pointer
 *    - nearby nodes draw a "targeting" line to the cursor
 *    - traveling data-packet pulses along node-to-node edges
 * 3. Click/tap emits an expanding ripple
 * 4. Slow radar sweep
 *
 * Swap the <canvas> block for a <video> tag once the Higgsfield hero
 * asset is ready — keep the grid/nebula/vignette layers around it.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    type Node = {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      r: number;
    };
    type Edge = { a: number; b: number; packets: number[] };
    type Ripple = { x: number; y: number; t: number };

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    const ripples: Ripple[] = [];
    const LINK_DIST = 150;
    const POINTER_RADIUS = 140;

    const pointer = { x: -9999, y: -9999, active: false };

    function buildField() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const NODE_COUNT = w < 768 ? 30 : 50;
      nodes = Array.from({ length: NODE_COUNT }, () => {
        const x = Math.random() * canvas.offsetWidth;
        const y = Math.random() * canvas.offsetHeight;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.4 + 0.7,
        };
      });

      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < LINK_DIST) {
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

      // update node positions — drift + gentle pointer repulsion
      for (const n of nodes) {
        if (!prefersReducedMotion) {
          n.baseX += n.vx;
          n.baseY += n.vy;
          if (n.baseX < 0 || n.baseX > canvas.offsetWidth) n.vx *= -1;
          if (n.baseY < 0 || n.baseY > canvas.offsetHeight) n.vy *= -1;
        }

        let tx = n.baseX;
        let ty = n.baseY;

        if (pointer.active) {
          const dx = n.baseX - pointer.x;
          const dy = n.baseY - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < POINTER_RADIUS) {
            const force = (1 - dist / POINTER_RADIUS) * 26;
            const angle = Math.atan2(dy, dx);
            tx += Math.cos(angle) * force;
            ty += Math.sin(angle) * force;
          }
        }

        n.x += (tx - n.x) * 0.12;
        n.y += (ty - n.y) * 0.12;
      }

      // edges + traveling packets
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        if (!a || !b) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= LINK_DIST + 40) continue;

        const opacity = Math.max(0, 1 - dist / (LINK_DIST + 40)) * 0.16;
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

      // cursor "targeting" lines to nearby nodes
      if (pointer.active) {
        for (const n of nodes) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < POINTER_RADIUS) {
            const opacity = (1 - dist / POINTER_RADIUS) * 0.5;
            ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
        // pointer core glow
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
        ctx.shadowColor = "rgba(251, 191, 36, 0.9)";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, POINTER_RADIUS, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(94, 234, 212, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        const pulse = prefersReducedMotion
          ? 0.5
          : 0.5 + 0.5 * Math.sin(frame * 0.018 + n.baseX * 0.01);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 127, 255, ${0.3 + pulse * 0.4})`;
        ctx.fill();
      }

      // click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.t += 0.02;
        if (r.t >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const radius = r.t * 220;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(94, 234, 212, ${(1 - r.t) * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      frame++;
      if (!prefersReducedMotion || pointer.active || ripples.length) {
        raf = requestAnimationFrame(draw);
      }
    }

    draw();

    function toLocal(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function handlePointerMove(e: PointerEvent) {
      const p = toLocal(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
      if (prefersReducedMotion) return;
      if (!raf) raf = requestAnimationFrame(draw);

      // subtle parallax on grid/nebula layers
      if (parallaxRef.current && wrap) {
        const nx = (p.x / wrap.offsetWidth - 0.5) * 2;
        const ny = (p.y / wrap.offsetHeight - 0.5) * 2;
        parallaxRef.current.style.transform = `translate(${nx * -10}px, ${ny * -8}px)`;
      }
    }

    function handlePointerLeave() {
      pointer.active = false;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = "translate(0px, 0px)";
      }
    }

    function handleClick(e: PointerEvent) {
      const p = toLocal(e.clientX, e.clientY);
      ripples.push({ x: p.x, y: p.y, t: 0 });
      if (!raf) raf = requestAnimationFrame(draw);
    }

    wrap.addEventListener("pointermove", handlePointerMove);
    wrap.addEventListener("pointerleave", handlePointerLeave);
    wrap.addEventListener("pointerdown", handleClick);

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
      wrap.removeEventListener("pointermove", handlePointerMove);
      wrap.removeEventListener("pointerleave", handlePointerLeave);
      wrap.removeEventListener("pointerdown", handleClick);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden cursor-crosshair">
      <div ref={parallaxRef} className="absolute -inset-6 transition-transform duration-300 ease-out">
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
      </div>

      {/* Layer 3: interactive node network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Layer 4: slow radar sweep */}
      <div
        className="absolute inset-0 opacity-40 animate-[spin_16s_linear_infinite] pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 40%, transparent 0deg, rgba(94,234,212,0.10) 8deg, transparent 40deg)",
        }}
      />

      {/* Vignette: fade to void at edges + bottom so content stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,14,26,0.25) 0%, rgba(10,14,26,0.55) 65%, var(--color-void) 100%), radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgba(10,14,26,0.5) 100%)",
        }}
      />
    </div>
  );
}
