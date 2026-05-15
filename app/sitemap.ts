import type { MetadataRoute } from "next";
import { ALL_SLUGS } from "./docs/content/index";

const BASE = "https://lacy.sh";

// Update when new posts are published — use the author date shown in the article
const BLOG_PUBLISH_DATES: Record<string, string> = {
  "why-i-didnt-use-ai-to-classify-ai-input": "2026-05-12",
  "shell-reserved-words-are-trickier-than-they-look": "2026-05-19",
  "the-post-execution-reroute-pattern": "2026-05-26",
};

// All docs were last touched together when BreadcrumbList JSON-LD was added
const DOCS_LAST_MODIFIED = "2026-05-15";

// /vs comparison pages — individual last-edit dates from git history
const VS_LAST_MODIFIED: Record<string, string> = {
  "shell-gpt": "2026-05-14",
  warp: "2026-05-14",
  "ai-shell": "2026-05-11",
  "amazon-q": "2026-05-11",
  "github-copilot-cli": "2026-05-11",
  aider: "2026-05-11",
  cursor: "2026-05-11",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const docPages: MetadataRoute.Sitemap = ALL_SLUGS.map((slug) => ({
    url: `${BASE}/docs/${slug}`,
    lastModified: DOCS_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: slug === "introduction" || slug === "installation" ? 0.9 : 0.8,
  }));

  const vsPages: MetadataRoute.Sitemap = Object.entries(VS_LAST_MODIFIED).map(
    ([slug, date]) => ({
      url: `${BASE}/vs/${slug}`,
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  const blogPostPages: MetadataRoute.Sitemap = Object.entries(
    BLOG_PUBLISH_DATES
  ).map(([slug, date]) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const newestBlogDate = Object.values(BLOG_PUBLISH_DATES).sort().at(-1) || DOCS_LAST_MODIFIED;

  return [
    {
      url: BASE,
      lastModified: newestBlogDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/vs`,
      lastModified: "2026-05-14",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...vsPages,
    {
      url: `${BASE}/blog`,
      lastModified: newestBlogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPostPages,
    {
      url: `${BASE}/tools`,
      lastModified: "2026-05-15",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/tools/claude`,
      lastModified: "2026-05-05",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/tools/opencode`,
      lastModified: "2026-05-05",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/tools/gemini`,
      lastModified: "2026-05-05",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...docPages,
    {
      url: `${BASE}/privacy`,
      lastModified: "2026-05-11",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
