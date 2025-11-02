import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynPagination } from './DynPagination';

expect.extend(toHaveNoViolations);

describe('DynPagination Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynPagination totalPages={8} currentPage={3} onPageChange={() => {}} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
