import type { RsbuildPlugin } from '@rsbuild/core';

export type PluginPublintOptions = {
  foo?: string;
  bar?: boolean;
};

export const pluginPublint = (
  options: PluginPublintOptions = {},
): RsbuildPlugin => ({
  name: 'plugin-publint',

  setup() {
    console.log('Hello Rsbuild!', options);
  },
});
