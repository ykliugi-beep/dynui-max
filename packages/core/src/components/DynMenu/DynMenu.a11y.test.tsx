import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynMenu } from './DynMenu';
import { DynIcon } from '../DynIcon';

const ITEMS = [
  { value: 'view', label: 'View', icon: <DynIcon name="eye" /> },
  { value: 'share', label: 'Share', description: 'Send to team' },
  { value: 'divider', label: 'Divider', divider: true },
  { value: 'delete', label: 'Delete', disabled: true }
];

describe('DynMenu Accessibility', () => {
  it('has no violations when closed', async () => {
    const { container } = render(
      <DynMenu items={ITEMS} trigger="Menu" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when open', async () => {
    const { container } = render(
      <DynMenu items={ITEMS} trigger="Menu" open onOpenChange={vi.fn()} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
