import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynAvatar } from './DynAvatar';

const IMAGE_SRC = 'https://example.com/avatar.png';

describe('DynAvatar', () => {
  it('renders initials when no image is provided', () => {
    render(<DynAvatar name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders the provided image when src is available', () => {
    render(<DynAvatar src={IMAGE_SRC} alt="User avatar" />);
    const image = screen.getByRole('img', { name: 'User avatar' });
    expect(image).toHaveAttribute('src', IMAGE_SRC);
  });

  it('falls back to initials when the image fails to load', () => {
    render(<DynAvatar src={IMAGE_SRC} name="Fallback User" />);
    const image = screen.getByRole('img', { name: 'Fallback User' });
    image.dispatchEvent(new Event('error'));
    expect(screen.getByText('FU')).toBeInTheDocument();
  });

  it('applies shape and size modifiers', () => {
    const { container } = render(
      <DynAvatar name="Square" size="lg" shape="square" className="custom" />
    );
    expect(container.firstChild).toHaveClass(
      'dyn-avatar',
      'dyn-avatar--size-lg',
      'dyn-avatar--shape-square',
      'custom'
    );
  });

  it('supports click interactions with keyboard focusability', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<DynAvatar name="Clickable" onClick={handleClick} />);

    const buttonLike = screen.getByRole('button');
    expect(buttonLike).toHaveAttribute('tabindex', '0');

    await user.click(buttonLike);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
