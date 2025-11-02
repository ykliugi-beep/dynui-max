import StyleDictionary from 'style-dictionary';

/**
 * Custom transforms for DynUI-Max design tokens
 * These transforms enhance the built-in Style Dictionary transforms
 */

// Custom name transform for DynUI CSS variables
export const dynKebabTransform = {
  name: 'name/cti/dyn-kebab',
  type: 'name',
  transform: (token) => {
    const path = Array.isArray(token.path) ? [...token.path] : [];

    if (path[0] === 'size' && path[1] === 'spacing') {
      const spacingParts = path.slice(2);
      return ['dyn', 'spacing', ...spacingParts].filter(Boolean).join('-');
    }

    if (path[0] === 'size' && path[1] === 'radius') {
      const radiusParts = path.slice(2);
      return ['dyn', 'radius', ...radiusParts].filter(Boolean).join('-');
    }

    if (path[0] === 'font') {
      const typographyMap = {
        size: 'fontSize',
        weight: 'fontWeight',
        family: 'fontFamily',
        lineHeight: 'lineHeight'
      };
      const typeKey = typographyMap[path[1]] ?? path[1];
      const typographyParts = path.slice(2);
      return ['dyn', 'typography', typeKey, ...typographyParts]
        .filter(Boolean)
        .join('-');
    }

    if ((path[0] === 'z' && path[1] === 'index') || path[0] === 'zIndex') {
      const zParts = path[0] === 'z' ? path.slice(2) : path.slice(1);
      return ['dyn', 'zIndex', ...zParts].filter(Boolean).join('-');
    }

    return ['dyn', ...path].filter(Boolean).join('-');
  }
};

// Custom size transform that preserves rem values
export const sizeRemTransform = {
  name: 'size/px-to-rem',
  type: 'value',
  filter: (token) => {
    return token.attributes?.category === 'size' &&
           typeof token.value === 'string' &&
           token.value.endsWith('px');
  },
  transform: (token) => {
    const pxValue = parseFloat(token.value);
    return `${pxValue / 16}rem`;
  }
};

// Custom transform for font family arrays
export const fontFamilyTransform = {
  name: 'font/family/css',
  type: 'value',
  filter: (token) => {
    return token.attributes?.category === 'font' &&
           token.attributes?.type === 'family';
  },
  transform: (token) => {
    // Font family is already a string in our JSON, just return it
    return token.value;
  }
};

// Register all transforms
export function registerCustomTransforms() {
  StyleDictionary.registerTransform(dynKebabTransform);
  StyleDictionary.registerTransform(sizeRemTransform);
  StyleDictionary.registerTransform(fontFamilyTransform);
}

// Custom transform groups
export const dynCssTransformGroup = {
  name: 'dyn/css',
  transforms: [
    'attribute/cti',          // Built-in: adds category/type/item attributes
    'name/cti/dyn-kebab',     // Custom: dyn- prefixed kebab-case names
    'time/seconds',           // Built-in: converts time to seconds
    'html/icon',              // Built-in: wraps icon values in quotes
    'size/px-to-rem',         // Custom: converts px to rem
    'font/family/css',        // Custom: formats font families
    'color/hex'               // Built-in: ensures colors are hex
  ]
};

export function registerCustomTransformGroups() {
  StyleDictionary.registerTransformGroup(dynCssTransformGroup);
}

// Initialize all custom transforms and groups
export function initializeCustomTransforms() {
  registerCustomTransforms();
  registerCustomTransformGroups();
}