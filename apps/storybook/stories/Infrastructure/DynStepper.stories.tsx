import type { Meta, StoryObj } from '@storybook/react';
import { DynStepper } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Infrastructure/DynStepper',
  component: DynStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
      <div style={{ width: '600px' }}>
        <DynStepper
          steps={[
            { label: 'Step 1', description: 'First step' },
            { label: 'Step 2', description: 'Second step' },
            { label: 'Step 3', description: 'Final step' },
          ]}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
      </div>
    );
  },
};
