import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The post-execution reroute pattern",
  description:
    "When someone types 'make sure the tests pass', the shell runs make and fails. Lacy catches the failure, detects natural language, and silently reroutes to the AI agent.",
  alternates: { canonical: "/blog/the-post-execution-reroute-pattern" },
  openGraph: {
    title: "The post-execution reroute pattern | Lacy Shell Blog",
    description:
      "How Lacy Shell catches failed commands that were actually natural language and silently reroutes them to the AI agent.",
    url: "https://lacy.sh/blog/the-post-execution-reroute-pattern",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lacy Shell Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The post-execution reroute pattern | Lacy Shell Blog",
    description:
      "How Lacy catches failed shell commands that were actually natural language and reroutes to AI.",
    images: ["/og.jpg"],
  },
};

export default function Post() {
  return (
    <article className="vs-article">
      <p className="vs-label">May 26, 2026</p>
      <h1>
        The post-execution <em>reroute</em> pattern
      </h1>
      <p className="vs-subtitle">
        Some natural language starts with a valid command
        name. <code>make sure the tests pass</code> begins
        with <code>make</code>. The shell runs it, it fails, and Lacy detects
        what happened. No user action needed.
      </p>

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
          So Lacy lets the shell try it. If it works, great. If it fails, Lacy
          looks at why.
        </p>
      </section>

      <section>
        <h2>Two criteria, both required</h2>
        <p>
          Not every failed command is natural language. <code>git psuh</code> is
          a typo. <code>rm nonexistent.txt</code> is a valid command targeting a
          missing file. Lacy needs to distinguish &ldquo;the shell tried to
          interpret English and choked&rdquo; from &ldquo;the user made a
          mistake.&rdquo;
        </p>
        <p>
          The detection function (<code>lacy_shell_detect_natural_language</code>)
          checks two criteria. Both must match for a reroute.
        </p>
        <h2>Criterion A: error pattern</h2>
        <p>
          The command&rsquo;s error output must contain at least one of these
          strings (case-insensitive):
        </p>
        <pre className="blog-pre">
          <code>{`parse error
syntax error
unexpected token
command not found
no such file or directory
no rule to make target
is not a git command
unknown command
unknown primary or operator
missing argument to
invalid regular expression
...and a few more`}</code>
        </pre>
        <p>
          These are the errors shells and common tools produce when they receive
          English words as arguments. <code>make sure the tests pass</code> produces{" "}
          <code>No rule to make target &lsquo;sure&rsquo;</code>. <code>find out how auth works</code> produces{" "}
          <code>find: unknown primary or operator: &lsquo;out&rsquo;</code>. <code>git me the latest</code> produces{" "}
          <code>&lsquo;me&rsquo; is not a git command</code>.
        </p>
        <p>
          Each error pattern on this list was added because a real user
          triggered it with natural language input. The list grows over time
          as new tools and error messages surface.
        </p>
        <h2>Criterion B: natural language signal</h2>
        <p>
          The error pattern alone is not enough. <code>make nonexistent_target</code> also
          triggers &ldquo;No rule to make target,&rdquo; but the user probably
          meant to run make and just got the target name wrong.
        </p>
        <p>
          So Lacy also checks for a natural language signal in the original
          input. One of two conditions must hold:
        </p>
        <ul>
          <li>
            The second word is a natural language marker (articles
            like <code>the</code>, pronouns like <code>me</code>,
            prepositions like <code>out</code>, conjunctions
            like <code>and</code>, about 300 common English words)
          </li>
          <li>
            The input has 5 or more words AND the error is a parse/syntax error
          </li>
        </ul>
        <p>
          The second-word check is the primary gate. In <code>make sure the tests pass</code>,
          the second word is <code>sure</code>, which is a natural language
          marker. In <code>make mytarget</code>, the second word
          is <code>mytarget</code>, which is not. The heuristic
          separates &ldquo;English sentence starting with a command&rdquo;
          from &ldquo;command with a wrong argument.&rdquo;
        </p>
        <p>
          The 5+ word fallback catches cases where the second word is not in the
          marker list but the input is clearly a sentence. If the shell throws a
          parse error on 5+ words of input, it&rsquo;s almost certainly not
          intended shell syntax.
        </p>
      </section>

      <section>
        <h2>The safety rails</h2>
        <p>
          Several guards prevent false reroutes:
        </p>
        <ul>
          <li>
            Successful commands (exit code 0) are never rerouted.{" "}
            <code>echo the quick brown fox</code> succeeds and produces output.
            No reroute.
          </li>
          <li>
            Single-word inputs are never rerouted. If you type <code>make</code> and
            it fails, that&rsquo;s a real make invocation, not a sentence.
          </li>
          <li>
            Signal exits (code 128+) are excluded. A command killed by a signal
            is not a misrouted sentence.
          </li>
          <li>
            Shell operators in the input (<code>|</code>, <code>&amp;&amp;</code>, <code>||</code>, <code>;</code>, <code>&gt;</code>)
            disqualify it. Pipelines and compound commands are
            shell syntax, not English.
          </li>
        </ul>
      </section>

      <section>
        <h2>Silent reroute</h2>
        <p>
          When both criteria match, Lacy reroutes the input to the AI agent
          without any user-facing indication that a reroute happened. The
          original shell error output stays in the terminal as context. The agent
          receives the full input and can reference the error.
        </p>
        <p>
          Early versions showed a &ldquo;Rerouting to agent...&rdquo; message.
          I removed it. When the reroute is correct (and it almost always is),
          the message is noise. The user typed a question. They got an answer.
          The mechanism is invisible, which is the point.
        </p>
        <p>
          When the reroute is wrong, the AI agent handles it gracefully because
          it can see what the user typed and what the shell returned. The agent
          can say &ldquo;it looks like you meant to run <code>make</code> with
          a specific target&rdquo; rather than just echoing the error.
        </p>
      </section>

      <section>
        <h2>Pre-flagging reroute candidates</h2>
        <p>
          There&rsquo;s one more optimization. Post-execution detection only
          runs on inputs that Lacy pre-flagged as reroute candidates before
          execution. The pre-flagging function (<code>lacy_shell_has_nl_markers</code>)
          checks if the input contains natural language markers after the first
          word, filtering out flags, paths, numbers, and variables.
        </p>
        <p>
          This means <code>git push origin main</code> never triggers
          post-execution analysis even if it fails. The arguments
          (<code>push</code>, <code>origin</code>, <code>main</code>) are not
          NL markers. Only inputs that look like they might contain English
          get the full two-criteria check.
        </p>
        <p>
          The pre-flagging is intentionally aggressive. It&rsquo;s cheap (pure
          string matching) and it only sets a flag. The expensive part
          (analyzing error output) only runs when the flag is set AND the
          command fails. False positives in pre-flagging cost nothing. False
          negatives mean missed reroutes.
        </p>
      </section>

      <section>
        <h2>Real examples</h2>
        <table className="vs-table">
          <thead>
            <tr>
              <th>Input</th>
              <th>What happens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>make sure the tests pass</code>
              </td>
              <td>
                make fails with &ldquo;No rule to make target &lsquo;sure&rsquo;&rdquo;.
                Second word <code>sure</code> is NL marker. Reroute.
              </td>
            </tr>
            <tr>
              <td>
                <code>find out how auth works</code>
              </td>
              <td>
                find fails with &ldquo;unknown primary or operator&rdquo;.
                Second word <code>out</code> is NL marker. Reroute.
              </td>
            </tr>
            <tr>
              <td>
                <code>git me the latest changes</code>
              </td>
              <td>
                git fails with &ldquo;&lsquo;me&rsquo; is not a git command&rdquo;.
                Second word <code>me</code> is NL marker. Reroute.
              </td>
            </tr>
            <tr>
              <td>
                <code>go ahead and fix the tests</code>
              </td>
              <td>
                go fails with &ldquo;unknown command&rdquo;.
                Second word <code>ahead</code> is NL marker. Reroute.
              </td>
            </tr>
            <tr>
              <td>
                <code>echo the quick brown fox</code>
              </td>
              <td>
                echo succeeds (exit 0). No reroute.
              </td>
            </tr>
            <tr>
              <td>
                <code>git psuh</code>
              </td>
              <td>
                git fails but <code>psuh</code> is not an NL marker. No reroute.
              </td>
            </tr>
            <tr>
              <td>
                <code>kill -9 my baby</code>
              </td>
              <td>
                Only 2 bare words after flags. Below threshold. No reroute.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Why this pattern works</h2>
        <p>
          The post-execution reroute is effective because it uses the shell
          itself as the first classifier. Instead of trying to predict whether
          input is a valid command, Lacy runs it and observes the result. The
          shell is always right about whether the input was valid shell syntax.
          Lacy just adds a layer that asks: &ldquo;if it wasn&rsquo;t valid
          shell, was it English?&rdquo;
        </p>
        <p>
          The user cost is one failed command execution (typically 10-50ms for
          the errors that trigger rerouting). The benefit is zero false positives
          on pre-execution routing. Lacy never steals a command away from the
          shell that the user meant to run. It only catches the ones that were
          never going to work.
        </p>
        <p>
          Combined with the <a href="/blog/shell-reserved-words-are-trickier-than-they-look">reserved word filter</a> and
          the <a href="/blog/why-i-didnt-use-ai-to-classify-ai-input">agent word list</a>,
          the three layers cover nearly every input correctly without any ML,
          any network calls, or any dependencies beyond Bash 4+.
        </p>
      </section>
    </article>
  );
}
