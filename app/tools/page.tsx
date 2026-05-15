import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Shell Integrations — Claude, Gemini, OpenCode, and more",
  description:
    "Lacy Shell works with every major AI CLI. Full integration guides for Claude Code, Gemini CLI, OpenCode, Codex CLI, lash, and custom tools — with setup steps, feature comparison, and when to use each.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "AI Shell Integrations — Claude, Gemini, OpenCode, and more",
    description:
      "Integration guides for Claude Code, Gemini CLI, OpenCode, Codex CLI, lash, and custom AI CLIs. Lacy routes natural language to any of them.",
    url: "https://lacy.sh/tools",
  },
  keywords: [
    "ai shell integrations",
    "claude terminal plugin",
    "gemini cli shell",
    "opencode shell integration",
    "ai cli routing",
    "natural language shell",
  ],
};

const tools = [
  {
    slug: "claude",
    name: "Claude Code",
    desc: "Anthropic's AI coding assistant. Routes queries via claude -p with --resume for session continuity.",
  },
  {
    slug: "opencode",
    name: "OpenCode",
    desc: "Open-source AI coding agent. Supports preheating for near-instant responses.",
  },
  {
    slug: "gemini",
    name: "Gemini CLI",
    desc: "Google's AI CLI for Gemini models. Routes queries with --resume for session continuity.",
  },
];

const allTools = [
  { name: "lash", sessionContinuity: true, preheating: true, openSource: true, localModels: false, recommended: true },
  { name: "Claude Code", sessionContinuity: true, preheating: false, openSource: false, localModels: false, recommended: false },
  { name: "OpenCode", sessionContinuity: true, preheating: true, openSource: true, localModels: false, recommended: false },
  { name: "Gemini CLI", sessionContinuity: true, preheating: false, openSource: false, localModels: false, recommended: false },
  { name: "Codex CLI", sessionContinuity: true, preheating: false, openSource: false, localModels: false, recommended: false },
  { name: "Hermes", sessionContinuity: false, preheating: false, openSource: true, localModels: true, recommended: false },
];

