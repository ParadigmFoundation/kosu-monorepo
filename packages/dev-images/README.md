# `@kosu/dev-images`

Development and CI docker images and supporting scripts for the Kosu project.

All images defined in this repository are publicly available, and hosted by Google Container Registry. Images can be pulled with:

```bash
$ docker pull gcr.io/kosu-io/$IMAGE_NAME
```

## General images

Convenient images for development within the Kosu-monorepo. Can be used as drop-in replacements for the images they inherit from (shown in parenthesis).

-   `gcr.io/kosu-io/node-lts` (`node:lts`): Custom Node.js image with all necessary binaries needed to build `kosu-monorepo` pre-installed. Drop-in replacement for `node:lts` image.

## CI Images

Docker images used for [Kosu's continuous-integration](https://ci.kosu.io) suite are defined in the [`./ci`](./ci) folder. We use [DroneCI](https://drone.io) and the `ci` images are used to run tests for various Kosu packages.

The current CI images defined in `dev-images` are listed below.

-   `gcr.io/kosu-io/go-kosu-ci`: Custom `golang` image used to run `go-kosu` CI tests.
-   `gcr.io/kosu-io/node-ci`: Custom Node.js (Debian-based) image used for the Kosu contract system CI suite and JS libraries (includes `kosu-monorepo` source build into image).

## Ganache image

A pre-built image with the Kosu Contract system deployed can be started with the following command.

```bash
$ docker run -d --rm -p 8545:8545 gcr.io/kosu-io/kosu-ganache
```

The `kosu-ganache` image's full label is listed below. It can optionally be tagged with a specific version.

-   `gcr.io/kosu-io/kosu-ganache`

## Scripts

### Migrate and update public ganache-db archive

```bash
$ yarn build:ganache_db
```

Migrates the Kosu contract system (`@kosu/system-contracts`) to a ganache instance and uploads the database files to a GCP bucket.

Requires authentication via `gcloud`. The [`migrate-docker-ganache.sh`](./scripts/migrate-docker-ganache.sh) script may be modified to not remove the locally `ganache-db-vX.X.X.zip` files.

The output database archive can be found at:

```
https://storage.googleapis.com/kosu-system-contracts-ganache-db/ganache-db-vX.X.X.zip
```

Where X.X.X is replaced with the desired `@kosu/dev-images` version (in the future may be associated with the contract system version).

### Build and publish kosu-ganache docker image

```bash
yarn build:ganache_docker
```

Pulls and unzips the ganache DB archive (from above) and builds a Docker image that starts a ganache RPC server as the entry command. Can be used to test applications depending on Kosu locally.

The current script requires authentication via `gcloud` and updates the latest image for the `gcr.io/kosu-io/kosu-ganache` repository.
