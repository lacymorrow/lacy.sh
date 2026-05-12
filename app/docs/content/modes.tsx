import DocsCallout from "../DocsCallout";
import DocsCodeBlock from "../DocsCodeBlock";

export const meta = {
  title: "Modes",
  description: "Auto, Shell, and Agent modes — how to switch between them and what each does.",
};

export default function Modes() {
  return (
    <article className="doc-article reveal">
      <h1>Modes</h1>
      <p className="doc-lead">
        Lacy has three routing modes: Auto (smart detection), Shell (force shell), and Agent (force AI).
        Switch anytime with Ctrl+Space or the <code>mode</code> command.
      </p>

      <section>
        <h2>Auto mode</h2>
        <p>
          The default. Applies the six-rule cascade to classify each input before executing.
          Commands run in your shell; natural language routes to AI. The indicator glows
          green or magenta as you type to preview the route.
        </p>
        <div className="modes-row doc-modes-row">
          <div className="mode-cell">
            <div className="mode-cell-head">
              <span className="mode-cell-bar" style={{ background: "var(--blue)" }} />
              <h3>Auto</h3>
            </div>
            <p>Smart routing. Commands → shell. Natural language → agent.</p>
            <span className="key">default</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Shell mode</h2>
        <p>
          All input executes in your shell, no AI routing at all. Useful when you're running
          scripts, doing careful system work, or don't want AI involved.
        </p>
        <p>The indicator is always green in Shell mode.</p>
        <DocsCodeBlock lang="bash">
          {`mode shell`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Agent mode</h2>
        <p>
          All input routes to AI, including things that look like shell commands. Useful
          when you want to have a focused conversation with your AI tool without accidentally
          running commands.
        </p>
        <p>The indicator is always magenta in Agent mode.</p>
        <DocsCodeBlock lang="bash">
          {`mode agent`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Switching modes</h2>
        <h3>Ctrl+Space (keyboard)</h3>
        <p>
          Press <kbd className="doc-kbd">Ctrl+Space</kbd> to cycle: Auto → Shell → Agent → Auto.
          Works in both ZSH and Bash.
        </p>

        <h3>mode command</h3>
        <DocsCodeBlock lang="bash">
          {`mode           # show current mode + color legend
mode auto      # smart routing
mode shell     # shell only
mode agent     # agent only`}
        </DocsCodeBlock>

        <h3>Persist to config</h3>
        <p>
          Set the default mode in <code>~/.lacy/config.yaml</code>:
        </p>
        <DocsCodeBlock lang="yaml">
          {`modes:
  default: auto   # auto | shell | agent`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>Visual indicators</h2>
        <h3>ZSH</h3>
        <ul className="doc-list">
          <li><strong>Left indicator</strong> — colored bar left of your prompt. Green = shell, magenta = agent, gray = neutral.</li>
          <li><strong>Right prompt (RPS1)</strong> — mode badge: <code>SHELL</code> (green) / <code>AGENT</code> (magenta) / <code>AUTO</code> (blue)</li>
          <li><strong>First-word highlighting</strong> — the first word of your input is highlighted green (shell) or magenta (agent) as you type</li>
        </ul>
        <h3>Bash</h3>
        <ul className="doc-list">
          <li><strong>PS1 badge</strong> — <code>SHELL</code> / <code>AGENT</code> / <code>AUTO</code> with matching colors. Updates on each prompt cycle.</li>
        </ul>
        <DocsCallout type="note">
          <p>
            Bash can't update the indicator in real-time as you type (no <code>zle-line-pre-redraw</code> equivalent).
            The badge only updates after each command.
          </p>
        </DocsCallout>
      </section>
    </article>
  );
}
