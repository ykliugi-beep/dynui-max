# Chromatic Visual Regression Setup

## 1. Create Chromatic Project
- Go to https://www.chromatic.com/ to create a project and get an API key.

## 2. Integrate in repo
- Add `chromatic` to devDependencies (already present)
- Ensure `.storybook/main.js` or `.storybook/main.ts` exists
- In CI/CD, add step:
```
npx chromatic --project-token=<CHROMATIC_TOKEN>
```
- Optionally, create workflow `.github/workflows/chromatic.yml`:

```yaml
name: "Chromatic"
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
jobs:
  chromatic-deployment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - run: pnpm install
      - run: pnpm build
      - run: pnpm storybook:build
      - run: npx chromatic --project-token=${{ secrets.CHROMATIC_TOKEN }}
```

## 3. Run baseline and start tracking
- Trigger once manually, then track visual diffs in PRs and main.

---

# Status
- [ ] Project token generated
- [ ] Baseline run complete
- [ ] chromatic.yml present in workflows
- [ ] PR visual diff reviews active
