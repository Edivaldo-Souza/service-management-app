# Service Management Platform

A unified platform to request services, manage support tickets, and keep your team aligned.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Project Structure

```
service-management-app/
├── app/                    # Routes (Next.js App Router)
│   ├── layout.tsx          # Root shell, metadata, shared chrome
│   ├── page.tsx            # Landing page (/)
│   └── globals.css         # Tailwind + theme tokens
├── components/
│   ├── layout/             # Shared layout components (header, footer)
│   └── home/               # Landing page sections
├── lib/
│   └── site.ts             # App name, tagline, and copy
└── public/                 # Static assets
```

### Conventions

- **`app/`** — File-based routing. Add `app/tickets/page.tsx` for `/tickets`.
- **`components/`** — Reusable UI. Page files stay thin and compose components.
- **`lib/`** — Shared config and utilities. Site copy lives in `lib/site.ts`.
- **`@/*`** — Path alias for imports from the project root.

### Future Growth

When the app grows, consider adding:

- `app/(dashboard)/` — Authenticated app routes
- `app/api/` — API routes
- `types/` — Shared TypeScript types
- `features/` — Domain modules (tickets, services, etc.)

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
