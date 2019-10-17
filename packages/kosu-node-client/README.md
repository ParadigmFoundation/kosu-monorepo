# Node Client

A TypeScript/JavaScript library for interacting with the Kosu order relay network.

**View [the documentation here.](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/node-client/docs/)**

## Installation

The Node Client can be installed into your project through `yarn` or `npm`, and can be passed through `webpack` or `browserify` for usage in the browser.

### Install

**Yarn:**

```
yarn add @kosu/node-client
```

**NPM:**

```
npm install --save @kosu/node-client
```

### Import

Kosu and its exported classes can be imported directly into TypeScript or JavaScript projects.

**TypeScript (and ES6+):**

```typescript
// top-level Kosu class
import { NodeClient } from "@kosu/node-client";
```

**JavaScript (CommonJS):**

```javascript
const { NodeClient } = require("@kosu/node-client");
```

## Development

```
@todo: add contribution guidelines summary and link
```

### Linting

The TypeScript source can be linted with:

```
yarn lint
```

### Building

Build the TypeScript source to distributable JavaScript (CommonJS) as well as source mappings and typing files with:

```
yarn build
```

## License

Open-source software, [MIT licensed.](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/LICENSE)

Copyright (c) 2019 Paradigm Labs, corp.
