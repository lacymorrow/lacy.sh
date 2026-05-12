import Link from "next/link";
import { getSectionForSlug } from "./nav";

interface DocsBreadcrumbProps {
  slug: string;
  title: string;
}

export default function DocsBreadcrumb({ slug, title }: DocsBreadcrumbProps) {
  const section = getSectionForSlug(slug);
  return (
    <nav className="doc-breadcrumb" aria-label="Breadcrumb">
      <Link href="/docs">Docs</Link>
      <span className="doc-breadcrumb-sep">/</span>
      {section && (
        <>
          <span className="doc-breadcrumb-section">{section.title}</span>
          <span className="doc-breadcrumb-sep">/</span>
        </>
      )}
      <span className="doc-breadcrumb-current">{title}</span>
    </nav>
  );
}
