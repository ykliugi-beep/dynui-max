import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { ThemeSwitcher } from './ThemeSwitcher';

const renderWithTheme = (defaultTheme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <ThemeSwitcher />
    </ThemeProvider>
  );
};

afterEach(() => {
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});

describe('ThemeSwitcher', () => {
  it('toggles from light to dark theme', async () => {
    const user = userEvent.setup();
    renderWithTheme('light');

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    const toggleButton = screen.getByRole('button', { name: /switch to dark theme/i });
    await user.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    expect(
      screen.getByRole('button', { name: /switch to light theme/i })
    ).toBeInTheDocument();
  });

  it('toggles from dark to light theme', async () => {
    const user = userEvent.setup();
    renderWithTheme('dark');

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    const toggleButton = screen.getByRole('button', { name: /switch to light theme/i });
    await user.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    expect(
      screen.getByRole('button', { name: /switch to dark theme/i })
    ).toBeInTheDocument();
  });
});
