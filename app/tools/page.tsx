import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lacy Shell Integrations — Works with Claude, Gemini, OpenCode",
  description:
    "Lacy Shell works with any AI CLI tool. See integration guides for Claude Code, Gemini CLI, OpenCode, Codex CLI, and more.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Lacy Shell Integrations",
    description:
      "Integration guides for Claude Code, Gemini CLI, OpenCode, and more.",
    url: "https://lacy.sh/tools",
  },
};

const tools = [
  {
    slug: "claude",
    name: "Claude Code",
    desc: "Anthropic's AI coding assistant. Lacy routes questions to Claude automatically using claude -p.",
  },
  {
    slug: "opencode",
    name: "OpenCode",
    desc: "Open-source AI coding agent. Lacy uses opencode run -c for fast, resumable sessions.",
  },
  {
    slug: "gemini",
    name: "Gemini CLI",
    desc: "Google's AI CLI. Lacy routes natural language queries to gemini with session continuity.",
  },
];

export default function ToolsIndex() {
  return (
    <article className="vs-article">
      <p className="vs-label">integrations</p>
      <h1>
        Works with your <em>tools</em>
      </h1>
      <p className="vs-subtitle">
        Lacy doesn&rsquo;t replace your AI CLI. It routes to it. Pick any
        tool — Lacy handles the rest.
      </p>

      <section>
        <h2>How it works</h2>
        <p>
          Configure your AI CLI once with <code>tool set &lt;name&gt;</code>.
          From then on, natural language in your shell goes directly to that
          tool. No prefix, no mode switching, no copy-pasting.
        </p>
        <p>
          You can also configure a custom command if your tool isn&rsquo;t on
          the list: <code>tool set custom &quot;your-command -flag&quot;</code>.
        </p>
      </section>

      <section>
        <h2>Integration guides</h2>
        <ul className="vs-index-list">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link href={`/tools/${t.slug}`}>
                <strong>{t.name}</strong>
                <span>{t.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Other supported tools</h2>
        <p>
          Lacy also supports <strong>lash</strong> (recommended — an OpenCode
          fork by the same author), <strong>Codex CLI</strong> (OpenAI), and
          any custom command. During setup, Lacy auto-detects which AI CLIs
          you have installed and suggests the best one.
        </p>
      </section>
    </article>
  );
}
