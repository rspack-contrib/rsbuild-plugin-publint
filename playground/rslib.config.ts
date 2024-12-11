import { defineConfig } from '@rslib/core';
import { pluginPublint } from '../src';

export default defineConfig({
  plugins: [pluginPublint()],
  lib: [{ format: 'esm' }],
});
