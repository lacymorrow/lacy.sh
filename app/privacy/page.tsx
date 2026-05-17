import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Lacy Shell (No Tracking)",
  description:
    "Privacy policy for Lacy Shell. Lacy runs locally, collects no data, and sends nothing unless you route a query to your AI agent.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Lacy Shell",
    description:
      "Privacy policy for Lacy Shell. Runs locally, no telemetry, no data collection.",
    url: "/privacy",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <nav className="vs-nav">
        <Link href="/" className="vs-nav-brand">
          <span className="vs-nav-bar" />
          lacy
        </Link>
        <a href="https://github.com/lacymorrow/lacy" className="vs-nav-link">
          GitHub
        </a>
      </nav>
      <main className="vs-main">
        <article className="vs-article">
          <p className="vs-label">legal</p>
          <h1>Privacy Policy</h1>
          <p className="vs-subtitle">Last updated: April 2026</p>

          <section>
            <h2>What Lacy collects</h2>
            <p>
              Nothing. Lacy Shell is a local shell plugin that runs entirely on
              your machine. It does not phone home, collect usage data, or send
              telemetry of any kind.
            </p>
          </section>

          <section>
            <h2>How routing works</h2>
            <p>
              When you type in your terminal, Lacy classifies your input locally
              as either a shell command or natural language. Shell commands
              execute in your shell as usual. Natural language queries are
              forwarded to whichever AI CLI tool you have configured (Claude
              Code, Gemini CLI, OpenCode, etc.).
            </p>
            <p>
              Lacy itself never contacts any external server. Any data sent to
              an AI provider is governed by that provider&rsquo;s privacy policy,
              not ours — because Lacy is just routing your input to a tool you
              already installed and configured.
            </p>
          </section>

          <section>
            <h2>The website (lacy.sh)</h2>
            <p>
              This website uses{" "}
              <a
                href="https://umami.is"
                target="_blank"
                rel="noopener noreferrer"
              >
                Umami
              </a>{" "}
              for privacy-friendly, cookie-free analytics. Umami is self-hosted,
              does not track personal data, and is GDPR compliant. No cookies
              are set. No personal information is collected or stored.
            </p>
          </section>

          <section>
            <h2>Third-party services</h2>
            <p>
              The install script (<code>curl -fsSL https://lacy.sh/install | bash</code>)
              downloads Lacy from GitHub. GitHub&rsquo;s privacy policy applies
              to that download. After installation, Lacy does not contact GitHub
              or any other service.
            </p>
            <p>
              The website loads fonts from Google Fonts. Google&rsquo;s privacy
              policy applies to font delivery.
            </p>
          </section>

          <section>
            <h2>Open source</h2>
            <p>
              Lacy Shell is MIT licensed and fully open source. You can audit
              every line of code at{" "}
              <a
                href="https://github.com/lacymorrow/lacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/lacymorrow/lacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Data retention</h2>
            <p>
              Lacy does not store any data. There is no database, no log file,
              and no history of your queries beyond what your shell and your AI
              tool already keep. Your shell history is managed by your shell
              (ZSH or Bash), not by Lacy. If your AI CLI tool keeps
              conversation logs, that is governed by that tool&rsquo;s own
              configuration.
            </p>
          </section>

          <section>
            <h2>Children&rsquo;s privacy</h2>
            <p>
              Lacy Shell does not knowingly collect any information from anyone,
              including children under 13. Since no data is collected at all,
              there is nothing to disclose or delete.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              If this policy changes, the updated version will be posted here
              with a new &ldquo;last updated&rdquo; date. Since Lacy collects
              no data, significant changes are unlikely.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about this policy? Open an issue on the{" "}
              <a
                href="https://github.com/lacymorrow/lacy/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lacy issue tracker
              </a>{" "}
              or reach out to{" "}
              <a
                href="https://lacymorrow.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lacy Morrow
              </a>
              .
            </p>
          </section>
        </article>
      </main>
      <footer className="vs-footer">
        <hr />
        <div className="vs-cta">
          <p className="vs-links">
            <Link href="/">Home</Link> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy">Source</a> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy/issues">Issues</a> &middot;{" "}
            <Link href="/privacy">Privacy</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
