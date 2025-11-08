import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DynBreadcrumb } from './DynBreadcrumb';

describe('DynBreadcrumb Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current Page' }
    ];
    const { container } = render(
      <DynBreadcrumb items={items} aria-label="Breadcrumb navigation" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});