import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynFieldContainer } from './DynFieldContainer';

const MockInput = ({ id, ...props }: any) => <input id={id} {...props} />;

describe('DynFieldContainer Accessibility', () => {
  it('has no accessibility violations with basic setup', async () => {
    const { container } = render(
      <DynFieldContainer label="Email" htmlFor="email">
        <MockInput id="email" type="email" />
      </DynFieldContainer>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with error state', async () => {
    const { container } = render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        error="Email is required"
        required
      >
        <MockInput id="email" type="email" />
      </DynFieldContainer>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with description and hint', async () => {
    const { container } = render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        description="Enter your email address"
        hint="We will never share your email"
      >
        <MockInput id="email" type="email" />
      </DynFieldContainer>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in horizontal layout', async () => {
    const { container } = render(
      <DynFieldContainer 
        label="Email" 
        htmlFor="email" 
        orientation="horizontal"
        required
      >
        <MockInput id="email" type="email" />
      </DynFieldContainer>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
