import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lacy Shell vs Alternatives — AI Terminal Tool Comparisons",
  description:
    "See how Lacy Shell compares to other AI terminal tools. Lacy is a ZSH/Bash plugin that adds automatic AI routing to your existing shell — no terminal replacement required.",
  alternates: { canonical: "/vs" },
  openGraph: {
    title: "Lacy Shell vs Alternatives",
    description:
      "How Lacy Shell compares to Warp, ShellGPT, GitHub Copilot CLI, Aider, Cursor, AI Shell, and Amazon Q.",
    url: "https://lacy.sh/vs",
  },
};

const comparisons = [
  {
    slug: "warp",
    name: "Warp",
    tagline: "Plugin vs terminal replacement",
  },
  {
    slug: "shell-gpt",
    name: "ShellGPT",
    tagline: "Automatic routing vs manual prefix",
  },
  {
    slug: "github-copilot-cli",
    name: "GitHub Copilot CLI",
    tagline: "Any AI backend vs GitHub-only",
  },
  {
    slug: "aider",
    name: "Aider",
    tagline: "Shell integration vs code editor",
  },
  {
    slug: "cursor",
    name: "Cursor",
    tagline: "Terminal-native vs IDE-based",
  },
  {
    slug: "ai-shell",
    name: "AI Shell",
    tagline: "Real-time routing vs on-demand generation",
  },
  {
    slug: "amazon-q",
    name: "Amazon Q",
    tagline: "Open source vs AWS ecosystem",
  },
];

export default function VsIndex() {
  return (
    <article className="vs-article">
      <p className="vs-label">comparisons</p>
      <h1>
        Lacy Shell vs <em>alternatives</em>
      </h1>
      <p className="vs-subtitle">
        Lacy is a shell plugin — not a terminal replacement, not a standalone
        AI tool. It adds automatic natural language routing to the shell you
        already use.
      </p>

      <section>
        <h2>How Lacy is different</h2>
        <p>
          Most AI terminal tools require you to invoke them explicitly — a
          prefix, a hotkey, a separate command. Lacy runs inside your existing
          shell and detects intent as you type. Commands execute. Questions go
          to your AI agent. The colored bar next to your prompt tells you which
          will happen before you press enter.
        </p>
      </section>

      <section>
        <h2>Pick a comparison</h2>
        <ul className="vs-index-list">
          {comparisons.map((c) => (
            <li key={c.slug}>
              <Link href={`/vs/${c.slug}`}>
                <strong>Lacy Shell vs {c.name}</strong>
                <span>{c.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
