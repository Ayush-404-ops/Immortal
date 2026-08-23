import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import HeroBackground from "./HeroBackground";
import StatusBar from "./StatusBar";
import OrbitNav from "./OrbitNav";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <HeroBackground />
      <OrbitNav />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <StatusBar />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-5"
        >
          Systems Engineer / B.Tech CS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-[1.05]"
        >
          Ayush Patel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-lg text-fog max-w-xl leading-relaxed"
        >
          I build systems that make decisions — risk classifiers, real-time
          platforms, and the infrastructure underneath them. Currently
          engineering a two-sided marketplace platform from the ground up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-9 flex items-center gap-4"
        >
          <a
            href="#projects"
            className="glass-panel rounded-full px-6 py-3 text-sm font-medium text-white hover:border-signal-dim hover:bg-white/[0.07] transition-colors"
          >
            View systems
          </a>
          <div className="flex items-center gap-2">
            <IconLink href="https://github.com/Ayush-404-ops" label="GitHub">
              <GithubIcon size={18} />
            </IconLink>
            <IconLink href="#" label="LinkedIn">
              <LinkedinIcon size={18} />
            </IconLink>
            <IconLink href="#contact" label="Email">
              <Mail size={18} />
            </IconLink>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-8 z-10 text-fog-dim hover:text-signal transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="glass-panel h-10 w-10 rounded-full flex items-center justify-center text-fog hover:text-signal hover:border-signal-dim transition-colors"
    >
      {children}
    </a>
  );
}
