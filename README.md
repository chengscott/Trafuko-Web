### Software Studio
# Trafuko | 垃圾話
[![Maintenance](https://img.shields.io/maintenance/yes/2017.svg)]()
[![Build Status](https://travis-ci.com/chengscott/Trafuko-Web.svg?token=6qy6kyyaykPzLdMZwRRn&branch=master)](https://travis-ci.com/chengscott/Trafuko-Web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![](/dist/images/logo.svg)

# Features

1. 錯視背景與幹話彈幕

![](/metadata/background.png)

2. 幹話池

![](/metadata/pool.png)

3. 排行榜

![](/metadata/rank.png)

4. 同步收藏列表

![](/metadata/fav.png)

## Demo

The midterm demo slide deck is available at the [Presentation Markdown](/metadata/講幹話？Trafuko.md).

# Development

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

# Contributing

Since the course has ended, the original development team may **NOT** involve with the program, but future releases will probably be geared more towards bug-fixes rather than addition of new features.

More contributing guides should be referred to our Wiki. Thanks for your participation!

# Workflow

1. Up to date
    - ```git pull```
    - ```yarn```
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

