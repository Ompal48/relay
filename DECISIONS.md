1. Why this approach over the obvious alternative I rejected?

The obvious route for "show the product, not just claims" is a static screenshot of a dashboard. I rejected that in favor of a live, animated incident card: a scrolling SVG latency graph that periodically spikes into a scripted "degraded" state, pages an on-call owner, and self-resolves. A screenshot proves the UI exists; a live simulation proves the product's core promise — catching a real failure pattern and paging the right person fast — in the first three seconds someone lands on the page. Since the "wow, I want an account" reaction is explicitly what's being graded, I traded a safer, cheaper static mock for something riskier to build but far more convincing.

I also deliberately kept the "Why Relay" section free of invented logos, user counts, or testimonials, even though a denser social-proof section is the more common SaaS landing-page pattern. Since Relay is a fictional/early-stage product, fabricating numbers would fail the honesty constraint outright, so I wrote a section that admits we're new and leans on concrete, verifiable claims (30-second checks, named-owner paging) instead of borrowed credibility.

2. One trade-off I made under the time limit

The scripted incident cycle (spike → alert → resolve every ~30s) is entirely deterministic — hardcoded tick counts in script.js — rather than driven by any real or pseudo-random incident model. This was the fastest way to guarantee a visitor always sees the "wow" moment within one viewing, instead of gambling on random timing that might not fire during a short demo. The trade-off is that on a longer visit, the pattern is obviously repeating, which a keen eye will notice.

With a real week, I'd replace this with a lightweight seeded-random incident generator (varied timing, varied severity, occasional "flaky" recoveries) so repeat visitors don't see identical behavior, and I'd add a couple more monitored-endpoint rows with independent, staggered incident cycles instead of one shared timeline.

3. Where I used AI tools, and what I verified/changed

I used Claude to scaffold the initial HTML/CSS/JS structure, generate the SVG pulse graph rendering logic, and draft section copy. What I personally verified and changed:

Copy tone: rewrote several lines in "Why Relay" so claims stayed strictly honest (no rounded-up numbers, no implied customer base) — this was a manual pass against the assessment's explicit no-fake-social-proof rule.
Animation timing: adjusted the incident cycle length and graph tick interval by hand until the "spike → alert → resolve" moment reliably lands within the first scroll, rather than trusting the first generated values.
Accessibility: added the prefers-reduced-motion media query myself after noticing the initial draft had no motion opt-out.
Responsiveness: manually checked and adjusted breakpoints (nav links collapsing, dashboard rows restacking, sparkline hiding) at both 390px and 1440px, since the first pass wasn't verified at those exact widths.
