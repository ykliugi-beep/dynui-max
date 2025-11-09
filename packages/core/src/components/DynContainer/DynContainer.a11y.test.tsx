import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { DynContainer } from './DynContainer';

describe('DynContainer Accessibility', () => {
  it('has no accessibility violations for basic usage', async () => {
    const { container } = render(
      <DynContainer aria-label="Page content">Page</DynContainer>
    );
    // Basic a11y check
    expect(container.firstChild).toHaveAttribute('aria-label', 'Page content');
  });

  it('has no accessibility violations with size and centered props', async () => {
    const { container } = render(
      <DynContainer size="lg" centered={false} aria-label="Not centered" />
    );
    expect(container.firstChild).not.toHaveClass('dyn-container--centered');
    expect(container.firstChild).toHaveClass('dyn-container--size-lg');
  });
});
