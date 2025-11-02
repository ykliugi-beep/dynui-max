import type { Meta, StoryObj } from '@storybook/react';
import { DynStepper, DynStep, DynButton, DynBox, DynIcon, ThemeProvider } from '@dynui-max/core';
import type { StepData, StepStatus } from '@dynui-max/core';
import { useState } from 'react';

const sampleSteps: StepData[] = [
  { key: 'personal', title: 'Personal Information', description: 'Enter your basic details' },
  { key: 'account', title: 'Account Setup', description: 'Create your account credentials' },
  { key: 'preferences', title: 'Preferences', description: 'Configure your application settings' },
  { key: 'review', title: 'Review & Submit', description: 'Review all information and submit' },
];

const wizardSteps: StepData[] = [
  { 
    key: 'project', 
    title: 'Project Setup', 
    description: 'Configure your new project',
    icon: <DynIcon name="folder" size="sm" />
  },
  { 
    key: 'dependencies', 
    title: 'Dependencies', 
    description: 'Choose your tech stack',
    icon: <DynIcon name="package" size="sm" />
  },
  { 
    key: 'deployment', 
    title: 'Deployment', 
    description: 'Configure deployment settings',
    icon: <DynIcon name="globe" size="sm" />
  },
  { 
    key: 'launch', 
    title: 'Launch', 
    description: 'Go live with your project',
    icon: <DynIcon name="rocket" size="sm" />
  },
];

