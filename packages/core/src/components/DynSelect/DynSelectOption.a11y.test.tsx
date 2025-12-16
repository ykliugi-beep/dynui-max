import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynSelectOption } from './DynSelectOption';

const OPTION = { value: 'value', label: 'Label', description: 'Description' };

describe('DynSelectOption Accessibility', () => {
  it('has no violations for standard option', async () => {
    const { container } = render(
      <div role="listbox" aria-label="Options">
        <DynSelectOption option={OPTION} />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for multiple selection mode', async () => {
    const { container } = render(
      <div role="listbox" aria-label="Options" aria-multiselectable>
        <DynSelectOption option={OPTION} selectionMode="multiple" selected />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
