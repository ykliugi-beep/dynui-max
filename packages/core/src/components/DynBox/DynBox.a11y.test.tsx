import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynBox } from './DynBox';

describe('DynBox Accessibility', () => {
  it('has no accessibility violations for structural layout', async () => {
    const { container } = render(
      <DynBox as="section" aria-label="Layout section">
        <p>Structured content</p>
      </DynBox>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when interactive', async () => {
    const { container } = render(
      <DynBox interactive onClick={() => undefined} aria-label="Interactive box">
        Click me
      </DynBox>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
