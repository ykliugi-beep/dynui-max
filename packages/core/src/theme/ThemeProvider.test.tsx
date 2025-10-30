import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '../test/test-utils';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeProvider';

// Test component that uses theme
const ThemeConsumer = () => {
  const { theme, themeName, setTheme, toggleTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-name">{themeName}</div>
      <div data-testid="theme-object">{theme ? 'theme-loaded' : 'no-theme'}</div>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('provides default light theme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
    expect(screen.getByTestId('theme-object')).toHaveTextContent('theme-loaded');
  });

  it('accepts custom default theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
  });

  it('allows theme switching', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
    
    await user.click(screen.getByTestId('set-dark'));
    
    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
  });

  it('toggles between light and dark themes', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
    
    await user.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
    
    await user.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
  });

  it('throws error when useTheme is used outside provider', () => {
    const TestComponent = () => {
      useTheme();
      return null;
    };
    
    // Suppress console error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
    
    consoleSpy.mockRestore();
  });

  it('applies theme class to document element', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>content</div>
      </ThemeProvider>
    );
    
    expect(document.documentElement).toHaveClass('theme-dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});