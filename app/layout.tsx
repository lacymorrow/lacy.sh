import type { Metadata } from "next";
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
    "Type commands or natural language directly in your terminal. Commands run in your shell, questions route to AI automatically. Zero config, works with Claude, Gemini, and more.",
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
  other: {
    "theme-color": "#09090b",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lacy Shell",
  url: "https://lacy.sh",
  description:
    "Type commands or natural language directly in your terminal. Commands run in your shell, questions route to AI automatically. Zero config, works with Claude, Gemini, and more.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux",
  author: {
    "@type": "Person",
    name: "Lacy Morrow",
    url: "https://lacymorrow.com",
  },
  datePublished: "2025-01-01",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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
      </body>
    </html>
  );
}
