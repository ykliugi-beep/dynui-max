import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Data/DynTable',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <div style={{ padding: '2rem' }}>DynTable - Coming soon</div>,
};
