import Link from "next/link";

const ALL_COMPARISONS = [
  { slug: "warp", name: "Warp", tagline: "Plugin vs terminal replacement" },
  { slug: "shell-gpt", name: "ShellGPT", tagline: "Automatic routing vs manual prefix" },
  { slug: "github-copilot-cli", name: "GitHub Copilot CLI", tagline: "Any AI backend vs GitHub-only" },
  { slug: "aider", name: "Aider", tagline: "Shell integration vs code editor" },
  { slug: "cursor", name: "Cursor", tagline: "Terminal-native vs IDE-based" },
  { slug: "ai-shell", name: "AI Shell", tagline: "Real-time routing vs on-demand generation" },
  { slug: "amazon-q", name: "Amazon Q", tagline: "Open source vs AWS ecosystem" },
] as const;

type ComparisonSlug = (typeof ALL_COMPARISONS)[number]["slug"];

const TOOLS = [
  { slug: "claude", name: "Claude Code", tagline: "Using Lacy with Claude Code" },
  { slug: "gemini", name: "Gemini CLI", tagline: "Using Lacy with Gemini CLI" },
  { slug: "opencode", name: "OpenCode", tagline: "Using Lacy with OpenCode" },
];

export function RelatedComparisons({ current }: { current: ComparisonSlug }) {
  const others = ALL_COMPARISONS.filter((c) => c.slug !== current);

  return (
    <section className="vs-related">
      <h2>Related comparisons</h2>
      <ul className="vs-index-list">
        {others.map((c) => (
          <li key={c.slug}>
            <Link href={`/vs/${c.slug}`}>
              <strong>Lacy Shell vs {c.name}</strong>
              <span>{c.tagline}</span>
            </Link>
          </li>
        ))}
      </ul>
      <h3 className="vs-related-subhead">Integration guides</h3>
      <ul className="vs-index-list">
        {TOOLS.map((t) => (
          <li key={t.slug}>
            <Link href={`/tools/${t.slug}`}>
              <strong>{t.name}</strong>
              <span>{t.tagline}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/docs/supported-ai-tools">
            <strong>Supported AI tools</strong>
            <span>Full list of AI CLI tools that work with Lacy</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
