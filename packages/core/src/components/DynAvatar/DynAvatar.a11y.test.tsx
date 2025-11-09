import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynAvatar } from './DynAvatar';

describe('DynAvatar Accessibility', () => {
  it('has no accessibility violations with image fallback', async () => {
    const { container } = render(
      <DynAvatar name="Accessible User" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when interactive', async () => {
    const { container } = render(
      <DynAvatar name="Clickable" onClick={() => undefined} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
