import StyleDictionary from 'style-dictionary';

export const dynKebabTransform = {
  name: 'name/cti/dyn-kebab',
  type: 'name',
  transform: (token) => `dyn-${token.path.join('-')}`
};

export const sizeRemTransform = {
  name: 'size/px-to-rem',
  type: 'value',
  filter: (token) => token.attributes?.category === 'size' && typeof token.value === 'string' && token.value.endsWith('px'),
  transform: (token) => `${parseFloat(token.value) / 16}rem`
};

export const fontFamilyTransform = {
  name: 'font/family/css',
  type: 'value',
  filter: (token) => token.attributes?.category === 'font' && token.attributes?.type === 'family',
  transform: (token) => token.value
};

export function registerCustomTransforms() {
  StyleDictionary.registerTransform(dynKebabTransform);
  StyleDictionary.registerTransform(sizeRemTransform);
  StyleDictionary.registerTransform(fontFamilyTransform);
}

export const dynCssTransformGroup = {
  name: 'dyn/css',
  transforms: [
    'attribute/cti',
    'name/cti/dyn-kebab',
    'time/seconds',
    'size/px-to-rem',
    'font/family/css',
    'color/hex'
  ]
};

export function registerCustomTransformGroups() {
  StyleDictionary.registerTransformGroup(dynCssTransformGroup);
}

export function initializeCustomTransforms() {
  registerCustomTransforms();
  registerCustomTransformGroups();
}
