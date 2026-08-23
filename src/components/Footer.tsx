import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const EMAIL = "your-email@example.com";
const AVAILABILITY = "Available for internships — Winter 2026";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — the text itself is still visible/selectable
    }
  }

  return (
    <footer className="border-t border-line px-6 sm:px-10 py-8 mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={handleCopy}
          className="font-mono text-sm text-paper hover:text-signal transition-colors flex items-center gap-2 w-fit"
        >
          {EMAIL}
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>

        <span className="font-mono text-xs text-paper-dim">
          {AVAILABILITY}
        </span>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Ayush-404-ops"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-paper-dim hover:text-signal transition-colors"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-paper-dim hover:text-signal transition-colors"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>
      </div>
      <p className="font-mono text-[10px] text-paper-dim mt-6">
        © {new Date().getFullYear()} Ayush Patel
      </p>
    </footer>
  );
}
