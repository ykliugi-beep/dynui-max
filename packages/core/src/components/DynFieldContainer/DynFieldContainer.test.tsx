import React from 'react';
import { render, screen } from '@testing-library/react';
import { DynFieldContainer } from './DynFieldContainer';
import { DynInput } from '../DynInput';

describe('DynFieldContainer', () => {
  it('renders with label', () => {
    render(
      <DynFieldContainer label="Email">
        <DynInput />
      </DynFieldContainer>
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(
      <DynFieldContainer label="Email" required>
        <DynInput />
      </DynFieldContainer>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <DynFieldContainer label="Email" error="Invalid email">
        <DynInput />
      </DynFieldContainer>
    );

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <DynFieldContainer label="Email" helperText="Enter your email address">
        <DynInput />
      </DynFieldContainer>
    );

    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('generates unique IDs for label and message', () => {
    const { container } = render(
      <DynFieldContainer label="Email" helperText="Helper text">
        <DynInput />
      </DynFieldContainer>
    );

    const label = container.querySelector('label');
    const helperText = container.querySelector('[class*="helper-text"]');

    expect(label).toHaveAttribute('for');
    expect(helperText).toHaveAttribute('id');
  });

  it('disables all child inputs when disabled', () => {
    render(
      <DynFieldContainer label="Email" disabled>
        <DynInput data-testid="input" />
      </DynFieldContainer>
    );

    expect(screen.getByTestId('input')).toBeDisabled();
  });

  it('applies error state to child inputs', () => {
    render(
      <DynFieldContainer label="Email" error="Invalid">
        <DynInput data-testid="input" />
      </DynFieldContainer>
    );

    expect(screen.getByTestId('input')).toHaveAttribute('aria-invalid', 'true');
  });

  it('links label to input with proper association', () => {
    const { container } = render(
      <DynFieldContainer label="Email">
        <DynInput />
      </DynFieldContainer>
    );

    const label = container.querySelector('label');
    const input = container.querySelector('input');
    const labelFor = label?.getAttribute('for');
    const inputId = input?.getAttribute('id');

    expect(labelFor).toBe(inputId);
    expect(labelFor).toBeTruthy();
  });

  it('supports custom ID override', () => {
    render(
      <DynFieldContainer label="Email" id="custom-field">
        <DynInput />
      </DynFieldContainer>
    );

    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'custom-field');
  });

  it('renders inline layout', () => {
    const { container } = render(
      <DynFieldContainer label="Email" layout="inline">
        <DynInput />
      </DynFieldContainer>
    );

    expect(container.querySelector('[class*="inline"]')).toBeInTheDocument();
  });

  it('supports labelPlacement prop', () => {
    const { container } = render(
      <DynFieldContainer label="Email" labelPlacement="top">
        <DynInput />
      </DynFieldContainer>
    );

    expect(container.querySelector('[class*="label-top"]')).toBeInTheDocument();
  });

  it('clones children with proper props', () => {
    const { container } = render(
      <DynFieldContainer label="Test" error="Error" disabled>
        <DynInput data-testid="input" />
      </DynFieldContainer>
    );

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeDisabled();
  });

  it('passes through className to children', () => {
    const customChild = React.createElement('div', { className: 'custom-class' }, 'Child');
    
    const { container } = render(
      <DynFieldContainer label="Test">
        {customChild}
      </DynFieldContainer>
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
