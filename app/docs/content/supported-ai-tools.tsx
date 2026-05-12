import DocsCallout from "../DocsCallout";
import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "Supported AI Tools",
  description: "All AI backends supported by Lacy Shell — lash, claude, opencode, gemini, codex, hermes, and custom commands.",
};

export default function SupportedAiTools() {
  return (
    <article className="doc-article reveal">
      <h1>Supported AI Tools</h1>
      <p className="doc-lead">
        Lacy works with any AI CLI that accepts a query argument. All tools handle their own
        authentication — no API keys are needed from Lacy.
      </p>

      <section>
        <h2>Available tools</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Command</th>
                <th>Prompt flag</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>lash</strong></td>
                <td><code>lash run -c &quot;query&quot;</code></td>
                <td><code>-c</code></td>
                <td>Recommended. Preheating support.</td>
              </tr>
              <tr>
                <td><strong>claude</strong></td>
                <td><code>claude -p &quot;query&quot;</code></td>
                <td><code>-p</code></td>
                <td>Claude Code. Session reuse via <code>--resume</code>.</td>
              </tr>
              <tr>
                <td><strong>opencode</strong></td>
                <td><code>opencode run -c &quot;query&quot;</code></td>
                <td><code>-c</code></td>
                <td>Preheating support.</td>
              </tr>
              <tr>
                <td><strong>gemini</strong></td>
                <td><code>gemini --resume -p &quot;query&quot;</code></td>
                <td><code>-p</code></td>
                <td>Google Gemini.</td>
              </tr>
              <tr>
                <td><strong>codex</strong></td>
                <td><code>codex exec resume --last &quot;query&quot;</code></td>
                <td>positional</td>
                <td>OpenAI Codex CLI.</td>
              </tr>
              <tr>
                <td><strong>hermes</strong></td>
                <td><code>hermes chat -q &quot;query&quot;</code></td>
                <td><code>-q</code></td>
                <td>Local/open-source models.</td>
              </tr>
              <tr>
                <td><strong>custom</strong></td>
                <td>user-defined</td>
                <td>user-defined</td>
                <td>Any CLI tool.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Selecting a tool</h2>
        <DocsCodeBlock lang="bash">
          {`tool              # show active tool + available tools
tool set lash     # set active tool
tool set claude
tool set gemini`}
        </DocsCodeBlock>
        <p>The active tool persists to <code>~/.lacy/config.yaml</code>.</p>
      </section>

      <section>
        <h2>Auto-detection</h2>
        <p>
          When <code>agent_tools.active</code> is empty in config, Lacy auto-detects the
          first installed tool in this priority order: lash → claude → opencode → gemini → codex → hermes.
        </p>
        <p>
          If no tool is detected on first run, Lacy prompts to install lash.
        </p>
      </section>

      <section>
        <h2>Custom tool</h2>
        <DocsCodeBlock lang="bash">
          {`tool set custom "my-ai-tool --flag"
# or in config.yaml:
# agent_tools:
#   active: custom
#   custom_command: "my-ai-tool --flag"`}
        </DocsCodeBlock>
        <p>
          Lacy appends the user query as the last argument. Your command should accept the query
          as its final positional argument.
        </p>
      </section>

      <section>
        <h2>Preheating</h2>
        <p>
          lash and opencode support <strong>preheating</strong> — a background server that stays
          warm between queries, eliminating cold-start latency.
        </p>
        <DocsCodeBlock lang="yaml">
          {`# ~/.lacy/config.yaml
# preheat:
#   eager: false        # Start background server on plugin load
#   server_port: 4096   # Port for background server`}
        </DocsCodeBlock>
        <p>
          Claude uses <code>--resume SESSION_ID</code> for conversation continuity instead of a
          background server. Other tools have no preheating.
        </p>
      </section>

      <section>
        <h2>lash (recommended)</h2>
        <p>
          lash is an opencode fork built by the same author as Lacy. It's the recommended default
          for the best integration experience, including preheating, session management, and
          tight context passing.
        </p>
        <DocsCodeBlock lang="bash">
          {`# Install lash
curl -fsSL https://lash.lacy.sh/install | bash`}
        </DocsCodeBlock>
        <DocsCallout type="tip">
          <p>
            During Lacy installation, if no AI tool is detected, you'll be prompted to install lash automatically.
          </p>
        </DocsCallout>
      </section>
    </article>
  );
}
