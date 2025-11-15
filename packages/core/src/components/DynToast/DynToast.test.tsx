import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { DynToast } from './DynToast';
import styles from './DynToast.module.css';

describe('DynToast', () => {
  it('renders title, description and actions', () => {
    render(
      <DynToast
        title="Saved"
        description="Your changes have been saved"
        actions={<button type="button">Undo</button>}
      />
    );

    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes have been saved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button clicked', () => {
    const onDismiss = vi.fn();
    render(
      <DynToast title="Warning" onDismiss={onDismiss} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies status styling and role', () => {
    const { container } = render(
      <DynToast status="warning" title="Heads up" />
    );

    const toast = container.firstElementChild as HTMLElement;
    const warningClass = styles['dyn-toast--warning'];
    expect(warningClass).toBeDefined();
    if (!warningClass) {
      throw new Error('Warning class should be defined');
    }

    expect(toast).toHaveClass(warningClass);
    expect(toast).toHaveAttribute('role', 'alert');
  });
});
