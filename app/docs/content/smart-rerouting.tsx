import DocsCodeBlock from "../DocsCodeBlock";
import DocsCallout from "../DocsCallout";

export const meta = {
  title: "Smart Rerouting",
  description: "What Lacy does when a shell command that reads like a sentence fails: a ghost-text suggestion you accept with Tab, the natural-language marker set, and the exit codes that trigger it.",
};

export default function SmartRerouting() {
  return (
    <article className="doc-article reveal">
      <h1>Smart Rerouting</h1>
      <p className="doc-lead">
        Type something that reads like a sentence, watch the shell fail on it, and Lacy
        offers the line to your agent as ghost text. Tab accepts it. Enter sends it.
        Nothing reaches your agent until you send it.
      </p>

      <section>
        <h2>How it works</h2>
        <p>Three steps, and you are in control of the last one.</p>
        <ol className="doc-list doc-list-ol">
          <li>
            <strong>Before the command runs</strong>, in Auto mode only, Lacy checks the line
            for natural language. It needs a space, no shell operators, and at least one word
            from <code>LACY_NL_MARKERS</code> after the first word. Flags, paths, numbers and
            variables do not count.
          </li>
          <li>
            <strong>The command runs in your shell</strong>, exactly as you typed it. Lacy does
            not hold it back or rewrite it.
          </li>
          <li>
            <strong>If it exits non-zero</strong> with a code under 128, Lacy puts{" "}
            <code>@ your line</code> after the prompt in gray. Right arrow or Tab moves it into
            the buffer, where you can edit it. Enter sends it to your agent.
          </li>
        </ol>
      </section>

      <section>
        <h2>Examples</h2>
        <p>
          <code>kill the process on localhost:3000</code> has a bare word in the marker
          set (<code>the</code>), so it is a candidate. <code>kill</code> runs, fails, and
          the suggestion appears:
        </p>
        <div className="dl-demo">
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt g">$</span>
            <span className="dl-input">kill the process on localhost:3000</span>
            <span className="dl-tag shell">shell</span>
          </div>
          <div className="dl-out">kill: illegal process id: the</div>
          <div className="dl">
            <span className="dl-bar r" />
            <span className="dl-prompt g">$</span>
            <span className="dl-ghost">@ kill the process on localhost:3000</span>
            <span className="dl-tag reroute">tab to accept</span>
          </div>
        </div>

        <h3>No suggestion</h3>
        <div className="dl-demo">
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt g">$</span>
            <span className="dl-input">kill -9 12345</span>
            <span className="dl-tag shell">shell</span>
          </div>
          <div className="dl-out">No bare words after the first one. A flag and a number do not count.</div>
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt g">$</span>
            <span className="dl-input">echo the quick brown fox</span>
            <span className="dl-tag shell">shell</span>
          </div>
          <div className="dl-out">Succeeded, so there is nothing to offer.</div>
        </div>
      </section>

      <section>
        <h2>Implementation</h2>
        <DocsCodeBlock lang="bash">
          {`# lib/core/detection.sh
lacy_shell_has_nl_markers "$input"
# Returns 0 (looks like natural language) or 1 (does not)

# lib/zsh/execute.zsh
# A candidate that fails with exit < 128 becomes ghost text:
LACY_SHELL_SUGGESTION="@ \${candidate}"`}
        </DocsCodeBlock>
        <p>
          The check runs on the input alone, before execution. The exit code decides whether
          you see a suggestion afterwards.
        </p>
      </section>

      <DocsCallout type="note">
        <p>
          Exit codes of 128 and up are signals, like a process you killed yourself. Those
          never produce a suggestion.
        </p>
      </DocsCallout>
    </article>
  );
}
