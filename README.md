# Microfrontend v2, with REACT

This is an authentication project that is based on react, which act as the controller for user signup and user profiler.

---

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]

## Installation

1. Checkout zelda-root project.
2. Change tsconfig.json and include path 'zelda-root/external_modules/shared-context/typings/types.d.ts'.

## Usage

1. Execute the project for use with zelda-root

```
npm start -- --port 8500
```

2. Execute the project for local development

```
npm run start:standalone
```

3. Add executable for hooks during commit

```
chmod a+x .husky/pre-commit
```

## Deployment

1. Project deployment works differently as there is _NO_ hosting page. Means navigating to the page e.g. https://zelda-auth-react-walcoorperation.vercel.app/ will deal with NO Page found.
2. All hosted microservice must be access via the js script, as in https://<host>/walcron-zelda-auth-react.js
3. Create a Github PAT (classic), with only read:packages access.
4. Login locally into github NPM repo with the PAT.

`npm login --scope=@yoonghan --auth-type=legacy --registry=https://npm.pkg.github.com/`

5. Copy in ~/.npmrc into vercel's variable NPM_RC. Basically the varible will contain:

```
//npm.pkg.github.com/:_authToken=...
@yoonghan:registry=https://npm.pkg.github.com/
```

## Github PAT permission required

1. For accessing private repo, please allow Profile -> Settings -> Personal Access Token (classic), open read:packages (basically th esame as vercel deployment). For more info refer: https://docs.github.com/en/packages/working-with-a-github-packages-registry. Add as Github secret in Settings->Secrets And variable and add NPM_TOKEN key. NOTE: In merge NODE_AUTH_TOKEN is used instead.

[build-badge]: https://img.shields.io/github/actions/workflow/status/yoonghan/zelda-auth-react/pull-request.yml
[build]: https://github.com/yoonghan/zelda-auth-react/actions?query=workflow
[coverage-badge]: https://img.shields.io/codecov/c/github/yoonghan/zelda-auth-react.svg?style=flat-square
[coverage]: https://codecov.io/gh/yoonghan/zelda-auth-react
