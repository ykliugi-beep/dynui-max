import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynToast } from './DynToast';


describe('DynToast Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynToast
        status="success"
        title="Success"
        description="Profile updated"
        actions={<button type="button">View profile</button>}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
