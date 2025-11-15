import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynProgress } from './DynProgress';
import styles from './DynProgress.module.css';

describe('DynProgress', () => {
  it('calculates width based on value and max', () => {
    const { container } = render(
      <DynProgress value={40} max={80} label="Uploading" />
    );

    const indicatorClass = styles['dyn-progress__indicator'];
    expect(indicatorClass).toBeDefined();
    if (!indicatorClass) {
      throw new Error('Indicator class should be defined');
    }

    const indicatorElement = container.querySelector(`.${indicatorClass}`);
    expect(indicatorElement).not.toBeNull();
    const indicator = indicatorElement as HTMLElement;
    expect(indicator.style.width).toBe('50%');
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '40');
    expect(screen.getByText('Uploading')).toBeInTheDocument();
  });

  it('supports indeterminate state and hides label', () => {
    const { container } = render(
      <DynProgress indeterminate showLabel={false} />
    );

    const progressbar = screen.getByRole('progressbar');
    const indeterminateClass = styles['dyn-progress--indeterminate'];
    expect(indeterminateClass).toBeDefined();
    if (!indeterminateClass) {
      throw new Error('Indeterminate class should be defined');
    }

    expect(progressbar).toHaveClass(indeterminateClass);

    const indicatorClass = styles['dyn-progress__indicator'];
    expect(indicatorClass).toBeDefined();
    if (!indicatorClass) {
      throw new Error('Indicator class should be defined');
    }

    const indicatorElement = container.querySelector(`.${indicatorClass}`);
    expect(indicatorElement).not.toBeNull();
    const indicator = indicatorElement as HTMLElement;
    expect(indicator.style.width).toBe('');
  });
});
