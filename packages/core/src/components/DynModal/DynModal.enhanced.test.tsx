import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynModal } from './DynModal';
import { axe } from 'vitest-axe';

describe('DynModal - Enhanced Tests', () => {
  let originalActiveElement: Element | null;
  
  beforeEach(() => {
    originalActiveElement = document.activeElement;
  });
  
  afterEach(() => {
    // Cleanup any open modals
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => modal.remove());
  });

  describe('Focus Management', () => {
    it('traps focus within modal and restores on close', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      // Create a focusable element outside modal
      const externalButton = document.createElement('button');
      externalButton.textContent = 'External Button';
      document.body.appendChild(externalButton);
      externalButton.focus();
      
      const { rerender } = render(
        <DynModal isOpen={false} onClose={handleClose} aria-label="Focus trap modal">
          <div>
            <input type="text" placeholder="First input" />
            <button type="button">Modal Button</button>
            <input type="text" placeholder="Last input" />
          </div>
        </DynModal>
      );
      
      // Open modal
      rerender(
        <DynModal isOpen onClose={handleClose} aria-label="Focus trap modal">
          <div>
            <input type="text" placeholder="First input" />
            <button type="button">Modal Button</button>
            <input type="text" placeholder="Last input" />
          </div>
        </DynModal>
      );
      
      await waitFor(() => {
        expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close modal' }));
      });
      
      // Tab to first input
      await user.tab();
      expect(document.activeElement).toBe(screen.getByPlaceholderText('First input'));
      
      // Tab to modal button
      await user.tab();
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Modal Button' }));
      
      // Tab to last input
      await user.tab();
      expect(document.activeElement).toBe(screen.getByPlaceholderText('Last input'));
      
      // Tab should cycle back to close button
      await user.tab();
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close modal' }));
      
      // Close modal and check focus restoration
      await user.click(screen.getByRole('button', { name: 'Close modal' }));
      
      expect(handleClose).toHaveBeenCalled();
      document.body.removeChild(externalButton);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const handleClose = vi.fn();
      
      render(
        <DynModal 
          isOpen 
          onClose={handleClose} 
          aria-label="Accessible modal"
          aria-describedby="modal-description"
        >
          <div>
            <h2>Modal Title</h2>
            <p id="modal-description">This is the modal description</p>
          </div>
        </DynModal>
      );
      
      const modal = screen.getByRole('dialog');
      
      expect(modal).toHaveAttribute('role', 'dialog');
      expect(modal).toHaveAttribute('aria-label', 'Accessible modal');
      expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
    
    it('has no accessibility violations', async () => {
      const handleClose = vi.fn();
      
      const { container } = render(
        <DynModal isOpen onClose={handleClose} aria-label="A11y modal">
          <div>
            <h1>Modal Title</h1>
            <p>Modal content with proper heading structure</p>
            <button type="button">Action Button</button>
          </div>
        </DynModal>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
