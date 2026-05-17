import type { Metadata } from "next";
import { RelatedComparisons } from "../RelatedComparisons";
import Link from "next/link";
import { FaqSchema } from "../faq-schema";

const faqs = [
  {
    question: "What is the difference between Lacy Shell and AI Shell?",
    answer:
      "AI Shell (by Builder.io) generates shell commands from natural language — you run `ai \"query\"`, review the generated command, and confirm to execute it. Lacy Shell is a plugin that automatically detects whether your terminal input is a command or a question and routes it, without a separate invocation or confirmation step.",
  },
  {
    question: "Can I use Lacy Shell and AI Shell together?",
    answer:
      "Yes. AI Shell installs as a standalone `ai` command. Lacy recognizes `ai \"...\"` as a valid shell command and lets it run normally. They do not interfere with each other.",
  },
  {
    question: "Is Lacy Shell free?",
    answer:
      "Yes. Lacy Shell is free and MIT licensed. AI Shell requires an OpenAI API key or a local Ollama installation.",
  },
  {
    question: "Does Lacy Shell generate shell commands?",
    answer:
      "No. Lacy Shell routes your input to an AI agent of your choice. The agent handles the response — which may include commands, explanations, or both. Lacy itself is a router, not a command generator.",
  },
  {
    question: "Does Lacy Shell work with local AI models?",
    answer:
      "Lacy Shell routes input to whatever CLI agent you have installed. If your installed agent supports local models, Lacy will use that agent. Lacy itself has no model dependency.",
  },
];

export const metadata: Metadata = {
  title: "Lacy vs AI Shell — Auto-Route vs Command Generator",
  description:
    "Compare Lacy Shell and AI Shell. Lacy auto-detects natural language inline. AI Shell generates shell commands from a separate prompt.",
  alternates: { canonical: "/vs/ai-shell" },
  openGraph: {
    title: "Lacy Shell vs AI Shell",
    description:
      "Compare Lacy Shell and AI Shell. Inline auto-routing vs separate AI prompt.",
    url: "/vs/ai-shell",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacy Shell vs AI Shell — Auto-Route vs Command Generator",
    description:
      "Compare Lacy Shell and AI Shell. Inline auto-routing vs separate AI prompt.",
    images: ["/og.jpg"],
  },
};

export default function VsAiShell() {
  return (
    <>
    <article className="vs-article">
      <p className="vs-label">comparison</p>
      <h1>
        Lacy Shell vs <em>AI Shell</em>
      </h1>
      <p className="vs-subtitle">
        Inline auto-routing vs separate command generator.
      </p>

      <section>
        <h2>The core difference</h2>
        <p>
          AI Shell (by Builder.io) is a command you run:{" "}
          <code>ai &quot;find large files&quot;</code>. It sends your query to an
          LLM, gets back a shell command, and lets you review it before running.
          Lacy doesn&rsquo;t generate commands — it detects whether what you typed is
          a command or a question and sends it to the right place.
        </p>
      </section>

      <section>
        <table className="vs-table">
          <thead>
            <tr>
              <th></th>
              <th>Lacy Shell</th>
              <th>AI Shell</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Invocation</td>
              <td>Just type — automatic detection</td>
              <td>
                <code>ai &quot;query&quot;</code>
              </td>
            </tr>
            <tr>
              <td>What it does</td>
              <td>Routes input to shell or AI agent</td>
              <td>Generates a shell command from natural language</td>
            </tr>
            <tr>
              <td>AI backend</td>
              <td>Any CLI (Claude, Gemini, OpenCode, etc.)</td>
              <td>OpenAI or Ollama</td>
            </tr>
            <tr>
              <td>API key required</td>
              <td>No (uses your installed CLI tool)</td>
              <td>Yes (OpenAI key or local Ollama)</td>
            </tr>
            <tr>
              <td>Real-time indicator</td>
              <td>Yes — green/magenta as you type</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Smart reroute</td>
              <td>Yes — failed NL commands auto-reroute</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Output</td>
              <td>Full agent response (answers, code, explanations)</td>
              <td>Generated shell command (confirm to run)</td>
            </tr>
            <tr>
              <td>Shell integration</td>
              <td>Deep — hooks into shell execution pipeline</td>
              <td>Standalone binary</td>
            </tr>
            <tr>
              <td>Language</td>
              <td>Shell (ZSH/Bash)</td>
              <td>Node.js</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>They solve different problems</h2>
        <p>
          AI Shell answers: &ldquo;I know what I want but not the command.&rdquo;
          You describe the goal, it gives you the command. It&rsquo;s a translator.
        </p>
        <p>
          Lacy answers: &ldquo;I don&rsquo;t want to think about whether this is a
          command or a question.&rdquo; You type whatever you mean and it goes to
          the right place. It&rsquo;s a router.
        </p>
        <p>
          If you type &ldquo;find files larger than 100MB&rdquo; into AI Shell,
          you get back <code>find . -size +100M</code>. If you type the same
          thing with Lacy, it sends the full question to your AI agent, which
          might give you the command, an explanation, or both.
        </p>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You want commands and AI queries in one workflow, no switching</li>
          <li>You want full AI agent responses, not just command translations</li>
          <li>You already have a CLI agent installed (Claude, Gemini, etc.)</li>
          <li>You don&rsquo;t want to manage an API key for classification</li>
        </ul>
      </section>

      <section>
        <h2>When to use AI Shell</h2>
        <ul>
          <li>You specifically want shell command generation with review</li>
          <li>You prefer the safety of confirming generated commands</li>
          <li>You want to use local models via Ollama</li>
          <li>You don&rsquo;t want any shell-level hooks</li>
        </ul>
      </section>

      <section>
        <h2>Can you use both?</h2>
        <p>
          Yes. AI Shell installs as a standalone <code>ai</code> command. Lacy
          will recognize <code>ai &quot;...&quot;</code> as a valid command and let
          it run in the shell. They don&rsquo;t interfere with each other.
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
      <RelatedComparisons current="ai-shell" />
    </article>
    <FaqSchema items={faqs} />
    </>
  );
}
