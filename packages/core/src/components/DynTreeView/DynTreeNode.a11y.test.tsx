import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynTreeNode } from './DynTreeNode';

describe('DynTreeNode Accessibility', () => {
  it('has no violations for expandable node', async () => {
    const { container } = render(
      <div role="tree">
        <DynTreeNode title="Parent" nodeKey="parent">
          <div>Child</div>
        </DynTreeNode>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for leaf node', async () => {
    const { container } = render(
      <div role="tree">
        <DynTreeNode title="Leaf" nodeKey="leaf" isLeaf />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
