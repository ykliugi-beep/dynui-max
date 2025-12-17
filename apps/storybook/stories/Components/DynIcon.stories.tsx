import type { Meta, StoryObj } from '@storybook/react';
import { DynIcon, IconName } from '@dynui-max/core/ui/dyn-icon';
import '@dynui-max/design-tokens/dist/tokens.css';

const meta: Meta<typeof DynIcon> = {
  title: 'Components/DynIcon',
  component: DynIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A scalable SVG icon component with built-in icon dictionary and accessibility support.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'check',
        'close',
        'arrow-up',
        'arrow-down',
        'arrow-left',
        'arrow-right',
        'chevron-up',
        'chevron-down',
        'chevron-left',
        'chevron-right',
        'menu',
        'search',
        'info',
        'warning',
        'error',
        'success',
        'help',
        'settings',
        'user',
        'lock',
      ] as IconName[],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default icon
export const Default: Story = {
  args: {
    name: 'check',
    size: 'md',
  },
};

// Extra small
export const ExtraSmall: Story = {
  args: {
    name: 'search',
    size: 'xs',
  },
};

// Small
export const Small: Story = {
  args: {
    name: 'search',
    size: 'sm',
  },
};

// Medium (default)
export const Medium: Story = {
  args: {
    name: 'search',
    size: 'md',
  },
};

// Large
export const Large: Story = {
  args: {
    name: 'search',
    size: 'lg',
  },
};

// Extra large
export const ExtraLarge: Story = {
  args: {
    name: 'search',
    size: 'xl',
  },
};

// Custom color
export const CustomColor: Story = {
  args: {
    name: 'warning',
    size: 'lg',
    color: '#ff9800',
  },
};

// With CSS variable color
export const WithCSSVariable: Story = {
  args: {
    name: 'error',
    size: 'lg',
    color: 'var(--dyn-color-error)',
  },
};

// With aria-label
export const WithLabel: Story = {
  args: {
    name: 'check',
    size: 'lg',
    'aria-label': 'Success checkmark',
  },
};

// Icon showcase
function IconShowcase() {
  const icons: IconName[] = [
    'check',
    'close',
    'arrow-up',
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'chevron-up',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'menu',
    'search',
    'info',
    'warning',
    'error',
    'success',
    'help',
    'settings',
    'user',
    'lock',
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '1rem', padding: '1rem' }}>
      {icons.map((icon) => (
        <div
          key={icon}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
          }}
        >
          <DynIcon name={icon} size="lg" />
          <span style={{ fontSize: '12px', textAlign: 'center', wordBreak: 'break-word' }}>{icon}</span>
        </div>
      ))}
    </div>
  );
}

export const AllIcons: Story = {
  render: () => <IconShowcase />,
};

// Sizes showcase
function SizeShowcase() {
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}>
      {sizes.map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <DynIcon name="check" size={size} />
          <span style={{ fontSize: '12px' }}>{size}</span>
        </div>
      ))}
    </div>
  );
}

export const AllSizes: Story = {
  render: () => <SizeShowcase />,
};

// Colors showcase
function ColorShowcase() {
  const colors = {
    primary: 'var(--dyn-color-primary-500)',
    error: 'var(--dyn-color-error)',
    success: 'var(--dyn-color-success)',
    warning: 'var(--dyn-color-warning)',
    info: 'var(--dyn-color-info)',
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}>
      {Object.entries(colors).map(([name, color]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <DynIcon
            name={name as IconName}
            size="lg"
            color={color}
          />
          <span style={{ fontSize: '12px' }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

export const AllColors: Story = {
  render: () => <ColorShowcase />,
};

// Accessibility test
export const Accessibility: Story = {
  args: {
    name: 'warning',
    size: 'lg',
    'aria-label': 'Warning alert',
  },
  parameters: {
    a11y: {
      run: true,
    },
  },
};
