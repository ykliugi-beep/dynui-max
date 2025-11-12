# 🎯 DynUI-Fixed: Detaljan Plan za Sređivanje Komponenti

**Datum**: 11. novembar 2025.  
**Status**: Design Tokens ✅ | Komponente 🔨 In Progress  
**Cilj**: 100% Production-Ready za 3-4 sedmice

---

## 📋 Prioritizovani Redosled Komponenti

### **FAZA 0: STUB Komponente (P0-BLOCKER)** ⚠️

Ove komponente su **potpuno prazne** (71-138 bytes) i blokiraju dalje testiranje:

---

### **1. DynStepper / DynStep**

**Status**: 🔴 STUB (71 bytes)  
**Prioritet**: P0-CRITICAL  
**Trajanje**: 2-3 dana  
**Kompleksnost**: VISOKA

#### 📝 Šta Treba Korigovati

**A. TypeScript Tipovi** (`packages/core/src/types.ts`)

```typescript
export interface DynStepperProps {
  orientation?: 'horizontal' | 'vertical';
  currentStep: number;
  onStepChange?: (step: number) => void;
  children: React.ReactNode;
  // Design tokens integration
  variant?: 'default' | 'outlined' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}

export interface DynStepProps {
  index: number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'upcoming' | 'current' | 'completed' | 'error';
  optional?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
```

**B. Komponenta Implementacija** (`packages/core/src/ui/dyn-stepper.tsx`)

```typescript
import { forwardRef, createContext, useContext } from 'react';
import { useTheme } from '@dynui/design-tokens';
import type { DynStepperProps, DynStepProps } from '../types';

// Context za komunikaciju između Stepper i Step
const StepperContext = createContext<{
  currentStep: number;
  orientation: 'horizontal' | 'vertical';
  onStepChange?: (step: number) => void;
} | null>(null);

export const DynStepper = forwardRef<HTMLDivElement, DynStepperProps>(
  ({ orientation = 'horizontal', currentStep, onStepChange, children, ...props }, ref) => {
    const theme = useTheme();
    
    return (
      <StepperContext.Provider value={{ currentStep, orientation, onStepChange }}>
        <div
          ref={ref}
          className={`dyn-stepper dyn-stepper--${orientation}`}
          role="navigation"
          aria-label="Progress steps"
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);

export const DynStep = forwardRef<HTMLButtonElement, DynStepProps>(
  ({ index, label, description, icon, status, optional, disabled, onClick }, ref) => {
    const context = useContext(StepperContext);
    if (!context) throw new Error('DynStep must be used within DynStepper');
    
    const { currentStep, onStepChange } = context;
    const isCompleted = index < currentStep;
    const isCurrent = index === currentStep;
    const computedStatus = status || (isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming');
    
    return (
      <button
        ref={ref}
        type="button"
        className={`dyn-step dyn-step--${computedStatus}`}
        disabled={disabled}
        onClick={() => {
          onClick?.();
          onStepChange?.(index);
        }}
        aria-current={isCurrent ? 'step' : undefined}
        aria-disabled={disabled}
      >
        <div className="dyn-step__indicator">
          {icon || <span className="dyn-step__number">{index + 1}</span>}
        </div>
        <div className="dyn-step__content">
          <div className="dyn-step__label">{label}</div>
          {description && <div className="dyn-step__description">{description}</div>}
          {optional && <span className="dyn-step__optional">Optional</span>}
        </div>
      </button>
    );
  }
);
```

**C. Storybook Stories** (`packages/core/src/ui/dyn-stepper.stories.tsx`)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynStepper, DynStep } from './dyn-stepper';

const meta: Meta<typeof DynStepper> = {
  title: 'Navigation/DynStepper',
  component: DynStepper,
  parameters: {
    a11y: { test: 'error' } // Enforce accessibility
  }
};

export default meta;
type Story = StoryObj<typeof DynStepper>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    currentStep: 1
  },
  render: (args) => (
    <DynStepper {...args}>
      <DynStep index={0} label="Account Info" description="Enter your details" />
      <DynStep index={1} label="Verification" description="Verify your email" />
      <DynStep index={2} label="Complete" description="Setup complete" />
    </DynStepper>
  )
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    currentStep: 0
  },
  render: (args) => (
    <DynStepper {...args}>
      <DynStep index={0} label="Step 1" />
      <DynStep index={1} label="Step 2" />
      <DynStep index={2} label="Step 3" />
    </DynStepper>
  )
};

