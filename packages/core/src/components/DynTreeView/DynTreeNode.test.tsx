import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynTreeNode } from './DynTreeNode';

const Child = () => <div data-testid="child">Child</div>;

describe('DynTreeNode', () => {
  it('toggles expansion and renders children', async () => {
    const user = userEvent.setup();
    const handleExpand = vi.fn();

    render(
      <DynTreeNode title="Parent" nodeKey="parent" onExpand={handleExpand}>
        <Child />
      </DynTreeNode>
    );

    await user.click(screen.getByRole('button', { name: 'Expand' }));
    expect(handleExpand).toHaveBeenCalledWith('parent', true);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('handles selection with keyboard interactions', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DynTreeNode title="Leaf" nodeKey="leaf" onSelect={handleSelect} isLeaf />
    );

    const treeItem = screen.getByRole('treeitem', { name: 'Leaf' });
    treeItem.focus();
    await user.keyboard('{Enter}');

    expect(handleSelect).toHaveBeenCalledWith('leaf');
  });
});
