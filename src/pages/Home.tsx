import { motion } from "framer-motion";
import ProjectIndex from "../components/ProjectIndex";
import CursorRevealHeading from "../components/CursorRevealHeading";
import Stats from "../components/Stats";
import TechMarquee from "../components/TechMarquee";

export default function Home() {
  return (
    <div>
      <div className="px-6 sm:px-10 pt-32 sm:pt-44 pb-16 max-w-5xl mx-auto">
        <CursorRevealHeading />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-paper-dim leading-[1.15] max-w-2xl mt-6"
        >
          I build the systems underneath the interface — the parts that decide,
          classify, and enforce.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-sm text-paper-dim mt-8 max-w-md"
        >
          B.Tech CS, Nirma University — full-stack &amp; applied ML.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <Stats />
      </div>

      <TechMarquee />

      <div className="px-6 sm:px-10 py-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs text-paper-dim uppercase tracking-wider mb-2">
            Selected work
          </p>
          <ProjectIndex />
        </motion.div>
      </div>
    </div>
  );
}
