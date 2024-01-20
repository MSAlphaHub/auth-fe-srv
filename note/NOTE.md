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