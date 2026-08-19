# Relay — Landing Page

A single-page marketing site for **Relay**, a fictional API uptime/monitoring product. The pitch: Relay checks your endpoints every 30 seconds, waits for a real failure pattern (not one blip), and pages the specific owner of that endpoint instead of dumping alerts into a channel everyone mutes.

This is a static, dependency-free front-end build — plain HTML/CSS/JS, no framework, no build step.

## Live demo notes

- The signup buttons ("Start monitoring — free") don't actually create an account. They trigger a small toast telling the visitor this is a design submission, not a wired-up signup.
- Try the **Konami code** (`↑ ↑ ↓ ↓ ← → ← → b a`) anywhere on the page for a hidden easter egg.

## File structure

```
.
├── index.html   # Page markup and content
├── style.css    # All styling (single stylesheet, CSS variables for theming)
└── script.js    # Animated graph, clock, CTA toast, scroll reveals, easter egg
```

There are no external JS dependencies. The only external resources are Google Fonts (`Inter` and `JetBrains Mono`), loaded via `<link>` tags in `index.html`.

## Sections

| Section | What it does |
|---|---|
| **Nav** | Sticky header with logo and anchor links to the sections below |
| **Hero** | Headline, subheading, two CTAs, and a live-looking "incident card" with an animated latency graph |
| **Product** (`#product`) | A mock monitoring dashboard listing sample endpoints with status dots, latency, and mini sparkline charts |
| **How it works** (`#how`) | Three-step explanation: Detect → Confirm → Page |
| **Why Relay** (`#why`) | Four honest, non-hype differentiators (including "built by one person, for now") |
| **Footer CTA** | Repeats the primary call-to-action before the page footer |

## Key interactive behavior (`script.js`)

- **Live pulse graph** — `data` is an array of 60 fake latency samples redrawn as an SVG path every 220ms, creating a scrolling live-graph effect.
- **Scripted incident loop** — every 140 ticks (~31s), the graph spikes red, the status dot/text switch to "Degraded — investigating," and the alert banner slides in; it self-resolves ~5.5s later. This is fully scripted/deterministic, not real data.
- **Clock** — `#clockNow` updates every second to simulate a "last check" timestamp.
- **CTA toast** — clicking either "Start monitoring" button prevents navigation and shows a dismissible toast explaining the button isn't wired up.
- **Scroll reveal** — sections with the `.reveal` class fade/slide in via `IntersectionObserver` as they enter the viewport.
- **Easter egg** — entering the Konami code triggers a brief red "chaos" screen flash and a mono-font banner ("self-inflicted incident, severity: none, resolved in 3s").

All animations respect `prefers-reduced-motion` (see `style.css`), which disables transitions/animations for users who have that OS setting enabled.

## Running locally

No build tools or package manager needed. Either:

1. Open `index.html` directly in a browser, **or**
2. Serve the folder with any static server, e.g.:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000` (or whichever port).

## Customizing

- **Colors / theme** — all colors are CSS custom properties defined at the top of `style.css` under `:root` (`--bg`, `--surface`, `--green`, `--amber`, `--red`, etc.). Change them there to re-theme the whole page.
- **Copy** — all text lives directly in `index.html`; there's no CMS or templating layer.
- **Dashboard rows / endpoints** — each row in the `#product` section is a hand-written `<div class="row">` block in `index.html` with its own sparkline SVG `<polyline>`; add or edit rows there.
- **Incident timing** — adjust the `cyclePos` thresholds in `script.js`'s `step()` function to change how often/how long the scripted incident runs.

## Browser support

Uses standard modern CSS (custom properties, `backdrop-filter`, CSS Grid) and JS (`IntersectionObserver`, template literals, `Array.from`). Works in current Chrome, Firefox, Safari, and Edge. No polyfills are included.
