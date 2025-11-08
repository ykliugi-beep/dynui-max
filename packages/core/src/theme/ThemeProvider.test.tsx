import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';

const TestComponent = () => {
  const { themeName } = useTheme();
  return <div>Current theme: {themeName}</div>;
};

describe('ThemeProvider', () => {
  it('provides theme context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/Current theme:/)).toBeInTheDocument();
  });

  it('throws error when useTheme is used outside provider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
  });
});
