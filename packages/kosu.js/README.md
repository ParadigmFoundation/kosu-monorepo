# Kosu.js

A TypeScript/JavaScript library for interacting with the Kosu contract system and order relay network.

**View [the documentation here.](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu.js/docs/)**

## Installation

Kosu.js can be installed into your project through `yarn` or `npm`, and can be passed through `webpack` or `browserify` for usage in the browser.

### Install

**Yarn:**

```
yarn add @kosu/kosu.js
```

**NPM:**

```
npm install --save @kosu/kosu.js
```

### Import

Kosu and its exported classes can be imported directly into TypeScript or JavaScript projects.

**TypeScript (and ES6+):**

```typescript
// top-level Kosu class
import { Kosu } from "@kosu/kosu.js";

// directly access exported classes/utilities
import {
    // contract wrapper classes
    KosuToken,
    OrderGateway,
    PosterRegistry,
    Treasury,
    ValidatorRegistry,
    Voting,

    // utils/classes and constants
    OrderSerializer,
    OrderHelper,
    Signature,
    toBytes32
    NULL_ADDRESS,
} from "@kosu/kosu.js";
```

**JavaScript (CommonJS):**

```javascript
const { Kosu } = require("@kosu/kosu.js");

const {
    KosuToken,
    OrderGateway,
    PosterRegistry,
    Treasury,
    ValidatorRegistry,
    Voting,

    OrderSerializer,
    OrderHelper,
    Signature,
    toBytes32
    NULL_ADDRESS,
} = require("@kosu/kosu.js");
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
