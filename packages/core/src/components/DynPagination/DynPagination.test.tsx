import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { DynPagination } from './DynPagination';

describe('DynPagination', () => {
  it('renders pagination buttons with ellipsis when needed', () => {
    render(
      <DynPagination totalPages={10} currentPage={5} onPageChange={() => {}} />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /go to page/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText('…')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 5' })).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange when a page button is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <DynPagination totalPages={5} currentPage={2} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables controls when disabled prop is true', () => {
    const onPageChange = vi.fn();
    render(
      <DynPagination totalPages={5} currentPage={1} onPageChange={onPageChange} disabled />
    );

    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    expect(nextButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
