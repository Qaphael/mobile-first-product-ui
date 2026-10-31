# Port-ready responsive UI patterns

These blueprints are framework-neutral. The examples resemble React composition and Tailwind breakpoints because the source app uses them; translate to the target app's framework and design system. Reuse the structure and behavioral contract, not class names or colors.

## 1. App shell and role navigation

Keep navigation data separate from its presentation. Derive visible destinations from the app's existing permissions on the server or trusted application layer, and use the same destination model for a mobile tab bar and desktop sidebar.

```ts
type Destination = {
  href: string;
  label: string;
  icon: IconName;
  permission: Permission;
  group?: "primary" | "more";
};

const destinationsByRole: Record<Role, Destination[]> = { /* app-specific */ };
```

Composition:

```tsx
<AppShell>
  <DesktopSidebar destinations={primaryAndSecondary} />
  <main className="min-w-0 flex-1 pb-[calc(var(--mobile-nav-height)+env(safe-area-inset-bottom))] lg:pb-6">
    <MobileTopBar context={activeContext} account={account} />
    {children}
  </main>
  <MobileBottomNav destinations={primary} more={secondary} />
</AppShell>
```

Keep the mobile bar fixed only when its height is reserved in the main content. Apply top and bottom safe-area insets. Use a dynamic viewport unit for full-height shells and scanner screens. Validate active state for nested routes, focus/keyboard behavior, and landscape/short-height use. The navigation is a convenience surface; authorization remains enforced by the server.

## 2. Responsive collection without two sources of truth

Prepare one filtered, sorted, paginated data set and render it in two presentation modes:

```tsx
<ResponsiveCollection
  cards={<RecordCards records={records} />}
  table={<RecordTable records={records} />}
  cardsUntil="md"
/>
```

Phone cards should expose the identity, one or two decision-critical fields, status label/icon, and a clear tap target. Wide tables should use semantic headers and keep secondary actions reachable. If a card contains action buttons, avoid wrapping the whole card in another button or link. Keep tables in a bounded horizontal scroll container only when the table is genuinely useful and cannot be adapted; the page itself should not scroll sideways.

## 3. Filter controls that adapt presentation

Use one filter form in two containers: inline controls from a chosen breakpoint upward, and a trigger plus bottom sheet below it. Show active count; provide reset and apply semantics; preserve URL/query behavior. Closing a sheet should be predictable after apply or cancel. Keep sheet content within dynamic viewport height and allow its body—not the page behind it—to scroll. Keep pagination bounded: use an explicit “Load more” action on phones and a pager on wide layouts where that suits the current query contract. Preserve page/cursor semantics and announce appended results when useful.

## 4. Forms and sticky actions

Use a single-column field stack with labels, helper/error text, and correct HTML semantics. A sticky footer should include enough bottom inset and never overlap the last field or mobile navigation. For complex flows, use a stepper only when each step has a clear user goal; show progress in text for assistive technology, preserve draft state across steps and failed requests, and keep a summary of consequential choices near confirmation.

For financially or operationally sensitive workflows, maintain the existing idempotency and server-side validation behavior. A retry after a timeout must follow the app's current safe retry contract. A design refactor must not silently alter business payloads.

## 5. Live-operation surfaces

Keep the context (event/location/queue), connection state, and primary controls visible. Give success, failure, permission-denied, processing, and network-error states distinct labels, icons, and recovery actions. When enabling or disabling server actions based on availability, use a lightweight server heartbeat or real request results; do not rely only on `navigator.onLine`. For server-authoritative work, network failure is not success. Make announcements concise and interruptive only when the result demands it. Avoid animations that obscure rapid repeated tasks; respect reduced motion.

## 6. Viewport QA matrix

| Viewport | What it catches |
| --- | --- |
| 360 × 800 | Narrow Android phones, overflow, tab compression, content width |
| 390 × 844 | Common modern phone dimensions and safe areas |
| 360 × 640 | Short-height form steps, keyboard, sticky-footer collisions |
| 768 × 1024 | Tablet breakpoint and layout transitions |
| 1280 × 800 | Desktop navigation, table density, unused whitespace |

At each size, check page overflow, fixed/sticky overlap, focus order, empty/error/loading states, long labels, large text/zoom, orientation, and a keyboard-open form. Browser automation and emulation do not replace a physical phone check for camera, install behavior, touch feel, sunlight readability, or network conditions.

## 7. Phase template for a design prompt

```text
Read the product's design spec and the target screens first.
Goal: [one user-visible outcome]
Plan first: list screens/components, reusable patterns, acceptance checks, and any behavior/API dependency.
Implement in this order: [foundations -> shell -> collection/forms -> special workflow -> audit].
Preserve: domain behavior, authorization, API shapes, server data authority, and existing validations.
Verify at: [project viewport matrix] plus keyboard/accessibility and relevant states.
Report: changed screens/components, checks actually run, real-device checks still needed, open issues.
```
