import { useEffect, useRef } from "react";

/**
 * Full-viewport cursor-reveal background:
 * - Back layer: a soft, blurred multi-color gradient field, always
 *   rendered but hidden behind the front layer.
 * - Front layer: solid page-background color, with a soft radial
 *   "window" cut into it via CSS mask. The window's position is
 *   smoothly interpolated (lerp) toward the real cursor position
 *   every frame, so it trails a little instead of snapping — a
 *   "smooth" reveal rather than a rigid spotlight.
 * - Pure pointer movement, no click/drag required.
 * - pointer-events-none throughout so it never blocks clicks on the
 *   actual page content, which renders above this in z-index.
 */
export default function CursorRevealOverlay() {
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let targetX = -9999;
    let targetY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let raf = 0;
    let active = false;

    function handlePointerMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        currentX = targetX;
        currentY = targetY;
        raf = requestAnimationFrame(animate);
      }
    }

    function animate() {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      if (maskRef.current) {
        maskRef.current.style.setProperty("--reveal-x", `${currentX}px`);
        maskRef.current.style.setProperty("--reveal-y", `${currentY}px`);
      }
      raf = requestAnimationFrame(animate);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Back layer — soft blurred color field */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, #ff7a29 0%, transparent 45%), radial-gradient(circle at 75% 65%, #4ea8ff 0%, transparent 45%), radial-gradient(circle at 50% 90%, #ff4ecb 0%, transparent 40%)",
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />

      {/* Front layer — page-color mask with a soft trailing window */}
      <div
        ref={maskRef}
        aria-hidden="true"
        className="absolute inset-0 bg-ink"
        style={{
          ["--reveal-x" as string]: "-9999px",
          ["--reveal-y" as string]: "-9999px",
          WebkitMaskImage:
            "radial-gradient(circle 260px at var(--reveal-x) var(--reveal-y), transparent 0%, transparent 30%, black 100%)",
          maskImage:
            "radial-gradient(circle 260px at var(--reveal-x) var(--reveal-y), transparent 0%, transparent 30%, black 100%)",
        }}
      />
    </div>
  );
}
