import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynTreeView } from './DynTreeView';

const TREE = [
  {
    key: 'parent',
    title: 'Parent',
    children: [
      { key: 'child-1', title: 'Child 1' },
      { key: 'child-2', title: 'Child 2', disabled: true }
    ]
  }
];

describe('DynTreeView', () => {
  it('expands nodes and handles selection', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DynTreeView treeData={TREE} onSelect={handleSelect} />
    );

    await user.click(screen.getByRole('button', { name: 'Expand' }));
    expect(screen.getByText('Child 1')).toBeInTheDocument();

    await user.click(screen.getByRole('treeitem', { name: 'Child 1' }));

    const selectedChild = TREE[0]?.children?.[0];
    expect(selectedChild).toBeDefined();
    expect(handleSelect).toHaveBeenCalledWith(['child-1'], [selectedChild]);
  });

  it('supports multiple selection and collapses nodes', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DynTreeView treeData={TREE} selectionMode="multiple" onSelect={handleSelect} defaultExpandedKeys={["parent"]} />
    );

    const child1 = screen.getByRole('treeitem', { name: 'Child 1' });
    await user.click(child1);
    await user.click(child1);

    expect(handleSelect).toHaveBeenCalledWith([], []);

    await user.click(screen.getByRole('button', { name: 'Collapse' }));
    expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
  });
});
