import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DynStepper, DynStep } from '@dynui-max/core/ui/dyn-stepper';
import '@dynui-max/design-tokens/dist/tokens.css';

const meta: Meta<typeof DynStepper> = {
  title: 'Components/DynStepper',
  component: DynStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A step-by-step progress indicator for multi-step processes and wizards.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic horizontal stepper
export const Horizontal: Story = {
  args: {
    current: 0,
    total: 4,
    orientation: 'horizontal',
    children: [
      <DynStep key="1" label="Step 1" description="First step" />,
      <DynStep key="2" label="Step 2" description="Second step" />,
      <DynStep key="3" label="Step 3" description="Third step" />,
      <DynStep key="4" label="Step 4" description="Final step" />,
    ],
  },
};

// Vertical stepper
export const Vertical: Story = {
  args: {
    current: 1,
    total: 3,
    orientation: 'vertical',
    children: [
      <DynStep key="1" label="Account" description="Create your account" />,
      <DynStep key="2" label="Profile" description="Complete your profile" />,
      <DynStep key="3" label="Verify" description="Verify your email" />,
    ],
  },
};

// With completed steps
export const Completed: Story = {
  args: {
    current: 2,
    total: 4,
    orientation: 'horizontal',
    children: [
      <DynStep key="1" label="Completed 1" completed />,
      <DynStep key="2" label="Completed 2" completed />,
      <DynStep key="3" label="Current" />,
      <DynStep key="4" label="Not yet" />,
    ],
  },
};

// With error state
export const WithError: Story = {
  args: {
    current: 1,
    total: 3,
    orientation: 'horizontal',
    children: [
      <DynStep key="1" label="Completed" completed />,
      <DynStep key="2" label="Error" error />,
      <DynStep key="3" label="Not yet" disabled />,
    ],
  },
};

// Small size
export const Small: Story = {
  args: {
    current: 1,
    total: 3,
    size: 'sm',
    orientation: 'horizontal',
    children: [
      <DynStep key="1" label="Step 1" />,
      <DynStep key="2" label="Step 2" />,
      <DynStep key="3" label="Step 3" />,
    ],
  },
};

// Large size
export const Large: Story = {
  args: {
    current: 0,
    total: 3,
    size: 'lg',
    orientation: 'horizontal',
    children: [
      <DynStep key="1" label="Step 1" />,
      <DynStep key="2" label="Step 2" />,
      <DynStep key="3" label="Step 3" />,
    ],
  },
};

// Interactive stepper
function InteractiveStepper() {
  const [current, setCurrent] = useState(0);
  const steps = [
    { label: 'Personal Info', description: 'Enter your details' },
    { label: 'Address', description: 'Where do you live?' },
    { label: 'Payment', description: 'Payment method' },
    { label: 'Review', description: 'Review your info' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DynStepper
        current={current}
        total={steps.length}
        onStepChange={setCurrent}
        orientation="horizontal"
      >
        {steps.map((step, idx) => (
          <DynStep
            key={idx}
            label={step.label}
            description={step.description}
            completed={idx < current}
          />
        ))}
      </DynStepper>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p>Current step: {current + 1}</p>
        <p>{steps[current].description}</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
            disabled={current === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveStepper />,
};

// Accessibility test
export const Accessibility: Story = {
  args: {
    current: 1,
    total: 3,
    orientation: 'horizontal',
    'aria-label': 'Sign-up process',
    children: [
      <DynStep key="1" label="Account" />,
      <DynStep key="2" label="Profile" />,
      <DynStep key="3" label="Confirm" />,
    ],
  },
  parameters: {
    a11y: {
      run: true,
      config: {
        rules: [
          {
            id: 'aria-progressbar-name',
            enabled: true,
          },
        ],
      },
    },
  },
};
