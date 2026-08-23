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
    const DURATION = 1000;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          onDone();
        }, 200);
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
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
        >
          <span className="font-mono text-3xl sm:text-4xl text-paper tabular-nums">
            {pct}
            <span className="text-signal">%</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
