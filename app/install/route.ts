const INSTALL_SCRIPT_URL =
  "https://raw.githubusercontent.com/lacymorrow/lacy/main/install.sh";

const UMAMI_URL = process.env.UMAMI_URL ?? "https://umami-woad-two.vercel.app/api/send";
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID ?? "577521d7-3db7-4a77-a45c-3c97f21b5322";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawRef = searchParams.get("ref");
  const ref = rawRef && /^[a-zA-Z0-9_-]{1,64}$/.test(rawRef) ? rawRef : null;

  // Fire-and-forget: track install event in Umami
  fetch(UMAMI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      payload: {
        website: UMAMI_WEBSITE_ID,
        url: `/install${ref ? `?ref=${ref}` : ""}`,
        name: "script-install",
        data: ref ? { ref } : undefined,
      },
      type: "event",
    }),
  }).catch((error) => console.error("Umami tracking failed:", error));

  const res = await fetch(INSTALL_SCRIPT_URL, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return new Response("Failed to fetch install script", { status: 502 });
  }

  const script = await res.text();

  return new Response(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
