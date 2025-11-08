import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynStepper } from './DynStepper';
import type { StepData } from './DynStepper';


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
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
