import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynCard } from './DynCard';

describe('DynCard Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynCard title="Accessibility" subtitle="Testing">
        <p>Accessible content</p>
      </DynCard>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
