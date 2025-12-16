import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Data/DynBadge',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <div style={{ padding: '2rem' }}>DynBadge - Coming soon</div>,
};
