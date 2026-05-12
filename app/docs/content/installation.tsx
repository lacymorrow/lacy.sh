import DocsCallout from "../DocsCallout";
import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "Installation",
  description: "Install Lacy Shell via curl, Homebrew, npx, or manually from GitHub.",
};

export default function Installation() {
  return (
    <article className="doc-article reveal">
      <h1>Installation</h1>
      <p className="doc-lead">
        Lacy Shell installs to <code>~/.lacy</code> and hooks into your shell by adding a single
        <code>source</code> line to your shell config file.
      </p>

      <section>
        <h2>Prerequisites</h2>
        <ul className="doc-list">
          <li><strong>ZSH</strong> or <strong>Bash 4+</strong> — macOS default is Bash 3.2; upgrade with <code>brew install bash</code></li>
          <li>An AI CLI tool installed and working: lash, claude, opencode, gemini, codex, hermes, or a custom command. Lacy will prompt to install <a href="https://lash.lacy.sh" target="_blank" rel="noopener noreferrer">lash</a> if none is detected.</li>
          <li>Internet access for the curl/npx methods</li>
        </ul>
      </section>

      <section>
        <h2>curl (recommended)</h2>
        <p>One-line install. Downloads directly from lacy.sh and runs the bash installer:</p>
        <DocsCodeBlock lang="bash">
          {`curl -fsSL https://lacy.sh/install | bash`}
        </DocsCodeBlock>
        <p>
          The installer detects your shell (ZSH or Bash), adds the source line to the correct
          config file, and optionally runs interactive setup.
        </p>
      </section>

      <section>
        <h2>Homebrew</h2>
        <DocsCodeBlock lang="bash">
          {`brew install lacymorrow/tap/lacy`}
        </DocsCodeBlock>
        <p>Updates via <code>brew upgrade lacy</code>.</p>
      </section>

      <section>
        <h2>npx</h2>
        <p>Runs the Node-based interactive installer with a rich CLI UI:</p>
        <DocsCodeBlock lang="bash">
          {`npx lacy`}
        </DocsCodeBlock>
        <DocsCallout type="note">
          <p>Node.js 18+ required. Falls back to the bash installer if Node is unavailable.</p>
        </DocsCallout>
      </section>

      <section>
        <h2>Manual (git clone)</h2>
        <DocsCodeBlock lang="bash">
          {`git clone https://github.com/lacymorrow/lacy.git ~/.lacy
# ZSH:
echo 'source ~/.lacy/lacy.plugin.zsh' >> ~/.zshrc
# Bash:
echo 'source ~/.lacy/lacy.plugin.bash' >> ~/.bashrc`}
        </DocsCodeBlock>
        <p>Then reload your shell: <code>source ~/.zshrc</code> or open a new terminal.</p>
      </section>

      <section>
        <h2>Verifying the install</h2>
        <DocsCodeBlock lang="bash">
          {`lacy status`}
        </DocsCodeBlock>
        <p>Shows the installed version, active AI tool, and current mode.</p>
        <DocsCodeBlock lang="bash">
          {`lacy doctor`}
        </DocsCodeBlock>
        <p>Diagnoses common issues — missing AI tool, misconfigured shell, etc.</p>
      </section>

      <section>
        <h2>Updating</h2>
        <DocsCodeBlock lang="bash">
          {`lacy update`}
        </DocsCodeBlock>
        <p>Pulls the latest changes from GitHub and reloads the plugin.</p>
      </section>

      <section>
        <h2>Uninstalling</h2>
        <DocsCodeBlock lang="bash">
          {`lacy uninstall`}
        </DocsCodeBlock>
        <p>
          Removes <code>~/.lacy</code> and the source line from your shell config.
          Uses the Node UI if available, or the bash fallback.
        </p>
      </section>

      <section>
        <h2>Shell config files</h2>
        <p>Lacy adds one line to your shell config. The location depends on your shell:</p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Shell</th>
                <th>Config file</th>
                <th>Line added</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ZSH</td>
                <td><code>~/.zshrc</code></td>
                <td><code>source ~/.lacy/lacy.plugin.zsh</code></td>
              </tr>
              <tr>
                <td>Bash</td>
                <td><code>~/.bashrc</code> or <code>~/.bash_profile</code></td>
                <td><code>source ~/.lacy/lacy.plugin.bash</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
