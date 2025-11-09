import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynModal } from './DynModal';

describe('DynModal Enhanced', () => {
  it('renders modal when isOpen is true', () => {
    render(
      <DynModal isOpen={true} onClose={() => {}}>
        <div>
          <h2>Modal Title</h2>
          <p>Modal content</p>
        </div>
      </DynModal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <DynModal isOpen={false} onClose={() => {}}>
        <div>Modal content</div>
      </DynModal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(
      <DynModal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </DynModal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when escape key is pressed', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(
      <DynModal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </DynModal>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('applies correct size class', () => {
    render(
      <DynModal isOpen={true} onClose={() => {}} size="lg">
        <div>Modal content</div>
      </DynModal>
    );
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('dyn-modal--size-lg');
  });

  it('supports custom aria-label', () => {
    render(
      <DynModal isOpen={true} onClose={() => {}} aria-label="Custom Modal">
        <div>Modal content</div>
      </DynModal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Custom Modal');
  });
});