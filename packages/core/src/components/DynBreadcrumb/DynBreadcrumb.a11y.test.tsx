import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynBreadcrumb } from './DynBreadcrumb';

expect.extend(toHaveNoViolations);

describe('DynBreadcrumb Accessibility', () => {
  it('has no violations with basic links', async () => {
    const { container } = render(
      <DynBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library', href: '/library' },
          { label: 'Data' }
        ]}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when collapsing items', async () => {
    const { container } = render(
      <DynBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Catalog', href: '/catalog' },
          { label: 'Category', href: '/category' },
          { label: 'Item' }
        ]}
        maxItems={3}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
