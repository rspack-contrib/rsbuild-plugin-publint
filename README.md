# rsbuild-plugin-publint

Use [publint](https://github.com/bluwy/publint) to lint npm packages after build.

<p>
  <a href="https://npmjs.com/package/rsbuild-plugin-publint">
   <img src="https://img.shields.io/npm/v/rsbuild-plugin-publint?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/rsbuild-plugin-publint?minimal=true"><img src="https://img.shields.io/npm/dm/rsbuild-plugin-publint.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## Usage

Install:

```bash
npm add rsbuild-plugin-publint -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginPublint } from "rsbuild-plugin-publint";

export default {
  plugins: [pluginPublint()],
};
```

## Options

### publintOptions

Options for publint.

- Type: `import('publint').Options`
- Default:

```js
const defaultOptions = {
  pkgDir: api.context.rootPath,
};
```

- Example:

```js
pluginPublint({
  publintOptions: {
    rules: {
      level: "error",
    },
  },
});
```

## License

[MIT](./LICENSE).
