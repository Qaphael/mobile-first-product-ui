# Origin app: staff operations dashboard

This reference captures the app structure that motivated the skill. Reuse the interaction patterns, not its brand colors, roles, domain rules, or routes.

## Source prompts

The project prompt pack in `docs/DESIGN-PROMPTS.md` developed the UI in this order:

1. **Audit and foundations:** inspect every route at 360 px, establish tokens, accessible primitives, and shared loading/empty/error states.
2. **App shell:** role-specific mobile bottom tabs and desktop sidebar, compact top bar, context switcher, safe areas, role landing routes.
3. **Lists:** card views on phones and semantic tables on larger screens; mobile filter sheet with active count; bounded “load more” pagination.
4. **Forms:** single-column inputs, plain errors, sticky action footer, short sale stepper, state preserved after validation/network errors.
5. **Live scanner:** full-bleed camera, persistent event/gate/connection context, large controls, clearly different result takeover, manual entry alternative.
6. **Dashboards:** role-specific primary action, a few key metrics, recent activity, event context and alerts.
7. **Audit:** responsive viewport matrix, overflow, axe/accessibility, keyboard, reduced motion, image layout shift, lazy scanner dependency, and manual Android checks.

## Implemented patterns

- Dashboard shell switches from a phone top bar and bottom navigation to a desktop sidebar. The mobile main content reserves space for the bottom bar, and both top and bottom account for safe areas.
- Role navigation is built from permission-aware destination data. Verifier and seller landing routes favor their main task. Secondary admin destinations go into a “More” sheet.
- A shared `ResponsiveList` receives cards and a table for the same records. A shared `FilterSheet` uses a bottom sheet on phones and inline filters on larger screens.
- The ticket sale form uses five short steps, progress announced to assistive technology, readable 48 px controls, quantity steppers, preserved request error state, and one idempotency key retained through retry.
- The scanner shows connectivity and gate context, uses large controls, and distinguishes admitted, rejected, permission, and network states. It does not treat the phone's network indicator as proof that the server accepted admission.
- The design acceptance matrix included 360 × 800, 390 × 844, 768 × 1024, and 1280 × 800. Automated responsive/axe checks passed in the recorded project run; physical Android and paper-ticket checks remained separate launch tasks.

## What to port carefully

The shell, breakpoint adaptation, information hierarchy, bottom-sheet filters, safe-area spacing, short-step form, and acceptance matrix generalize well. The scanner's admission rules, permission mapping, event roles, colors, and all payment/ticket semantics are specific to the source app and must never be copied into another app without its own domain design.

