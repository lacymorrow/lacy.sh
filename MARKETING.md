# Lacy Shell Marketing

Working document for positioning, messaging, and go-to-market strategy.

---

## Positioning

### One-liner
**"Talk to your shell."**

### Elevator pitch
Lacy Shell is a ZSH plugin that detects whether you're typing a command or asking a question — commands execute normally, questions go to your AI agent. No mode switching, no prefixes, no context switching. It works with any AI CLI tool you already use.

### Category
**Shell integration layer for AI CLI tools**

Not competing with Claude Code, OpenCode, Codex CLI, or Gemini CLI — Lacy makes all of them better. The complement positioning: as AI CLI tools grow, Lacy grows.

### Jobs to Be Done
| User state | Job |
|------------|-----|
| Using AI CLI, switching contexts | "Stop copy-pasting between terminal and AI" |
| Evaluating AI CLI tools | "Pick any tool, Lacy works with all of them" |
| Power user wanting control | "Shell when you want shell, AI when you want AI — automatically" |
| Worried about vendor lock-in | "Open source. Switch AI tools anytime." |

---

## Core Messaging

### Primary headline
**Talk to your shell.**

### Supporting headlines
- Commands execute. Questions get answered.
- Your terminal, upgraded.
- The shell layer that makes AI invisible.
- Type naturally. Your shell figures out the rest.

### Key phrases
- "No mode switching"
- "No prefixes"
- "Works with Claude, Codex, Gemini, OpenCode — any AI CLI"
- "Shell-native AI integration"
- "Commands stay commands. Questions find answers."

### Proof points
- Real-time indicator shows routing before you hit enter (green = shell, magenta = AI)
- Smart rerouting: if shell fails, automatically retry with AI
- Open source, FSL-1.1-MIT licensed
- Install in 30 seconds (curl, npx, or homebrew)

---

## Psychological Framework

These principles guide all marketing decisions.

### Active levers
| Principle | How we use it |
|-----------|---------------|
| **Status-quo bias** | "You don't need a new terminal. Just type." — no behavior change required |
| **Zero-price effect** | Free + open source, displayed prominently |
| **Mere exposure (Rule of 7)** | Need 7+ touchpoints — plan for multi-channel presence |
| **Endowment + IKEA effect** | Interactive installer, config customization, mode selection = investment |
| **Social proof** | GitHub stars, "works with X" logos, user testimonials |
| **Loss aversion** | "Stop losing time to copy-paste" framing |
| **Authority by association** | Claude, Codex, Gemini logos lend credibility |

### Messaging don'ts
- Don't fight existing beliefs ("AI is slow" / "terminals are for commands only")
- Don't require behavior change in the pitch
- Don't compete with AI CLI tools — complement them

---

## Visual Assets

### Priority 1 — The viral unit
- [ ] **5-second GIF**: Type `ls -la` (green indicator), type `fix the auth bug` (magenta indicator). That's it. The color change tells the story.
- [ ] Static screenshot of same, for Twitter cards / OG image

### Priority 2 — Demo content
- [ ] **30-second video**: Full flow — install, type commands, type questions, see routing happen
- [ ] **2-minute deep dive**: Smart rerouting, mode switching, tool configuration

### Priority 3 — Social/PR
- [ ] OG image (black bg, Instrument Serif headline, mono subtext, violet accent)
- [ ] GitHub social preview
- [ ] Twitter/X header for @lacymorrow if promoting

