import { type ComponentType, type SVGProps, forwardRef } from 'react';

/**
 * Icon registry for managing SVG icon components
 * Allows dynamic registration and retrieval of icons
 */
class IconRegistry {
  private icons = new Map<string, ComponentType<SVGProps<SVGSVGElement>>>();

  /**
   * Register an icon component
   */
  register(name: string, component: ComponentType<SVGProps<SVGSVGElement>>) {
    this.icons.set(name, component);
  }

  /**
   * Register multiple icons at once
   */
  registerMany(icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>>) {
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

const ArrowRightIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
));

const CheckIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m20 6-11 11-4-4" />
  </svg>
));

const ChevronDownIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
));

const ChevronRightIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m9 6 6 6-6 6" />
  </svg>
));

const ChevronUpIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m18 15-6-6-6 6" />
  </svg>
));

const ChevronsUpDownIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
));

const CodeIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14 4-4 16" />
  </svg>
));

const EditIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 20h9" />
    <path d="m16.5 3.5 4 4-11 11-4 1 1-4 11-11z" />
  </svg>
));

const FileIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
));

const FolderIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 7h5l2 3h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
  </svg>
));

const ImageIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x={3} y={5} width={18} height={14} rx={2} ry={2} />
    <circle cx={8.5} cy={9.5} r={1.5} />
    <path d="m21 15-4.5-4.5-5 5" />
    <path d="m8 17-2-2-3 3" />
  </svg>
));

const LayoutIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x={3} y={4} width={18} height={16} rx={2} ry={2} />
    <path d="M9 4v16" />
    <path d="M3 10h18" />
  </svg>
));

const MenuIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
));

const MoonIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
));

const PaletteIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a4 4 0 1 1 0-8h1a2 2 0 0 0 0-4Z" />
    <circle cx={7.5} cy={10.5} r={1} />
    <circle cx={9.5} cy={6.5} r={1} />
    <circle cx={14.5} cy={7.5} r={1} />
    <circle cx={16.5} cy={11.5} r={1} />
  </svg>
));

const PlusIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
));

const SearchIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx={11} cy={11} r={7} />
    <path d="m20 20-3-3" />
  </svg>
));

const SettingsIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx={12} cy={12} r={3} />
    <line x1={12} y1={3} x2={12} y2={5} />
    <line x1={12} y1={19} x2={12} y2={21} />
    <line x1={3} y1={12} x2={5} y2={12} />
    <line x1={19} y1={12} x2={21} y2={12} />
    <line x1={5.6} y1={5.6} x2={7} y2={7} />
    <line x1={17} y1={17} x2={18.4} y2={18.4} />
    <line x1={5.6} y1={18.4} x2={7} y2={17} />
    <line x1={17} y1={7} x2={18.4} y2={5.6} />
  </svg>
));

const SpinnerIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeDasharray="60" strokeDashoffset="60">
      <animate attributeName="stroke-dasharray" dur="1.5s" values="0 60;30 30;0 60;0 60" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" dur="1.5s" values="0;-30;-60;-60" repeatCount="indefinite" />
    </circle>
  </svg>
));

const SunIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx={12} cy={12} r={4} />
    <line x1={12} y1={2} x2={12} y2={4} />
    <line x1={12} y1={20} x2={12} y2={22} />
    <line x1={4.93} y1={4.93} x2={6.34} y2={6.34} />
    <line x1={17.66} y1={17.66} x2={19.07} y2={19.07} />
    <line x1={2} y1={12} x2={4} y2={12} />
    <line x1={20} y1={12} x2={22} y2={12} />
    <line x1={4.93} y1={19.07} x2={6.34} y2={17.66} />
    <line x1={17.66} y1={6.34} x2={19.07} y2={4.93} />
  </svg>
));

const UploadIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
    <path d="m7 10 5-5 5 5" />
    <path d="M12 5v12" />
  </svg>
));

const UsersIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx={9} cy={7} r={3} />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
));

const XIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m18 6-12 12" />
    <path d="m6 6 12 12" />
  </svg>
));

export const defaultIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'arrow-right': ArrowRightIcon,
  check: CheckIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  'chevrons-up-down': ChevronsUpDownIcon,
  code: CodeIcon,
  edit: EditIcon,
  file: FileIcon,
  folder: FolderIcon,
  image: ImageIcon,
  layout: LayoutIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  palette: PaletteIcon,
  plus: PlusIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  spinner: SpinnerIcon,
  sun: SunIcon,
  upload: UploadIcon,
  users: UsersIcon,
  x: XIcon
};

// Register default icons
iconRegistry.registerMany(defaultIcons);
