import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynModal } from './DynModal';

describe('DynModal', () => {
  it('renders content when open and handles close button', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <DynModal isOpen onClose={handleClose} aria-label="Example modal">
        <button type="button">Action</button>
      </DynModal>
    );

    expect(screen.getByRole('dialog', { name: 'Example modal' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes on escape and backdrop click', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <DynModal isOpen onClose={handleClose} closeOnBackdropClick closeOnEscape>
        Content
      </DynModal>
    );

    await user.keyboard('{Escape}');
    const backdrop = document.querySelector('.dyn-modal-backdrop') as HTMLElement;
    await user.click(backdrop);

    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
