import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Using Gemini CLI with Lacy Shell",
  description:
    "How Lacy Shell integrates with Gemini CLI. Type questions directly in your terminal and they route to Gemini automatically. No prefix needed.",
  alternates: { canonical: "/tools/gemini" },
  openGraph: {
    title: "Using Gemini CLI with Lacy Shell",
    description:
      "Type questions in your terminal and they route to Gemini CLI automatically.",
    url: "https://lacy.sh/tools/gemini",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Using Gemini CLI with Lacy Shell",
    description:
      "Type questions in your terminal and they route to Gemini CLI automatically.",
    images: ["/og.jpg"],
  },
};

export default function ToolsGemini() {
  return (
    <article className="vs-article">
      <p className="vs-label">integration</p>
      <h1>
        Using <em>Gemini CLI</em> with Lacy Shell
      </h1>
      <p className="vs-subtitle">
        Type questions in your terminal. They go to Gemini automatically.
      </p>

      <section>
        <h2>How it works</h2>
        <p>
          When Gemini CLI is your active AI tool, Lacy routes natural language
          queries using <code>gemini --resume -p &quot;your query&quot;</code>.
          You don&rsquo;t type <code>gemini</code> yourself. Just type your
          question and press enter.
        </p>
        <p>
          Shell commands still run normally. <code>python main.py</code> runs in
          your shell. &ldquo;Explain what this script does&rdquo; goes to Gemini.
          The indicator next to your prompt shows which will happen.
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
            Install Gemini CLI (see{" "}
            <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a>)
          </li>
          <li>
            Set Gemini as your tool:{" "}
            <code>tool set gemini</code>
          </li>
        </ol>
        <p>
          Or skip step 3. If Gemini CLI is the only AI CLI installed, Lacy
          auto-detects it.
        </p>
      </section>

      <section>
        <h2>Session continuity</h2>
        <p>
          Lacy uses Gemini&rsquo;s <code>--resume</code> flag to maintain
          conversation context. Your second question knows about the first. Type
          <code>/new</code> to start a fresh session.
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
                <code>gemini --resume -p &quot;explain this error&quot;</code>
              </td>
              <td>
                <code>explain this error</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>gemini --resume -p &quot;optimize this query&quot;</code>
              </td>
              <td>
                <code>optimize this query</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>gemini --resume -p &quot;what does this do&quot;</code>
              </td>
              <td>
                <code>what does this do</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Real-time feedback</h2>
        <p>
          As you type, the indicator tells you where your input will go:
        </p>
        <ul>
          <li>
            <strong>Green</strong> = shell (e.g., <code>npm run dev</code>)
          </li>
          <li>
            <strong>Magenta</strong> = Gemini (e.g., <code>why is this endpoint slow</code>)
          </li>
        </ul>
        <p>No surprises. You always know what will happen before you hit enter.</p>
      </section>

      <section>
        <h2>Further reading</h2>
        <ul>
          <li>
            <Link href="/blog/why-i-didnt-use-ai-to-classify-ai-input">
              Why I didn&rsquo;t use AI to classify AI input
            </Link>{" "}
            — how Lacy decides whether your input is a shell command or natural
            language, without ML.
          </li>
          <li>
            <Link href="/blog/the-post-execution-reroute-pattern">
              The post-execution reroute pattern
            </Link>{" "}
            — what happens when a natural-language query accidentally runs as a
            shell command and fails.
          </li>
        </ul>
      </section>
    </article>
  );
}
