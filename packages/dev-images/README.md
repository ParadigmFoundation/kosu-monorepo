# `@kosu/dev-images`

Development and CI docker images and supporting scripts for the Kosu project.

All images defined in this repository are publicly available, and hosted by Google Container Registry. Images can be pulled with:

```bash
$ docker pull gcr.io/kosu-io/$IMAGE_NAME
```

## CI Images

Docker images used for [Kosu's continuous-integration](https://ci.kosu.io) suite are defined in the [`./ci`](./ci) folder. We use [DroneCI](https://drone.io) and the `ci` images are used to run tests for various Kosu packages.

## Ganache image

A pre-built image with the Kosu Contract system deployed can be started with the following command.

```bash
$ docker run -d --rm -p 8545:8545 gcr.io/kosu-io/kosu-ganache
```

## Scripts

```bash
$ yarn build:ganache-db
```

Migrates the Kosu contract system (`@kosu/system-contracts`) to a ganache instance and uploads the database files to a GCP bucket. 

Requires authentication via `gcloud`. The [`scripts/migrate-docker-ganache.sh`](./scripts/migrate-docker-ganache.sh) script may be modified to not remove the locally `ganache-db-vX.X.X.zip` files.

The output database archive can be found at:

```
https://storage.googleapis.com/kosu-system-contracts-ganache-db/ganache-db-vX.X.X.zip
```

Where X.X.X is replaced with the desired `@kosu/dev-images` version (in the future may be associated with the contract system version).