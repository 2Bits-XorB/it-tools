import fs from 'node:fs';
import antfu from '@antfu/eslint-config';

const autoImports = JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json', 'utf8'));

export default antfu(
  { vue: true, typescript: true, stylistic: { semi: true } },
  { languageOptions: { globals: autoImports.globals } },
  {
    rules: {
      '@typescript-eslint/no-use-before-define': ['error', { allowNamedExports: true, functions: false }],
      'unused-imports/no-unused-vars': 'off',
      'no-restricted-imports': ['error', {
        paths: [{ name: '@vueuse/core', importNames: ['useClipboard'], message: 'use local useCopy' }],
      }],
      'vue/no-empty-component-block': ['error'],
      'regexp/no-unused-capturing-group': 'off',
      'regexp/no-obscure-range': 'off',
      'regexp/no-dupe-characters-character-class': 'off',
      'regexp/no-potentially-useless-backreference': 'off',
      'regexp/no-empty-alternative': 'off',
      'unicorn/prefer-dom-node-text-content': 'off',
    },
  },
);
