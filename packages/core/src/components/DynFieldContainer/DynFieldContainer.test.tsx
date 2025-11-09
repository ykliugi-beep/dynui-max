import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DynFieldContainer } from './DynFieldContainer';
import { DynInput } from '../DynInput';

describe('DynFieldContainer', () => {
  it('renders label and children', () => {
    render(
      <DynFieldContainer label="Email">
        <DynInput placeholder="Enter email" />
      </DynFieldContainer>
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('displays required indicator when required is true', () => {
    render(
      <DynFieldContainer label="Username" required>
        <DynInput />
      </DynFieldContainer>
    );
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('displays description text', () => {
    render(
      <DynFieldContainer label="Password" description="Must be at least 8 characters">
        <DynInput type="password" />
      </DynFieldContainer>
    );
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('displays hint text when provided', () => {
    render(
      <DynFieldContainer label="Name" hint="Enter your full name">
        <DynInput />
      </DynFieldContainer>
    );
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  it('displays hint text but not error initially', () => {
    render(
      <DynFieldContainer label="Email" hint="We'll never share your email">
        <DynInput />
      </DynFieldContainer>
    );
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it('displays error message when error is provided', () => {
    render(
      <DynFieldContainer label="Email" error="Invalid email format">
        <DynInput />
      </DynFieldContainer>
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email format');
  });

  it('hides hint when error is shown', () => {
    render(
      <DynFieldContainer label="Email" hint="Enter a valid email" error="Invalid email">
        <DynInput />
      </DynFieldContainer>
    );
    expect(screen.queryByText('Enter a valid email')).not.toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies error class when error is present', () => {
    const { container } = render(
      <DynFieldContainer label="Field" error="Error message">
        <DynInput />
      </DynFieldContainer>
    );
    expect(container.firstChild).toHaveClass('dyn-field-container--error');
  });

  it('connects label to input with htmlFor', () => {
    render(
      <DynFieldContainer label="Username" htmlFor="username-input">
        <DynInput id="username-input" />
      </DynFieldContainer>
    );
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username-input');
  });

  it('supports vertical orientation (default)', () => {
    const { container } = render(
      <DynFieldContainer label="Field">
        <DynInput />
      </DynFieldContainer>
    );
    expect(container.firstChild).toHaveClass('dyn-field-container--vertical');
  });

  it('supports horizontal orientation', () => {
    const { container } = render(
      <DynFieldContainer label="Field" orientation="horizontal">
        <DynInput />
      </DynFieldContainer>
    );
    expect(container.firstChild).toHaveClass('dyn-field-container--horizontal');
  });

  it('adds aria-describedby to children when description, hint, or error present', () => {
    render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        description="Your email address"
        hint="We won't spam"
        error="Required field"
      >
        <DynInput id="email" />
      </DynFieldContainer>
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid');
  });

  it('renders with custom className', () => {
    const { container } = render(
      <DynFieldContainer label="Field" className="custom-class">
        <DynInput />
      </DynFieldContainer>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});