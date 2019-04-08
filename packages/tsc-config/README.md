# @kosu/tsc-config
Base `typescript` compiler configuration used by Paradigm Labs for TypeScript `kuso` projects.

## Installation

Install locally in your project (ensure you have `typescript` installed as well).

```bash
$ yarn add --dev @kuso/tsc-config
```

## Usage
Add the following to your `tsconfig.json` file. Ensuring you add `baseUrl` and `ourDir` to `compilerOptions` for your project. Additionally extend as necessary.

```json
{
    "extends": "@kuso/tsc-config"
}
```