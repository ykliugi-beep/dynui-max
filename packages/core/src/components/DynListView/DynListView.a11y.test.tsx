import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynListView } from './DynListView';

expect.extend(toHaveNoViolations);

describe('DynListView Accessibility', () => {
  it('has no violations for selectable list', async () => {
    const { container } = render(
      <DynListView
        items={[
          { key: '1', title: 'Item 1' },
          { key: '2', title: 'Item 2' }
        ]}
        selectionMode="single"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for empty state', async () => {
    const { container } = render(
      <DynListView items={[]} emptyText="Nothing here" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
