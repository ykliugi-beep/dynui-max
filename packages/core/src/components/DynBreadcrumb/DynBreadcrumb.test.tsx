import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynBreadcrumb } from './DynBreadcrumb';
import { DynBreadcrumbItem } from './DynBreadcrumbItem';

describe('DynBreadcrumb', () => {
  it('renders with basic items', () => {
    render(
      <DynBreadcrumb>
        <DynBreadcrumbItem href="/">Home</DynBreadcrumbItem>
        <DynBreadcrumbItem href="/products">Products</DynBreadcrumbItem>
        <DynBreadcrumbItem>Current</DynBreadcrumbItem>
      </DynBreadcrumb>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('applies custom separator', () => {
    const { container } = render(
      <DynBreadcrumb separator=">">
        <DynBreadcrumbItem href="/">Home</DynBreadcrumbItem>
        <DynBreadcrumbItem>Current</DynBreadcrumbItem>
      </DynBreadcrumb>
    );

    expect(container.textContent).toContain('>');
  });

  it('handles clickable breadcrumb items', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <DynBreadcrumb>
        <DynBreadcrumbItem onClick={handleClick}>Clickable</DynBreadcrumbItem>
      </DynBreadcrumb>
    );

    await user.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('marks current page correctly', () => {
    render(
      <DynBreadcrumb>
        <DynBreadcrumbItem href="/">Home</DynBreadcrumbItem>
        <DynBreadcrumbItem current>Current</DynBreadcrumbItem>
      </DynBreadcrumb>
    );

    const currentItem = screen.getByText('Current');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders custom separator element', () => {
    const CustomSeparator = () => <span data-testid="custom-sep">→</span>;
    
    render(
      <DynBreadcrumb separator={<CustomSeparator />}>
        <DynBreadcrumbItem href="/">Home</DynBreadcrumbItem>
        <DynBreadcrumbItem>Current</DynBreadcrumbItem>
      </DynBreadcrumb>
    );

    expect(screen.getByTestId('custom-sep')).toBeInTheDocument();
  });
});
