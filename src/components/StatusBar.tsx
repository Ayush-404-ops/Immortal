import { motion } from "framer-motion";

const stats = [
  { label: "SYSTEMS SHIPPED", value: "4" },
  { label: "CURRENTLY BUILDING", value: "IndieVault" },
  { label: "STACK", value: "MERN · Python · ML" },
  { label: "BASE", value: "Ahmedabad, IN" },
];

export default function StatusBar() {
  return (
    <div className="glass-panel rounded-full px-4 sm:px-6 py-2.5 inline-flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
      <span className="flex items-center gap-2 font-mono text-xs text-signal shrink-0">
        <span className="relative flex h-2 w-2">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-signal"
            animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
        </span>
        ONLINE
      </span>
      {stats.map((s) => (
        <span
          key={s.label}
          className="font-mono text-[11px] tracking-wide text-fog-dim whitespace-nowrap"
        >
          <span className="text-fog-dim/70">{s.label}</span>{" "}
          <span className="text-fog">{s.value}</span>
        </span>
      ))}
    </div>
  );
}
