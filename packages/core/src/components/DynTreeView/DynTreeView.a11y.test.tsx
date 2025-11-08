import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynTreeView } from './DynTreeView';


const TREE = [
  {
    key: 'root',
    title: 'Root',
    children: [{ key: 'child', title: 'Child node' }]
  }
];

describe('DynTreeView Accessibility', () => {
  it('has no violations with collapsed nodes', async () => {
    const { container } = render(
      <DynTreeView treeData={TREE} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with expanded nodes and lines', async () => {
    const { container } = render(
      <DynTreeView treeData={TREE} defaultExpandedKeys={['root']} showLine />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
