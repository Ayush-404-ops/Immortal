export interface Project {
  slug: string;
  name: string;
  outcome: string;
  year: string;
  role: string;
  stack: string[];
  description: string[];
  repo?: string;
  live?: string;
}

// Real projects — edit freely. Descriptions are original copy, not
// pulled from any reference site.
export const projects: Project[] = [
  {
    slug: "indievault",
    name: "IndieVault",
    outcome:
      "A two-sided marketplace where players and developers trade games directly, without losing control of who can act as what.",
    year: "2026",
    role: "Full-stack developer",
    stack: ["MySQL", "MongoDB", "Node.js", "Express", "JWT", "RBAC"],
    description: [
      "IndieVault is a two-sided game marketplace and developer publishing platform, built as the primary project for a full-stack web development course. It borrows structurally from Steam and itch.io: developers publish and manage listings, players discover and buy, and admins moderate — each role gated by its own permission layer rather than a single flat user table.",
      "The data layer is deliberately split: MySQL holds the relational core — users, listings, transactions, roles — across a schema of 7+ tables, while MongoDB handles looser, high-volume data like reviews and activity logs. Auth runs on JWT with bcrypt-hashed passwords, and role-based access control is enforced at the middleware layer, not just in the UI.",
      "Built incrementally, one practical at a time, in a college lab — each feature only added once the previous one was confirmed working end to end.",
    ],
  },
  {
    slug: "smartcontainer-risk-engine",
    name: "SmartContainer Risk Engine",
    outcome:
      "Turns raw shipment manifests into a real-time risk score, instead of a static checklist.",
    year: "2026",
    role: "ML engineer",
    stack: ["Python", "XGBoost", "FastAPI", "ML"],
    description: [
      "Built for a hackathon focused on port logistics: a machine learning platform that classifies container risk from shipment and manifest data, instead of relying on fixed rule-based checks.",
      "An XGBoost model is trained on manifest features and served through a FastAPI inference layer, so a container can be scored the moment its data arrives rather than waiting on a manual review queue.",
      "The inference path was later corrected after an early version was found to be returning placeholder predictions instead of real model output — the model now runs live end to end.",
    ],
    repo: "https://github.com/Ayush-404-ops/Hachamined2k26",
  },
  {
    slug: "pr-review-bot",
    name: "GitHub PR Review Bot",
    outcome:
      "Reviews every pull request the moment it opens, so feedback doesn't wait for a human to have free time.",
    year: "2026",
    role: "Designer & builder",
    stack: ["GitHub Actions", "Octokit", "Anthropic SDK"],
    description: [
      "A GitHub Actions–triggered bot designed specifically as a portfolio differentiator — something that shows judgment about a real developer workflow, not just CRUD.",
      "On each pull request, the bot fetches the diff, sends it to Claude with a structured prompt requesting JSON output, and posts the results back as inline review comments using GitHub's batch reviews API — so feedback appears attached to the exact lines it concerns.",
      "Built with @octokit/rest for the GitHub side and the Anthropic JS SDK for the review generation itself.",
    ],
  },
  {
    slug: "doctor-appointment-platform",
    name: "MERN Doctor Appointment Platform",
    outcome:
      "An end-to-end booking flow connecting patients and doctors, from search to confirmed appointment.",
    year: "2026",
    role: "Full-stack developer",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    description: [
      "A booking platform connecting patients with doctors across a standard MERN stack — MongoDB, Express, React, and Node.js working together end to end.",
      "Handles authentication, doctor availability, and appointment state so a booking moves cleanly from search through confirmation rather than needing manual follow-up.",
    ],
  },
];
