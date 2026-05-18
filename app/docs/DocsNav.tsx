"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV } from "./nav";

interface DocsNavProps {
  onLinkClick?: () => void;
}

export default function DocsNav({ onLinkClick }: DocsNavProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("docs-nav-collapsed");
      if (saved) setCollapsed(JSON.parse(saved));
    } catch {}
  }, []);

  function toggleSection(title: string) {
    setCollapsed((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      try {
        localStorage.setItem("docs-nav-collapsed", JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  return (
    <nav className="doc-nav">
      {NAV.map((section) => {
        const isCollapsed = collapsed[section.title];
        return (
          <div key={section.title} className="doc-nav-section">
            <button
              className="doc-nav-section-btn"
              onClick={() => toggleSection(section.title)}
              aria-expanded={!isCollapsed}
              aria-controls={`nav-section-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span>{section.title}</span>
              <svg
                className={`doc-nav-chevron${isCollapsed ? "" : " open"}`}
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M2.5 3.5L5 6L7.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {!isCollapsed && (
              <ul
                className="doc-nav-list"
                id={`nav-section-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {section.pages.map((page) => {
                  const href = `/docs/${page.slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={page.slug}>
                      <Link
                        href={href}
                        className={`doc-nav-link${isActive ? " active" : ""}`}
                        onClick={onLinkClick}
                      >
                        {page.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
