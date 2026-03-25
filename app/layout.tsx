import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, DM_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lacy.sh"),
  title: "Lacy Shell — talk to your terminal with AI",
  description:
    "Type commands or natural language directly in your terminal. Commands run in your shell, questions route to AI automatically. Minimal config, works with Claude, Gemini, and more.",
  authors: [{ name: "Lacy Morrow", url: "https://lacymorrow.com" }],
  openGraph: {
    title: "Lacy Shell — talk to your terminal with AI",
    description:
      "Type commands or natural language directly in your terminal. Commands run in your shell, questions route to AI automatically.",
    type: "website",
    url: "https://lacy.sh",
    images: [{ url: "https://lacy.sh/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacy Shell — talk to your terminal with AI",
    description:
      "Type commands or natural language directly in your terminal. Commands run in your shell, questions route to AI automatically.",
    images: ["https://lacy.sh/og.jpg"],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.88em' font-size='80' fill='%23c084fc'>%E2%96%8C</text></svg>",
        type: "image/svg+xml",
      },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as const,
  },
  other: {
    "theme-color": "#09090b",
    "ai:description":
      "Lacy Shell is a ZSH/Bash plugin that adds AI to your terminal. Type naturally, commands run in shell, questions go to AI.",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lacy Shell",
  alternateName: "lacy",
  description:
    "Talk to your shell. Commands run in your shell, questions route to AI automatically. ZSH and Bash plugin.",
  url: "https://lacy.sh",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, WSL",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Lacy Morrow",
    url: "https://lacymorrow.com",
  },
  codeRepository: "https://github.com/lacymorrow/lacy",
  programmingLanguage: ["Shell", "TypeScript", "JavaScript"],
  runtimePlatform: "ZSH, Bash 4+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${instrumentSerif.variable} ${dmMono.variable}`}>
        {children}
        <Script
          src={process.env.NEXT_PUBLIC_UMAMI_URL || "https://analytics.lacy.sh/script.js"}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "577521d7-3db7-4a77-a45c-3c97f21b5322"}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
