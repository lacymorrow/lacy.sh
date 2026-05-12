import DocsCallout from "../DocsCallout";

export const meta = {
  title: "Shell Differences",
  description: "Feature matrix comparing ZSH and Bash 4+ support in Lacy Shell.",
};

export default function ShellDifferences() {
  return (
    <article className="doc-article reveal">
      <h1>Shell Differences</h1>
      <p className="doc-lead">
        Lacy supports both ZSH and Bash 4+, but ZSH gets a richer feature set due to the ZLE
        (Zsh Line Editor) API. Here&apos;s the full matrix.
      </p>

      <section>
        <h2>Feature matrix</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>ZSH</th>
                <th>Bash 4+</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Auto routing (shell vs agent)</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Mode switching (Ctrl+Space)</td>
                <td>✓</td>
                <td>✓ (via macro)</td>
              </tr>
              <tr>
                <td>Real-time indicator (colors as you type)</td>
                <td>✓</td>
                <td>—</td>
              </tr>
              <tr>
                <td>First-word syntax highlighting</td>
                <td>✓</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Ghost text suggestions after reroute</td>
                <td>✓</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Right-prompt mode badge (RPS1)</td>
                <td>✓</td>
                <td>—</td>
              </tr>
              <tr>
                <td>PS1 mode badge</td>
                <td>—</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Terminal context injection</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Post-execution reroute (Layer 2)</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Session management (/new, /resume)</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Emergency bypass (!prefix)</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>zsh-autosuggestions coexistence</td>
                <td>✓</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Bash adapter notes</h2>
        <h3>Enter key</h3>
        <p>
          Can&apos;t use <code>bind -x</code> directly on <code>\C-m</code> — it replaces accept-line
          entirely. Instead, Lacy binds classification to a hidden key (<code>\C-x\C-l</code>)
          and makes <code>\C-m</code> a macro: <code>{`"\\C-x\\C-l\\C-j"`}</code> (classify, then accept-line).
        </p>

        <h3>Spinner in Bash</h3>
        <p>
          Background <code>{"{ ... } &"}</code> jobs dump their source on exit via bash&apos;s
          <code>[N] Done ...</code> notification. Fix: <code>disown</code> the PID immediately after
          starting.
        </p>

        <h3>No real-time indicator</h3>
        <p>
          Bash has no <code>zle-line-pre-redraw</code> equivalent. The PS1 badge updates only
          after each command runs.
        </p>

        <h3>Ctrl+Space in Bash</h3>
        <p>
          Uses macro <code>{`"\\C-a\\C-k _lacy_mode_toggle_\\C-j"`}</code> — types a hidden command
          and submits, so PROMPT_COMMAND can update PS1.
        </p>
      </section>

      <section>
        <h2>macOS Bash version</h2>
        <DocsCallout type="warning">
          <p>
            macOS ships with Bash 3.2 (GPL2 license). Lacy requires Bash 4+. Install a modern
            version: <code>brew install bash</code>, then add <code>/opt/homebrew/bin/bash</code> to
            <code>/etc/shells</code> and run <code>chsh -s /opt/homebrew/bin/bash</code>.
          </p>
        </DocsCallout>
      </section>
    </article>
  );
}
