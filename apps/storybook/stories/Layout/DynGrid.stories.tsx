import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynGrid } from '@dynui-max/core';

const meta = {
  title: 'Layout/DynGrid',
  component: DynGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '1rem', background: '#e0f2fe', borderRadius: '4px', textAlign: 'center' }}>
    {children}
  </div>
);

export const TwoColumns: Story = {
  render: () => (
    <DynGrid columns={2} gap="1rem">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
    </DynGrid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <DynGrid columns={3} gap="1rem">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 5</GridItem>
      <GridItem>Item 6</GridItem>
    </DynGrid>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <DynGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="1rem">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
      <GridItem>7</GridItem>
      <GridItem>8</GridItem>
    </DynGrid>
  ),
};
