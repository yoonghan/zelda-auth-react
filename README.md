# Microfrontend v2, with REACT

This is an authentication project that is based on react, which act as the controller for user signup and user profiler.

## Usage

1. Execute the project for use with zelda-root

```
npm start -- --port 8500
```

2. Execute the project for local development 

```
npm run start:standalone
```

## Deployment

1. Project deployment works differently as there is *NO* hosting page. Means navigating to the page e.g. https://zelda-auth-react-walcoorperation.vercel.app/ will deal with NO Page found.
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
