#!/usr/bin/env node
/**
 * Regenerates app/lastmod.json: the last commit date of every page source file.
 *
 * sitemap.xml needs a truthful <lastmod>. Hand-maintained dates drift — the docs
 * pages were edited on 2026-10-13 while the sitemap still claimed 2026-05-15, so
 * Google saw five months of staleness that was not real. Run this whenever you
 * ship a content change, then commit the JSON:
 *
 *   npm run lastmod
 *
 * The output is committed so builds never need git history (Vercel clones shallow).
 */

import { execFileSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const appDir = join(root, "app");

/** Every file that renders a page: route entrypoints plus the docs content modules. */
function pageSources(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...pageSources(path));
    } else if (entry.name === "page.tsx") {
      found.push(path);
    } else if (dir.endsWith(join("docs", "content")) && entry.name.endsWith(".tsx")) {
      found.push(path);
    }
  }
  return found;
}

function lastCommitDate(path) {
  // %as (author date), not %cs: a rebase rewrites committer dates and would tell
  // Google every page changed today — the same false signal, inverted.
  const out = execFileSync("git", ["log", "-1", "--format=%as", "--", path], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  if (out) return out;
  // Never committed yet (a brand new page): fall back to the working-tree mtime.
  return statSync(path).mtime.toISOString().slice(0, 10);
}

const dates = {};
for (const path of pageSources(appDir).sort()) {
  dates[relative(root, path)] = lastCommitDate(path);
}

const target = join(appDir, "lastmod.json");
writeFileSync(target, `${JSON.stringify(dates, null, 2)}\n`);
console.log(`Wrote ${Object.keys(dates).length} dates to ${relative(root, target)}`);
