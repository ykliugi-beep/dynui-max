import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynSpinner } from './DynSpinner';
import styles from './DynSpinner.module.css';

describe('DynSpinner', () => {
  it('renders with default accessible label', () => {
    render(<DynSpinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
  });

  it('shows custom label text and inline variant', () => {
    render(<DynSpinner label="Fetching data" inline size="lg" />);

    expect(screen.getByText('Fetching data')).toBeInTheDocument();
    const spinner = screen.getByRole('status');
    const inlineClass = styles['dyn-spinner--inline'];
    expect(inlineClass).toBeDefined();
    if (!inlineClass) {
      throw new Error('Inline class should be defined');
    }

    const largeSizeClass = styles['dyn-spinner--size-lg'];
    expect(largeSizeClass).toBeDefined();
    if (!largeSizeClass) {
      throw new Error('Large size class should be defined');
    }

    expect(spinner).toHaveClass(inlineClass);
    expect(spinner).toHaveClass(largeSizeClass);
  });
});
