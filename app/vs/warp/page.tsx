import type { Metadata } from "next";
import Link from "next/link";
import { FaqSchema } from "../faq-schema";
import { RelatedComparisons } from "../RelatedComparisons";

const faqs = [
  {
    question: "What is the difference between Lacy Shell and Warp?",
    answer:
      "Lacy Shell is a ZSH/Bash plugin that adds AI routing to your existing terminal — it detects natural language and sends it to an AI agent automatically. Warp is a full terminal replacement app. You install Lacy into your current terminal; Warp requires switching to a new terminal emulator.",
  },
  {
    question: "Can I use Lacy Shell and Warp together?",
    answer:
      "Yes. Lacy is a shell plugin that works inside any terminal, including Warp. If you use Warp but prefer automatic natural language detection over the # prefix, you can add Lacy to your ZSH config and get both.",
  },
  {
    question: "Is Lacy Shell free?",
    answer:
      "Yes. Lacy Shell is free and MIT licensed. There is no subscription, no account required, and no paid tier.",
  },
  {
    question: "Does Lacy Shell work on macOS and Linux?",
    answer:
      "Yes. Lacy Shell supports macOS, Linux, and WSL. It works with ZSH and Bash 4+.",
  },
  {
    question: "Does Lacy Shell require an account?",
    answer:
      "No. Lacy Shell requires no account or login. Install it with a single command and it works immediately.",
  },
];

