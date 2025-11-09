import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DynStepper } from './DynStepper';

describe('DynStepper Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const steps = [
      { key: '1', title: 'Step 1' },
      { key: '2', title: 'Step 2' },
      { key: '3', title: 'Step 3' }
    ];
    
    const { container } = render(
      <DynStepper steps={steps} current={1} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
