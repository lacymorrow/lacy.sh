import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Using Claude Code with Lacy Shell",
  description:
    "How Lacy Shell integrates with Claude Code. Type questions directly in your terminal and they route to Claude automatically. No prefix needed.",
  alternates: { canonical: "/tools/claude" },
  openGraph: {
    title: "Using Claude Code with Lacy Shell",
    description:
      "Type questions in your terminal and they route to Claude Code automatically.",
    url: "https://lacy.sh/tools/claude",
    images: [{ url: "/api/og?section=tools&title=Claude+Code&subtitle=Type+questions+and+they+route+to+Claude+automatically", width: 1200, height: 630, alt: "Lacy Shell + Claude Code" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Using Claude Code with Lacy Shell",
    description:
      "Type questions in your terminal and they route to Claude Code automatically.",
    images: ["/api/og?section=tools&title=Claude+Code&subtitle=Type+questions+and+they+route+to+Claude+automatically"],
  },
};

export default function ToolsClaude() {
  return (
    <article className="vs-article">
      <p className="vs-label">integration</p>
      <h1>
        Using <em>Claude Code</em> with Lacy Shell
      </h1>
      <p className="vs-subtitle">
        Type questions in your terminal. They go to Claude automatically.
      </p>

      <section>
        <h2>How it works</h2>
        <p>
          When Claude Code is your active AI tool, Lacy routes natural language
          queries to it using <code>claude -p &quot;your query&quot;</code>. You
          don&rsquo;t type <code>claude</code> yourself. You just type your
          question and press enter.
        </p>
        <p>
          Shell commands still run normally. <code>git status</code> runs in your
          shell. &ldquo;What changed in the last commit?&rdquo; goes to Claude.
          The indicator next to your prompt shows which will happen before you press
          enter.
        </p>
      </section>

      <section>
        <h2>Setup</h2>
        <ol>
          <li>
            Install Lacy:{" "}
            <code>curl -fsSL https://lacy.sh/install | bash</code>
          </li>
          <li>
            Install Claude Code:{" "}
            <code>npm install -g @anthropic-ai/claude-code</code>
          </li>
          <li>
            Set Claude as your tool:{" "}
            <code>tool set claude</code>
          </li>
        </ol>
        <p>
          Or skip step 3. If Claude Code is the only AI CLI installed, Lacy
          auto-detects it.
        </p>
      </section>

      <section>
        <h2>What you get</h2>
        <table className="vs-table">
          <thead>
            <tr>
              <th>Without Lacy</th>
              <th>With Lacy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>claude -p &quot;explain this error&quot;</code>
              </td>
              <td>
                <code>explain this error</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>claude -p &quot;what does this function do&quot;</code>
              </td>
              <td>
                <code>what does this function do</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>claude -p &quot;fix the failing test&quot;</code>
              </td>
              <td>
                <code>fix the failing test</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Session continuity</h2>
        <p>
          Lacy uses Claude&rsquo;s <code>--resume</code> flag to maintain
          conversation context across queries. Your second question knows about
          the first. Type <code>/new</code> to start a fresh session.
        </p>
      </section>

      <section>
        <h2>Context awareness</h2>
        <p>
          When you ask Claude a question through Lacy, it automatically includes
          context: your current directory, git branch, recent commands, and the
          last exit code. If you&rsquo;re in a tmux session, it can capture
          recent terminal output too.
        </p>
        <p>
          So &ldquo;why did that fail?&rdquo; after a broken build actually has
          the context to answer.
        </p>
      </section>

      <section>
        <h2>When to use Claude Code directly</h2>
        <p>
          Lacy routes one-shot queries to Claude. For longer interactive sessions
          where you want Claude&rsquo;s full REPL (multi-turn editing, file
          creation, tool use), launch <code>claude</code> directly. Lacy handles
          the quick questions; Claude&rsquo;s interactive mode handles the deep work.
        </p>
      </section>

      <section>
        <h2>Real-time feedback</h2>
        <p>
          As you type, the indicator tells you where your input will go:
        </p>
        <ul>
          <li>
            <strong>Green</strong> = shell (e.g., <code>npm test</code>)
          </li>
          <li>
            <strong>Magenta</strong> = Claude (e.g., <code>why is this test failing</code>)
          </li>
        </ul>
        <p>No surprises. You always know what will happen before you hit enter.</p>
      </section>
    </article>
  );
}
