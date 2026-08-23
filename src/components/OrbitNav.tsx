import { motion } from "framer-motion";

interface OrbitNode {
  id: string;
  label: string;
  code: string;
  x: number; // percentage position within the orbit box
  y: number;
}

const orbitNodes: OrbitNode[] = [
  { id: "projects", label: "Systems", code: "01", x: 78, y: 18 },
  { id: "about", label: "About", code: "02", x: 88, y: 62 },
  { id: "contact", label: "Contact", code: "03", x: 62, y: 88 },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function OrbitNav() {
  return (
    <div
      className="hidden md:block absolute right-[6%] top-1/2 -translate-y-1/2 w-[260px] h-[260px] z-10"
      aria-label="Section map"
    >
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="var(--color-signal)"
          opacity="0.9"
        />
        {orbitNodes.map((n) => (
          <line
            key={n.id}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="var(--color-glass-border)"
            strokeWidth="0.3"
            strokeDasharray="1.5 1.5"
          />
        ))}
      </svg>

      {orbitNodes.map((n, i) => (
        <motion.button
          key={n.id}
          onClick={() => scrollToSection(n.id)}
          data-cursor-hover
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.6 + i * 0.1 },
            scale: { duration: 0.6, delay: 0.6 + i * 0.1 },
            y: {
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            },
          }}
          className="group absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal/40 group-hover:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal group-hover:bg-amber transition-colors" />
          </span>
          <span className="glass-panel rounded-full px-3 py-1 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 group-hover:border-signal-dim transition-all whitespace-nowrap">
            <span className="font-mono text-[9px] text-fog-dim">{n.code}</span>
            <span className="font-mono text-[10px] text-fog group-hover:text-white transition-colors">
              {n.label}
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
