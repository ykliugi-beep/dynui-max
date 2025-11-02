import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynBreadcrumb } from './DynBreadcrumb';

const baseItems = [
  { label: 'Home', href: '/' },
  { label: 'Library', onClick: vi.fn() },
  { label: 'Data' }
];

describe('DynBreadcrumb', () => {
  it('renders navigation with provided items', () => {
    render(<DynBreadcrumb items={baseItems} />);

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByRole('button', { name: 'Library' })).toBeInTheDocument();
    expect(screen.getByText('Data')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onClick handlers for button items', async () => {
    const user = userEvent.setup();
    const onLibraryClick = vi.fn();
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Library', onClick: onLibraryClick },
      { label: 'Data' }
    ];

    render(<DynBreadcrumb items={items} />);

    await user.click(screen.getByRole('button', { name: 'Library' }));
    expect(onLibraryClick).toHaveBeenCalledTimes(1);
  });

  it('collapses items when maxItems is provided', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Catalog', href: '/catalog' },
      { label: 'Category', href: '/category' },
      { label: 'Item', href: '/item' }
    ];

    render(<DynBreadcrumb items={items} maxItems={3} />);

    expect(screen.getByText('...')).toHaveClass('dyn-breadcrumb__overflow');
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders custom separators', () => {
    render(
      <DynBreadcrumb
        items={baseItems}
        separator={<span data-testid="separator">/</span>}
      />
    );

    expect(screen.getAllByTestId('separator')).toHaveLength(2);
  });
});
