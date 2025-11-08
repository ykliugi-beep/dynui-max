import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynTabs, DynTab, DynTabPanel } from './DynTabs';

interface TabItem {
  key: string;
  value: string;
  label: string;
}

describe('DynTabs - Enhanced Tests', () => {
  const tabs: TabItem[] = [
    { key: 'tab1', value: 'tab1', label: 'Tab 1' },
    { key: 'tab2', value: 'tab2', label: 'Tab 2' },
    { key: 'tab3', value: 'tab3', label: 'Tab 3' }
  ];

  it('renders tabs with TabItem array', () => {
    render(
      <DynTabs defaultValue="tab1">
        {tabs.map(tab => (
          <DynTab key={tab.key} item={tab} />
        ))}
        {tabs.map(tab => (
          <DynTabPanel key={tab.key} item={tab}>
            Content for {tab.label}
          </DynTabPanel>
        ))}
      </DynTabs>
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });
});
