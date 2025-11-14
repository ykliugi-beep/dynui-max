import { afterEach, beforeAll, describe, expect, fail, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { ThemeSwitcher } from './ThemeSwitcher';

const assertIsHTMLButtonElement: (
  element: Element,
  description: string
) => asserts element is HTMLButtonElement = (element, description) => {
  if (!(element instanceof HTMLButtonElement)) {
    throw new TypeError(`Expected ${description} to be an HTMLButtonElement`);
  }
};

const renderWithTheme = (defaultTheme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <ThemeSwitcher />
    </ThemeProvider>
  );
};

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => {
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn()
      };
    })
  });
});

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

  it('supports toggling via keyboard activation', async () => {
    const user = userEvent.setup();
    renderWithTheme('light');

    const toggleButton = screen.getByRole('button', { name: /switch to dark theme/i });
    toggleButton.focus();

    await user.keyboard('{Space}');

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  it('cycles through system mode when enabled', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher showSystem />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /switch to dark theme/i });
    await user.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    const toSystem = screen.getByRole('button', { name: /switch to system theme/i });
    await user.click(toSystem);

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  it('renders dropdown variant as radiogroup with system option', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher variant="dropdown" showSystem showLabels />
      </ThemeProvider>
    );

    const group = screen.getByRole('radiogroup', { name: /theme mode/i });
    const options = within(group).getAllByRole('radio');
    expect(options).toHaveLength(3);

    const [first, second, third] = options;
    expect(first).toBeInstanceOf(HTMLButtonElement);
    expect(second).toBeInstanceOf(HTMLButtonElement);
    if (!third) {
      fail('Expected dropdown ThemeSwitcher to render three options');
    }

    await user.click(third);

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  it('supports arrow key navigation in dropdown variant', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher variant="dropdown" showSystem showLabels />
      </ThemeProvider>
    );

    const group = screen.getByRole('radiogroup', { name: /theme mode/i });
    const options = within(group).getAllByRole('radio');

    const [first, second, third] = options;
    if (!second || !third) {
      fail('Expected dropdown ThemeSwitcher to render three options');
    }

    first.focus();
    await user.keyboard('{ArrowRight}');

    expect(second).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{ArrowLeft}');

    expect(first).toHaveAttribute('aria-checked', 'true');
  });
});