export const WithError: Story = {
  args: {
    currentStep: 1
  },
  render: (args) => (
    <DynStepper {...args}>
      <DynStep index={0} label="Personal Info" status="completed" />
      <DynStep index={1} label="Payment" status="error" description="Card declined" />
      <DynStep index={2} label="Confirmation" />
    </DynStepper>
  )
};
```

**D. Unit Tests** (`packages/core/tests/components/dyn-stepper.test.tsx`)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynStepper, DynStep } from '../../src/ui/dyn-stepper';

expect.extend(toHaveNoViolations);

describe('DynStepper', () => {
  it('renders with correct steps', () => {
    render(
      <DynStepper currentStep={0}>
        <DynStep index={0} label="Step 1" />
        <DynStep index={1} label="Step 2" />
      </DynStepper>
    );
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('calls onStepChange when step is clicked', () => {
    const handleChange = vi.fn();
    render(
      <DynStepper currentStep={0} onStepChange={handleChange}>
        <DynStep index={0} label="Step 1" />
        <DynStep index={1} label="Step 2" />
      </DynStepper>
    );
    
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynStepper currentStep={0}>
        <DynStep index={0} label="Step 1" />
        <DynStep index={1} label="Step 2" />
      </DynStepper>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    const handleChange = vi.fn();
    render(
      <DynStepper currentStep={0} onStepChange={handleChange}>
        <DynStep index={0} label="Step 1" />
        <DynStep index={1} label="Step 2" />
      </DynStepper>
    );
    
    const step2 = screen.getByText('Step 2');
    step2.focus();
    fireEvent.keyDown(step2, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(1);
  });
});
```

**E. CSS sa Design Tokens** (`packages/core/src/ui/dyn-stepper.css`)

```css
.dyn-stepper {
  display: flex;
  gap: var(--dyn-spacing-md);
}

.dyn-stepper--horizontal {
  flex-direction: row;
  align-items: center;
}

.dyn-stepper--vertical {
  flex-direction: column;
  align-items: flex-start;
}

.dyn-step {
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-sm);
  padding: var(--dyn-spacing-sm);
  border: none;
  background: transparent;
  cursor: pointer;
  transition: opacity 0.2s;
}

.dyn-step:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.dyn-step__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--dyn-radius-full);
  background: var(--dyn-color-gray-200);
  color: var(--dyn-color-gray-600);
  font-weight: 600;
}

.dyn-step--current .dyn-step__indicator {
  background: var(--dyn-color-primary-500);
  color: white;
}

.dyn-step--completed .dyn-step__indicator {
  background: var(--dyn-color-success-500);
  color: white;
}

.dyn-step--error .dyn-step__indicator {
  background: var(--dyn-color-error-500);
  color: white;
}

.dyn-step__label {
  font-size: var(--dyn-typography-fontSize-sm);
  font-weight: 500;
  color: var(--dyn-color-gray-900);
}

.dyn-step__description {
  font-size: var(--dyn-typography-fontSize-xs);
  color: var(--dyn-color-gray-600);
}

.dyn-step__optional {
  font-size: var(--dyn-typography-fontSize-xs);
  color: var(--dyn-color-gray-500);
  font-style: italic;
}
```

#### ✅ Definition of Done

- [ ] TypeScript tipovi definisani i eksportovani
- [ ] Komponenta implementirana sa `forwardRef`
- [ ] Design tokens integrisani (colors, spacing, typography)
- [ ] Storybook stories: Default, Vertical, WithError, RTL, Keyboard
- [ ] Unit tests: render, events, accessibility, keyboard
- [ ] Accessibility tests pass (axe, keyboard navigation)
- [ ] CSS sa CSS variables iz design tokens
- [ ] PR kreiran i review completed

---

### **2. DynFieldContainer**

**Status**: 🔴 STUB (138 bytes)  
**Prioritet**: P0-CRITICAL  
**Trajanje**: 1-2 dana  
**Kompleksnost**: SREDNJA-VISOKA

#### 📝 Šta Treba Korigovati

**A. TypeScript Tipovi**

```typescript
export interface DynFieldContainerProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
  // Design tokens
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
}
```

**B. Komponenta Implementacija**