### Asset specs (from DESIGN.md)
- Background: #09090b
- Headline: Instrument Serif italic
- Body: DM Mono
- Accent: violet (#a78bfa)
- Shell indicator: green (#4ade80)
- Agent indicator: magenta (#d946ef)

---

## Launch Channels

### Tier 1 — Do first
| Channel | Action | Status |
|---------|--------|--------|
| Product Hunt | Launch with "Talk to your shell" positioning | [ ] Not started |
| Hacker News | Show HN post — the NL detection is technically interesting | [ ] Not started |
| Dev.to / Hashnode | "How I made my terminal understand English" technical article | [ ] Not started |
| Twitter/X | Demo GIF + thread on the problem/solution | [ ] Not started |
| Reddit | r/commandline, r/zsh, r/programming — helpful comments first, then post | [ ] Not started |

### Tier 2 — Integration marketing
| Channel | Action | Status |
|---------|--------|--------|
| Claude Code | Open issue/PR suggesting Lacy in docs as shell integration | [ ] Not started |
| OpenCode | Same | [ ] Not started |
| Codex CLI | Same | [ ] Not started |
| Gemini CLI | Same | [ ] Not started |

### Tier 3 — Content/SEO
| Page | Target query | Status |
|------|--------------|--------|
| /vs/switching | "ai terminal context switching" | [ ] Not started |
| /tools/claude | "claude code shell integration" | [ ] Not started |
| /tools/opencode | "opencode tips" | [ ] Not started |
| Homepage | "talk to your shell", "ai shell plugin" | [x] Live |

### Tier 4 — Community seeding
- [ ] Create example dotfiles repo with Lacy configured
- [ ] Answer "how do I use [AI CLI] without switching contexts" questions
- [ ] Participate in AI CLI tool discussions (don't spam)

---

## Free Tools (Engineering as Marketing)

Ideas for standalone tools that drive awareness:

1. **"Is this a shell command?"** — Web tool where you paste text, it tells you shell/NL classification. Demonstrates core detection logic. Shareable.

2. **Shell compatibility checker** — "Will Lacy work with your setup?" — checks terminal, ZSH version, installed AI tools. Lead gen potential.

3. **AI CLI comparison chart** — Interactive table comparing Claude Code vs OpenCode vs Codex vs Gemini CLI. Lacy shown as "works with all." SEO magnet.

---

## Content Calendar

### Week 1: Asset creation
- [ ] Create 5-second demo GIF
- [ ] Create 30-second video
- [ ] Update OG image with new positioning
- [ ] Write Show HN post draft
- [ ] Write Dev.to article draft

### Week 2: Soft launch
- [ ] Post in r/commandline, r/zsh with genuine helpful framing
- [ ] Share GIF on Twitter with problem/solution thread
- [ ] Submit Show HN

### Week 3: Product Hunt
- [ ] Submit to Product Hunt
- [ ] Coordinate upvotes from network
- [ ] Respond to all comments

### Week 4: Integration push
- [ ] Open issues/PRs on AI CLI repos
- [ ] Reach out to AI CLI maintainers directly
- [ ] Start comparison/SEO pages

---

## Metrics

### North Star
**Weekly active shell sessions** (not installs, not stars — actual usage)

### Leading indicators
- GitHub stars (vanity but signals momentum)
- npm/homebrew installs
- Website visits
- Demo GIF views/shares

### Tracking
- [ ] Set up analytics on lacy.sh
- [ ] Add anonymous usage ping in plugin (opt-in)
- [ ] Track install source (curl vs npx vs brew)

---

## AI Tools Available

| Tool | Access | Use case |
|------|--------|----------|
| Gemini Nano/Banana | Yes | Static image generation (OG images, social cards, diagrams) |
| Veo | Yes | Video generation (backgrounds, transitions, explainer B-roll) |
| Screen Studio | Yes | Screen recording (authentic terminal demos) |

---

## Asset Production Plan

### Asset 1: Demo GIF (The Viral Unit)

**Purpose:** Single most important asset. Goes everywhere — Twitter, Reddit, GitHub README, Product Hunt, embeds in articles.

**Tool:** Screen Studio (authentic recording)

**Specs:**
- Duration: 5-8 seconds
- Resolution: 1200x800 or 16:9 aspect ratio
- Format: GIF for embeds, MP4 for Twitter/quality
- File size: Under 5MB for GIF, under 15MB for MP4
- Frame rate: 30fps (Screen Studio default is fine)

**Terminal setup before recording:**
```bash
# Clean terminal state
clear

# Make sure Lacy is in auto mode
export LACY_SHELL_MODE=auto

# Use a clean prompt (optional - adjust to your actual prompt)
# The indicator bar is what matters, not the prompt style

# Ensure a realistic working directory
cd ~/projects/myapp
```

**Screen Studio settings:**
- Zoom: 150-200% on the terminal (fills frame, text is readable)
- Background: Transparent or #09090b (match site)
- Cursor: Visible, not too large
- Padding: Minimal — the terminal should dominate
- No wallpaper/desktop visible

**Script (see "Demo GIF Script" section below)**

**Post-production:**
- Trim dead frames at start/end
- Loop seamlessly (last frame should feel like it could restart)
- Export as GIF (for universal embed) and MP4 (for Twitter quality)

---

### Asset 2: 30-Second Demo Video

**Purpose:** Full flow for people who want more context. Product Hunt, YouTube embed, landing page hero.

**Tool:** Screen Studio + Veo (for transitions/polish)

**Specs:**
- Duration: 25-35 seconds
- Resolution: 1920x1080
- Format: MP4
- Audio: Optional subtle sound design, no voiceover needed

**Storyboard:**
| Time | Visual | Text overlay (optional) |
|------|--------|-------------------------|
| 0-3s | Clean terminal, cursor blinking | "Talk to your shell." |
| 3-8s | Type `git status` → green indicator → runs | — |
| 8-13s | Type `ls -la src/` → green indicator → runs | — |
| 13-20s | Type `why is the auth test failing` → magenta indicator → AI responds | — |
| 20-25s | Type `fix it` → magenta indicator → AI responds | — |
| 25-30s | Fade to logo/URL | "lacy.sh" |

**Post-production:**
- Speed up AI response wait time (don't show full generation)
- Smooth transitions between commands
- Fade in/out at ends

---

### Asset 3: OG Image / Social Card

**Purpose:** Link previews on Twitter, Slack, Discord, LinkedIn, iMessage.

**Tool:** Gemini Nano/Banana (generate) or Figma (manual)

**Specs:**
- Size: 1200x630 (standard OG)
- Background: #09090b (pure black from design system)
- Format: PNG

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                                                            │
│           Talk to your *shell.*                            │
│           ─────────────────────                            │
│           (Instrument Serif, "shell" in italic violet)     │
│                                                            │
│           Commands execute. Questions get answered.        │
│           (DM Mono, fg-2 gray)                             │
│                                                            │
│           ┃ ls -la        ┃ why is this broken            │
│           (green bar)     (magenta bar)                    │
│                                                            │
│                                           lacy.sh          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Gemini prompt:**
> Minimalist developer tool social card. Pure black background (#09090b). Large serif headline "Talk to your shell." with the word "shell" in italic violet (#a78bfa). Below that, monospace text "Commands execute. Questions get answered." in gray. Two small terminal-style elements showing a green indicator bar next to "ls -la" and a magenta indicator bar next to "why is this broken". Small "lacy.sh" in bottom right. No gradients, no glows, no decorative elements. Terminal aesthetic.

---

### Asset 4: GitHub Social Preview

**Purpose:** Shows when repo is shared on social media.

**Specs:**
- Size: 1280x640
- Same design as OG image, slightly adjusted for aspect ratio

---

### Asset 5: How It Works Diagram

**Purpose:** Visual explanation of the routing logic for docs, README, articles.

**Tool:** Code (SVG) or Figma — doesn't need AI generation

**Concept:**
```
┌─────────────┐
│  You type   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Lacy Shell         │
│  NL Detection       │
└──────┬──────────────┘
       │
   ┌───┴───┐
   │       │
   ▼       ▼
┌─────┐  ┌─────┐
│Shell│  │ AI  │
│ ██  │  │ ██  │
│green│  │pink │
└─────┘  └─────┘
```

**Specs:**
- Style: Monospace text, minimal boxes, indicator colors only
- Background: Transparent or #09090b
- Export: SVG (scalable), PNG (fallback)

---

### Asset 6: Tool Compatibility Logos

**Purpose:** "Works with" section showing Claude, Codex, Gemini, OpenCode logos.

**Approach:**
- Use official logos in grayscale/muted form
- Or create generic "AI CLI" icons that don't require brand permission
- Simple monospace text list may be more on-brand than logos

---

### Asset 7: 2-Minute Explainer (Optional)

**Purpose:** Deep dive for curious developers. YouTube, docs embed.

**Tool:** Screen Studio + Veo (for B-roll/transitions)

**Outline:**
1. (0-15s) Problem: "You use AI in your terminal. But you keep switching contexts."
2. (15-45s) Solution: "Lacy Shell detects what you're typing — commands or questions."
3. (45-90s) Demo: Show auto mode, shell mode, agent mode, smart rerouting
4. (90-105s) Install: Show curl/npx/brew install
5. (105-120s) CTA: "lacy.sh — Talk to your shell."

---

## Demo GIF Script

### Setup checklist
- [ ] Terminal using your normal theme (should show indicator colors clearly)
- [ ] Clean working directory (something realistic like `~/projects/myapp`)
- [ ] Lacy Shell in auto mode (`export LACY_SHELL_MODE=auto`)
- [ ] Clear the terminal (`clear`)
- [ ] Screen Studio recording, zoomed to terminal, no desktop visible

### The script

**Version A: Minimal (5 seconds)**

| Action | What you type | Indicator | Duration |
|--------|---------------|-----------|----------|
| 1. Type command | `git status` | Green appears as you type | 1.5s |
| 2. Pause | — | Green visible | 0.5s |
| 3. Clear line | Ctrl+U or backspace all | — | 0.5s |
| 4. Type question | `why is the build failing` | Magenta appears as you type | 2s |
| 5. Pause | — | Magenta visible | 0.5s |

**Don't hit enter.** The point is to show the indicator changing in real-time, not the execution. Hitting enter adds complexity and length.

**Version B: With execution (8-10 seconds)**

| Action | What you type | Indicator | Duration |
|--------|---------------|-----------|----------|
| 1. Type command | `ls -la` | Green appears | 1s |
| 2. Execute | Enter | Output shows | 1.5s |
| 3. Type question | `what does the src folder contain` | Magenta appears | 2s |
| 4. Execute | Enter | AI responds (trim this in post) | 2s |
| 5. Hold on response | — | — | 1s |

**Version C: Color contrast focus (5 seconds)**

Fastest way to show the value prop:

| Action | What you type | Indicator |
|--------|---------------|-----------|
| 1. | `npm install` | Green |
| 2. | (backspace) | — |
| 3. | `install the auth package` | Magenta |

The identical word "install" routes differently based on context. This is the "aha" moment.

### Recommended: Version A or C

Version A is cleanest. Version C has the strongest "aha" but requires viewers to notice the word "install" appears in both.

### Recording tips

1. **Type at readable speed** — not your normal fast typing. Viewers need to read along.
2. **Pause briefly** after the indicator appears — let it register.
3. **Don't hit enter in Version A/C** — the indicator is the star, not the output.
4. **Record 3-4 takes** — pick the cleanest one.
5. **Check indicator visibility** — green and magenta should be clearly distinct on your terminal theme.

### Post-production

1. Trim dead frames at start (before you start typing)
2. Trim dead frames at end (after the pause)
3. If looping: end on a frame that transitions smoothly to start
4. Export GIF at 30fps, optimize for file size
5. Export MP4 separately for Twitter (better quality)

---

## Gemini/Veo Prompts

### OG Image prompt (Gemini Nano/Banana)

```
Minimalist social media card for a developer tool. Dimensions 1200x630.

Background: Pure black (#09090b).

Center-top: Large headline "Talk to your shell." in elegant serif font. The word "shell" should be italic and colored violet (#a78bfa). Rest of text is off-white (#fafafa).

Below headline: Smaller monospace text "Commands execute. Questions get answered." in medium gray (#a1a1aa).

Lower section: Two minimal terminal line representations side by side:
- Left: A 3px vertical green (#4ade80) bar followed by monospace text "ls -la"
- Right: A 3px vertical magenta (#d946ef) bar followed by monospace text "fix the bug"

Bottom right corner: Small monospace text "lacy.sh" in gray.

Style: Extremely minimal, no gradients, no glows, no decorative elements, no rounded corners. Terminal/code aesthetic. Dark mode. Editorial feel.
```

### Video B-roll prompt (Veo)

```
Abstract visualization of code/text being classified and routed.

Dark background. Streams of monospace text characters flowing, some highlighted in green, others in magenta/pink. The streams separate and flow to different destinations.

Minimal, geometric, no literal computers or people. Motion graphics style. 5 seconds, seamless loop.
```

---

## Resolution & Size Reference

### The Core Problem

Recording at one resolution, viewed at many sizes:
- Twitter: 504px wide in feed, 1200px expanded
- GitHub README: ~700px wide
- Product Hunt: 635px wide thumbnail
- Mobile: 375px wide

**If text isn't readable at 500px wide, the asset fails.**

### Screen Studio Settings

```
┌─ Recording ────────────────────────────────────────┐
│ Capture: Window (just terminal)                   │
│ Resolution: Auto (matches window)                 │
│ Zoom: Off during recording                        │
│ Background: #09090b or transparent                │
└───────────────────────────────────────────────────┘

┌─ Terminal Window ──────────────────────────────────┐
│ Size: 1600 x 1000 px                              │
│ Font: DM Mono, JetBrains Mono, or your pref       │
│ Font size: 20pt (bump up from normal 14-16)       │
│ Theme: Dark (green/magenta must be visible)       │
│ Prompt: Keep short (~ or minimal path)            │
│ Hide: Tab bar, scrollbar if possible              │
└───────────────────────────────────────────────────┘

┌─ Export (GIF) ─────────────────────────────────────┐
│ Resolution: 800 x 500                             │
│ Frame rate: 30fps                                 │
│ Colors: 256                                       │
│ Loop: Yes                                         │
│ Target size: < 5MB                                │
└───────────────────────────────────────────────────┘

┌─ Export (MP4) ─────────────────────────────────────┐
│ Resolution: 1200 x 675                            │
│ Frame rate: 30fps                                 │
│ Codec: H.264                                      │
│ Quality: High                                     │
└───────────────────────────────────────────────────┘
```

### Quick Reference Card

| Asset | Record At | Export At | Font Size |
|-------|-----------|-----------|-----------|
| Demo GIF | 1600 x 1000 | 800 x 500 (GIF), 1200 x 675 (MP4) | 20pt |
| OG Image | — | 1200 x 630 | 64px headline |
| GitHub Preview | — | 1280 x 640 | 64px headline |
| 30s Video | 1920 x 1080 | 1920 x 1080 | 16-18pt |
| 2min Video | 1920 x 1080 | 1920 x 1080 | 14-16pt |

### Platform Export Specs

**Demo GIF destinations:**
| Platform | Export Resolution | Format | Max Size |
|----------|-------------------|--------|----------|
| Twitter | 1200 x 675 | MP4 | 15MB |
| GitHub README | 800 x 500 | GIF | 5MB |
| Product Hunt | 1270 x 760 | GIF/MP4 | 3MB GIF |
| Universal | 960 x 600 | GIF | 5MB |

**Static images:**
| Platform | Size | Aspect |
|----------|------|--------|
| OG/Twitter/LinkedIn/Discord | 1200 x 630 | 1.91:1 |
| GitHub social preview | 1280 x 640 | 2:1 |

**Text sizing for images (must be readable at 504px wide):**
| Element | Size |
|---------|------|
| Headline | 64-80px |
| Subhead | 28-36px |
| Small text/URL | 20-24px minimum |

### Terminal Font Size by Asset

| Asset | Viewing Context | Font Size |
|-------|-----------------|-----------|
| 5s GIF | Scrolling, small embed | **20-22pt** |
| 30s video | Focused viewing | 16-18pt |
| 2min explainer | Full attention | 14-16pt |

Shorter = larger font. People glance at GIFs, watch videos.

---

## Show HN Post Draft

**Title (80 char max):**
```
Show HN: Lacy Shell – ZSH plugin that detects natural language and routes to AI
```

**Body:**

```
Hey HN,

I built a ZSH plugin that lets you talk to your shell. Type a command, it runs. Type a question, it goes to your AI agent. No mode switching, no prefixes.

Demo: [GIF or link to lacy.sh]

The detection works by analyzing the input in real-time:
- Starts with a valid command? → Shell (green indicator)
- Looks like natural language? → AI agent (magenta indicator)
- Ambiguous? → Shell tries first, and if it fails with a non-signal exit code, automatically reroutes to AI

The "reroute on failure" behavior is the interesting part. If you type something like "delete the temp files" and there's no `delete` command, the shell fails, and Lacy automatically sends it to your AI agent to interpret and execute.

It works with any AI CLI tool — Claude Code, OpenCode, Codex CLI, Gemini CLI, or anything that accepts stdin. You configure which tool to use, and Lacy handles the routing.

Install:
  curl -fsSL https://lacy.sh/install | sh
  # or: npx lacy
  # or: brew install lacymorrow/tap/lacy

Code: https://github.com/lacymorrow/lacy (FSL-1.1-MIT)

Technical details for those interested:
- Pure ZSH, no external dependencies for detection
- Uses zle-line-pre-redraw hook for real-time indicator updates
- Detection heuristics: command-path lookup, bare-word counting, NL marker detection (articles, pronouns, question words)
- region_highlight for first-word syntax coloring

I'd love feedback on the detection heuristics — there are definitely edge cases. The goal is to get it right 95% of the time and make the other 5% easy to override (Ctrl+O forces AI, Ctrl+E forces shell).

What commands trip it up for you?
```

**Alternate shorter title options:**
- `Show HN: Talk to your shell – ZSH plugin that routes commands vs. questions`
- `Show HN: Lacy Shell – Type commands or questions, your shell figures out which`

---

## Twitter/X Thread Draft

**Tweet 1 (Hook + GIF):**
```
Talk to your shell.

Type a command → it runs
Type a question → AI answers

No mode switching. No prefixes. Just type.

[DEMO GIF]
```

**Tweet 2 (How it works):**
```
How it works:

Lacy Shell analyzes what you're typing in real-time.

Green indicator = shell command
Magenta indicator = AI agent

You see the routing *before* you hit enter.
```

**Tweet 3 (The clever part):**
```
The clever part: smart rerouting.

Type "delete the temp files"
→ No `delete` command exists
→ Shell fails
→ Lacy automatically sends it to AI
→ AI interprets and executes

Shell-first, AI-fallback. Best of both.
```

**Tweet 4 (Works with everything):**
```
Works with any AI CLI:

• Claude Code
• OpenCode
• Codex CLI
• Gemini CLI
• Any tool that accepts stdin

You pick the AI. Lacy handles the routing.
```

**Tweet 5 (Install + CTA):**
```
Install in 30 seconds:

curl -fsSL https://lacy.sh/install | sh

Or: npx lacy
Or: brew install lacymorrow/tap/lacy

Open source, FSL-1.1-MIT licensed.

lacy.sh
```

**Tweet 6 (Optional - technical hook for devs):**
```
For the ZSH nerds:

• Pure ZSH, no dependencies
• zle-line-pre-redraw for real-time updates
• region_highlight for first-word coloring
• Bare-word counting + NL marker detection

The detection heuristics are the interesting part. PRs welcome.

github.com/lacymorrow/lacy
```

---

### Thread posting strategy

1. Post Tweet 1 with the GIF — this is the hook
2. Immediately reply with Tweets 2-5 as a thread
3. Tweet 6 is optional, post if engagement is good
4. Pin Tweet 1 to profile during launch window

### Hashtags (use sparingly, max 2)

- #DevTools
- #CLI
- #AI
- #ZSH

Don't hashtag-spam. One or two max, or none.

---

## Reddit Posts Draft

### r/commandline

**Title:** `I made a ZSH plugin that detects whether you're typing a command or a question`

**Body:**
```
I've been using Claude Code / OpenCode in my terminal, but I kept having to switch contexts — run a command here, ask AI there, copy-paste output back and forth.

So I built Lacy Shell. It analyzes what you're typing and routes it automatically:
- Commands → shell (green indicator)
- Questions → AI agent (magenta indicator)

The routing happens in real-time as you type, so you see where it's going before you hit enter.

The interesting part is "smart rerouting" — if you type something like `delete the temp files` and there's no `delete` command, the shell fails, and Lacy automatically reroutes to your AI agent.

Works with any AI CLI tool (Claude, Codex, Gemini, OpenCode, etc).

[GIF demo]

Install: `curl -fsSL https://lacy.sh/install | sh`

GitHub: https://github.com/lacymorrow/lacy

Would love feedback on edge cases — what commands do you think would trip up the detection?
```

### r/zsh

**Title:** `Show r/zsh: Real-time NL detection and AI routing in pure ZSH`

**Body:**
```
Built a plugin that detects natural language vs shell commands as you type and routes accordingly.

Technical approach:
- zle-line-pre-redraw hook for real-time indicator updates
- region_highlight array for first-word syntax coloring
- Detection: command -v lookup, bare-word counting, NL marker matching
- Configurable AI backend (claude, opencode, codex, gemini, etc)

The detection heuristics are imperfect but work ~95% of the time. Happy to discuss the edge cases.

[GIF]

Code: https://github.com/lacymorrow/lacy

Interested in feedback from ZSH power users on the detection logic.
```

---

## Dev.to Article Draft

**Title:**
```
How I Made My Terminal Understand English (Building a Natural Language Shell Router)
```

**Tags:** `opensource`, `ai`, `terminal`, `productivity`

**Cover image:** Use the OG image or a screenshot of the indicator in action

---

### Article body:

```markdown
I use AI coding tools in my terminal every day. Claude Code, OpenCode, Codex — they're incredible.

But there's a friction point that kept bugging me: **context switching**.

I'd run `git status`, see a problem, then have to think: "Okay, now I need to ask the AI about this." I'd launch a different tool, or prefix my input, or copy-paste output back and forth.

It felt wrong. I'm already in my terminal. Why can't I just... ask?

## The idea

What if my shell could figure out what I meant?

- `git status` → obviously a command, run it
- `why is the auth test failing` → obviously a question, send it to AI
- `delete the temp files` → could go either way

That last one is interesting. There's no `delete` command in most shells. But a human reading it knows what you want.

## Building the detection

The core challenge is classification: given a string, is it a shell command or natural language?

My first approach was naive: "Does it start with a valid command?" Check if the first word exists in PATH or is a shell builtin.

```zsh
local first_word="${input%% *}"
if command -v "$first_word" &>/dev/null; then
    echo "shell"
else
    echo "agent"
fi
```

This works for obvious cases but fails on things like:

- `npm install` → shell (correct)
- `install the lodash package` → "install" isn't a command, so... agent? (correct, but fragile)
- `time the request` → "time" IS a command, but this is natural language (wrong!)

## Adding heuristics

I needed more signals. Natural language has patterns:

**Articles and pronouns:** "the", "a", "my", "this"
**Question words:** "how", "why", "where", "when"
**Politeness markers:** "please"

If the input has 3+ "bare words" (excluding flags, paths, numbers) AND contains any of these markers, it's probably natural language.

```zsh
lacy_shell_has_nl_markers() {
    local input="$1"

    # Single word = not NL
    [[ "$input" != *" "* ]] && return 1

    # Has shell operators = probably shell
    [[ "$input" == *"|"* || "$input" == *"&&"* ]] && return 1

    # Count bare words (skip flags, paths, numbers)
    local -a bare_words=()
    # ... extraction logic ...

    (( ${#bare_words} < 3 )) && return 1

    # Check for NL markers
    local -a nl_markers=(the a an my your this that please how why where when)
    for word in "${bare_words[@]}"; do
        for marker in "${nl_markers[@]}"; do
            [[ "$word" == "$marker" ]] && return 0
        done
    done
    return 1
}
```

## Real-time feedback

Detection is useless if you can't see it. I added a visual indicator that updates as you type:

- **Green bar** = routing to shell
- **Magenta bar** = routing to AI

This uses ZSH's `zle-line-pre-redraw` hook, which fires on every buffer change:

```zsh
lacy_shell_update_input_indicator() {
    local input_type=$(lacy_shell_classify_input "$BUFFER")

    case "$input_type" in
        "shell") print -n '\e[32m┃\e[0m' ;;  # green
        "agent") print -n '\e[35m┃\e[0m' ;;  # magenta
    esac
}

zle -N zle-line-pre-redraw lacy_shell_update_input_indicator
```

I also added first-word syntax highlighting using `region_highlight`:

```zsh
region_highlight=()
if [[ -n "$BUFFER" ]]; then
    # Find first word boundaries
    # ... boundary detection ...
    case "$input_type" in
        "shell") region_highlight+=("$start $end fg=34,bold") ;;
        "agent") region_highlight+=("$start $end fg=200,bold") ;;
    esac
fi
```

## The clever part: rerouting on failure

Here's where it gets interesting.

Some inputs are genuinely ambiguous. "delete the temp files" doesn't start with a valid command, so it routes to AI. Good.

But what about "kill the background process"? `kill` IS a valid command. It routes to shell. Shell tries to run `kill the background process`. That fails (no process called "the").

What if we detected that failure and automatically rerouted to AI?

```zsh
lacy_shell_precmd() {
    local last_exit=$?

    if [[ -n "$LACY_SHELL_REROUTE_CANDIDATE" ]]; then
        local candidate="$LACY_SHELL_REROUTE_CANDIDATE"
        LACY_SHELL_REROUTE_CANDIDATE=""

        # Non-zero exit, but not a signal (Ctrl+C = 130, SIGKILL = 137)
        if (( last_exit != 0 && last_exit < 128 )); then
            # Shell failed, try AI
            lacy_shell_execute_agent "$candidate"
            return
        fi
    fi
}
```

The key insight: we only reroute if:
1. The input was ambiguous (had NL markers but started with a valid command)
2. The shell returned a non-zero exit code
3. The exit code wasn't from a signal (we don't want Ctrl+C to trigger AI)

Shell-first, AI-fallback. Best of both worlds.

## Works with any AI

The detection and routing is decoupled from the AI backend. You configure which tool to use:

```zsh
export LACY_SHELL_TOOL=claude  # or: opencode, codex, gemini, lash
```

Lacy handles the routing. Your AI tool handles the thinking.

## Try it

```bash
curl -fsSL https://lacy.sh/install | sh
```

Or via npm/homebrew:
```bash
npx lacy
brew install lacymorrow/tap/lacy
```

The code is open source under FSL-1.1-MIT: [github.com/lacymorrow/lacy](https://github.com/lacymorrow/lacy)

## What's next

The detection heuristics aren't perfect. Edge cases I'm still working on:

- Commands that look like sentences: `make clean`, `time curl`
- Sentence fragments: `check disk space`
- Mixed intent: `run npm install and tell me if it fails`

If you try it and find inputs that route wrong, I'd love to hear about them. The detection logic is the most interesting part to iterate on.

---

*Talk to your shell. Commands execute. Questions get answered.*

**[lacy.sh](https://lacy.sh)**
```

---

## Product Hunt Listing

### Tagline (60 char max)
```
Talk to your shell — commands run, questions go to AI
```

**Alternate taglines:**
- `Type commands or questions. Your shell figures out which.`
- `The shell layer that makes AI invisible`
- `Natural language routing for your terminal`

### Description (260 char max for preview)
```
Lacy Shell detects whether you're typing a shell command or a question — commands execute normally, questions go to your AI agent. Real-time indicator shows routing before you hit enter. Works with Claude, Codex, Gemini, OpenCode, or any AI CLI.
```

### Full description
```
**Talk to your shell.**

Lacy Shell is a ZSH plugin that understands what you mean:

• Type `git status` → runs in your shell (green indicator)
• Type `why is the build failing` → goes to your AI agent (magenta indicator)

No mode switching. No prefixes. No copy-pasting between tools.

**How it works**

As you type, Lacy analyzes your input in real-time and shows you where it's going before you hit enter. The detection uses command lookup, bare-word counting, and natural language markers to classify your intent.

**Smart rerouting**

Type "kill the background process" — `kill` is a valid command, so it tries the shell first. If the shell fails, Lacy automatically reroutes to your AI agent to interpret and execute.

Shell-first, AI-fallback. Best of both worlds.

**Works with any AI CLI**

• Claude Code
• OpenCode
• Codex CLI
• Gemini CLI
• Any tool that accepts stdin

You pick the AI. Lacy handles the routing.

**Install in 30 seconds**

curl -fsSL https://lacy.sh/install | sh

Or: `npx lacy` | `brew install lacymorrow/tap/lacy`

Open source, FSL-1.1-MIT licensed.
```

### Maker's first comment
```
Hey Product Hunt! 👋

I built Lacy Shell because I was tired of context switching between my terminal and AI tools.

I use Claude Code every day, but I kept hitting this friction: run a command, see output, then have to consciously "switch modes" to ask the AI about it. Copy output, open AI tool, paste, ask question, get answer, copy solution, go back to terminal...

What if I could just type naturally and let my shell figure out what I meant?

That's Lacy. Type `ls -la` and it runs. Type `why is this test failing` and it asks your AI. The indicator shows you the routing in real-time, so there's no surprise.

The interesting technical bit is "smart rerouting" — if you type something like `delete the temp files` and the shell fails (no `delete` command), Lacy automatically sends it to your AI agent to interpret.

It's pure ZSH, no external dependencies for the detection logic, and works with any AI CLI tool you're already using.

Would love your feedback — especially on edge cases where the detection gets it wrong. That's the most interesting problem to solve.

🔗 GitHub: github.com/lacymorrow/lacy
```

### Key features (for PH gallery)
```
✅ Real-time routing indicator (green = shell, magenta = AI)
✅ Works with Claude, Codex, Gemini, OpenCode, any AI CLI
✅ Smart rerouting — shell fails, AI takes over
✅ No mode switching, no prefixes
✅ Pure ZSH, no dependencies
✅ Install in 30 seconds
✅ Open source (FSL-1.1-MIT)
```

### Media checklist for Product Hunt
- [ ] Thumbnail (240x240) — logo or icon
- [ ] Gallery image 1 (1270x760) — Demo GIF showing indicator change
- [ ] Gallery image 2 (1270x760) — Install command screenshot
- [ ] Gallery image 3 (1270x760) — "Works with" showing AI tool logos
- [ ] Video (optional) — 30-second demo

### Topics to select
- Developer Tools
- Terminal
- Artificial Intelligence
- Open Source
- Productivity

### Launch timing
- **Best days:** Tuesday, Wednesday, Thursday
- **Best time:** 12:01 AM PT (when the day starts on PH)
- **Prep:** Have 10-15 supporters ready to upvote + comment in the first hour

---

## Notes

*Add ongoing observations, what's working, what's not*

---

## References

- [DESIGN.md](./DESIGN.md) — Visual system documentation
- [Lacy Shell](https://github.com/lacymorrow/lacy) — Source code
- [Lacy Shell CHANGELOG](https://github.com/lacymorrow/lacy/blob/main/CHANGELOG.md) — Release history
