import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Blog | Lacy Shell" },
  description:
    "Technical posts about building Lacy Shell: natural language detection in the terminal, shell plugin development, and AI-powered developer tools.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Lacy Shell",
    description:
      "Technical posts about building Lacy Shell: natural language detection, shell plugin development, and AI terminal integration.",
    url: "https://lacy.sh/blog",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lacy Shell Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Lacy Shell",
    description:
      "Technical posts about building Lacy Shell: natural language detection, shell plugin development, and AI terminal integration.",
    images: ["/og.jpg"],
  },
};

const posts = [
  {
    slug: "why-i-didnt-use-ai-to-classify-ai-input",
    title: "Why I didn't use AI to classify AI input",
    date: "May 12, 2026",
    description:
      "Everyone assumes a shell that routes to AI must use AI for detection. Lacy uses pure string matching instead. Here's why the obvious approach is wrong.",
  },
  {
    slug: "shell-reserved-words-are-trickier-than-they-look",
    title: "Shell reserved words are trickier than they look",
    date: "May 19, 2026",
    description:
      "Words like do, then, and in pass command -v in your shell. But they're never valid standalone commands. Catching this edge case required rethinking how we validate input.",
  },
  {
    slug: "the-post-execution-reroute-pattern",
    title: "The post-execution reroute pattern",
    date: "May 26, 2026",
    description:
      "When someone types 'make sure the tests pass', the shell runs make. It fails. Lacy catches the failure, detects natural language in the error, and silently reroutes to the AI agent.",
  },
];

export default function BlogIndex() {
  return (
    <article className="vs-article">
      <p className="vs-label">blog</p>
      <h1>
        Building <em>Lacy Shell</em>
      </h1>
      <p className="vs-subtitle">
        Technical posts about natural language detection in the terminal, shell
        plugin development, and making AI work at the command line.
      </p>

      <div className="blog-list">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
            <p className="blog-card-date">{post.date}</p>
            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-desc">{post.description}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
