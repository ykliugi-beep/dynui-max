import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynModal } from './DynModal';
import { DynButton } from '../DynButton';

describe('DynModal - Enhanced Tests', () => {
  const _originalActiveElement = document.activeElement;

  it('traps focus within modal', async () => {
    const user = userEvent.setup();

    render(
      <DynModal open onClose={() => {}} title="Test Modal">
        <DynButton>Button 1</DynButton>
        <DynButton>Button 2</DynButton>
      </DynModal>
    );

    const buttons = screen.getAllByRole('button');
    const lastButton = buttons[buttons.length - 1];

    lastButton.focus();
    await user.keyboard('{Tab}');

    expect(document.activeElement).not.toBe(lastButton);
  });
});
