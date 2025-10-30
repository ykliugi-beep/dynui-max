import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynFieldContainer } from './DynFieldContainer';

// Mock input component
const MockInput = ({ id, ...props }: any) => <input id={id} data-testid="mock-input" {...props} />;

describe('DynFieldContainer', () => {
  it('renders with label', () => {
    render(
      <DynFieldContainer label="Email" htmlFor="email">
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    render(
      <DynFieldContainer label="Email" htmlFor="email" required>
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    expect(screen.getByLabelText('required')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        description="Enter your email address"
      >
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('renders hint text', () => {
    render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        hint="We will never share your email"
      >
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    expect(screen.getByText('We will never share your email')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        error="Email is required"
      >
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    const errorMessage = screen.getByText('Email is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  it('hides hint when error is present', () => {
    render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        hint="Hint text"
        error="Error message"
      >
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    const { container } = render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        error="Error message"
      >
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    expect(container.firstChild).toHaveClass('dyn-field-container--error');
  });

  it('applies horizontal orientation class', () => {
    const { container } = render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        orientation="horizontal"
      >
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    expect(container.firstChild).toHaveClass('dyn-field-container--horizontal');
  });

  it('sets proper ARIA attributes on child components', () => {
    render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        description="Enter email"
        hint="Hint text"
        error="Error message"
      >
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-description email-error');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <DynFieldContainer label="Email" htmlFor="email" ref={ref}>
        <MockInput id="email" />
      </DynFieldContainer>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});