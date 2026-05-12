import DocsCodeBlock from "../DocsCodeBlock";
import DocsCallout from "../DocsCallout";

export const meta = {
  title: "Smart Rerouting",
  description: "How Lacy silently reroutes failed shell commands that look like natural language.",
};

export default function SmartRerouting() {
  return (
    <article className="doc-article reveal">
      <h1>Smart Rerouting</h1>
      <p className="doc-lead">
        When a valid shell command receives natural-language-style arguments and fails, Lacy
        silently catches it and rerouts to the agent. No user-facing hint — just a second chance.
      </p>

      <section>
        <h2>How it works</h2>
        <p>
          Layer 2 post-execution detection runs after a shell command exits with a non-zero code
          (1–127). Both criteria must match for a reroute:
        </p>
        <ol className="doc-list doc-list-ol">
          <li><strong>Error pattern</strong> — output contains a known shell error string from <code>LACY_SHELL_ERROR_PATTERNS</code></li>
          <li><strong>NL signal</strong> — the second word is in <code>LACY_NL_MARKERS</code> (like <code>the</code>, <code>a</code>, <code>my</code>, <code>this</code>), OR 5+ words with a parse/syntax error</li>
        </ol>
        <p>Minimum 2 words required. Only active in Auto mode.</p>
      </section>

      <section>
        <h2>Examples</h2>
        <div className="dl-demo">
          <div className="dl">
            <span className="dl-bar r" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">kill the process on localhost:3000</span>
            <span className="dl-tag reroute">reroute</span>
          </div>
          <div className="dl-out reroute">No such signal: the → caught, rerouting to AI...</div>
          <div className="dl">
            <span className="dl-bar r" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">go ahead and fix the tests</span>
            <span className="dl-tag reroute">reroute</span>
          </div>
          <div className="dl-out reroute">unknown command: ahead → caught, rerouting to AI...</div>
          <div className="dl">
            <span className="dl-bar r" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">make sure the tests pass</span>
            <span className="dl-tag reroute">reroute</span>
          </div>
          <div className="dl-out reroute">No rule to make target &apos;sure&apos; → caught, rerouting to AI...</div>
        </div>

        <h3>Non-rerouting examples</h3>
        <div className="dl-demo">
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">kill -9 my-process</span>
            <span className="dl-tag shell">shell only</span>
          </div>
          <div className="dl-out">Only 2 bare words — below threshold</div>
          <div className="dl">
            <span className="dl-bar g" />
            <span className="dl-prompt">$</span>
            <span className="dl-input">echo the quick brown fox</span>
            <span className="dl-tag shell">shell only</span>
          </div>
          <div className="dl-out">Succeeds — no reroute needed</div>
        </div>
      </section>

      <section>
        <h2>Implementation</h2>
        <DocsCodeBlock lang="bash">
          {`# lib/core/detection.sh
lacy_shell_detect_natural_language "$input" "$output" "$exit_code"
# Returns 0 (NL detected) or 1 (not NL)`}
        </DocsCodeBlock>
        <p>
          The function takes the original input, the command output, and the exit code.
          It checks both the error pattern and NL signal criteria.
        </p>
      </section>

      <DocsCallout type="note">
        <p>
          Rerouting only triggers on exit codes 1–127. Exit codes ≥ 128 (signals like SIGKILL)
          are not rerouted — they indicate something more serious.
        </p>
      </DocsCallout>
    </article>
  );
}
