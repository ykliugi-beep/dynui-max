import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynBadge from '@dynui-max/core/components/Data/DynBadge.vue';

const meta = {
  title: 'Data/DynBadge',
  component: DynBadge,
  parameters: {
    docs: {
      description: {
        component: 'Badge komponenta za prikazivanje statusa, brojeva i kategorija sa različitim bojama i veličinama.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'pill']
    },
    dot: { control: 'boolean' },
    removable: { control: 'boolean' }
  }
} satisfies Meta<typeof DynBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Badge
export const Default: Story = {
  args: {
    children: 'Default Badge'
  }
};

// Variant Examples
export const Variants: Story = {
  render: () => ({
    components: { DynBadge },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <DynBadge variant="primary">Primary</DynBadge>
        <DynBadge variant="secondary">Secondary</DynBadge>
        <DynBadge variant="success">Success</DynBadge>
        <DynBadge variant="warning">Warning</DynBadge>
        <DynBadge variant="error">Error</DynBadge>
        <DynBadge variant="info">Info</DynBadge>
      </div>
    `
  })
};

// Size Variations
export const SizeVariations: Story = {
  render: () => ({
    components: { DynBadge },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <DynBadge variant="primary" size="sm">Small</DynBadge>
          <span style="font-size: 0.75rem; color: #6b7280;">sm</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <DynBadge variant="primary" size="md">Medium</DynBadge>
          <span style="font-size: 0.75rem; color: #6b7280;">md</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <DynBadge variant="primary" size="lg">Large</DynBadge>
          <span style="font-size: 0.75rem; color: #6b7280;">lg</span>
        </div>
      </div>
    `
  })
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => ({
    components: { DynBadge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div>
            <h4 style="margin: 0 0 0.25rem 0;">Server Status</h4>
            <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Main application server</p>
          </div>
          <DynBadge variant="success" dot>Online</DynBadge>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div>
            <h4 style="margin: 0 0 0.25rem 0;">Database Connection</h4>
            <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">PostgreSQL cluster</p>
          </div>
          <DynBadge variant="warning" dot>Slow</DynBadge>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div>
            <h4 style="margin: 0 0 0.25rem 0;">API Service</h4>
            <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">REST API gateway</p>
          </div>
          <DynBadge variant="error" dot>Down</DynBadge>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div>
            <h4 style="margin: 0 0 0.25rem 0;">CDN Network</h4>
            <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Global content delivery</p>
          </div>
          <DynBadge variant="info" dot>Maintenance</DynBadge>
        </div>
      </div>
    `
  })
};

// Number Badges
export const NumberBadges: Story = {
  render: () => ({
    components: { DynBadge },
    template: `
      <div>
        <h3>Notification Badges</h3>
        <div style="display: flex; gap: 2rem; align-items: start; margin: 1rem 0;">
          <div style="position: relative;">
            <button style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 4px; background: white; cursor: pointer;">Messages</button>
            <DynBadge 
              variant="error" 
              size="sm" 
              shape="pill"
              style="position: absolute; top: -0.5rem; right: -0.5rem;"
            >
              3
            </DynBadge>
          </div>
          
          <div style="position: relative;">
            <button style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 4px; background: white; cursor: pointer;">Notifications</button>
            <DynBadge 
              variant="primary" 
              size="sm" 
              shape="pill"
              style="position: absolute; top: -0.5rem; right: -0.5rem;"
            >
              12
            </DynBadge>
          </div>
          
          <div style="position: relative;">
            <button style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 4px; background: white; cursor: pointer;">Tasks</button>
            <DynBadge 
              variant="success" 
              size="sm" 
              shape="pill"
              style="position: absolute; top: -0.5rem; right: -0.5rem;"
            >
              99+
            </DynBadge>
          </div>
          
          <div style="position: relative;">
            <button style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 4px; background: white; cursor: pointer;">Shopping Cart</button>
            <DynBadge 
              variant="warning" 
              size="sm" 
              shape="pill"
              style="position: absolute; top: -0.5rem; right: -0.5rem;"
            >
              5
            </DynBadge>
          </div>
        </div>
        
        <div style="margin-top: 2rem;">
          <h4>Badge Placement Examples</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
              <span>Unread emails</span>
              <DynBadge variant="primary" shape="pill">24</DynBadge>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
              <span>Pending reviews</span>
              <DynBadge variant="warning" shape="pill">7</DynBadge>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
              <span>Failed deployments</span>
              <DynBadge variant="error" shape="pill">2</DynBadge>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that number badges are visible
    await expect(canvas.getByText('3')).toBeVisible();
    await expect(canvas.getByText('12')).toBeVisible();
    await expect(canvas.getByText('99+')).toBeVisible();
    await expect(canvas.getByText('5')).toBeVisible();
  }
};

// Removable Badges (Tags)
export const RemovableBadges: Story = {
  render: () => ({
    components: { DynBadge },
    template: `
      <div>
        <h3>Tag Management</h3>
        <div style="margin: 1rem 0;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Add tags:</label>
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <input 
              v-model="newTag"
              @keyup.enter="addTag"
              type="text" 
              placeholder="Enter tag name"
              style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;"
            />
            <button 
              @click="addTag"
              :disabled="!newTag.trim()"
              style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
            >
              Add Tag
            </button>
          </div>
        </div>
        
        <div class="tag-container" style="display: flex; flex-wrap: wrap; gap: 0.5rem; min-height: 3rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #fafafa;">
          <DynBadge 
            v-for="tag in tags" 
            :key="tag.id"
            :variant="tag.variant"
            :removable="true"
            @remove="removeTag(tag.id)"
          >
            {{ tag.name }}
          </DynBadge>
          
          <div v-if="tags.length === 0" style="color: #9ca3af; font-style: italic;">
            No tags added yet. Add some tags above.
          </div>
        </div>
        
        <div class="tag-stats" style="margin-top: 1rem; display: flex; gap: 2rem;">
          <div>Total tags: <strong>{{ tags.length }}</strong></div>
          <div>Unique categories: <strong>{{ uniqueCategories.length }}</strong></div>
        </div>
      </div>
    `,
    data() {
      return {
        newTag: '',
        tags: [
          { id: 1, name: 'Frontend', variant: 'primary' },
          { id: 2, name: 'Vue.js', variant: 'success' },
          { id: 3, name: 'TypeScript', variant: 'info' },
          { id: 4, name: 'In Progress', variant: 'warning' }
        ]
      };
    },
    computed: {
      uniqueCategories() {
        return [...new Set(this.tags.map(tag => tag.variant))];
      }
    },
    methods: {
      addTag() {
        if (this.newTag.trim()) {
          const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
          const newTagObj = {
            id: Date.now(),
            name: this.newTag.trim(),
            variant: variants[Math.floor(Math.random() * variants.length)]
          };
          this.tags.push(newTagObj);
          this.newTag = '';
        }
      },
      removeTag(id) {
        this.tags = this.tags.filter(tag => tag.id !== id);
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test adding a tag
    const input = canvas.getByPlaceholderText('Enter tag name');
    await userEvent.type(input, 'React');
    
    const addButton = canvas.getByText('Add Tag');
    await userEvent.click(addButton);
    
    // New tag should appear
    await expect(canvas.getByText('React')).toBeVisible();
    
    // Test removing a tag
    const removeButtons = canvas.getAllByLabelText(/remove/i);
    if (removeButtons.length > 0) {
      await userEvent.click(removeButtons[0]);
    }
  }
};

// Product Categories
export const ProductCategories: Story = {
  render: () => ({
    components: { DynBadge },
    template: `
      <div>
        <h3>Product Categories</h3>
        
        <div class="product-list" style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
          <div v-for="product in products" :key="product.id" class="product-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: white;">
            <div class="product-info">
              <h4 style="margin: 0 0 0.25rem 0;">{{ product.name }}</h4>
              <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">{{ product.description }}</p>
              <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
                <DynBadge 
                  v-for="category in product.categories" 
                  :key="category"
                  :variant="getCategoryVariant(category)"
                  size="sm"
                >
                  {{ category }}
                </DynBadge>
              </div>
            </div>
            <div class="product-price" style="text-align: right;">
              <div style="font-size: 1.125rem; font-weight: 600;">{{ product.price }}</div>
              <DynBadge :variant="getStockVariant(product.stock)" size="sm">{{ getStockLabel(product.stock) }}</DynBadge>
            </div>
          </div>
        </div>
        
        <div class="category-filter" style="margin-top: 2rem;">
          <h4>Filter by Category:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
            <DynBadge 
              v-for="category in allCategories" 
              :key="category"
              :variant="selectedCategories.includes(category) ? 'primary' : 'secondary'"
              @click="toggleCategory(category)"
              style="cursor: pointer;"
            >
              {{ category }}
            </DynBadge>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        selectedCategories: [],
        products: [
          { 
            id: 1, 
            name: 'MacBook Pro', 
            description: 'Powerful laptop for developers',
            price: '$2,399',
            stock: 'in-stock',
            categories: ['Electronics', 'Computers', 'Premium']
          },
          { 
            id: 2, 
            name: 'Wireless Headphones', 
            description: 'Noise-canceling audio experience',
            price: '$299',
            stock: 'limited',
            categories: ['Electronics', 'Audio', 'Popular']
          },
          { 
            id: 3, 
            name: 'Designer Chair', 
            description: 'Ergonomic office furniture',
            price: '$899',
            stock: 'out-of-stock',
            categories: ['Furniture', 'Office', 'Ergonomic']
          }
        ]
      };
    },
    computed: {
      allCategories() {
        const categories = new Set();
        this.products.forEach(product => {
          product.categories.forEach(cat => categories.add(cat));
        });
        return Array.from(categories).sort();
      }
    },
    methods: {
      getCategoryVariant(category) {
        const variants = {
          'Electronics': 'primary',
          'Computers': 'info', 
          'Premium': 'warning',
          'Audio': 'success',
          'Popular': 'secondary',
          'Furniture': 'info',
          'Office': 'primary',
          'Ergonomic': 'success'
        };
        return variants[category] || 'secondary';
      },
      getStockVariant(stock) {
        return {
          'in-stock': 'success',
          'limited': 'warning', 
          'out-of-stock': 'error'
        }[stock] || 'secondary';
      },
      getStockLabel(stock) {
        return {
          'in-stock': 'In Stock',
          'limited': 'Limited',
          'out-of-stock': 'Sold Out'
        }[stock] || stock;
      },
      toggleCategory(category) {
        const index = this.selectedCategories.indexOf(category);
        if (index > -1) {
          this.selectedCategories.splice(index, 1);
        } else {
          this.selectedCategories.push(category);
        }
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test category filtering
    const electronicsFilter = canvas.getByText('Electronics');
    await userEvent.click(electronicsFilter);
    
    // Electronics category should be selected (primary variant)
    // In a real implementation, this would filter the products
    await expect(electronicsFilter).toBeVisible();
  }
};

// Interactive Badge Groups
export const InteractiveBadgeGroups: Story = {
  render: () => ({
    components: { DynBadge },
    template: `
      <div class="badge-groups">
        <h3>Skill Assessment</h3>
        
        <div class="skill-section" style="margin-bottom: 2rem;">
          <h4>Programming Languages</h4>
          <p style="color: #6b7280; margin-bottom: 1rem;">Click to rate your skill level</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <div 
              v-for="lang in programmingLanguages" 
              :key="lang.name"
              @click="toggleSkill(lang.name)"
              style="cursor: pointer;"
            >
              <DynBadge 
                :variant="getSkillVariant(lang.name)"
                :size="getSkillSize(lang.name)"
              >
                {{ lang.name }} {{ getSkillLevel(lang.name) }}
              </DynBadge>
            </div>
          </div>
        </div>
        
        <div class="skill-summary" style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <h4 style="margin: 0 0 0.5rem 0;">Skill Summary</h4>
          <div style="display: flex; gap: 1rem;">
            <div>Expert: <strong>{{ expertSkills.length }}</strong></div>
            <div>Intermediate: <strong>{{ intermediateSkills.length }}</strong></div>
            <div>Beginner: <strong>{{ beginnerSkills.length }}</strong></div>
            <div>Unrated: <strong>{{ unratedSkills.length }}</strong></div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        skillLevels: {},
        programmingLanguages: [
          { name: 'JavaScript' },
          { name: 'TypeScript' },
          { name: 'Vue.js' },
          { name: 'React' },
          { name: 'Python' },
          { name: 'Java' },
          { name: 'C++' },
          { name: 'Go' }
        ]
      };
    },
    computed: {
      expertSkills() {
        return Object.entries(this.skillLevels).filter(([_, level]) => level === 'expert').map(([name]) => name);
      },
      intermediateSkills() {
        return Object.entries(this.skillLevels).filter(([_, level]) => level === 'intermediate').map(([name]) => name);
      },
      beginnerSkills() {
        return Object.entries(this.skillLevels).filter(([_, level]) => level === 'beginner').map(([name]) => name);
      },
      unratedSkills() {
        return this.programmingLanguages.filter(lang => !this.skillLevels[lang.name]).map(lang => lang.name);
      }
    },
    methods: {
      toggleSkill(name) {
        const levels = ['beginner', 'intermediate', 'expert'];
        const currentLevel = this.skillLevels[name];
        const currentIndex = levels.indexOf(currentLevel);
        const nextIndex = (currentIndex + 1) % (levels.length + 1);
        
        if (nextIndex === levels.length) {
          delete this.skillLevels[name];
        } else {
          this.skillLevels[name] = levels[nextIndex];
        }
        
        // Force reactivity
        this.skillLevels = { ...this.skillLevels };
      },
      getSkillVariant(name) {
        const level = this.skillLevels[name];
        return {
          'expert': 'success',
          'intermediate': 'warning', 
          'beginner': 'info'
        }[level] || 'secondary';
      },
      getSkillSize(name) {
        const level = this.skillLevels[name];
        return level === 'expert' ? 'md' : 'sm';
      },
      getSkillLevel(name) {
        const level = this.skillLevels[name];
        return {
          'expert': '★★★',
          'intermediate': '★★',
          'beginner': '★'
        }[level] || '';
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test skill rating
    const jsSkill = canvas.getByText('JavaScript');
    await userEvent.click(jsSkill);
    
    // Should show beginner level
    await expect(canvas.getByText('JavaScript ★')).toBeVisible();
    await expect(canvas.getByText('Beginner: 1')).toBeVisible();
    
    // Click again to advance to intermediate
    await userEvent.click(canvas.getByText('JavaScript ★'));
    await expect(canvas.getByText('JavaScript ★★')).toBeVisible();
    await expect(canvas.getByText('Intermediate: 1')).toBeVisible();
  }
};