```typescript
export const DynFieldContainer = forwardRef<HTMLDivElement, DynFieldContainerProps>(
  ({ label, description, error, required, optional, children, htmlFor, ...props }, ref) => {
    const theme = useTheme();
    const hasError = !!error;
    
    return (
      <div
        ref={ref}
        className={`dyn-field-container ${hasError ? 'dyn-field-container--error' : ''}`}
        {...props}
      >
        {label && (
          <label htmlFor={htmlFor} className="dyn-field-container__label">
            {label}
            {required && <span className="dyn-field-container__required">*</span>}
            {optional && <span className="dyn-field-container__optional">(optional)</span>}
          </label>
        )}
        
        {description && (
          <div className="dyn-field-container__description">{description}</div>
        )}
        
        <div className="dyn-field-container__field">
          {children}
        </div>
        
        {error && (
          <div className="dyn-field-container__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);
```

**C. Stories**

```typescript
export const WithError: Story = {
  render: () => (
    <DynFieldContainer
      label="Email"
      required
      error="Invalid email address"
    >
      <DynInput type="email" />
    </DynFieldContainer>
  )
};
```

**D. Tests**

```typescript
it('displays error message', () => {
  render(
    <DynFieldContainer error="Field is required">
      <input />
    </DynFieldContainer>
  );
  
  expect(screen.getByRole('alert')).toHaveTextContent('Field is required');
});
```

#### ✅ Definition of Done

- [ ] TypeScript tipovi
- [ ] Komponenta sa label, description, error support
- [ ] Stories: Default, WithError, Required, Optional
- [ ] Tests: render, error display, required indicator
- [ ] Accessibility: proper label/input association, error announcements
- [ ] CSS sa design tokens

---

### **3. DynIcon**

**Status**: 🔴 STUB (75 bytes)  
**Prioritet**: P0-CRITICAL  
**Trajanje**: 1-2 dana  
**Kompleksnost**: SREDNJA

#### 📝 Šta Treba Korigovati

**A. Icon Dictionary** (`packages/icons/src/icons.ts`)

```typescript
export const icons = {
  check: '<svg>...</svg>',
  close: '<svg>...</svg>',
  info: '<svg>...</svg>',
  warning: '<svg>...</svg>',
  error: '<svg>...</svg>',
  // ... more icons
} as const;

export type IconName = keyof typeof icons;
```

**B. TypeScript Tipovi**

```typescript
export interface DynIconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  className?: string;
  'aria-label'?: string;
}
```

**C. Komponenta**

```typescript
export const DynIcon = forwardRef<SVGSVGElement, DynIconProps>(
  ({ name, size = 'md', color, className, ...props }, ref) => {
    const theme = useTheme();
    const iconSvg = icons[name];
    
    const sizeMap = {
      sm: 16,
      md: 24,
      lg: 32
    };
    
    const pixelSize = typeof size === 'number' ? size : sizeMap[size];
    
    return (
      <svg
        ref={ref}
        width={pixelSize}
        height={pixelSize}
        fill={color || 'currentColor'}
        className={`dyn-icon ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: iconSvg }}
        {...props}
      />
    );
  }
);
```

#### ✅ Definition of Done

- [ ] Icon dictionary sa 20+ osnovnih ikona
- [ ] TypeScript tipovi sa IconName type
- [ ] Komponenta sa size i color support
- [ ] Stories: AllIcons, Sizes, Colors
- [ ] Tests: render, size, color
- [ ] Accessibility: aria-label support

---

## 🔄 **FAZA 1: Refaktorizacija Kompleksnih Komponenti**

Nakon što su stub komponente završene, prelazimo na refaktorizaciju postojećih kompleksnih komponenti:

---

### **4. DynSelect / DynSelectOption**

**Status**: 🟡 IMPLEMENTIRANA (9794 bytes) - Treba Refaktorisati  
**Prioritet**: P1-HIGH  
**Trajanje**: 2 dana  
**Kompleksnost**: VISOKA

#### 📝 Šta Treba Korigovati

**A. Design Tokens Integracija**

```typescript
// Replace hardcoded colors:
// OLD: background: '#f0f0f0'
// NEW: background: theme.colors.gray[100]
```

**B. TypeScript Props Enhancement**

```typescript
export interface DynSelectProps<T = any> {
  // ... existing props
  // Add design token variants:
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
}
```

**C. Missing Tests**

```typescript
// Add tests for:
// - Multi-select
// - Search functionality
// - Keyboard navigation (Arrow keys, Enter, Escape)
// - Virtual scrolling
// - Accessibility
```

**D. Stories Enhancement**

```typescript
// Add stories:
export const MultiSelect: Story = { ... };
export const WithSearch: Story = { ... };
export const VirtualScrolling: Story = { ... };
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    // Interaction testing
  }
};
```

#### ✅ Definition of Done

- [ ] Refaktorisati sve hardcoded vrednosti sa design tokens
- [ ] Dodati nedostajuće testove (80%+ coverage)
- [ ] Dopuniti stories (multi-select, search, keyboard)
- [ ] Accessibility audit (axe, keyboard navigation)
- [ ] TypeScript props enhancement

---

### **5. DynTabs / DynTab / DynTabPanel**

**Status**: 🟡 IMPLEMENTIRANA (9349 bytes) - Treba Dopuniti  
**Prioritet**: P1-HIGH  
**Trajanje**: 1-2 dana  
**Kompleksnost**: SREDNJA-VISOKA

#### 📝 Šta Treba Korigovati

**A. Design Tokens**

```css
/* Replace: */
.dyn-tab--active {
  border-bottom: 2px solid #3b82f6; /* ❌ */
}

