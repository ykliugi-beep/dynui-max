import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { ThemeSwitcher } from './ThemeSwitcher';
import { axe } from 'vitest-axe';


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

describe('ThemeSwitcher Accessibility', () => {
  it('has no violations in button variant', async () => {
    const { container } = render(<ThemeSwitcher />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations in toggle variant with labels', async () => {
    const { container } = render(
      <ThemeSwitcher variant="toggle" showLabels />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations in dropdown variant with system option', async () => {
    const { container } = render(
      <ThemeSwitcher variant="dropdown" showSystem showLabels />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
