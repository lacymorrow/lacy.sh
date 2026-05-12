import DocsCodeBlock from "../DocsCodeBlock";
import DocsCallout from "../DocsCallout";

export const meta = {
  title: "Configuration",
  description: "Full reference for ~/.lacy/config.yaml — AI tools, modes, preheating, and context settings.",
};

export default function Configuration() {
  return (
    <article className="doc-article reveal">
      <h1>Configuration</h1>
      <p className="doc-lead">
        Lacy is configured via <code>~/.lacy/config.yaml</code>. All settings are optional —
        defaults work out of the box.
      </p>

      <section>
        <h2>Quick edit</h2>
        <DocsCodeBlock lang="bash">
          {`lacy config        # show current config
lacy config edit   # open in $EDITOR`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Full config reference</h2>
        <DocsCodeBlock lang="yaml">
          {`# ~/.lacy/config.yaml

agent_tools:
  # Active AI tool: lash | claude | opencode | gemini | codex | hermes | custom | (empty for auto-detect)
  active: lash
  # custom_command: "my-ai-tool --flag"   # used when active: custom

api_keys:
  # Only needed if using built-in API integration (not a CLI tool)
  openai: "sk-..."
  anthropic: "sk-..."

modes:
  # Default mode on shell start: auto | shell | agent
  default: auto

# Preheat: keep agents warm between queries (lash/opencode only)
# preheat:
#   eager: false          # Start background server on plugin load (default: false)
#   server_port: 4096     # Port for background server

# Terminal context settings
# context:
#   output_lines: 50      # Max lines of terminal output to capture (default: 50)`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>agent_tools.active</h2>
        <p>
          The AI tool Lacy uses for agent queries. Persists when you run <code>tool set &lt;name&gt;</code>.
        </p>
        <p>
          Leave empty or omit for auto-detection (first installed tool in: lash, claude, opencode, gemini, codex, hermes).
        </p>
      </section>

      <section>
        <h2>agent_tools.custom_command</h2>
        <p>
          Used when <code>active: custom</code>. Lacy appends the user query as the last argument.
        </p>
        <DocsCodeBlock lang="yaml">
          {`agent_tools:
  active: custom
  custom_command: "my-ai-tool --model gpt-4 --stream"`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>modes.default</h2>
        <p>
          The routing mode on shell start. Can be overridden at any time with the <code>mode</code>
          command or <kbd className="doc-kbd">Ctrl+Space</kbd>.
        </p>
      </section>

      <section>
        <h2>preheat</h2>
        <p>
          Preheating keeps a background server warm for lash and opencode, eliminating cold-start
          latency on the first query.
        </p>
        <DocsCallout type="note">
          <p>
            <code>eager: true</code> starts the background server when your shell loads.
            <code>eager: false</code> (default) starts it on first query.
          </p>
        </DocsCallout>
      </section>

      <section>
        <h2>context.output_lines</h2>
        <p>
          Maximum lines of terminal output to capture and send with agent queries.
          Set to <code>0</code> to disable terminal output capture entirely.
        </p>
      </section>
    </article>
  );
}
