import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why I didn't use AI to classify AI input",
  description:
    "Lacy Shell routes natural language to AI and commands to your shell. Everyone assumes it uses ML for classification. It uses pure string matching instead. Here's why.",
  alternates: { canonical: "/blog/why-i-didnt-use-ai-to-classify-ai-input" },
  openGraph: {
    title: "Why I didn't use AI to classify AI input | Lacy Shell Blog",
    description:
      "Everyone assumes a shell that routes to AI must use AI for detection. Lacy uses pure string matching. Here's why the obvious approach is the wrong one.",
    url: "/blog/why-i-didnt-use-ai-to-classify-ai-input",
    images: [
      {
        url: "/api/og?section=blog&title=Why+I+didn't+use+AI+to+classify+AI+input",
        width: 1200,
        height: 630,
        alt: "Why I didn't use AI to classify AI input — Lacy Shell Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why I didn't use AI to classify AI input | Lacy Shell Blog",
    description:
      "Everyone assumes a shell that routes to AI must use AI for detection. Lacy uses pure string matching. Here's why.",
    images: ["/api/og?section=blog&title=Why+I+didn't+use+AI+to+classify+AI+input"],
  },
};

export default function Post() {
  return (
    <article className="vs-article">
      <p className="vs-label">May 12, 2026</p>
      <h1>
        Why I didn&rsquo;t use AI to classify <em>AI input</em>
      </h1>
      <p className="vs-subtitle">
        Lacy Shell routes natural language to an AI agent and commands to your
        shell. The obvious approach for detection is ML classification. I went
        with pure string matching. Here&rsquo;s why.
      </p>

      <section>
        <h2>The obvious answer</h2>
        <p>
          When people first hear what Lacy does, the question is always the same:
          &ldquo;So you trained a classifier?&rdquo; Makes sense on the
          surface. Binary classification problem, shell command or natural
          language. Throw a model at it. Transformers eat this for breakfast.
        </p>
        <p>
          I tried it. Early prototypes used a small language model to score
          inputs. Worked on benchmarks. Then I plugged it into a real shell and
          everything fell apart.
        </p>
      </section>

      <section>
        <h2>The latency wall</h2>
        <p>
          Lacy updates a color indicator as you type. Green means it goes to
          your shell. Magenta means it routes to the AI agent. This updates on
          every keystroke in ZSH via <code>zle-line-pre-redraw</code>.
        </p>
        <p>
          Classification has to run in under 10 milliseconds. Not per
          submission. Per character. Every keypress
          triggers <code>lacy_shell_classify_input()</code>, which redraws the
          indicator based on what you&rsquo;ve typed so far.
        </p>
        <p>
          Model inference, even a tiny one, takes 50-200ms. That&rsquo;s
          visible lag on every keystroke. The indicator stutters, lags behind
          your typing, flips colors a half-second late. It felt
          broken even when the classification was correct.
        </p>
        <p>
          String matching takes microseconds. The indicator just updates.
        </p>
      </section>

      <section>
        <h2>Zero dependencies, zero startup cost</h2>
        <p>
          Lacy is a shell plugin. It loads when your terminal starts. Every
          millisecond of startup time is felt by the developer, every single
          morning, every single terminal tab.
        </p>
        <p>
          An ML classifier needs a runtime. Python, ONNX, a WASM module,
          something. That means either bundling a binary (30MB+ for a shell
          plugin) or requiring a runtime dependency that many developers
          won&rsquo;t have installed.
        </p>
        <p>
          Lacy&rsquo;s detection is pure Bash 4+. It works in ZSH and Bash. It
          sources a single file (<code>lib/core/detection.sh</code>) and
          uses <code>command -v</code> plus array membership checks. No
          binaries, no runtimes, no network calls. The entire detection system is
          a function you can read in under 100 lines.
        </p>
      </section>

      <section>
        <h2>The edge cases are the same</h2>
        <p>
          The hard cases for natural language detection in a shell context are
          inputs like:
        </p>
        <ul>
          <li>
            <code>find out how the auth system works</code> (<code>find</code> is a real command)
          </li>
          <li>
            <code>make sure the tests pass</code> (<code>make</code> is a real command)
          </li>
          <li>
            <code>test the login flow</code> (<code>test</code> is a real command)
          </li>
        </ul>
        <p>
          These are hard for a model too. The first word is a legitimate shell
          command. The rest is English. A transformer trained on shell commands
          and English sentences would struggle with the exact same boundary that
          string matching struggles with.
        </p>
        <p>
          The difference is that with string matching, I can handle these cases
          with a simple, explainable heuristic: let the shell try it first, catch
          the failure, and check if the error output looks like a shell trying to
          parse English. That&rsquo;s Lacy&rsquo;s Layer 2 detection. No model
          needed.
        </p>
      </section>

      <section>
        <h2>What the heuristic actually looks like</h2>
        <p>
          Lacy&rsquo;s classification is a decision tree with five rules:
        </p>
        <ul>
          <li>
            First word is an agent word (like <code>why</code>, <code>how</code>, <code>explain</code>, about 150 common English words)? Route to agent.
          </li>
          <li>
            First word is a shell reserved word (like <code>do</code>, <code>then</code>, <code>in</code>)? Route to agent. These pass <code>command -v</code> but are never standalone commands.
          </li>
          <li>
            First word is a valid command? Route to shell.
          </li>
          <li>
            Single unknown word? Route to shell (probably a typo).
          </li>
          <li>
            Multiple words, first word unknown? Route to agent (natural language).
          </li>
        </ul>
        <p>
          That covers the vast majority of inputs correctly with zero
          ambiguity. The remaining edge cases (valid command + natural language
          arguments) are handled by post-execution rerouting, which I wrote
          about in <a href="/blog/the-post-execution-reroute-pattern">a separate post</a>.
        </p>
      </section>

      <section>
        <h2>Debuggability matters</h2>
        <p>
          When a user reports that Lacy misrouted their input, I can trace the
          exact path through the decision tree. First word
          was <code>go</code>. <code>go</code> is in the agent words list.
          It&rsquo;s also a valid command. The input
          had 2+ bare words after it with NL markers. Result: agent.
        </p>
        <p>
          With a model, the answer is &ldquo;the classifier gave it a 0.62
          confidence score.&rdquo; Why? Unclear. What do you change? Retrain
          with more data? Adjust the threshold? The feedback loop is long and
          opaque.
        </p>
        <p>
          With a word list, the fix is: add the word, remove the word, or add
          a special case. The change is immediate, testable, and obvious.
        </p>
      </section>

      <section>
        <h2>The 95% that&rsquo;s easy</h2>
        <p>
          Here&rsquo;s the thing most people miss: natural language and shell
          commands are syntactically very different. They don&rsquo;t require a
          model to tell apart. <code>ls -la</code> looks nothing
          like <code>what files are in this directory</code>. The first word
          alone is usually enough.
        </p>
        <p>
          95% of inputs are trivially classifiable by checking if the first
          word is a known command. The remaining 5% are ambiguous cases where
          a real command name is followed by English words. A model doesn&rsquo;t
          meaningfully outperform simple heuristics on that 5%, because the
          ambiguity is genuine and context-dependent.
        </p>
        <p>
          For that 5%, Lacy uses a fallback that no model can replicate: it
          lets the shell try first and catches the error. The shell itself is
          the best classifier for whether input is valid shell syntax.
        </p>
      </section>

      <section>
        <h2>The result</h2>
        <p>
          Lacy&rsquo;s detection has zero dependencies, zero latency, works in
          any Bash 4+ or ZSH environment, and handles the hard edge cases
          better than a classifier would. The entire system is about 400 lines
          of shell script split across two files.
        </p>
        <p>
          Sometimes the boring solution is the right one. AI is a great tool.
          Using it to detect its own input, in a context where latency and
          simplicity are critical, is not the right use case.
        </p>
      </section>
    </article>
  );
}
