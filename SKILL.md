---
name: mobile-first-product-ui
description: Design, build, audit, or improve responsive interfaces for web apps used on phones, tablets, and desktops. Use this skill whenever the user asks for a mobile-friendly or responsive app, navigation, dashboard, forms, tables, scanner, checkout, PWA, or touch interaction—even when they do not say “mobile-first.” Start with the phone workflow, preserve domain behavior, build reusable responsive patterns, and verify across real viewport sizes.
compatibility: Works with any web stack. Examples use React and Tailwind-style classes, but adapt structures to the repository's existing framework and component library.
---

# Mobile-first product UI

Create interfaces that feel designed for a phone, not compressed from desktop, while preserving the app's desktop workflows. Use the repository's design system and component conventions. Read its instructions, design docs, and existing screens before changing UI. Treat domain services, permissions, data contracts, and server rules as authoritative; do not change them to make a layout easier.

## Workflow

1. **Audit first.** Identify users, their main task, device/network conditions, role differences, important data, existing design tokens/components, and project constraints. Inspect the current implementation and list the highest-impact mobile problems: overflow, awkward navigation, tiny targets, hidden actions, dense tables, keyboard/viewport issues, missing states, accessibility, and performance. If asked for a plan only, do not edit.
2. **Plan in small phases.** Start with shared foundations and app shell, then lists/forms and domain-specific workflows, followed by accessibility/performance audit. Present touched screens, reusable components, risks, and acceptance checks. Wait for approval when the user or repository workflow requires it.
3. **Build one pattern, then reuse it.** Prefer a few named primitives over screen-specific hacks. Keep data queries, validations, role checks, and mutations where they are; redesign their presentation and interaction only.
4. **Check at real sizes.** Start at 360 × 800. Also check 390 × 844, 768 × 1024, and 1280 × 800 (or the project's agreed matrix). Check short phone height around 360 × 640 for multi-step flows. Confirm no page-level horizontal scroll, safe areas, keyboard behavior, fixed/sticky content, and desktop layout.
5. **Report evidence.** State what changed, screens and components touched, actual checks performed, what still needs a real device, and any unresolved issue. Do not claim physical-device verification from a browser emulator.

## Core design rules

- Make the primary role task reachable in one obvious action. Put the role's highest-frequency action first; make active navigation recognizable with both label and visual state.
- Use a compact top bar and fixed bottom navigation on phones when the app has several destinations; use a sidebar or wider navigation on desktop. Keep phone navigation to a small set (usually 3–5 items) and group secondary destinations in a clearly named “More” menu/sheet. Do not hide essential actions behind hover.
- Respect safe areas, dynamic viewport height, notches, gesture areas, and on-screen keyboards. Reserve content space for fixed bars. Avoid nesting independent scrolling regions unless the interaction requires it.
- Aim for touch targets at least 44 × 44 px with breathing room; use larger controls for primary, destructive, or high-pressure actions. Keep body and input text readable (normally at least 16 px). Use semantic inputs, labels, autocomplete and input modes.
- Use design tokens for color, type, spacing, borders, and focus. Meet WCAG AA contrast, show visible focus, support keyboard use and reduced motion, and never communicate status by color alone.
- Every data-driven screen needs loading, empty, error/retry, and success or completion feedback. Keep messages plain and actionable. Avoid layout shift by reserving media and changing-content space.
- Prefer progressive disclosure over shrinking every desktop control into a phone. Put the few facts needed for the next action first; move secondary details into sheets, expandable sections, or detail pages.
- Keep interactions forgiving: preserve form state on validation/network errors, prevent accidental destructive actions, show the relevant record/reference in confirmation, and maintain safe retry behavior already provided by the app.
- For live or safety-critical actions, show only server-confirmed outcomes. A disconnected device must not display a success state that the server did not accept. When server reachability controls an action, use a lightweight health/heartbeat check or the real request state; `navigator.onLine` alone only reports local network connectivity. Treat connectivity, retry, and recovery as visible product states.

## Port-ready interface structures

Choose and adapt these structures instead of rebuilding each screen from scratch. Read `references/port-ready-patterns.md` for component contracts and example composition.

Copyable React/Tailwind starters are in `examples/react-tailwind/ResponsiveAppShell.tsx` and `examples/react-tailwind/ResponsiveCollection.tsx`. Adapt breakpoints, tokens, routing, icons, and navigation data to the target app; the shell only presents destinations supplied by the caller and is not an authorization boundary.

### Responsive app shell

```text
AppShell
├── DesktopSidebar (role-filtered links, context switcher, account)
├── MainColumn
│   ├── MobileTopBar (brand, current context, account)
│   ├── PageContent (min-width: 0; reserved bottom-nav space)
│   └── MobileBottomNav (primary destinations, safe-area inset)
└── GlobalFeedback (toast/live region)
```

Resolve navigation from the app's existing authorization model. Hiding links improves navigation but never grants or denies server access. Define role-specific landing destinations from real permission data.

### Responsive data collection

```text
PageHeader (title, short description, primary action)
Toolbar (search, FilterSheet trigger with active count)
ListState (skeleton | empty with next action | error with retry)
ResponsiveCollection
├── PhoneCards (2–3 key facts, status, one clear tap target)
└── WideTable (same records and status, real column headers)
Pagination (Load more on narrow screens | bounded pager on wide screens)
```

Keep card and table views driven by the same records. Don't render a squeezed table and don't make the entire row tappable if it contains nested buttons or links.

### Phone filter sheet

Show a full-width “Filters” button and active-filter count. Open filters in an accessible bottom sheet with a clear title, bounded scroll area, and explicit apply/reset actions. On wide layouts, reuse the same filter controls inline. Preserve current query semantics and announce result-count changes when appropriate.

### Comfortable form / multi-step flow

```text
FormPage
├── StepProgress (only for a genuinely long task)
├── FormFeedback (field errors + persistent request error)
├── CurrentStep (single column; labels above controls)
├── StickyActionBar (Back, primary action, safe-area padding)
└── Summary (running total or key decision, when it aids the task)
```

Keep one short step visible on a short phone. Preserve entered state on errors. Keep keyboard focus near the error/step change. Use correct input types, input modes and autocomplete. Do not change server validation, calculations, idempotency, or payloads as a visual shortcut.

### Live operation or scanner

```text
LiveTaskScreen
├── SlimContextBar (location/gate, selected context, connection state)
├── WorkSurface (camera, live content, or primary operation)
├── LargeControls (start/stop, confirm, retry)
├── ResultState (icon + plain status + key facts + next action)
└── PersistentConnectivityState (offline/unavailable when applicable)
```

Keep operational chrome visible without covering the work surface. Make result states readable at arm's length and expose them to screen readers. Clearly separate success, rejected/blocked, waiting, permission denied, and network failure. Do not implement offline authority for a server-controlled action unless the product explicitly supports and secures it.

### Role dashboard

Start with the user's current context and primary action, then a small set of decision-useful metrics, recent work, and alerts. Use compact cards on phones and a denser but aligned grid on wider screens. Keep figures sourced from the existing server queries; the UI must not invent totals or permission-sensitive data.

## Acceptance checklist

Before calling the UI done, verify:

- Main task and navigation are clear for each role and viewport.
- No page-level horizontal overflow at supported widths; long content wraps or scrolls inside its intended region.
- Fixed navigation, sticky actions, safe areas, and keyboard do not cover content or controls.
- Targets, text size, spacing, contrast, labels, focus, screen-reader announcements, and reduced-motion behavior are usable.
- Loading, empty, error, retry, and success states are visible and coherent.
- Desktop still has an intentional layout and hasn't inherited phone-only compromises.
- Images/media reserve space and load efficiently; expensive tools for rarely used routes are deferred where feasible.
- Existing API behavior, authorization, calculations, and business rules remain intact.
- Relevant project checks pass. Run tests only as directed by the user or repository instructions; report checks not performed.

For concrete implementations, read only the relevant reference: `references/port-ready-patterns.md` for reusable composition and `references/origin-app-example.md` for how these patterns were applied in the originating app.
