import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { DynStepper, DynBox, DynButton, ThemeProvider } from '@dynui-max/core';
import type { StepData } from '@dynui-max/core';

const onboardingSteps: StepData[] = [
  {
    key: 'account',
    title: 'Create Account',
    description: 'Choose credentials and set up your profile basics.',
  },
  {
    key: 'plan',
    title: 'Select Plan',
    description: 'Pick a billing option that fits your team.',
  },
  {
    key: 'team',
    title: 'Invite Team',
    description: 'Bring collaborators onboard with a few clicks.',
  },
  {
    key: 'launch',
    title: 'Launch',
    description: 'Review settings and go live.',
  },
];

const meta = {
  title: 'Navigation/DynStepper',
  component: DynStepper,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Guided progression component for multi-step workflows like onboarding and checkout.

### Features
- Horizontal and vertical orientations
- Automatic status calculation and manual overrides
- Connectors, numbering, and icon display options
- Clickable steps with keyboard support
- Imperative helpers for programmatic navigation
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    showNumbers: {
      control: 'boolean',
    },
    showConnectors: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof DynStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalFlow: Story = {
  render: () => (
    <DynStepper
      current={1}
      steps={onboardingSteps.map((step, index) => ({
        ...step,
        status: index < 1 ? 'complete' : index === 1 ? 'current' : 'pending',
      }))}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal flow showing automatic progress states for a typical onboarding journey.',
      },
    },
  },
};

export const VerticalFlow: Story = {
  render: () => (
    <DynStepper
      orientation="vertical"
      current={2}
      steps={onboardingSteps.map((step, index) => ({
        ...step,
        status: index < 2 ? 'complete' : index === 2 ? 'current' : 'pending',
      }))}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical orientation is ideal for settings pages or detailed wizards with long descriptions.',
      },
    },
  },
};

export const StatusVariants: Story = {
  render: () => (
    <DynStepper
      current={2}
      steps={onboardingSteps.map((step, index) => ({
        ...step,
        status:
          index === 0 ? 'complete' :
          index === 1 ? 'error' :
          index === 2 ? 'current' :
          'pending',
      }))}
      showNumbers={false}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combine automatic status detection with explicit error states and optional numbering removal.',
      },
    },
  },
};

export const InteractiveWizard: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);
    const [errorStep, setErrorStep] = useState<number | null>(null);

    const steps = useMemo(() => onboardingSteps.map((step, index) => ({
      ...step,
      status: errorStep === index ? 'error' : undefined,
    })), [errorStep]);

    const goPrevious = () => setCurrent((prev) => Math.max(prev - 1, 0));
    const goNext = () => setCurrent((prev) => Math.min(prev + 1, onboardingSteps.length - 1));

    return (
      <DynBox display="flex" direction="column" gap="md">
        <DynStepper
          current={current}
          steps={steps}
          onChange={(index) => setCurrent(index)}
        />

        <DynBox display="flex" gap="sm">
          <DynButton size="sm" variant="outline" onClick={goPrevious} disabled={current === 0}>
            Previous
          </DynButton>
          <DynButton size="sm" onClick={goNext} disabled={current === onboardingSteps.length - 1}>
            Next
          </DynButton>
          <DynButton
            size="sm"
            variant={errorStep === current ? 'solid' : 'outline'}
            color={errorStep === current ? 'danger' : undefined}
            onClick={() => setErrorStep((prev) => (prev === current ? null : current))}
          >
            {errorStep === current ? 'Clear error' : 'Mark error'}
          </DynButton>
        </DynBox>
      </DynBox>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive controls illustrate programmatic navigation and dynamic error states.',
      },
    },
  },
};
