const AUTHOR = "Lacy Morrow";

function readable(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Byline with machine-readable published and updated dates, plus BlogPosting
 * JSON-LD built from the same two values. `updated` is only rendered when the
 * post actually changed, so the page never claims freshness it does not have.
 */
export function Byline({
  title,
  slug,
  published,
  updated,
}: {
  title: string;
  slug: string;
  published: string;
  updated?: string;
}) {
  const url = `https://lacy.sh/blog/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: published,
    dateModified: updated ?? published,
    author: { "@type": "Person", name: AUTHOR, url: "https://lacymorrow.com" },
    publisher: { "@type": "Person", name: AUTHOR },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };

  return (
    <p className="vs-label byline">
      {AUTHOR}
      {" · Published "}
      <time dateTime={published}>{readable(published)}</time>
      {updated && updated !== published && (
        <>
          {" · Updated "}
          <time dateTime={updated}>{readable(updated)}</time>
        </>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </p>
  );
}
