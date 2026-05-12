import Link from "next/link";
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
        <Link href="/" className="vs-nav-brand">
          <span className="vs-nav-bar" />
          lacy
        </Link>
        <div className="blog-nav-right">
          <Link href="/blog" className="vs-nav-link">
            Blog
          </Link>
          <a href="https://github.com/lacymorrow/lacy" className="vs-nav-link" target="_blank" rel="noopener noreferrer">
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
            <Link href="/">Home</Link> &middot;{" "}
            <Link href="/blog">Blog</Link> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy" target="_blank" rel="noopener noreferrer">Source</a> &middot;{" "}
            <a href="https://github.com/lacymorrow/lacy/issues" target="_blank" rel="noopener noreferrer">Issues</a> &middot;{" "}
            <Link href="/privacy">Privacy</Link>
          </p>
          <p className="vs-links blog-links-mt">
            More posts:{" "}
            <Link href="/blog/why-i-didnt-use-ai-to-classify-ai-input">
              AI Classification
            </Link>{" "}
            &middot;{" "}
            <Link href="/blog/shell-reserved-words-are-trickier-than-they-look">
              Reserved Words
            </Link>{" "}
            &middot;{" "}
            <Link href="/blog/the-post-execution-reroute-pattern">
              Post-Execution Reroute
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
