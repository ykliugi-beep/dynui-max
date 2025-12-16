import type { Meta, StoryObj } from '@storybook/react';
import { DynTabs } from '@dynui-max/core';
import { useState } from 'react';

const meta = {
  title: 'Navigation/DynTabs',
  component: DynTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');
    return (
      <div style={{ width: '500px' }}>
        <DynTabs
          tabs={[
            { id: 'tab1', label: 'Tab 1', content: <div style={{ padding: '1rem' }}>Content 1</div> },
            { id: 'tab2', label: 'Tab 2', content: <div style={{ padding: '1rem' }}>Content 2</div> },
            { id: 'tab3', label: 'Tab 3', content: <div style={{ padding: '1rem' }}>Content 3</div> },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
    );
  },
};
