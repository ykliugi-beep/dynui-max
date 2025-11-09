import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynRadio, DynRadioGroup } from './DynRadio';


describe('DynRadio Accessibility', () => {
  it('has no violations for radio group with labels', async () => {
    const { container } = render(
      <DynRadioGroup aria-label="Options">
        <DynRadio value="a" label="Option A" />
        <DynRadio value="b" label="Option B" />
      </DynRadioGroup>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with descriptions and error state', async () => {
    const { container } = render(
      <DynRadioGroup error aria-label="Options">
        <DynRadio value="a" label="Option A" description="First option" />
      </DynRadioGroup>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
