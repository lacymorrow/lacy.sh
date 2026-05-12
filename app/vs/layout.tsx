import Link from "next/link";

export default function VsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <Link href="/">Home</Link> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy">Source</a> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy/issues">Issues</a>
          </p>
        </div>
      </footer>
    </>
  );
}
