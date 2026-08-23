import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDone(true);
      onDone();
      return;
    }

    let raf: number;
    const start = performance.now();
    const DURATION = 1100;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out for a snappier finish
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          onDone();
        }, 250);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-void flex items-end sm:items-center justify-center pb-16 sm:pb-0"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="font-mono text-5xl sm:text-6xl text-white tabular-nums">
              {pct}
              <span className="text-signal">%</span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-fog-dim uppercase">
              Initializing systems
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
