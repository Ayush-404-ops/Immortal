import { motion } from "framer-motion";

const facts = [
  { label: "Education", value: "B.Tech CS, Nirma University" },
  { label: "Focus", value: "Full-stack systems & applied ML" },
  { label: "Currently", value: "Building IndieVault — a two-sided marketplace" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-3">
            About
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-white mb-6">
            Beyond CRUD
          </h2>
          <p className="text-fog leading-relaxed text-lg">
            I care about the systems underneath the interface — how a model
            scores risk, how a marketplace enforces roles and permissions,
            how state stays consistent when things go wrong. Most of my
            projects start as an attempt to prove I understand a system well
            enough to build it correctly, not just make it look finished.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel rounded-2xl p-6 sm:p-7"
        >
          <div className="flex flex-col gap-5">
            {facts.map((f) => (
              <div key={f.label}>
                <p className="font-mono text-[10px] tracking-wider text-fog-dim uppercase mb-1">
                  {f.label}
                </p>
                <p className="text-fog">{f.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
