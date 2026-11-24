import type { MetadataRoute } from "next";

/**
 * Everything is allowed. The AI indexers are named explicitly so the intent is
 * unambiguous to anyone reading the file, and so a future disallow has to be a
 * deliberate edit. `meta-webindexer` is Meta's AI search indexer, documented at
 * developers.facebook.com/docs/sharing/webmasters/web-crawlers.
 */
const AI_CRAWLERS = [
  "meta-webindexer",
  "meta-externalagent",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://lacy.sh/sitemap.xml",
    host: "https://lacy.sh",
  };
}
