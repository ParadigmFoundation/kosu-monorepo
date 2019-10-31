# Wrapper Enhancemnts

A TypeScript/JavaScript library for assistance with interactions with the Kosu contract system wrappers. This library simplifies and chains complex multi-step contract interactions.

**View [the documentation here.](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-wrapper-enhancements/docs/)**

## Installation

`@kosu/wrapper-enhancements` can be installed into your project through `yarn` or `npm`, and can be passed through `webpack` or `browserify` for usage in the browser.

### Install

**Yarn:**

```
yarn add @kosu/wrapper-enhancements
```

**NPM:**

```
npm install --save @kosu/wrapper-enhancements
```

### Import

Kosu and its exported classes can be imported directly into TypeScript or JavaScript projects.

**TypeScript (and ES6+):**

```typescript
// directly access exported classes/utilities
import {
    // contract wrapper classes
    KosuToken,
    OrderGateway,
    PosterRegistry,
    Treasury,
    ValidatorRegistry,
    Voting,
} from "@kosu/wrapper-enhancements";
```

**JavaScript (CommonJS):**

```javascript
const {
    KosuToken,
    OrderGateway,
    PosterRegistry,
    Treasury,
    ValidatorRegistry,
    Voting,
} = require("@kosu/wrapper-enhancements");
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
