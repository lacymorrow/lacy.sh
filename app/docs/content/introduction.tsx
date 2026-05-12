import DocsCallout from "../DocsCallout";
import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "Introduction",
  description: "What Lacy Shell is, how it works, and why you might want it.",
};

export default function Introduction() {
  return (
    <article className="doc-article reveal">
      <h1>Introduction</h1>
      <p className="doc-lead">
        Lacy Shell is a ZSH and Bash 4+ plugin that adds AI to your terminal — without replacing it.
        Type commands normally. Ask questions naturally. Everything runs in your existing shell.
      </p>

      <section>
        <h2>What it does</h2>
        <p>
          When you press Enter, Lacy detects whether you typed a shell command or natural language.
          Shell commands execute as usual. Natural language routes to your preferred AI CLI tool —
          Claude, Gemini, lash, opencode, codex, or anything you configure.
        </p>
        <p>
          No prefix. No mode switching. No new terminal. Just type.
        </p>
        <div className="dl-demo">
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">ls -la</span>
            <span className="dl-tag shell">shell</span>
          </div>
          <div className="dl">
            <span className="dl-bar m" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">what files are here</span>
            <span className="dl-tag agent">agent</span>
          </div>
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">git status</span>
            <span className="dl-tag shell">shell</span>
          </div>
          <div className="dl">
            <span className="dl-bar m" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">fix the build error in src/index.ts</span>
            <span className="dl-tag agent">agent</span>
          </div>
        </div>
      </section>

      <section>
        <h2>How routing works</h2>
        <p>
          In Auto mode, Lacy applies a six-rule cascade to classify your input before executing:
        </p>
        <ol className="doc-list doc-list-ol">
          <li>Matches an <strong>agent word</strong> (like <code>what</code>, <code>why</code>, <code>fix</code>, <code>explain</code>) → Agent</li>
          <li>Starts with a <strong>shell reserved word</strong> (<code>do</code>, <code>in</code>, <code>then</code>) → Agent</li>
          <li>First word is a <strong>valid command</strong> → Shell</li>
          <li><strong>Single word</strong>, not a command → Shell (typo, let it error)</li>
          <li><strong>Multiple words</strong>, first not a command → Agent (natural language)</li>
          <li>Valid command <strong>fails</strong> with NL-style arguments → Shell first, then Agent silently</li>
        </ol>
        <p>
          See <a href="/docs/how-detection-works">How Detection Works</a> for the full specification.
        </p>
      </section>

      <section>
        <h2>Visual feedback</h2>
        <p>
          A real-time indicator to the left of your prompt changes color as you type:
        </p>
        <ul className="doc-list">
          <li><span style={{ color: "var(--green)" }}>Green</span> — will execute in shell</li>
          <li><span style={{ color: "var(--magenta)" }}>Magenta</span> — will go to AI agent</li>
          <li><span style={{ color: "var(--fg-3)" }}>Gray</span> — neutral / no input yet</li>
        </ul>
        <p>
          ZSH users also get first-word syntax highlighting and a right-prompt mode badge.
        </p>
      </section>

      <section>
        <h2>Supported shells</h2>
        <ul className="doc-list">
          <li><strong>ZSH</strong> — full feature set: real-time indicator, first-word highlighting, ghost text suggestions, right-prompt mode badge</li>
          <li><strong>Bash 4+</strong> — core routing, mode badge in PS1, Ctrl+Space toggle. macOS ships Bash 3.2 — upgrade via Homebrew.</li>
        </ul>
        <DocsCallout type="note">
          <p>macOS ships with Bash 3.2 (GPL2). Install Bash 4+ via Homebrew: <code>brew install bash</code></p>
        </DocsCallout>
      </section>

      <section>
        <h2>Supported AI tools</h2>
        <p>
          Lacy works with any AI CLI that accepts a query argument. Supported out of the box:
          lash (recommended), claude, opencode, gemini, codex, hermes, and custom commands.
          All tools handle their own authentication — no API keys needed from Lacy.
        </p>
        <p>
          See <a href="/docs/supported-ai-tools">Supported AI Tools</a> for the full list and configuration.
        </p>
      </section>

      <section>
        <h2>Quick install</h2>
        <DocsCodeBlock lang="bash">
          {`curl -fsSL https://lacy.sh/install | bash`}
        </DocsCodeBlock>
        <p>
          Then reload your shell and type naturally. Continue to <a href="/docs/installation">Installation</a> for
          all install methods and prerequisites.
        </p>
      </section>
    </article>
  );
}
