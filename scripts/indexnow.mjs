#!/usr/bin/env node
/**
 * Submit the current sitemap to IndexNow after a build or deploy.
 * Idempotent: Bing accepts any batch, so re-posting on every deploy is fine.
 *
 * Usage:
 *   node scripts/indexnow.mjs              # reads sitemap from HOST
 *   HOST=https://lacy.sh node scripts/indexnow.mjs
 *   DRY_RUN=1 node scripts/indexnow.mjs    # print payload, do not POST
 *
 * Env:
 *   HOST          Site origin. Default https://lacy.sh.
 *   INDEXNOW_KEY  Key value. Default reads from public/<key>.txt filename.
 */

import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const HOST = (process.env.HOST || "https://lacy.sh").replace(/\/+$/, "");
const DRY_RUN = process.env.DRY_RUN === "1";

function findKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;
  const entries = readdirSync(PUBLIC_DIR);
  const keyFile = entries.find((e) => /^[a-f0-9]{8,128}\.txt$/i.test(e));
  if (!keyFile) {
    throw new Error(
      "No IndexNow key file found in public/. Expected a hex-named .txt file.",
    );
  }
  const key = keyFile.replace(/\.txt$/, "");
  const contents = readFileSync(join(PUBLIC_DIR, keyFile), "utf8").trim();
  if (contents !== key) {
    throw new Error(
      `public/${keyFile} contents (${contents}) must match the filename (${key}).`,
    );
  }
  return key;
}

async function fetchSitemapUrls() {
  const sitemapUrl = `${HOST}/sitemap.xml`;
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Fetch ${sitemapUrl}: ${res.status}`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
  if (urls.length === 0) throw new Error(`No <loc> entries in ${sitemapUrl}`);
  return urls;
}

async function main() {
  const key = findKey();
  const urls = await fetchSitemapUrls();
  const payload = {
    host: new URL(HOST).host,
    key,
    keyLocation: `${HOST}/${key}.txt`,
    urlList: urls,
  };
  console.log(
    `IndexNow: ${urls.length} URLs for host ${payload.host}, key ${key.slice(0, 8)}…`,
  );
  if (DRY_RUN) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  if (body) console.log(body);
  if (!res.ok && res.status !== 202) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("IndexNow submission failed:", err.message);
  process.exit(1);
});
