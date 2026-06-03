---
name: project-primeng-pt-api
description: PrimeNG passthrough (pt) API is the primary way to style PrimeNG components — injects Tailwind classes into internal DOM parts
metadata:
  type: project
---

The `pt` prop injects Tailwind classes directly into PrimeNG's internal DOM structure without needing CSS overrides. It is the **primary** styling mechanism for PrimeNG components.

**Why:** Avoids entries in `primeng-overrides.css` and keeps styles co-located with usage.

**How to apply:** Always use `pt` before reaching for `primeng-overrides.css`. Use Tailwind utility classes as values. Use `!` (important) prefix only when a PrimeNG default absolutely cannot be overridden otherwise.

```html
<p-drawer
  [pt]="{
    root: 'min-w-xl w-3/7 h-[calc(100vh-4rem)] end-0 !start-auto',
    content: 'h-full p-0'
  }"
/>

<p-tabs [pt]="{ root: 'px-1 pt-1 pb-0 border-none' }" />

<!-- Conditional classes work too -->
<p-accordion
  [pt]="{ contentWrapper: expanded() ? 'min-w-0' : 'overflow-hidden' }"
/>
```

To find part names: open PrimeNG 21 docs for the target component → navigate to its "PassThrough" section — lists every available part (`root`, `content`, `header`, `label`, `icon`, etc.).

See [[project-styling-system]].
