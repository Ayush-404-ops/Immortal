const stack = [
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "Node.js",
  "Express",
  "FastAPI",
  "MongoDB",
  "MySQL",
  "XGBoost",
  "JWT / RBAC",
  "GitHub Actions",
];

export default function TechMarquee() {
  // duplicate the list once so the loop can scroll seamlessly
  const items = [...stack, ...stack];

  return (
    <div className="relative py-10 border-b border-line overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-display text-2xl sm:text-3xl text-paper-dim px-6 sm:px-8 whitespace-nowrap"
          >
            {tech}
            <span className="text-signal ml-6 sm:ml-8">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
