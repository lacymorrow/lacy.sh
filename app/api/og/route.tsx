import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const SECTIONS = {
  vs: { label: "COMPARISON", accent: "#a78bfa" },
  tools: { label: "INTEGRATION", accent: "#d946ef" },
  blog: { label: "BLOG", accent: "#60a5fa" },
  docs: { label: "DOCUMENTATION", accent: "#4ade80" },
} as const;

type Section = keyof typeof SECTIONS;

function isSection(s: string): s is Section {
  return s in SECTIONS;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const section = searchParams.get("section") ?? "vs";
  const title = searchParams.get("title") ?? "Lacy Shell";
  const subtitle = searchParams.get("subtitle") ?? "";

  if (!isSection(section)) {
    return new Response("Invalid section", { status: 400 });
  }

  const { label, accent } = SECTIONS[section];

  const fetchFont = (url: string) =>
    fetch(url).then((r) =>
      r.ok ? r.arrayBuffer() : Promise.reject("Failed to fetch font: " + url)
    );

  const [instrumentSerifItalic, instrumentSerif, dmMono] = await Promise.all([
    fetchFont(
      "https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATiw.ttf"
    ),
    fetchFont(
      "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf"
    ),
    fetchFont(
      "https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYhh0.ttf"
    ),
  ]);

  const isBlogOrDocs = section === "blog" || section === "docs";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#09090b",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Section label */}
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.12em",
            color: "#52525b",
            fontFamily: "DM Mono",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          {label}
        </div>

        {/* Heading row with accent bar */}
        <div style={{ display: "flex", position: "relative" }}>
          <div
            style={{
              width: 4,
              height: isBlogOrDocs ? 100 : 120,
              borderRadius: 2,
              background: accent,
              marginRight: 16,
              flexShrink: 0,
              marginTop: 8,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 900,
            }}
          >
            {isBlogOrDocs ? (
              <div
                style={{
                  fontSize: 64,
                  lineHeight: 1.05,
                  fontFamily: "Instrument Serif",
                  color: "#fafafa",
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 48,
                    lineHeight: 1.1,
                    fontFamily: "DM Mono",
                    color: "#a1a1aa",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {section === "vs" ? "Lacy Shell vs" : "Lacy Shell +"}
                </div>
                <div
                  style={{
                    fontSize: 88,
                    lineHeight: 0.95,
                    fontFamily: "Instrument Serif Italic",
                    fontStyle: "italic",
                    color: accent,
                    letterSpacing: "-0.02em",
                    marginTop: 4,
                  }}
                >
                  {title}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              display: "flex",
              marginTop: 36,
              marginLeft: 20,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontFamily: "DM Mono",
                color: "#a1a1aa",
                lineHeight: 1.7,
                maxWidth: 700,
              }}
            >
              {subtitle}
            </div>
          </div>
        )}

        {/* Shell / Agent indicators (vs and tools only) */}
        {!isBlogOrDocs && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              right: 80,
              top: 160,
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "DM Mono",
                fontSize: 16,
                color: "#a1a1aa",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#4ade80",
                }}
              />
              shell
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "DM Mono",
                fontSize: 16,
                color: "#a1a1aa",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#d946ef",
                }}
              />
              agent
            </div>
          </div>
        )}

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 80,
            fontFamily: "DM Mono",
            fontSize: 16,
            color: "#52525b",
          }}
        >
          lacy.sh
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Instrument Serif",
          data: instrumentSerif,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Serif Italic",
          data: instrumentSerifItalic,
          style: "italic",
          weight: 400,
        },
        {
          name: "DM Mono",
          data: dmMono,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
