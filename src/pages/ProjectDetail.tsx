import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { GithubIcon } from "../components/icons";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) return <Navigate to="/" replace />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="px-6 sm:px-10 pt-32 sm:pt-44 pb-20 max-w-3xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs text-signal uppercase tracking-wider mb-4"
      >
        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-paper leading-[1.05]"
      >
        {project.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-lg text-paper-dim mt-6 max-w-xl"
      >
        {project.outcome}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-8 pt-8 border-t border-line font-mono text-xs text-paper-dim"
      >
        <span>Year — {project.year}</span>
        <span>Role — {project.role}</span>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-paper hover:text-signal transition-colors"
          >
            <GithubIcon size={13} />
            Repo
            <ArrowUpRight size={11} />
          </a>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-wrap gap-2 mt-6"
      >
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[11px] text-paper-dim px-2.5 py-1 rounded-sm border border-line"
          >
            {s}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 mt-16 text-paper leading-relaxed"
      >
        {project.description.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </motion.div>

      <Link
        to={`/work/${next.slug}`}
        className="group flex items-center justify-between mt-24 pt-8 border-t border-line"
      >
        <div>
          <p className="font-mono text-[10px] text-paper-dim uppercase tracking-wider mb-1">
            Next
          </p>
          <p className="font-display text-2xl sm:text-3xl text-paper group-hover:text-signal transition-colors">
            {next.name}
          </p>
        </div>
        <ArrowRight
          size={20}
          className="text-paper-dim group-hover:text-signal group-hover:translate-x-1 transition-all"
        />
      </Link>
    </div>
  );
}
