import type { Metadata } from "next";
import { RelatedComparisons } from "../RelatedComparisons";
import Link from "next/link";
import { FaqSchema } from "../faq-schema";

const faqs = [
  {
    question: "What is the difference between Lacy Shell and GitHub Copilot CLI?",
    answer:
      "GitHub Copilot CLI adds explicit commands (`gh copilot suggest`, `gh copilot explain`) that you invoke when you want AI help. Lacy Shell is a plugin that passively watches what you type and automatically routes natural language to an AI agent — no invocation needed.",
  },
  {
    question: "Can I use Lacy Shell and GitHub Copilot CLI together?",
    answer:
      "Yes. Copilot CLI is a standalone command and does not conflict with Lacy. You can use Lacy for automatic routing and still call `gh copilot suggest` when you want explicit command suggestions with a confirmation step.",
  },
  {
    question: "Is Lacy Shell free?",
    answer:
      "Yes. Lacy Shell is free, open source, and MIT licensed — no subscription required. GitHub Copilot CLI requires a paid Copilot subscription.",
  },
  {
    question: "Does Lacy Shell require a GitHub account?",
    answer:
      "No. Lacy Shell requires no account. GitHub Copilot CLI requires a GitHub account and a Copilot subscription.",
  },
  {
    question: "Which AI models does Lacy Shell support?",
    answer:
      "Lacy Shell routes your input to whatever AI CLI tool you have installed — Claude Code, Gemini CLI, OpenCode, and others. You choose the backend; Lacy handles the routing.",
  },
];

export const metadata: Metadata = {
  title: "Lacy Shell vs GitHub Copilot CLI — Always-On vs On-Demand AI",
  description:
    "Compare Lacy Shell and GitHub Copilot CLI. Lacy auto-routes natural language to AI. Copilot CLI requires explicit invocation.",
  alternates: { canonical: "/vs/github-copilot-cli" },
  openGraph: {
    title: "Lacy Shell vs GitHub Copilot CLI",
    description:
      "Compare Lacy Shell and GitHub Copilot CLI. Automatic routing vs explicit invocation.",
    url: "/vs/github-copilot-cli",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacy Shell vs GitHub Copilot CLI — Always-On vs On-Demand",
    description:
      "Compare Lacy Shell and GitHub Copilot CLI. Automatic routing vs explicit invocation.",
    images: ["/og.jpg"],
  },
};

export default function VsGitHubCopilotCli() {
  return (
    <>
    <article className="vs-article">
      <p className="vs-label">comparison</p>
      <h1>
        Lacy Shell vs <em>GitHub Copilot CLI</em>
      </h1>
      <p className="vs-subtitle">
        Always-on routing vs on-demand suggestions.
      </p>

      <section>
        <h2>The core difference</h2>
        <p>
          GitHub Copilot CLI adds two commands to your shell:{" "}
          <code>gh copilot suggest</code> and <code>gh copilot explain</code>.
          You invoke them when you want AI help. Lacy works the other way
          around — it watches what you type and decides whether it should run in
          your shell or go to an AI agent. You never invoke anything explicitly.
        </p>
      </section>

      <section>
        <table className="vs-table">
          <thead>
            <tr>
              <th></th>
              <th>Lacy Shell</th>
              <th>GitHub Copilot CLI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Invocation</td>
              <td>Just type — automatic detection</td>
              <td>
                <code>gh copilot suggest &quot;...&quot;</code>
              </td>
            </tr>
            <tr>
              <td>AI backend</td>
              <td>Any CLI (Claude, Gemini, OpenCode, etc.)</td>
              <td>GitHub Copilot (OpenAI)</td>
            </tr>
            <tr>
              <td>Subscription required</td>
              <td>No</td>
              <td>Yes (Copilot plan)</td>
            </tr>
            <tr>
              <td>Real-time indicator</td>
              <td>Yes — green/magenta as you type</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Smart reroute</td>
              <td>Yes — failed NL commands auto-reroute to AI</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Output</td>
              <td>Full agent response in terminal</td>
              <td>Suggested command you confirm before running</td>
            </tr>
            <tr>
              <td>Shell support</td>
              <td>ZSH and Bash 4+</td>
              <td>Any shell with gh CLI</td>
            </tr>
            <tr>
              <td>Open source</td>
              <td>Yes (MIT)</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Dependencies</td>
              <td>None (pure shell)</td>
              <td>gh CLI + Copilot extension</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Different mental models</h2>
        <p>
          Copilot CLI is a tool you reach for: &ldquo;I need a command, let me ask
          Copilot.&rdquo; It generates a shell command and asks you to confirm
          before running it. That confirmation step is intentional — it&rsquo;s a
          safety net.
        </p>
        <p>
          Lacy is invisible until you need it. Type <code>git log</code> and it
          runs normally. Type &ldquo;show me the last 5 commits with diffs&rdquo;
          and it goes to your AI agent. You don&rsquo;t change your behavior.
          The routing just happens.
        </p>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You want AI access without changing how you type</li>
          <li>
            You already use Claude Code, Gemini CLI, or another AI agent in
            your terminal
          </li>
          <li>You want real-time visual feedback on what will happen</li>
          <li>You prefer open source with no subscription</li>
        </ul>
      </section>

      <section>
        <h2>When to use Copilot CLI</h2>
        <ul>
          <li>
            You want AI to generate a specific command and confirm before running
          </li>
          <li>You already pay for GitHub Copilot</li>
          <li>You prefer explicit control over when AI is invoked</li>
          <li>
            You want <code>gh copilot explain</code> for understanding existing
            commands
          </li>
        </ul>
      </section>

      <section>
        <h2>Can you use both?</h2>
        <p>
          Yes. Copilot CLI is a standalone command — it doesn&rsquo;t conflict with
          Lacy. You can use Lacy for automatic routing and still call{" "}
          <code>gh copilot suggest</code> when you specifically want a command
          suggestion with a confirmation step.
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
      <RelatedComparisons current="github-copilot-cli" />
    </article>
    <FaqSchema items={faqs} />
    </>
  );
}
