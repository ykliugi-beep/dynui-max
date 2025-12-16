import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Form/DynButton',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <div style={{ padding: '2rem' }}>DynButton - Coming soon</div>,
};
