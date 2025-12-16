import type { Meta, StoryObj } from '@storybook/react';
import { DynRadio } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Form/DynRadio',
  component: DynRadio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Radio option',
    name: 'radio-group',
  },
};

export const Group: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <DynRadio
          label="Option 1"
          name="demo-group"
          value="option1"
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
        />
        <DynRadio
          label="Option 2"
          name="demo-group"
          value="option2"
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
        />
        <DynRadio
          label="Option 3"
          name="demo-group"
          value="option3"
          checked={selected === 'option3'}
          onChange={() => setSelected('option3')}
        />
      </div>
    );
  },
};
