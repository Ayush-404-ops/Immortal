import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 py-6 mix-blend-difference">
      <Link
        to="/"
        className="font-display text-sm font-semibold text-paper tracking-tight"
      >
        Ayush Patel
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className={`text-xs font-mono uppercase tracking-wider transition-colors ${
            pathname === "/" ? "text-paper" : "text-paper-dim hover:text-paper"
          }`}
        >
          Work
        </Link>
        <Link
          to="/info"
          className={`text-xs font-mono uppercase tracking-wider transition-colors ${
            pathname === "/info" ? "text-paper" : "text-paper-dim hover:text-paper"
          }`}
        >
          Info
        </Link>
      </nav>
    </header>
  );
}
