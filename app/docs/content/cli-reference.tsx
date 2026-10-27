import Link from "next/link";
import DocsCodeBlock from "../DocsCodeBlock";
import DocsCallout from "../DocsCallout";

export const meta = {
  title: "CLI Reference",
  description:
    "Every lacy CLI command with its flags: setup, install, uninstall, update, reinstall, status, info, doctor, config, new, resume, logs, changelog, completions, version, help.",
};

export default function CliReference() {
  return (
    <article className="doc-article reveal">
      <h1>CLI Reference</h1>
      <p className="doc-lead">
        <code>lacy</code> is the command you run <em>outside</em> the plugin: install it, check
        it, point it at a different AI tool, read the query log. It is pure bash with no
        dependencies, installed to <code>~/.lacy/bin/lacy</code>.
      </p>

      <DocsCallout type="note">
        <p>
          For the commands Lacy intercepts <em>inside</em> your shell &mdash; <code>mode</code>,{" "}
          <code>tool</code>, <code>ask</code>, <code>/new</code>, <code>quit</code> &mdash; see the{" "}
          <Link href="/docs/commands-reference">Commands Reference</Link>.
        </p>
      </DocsCallout>

      <section>
        <h2>Every command</h2>
        <p>
          Run <code>lacy</code> with no arguments to open a subshell with Lacy loaded. Run{" "}
          <code>lacy help</code> to print this list in your terminal.
        </p>

        <h3>Install and update</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>lacy install</code></td>
                <td>Install Lacy Shell. Adds the source line to your rc file and <code>~/.lacy/bin</code> to your PATH.</td>
              </tr>
              <tr>
                <td><code>lacy update</code></td>
                <td>Move to the latest release. Keeps your <code>config.yaml</code>.</td>
              </tr>
              <tr>
                <td><code>lacy reinstall</code></td>
                <td>Fresh copy of the latest release. Also keeps your <code>config.yaml</code>.</td>
              </tr>
              <tr>
                <td><code>lacy uninstall</code></td>
                <td>Remove Lacy Shell. Asks for confirmation when run from a terminal.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Check and configure</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>lacy setup</code></td>
                <td>Change the AI tool, the default mode, or any config value, interactively.</td>
              </tr>
              <tr>
                <td><code>lacy status</code></td>
                <td>Install path, version, whether your rc file is wired up, the active AI tool, and which AI CLIs it can find.</td>
              </tr>
              <tr>
                <td><code>lacy doctor</code></td>
                <td>Check for the six things that usually break an install. Exits 1 if any check fails.</td>
              </tr>
              <tr>
                <td><code>lacy config</code></td>
                <td>Print <code>~/.lacy/config.yaml</code>. See the flags below for <code>edit</code> and <code>path</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Sessions, logs, and info</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>lacy new</code></td>
                <td>Forget the saved agent session. The next question starts a fresh conversation.</td>
              </tr>
              <tr>
                <td><code>lacy resume</code></td>
                <td>Print the saved session&rsquo;s tool and id, so you can pick it up in another shell.</td>
              </tr>
              <tr>
                <td><code>lacy logs</code></td>
                <td>Show the last 50 logged queries. Off unless you enable it (see below).</td>
              </tr>
              <tr>
                <td><code>lacy changelog</code></td>
                <td>Fetch and print the latest release notes.</td>
              </tr>
              <tr>
                <td><code>lacy info</code></td>
                <td>A short introduction to what Lacy does and how to try it.</td>
              </tr>
              <tr>
                <td><code>lacy completions</code></td>
                <td>Print a shell completion script. Defaults to your current shell.</td>
              </tr>
              <tr>
                <td><code>lacy version</code></td>
                <td>Print the installed version.</td>
              </tr>
              <tr>
                <td><code>lacy help</code></td>
                <td>Print every command, the in-shell commands, and the environment variables.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Flags and arguments</h2>
        <p>Four commands take arguments:</p>
        <DocsCodeBlock lang="bash">
          {`lacy config              # print config.yaml
lacy config path         # print the path to config.yaml
lacy config edit         # open it in $EDITOR (falls back to $VISUAL, then vi)

lacy logs                # last 50 queries
lacy logs 200            # last 200 queries
lacy logs all            # every query
lacy logs --count        # how many queries are logged
lacy logs --clear        # delete the log file

lacy completions zsh     # print the zsh completion script
lacy completions bash    # print the bash completion script

lacy uninstall           # prompts [y/N] on a terminal, never when piped`}
        </DocsCodeBlock>
        <p>To keep completions, write the script somewhere your shell loads it:</p>
        <DocsCodeBlock lang="bash">
          {`# zsh — a directory you own, added to fpath before compinit
mkdir -p ~/.zsh/completions
lacy completions zsh > ~/.zsh/completions/_lacy
# then in ~/.zshrc, above compinit:
#   fpath=(~/.zsh/completions $fpath)

# bash
mkdir -p ~/.local/share/bash-completion/completions
lacy completions bash > ~/.local/share/bash-completion/completions/lacy`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Query logging is off by default</h2>
        <p>
          <code>lacy logs</code> has nothing to show until you turn logging on. Lacy does not
          record your questions unless you ask it to.
        </p>
        <DocsCodeBlock lang="yaml">
          {`# ~/.lacy/config.yaml
logging:
  queries: true`}
        </DocsCodeBlock>
        <p>
          Once enabled, each query is appended to <code>~/.lacy/logs/queries.log</code> as a
          tab-separated line of timestamp, tool, and the raw query. No terminal context is
          written. The directory is <code>0700</code> and the file is <code>0600</code>, and the
          log is trimmed to the last 1000 lines once it passes 1&nbsp;MB.
        </p>
      </section>

      <section>
        <h2>When update and reinstall refuse</h2>
        <p>
          Both commands rewrite <code>~/.lacy</code>, so they stop rather than clobber an install
          they did not create:
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>If <code>~/.lacy</code> is</th>
                <th>Update instead with</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A symlink created by Homebrew</td>
                <td><code>brew upgrade lacymorrow/tap/lacy</code></td>
              </tr>
              <tr>
                <td>A symlink to your own git checkout</td>
                <td><code>git pull</code> in that checkout</td>
              </tr>
              <tr>
                <td>A git checkout with uncommitted changes</td>
                <td>Commit or stash first, then run <code>lacy update</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>What doctor checks</h2>
        <p>
          <code>lacy doctor</code> is the first thing to run when Lacy is installed but nothing
          happens. It checks, in order:
        </p>
        <ul>
          <li>The plugin file exists in <code>~/.lacy</code></li>
          <li>Your rc file has an uncommented source line for it</li>
          <li>Bash users are on Bash 4 or newer (macOS ships 3.2, which Lacy refuses)</li>
          <li><code>config.yaml</code> exists</li>
          <li>The configured AI tool is on your PATH, or auto-detect can find one</li>
          <li><code>~/.lacy/bin</code> is on your PATH</li>
        </ul>
        <p>
          Every failed check prints the command that fixes it. The exit code is 1 if anything
          failed, so you can use it in a script. For the longer list of symptoms and causes, see{" "}
          <Link href="/docs/troubleshooting">Troubleshooting</Link>.
        </p>
      </section>

      <section>
        <h2>The Node UI, and skipping it</h2>
        <p>
          <code>setup</code>, <code>install</code>, and <code>uninstall</code> try{" "}
          <code>npx --yes lacy@latest</code> first, which gives you the{" "}
          <code>@clack/prompts</code> interface. If Node is missing or the fetch fails, they fall
          back to the bash implementation and behave the same way.
        </p>
        <DocsCodeBlock lang="bash">
          {`LACY_NO_NODE=1 lacy setup   # bash prompts, no npx round-trip`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Environment variables</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>LACY_NO_NODE=1</code></td>
                <td>Never shell out to npx. Use the bash path everywhere.</td>
              </tr>
              <tr>
                <td><code>NO_COLOR=1</code></td>
                <td>Plain output, no escape sequences. <code>TERM=dumb</code> does the same.</td>
              </tr>
              <tr>
                <td><code>LACY_REF</code></td>
                <td>Install a specific tag or branch instead of the newest release.</td>
              </tr>
              <tr>
                <td><code>DO_NOT_TRACK=1</code></td>
                <td>Send no telemetry. <code>LACY_NO_TELEMETRY=1</code> does the same.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Lacy reports an anonymous event when it is installed, updated, or removed, and one
          <code> first_load</code> event the first time the plugin loads. Never your queries,
          never your commands. The full list is on the{" "}
          <Link href="/privacy">privacy page</Link>.
        </p>
      </section>

      <section>
        <h2>Next</h2>
        <ul>
          <li>
            <Link href="/docs/commands-reference">Commands Reference</Link> &mdash; the commands
            that work inside your shell, once Lacy is loaded.
          </li>
          <li>
            <Link href="/docs/configuration">Configuration</Link> &mdash; every key in{" "}
            <code>config.yaml</code>.
          </li>
          <li>
            <Link href="/docs/troubleshooting">Troubleshooting</Link> &mdash; when{" "}
            <code>lacy doctor</code> passes but something still feels wrong.
          </li>
        </ul>
      </section>
    </article>
  );
}
