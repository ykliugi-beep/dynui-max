import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynBox } from './DynBox';

describe('DynBox', () => {
  it('renders with spacing and layout classes', () => {
    const { container } = render(
      <DynBox p="lg" m="md" display="flex" justify="center" align="stretch">
        Content
      </DynBox>
    );

    expect(container.firstChild).toHaveClass(
      'dyn-box',
      'dyn-box--display-flex',
      'dyn-box--p-lg',
      'dyn-box--m-md',
      'dyn-box--justify-center',
      'dyn-box--align-stretch'
    );
  });

  it('applies inline styles for width and height', () => {
    const { container } = render(
      <DynBox width={200} height="50%">Sized</DynBox>
    );

    expect(container.firstChild).toHaveStyle({ width: '200px', height: '50%' });
  });

  it('supports interactive mode with click handling', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <DynBox interactive onClick={handleClick}>
        Clickable
      </DynBox>
    );

    const buttonLike = screen.getByRole('button');
    await user.click(buttonLike);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
