import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getContentLoader, ALL_SLUGS } from "../content/index";
import DocsBreadcrumb from "../DocsBreadcrumb";
import DocsBreadcrumbSchema from "../DocsBreadcrumbSchema";
import DocsPrevNext from "../DocsPrevNext";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loader = getContentLoader(slug);
  if (!loader) return {};
  const mod = await loader();
  return {
    title: mod.meta.title,
    description: mod.meta.description,
    alternates: { canonical: `/docs/${slug}` },
    openGraph: {
      title: `${mod.meta.title} — Lacy Shell Docs`,
      description: mod.meta.description,
      url: `/docs/${slug}`,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${mod.meta.title} — Lacy Shell Docs`,
      description: mod.meta.description,
      images: ["/og.jpg"],
    },
  };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const loader = getContentLoader(slug);
  if (!loader) notFound();

  const mod = await loader();
  const Content = mod.default;

  return (
    <>
      <DocsBreadcrumbSchema slug={slug} title={mod.meta.title} />
      <DocsBreadcrumb slug={slug} title={mod.meta.title} />
      <Content />
      <DocsPrevNext slug={slug} />
      <footer className="doc-page-footer">
        <a href="https://github.com/lacymorrow/lacy" target="_blank" rel="noopener noreferrer">
          Edit on GitHub
        </a>
      </footer>
    </>
  );
}
