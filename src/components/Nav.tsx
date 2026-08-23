const links = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6">
      <nav className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-6">
        <a
          href="#"
          className="font-display text-sm font-semibold text-white tracking-tight"
        >
          Ayush<span className="text-signal">.</span>
        </a>
        <div className="flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-mono text-fog-dim hover:text-signal transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
