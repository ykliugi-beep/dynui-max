import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynTextArea } from './DynTextArea';

describe('DynTextArea', () => {
  it('renders with variant styling and handles input changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DynTextArea
        variant="filled"
        size="lg"
        placeholder="Enter text"
        onChange={handleChange}
      />
    );

    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toHaveClass('dyn-textarea--variant-filled');

    await user.type(textarea, 'Hello');
    expect(handleChange).toHaveBeenLastCalledWith('Hello');
  });

  it('supports auto-resize and character count display', async () => {
    const user = userEvent.setup();

    render(
      <DynTextArea
        defaultValue="Hi"
        autoResize
        showCount
        maxLength={10}
        aria-label="Auto textarea"
      />
    );

    const textarea = screen.getByLabelText('Auto textarea');
    expect(textarea).toHaveStyle({ resize: 'none' });

    await user.type(textarea, ' there');

    expect(screen.getByText('7/10')).toBeInTheDocument();
  });
});
