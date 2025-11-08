import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynBreadcrumb } from './DynBreadcrumb';
import { DynBreadcrumbItem } from './DynBreadcrumbItem';

expect.extend(toHaveNoViolations);

describe('DynBreadcrumb - Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynBreadcrumb aria-label="Breadcrumb navigation">
        <DynBreadcrumbItem href="/">Home</DynBreadcrumbItem>
        <DynBreadcrumbItem href="/products">Products</DynBreadcrumbItem>
        <DynBreadcrumbItem current>Current Page</DynBreadcrumbItem>
      </DynBreadcrumb>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
