import Link from "next/link";
import { getPrevNext } from "./nav";

interface DocsPrevNextProps {
  slug: string;
}

export default function DocsPrevNext({ slug }: DocsPrevNextProps) {
  const { prev, next } = getPrevNext(slug);
  if (!prev && !next) return null;

  return (
    <div className="doc-prevnext">
      <div className="doc-prevnext-item doc-prevnext-prev">
        {prev && (
          <Link href={`/docs/${prev.slug}`}>
            <span className="doc-prevnext-label">← Previous</span>
            <span className="doc-prevnext-title">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="doc-prevnext-item doc-prevnext-next">
        {next && (
          <Link href={`/docs/${next.slug}`}>
            <span className="doc-prevnext-label">Next →</span>
            <span className="doc-prevnext-title">{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
