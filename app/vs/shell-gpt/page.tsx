import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lacy Shell vs ShellGPT — Transparent Routing vs Explicit Commands",
  description:
    "Compare Lacy Shell and ShellGPT (sgpt). Lacy auto-detects natural language. ShellGPT requires an explicit sgpt command. See the differences.",
  alternates: { canonical: "/vs/shell-gpt" },
  openGraph: {
    title: "Lacy Shell vs ShellGPT — Transparent vs Explicit AI",
    description:
      "Compare Lacy Shell and ShellGPT. Automatic NL detection vs explicit command prefix.",
    url: "https://lacy.sh/vs/shell-gpt",
  },
};

export default function VsShellGpt() {
  return (
    <article className="vs-article">
      <p className="vs-label">comparison</p>
      <h1>
        Lacy Shell vs <em>ShellGPT</em>
      </h1>
      <p className="vs-subtitle">
        Transparent routing vs explicit command prefix.
      </p>

      <section>
        <h2>The core difference</h2>
        <p>
          ShellGPT (sgpt) requires you to type <code>sgpt</code> before every
          query. Lacy detects whether your input is a command or natural language
          and routes automatically — no prefix needed.
        </p>
      </section>

      <section>
        <table className="vs-table">
          <thead>
            <tr>
              <th></th>
              <th>Lacy Shell</th>
              <th>ShellGPT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Invocation</td>
              <td>Just type — automatic detection</td>
              <td><code>sgpt &quot;query&quot;</code></td>
            </tr>
            <tr>
              <td>AI backend</td>
              <td>Any CLI (Claude, Gemini, OpenCode, etc.)</td>
              <td>OpenAI API</td>
            </tr>
            <tr>
              <td>API key required</td>
              <td>No (uses your installed CLI tool)</td>
              <td>Yes (OpenAI key)</td>
            </tr>
            <tr>
              <td>Real-time indicator</td>
              <td>Yes — green/magenta as you type</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Shell integration</td>
              <td>Deep — plugin hooks into shell execution</td>
              <td>Standalone command</td>
            </tr>
            <tr>
              <td>Smart reroute</td>
              <td>Yes — failed NL commands auto-reroute</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Mode switching</td>
              <td>Ctrl+Space toggle (shell/agent/auto)</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>Language</td>
              <td>Shell (ZSH/Bash)</td>
              <td>Python</td>
            </tr>
            <tr>
              <td>Dependencies</td>
              <td>None (pure shell)</td>
              <td>Python, pip</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>The friction difference</h2>
        <p>
          With ShellGPT, you decide in advance that you need AI and type{" "}
          <code>sgpt</code>. With Lacy, you just type what you mean. If it&rsquo;s a
          command, it runs. If it&rsquo;s a question, it goes to AI. The routing is
          invisible.
        </p>
        <p>
          This matters most when you&rsquo;re in flow. You don&rsquo;t want to stop and think
          &ldquo;is this a command or a question?&rdquo; — you just want to type and have
          the right thing happen.
        </p>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You want zero-friction AI access without remembering a prefix</li>
          <li>You already use Claude Code, Gemini CLI, or another AI CLI</li>
          <li>You prefer no Python dependencies</li>
          <li>You want real-time visual feedback on routing</li>
        </ul>
      </section>

      <section>
        <h2>When to use ShellGPT</h2>
        <ul>
          <li>You want a simple, standalone tool with explicit control</li>
          <li>You prefer OpenAI&rsquo;s API specifically</li>
          <li>You want shell command generation with <code>--shell</code> flag</li>
          <li>You don&rsquo;t want any shell-level hooks or modifications</li>
        </ul>
      </section>
    </article>
  );
}
