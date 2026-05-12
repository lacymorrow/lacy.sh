import DocsCodeBlock from "../DocsCodeBlock";
import DocsCallout from "../DocsCallout";

export const meta = {
  title: "Commands Reference",
  description: "All Lacy Shell in-shell commands — mode, tool, session, ask, and keybindings.",
};

export default function CommandsReference() {
  return (
    <article className="doc-article reveal">
      <h1>Commands Reference</h1>
      <p className="doc-lead">
        Lacy intercepts certain commands before they reach your shell. These run inside the plugin.
      </p>

      <section>
        <h2>mode</h2>
        <DocsCodeBlock lang="bash">
          {`mode                 # show current mode + color legend
mode auto            # smart auto-routing (default)
mode shell           # force all input to shell
mode agent           # force all input to agent`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>tool</h2>
        <DocsCodeBlock lang="bash">
          {`tool                        # show active tool + available tools
tool set lash               # set active tool (persists to config.yaml)
tool set claude
tool set opencode
tool set gemini
tool set codex
tool set hermes
tool set custom "cmd --flag" # set a custom AI command`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>ask</h2>
        <DocsCodeBlock lang="bash">
          {`ask "what does this do"    # direct query to agent`}
        </DocsCodeBlock>
        <p>Forces agent routing regardless of current mode.</p>
      </section>

      <section>
        <h2>Session commands</h2>
        <p>Session commands are prefixed with <code>/</code> and intercepted before shell execution:</p>
        <DocsCodeBlock lang="bash">
          {`/new        # start a fresh AI conversation
/reset      # same as /new
/clear      # same as /new
/resume     # resume the last saved session`}
        </DocsCodeBlock>
        <DocsCallout type="note">
          <p>
            <code>/new</code> also clears all terminal context state. The next query sends full context.
          </p>
        </DocsCallout>
      </section>

      <section>
        <h2>Quit</h2>
        <DocsCodeBlock lang="bash">
          {`quit    # exit lacy shell
stop    # same
exit    # same`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Keybindings</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Action</th>
                <th>Shell</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><kbd className="doc-kbd">Ctrl+Space</kbd></td>
                <td>Toggle mode: Auto → Shell → Agent → Auto</td>
                <td>ZSH + Bash</td>
              </tr>
              <tr>
                <td><kbd className="doc-kbd">→</kbd> or <kbd className="doc-kbd">Tab</kbd></td>
                <td>Accept ghost text suggestion (ZSH only)</td>
                <td>ZSH</td>
              </tr>
              <tr>
                <td><kbd className="doc-kbd">Ctrl+C</kbd> (×2)</td>
                <td>Quit lacy</td>
                <td>ZSH + Bash</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Emergency bypass</h2>
        <p>
          Prefix any input with <code>!</code> to force shell execution, regardless of mode:
        </p>
        <DocsCodeBlock lang="bash">
          {`!rm -rf build/   # forces shell, never routes to agent`}
        </DocsCodeBlock>
      </section>
    </article>
  );
}
