<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Frontend Infrastructure

### File Organization

```bash
src/
  app/                  # app assembly, global providers, browser preference state
  global.css            # Tailwind entry, design tokens, base CSS
  locales/              # Lingui PO catalogs
  routes/
    -features/          # route-local components and feature glue
  ui/
    components/         # shadcn/Base UI primitives only
    hooks/
    lib/
  test/                 # shared test helpers
```

- Keep app-specific copy, routing state, and feature data out of `src/ui/components`.
- Prefer route-local components under `src/routes/-features/<feature>` until they are genuinely reusable.
- Keep global styles in `src/global.css`; do not add a second style entry under `src/ui`.
- Use kebab-case file and directory names unless a generated tool requires another convention.

### I18n

- Use Lingui for user-facing copy.
- Every translatable message must use an explicit semantic ID through `<Trans id="...">` or `i18n._({ id, message })`.
- After adding or changing copy, run `vp run i18n:extract`, translate `src/locales/zh-Hans/messages.po`, then run `vp run i18n:check`.
- `pseudo` is development-only and should not be manually translated.

### Theme And RTL

- Appearance preferences live in `localStorage` under `tagskills.appearance.v1`.
- Theme state is owned by `src/app/theme.tsx`; do not toggle `.dark` outside that provider.
- Locale state is owned by `src/app/i18n.tsx`; do not write `<html lang>` outside that provider.
- Text direction is owned by `src/app/direction.tsx`; design components with RTL behavior in mind.
- Prefer CSS logical properties and Tailwind logical utilities such as `ms`, `me`, `ps`, `pe`, `start`, and `end`.

### UI Components

- Use shadcn/Base UI primitives for shared UI and `lucide-react` for icons.
- Avoid embedding app-specific Lingui copy in `src/ui/components`; expose label props when a primitive needs accessible text.
- Avoid modifying generated shadcn components unless the change is infrastructure-level or explicitly requested.

### Test

- Import test APIs from `vite-plus/test`, never directly from `vitest`.
- Prefer React Testing Library for frontend behavior and DOM side effects.
- Keep tests focused on user-observable behavior, provider state, and DOM attributes such as `lang`, `dir`, and `.dark`.
