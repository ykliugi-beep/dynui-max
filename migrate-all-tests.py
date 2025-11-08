#!/usr/bin/env python3
import os, re
from pathlib import Path

def fix_import(c):
    return re.sub(r"import\s*{\s*axe\s*}\s*from\s*['\"]vitest-axe['\"];?", 
                  "import { axe } from '../../test/setup';", c)

def fix_unused_imports(c):
    # Remove unused React imports when not using JSX
    if 'React' not in c[c.find("import"):c.find("export")] or '<' not in c:
        c = re.sub(r"import\s+React\s+from\s+['\"]react['\"];?\n?", "", c)
    # Remove unused vi, beforeEach, userEvent, etc.
    c = re.sub(r"import\s*{\s*([^}]*,\s*)?vi(\s*,\s*[^}]*)?\s*}\s*from\s*['\"]vitest['\"];?", 
               lambda m: f"import {{ {m.group(1) or ''}{m.group(2) or ''} }} from 'vitest';" if m.group(1) or m.group(2) else "", c)
    return c

core = Path('packages/core/src')
if not core.exists():
    print("❌ Run from repo root!"); exit(1)

fixed = 0
for f in core.rglob("*.tsx"):
    orig = f.read_text('utf-8')
    new = fix_import(orig)
    if new != orig:
        f.write_text(new, 'utf-8')
        print(f"✅ {f.relative_to(Path.cwd())}")
        fixed += 1

print(f"\n✅ Fixed {fixed} files. Run: git diff && git add . && git commit -m 'test: migrate all to jest-axe' && git push")
