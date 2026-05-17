import type { Metadata } from "next";
import { RelatedComparisons } from "../RelatedComparisons";
import Link from "next/link";
import { FaqSchema } from "../faq-schema";

const faqs = [
  {
    question: "What is the difference between Lacy Shell and Cursor?",
    answer:
      "Cursor is a full AI-native code editor (VS Code fork) with autocomplete, inline edits, and multi-file AI changes. Lacy Shell is a ZSH/Bash plugin that adds natural language routing to your terminal. Cursor lives in your editor; Lacy lives in your shell.",
  },
  {
    question: "Can I use Lacy Shell and Cursor together?",
    answer:
      "Yes, and many developers do. Use Cursor for code editing with its powerful AI features, and use Lacy in your terminal (or even inside Cursor's built-in terminal) for shell workflows, DevOps tasks, and quick questions. They cover different surfaces with no overlap.",
  },
  {
    question: "Is Lacy Shell free?",
    answer:
      "Yes. Lacy Shell is free and MIT licensed. Cursor has a free tier but requires a paid subscription ($20/mo Pro) for full AI usage.",
  },
  {
    question: "Does Lacy Shell work inside Cursor's terminal?",
    answer:
      "Yes. Lacy is a shell plugin that works inside any terminal, including Cursor's built-in terminal panel. If you type natural language in Cursor's terminal without Lacy, it tries to execute it as a command. With Lacy, it routes to your AI agent.",
  },
  {
    question: "Is Lacy Shell open source?",
    answer:
      "Yes. Lacy Shell is open source under the MIT license. Cursor is proprietary.",
  },
];

export const metadata: Metadata = {
  title: "Lacy Shell vs Cursor — Terminal Plugin vs AI Code Editor",
  description:
    "Compare Lacy Shell and Cursor. Lacy adds AI to your terminal. Cursor adds AI to your editor. See when each approach makes sense.",
  alternates: { canonical: "/vs/cursor" },
  openGraph: {
    title: "Lacy Shell vs Cursor — Terminal Plugin vs AI Code Editor",
    description:
      "Compare Lacy Shell and Cursor. Terminal-native AI routing vs IDE-integrated AI coding.",
    url: "/vs/cursor",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lacy Shell — talk to your terminal with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacy Shell vs Cursor — Terminal Plugin vs AI Code Editor",
    description:
      "Compare Lacy Shell and Cursor. Terminal-native AI routing vs IDE-integrated AI coding.",
    images: ["/og.jpg"],
  },
};

export default function VsCursor() {
  return (
    <>
    <article className="vs-article">
      <p className="vs-label">comparison</p>
      <h1>
        Lacy Shell vs <em>Cursor</em>
      </h1>
      <p className="vs-subtitle">
        A shell plugin for your terminal vs an AI-native code editor.
      </p>

      <section>
        <h2>The core difference</h2>
        <p>
          Cursor is a full code editor (VS Code fork) with AI built into every
          surface &mdash; autocomplete, chat, inline edits, multi-file changes.
          Lacy is a shell plugin that detects natural language and routes it to an
          AI agent. Cursor lives in your editor. Lacy lives in your terminal.
        </p>
      </section>

      <section>
        <table className="vs-table">
          <thead>
            <tr>
              <th></th>
              <th>Lacy Shell</th>
              <th>Cursor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>ZSH/Bash plugin</td>
              <td>Code editor (VS Code fork)</td>
            </tr>
            <tr>
              <td>Where it runs</td>
              <td>Your terminal</td>
              <td>Desktop app (Electron)</td>
            </tr>
            <tr>
              <td>AI scope</td>
              <td>Shell input routing</td>
              <td>Code editing, generation, chat, autocomplete</td>
            </tr>
            <tr>
              <td>Invocation</td>
              <td>Just type in your shell</td>
              <td>Cmd+K, Cmd+L, Tab, or inline</td>
            </tr>
            <tr>
              <td>AI backend</td>
              <td>Any CLI (Claude, Gemini, OpenCode, etc.)</td>
              <td>Cursor models, Claude, GPT (via Cursor)</td>
            </tr>
            <tr>
              <td>API key required</td>
              <td>No (uses your installed CLI tool)</td>
              <td>No (bundled with subscription)</td>
            </tr>
            <tr>
              <td>Terminal integration</td>
              <td>Native &mdash; it is your terminal</td>
              <td>Built-in terminal panel</td>
            </tr>
            <tr>
              <td>Real-time indicator</td>
              <td>Yes &mdash; green/magenta as you type</td>
              <td>No (terminal is standard)</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>Free, MIT licensed</td>
              <td>Free tier + $20/mo Pro</td>
            </tr>
            <tr>
              <td>Open source</td>
              <td>Yes</td>
              <td>No (proprietary)</td>
            </tr>
            <tr>
              <td>Platform</td>
              <td>macOS, Linux, WSL</td>
              <td>macOS, Linux, Windows</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Different layers of the stack</h2>
        <p>
          Cursor is an editor-first experience. It shines when you&rsquo;re
          writing code &mdash; autocomplete, multi-file context, inline diffs,
          and chat that understands your project.
        </p>
        <p>
          Lacy is a terminal-first experience. It shines when you&rsquo;re in
          your shell &mdash; running builds, checking logs, managing servers, and
          asking quick questions without leaving the command line.
        </p>
        <p>
          Cursor&rsquo;s terminal panel is a standard terminal. It doesn&rsquo;t
          do natural language detection in the shell. If you type &ldquo;what
          port is this running on&rdquo; in Cursor&rsquo;s terminal, it tries to
          execute it. With Lacy, it routes to your AI agent.
        </p>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You live in the terminal and want AI there, not just in your editor</li>
          <li>You use Vim, Neovim, Emacs, or any non-Cursor editor</li>
          <li>You want to pick your own AI backend (Claude Code, Gemini CLI, etc.)</li>
          <li>You want automatic NL routing without hotkeys or prefixes</li>
          <li>You want a free, open-source, zero-account solution</li>
        </ul>
      </section>

      <section>
        <h2>When to use Cursor</h2>
        <ul>
          <li>You want AI deeply embedded in your code editing workflow</li>
          <li>You want autocomplete, inline edits, and multi-file AI changes</li>
          <li>You prefer a GUI editor with project-wide AI context</li>
          <li>You want everything bundled &mdash; no CLI tools to configure</li>
        </ul>
      </section>

      <section>
        <h2>Can you use both?</h2>
        <p>
          Yes, and many developers do. Use Cursor for code editing with its
          powerful AI features. Use Lacy in your standalone terminal (or even in
          Cursor&rsquo;s built-in terminal) for shell workflows, DevOps tasks,
          and quick questions. They cover different surfaces with no overlap.
        </p>
      </section>

      <section>
        <h2>The bottom line</h2>
        <p>
          Cursor is one of the best AI-powered code editors available. It
          fundamentally changes how you write code in an IDE.
        </p>
        <p>
          Lacy doesn&rsquo;t try to be an editor. It makes your shell
          AI-aware &mdash; the place where you run commands, manage
          infrastructure, and interact with your system. If Cursor is AI for your
          code, Lacy is AI for your terminal. Most developers spend time in both
          places.
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
      <RelatedComparisons current="cursor" />
    </article>
    <FaqSchema items={faqs} />
    </>
  );
}
