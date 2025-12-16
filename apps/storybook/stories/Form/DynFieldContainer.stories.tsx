import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Form/DynFieldContainer',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <div style={{ padding: '2rem' }}>DynFieldContainer - Coming soon</div>,
};
