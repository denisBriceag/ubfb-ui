
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Resources
- Style guide: https://angular.dev/style-guide
- Angular: https://angular.dev/essentials/components · /signals · /templates · /dependency-injection
- Tailwind: https://tailwindcss.com/docs/styling-with-utility-classes
- Transloco: https://jsverse.gitbook.io/transloco/core-concepts/signals
- NgRx Signals: https://ngrx.io/guide/signals
- PrimeNG: https://primeng.org/configuration · https://github.com/primefaces/primeng
- ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/


## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

# Styling System

## Tools overview

| Tool                    | Role                                                         |
| ----------------------- | ------------------------------------------------------------ |
| Tailwind CSS 4      | Utility classes for layout, spacing, typography, colours     |
| tailwindcss-primeui | Bridges PrimeNG CSS variables into Tailwind's utility system |
| PrimeNG 21          | UI component library (buttons, dialogs, tables, etc.)        |
| @primeuix/themes    | PrimeNG theming API                                          |

No separate component CSS files are written. All styling lives in Tailwind utility classes directly on elements. The only exceptions are src/style/primeng-overrides.css, src/style/scrollbar.css, and src/style/cdk-dragdrop.css, which patch cases where PrimeNG or CDK styles cannot be overridden with utilities.

## Dark mode

Dark mode is toggled by adding/removing the p-dark CSS class on the <html> element. ThemeService.toggleTheme() manages this. PrimeNG reads the .p-dark selector (configured in providePrimeNG) to apply the dark color scheme tokens.

---

## CSS layer order

PrimeNG's CSS is registered in explicit cascade layers via the providePrimeNG config:

---

## PrimeNG passthrough (pt) API

The pt prop injects Tailwind classes directly into PrimeNG's internal DOM structure without needing CSS overrides. It is the primary way to style PrimeNG components and is used in 80+ files across the codebase.

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

Finding part names: Open the PrimeNG 21 docs for the target component and navigate to its "PassThrough" section â€” it lists every available part (root, content, header, label, icon, etc.).

Rules:

- Always use Tailwind utility classes as values
- Use the ! (important) prefix only when a PrimeNG default absolutely cannot be overridden otherwise
- Always prefer pt over adding entries to src/style/primeng-overrides.css

---

## Tailwind conventions

- Use start/end instead of left/right for all directional utilities (ms-, me-, ps-, pe-, start-, end-).
- Layouts must be responsive down to small phones (sm: breakpoint minimum).
- Do not create custom CSS files for component-level styles use Tailwind utilities exclusively.
