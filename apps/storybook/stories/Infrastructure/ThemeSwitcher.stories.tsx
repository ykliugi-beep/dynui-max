import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { ThemeSwitcher, ThemeProvider, DynBox, DynButton } from '@dynui-max/core';
import type { ThemeMode } from '@dynui-max/core';
import { within, userEvent, expect } from '@storybook/test';

const meta = {
  title: 'Infrastructure/ThemeSwitcher',
  component: ThemeSwitcher,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', minHeight: '420px' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive control for switching between light, dark, and system themes. Supports controlled and uncontrolled usage patterns.'
      }
    }
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Current theme mode'
    },
    onChange: {
      action: 'mode-changed (onChange)',
      description: 'New change handler triggered when the theme mode updates'
    },
    onModeChange: {
      action: 'theme-changed',
      description: 'Callback when theme mode changes'
    },
    showSystem: {
      control: 'boolean',
      description: 'Whether to show system preference option'
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the switcher component'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable theme switching'
    }
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

type ModeSwatchProps = {
  label: string;
  description: string;
};

const ModeSwatch = ({ label, description }: ModeSwatchProps) => (
  <DynBox
    p="lg"
    radius="md"
    style={{
      border: '1px solid var(--dyn-color-border-primary)',
      background: 'var(--dyn-color-background-secondary)',
      minWidth: '220px'
    }}
  >
    <strong style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</strong>
    <span style={{ color: 'var(--dyn-color-text-secondary)', fontSize: '0.9rem' }}>{description}</span>
  </DynBox>
);

export const ControlledModes: Story = {
  args: {
    showSystem: true,
    size: 'md'
  },
  render: (args) => {
    const [mode, setMode] = useState<ThemeMode>('light');

    useEffect(() => {
      if (args.mode) {
        setMode(args.mode);
      }
    }, [args.mode]);

    const handleModeChange = (next: ThemeMode) => {
      setMode(next);
      args.onModeChange?.(next);
    };

    return (
      <DynBox display="flex" direction="column" gap="lg">
        <DynBox display="flex" align="center" gap="md">
          <ThemeSwitcher
            {...args}
            mode={mode}
            onChange={(newMode) => {
              setMode(newMode);
              args.onChange?.(newMode);
            }}
            onModeChange={(newMode) => {
              args.onModeChange?.(newMode);
            }}
          />
          <span style={{ color: 'var(--dyn-color-text-secondary)' }}>
            Active mode: <strong>{mode}</strong>
          </span>
        </DynBox>

        <DynBox display="flex" gap="sm" wrap="wrap">
          <DynButton variant={mode === 'light' ? 'solid' : 'outline'} color="primary" onClick={() => handleModeChange('light')}>
            Light
          </DynButton>
          <DynButton variant={mode === 'dark' ? 'solid' : 'outline'} color="primary" onClick={() => handleModeChange('dark')}>
            Dark
          </DynButton>
          {args.showSystem && (
            <DynButton
              variant={mode === 'system' ? 'solid' : 'outline'}
              color="primary"
              onClick={() => handleModeChange('system')}
            >
              System
            </DynButton>
          )}
        </DynBox>

        <DynBox display="grid" gap="md" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <ModeSwatch label="Light" description="High contrast for bright environments." />
          <ModeSwatch label="Dark" description="Dimmed interface for low-light usage." />
          {args.showSystem && (
            <ModeSwatch label="System" description="Follows the operating system preference." />
          )}
        </DynBox>
      </DynBox>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled ThemeSwitcher hooked to local state. External buttons drive the same controlled mode.'
      }
    }
  }
};

export const SystemAwareness: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeMode>('system');
    const [userPreference, setUserPreference] = useState<ThemeMode>('system');
    const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>(() => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return 'light';
      }

      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return;
      }

      const media = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (event: MediaQueryListEvent) => {
        setSystemPreference(event.matches ? 'dark' : 'light');
      };

      if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', handleChange);
        return () => media.removeEventListener('change', handleChange);
      }

      media.addListener(handleChange);
      return () => media.removeListener(handleChange);
    }, []);

    const effectiveTheme = theme === 'system' ? systemPreference : theme;

    const handleThemeChange = (newTheme: ThemeMode) => {
      setTheme(newTheme);
      setUserPreference(newTheme);
      console.log('Saving theme preference:', newTheme);
    };

    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--dyn-color-text-primary)' }}>Theme Options</h3>
          <ThemeSwitcher
            mode={theme}
            onChange={handleThemeChange}
            showSystem
            size="md"
            aria-label="Theme mode"
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <DynBox p="md" radius="md" style={{ background: 'var(--dyn-color-background-secondary)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>☀️ Light Mode</h4>
            <p style={{ margin: 0, fontSize: '0.9em' }}>Clean, bright interface for daytime use</p>
          </DynBox>
          
          <DynBox p="md" radius="md" style={{ background: 'var(--dyn-color-background-secondary)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>🌙 Dark Mode</h4>
            <p style={{ margin: 0, fontSize: '0.9em' }}>Reduced eye strain for low-light environments</p>
          </DynBox>
          
          <DynBox p="md" radius="md" style={{ background: 'var(--dyn-color-background-secondary)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>⚙️ System Mode</h4>
            <p style={{ margin: 0, fontSize: '0.9em' }}>Automatically follows your device settings</p>
          </DynBox>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete theme switcher with light, dark, and system options.'
      }
    }
  }
};

export const Playground: Story = {
  args: {
    showSystem: true,
    size: 'md',
    disabled: false
  },
  render: (args) => {
    const [theme, setTheme] = useState<ThemeMode>('light');

    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Theme Switcher Playground</h3>
          <p style={{ margin: '0 0 1rem 0' }}>Use the controls panel to experiment with different configurations.</p>
        </div>
        
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeSwitcher
            {...args}
            mode={theme}
            onChange={(newMode) => {
              setTheme(newMode);
              args.onChange?.(newMode);
            }}
          />
          <span>Current: <strong>{theme}</strong></span>
        </div>
        
        <DynBox p="lg" radius="md" style={{ background: 'var(--dyn-color-background-secondary)' }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>Live Theme Preview</h4>
          <p style={{ margin: 0 }}>This content adapts to show the effects of your theme switcher configuration.</p>
        </DynBox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing theme switcher configurations.'
      }
    }
  }
};
