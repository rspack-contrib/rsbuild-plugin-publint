import fs from 'node:fs/promises';
import { join } from 'node:path';
import { type RsbuildPlugin, logger } from '@rsbuild/core';
import color from 'picocolors';
import type { Options } from 'publint';

export type PluginPublintOptions = {
  /**
   * Whether to enable publint.
   * @default true
   */
  enable?: boolean;
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
    const { enable = true } = options;

    if (!enable) {
      return;
    }

    api.onAfterBuild(async () => {
      const { publint } = await import('publint');
      const { formatMessage } = await import('publint/utils');

      const mergedOptions = {
        pkgDir: api.context.rootPath,
        ...options.publintOptions,
      };
      const { messages } = await publint(mergedOptions);

      const pkg = JSON.parse(
        await fs.readFile(join(mergedOptions.pkgDir, 'package.json'), 'utf8'),
      );

      const formatted: Record<string, (string | undefined)[]> = {
        errors: [],
        warnings: [],
        suggestions: [],
      };

      for (const message of messages) {
        if (message.type === 'error') {
          formatted.errors.push(formatMessage(message, pkg));
        } else if (message.type === 'warning') {
          formatted.warnings.push(formatMessage(message, pkg));
        } else {
          formatted.suggestions.push(formatMessage(message, pkg));
        }
      }

      if (
        formatted.errors.length === 0 &&
        formatted.warnings.length === 0 &&
        formatted.suggestions.length === 0
      ) {
        logger.info(color.green('Publint passed.'));
      }

      if (formatted.errors.length > 0) {
        logger.error(
          color.red(
            `Publint found ${color.bold(formatted.errors.length)} errors:`,
          ),
        );
        for (const message of formatted.errors) {
          if (message) {
            logger.error(message);
          }
        }
        // empty line
        console.log();
      }

      if (formatted.warnings.length > 0) {
        logger.warn(
          color.yellow(
            `Publint found ${color.bold(formatted.warnings.length)} warnings:`,
          ),
        );
        for (const message of formatted.warnings) {
          if (message) {
            logger.warn(message);
          }
        }
        // empty line
        console.log();
      }

      if (formatted.suggestions.length > 0) {
        logger.info(
          color.cyan(
            `Publint found ${color.bold(formatted.suggestions.length)} suggestions:`,
          ),
        );
        for (const message of formatted.suggestions) {
          if (message) {
            logger.info(message);
          }
        }
      }

      if (formatted.errors.length > 0) {
        throw new Error('Publint failed!');
      }
    });
  },
});
