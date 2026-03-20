"use client";

import { useState, useCallback, useEffect } from "react";
import HeroBeam from "./hero-beam";

const tabs = [
  {
    id: "curl",
    label: "curl",
    lines: [
      {
        parts: [
          { text: "$ ", cls: "p" },
          { text: "curl", cls: "cmd" },
          { text: " -fsSL", cls: "flag" },
          { text: " https://lacy.sh/install", cls: "url" },
          { text: " |", cls: "flag" },
          { text: " bash", cls: "cmd" },
        ],
        copyText: "curl -fsSL https://lacy.sh/install | bash",
      },
    ],
  },
  {
    id: "brew",
    label: "brew",
    lines: [
      {
        parts: [
          { text: "$ ", cls: "p" },
          { text: "brew install", cls: "cmd" },
          { text: " lacymorrow/tap/lacy", cls: "url" },
        ],
        copyText: "brew install lacymorrow/tap/lacy",
      },
    ],
  },
  {
    id: "npm",
    label: "npx",
    lines: [
      {
        parts: [
          { text: "$ ", cls: "p" },
          { text: "npx", cls: "cmd" },
          { text: " lacy", cls: "url" },
        ],
        copyText: "npx lacy",
      },
    ],
  },
  {
    id: "git",
    label: "git",
    lines: [
      {
        parts: [
          { text: "$ ", cls: "p" },
          { text: "git clone", cls: "cmd" },
          { text: " https://github.com/lacymorrow/lacy.git", cls: "url" },
          { text: " ~/.lacy", cls: "flag" },
        ],
        copyText: "git clone https://github.com/lacymorrow/lacy.git ~/.lacy",
      },
      {
        parts: [
          { text: "$ ", cls: "p" },
          { text: "echo", cls: "cmd" },
          { text: " 'source ~/.lacy/lacy.plugin.zsh'", cls: "flag" },
          { text: " >>", cls: "cmd" },
          { text: " ~/.zshrc", cls: "flag" },
          { text: "  # or .bashrc", cls: "cmt" },
        ],
        copyText: "echo 'source ~/.lacy/lacy.plugin.zsh' >> ~/.zshrc",
      },
    ],
  },
];

const demoLines = [
  { bar: "g", input: "ls -la", tag: "shell", tagCls: "shell" },
  { output: "drwxr-xr-x  12 user  staff  384 Feb  3 09:21 ." },
  { bar: "m", input: "what files are here", tag: "agent", tagCls: "agent" },
  {
    output: "You have 12 files including package.json, src/, ...",
  },
  { bar: "g", input: "git status", tag: "shell", tagCls: "shell" },
  {
    bar: "m",
    input: "fix the build error in src/index.ts",
    tag: "agent",
    tagCls: "agent",
  },
  { bar: "g", input: "cd .. && npm test", tag: "shell", tagCls: "shell" },
  {
    bar: "r",
    input: "make sure the tests pass",
    tag: "reroute",
    tagCls: "reroute",
  },
  {
    output: "No rule to make target 'sure' → caught, rerouting to AI...",
    reroute: true,
  },
];

