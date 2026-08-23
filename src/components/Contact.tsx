import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="glass-panel rounded-3xl p-10 sm:p-14"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-3">
          Get in touch
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-white mb-4">
          Let's build something
        </h2>
        <p className="text-fog leading-relaxed max-w-md mx-auto mb-8">
          Open to internships and collaborations. The fastest way to reach me
          is email.
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="mailto:your-email@example.com"
            className="glass-panel rounded-full px-6 py-3 text-sm font-medium text-white hover:border-signal-dim hover:bg-white/[0.07] transition-colors flex items-center gap-2"
          >
            <Mail size={16} />
            Say hello
          </a>
          <a
            href="https://github.com/Ayush-404-ops"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="glass-panel h-11 w-11 rounded-full flex items-center justify-center text-fog hover:text-signal hover:border-signal-dim transition-colors"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="glass-panel h-11 w-11 rounded-full flex items-center justify-center text-fog hover:text-signal hover:border-signal-dim transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </motion.div>

      <p className="mt-10 font-mono text-[11px] text-fog-dim">
        Built by Ayush Patel — {new Date().getFullYear()}
      </p>
    </section>
  );
}
