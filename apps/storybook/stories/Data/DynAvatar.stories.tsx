import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import DynAvatar from '@dynui-max/core/components/Data/DynAvatar.vue';

const meta = {
  title: 'Data/DynAvatar',
  component: DynAvatar,
  parameters: {
    docs: {
      description: {
        component: 'Avatar komponenta za prikaz korisničkih slika, inicijala ili placeholder sa različitim veličinama i oblicima.'
      }
    }
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'rounded', 'square']
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'light', 'outline']
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'busy', 'away']
    }
  }
} satisfies Meta<typeof DynAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Avatars
export const Default: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    alt: 'John Doe'
  }
};

export const WithInitials: Story = {
  args: {
    name: 'Marko Petrović'
  }
};

// Size Variations
export const SizeVariations: Story = {
  render: () => ({
    components: { DynAvatar },
    template: `
      <div>
        <h3>Avatar Sizes</h3>
        <div style="display: flex; align-items: center; gap: 1.5rem; margin: 1rem 0;">
          <div v-for="size in sizes" :key="size" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <DynAvatar 
              :size="size" 
              name="Ana Jovanović"
              :style="{ background: getRandomColor() }"
            />
            <span style="font-size: 0.75rem; color: #6b7280;">{{ size }}</span>
          </div>
        </div>
        
        <div style="margin-top: 2rem;">
          <h4>With Images</h4>
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div v-for="size in sizes" :key="'img-' + size" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
              <DynAvatar 
                :size="size" 
                :src="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + size"
                :alt="size + ' avatar'"
              />
              <span style="font-size: 0.75rem; color: #6b7280;">{{ size }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
      };
    },
    methods: {
      getRandomColor() {
        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    }
  })
};

// Status Indicators
export const WithStatus: Story = {
  render: () => ({
    components: { DynAvatar },
    template: `
      <div>
        <h3>Status Indicators</h3>
        <div style="display: flex; gap: 2rem; margin: 1rem 0; flex-wrap: wrap;">
          <div v-for="status in statuses" :key="status.value" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <DynAvatar 
              :src="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + status.value"
              :alt="status.label + ' user'"
              :status="status.value"
              size="lg"
            />
            <span style="font-size: 0.875rem; text-align: center;">{{ status.label }}</span>
            <div style="font-size: 0.75rem; color: #6b7280; text-align: center;">{{ status.description }}</div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        statuses: [
          { value: 'online', label: 'Online', description: 'Active now' },
          { value: 'offline', label: 'Offline', description: 'Last seen 2h ago' },
          { value: 'busy', label: 'Busy', description: 'Do not disturb' },
          { value: 'away', label: 'Away', description: 'Be back soon' }
        ]
      };
    }
  })
};

