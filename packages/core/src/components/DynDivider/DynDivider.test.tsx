import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { DynDivider } from './DynDivider';

describe('DynDivider', () => {
  it('renders horizontal divider', () => {
    const { container } = render(
      <DynDivider orientation="horizontal" />
    );
    expect(container.firstChild).toHaveClass('dyn-divider--horizontal');
  });

  it('renders label in center', () => {
    const { container } = render(
      <DynDivider label="Title" labelPosition="center" />
    );
    expect(container.firstChild).toHaveClass('dyn-divider--label-center');
    expect(container.textContent).toContain('Title');
  });

  it('renders label on left', () => {
    const { container } = render(
      <DynDivider label="Label Left" labelPosition="left" />
    );
    expect(container.firstChild).toHaveClass('dyn-divider--label-left');
    expect(container.textContent).toContain('Label Left');
  });

  it('renders label on right', () => {
    const { container } = render(
      <DynDivider label="Label Right" labelPosition="right" />
    );
    expect(container.firstChild).toHaveClass('dyn-divider--label-right');
    expect(container.textContent).toContain('Label Right');
  });
});
