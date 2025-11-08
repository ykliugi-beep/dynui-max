# Quality Gates Verification

All Phase 5 quality gates must pass before Phase 6:

| Gate | Task | Status |
|------|------|--------|
| A | TypeScript strict mode (no errors) | [ ] |
| B | ESLint + Prettier (no lint errors) | [ ] |
| C | Test coverage ≥ 80% | [ ] |
| D | axe accessibility tests (all pass) | [ ] |
| E | Bundle size <150KB core, <50KB tokens | [ ] |
| F | Chromatic visual regression (enabled) | [ ] |

Check each box upon verification:
- Run: `pnpm quality:gates`
- Review bundle report and Chromatic dashboard

---

PR will be ready to merge only when all checks are checked!
