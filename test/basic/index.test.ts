import { stripVTControlCharacters as stripAnsi } from 'node:util';
import { expect, test } from '@playwright/test';
import { createRsbuild } from '@rsbuild/core';
import { pluginPublint } from '../../src';
import { proxyConsole } from '../helper';

const getPublintLogs = (logs: string[]) => {
  const result: string[] = [];

  for (const log of logs) {
    if (log && (log.includes('Publint') || result.length > 0)) {
      result.push(stripAnsi(log));
    }
  }
  return result;
};

test('should run publint as expected', async () => {
  const { logs, restore } = proxyConsole();

  const rsbuild = await createRsbuild({
    cwd: __dirname,
    rsbuildConfig: {
      plugins: [pluginPublint()],
    },
  });

  await expect(rsbuild.build()).rejects.toThrowError('Publint failed!');

  expect(getPublintLogs(logs)).toEqual([
    'error   Publint found 3 errors:',
    'error   pkg.exports["."].types should be the first in the object as required by TypeScript.',
    'error   pkg.exports["."].import is ./dist/index.js but the file does not exist.',
    'error   pkg.exports["."].types is ./dist/index.d.ts but the file does not exist.',
    'warn    Publint found 1 warnings:',
    `warn    pkg.repository.url is git@github.com:test/test.git which isn't a valid git URL. A valid git URL is usually in the form of "git+https://example.com/user/repo.git".`,
    'info    Publint found 1 suggestions:',
    'info    The package does not specify the "type" field. NodeJS may attempt to detect the package type causing a small performance hit. Consider adding "type": "commonjs".',
  ]);

  restore();
});

test('should allow to pass publint options', async () => {
  const { logs, restore } = proxyConsole();

  const rsbuild = await createRsbuild({
    cwd: __dirname,
    rsbuildConfig: {
      plugins: [
        pluginPublint({
          publintOptions: {
            level: 'error',
          },
        }),
      ],
    },
  });

  await expect(rsbuild.build()).rejects.toThrowError('Publint failed!');

  expect(getPublintLogs(logs)).toEqual([
    'error   Publint found 3 errors:',
    'error   pkg.exports["."].types should be the first in the object as required by TypeScript.',
    'error   pkg.exports["."].import is ./dist/index.js but the file does not exist.',
    'error   pkg.exports["."].types is ./dist/index.d.ts but the file does not exist.',
  ]);

  restore();
});

test('should allow to disable publint', async () => {
  const rsbuild = await createRsbuild({
    cwd: __dirname,
    rsbuildConfig: {
      plugins: [
        pluginPublint({
          enable: false,
        }),
      ],
    },
  });

  await expect(rsbuild.build()).resolves.toBeTruthy();
});
