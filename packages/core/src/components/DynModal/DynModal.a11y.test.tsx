import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynModal } from './DynModal';


describe('DynModal Accessibility', () => {
  it('has no violations when open with content', async () => {
    const { container } = render(
      <DynModal isOpen onClose={vi.fn()} aria-label="Accessible modal">
        <p>Modal content</p>
      </DynModal>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations without close button', async () => {
    const { container } = render(
      <DynModal isOpen onClose={vi.fn()} showCloseButton={false} aria-label="No close">
        <button type="button">Focusable</button>
      </DynModal>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
