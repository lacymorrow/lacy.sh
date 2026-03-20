import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lacy Shell vs Warp — Plugin vs Terminal Replacement",
  description:
    "Compare Lacy Shell and Warp Terminal. Lacy is a ZSH/Bash plugin that adds AI routing to your existing terminal. Warp replaces your terminal entirely. See the differences.",
  alternates: { canonical: "/vs/warp" },
  openGraph: {
    title: "Lacy Shell vs Warp — Plugin vs Terminal Replacement",
    description:
      "Compare Lacy Shell and Warp Terminal. Plugin approach vs full terminal replacement.",
    url: "https://lacy.sh/vs/warp",
  },
};

export default function VsWarp() {
  return (
    <article className="vs-article">
      <p className="vs-label">comparison</p>
      <h1>
        Lacy Shell vs <em>Warp</em>
      </h1>
      <p className="vs-subtitle">
        A plugin for your terminal vs a replacement for your terminal.
      </p>

      <section>
        <h2>The core difference</h2>
        <p>
          Warp is a full terminal replacement — a new app you switch to. Lacy is
          a shell plugin — it adds AI routing to whatever terminal you already
          use (iTerm2, Alacritty, Kitty, the default Terminal.app, or yes, even
          Warp).
        </p>
      </section>

      <section>
        <table className="vs-table">
          <thead>
            <tr>
              <th></th>
              <th>Lacy Shell</th>
              <th>Warp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>ZSH/Bash plugin</td>
              <td>Terminal emulator</td>
            </tr>
            <tr>
              <td>AI routing</td>
              <td>Automatic — detects NL vs commands</td>
              <td>Requires # prefix or Ctrl+Shift+Space</td>
            </tr>
            <tr>
              <td>Your terminal</td>
              <td>Keep yours</td>
              <td>Must switch to Warp</td>
            </tr>
            <tr>
              <td>AI backend</td>
              <td>Your choice (Claude, Gemini, OpenCode, etc.)</td>
              <td>Warp AI (proprietary)</td>
            </tr>
            <tr>
              <td>Real-time indicator</td>
              <td>Yes — color changes as you type</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>Free, MIT licensed</td>
              <td>Free tier + paid plans</td>
            </tr>
            <tr>
              <td>Open source</td>
              <td>Yes</td>
              <td>Partially (warpd)</td>
            </tr>
            <tr>
              <td>Platform</td>
              <td>macOS, Linux, WSL</td>
              <td>macOS, Linux</td>
            </tr>
            <tr>
              <td>Install</td>
              <td>One line, 30 seconds</td>
              <td>Download app</td>
            </tr>
            <tr>
              <td>Account required</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You like your current terminal and don&rsquo;t want to switch</li>
          <li>You want to use your own AI backend (Claude Code, Gemini CLI, etc.)</li>
          <li>You want automatic routing without prefixes or hotkeys</li>
          <li>You want a lightweight plugin, not a full app replacement</li>
          <li>You need Bash 4+ support (not just ZSH)</li>
        </ul>
      </section>

      <section>
        <h2>When to use Warp</h2>
        <ul>
          <li>You want a modern terminal with built-in IDE features (blocks, notebooks)</li>
          <li>You prefer an integrated AI without configuring external tools</li>
          <li>You want team collaboration features</li>
          <li>You&rsquo;re okay switching terminal apps</li>
        </ul>
      </section>

      <section>
        <h2>Can you use both?</h2>
        <p>
          Yes. Lacy is a shell plugin — it works inside any terminal, including
          Warp. If you use Warp but prefer automatic NL detection over the #
          prefix, add Lacy to your ZSH config and get the best of both.
        </p>
      </section>
    </article>
  );
}
