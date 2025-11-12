import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynAvatar } from './DynAvatar';

describe('DynAvatar Accessibility', () => {
  it('has no accessibility violations with name fallback', async () => {
    const { container } = render(<DynAvatar name="Accessible User" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when an image is provided', async () => {
    const { container } = render(
      <DynAvatar src="https://example.com/avatar.png" alt="User avatar" name="Fallback User" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
