import type { Metadata } from "next";
import Link from "next/link";
import { FaqSchema } from "../faq-schema";

const faqs = [
  {
    question: "What is the difference between Lacy Shell and Aider?",
    answer:
      "Aider is an AI pair programming tool — you run it in a repo, have a conversation, and it edits your files directly with git commits. Lacy Shell is a ZSH/Bash plugin that routes shell input to either a command or an AI agent. Aider edits code; Lacy routes input.",
  },
  {
    question: "Can I use Lacy Shell and Aider together?",
    answer:
      "Absolutely. Lacy recognizes `aider` as a valid shell command and lets it run normally. Use Lacy for day-to-day terminal work and quick questions, and open Aider when you need a focused coding session. They complement each other well.",
  },
  {
    question: "Is Lacy Shell free?",
    answer:
      "Yes. Lacy Shell is free and MIT licensed. Aider is also open source (Apache 2.0) but requires an API key for the AI provider you choose.",
  },
  {
    question: "Does Lacy Shell edit my files?",
    answer:
      "No. Lacy Shell routes your shell input to an AI agent but does not edit files itself. The AI agent you connect to (such as Claude Code) may edit files depending on how you use it.",
  },
  {
    question: "Does Lacy Shell require an API key?",
    answer:
      "No. Lacy Shell routes input to whichever AI CLI tool you already have installed. It does not make API calls directly and does not need its own API key.",
  },
];

export const metadata: Metadata = {
  title: "Lacy Shell vs Aider — Shell Plugin vs AI Coding Assistant",
  description:
    "Compare Lacy Shell and Aider. Lacy adds AI routing to your shell prompt. Aider edits files through conversation. Different tools, different jobs.",
  alternates: { canonical: "/vs/aider" },
  openGraph: {
    title: "Lacy Shell vs Aider — Shell Plugin vs AI Coding Assistant",
    description:
      "Compare Lacy Shell and Aider. Shell-level AI routing vs conversational code editing.",
    url: "https://lacy.sh/vs/aider",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacy Shell vs Aider — Shell Plugin vs AI Coding Assistant",
    description:
      "Compare Lacy Shell and Aider. Shell-level AI routing vs conversational code editing.",
    images: ["/og.jpg"],
  },
};

export default function VsAider() {
  return (
    <>
    <article className="vs-article">
      <p className="vs-label">comparison</p>
      <h1>
        Lacy Shell vs <em>Aider</em>
      </h1>
      <p className="vs-subtitle">
        A shell plugin that routes your input vs a coding assistant that edits
        your files.
      </p>

      <section>
        <h2>The core difference</h2>
        <p>
          Aider is an AI pair programming tool. You run{" "}
          <code>aider</code> in a repo, have a conversation, and it edits files
          directly using git commits. Lacy is a shell plugin that detects whether
          you typed a command or a question and sends it to the right place. Aider
          writes code. Lacy routes input.
        </p>
      </section>

      <section>
        <table className="vs-table">
          <thead>
            <tr>
              <th></th>
              <th>Lacy Shell</th>
              <th>Aider</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>ZSH/Bash plugin</td>
              <td>AI coding assistant (CLI)</td>
            </tr>
            <tr>
              <td>What it does</td>
              <td>Routes input to shell or AI agent</td>
              <td>Edits files through conversation</td>
            </tr>
            <tr>
              <td>Invocation</td>
              <td>Just type in your shell</td>
              <td>
                Run <code>aider</code> to start a session
              </td>
            </tr>
            <tr>
              <td>Integration</td>
              <td>Lives in your shell prompt</td>
              <td>Separate interactive session</td>
            </tr>
            <tr>
              <td>AI backend</td>
              <td>Any CLI (Claude, Gemini, OpenCode, etc.)</td>
              <td>OpenAI, Anthropic, local models, 20+ providers</td>
            </tr>
            <tr>
              <td>API key required</td>
              <td>No (uses your installed CLI tool)</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Edits files</td>
              <td>No (the AI agent you connect can)</td>
              <td>Yes, directly with git commits</td>
            </tr>
            <tr>
              <td>Real-time indicator</td>
              <td>Yes &mdash; green/magenta as you type</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Shell commands</td>
              <td>Run natively alongside AI queries</td>
              <td>
                Run via <code>/run</code> inside Aider session
              </td>
            </tr>
            <tr>
              <td>Open source</td>
              <td>Yes, MIT</td>
              <td>Yes, Apache 2.0</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>They solve different problems</h2>
        <p>
          Aider is for focused coding sessions. You open it in a repo, tell it
          what to build or fix, and it makes the changes. It has deep awareness
          of your codebase &mdash; repo map, file context, git history.
        </p>
        <p>
          Lacy is for the rest of your terminal time. You&rsquo;re running
          commands, checking logs, navigating directories, and occasionally you
          want to ask something. Instead of switching to a different tool, you
          just type the question and Lacy sends it to your agent.
        </p>
        <p>
          If you type &ldquo;refactor the auth module to use JWT&rdquo; in Aider,
          it edits your source files. If you type it with Lacy, your connected
          agent handles it however that agent works. Aider owns the edit loop.
          Lacy owns the routing.
        </p>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You want AI inline with your normal shell workflow</li>
          <li>You already have a CLI agent you like and want seamless access</li>
          <li>You want commands and questions in one place, no context switching</li>
          <li>You don&rsquo;t need direct file editing from the AI layer</li>
        </ul>
      </section>

      <section>
        <h2>When to use Aider</h2>
        <ul>
          <li>You want AI to directly edit your code with full repo context</li>
          <li>You prefer pair-programming style conversations</li>
          <li>You want automatic git commits for every change</li>
          <li>You need deep codebase awareness (repo maps, file trees)</li>
        </ul>
      </section>

      <section>
        <h2>Can you use both?</h2>
        <p>
          Absolutely. Lacy recognizes <code>aider</code> as a valid command and
          lets it run in the shell. Use Lacy for day-to-day terminal work and
          quick questions. Open Aider when you need a focused coding session.
          They complement each other well &mdash; one routes, the other edits.
        </p>
      </section>

      <section>
        <h2>The bottom line</h2>
        <p>
          Aider is one of the best terminal-based AI coding tools available. It
          understands your codebase and makes changes with precision. But it runs
          as a separate session, not in your shell prompt.
        </p>
        <p>
          Lacy doesn&rsquo;t compete with Aider &mdash; it fills the gap between
          coding sessions. It makes your regular terminal AI-aware so you never
          have to decide whether to type a command or switch to a tool. If you
          use Aider for coding, Lacy gives your shell the same natural-language
          fluency everywhere else.
        </p>
      </section>

      <section>
        <h2>Further reading</h2>
        <ul>
          <li>
            <Link href="/blog/why-i-didnt-use-ai-to-classify-ai-input">
              Why I didn&rsquo;t use AI to classify AI input
            </Link>{" "}
            — how Lacy decides whether your input is a shell command or natural
            language, without ML.
          </li>
        </ul>
      </section>
    </article>
    <FaqSchema items={faqs} />
    </>
  );
}
