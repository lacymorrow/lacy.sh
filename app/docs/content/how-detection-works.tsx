import DocsCallout from "../DocsCallout";
import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "How Detection Works",
  description: "The rule cascade that classifies each line as shell command or natural language: leading sigils, reserved words, agent words, valid commands, and NL markers.",
};

export default function HowDetectionWorks() {
  return (
    <article className="doc-article reveal">
      <h1>How Detection Works</h1>
      <p className="doc-lead">
        Every keystroke in Auto mode passes through a single function: <code>lacy_shell_classify_input()</code>.
        It returns <code>shell</code>, <code>agent</code>, or <code>neutral</code>. All routing and
        visual feedback flows from this one source of truth.
      </p>

      <section>
        <h2>The six-rule cascade</h2>
        <p>
          Rules are evaluated in order. The first match wins.
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Condition</th>
                <th>Route</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>First word is an <strong>agent word</strong></td>
                <td><span style={{ color: "var(--magenta)" }}>Agent</span></td>
                <td><code>what files are here</code></td>
              </tr>
              <tr>
                <td>2</td>
                <td>First word is a <strong>shell reserved word</strong></td>
                <td><span style={{ color: "var(--magenta)" }}>Agent</span></td>
                <td><code>do we have auth?</code></td>
              </tr>
              <tr>
                <td>3</td>
                <td>First word is a <strong>valid command</strong></td>
                <td><span style={{ color: "var(--green)" }}>Shell</span></td>
                <td><code>git status</code></td>
              </tr>
              <tr>
                <td>4</td>
                <td><strong>Single word</strong>, not a command</td>
                <td><span style={{ color: "var(--green)" }}>Shell</span></td>
                <td><code>cd..</code> (typo)</td>
              </tr>
              <tr>
                <td>5</td>
                <td><strong>Multiple words</strong>, first not a command</td>
                <td><span style={{ color: "var(--magenta)" }}>Agent</span></td>
                <td><code>fix the bug</code></td>
              </tr>
              <tr>
                <td>6</td>
                <td>Valid command <strong>fails</strong> with NL-style args</td>
                <td><span style={{ color: "var(--blue)" }}>Shell → Agent</span></td>
                <td><code>kill the process on :3000</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Agent words (Rule 1)</h2>
        <p>
          About 150 common conversational words that trigger agent routing regardless of whether
          they're valid shell commands. These are defined in <code>LACY_AGENT_WORDS</code> in
          <code>lib/core/constants.sh</code>.
        </p>
        <p>
          Examples: <code>what</code>, <code>why</code>, <code>how</code>, <code>fix</code>, <code>explain</code>,
          <code>help</code>, <code>show</code>, <code>list</code>, <code>find</code>, <code>yes</code>, <code>no</code>,
          <code>thanks</code>, <code>perfect</code>, <code>can</code>, <code>could</code>, <code>should</code>,
          <code>would</code>, <code>is</code>, <code>are</code>, <code>does</code>.
        </p>
        <DocsCallout type="note">
          <p>
            Agent words match even as single-word inputs. Typing <code>thanks</code> alone routes to agent.
          </p>
        </DocsCallout>
      </section>

      <section>
        <h2>Shell reserved words (Rule 2)</h2>
        <p>
          Shell reserved words (<code>do</code>, <code>done</code>, <code>then</code>, <code>else</code>,
          <code>elif</code>, <code>fi</code>, <code>in</code>, <code>select</code>, etc.) pass
          <code>command -v</code> but are never valid as the first token of a standalone invocation.
        </p>
        <p>
          When a user types <code>do we have X</code> or <code>in the codebase where is auth?</code>,
          that's natural language, not a shell command.
        </p>
      </section>

      <section>
        <h2>Post-execution suggestion (Rule 6)</h2>
        <p>
          A line flagged as natural language still runs in your shell first. If it fails with
          an exit code under 128, Lacy offers the same line to your agent as ghost text instead
          of sending it. You accept with Tab or the right arrow, then send with Enter.
        </p>
        <div className="dl-demo">
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt g">$</span>
            <span className="dl-input">make sure the tests pass</span>
            <span className="dl-tag shell">shell</span>
          </div>
          <div className="dl-out">make: *** No rule to make target &apos;sure&apos;.  Stop.</div>
          <div className="dl">
            <span className="dl-bar r" />
            <span className="dl-prompt g">$</span>
            <span className="dl-ghost">@ make sure the tests pass</span>
            <span className="dl-tag reroute">tab to accept</span>
          </div>
        </div>
        <p>
          The natural-language check runs on your input before the command executes, through{" "}
          <code>lacy_shell_has_nl_markers</code>. It needs a bare word from{" "}
          <code>LACY_NL_MARKERS</code> after the first word, and it bails on any line
          containing a shell operator. Only active in Auto mode.
        </p>
      </section>

      <section>
        <h2>Mode-aware behavior</h2>
        <p>
          The cascade only applies in Auto mode. In Shell mode, everything routes to shell.
          In Agent mode, everything routes to agent. The visual indicator always reflects the
          current routing decision.
        </p>
      </section>

      <section>
        <h2>Implementation</h2>
        <DocsCodeBlock lang="bash">
          {`# Single source of truth: lib/core/detection.sh
lacy_shell_classify_input "$input"
# Returns: "shell" | "agent" | "neutral"`}
        </DocsCodeBlock>
        <p>
          All consumers — the real-time indicator, execute routing, and first-word syntax
          highlighting — call this single function. Never create parallel detection logic.
        </p>
      </section>
    </article>
  );
}
