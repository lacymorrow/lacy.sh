export interface DocPage {
  slug: string;
  title: string;
}

export interface NavSection {
  title: string;
  pages: DocPage[];
}

export const NAV: NavSection[] = [
  {
    title: "Getting Started",
    pages: [
      { slug: "introduction", title: "Introduction" },
      { slug: "installation", title: "Installation" },
      { slug: "quick-start", title: "Quick Start" },
    ],
  },
  {
    title: "Core Concepts",
    pages: [
      { slug: "how-detection-works", title: "How Detection Works" },
      { slug: "modes", title: "Modes" },
      { slug: "terminal-context", title: "Terminal Context" },
      { slug: "supported-ai-tools", title: "Supported AI Tools" },
    ],
  },
  {
    title: "Usage",
    pages: [
      { slug: "commands-reference", title: "Commands Reference" },
      { slug: "configuration", title: "Configuration" },
      { slug: "cli-reference", title: "CLI Reference" },
    ],
  },
  {
    title: "Advanced",
    pages: [
      { slug: "smart-rerouting", title: "Smart Rerouting" },
      { slug: "plugin-coexistence", title: "Plugin Coexistence" },
      { slug: "shell-differences", title: "Shell Differences" },
    ],
  },
  {
    title: "Reference",
    pages: [
      { slug: "architecture", title: "Architecture" },
      { slug: "troubleshooting", title: "Troubleshooting" },
    ],
  },
  {
    title: "Contributing",
    pages: [{ slug: "contributing", title: "Contributing" }],
  },
];

export const ALL_PAGES: DocPage[] = NAV.flatMap((s) => s.pages);

export function getPage(slug: string): DocPage | undefined {
  return ALL_PAGES.find((p) => p.slug === slug);
}

export function getSectionForSlug(slug: string): NavSection | undefined {
  return NAV.find((s) => s.pages.some((p) => p.slug === slug));
}

export function getPrevNext(slug: string): {
  prev: DocPage | null;
  next: DocPage | null;
} {
  const idx = ALL_PAGES.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? ALL_PAGES[idx - 1] : null,
    next: idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null,
  };
}
