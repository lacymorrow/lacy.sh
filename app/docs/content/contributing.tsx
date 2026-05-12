import DocsCodeBlock from "../DocsCodeBlock";
import DocsCallout from "../DocsCallout";

export const meta = {
  title: "Contributing",
  description: "How to contribute to Lacy Shell — dev setup, design principles, and PR process.",
};

export default function Contributing() {
  return (
    <article className="doc-article reveal">
      <h1>Contributing</h1>
      <p className="doc-lead">
        Contributions are welcome. Lacy is a bash/zsh plugin — no build step required for core changes.
      </p>

      <section>
        <h2>Dev setup</h2>
        <DocsCodeBlock lang="bash">
          {`git clone https://github.com/lacymorrow/lacy.git
cd lacy

# Test ZSH plugin locally:
source lacy.plugin.zsh

# Test Bash plugin locally:
source lacy.plugin.bash

# Test the Node installer:
node packages/lacy/index.mjs`}
        </DocsCodeBlock>
        <DocsCallout type="note">
          <p>
            Changes to files in the repo do not automatically update <code>~/.lacy/</code>.
            The install dir and repo are separate copies — test by sourcing from the repo directly.
          </p>
        </DocsCallout>
      </section>

      <section>
        <h2>Design principles</h2>
        <ul className="doc-list">
          <li><strong>Single source of truth</strong> — all input classification goes through <code>lacy_shell_classify_input()</code> in <code>lib/core/detection.sh</code>. Never create parallel detection logic.</li>
          <li><strong>No Node in the shell path</strong> — core plugin is pure bash. Node is only for the installer UI.</li>
          <li><strong>Zero config to start</strong> — defaults work out of the box. Progressive disclosure for advanced settings.</li>
          <li><strong>Shell commands still work</strong> — lacy never breaks your shell. Emergency bypass (<code>!</code> prefix) is always available.</li>
          <li><strong>Plugin coexistence</strong> — always tag <code>region_highlight</code> entries with <code>memo=lacy</code>. Never clear the array directly.</li>
        </ul>
      </section>

      <section>
        <h2>Adding a new AI tool</h2>
        <p>To add support for a new AI CLI tool:</p>
        <ol className="doc-list doc-list-ol">
          <li>Add the tool to <code>LACY_SUPPORTED_TOOLS</code> in <code>lib/core/constants.sh</code></li>
          <li>Add the command template to <code>lacy_tool_cmd()</code> in <code>lib/core/mcp.sh</code></li>
          <li>Update the tool table in <code>CLAUDE.md</code> and this documentation</li>
          <li>Add auto-detection logic in <code>lib/core/config.sh</code> if the tool has a standard install path</li>
        </ol>
      </section>

      <section>
        <h2>Conventional commits</h2>
        <DocsCodeBlock lang="text">
          {`feat: add new AI tool support
fix: correct agent word detection for "in" prefix
chore: update dependencies
docs: clarify reroute threshold`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>PR process</h2>
        <ul className="doc-list">
          <li>Open an issue first for significant changes</li>
          <li>Test in both ZSH and Bash 4+ (macOS Bash 3.2 is not supported)</li>
          <li>Verify <code>lacy doctor</code> passes after your change</li>
          <li>Update <code>CLAUDE.md</code> if you change any of the canonical functions or detection logic</li>
        </ul>
      </section>
    </article>
  );
}
