import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";

type Status = "ACTIVE" | "PROD" | "ARCHIVED";

interface Project {
  code: string;
  name: string;
  status: Status;
  description: string;
  stack: string[];
  repo?: string;
}

// NOTE: Urban Risk copy is placeholder — swap in the real description/stack.
const projects: Project[] = [
  {
    code: "01",
    name: "SmartContainer Risk Engine",
    status: "ACTIVE",
    description:
      "ML platform for port container risk classification. Trained an XGBoost model on shipment and manifest data, served through a FastAPI inference layer that scores containers in real time instead of relying on static rule checks.",
    stack: ["Python", "XGBoost", "FastAPI", "ML"],
    repo: "https://github.com/Ayush-404-ops/Hachamined2k26",
  },
  {
    code: "02",
    name: "Urban Risk",
    status: "ACTIVE",
    description:
      "A risk-assessment platform focused on surfacing localized urban hazard signals — built to turn scattered data into a single actionable risk view.",
    stack: ["Full-stack", "Data pipeline"],
  },
  {
    code: "03",
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
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="projects" className="relative px-6 py-28 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex items-end justify-between gap-4"
      >
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-3">
            Index
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-white">
            What I've built
          </h2>
        </div>
        <span className="font-mono text-xs text-fog-dim hidden sm:block">
          {String(projects.length).padStart(2, "0")} systems
        </span>
      </motion.div>

      <div className="border-t border-white/10">
        {projects.map((p, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-b border-white/10"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                data-cursor-hover
                className="w-full flex items-center gap-4 sm:gap-6 py-6 text-left group"
                aria-expanded={isOpen}
              >
                <span className="font-mono text-sm text-fog-dim shrink-0 w-6">
                  {p.code}
                </span>
                <span
                  className={`font-display text-xl sm:text-3xl font-medium tracking-tight transition-colors shrink-0 ${
                    isOpen ? "text-signal" : "text-white group-hover:text-signal"
                  }`}
                >
                  {p.name}
                </span>
                <span
                  className={`font-mono text-[10px] tracking-wider px-2 py-1 rounded-full border shrink-0 hidden sm:inline-block ${statusStyles[p.status]}`}
                >
                  {p.status}
                </span>
                <span className="ml-auto shrink-0 text-fog-dim group-hover:text-signal transition-colors">
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-2xl leading-none"
                  >
                    +
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-7 pl-10 sm:pl-16 pr-2 sm:pr-8 flex flex-col gap-4">
                      <span
                        className={`font-mono text-[10px] tracking-wider px-2 py-1 rounded-full border self-start sm:hidden ${statusStyles[p.status]}`}
                      >
                        {p.status}
                      </span>
                      <p className="text-fog leading-relaxed max-w-2xl">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[11px] text-fog-dim px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]"
                          >
                            {s}
                          </span>
                        ))}
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor-hover
                            className="ml-auto flex items-center gap-1.5 text-xs font-mono text-fog-dim hover:text-signal transition-colors"
                          >
                            <GithubIcon size={14} />
                            repo
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
