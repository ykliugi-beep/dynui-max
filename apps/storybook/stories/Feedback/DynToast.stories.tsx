import type { Meta, StoryObj } from '@storybook/react';
import { DynToast, DynButton } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Feedback/DynToast',
  component: DynToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <>
        <DynButton onClick={() => setShow(true)}>Show Success Toast</DynButton>
        {show && (
          <DynToast
            message="Operation completed successfully!"
            variant="success"
            onClose={() => setShow(false)}
          />
        )}
      </>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <>
        <DynButton onClick={() => setShow(true)}>Show Error Toast</DynButton>
        {show && (
          <DynToast
            message="An error occurred!"
            variant="error"
            onClose={() => setShow(false)}
          />
        )}
      </>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <>
        <DynButton onClick={() => setShow(true)}>Show Warning Toast</DynButton>
        {show && (
          <DynToast
            message="Warning: Please review your changes."
            variant="warning"
            onClose={() => setShow(false)}
          />
        )}
      </>
    );
  },
};

export const Info: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <>
        <DynButton onClick={() => setShow(true)}>Show Info Toast</DynButton>
        {show && (
          <DynToast
            message="Here's some useful information."
            variant="info"
            onClose={() => setShow(false)}
          />
        )}
      </>
    );
  },
};
