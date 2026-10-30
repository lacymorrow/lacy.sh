import type { Metadata } from "next";
import { Byline } from "../byline";

export const metadata: Metadata = {
  title: "Shell reserved words are trickier than they look",
  description:
    "Words like do, then, and in pass command -v but are never valid standalone commands. Lacy Shell's natural language detection had to solve this first.",
  alternates: {
    canonical: "/blog/shell-reserved-words-are-trickier-than-they-look",
  },
  openGraph: {
    title:
      "Shell reserved words are trickier than they look | Lacy Shell Blog",
    description:
      "do, then, in: they pass command -v but aren't real commands. How Lacy Shell handles the trickiest edge case in shell input classification.",
    url: "/blog/shell-reserved-words-are-trickier-than-they-look",
    images: [
      {
        url: "/api/og?section=blog&title=Shell+reserved+words+are+trickier+than+they+look",
        width: 1200,
        height: 630,
        alt: "Shell reserved words are trickier than they look, Lacy Shell Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shell reserved words are trickier than they look | Lacy Shell Blog",
    description:
      "do, then, and in pass command -v but aren't real commands. How Lacy handles this edge case.",
    images: ["/api/og?section=blog&title=Shell+reserved+words+are+trickier+than+they+look"],
  },
};

export default function Post() {
  return (
    <article className="vs-article">
      <Byline
        title={"Shell reserved words are trickier than they look"}
        slug="shell-reserved-words-are-trickier-than-they-look"
        published="2026-05-19"
        updated="2026-10-27"
      />
      <h1>
        Shell reserved words are <em>trickier</em> than they look
      </h1>
      <p className="vs-subtitle">
        Words like <code>do</code>, <code>then</code>, and <code>in</code> pass{" "}
        <code>command -v</code> in your shell. But they&rsquo;re never valid as
        the first token of a standalone command. Getting this wrong breaks
        natural language detection.
      </p>

      <section>
        <h2>The bug I didn&rsquo;t see coming</h2>
        <p>
          Early in Lacy&rsquo;s development, the detection logic was
          straightforward: check if the first word of the input is a valid shell
          command using <code>command -v</code>. If yes, route to shell. If no,
          check if it looks like natural language.
        </p>
        <p>
          Then someone typed: <code>do we already have a way to uninstall?</code>
        </p>
        <p>
          Lacy routed it to the shell. The shell threw an error. The user saw a
          syntax error instead of getting help from the AI agent.
        </p>
        <p>
          The problem: <code>do</code> passes <code>command -v</code>. In fact,
          it exits 0 because <code>do</code> is a recognized shell keyword.
          But <code>do</code> is never valid as the first word of a standalone
          command. It only makes sense inside a <code>for</code> or <code>while</code> loop.
        </p>
      </section>

      <section>
        <h2>What command -v actually checks</h2>
        <p>
          <code>command -v</code> answers the question &ldquo;does the shell
          recognize this word?&rdquo; That includes:
        </p>
        <ul>
          <li>External binaries on <code>$PATH</code></li>
          <li>Shell builtins (<code>cd</code>, <code>echo</code>, <code>export</code>)</li>
          <li>Aliases</li>
          <li>Functions</li>
          <li>Shell reserved words (<code>do</code>, <code>then</code>, <code>in</code>, <code>fi</code>)</li>
        </ul>
        <p>
          For the first four categories, a positive result from <code>command -v</code> means &ldquo;this word can start a valid command.&rdquo; For reserved
          words, it just means &ldquo;the shell parser knows this token.&rdquo;
          There&rsquo;s no flag to distinguish between them.
        </p>
        <p>
          This is documented behavior. POSIX says <code>command -v</code> identifies
          how the shell would interpret a word. Reserved words are identified, but
          they can&rsquo;t stand alone.
        </p>
      </section>

      <section>
        <h2>The full list</h2>
        <p>
          Not every shell keyword is problematic. <code>if</code>, <code>for</code>, <code>while</code>, <code>until</code>, <code>case</code>,
          and <code>time</code> are excluded from Lacy&rsquo;s reserved word
          filter because they can legitimately start commands or compound
          statements. A user typing <code>if [ -f foo ]; then echo bar; fi</code> is
          writing real shell code.
        </p>
        <p>
          The words that are never valid as standalone invocations:
        </p>
        <pre className="blog-pre">
          <code>do  done  then  else  elif  fi  esac  in  select  {"}"}{" "} !</code>
        </pre>
        <p>
          Eleven words. Two things you might expect on that list are handled
          somewhere else. <code>{"{"}</code> and <code>[[</code> open a group and
          a test, and a line starting with either is shell syntax, so they are
          matched earlier by the same case statement that
          catches <code>./run.sh</code> and <code>2&gt;/dev/null</code> and sent
          straight to the shell. A reserved word routes you to the agent, which
          is the opposite of what you want
          from <code>[[ -f foo ]] &amp;&amp; echo yes</code>.
        </p>
        <p>
          Each of these is a continuation or closing token for a compound
          construct. You never type <code>then</code> as the first word of a
          command. You type it after <code>if ... ;</code>. But when someone
          types <code>then what should I do next?</code>, they&rsquo;re asking a
          question.
        </p>
      </section>

      <section>
        <h2>Why this matters for natural language</h2>
        <p>
          English sentences frequently start with these words.
          Consider:
        </p>
        <ul>
          <li>
            <code>do we have a way to uninstall?</code>
          </li>
          <li>
            <code>in the codebase where is the auth module?</code>
          </li>
          <li>
            <code>then what should I do next?</code>
          </li>
          <li>
            <code>done with the refactor, what else?</code>
          </li>
        </ul>
        <p>
          Without a reserved word filter, every single one of these gets routed
          to the shell. The shell throws a syntax error. The user has to rephrase
          their question.
        </p>
        <p>
          This is the kind of friction that makes a tool feel broken. The user
          typed a perfectly natural question. They got a <code>bash: syntax error near unexpected token</code> instead of an answer.
        </p>
      </section>

      <section>
        <h2>The fix is four lines</h2>
        <p>
          Lacy&rsquo;s detection function checks the reserved word list before
          calling <code>command -v</code>. Here&rsquo;s the relevant section
          from <code>lib/core/detection.sh</code>. The list is joined into a
          space-delimited string once when the plugin loads, so membership is a
          single pattern match rather than a loop on every keystroke:
        </p>
        <pre className="blog-pre">
          <code>{`# Layer 1a: Shell reserved words pass command -v
# but are never valid standalone commands.
if [[ "$_LACY_RESERVED_WORDS_STR" == \
     *" $first_word_stripped "* ]]; then
  _LACY_CLASSIFY_RESULT="agent"
  return
fi`}</code>
        </pre>
        <p>
          The reserved word list itself is defined in <code>lib/core/constants.sh</code> as
          a simple Bash array. Both the list and the detection algorithm are
          shared between Lacy&rsquo;s shell plugin and lash (the AI CLI that
          Lacy recommends). Keeping them in sync means both tools agree on what
          counts as natural language.
        </p>
      </section>

      <section>
        <h2>Trailing punctuation</h2>
        <p>
          One more subtlety. Users often type <code>do?</code> or <code>why?</code> with
          trailing punctuation. The shell doesn&rsquo;t strip punctuation
          before <code>command -v</code>, so <code>do?</code> would fail the
          reserved word check (it&rsquo;s not in the list) and also
          fail <code>command -v</code> (not a recognized word).
        </p>
        <p>
          Lacy strips trailing punctuation (<code>?</code>, <code>!</code>, <code>.</code>, <code>,</code>, <code>;</code>, <code>:</code>) from
          the first word before checking it against word lists. The original
          token (with punctuation) is still used for <code>command -v</code> so
          real commands are unaffected.
        </p>
        <p>
          This means <code>do? we have a setup guide</code> routes to agent
          just like <code>do we have a setup guide</code>. Small detail, but
          users type punctuation. Ignoring that breaks real interactions.
        </p>
      </section>

      <section>
        <h2>The excluded keywords</h2>
        <p>
          The decision to exclude <code>if</code>, <code>for</code>, <code>while</code>, <code>until</code>, <code>case</code>, and <code>time</code> is intentional. These
          keywords can start compound commands. Someone typing{" "}
          <code>for f in *.txt; do echo $f; done</code> is writing a loop, not
          asking a question.
        </p>
        <p>
          When a user types <code>while you are at it fix the tests</code>, the
          shell tries to parse it as a <code>while</code> loop and fails. Lacy
          had already flagged the line as a reroute candidate, because of the
          marker words in it, so the failure makes it offer the agent version as
          a suggestion on your next prompt. Tab accepts it. Lacy does not send
          it on its own. I wrote about that mechanism
          in <a href="/blog/the-post-execution-reroute-pattern">the post-execution reroute post</a>.
        </p>
        <p>
          The split is clean: reserved words that can never start a command go
          through the pre-execution filter. Keywords that sometimes start
          commands go through the post-execution fallback. Both layers together
          cover the full set of shell keywords.
        </p>
      </section>

      <section>
        <h2>What I learned</h2>
        <p>
          Shell syntax has sharp edges that show up only when you start treating
          user input as potentially ambiguous. <code>command -v</code> is the
          standard way to check if a word is a valid command, and it&rsquo;s been
          the standard for decades. But it answers a different question than the
          one Lacy needs to ask.
        </p>
        <p>
          Lacy doesn&rsquo;t need to know &ldquo;does the shell recognize this
          word?&rdquo; It needs to know &ldquo;could this word plausibly start a
          user-intended command?&rdquo; That&rsquo;s a subtly different question,
          and the answer requires an eleven-element array that took weeks of
          real-world testing to get right.
        </p>
      </section>
    </article>
  );
}
