import DocsCallout from "../DocsCallout";
import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "Quick Start",
  description: "Get up and running with Lacy Shell in 5 minutes.",
};

export default function QuickStart() {
  return (
    <article className="doc-article reveal">
      <h1>Quick Start</h1>
      <p className="doc-lead">
        After installing, you're ready to go. Here's everything you need in 5 minutes.
      </p>

      <section>
        <h2>Step 1 — Reload your shell</h2>
        <DocsCodeBlock lang="bash">
          {`source ~/.zshrc   # ZSH
# or open a new terminal`}
        </DocsCodeBlock>
        <p>
          You'll see the lacy indicator appear to the left of your prompt. It changes color
          as you type — green for shell, magenta for agent.
        </p>
      </section>

      <section>
        <h2>Step 2 — Type a command</h2>
        <p>Shell commands work exactly as before:</p>
        <div className="dl-demo">
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">ls -la</span>
            <span className="dl-tag shell">shell</span>
          </div>
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">cd ~/projects && git status</span>
            <span className="dl-tag shell">shell</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Step 3 — Ask a question</h2>
        <p>Natural language routes to AI automatically:</p>
        <div className="dl-demo">
          <div className="dl">
            <span className="dl-bar m" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">what files changed in the last commit</span>
            <span className="dl-tag agent">agent</span>
          </div>
          <div className="dl">
            <span className="dl-bar m" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">fix the failing test in src/auth.ts</span>
            <span className="dl-tag agent">agent</span>
          </div>
          <div className="dl">
            <span className="dl-bar m" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">explain what this does</span>
            <span className="dl-tag agent">agent</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Step 4 — Switch modes</h2>
        <p>
          Press <kbd className="doc-kbd">Ctrl+Space</kbd> to cycle through modes: Auto → Shell → Agent → Auto.
        </p>
        <p>
          Or use the <code>mode</code> command:
        </p>
        <DocsCodeBlock lang="bash">
          {`mode         # show current mode
mode shell   # lock to shell-only
mode agent   # lock to agent-only
mode auto    # back to auto routing`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Step 5 — Check your AI tool</h2>
        <DocsCodeBlock lang="bash">
          {`tool   # shows active tool and available tools`}
        </DocsCodeBlock>
        <p>
          If no tool is detected, Lacy will prompt to install <a href="https://lash.lacy.sh" target="_blank" rel="noopener noreferrer">lash</a>.
          To set a specific tool:
        </p>
        <DocsCodeBlock lang="bash">
          {`tool set lash      # recommended
tool set claude    # Claude Code
tool set gemini    # Google Gemini`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Session commands</h2>
        <p>Manage AI conversation sessions:</p>
        <DocsCodeBlock lang="bash">
          {`/new       # start a fresh session
/resume    # resume last session
/clear     # same as /new`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Emergency bypass</h2>
        <p>
          If lacy ever routes something wrong, prefix with <code>!</code> to force shell execution:
        </p>
        <DocsCodeBlock lang="bash">
          {`!rm -rf build/   # forces shell execution regardless of mode`}
        </DocsCodeBlock>
      </section>

      <DocsCallout type="tip">
        <p>
          Run <code>lacy setup</code> for an interactive menu to configure your AI tool, default mode, and other settings.
        </p>
      </DocsCallout>
    </article>
  );
}
