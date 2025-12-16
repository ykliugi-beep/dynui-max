import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/DynCard',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <div style={{ padding: '2rem' }}>DynCard - Coming soon</div>,
};
