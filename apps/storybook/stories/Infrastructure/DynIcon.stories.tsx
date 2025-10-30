import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynIcon from '@dynui-max/core/components/Infrastructure/DynIcon.vue';

const meta = {
  title: 'Infrastructure/DynIcon',
  component: DynIcon,
  parameters: {
    docs: {
      description: {
        component: 'Icon komponenta sa podrškom za SVG ikone, različite veličine i boje.'
      }
    }
  },
  argTypes: {
    name: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    },
    color: { control: 'color' },
    variant: {
      control: { type: 'select' },
      options: ['outline', 'solid']
    }
  }
} satisfies Meta<typeof DynIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Icon
export const Default: Story = {
  args: {
    name: 'home'
  }
};

// Common Icons Gallery
export const CommonIcons: Story = {
  render: () => ({
    components: { DynIcon },
    template: `
      <div>
        <h3>Common Icons</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin: 1rem 0;">
          <div v-for="icon in commonIcons" :key="icon" style="display: flex; flex-direction: column; align-items: center; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s;">
            <DynIcon :name="icon" size="lg" style="margin-bottom: 0.5rem;" />
            <span style="font-size: 0.875rem; text-align: center;">{{ icon }}</span>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        commonIcons: [
          'home', 'user', 'settings', 'search', 'heart', 'star', 
          'download', 'upload', 'edit', 'delete', 'check', 'x',
          'plus', 'minus', 'chevron-left', 'chevron-right',
          'mail', 'phone', 'calendar', 'clock', 'location', 'globe'
        ]
      };
    }
  })
};

// Size Variations
export const SizeVariations: Story = {
  render: () => ({
    components: { DynIcon },
    template: `
      <div>
        <h3>Size Variations</h3>
        <div style="display: flex; align-items: center; gap: 2rem; margin: 1rem 0;">
          <div v-for="size in sizes" :key="size" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <DynIcon name="star" :size="size" color="#fbbf24" />
            <span style="font-size: 0.75rem; color: #6b7280;">{{ size }}</span>
          </div>
        </div>
        
        <div style="margin-top: 2rem;">
          <h4>In Context</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 4px; background: white;">
              <DynIcon name="plus" size="sm" /> Add Item (sm)
            </button>
            <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: 1px solid #d1d5db; border-radius: 4px; background: white;">
              <DynIcon name="download" size="md" /> Download (md)
            </button>
            <button style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; border: 1px solid #d1d5db; border-radius: 4px; background: white;">
              <DynIcon name="settings" size="lg" /> Settings (lg)
            </button>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
      };
    }
  })
};

