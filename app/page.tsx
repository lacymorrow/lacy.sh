"use client";

import { useState, useCallback } from "react";
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
];

const tools = [
  {
    name: "lash",
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
    cmd: 'opencode run "query"',
    note: "",
  },
  {
    name: "gemini",
    color: "var(--green)",
    cmd: 'gemini -p "query"',
    note: "Google",
  },
  {
    name: "codex",
    color: "var(--fg-3)",
    cmd: 'codex exec "query"',
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
              <a href="#how">How it works</a>
              <a href="#tools">Tools</a>
              <a
                href="https://github.com/lacymorrow/lacy"
                target="_blank"
                rel="noopener"
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
            <div className="hero-label reveal">your terminal, upgraded</div>
            <h1 className="reveal reveal-d1">
              Talk to
              <br />
              your <em>shell</em>
            </h1>
            <p className="hero-desc reveal reveal-d2">
              Type commands or natural language.{" "}
              <strong>Commands run in your shell.</strong>{" "}
              <strong>Questions go to AI.</strong> No mode switching. No
              prefixes. You type, it figures it out.
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
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="install-body">
                <button
                  className="copy-btn"
                  aria-label="Copy to clipboard"
                  onClick={copyInstall}
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

          {/* demo */}
          <section className="demo" id="demo">
            <div className="demo-label">What it looks like</div>
            <div className="demo-lines">
              {demoLines.map((line, i) =>
                line.output ? (
                  <div className="dl" key={i}>
                    <div
                      className="dl-bar"
                      style={{ background: "transparent" }}
                    />
                    <span />
                    <span className="dl-out">{line.output}</span>
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

          {/* how */}
          <section className="how" id="how">
            <div className="how-label">How it works</div>
            <h2>
              Commands run.
              <br />
              Questions route.
            </h2>
            <p className="how-desc">
              Lacy intercepts your input before the shell sees it. If the first
              word is a valid command, it executes normally. If it looks like
              natural language, it goes to your AI tool.
            </p>
            <div className="how-grid">
              <div className="how-cell">
                <div className="how-cell-head">
                  <span
                    className="dot"
                    style={{ background: "var(--green)" }}
                  />
                  Auto-detect
                </div>
                <p>
                  First word is a valid command? Shell. Multi-word and not a
                  command? AI. Single unknown word? Shell (let it error).
                </p>
              </div>
              <div className="how-cell">
                <div className="how-cell-head">
                  <span
                    className="dot"
                    style={{ background: "var(--magenta)" }}
                  />
                  Live indicator
                </div>
                <p>
                  A colored bar at your prompt changes as you type. Green means
                  shell. Magenta means AI. You always know.
                </p>
              </div>
              <div className="how-cell">
                <div className="how-cell-head">
                  <span
                    className="dot"
                    style={{ background: "var(--violet)" }}
                  />
                  Preheated
                </div>
                <p>
                  Background servers and session reuse eliminate cold-start. Your
                  AI tool is ready before you finish typing.
                </p>
              </div>
              <div className="how-cell">
                <div className="how-cell-head">
                  <span
                    className="dot"
                    style={{ background: "var(--blue)" }}
                  />
                  No API keys
                </div>
                <p>
                  Each AI CLI handles its own auth. Lacy just routes. Nothing to
                  configure beyond picking a tool.
                </p>
              </div>
            </div>
          </section>

          <hr className="rule" />

          {/* tools */}
          <section className="tools" id="tools">
            <div className="tools-label">Supported tools</div>
            <div className="tools-list">
              {tools.map((tool) => (
                <div className="tool-row" key={tool.name}>
                  <div className="tool-name">
                    <span
                      className="dot"
                      style={{ background: tool.color }}
                    />
                    {tool.name}
                  </div>
                  <div className="tool-cmd">{tool.cmd}</div>
                  <div className="tool-note">{tool.note}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="rule" />

          {/* modes */}
          <section className="modes" id="modes">
            <div className="modes-label">Modes</div>
            <div className="modes-row">
              <div className="mode-cell">
                <div
                  className="mode-cell-bar"
                  style={{ background: "var(--green)" }}
                />
                <h3>Shell</h3>
                <p>Everything goes to your shell. Normal terminal.</p>
                <span className="key">Ctrl+Space</span>
              </div>
              <div className="mode-cell">
                <div
                  className="mode-cell-bar"
                  style={{ background: "var(--magenta)" }}
                />
                <h3>Agent</h3>
                <p>Everything goes to AI. Every line is a prompt.</p>
                <span className="key">Ctrl+Space</span>
              </div>
              <div className="mode-cell">
                <div
                  className="mode-cell-bar"
                  style={{ background: "var(--blue)" }}
                />
                <h3>Auto</h3>
                <p>Smart routing. Commands to shell, questions to AI.</p>
                <span className="key">default</span>
              </div>
            </div>
          </section>

          {/* bottom */}
          <section className="bottom">
            <div className="bottom-beam-wrap">
              <HeroBeam />
            </div>
            <h2>
              Open terminal.
              <br />
              Type naturally.
              <br />
              Ship code.
            </h2>
            <div
              className="bottom-cmd"
              role="button"
              tabIndex={0}
              aria-label="Copy install command"
              onClick={copyBottom}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  copyBottom();
                }
              }}
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
            <span className="foot-left">lacy.sh</span>
            <div className="foot-right">
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
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
