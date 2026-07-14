import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <>
      <header>
        <div className="wrap">
          <nav className="nav">
            <Link href="/" className="nav-name">
              <span className="nav-bar" />
              lacy
            </Link>
            <div className="nav-right">
              <Link href="/docs/introduction">Docs</Link>
              <a
                href="https://github.com/lacymorrow/lacy"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-github"
              >
                GitHub
              </a>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <div className="wrap">
          <section
            className="hero"
            style={{ textAlign: "center", paddingTop: "10vh" }}
          >
            <h1>
              404 <em>not found</em>
            </h1>
            <p className="hero-desc">
              This page doesn{"'"}t exist. It may have been moved or removed.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "1.5rem", justifyContent: "center" }}>
              <Link href="/" style={{ color: "var(--violet)", textDecoration: "underline" }}>
                Home
              </Link>
              <Link href="/docs/introduction" style={{ color: "var(--violet)", textDecoration: "underline" }}>
                Docs
              </Link>
              <Link href="/blog" style={{ color: "var(--violet)", textDecoration: "underline" }}>
                Blog
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
