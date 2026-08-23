import { useRef } from "react";

/**
 * Two-layer cursor-reveal effect:
 * - Back layer: outlined, multi-color text ("AYUSH PATEL")
 * - Front layer: solid off-white text, same words, stacked exactly on top
 * - A radial "torch" mask on the front layer follows the pointer while
 *   dragging (mouse-down + move, or touch), smoothly revealing the
 *   colorful back layer underneath wherever the cursor has passed.
 *
 * Original words/palette — not copied from any reference site, same
 * underlying mask mechanic.
 */
export default function CursorRevealHeading() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pos = useRef({ x: -9999, y: -9999 });

  function setMaskPosition(x: number, y: number) {
    if (!maskRef.current) return;
    maskRef.current.style.setProperty("--reveal-x", `${x}px`);
    maskRef.current.style.setProperty("--reveal-y", `${y}px`);
  }

  function toLocal(clientX: number, clientY: number) {
    const rect = wrapRef.current!.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function handlePointerDown(e: React.PointerEvent) {
    dragging.current = true;
    const p = toLocal(e.clientX, e.clientY);
    pos.current = p;
    setMaskPosition(p.x, p.y);
    maskRef.current?.classList.add("opacity-100");
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const p = toLocal(e.clientX, e.clientY);
    pos.current = p;
    setMaskPosition(p.x, p.y);
  }

  function endDrag() {
    dragging.current = false;
    maskRef.current?.classList.remove("opacity-100");
  }

  return (
    <div
      ref={wrapRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className="relative select-none touch-none cursor-grab active:cursor-grabbing"
    >
      {/* Back layer — colorful outlined text, always present */}
      <div
        aria-hidden="true"
        className="font-display font-bold uppercase leading-[0.9] text-5xl sm:text-7xl md:text-8xl tracking-tight"
        style={{
          WebkitTextStroke: "1.5px transparent",
          backgroundImage:
            "linear-gradient(90deg, #ff7a29, #ffd23f, #4ea8ff, #ff4ecb)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          filter: "blur(0.2px)",
        }}
      >
        Ayush Patel
      </div>

      {/* Front layer — solid text, masked to reveal the back layer on drag */}
      <div
        ref={maskRef}
        aria-hidden="true"
        className="absolute inset-0 font-display font-bold uppercase leading-[0.9] text-5xl sm:text-7xl md:text-8xl tracking-tight text-paper opacity-100 transition-opacity duration-500"
        style={{
          ["--reveal-x" as string]: "-9999px",
          ["--reveal-y" as string]: "-9999px",
          WebkitMaskImage:
            "radial-gradient(circle 140px at var(--reveal-x) var(--reveal-y), transparent 0%, transparent 55%, black 100%)",
          maskImage:
            "radial-gradient(circle 140px at var(--reveal-x) var(--reveal-y), transparent 0%, transparent 55%, black 100%)",
          transition: "mask-position 0.05s linear",
        }}
      >
        Ayush Patel
      </div>

      {/* Screen-reader accessible text (both layers above are aria-hidden) */}
      <span className="sr-only">Ayush Patel</span>

      <p className="font-mono text-[11px] text-paper-dim mt-3 uppercase tracking-wider">
        Click and drag
      </p>
    </div>
  );
}
