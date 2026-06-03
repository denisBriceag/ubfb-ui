---
name: project-styling-system
description: Styling stack and conventions for ubfb-ui — Tailwind 4, PrimeNG 21, no component CSS files
metadata:
  type: project
---

## Tools

| Tool | Role |
|---|---|
| Tailwind CSS 4 | Utility classes for layout, spacing, typography, colours |
| tailwindcss-primeui | Bridges PrimeNG CSS variables into Tailwind's utility system |
| PrimeNG 21 | UI component library (buttons, dialogs, tables, etc.) |
| @primeuix/themes | PrimeNG theming API |

**Why:** All styling lives in Tailwind utility classes directly on elements. No separate component CSS files. The only CSS file exceptions are `primeng-overrides.css`, `scrollbar.css`, and `cdk-dragdrop.css` — used only for cases where PrimeNG/CDK styles cannot be overridden with utilities.

**How to apply:** Always reach for Tailwind utilities first. Only write CSS when a PrimeNG/CDK internal cannot be overridden any other way.

## Tailwind conventions

- Use `start`/`end` instead of `left`/`right` for all directional utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`)
- Layouts must be responsive down to `sm:` breakpoint minimum
- Do not create custom CSS files for component-level styles — Tailwind utilities only

## Dark mode

Toggled by adding/removing the `p-dark` CSS class on `<html>`. `ThemeService.toggleTheme()` manages this. PrimeNG reads `.p-dark` (configured in `providePrimeNG`) to apply dark colour scheme tokens. See [[project-primeng-pt-api]].
