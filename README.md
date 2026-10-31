# Mobile-first Product UI skill

Reusable guidance for designing and implementing responsive web interfaces for phones, tablets, and desktop. The skill includes reusable app-shell, list, filter, form, and live-operation patterns plus React/Tailwind starter components that can be adapted to another app.

## Install

The skill is distributed from this GitHub repository with the [`skills` CLI](https://github.com/vercel-labs/skills). You do not install it as an npm library.

Install globally for Codex so it is available across projects:

```powershell
npx skills add Qaphael/mobile-first-product-ui --global --agent codex
```

Install into the current project instead, so the project can track and share the skill:

```powershell
npx skills add Qaphael/mobile-first-product-ui --agent codex
```

To install for every agent supported by the CLI, use `--agent "*"` in either command. Omit `--agent` to choose agents interactively. The CLI may ask whether to symlink or copy the skill; symlinking makes updates easier, while copying keeps an independent local copy.

## Update

Update just this skill in the global scope:

```powershell
npx skills update mobile-first-product-ui --global --yes
```

For a project installation, run this from that project and omit `--global`:

```powershell
npx skills update mobile-first-product-ui --project --yes
```

To update all installed skills in a scope, use `npx skills update --global --yes` or `npx skills update --project --yes`.

## Check or remove

List installed global skills with `npx skills list --global`; list project skills with `npx skills list --project` from the project directory.

Remove the global Codex installation with:

```powershell
npx skills remove mobile-first-product-ui --global --agent codex --yes
```

For project scope, omit `--global` and run the command in that project. Removing an installation does not delete this GitHub repository.

## Use it

Read [SKILL.md](SKILL.md) when planning or implementing mobile-friendly navigation, dashboards, lists, forms, scanners, checkout flows, accessibility reviews, or responsive audits. It applies across frameworks; the example code is React/Tailwind and should be adapted to the target app's tokens, routes, and component library.

## Files

- `SKILL.md` — workflow and design/engineering acceptance rules.
- `references/port-ready-patterns.md` — framework-neutral structures and contracts.
- `references/origin-app-example.md` — anonymized source-app prompts and implementation lessons.
- `examples/react-tailwind/` — copyable responsive shell and cards/table switch.
- `evals/evals.json` — realistic tasks used to review the skill.

The examples are presentation components. Pass them data and destinations from the application's existing permission-aware layer; they do not replace authorization, business rules, or server behavior.
