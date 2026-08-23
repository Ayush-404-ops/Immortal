import { useEffect, useRef } from "react";

/**
 * Two-layer heading reveal — original implementation, own words/colors.
 *
 * Back layer: "Ayush Patel" rendered with a colorful gradient fill.
 * Front layer: the same words, solid off-white, stacked exactly on
 * top. The front layer has a soft radial mask "hole" whose position
 * and size track the shared --cursor-x / --cursor-y / --cursor-reach
 * variables published by LiquidCursor (no click needed — pure
 * pointer movement), so wherever the cursor's fluid trail passes
 * over the name, the front layer thins out and the colorful layer
 * shows through underneath.
 */
export default function CursorRevealHeading() {
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let raf = 0;
    function sync() {
      const el = maskRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const styles = getComputedStyle(document.documentElement);
      const cx = parseFloat(styles.getPropertyValue("--cursor-x")) || -9999;
      const cy = parseFloat(styles.getPropertyValue("--cursor-y")) || -9999;
      el.style.setProperty("--local-x", `${cx - rect.left}px`);
      el.style.setProperty("--local-y", `${cy - rect.top}px`);
      raf = requestAnimationFrame(sync);
    }
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative select-none">
      {/* Back layer — colorful gradient fill, always present */}
      <div
        aria-hidden="true"
        className="font-display font-semibold tracking-tight text-5xl sm:text-7xl md:text-8xl leading-[0.95]"
        style={{
          backgroundImage:
            "linear-gradient(100deg, #ff7a29, #ffd23f, #4ea8ff, #ff4ecb)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Ayush Patel
      </div>

      {/* Front layer — solid text with a soft moving hole */}
      <div
        ref={maskRef}
        aria-hidden="true"
        className="absolute inset-0 font-display font-semibold tracking-tight text-5xl sm:text-7xl md:text-8xl leading-[0.95] text-paper"
        style={{
          ["--local-x" as string]: "-9999px",
          ["--local-y" as string]: "-9999px",
          WebkitMaskImage:
            "radial-gradient(circle 130px at var(--local-x) var(--local-y), transparent 0%, transparent 35%, black 100%)",
          maskImage:
            "radial-gradient(circle 130px at var(--local-x) var(--local-y), transparent 0%, transparent 35%, black 100%)",
        }}
      >
        Ayush Patel
      </div>

      <span className="sr-only">Ayush Patel</span>
    </div>
  );
}
