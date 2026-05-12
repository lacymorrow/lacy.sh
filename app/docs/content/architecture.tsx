import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "Architecture",
  description: "File tree, module map, entry points, and data flow for Lacy Shell.",
};

export default function Architecture() {
  return (
    <article className="doc-article reveal">
      <h1>Architecture</h1>
      <p className="doc-lead">
        Lacy Shell is a pure bash/zsh plugin with a Node.js installer package. All core logic
        lives in <code>~/.lacy/</code>. No runtime dependencies in the shell path.
      </p>

      <section>
        <h2>File tree</h2>
        <DocsCodeBlock lang="text">
          {`~/.lacy/
├── lacy.plugin.zsh          # Entry point (ZSH)
├── lacy.plugin.bash         # Entry point (Bash 4+)
├── config.yaml              # User configuration
├── install.sh               # Installer (bash + npx fallback)
├── uninstall.sh             # Uninstaller
├── bin/
│   └── lacy                 # Standalone CLI (no Node required)
└── lib/
    ├── core/                    # Shared modules (Bash 4+ and ZSH)
    │   ├── constants.sh         # Colors, timeouts, paths, detection arrays
    │   ├── config.sh            # YAML config, API key management
    │   ├── modes.sh             # Mode state (shell/agent/auto)
    │   ├── spinner.sh           # Loading spinner with shimmer text effect
    │   ├── mcp.sh               # Multi-tool routing (LACY_TOOL_CMD registry)
    │   ├── preheat.sh           # Background server + session reuse
    │   ├── context.sh           # Delta-based terminal context
    │   ├── detection.sh         # classify_input(), detect_natural_language()
    │   └── commands.sh          # Shared commands: mode, tool, session, quit
    ├── zsh/
    │   ├── keybindings.zsh      # Ctrl+Space toggle, indicator, region_highlight
    │   ├── prompt.zsh           # Prompt with indicator, mode in RPS1
    │   └── execute.zsh          # Execution routing, reroute, slash-command interception
    └── bash/
        ├── init.bash            # Bash adapter init
        ├── keybindings.bash     # Macro-based Enter override, Ctrl+Space toggle
        ├── prompt.bash          # Mode badge in PS1
        └── execute.bash         # Execution routing`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Key modules</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>lib/core/detection.sh</code></td>
                <td><strong>Single source of truth</strong> for input classification. <code>lacy_shell_classify_input()</code> is the canonical function.</td>
              </tr>
              <tr>
                <td><code>lib/core/constants.sh</code></td>
                <td>All detection arrays: <code>LACY_AGENT_WORDS</code>, <code>LACY_SHELL_RESERVED_WORDS</code>, <code>LACY_NL_MARKERS</code>, <code>LACY_SHELL_ERROR_PATTERNS</code>.</td>
              </tr>
              <tr>
                <td><code>lib/core/mcp.sh</code></td>
                <td>Tool command registry and <code>lacy_shell_query_agent()</code> routing.</td>
              </tr>
              <tr>
                <td><code>lib/core/context.sh</code></td>
                <td>Delta-based terminal context injection. <code>_lacy_build_query_context()</code>.</td>
              </tr>
              <tr>
                <td><code>lib/zsh/keybindings.zsh</code></td>
                <td>Real-time indicator, first-word <code>region_highlight</code>, plugin coexistence.</td>
              </tr>
              <tr>
                <td><code>lib/zsh/execute.zsh</code></td>
                <td>Execution routing, reroute candidates, slash-command interception.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Data flow</h2>
        <DocsCodeBlock lang="text">
          {`User types input
    │
    ▼
lacy_shell_classify_input()  ← lib/core/detection.sh
    │
    ├─ "shell"  → execute in shell
    │               │
    │               ▼
    │           exit code non-zero?
    │               │ yes
    │               ▼
    │           lacy_shell_detect_natural_language()
    │               │ match
    │               ▼
    │           reroute to agent ──────────────────┐
    │                                              │
    └─ "agent"  → _lacy_build_query_context()      │
                    │                              │
                    ▼                              │
                lacy_shell_query_agent() ◄─────────┘
                    │
                    ▼
                Run LACY_TOOL_CMD with context-prefixed query`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>npm package</h2>
        <p>
          The <code>lacy</code> npm package (<code>packages/lacy/</code>) is only the interactive
          Node.js installer/setup UI, built with <code>@clack/prompts</code>. It is not loaded
          in the shell path — it runs via <code>npx lacy@latest</code> when needed and falls back
          to bash automatically.
        </p>
      </section>
    </article>
  );
}
