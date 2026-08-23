import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What are you looking for?",
    a: "Internships and collaborations where I can work on something real, not just a resume line — ideally somewhere I'm actually building or maintaining a system, not just fixing tickets.",
  },
  {
    q: "What do you actually build?",
    a: "Full-stack systems with real logic underneath — permission layers, ML inference, review automation — rather than another CRUD app with a nice UI on top.",
  },
  {
    q: "How do you work?",
    a: "One confirmed piece at a time. I'd rather have two or three projects I can explain in real depth than a long list of things I half-finished.",
  },
  {
    q: "Are you open to freelance or team projects?",
    a: "Yes — reach out through the email below and tell me what you're building.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="py-4">
      <p className="font-mono text-xs text-signal uppercase tracking-wider mb-6">
        Before you reach out
      </p>
      <div className="border-t border-line">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-line">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                aria-expanded={isOpen}
              >
                <span
                  className={`font-display text-lg sm:text-xl transition-colors ${
                    isOpen ? "text-signal" : "text-paper group-hover:text-signal"
                  }`}
                >
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-paper-dim text-xl leading-none shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-paper-dim leading-relaxed pb-5 max-w-xl">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
