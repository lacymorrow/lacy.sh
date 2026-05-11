import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lacy vs Amazon Q CLI — Plugin vs Cloud Platform",
  description:
    "Compare Lacy Shell and Amazon Q Developer CLI. Lacy is a lightweight shell plugin. Amazon Q is an AWS-integrated assistant. See the differences.",
  alternates: { canonical: "/vs/amazon-q" },
  openGraph: {
    title: "Lacy Shell vs Amazon Q Developer CLI",
    description:
      "Compare Lacy Shell and Amazon Q Developer. Lightweight plugin vs AWS-integrated assistant.",
    url: "https://lacy.sh/vs/amazon-q",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacy Shell vs Amazon Q Developer CLI",
    description:
      "Compare Lacy Shell and Amazon Q Developer. Lightweight plugin vs AWS-integrated assistant.",
    images: ["/og.jpg"],
  },
};

export default function VsAmazonQ() {
  return (
    <article className="vs-article">
      <p className="vs-label">comparison</p>
      <h1>
        Lacy Shell vs <em>Amazon Q Developer</em>
      </h1>
      <p className="vs-subtitle">
        Lightweight shell plugin vs AWS-integrated assistant.
      </p>

      <section>
        <h2>The core difference</h2>
        <p>
          Amazon Q Developer CLI (the product that absorbed Fig and
          CodeWhisperer) is an AWS-backed assistant with autocomplete,
          chat, and inline suggestions. It&rsquo;s a full platform.
          Lacy is a single-purpose shell plugin: it detects whether your input
          is a command or a question and routes it. That&rsquo;s it.
        </p>
      </section>

      <section>
        <table className="vs-table">
          <thead>
            <tr>
              <th></th>
              <th>Lacy Shell</th>
              <th>Amazon Q Developer CLI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>ZSH/Bash plugin</td>
              <td>Desktop app + CLI</td>
            </tr>
            <tr>
              <td>AI routing</td>
              <td>Automatic — detects NL vs commands</td>
              <td>Explicit (<code>q chat</code>)</td>
            </tr>
            <tr>
              <td>Autocomplete</td>
              <td>No (use your existing completion)</td>
              <td>Yes (command + argument suggestions)</td>
            </tr>
            <tr>
              <td>AI backend</td>
              <td>Your choice (Claude, Gemini, OpenCode, etc.)</td>
              <td>Amazon Bedrock</td>
            </tr>
            <tr>
              <td>AWS integration</td>
              <td>None</td>
              <td>Deep (IAM, CloudWatch, etc.)</td>
            </tr>
            <tr>
              <td>Real-time indicator</td>
              <td>Yes — green/magenta as you type</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Account required</td>
              <td>No</td>
              <td>Yes (AWS Builder ID or IAM)</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>Free, MIT licensed</td>
              <td>Free tier + paid Pro plan</td>
            </tr>
            <tr>
              <td>Open source</td>
              <td>Yes</td>
              <td>Partially</td>
            </tr>
            <tr>
              <td>Install size</td>
              <td>~100KB (shell scripts)</td>
              <td>Desktop app + CLI binary</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Different scopes</h2>
        <p>
          Amazon Q is trying to be your full development assistant: autocomplete,
          chat, code transformation, vulnerability scanning, AWS resource
          management. It does a lot of things.
        </p>
        <p>
          Lacy does one thing. It watches what you type, decides if it&rsquo;s a
          command or a question, and sends it to the right place. If you
          already have an AI CLI tool you like, Lacy makes it accessible without
          changing how you work.
        </p>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You want a lightweight plugin, not a platform</li>
          <li>You want to pick your own AI backend</li>
          <li>You don&rsquo;t need AWS integration</li>
          <li>You want automatic NL routing without invoking a separate command</li>
        </ul>
      </section>

      <section>
        <h2>When to use Amazon Q</h2>
        <ul>
          <li>You work heavily with AWS services</li>
          <li>You want IDE-style autocomplete in your terminal</li>
          <li>You want an all-in-one assistant with chat, completions, and scanning</li>
          <li>Your team is already on the AWS ecosystem</li>
        </ul>
      </section>

      <section>
        <h2>Can you use both?</h2>
        <p>
          They can coexist. Amazon Q&rsquo;s autocomplete works at a different
          level than Lacy&rsquo;s input routing. Lacy handles enter-to-execute
          classification; Q handles tab-to-complete suggestions. If you want
          Q&rsquo;s autocomplete plus Lacy&rsquo;s NL routing, both can be active.
        </p>
      </section>
    </article>
  );
}
