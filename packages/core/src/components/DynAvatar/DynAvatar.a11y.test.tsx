import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynAvatar } from './DynAvatar';

describe('DynAvatar Accessibility', () => {
  it('has no accessibility violations with name fallback', async () => {
    const { container } = render(<DynAvatar name="Accessible User" />);
    // Use the asynchronous matcher directly on the Promise returned by axe().
    await expect(axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations when an image is provided', async () => {
    const { container } = render(
      <DynAvatar
        src="https://example.com/avatar.png"
        alt="User avatar"
        name="Fallback User"
      />
    );
    // Use the asynchronous matcher directly on the Promise returned by axe().
    await expect(axe(container)).toHaveNoViolations();
  });
});
