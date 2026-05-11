import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lacy.sh/sitemap.xml",
    host: "https://lacy.sh",
  };
}
