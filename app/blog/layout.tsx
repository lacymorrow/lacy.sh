import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Lacy Shell Blog",
    default: "Blog | Lacy Shell",
  },
  description:
    "Technical posts about building Lacy Shell: natural language detection, shell plugin development, and AI terminal integration.",
};

export default function BlogLayout({
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
        <div className="blog-nav-right">
          <a href="/blog" className="vs-nav-link">
            Blog
          </a>
          <a href="https://github.com/lacymorrow/lacy" className="vs-nav-link">
            GitHub
          </a>
        </div>
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
            <a href="/blog">Blog</a> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy">Source</a> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy/issues">Issues</a> &middot;{" "}
            <a href="/privacy">Privacy</a>
          </p>
          <p className="vs-links" style={{ marginTop: 12 }}>
            More posts:{" "}
            <a href="/blog/why-i-didnt-use-ai-to-classify-ai-input">
              AI Classification
            </a>{" "}
            &middot;{" "}
            <a href="/blog/shell-reserved-words-are-trickier-than-they-look">
              Reserved Words
            </a>{" "}
            &middot;{" "}
            <a href="/blog/the-post-execution-reroute-pattern">
              Post-Execution Reroute
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
