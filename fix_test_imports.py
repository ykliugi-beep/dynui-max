#!/usr/bin/env python3
"""
Automatic Test Import Cleaner for DynUI-Max
Removes direct vitest-axe and jest-axe imports from test files
since matchers are globally registered in test/setup.ts
"""

import os
import re
from pathlib import Path

def clean_test_file_content(content: str) -> str:
    """
    Remove direct vitest-axe/jest-axe imports and expect.extend calls
    """
    lines = content.split('\n')
    cleaned_lines = []

    for line in lines:
        # Skip lines with vitest-axe or jest-axe toHaveNoViolations import
        if ("from 'vitest-axe'" in line or 'from "vitest-axe"' in line or
            "from 'jest-axe'" in line or 'from "jest-axe"' in line):

            # If line has both axe and toHaveNoViolations, keep only axe
            if 'axe' in line and 'toHaveNoViolations' in line:
                # Remove toHaveNoViolations from import
                cleaned_line = re.sub(r',\s*toHaveNoViolations', '', line)
                cleaned_line = re.sub(r'toHaveNoViolations\s*,\s*', '', cleaned_line)
                cleaned_line = re.sub(r'\{\s*toHaveNoViolations\s*\}', '{ axe }', cleaned_line)

                # Replace jest-axe with vitest-axe
                if 'jest-axe' in cleaned_line:
                    cleaned_line = cleaned_line.replace("'jest-axe'", "'vitest-axe'")
                    cleaned_line = cleaned_line.replace('"jest-axe"', "'vitest-axe'")

                if 'axe' in cleaned_line:
                    cleaned_lines.append(cleaned_line)
                continue

            # If only toHaveNoViolations, skip entire line
            if 'toHaveNoViolations' in line and 'axe' not in line:
                continue

        # Skip expect.extend lines with toHaveNoViolations
        if 'expect.extend' in line and 'toHaveNoViolations' in line:
            continue

        # Keep all other lines
        cleaned_lines.append(line)

    return '\n'.join(cleaned_lines)

def process_test_files(root_path: str = 'packages/core/src'):
    """
    Find and process all test files in the project
    """
    root = Path(root_path)

    if not root.exists():
        print(f"❌ Error: Path {root_path} does not exist!")
        print("   Run this script from the project root directory.")
        return

    # Find all test files
    test_files = []
    test_files.extend(root.glob('**/*.a11y.test.tsx'))
    test_files.extend(root.glob('**/*.enhanced.test.tsx'))
    test_files.extend(root.glob('**/*.test.tsx'))

    processed_count = 0
    skipped_count = 0

    for test_file in test_files:
        try:
            # Read file content
            with open(test_file, 'r', encoding='utf-8') as f:
                original_content = f.read()

            # Check if file needs cleaning
            needs_cleaning = (
                'vitest-axe' in original_content or
                'jest-axe' in original_content or
                'toHaveNoViolations' in original_content
            )

            if not needs_cleaning:
                skipped_count += 1
                continue

            # Clean the content
            cleaned_content = clean_test_file_content(original_content)

            # Write back if changed
            if cleaned_content != original_content:
                with open(test_file, 'w', encoding='utf-8') as f:
                    f.write(cleaned_content)

                print(f"✅ Cleaned: {test_file.relative_to(root.parent.parent)}")
                processed_count += 1
            else:
                skipped_count += 1

        except Exception as e:
            print(f"❌ Error processing {test_file}: {e}")

    print(f"\n📊 Summary:")
    print(f"  • Processed: {processed_count} files")
    print(f"  • Skipped:   {skipped_count} files")
    print(f"  • Total:     {processed_count + skipped_count} files")
    print(f"\n✅ Done! All test imports cleaned.")
    print(f"   Matchers are now globally registered via test/setup.ts")

if __name__ == '__main__':
    print("=" * 80)
    print("🧹 DynUI-Max Test Import Cleaner")
    print("=" * 80)
    print()

    process_test_files()
