#!/usr/bin/env python3
"""
Complete automated fix for vitest-axe to jest-axe migration.
Run this from the root of dynui-max repository.

Usage:
    python fix_all_a11y_tests.py

This will:
1. Find all test files with vitest-axe imports
2. Replace them with imports from test/setup
3. Create a single commit with all changes
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Tuple

def fix_vitest_axe_import(content: str) -> str:
    """Replace vitest-axe import with test/setup import."""
    # Pattern to match various import formats
    pattern = r"import\s*{\s*axe\s*}\s*from\s*['\"]vitest-axe['\"];?"
    replacement = "import { axe } from '../../test/setup';"
    
    return re.sub(pattern, replacement, content)

def find_test_files(base_path: Path) -> List[Path]:
    """Find all test files that might have vitest-axe imports."""
    test_files = []
    
    # Search in components directory
    components_dir = base_path / "packages" / "core" / "src" / "components"
    
    if not components_dir.exists():
        print(f"❌ Error: Components directory not found: {components_dir}")
        return []
    
    # Find all .test.tsx and .a11y.test.tsx files
    for test_file in components_dir.rglob("*.test.tsx"):
        test_files.append(test_file)
    
    return test_files

def process_file(filepath: Path) -> Tuple[bool, str]:
    """
    Process a single file and return (changed, new_content).
    Returns (False, '') if file doesn't need changes.
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file has vitest-axe import
        if 'vitest-axe' not in content:
            return False, ''
        
        # Fix the import
        new_content = fix_vitest_axe_import(content)
        
        if new_content != content:
            return True, new_content
        
        return False, ''
    
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False, ''

def main():
    print("=" * 80)
    print("🔧 A11Y Test Migration Script: vitest-axe → jest-axe")
    print("=" * 80)
    print()
    
    # Get repository root
    repo_root = Path.cwd()
    
    if not (repo_root / "packages" / "core").exists():
        print("❌ Error: Run this script from the repository root!")
        print(f"   Current directory: {repo_root}")
        sys.exit(1)
    
    print(f"📁 Repository root: {repo_root}")
    print()
    
    # Find all test files
    print("🔍 Searching for test files...")
    test_files = find_test_files(repo_root)
    print(f"✅ Found {len(test_files)} test files")
    print()
    
    # Process each file
    print("🔄 Processing files...")
    changed_files = []
    
    for filepath in test_files:
        changed, new_content = process_file(filepath)
        
        if changed:
            # Write the fixed content
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            changed_files.append(filepath)
            rel_path = filepath.relative_to(repo_root)
            print(f"  ✅ Fixed: {rel_path}")
    
    print()
    print("=" * 80)
    print(f"📊 Summary: {len(changed_files)} files updated")
    print("=" * 80)
    print()
    
    if changed_files:
        print("✅ All files fixed!")
        print()
        print("📝 Next steps:")
        print("  1. Review changes: git diff")
        print("  2. Stage changes: git add packages/core/src/components")
        print("  3. Commit: git commit -m 'test(core): migrate all a11y tests to jest-axe via setup'")
        print("  4. Push: git push origin fix/complete-vitest-axe-to-jest-axe-migration")
        print()
        print("Changed files:")
        for filepath in changed_files:
            rel_path = filepath.relative_to(repo_root)
            print(f"  - {rel_path}")
    else:
        print("ℹ️  No files needed changes (all already migrated)")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
