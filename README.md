### Software Studio
# Trafuko | 垃圾話

[![Build Status](https://travis-ci.com/chengscott/Trafuko-Web.svg?token=6qy6kyyaykPzLdMZwRRn&branch=master)](https://travis-ci.com/chengscott/Trafuko-Web)
[![Dependency Status](https://david-dm.org/chengscott/Trafuko-Web.svg)](https://david-dm.org/chengscott/Trafuko-Web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Prerequisites

* node
* yarn

## Environment Setup

```bash
yarn # install dependencies
```

## Run in development

```bash
yarn run dev
```

## Run in production

```bash
NODE_ENV=production
yarn run build
yarn start
```

## Test

```bash
yarn test
```

## Lint

```bash
yarn lint
```

# Workflow

1. Getting Started
    - ```git pull```
2. Unit Implementation (& Unit Test)
3. Integration: Test & Lint
    - ```yarn test```
    - ```yarn lint```
4. Commit
    - ```git status```
    - ```git add --all```
    - ```git commit -m "change description"```
5. Sync to GitHub
    - ```git pull```
    - Resolve merge conflict (may commit again)
    - ```git push```
    - (Workspace is clean now!)
- Post Sync
    - Travis CI
    - Azure CD
