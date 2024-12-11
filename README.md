# rsbuild-plugin-publint

Use [publint](https://github.com/bluwy/publint) to lint npm packages after the build.

<p>
  <a href="https://npmjs.com/package/rsbuild-plugin-publint">
   <img src="https://img.shields.io/npm/v/rsbuild-plugin-publint?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/rsbuild-plugin-publint?minimal=true"><img src="https://img.shields.io/npm/dm/rsbuild-plugin-publint.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## Preview

`rsbuild-plugin-publint` is the perfect partner for [Rslib](https://github.com/web-infra-dev/rslib). When building a library, publint helps you to lint the npm package and give suggestions to improve its compatibility with different environments.

![Preview](https://github.com/user-attachments/assets/bb6940df-ab15-4155-bdf5-03b7bae5458f)

## Usage

Install:

```bash
npm add rsbuild-plugin-publint -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// `rslib.config.ts` or `rsbuild.config.ts`
import { pluginPublint } from "rsbuild-plugin-publint";

export default {
  plugins: [pluginPublint()],
};
```

## Options

### publintOptions

Options for publint. See [publint - API](https://github.com/bluwy/publint/blob/master/pkg/README.md#api) for more details.

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
    level: "error",
  },
});
```

## License

[MIT](./LICENSE).
