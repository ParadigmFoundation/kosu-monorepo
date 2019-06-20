## Kosu Monorepo Contribution Guide

All contributions to the kosu-monorepo are welcome and greatly appreciated! This document serves to outline the process for contributions and help you get set up.


### Steps to get started

1. Fork 'ParadigmFoundation/kosu-monorepo'
2. Clone your fork
3. Follow the [installation instructions](./README.md) in the monorepo's top level README.
4. Open pull requests with the `[WIP]` flag against the `master` branch and include a description of the intended change in the PR description.

Before removing the `[WIP]` tag and submitting a PR for review, make sure that:

-   it passes our linter checks (`yarn lint`).
-   it's properly formatted with `yarn prettier`.
-   the whole kosu-monorepo builds (`yarn build`)
-   the test suite passes for all packages (`yarn test`)
-   it passes our continuous integration tests ([https://ci.kosu.io](https://ci.kosu.io))
-   your fork is up to date with `master`


### Branch structure & naming

We have one main branch, `master`, which represents the current development state of the codebase. All pull requests should be opened against `master`.

Name your branch with the format `{fix | feature | refactor }/{ description }`
-   A `fix` addresses a bug or other issue
-   A `feature` adds new functionality/interface surface area
-   A `refactor` changes no business logic or interfaces, but improves implementation


### Additional Details
...
