import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynContainer } from './DynContainer';

describe('DynContainer Accessibility', () => {
  it('has no violations in standard usage', async () => {
    const { container } = render(
      <DynContainer>
        <p>Accessible container</p>
      </DynContainer>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when fluid and not centered', async () => {
    const { container } = render(
      <DynContainer fluid centered={false} aria-label="Fluid container">
        Content
      </DynContainer>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
