---
name: apply-stylization
description: Applies Tailwind CSS styling consistent with this app's design system (zinc palette, accent tokens, card layouts, Geist typography). Use when styling new pages, forms, or components, restyling unstyled UI, or when the user asks to match the landing or signup page look.
---

# Apply Stylization

Style new or existing UI to match the established patterns in this Next.js app. Read reference implementations before writing code.

## Source of truth

| Concern | File |
|---------|------|
| Theme tokens | `app/globals.css` |
| Copy / labels | `lib/site.ts` |
| Landing page | `app/page.tsx`, `components/home/*` |
| Form styling | `components/signup/signup-form.tsx` |
| Layout chrome | `components/layout/site-header.tsx`, `site-footer.tsx` |
| Page shell | `app/layout.tsx` |

## Design tokens

Defined in `app/globals.css` — use Tailwind utilities, not hardcoded hex:

| Token | Utility | Usage |
|-------|---------|-------|
| `--foreground` | `text-foreground` | Headings, labels, body |
| `--background` | `bg-background` | Page background (via body) |
| `--accent` | `bg-accent`, `text-accent`, `border-accent` | Primary actions, links |
| `--accent-hover` | `hover:bg-accent-hover` | Button hover |

Dark mode uses `prefers-color-scheme` — always pair light styles with `dark:` variants.

**Zinc palette** (borders, muted text, surfaces):

- Borders: `border-zinc-200 dark:border-zinc-800`
- Muted text: `text-zinc-600 dark:text-zinc-400`
- Alt section bg: `bg-zinc-50 dark:bg-zinc-900/50`
- Card/header bg: `bg-white dark:bg-zinc-950`

## Workflow

1. **Read** the closest existing component (landing section, signup form, or layout).
2. **Extract UI** into `components/<feature>/` — keep `app/*/page.tsx` thin.
3. **Centralize copy** in `lib/site.ts` (same pattern as `signup`, `cta`, `features`).
4. **Apply patterns** from the sections below — reuse class strings verbatim where possible.
5. **Verify** dark mode contrast and run `npm run build`.

## Page structure

Every page follows this shell (see `app/page.tsx`, `app/signup/page.tsx`):

```tsx
export default function PageName() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="px-6 py-20">
        <div className="mx-auto max-w-6xl">{/* content */}</div>
      </div>
    </main>
  );
}
```

**Max-widths by page type:**

| Type | Container |
|------|-----------|
| Marketing sections | `max-w-6xl` |
| Hero / centered text | `max-w-3xl` |
| CTA block | `max-w-2xl` |
| Forms / narrow content | `max-w-md`, vertically centered with `flex flex-1 items-center justify-center` |

Header and footer come from root layout — do not duplicate them in page files.

## Typography

| Element | Classes |
|---------|---------|
| Page title (h1) | `text-3xl font-semibold tracking-tight text-foreground sm:text-4xl` (forms) or `text-4xl sm:text-5xl` (hero) |
| Section title (h2) | `text-2xl font-semibold tracking-tight text-foreground sm:text-3xl` |
| Card title (h3) | `text-lg font-medium text-foreground` |
| Body / subtitle | `text-lg leading-8 text-zinc-600 dark:text-zinc-400` |
| Small / helper | `text-sm text-zinc-600 dark:text-zinc-400` |

Center marketing headings with `text-center`; form page titles use `text-center` above the card.

## Component patterns

### Card surface

Used for feature cards and form containers:

```
rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950
```

Form cards add responsive padding: `sm:p-8`.

### Primary button

```
inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover
```

Full-width variant: add `w-full`. Use `<Link>` for navigation, `<button type="submit">` for forms.

### Form input

```
w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-zinc-800 dark:bg-zinc-950
```

Label: `block text-sm font-medium text-foreground` with `mt-1.5` on the input.

Always use `<label htmlFor>` + `id`, correct `type`, `name`, and `autoComplete`.

### Block with alt background

Use a `<div>` wrapper (not `<section>`):

```
border-t border-zinc-200 bg-zinc-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/50
```

### Layout chrome

Header/footer pattern:

```
border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950
mx-auto flex h-14 max-w-6xl items-center px-6
```

## File organization

```
app/<route>/page.tsx          # Thin composition + metadata
components/<feature>/*.tsx    # UI components
lib/site.ts                   # User-facing strings
```

Add page metadata:

```tsx
export const metadata: Metadata = {
  title: `Page Title | ${siteConfig.name}`,
};
```

Prefer **Server Components** unless client interactivity is required.

## Anti-patterns

- Do not use `<section>` — use `<div>` for layout blocks.
- Do not use placeholder-only inputs — always pair labels with fields.
- Do not hardcode colors — use `accent`, `foreground`, and zinc utilities.
- Do not add new CSS frameworks or UI libraries.
- Do not put large JSX blocks in page files — extract to `components/`.
- Do not add nav links to routes that do not exist yet.
- Do not skip `dark:` variants on borders, backgrounds, and muted text.

## Checklist

- [ ] Matches zinc + accent palette from existing pages
- [ ] Dark mode readable
- [ ] Copy in `lib/site.ts` if user-facing
- [ ] Page uses `main.flex.flex-1.flex-col` shell
- [ ] Component extracted to `components/<feature>/`
- [ ] `npm run build` passes

## Examples

For before/after walkthroughs, see [examples.md](examples.md).
