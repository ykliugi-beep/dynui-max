import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynTabs, TabItem } from './DynTabs';

describe('DynTabs Enhanced', () => {
  const mockTabs: TabItem[] = [
    {
      value: 'tab1',
      label: 'Tab 1',
      panel: <div>Content 1</div>
    },
    {
      value: 'tab2',
      label: 'Tab 2',
      panel: <div>Content 2</div>
    },
    {
      value: 'tab3',
      label: 'Tab 3',
      panel: <div>Content 3</div>
    }
  ];

  it('renders tabs with panels using items prop', () => {
    render(<DynTabs items={mockTabs} defaultValue="tab1" />);
    
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(<DynTabs items={mockTabs} defaultValue="tab1" />);
    
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    await user.click(tab2);
    
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.queryByText('Content 1')).not.toBeVisible();
  });

  it('calls onChange when tab changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<DynTabs items={mockTabs} defaultValue="tab1" onChange={handleChange} />);
    
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    await user.click(tab2);
    
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<DynTabs items={mockTabs} defaultValue="tab1" />);
    
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();
    
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
  });

  it('supports vertical orientation', () => {
    const { container } = render(
      <DynTabs items={mockTabs} defaultValue="tab1" orientation="vertical" />
    );
    
    expect(container.querySelector('.dyn-tabs--vertical')).toBeInTheDocument();
  });

  it('disables specified tabs', () => {
    const disabledTabs: TabItem[] = [
      ...mockTabs.slice(0, 2),
      { ...mockTabs[2], disabled: true }
    ];
    
    render(<DynTabs items={disabledTabs} defaultValue="tab1" />);
    
    const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
    expect(tab3).toBeDisabled();
  });
});