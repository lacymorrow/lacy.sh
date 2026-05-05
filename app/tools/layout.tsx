export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="vs-nav">
        <a href="/" className="vs-nav-brand">
          <span className="vs-nav-bar" />
          lacy
        </a>
        <a href="https://github.com/lacymorrow/lacy" className="vs-nav-link">
          GitHub
        </a>
      </nav>
      <main className="vs-main">{children}</main>
      <footer className="vs-footer">
        <hr />
        <div className="vs-cta">
          <h2>
            Ready to try <em>Lacy?</em>
          </h2>
          <pre className="vs-install">
            <code>curl -fsSL https://lacy.sh/install | bash</code>
          </pre>
          <p className="vs-alt">
            Also: <code>brew install lacymorrow/tap/lacy</code> or{" "}
            <code>npx lacy</code>
          </p>
          <p className="vs-links">
            <a href="/">Home</a> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy">Source</a> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy/issues">Issues</a> &middot;{" "}
            <a href="/privacy">Privacy</a>
          </p>
          <p className="vs-links" style={{ marginTop: 12 }}>
            Integrations:{" "}
            <a href="/tools/claude">Claude Code</a> &middot;{" "}
            <a href="/tools/opencode">OpenCode</a> &middot;{" "}
            <a href="/tools/gemini">Gemini CLI</a>
          </p>
        </div>
      </footer>
    </>
  );
}
