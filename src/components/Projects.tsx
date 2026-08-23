import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";

type Status = "ACTIVE" | "PROD" | "ARCHIVED";

interface Project {
  name: string;
  status: Status;
  description: string;
  stack: string[];
  repo?: string;
  live?: string;
}

// NOTE: Fill in / correct details on Urban Risk — placeholder copy below
// based on limited context. Update repo links before shipping.
const projects: Project[] = [
  {
    name: "SmartContainer Risk Engine",
    status: "ACTIVE",
    description:
      "ML platform for port container risk classification. Trained an XGBoost model on shipment and manifest data, served through a FastAPI inference layer that scores containers in real time instead of relying on static rule checks.",
    stack: ["Python", "XGBoost", "FastAPI", "ML"],
    repo: "https://github.com/Ayush-404-ops/Hachamined2k26",
  },
  {
    name: "Urban Risk",
    status: "ACTIVE",
    description:
      "A risk-assessment platform focused on surfacing localized urban hazard signals — built to turn scattered data into a single actionable risk view.",
    stack: ["Full-stack", "Data pipeline"],
  },
  {
    name: "MERN Doctor Appointment Platform",
    status: "PROD",
    description:
      "End-to-end booking platform connecting patients and doctors — auth, scheduling, and appointment state handled across a MongoDB, Express, React, and Node stack.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
];

const statusStyles: Record<Status, string> = {
  ACTIVE: "text-signal border-signal-dim bg-signal/10",
  PROD: "text-ion border-ion-dim bg-ion/10",
  ARCHIVED: "text-fog-dim border-white/10 bg-white/5",
};

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-3">
          System modules
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-white">
          What I've built
        </h2>
      </motion.div>

      <div className="grid gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-panel rounded-2xl p-6 sm:p-8 hover:border-signal-dim/60 transition-colors group"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-xl sm:text-2xl text-white font-medium">
                  {p.name}
                </h3>
                <span
                  className={`font-mono text-[10px] tracking-wider px-2 py-1 rounded-full border ${statusStyles[p.status]}`}
                >
                  {p.status}
                </span>
              </div>
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-fog-dim hover:text-signal transition-colors"
                >
                  <GithubIcon size={14} />
                  repo
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>

            <p className="text-fog leading-relaxed mb-5 max-w-2xl">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[11px] text-fog-dim px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
