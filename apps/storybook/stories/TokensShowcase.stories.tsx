import type { Meta, StoryObj } from '@storybook/react';
import { DynBox, ThemeProvider, DynBadge } from '@dynui-max/core';

const meta = {
  title: 'Design Tokens/Showcase',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Design Tokens showcase demonstrating the complete token system used throughout DynUI-Max.

This page shows how all 500+ design tokens work together to create a consistent, themeable design system.
        `
      }
    }
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color tokens showcase
export const ColorTokens: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div style={{ fontFamily: 'var(--dyn-typography-fontFamily-sans)' }}>
        <h2>Color Tokens</h2>
        
        <h3>Text Colors</h3>
        <DynBox display="flex" gap="md" mb="lg">
          <DynBox p="md" bg="primary" radius="md">
            <div style={{ color: 'var(--dyn-color-text-primary)' }}>Primary Text</div>
            <div style={{ color: 'var(--dyn-color-text-secondary)' }}>Secondary Text</div>
            <div style={{ color: 'var(--dyn-color-text-muted)' }}>Muted Text</div>
          </DynBox>
        </DynBox>
        
        <h3>Background Colors</h3>
        <DynBox display="flex" gap="md" mb="lg">
          <DynBox p="md" bg="primary" radius="md">Primary BG</DynBox>
          <DynBox p="md" bg="secondary" radius="md">Secondary BG</DynBox>
          <DynBox p="md" bg="muted" radius="md">Muted BG</DynBox>
          <DynBox p="md" bg="inverse" color="inverse" radius="md">Inverse BG</DynBox>
        </DynBox>
        
        <h3>Interactive Colors</h3>
        <DynBox display="flex" gap="sm" mb="lg">
          <DynBadge color="primary">Primary</DynBadge>
          <DynBadge color="success">Success</DynBadge>
          <DynBadge color="warning">Warning</DynBadge>
          <DynBadge color="danger">Danger</DynBadge>
          <DynBadge color="neutral">Neutral</DynBadge>
        </DynBox>
      </div>
    </ThemeProvider>
  ),
};

// Spacing tokens showcase
export const SpacingTokens: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div style={{ fontFamily: 'var(--dyn-typography-fontFamily-sans)' }}>
        <h2>Spacing Tokens</h2>
        
        <h3>Padding Scale</h3>
        <DynBox display="flex" direction="column" gap="sm" mb="lg">
          <DynBox p="sm" bg="secondary" radius="md">Small (sm)</DynBox>
          <DynBox p="md" bg="secondary" radius="md">Medium (md)</DynBox>
          <DynBox p="lg" bg="secondary" radius="md">Large (lg)</DynBox>
        </DynBox>
        
        <h3>Margin Scale</h3>
        <DynBox bg="muted" p="md" radius="md">
          <DynBox m="sm" p="sm" bg="primary" radius="md">Small margin</DynBox>
          <DynBox m="md" p="sm" bg="primary" radius="md">Medium margin</DynBox>
          <DynBox m="lg" p="sm" bg="primary" radius="md">Large margin</DynBox>
        </DynBox>
        
        <h3>Gap Scale (Flexbox)</h3>
        <DynBox display="flex" gap="lg" mt="lg">
          <DynBox display="flex" direction="column" gap="sm" p="md" bg="secondary" radius="md">
            <div>Small gap</div>
            <div>Between items</div>
          </DynBox>
          <DynBox display="flex" direction="column" gap="md" p="md" bg="secondary" radius="md">
            <div>Medium gap</div>
            <div>Between items</div>
          </DynBox>
          <DynBox display="flex" direction="column" gap="lg" p="md" bg="secondary" radius="md">
            <div>Large gap</div>
            <div>Between items</div>
          </DynBox>
        </DynBox>
      </div>
    </ThemeProvider>
  ),
};

// Typography tokens showcase
export const TypographyTokens: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div style={{ fontFamily: 'var(--dyn-typography-fontFamily-sans)' }}>
        <h2>Typography Tokens</h2>
        
        <h3>Font Sizes</h3>
        <DynBox display="flex" direction="column" gap="sm" mb="lg">
          <div style={{ fontSize: 'var(--dyn-typography-fontSize-xs)' }}>Extra Small (xs)</div>
          <div style={{ fontSize: 'var(--dyn-typography-fontSize-sm)' }}>Small (sm)</div>
          <div style={{ fontSize: 'var(--dyn-typography-fontSize-md)' }}>Medium (md)</div>
          <div style={{ fontSize: 'var(--dyn-typography-fontSize-lg)' }}>Large (lg)</div>
          <div style={{ fontSize: 'var(--dyn-typography-fontSize-xl)' }}>Extra Large (xl)</div>
        </DynBox>
        
        <h3>Font Weights</h3>
        <DynBox display="flex" direction="column" gap="sm" mb="lg">
          <div style={{ fontWeight: 'var(--dyn-typography-fontWeight-normal)' }}>Normal Weight (400)</div>
          <div style={{ fontWeight: 'var(--dyn-typography-fontWeight-medium)' }}>Medium Weight (500)</div>
          <div style={{ fontWeight: 'var(--dyn-typography-fontWeight-semibold)' }}>Semibold Weight (600)</div>
          <div style={{ fontWeight: 'var(--dyn-typography-fontWeight-bold)' }}>Bold Weight (700)</div>
        </DynBox>
        
        <h3>Line Heights</h3>
        <DynBox display="flex" direction="column" gap="md">
          <DynBox p="md" bg="secondary" radius="md">
            <div style={{ lineHeight: 'var(--dyn-typography-lineHeight-tight)' }}>
              Tight line height (1.25) - Good for headings and compact text where vertical space is important.
            </div>
          </DynBox>
          <DynBox p="md" bg="secondary" radius="md">
            <div style={{ lineHeight: 'var(--dyn-typography-lineHeight-normal)' }}>
              Normal line height (1.5) - The default for most text content, providing good readability balance.
            </div>
          </DynBox>
          <DynBox p="md" bg="secondary" radius="md">
            <div style={{ lineHeight: 'var(--dyn-typography-lineHeight-relaxed)' }}>
              Relaxed line height (1.75) - For longer text passages that need extra breathing room for improved readability.
            </div>
          </DynBox>
        </DynBox>
      </div>
    </ThemeProvider>
  ),
};

// Border radius and shadow tokens
export const BorderAndShadowTokens: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div style={{ fontFamily: 'var(--dyn-typography-fontFamily-sans)' }}>
        <h2>Border Radius & Shadow Tokens</h2>
        
        <h3>Border Radius Scale</h3>
        <DynBox display="flex" gap="md" mb="lg">
          <DynBox p="md" bg="secondary" radius="none">None (0)</DynBox>
          <DynBox p="md" bg="secondary" radius="sm">Small</DynBox>
          <DynBox p="md" bg="secondary" radius="md">Medium</DynBox>
          <DynBox p="md" bg="secondary" radius="lg">Large</DynBox>
          <DynBox p="md" bg="secondary" radius="full">Full</DynBox>
        </DynBox>
        
        <h3>Shadow Scale</h3>
        <DynBox display="flex" gap="md" mb="lg">
          <DynBox p="md" bg="primary" shadow="none">No Shadow</DynBox>
          <DynBox p="md" bg="primary" shadow="sm">Small Shadow</DynBox>
          <DynBox p="md" bg="primary" shadow="md">Medium Shadow</DynBox>
          <DynBox p="md" bg="primary" shadow="lg">Large Shadow</DynBox>
        </DynBox>
        
        <h3>Combined Effects</h3>
        <DynBox display="flex" gap="md">
          <DynBox p="lg" bg="primary" radius="lg" shadow="lg">
            Card with large radius + shadow
          </DynBox>
          <DynBox p="lg" bg="secondary" radius="sm" border>
            Card with small radius + border
          </DynBox>
        </DynBox>
      </div>
    </ThemeProvider>
  ),
};

// Theme comparison
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <h3>Light Theme</h3>
        <ThemeProvider defaultTheme="light">
          <DynBox p="lg" bg="primary" radius="md" border>
            <h4>Component Example</h4>
            <DynBox display="flex" direction="column" gap="md">
              <DynBox p="sm" bg="secondary" radius="sm">Secondary background</DynBox>
              <DynBox p="sm" bg="muted" radius="sm">Muted background</DynBox>
              <DynBadge color="success">Success badge</DynBadge>
            </DynBox>
          </DynBox>
        </ThemeProvider>
      </div>
      
      <div style={{ flex: 1 }}>
        <h3>Dark Theme</h3>
        <ThemeProvider defaultTheme="dark">
          <DynBox p="lg" bg="primary" radius="md" border>
            <h4>Component Example</h4>
            <DynBox display="flex" direction="column" gap="md">
              <DynBox p="sm" bg="secondary" radius="sm">Secondary background</DynBox>
              <DynBox p="sm" bg="muted" radius="sm">Muted background</DynBox>
              <DynBadge color="success">Success badge</DynBadge>
            </DynBox>
          </DynBox>
        </ThemeProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark themes showing how design tokens automatically adapt.'
      }
    }
  }
};