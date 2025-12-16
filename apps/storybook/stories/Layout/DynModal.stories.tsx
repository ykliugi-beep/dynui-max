import type { Meta, StoryObj } from '@storybook/react';
import { DynModal, DynButton } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Layout/DynModal',
  component: DynModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <DynButton onClick={() => setOpen(true)}>Open Modal</DynButton>
        <DynModal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal Title"
        >
          <div style={{ padding: '1rem' }}>
            <p>This is the modal content.</p>
            <DynButton onClick={() => setOpen(false)}>Close</DynButton>
          </div>
        </DynModal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <DynButton onClick={() => setOpen(true)}>Open Modal</DynButton>
        <DynModal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <DynButton variant="ghost" onClick={() => setOpen(false)}>Cancel</DynButton>
              <DynButton onClick={() => setOpen(false)}>Confirm</DynButton>
            </div>
          }
        >
          <p>Are you sure you want to proceed?</p>
        </DynModal>
      </>
    );
  },
};
