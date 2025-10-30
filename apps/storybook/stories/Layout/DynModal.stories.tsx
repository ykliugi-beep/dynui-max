import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynModal from '@dynui-max/core/components/Layout/DynModal.vue';
import DynButton from '@dynui-max/core/components/Form/DynButton.vue';

const meta = {
  title: 'Layout/DynModal',
  component: DynModal,
  parameters: {
    docs: {
      description: {
        component: 'Modal komponenta za prikaz overlay sadržaja sa podrškom za focus management, accessibility i keyboard navigation.'
      }
    }
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full']
    },
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom']
    },
    closable: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    focusTrap: { control: 'boolean' },
    restoreFocus: { control: 'boolean' }
  }
} satisfies Meta<typeof DynModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Modal
export const Default: Story = {
  render: () => ({
    components: { DynModal, DynButton },
    template: `
      <div>
        <DynButton @click="isOpen = true" id="trigger-button">
          Open Modal
        </DynButton>
        
        <DynModal 
          :is-open="isOpen" 
          @close="isOpen = false"
          :focus-trap="true"
          :restore-focus="true"
        >
          <template #header>
            <h2 style="margin: 0;">Basic Modal</h2>
          </template>
          
          <template #default>
            <p>This is a basic modal with standard functionality.</p>
            <p>You can close it by clicking the X button, pressing ESC, or clicking outside.</p>
          </template>
          
          <template #footer>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <DynButton variant="secondary" @click="isOpen = false">Cancel</DynButton>
              <DynButton variant="primary" @click="isOpen = false">OK</DynButton>
            </div>
          </template>
        </DynModal>
      </div>
    `,
    data() {
      return { isOpen: false };
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByText('Open Modal');
    
    // Open modal
    await userEvent.click(triggerButton);
    
    // Modal should be visible
    const modal = canvas.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Test escape key closing
    await userEvent.keyboard('{Escape}');
    
    // Modal should be closed
    await expect(modal).not.toBeVisible();
  }
};

// Confirmation Dialog
export const ConfirmationDialog: Story = {
  render: () => ({
    components: { DynModal, DynButton },
    template: `
      <div>
        <DynButton @click="showConfirm = true" variant="error">
          Delete Account
        </DynButton>
        
        <DynModal 
          :is-open="showConfirm" 
          @close="showConfirm = false"
          size="sm"
          :close-on-backdrop="false"
        >
          <template #header>
            <h3 style="margin: 0; color: #dc2626;">Confirm Deletion</h3>
          </template>
          
          <template #default>
            <div style="display: flex; align-items: start; gap: 1rem;">
              <div style="color: #dc2626; font-size: 1.5rem;">⚠️</div>
              <div>
                <p style="margin: 0 0 1rem 0; font-weight: 500;">Are you sure you want to delete your account?</p>
                <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">This action cannot be undone. All your data will be permanently deleted.</p>
              </div>
            </div>
          </template>
          
          <template #footer>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <DynButton variant="secondary" @click="showConfirm = false">Cancel</DynButton>
              <DynButton variant="error" @click="handleDelete">Delete Account</DynButton>
            </div>
          </template>
        </DynModal>
        
        <div v-if="deleted" style="margin-top: 1rem; padding: 1rem; background: #fee2e2; border: 1px solid #fecaca; border-radius: 4px; color: #991b1b;">
          Account deletion confirmed!
        </div>
      </div>
    `,
    data() {
      return {
        showConfirm: false,
        deleted: false
      };
    },
    methods: {
      handleDelete() {
        this.deleted = true;
        this.showConfirm = false;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const deleteButton = canvas.getByText('Delete Account');
    
    // Open confirmation dialog
    await userEvent.click(deleteButton);
    
    // Should not close on backdrop click (closeOnBackdrop: false)
    const modal = canvas.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Click cancel
    const cancelButton = canvas.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);
    
    // Modal should be closed
    await expect(modal).not.toBeVisible();
  }
};

// Form Modal
export const FormModal: Story = {
  render: () => ({
    components: { DynModal, DynButton },
    template: `
      <div>
        <DynButton @click="showForm = true">
          Add New Item
        </DynButton>
        
        <DynModal 
          :is-open="showForm" 
          @close="handleClose"
          size="md"
        >
          <template #header>
            <h3 style="margin: 0;">Add New Item</h3>
          </template>
          
          <template #default>
            <form @submit.prevent="handleSubmit" class="modal-form">
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                  <label style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Item Name *</label>
                  <input 
                    v-model="formData.name"
                    type="text" 
                    required
                    style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;"
                    placeholder="Enter item name"
                  />
                  <div v-if="errors.name" style="color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;">{{ errors.name }}</div>
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Description</label>
                  <textarea 
                    v-model="formData.description"
                    style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; min-height: 100px;"
                    placeholder="Enter description (optional)"
                  ></textarea>
                </div>
                
                <div>
                  <label style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Category *</label>
                  <select 
                    v-model="formData.category"
                    required
                    style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;"
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="home">Home & Garden</option>
                  </select>
                  <div v-if="errors.category" style="color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;">{{ errors.category }}</div>
                </div>
              </div>
            </form>
          </template>
          
          <template #footer>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <DynButton variant="secondary" @click="handleClose">Cancel</DynButton>
              <DynButton variant="primary" @click="handleSubmit" :disabled="!isFormValid">Save Item</DynButton>
            </div>
          </template>
        </DynModal>
        
        <div v-if="savedItems.length > 0" style="margin-top: 1rem;">
          <h4>Saved Items:</h4>
          <ul>
            <li v-for="item in savedItems" :key="item.id" style="margin-bottom: 0.5rem;">
              <strong>{{ item.name }}</strong> ({{ item.category }})
              <div v-if="item.description" style="color: #6b7280; font-size: 0.875rem;">{{ item.description }}</div>
            </li>
          </ul>
        </div>
      </div>
    `,
    data() {
      return {
        showForm: false,
        formData: {
          name: '',
          description: '',
          category: ''
        },
        errors: {
          name: '',
          category: ''
        },
        savedItems: []
      };
    },
    computed: {
      isFormValid() {
        return this.formData.name.trim() && this.formData.category;
      }
    },
    methods: {
      handleSubmit() {
        // Reset errors
        this.errors.name = '';
        this.errors.category = '';
        
        // Validate
        if (!this.formData.name.trim()) {
          this.errors.name = 'Item name is required';
          return;
        }
        if (!this.formData.category) {
          this.errors.category = 'Category is required';
          return;
        }
        
        // Save item
        const newItem = {
          id: Date.now(),
          ...this.formData
        };
        this.savedItems.push(newItem);
        
        // Reset and close
        this.formData = { name: '', description: '', category: '' };
        this.showForm = false;
      },
      handleClose() {
        // Reset form data when closing
        this.formData = { name: '', description: '', category: '' };
        this.errors = { name: '', category: '' };
        this.showForm = false;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('Add New Item');
    
    // Open form modal
    await userEvent.click(addButton);
    
    const modal = canvas.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Try to submit empty form
    const saveButton = canvas.getByRole('button', { name: /save item/i });
    await expect(saveButton).toBeDisabled();
    
    // Fill form
    const nameInput = canvas.getByPlaceholderText('Enter item name');
    await userEvent.type(nameInput, 'Test Item');
    
    const categorySelect = canvas.getByDisplayValue('Select category');
    await userEvent.selectOptions(categorySelect, 'electronics');
    
    // Now save button should be enabled
    await expect(saveButton).toBeEnabled();
    
    // Submit form
    await userEvent.click(saveButton);
    
    // Modal should close and item should be saved
    await expect(modal).not.toBeVisible();
    await expect(canvas.getByText('Test Item')).toBeVisible();
  }
};

// Size Variations
export const SizeVariations: Story = {
  render: () => ({
    components: { DynModal, DynButton },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <DynButton 
          v-for="size in sizes" 
          :key="size"
          @click="openModal(size)"
        >
          {{ size.toUpperCase() }} Modal
        </DynButton>
        
        <DynModal 
          :is-open="currentModal !== null" 
          @close="currentModal = null"
          :size="currentModal"
        >
          <template #header>
            <h3 style="margin: 0;">{{ currentModal?.toUpperCase() }} Modal</h3>
          </template>
          
          <template #default>
            <p>This is a {{ currentModal }} sized modal.</p>
            <p>Modal content adapts to the specified size while maintaining proper proportions.</p>
            <div style="padding: 1rem; background: #f9fafb; border-radius: 4px; margin: 1rem 0;">
              <strong>Size: {{ currentModal }}</strong><br>
              Resize your browser window to see how the modal responds.
            </div>
          </template>
          
          <template #footer>
            <DynButton @click="currentModal = null">Close</DynButton>
          </template>
        </DynModal>
      </div>
    `,
    data() {
      return {
        sizes: ['sm', 'md', 'lg', 'xl', 'full'],
        currentModal: null
      };
    },
    methods: {
      openModal(size) {
        this.currentModal = size;
      }
    }
  })
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { DynModal, DynButton },
    template: `
      <div>
        <DynButton @click="isOpen = true" id="a11y-trigger">
          Open Accessible Modal
        </DynButton>
        
        <DynModal 
          :is-open="isOpen" 
          @close="isOpen = false"
          :focus-trap="true"
          :restore-focus="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          role="dialog"
        >
          <template #header>
            <h2 id="modal-title" style="margin: 0;">Accessible Modal</h2>
          </template>
          
          <template #default>
            <p id="modal-description">
              Ovaj modal implementira sve accessibility best practices:
            </p>
            
            <ul style="margin: 1rem 0; padding-left: 1.5rem;">
              <li>Focus trap - Tab navigation stays within modal</li>
              <li>Focus restoration - Returns focus to trigger button</li>
              <li>ARIA labels and descriptions</li>
              <li>Proper heading hierarchy</li>
              <li>Keyboard navigation support</li>
            </ul>
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0;">
              <input type="text" placeholder="First focusable input" style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;" />
              <input type="text" placeholder="Second focusable input" style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;" />
            </div>
          </template>
          
          <template #footer>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <DynButton variant="secondary" @click="isOpen = false">Cancel</DynButton>
              <DynButton variant="primary" @click="handleSave">Save Changes</DynButton>
            </div>
          </template>
        </DynModal>
        
        <div v-if="saved" style="margin-top: 1rem; padding: 1rem; background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 4px; color: #166534;">
          ✅ Changes saved successfully!
        </div>
      </div>
    `,
    data() {
      return {
        isOpen: false,
        saved: false
      };
    },
    methods: {
      handleSave() {
        this.saved = true;
        this.isOpen = false;
        setTimeout(() => {
          this.saved = false;
        }, 3000);
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByText('Open Accessible Modal');
    
    // Open modal
    await userEvent.click(triggerButton);
    
    const modal = canvas.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Test ARIA attributes
    await expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    await expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
    
    // Test focus trap - first input should be focused
    const firstInput = canvas.getByPlaceholderText('First focusable input');
    await expect(firstInput).toHaveFocus();
    
    // Test tab navigation within modal
    await userEvent.tab();
    const secondInput = canvas.getByPlaceholderText('Second focusable input');
    await expect(secondInput).toHaveFocus();
    
    // Test save functionality
    const saveButton = canvas.getByRole('button', { name: /save changes/i });
    await userEvent.click(saveButton);
    
    // Modal should close and success message should appear
    await expect(modal).not.toBeVisible();
    await expect(canvas.getByText('Changes saved successfully!')).toBeVisible();
    
    // Focus should return to trigger button
    await expect(triggerButton).toHaveFocus();
  }
};

// Multiple Modals
export const NestedModals: Story = {
  render: () => ({
    components: { DynModal, DynButton },
    template: `
      <div>
        <DynButton @click="firstModal = true">
          Open First Modal
        </DynButton>
        
        <!-- First Modal -->
        <DynModal 
          :is-open="firstModal" 
          @close="firstModal = false"
          z-index="1000"
        >
          <template #header>
            <h3 style="margin: 0;">First Modal</h3>
          </template>
          
          <template #default>
            <p>This is the first modal. You can open a second modal from here.</p>
            
            <div style="margin: 1rem 0;">
              <DynButton @click="secondModal = true">
                Open Second Modal
              </DynButton>
            </div>
          </template>
          
          <template #footer>
            <DynButton variant="secondary" @click="firstModal = false">Close First</DynButton>
          </template>
        </DynModal>
        
        <!-- Second Modal -->
        <DynModal 
          :is-open="secondModal" 
          @close="secondModal = false"
          size="sm"
          z-index="1010"
        >
          <template #header>
            <h3 style="margin: 0;">Second Modal</h3>
          </template>
          
          <template #default>
            <p>This is a second modal opened on top of the first one.</p>
            <p>Notice how it has a higher z-index and appears above the first modal.</p>
          </template>
          
          <template #footer>
            <DynButton variant="primary" @click="secondModal = false">Close Second</DynButton>
          </template>
        </DynModal>
      </div>
    `,
    data() {
      return {
        firstModal: false,
        secondModal: false
      };
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open first modal
    const firstTrigger = canvas.getByText('Open First Modal');
    await userEvent.click(firstTrigger);
    
    // First modal should be visible
    const firstModal = canvas.getByRole('dialog');
    await expect(firstModal).toBeVisible();
    
    // Open second modal
    const secondTrigger = canvas.getByText('Open Second Modal');
    await userEvent.click(secondTrigger);
    
    // Both modals should be visible, but second should be on top
    const modals = canvas.getAllByRole('dialog');
    await expect(modals).toHaveLength(2);
    
    // Close second modal
    const closeSecond = canvas.getByText('Close Second');
    await userEvent.click(closeSecond);
    
    // Only first modal should remain
    await expect(canvas.getAllByRole('dialog')).toHaveLength(1);
  }
};