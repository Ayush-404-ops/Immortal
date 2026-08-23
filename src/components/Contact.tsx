import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const EMAIL = "your-email@example.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — fall back to mailto below still works
    }
  }

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
          Open to internships and collaborations. Click to copy my email, or
          reach out directly below.
        </p>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleCopy}
            data-cursor-hover
            className="glass-panel rounded-full px-6 py-3 text-sm font-mono text-white hover:border-signal-dim hover:bg-white/[0.07] transition-colors flex items-center gap-3"
          >
            {EMAIL}
            <span className="text-signal">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </span>
          </button>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ayush-404-ops"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor-hover
              className="glass-panel h-11 w-11 rounded-full flex items-center justify-center text-fog hover:text-signal hover:border-signal-dim transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              data-cursor-hover
              className="glass-panel h-11 w-11 rounded-full flex items-center justify-center text-fog hover:text-signal hover:border-signal-dim transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </motion.div>

      <p className="mt-10 font-mono text-[11px] text-fog-dim">
        Built by Ayush Patel — {new Date().getFullYear()}
      </p>
    </section>
  );
}
