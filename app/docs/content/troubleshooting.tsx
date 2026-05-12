import DocsCodeBlock from "../DocsCodeBlock";
import DocsCallout from "../DocsCallout";

export const meta = {
  title: "Troubleshooting",
  description: "Common issues, fixes, and diagnostic commands for Lacy Shell.",
};

export default function Troubleshooting() {
  return (
    <article className="doc-article reveal">
      <h1>Troubleshooting</h1>
      <p className="doc-lead">
        Start with <code>lacy doctor</code> — it diagnoses the most common issues automatically.
      </p>

      <section>
        <h2>lacy doctor</h2>
        <DocsCodeBlock lang="bash">
          {`lacy doctor`}
        </DocsCodeBlock>
        <p>Checks: installation path, shell config sourcing, AI tool availability, PATH, version.</p>
      </section>

      <section>
        <h2>Common issues</h2>

        <h3>Plugin not loading</h3>
        <p>Verify the source line is in your shell config:</p>
        <DocsCodeBlock lang="bash">
          {`grep "lacy" ~/.zshrc      # ZSH
grep "lacy" ~/.bashrc     # Bash`}
        </DocsCodeBlock>
        <p>If missing, re-run the installer or add manually:</p>
        <DocsCodeBlock lang="bash">
          {`echo 'source ~/.lacy/lacy.plugin.zsh' >> ~/.zshrc
source ~/.zshrc`}
        </DocsCodeBlock>

        <h3>No AI tool found</h3>
        <DocsCodeBlock lang="bash">
          {`tool   # shows available tools and what Lacy detected`}
        </DocsCodeBlock>
        <p>
          If no tool is installed, install lash (recommended):
        </p>
        <DocsCodeBlock lang="bash">
          {`curl -fsSL https://lash.lacy.sh/install | bash`}
        </DocsCodeBlock>

        <h3>Indicator not showing</h3>
        <p>
          The indicator requires ZSH with ZLE. Check your shell:
        </p>
        <DocsCodeBlock lang="bash">
          {`echo $SHELL   # should be /bin/zsh or similar`}
        </DocsCodeBlock>
        <p>
          In Bash, there is no real-time indicator — only a PS1 badge that updates after each command.
        </p>

        <h3>Commands routing to wrong destination</h3>
        <p>
          Check current mode and toggle if needed:
        </p>
        <DocsCodeBlock lang="bash">
          {`mode          # check current mode
mode auto     # reset to auto
# Or press Ctrl+Space to cycle modes`}
        </DocsCodeBlock>

        <h3>Reroute triggering unexpectedly</h3>
        <p>
          Post-execution reroute only fires in Auto mode when both error pattern and NL signal match.
          Check if you&apos;re in Auto mode (<code>mode</code>) and whether your command output matches
          a known error pattern.
        </p>

        <h3>zsh-autosuggestions conflicts</h3>
        <p>
          Ensure Lacy is sourced <em>after</em> <code>zsh-autosuggestions</code> in your <code>.zshrc</code>.
          Lacy handles coexistence by tagging its <code>region_highlight</code> entries with <code>memo=lacy</code>
          and coordinating <code>POSTDISPLAY</code> access.
        </p>

        <h3>Bash 3.2 on macOS</h3>
        <DocsCallout type="warning">
          <p>
            macOS ships Bash 3.2. Lacy requires 4+. Install: <code>brew install bash</code>, then update your shell.
          </p>
        </DocsCallout>
      </section>

      <section>
        <h2>Emergency bypass</h2>
        <p>
          If Lacy routes something wrong, prefix with <code>!</code> to force shell execution:
        </p>
        <DocsCodeBlock lang="bash">
          {`!your-command-here   # always runs in shell`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Still stuck?</h2>
        <ul className="doc-list">
          <li>Run <code>lacy status</code> and <code>lacy doctor</code> and include the output</li>
          <li>Open an issue: <a href="https://github.com/lacymorrow/lacy/issues" target="_blank" rel="noopener noreferrer">github.com/lacymorrow/lacy/issues</a></li>
        </ul>
      </section>
    </article>
  );
}