// Interactive States
export const Interactive: Story = {
  render: () => ({
    components: { DynIcon },
    template: `
      <div class="interactive-icons">
        <h3>Interactive Icon States</h3>
        
        <div class="interaction-examples" style="display: flex; gap: 1rem; margin: 1rem 0;">
          <button 
            @click="toggleLike" 
            :class="{ liked: isLiked }"
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 4px; background: white; cursor: pointer; transition: all 0.2s;"
            :style="{ borderColor: isLiked ? '#ef4444' : '#e2e8f0', backgroundColor: isLiked ? '#fef2f2' : 'white' }"
          >
            <DynIcon 
              :name="isLiked ? 'heart-solid' : 'heart'" 
              :color="isLiked ? '#ef4444' : '#6b7280'"
              size="sm"
            />
            {{ isLiked ? 'Liked' : 'Like' }} ({{ likeCount }})
          </button>
          
          <button 
            @click="toggleBookmark" 
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 4px; background: white; cursor: pointer; transition: all 0.2s;"
            :style="{ borderColor: isBookmarked ? '#3b82f6' : '#e2e8f0', backgroundColor: isBookmarked ? '#eff6ff' : 'white' }"
          >
            <DynIcon 
              :name="isBookmarked ? 'bookmark-solid' : 'bookmark'" 
              :color="isBookmarked ? '#3b82f6' : '#6b7280'"
              size="sm"
            />
            {{ isBookmarked ? 'Bookmarked' : 'Bookmark' }}
          </button>
          
          <button 
            @click="toggleStar" 
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 4px; background: white; cursor: pointer; transition: all 0.2s;"
            :style="{ borderColor: isStarred ? '#fbbf24' : '#e2e8f0', backgroundColor: isStarred ? '#fffbeb' : 'white' }"
          >
            <DynIcon 
              :name="isStarred ? 'star-solid' : 'star'" 
              :color="isStarred ? '#fbbf24' : '#6b7280'"
              size="sm"
            />
            {{ isStarred ? 'Starred' : 'Star' }}
          </button>
        </div>
        
        <div class="status-display" style="margin-top: 1rem; padding: 1rem; background: #f9fafb; border-radius: 4px;">
          <h4 style="margin: 0 0 0.5rem 0;">Current Status:</h4>
          <ul style="margin: 0; padding-left: 1rem;">
            <li style="display: flex; align-items: center; gap: 0.5rem;">Liked: <DynIcon :name="isLiked ? 'check' : 'x'" :color="isLiked ? '#10b981' : '#ef4444'" size="sm" /> {{ isLiked ? 'Yes' : 'No' }}</li>
            <li style="display: flex; align-items: center; gap: 0.5rem;">Bookmarked: <DynIcon :name="isBookmarked ? 'check' : 'x'" :color="isBookmarked ? '#10b981' : '#ef4444'" size="sm" /> {{ isBookmarked ? 'Yes' : 'No' }}</li>
            <li style="display: flex; align-items: center; gap: 0.5rem;">Starred: <DynIcon :name="isStarred ? 'check' : 'x'" :color="isStarred ? '#10b981' : '#ef4444'" size="sm" /> {{ isStarred ? 'Yes' : 'No' }}</li>
          </ul>
        </div>
      </div>
    `,
    data() {
      return {
        isLiked: false,
        isBookmarked: true,
        isStarred: false,
        likeCount: 42
      };
    },
    methods: {
      toggleLike() { 
        this.isLiked = !this.isLiked;
        this.likeCount += this.isLiked ? 1 : -1;
      },
      toggleBookmark() { this.isBookmarked = !this.isBookmarked; },
      toggleStar() { this.isStarred = !this.isStarred; }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test like button interaction
    const likeButton = canvas.getByRole('button', { name: /like/i });
    await userEvent.click(likeButton);
    
    // Should change to liked state
    await expect(canvas.getByText('Liked (43)')).toBeVisible();
    
    // Status should update
    await expect(canvas.getByText('Liked:')).toBeVisible();
  }
};

// Color Variations
export const ColorVariations: Story = {
  render: () => ({
    components: { DynIcon },
    template: `
      <div>
        <h3>Color Variations</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem; margin: 1rem 0;">
          <div v-for="color in colors" :key="color.name" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <DynIcon name="star" size="lg" :color="color.value" />
            <span style="font-size: 0.75rem; color: #6b7280;">{{ color.name }}</span>
          </div>
        </div>
        
        <div style="margin-top: 2rem;">
          <h4>Semantic Colors in Context</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: #dcfce7; border-radius: 4px;">
              <DynIcon name="check-circle" color="#16a34a" size="sm" />
              <span>Success message with semantic green icon</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: #fef3c7; border-radius: 4px;">
              <DynIcon name="alert-triangle" color="#d97706" size="sm" />
              <span>Warning message with semantic orange icon</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: #fee2e2; border-radius: 4px;">
              <DynIcon name="x-circle" color="#dc2626" size="sm" />
              <span>Error message with semantic red icon</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: #dbeafe; border-radius: 4px;">
              <DynIcon name="info-circle" color="#2563eb" size="sm" />
              <span>Info message with semantic blue icon</span>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        colors: [
          { name: 'Primary', value: '#3b82f6' },
          { name: 'Success', value: '#10b981' },
          { name: 'Warning', value: '#f59e0b' },
          { name: 'Error', value: '#ef4444' },
          { name: 'Gray', value: '#6b7280' },
          { name: 'Purple', value: '#8b5cf6' },
          { name: 'Pink', value: '#ec4899' },
          { name: 'Indigo', value: '#6366f1' }
        ]
      };
    }
  })
};

// Icon in Navigation
export const NavigationIcons: Story = {
  render: () => ({
    components: { DynIcon },
    template: `
      <div>
        <h3>Navigation with Icons</h3>
        
        <nav style="border: 1px solid #e5e7eb; border-radius: 8px; background: white;">
          <div class="nav-header" style="padding: 1rem; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 0.5rem;">
            <DynIcon name="layers" color="#3b82f6" size="lg" />
            <h4 style="margin: 0; font-weight: 600;">DynUI-Max</h4>
          </div>
          
          <ul style="list-style: none; margin: 0; padding: 0.5rem 0;">
            <li v-for="item in navItems" :key="item.id">
              <a 
                href="#" 
                @click.prevent="selectNavItem(item.id)"
                style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; text-decoration: none; color: inherit; transition: background 0.2s;"
                :style="{ background: selectedNav === item.id ? '#f3f4f6' : 'transparent' }"
              >
                <DynIcon 
                  :name="item.icon" 
                  :color="selectedNav === item.id ? '#3b82f6' : '#6b7280'" 
                  size="sm" 
                />
                <span :style="{ fontWeight: selectedNav === item.id ? '500' : '400' }">{{ item.label }}</span>
                <DynIcon 
                  v-if="item.hasSubmenu" 
                  name="chevron-right" 
                  color="#9ca3af" 
                  size="xs"
                  style="margin-left: auto;"
                />
              </a>
            </li>
          </ul>
        </nav>
        
        <div class="current-nav" style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 4px;">
          <strong>Current page:</strong> {{ getCurrentNavLabel() }}
        </div>
      </div>
    `,
    data() {
      return {
        selectedNav: 'dashboard',
        navItems: [
          { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
          { id: 'projects', label: 'Projects', icon: 'folder', hasSubmenu: true },
          { id: 'tasks', label: 'Tasks', icon: 'check-square' },
          { id: 'team', label: 'Team', icon: 'users', hasSubmenu: true },
          { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
          { id: 'settings', label: 'Settings', icon: 'settings' }
        ]
      };
    },
    methods: {
      selectNavItem(id) {
        this.selectedNav = id;
      },
      getCurrentNavLabel() {
        const item = this.navItems.find(item => item.id === this.selectedNav);
        return item ? item.label : 'Unknown';
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test navigation selection
    const projectsLink = canvas.getByText('Projects');
    await userEvent.click(projectsLink);
    
    // Should update current page
    await expect(canvas.getByText('Current page: Projects')).toBeVisible();
  }
};

// Loading States
export const LoadingStates: Story = {
  render: () => ({
    components: { DynIcon },
    template: `
      <div>
        <h3>Loading and State Icons</h3>
        
        <div class="loading-examples" style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <DynIcon name="spinner" color="#3b82f6" size="sm" class="spinning" />
            <span>Loading data...</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <DynIcon name="cloud-upload" color="#059669" size="sm" />
            <span>Upload completed successfully</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <DynIcon name="wifi-off" color="#dc2626" size="sm" />
            <span>Connection lost - trying to reconnect...</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <DynIcon name="shield-check" color="#059669" size="sm" />
            <span>Security verification passed</span>
          </div>
        </div>
        
        <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinning {
          animation: spin 1s linear infinite;
        }
        </style>
      </div>
    `
  })
};