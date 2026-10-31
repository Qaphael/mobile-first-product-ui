# Mobile-first Product UI skill

Reusable guidance for designing and implementing responsive web interfaces for phones, tablets, and desktop. The skill includes reusable app-shell, list, filter, form, and live-operation patterns plus React/Tailwind starter components that can be adapted to another app.

## Use it

Read [SKILL.md](SKILL.md) when planning or implementing mobile-friendly navigation, dashboards, lists, forms, scanners, checkout flows, accessibility reviews, or responsive audits. It applies across frameworks; the example code is React/Tailwind and should be adapted to the target app's tokens, routes, and component library.

## Files

- `SKILL.md` — workflow and design/engineering acceptance rules.
- `references/port-ready-patterns.md` — framework-neutral structures and contracts.
- `references/origin-app-example.md` — anonymized source-app prompts and implementation lessons.
- `examples/react-tailwind/` — copyable responsive shell and cards/table switch.
- `evals/evals.json` — realistic tasks used to review the skill.

The examples are presentation components. Pass them data and destinations from the application's existing permission-aware layer; they do not replace authorization, business rules, or server behavior.