/* With: */
.dyn-tab--active {
  border-bottom: 2px solid var(--dyn-color-primary-500); /* ✅ */
}
```

**B. Missing Tests**

```typescript
it('supports keyboard navigation with Arrow keys', () => {
  // Test Left/Right arrow navigation
});

it('activates tab on Enter/Space', () => {
  // Test keyboard activation
});
```

**C. Stories Enhancement**

```typescript
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab(); // Focus first tab
    await userEvent.keyboard('{ArrowRight}'); // Navigate
    // Assert tab changed
  }
};
```

#### ✅ Definition of Done

- [ ] Design tokens integracija
- [ ] Keyboard navigation tests
- [ ] Interaction stories (play funkcije)
- [ ] Accessibility review

---

### **6-10. Ostale Komponente** (DynRadioGroup, DynTreeView, DynTable, DynInput, DynButton)

**Isti pattern kao za DynSelect i DynTabs:**

1. Design tokens refaktorizacija
2. Dodavanje testova (80%+)
3. Storybook enhancement
4. Accessibility audit

---

## 📊 **Milestones i Timeline**

### **Sprint 1 (Sedmica 1): STUB Komponente**

- Dan 1-3: DynStepper (implementation + tests + stories)
- Dan 4-5: DynFieldContainer + DynIcon
- **Milestone**: Svi stubovi završeni, 100% test coverage

### **Sprint 2 (Sedmica 2): Refaktorizacija Top 5**

- Dan 1-2: DynSelect refactor
- Dan 3-4: DynTabs refactor
- Dan 5: DynRadioGroup + DynTreeView
- **Milestone**: Top 5 komponenti sa design tokens, 80%+ coverage

### **Sprint 3 (Sedmica 3): Preostale Komponente**

- Dan 1-5: DynTable, DynInput, DynButton, DynCheckbox, ostale
- **Milestone**: Sve komponente refaktorisane

### **Sprint 4 (Sedmica 4): QA i Dokumentacija**

- Dan 1-2: CI/CD stabilizacija
- Dan 3-4: Storybook polish, API docs
- Dan 5: Final QA, NPM publish prep
- **Milestone**: 100% Production-Ready

---

## 🎯 **Success Metrics**

| Metrika | Trenutno | Cilj |
|---------|----------|------|
| Stub Components | 3/3 prazne | 3/3 implementirane |
| Test Coverage | ~40% | 80%+ |
| Design Tokens | 0% integracija | 100% integracija |
| Accessibility | 60% | 95% |
| Stories | 50% | 100% |
| Production Ready | 67% | 100% |

---

## ✅ **Definition of Done za Svaku Komponentu**

1. ✅ TypeScript tipovi definisani i eksportovani
2. ✅ Komponenta implementirana sa `forwardRef`
3. ✅ Design tokens integrisani (colors, spacing, typography, radius)
4. ✅ Storybook stories: Default, Variants, States, Error, RTL, Keyboard
5. ✅ Unit tests: render, props, events
6. ✅ Integration tests (gde aplikativno)
7. ✅ Accessibility tests: axe, keyboard navigation, ARIA
8. ✅ CSS sa CSS variables iz design tokens
9. ✅ PR kreiran, reviewed, i merged

---

**Sledeći korak**: Kreiranje `feat/dyn-stepper-implementation` branch-a i početak implementacije DynStepper komponente! 🚀
