import type { Metadata } from "next";
import DocsShell from "./DocsShell";

export const metadata: Metadata = {
  title: {
    template: "%s — Lacy Shell Docs",
    default: "Documentation — Lacy Shell",
  },
  description:
    "Full documentation for Lacy Shell — installation, configuration, AI backends, auto mode, commands, and troubleshooting.",
  alternates: { canonical: "/docs" },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
