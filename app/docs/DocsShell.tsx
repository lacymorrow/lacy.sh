"use client";

import { useState } from "react";
import Link from "next/link";
import DocsNav from "./DocsNav";
import DocsMobileDrawer from "./DocsMobileDrawer";

interface DocsShellProps {
  children: React.ReactNode;
}

export default function DocsShell({ children }: DocsShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header>
        <div className="wrap doc-nav-wrap">
          <div className="nav">
            <div className="doc-header-left">
              <button
                className="doc-hamburger"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M2 8h12M2 12h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <Link href="/" className="nav-name">
                <span className="nav-bar" />
                lacy.sh
              </Link>
              <span className="doc-breadcrumb-sep">/</span>
              <Link href="/docs" className="nav-name doc-nav-docs-link">
                docs
              </Link>
            </div>
            <div className="nav-right">
              <a href="https://github.com/lacymorrow/lacy" target="_blank" rel="noopener noreferrer" className="nav-github">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      <DocsMobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="doc-page-wrap">
        <aside className="doc-sidebar">
          <DocsNav />
        </aside>
        <main className="doc-content-wrap">
          <div className="doc-content">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
