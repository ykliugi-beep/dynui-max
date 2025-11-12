# DynUI Fixed Enhanced Specification (DynUI-Max Edition)

_Last approved specification refreshed for the DynUI-Max architecture and component catalog._

## 1. Purpose & Background

DynUI-Max consolidates the production-ready work completed across the `dynui-fixed` and `dyn-ui` repositories into a single
monorepo with modern tooling, strict quality gates, and a complete essential component set. This specification reasserts the
approved expectations for the "fixed enhanced" experience while aligning them with the current DynUI-Max implementation so Phase 6
planning can proceed with a canonical reference.

### Objectives
- Preserve the scope and guarantees previously reviewed for the fixed enhanced track.
- Map those guarantees to the current monorepo structure, tooling, and component exports.
- Establish the readiness criteria that gate Phase 6: Community & Ecosystem.

### Non-Goals
- Introducing net-new Phase 6 initiatives (plugin marketplace, advanced variants, etc.).
- Duplicating granular API docs already covered inside Storybook MDX or package READMEs.

## 2. Monorepo Architecture

```
dynui-max/
├── packages/
│   ├── design-tokens/     # Token source, Style Dictionary build, CSS exports, TS types
│   └── core/              # React component library, hooks, theme system
├── apps/storybook/        # Docs & interactive catalog (Phase 5 deliverable)
├── docs/                  # Development & phase planning references
├── tests/                 # Shared test utilities and cross-package fixtures
├── scripts/, tools/       # Build, lint, and configuration helpers
└── turbo.json             # Turborepo orchestration for build, lint, test
```

### Package Responsibilities
- **@dynui-max/design-tokens** – Provides base & semantic tokens, generates `@dynui-max/design-tokens/css`, exports `Theme`
  typings, and powers theming for all components.
- **@dynui-max/core** – Hosts 36 essential production components, shared hooks, and the `ThemeProvider` with `useTheme` hook.
- **apps/storybook** – Source of MDX documentation and stories that showcase every exported component and token set.
- **tests/** – Cross-package Vitest configuration (a11y suite, coverage thresholds) plus reusable mocks.

## 3. Component Scope (Phase 5 Baseline)

The component inventory remains identical to the reviewed fixed-enhanced scope. All items are published from
`packages/core/src/index.ts` and covered by stories/tests.

### P0 Prerequisites (3)
- DynIcon, DynFieldContainer, DynStepper

### Form Components (8)
- DynButton, DynInput, DynTextArea, DynSelect, DynSelectOption, DynCheckbox, DynRadio + DynRadioGroup, DynLabel

### Layout & Containers (6)
- DynBox, DynContainer, DynGrid + DynGridItem, DynModal, DynDivider, DynCard

### Navigation (4)
- DynTabs, DynMenu + DynMenuItem, DynBreadcrumb + DynBreadcrumbItem, DynPagination

### Data Display (6)
- DynTable, DynTreeView + DynTreeNode, DynListView, DynBadge, DynAvatar

### Feedback (3)
- DynSpinner, DynToast, DynProgress

### Utility & Infrastructure
- ThemeProvider + useTheme, ThemeSwitcher, hooks (`useClickOutside`, `useKeyboard`, `useFocusTrap`)

Optional/Phase 6 stretch components (charts, page layout shells, advanced modal placement, etc.) remain explicitly out of
scope until new planning cycles.

## 4. Design Tokens & Theming

- Base primitives (`color`, `spacing`, `typography`, `radius`, `shadow`, `breakpoint`, `zIndex`) are defined once and emitted as
  both TypeScript and Style Dictionary artifacts.
- Semantic tokens wrap primitives for component-friendly usage (text, background, border, feedback, interactive states).
- CSS outputs include `:root`, `.theme-light`, and `.theme-dark` scopes, enabling runtime theme toggling via `ThemeProvider` and
  the `ThemeSwitcher` utility component.
- Token packages enforce type safety and tree-shakable builds to keep bundle sizes optimized before Phase 6 distribution.

## 5. Quality Gates & Tooling Expectations

- **Testing:** Vitest suites cover rendering, interaction, and accessibility for every component. Axe integration runs through
  `pnpm test:a11y`, while `pnpm test:coverage` enforces ≥80% thresholds.
- **Linting & Types:** ESLint + TypeScript configs run via Turborepo pipelines (`pnpm lint`, `pnpm typecheck`).
- **Build:** `pnpm build` compiles tokens and core packages, ensuring distributable ESM/CJS bundles and generated CSS.
- **Storybook:** 31 `.stories.tsx` files plus 19 MDX guides document usage, variants, and accessibility notes.
- **CI Compatibility:** Workflows expect frozen lockfile installs (`pnpm install --frozen-lockfile`) and run quality gates before
  publish.

## 6. Phase 6 Readiness Criteria

To advance into Phase 6, the project must continue satisfying all sections above and additionally:

1. **Documentation Traceability** – README and phase docs must link back to this specification as the single source of truth.
2. **Community Onboarding Assets** – Storybook MDX backlog tracked in Phase 5 report remains the final content prerequisite.
3. **Performance & Distribution** – Bundle size validation (<150KB target) and multi-environment smoke tests are required before
   public distribution.
4. **Feedback Loop** – Issue templates, contribution guides, and roadmap updates reference the Phase 6 initiatives outlined in
   `docs/DEVELOPMENT.md`.
5. **Governance** – Changes to tokens or component APIs require specification updates with reviewer sign-off to maintain the
   fixed-enhanced guarantees.

## 7. Change Control & Versioning

- Semantic versioning applies across all packages with shared release notes.
- The specification must be updated alongside any breaking component or token change.
- Approved revisions are tracked in version control (`dynui-fixed-enhanced-specification.md` at repo root) and referenced by
  phase documentation to keep reviewers aligned.

---

_Last updated: November 2025_
