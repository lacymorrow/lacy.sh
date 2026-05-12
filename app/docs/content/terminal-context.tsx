import DocsCallout from "../DocsCallout";
import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "Terminal Context",
  description: "How Lacy injects delta-based terminal context into AI queries.",
};

export default function TerminalContext() {
  return (
    <article className="doc-article reveal">
      <h1>Terminal Context</h1>
      <p className="doc-lead">
        When you send a query to your AI tool, Lacy prepends relevant terminal context —
        current directory, git branch, recent commands, last exit code, and terminal output.
        Only what changed since the last query is included.
      </p>

      <section>
        <h2>What gets sent</h2>
        <DocsCodeBlock lang="text">
          {`[cwd: /path/to/project] [git: main] [exit: 1] [recent: npm test]
[terminal-output]
npm ERR! Test failed. See above for more details.
[/terminal-output]
why did that fail?`}
        </DocsCodeBlock>
        <p>Each context field is only included when it has changed since the last query:</p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Included when</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>cwd</code></td>
                <td>Directory changed since last query</td>
              </tr>
              <tr>
                <td><code>git</code></td>
                <td>Branch changed since last query (detached HEAD shows short hash)</td>
              </tr>
              <tr>
                <td><code>exit</code></td>
                <td>Non-zero exit AND a shell command ran since the last query</td>
              </tr>
              <tr>
                <td><code>recent</code></td>
                <td>Shell commands run since last query (ring buffer, max 10)</td>
              </tr>
              <tr>
                <td><code>terminal-output</code></td>
                <td>Last terminal output (tmux/screen/iTerm2/Terminal.app), when available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Terminal output capture</h2>
        <p>
          Lacy lazily captures terminal output at query time using your terminal's API.
          Supported integrations:
        </p>
        <ul className="doc-list">
          <li><strong>tmux</strong> — <code>tmux capture-pane</code> (checked first inside multiplexers)</li>
          <li><strong>screen</strong> — <code>screen -X hardcopy</code></li>
          <li><strong>iTerm2</strong> — AppleScript <code>get content</code></li>
          <li><strong>Terminal.app</strong> — AppleScript <code>get contents</code></li>
        </ul>
        <p>
          Output is stripped of ANSI escape codes and capped at 50 lines (configurable).
          If no terminal API is available, terminal output is omitted.
        </p>
        <DocsCallout type="note">
          <p>
            tmux and screen are checked first. Terminal emulator APIs (iTerm2, Terminal.app) return
            the wrong content when running inside a multiplexer.
          </p>
        </DocsCallout>
      </section>

      <section>
        <h2>Delta tracking</h2>
        <p>
          Context is delta-based to avoid redundant noise. Each agent query resets the counters,
          so the next query starts fresh. The <code>/new</code> session command also clears all
          context state.
        </p>
        <p>
          Recent commands use an explicit ring buffer, not shell history — this prevents
          agent queries themselves from leaking into the context.
        </p>
      </section>

      <section>
        <h2>Configuration</h2>
        <DocsCodeBlock lang="yaml">
          {`# ~/.lacy/config.yaml
context:
  output_lines: 50   # max terminal output lines (default: 50)`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Starting a fresh session</h2>
        <DocsCodeBlock lang="bash">
          {`/new     # clears all context state; next query sends full context`}
        </DocsCodeBlock>
      </section>
    </article>
  );
}
