import { Fragment } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Renders the FAQ as visible text AND as FAQPage JSON-LD from the same array,
 * so the two can never drift. Schema whose answers are not on the page is a
 * structured-data policy violation, and it hides the answers from every reader
 * who is not a JSON-LD parser.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section>
      <h2>Frequently asked questions</h2>
      <dl className="faq">
        {items.map((item) => (
          <Fragment key={item.question}>
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </Fragment>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