// Avatar Group
export const AvatarGroup: Story = {
  render: () => ({
    components: { DynAvatar },
    template: `
      <div>
        <h3>Team Avatar Groups</h3>
        
        <div class="team-section" style="margin-bottom: 2rem;">
          <h4>Development Team ({{ teamMembers.length }} members)</h4>
          <div class="avatar-group" style="display: flex; align-items: center; margin: 1rem 0;">
            <div v-for="(member, index) in visibleMembers" :key="member.id" :style="{ marginLeft: index > 0 ? '-0.5rem' : '0', zIndex: teamMembers.length - index }">
              <DynAvatar 
                :src="member.avatar"
                :alt="member.name"
                :status="member.status"
                size="md"
                style="border: 2px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.1);"
              />
            </div>
            <div v-if="hiddenCount > 0" style="margin-left: 0.5rem; color: #6b7280; font-size: 0.875rem;">
              +{{ hiddenCount }} more
            </div>
          </div>
          
          <div class="member-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div v-for="member in teamMembers" :key="member.id" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px;">
              <DynAvatar 
                :src="member.avatar"
                :alt="member.name"
                :status="member.status"
                size="sm"
              />
              <div>
                <div style="font-weight: 500; font-size: 0.875rem;">{{ member.name }}</div>
                <div style="color: #6b7280; font-size: 0.75rem;">{{ member.role }} • {{ getStatusLabel(member.status) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        maxVisible: 5,
        teamMembers: [
          { id: 1, name: 'Ana Marković', role: 'Lead Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', status: 'online' },
          { id: 2, name: 'Petar Nikolić', role: 'Frontend Dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Petar', status: 'busy' },
          { id: 3, name: 'Milica Stojanović', role: 'UI/UX Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milica', status: 'online' },
          { id: 4, name: 'Stefan Jovanović', role: 'Backend Dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Stefan', status: 'away' },
          { id: 5, name: 'Jelena Milic', role: 'QA Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jelena', status: 'online' },
          { id: 6, name: 'Milan Popović', role: 'DevOps', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milan', status: 'offline' },
          { id: 7, name: 'Sanja Tomić', role: 'Product Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanja', status: 'online' }
        ]
      };
    },
    computed: {
      visibleMembers() {
        return this.teamMembers.slice(0, this.maxVisible);
      },
      hiddenCount() {
        return Math.max(0, this.teamMembers.length - this.maxVisible);
      }
    },
    methods: {
      getStatusLabel(status) {
        return {
          online: 'Online',
          offline: 'Offline',
          busy: 'Busy',
          away: 'Away'
        }[status] || status;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that team members are displayed
    await expect(canvas.getByText('Ana Marković')).toBeVisible();
    await expect(canvas.getByText('Lead Developer')).toBeVisible();
    
    // Test avatar group display
    await expect(canvas.getByText('+2 more')).toBeVisible();
  }
};

// Fallback Examples
export const FallbackExamples: Story = {
  render: () => ({
    components: { DynAvatar },
    template: `
      <div>
        <h3>Fallback Scenarios</h3>
        <div style="display: flex; flex-direction: column; gap: 1.5rem; margin: 1rem 0;">
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <DynAvatar src="https://broken-image-url.jpg" name="Marko Jovanović" size="md" />
            <div>
              <strong>Broken Image Fallback</strong>
              <div style="color: #6b7280; font-size: 0.875rem;">Shows initials when image fails to load</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <DynAvatar name="Stefan" size="md" />
            <div>
              <strong>Single Name</strong>
              <div style="color: #6b7280; font-size: 0.875rem;">Shows first letter when only one name provided</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <DynAvatar size="md" />
            <div>
              <strong>No Name or Image</strong>
              <div style="color: #6b7280; font-size: 0.875rem;">Shows default user icon placeholder</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
            <DynAvatar name="Александар Петровић" size="md" />
            <div>
              <strong>Non-Latin Characters</strong>
              <div style="color: #6b7280; font-size: 0.875rem;">Handles Cyrillic and other character sets</div>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that fallbacks are working
    const avatars = canvas.getAllByRole('img');
    expect(avatars.length).toBeGreaterThanOrEqual(3);
    
    // Test accessibility
    const firstAvatar = avatars[0];
    await expect(firstAvatar).toHaveAttribute('alt');
  }
};

// Shape Variations
export const ShapeVariations: Story = {
  render: () => ({
    components: { DynAvatar },
    template: `
      <div>
        <h3>Shape Variations</h3>
        <div style="display: flex; gap: 3rem; margin: 1rem 0; flex-wrap: wrap;">
          <div v-for="shape in shapes" :key="shape" style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <h4 style="margin: 0; text-transform: capitalize;">{{ shape }}</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <DynAvatar 
                :shape="shape"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shape1"
                alt="Shape example"
                size="lg"
              />
              <DynAvatar 
                :shape="shape"
                name="MJ"
                size="lg"
              />
              <DynAvatar 
                :shape="shape"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        shapes: ['circle', 'rounded', 'square']
      };
    }
  })
};

// Real-world Chat Interface
export const ChatInterface: Story = {
  render: () => ({
    components: { DynAvatar },
    template: `
      <div class="chat-interface">
        <h3>Chat Interface Example</h3>
        
        <div class="chat-window" style="border: 1px solid #e5e7eb; border-radius: 8px; height: 400px; display: flex; flex-direction: column;">
          <div class="chat-header" style="padding: 1rem; border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <DynAvatar 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=TeamChat"
                alt="Team Chat"
                size="sm"
                status="online"
              />
              <div>
                <div style="font-weight: 500;">Team Chat</div>
                <div style="font-size: 0.75rem; color: #6b7280;">{{ onlineCount }} online</div>
              </div>
            </div>
          </div>
          
          <div class="chat-messages" style="flex: 1; padding: 1rem; overflow-y: auto;">
            <div v-for="message in chatMessages" :key="message.id" class="message" style="display: flex; gap: 0.75rem; margin-bottom: 1rem;">
              <DynAvatar 
                :src="message.user.avatar"
                :alt="message.user.name"
                :status="message.user.status"
                size="sm"
              />
              <div style="flex: 1;">
                <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span style="font-weight: 500; font-size: 0.875rem;">{{ message.user.name }}</span>
                  <span style="font-size: 0.75rem; color: #9ca3af;">{{ message.time }}</span>
                </div>
                <div style="font-size: 0.875rem; line-height: 1.4;">{{ message.text }}</div>
              </div>
            </div>
          </div>
          
          <div class="chat-input" style="padding: 1rem; border-top: 1px solid #e5e7eb; background: #f9fafb;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <DynAvatar 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
                alt="You"
                size="sm"
                status="online"
              />
              <input 
                v-model="newMessage"
                @keyup.enter="sendMessage"
                type="text" 
                placeholder="Type a message..."
                style="flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;"
              />
              <button 
                @click="sendMessage"
                :disabled="!newMessage.trim()"
                style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        
        <div class="online-users" style="margin-top: 1rem;">
          <h4>Online Users</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <div v-for="user in onlineUsers" :key="user.id" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: #f0fdf4; border-radius: 6px;">
              <DynAvatar :src="user.avatar" :alt="user.name" size="xs" status="online" />
              <span style="font-size: 0.75rem;">{{ user.name }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        newMessage: '',
        chatMessages: [
          {
            id: 1,
            user: { name: 'Ana Marković', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', status: 'online' },
            text: 'Hey team! How\'s the DynUI-Max progress going?',
            time: '10:30 AM'
          },
          {
            id: 2,
            user: { name: 'Petar Nikolić', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Petar', status: 'busy' },
            text: 'Great! Just finished the form components stories. The interactive examples are working perfectly.',
            time: '10:32 AM'
          },
          {
            id: 3,
            user: { name: 'Milica Stojanović', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milica', status: 'online' },
            text: 'Awesome! The accessibility testing is also passing all checks. We\'re on track for Phase 5 completion.',
            time: '10:35 AM'
          }
        ]
      };
    },
    computed: {
      onlineUsers() {
        return this.chatMessages
          .map(msg => msg.user)
          .filter(user => user.status === 'online')
          .concat([{ id: 'current', name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser', status: 'online' }]);
      },
      onlineCount() {
        return this.onlineUsers.length;
      }
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim()) {
          const newMsg = {
            id: Date.now(),
            user: { name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser', status: 'online' },
            text: this.newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          this.chatMessages.push(newMsg);
          this.newMessage = '';
        }
      },
      getStatusLabel(status) {
        return {
          online: 'Online',
          offline: 'Offline', 
          busy: 'Busy',
          away: 'Away'
        }[status] || status;
      }
    }
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test sending a message
    const messageInput = canvas.getByPlaceholderText('Type a message...');
    await userEvent.type(messageInput, 'Test message from automation!');
    
    const sendButton = canvas.getByText('Send');
    await userEvent.click(sendButton);
    
    // Message should appear in chat
    await expect(canvas.getByText('Test message from automation!')).toBeVisible();
    
    // Input should be cleared
    await expect(messageInput).toHaveValue('');
  }
};