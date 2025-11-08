import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynTabs } from './DynTabs';
import type { TabItem } from './DynTabs';
import { axe } from '../../test/setup';


const sampleTabs: TabItem[] = [
  { value: 'overview', label: 'Overview', panel: <div>Overview content</div> },
  { value: 'settings', label: 'Settings', panel: <div>Settings content</div> },
  { value: 'users', label: 'Users', panel: <div>Users content</div>, disabled: true },
  { value: 'analytics', label: 'Analytics', panel: <div>Analytics content</div> },
];

describe('DynTabs - Enhanced Tests', () => {
  describe('Keyboard Navigation', () => {
    it('navigates tabs with Left/Right arrow keys', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="overview"
          onChange={handleChange}
        />
      );
      
      // Focus first tab
      const overviewTab = screen.getByRole('tab', { name: 'Overview' });
      overviewTab.focus();
      
      // Right arrow should move to next tab
      await user.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Settings' }));
      
      // Right arrow should skip disabled tab and go to Analytics
      await user.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Analytics' }));
      
      // Left arrow should go back to Settings
      await user.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Settings' }));
      
      // Left arrow should go back to Overview
      await user.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Overview' }));
    });
    
    it('navigates to first/last tab with Home/End keys', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="settings"
          onChange={handleChange}
        />
      );
      
      // Focus settings tab (middle)
      const settingsTab = screen.getByRole('tab', { name: 'Settings' });
      settingsTab.focus();
      
      // Home should go to first tab
      await user.keyboard('{Home}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Overview' }));
      
      // End should go to last non-disabled tab  
      await user.keyboard('{End}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Analytics' }));
    });
    
    it('activates tab with Enter and Space keys', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="overview"
          onChange={handleChange}
        />
      );
      
      // Navigate to Settings tab
      const settingsTab = screen.getByRole('tab', { name: 'Settings' });
      settingsTab.focus();
      
      // Enter should activate tab
      await user.keyboard('{Enter}');
      expect(handleChange).toHaveBeenCalledWith('settings');
      
      // Space should also activate tab
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalledWith('settings');
      
      expect(handleChange).toHaveBeenCalledTimes(2);
    });
    
    it('wraps navigation at boundaries', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="overview"
          onChange={handleChange}
        />
      );
      
      // Start at first tab
      const overviewTab = screen.getByRole('tab', { name: 'Overview' });
      overviewTab.focus();
      
      // Left arrow from first should wrap to last
      await user.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Analytics' }));
      
      // Right arrow from last should wrap to first
      await user.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Overview' }));
    });
  });

  describe('Tab Panel Focus Management', () => {
    it('moves focus to tab panel on Tab key', async () => {
      const user = userEvent.setup();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="overview" 
        />
      );
      
      // Focus tab
      const overviewTab = screen.getByRole('tab', { name: 'Overview' });
      overviewTab.focus();
      
      // Tab key should move focus to panel
      await user.tab();
      
      const tabPanel = screen.getByRole('tabpanel');
      expect(document.activeElement).toBe(tabPanel);
    });
    
    it('returns focus to tab when Shift+Tab from panel', async () => {
      const user = userEvent.setup();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="settings"
        />
      );
      
      // Focus tab panel first
      const tabPanel = screen.getByRole('tabpanel');
      tabPanel.focus();
      
      // Shift+Tab should return to active tab
      await user.tab({ shift: true });
      
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Settings' }));
    });
  });

  describe('Orientation Variants', () => {
    it('handles keyboard navigation in vertical orientation', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="overview"
          onChange={handleChange}
          orientation="vertical"
        />
      );
      
      const overviewTab = screen.getByRole('tab', { name: 'Overview' });
      overviewTab.focus();
      
      // In vertical mode, Up/Down arrows should navigate
      await user.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Settings' }));
      
      await user.keyboard('{ArrowUp}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Overview' }));
      
      // Left/Right should still work as fallback
      await user.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Settings' }));
    });
  });

  describe('Disabled Tab Handling', () => {
    it('skips disabled tabs during keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="settings"
          onChange={handleChange}
        />
      );
      
      // Focus Settings tab
      const settingsTab = screen.getByRole('tab', { name: 'Settings' });
      settingsTab.focus();
      
      // Right arrow should skip disabled Users tab and go to Analytics
      await user.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Analytics' }));
      
      // Disabled tab should not be focusable
      const usersTab = screen.getByRole('tab', { name: 'Users' });
      expect(usersTab).toHaveAttribute('aria-disabled', 'true');
      expect(usersTab).toHaveAttribute('tabindex', '-1');
    });
    
    it('cannot activate disabled tabs', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <DynTabs
          items={sampleTabs}
          value="overview"
          onChange={handleChange}
        />
      );
      
      // Try to click disabled tab
      await user.click(screen.getByRole('tab', { name: 'Users' }));
      
      // Should not change active tab
      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('ARIA Relationships', () => {
    it('maintains proper tablist/tab/tabpanel relationships', () => {
      render(
        <DynTabs
          items={sampleTabs}
          value="settings"
        />
      );
      
      // Check tablist
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
      
      // Check tabs
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(sampleTabs.length);
      
      // Check active tab
      const activeTab = screen.getByRole('tab', { name: 'Settings' });
      expect(activeTab).toHaveAttribute('aria-selected', 'true');
      
      // Check tabpanel
      const tabpanel = screen.getByRole('tabpanel');
      expect(tabpanel).toBeInTheDocument();
      expect(tabpanel).toHaveAttribute('aria-labelledby', activeTab.id);
    });
  });

  describe('Accessibility Compliance', () => {
    it('has no accessibility violations in horizontal mode', async () => {
      const { container } = render(
        <DynTabs
          items={sampleTabs}
          value="overview"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('has no accessibility violations in vertical mode', async () => {
      const { container } = render(
        <DynTabs
          items={sampleTabs}
          value="settings"
          orientation="vertical"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('handles complex tab content without violations', async () => {
      const complexTabs: TabItem[] = [
        {
          value: 'form',
          label: 'Form Tab',
          panel: (
            <div>
              <h3>Form Section</h3>
              <input type="text" placeholder="Name" aria-label="Full name" />
              <button type="button">Submit</button>
            </div>
          )
        },
        {
          value: 'list',
          label: 'List Tab',
          panel: (
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          )
        },
      ];
      
      const { container } = render(
        <DynTabs
          items={complexTabs}
          value="form"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
