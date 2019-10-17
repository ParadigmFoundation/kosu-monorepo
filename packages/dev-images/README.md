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