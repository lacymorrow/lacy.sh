import type { Metadata } from "next";
import { RelatedComparisons } from "../RelatedComparisons";

export const metadata: Metadata = {
  title: "Lacy Shell vs ShellGPT — Transparent Routing vs Explicit Commands",
  description:
    "Compare Lacy Shell and ShellGPT (sgpt). Lacy auto-detects natural language. ShellGPT requires an explicit sgpt command. See the differences.",
  alternates: { canonical: "/vs/shell-gpt" },
  openGraph: {
    title: "Lacy Shell vs ShellGPT — Transparent Routing vs Explicit Commands",
    description:
      "Compare Lacy Shell and ShellGPT. Automatic NL detection vs explicit command prefix.",
    url: "https://lacy.sh/vs/shell-gpt",
    images: [{ url: "/api/og?section=vs&title=ShellGPT&subtitle=Transparent+routing+vs+explicit+commands", width: 1200, height: 630, alt: "Lacy Shell vs ShellGPT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacy Shell vs ShellGPT — Transparent Routing vs Explicit Commands",
    description:
      "Compare Lacy Shell and ShellGPT. Automatic NL detection vs explicit command prefix.",
    images: ["/api/og?section=vs&title=ShellGPT&subtitle=Transparent+routing+vs+explicit+commands"],
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
          and routes automatically &mdash; no prefix needed.
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
              <td>Just type &mdash; automatic detection</td>
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
              <td>Yes &mdash; green/magenta as you type</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Shell integration</td>
              <td>Deep &mdash; plugin hooks into shell execution</td>
              <td>Standalone command</td>
            </tr>
            <tr>
              <td>Smart reroute</td>
              <td>Yes &mdash; failed NL commands auto-reroute</td>
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
          &ldquo;is this a command or a question?&rdquo; &mdash; you just want to type and have
          the right thing happen.
        </p>
      </section>

      <section>
        <h2>Side-by-side: the same tasks, different tools</h2>
        <p>
          Here&rsquo;s how common terminal tasks look with each approach:
        </p>
        <pre className="blog-pre">{`# ShellGPT: find files changed in the last day
$ sgpt "find all .log files modified in the last 24 hours"

# Lacy: same question, no prefix
$ find all .log files modified in the last 24 hours`}</pre>
        <pre className="blog-pre">{`# ShellGPT: explain an error
$ sgpt "what does EACCES mean in Node.js"

# Lacy: same question, no prefix
$ what does EACCES mean in Node.js`}</pre>
        <pre className="blog-pre">{`# ShellGPT: generate a command with the --shell flag
$ sgpt --shell "archive all .log files older than 7 days"

# Lacy: type naturally — Lacy detects and routes
$ archive all .log files older than 7 days`}</pre>
        <p>
          With ShellGPT, every AI interaction requires a deliberate{" "}
          <code>sgpt</code> invocation. With Lacy, the routing happens automatically
          &mdash; you never consciously switch modes.
        </p>
      </section>

      <section>
        <h2>Real-world scenarios</h2>
        <p>
          <strong>Debugging a failing service.</strong> You&rsquo;re SSH&rsquo;d into a server,
          reading logs, and want to ask why a process keeps dying. With ShellGPT
          you type <code>sgpt &quot;why would a node process exit with code 137&quot;</code>.
          With Lacy you type the question directly. Same answer, no prefix.
        </p>
        <p>
          <strong>DevOps lookups mid-session.</strong> You&rsquo;re configuring nginx and
          can&rsquo;t remember the rate-limiting syntax. With ShellGPT you prefix every
          lookup with <code>sgpt</code>. With Lacy you ask the question inline between
          real commands without thinking about a separate tool name.
        </p>
        <p>
          <strong>Quick one-liners.</strong> You need a command to count unique IP
          addresses in an access log. With ShellGPT you run{" "}
          <code>sgpt --shell &quot;count unique IPs in access.log&quot;</code>. With Lacy
          you type it naturally and your connected agent &mdash; Claude Code, Gemini CLI,
          or whatever you have installed &mdash; generates the one-liner.
        </p>
        <p>
          <strong>Mixed command sessions.</strong> You run <code>docker ps</code>,
          tail logs with <code>tail -f app.log</code>, then want to ask a quick
          question. With ShellGPT you must remember the prefix each time. With Lacy,
          real commands and questions coexist in the same prompt without any
          mode-switching.
        </p>
      </section>

      <section>
        <h2>Coming from ShellGPT</h2>
        <p>
          Moving from ShellGPT to Lacy mostly means unlearning the{" "}
          <code>sgpt</code> prefix. You&rsquo;ll also need a CLI AI agent installed,
          since Lacy routes to external tools rather than calling an API directly.
          Claude Code (<code>claude</code>), Gemini CLI (<code>gemini</code>), and
          OpenCode (<code>opencode</code>) all work out of the box. If you were using
          ShellGPT specifically for OpenAI, configure Lacy with a CLI that connects
          to OpenAI, or switch to one of the supported agents.
        </p>
        <p>
          Installation is a single curl command plus one line added to your shell
          config &mdash; around 30 seconds total. ShellGPT and Lacy coexist without
          conflict: <code>sgpt</code> continues to work normally, and Lacy recognizes
          it as a valid shell command rather than intercepting it.
        </p>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You want zero-friction AI access without remembering a prefix</li>
          <li>You already use Claude Code, Gemini CLI, or another AI CLI</li>
          <li>You prefer no Python dependencies in your shell setup</li>
          <li>You want real-time visual feedback on routing decisions</li>
          <li>You want smart reroute when a natural-language command fails to execute</li>
        </ul>
      </section>

      <section>
        <h2>When to use ShellGPT</h2>
        <ul>
          <li>You want a simple, standalone tool with explicit and predictable control</li>
          <li>You want to call OpenAI&rsquo;s API directly without a separate CLI tool</li>
          <li>You use the <code>--shell</code> flag for command generation specifically</li>
          <li>You don&rsquo;t want any shell-level hooks or modifications to your prompt</li>
        </ul>
      </section>
<<<<<<< HEAD

      <section>
        <h2>Frequently asked questions</h2>
        <p>
          <strong>Does Lacy support OpenAI like ShellGPT does?</strong>
        </p>
        <p>
          Lacy doesn&rsquo;t call OpenAI directly &mdash; it routes to whatever CLI agent
          you have installed. To use OpenAI models, configure Lacy with a CLI that
          connects to OpenAI, or use one of the supported agents that may also access
          OpenAI models depending on your configuration.
        </p>
        <p>
          <strong>Will Lacy interfere with ShellGPT if I have both installed?</strong>
        </p>
        <p>
          No. Lacy hooks into ZSH&rsquo;s execute function and classifies input based on
          whether it looks like natural language. It recognizes <code>sgpt</code> as a
          valid shell command and passes it through untouched. Both tools coexist
          without conflict.
        </p>
        <p>
          <strong>Does Lacy support command generation like <code>sgpt --shell</code>?</strong>
        </p>
        <p>
          Lacy routes your input to whichever agent you configure. If that agent can
          generate shell commands &mdash; and most can &mdash; it will. The behavior
          depends on your connected agent rather than Lacy itself. Lacy handles
          detection and routing; the agent handles the response.
        </p>
        <p>
          <strong>What if Lacy routes a real shell command to AI by mistake?</strong>
        </p>
        <p>
          The detection is tuned to distinguish natural language from shell syntax.
          For ambiguous input, Lacy has a smart reroute: if the shell fails to
          execute something it classified as a command, it automatically retries
          through AI. You can also press Ctrl+Space to manually toggle between shell
          and agent mode at any time.
        </p>
        <p>
          <strong>Does Lacy require Python?</strong>
        </p>
        <p>
          No. Lacy is pure ZSH/Bash &mdash; no Python, Node.js, or other runtime
          dependencies. It installs as a single shell function and adds no measurable
          weight to your shell startup time.
        </p>
      </section>

      <section>
        <h2>The bottom line</h2>
        <p>
          ShellGPT is a capable tool that does exactly what it says: a command you run
          when you want to query AI from the terminal. The explicit{" "}
          <code>sgpt</code> prefix is also its main constraint &mdash; you make a
          conscious decision every time you want AI involved.
        </p>
        <p>
          Lacy removes that decision. It operates at the shell input level and routes
          transparently. For developers who spend most of their day in the terminal
          and want AI to feel native rather than bolted on, the difference in friction
          is real and adds up. You stop thinking about which tool to reach for and
          just type.
        </p>
      </section>

      <RelatedComparisons current="shell-gpt" />
    </article>
  );
}
