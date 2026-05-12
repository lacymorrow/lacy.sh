import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "CLI Reference",
  description: "All lacy CLI commands — setup, status, doctor, update, config, and more.",
};

export default function CliReference() {
  return (
    <article className="doc-article reveal">
      <h1>CLI Reference</h1>
      <p className="doc-lead">
        After installation, the <code>lacy</code> command is available in your PATH (<code>~/.lacy/bin</code>).
        It's a pure bash binary with zero dependencies.
      </p>

      <section>
        <h2>Commands</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>lacy setup</code></td>
                <td>Interactive settings: AI tool, mode, config. Uses Node UI if available.</td>
              </tr>
              <tr>
                <td><code>lacy status</code></td>
                <td>Show installation status, active tool, current mode, version.</td>
              </tr>
              <tr>
                <td><code>lacy doctor</code></td>
                <td>Diagnose common issues: missing AI tool, shell config, PATH.</td>
              </tr>
              <tr>
                <td><code>lacy update</code></td>
                <td>Pull latest changes from GitHub and reload.</td>
              </tr>
              <tr>
                <td><code>lacy config</code></td>
                <td>Show current configuration.</td>
              </tr>
              <tr>
                <td><code>lacy config edit</code></td>
                <td>Open config.yaml in <code>$EDITOR</code>.</td>
              </tr>
              <tr>
                <td><code>lacy install</code></td>
                <td>Run the installer (delegates to npx or curl).</td>
              </tr>
              <tr>
                <td><code>lacy reinstall</code></td>
                <td>Fresh installation from scratch.</td>
              </tr>
              <tr>
                <td><code>lacy uninstall</code></td>
                <td>Remove Lacy Shell. Uses Node UI if available.</td>
              </tr>
              <tr>
                <td><code>lacy version</code></td>
                <td>Show installed version.</td>
              </tr>
              <tr>
                <td><code>lacy help</code></td>
                <td>Show all commands and usage.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Hybrid Node delegation</h2>
        <p>
          <code>setup</code>, <code>install</code>, and <code>uninstall</code> try <code>npx lacy@latest</code>
          first for the rich <code>@clack/prompts</code> UI, then fall back to bash if Node is unavailable.
        </p>
        <p>Force bash-only mode:</p>
        <DocsCodeBlock lang="bash">
          {`LACY_NO_NODE=1 lacy setup`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Testing local changes</h2>
        <p>
          <code>bin/lacy</code> delegates to <code>npx lacy@latest</code> (the published npm package),
          not local code. To test local changes to the Node installer:
        </p>
        <DocsCodeBlock lang="bash">
          {`# Run local Node installer directly
node packages/lacy/index.mjs

# Force bash fallback (skips npx entirely)
LACY_NO_NODE=1 bin/lacy setup`}
        </DocsCodeBlock>
      </section>
    </article>
  );
}
