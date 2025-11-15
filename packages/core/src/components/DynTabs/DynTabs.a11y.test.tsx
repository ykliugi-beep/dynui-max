import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynTabs } from './DynTabs';

const ITEMS = [
  { value: 'overview', label: 'Overview', panel: <div>Overview content</div> },
  { value: 'details', label: 'Details', panel: <div>Details content</div> }
];

describe('DynTabs Accessibility', () => {
  it('has no violations in horizontal orientation', async () => {
    const { container } = render(
      <DynTabs items={ITEMS} defaultValue="overview" aria-label="Tabs" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations in vertical orientation', async () => {
    const { container } = render(
      <DynTabs items={ITEMS} orientation="vertical" defaultValue="details" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
