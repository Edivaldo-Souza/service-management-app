# Stylization Examples

## Example 1: Unstyled page → styled page

**Before** (`app/login/page.tsx`):

```tsx
export default function Login() {
  return (
    <div>
      <form>
        <input placeholder="Email" />
        <input placeholder="Password" />
        <button>Login</button>
      </form>
    </div>
  );
}
```

**After:**

1. Add copy to `lib/site.ts`:

```ts
export const login = {
  title: "Sign in",
  description: "Access your dashboard and manage tickets.",
  submitLabel: "Sign in",
  signUpPrompt: "Don't have an account?",
  signUpLabel: "Create account",
} as const;
```

2. Create `components/login/login-form.tsx` — copy structure from `components/signup/signup-form.tsx`, reduce fields to email + password.

3. Compose `app/login/page.tsx`:

```tsx
import type { Metadata } from "next";
import { LoginForm } from "@/components/login/login-form";
import { login, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Sign in | ${siteConfig.name}`,
};

export default function Login() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {login.title}
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              {login.description}
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
```

## Example 2: New marketing section

Add a block to the landing page following `components/home/features-section.tsx`:

```tsx
<div className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800">
  <div className="mx-auto max-w-6xl">
    <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
      Section title
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
      Section description.
    </p>
    {/* content */}
  </div>
</div>
```

## Example 3: Linking CTAs

Navigation CTAs use `next/link` with primary button classes (see `components/home/cta-section.tsx`):

```tsx
<Link
  href="/signup"
  className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
>
  Get started
</Link>
```

Only link to routes that exist.
