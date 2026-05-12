import type { ComponentType } from "react";

interface PageMeta {
  title: string;
  description: string;
}

interface ContentModule {
  meta: PageMeta;
  default: ComponentType;
}

const pages: Record<string, () => Promise<ContentModule>> = {
  introduction: () => import("./introduction"),
  installation: () => import("./installation"),
  "quick-start": () => import("./quick-start"),
  "how-detection-works": () => import("./how-detection-works"),
  modes: () => import("./modes"),
  "terminal-context": () => import("./terminal-context"),
  "supported-ai-tools": () => import("./supported-ai-tools"),
  "commands-reference": () => import("./commands-reference"),
  configuration: () => import("./configuration"),
  "cli-reference": () => import("./cli-reference"),
  "smart-rerouting": () => import("./smart-rerouting"),
  "plugin-coexistence": () => import("./plugin-coexistence"),
  "shell-differences": () => import("./shell-differences"),
  architecture: () => import("./architecture"),
  troubleshooting: () => import("./troubleshooting"),
  contributing: () => import("./contributing"),
};

export function getContentLoader(slug: string): (() => Promise<ContentModule>) | null {
  return pages[slug] ?? null;
}

export const ALL_SLUGS = Object.keys(pages);
