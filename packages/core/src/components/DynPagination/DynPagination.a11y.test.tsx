import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynPagination } from './DynPagination';


describe('DynPagination Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynPagination totalPages={8} currentPage={3} onPageChange={() => {}} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
