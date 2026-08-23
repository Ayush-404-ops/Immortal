import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

// Honest numbers — edit as your real project count/stack changes.
const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Systems shipped" },
  { value: 2, suffix: "", label: "Core languages" },
  { value: 6, suffix: "+", label: "Frameworks & tools" },
  { value: 1, suffix: "", label: "ML pipeline in production" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-y border-line">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <p className="font-display text-3xl sm:text-4xl font-medium text-signal">
            <Counter value={s.value} suffix={s.suffix} />
          </p>
          <p className="font-mono text-[11px] text-paper-dim uppercase tracking-wider mt-1">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