const tools = [
  {
    name: "lash",
    url: "https://lash.lacy.sh",
    color: "var(--violet)",
    cmd: 'lash run -c "query"',
    note: "recommended",
  },
  {
    name: "claude",
    color: "var(--blue)",
    cmd: 'claude -p "query"',
    note: "Claude Code",
  },
  {
    name: "opencode",
    color: "var(--magenta)",
    cmd: 'opencode run -c "query"',
    note: "",
  },
  {
    name: "gemini",
    color: "var(--green)",
    cmd: 'gemini --resume -p "query"',
    note: "Google",
  },
  {
    name: "codex",
    color: "var(--fg-3)",
    cmd: 'codex exec resume --last "query"',
    note: "OpenAI",
  },
  {
    name: "custom",
    color: "var(--fg-4)",
    cmd: 'your-command "query"',
    note: "anything",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("curl");
  const [copyLabel, setCopyLabel] = useState("copy");
  const [bottomCopied, setBottomCopied] = useState(false);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/lacymorrow/lacy/releases/latest")
      .then((r) => r.json())
      .then((d: { tag_name?: string }) => {
        if (d.tag_name) setVersion(d.tag_name.replace(/^v/, ""));
      })
      .catch(() => {});
  }, []);

  const copyInstall = useCallback(() => {
    const tab = tabs.find((t) => t.id === activeTab);
    if (!tab) return;
    const text = tab.lines.map((l) => l.copyText).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopyLabel("copied");
      setTimeout(() => setCopyLabel("copy"), 1500);
    });
  }, [activeTab]);

  const copyBottom = useCallback(() => {
    navigator.clipboard
      .writeText("curl -fsSL https://lacy.sh/install | bash")
      .then(() => {
        setBottomCopied(true);
        setTimeout(() => setBottomCopied(false), 1500);
      });
  }, []);

  return (
    <>
      <header>
        <div className="wrap">
          <nav className="nav">
            <a href="#" className="nav-name">
              <span className="nav-bar" />
              lacy
            </a>
            <div className="nav-right">
              <a href="#demo">Demo</a>
              <a href="#how">How it works</a>
              <a href="#tools">Tools</a>
              <a
                href="https://github.com/lacymorrow/lacy"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-github"
                data-umami-event="github-click"
              >
                GitHub
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="wrap">
          {/* hero */}
          <section className="hero">
            <div className="hero-label reveal">shell plugin for zsh &amp; bash</div>
            <h1 className="reveal reveal-d1">
              Talk to
              <br />
              your <em>shell</em>
            </h1>
            <p className="hero-desc reveal reveal-d2">
              Commands execute. Questions go to AI. No prefix, no mode
              switching. You just type.
            </p>

            <div className="install reveal reveal-d3">
              <div className="install-head" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`install-tab${activeTab === tab.id ? " active" : ""}`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    data-umami-event="install-method-select"
                    data-umami-event-method={tab.id}
                  >
                    {tab.label}
                  </button>
                ))}
                {version && (
                  <span
                    style={{ marginLeft: "auto", marginRight: "12px", padding: "2px 10px" }}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-zinc-300"
                  >
                    <span className="opacity-60">v</span>
                    <span>{version}</span>
                  </span>
                )}
              </div>
              <div className="install-body">
                <button
                  className="copy-btn"
                  aria-label="Copy to clipboard"
                  onClick={copyInstall}
                  data-umami-event="install-copy"
                  data-umami-event-method={activeTab}
                >
                  {copyLabel}
                </button>
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`install-panel${activeTab === tab.id ? " active" : ""}`}
                  >
                    {tab.lines.map((line, i) => (
                      <code key={i}>
                        {line.parts.map((part, j) => (
                          <span key={j} className={part.cls}>
                            {part.text}
                          </span>
                        ))}
                      </code>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* positioning */}
          <section className="positioning reveal">
            <p className="positioning-text">
              Not another AI CLI. Lacy is the layer between your shell and
              every AI tool you already use.
            </p>
          </section>

          {/* demo */}
          <section className="demo" id="demo">
            <div className="demo-label">
              Green bar = shell. Purple bar = AI.
            </div>
            <div className="demo-lines">
              {demoLines.map((line, i) =>
                line.output ? (
                  <div className="dl" key={i}>
                    <div
                      className="dl-bar"
                      style={{ background: "transparent" }}
                    />
                    <span />
                    <span className={`dl-out${line.reroute ? " reroute" : ""}`}>
                      {line.output}
                    </span>
                  </div>
                ) : (
                  <div className="dl" key={i}>
                    <div className={`dl-bar ${line.bar}`} />
                    <span className="dl-prompt">&gt;</span>
                    <span className="dl-input">{line.input}</span>
                    <span className={`dl-tag ${line.tagCls}`}>{line.tag}</span>
                  </div>
                ),
              )}
            </div>
          </section>

          <hr className="rule" />

          {/* tools — moved up */}
          <section className="tools" id="tools">
            <div className="tools-label">works with your tools</div>
            <p className="tools-desc">
              Already using an AI CLI? Lacy routes to it. No extra auth, no
              API keys. Pick your agent:
            </p>
            <div className="tools-list">
              {tools.map((tool) => (
                <div className="tool-row" key={tool.name}>
                  <div className="tool-name">
                    <span className="dot" style={{ background: tool.color }} />
                    {tool.url ? (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {tool.name}
                      </a>
                    ) : (
                      tool.name
                    )}
                  </div>
                  <div className="tool-cmd">{tool.cmd}</div>
                  <div className="tool-note">{tool.note}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="rule" />

          {/* how */}
          <section className="how" id="how">
            <div className="how-label">how it works</div>
            <h2>
              You type.
              <br />
              Lacy <em>decides.</em>
            </h2>
            <p className="how-desc">
              Lacy adds a tiny colored bar to your prompt. That{"'"}s it. Your
              shell stays exactly the same. Commands run locally, questions go
              to your agent. Works on your laptop, on a VPS over SSH, anywhere
              you have a shell. Toggle between auto, shell-only, and agent-only
              with Ctrl+Space.
            </p>
            <div className="how-grid">
              <div className="how-cell">
                <div className="how-cell-head">
                  <span
                    className="dot"
                    style={{ background: "var(--green)" }}
                  />
                  Zero footprint
                </div>
                <p>
                  Nothing changes about your existing shell. Same
                  config, same aliases, same workflow. Lacy just watches
                  and routes.
                </p>
              </div>
              <div className="how-cell">
                <div className="how-cell-head">
                  <span
                    className="dot"
                    style={{ background: "var(--magenta)" }}
                  />
                  Runs anywhere
                </div>
                <p>
                  Local terminal, remote server, SSH session. If you have
                  ZSH or Bash, Lacy works. No GUI, no daemon, no background
                  process.
                </p>
              </div>
              <div className="how-cell">
                <div className="how-cell-head">
                  <span
                    className="dot"
                    style={{ background: "var(--violet)" }}
                  />
                  Stays local
                </div>
                <p>
                  Lacy runs on your machine. Nothing leaves unless you
                  send it to your agent. MIT licensed, no telemetry, open
                  source.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* bottom — full-bleed beam behind */}
        <div className="bottom-beam-wrap">
          <HeroBeam />
          <section className="cta-section wrap">
            <h2>
              Stop context-switching.
              <br />
              Start shipping.
            </h2>
            <div
              className="cta-section-cmd"
              role="button"
              tabIndex={0}
              aria-label={bottomCopied ? "Copied to clipboard" : "curl -fsSL https://lacy.sh/install | bash"}
              onClick={copyBottom}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  copyBottom();
                }
              }}
              data-umami-event="cta-install-copy"
            >
              <span className="p">$ </span>
              {bottomCopied
                ? "copied to clipboard"
                : "curl -fsSL https://lacy.sh/install | bash"}
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot">
            <span className="foot-left">
              Built by{" "}
              <a
                href="https://lacymorrow.com"
                target="_blank"
                rel="noopener"
              >
                Lacy Morrow
              </a>
            </span>
            <div className="foot-right">
              <a href="#how">docs</a>
              <a
                href="https://github.com/lacymorrow/lacy"
                target="_blank"
                rel="noopener"
              >
                source
              </a>
              <a
                href="https://github.com/lacymorrow/lacy/issues"
                target="_blank"
                rel="noopener"
              >
                issues
              </a>
              <a
                href="https://github.com/lacymorrow/lacy/blob/main/LICENSE"
                target="_blank"
                rel="noopener"
              >
                mit
              </a>
              <a
                href="https://github.com/lacymorrow/lacy/blob/main/PRIVACY.md"
                target="_blank"
                rel="noopener"
              >
                privacy
              </a>
              <a href="/vs/shell-gpt">vs ShellGPT</a>
              <a href="/vs/warp">vs Warp</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
