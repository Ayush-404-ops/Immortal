import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";

// Deterministic gradient per project so each preview tile looks distinct
// without needing real screenshots yet — swap for real project images.
const previewGradients = [
  "linear-gradient(135deg, #ff7a29 0%, #7a2900 100%)",
  "linear-gradient(135deg, #2d2d2d 0%, #050505 100%)",
  "linear-gradient(135deg, #ff7a29 0%, #2d2d2d 100%)",
  "linear-gradient(135deg, #4a4a4a 0%, #ff7a29 120%)",
];

export default function ProjectIndex() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      {projects.map((p, i) => (
        <Link
          key={p.slug}
          to={`/work/${p.slug}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="group flex items-baseline gap-4 sm:gap-8 py-6 sm:py-8 border-b border-line first:border-t"
        >
          <span className="font-mono text-xs text-paper-dim shrink-0 w-6">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-paper group-hover:text-signal transition-colors duration-300">
            {p.name}
          </span>
          <span className="ml-auto font-mono text-xs text-paper-dim shrink-0 hidden sm:block">
            {p.year}
          </span>
        </Link>
      ))}

      {/* Cursor-following preview tile — desktop only */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block pointer-events-none absolute w-56 h-36 rounded-sm overflow-hidden z-10"
            style={{
              left: pos.x + 24,
              top: pos.y - 90,
              background: previewGradients[hovered % previewGradients.length],
            }}
          >
            <div className="absolute inset-0 flex items-end p-3">
              <span className="font-mono text-[10px] text-paper/90 uppercase tracking-wider">
                {projects[hovered].role}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
