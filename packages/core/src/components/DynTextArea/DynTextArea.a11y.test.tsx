import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynTextArea } from './DynTextArea';

describe('DynTextArea Accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = render(
      <DynTextArea aria-label="Description" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with auto-resize and character count', async () => {
    const { container } = render(
      <DynTextArea aria-label="Auto" autoResize showCount maxLength={20} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
