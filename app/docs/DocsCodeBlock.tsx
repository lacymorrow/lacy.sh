"use client";

import { useState } from "react";

interface DocsCodeBlockProps {
  lang?: string;
  children: string;
}

export default function DocsCodeBlock({ lang, children }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(children.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="doc-code">
      <div className="doc-code-header">
        {lang && <span className="doc-code-lang">{lang}</span>}
        <button className="copy-btn" onClick={copy}>
          {copied ? "copied!" : "copy"}
        </button>
      </div>
      <div className="doc-code-body">
        <pre><code>{children.trim()}</code></pre>
      </div>
    </div>
  );
}
