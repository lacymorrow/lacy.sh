import DocsCodeBlock from "../DocsCodeBlock";
import DocsCallout from "../DocsCallout";

export const meta = {
  title: "Plugin Coexistence",
  description: "How Lacy coexists with zsh-autosuggestions and zsh-syntax-highlighting.",
};

export default function PluginCoexistence() {
  return (
    <article className="doc-article reveal">
      <h1>Plugin Coexistence</h1>
      <p className="doc-lead">
        Lacy shares ZLE resources with <code>zsh-autosuggestions</code> and
        <code>zsh-syntax-highlighting</code>. Mishandling either causes visible bugs.
        Here's what Lacy does and why.
      </p>

      <section>
        <h2>region_highlight — tagged entries</h2>
        <p>
          Multiple plugins write to the <code>region_highlight</code> array for syntax coloring.
          Lacy adds first-word coloring (green/magenta) and ghost text styling.
        </p>
        <p>
          All Lacy entries are tagged with <code>memo=lacy</code> (ZSH 5.8+ feature) so they
          can be selectively removed on each redraw without destroying other plugins' highlights.
        </p>
        <DocsCallout type="warning">
          <p>
            Never use <code>region_highlight=()</code> — that clears all plugins' highlights.
            Always filter: <code>{"region_highlight=(\"${(@)region_highlight:#*memo=lacy*}\")"}</code>
          </p>
        </DocsCallout>
        <DocsCodeBlock lang="bash">
          {`# Always append memo=lacy to Lacy highlight entries
region_highlight+=("0 5 bold,fg=green memo=lacy")`}
        </DocsCodeBlock>
      </section>

      <section>
        <h2>POSTDISPLAY — ghost text conflicts</h2>
        <p>
          Both Lacy (reroute ghost text) and <code>zsh-autosuggestions</code> (history suggestions)
          write to <code>POSTDISPLAY</code>.
        </p>
        <p>
          When Lacy's ghost text is active (BUFFER empty), Lacy calls <code>_zsh_autosuggest_clear</code>
          before setting <code>POSTDISPLAY</code> to prevent autosuggestions from overwriting it.
          When the user starts typing, Lacy clears its ghost text and autosuggestions resumes normally.
        </p>
      </section>

      <section>
        <h2>Right arrow and Tab — no dot prefix</h2>
        <p>
          Lacy's <code>_lacy_forward_char_or_accept</code> and <code>_lacy_expand_or_accept</code>
          widgets check for Lacy ghost text first. On fallback, they call <code>zle forward-char</code>
          (not <code>zle .forward-char</code>).
        </p>
        <p>
          The dot prefix bypasses widget wrapping — without it, autosuggestions' wrapper fires
          and right arrow / tab accept suggestions normally.
        </p>
        <DocsCallout type="note">
          <p>
            Full design rationale is in the header of <code>lib/zsh/keybindings.zsh</code>.
          </p>
        </DocsCallout>
      </section>
    </article>
  );
}
