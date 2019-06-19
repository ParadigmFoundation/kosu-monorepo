# Kosu documentation site
Documentation for the Kosu protocol. Includes libraries, contract system, and client implementation.

Built as a VuePress static documentation portal, using a custom theme.

## Development

### Requirements

To develop and work with this package, the following is required:
- Node (`^8`)
- Yarn (`^1.15`)
- gsutil (`^4.30`)

### Install

Clone the repository, and install dependencies with yarn:

```bash
yarn install # or just 'yarn'
```

This will load the latest documentation as well assuming `gsutil` is installed (see below).

### Content loading

The markdown documentation files are loaded from the `kosu-monorepo` build artifacts via a remote storage bucket.

By default, the latest docs from the master branch are loaded as part of the dependency installation. It can also be triggered manually:

```bash
# via yarn
yarn load

# manually
./load.sh

# force alternate shell
cat load.sh | sh -
```

### Development server

To start a live-updating development server with the current local config:

```bash
# start server on http://localhost:8080
yarn dev 
```

### Production build

To perform a production build locally, and generate static assets at `docs/.vuepress/dist`:

```
yarn build
```

## Deploy

The docs site is built and deployed to [`docs.kosu.io`](https://docs.kosu.io) with each commit/merge to master by Google Cloud Build, so please test production builds prior to merging to master.