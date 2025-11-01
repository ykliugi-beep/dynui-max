import React from 'react';

/**
 * Icon registry for managing SVG icon components
 * Allows dynamic registration and retrieval of icons
 */
class IconRegistry {
  private icons = new Map<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>();

  /**
   * Register an icon component
   */
  register(name: string, component: React.ComponentType<React.SVGProps<SVGSVGElement>>) {
    this.icons.set(name, component);
  }

  /**
   * Register multiple icons at once
   */
  registerMany(icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>) {
    Object.entries(icons).forEach(([name, component]) => {
      this.register(name, component);
    });
  }

  /**
   * Get an icon component by name
   */
  get(name: string) {
    return this.icons.get(name);
  }

  /**
   * Check if an icon is registered
   */
  has(name: string): boolean {
    return this.icons.has(name);
  }

  /**
   * Get all registered icon names
   */
  getNames(): string[] {
    return Array.from(this.icons.keys());
  }

  /**
   * Unregister an icon
   */
  unregister(name: string): boolean {
    return this.icons.delete(name);
  }

  /**
   * Clear all registered icons
   */
  clear() {
    this.icons.clear();
  }
}

// Export singleton instance
export const iconRegistry = new IconRegistry();

// Register default icons
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
      <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite" />
    </circle>
  </svg>
);

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 6a4 4 0 100 8 4 4 0 000-8z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zm0 14a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.222 4.222a1 1 0 011.414 0L6.757 5.34a1 1 0 11-1.414 1.414L4.222 5.636a1 1 0 010-1.414zm9.02 9.02a1 1 0 011.414 0l1.121 1.12a1 1 0 11-1.414 1.415l-1.12-1.121a1 1 0 010-1.414zM1 10a1 1 0 011-1h1a1 1 0 110 2H2a1 1 0 01-1-1zm14-1a1 1 0 100 2h1a1 1 0 100-2h-1zM4.222 15.778a1 1 0 010-1.415l1.121-1.12a1 1 0 111.414 1.414l-1.12 1.121a1 1 0 01-1.415 0zM13.243 5.34a1 1 0 011.414-1.414l1.12 1.121a1 1 0 11-1.414 1.414L13.243 5.34z"
    />
  </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.293 13.293A8 8 0 016.707 2.707a8 8 0 108.586 8.586z"
    />
  </svg>
);

// Register default icons
iconRegistry.registerMany({
  check: CheckIcon,
  'chevron-down': ChevronDownIcon,
  x: XIcon,
  spinner: SpinnerIcon,
  sun: SunIcon,
  moon: MoonIcon
});
