# SETUP
## Eslint
`$ npm init @eslint/config`

![Alt text](./images/eslint.png)

## Prettier
`$ npm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier`

![Alt text](./images/prettier.png)

## Husky
`$ npx husky-init && npm install`
```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run lint:fix
```

## Error typescript-eslint when install package
`$ npm i @typescript-eslint/eslint-plugin@6.19.0 --legacy-peer-deps`

## REDUX
install redux toolkit
`$ npm i @reduxjs/toolkit`
install react-redux
`$ npm i react-redux`

# CONFIG ALIAS (@)
[import shortcut/alias in create-react-app?](https://stackoverflow.com/a/65746792) \
if you use create-react-app to create a react app you must install @craco/craco so webpack can understand the configuration alias.
```
/* package.json */

"scripts": {
   "start": "craco start",
   "build": "craco build",
   "test": "craco test"
}
```