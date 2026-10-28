import type { Metadata } from "next";
import { Byline } from "../byline";

export const metadata: Metadata = {
  title: "The post-execution reroute pattern",
  description:
    "Type 'make sure the tests pass' and the shell runs make, which fails. Lacy notices, and offers the line to the agent as a suggestion you accept with Tab. It never sends it for you.",
  alternates: { canonical: "/blog/the-post-execution-reroute-pattern" },
  openGraph: {
    title: "The post-execution reroute pattern | Lacy Shell Blog",
    description:
      "How Lacy Shell catches failed commands that were really natural language, and why it offers them to the agent instead of sending them automatically.",
    url: "/blog/the-post-execution-reroute-pattern",
    images: [
      {
        url: "/api/og?section=blog&title=The+post-execution+reroute+pattern",
        width: 1200,
        height: 630,
        alt: "The post-execution reroute pattern, Lacy Shell Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The post-execution reroute pattern | Lacy Shell Blog",
    description:
      "How Lacy offers a failed shell line to the AI agent, and why it stopped sending it for you.",
    images: ["/api/og?section=blog&title=The+post-execution+reroute+pattern"],
  },
};

export default function Post() {
  return (
    <article className="vs-article">
      <Byline
        title={"The post-execution reroute pattern"}
        slug="the-post-execution-reroute-pattern"
        published="2026-05-26"
        updated="2026-10-27"
      />
      <h1>
        The post-execution <em>reroute</em> pattern
      </h1>
      <p className="vs-subtitle">
        Some natural language starts with a valid command
        name. <code>make sure the tests pass</code> begins
        with <code>make</code>. The shell runs it, it fails, and Lacy offers the
        line to the agent. You accept with Tab, or you ignore it and it goes
        away.
      </p>

      <section>
        <h2>What happens when I type a sentence that starts with a command?</h2>
        <p>
          The shell runs it. If it fails and the line looks like English, Lacy
          prints the agent version of it as a suggestion on your next prompt. In
          zsh that is gray ghost text reading <code>@ make sure the tests pass</code>.
          Tab or Right arrow puts it on the command line, Enter sends it. Type
          anything else and it&rsquo;s gone.
        </p>
        <p>
          Nothing reaches the agent unless you press a key. That&rsquo;s the
          whole behaviour. The rest of this post is how it decides when to
          offer.
        </p>
      </section>

      <section>
        <h2>The problem with valid first words</h2>
        <p>
          Lacy&rsquo;s pre-execution classification works well for the obvious
          cases. <code>ls -la</code> goes to the shell. <code>what files are here</code> goes
          to the agent. The first word tells you almost everything.
        </p>
        <p>
          But some natural language sentences start with a word that is a real
          shell command. Consider:
        </p>
        <ul>
          <li>
            <code>find out how the auth system works</code> (<code>find</code> is
            a real command)
          </li>
          <li>
            <code>make sure the tests pass</code> (<code>make</code> is
            a real command)
          </li>
          <li>
            <code>git me the latest changes</code> (<code>git</code> is
            a real command)
          </li>
          <li>
            <code>test the login flow works</code> (<code>test</code> is
            a real command)
          </li>
          <li>
            <code>go ahead and fix the tests</code> (<code>go</code> is
            a real command)
          </li>
        </ul>
        <p>
          Pre-execution, Lacy cannot confidently say these are natural
          language. <code>find</code> with unusual arguments might be valid
          shell syntax the user knows and Lacy doesn&rsquo;t. Routing it to the
          agent when the user meant to run a command would be worse than letting
          it fail.
        </p>
        <p>
          So Lacy lets the shell try it. If it works, nothing happens. If it
          fails, Lacy asks whether the line was worth offering to the agent.
        </p>
      </section>

      <section>
        <h2>Two conditions, both required</h2>
        <p>
          The first condition is checked before the command runs, and the second
          is the exit code it runs with.
        </p>
        <h2>Condition one: the line is a candidate</h2>
        <p>
          Before execution, <code>lacy_shell_has_nl_markers</code> decides
          whether the line is a reroute candidate at all. It is, when both of
          these hold:
        </p>
        <ul>
          <li>
            The input has more than one word and contains no shell operator
            (<code>|</code>, <code>&amp;&amp;</code>, <code>||</code>, <code>;</code>, <code>&gt;</code>).
            Pipelines and compound commands are shell syntax, not English.
          </li>
          <li>
            At least one bare word after the first word is
            in <code>LACY_NL_MARKERS</code>. Bare means not a flag, a path, a
            number, or a <code>$variable</code>.
          </li>
        </ul>
        <p>
          The marker list holds 315 entries, 313 of them distinct,
          in <code>lib/core/constants.sh</code>. They are common English words
          that are unusual as shell arguments: articles, pronouns,
          prepositions, question words, sentence words
          like <code>sure</code> and <code>ahead</code>, and nouns that show up
          constantly in developer conversation
          like <code>bug</code>, <code>tests</code> and <code>repo</code>.
        </p>
        <p>
          This is why <code>git push origin main</code> is never a
          candidate. <code>push</code>, <code>origin</code> and <code>main</code> are
          not markers, so the line is never considered even if the push fails.
        </p>
        <h2>Condition two: it failed, but not by signal</h2>
        <p>
          A candidate triggers the suggestion when it exits with a code from 1
          to 127. Success does nothing, which is
          why <code>echo the quick brown fox</code> stays
          quiet. Codes 128 and above do nothing either, because those are
          signals. A command you killed with Ctrl+C was running on purpose, and
          offering to hand it to an agent would be an odd reading of what you
          just did.
        </p>
        <p>
          There is no inspection of the error text. An earlier design read the
          error output against a list of 17 patterns
          (<code>no rule to make target</code>, <code>is not a git command</code>,
          and so on), and that function still exists
          as <code>lacy_shell_detect_natural_language</code> for parity with
          lash, where the same spec is implemented. No adapter in Lacy Shell
          calls it. The marker check and the exit code are the whole test,
          because the error text turned out to add nothing the markers had not
          already caught, and it was a second list to keep current for every
          tool that prints a new message.
        </p>
      </section>

      <section>
        <h2>What you actually see</h2>
        <p>
          The suggestion only appears in auto mode. In shell mode or agent mode
          you have already told Lacy where the line should go, so there is
          nothing to suggest.
        </p>
        <ul>
          <li>
            <strong>zsh:</strong> <code>@ &lt;command&gt;</code> appears as gray
            ghost text on the next empty prompt. Right arrow or Tab moves it
            onto the command line, and Enter sends it to the agent. Typing
            anything else, or pressing Enter on the empty line, dismisses it.
          </li>
          <li>
            <strong>Bash:</strong> a hint line reading <code>? @ &lt;command&gt;</code> is
            printed above the next prompt. You type it to send it.
          </li>
          <li>
            <strong>fish:</strong> no suggestion.
          </li>
        </ul>
      </section>

      <section>
        <h2>I shipped the automatic version first, and took it back</h2>
        <p>
          The original reroute sent the line to the agent on its own. Both
          conditions matched and the input went out. Nothing on screen said a
          reroute had happened. I argued for that at the time: when the guess is
          right, a &ldquo;Rerouting to agent...&rdquo; banner is noise. You
          typed a question, you got an answer. The machinery stayed out of the
          way.
        </p>
        <p>
          Living with it changed my mind. A shell that sometimes does something
          other than what you typed is a shell you stop trusting. The keystroke
          has to stay yours. Lacy can be as opinionated as it likes about what
          you probably meant, right up to the point of acting on it without
          asking.
        </p>
        <p>
          The smaller costs were real too. A misfire made you wait on an agent
          round trip, and pay tokens, for an answer to a question you never
          asked. And reading your scrollback back later, there was no way to
          tell which lines the shell had answered and which an agent had.
        </p>
        <p>
          1.8.24 moved the line. The guess is still automatic, the send
          isn&rsquo;t.
        </p>
        <p>
          The suggestion turned out better than the banner I&rsquo;d rejected,
          for a reason I didn&rsquo;t predict. A banner tells you a decision was
          already made. Ghost text shows you the decision and waits. One
          keystroke when the guess is right, nothing at all when it&rsquo;s
          wrong.
        </p>
      </section>

      <section>
        <h2>Examples</h2>
        <table className="vs-table">
          <thead>
            <tr>
              <th>Input</th>
              <th>Candidate</th>
              <th>What happens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>make sure the tests pass</code>
              </td>
              <td>yes</td>
              <td>
                Fails with &ldquo;No rule to make target &lsquo;sure&rsquo;&rdquo;.
                Suggestion offered.
              </td>
            </tr>
            <tr>
              <td>
                <code>kill the process on localhost:3000</code>
              </td>
              <td>yes</td>
              <td>Fails. Suggestion offered.</td>
            </tr>
            <tr>
              <td>
                <code>go ahead and fix the tests</code>
              </td>
              <td>yes</td>
              <td>
                Fails with &ldquo;unknown command&rdquo;. Suggestion offered.
              </td>
            </tr>
            <tr>
              <td>
                <code>kill -9 my baby</code>
              </td>
              <td>yes</td>
              <td>
                Suggestion only if <code>kill</code> actually fails. If it kills
                something, nothing happens.
              </td>
            </tr>
            <tr>
              <td>
                <code>echo the quick brown fox</code>
              </td>
              <td>yes</td>
              <td>Succeeds, exit 0. Nothing happens.</td>
            </tr>
            <tr>
              <td>
                <code>git push origin main</code>
              </td>
              <td>no</td>
              <td>No marker words. Never considered, pass or fail.</td>
            </tr>
            <tr>
              <td>
                <code>echo hello | grep the</code>
              </td>
              <td>no</td>
              <td>
                Contains an operator. Never considered, even
                though <code>the</code> is a marker.
              </td>
            </tr>
            <tr>
              <td>
                <code>git psuh</code>
              </td>
              <td>no</td>
              <td>
                One word after the first, and <code>psuh</code> is not a marker.
                A typo stays a typo.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Why this pattern works</h2>
        <p>
          The reroute is effective because it uses the shell itself as the first
          classifier. Instead of predicting whether input is a valid command,
          Lacy runs it and reads the result. The shell is never wrong about
          whether something was valid shell syntax. Lacy adds one question on
          top: if it wasn&rsquo;t, was it English?
        </p>
        <p>
          You pay for one failed command, typically 10 to 50ms for the errors
          that trigger a suggestion. In exchange, pre-execution routing never
          has to gamble. Lacy does not take a command away from the shell
          because it suspected English, and it does not hand your line to an
          agent because it suspected the same. It runs what you typed and then
          offers an opinion.
        </p>
        <p>
          Combined with the <a href="/blog/shell-reserved-words-are-trickier-than-they-look">reserved word filter</a> and
          the <a href="/blog/why-i-didnt-use-ai-to-classify-ai-input">agent word list</a>,
          these layers cover nearly every input correctly with no ML, no network
          calls, and no dependencies beyond Bash 4+ or zsh.
        </p>
      </section>
    </article>
  );
}
