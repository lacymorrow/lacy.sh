import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Using OpenCode with Lacy Shell",
  description:
    "How Lacy Shell integrates with OpenCode. Type questions directly in your terminal and they route to OpenCode automatically. No prefix needed.",
  alternates: { canonical: "/tools/opencode" },
  openGraph: {
    title: "Using OpenCode with Lacy Shell",
    description:
      "Type questions in your terminal and they route to OpenCode automatically.",
    url: "https://lacy.sh/tools/opencode",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Using OpenCode with Lacy Shell",
    description:
      "Type questions in your terminal and they route to OpenCode automatically.",
    images: ["/og.jpg"],
  },
};

export default function ToolsOpenCode() {
  return (
    <article className="vs-article">
      <p className="vs-label">integration</p>
      <h1>
        Using <em>OpenCode</em> with Lacy Shell
      </h1>
      <p className="vs-subtitle">
        Type questions in your terminal. They go to OpenCode automatically.
      </p>

      <section>
        <h2>How it works</h2>
        <p>
          When OpenCode is your active AI tool, Lacy routes natural language
          queries using <code>opencode run -c &quot;your query&quot;</code>. You
          don&rsquo;t type <code>opencode</code> yourself. Just type your
          question and press enter.
        </p>
        <p>
          Shell commands still run normally. <code>ls -la</code> runs in your
          shell. &ldquo;What files changed today?&rdquo; goes to OpenCode. The
          indicator next to your prompt shows which will happen.
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
            Install OpenCode (see{" "}
            <a href="https://github.com/opencode-ai/opencode">opencode-ai/opencode</a>)
          </li>
          <li>
            Set OpenCode as your tool:{" "}
            <code>tool set opencode</code>
          </li>
        </ol>
        <p>
          Or skip step 3. If OpenCode is the only AI CLI installed, Lacy
          auto-detects it.
        </p>
      </section>

      <section>
        <h2>Background server (preheating)</h2>
        <p>
          OpenCode supports a background server mode. Lacy can start the server
          on plugin load (<code>opencode serve</code>) so your first query
          responds instantly instead of waiting for cold start. Enable this in
          <code>~/.lacy/config.yaml</code> under <code>preheat.eager: true</code>.
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
                <code>opencode run -c &quot;explain this error&quot;</code>
              </td>
              <td>
                <code>explain this error</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>opencode run -c &quot;refactor this function&quot;</code>
              </td>
              <td>
                <code>refactor this function</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>opencode run -c &quot;write tests for auth&quot;</code>
              </td>
              <td>
                <code>write tests for auth</code>
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
            <strong>Green</strong> = shell (e.g., <code>go build</code>)
          </li>
          <li>
            <strong>Magenta</strong> = OpenCode (e.g., <code>why is this build failing</code>)
          </li>
        </ul>
        <p>No surprises. You always know what will happen before you hit enter.</p>
      </section>
    </article>
  );
}
