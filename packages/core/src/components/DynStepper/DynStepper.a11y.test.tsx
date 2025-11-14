import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynStepper, type StepData } from './DynStepper';

const mockSteps: StepData[] = [
  { key: 'step1', title: 'Personal Info', description: 'Enter your details' },
  { key: 'step2', title: 'Payment Details', description: 'Add payment method' },
  { key: 'step3', title: 'Confirmation', description: 'Review and confirm', disabled: true }
];

describe('DynStepper Accessibility', () => {
  it('has no accessibility violations in horizontal layout', async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <DynStepper 
        current={0} 
        onChange={handleChange} 
        steps={mockSteps}
        orientation="horizontal"
      />
    );
    
    await expect(axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations in vertical layout', async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <DynStepper 
        current={1} 
        onChange={handleChange} 
        steps={mockSteps}
        orientation="vertical"
      />
    );
    
    await expect(axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations with error state', async () => {
    const errorSteps: StepData[] = [
      { key: 'step1', title: 'Step 1', status: 'error' },
      { key: 'step2', title: 'Step 2' },
      { key: 'step3', title: 'Step 3' }
    ];
    
    const handleChange = vi.fn();
    const { container } = render(
      <DynStepper 
        current={1} 
        onChange={handleChange} 
        steps={errorSteps}
      />
    );
    
    await expect(axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations with disabled steps', async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <DynStepper 
        current={0} 
        onChange={handleChange} 
        steps={mockSteps}
        clickable={true}
      />
    );
    
    await expect(axe(container)).toHaveNoViolations();
  });
  
  it('has no accessibility violations with custom icons', async () => {
    const stepsWithIcons: StepData[] = [
      { 
        key: 'step1', 
        title: 'Step with Icon', 
        icon: <span role="img" aria-label="Settings">⚙️</span> 
      },
      { key: 'step2', title: 'Regular Step' },
    ];
    
    const handleChange = vi.fn();
    const { container } = render(
      <DynStepper 
        current={0} 
        onChange={handleChange} 
        steps={stepsWithIcons}
        showNumbers={false}
      />
    );
    
    await expect(axe(container)).toHaveNoViolations();
  });
});
