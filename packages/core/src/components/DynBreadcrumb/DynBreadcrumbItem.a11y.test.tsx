import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynBreadcrumbItem } from './DynBreadcrumbItem';

describe('DynBreadcrumbItem Accessibility', () => {
  it('has no violations when rendered as a link', async () => {
    const { container } = render(
      <DynBreadcrumbItem href="/home">Home</DynBreadcrumbItem>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when rendered as a button', async () => {
    const { container } = render(
      <DynBreadcrumbItem onClick={() => undefined}>Action</DynBreadcrumbItem>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
