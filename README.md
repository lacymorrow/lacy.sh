# lacy.sh

Marketing site for [Lacy Shell](https://github.com/lacymorrow/lacy) — a ZSH/Bash plugin that detects natural language vs shell commands and routes input to your AI agent automatically.

## Development

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npm start        # Serve production build
```

## Architecture

Single-page Next.js app using the App Router. All content is in `app/page.tsx`. Styling via CSS custom properties in `app/globals.css`.

## Related

- [Lacy Shell](https://github.com/lacymorrow/lacy) — The ZSH/Bash plugin
- [Lash](https://github.com/lacymorrow/lash) — AI coding agent CLI (recommended backend)

## License

MIT
