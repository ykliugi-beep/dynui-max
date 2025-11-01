import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';
import { ThemeSwitcher, ThemeProvider, DynBox, DynButton } from '@dynui-max/core';
import type { ThemeMode } from '@dynui-max/core';

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
  }
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
            onModeChange={handleModeChange}
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
    const [mode, setMode] = useState<ThemeMode>('system');
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

      const listener = (event: MediaQueryListEvent | MediaQueryList) => {
        const matches = 'matches' in event ? event.matches : (event as MediaQueryList).matches;
        setSystemPreference(matches ? 'dark' : 'light');
      };

      listener(media);

      if ('addEventListener' in media) {
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
      }

      media.addListener(listener);
      return () => media.removeListener(listener);
    }, []);

    const effectiveTheme = useMemo(
      () => (mode === 'system' ? systemPreference : mode),
      [mode, systemPreference]
    );

    return (
      <DynBox display="flex" direction="column" gap="lg">
        <DynBox display="flex" align="center" gap="md">
          <ThemeSwitcher showSystem mode={mode} onModeChange={setMode} />
          <div style={{ color: 'var(--dyn-color-text-secondary)', lineHeight: 1.4 }}>
            <div><strong>Selected:</strong> {mode}</div>
            <div><strong>Effective:</strong> {effectiveTheme}</div>
            <div><strong>System preference:</strong> {systemPreference}</div>
          </div>
        </DynBox>

        <DynBox display="flex" gap="sm">
          <DynButton variant="outline" color="primary" onClick={() => setSystemPreference('light')}>
            Simulate light system
          </DynButton>
          <DynButton variant="outline" color="primary" onClick={() => setSystemPreference('dark')}>
            Simulate dark system
          </DynButton>
        </DynBox>

        <DynBox
          p="lg"
          radius="md"
          style={{
            border: '1px solid var(--dyn-color-border-primary)',
            background: 'var(--dyn-color-background-secondary)'
          }}
        >
          The ThemeSwitcher keeps the theme in sync with the global provider. When mode is set to "system" it follows the
          operating system preference and updates automatically when it changes.
        </DynBox>
      </DynBox>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the system-aware mode. The simulated system preference controls the effective theme when mode is set to system.'
      }
    }
  }
};

export const VariantComparison: Story = {
  render: () => {
    const [mode, setMode] = useState<ThemeMode>('light');

    return (
      <DynBox display="flex" direction="column" gap="lg">
        <DynBox display="flex" gap="lg" align="center" wrap="wrap">
          <DynBox display="flex" direction="column" gap="sm" align="center">
            <ThemeSwitcher variant="button" showLabels mode={mode} onModeChange={setMode} />
            <span style={{ color: 'var(--dyn-color-text-secondary)', fontSize: '0.85rem' }}>Button variant</span>
          </DynBox>
          <DynBox display="flex" direction="column" gap="sm" align="center">
            <ThemeSwitcher variant="toggle" showSystem mode={mode} onModeChange={setMode} />
            <span style={{ color: 'var(--dyn-color-text-secondary)', fontSize: '0.85rem' }}>Toggle variant</span>
          </DynBox>
          <DynBox display="flex" direction="column" gap="sm" align="center">
            <ThemeSwitcher variant="dropdown" showSystem mode={mode} onModeChange={setMode} />
            <span style={{ color: 'var(--dyn-color-text-secondary)', fontSize: '0.85rem' }}>Dropdown variant</span>
          </DynBox>
        </DynBox>

        <DynBox p="md" radius="md" bg="muted">
          <strong>Shared mode:</strong> {mode}
        </DynBox>
      </DynBox>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All visual variants share the same controlled mode. Interacting with one switcher updates the others immediately.'
      }
    }
  }
};