const meta = {
  title: 'Infrastructure/DynStepper',
  component: DynStepper,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Step navigation component for wizards and multi-step processes.

### Features
- Horizontal and vertical orientations
- Clickable steps (configurable)
- Status indicators (pending, current, complete, error)
- Custom icons or automatic numbering
- Connecting lines between steps
- Keyboard navigation (Enter, Space)
- Responsive design
- Focus management and accessibility
- Ref methods for programmatic navigation
        `
      }
    }
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Current active step index'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    clickable: {
      control: 'boolean',
    },
    showNumbers: {
      control: 'boolean',
    },
    showConnectors: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DynStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic horizontal stepper
export const Default: Story = {
  args: {
    current: 1,
    steps: sampleSteps,
    orientation: 'horizontal',
    size: 'md',
    showNumbers: true,
    showConnectors: true,
    clickable: true,
  },
};

// Vertical orientation
export const Vertical: Story = {
  args: {
    current: 2,
    steps: sampleSteps,
    orientation: 'vertical',
    size: 'md',
    showNumbers: true,
    showConnectors: true,
    clickable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical stepper layout, ideal for sidebars or narrow containers.'
      }
    }
  }
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Small</h3>
        <DynStepper current={1} steps={sampleSteps.slice(0, 3)} size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Medium</h3>
        <DynStepper current={1} steps={sampleSteps.slice(0, 3)} size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Large</h3>
        <DynStepper current={1} steps={sampleSteps.slice(0, 3)} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available stepper sizes using design token system.'
      }
    }
  }
};

// With custom icons
export const WithIcons: Story = {
  args: {
    current: 1,
    steps: wizardSteps,
    orientation: 'horizontal',
    showNumbers: false,
    clickable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper with custom icons instead of numbers. Icons help users understand the purpose of each step.'
      }
    }
  }
};

// Step states demonstration
export const StepStates: Story = {
  render: () => {
    const stepsWithStates: StepData[] = [
      { key: 'complete', title: 'Completed Step', status: 'complete' },
      { key: 'current', title: 'Current Step', status: 'current' },
      { key: 'error', title: 'Step with Error', status: 'error' },
      { key: 'pending', title: 'Pending Step', status: 'pending' },
      { key: 'disabled', title: 'Disabled Step', disabled: true },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Horizontal Layout</h3>
          <DynStepper 
            current={1} 
            steps={stepsWithStates} 
            orientation="horizontal"
            clickable={true}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Vertical Layout</h3>
          <DynStepper 
            current={1} 
            steps={stepsWithStates} 
            orientation="vertical"
            clickable={true}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All possible step states: complete (with check icon), current (highlighted), error (with X icon), pending, and disabled.'
      }
    }
  }
};

// Without connectors
export const WithoutConnectors: Story = {
  args: {
    current: 2,
    steps: sampleSteps,
    orientation: 'horizontal',
    showConnectors: false,
    clickable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper without connecting lines between steps. Useful for discrete, non-sequential processes.'
      }
    }
  }
};

// Interactive wizard example
export const InteractiveWizard: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    
    const handleStepChange = (stepIndex: number) => {
      setCurrentStep(stepIndex);
    };
    
    const handleNext = () => {
      if (currentStep < sampleSteps.length - 1) {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(currentStep + 1);
      }
    };
    
    const handlePrevious = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };
    
    const handleFinish = () => {
      setCompletedSteps(prev => [...prev, currentStep]);
      alert('Wizard completed!');
    };
    
    const stepsWithCompletion = sampleSteps.map((step, index) => ({
      ...step,
      status: completedSteps.includes(index) ? 'complete' as StepStatus : 
              index === currentStep ? 'current' as StepStatus : 'pending' as StepStatus
    }));
    
    return (
      <div>
        <DynStepper
          current={currentStep}
          steps={stepsWithCompletion}
          onChange={handleStepChange}
          orientation="horizontal"
          clickable={true}
        />
        
        {/* Step Content */}
        <DynBox mt="xl" p="lg" bg="secondary" radius="md" style={{ minHeight: '200px' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>{sampleSteps[currentStep].title}</h3>
          <p style={{ margin: '0 0 1.5rem 0', color: 'var(--dyn-color-text-secondary)' }}>
            {sampleSteps[currentStep].description}
          </p>
          
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
            <DynButton
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              startIcon={<DynIcon name="arrow-left" size="sm" />}
            >
              Previous
            </DynButton>
            
            {currentStep < sampleSteps.length - 1 ? (
              <DynButton
                variant="solid"
                onClick={handleNext}
                endIcon={<DynIcon name="arrow-right" size="sm" />}
              >
                Next Step
              </DynButton>
            ) : (
              <DynButton
                variant="solid"
                color="success"
                onClick={handleFinish}
                endIcon={<DynIcon name="check" size="sm" />}
              >
                Finish
              </DynButton>
            )}
          </div>
        </DynBox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete interactive wizard with step navigation, content areas, and navigation controls. Demonstrates real-world usage patterns.'
      }
    }
  }
};

// Non-clickable stepper
export const NonClickable: Story = {
  args: {
    current: 2,
    steps: sampleSteps,
    orientation: 'horizontal',
    clickable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only stepper that shows progress but does not allow step navigation via clicking.'
      }
    }
  }
};

// Individual DynStep component showcase
export const IndividualStep: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Individual DynStep Components</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <DynStep
          title="Completed Step"
          description="This step is completed"
          status="complete"
          index={0}
          clickable={true}
          onClick={(index) => alert(`Clicked step ${index + 1}`)}
          showNumbers={true}
        />
        
        <DynStep
          title="Current Step"
          description="This is the active step"
          status="current"
          index={1}
          clickable={false}
          showNumbers={true}
        />
        
        <DynStep
          title="Error Step"
          description="This step has an error"
          status="error"
          index={2}
          clickable={true}
          onClick={(index) => alert(`Fixing error at step ${index + 1}`)}
          showNumbers={true}
        />
        
        <DynStep
          title="Disabled Step"
          description="This step is disabled"
          status="pending"
          index={3}
          disabled={true}
          showNumbers={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Individual DynStep components showing different states and interactions. Useful for custom stepper layouts.'
      }
    }
  }
};

// Playground
export const Playground: Story = {
  args: {
    current: 1,
    steps: sampleSteps,
    orientation: 'horizontal',
    size: 'md',
    clickable: true,
    showNumbers: true,
    showConnectors: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different stepper configurations. Use the controls panel to experiment with props.'
      }
    }
  }
};
