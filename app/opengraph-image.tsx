import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lacy Shell — talk to your terminal with AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [instrumentSerifItalic, instrumentSerif, dmMono] = await Promise.all([
    fetch(
      "https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATiw.ttf"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYhh0.ttf"
    ).then((r) => r.arrayBuffer()),
  ]);

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
        {/* OPEN SOURCE label */}
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
          OPEN SOURCE
        </div>

        {/* Heading row with accent bar */}
        <div style={{ display: "flex", position: "relative" }}>
          {/* Colored accent bar — aligned to the left of "Talk" */}
          <div
            style={{
              width: 4,
              height: 120,
              borderRadius: 2,
              background: "#a78bfa",
              marginRight: 16,
              flexShrink: 0,
              marginTop: 8,
            }}
          />

          {/* Heading text */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 88,
                lineHeight: 0.95,
                fontFamily: "Instrument Serif",
                color: "#fafafa",
                letterSpacing: "-0.02em",
              }}
            >
              Talk to
            </div>
            <div
              style={{
                fontSize: 88,
                lineHeight: 0.95,
                fontFamily: "Instrument Serif Italic",
                fontStyle: "italic",
                color: "#a78bfa",
                letterSpacing: "-0.02em",
              }}
            >
              your shell
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 36,
            marginLeft: 20,
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontFamily: "DM Mono",
              color: "#a1a1aa",
              lineHeight: 1.7,
            }}
          >
            Type commands or natural language.
          </div>
          <div
            style={{
              fontSize: 18,
              fontFamily: "DM Mono",
              color: "#fafafa",
              fontWeight: 500,
              lineHeight: 1.7,
            }}
          >
            Commands run in shell. Questions go to AI.
          </div>
        </div>

        {/* Install command */}
        <div
          style={{
            display: "flex",
            marginTop: 40,
            marginLeft: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid #27272a",
              borderRadius: 8,
              padding: "12px 24px",
              backgroundColor: "#111113",
              fontFamily: "DM Mono",
              fontSize: 16,
              color: "#a1a1aa",
            }}
          >
            <span style={{ color: "#52525b", marginRight: 12 }}>$</span>
            <span>
              npx <span style={{ color: "#fafafa" }}>lacy</span>
            </span>
          </div>
        </div>

        {/* Shell / Agent indicators */}
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
      ...size,
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