export const metadata: Metadata = {
  title: "Lacy Shell vs Warp — Plugin vs Terminal Replacement",
  description:
    "Compare Lacy Shell and Warp Terminal. Lacy is a ZSH/Bash plugin that adds AI routing to your existing terminal. Warp replaces your terminal entirely. See the differences.",
  alternates: { canonical: "/vs/warp" },
  openGraph: {
    title: "Lacy Shell vs Warp — Plugin vs Terminal Replacement",
    description:
      "Compare Lacy Shell and Warp Terminal. Plugin approach vs full terminal replacement.",
    url: "/vs/warp",
    images: [{ url: "/api/og?section=vs&title=Warp&subtitle=Plugin+vs+terminal+replacement", width: 1200, height: 630, alt: "Lacy Shell vs Warp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacy Shell vs Warp — Plugin vs Terminal Replacement",
    description:
      "Compare Lacy Shell and Warp Terminal. Plugin approach vs full terminal replacement.",
    images: ["/api/og?section=vs&title=Warp&subtitle=Plugin+vs+terminal+replacement"],
  },
};

export default function VsWarp() {
  return (
    <>
    <article className="vs-article">
      <p className="vs-label">comparison</p>
      <h1>
        Lacy Shell vs <em>Warp</em>
      </h1>
      <p className="vs-subtitle">
        A plugin for your terminal vs a replacement for your terminal.
      </p>

      <section>
        <h2>The core difference</h2>
        <p>
          Warp is a full terminal replacement &mdash; a new app you switch to. Lacy is
          a shell plugin &mdash; it adds AI routing to whatever terminal you already
          use (iTerm2, Alacritty, Kitty, the default Terminal.app, or yes, even
          Warp).
        </p>
      </section>

      <section>
        <table className="vs-table">
          <thead>
            <tr>
              <th></th>
              <th>Lacy Shell</th>
              <th>Warp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>ZSH/Bash plugin</td>
              <td>Terminal emulator</td>
            </tr>
            <tr>
              <td>AI routing</td>
              <td>Automatic &mdash; detects NL vs commands</td>
              <td>Requires # prefix or Ctrl+Shift+Space</td>
            </tr>
            <tr>
              <td>Your terminal</td>
              <td>Keep yours</td>
              <td>Must switch to Warp</td>
            </tr>
            <tr>
              <td>AI backend</td>
              <td>Your choice (Claude, Gemini, OpenCode, etc.)</td>
              <td>Warp AI (proprietary)</td>
            </tr>
            <tr>
              <td>Real-time indicator</td>
              <td>Yes &mdash; color changes as you type</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>Free, MIT licensed</td>
              <td>Free tier + paid plans</td>
            </tr>
            <tr>
              <td>Open source</td>
              <td>Yes</td>
              <td>Partially (warpd)</td>
            </tr>
            <tr>
              <td>Platform</td>
              <td>macOS, Linux, WSL</td>
              <td>macOS, Linux</td>
            </tr>
            <tr>
              <td>Install</td>
              <td>One line, 30 seconds</td>
              <td>Download app</td>
            </tr>
            <tr>
              <td>Account required</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Plugin vs product: why the distinction matters</h2>
        <p>
          Warp is built on the premise that the terminal itself needs to be
          reimagined. It introduces blocks (each command and output grouped as a
          discrete unit), a modern input editor, team collaboration features, and
          its own AI layer. To get any of this, you switch terminal apps and
          create an account.
        </p>
        <p>
          Lacy starts from a different premise: your terminal is fine. What&rsquo;s
          missing is AI at the input level. So instead of replacing the terminal,
          Lacy hooks into your shell&rsquo;s execute function and intercepts input
          before it runs &mdash; detecting whether you typed a shell command or
          natural language.
        </p>
        <p>
          This means Lacy works in iTerm2, Alacritty, Kitty, Terminal.app, Ghostty,
          tmux, or any environment where ZSH or Bash runs. You keep your setup,
          your keybindings, your color scheme, and your muscle memory.
        </p>
      </section>

      <section>
        <h2>Side-by-side: AI access in practice</h2>
        <p>
          Here&rsquo;s how the same interaction looks in each tool:
        </p>
        <pre className="blog-pre">{`# Warp: ask AI a question
$ # what's the difference between SIGTERM and SIGKILL
  ↑ type # or press Ctrl+Shift+Space first

# Lacy: same question, no prefix or mode switch
$ what's the difference between SIGTERM and SIGKILL
  ↑ detected as natural language, routed to your agent`}</pre>
        <pre className="blog-pre">{`# Warp: generate a command
$ # find all processes using port 3000

# Lacy: type naturally at any terminal
$ find all processes using port 3000`}</pre>
        <pre className="blog-pre">{`# Warp: mixed session — command then question
$ docker ps                                    ← runs normally
$ # why is my container exiting immediately    ← requires # prefix

# Lacy: same session, no mode-switching needed
$ docker ps                                    ← runs normally
$ why is my container exiting immediately      ← auto-routed`}</pre>
        <p>
          The practical difference: with Warp you&rsquo;re always making a conscious
          choice to invoke AI. With Lacy you type, and the routing is automatic.
        </p>
      </section>

      <section>
        <h2>Real-world scenarios</h2>
        <p>
          <strong>Remote SSH sessions.</strong> Warp&rsquo;s blocks and AI features run
          locally in the Warp app &mdash; they don&rsquo;t extend into SSH sessions on
          remote servers. Lacy operates at the shell level, so if you install it on
          a remote machine, you get the same automatic detection in that session too.
        </p>
        <p>
          <strong>Existing terminal investment.</strong> You&rsquo;ve spent years tuning
          iTerm2 with custom profiles, color schemes, tmux integrations, and keyboard
          shortcuts. Switching to Warp means rebuilding that from scratch. Lacy adds
          AI routing without touching any of your terminal configuration.
        </p>
        <p>
          <strong>Team environments.</strong> Warp has team features &mdash; shared
          runbooks, collaboration notebooks, and team workflows. These are useful for
          certain orgs. Lacy is a personal shell plugin with none of that. If shared
          team tooling is the priority, Warp has a clear advantage there.
        </p>
        <p>
          <strong>Choosing your AI.</strong> Warp uses its own proprietary AI model.
          Lacy routes to whatever CLI agent you configure &mdash; Claude Code (<code>claude</code>), Gemini
          CLI (<code>gemini</code>), OpenCode (<code>opencode</code>), or anything else. If you already have a preferred AI and
          don&rsquo;t want to switch, Lacy lets you keep using it.
        </p>
      </section>

      <section>
        <h2>Switching from Warp</h2>
        <p>
          If you&rsquo;ve been using Warp and want to try a different terminal with Lacy,
          the transition is straightforward. Install your preferred terminal (iTerm2
          and Ghostty are popular choices on macOS), add Lacy to your shell config,
          and configure it to use your preferred AI CLI. Your shell history and ZSH
          configuration carry over unchanged &mdash; Lacy doesn&rsquo;t touch those.
        </p>
        <p>
          What you leave behind: Warp&rsquo;s blocks interface and team features. What
          you gain: automatic AI routing to the agents you already have installed,
          without a proprietary intermediary or account requirement.
        </p>
      </section>

      <section>
        <h2>When to use Lacy</h2>
        <ul>
          <li>You like your current terminal and don&rsquo;t want to switch</li>
          <li>You want to use your own AI backend (Claude Code, Gemini CLI, etc.)</li>
          <li>You want automatic routing without prefixes or hotkeys</li>
          <li>You want a lightweight plugin, not a full app replacement</li>
          <li>You need Bash 4+ support (not just ZSH)</li>
        </ul>
      </section>

      <section>
        <h2>When to use Warp</h2>
        <ul>
          <li>You want a modern terminal with built-in IDE-style features (blocks, notebooks)</li>
          <li>You prefer an integrated AI without configuring external CLI tools</li>
          <li>You want team collaboration features in your terminal</li>
          <li>You&rsquo;re okay switching terminal apps and creating an account</li>
        </ul>
      </section>

      <section>
        <h2>Can you use both?</h2>
        <p>
          Yes. Lacy is a shell plugin &mdash; it works inside any terminal, including
          Warp. If you use Warp but prefer automatic NL detection over the{" "}
          <code>#</code> prefix, add Lacy to your ZSH config and get both Warp&rsquo;s
          interface and Lacy&rsquo;s transparent routing.
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
          <li>
            <Link href="/blog/the-post-execution-reroute-pattern">
              The post-execution reroute pattern
            </Link>{" "}
            — what happens when a natural-language query accidentally runs as a
            shell command and fails.
          </li>
        </ul>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
        <p>
          <strong>Does Lacy work inside Warp?</strong>
        </p>
        <p>
          Yes. Lacy hooks into ZSH/Bash, not the terminal emulator. If you run ZSH
          inside Warp, Lacy works there too. You can have Warp&rsquo;s blocks and UI
          alongside Lacy&rsquo;s automatic natural-language routing.
        </p>
        <p>
          <strong>Does Lacy have Warp&rsquo;s blocks feature?</strong>
        </p>
        <p>
          No. Lacy is a pure input router &mdash; it detects whether your input is
          natural language or a shell command and routes accordingly. It doesn&rsquo;t
          change how terminal output is displayed or add a blocks-style interface.
          If you want Warp&rsquo;s visual command grouping, Warp is the right tool for that.
        </p>
        <p>
          <strong>What terminal should I pair with Lacy?</strong>
        </p>
        <p>
          Any terminal running ZSH or Bash works. iTerm2, Ghostty, Alacritty, Kitty,
          and Terminal.app are all common choices on macOS. The emulator doesn&rsquo;t
          matter &mdash; Lacy operates at the shell level, not the terminal level.
        </p>
        <p>
          <strong>Can I get Warp&rsquo;s AI features in my existing terminal?</strong>
        </p>
        <p>
          Not Warp&rsquo;s specifically &mdash; those are tied to the Warp app. But Lacy
          gives you automatic AI routing in any terminal, connected to Claude Code,
          Gemini CLI, or whatever AI CLI you prefer. Whether that&rsquo;s equivalent
          depends on which agent you connect.
        </p>
        <p>
          <strong>Is Warp&rsquo;s AI better than what Lacy routes to?</strong>
        </p>
        <p>
          It depends on your preference. Warp uses its own model. Lacy routes to
          whichever CLI agent you configure. If you already have <code>claude</code> or
          <code>gemini</code> installed and use them regularly, Lacy routes to them at full
          quality &mdash; no additional subscription or account needed.
        </p>
      </section>

      <section>
        <h2>The bottom line</h2>
        <p>
          Warp is a genuinely strong terminal. Its blocks interface, modern input
          editing, and team features represent real innovation in how terminals can
          work. The tradeoff is commitment &mdash; you switch apps, create an account,
          and accept Warp&rsquo;s AI model instead of your own.
        </p>
        <p>
          Lacy takes no position on which terminal is best. It makes whatever
          terminal you use AI-aware &mdash; with automatic routing, real-time visual
          feedback, and connection to the AI agents you already prefer. If you like
          your current setup and want AI in it without switching apps, Lacy is the
          path of least resistance.
        </p>
      </section>

      <RelatedComparisons current="warp" />
    </article>
    <FaqSchema items={faqs} />
    </>
  );
}
