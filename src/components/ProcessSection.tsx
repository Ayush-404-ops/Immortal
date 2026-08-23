import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Learn",
    body: "Before writing code, I work out what the requirement actually is — a course spec, a hackathon brief, a real workflow — instead of assuming I already know.",
  },
  {
    number: "02",
    title: "Design",
    body: "Schema, auth, and roles get planned before implementation. For IndieVault that meant deciding the RBAC model and splitting MySQL/MongoDB responsibilities up front.",
  },
  {
    number: "03",
    title: "Build",
    body: "One confirmed piece at a time. I don't move to the next feature until the current one actually works end to end — no half-finished layers stacked on top of each other.",
  },
  {
    number: "04",
    title: "Ship",
    body: "Test it, document what it does and why, then push. A project isn't done until someone else could read the repo and understand the decisions.",
  },
];

export default function ProcessSection() {
  return (
    <div className="py-4">
      <p className="font-mono text-xs text-signal uppercase tracking-wider mb-8">
        How I build
      </p>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
        {phases.map((p, i) => (
          <motion.div
            key={p.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <p className="font-mono text-sm text-paper-dim mb-2">
              {p.number}
            </p>
            <h3 className="font-display text-xl text-paper font-medium mb-2">
              {p.title}
            </h3>
            <p className="text-paper-dim leading-relaxed text-sm">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
