import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynMenu from '@dynui-max/core/components/Navigation/DynMenu.vue';
import DynButton from '@dynui-max/core/components/Form/DynButton.vue';

const meta = {
  title: 'Navigation/DynMenu',
  component: DynMenu,
  parameters: {
    docs: {
      description: {
        component: 'Menu komponenta za navigation sa podrškom za nested strukture, keyboard navigation i accessibility.'
      }
    }
  },
  argTypes: {
    items: { control: 'object' },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover', 'contextmenu']
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left', 'right']
    },
    closeOnSelect: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta<typeof DynMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Menu
export const Default: Story = {
  render: () => ({
    components: { DynMenu, DynButton },
    template: `
      <div style="padding: 2rem;">
        <DynMenu :items="basicMenuItems" @select="handleSelect">
          <template #trigger>
            <DynButton>Menu Options</DynButton>
          </template>
        </DynMenu>
        
        <div v-if="selectedItem" style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px;">
          <strong>Selected:</strong> {{ selectedItem.label }}
        </div>
      </div>
    `,
    data() {
      return {
        selectedItem: null,
        basicMenuItems: [
          { id: 'new', label: 'New File', icon: 'plus' },
          { id: 'open', label: 'Open', icon: 'folder-open' },
          { id: 'save', label: 'Save', icon: 'save', disabled: false },
          { type: 'divider' },
          { id: 'export', label: 'Export', icon: 'download' },
          { id: 'print', label: 'Print', icon: 'printer' }
        ]
      };
    },
    methods: {
      handleSelect(item) {
        this.selectedItem = item;
        console.log('Menu item selected:', item);
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByRole('button', { name: /menu options/i });
    
    // Open menu
    await userEvent.click(menuTrigger);
    
    // Menu should be visible
    const menu = canvas.getByRole('menu');
    await expect(menu).toBeVisible();
    
    // Select an item
    const newFileItem = canvas.getByRole('menuitem', { name: /new file/i });
    await userEvent.click(newFileItem);
    
    // Selection should be reflected
    await expect(canvas.getByText('Selected: New File')).toBeVisible();
  }
};

// Nested Menu
export const NestedMenu: Story = {
  render: () => ({
    components: { DynMenu, DynButton },
    template: `
      <div style="padding: 2rem;">
        <DynMenu :items="nestedMenuItems" @select="handleSelect">
          <template #trigger>
            <DynButton>File Menu</DynButton>
          </template>
        </DynMenu>
        
        <div v-if="selectedAction" style="margin-top: 1rem; padding: 1rem; background: #ecfdf5; border: 1px solid #bbf7d0; border-radius: 4px;">
          <strong>Action:</strong> {{ selectedAction }}
        </div>
      </div>
    `,
    data() {
      return {
        selectedAction: '',
        nestedMenuItems: [
          { id: 'new', label: 'New', icon: 'plus', children: [
            { id: 'new-document', label: 'Document', icon: 'file-text' },
            { id: 'new-spreadsheet', label: 'Spreadsheet', icon: 'table' },
            { id: 'new-presentation', label: 'Presentation', icon: 'presentation' }
          ]},
          { id: 'recent', label: 'Recent Files', icon: 'clock', children: [
            { id: 'recent-1', label: 'Project Plan.docx', icon: 'file-text' },
            { id: 'recent-2', label: 'Budget 2024.xlsx', icon: 'table' },
            { id: 'recent-3', label: 'Presentation.pptx', icon: 'presentation' }
          ]},
          { type: 'divider' },
          { id: 'import', label: 'Import', icon: 'upload', children: [
            { id: 'import-csv', label: 'From CSV', icon: 'file-csv' },
            { id: 'import-json', label: 'From JSON', icon: 'file-json' },
            { id: 'import-xml', label: 'From XML', icon: 'file-xml' }
          ]},
          { type: 'divider' },
          { id: 'settings', label: 'Settings', icon: 'settings' },
          { id: 'help', label: 'Help', icon: 'help-circle' }
        ]
      };
    },
    methods: {
      handleSelect(item) {
        this.selectedAction = `${item.label} (${item.id})`;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByRole('button', { name: /file menu/i });
    
    // Open menu
    await userEvent.click(menuTrigger);
    
    // Hover over "New" to open submenu
    const newItem = canvas.getByRole('menuitem', { name: /^new$/i });
    await userEvent.hover(newItem);
    
    // Submenu should appear
    const documentItem = canvas.getByRole('menuitem', { name: /document/i });
    await expect(documentItem).toBeVisible();
    
    // Select document from submenu
    await userEvent.click(documentItem);
    
    // Action should be recorded
    await expect(canvas.getByText('Action: Document (new-document)')).toBeVisible();
  }
};

// Context Menu
export const ContextMenu: Story = {
  render: () => ({
    components: { DynMenu },
    template: `
      <div style="padding: 2rem;">
        <div 
          @contextmenu.prevent="showContextMenu"
          style="width: 300px; height: 200px; border: 2px dashed #d1d5db; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6b7280; cursor: context-menu;"
        >
          Right-click me for context menu
        </div>
        
        <DynMenu 
          :items="contextMenuItems" 
          :is-open="contextMenuOpen"
          :position="contextMenuPosition"
          trigger="manual"
          @close="contextMenuOpen = false"
          @select="handleContextSelect"
        />
        
        <div v-if="contextAction" style="margin-top: 1rem; padding: 1rem; background: #fef3c7; border: 1px solid #fde68a; border-radius: 4px;">
          <strong>Context Action:</strong> {{ contextAction }}
        </div>
      </div>
    `,
    data() {
      return {
        contextMenuOpen: false,
        contextMenuPosition: { x: 0, y: 0 },
        contextAction: '',
        contextMenuItems: [
          { id: 'copy', label: 'Copy', icon: 'copy', shortcut: 'Ctrl+C' },
          { id: 'paste', label: 'Paste', icon: 'clipboard', shortcut: 'Ctrl+V', disabled: true },
          { type: 'divider' },
          { id: 'select-all', label: 'Select All', icon: 'select-all', shortcut: 'Ctrl+A' },
          { type: 'divider' },
          { id: 'inspect', label: 'Inspect Element', icon: 'code' }
        ]
      };
    },
    methods: {
      showContextMenu(event) {
        this.contextMenuPosition = { x: event.clientX, y: event.clientY };
        this.contextMenuOpen = true;
      },
      handleContextSelect(item) {
        this.contextAction = `${item.label} (${item.shortcut || 'No shortcut'})`;
        this.contextMenuOpen = false;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const contextArea = canvas.getByText('Right-click me for context menu');
    
    // Right-click to open context menu
    await userEvent.pointer({ keys: '[MouseRight]', target: contextArea });
    
    // Context menu should appear
    const menu = canvas.getByRole('menu');
    await expect(menu).toBeVisible();
    
    // Select copy option
    const copyItem = canvas.getByRole('menuitem', { name: /copy/i });
    await userEvent.click(copyItem);
    
    // Action should be recorded
    await expect(canvas.getByText('Context Action: Copy (Ctrl+C)')).toBeVisible();
  }
};

// Keyboard Navigation Demo
export const KeyboardNavigation: Story = {
  render: () => ({
    components: { DynMenu, DynButton },
    template: `
      <div style="padding: 2rem;">
        <h3>Keyboard Navigation Demo</h3>
        <p style="color: #6b7280; margin-bottom: 1rem;">Use Tab, Arrow keys, Enter, and ESC to navigate</p>
        
        <DynMenu :items="keyboardMenuItems" @select="handleKeyboardSelect">
          <template #trigger>
            <DynButton>Keyboard Menu</DynButton>
          </template>
        </DynMenu>
        
        <div class="instructions" style="margin-top: 1rem; padding: 1rem; background: #f9fafb; border-radius: 4px; font-size: 0.875rem;">
          <strong>Keyboard Instructions:</strong>
          <ul style="margin: 0.5rem 0 0 1rem;">
            <li><kbd>Space/Enter</kbd> - Open menu or select item</li>
            <li><kbd>↓/↑</kbd> - Navigate menu items</li>
            <li><kbd>→</kbd> - Open submenu</li>
            <li><kbd>←</kbd> - Close submenu</li>
            <li><kbd>ESC</kbd> - Close menu</li>
            <li><kbd>Tab</kbd> - Close menu and move to next element</li>
          </ul>
        </div>
        
        <div v-if="keyboardSelection" style="margin-top: 1rem; padding: 1rem; background: #ecfdf5; border: 1px solid #bbf7d0; border-radius: 4px;">
          <strong>Selected via keyboard:</strong> {{ keyboardSelection }}
        </div>
      </div>
    `,
    data() {
      return {
        keyboardSelection: '',
        keyboardMenuItems: [
          { id: 'edit', label: 'Edit', icon: 'edit', children: [
            { id: 'undo', label: 'Undo', icon: 'undo', shortcut: 'Ctrl+Z' },
            { id: 'redo', label: 'Redo', icon: 'redo', shortcut: 'Ctrl+Y' },
            { type: 'divider' },
            { id: 'cut', label: 'Cut', icon: 'scissors', shortcut: 'Ctrl+X' },
            { id: 'copy', label: 'Copy', icon: 'copy', shortcut: 'Ctrl+C' },
            { id: 'paste', label: 'Paste', icon: 'clipboard', shortcut: 'Ctrl+V' }
          ]},
          { id: 'view', label: 'View', icon: 'eye', children: [
            { id: 'zoom-in', label: 'Zoom In', icon: 'zoom-in', shortcut: 'Ctrl++' },
            { id: 'zoom-out', label: 'Zoom Out', icon: 'zoom-out', shortcut: 'Ctrl+-' },
            { id: 'reset-zoom', label: 'Reset Zoom', icon: 'refresh', shortcut: 'Ctrl+0' },
            { type: 'divider' },
            { id: 'fullscreen', label: 'Full Screen', icon: 'maximize', shortcut: 'F11' }
          ]},
          { type: 'divider' },
          { id: 'tools', label: 'Tools', icon: 'tool', children: [
            { id: 'developer', label: 'Developer Tools', icon: 'code', shortcut: 'F12' },
            { id: 'console', label: 'Console', icon: 'terminal', shortcut: 'Ctrl+Shift+J' },
            { id: 'inspector', label: 'Inspector', icon: 'search', shortcut: 'Ctrl+Shift+I' }
          ]},
          { id: 'help', label: 'Help', icon: 'help-circle', shortcut: 'F1' }
        ]
      };
    },
    methods: {
      handleKeyboardSelect(item) {
        this.keyboardSelection = `${item.label} (${item.shortcut || 'No shortcut'})`;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByRole('button', { name: /keyboard menu/i });
    
    // Open menu with keyboard
    menuTrigger.focus();
    await userEvent.keyboard(' '); // Space to open
    
    // Menu should be open
    const menu = canvas.getByRole('menu');
    await expect(menu).toBeVisible();
    
    // Navigate with arrow keys
    await userEvent.keyboard('{ArrowDown}'); // Navigate to first item
    await userEvent.keyboard('{ArrowDown}'); // Navigate to second item
    
    // Open submenu with right arrow
    await userEvent.keyboard('{ArrowRight}');
    
    // Should open View submenu
    const zoomInItem = canvas.getByRole('menuitem', { name: /zoom in/i });
    await expect(zoomInItem).toBeVisible();
    
    // Select with Enter
    await userEvent.keyboard('{Enter}');
    
    // Should close menu and show selection
    await expect(menu).not.toBeVisible();
    await expect(canvas.getByText('Selected via keyboard: Zoom In (Ctrl++)')).toBeVisible();
  }
};

// Mobile Responsive Menu
export const MobileMenu: Story = {
  render: () => ({
    components: { DynMenu, DynButton },
    template: `
      <div style="padding: 1rem;">
        <h3>Mobile Navigation Menu</h3>
        
        <DynMenu 
          :items="mobileMenuItems" 
          :mobile-breakpoint="768"
          :mobile-full-width="true"
          @select="handleMobileSelect"
        >
          <template #trigger>
            <DynButton style="display: flex; align-items: center; gap: 0.5rem;">
              ☰ Navigation
            </DynButton>
          </template>
        </DynMenu>
        
        <div class="mobile-content" style="margin-top: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 4px;">
          <h4>Current Page: {{ currentPage }}</h4>
          <p style="color: #6b7280;">This demonstrates how the menu adapts to mobile viewports.</p>
        </div>
      </div>
    `,
    data() {
      return {
        currentPage: 'Home',
        mobileMenuItems: [
          { id: 'home', label: 'Home', icon: 'home', active: true },
          { id: 'products', label: 'Products', icon: 'grid', children: [
            { id: 'electronics', label: 'Electronics', icon: 'smartphone' },
            { id: 'clothing', label: 'Clothing', icon: 'shirt' },
            { id: 'books', label: 'Books', icon: 'book' }
          ]},
          { id: 'services', label: 'Services', icon: 'briefcase' },
          { id: 'about', label: 'About Us', icon: 'info' },
          { id: 'contact', label: 'Contact', icon: 'mail' },
          { type: 'divider' },
          { id: 'account', label: 'My Account', icon: 'user', children: [
            { id: 'profile', label: 'Profile', icon: 'user-circle' },
            { id: 'orders', label: 'Orders', icon: 'package' },
            { id: 'settings', label: 'Settings', icon: 'settings' },
            { type: 'divider' },
            { id: 'logout', label: 'Logout', icon: 'log-out', variant: 'danger' }
          ]}
        ]
      };
    },
    methods: {
      handleMobileSelect(item) {
        this.currentPage = item.label;
        // Update active state
        this.mobileMenuItems.forEach(menuItem => {
          if (menuItem.children) {
            menuItem.children.forEach(child => child.active = child.id === item.id);
          } else {
            menuItem.active = menuItem.id === item.id;
          }
        });
      }
    }
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { DynMenu, DynButton },
    template: `
      <div style="padding: 2rem;">
        <h3>Accessibility-focused Menu</h3>
        
        <DynMenu 
          :items="a11yMenuItems" 
          @select="handleA11ySelect"
          aria-label="Main navigation menu"
        >
          <template #trigger>
            <DynButton aria-haspopup="menu" aria-expanded="false">
              Accessible Menu
            </DynButton>
          </template>
        </DynMenu>
        
        <div class="a11y-info" style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px;">
          <h4 style="margin: 0 0 0.5rem 0;">Accessibility Features:</h4>
          <ul style="margin: 0; padding-left: 1.5rem;">
            <li>ARIA menu roles and states</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader announcements</li>
            <li>Focus management</li>
            <li>Proper labeling and descriptions</li>
          </ul>
        </div>
        
        <div v-if="a11ySelection" style="margin-top: 1rem; padding: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px;">
          <strong>Accessible selection:</strong> {{ a11ySelection }}
        </div>
      </div>
    `,
    data() {
      return {
        a11ySelection: '',
        a11yMenuItems: [
          { 
            id: 'file', 
            label: 'File', 
            icon: 'file',
            'aria-describedby': 'file-help',
            children: [
              { id: 'new', label: 'New Document', icon: 'plus', 'aria-describedby': 'new-help' },
              { id: 'open', label: 'Open Document', icon: 'folder-open' },
              { id: 'save', label: 'Save Document', icon: 'save', shortcut: 'Ctrl+S' }
            ]
          },
          { 
            id: 'edit', 
            label: 'Edit', 
            icon: 'edit',
            children: [
              { id: 'undo', label: 'Undo', icon: 'undo', shortcut: 'Ctrl+Z' },
              { id: 'redo', label: 'Redo', icon: 'redo', shortcut: 'Ctrl+Y' }
            ]
          },
          { id: 'view', label: 'View', icon: 'eye' },
          { type: 'divider', role: 'separator' },
          { id: 'help', label: 'Help & Support', icon: 'help-circle', 'aria-describedby': 'help-description' }
        ]
      };
    },
    methods: {
      handleA11ySelect(item) {
        this.a11ySelection = item.label;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByRole('button', { name: /accessible menu/i });
    
    // Test ARIA attributes
    await expect(menuButton).toHaveAttribute('aria-haspopup', 'menu');
    
    // Open menu
    await userEvent.click(menuButton);
    
    // Menu should have proper ARIA role
    const menu = canvas.getByRole('menu');
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute('aria-label', 'Main navigation menu');
    
    // Test keyboard navigation
    await userEvent.keyboard('{ArrowDown}'); // First item
    await userEvent.keyboard('{Enter}'); // Select
    
    // Should close menu
    await expect(menu).not.toBeVisible();
  }
};