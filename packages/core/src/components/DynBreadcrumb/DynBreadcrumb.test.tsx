import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynBreadcrumb } from './DynBreadcrumb';

describe('DynBreadcrumb', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' }
  ];

  it('renders breadcrumb items correctly', () => {
    render(<DynBreadcrumb items={mockItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders with custom separator', () => {
    render(<DynBreadcrumb items={mockItems} separator=">" />);
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(mockItems.length - 1);
  });

  it('renders correctly with href items', () => {
    render(<DynBreadcrumb items={mockItems} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockItems.length);
  });

  it('renders correctly with onClick items', () => {
    const onClickItems = [
      { label: 'Home', onClick: () => {} },
      { label: 'Current' }
    ];
    render(<DynBreadcrumb items={onClickItems} />);
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('applies aria-label correctly', () => {
    render(<DynBreadcrumb items={mockItems} aria-label="Page navigation" />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Page navigation');
  });
});