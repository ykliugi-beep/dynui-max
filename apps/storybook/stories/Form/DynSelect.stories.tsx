import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Form/DynSelect',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <div style={{ padding: '2rem' }}>DynSelect - Coming soon</div>,
};
