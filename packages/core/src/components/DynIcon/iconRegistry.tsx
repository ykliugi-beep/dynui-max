import React from 'react';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * Icon registry for managing SVG icon components
 * Allows dynamic registration and retrieval of icons
 */
class IconRegistry {
  private icons = new Map<string, IconComponent>();

  /**
   * Register an icon component
   */
  register(name: string, component: IconComponent) {
    this.icons.set(name, component);
  }

  /**
   * Register multiple icons at once
   */
  registerMany(icons: Record<string, IconComponent>) {
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

const createStrokeIcon = (children: React.ReactNode, viewBox = '0 0 24 24'): IconComponent =>
  (props) => (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );

const createFillIcon = (children: React.ReactNode, viewBox = '0 0 24 24'): IconComponent =>
  (props) => (
    <svg viewBox={viewBox} fill="currentColor" {...props}>
      {children}
    </svg>
  );

const CheckIcon = createFillIcon(
  <path
    fillRule="evenodd"
    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    clipRule="evenodd"
  />,
  '0 0 20 20'
);

const ChevronDownIcon = createFillIcon(
  <path
    fillRule="evenodd"
    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    clipRule="evenodd"
  />,
  '0 0 20 20'
);

const XIcon = createFillIcon(
  <path
    fillRule="evenodd"
    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    clipRule="evenodd"
  />,
  '0 0 20 20'
);

const SpinnerIcon: IconComponent = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <circle
      cx="10"
      cy="10"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="32"
      strokeDashoffset="32"
    >
      <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite" />
    </circle>
  </svg>
);

const ArrowRightIcon = createStrokeIcon([
  <path key="shaft" d="M5 12h14" />, 
  <path key="head" d="M13 6l6 6-6 6" />
]);

const ChevronRightIcon = createStrokeIcon(<path d="M9 5l7 7-7 7" />);

const ChevronsUpDownIcon = createStrokeIcon([
  <path key="up" d="M7 15l5 5 5-5" />, 
  <path key="down" d="M7 9l5-5 5 5" />
]);

const PlusIcon = createStrokeIcon([
  <path key="vertical" d="M12 5v14" />, 
  <path key="horizontal" d="M5 12h14" />
]);

const EditIcon = createStrokeIcon([
  <path key="body" d="M4 20h4l11-11a1.5 1.5 0 00-2.121-2.121L5.879 17.879 4 20z" fill="currentColor" stroke="none" />, 
  <path key="outline" d="M14 4l3 3" />
]);

const FolderIcon = createFillIcon(
  <path d="M3 5a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a3 3 0 01-3 3H5a2 2 0 01-2-2V5z" />
);

const FileIcon = createFillIcon([
  <path key="body" d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z" />,
  <path key="corner" d="M14 2l6 6h-6V2z" />
]);

const ImageIcon = createStrokeIcon([
  <rect key="frame" x="4" y="4" width="16" height="16" rx="2" />, 
  <circle key="sun" cx="9" cy="9" r="2.5" />, 
  <path key="mountain" d="M21 20l-6-6-5 5-3-3-4 4" />
]);

const PaletteIcon = createStrokeIcon([
  <circle key="outline" cx="12" cy="12" r="9" />, 
  <circle key="swatch1" cx="8.5" cy="8" r="1.25" />, 
  <circle key="swatch2" cx="12" cy="6.5" r="1.25" />, 
  <circle key="swatch3" cx="15.5" cy="10" r="1.25" />, 
  <circle key="swatch4" cx="10" cy="15" r="1.25" />
]);

const LayoutIcon = createStrokeIcon([
  <rect key="top" x="4" y="4" width="16" height="6" rx="1" />, 
  <rect key="left" x="4" y="12" width="7" height="8" rx="1" />, 
  <rect key="right" x="13" y="12" width="7" height="8" rx="1" />
]);

const MenuIcon = createStrokeIcon([
  <path key="line1" d="M4 7h16" />, 
  <path key="line2" d="M4 12h16" />, 
  <path key="line3" d="M4 17h16" />
]);

const SettingsIcon = createStrokeIcon([
  <circle key="hub" cx="12" cy="12" r="3" />, 
  <path
    key="ring"
    d="M19.4 15a2 2 0 00.4 2.18l.06.06a2 2 0 11-2.83 2.83l-.06-.06a2 2 0 00-2.18-.4 2 2 0 00-1.23 1.84V21a2 2 0 11-4 0v-.55a2 2 0 00-1.23-1.84 2 2 0 00-2.18.4l-.06.06a2 2 0 11-2.83-2.83l.06-.06a2 2 0 00.4-2.18 2 2 0 00-1.84-1.23H3a2 2 0 110-4h.55a2 2 0 001.84-1.23 2 2 0 00-.4-2.18l-.06-.06a2 2 0 112.83-2.83l.06.06a2 2 0 002.18.4 2 2 0 001.23-1.84V3a2 2 0 114 0v.55a2 2 0 001.23 1.84 2 2 0 002.18-.4l.06-.06a2 2 0 112.83 2.83l-.06.06a2 2 0 00-.4 2.18 2 2 0 001.84 1.23H21a2 2 0 110 4h-.55a2 2 0 00-1.84 1.23z"
  />
]);

const UploadIcon = createStrokeIcon([
  <path key="arrow" d="M12 19V5" />, 
  <path key="head" d="M7 10l5-5 5 5" />, 
  <path key="base" d="M5 19h14" />
]);

const SearchIcon = createStrokeIcon([
  <circle key="lens" cx="11" cy="11" r="6" />, 
  <path key="handle" d="M20 20l-3-3" />
]);

const UsersIcon = createStrokeIcon([
  <path key="group" d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />, 
  <circle key="head-main" cx="9" cy="7" r="4" />, 
  <path key="companion-group" d="M23 21v-2a4 4 0 00-3-3.87" />, 
  <path key="companion-head" d="M16 3.13a4 4 0 110 7.75" />
]);

const CodeIcon = createStrokeIcon([
  <path key="left" d="M8 7l-5 5 5 5" />, 
  <path key="right" d="M16 7l5 5-5 5" />, 
  <path key="slash" d="M13 6l-2 12" />
]);

const SunIcon = createStrokeIcon([
  <circle key="center" cx="12" cy="12" r="4" />, 
  <path key="top" d="M12 2v2" />, 
  <path key="bottom" d="M12 20v2" />, 
  <path key="left" d="M4.93 4.93l1.41 1.41" />, 
  <path key="right" d="M17.66 17.66l1.41 1.41" />, 
  <path key="mid-left" d="M2 12h2" />, 
  <path key="mid-right" d="M20 12h2" />, 
  <path key="bottom-left" d="M4.93 19.07l1.41-1.41" />, 
  <path key="top-right" d="M17.66 6.34l1.41-1.41" />
]);

const MoonIcon = createFillIcon(
  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
);

const defaultIcons: Record<string, IconComponent> = {
  check: CheckIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-right': ChevronRightIcon,
  'chevrons-up-down': ChevronsUpDownIcon,
  x: XIcon,
  spinner: SpinnerIcon,
  folder: FolderIcon,
  file: FileIcon,
  image: ImageIcon,
  palette: PaletteIcon,
  users: UsersIcon,
  code: CodeIcon,
  layout: LayoutIcon,
  menu: MenuIcon,
  edit: EditIcon,
  plus: PlusIcon,
  'arrow-right': ArrowRightIcon,
  settings: SettingsIcon,
  upload: UploadIcon,
  search: SearchIcon,
  sun: SunIcon,
  moon: MoonIcon
};

iconRegistry.registerMany(defaultIcons);

export { defaultIcons };
