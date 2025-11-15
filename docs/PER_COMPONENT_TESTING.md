# Per-Component Testing Infrastructure

This infrastructure allows isolated testing, building, and validation of individual components.

## Quick Start

### Test Single Component

```bash
# Run all tests for DynButton
pnpm test:component DynButton

# Run only unit tests
pnpm test:component DynButton --unit

# Run only a11y tests
pnpm test:component DynButton --a11y

# Run with coverage
pnpm test:component DynButton --coverage
```

### Build Single Component

```bash
# Build DynButton with type checking and bundling
pnpm build:component DynButton
```

### Open Storybook for Component

Storybook stories live in the central catalog at `apps/storybook/stories/`. Each
component has a folder (usually grouped by category such as
`Form/DynCheckbox.stories.tsx`). Use the folder path when opening stories:

```bash
# Open DynButton story in browser (looks up stories under apps/storybook/stories)
pnpm story:open DynButton

# Example: DynButton/Primary variant (matching the exported story name)
pnpm story:open DynButton/Primary
```

If you are unsure of a component's story path, list the contents of
`apps/storybook/stories` or use `rg "export const" apps/storybook/stories -g"*DynButton*"`
to find the story file that exports the component's stories.

### Interactive Playground

```bash
# Generate isolated playground for DynButton
pnpm playground DynButton
```

### Visual Regression Testing

```bash
# Run Chromatic visual tests for DynButton only
pnpm visual:component DynButton
```

## Available Scripts

All scripts are defined in `package.json` and call corresponding scripts in `scripts/` directory:

- `test:component <ComponentName> [--unit|--a11y|--coverage]` - Run Vitest tests
- `build:component <ComponentName>` - Build component with tsup
- `story:open <ComponentName>[/StoryName]` - Open Storybook story
- `playground <ComponentName>` - Generate interactive playground
- `visual:component <ComponentName>` - Run Chromatic for specific component

## Test Structure

Each component should have:

```
packages/core/src/components/DynButton/
  ├── DynButton.tsx           # Component implementation
  ├── DynButton.test.tsx      # Unit tests
  ├── DynButton.a11y.test.tsx # Accessibility tests
  └── index.ts                # Public exports

apps/storybook/stories/<Category>/DynButton.stories.tsx
apps/storybook/stories/<Category>/DynButton.mdx (optional docs page)
```

> **Note:** Storybook stories are centralized in `apps/storybook/stories/`. Each
> component's stories sit alongside any `.mdx` docs files in the category folder
> (e.g. `apps/storybook/stories/Form/DynButton.stories.tsx`). Update or add new
> stories there so Storybook and the per-component tooling can resolve them.

## Accessibility Testing

All a11y tests use `vitest-axe` with global setup from `tests/setup.ts`.

### Correct Usage

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynButton } from './DynButton';

describe('DynButton Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<DynButton>Click me</DynButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**Note:** Do NOT manually import or extend `toHaveNoViolations` - it's globally available via `vitest-axe/extend-expect` in setup.

## Benefits

✅ **Fast feedback**: Test single component in seconds  
✅ **Isolated builds**: Validate component bundling independently  
✅ **Visual testing**: Manual and automated visual regression  
✅ **CI-ready**: Runs in watch mode locally, single-run in CI  
✅ **Coverage**: Per-component coverage reports  

## CI Integration

In CI, all component tests run automatically on PR. You can also trigger per-component checks:

```yaml
# Example GitHub Actions
- name: Test DynButton
  run: pnpm test:component DynButton --run
```

## Troubleshooting

### "toHaveNoViolations is not a function"

- Ensure `tests/setup.ts` imports `'vitest-axe/extend-expect'`
- Remove any manual `expect.extend(toHaveNoViolations)` from test files
- Remove `import { toHaveNoViolations }` from test files

### "Component not found"

- Check component name matches directory name exactly (case-sensitive)
- Ensure component exists in `packages/core/src/components/`

### Tests hang or timeout

- Check for missing `await` in async tests
- Ensure cleanup is working (handled automatically by setup)
- Try running with `--no-watch` flag