export default function ToolsIndex() {
  return (
    <article className="vs-article">
      <p className="vs-label">integrations</p>
      <h1>
        AI shell <em>integrations</em>
      </h1>
      <p className="vs-subtitle">
        Lacy doesn&rsquo;t replace your AI CLI — it routes to it. Configure
        once, then type naturally in your shell. No prefix, no mode switching,
        no copy-pasting queries.
      </p>

      <section>
        <h2>How it works</h2>
        <p>
          When you type in your terminal, Lacy decides in real time whether
          your input is a shell command or natural language. Shell commands run
          as normal. Natural language goes to whichever AI CLI you&rsquo;ve
          configured.
        </p>
        <p>
          Set your tool once with <code>tool set &lt;name&gt;</code> and Lacy
          handles the rest. You can switch tools anytime. If only one AI CLI is
          installed, Lacy auto-detects it on startup.
        </p>
        <p>
          Lacy also passes context automatically: your current directory, git
          branch, last exit code, and recent commands. So &ldquo;why did that
          fail?&rdquo; after a broken build has the information to answer it.
        </p>
      </section>

      <section>
        <h2>Integration guides</h2>
        <p>
          The three most popular AI CLI integrations each have a dedicated
          setup guide with detailed configuration options.
        </p>
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
        <h2>Detailed integration notes</h2>

        <h3>Claude Code</h3>
        <p>
          Lacy routes queries to Claude using <code>claude -p</code> in
          non-interactive (print) mode. It uses <code>--resume</code> to
          maintain session state across queries, so your follow-up questions
          have context from the first. When you need Claude&rsquo;s full
          interactive REPL — file editing, tool use, multi-turn work — launch{" "}
          <code>claude</code> directly. Lacy covers the quick questions;
          Claude&rsquo;s interactive mode handles the deep work.
        </p>
        <p>
          <strong>Setup:</strong> <code>npm install -g @anthropic-ai/claude-code</code>{" "}
          then <code>tool set claude</code>.
        </p>

        <h3>OpenCode</h3>
        <p>
          Lacy routes to OpenCode via <code>opencode run -c</code>. OpenCode
          supports a background server mode, and Lacy can start that server on
          plugin load so your first query responds instantly. Enable preheating
          in <code>~/.lacy/config.yaml</code> under{" "}
          <code>preheat.eager: true</code>.
        </p>
        <p>
          <strong>Setup:</strong> Install from{" "}
          <a href="https://github.com/opencode-ai/opencode">opencode-ai/opencode</a>{" "}
          then <code>tool set opencode</code>.
        </p>

        <h3>Gemini CLI</h3>
        <p>
          Lacy routes to Gemini using <code>gemini --resume -p</code>.
          Google&rsquo;s Gemini models have a long context window — useful when
          you&rsquo;re working with large codebases or asking questions that
          span many files. Gemini CLI is free to start with a Google account.
        </p>
        <p>
          <strong>Setup:</strong> Install from{" "}
          <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a>{" "}
          then <code>tool set gemini</code>.
        </p>

        <h3>lash (recommended)</h3>
        <p>
          lash is an OpenCode fork built by the same author as Lacy. It has
          the tightest integration — preheating, session management, and
          context passing all tuned to work together. If you don&rsquo;t have
          a preference, lash is the right starting point.
        </p>
        <p>
          <strong>Setup:</strong>{" "}
          <code>curl -fsSL https://lash.lacy.sh/install | bash</code>.
          Auto-detected if no other AI CLI is installed.
        </p>

        <h3>Codex CLI</h3>
        <p>
          OpenAI&rsquo;s coding CLI. Lacy routes to it using{" "}
          <code>codex exec resume --last</code>. Good option if you already
          have an OpenAI API key and prefer GPT-4 class models.
        </p>

        <h3>Hermes</h3>
        <p>
          For local and open-source models. Lacy routes queries to Hermes
          using <code>hermes chat -q</code>. No cloud dependency — runs fully
          offline. Best for privacy-sensitive projects or air-gapped
          environments.
        </p>

        <h3>Custom tool</h3>
        <p>
          Any CLI tool that accepts a query argument:{" "}
          <code>tool set custom &quot;your-command --flag&quot;</code>. Lacy
          appends your query as the final positional argument. This works with
          any wrapper script or local model server.
        </p>
      </section>

      <section>
        <h2>Feature comparison</h2>
        <p>
          All six AI CLI integrations support Lacy&rsquo;s core routing. The
          differences are in session continuity, response latency (preheating),
          and whether the tool requires cloud access.
        </p>
        <table className="vs-table">
          <thead>
            <tr>
              <th>Tool</th>
              <th>Session continuity</th>
              <th>Preheating</th>
              <th>Open source</th>
              <th>Local models</th>
            </tr>
          </thead>
          <tbody>
            {allTools.map((t) => (
              <tr key={t.name}>
                <td>
                  <strong>{t.name}</strong>
                  {t.recommended && (
                    <span style={{ marginLeft: 6, fontSize: "0.75em", opacity: 0.6 }}>
                      ★ recommended
                    </span>
                  )}
                </td>
                <td>{t.sessionContinuity ? "✓" : "—"}</td>
                <td>{t.preheating ? "✓" : "—"}</td>
                <td>{t.openSource ? "✓" : "—"}</td>
                <td>{t.localModels ? "✓" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <strong>Session continuity</strong> means your follow-up query has
          context from the previous one — no repeating yourself.{" "}
          <strong>Preheating</strong> means Lacy can start a background server
          so the first query of a session responds instantly instead of waiting
          for a cold start.
        </p>
      </section>

      <section>
        <h2>Choosing a tool</h2>
        <ul>
          <li>
            <strong>New to Lacy?</strong> Start with lash — same author, best
            integration, auto-installed if nothing else is detected.
          </li>
          <li>
            <strong>Already using Claude Code?</strong> Set it:{" "}
            <code>tool set claude</code>. Lacy routes to your existing
            installation.
          </li>
          <li>
            <strong>Prefer Google&rsquo;s models?</strong> Gemini CLI has a
            generous free tier and a long context window.
          </li>
          <li>
            <strong>Want open source end-to-end?</strong> lash or OpenCode —
            both open source, both support preheating.
          </li>
          <li>
            <strong>No internet or privacy constraints?</strong> Hermes with
            local models runs fully offline.
          </li>
          <li>
            <strong>Using something else?</strong> Set a custom command:{" "}
            <code>tool set custom &quot;my-ai-tool --query&quot;</code>.
          </li>
        </ul>
        <p>
          You can switch tools at any time. The active tool is saved to{" "}
          <code>~/.lacy/config.yaml</code>.
        </p>
      </section>

      <section>
        <h2>Further reading</h2>
        <ul>
          <li>
            <Link href="/blog/why-i-didnt-use-ai-to-classify-ai-input">
              Why I didn&rsquo;t use AI to classify AI input
            </Link>{" "}
            — how Lacy decides whether your input goes to the shell or the AI
            tool.
          </li>
          <li>
            <Link href="/blog/the-post-execution-reroute-pattern">
              The post-execution reroute pattern
            </Link>{" "}
            — what happens when a natural-language query accidentally runs as a
            shell command and fails.
          </li>
          <li>
            <Link href="/blog/shell-reserved-words-are-trickier-than-they-look">
              Shell reserved words are trickier than they look
            </Link>{" "}
            — the edge cases in input classification that affect how routing
            works near shell keywords.
          </li>
        </ul>
      </section>
    </article>
  );
}
