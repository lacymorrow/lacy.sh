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
  title: "lacy - talk to your shell",
  description:
    "Type commands or natural language. Commands run in your shell. Questions go to AI. No mode switching.",
  openGraph: {
    title: "lacy - talk to your shell",
    description:
      "Type commands or natural language. Commands run in your shell. Questions go to AI.",
    type: "website",
    url: "https://lacy.sh",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.88em' font-size='80' fill='%23c084fc'>%E2%96%8C</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
