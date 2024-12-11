import { logger, type RsbuildPlugin } from '@rsbuild/core';
import { publint, type Options } from 'publint';
import { formatMessage } from 'publint/utils';
import fs from 'node:fs/promises';
import { join } from 'node:path';

export type PluginPublintOptions = {
  /**
   * Options for publint.
   * @see https://github.com/bluwy/publint/blob/master/pkg/README.md#api
   */
  publintOptions?: Options;
};

export const pluginPublint = (
  options: PluginPublintOptions = {},
): RsbuildPlugin => ({
  name: 'plugin-publint',

  setup(api) {
    api.onAfterBuild(async () => {
      const mergedOptions = {
        pkgDir: api.context.rootPath,
        ...options.publintOptions,
      };
      const { messages } = await publint(mergedOptions);

      const pkg = JSON.parse(
        await fs.readFile(join(mergedOptions.pkgDir, 'package.json'), 'utf8'),
      );

      let hasError = false;

      for (const message of messages) {
        if (message.type === 'error') {
          logger.error(`[publint] ${formatMessage(message, pkg)}`);
          hasError = true;
        } else {
          logger.warn(`[publint] ${formatMessage(message, pkg)}`);
        }
      }

      if (hasError) {
        process.exit(1);
      }
    });
  },
});
