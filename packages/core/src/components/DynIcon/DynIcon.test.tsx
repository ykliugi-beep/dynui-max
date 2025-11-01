import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { DynIcon } from './DynIcon';
import { iconRegistry, defaultIcons } from './iconRegistry';

// Test icon component
const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="test-icon" {...props}>
    <circle cx="10" cy="10" r="5" />
  </svg>
);

describe('DynIcon', () => {
  beforeEach(() => {
    iconRegistry.register('test', TestIcon);
  });

  afterEach(() => {
    iconRegistry.clear();
    iconRegistry.registerMany(defaultIcons);
  });

  it('renders registered icon', () => {
    render(<DynIcon name="test" />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    render(<DynIcon name="test" size="lg" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('dyn-icon--size-lg');
  });

  it('applies color classes correctly', () => {
    render(<DynIcon name="test" color="primary" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('dyn-icon--color-primary');
  });

  it('renders with title for accessibility', () => {
    render(<DynIcon name="test" title="Test icon" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveRole('img');
    expect(icon).toHaveAttribute('aria-label', 'Test icon');
    expect(screen.getByText('Test icon')).toBeInTheDocument();
  });

  it('renders as decorative when no title provided', () => {
    render(<DynIcon name="test" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveRole('img');
  });

  it('warns for unregistered icons', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<DynIcon name="nonexistent" />);
    expect(consoleSpy).toHaveBeenCalledWith('DynIcon: Icon "nonexistent" not found in registry');
    consoleSpy.mockRestore();
  });

  it('returns null for unregistered icons', () => {
    const { container } = render(<DynIcon name="nonexistent" />);
    expect(container.firstChild).toBeNull();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<DynIcon name="test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it('applies custom className', () => {
    render(<DynIcon name="test" className="custom-class" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('custom-class');
  });
});

describe('iconRegistry default icons', () => {
  const expectedIconNames = [
    'arrow-right',
    'check',
    'chevron-down',
    'chevron-right',
    'chevrons-up-down',
    'code',
    'edit',
    'file',
    'folder',
    'image',
    'layout',
    'menu',
    'moon',
    'palette',
    'plus',
    'search',
    'settings',
    'spinner',
    'sun',
    'upload',
    'users',
    'x'
  ];

  afterEach(() => {
    iconRegistry.clear();
    iconRegistry.registerMany(defaultIcons);
  });

  it('registers expected icon names by default', () => {
    expectedIconNames.forEach((iconName) => {
      expect(iconRegistry.has(iconName)).toBe(true);
    });
  });

  it('keeps registry in sync with exported defaults', () => {
    const registeredNames = iconRegistry.getNames();
    expect(registeredNames).toEqual(expect.arrayContaining(Object.keys(defaultIcons)));
  });
});

describe('iconRegistry', () => {
  afterEach(() => {
    iconRegistry.clear();
    iconRegistry.registerMany(defaultIcons);
  });

  it('registers and retrieves icons', () => {
    iconRegistry.register('registry-test', TestIcon);
    expect(iconRegistry.get('registry-test')).toBe(TestIcon);
  });

  it('checks if icon exists', () => {
    iconRegistry.register('exists-test', TestIcon);
    expect(iconRegistry.has('exists-test')).toBe(true);
    expect(iconRegistry.has('does-not-exist')).toBe(false);
  });

  it('gets all registered names', () => {
    iconRegistry.clear();
    iconRegistry.register('icon1', TestIcon);
    iconRegistry.register('icon2', TestIcon);
    const names = iconRegistry.getNames();
    expect(names).toContain('icon1');
    expect(names).toContain('icon2');
  });

  it('unregisters icons', () => {
    iconRegistry.register('unregister-test', TestIcon);
    expect(iconRegistry.has('unregister-test')).toBe(true);
    expect(iconRegistry.unregister('unregister-test')).toBe(true);
    expect(iconRegistry.has('unregister-test')).toBe(false);
  });
});
