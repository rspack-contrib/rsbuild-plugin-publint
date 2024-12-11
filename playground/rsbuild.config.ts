import { defineConfig } from '@rsbuild/core';
import { pluginPublint } from '../src';

export default defineConfig({
  plugins: [pluginPublint()],
});
