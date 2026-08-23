import { motion } from "framer-motion";
import ProcessSection from "../components/ProcessSection";
import FAQAccordion from "../components/FAQAccordion";

const toolGroups = [
  { label: "Languages", items: ["JavaScript / TypeScript", "Python"] },
  { label: "Backend", items: ["Node.js", "Express", "FastAPI"] },
  { label: "Databases", items: ["MongoDB", "MySQL"] },
  { label: "Auth & Systems", items: ["JWT", "RBAC", "bcrypt"] },
  { label: "ML", items: ["XGBoost"] },
  { label: "Frontend", items: ["React (Vite)", "Vue"] },
  { label: "Tooling", items: ["GitHub Actions", "Git"] },
];

export default function Info() {
  return (
    <div className="px-6 sm:px-10 pt-32 sm:pt-44 pb-20 max-w-3xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs text-signal uppercase tracking-wider mb-6"
      >
        Info
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col gap-5 text-lg text-paper leading-relaxed mb-16"
      >
        {/* Placeholder bio — rewrite in your own voice before shipping */}
        <p>
          I'm a B.Tech Computer Science student at Nirma University who's
          more interested in the parts of a system nobody sees until they
          break — a permission layer that quietly denies the wrong request,
          an inference pipeline that scores something in real time instead
          of on a schedule, a bot that reviews a pull request before a human
          gets to it.
        </p>
        <p>
          Most of what I build starts as an attempt to prove I actually
          understand a system well enough to build it correctly — not just
          make it look finished. That's meant spending more time on the
          layers underneath the UI: schema design, access control,
          real-time inference, and the glue code that holds a workflow
          together end to end.
        </p>
        <p>
          I'm currently focused on two or three projects I can explain in
          real depth, rather than a long list of half-finished ones.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-xs text-paper-dim uppercase tracking-wider mb-6">
          Tools
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
          {toolGroups.map((g) => (
            <div key={g.label}>
              <p className="font-mono text-[10px] text-signal uppercase tracking-wider mb-2">
                {g.label}
              </p>
              <ul className="flex flex-col gap-1">
                {g.items.map((item) => (
                  <li key={item} className="text-paper text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-20 pt-16 border-t border-line">
        <ProcessSection />
      </div>

      <div className="mt-20 pt-16 border-t border-line">
        <FAQAccordion />
      </div>
    </div>
  );
}
