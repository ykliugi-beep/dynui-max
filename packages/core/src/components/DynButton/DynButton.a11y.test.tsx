import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynButton } from './DynButton';
import { DynIcon } from '../DynIcon';

describe('DynButton Accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = render(
      <DynButton>Accessible button</DynButton>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when loading with icons', async () => {
    const { container } = render(
      <DynButton loading startIcon={<DynIcon name="check" />}>
        Loading
      </DynButton>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
