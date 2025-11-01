import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { ThemeSwitcher, ThemeProvider, DynBox, DynButton } from '@dynui-max/core';
import type { ThemeMode } from '@dynui-max/core';
import { useState, useEffect } from 'react';

const meta = {
  title: 'Infrastructure/ThemeSwitcher',
  component: ThemeSwitcher,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', minHeight: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Interactive theme switcher component for toggling between light, dark, and system color schemes.

### Features
- Light, dark, and system preference modes
- Automatic system theme detection
- Controlled and uncontrolled patterns
- Keyboard navigation support
- ARIA accessibility attributes
- Integration with global theme provider
- Customizable size and appearance
        `
      }
    }
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Current theme mode'
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

// Overview - Basic theme switcher
export const Overview: Story = {
  args: {
    mode: 'light',
    showSystem: true,
    size: 'md'
  },
  render: (args) => {
    const [theme, setTheme] = useState<ThemeMode>(args.mode || 'light');

    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Theme Switcher Demo</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Click the theme switcher to see the interface adapt to different color schemes.</p>
        </div>
        
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--color-text-primary)' }}>Current theme: <strong>{theme}</strong></span>
          <ThemeSwitcher
            {...args}
            mode={theme}
            onModeChange={(newMode) => {
              setTheme(newMode);
              args.onModeChange?.(newMode);
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynBox p="lg" bg="primary" radius="md">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>Primary Background</h4>
            <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>This box uses the primary background color that adapts to the selected theme.</p>
          </DynBox>
          
          <DynBox p="lg" bg="secondary" radius="md">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Secondary Background</h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Notice how the text and background colors change with the theme.</p>
          </DynBox>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <DynButton variant="solid" color="primary">Primary Button</DynButton>
            <DynButton variant="solid" color="secondary">Secondary Button</DynButton>
            <DynButton variant="outline">Outline Button</DynButton>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Find theme switcher button
    const themeSwitcher = canvas.getByRole('button', { name: /theme/i }) || 
                         canvas.getByRole('group', { name: /theme/i });
    await expect(themeSwitcher).toBeInTheDocument();
    
    // Test theme switching
    await userEvent.click(themeSwitcher);
    
    // Verify ARIA attributes
    if (themeSwitcher.getAttribute('role') === 'radiogroup') {
      const options = canvas.getAllByRole('radio');
      await expect(options.length).toBeGreaterThanOrEqual(2);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic theme switcher with light, dark, and system options. Shows how the interface adapts to different color schemes.'
      }
    }
  }
};

// With System Option - All three modes
export const WithSystem: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeMode>('system');
    const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light');
    
    // Simulate system preference detection
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemPreference(mediaQuery.matches ? 'dark' : 'light');
      
      const handleChange = (e: MediaQueryListEvent) => {
        setSystemPreference(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    
    const getEffectiveTheme = () => {
      if (theme === 'system') return systemPreference;
      return theme;
    };
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Theme Options</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <div>
              <strong>Selected:</strong> {theme}
            </div>
            <div>
              <strong>Effective:</strong> {getEffectiveTheme()}
            </div>
            <div>
              <strong>System Preference:</strong> {systemPreference}
            </div>
          </div>
          <ThemeSwitcher
            mode={theme}
            onModeChange={setTheme}
            showSystem={true}
            size="md"
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <DynBox p="md" bg="primary" radius="md">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>☀️ Light Mode</h4>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)', fontSize: '0.9em' }}>Clean, bright interface for daytime use</p>
            <div style={{ fontSize: '0.8em', opacity: 0.8, color: 'var(--color-text-inverse)' }}>Active when: theme='light' or system preference is light</div>
          </DynBox>
          
          <DynBox p="md" bg="secondary" radius="md">
            <h4 style={{ margin: '0 0 0.5rem 0' }}>🌙 Dark Mode</h4>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Reduced eye strain for low-light environments</p>
            <div style={{ fontSize: '0.8em', opacity: 0.8, color: 'var(--color-text-secondary)' }}>Active when: theme='dark' or system preference is dark</div>
          </DynBox>
          
          <DynBox p="md" bg="muted" radius="md">
            <h4 style={{ margin: '0 0 0.5rem 0' }}>⚙️ System Mode</h4>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Automatically follows your device settings</p>
            <div style={{ fontSize: '0.8em', opacity: 0.8, color: 'var(--color-text-secondary)' }}>Active when: theme='system' and respects OS preference</div>
          </DynBox>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: '8px', border: '1px solid var(--color-border-primary)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Theme Information</h4>
          <ul style={{ margin: '0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
            <li><strong>Light:</strong> Forces light theme regardless of system settings</li>
            <li><strong>Dark:</strong> Forces dark theme regardless of system settings</li>
            <li><strong>System:</strong> Automatically detects and follows your operating system's theme preference</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete theme switcher with light, dark, and system options. System mode automatically detects and follows OS preferences.'
      }
    }
  }
};

// Controlled Pattern - External state management
export const Controlled: Story = {
  render: () => {
    const [globalTheme, setGlobalTheme] = useState<ThemeMode>('light');
    const [userPreference, setUserPreference] = useState<ThemeMode>('light');

    // Simulate saving preference to localStorage or API
    const handleThemeChange = (newTheme: ThemeMode) => {
      setGlobalTheme(newTheme);
      setUserPreference(newTheme);
      
      // Simulate API call or localStorage save
      console.log('Saving theme preference:', newTheme);
      
      // In a real app, you might do:
      // localStorage.setItem('theme-preference', newTheme);
      // or make an API call to save user preferences
    };
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Controlled Theme Switcher</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>This theme switcher is controlled by external state and can persist user preferences.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: '8px' }}>
          <div>
            <strong style={{ color: 'var(--color-text-primary)' }}>Theme Control:</strong>
            <ThemeSwitcher
              mode={globalTheme}
              onModeChange={handleThemeChange}
              showSystem={true}
              size="md"
            />
          </div>
          
          <div style={{ color: 'var(--color-text-secondary)' }}>
            <div><strong>Current Theme:</strong> {globalTheme}</div>
            <div><strong>User Preference:</strong> {userPreference}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => handleThemeChange('light')}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--color-border-primary)',
              borderRadius: '4px',
              background: globalTheme === 'light' ? 'var(--color-primary)' : 'var(--color-background-primary)',
              color: globalTheme === 'light' ? 'white' : 'var(--color-text-primary)',
              cursor: 'pointer'
            }}
          >
            Set Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--color-border-primary)',
              borderRadius: '4px',
              background: globalTheme === 'dark' ? 'var(--color-primary)' : 'var(--color-background-primary)',
              color: globalTheme === 'dark' ? 'white' : 'var(--color-text-primary)',
              cursor: 'pointer'
            }}
          >
            Set Dark
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--color-border-primary)',
              borderRadius: '4px',
              background: globalTheme === 'system' ? 'var(--color-primary)' : 'var(--color-background-primary)',
              color: globalTheme === 'system' ? 'white' : 'var(--color-text-primary)',
              cursor: 'pointer'
            }}
          >
            Set System
          </button>
        </div>
        
        <DynBox p="lg" bg="primary" radius="md">
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-inverse)' }}>Controlled Component Benefits</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-inverse)' }}>
            <li>External state management and persistence</li>
            <li>Integration with global application state</li>
            <li>API synchronization for user preferences</li>
            <li>Advanced validation and business logic</li>
            <li>Multi-component theme coordination</li>
          </ul>
        </DynBox>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test controlled switching via external buttons
    const setLightButton = canvas.getByRole('button', { name: /set light/i });
    const setDarkButton = canvas.getByRole('button', { name: /set dark/i });
    const setSystemButton = canvas.getByRole('button', { name: /set system/i });
    
    await expect(setLightButton).toBeInTheDocument();
    await expect(setDarkButton).toBeInTheDocument();
    await expect(setSystemButton).toBeInTheDocument();
    
    // Test external control
    await userEvent.click(setDarkButton);
    
    // Verify theme switched
    await expect(canvas.getByText(/current theme.*dark/i)).toBeInTheDocument();
    
    // Test theme switcher component
    const themeSwitcher = canvas.getByRole('button', { name: /theme/i }) || 
                         canvas.getByRole('group', { name: /theme/i });
    await userEvent.click(themeSwitcher);
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled theme switcher pattern with external state management. Useful for persistence and integration with global state.'
      }
    }
  }
};

// Size Variants - Different switcher sizes
export const SizeVariants: Story = {
  render: () => {
    const [smallTheme, setSmallTheme] = useState<ThemeMode>('light');
    const [mediumTheme, setMediumTheme] = useState<ThemeMode>('dark');
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Size Variants</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Theme switchers in different sizes for various UI contexts.</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Small Size (sm)</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Perfect for compact UIs, toolbars, or mobile interfaces:</span>
              <ThemeSwitcher
                mode={smallTheme}
                onModeChange={setSmallTheme}
                showSystem={true}
                size="sm"
              />
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Current: {smallTheme}</span>
            </div>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Use in: Navigation bars, mobile interfaces, inline settings</p>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Medium Size (md)</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Standard size for most applications and settings pages:</span>
              <ThemeSwitcher
                mode={mediumTheme}
                onModeChange={setMediumTheme}
                showSystem={true}
                size="md"
              />
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Current: {mediumTheme}</span>
            </div>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Use in: Settings panels, preferences, main application areas</p>
          </div>
        </div>
        
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--color-background-secondary)', borderRadius: '8px', border: '1px solid var(--color-border-primary)' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Usage Guidelines</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Small (sm)</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>Mobile navigation</li>
                <li>Compact toolbars</li>
                <li>Inline controls</li>
                <li>Space-constrained areas</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Medium (md)</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>
                <li>Settings panels</li>
                <li>Preference dialogs</li>
                <li>Main application areas</li>
                <li>Desktop interfaces</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of theme switchers for various UI contexts. Small for compact spaces, medium for standard interfaces.'
      }
    }
  }
};

// In Toolbar - Integration example
export const InToolbar: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeMode>('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const ToolbarDemo = () => (
      <div>
        {/* Header with theme switcher */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          background: 'var(--color-background-primary)',
          borderBottom: '1px solid var(--color-border-primary)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ margin: 0, color: 'var(--color-text-primary)' }}>My App</h2>
            <nav style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--color-link)', textDecoration: 'none' }}>Home</a>
              <a href="#" style={{ color: 'var(--color-link)', textDecoration: 'none' }}>About</a>
              <a href="#" style={{ color: 'var(--color-link)', textDecoration: 'none' }}>Contact</a>
            </nav>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Theme:</span>
            <ThemeSwitcher
              mode={theme}
              onModeChange={setTheme}
              showSystem={true}
              size="sm"
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: '1px solid var(--color-border-primary)',
                borderRadius: '4px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--color-text-primary)'
              }}
            >
              ☰
            </button>
          </div>
        </header>
        
        {/* Settings panel example */}
        <div style={{ padding: '0 1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Settings Panel</h3>
          <div style={{
            background: 'var(--color-background-secondary)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border-primary)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Theme Preference</strong>
                  <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Choose your preferred color scheme</p>
                </div>
                <ThemeSwitcher
                  mode={theme}
                  onModeChange={setTheme}
                  showSystem={true}
                  size="md"
                />
              </div>
              
              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-primary)', margin: '0.5rem 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Notifications</strong>
                  <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Receive email notifications</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Auto-save</strong>
                  <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>Automatically save changes</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        </div>
        
        {/* Content area showing theme effects */}
        <div style={{ padding: '2rem 1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Content Area</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <DynBox p="lg" bg="primary" radius="md">
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-inverse)' }}>Feature Card</h4>
              <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>This card adapts to the selected theme automatically.</p>
            </DynBox>
            
            <DynBox p="lg" bg="secondary" radius="md">
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Another Card</h4>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>All interface elements respect the theme choice.</p>
            </DynBox>
          </div>
        </div>
      </div>
    );
    
    return <ToolbarDemo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test header theme switcher
    const headerThemeSwitchers = canvas.getAllByRole('button', { name: /theme/i }) ||
                                canvas.getAllByRole('group', { name: /theme/i });
    
    await expect(headerThemeSwitchers.length).toBeGreaterThanOrEqual(1);
    
    // Test navigation links
    const homeLink = canvas.getByRole('link', { name: /home/i });
    await expect(homeLink).toBeInTheDocument();
    
    // Test settings interaction
    const settingsThemeSwitcher = headerThemeSwitchers[headerThemeSwitchers.length - 1];
    await userEvent.click(settingsThemeSwitcher);
    
    // Test menu button
    const menuButton = canvas.getByRole('button', { name: /☰/i });
    await userEvent.click(menuButton);
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Real-world integration example showing theme switcher in application toolbar and settings panel. Demonstrates both compact and standard sizes.'
      }
    }
  }
};

// Accessibility Demo - Screen reader and keyboard support
export const AccessibilityDemo: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeMode>('light');
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Accessibility Features</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>This theme switcher includes full keyboard navigation and screen reader support.</p>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <label 
            id="theme-control-label"
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: 'var(--color-text-primary)'
            }}
          >
            Choose Theme Preference
          </label>
          <ThemeSwitcher
            mode={theme}
            onModeChange={setTheme}
            showSystem={true}
            size="md"
            aria-labelledby="theme-control-label"
            aria-describedby="theme-description"
          />
          <div 
            id="theme-description"
            style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.9em', 
              color: 'var(--color-text-secondary)'
            }}
          >
            Use arrow keys to navigate options, Enter or Space to select. Current selection: <strong>{theme}</strong>
          </div>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)',
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Keyboard Navigation</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
            <li><kbd>Tab</kbd> - Focus the theme switcher</li>
            <li><kbd>Arrow Keys</kbd> - Navigate between theme options</li>
            <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Select the focused option</li>
            <li><kbd>Escape</kbd> - Close dropdown (if applicable)</li>
          </ul>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color-border-primary)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Screen Reader Announcements</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
            <li>"Theme switcher, radiogroup" - Component type and role</li>
            <li>"Light theme, radio button, 1 of 3" - Option details</li>
            <li>"Selected" - Current selection state</li>
            <li>"Theme changed to dark mode" - Change announcements</li>
          </ul>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test ARIA labels and descriptions
    const themeSwitcher = canvas.getByRole('group', { name: /theme/i }) ||
                         canvas.getByRole('button', { name: /theme/i });
    
    await expect(themeSwitcher).toBeInTheDocument();
    
    // Test keyboard navigation
    await userEvent.tab(); // Should focus the theme switcher
    await expect(themeSwitcher).toHaveFocus();
    
    // Test arrow key navigation (if radiogroup)
    if (themeSwitcher.getAttribute('role') === 'radiogroup') {
      const options = canvas.getAllByRole('radio');
      await userEvent.keyboard('{ArrowDown}');
      // Should focus next option
    }
    
    // Test Enter/Space selection
    await userEvent.keyboard('{Enter}');
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'radiogroup',
            enabled: true,
          },
          {
            id: 'aria-valid-attr-value',
            enabled: true,
          },
          {
            id: 'keyboard-nav',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: 'Comprehensive accessibility demo with keyboard navigation, screen reader support, and proper ARIA attributes.'
      }
    }
  }
};

// Playground - Interactive testing
export const Playground: Story = {
  args: {
    mode: 'light',
    showSystem: true,
    size: 'md',
    disabled: false
  },
  render: (args) => {
    const [theme, setTheme] = useState<ThemeMode>(args.mode || 'light');
    
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Theme Switcher Playground</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-secondary)' }}>Use the controls panel to experiment with different theme switcher configurations.</p>
        </div>
        
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeSwitcher
            {...args}
            mode={theme}
            onModeChange={(newMode) => {
              setTheme(newMode);
              args.onModeChange?.(newMode);
            }}
          />
          <span style={{ color: 'var(--color-text-secondary)' }}>Current: <strong>{theme}</strong></span>
        </div>
        
        <DynBox p="lg" bg="primary" radius="md">
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-inverse)' }}>Live Theme Preview</h4>
          <p style={{ margin: 0, color: 'var(--color-text-inverse)' }}>This content adapts to show the effects of your theme switcher configuration.</p>
        </DynBox>
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    const themeSwitcher = canvas.getByRole('button', { name: /theme/i }) ||
                         canvas.getByRole('group', { name: /theme/i });
    
    await expect(themeSwitcher).toBeInTheDocument();
    
    if (!args.disabled) {
      await userEvent.click(themeSwitcher);
    }
    
    // Verify current theme display
    const currentThemeText = canvas.getByText(/current:/i);
    await expect(currentThemeText).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing different theme switcher configurations. Modify the controls to see real-time changes.'
      }
    }
  }
};