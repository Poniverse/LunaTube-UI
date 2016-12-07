# Equestria.tv UI

<img src="http://poniverse.net/img/logos/tv_logo.svg" width="100%" />

## Directory Structure
```bash
.
├── build                       # Built, ready to serve app.
├── config                      # Root folder for configurations.
│   ├── test                    # Test configurations.
│   ├── types                   # Global type definitions, written by us.
│   ├── webpack                 # Webpack configurations.
│   └── main.ts                 # Generic App configurations.
├── node_modules                # Node Packages.
├── src                         # Source code.
│   ├── app                     # App folder.
│   │ ├── components            # React Components.
│   │ ├── containers            # React/Redux Containers.
│   │ ├── helpers               # Helper Functions & Components.
│   │ ├── redux                 # Redux related code aka data layer of the app.
│   │ │   ├── modules           # Redux modules.   
│   │ │   ├── reducers.ts       # Main reducers file to combine them.  
│   │ │   └── store.ts          # Redux store, contains global app state.    
│   │ └── routes.tsx            # Routes.
│   ├── client.tsx              # Entry point for client side rendering.
│   └── server.tsx              # Entry point for server side rendering.
├── typings                     # Type definitions installed with typings.              
├── .dockerignore               # Tells docker which files to ignore.
├── .gitignore                  # Tells git which files to ignore.
├── .stylelintrc                # Configures stylelint.
├── Dockerfile                  # Dockerfile.
├── favicon.ico                 # Favicon.
├── package.json                # Package configuration.
├── README.md                   # This file
├── tsconfig.json               # TypeScript transpiler configuration.
└── tslint.json                 # Configures tslint.
```

## Installation 

We prefer the use of [yarn](https://yarnpkg.com/) to help with our NPM dependencies, and day to day usage.

If you don't have it installed already simply run

```bash
$ npm install -g yarn
```

Then just install the projects dependencies with yarn. :-)

```bash
$ yarn install
```

Note: Yarn is basically `npm` you can substitude almost anything on npm with yarn.

If you're adding a new package be sure to use instead of doing the normal NPM workflow.

```bash
$ yarn add [--dev] <package>
``` 

## Usage

All commands defaults to development environment. You can set `NODE_ENV` to `production` or use the shortcuts below.

```bash
# Running

$ yarn start # This starts the app in development mode

# Starting it with the production build
$ NODE_ENV=production yarn start # or
$ yarn run start:prod

# Building 

$ npm build # This builds the app in development mode

# Commands below builds the production build
$ NODE_ENV=production yarn build # or
$ yarn run build:prod

# Testing
$ yarn test
```

## Credits

[Vortigern](https://github.com/barbar/vortigern), the base project we used for this, is released under the [MIT license](https://github.com/barbar/vortigern/blob/develop/LICENSE). 
